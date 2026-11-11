# The Daily Teaching System — master implementation plan

**Status:** PLAN ONLY (written 2026-11-11). Nothing in this file is built. Each part below is a separate task, started only when the operator prompts it.
**Source:** `C:\Users\rkgen\Desktop\notes\strategy\indispensable daily teaching system.docx` (operator strategy note).
**How to use this file:** the operator says "implement Part N" (or a sub-part such as "Part 4.3"). The session reads this file, then the part's own section, then the files that section names. Every part ends with a record appended to §12 (the progress log) so the next session knows the state.

**Standing language rule for every part:** `en` = American English (CCSS, US grade names, US coins, mm/dd dates, "math"), `es` = Mexican Spanish (SEP, pesos, "primaria", ustedes), `pt` = Brazilian Portuguese (BNCC, reais, "1º ano", "você"). Never British English, Spain Spanish or European Portuguese. Every native review brief states this in its first line.

---

## 1. What the strategy note asks for, in one paragraph

Change what a subscriber buys from "a large shelf of supplemental worksheets" to "the thing I teach from every day". Six additions: (1) multi-week units with a scope and sequence, (2) alignment to each country's official curriculum, (3) diagnostic and benchmark tests with paid keys and grading sheets, (4) 300+ printable decodable and guided readers per language, (5) one-day emergency packs for a substitute teacher, (6) an optional class link that sends a child's results on interactive pages back to a teacher dashboard.

## 2. What already exists that this plan builds on (measured 2026-11-11)

| Asset | State | Where |
|---|---|---|
| Teaching-point map | 303 teaching points (K 89 · G1 83 · G2 77 · G3 54), each with skill, CCSS/other code, strand, the worksheet types that teach it, the activities that cover it, and planned activities | `docs/activities-rebuild/coverage/coverage-map.json` |
| Teaching order by strand | 70 ladder types ordered per subject and strand, one order for all 11 locales | `frontend/content/level-set-pathways/sequence.json`, `frontend/lib/level-set-pathways.ts` |
| Differentiation | Level Sets: easy / core / hard pages of one worksheet face (~650 ladders per locale), set pages, class record sheet PDF with a placement rule (5,943 live) | `frontend/lib/level-sets*.ts`, `scripts/worksheet-gen/tools/level-set/` |
| Printables | 1,190 worksheet type files (K 473 · G1 379 · G2 227 · G3 111), ~201,800 deck pages, ~36,500 static landing pages | `scripts/worksheet-gen/types/` |
| Interactive pages | 443 of 811 in-scope templates have a screen version; a generic screen engine design covers 208 more | `docs/makers/INTERACTIVE-AND-SHARING.md` |
| Makers | 59 worksheet makers, 1,042 templates, recipes saved per teacher, student and colleague share links | `scripts/makers/`, Prisma `MakerRecipe`, `MakerShareLink` |
| Activities | 204 rebuild rows (rows 1–176 rebuilt and live; rows 177–204 still in their old form) + 111 designed new instruments (#205–#315), 6 blocked on art | `docs/activities-rebuild/ORDER.md`, `new/NEW-ORDER.md`, `new/backlog.json` |
| Classroom tools | 61 tool keys registered | `frontend/config/live-tool-slugs.ts` |
| Framework names | Per-locale national framework NAME and strand/domain names in 11 languages; CCSS code as machine anchor; `/standards/<code>` hubs for CCSS only | `frontend/lib/frameworks.ts`, `frontend/lib/seo/strand-names.ts`, `app/[locale]/standards/[code]/` |
| Phonics data | Gated syllable-split word pools per locale (en 912 · de 1,032 · fr 811 · es 945 · pt 893 · it 980 · nl 1,063 · sv 995 · da 791 · no 828 · fi 1,122), mostly picture nouns | `scripts/v2-data/verify-syllable-boundaries/output/approved-words-<loc>.json` |
| Reading banks | Sight words, reading passages with levels, blends, rhymes, CVC build banks | `scripts/worksheet-gen/data/literacy/`, `data/reading/` |
| Booklet precedent | Two shipped one-sheet booklets (tracing booklet K-500, mini coloring booklet K-516) | `scripts/worksheet-gen/types/k/` |
| Share links | `PlayLink` (decks), `ActivityPlayLink` (activities), `HostedWorksheet`, `MakerShareLink`; all carry a view count only, no results | `frontend/prisma/schema.prisma` |
| Paywall | Free account: 3 downloads a month, 3 makes a month, 10 plays a day; subscriber ("Teacher" plan, $69/year or $8.99/month) unlimited; share links, collections, workspace and saves are Teacher-only | `frontend/lib/quota.ts`, `frontend/lib/entitlements.ts`, `frontend/config/lemonsqueezy-product-config.ts` |
| Story programme | Interactive storybook engine live; 5 of 250 English stories shipped (preview only); Story Studio live but dark | memory `project_story_library_250.md` |

**The gap the note names is real and specific:** the pieces exist but nothing tells a teacher what to teach on Tuesday of week 6, nothing proves a child grew, and nothing comes back from the interactive pages. The plan therefore builds very little new *kind* of content for items 1, 2, 3 and 5. It builds a **content graph** and assembles products from it. Item 4 (readers) is the one large new content programme. Item 6 is new infrastructure.

## 3. Conflicts with standing rules that the operator must settle first

These are not objections. Each one is a place where the note reverses a recorded ruling, so the first session must not guess. **C1 and C2 were settled by the operator on 2026-11-11 (see §11): lesson plans are built, and progress tracking is built as the note describes.**

| # | Standing rule | What the note asks | What I recommend |
|---|---|---|---|
| C1 | CLAUDE.md top amendment 2026-05-17: lesson plans, teaching packages and themed bundles were removed; any task touching them must stop and ask | Units that contain lesson plans | Treat the note plus the 2026-10-28 ruling ("lesson plan for every topic, referring to all relevant content") as the approval to rebuild. Keep the new bar from that ruling: a plan is assembled from real content it links to; no unit exists for a topic without content behind it. The old domain died on generic filler, so Part 4 has a filler gate. |
| C2 | "NO progress tracking" (operator-locked), no student accounts, no session tracking (CLAUDE.md §3.4, §4.4, §11) | Results sent to a teacher dashboard | Confirm the reversal in writing. Keep the half that protects children: no student accounts, no child-visible score, streak, timer or ranking. Data exists only when a teacher creates a class link. |
| C3 | Level Sets v2 red line: "the paywall does not change"; `quota.ts` and the pricing copy are off limits | Unit bundles, test keys, grading sheets and rubrics behind the Teacher plan | No change to `quota.ts` caps. New items use the existing Teacher-only pattern (`requireActiveSubscriber`), the same way share links and collections already do. Individual worksheets stay exactly as they are, as the note itself says. |
| C4 | Visible copy never claims "free"; a paywall sentence must name the real plan (`pricingPage.tier.name`) | New marketing surfaces | Every new page reads the plan name from the catalogue; a free-claim lint runs on visible fields only. |
| C5 | Churn freeze lesson (forensic audit 2026-07-10): mass rewrites of titles, metas, canonicals or slugs of indexed pages deepened the traffic crash | "With minimum harm to the current SEO" | §5 below: the whole programme is additive. No existing indexed page changes its title, meta description, canonical, h1, slug or hreflang. |
| C6 | Server disk rule: the server holds only what it serves; every new file class needs an expiry or a reason | Bundles, readers, test PDFs | Bundles are built in the teacher's browser from files that already exist (no second copy). New PDFs are measured on the pilot before any fan-out. |
| C7 | Rule #1: no agent fan-outs. Rule #2: a native-speaker check and a pedagogy check on every content task | Content in 11 languages | Each part states its review budget: one reviewer per task over a compact text dump, plus my own reading. Locales run one after another. |

**Factual notes on the strategy text itself** (so nobody builds the examples literally):
- A "4-week Kindergarten unit on Money" is not a US Kindergarten standard. Money is 2.MD.C.8 (Grade 2) in Common Core; Mexico, Brazil and most European curricula place coins in grade 1 or 2. The unit list comes from each curriculum, not from the note's example.
- "Germany: Lehrplan" hides sixteen state curricula. The national layer is the KMK Bildungsstandards for the Primarbereich. Part 2 aligns to the KMK standards first and treats state plans as an optional later layer.
- "Decodable" is an English-language reading concept. Every other language has its own first-reading method (syllable texts in Finnish and German, "lydrette" books in Danish and Norwegian, "klankzuivere" texts in Dutch, the syllabic method in French, Spanish, Italian and Portuguese). Part 8 rebuilds the reader programme per language. It never translates English books.
- "Benchmark" must not imply norms. We can ship curriculum-based checks with parallel forms. We cannot claim percentiles, standardization or measured effect sizes, and the copy must not suggest them.

## 4. Architecture: one graph, six products

```
                    ┌─────────────────────────────────────────────┐
  Part 1            │ CONTENT GRAPH                               │
                    │ teaching point ⇄ worksheets, level sets,    │
                    │ interactive pages, maker templates, tools,  │
                    │ activities (live + planned), readers, tests │
                    │ per locale, with availability               │
                    └──────────────┬──────────────────────────────┘
  Part 2            ┌──────────────┴──────────────┐
                    │ NATIONAL CURRICULUM REGISTRY│  teaching point ⇄ official objective,
                    │ 11 frameworks, source-cited │  grade placement per country
                    └──────────────┬──────────────┘
          ┌───────────┬────────────┼────────────┬─────────────┐
  Part 4  │ UNITS +   │ Part 5     │ Part 6     │ Part 7      │ Part 8
          │ year plans│ SUB PACKS  │ CURRICULUM │ ASSESSMENTS │ READERS (new content)
          │           │            │ PAGES      │             │
          └───────────┴────────────┴─────┬──────┴─────────────┘
  Part 3  shared delivery: Teacher-only gate, browser-built bundles, routes, sitemap shards, SEO gates
  Part 9  CLASS LINKS + RESULTS (micro-data) — reads the graph to report by skill and by national objective
  Part 10 THE REMAINING 139 ACTIVITIES — built last, slotted into units by re-running the assembler
```

Why a graph first: units, sub packs, tests and curriculum pages are four views of the same facts (which asset teaches which point, in which language, at which level). If each product keeps its own list, they drift, and a unit links a worksheet that a locale refused. One registry with one gate ("every referenced asset exists and answers 200 in that locale") removes that class of defect for all four.

## 5. SEO protection rules (apply to every part; each is a gate, not advice)

1. **Existing indexed pages keep their identity.** Before and after every deploy of this programme, a script compares title, meta description, canonical, robots, h1 and hreflang of a fixed sample (at least 200 URLs across deck pages, landings, topic pages, hubs, activities, tools, maker landings, standards pages) plus the URL count of every sitemap shard. Any difference fails the deploy. Precedent: `/root/ident.sh` from Level Sets v2; this programme extends it and commits it.
2. **New URL namespaces only.** Proposed (English path constant + native-language slug, the site's existing convention): `/<loc>/units/<slug>`, `/<loc>/curriculum/<slug>`, `/<loc>/assessments/<slug>`, `/<loc>/readers/<slug>`, `/<loc>/sub-plans/<slug>`. Never reuse a prefix that `middleware.ts` answers with 410 (`lesson-plans`, `teaching-packages`, `themed-bundles`, `bundles`, `guides`, `flashcards`, `ideas`, `start`, `blog`, `compare`, `gallery`, `apps`, `faq`). Google was told those are gone.
3. **Index hubs, not components.** One indexable page per thing a teacher searches for (a unit, a reader series, a test for a grade and subject, a sub pack for a grade, a curriculum objective group). Lesson pages, single reader pages, test forms and day pages are `noindex, follow`, self-canonical, and never in a sitemap, until data says otherwise. This is the Level Set recipe that is already live (noindex decks under 146 indexable hubs).
4. **No page ships thin.** An indexable page needs real content behind it in that locale: a unit with at least its full lesson list and assets, a curriculum page with at least the minimum asset count set in Part 6. A locale where the content is missing gets no page (a 404 is correct; an empty page is not).
5. **No crawlable facets.** Curriculum "filter tags" are curated static pages. No new query-parameter combinations on hubs. Any parameter that must exist is covered by the nginx facet cap and `robots.txt`, and canonicalizes to the bare path. Reason: the 2026-10-28 outage was a facet crawl.
6. **One sitemap shard per new surface** (next free ids), so each can be submitted and read separately in Search Console. IndexNow on publish.
7. **hreflang only between real siblings**; `x-default` only when an English sibling exists. New Next routes use `buildHreflangAlternates` from `frontend/lib/seo/hreflang.ts`; if a surface is rendered by the static landing renderer, the port in `render-landing-html.js` is used and both stay in sync.
8. **No cannibalization.** Each new indexable page is compared with its nearest existing landing or hub using the existing similarity gate (`scripts/seo-landing/gate.js`, thresholds unchanged). New pages target a different query face: "unit / lesson plans / weekly plan", "assessment / test", "sub plans", "decodable readers / mini-books", "curriculum objective". They never retarget "worksheets".
9. **Links to old pages are additive.** Existing landings, topic pages and set pages may gain one block ("Part of the unit …", "Curriculum objective …") through the proven augment path, with the head proven byte-identical. Deck pages get no new mass rewrite if a shared external script can do the job (see Part 9); if an injection is unavoidable it uses the marker-guarded injector pattern with `--check`.
10. **Paywalled previews are honest.** Anonymous visitors and crawlers see the same page: overview, lesson list, sample pages. Teacher-only files answer with the sign-in or pricing redirect for everyone. Pages that preview paid material carry `isAccessibleForFree: false` with the `hasPart` paywalled-section markup, so a preview is never mistaken for cloaking. Teacher-only PDFs are served `X-Robots-Tag: noindex`.
11. **Routes obey the production traps already paid for:** `export const dynamic = 'force-dynamic'` (never an empty `generateStaticParams`), fonts through `frontend/lib/fonts/`, every new route passes `scripts/preflight-indexable-routes.js`, nginx hub-cache covers the new prefixes.
12. **Staged release with a measurement stop.** Each surface ships in English first, then two more markets, then a Search Console read after four weeks (impressions, clicks, and the old pages' numbers beside them) before the remaining locales. The Level Set hub check due 2026-11-25 is the template.

## 6. The parts at a glance

| Part | Name | Covers note item | Public pages? | Depends on | Rough size (sessions, estimate) |
|---|---|---|---|---|---|
| 0 | Decisions, baseline, demand harvest | all | no | — | 2 |
| 1 | Content graph | 1, 2, 3, 5 | no | 0 | 3–4 |
| 2 | National curriculum registry (data) | 2 | no | 1 | 12 (one locale each, plus setup) |
| 3 | Shared delivery platform + format pilots | 1, 3, 5 | pilot only, noindex | 1 | 4–5 |
| 4 | Units and year plans | 1 | yes | 1, 2, 3 | 6 for en, then ~3 per locale |
| 5 | Sub packs | 5 | yes | 1, 3, 4 (en) | 3 for en, then 1 per locale |
| 6 | Curriculum pages and school pack | 2 | yes | 2, 4 | 2 + 1 per locale |
| 7 | Assessments | 3 | yes | 1, 2, 3 | 6 for en, then 2 per locale |
| 8 | Readers | 4 | yes | 0, 3 | 8 for the engine and en, then 6–8 per locale |
| 9 | Class links and results (release 1 right after Part 0; release 2 after Parts 1–2) | 6 | no (teacher area) | 0 for release 1; 1, 2 for release 2 | 8–10 |
| 10 | The remaining 139 activities | (operator rule: last) | yes | 9 for the result contract | one activity per session, as today |

The size column is my estimate, not a measurement. The pilot inside each part produces the real number before the fan-out.

**Order (operator ruling 2026-11-11 moved Part 9's first release forward).** 0 → **9 release 1 (9.1–9.4)** → 1 → 2 → 3 → **9 release 2 (9.5–9.6)** → 4 → 5 → 6 → 7 → 10. Part 9 release 1 needs nothing from Parts 1–8, so it is built first after the decisions. Part 8 (readers) depends only on Parts 0 and 3, so it can be interleaved at any point after Part 3; it is the longest content programme and nothing waits for it except the reading slot in units and sub packs, which uses the existing reading passages until readers exist. Part 10 is last by operator rule.

---

## Part 0 — Decisions, baseline and demand harvest

**Goal:** nothing is built on a guess. Three outputs.

**0.1 Operator decisions — ALL SETTLED 2026-11-11, see §11. The list below is kept as the record of what was asked; do not ask again.**
1. C1 and C2 are settled (§11, 2026-11-11). C3 from §3 still needs a written ruling.
2. URL namespaces (§5 rule 2) and the native product names per locale. The names come from native panels in the parts that use them; the operator only approves the English ones here. "Sub Tub" stays an internal name: US teachers search "sub plans" and "emergency sub plans".
3. Units: grade span (K–3 as today, or also the pre-K band the catalogue already has), subjects in the first release (math and literacy; science and social themes later or never), and whether a unit's lesson plan text may be shown in full to free accounts or as a preview.
4. Assessments: which files are Teacher-only (the note says keys, grading sheets, rubrics; I recommend the student pages stay ordinary metered printables).
5. Readers: the count target per language as a quality-first ramp (pilot 12 → 60 → 150 → 300) instead of 300 at once, and whether a single reader page may be indexed later.
6. Class results: the privacy model (recommended default in Part 9: no names stored), retention period, whether free accounts get a trial class, and who reviews the legal texts (privacy policy, a data processing agreement for schools). I can draft; a lawyer or the operator must approve. This has calendar lead time, so it is asked now even though Part 9 comes late.
7. School purchase path: the note says principals approve budgets. Whether to add a quote and invoice request page (the school license was deferred to v1.5).
8. Activities: whether the build order of the remaining 139 may be re-sorted by the unit gap report (Part 10), or stays ORDER rows 177–204 then NEW-ORDER.

**0.2 SEO baseline:** commit the identity-snapshot script (§5 rule 1), record the baseline, and record 28-day Search Console and Umami numbers for the surfaces that will gain links (hubs, topic pages, landings, set pages).

**0.3 Demand harvest for the five new surfaces in 11 markets.** Reuse `scripts/seo-research/harvest-level-set-demand.js` and its report builder with new seed lists written per language: unit plans / lesson plans / weekly plans, the national curriculum's own name plus grade and subject, tests and diagnostics by grade, sub plans, first readers and mini-books. Output: `docs/SEO/daily-system-demand/` with a ranked list per locale. This decides which page types are indexable per market and what they are called. Known from the earlier harvests: demand shapes differ sharply by country, so no page type is assumed to exist in all 11.

**Done when:** §11 holds the rulings, the baseline is committed, and the ranked demand lists exist for 11 locales. **Review budget:** none (no content ships).

---

## Part 1 — The content graph

**Goal:** one machine-readable registry that answers, for any teaching point and any locale: which printable faces teach it (and at which level), which have a screen version, which Level Set ladder, which maker template makes more, which tool models it, which activity practises it (live, or planned with its row number), and later which reader and which test item belongs to it.

**Build:**
1. **Teaching points v2.** Start from `coverage-map.json` (303 points). Give every point a stable id (they have `tp` keys already), a normalized strand (today's strand strings are free text such as "Geometry / Visual Perception"; map each to one `STRAND_NAMES` key), a subject, prerequisite points, and a position in the teaching order (derived from `sequence.json` plus the worksheet type order, then reviewed).
2. **Asset index per locale**, generated, never hand-written:
   - printables: from the worksheet-gen type registry and, on the server, from deck manifests (which faces exist in which locale, at which levels, with which slug). Per-locale refusals are already recorded in the batch `hub-expectations.json` files; the index must agree with them.
   - Level Set ladders: from `export-ladders.js` output.
   - maker templates: from `scripts/makers/topic-map.js` and the inventory (template → type → teaching point).
   - tools: a new hand-reviewed table tool → teaching points (61 tools; `tool-categories.ts` only has four categories).
   - activities: from the manifests (live) and from ORDER.md rows 177–204 and `new/backlog.json` (planned, with status).
3. **Gates:** every asset reference resolves; every teaching point lists at least one printable; a per-locale "what a unit could use" report; a poison test for each assertion. Wired into `deploy.sh` as WARN first.
4. **Location:** `frontend/content/teaching-graph/` (points, tool table, order) + `scripts/teaching-graph/` (builders and gates). The server-side half writes its index under the media tree and the PC copy travels by scp, like the ladder exports.

**SEO:** no public surface. Zero risk.
**Review budget:** one pedagogy reviewer over the point order, prerequisites and the tool table (a compact text dump).
**Done when:** the graph builds for 11 locales, gates pass with poisons killed, and the "unit could use" report exists.

---

## Part 2 — National curriculum registry (the data half of note item 2)

**Goal:** for each of the 11 markets, a source-cited model of the official curriculum for the K–3 age band, and a crosswalk from every teaching point to the official objective and the grade where that country teaches it.

**Rule that governs this part:** nothing about a curriculum is written from memory. Each locale's session fetches the current official documents, stores the citation (title, publisher, year, URL, access date) and builds the registry from the text. Several of these frameworks were revised recently or are being revised, so the session must establish which version is in force.

**Frameworks to capture** (names as the site already uses them; structure to be verified from the primary source in each session):

| Locale | Framework | What the registry must model | Known issue to resolve |
|---|---|---|---|
| en (US) | Common Core State Standards (math, ELA) + NGSS for science rows | Already code-level in the data | Decide later whether large non-CCSS states (Texas TEKS, Florida, Virginia) get a crosswalk; demand harvest decides |
| de | KMK Bildungsstandards Primarbereich (Mathematik, Deutsch) | Competence areas and standards at end of grade 4, plus typical grade placement | Sixteen state plans exist; start national, add the largest states only if demand shows it |
| fr | Programmes officiels, cycle 1 and cycle 2 | Attendus by cycle and the yearly progression markers (CP, CE1, CE2) | Check which programme texts are in force; an existing row "Questionner le monde" was flagged as wrong by a reviewer |
| es (Mexico) | SEP Plan y Programas de Estudio | Campos formativos, contenidos and learning progressions by fase and grade | The site's number strand names for es were flagged as Spain's wording, not SEP's. Fix here, at the source |
| pt (Brazil) | BNCC | Educação Infantil fields of experience and Ensino Fundamental skills with their official codes | BNCC has stable public codes that teachers search for; this locale can be code-level like the US |
| it | Indicazioni nazionali | Traguardi and objectives to the end of class 3 | Check whether the revised Indicazioni are in force for the target school year |
| nl | SLO kerndoelen (and the reference levels where they apply) | Core objectives and the SLO learning lines for groep 1–5 | New core objectives are being introduced; record the version |
| sv | Lgr22 | Centralt innehåll for årskurs 1–3 and the förskoleklass part | Lgr22 states content once for the 1–3 band; it cannot place a skill in a single year. Year placement comes from typical practice and is labelled as such |
| da | Fælles Mål | Competence areas and goals by grade band | A reviewer flagged the da Social Studies strand name; check the current binding status of the goal levels |
| no | LK20 | Kompetansemål after grade 2 and grade 4 | — |
| fi | OPS 2014 (perusopetuksen opetussuunnitelman perusteet) and esiopetus | Objectives and content areas for grades 1–2 and 3–6 | — |

**Build per locale:**
1. `frontend/content/curricula/<loc>/framework.json`: the structure, each node with an id (the official code where one exists, an internal stable id otherwise), the official wording in the original language, grade or band, and the source citation.
2. `frontend/content/curricula/<loc>/crosswalk.json`: teaching point → one or more framework nodes, with a relation (`teaches`, `prepares`, `extends`) and the national grade where it is normally taught. Teaching points with no counterpart in that curriculum are marked so; they are not forced.
3. Corrections to `strand-names.ts` where the registry proves a row wrong (additive correction of visible labels on activity pages; never a title or slug change).
4. A gate: every node cites a source; every crosswalk row points at existing ids; official wording is stored verbatim and is never shown as a quotation in metadata (framework name and objective label only, per §20.10).

**Order:** en → de → sv (the three the note names) → es → pt → fr → nl → fi → no → da → it. **State layers (decided 2026-11-11, §11):** Texas (TEKS) is built straight after the US national registry; Bavaria, NRW and Saxony straight after the German one. **Preschool stage (decided 2026-11-11):** the pt, es and nl registries include their preschool stage, because those three markets get preschool units in the first wave.
**SEO:** no public surface in this part.
**Review budget:** one native teacher-reviewer per locale over the crosswalk (a table dump), briefed as an audit: "find the rows a teacher in your country would call wrong".
**Done when:** 11 registries pass the gate and each has a reviewer's record.

---

## Part 3 — Shared delivery platform and the format pilots

**Goal:** build once what Units, Sub packs and Assessments all need, and get the operator's approval of the formats on a small English sample before any content fan-out.

**Build:**
1. **Teacher-only asset gate.** A new download kind in the existing proxy (`/api/quota/dl`) that requires an active subscriber and never counts against the free caps. `quota.ts` caps unchanged. Anonymous and free users get the pricing or sign-in redirect; the wall copy reads the plan name from the catalogue.
2. **Browser-built bundles.** "Download the whole unit" merges existing PDFs in the teacher's browser, in lesson order, with the teacher guide first. No merged copy is stored on the server. This needs a PDF merge library in the frontend, which is a new dependency and therefore an operator approval (CLAUDE.md §10.3). Fallback without a dependency: a zip of the files. The makers already build PDFs in the browser; check their stack before proposing a library.
3. **The pack page template.** One Next route pattern reused by units, sub packs, assessments and reader series: header, what is inside, the ordered list with thumbnails, the preview, the Teacher-only buttons, the links to maker, activity and tool, JSON-LD, hreflang, breadcrumb. Server-rendered, `force-dynamic`, hub-cache.
4. **Sitemap shards, the route preflight entries, the identity snapshot in `deploy.sh`.**
5. **Workspace hooks:** "save this unit to my workspace" uses the existing collections model if it fits; no new table unless needed.
6. **Format pilots, English, noindex, not in any sitemap:** two units (one math, one literacy), one sub pack, with real assets from the graph. These exist only so the operator can open them and rule on the format.

**SEO:** pilots are noindex and unlinked. The identity gate runs for the first time on this deploy.
**Review budget:** one reviewer over the pilot texts; my own reading of every rendered pilot page at 360, 768 and 1024.
**Done when:** the operator has approved (or changed) the unit format and the sub pack format, and the gate, bundle and page template are live behind noindex.

---

## Part 4 — Units and year plans (note item 1)

**What a unit is.** A 2–4 week block for one grade and subject, made of ordered lessons. Each lesson is assembled from the graph:

| Lesson slot | Filled from | Notes |
|---|---|---|
| Objective | the teaching point, worded for a teacher, plus the national objective label from Part 2 | |
| Warm-up routine (5 min) | a classroom tool | only where a tool exists for the point |
| Teach | the tool or an activity on the projector | |
| Practice on paper | the Level Set ladder: core page for most, easy and hard for differentiation | this is where the existing easy/core/hard structure becomes the daily plan |
| Practice on screen | an interactive page or an activity | activity slots accept planned activities; see below |
| Exit ticket | 3–5 items generated from the same point (Part 7 engine once it exists; a core page excerpt until then) | |
| Make more | the maker template for this face | the bridge from ready-made to maker that the product model asks for |
| Teacher note | NEW authored content: the usual misconception, the words to use, what to watch for | the only new prose in a unit |

**A year plan (scope and sequence)** is the ordered list of a grade's units across the school year, per locale, because each country places skills in different years (Part 2 crosswalk). The southern-hemisphere and Mexican school calendars differ from the US and European ones, so a year plan is expressed in weeks 1–36+, not in months, with a per-locale note on the school year.

**The filler gate (why this will not repeat May 2026).**
- A lesson plan contains no free-floating prose. Every sentence is either generated from structured data (objective, materials, steps naming real assets) or is a teacher note attached to one teaching point.
- Teacher notes are authored per teaching point (about 303 short notes per language), from material that already exists: the miss ladders and locale traps in the activity design sheets, the level notes in the Level Set configs, the tool landing copy. Notes are written natively per language, not translated.
- Lints: a note that names no concrete error, material or wording fails; two notes above a similarity threshold fail; a lesson with fewer than two real assets is dropped; a unit with fewer than the minimum number of lessons is not published in that locale.

**How planned activities are handled (operator rule: activities are built last).**
- The graph knows all 139 unbuilt activities with their teaching points. The assembler resolves the "practice on screen" slot in this order: live activity → interactive deck → nothing. A planned activity never produces a visible "coming soon".
- When an activity ships, re-running `assemble-units.js` fills its slot. The change is inside one lesson block; the unit's title, URL and metadata do not move.
- A **unit gap report** lists lessons whose screen slot is empty and which planned activity would fill it. Part 10 uses it.

**Pages and SEO.**
- Indexable: one page per unit per locale (`/<loc>/units/<slug>`), one page per grade-and-subject year plan, one units hub per locale. Lessons are sections of the unit page (anchors), not separate indexable URLs.
- The unit page shows the full lesson list and sample pages to everyone. The whole-unit bundle, the teacher guide PDF and the printable year plan are Teacher-only. Each single worksheet inside a unit keeps today's metering.
- Existing pages gain one additive "Part of the unit …" block (landings, set pages, activity pages), head byte-identical.
- Titles come from the Part 0 harvest per language; they target unit and lesson-plan queries, never "worksheets".

**Sub-parts (each is one prompt):**
- **4.1** Assembler, unit data model, lints, unit gap report; unit list for en K–3 math drafted from the graph and reviewed.
- **4.2** Teacher notes for en math points; en math units published noindex for operator review; then indexed.
- **4.3** en literacy: unit list, notes, units. (US phonics sequence; the reading slot uses existing passages until Part 8.)
- **4.4** en year plans, units hub, additive blocks on existing pages, four-week measurement stop.
- **Preschool in the first wave (decided 2026-11-11, §11):** the pt, es and nl sub-parts also build theme units for the preschool band as each country defines it. All other markets build preschool in the second wave.
- **4.5–4.14** one locale per sub-part, in the Part 2 order: unit list re-sequenced by that country's crosswalk, native teacher notes, native naming, one reviewer, publish. es is built for Mexico (SEP grades, pesos in money units), pt for Brazil (BNCC, reais).

**Size estimate:** 12–16 units per grade and subject pair is my working number (about 60–70 units per locale). The en pilot fixes the real number.
**Review budget:** one native-and-pedagogy reviewer per sub-part over a text dump of all notes and lesson lists; my own reading of a sample of rendered units.
**Done when (per locale):** every published unit passes the filler lints, every asset link answers 200, the identity gate is clean, and the reviewer's findings are fixed at the source.

---

## Part 5 — Sub packs (note item 5)

**What a pack is.** One PDF a teacher can send from bed: a full school day for one grade, printable with zero preparation.

Contents: a one-page note for the guest teacher (the day at a glance, time-boxed), a step-by-step script per block (what to say, what to hand out, what to do with early finishers), reading, writing, math, a logic or drawing block, a calm end-of-day page, answer keys, a "how the day went" form for the guest teacher to leave behind, and blank class-information sheets the regular teacher fills in once (schedule, routines, helpers, dismissal). Where the class has devices, the script names one interactive page as an option; the day never depends on a screen.

**Design rules.**
- A substitute day is review, never new teaching. Packs come in three school-year positions (early, middle, late), each drawing only on teaching points that the year plan (Part 4) has already covered by then.
- Every page comes from the graph; the only new writing is the guest-teacher script and forms. The script is authored natively per language and reviewed; it must be usable by an adult who has never seen the class.
- Themed so the day feels whole (the theme axis the catalogue already has), with printable pages that do not need colour.

**Count:** per locale, 4 grades × 3 positions × 2 themes = 24 packs to start; more themes later if the packs convert. **The Part 0 harvest makes the form a per-market decision** (§12, Part 0.3, point 3): a full day in en and fr, single lessons by grade and subject in de, a review booklet in es, a minimal set in pt and it, and no indexable pack pages in nl, sv, da, no and fi unless a native reviewer finds the search words.
**Pages and SEO:** one indexable page per pack and one hub per locale under `/<loc>/sub-plans/`. Demand is strongest in the US ("emergency sub plans kindergarten"); the Part 0 harvest decides which other markets get indexable pack pages and what they are called there. The page previews the day plan and two sample pages; the pack PDF is Teacher-only (this is the 6:00 AM purchase the note describes, so the page states plainly what is in the pack and that it prints in one click).
**Sub-parts:** 5.1 pack assembler + en K and G1; 5.2 en G2 and G3 + hub + measurement; 5.3 onward one locale each.
**Review budget:** one reviewer per sub-part reads every script as a guest teacher would ("where would you be stuck?").
**Done when:** each pack prints as one file, every referenced page exists in that locale, and the reviewer could run the day from the script alone.

---

## Part 6 — Curriculum pages and the school pack (the public half of note item 2)

Built after units exist, so that a curriculum page has depth on its first day.

**Build:**
1. **Curriculum hub per locale** (`/<loc>/curriculum/`): the country's framework by grade and subject, each objective group linking to the units, printables, activities, tools and tests that serve it. For en this sits beside the existing `/standards/<code>` hubs, which keep their URLs and content; the new pages link to them and do not replace them.
2. **Objective-group pages**, indexable only where the harvest shows people search that way (code-level in the US and Brazil; by subject and grade elsewhere, for example "Lgr22 matematik årskurs 1–3"). Everything else is a section of the hub.
3. **"Filter tags" without facets:** the worksheets hub and unit pages show the national objective as a label that links to its curriculum page. No new crawlable filter parameters (§5 rule 5).
4. **JSON-LD:** activity, unit and curriculum pages name the national framework and, where the framework has stable public identifiers, the objective. The CCSS code stays as the machine anchor everywhere it is today.
5. **The alignment document:** a printable "curriculum coverage" PDF per locale and grade (objective → what the site provides), written for a principal. Teacher-only or open is an operator decision; I recommend open, because its job is to get a budget approved.
6. **School path** (only if ruled in Part 0): a quote and invoice request page.

**SEO:** new pages only; existing standards hubs untouched; cannibalization gate against `/standards/` and topic pages.
**Sub-parts:** 6.1 route + en; 6.2 onward one locale each, in Part 2 order.
**Review budget:** the Part 2 reviewer's record covers the mapping; one reviewer per locale reads the visible page text.
**Done when:** every objective shown links to live content in that locale and no page claims official endorsement (we say "aligned to", never "approved by").

---

## Part 7 — Assessments (note item 3)

**Two products from one engine.**
1. **Unit checks:** a short pre-test and a parallel post-test per unit (same blueprint, different items), so growth can be shown.
2. **Benchmarks:** beginning, middle and end-of-year checks per grade and subject, built from the year plan (what should be secure by that point in that country).

**The engine.**
- An **item bank** keyed to teaching points. Most items are generated by the existing worksheet-gen task generators at fixed difficulty (they already produce single right answers with keys); where a point has no generator, items are authored. Each item records its teaching point, level and the error each wrong option reveals.
- A **blueprint** per test (how many items per point). Forms A and B come from the same blueprint with different seeds; a gate proves no item repeats between forms and that the forms match in difficulty mix.
- **Outputs per test:** student pages; answer key; a per-student scoring sheet; a class grid; and a "what next" page that turns each result band into a concrete next step in our content (the easy, core or hard page of the matching Level Set, the unit lesson, the activity). This last page is what makes the test useful and is the tie to the rest of the product.
- **Honesty rules:** these are curriculum-based classroom checks. No percentiles, no "standardized", no claimed validity statistics. Cut scores are described as guidance. The copy says so.
- **Existing rules that bind the items:** one right answer (reviewers are asked for all other answers), answer position measured in both directions, no answer tells, counting never includes 0, pictures show what the word says.

**Paywall (as the note says):** student pages are ordinary metered printables; the key, scoring sheet, class grid and "what next" page are Teacher-only.
**Pages and SEO:** one indexable page per grade-and-subject benchmark set and an assessments hub per locale; unit checks live on their unit page. Names per country come from native panels and must not borrow the name of a national test (each country has its own official assessments; ours are presented as classroom checks that complement them).
**On screen:** tests reuse the interactive engines so that Part 9 can collect results; until Part 9 they are paper only.
**Sub-parts:** 7.1 item bank model, blueprint, form generator, gates, en K–1 math pilot for operator review; 7.2 en math complete; 7.3 en literacy (phonics, sight words, reading; language items need native authoring, not generation); 7.4 en benchmarks, hub, measurement; 7.5 onward per locale (two sessions each: math, then literacy).
**Review budget:** one pedagogy reviewer per sub-part over the item dump; one native reviewer per locale for literacy items.
**Done when:** every form passes the parallel-form gate, every key is correct by construction and by a second independent solve, and every "what next" link exists in that locale.

---

## Part 8 — Readers (note item 4)

This is the one large new content programme. It is planned as its own ramp and rebuilt per language.

**Two series per language.**
1. **First-reading series** (the "decodable" series in English): books that use only what the child has been taught so far, following that language's own teaching sequence.
2. **Theme readers** (guided reading): short levelled books on the catalogue's themes (animals, weather, food, …), where the picture library carries the meaning. These use the image library most directly: one clear library picture per page is exactly what the earliest levels need.

**Per-language foundation (8.1 for English, then once per locale).**
- A **reading scope** authored by a native early-reading specialist: the order in which letters, sounds, syllables or patterns are taught in that country's schools, in stages. English: a US synthetic-phonics sequence. Finnish and German: syllable-based stages (the syllable split pipeline already gates these). Danish and Norwegian: sound-regular words first. Dutch: the sound-pure word structures first. French, Spanish (Mexico), Italian, Portuguese (Brazil): the syllabic progression used in grade 1.
- A **controlled lexicon** per stage: the words a book at that stage may use. Today's pools are mostly picture nouns; readers also need verbs and function words, so this is new native-authored data. In English each word needs its sound-spelling parse recorded, because it cannot be derived from spelling.
- A short list of taught irregular words per stage.
- A **decodability gate:** given a stage, every word in a book is either decodable at that stage or on the taught list. A book that fails does not build. Poison-tested in both directions. This is the same "structurally impossible to publish an error" standard the phonics pipeline already holds.

**The book engine.**
- Format: one sheet, folded into a mini-book (the fold and page order measured on a real printout before anything else is built), in a line-art version to colour and a colour version. The two shipped booklets are the layout precedent.
- Each book also ships a word list, two or three talk questions for the adult and a one-line teacher note. A screen version (page turns, no dependence on audio, because speech synthesis is unreliable in six of the eleven languages) is added so Part 9 can record "read".
- Pictures: only library pictures that a reviewer has opened and confirmed show what the word says; never a mix of line art and colour in one book; the picture never gives away a word the text is meant to make the child decode, in the first-reading series.
- Text is written natively. An English book is never translated; each language gets its own books because the decodable words differ.

**Count and ramp (quality first):** pilot 12 → 60 → 150 → 300 per language, with an operator read at each step. 300 per language across 11 languages is 3,300 books; at one sheet each this is achievable only because the engine and the gate do the checking, and it is still the longest part of the programme. I will not promise a date before the English pilot measures the time per book.

**Pages and SEO:** indexable hubs per series stage and per theme set ("short a readers", a first-reading stage, "animal mini-books"), and a readers hub per locale. Single book pages start noindex under their hub (§5 rule 3) and can be promoted after the first Search Console read. Storage is measured on the pilot (book PDFs are new files on the server; if the size per book is high, books are built in the browser by the maker platform instead).
**Paywall:** books are printables under today's metering (they are the acquisition content the product model wants); whole-stage bundles and the teacher pages are Teacher-only.
**Later, not in this plan's scope unless asked:** a "make your own mini-book" maker.

**Sub-parts:** 8.1 fold spike, book engine, English reading scope and lexicon, decodability gate, 12-book pilot; 8.2 English to 60 with hubs; 8.3 English to 150, then 300; 8.4 onward per locale: scope and lexicon session, pilot 12, then the ramp. Locale order by Part 0 harvest.
**Review budget:** one native early-reading reviewer per batch of books, reading every book's full text and the picture sheet; my own reading of every pilot book.
**Done when (per batch):** every book passes the gate, the reviewer has read every page, and the printed fold was checked on paper for the format once.

---

## Part 9 — Class links and results (the growth lever)

**DECIDED (operator 2026-11-11: "I agree, record it as decided"). These five points are rulings; they override any older wording further down in this part.**
1. **Build it early, in two releases.** Release 1 needs nothing from Parts 1–8: classes, session links, results for Level Set ladders, single interactive worksheets and maker worksheets, the dashboard by child and by level. It sells the content that is already live. Release 2 (after the graph and the curriculum registry exist) adds activities, the skill view in the country's own curriculum wording, and next steps. Tests and readers join when they are built.
2. **First names on the server, with a numbers-only switch per class.** The teacher types first names or nicknames once; each child gets a picture beside the name so non-readers can find themselves; the child taps their own name on the class page. Nothing else about a child is asked for or stored (no surname, birth date, email or photo). A class can be switched to numbered seats for schools that forbid names.
3. **Results kept for the school year.** Deleted when the teacher deletes the class, 14 months after the class was last used, or 60 days after the subscription ends. A delete-now button per child and per class.
4. **One shared reporter, no deck rewrite.** Measured: the worksheet screen runtime marks every item right or wrong on the page after Check (`data-state`), and every interactive deck already loads `lcs-meter.js`. The reporter reads those marks only when the page was opened through a session link. The 29 old app decks still need the spike; where a family cannot be read, the dashboard shows "finished" only.
5. **Legal texts drafted here, checked once by a data-protection lawyer** before launch: privacy policy section, school data processing agreement, parent note.

**What the teacher gets.** In the workspace: create a class, assign any interactive page (a deck, a maker worksheet, an activity, a test, a reader, or a whole Level Set ladder), show the QR code, and afterwards see who finished, what each child got right first time, and which skill needs another look. For a ladder, the page moves the child along the same rule the printed class sheet uses (start at core; nearly all right → harder; several wrong → easier), which gives the note's "passed level 1, struggled on level 2" without any new content.

**What the child gets.** Nothing new to learn: scan, tap their picture, play. No account, no install, no score, streak, timer or ranking on the child's screen.

**Privacy model (recommended default; needs the Part 0 ruling).**
- **The teacher sees each child by name** (operator ruling 2026-11-11: built as the note describes, "Max passed Level 1…"). Decided: first names or nicknames are stored on the server with the class, a picture beside each name, and a per-class switch to numbered seats for schools that forbid names. No surname, birth date, email or photo is asked for or stored.
- **Data only by teacher intent.** A result is sent only when the page was opened through a class link. Public pages stay exactly as they are and collect nothing; the homepage sentence about no student accounts stays true.
- **Minimum data:** per item, right on first try and number of tries; completion; the level. No timing data shown or kept beyond a date.
- **Retention (decided):** results are deleted when the teacher deletes the class, 14 months after the class was last used, or 60 days after the subscription ends. A delete-now button per child and per class. The existing GDPR endpoints are extended.
- **Legal texts:** privacy policy update in 11 languages, a data processing agreement schools can sign, a short plain-language note for parents. Drafted by me, approved by the operator or a lawyer. Laws in scope: GDPR for the EU and Norway, COPPA and FERPA practice for US schools, LGPD for Brazil, the Mexican federal data law. I am not a lawyer and the plan treats this approval as a hard gate.
- No third-party analytics on class-link pages.

**Build.**
1. **Data model** (new Prisma migration, additive): class, seat, assignment (class × content reference × link id × expiry), attempt (assignment × seat × result summary). Three-step migration discipline per §A.5.1.
2. **One result contract:** `{v, contentRef, items[{id, firstTry, tries}], right, total, completed}` posted with the assignment token. Idempotent. Fail-open: a reporting error never blocks play.
3. **Emitters, in order of cost:**
   - maker student pages and test screens: platform code we version; add natively.
   - worksheet-gen interactive decks and the 29 app decks: every interactive deck already loads one shared external script (`worksheet-generators/js/lcs-meter.js`). The reporter is added to that shared script (or loaded by it only when a class token is in the URL). **This avoids rewriting ~200,000 deck files**, which matters both for SEO stability and because app decks are never regenerated. A spike first proves, per runtime family, that results can be read reliably from the page after Check; a family that cannot be read stays "completion only" and says so in the dashboard.
   - activities: one emitter in `lcs-shell.js` that posts task results to the play page. This is a deliberate, one-time, operator-authorized change to the protected shell (the per-activity rule "0 shell lines" stays in force for activity builds). The full activity gate suite runs after it.
   - readers: "opened" and "finished".
4. **Dashboard** in the workspace: by assignment (children × items), by child, by skill. Skill names come from the graph and are shown as the country's own curriculum objective (Part 2), so a Swedish teacher sees Lgr22 wording. Each weak skill links to the next step: the easier page, the unit lesson, the activity. Export to PDF for a parent meeting.
5. **Paywall:** creating classes and assignments is Teacher-only, like today's share links. Whether a free account gets one trial class is the operator's call.
6. **Load:** results are small writes; rate-limited per link; the play pages stay cached static files.

**SEO:** class-link pages are noindex and never in a sitemap (as play links are today). No public page changes.
**Sub-parts (decided order).**
- **Release 1 — built right after Part 0, before Part 1:**
  - 9.1 legal drafts (privacy policy section, school data processing agreement, parent note) sent for the lawyer's check; data model; result contract; classes with first names, pictures and the numbers-only switch.
  - 9.2 reporter in the shared deck script for worksheet screen pages; the spike on the 29 old app decks; maker worksheet reporting.
  - 9.3 Level Set ladder assignments (the child moves along the levels by the class-sheet rule) and the dashboard by child and by level.
  - 9.4 strings in 11 languages, privacy pages, the wall and pricing copy (native, tier-true), deletion proven, launch after the lawyer's check, measurement.
- **Release 2 — after Parts 1 and 2:**
  - 9.5 activity shell emitter + full activity regression; the activity scaffold updated so Part 10 activities report from their first day.
  - 9.6 results by skill in each country's curriculum wording, next steps, export to PDF.
- Tests (Part 7) and readers (Part 8) add their reporting inside their own parts.
**Review budget:** one native reviewer for the 11-language strings and privacy notes; a security review of the reporting endpoint before launch.
**Done when:** a class of test seats can play each content kind and the dashboard shows correct results, deletion works and is proven, and the legal texts are approved.

---

## Part 10 — The remaining 139 activities (last, by operator rule)

**What remains (measured 2026-11-11):**
- **28 rebuild rows**, ORDER.md 177–204: fourteen Grade 2 language rows (L.2.x), one Grade 2 math row (2.OA.B.2), thirteen Grade 3 rows (multiplication, division, rounding, fractions, time, liquid measure, area, perimeter, idioms). They are live in their old form and each has a finished design.
- **111 new instruments**, NEW-ORDER #205–#315 (K 43 · G1 19 · G2 21 · G3 28; CCSS 61 · NGSS 18 · social studies 8 · health 4 · SEL 1 · readiness 19), each with a design sheet; 6 blocked on library art (`new/ART-NEEDS.md`).

**What this plan changes about them — nothing in the build recipe, three things around it:**
1. **Order (decided 2026-11-11).** First the 28 rebuild rows (ORDER 177–204) in their existing order. Then the 111 new ones sorted by the unit gap report (Part 4): the activity that fills the most empty screen slots in published units first, math and literacy before science, health and readiness, the 6 art-blocked ones last.
2. **Born with results.** The activity scaffold (`scripts/activity-scaffold/templates/`) is updated in Part 9 so every activity built here reports through the result contract from its first day, and its verify script asserts it.
3. **Slotting.** After each activity ships, `assemble-units.js` is re-run; the activity appears in its unit lessons, sub packs and curriculum pages without anyone editing those pages. The coverage gate (`audit-activity-coverage.js`) and the unit link gate both run.
4. **New needs found on the way.** If Parts 4–8 find a teaching point with no live or planned activity (for example a reading-fluency point created by the readers), a design sheet is added to `new/backlog.json` as #316 onward during that part and built here.

**Unchanged rules:** one activity per session and then wait; the full visual and functional definition of done; activity-layer only; native and pedagogy check; no deploy rule changes.
**Also to settle at the start of this part:** whether the Swedish fan-out loop in CLAUDE.md §20.9 is superseded for rows the rebuild has already shipped in 11 languages.

---

## 7. What each new page type says about price (tier truth, one table)

| Item | Anonymous | Free account | Teacher plan |
|---|---|---|---|
| Unit page, lesson list, sample pages | see | see | see |
| A single worksheet inside a unit | as today | as today (3 downloads a month) | unlimited |
| Whole-unit bundle, teacher guide, printable year plan | no | no | yes |
| Sub pack page and day plan preview | see | see | see |
| Sub pack PDF | no | no | yes |
| Test student pages | as today | as today | unlimited |
| Test key, scoring sheet, class grid, "what next" page | no | no | yes |
| A single reader | as today | as today | unlimited |
| Reader stage bundle and teacher pages | no | no | yes |
| Curriculum pages and the coverage document | see | see | see |
| Classes, assignments, results | no (demo dashboard with sample data) | no (demo dashboard with sample data) | yes |

This table is decided (operator 2026-11-11, §11): the classes row is Teacher-only with no trial class, and free accounts see a demo dashboard with sample data. Every lesson plan is readable on the unit page by everyone. Visible copy never uses "free"; metadata may say "free printable" only for items a free account can really download.

## 8. Quality system for the whole programme

- **One reviewer per content task**, reading a compact dump of every visible string and every assembled list in every locale that ships, briefed as an audit and told the locale variant in the first line. Findings are fixed at the source and re-checked.
- **I read the rendered pages myself** at 360, 768 and 1024 before calling anything done; printed products are read at print size.
- **Every gate is poison-tested in both directions** before it is trusted, and a gate that measures nothing says so instead of passing.
- **A pedagogical mistake found anywhere is fixed at once** and the live pages republished in place; landing text and metadata are changed only when the operator asks.
- **English is the source every locale inherits from**, so the English of each part is audited by the first native reviewers before the fan-out.
- **No translation.** Teacher notes, scripts, readers, test items with language in them and all names are rebuilt natively per language.

## 9. Risks, stated plainly

| Risk | Where | How the plan handles it |
|---|---|---|
| Units read as generic filler again | Part 4 | No free prose; notes tied to one teaching point; lints; operator reads the pilot before any fan-out |
| Thousands of thin new URLs dilute the site | Parts 4–8 | Hubs indexed, components noindex; thin-page minimums; staged release with a measurement stop |
| A curriculum claim is wrong and a teacher sees it | Parts 2, 6 | Primary sources cited; native teacher audit; "aligned to", never "approved by" |
| A reader contains a word the child cannot decode | Part 8 | The decodability gate makes it unbuildable; a native reviewer reads every book |
| Children's data handled badly | Part 9 | No names by default; data only through a teacher's link; deletion proven; legal approval is a hard gate |
| The 11-language cost explodes | all | English pilot measures the real cost per unit, pack, test and book before each fan-out; locales run one at a time |
| Existing rankings move | all | Identity gate on every deploy; no change to any existing title, meta, canonical, slug or h1 |
| Server disk | Parts 3, 5, 7, 8 | Browser-built bundles; new PDF classes measured on the pilot; each new file class gets its expiry or its reason in the same commit |

## 10. What is deliberately not in this plan

- No change to `quota.ts` caps, prices or the pricing page structure.
- No change to any existing URL, title or meta description.
- No local or self-hosted AI anywhere.
- No student accounts, parent portal, or class management beyond a seat list.
- No science units in the first release (the makers excluded science; the worksheet types exist, so science themes can be added later if ruled in Part 0).
- No games, no story library work; the storybook engine is only a possible later home for reader screen versions.

## 11. Operator rulings

**2026-11-11 (operator, verbatim):** "Lesson plans should be built. Progress tracking should be built as mentioned in the indispensable daily teaching system file."

- **C1 is SETTLED: lesson plans are built.** The 2026-05-17 removal no longer blocks this programme. Part 4 builds them inside units, with the filler gate.
- **C2 is SETTLED: progress tracking is built as the strategy note describes it.** That means: an optional feature; a teacher's paid account creates a unique session link; when children play the interactive sheets through that link, their results go back to a teacher dashboard; the dashboard names the child and the level ("Max passed Level 1, struggled on Level 2"). The public no-account play stays as it is.
  - Consequence for Part 9: the dashboard shows each child by name and reports per level, so Level Set ladders are a first-class assignment type from the first release, not a later sub-part.

**2026-11-11, Part 9 (operator: "I agree, record it as decided"):**
1. Part 9 is built early, in two releases. Release 1 (classes, session links, results for Level Set ladders, interactive worksheets and maker worksheets, dashboard by child and by level) comes right after Part 0. Release 2 (activities, results by skill in the country's curriculum wording, next steps) comes after Parts 1 and 2. Tests and readers join when they are built.
2. First names or nicknames are stored on the server, with a picture beside each name and a per-class numbers-only switch. No surname, birth date, email or photo.
3. Results are deleted when the teacher deletes the class, 14 months after the class was last used, or 60 days after the subscription ends; delete-now per child and per class.
4. One shared reporter in the script every interactive deck already loads; no mass rewrite of deck files; old app decks that cannot be read show "finished" only.
5. Legal texts are drafted in the session and checked once by a data-protection lawyer before launch. The launch waits for that check.

**2026-11-11, standing delegation (operator, verbatim): "Don't flag anymore. Make the decisions yourself."** From here on, a choice inside this programme is decided in the session by what the evidence and the rulings above support, recorded here with its reason, and reported in one line. It is not put to the operator as a question. Unchanged: actions that are hard to undo or that touch the live site are still announced before they run, and the legal texts of Part 9 still wait for the lawyer's check.

**2026-11-11, two decisions made under that delegation (from the Part 0 harvest):**
1. **Preschool units are first wave in Brazil, Mexico and the Netherlands.** Reason: there the preschool band is the widest lesson-plan search of all ("plano de aula educação infantil", "planeación preescolar", "thema kleuters"), and much of what those countries call preschool is the age band the catalogue already serves as kindergarten. Form: theme units, which is how those teachers search. In the other eight markets preschool stays second wave, as ruled. Part 2's crosswalk for pt, es and nl therefore includes the preschool stage of each curriculum (BNCC Educação Infantil, SEP fase 2, groep 1–2).
2. **State curricula: national first, then a fixed short list of states.** Germany: KMK standards, then Bavaria, North Rhine-Westphalia and Saxony, in that order (the three states that ride on German curriculum searches most often). United States: Common Core, then Texas (TEKS), the largest state that does not use Common Core and one teachers search by name. Each state is a crosswalk layer on top of the national one, built in Part 2 straight after that country's national registry, so Part 6 can give each its own page. No other state is added until four weeks of data from these pages exist. A state page is published only where a real crosswalk was built; a Common Core state is never given a page that merely renames the national list.

**2026-11-11, the remaining open items (operator: "agreed"). These seven points are rulings. C3 is settled by point 1. Nothing in Part 0.1 is left open; Part 0 now consists of the SEO baseline (0.2) and the demand harvest (0.3) only.**
1. **Teacher-only items: yes, and the caps stay untouched.** Whole-unit bundles, teacher guide PDFs, printable year plans, sub pack PDFs, test keys, scoring sheets, class grids and "what next" pages are Teacher-only through the existing subscriber check. A free account cannot spend one of its 3 monthly downloads on them. Test student pages and single readers stay ordinary metered printables. Every lesson plan is readable on the unit page by everyone: it is the page's depth for search and the proof of quality, and a free account still cannot run a unit on 3 downloads a month.
2. **No trial class for free accounts.** Instead, a demo dashboard with sample data on the feature and pricing pages. Reason: children's data should exist only under a paid account, where the school agreement applies.
3. **URL names:** `/units/`, `/sub-plans/`, `/assessments/`, `/readers/`, `/curriculum/`, each with a native-language slug after it. Year plans live under `/units/`. Public English names: Units, Emergency Sub Plans, Assessments, Readers, Curriculum. "Sub Tub" appears in copy only. Native names per language are chosen by the native reviewers from the demand harvest.
4. **Unit subjects:** math and literacy for kindergarten to grade 3 first. Preschool and theme units (weather, plants, animals, family and similar) come as a second wave, after the first wave has been measured for four weeks.
5. **Reader ramp:** English first, 12 → 60 → 150 → 300, about 40 % first-reading books and 60 % theme readers. A second language starts only when English has reached 60 and the format is proven. Every language goes to 60; the steps to 150 and 300 are taken per language when its readers are being used. Single reader pages start noindex under their hubs.
6. **School purchase path:** small and manual. One "For schools" page per language with the curriculum coverage document and a quote request form that reaches the operator by email; the operator invoices by hand. No seat management is built until real requests justify it (proposed trigger: 10 requests). Built with Part 6.
7. **Order of the remaining activities:** first the 28 rebuild rows (ORDER 177–204) in their existing order, then the 111 new ones sorted by the unit gap report (the activity that fills the most empty screen slots first; math and literacy before science, health and readiness; the 6 art-blocked ones last).

## 12. Progress log (one entry per finished part or sub-part)

**Part 0.1 — operator decisions — DONE 2026-11-11.** All rulings are in §11.

**Part 0.2 — SEO baseline — DONE 2026-11-11.**
- `scripts/seo/identity-snapshot.js` (build-sample / capture / compare / self-test; an origin mode for the server). Fixed sample of 287 live URLs from all 11 sitemap shards and all 11 languages: `docs/SEO/daily-system-baseline/sample.json`; recorded identity: `baseline.json`.
- Proven: self-test 23 cases; a live compare against a baseline with three planted changes reported exactly those three (exit 1) and nothing else.
- `scripts/seo/daily-system-baseline.sh` (read-only, run over ssh stdin): 28-day traffic and conversion numbers in `traffic-28d.txt`; the reading of them in `BASELINE.md`.
- Headline numbers: 2,763 sessions a day, 307 a day from Google (rising four weeks in a row), 68 new accounts a day, 6 new subscriptions in 28 days, 11 active subscriptions.
- NOT done here, by design: the compare is not yet wired into `deploy.sh` (Part 3 does that, when the first programme deploy exists). NOT measurable here: Search Console, and the static worksheet landings (no analytics beacon).

**Part 0.3 — demand harvest — DONE 2026-11-11. PART 0 IS COMPLETE.**
- 532 autocomplete lookups per market × 11 markets × 5 surfaces: `scripts/seo-research/harvest-daily-system-demand.js` (probes in `daily-system-seeds.json`), reports by `build-daily-system-demand-report.js` → `docs/SEO/daily-system-demand/` (`harvest.<loc>.json`, `report.<loc>.md`, `summary.json`).
- **Read `docs/SEO/daily-system-demand/FINDINGS.md` before naming or scoping any page in Parts 4–8.** Its limits are stated in its first section: no volumes; the probes are mine, not a native reviewer's; I read the heads, the added words and the first answers of every head in every market, not all ~15,000 phrases. The part that builds a market's pages reads that market's full report first.
- What it changes (details in FINDINGS, last section):
  1. Tests (Part 7) are the strongest and most uniform search face in every market.
  2. Names: unit pages lead with each language's lesson-plan word, not "unit"; English tests are "beginning-of-year / mid-year / end-of-year assessment" (not "benchmark", not "pre/post test"); English reader hubs are cut by phonics skill.
  3. Part 5 is per market: full day (en, fr) · single lesson by grade and subject (de) · review booklet (es) · minimal (pt, it) · no indexable pack pages (nl, sv, da, no, fi) unless a native reviewer supplies search words that the harvest then confirms.
  4. Part 6: per-grade objective lists and checklists are the page type with a job; Germany and the US search curricula by state.
  5. Part 8: every book also as a one-page text with questions; a letter-style setting for it and pt; no AVI labels in nl without a basis.
- **Two decisions that followed from the harvest (made 2026-11-11 under the operator's delegation, recorded in §11):** preschool units join the first wave in Brazil, Mexico and the Netherlands; state layers are added for Bavaria, NRW and Saxony in Germany and for Texas in the US.
- Trap paid for: five harvest processes at once got the PC's address refused by the autocomplete service for about an hour. One process at a time; the script resumes where it stopped. Do not route around a refusal (other addresses, other endpoints); wait.

**Part 9 release 1 — BUILT and deployed switched off, 2026-11-11. Working record: `PART-9-DESIGN.md` (its §8 is the deploy state, §9 the launch checklist).** Everything is behind `CLASS_RESULTS_ENABLED`, which is set nowhere.
- **9.1** tables + migration (applied on the server), the rules, the database layer, 11 API routes, the play-meter exemption, the legal drafts.
- **9.2** the reporter for deck pages and for a teacher's own maker worksheets (one shared file; no deck rewritten). 26 published decks and a three-page maker worksheet played by robots.
- **9.3** the children's class page `/c/<code>` and the teacher screen at `/[locale]/workspace/classes` (class list, children, worksheets, class link with QR code, results by child and by level, the example dashboard for accounts without a plan).
- **9.4** the texts in 11 languages with two native reviewers (about 140 corrections, six of them faults in the English source); the daily deletion job (scheduled on the server); class rows out of every database copy older than 35 days; the dark deploy with a check of the real database.
- **Checks:** `node scripts/class-results/tests/all.js` (rules 150, 37 planted faults, retention 23, texts ×11, three robots each also poisoned); on the server `live-db-check.js` 24 of 24; `tests/live-dark.js`; identity snapshot unchanged before and after.
- **The screen lookup, as measured:** commit `cc0b953a4` made the lookup read the page itself and named a wrong example (a page the old lookup already refused). Measuring all 172,996 published pages afterwards showed the rule and the page disagree on exactly 143 pages (one print-only rhyming-words face on addresses the site's code reader cannot read). The change repairs those; it must be deployed before the switch is set.
- **Launch waits for the operator** (§9 of the working record): the lawyer's check of `legal/`, the data-centre country from the Hetzner account (evidence points to Helsinki), company details, then the switch and a live walk with a subscriber account.
- **Release 2** (activities, skill view, next steps) follows Parts 1 and 2, as ruled.
- Use from now on: before and after every deploy of this programme, `node scripts/seo/identity-snapshot.js --compare=docs/SEO/daily-system-baseline/baseline.json`; exit 3 (unmeasured) is not a pass.

**Part 1 — the content graph: BUILT 2026-11-11. Record: `graph/README.md`; what it measured: `graph/FINDINGS.md`; what each language has: `graph/COVERAGE.md`.**
- `frontend/content/teaching-graph/`: 306 teaching points (the 303 of the coverage map plus story writing, two-step word problems and secret codes), each with one of eight subjects, one strand key of `strand-names.ts`, a teaching order and prerequisites; all 1,190 worksheet types under a point (193 placed for the graph); 61 tools → the points they model; an asset index per language generated from the published catalogue (172,996 pages, each looked into for a Check button), the landings, the makers and the activity manifests.
- **Review (rule #2):** the teaching order and the prerequisites of mathematics, literacy and thinking skills were authored by two teacher-reviewers and pass the builder's checks (no unknown id, no prerequisite of a higher grade or later in the order, no cycle); a third reviewer audited the tool table and changed 24 of 61 tools (several I had matched by name alone). Their notes on the points themselves are in `graph/REVIEW-NOTES.md`.
- **Gates:** `node scripts/teaching-graph/gates.js` passes; `--poison` plants 20 faults, all caught; wired into `deploy.sh` as a warning. `build-assets.js --check` proves the committed index is the build of the pulled table.
- **For the next parts:** literacy grade 3 holds four points (no grade 3 literacy year can be assembled); about 370 types per language exist only as maker templates; 23,949 pages with a unit in their address are in no Level Set on the live site, which needs a decision per family (`graph/FINDINGS.md` §3).
- No public surface, nothing deployed for this part beyond the warning line in `deploy.sh` (it rides with the next deploy).

**Part 2 — the national curriculum registry: BUILT 2026-11-11. Record: `curricula/README.md`; numbers: `curricula/STATUS.md` (generated); what each reviewer said: `curricula/REVIEW-NOTES.<registry>.md`.**
- `frontend/content/curricula/<registry>/`: fifteen registries — the eleven markets plus Texas, Bavaria, North Rhine-Westphalia and Saxony (the state layers ruled in §11) — 7,960 official objectives in all, each with its wording as the source prints it, its year or band and the citation of its document; a crosswalk from each of the 306 teaching points to the objectives it teaches, prepares or extends, with the reviewer's reason, or the reason it has no counterpart. Preschool stages are in for Brazil, Mexico and France (maternelle from 4); the Netherlands' kerndoelen name no group.
- **Nothing is written from memory.** Every registry is read by a script from the publisher's own document or service (`scripts/curricula/build-<registry>.js`), with checks of its own (a count against the document, a second reading, numbering without gaps). Where a reviewer expected something from memory that the source does not print, the source was read again and the registry kept what is in force (Norway's plans of 2026, Denmark's billedkunst after 3. klassetrin, Italy's and Mexico's own misprints).
- **Review (rule #2):** 25 reviewer runs, never more than two at a time: each crosswalk was authored by one to three teacher-reviewers of that country from the official wording, then sampled by the builder (`own-audit` files: points whose home lay in another reviewer's part). **The reviewers also found three registries read wrongly** — France lacked 194 objectives, Mexico had 15 garbled wordings and merged processes, Finland a repeated heading. The readers were repaired, the reviewers' rows carried over by wording, and France read a second time by one reviewer per repair. `curricula/README.md` has the section on what that changed in the method.
- **Gates:** `node scripts/curricula/gates.js` (C1 sources, C2 nodes, C3 every point crossed, C4 rows true to their nodes, C5 where a row comes from, C6 how each framework is shown, C7 every row can be shown without an invented id); `--poison` plants 15 faults, all caught; in `deploy.sh` as a warning until a public page shows an objective.
- **Strand names (item 3):** eight names the registries proved wrong are corrected on everything a visitor sees and in JSON-LD (`strandLabel`, `frontend/lib/seo/strand-names.ts`): es Science, Social Studies, Reading: Foundational Skills; fr Social Studies; nl Science, Measurement & Data, Fractions; da and it Measurement & Data. The meta descriptions of indexed `/standards` pages keep the old wording, so no title or description of an existing page changes.
- **What the registries say about the catalogue (read before Parts 4 and 6 in each market):** every country places some skills in other years than the worksheets (clock reading: Brazil 3º ano, Mexico 3°, France CE1; fractions: Norway after year 5, Brazil 4º–5º ano, Italy's wording only for classe quinta); English-shaped literacy content needs a native counterpart, not a translation (digraphs sh/ch/th, a/an, spelling rules, sight words); each reviewer listed content its teachers will look for that no teaching point covers (Italian doppie and accento, Finnish long and short sounds, Dutch clock reading "half vier", Mexico's Fase 4 text types). These notes are the input of each market's unit list.
- **Limits, stated in the README:** Denmark's binding goals are few and broad (56 nodes); the Dutch kerndoelen place nothing in a group; Sweden and Finland state content for bands of years; Italy's 2012 text is being replaced class by class from 2026/27; France's science programme of 2026 is a scan and the 2020 text stands in; no registry holds physical education, music or a foreign language.
- No public surface. Nothing deployed for this part beyond the warning line in `deploy.sh`.

**Part 3 — shared delivery and the format pilots: BUILT and LIVE behind noindex, 2026-11-11. Record: `PART-3-DESIGN.md`.**
- **Units** are assembled from the content graph and the curriculum registry (`scripts/units/assemble.js`): a lesson is one teaching point; its worksheets at three levels, the tool, the activity or the page that checks answers, the check-up page, the maker and the national objective are filled from the registries; the only prose is the teacher note of the teaching point (`frontend/content/units/points/<loc>.json`). **Sub packs** are a day of review with a guest teacher's script per teaching point (`scripts/sub-plans/assemble.js`).
- **Pages** `/[locale]/units/[slug]` and `/[locale]/sub-plans/[slug]`: the same page for everyone, `noindex, follow` while a unit or pack is a pilot, in no sitemap, hreflang only between live siblings; nginx hub-cache covers both prefixes.
- **Teacher-only files** are outside everything nginx serves and are read from disk by `GET /api/quota/dl?kind=teacher` for a subscriber only (everybody else, crawlers included, gets the sign-up or pricing redirect); they never touch the free caps (`lib/quota.ts` unchanged). **The whole unit in one file** is joined in the teacher's browser with the makers' pdf-lib build: no new dependency, no merged copy on the server. **Save to My Collections** uses the existing collections model.
- **Pilots (English):** `/en/units/addition-and-subtraction-within-10-grade-1-unit`, `/en/units/hearing-sounds-in-words-kindergarten-unit`, `/en/sub-plans/first-grade-sub-plans-day-of-review`, with a teacher guide (10 and 8 pages) and guest teacher pages (9 pages).
- **Review (rule #2):** one American K-1 teacher read every note, script and string beside each worksheet's printed instruction: 54 findings, all applied at the source. They changed the system, not only the texts (`PART-3-DESIGN.md` §7): notes are written from the page's instruction; a standard of another grade reads "Reviews" or "Later grade"; three rows of the US crosswalk were corrected in the registry; scripts have a layer per worksheet type; a reading block needs a page with text; a first-grade day of seat work is about 145 minutes; the guest teacher's forms gained the class list, attendance, the behavior plan, who gets the easier page and a dismissal list by child. My own reading: every page at 360, 768 and 1024 and every PDF.
- **Gates:** `scripts/units/gates.js` (HARD in `deploy.sh`, 14 poisons), `assemble.js --check` for both, `check-live.js` (295 addresses answer), `shots.js` (overflow, text size, tap targets), `live-check.js` (40 checks after the deploy: 200, noindex, absent from every sitemap shard, the gate for an anonymous visitor, malformed file names, the folder not reachable by address). `deploy.sh` now also runs the curriculum gate (warn) and the identity comparison after the flip.
- **Deploy 2026-11-11 (commit `239efff28`):** smoke tests passed, payment canary OK, **identity PASS: 287 pages and 11 shards unchanged** (before the deploy from the PC, after it on the server); class results still switched off (`live-dark.js`, including the step that had been skipped). The first run stopped at a gate before the build and nothing went live: the Level Set pathway gate reads `strand-names.ts` as text and took my new corrections table for rows of `STRAND_NAMES`; the table moved to a file of its own. Lesson recorded in memory: run every hard gate of `deploy.sh` on the PC before a deploy.
- **Not verified by me: what a subscriber gets** (the guide PDF through the gate, the joined unit file, the saved collection). It needs a signed-in browser with the plan; the anonymous side of each is verified live.
- **The operator's ruling this part asks for:** the unit format and the sub pack format, on the three pilot pages and their PDFs. Under the standing delegation the next parts build on these formats; a change of format later costs every unit.
- **Open, found on the way:** the Level Set pathway gate fails on the PC on "picture-tracing is placed nowhere" (`content/level-set-pathways/sequence.json`; not measured on the server, older than this programme); printed en pages with British forms are on the list of post-launch content fixes.

**Part 9 release 2 (9.5 and 9.6) — BUILT 2026-11-11, behind the same switch (off). Record: `PART-9-DESIGN.md` §11 and §12.**
- **9.5 An activity as an assignment.** A teacher pastes an activity address; a child plays seven tasks in class mode (the site's header and footer covered, one button back under the activity); one report through the same rules as a worksheet. No line of the activity shell or of any activity changed; no new table.
- **The finding that changed 9.5:** the plan's "emitter in the shell" already exists, but **167 of the 203 activities judge a try themselves** and tell the shell only about a solved task. Marks read from the shell would be 7 of 7 for every child. Decided: a mark is never invented. A sitting carries marks only when the tries of every task are known (the shell judged a real press, or the activity said its own tries: `api.track('task:try', { ok })`); otherwise it is "Finished", no number. Today 36 activities give marks. **Part 10:** every new activity follows the contract from its first day; the 167 are retrofitted when each is next touched.
- **9.6 Results by curriculum.** A second tab: the class's work under the headings of the country's own curriculum (15 registries; Texas and three German Länder selectable), who had many or some wrong, and the next step (the Level Set, an activity, the classroom tool, the unit lesson), offered only when it exists in the class's language and the class does not have it. Two print documents (the browser saves a PDF; no new dependency): the class overview, and one page per child for parents that names no other child.
- **The skill index** (`frontend/content/class-skills/<registry>.json`, 15 generated files): page type → teaching point → the point's first "teaches" row → heading as `show.js` allows it to be shown. `build-skill-index.js --check` is a warning in `deploy.sh` and becomes a hard gate at the switch.
- **Checks:** rules 209, 55 planted faults all caught; four robots (the reporter, the class page, the teacher screen, an activity through a class link), each also poisoned; `node scripts/class-results/tests/all.js` passes. One native reviewer over the 24 new and changed texts ×11 (findings in `PART-9-DESIGN.md` §12).
- **Not deployed yet** (it rides the next deploy; every route answers 404 while the switch is off, `tests/live-dark.js` now probes 12). **Not verified:** the activity page as Next renders it with the switch on.
- **Still the operator's:** the launch checklist of `PART-9-DESIGN.md` §9 (lawyer, data-centre country, company details, the switch).

**Part 4 (4.1–4.4) — the English units, year plans and hub: BUILT 2026-11-11. Record: `PART-4-DESIGN.md`; what the units lack: `units/GAPS.en.md` (generated).**
- **36 units, 200 lessons, 7 year plans, one hub**, English, all `live`: Kindergarten to Grade 3 math (25 units, 137 lessons) and literacy (11 units, 63 lessons). A unit takes one to three weeks; the units of one grade and subject fill 5 to 10 weeks, and every year plan says that they do not fill a school year.
- **How a unit is made** (`PART-4-DESIGN.md` §2): the working sheet of every teaching point beside what its worksheets print; the unit list by hand; teacher notes written per teaching point from the page's printed instruction (`scripts/units/notes/`); `assemble.js`; `gates.js` (P1–P7, 23 poisons); `check-live.js` (every address a unit links to answers on the live site); my own reading.
- **Review (rule #2):** three reviewer runs, never more than two at a time, each an American teacher over one text file, each reading every lesson: math K–1, math 2–3, literacy K–3. About 260 findings; **280 note texts corrected**, 25 rows of the US registry corrected through the registry's review path, units restructured, retitled and reordered. A fourth run read the hub, the year plans and the strings of the new pages (about 70 findings, all but two applied; `PART-4-DESIGN.md` §7). What the reviews changed in the method is in `PART-4-DESIGN.md` §3–§5 (a note is written from the page and its numbers are checked in the generator; a note's mistake must be one the child can make on that page; a lesson needs two real assets).
- **Pages** (`PART-4-DESIGN.md` §6): `/en/units` (hub), `/en/units/<plan>` (seven "… Scope and Sequence" pages), `/en/units/<unit>` (now with the hub in the breadcrumb, its place in the plan and the units before and after). The printable plan is a Teacher-only file. Sitemap shard 3 lists 44 new addresses. An "In a lesson plan" block on 197 worksheet landings and 102 activity pages links to the unit and lesson; a landing in no unit is byte-identical, every `<head>` untouched.
- **Titles lead with the words teachers search** (Part 0 harvest): "<Grade> <Math|Reading and Writing> Lesson Plans: <unit>" and "<Grade> <Subject> Scope and Sequence with Pacing Guide (N Weeks)". A plan's page title and description carry its weeks and "not a full year", filled in by the assembler: to an American teacher "scope and sequence" means the whole year, and a search result has no room for the line on the page that says otherwise.
- **Decided here (standing delegation):** the English units went live after the reviews were applied; no "Lesson plans" entry in the site navigation yet (it is baked into every deck page; it comes when that menu has more than one item); `scripts/curricula/gates.js` is HARD in `deploy.sh` from now on (a public page shows national objectives).
- **Measurement stop:** Search Console read for the hub, the plans, the units and the pages that gained a block: **2026-12-09**. Per §5 rule 12 two more markets (de, sv) are built before that date; the other eight wait for the read.
- **Known limits:** Grade 3 literacy is one unit; topics a US teacher expects and the site has no page for are listed in `PART-4-DESIGN.md` §5 (letter sounds as a lesson, long vowels and silent e, contractions, adverbs, suffixes, an informational text to read); 14 lessons have no screen practice, 35 wait for a planned activity, 108 have no classroom tool (`units/GAPS.en.md`).
- **Deploy 2026-11-11 (commit `b6b18feba`):** 44 Teacher-only files uploaded first (42 MB; `upload-teacher-files.sh en --check` agrees); smoke tests passed, payment canary OK; `live-check.js` **503 checks pass** (every unit, plan and the hub: 200, own title, one h1, self canonical, indexable and in the sitemap; the gate answers a visitor with the sign-up redirect for all 44 files; the hub links every unit and plan; one landing and one activity link to their unit; a language without units has no hub); `check-live.js` 3,610 addresses of the units answer; **identity PASS: 287 pages unchanged, shard 3 grew 4,806 → 4,850**; class results still switched off (`live-dark.js`). This deploy also carried Part 9 release 2 (dark).
- **Not verified by me:** what a subscriber gets (the 44 PDFs through the gate, the joined unit file); it needs a signed-in browser with the plan.

**Part 4.5 — the German units: BUILT and LIVE 2026-11-11. Record: `PART-4-DESIGN.md` §8.**
- **24 units, 138 lessons, 5 plans, hub `/de/units`**, all `live`: Mathe Klasse 1 (5 units, 7 weeks), Klasse 2 (5, 10), Klasse 3 (6, 9); Deutsch Klasse 1 (3, 4), Klasse 2 (4, 6), Klasse 3 (1 unit, no plan).
- **Made from the English lessons, re-sequenced for Germany, written in German.** The unit list follows the registries of Bavaria, North Rhine-Westphalia and Saxony (`scripts/units/lists/build-de-defs.js`); the 139 teacher notes were written from what the German pages print (`scripts/units/author-sheet.js`), in the "du" form the German site uses (`notes/de-address.js`, a deploy gate).
- **Review (rule #2):** two reviewers at once (Grundschullehrerin and Fachleitung Mathematik; Grundschullehrerin and Fachleitung Deutsch), every lesson read: about 200 findings, 174 note texts corrected, the units restructured (the numbers to 100 are Klasse 2 in Germany, not Klasse 1; syllables before the syllable carpet; core tables first), the plans renamed ("Stoffverteilungsplan" is the whole year; now "Mathe Klasse 1: Stoffverteilung für 7 Wochen").
- **Tools that stay for every further language:** `placement-sheet.js` (a country's teacher places every lesson in a school year BEFORE notes are written: the German lesson), `author-sheet.js`, `notes/rewrite.js` takes its language from the corrections file's name, `dump-hub-for-review.js`, `build-guide.js` names a framework without codes by its heading.
- **Deploy 2026-11-11 (commit `3aeb303ad`):** 29 Teacher-only files uploaded for de; `live-check.js --loc=de` **339 checks pass**; `check-live.js --loc=de` 2,683 addresses answer. Two runs stopped at a gate before the build (the old release kept serving): the first because the skill-index check needs esbuild, which the server lacks (now a PC check), the second because `git pull` had rewritten `deploy.sh` under the running shell; the third ran clean (smoke tests, payment canary OK). After it: `live-check.js --loc=en` 503 checks pass (the English pages are unchanged), the identity snapshot reads "IDENTITY PASS — 287 pages and 11 shards unchanged" with sitemap shard 3 grown from 4806 to 4880 addresses, and `class-results/tests/live-dark.js` confirms the class-results feature is still switched off.
- **Confirmed content defect, not fixed here:** the German page G3-309 is titled "Aufteilen" and asks for Verteilen. It needs an in-place republish of its German decks and is recorded with the other printed-wording findings of both reviewers for the deck-fix session; the unit's lesson warns the teacher.
- **Known limits:** `1:skip-counting` left the German units; eight lessons lost their practice on screen (the activity named another number range, Klasse or topic); no fractions unit; the year before school (Vorschule) has no unit in this wave.

**Part 4.6 — the Swedish units: BUILT and LIVE 2026-11-11. Record: `PART-4-DESIGN.md` §9.**
- **34 arbetsområden, 191 lessons, 6 plans, hub `/sv/units`**, all `live`: matematik förskoleklass (5 units, 7 weeks), åk 1 (6, 8), åk 2 (6, 9), åk 3 (7, 10); svenska förskoleklass (3, 4), åk 1 (2 units, no plan), åk 2 (3, 5), åk 3 (2 units, no plan).
- **Placed before written.** A Swedish teacher (reviewer agent) gave each of the 200 English lessons its Swedish school year, order and arbetsområde on the placement sheet (`scripts/units/lists/sv-placement.txt`); `build-sv-defs.js` wrote `defs/sv.json` from it. US Kindergarten is not förskoleklass, the number range runs a year later (0–20, 0–100, 0–1000), multiplication starts in åk 2. Seven lessons are in no Swedish unit and two wait for a Swedish activity.
- **193 teacher notes written in Swedish** from what the Swedish pages print; "du"; barnen in förskoleklass, eleverna from åk 1.
- **Review (rule #2):** two reviewers at once (each a Swedish lågstadielärare), every lesson read: 44 texts in 39 lessons and 2 page strings corrected; six activities taken out of lessons they did not fit; about 60 printed Swedish worksheet wordings listed for the content-fix session (`units/TEACHER-FINDINGS.sv.md`).
- **Names:** arbetsområde, lärarkommentar, lärarhandledning; a plan is "Matematik åk 2: planering för 9 veckor" and never an "årsplanering" (`WHOLE_YEAR.sv`).
- **Tools that stay:** `apply-page-corrections.js` (a reviewer's corrections to page strings and unit names), the Swedish activity name without its year in `assemble.js`, the printable plan without an empty standards column (German plans rebuilt and uploaded too).
- **Deploy 2026-11-11 (commit `697ce6a86`):** 40 Teacher-only files uploaded for sv, 29 again for de; the deploy ran clean at the first run; `live-check.js --loc=sv` **460 checks pass**; `check-live.js --loc=sv` 3,404 addresses asked, two 404 found BEFORE the deploy (two Swedish activities that are committed and not yet published) and taken out of their lessons; identity snapshot "IDENTITY PASS — 287 pages and 11 shards unchanged", sitemap shard 3 from 4880 to 4921 addresses; `live-dark.js`: the class-results feature is switched off and nothing else changed.
- **Known limits:** two åk 3 time lessons (time spans; adding and subtracting time) wait for their Swedish clock activity; 16 lessons have no practice on screen; åk 1 and åk 3 svenska have two units each and no plan; the Swedish teacher's list of what each year lacks (addition and subtraction 11–20, letter-by-letter work in åk 1, mental strategies 0–100, the tables beyond 2 and 5, text types and reading comprehension) is in `units/TEACHER-FINDINGS.sv.md` (a).
- **NEXT:** per §5 rule 12 no further language before the Search Console read of 2026-12-09; Parts 5, 6, 7, 8 follow.

**Part 5.1 — sub packs, English (US), Kindergarten and Grade 1: BUILT and LIVE 2026-11-11. Record: `PART-5-DESIGN.md`.**
- **12 packs** (per grade: start, middle and end of the year, two different days each), 95 blocks, hub `/en/sub-plans`, 12 guest-teacher PDFs (9–10 pages). "Two themes" of the plan became two days: two pages that differ by a picture theme would be near copies.
- **Review only, by time of year:** a block takes a point of an earlier grade, a point with no place in the year, or a point whose unit has ended by the pack's time of year in the grade's plan (`scripts/sub-plans/position.js`; assembler and gate P8 with poisons). A page is handed out once per grade.
- **Scripts** for 69 teaching points, written from the printed directions, then checked against pictures of all 96 worksheets (about 40 corrected), then read by one reviewer as a K–1 teacher and as a guest teacher: 13 scripts and 11 strings corrected, four packs restructured (no letter-name or alphabet-order page in the first weeks of Kindergarten; no puzzle a guest teacher cannot explain).
- **The guest teacher pages** say that the blocks do not fill the day and carry a list for the time between blocks; hand-out wording matches what each block has; the class sheets ask who may pick up each child.
- **Deploy (commit `d3a50e24c`):** 55 Teacher-only files for en (43 units and plans, 12 packs); the deploy ran clean; `live-check.js --loc=en` **632 checks pass** (the check now waits out an HTTP 429 instead of counting it); identity snapshot PASS, sitemap shard 3 from 4921 to 4934 addresses; `live-dark.js` OK.
- **Known limits:** no answer key (the scripts name the picture words of the sound pages instead); British wording printed on five English worksheets is recorded for the content-fix session.
- **Part 5.2 followed** (entry below).

**Part 5.2 — sub packs, English (US), Grade 2 and Grade 3: BUILT and LIVE 2026-11-11. Record: `PART-5-DESIGN.md` §2–§3.**
- **12 more packs** (96 blocks); the English set is 24 packs, 105–130 minutes of seat work each in Grades 2–3. Scripts for 60 more teaching points and worksheet types, written from the page pictures, checked against the printed text of each worksheet (PDF text), with reference answers for the guest teacher wherever a page has checkable answers.
- **New in the builder:** a harder page as the page for everyone (`level: 'hard'`; Grade 3 reads the Grade 2 story types at their harder level, with inference questions and a written answer); a printed title that is not the type's; **no holiday page in any pack** (assembler, gate P8 with a poison; three pages of the live Grade 1 packs changed); Grade 2–3 wording of the guest teacher pages (ui keys ending in `_23`).
- **Two review passes (rule #2), one reviewer each, as a Grade 2–3 teacher and as a guest teacher.** First pass: 24 scripts and 1 string corrected, all reference answers verified, 18 structural findings, after which the days were reworked: no × or ÷ before Grade 3, real reading in the middle of Grade 2, regrouping at the start of Grade 3, the end of Grade 3 raised, the planets page out, minutes cut to what the pages take. Second pass on the reworked days: 13 scripts corrected, seven blocks shortened, no blocking finding.
- **A tool fault found before the commit:** `apply-review.js --new` replaced the own script of a point that lives in the scripts file (a live Grade 1 pack uses it); repaired, the tool fixed, and every live script part compared with the committed file (0 differences).
- **Deploy (commit `23b946c65`):** 67 Teacher-only files for en (43 units and plans, 24 packs); the deploy ran clean; `live-check.js --loc=en` **764 checks pass**; identity snapshot PASS, sitemap shard 3 at 4946 addresses (+12); `live-dark.js` OK.
- **Known limits:** puzzles the guest teacher cannot check without a solved picture (find the differences, sudoku, grid pictures, number mazes); neither mid-year Grade 2 day has a story (the review rule refuses story questions before the plan's last unit); the literacy catalogue above Grade 2 is thin; the printed defects the reviewers found on about 25 English worksheets are recorded for the content-fix session.
- **Measurement:** `PART-5-DESIGN.md` §3; Search Console read 2026-12-09 together with the units.
- **Part 5.3 followed** (entry below).

**Part 5.3 — sub packs, German: 18 single substitute lessons. BUILT and LIVE 2026-11-11. Record: `PART-5-DESIGN.md` §4.**
- **The form follows the market:** one 45-minute lesson per pack ("Vertretungsstunde Mathe Klasse 2: Schuljahresanfang"), Klasse 1–3 × Mathe and Deutsch × start, middle and end of the school year, four blocks each (72 blocks), hub `/de/sub-plans` ("Vertretungsstunden für die Grundschule"), 18 PDFs for the covering teacher on A4 (8 pages each).
- **In the builder:** a teaching point is placed by the language's own units (the school year in which the German units teach it), not by the grade in its id; `packShape` knows a day and a lesson (assembler and gate P4); German holiday words; `ui.de.json` with exactly the English keys. English packs unchanged (`assemble.js --loc=en --check`).
- **Pages:** all 72 read as pictures and as printed PDF text before a script was written; four refused for ambiguous or unsuitable pictures; every picture page is named aloud together first.
- **Two review passes by one German primary teacher (rule #2):** 32 scripts and 2 strings corrected, every answer checked (clock hands and strings from the PDF vector data), six "must" findings, five lessons rebuilt: the start-of-year lessons had taken content the class has not met (numbers to 100 at the start of Klasse 2; three-digit numbers and written addition at the start of Klasse 3; word classes at the start of Klasse 2; six capital letters in the first school weeks). Second pass: no "must" left.
- **Deploy (commit `7c43ac598`):** 47 Teacher-only files for de (29 units and plans, 18 lessons); the deploy ran clean; `live-check.js --loc=de` **544 checks pass**, `--loc=en` 764; identity snapshot PASS, sitemap shard 3 at 4965 addresses (+19); `live-dark.js` OK.
- **Known limits:** the German plans the review rule reads are short, and the reviewer's judgement of the start of a school year was stricter than the rule; about 25 printed defects on German worksheets are recorded for the content-fix session; Klasse 3 Deutsch reads Klasse 2 stories at their harder level.
- **Part 5 stops here until the Search Console read of 2026-12-09:** Swedish gets no indexable pack pages (the harvest found no search words); French, Spanish, Portuguese and Italian packs need the units of their language first (rule 12).
- **Part 6.1 followed** (entry below).

**Part 6.1 — standards checklists, English (US): BUILT 2026-11-11. Record: `PART-6-DESIGN.md`.**
- **12 pages and a hub** (`/en/curriculum`): Common Core Math K–3, Common Core ELA K–1, TEKS Math K–3, TEKS ELAR 1–2. Each lists the official codes of one grade and subject in the document's order, with our own description, the lessons and the worksheets; codes with nothing are listed as not covered. Never the official wording; the hub says the checklists were not written or approved by the publishers.
- **Generated** from the registry, the live units and the content graph (`scripts/curriculum-pages/`), gates Q1–Q7 with 10 poisons in `deploy.sh`.
- **Review (rule #2):** one reviewer as an American K–3 teacher ruled on 84 of 338 lines (11 drop, 16 prepares, 6 extends, 51 describe). The claim rulings were applied in the registry (51 point rows), so the unit pages, the "by curriculum" tab of the class results and the teacher guide PDFs were corrected with the checklists. Two of the 14 first pages fell below the 15-objective minimum and were taken out; the minimum was not moved.
- **Links:** standard chips on the unit pages link to their line on the checklist; the units hub links to the checklist hub; the checklists link to the per-code pages `/en/standards/<code>`, which keep their addresses and content (gate Q7 keeps the two page types apart).
- **NEXT in Part 6:** the open coverage document per grade, the "For schools" page with a quote request (ruling 6), then German (KMK and the three state layers).
