# SEO Audit — Part 3: On-Page SEO & Structured Data

**Date:** 2026-05-30
**Site:** LessonCraftStudio — 11 locales, Next.js 14 SSR + nginx-served static deck.html. 8 public page types.
**Method:** Read-only. Two senior-SEO expert agents (structured-data/rich-results · on-page metadata/headings) read code + curl-measured live values; headline findings re-verified directly. Zero changes.
**Part of:** the 6-part exhaustive SEO audit. Resolves the P2-16 handoff (DE level-mapping).

---

## 1. State of the world (what's working)

On-page fundamentals are mostly solid:

- **Headings: clean across the board.** Exactly one `<h1>` on every page type; deck.html = h1=1 + h2=2 (the §17.8.17 invariant-7 celebration-h1→h2 fix is confirmed live). No multi-h1 or zero-h1 page found.
- **JSON-LD validity: 100%.** Every server-rendered JSON-LD block across all page types parses as valid JSON — no trailing commas, no escaping bugs.
- **Topic pages are exemplary.** Single-axis and intersection both carry `CollectionPage` + `ItemList` (`hasPart`, `numberOfItems`, position-indexed) + `FAQPage` + a `BreadcrumbList` that **exactly mirrors the visible breadcrumb** (Google penalizes mismatch — there is none here). Breadcrumb rich-result eligible.
- **Deck `ImageObject` is complete** (`url`+`contentUrl`+`width:1200`+`height:630`+`caption` + separate `thumbnailUrl`) → image rich-result eligible.
- **Titles + descriptions present and non-empty on every page type**, each with a self-referencing canonical, and **every sampled meta description sits in the 120-170 band**.
- **No accidental noindex** on any public page type.

The defects are concentrated in: a DE i18n data inversion, two page types with structurally weak/absent structured data (standards, worksheets-hub), missing breadcrumb markup on three page types, and a handful of title/OG polish items.

### Live measurements (curl, 2026-05-30)

| Page type | title len | desc len | desc in-band | h1 | OG tags | TW tags | canonical |
|---|---|---|---|---|---|---|---|
| Homepage /en | 55 | 150 | ✓ | 1 | 12 | 4 | self |
| Homepage /de | **91** | 158 | ✓ | 1 | 12 | 4 | self |
| Worksheets hub | 61 | 138 | ✓ | 1 | 12 | 4 | self |
| Topic 1-axis | 39-44 | 136-151 | ✓ | 1 | 12 | 4 | self |
| Topic 2-axis | 53 | 122 | ✓ | 1 | 11* | 4 | self |
| Activity | 65 | 135 | ✓ | 1 | 12 | 4 | self |
| Tool | **71** | 153 | ✓ | 1 | 12 | 4 | self |
| Standards | 78 | 168 | ✓ | 1 | 11* | 4 | self |
| Deck (en) | 67 | 145 | ✓ | 1 (+h2×2) | 12 | 5 | self |
| Deck (de) | **25** | 136 | ✓ | 1 (+h2×2) | 12 | 5 | self |

\* og=11 on pages with no other-locale siblings is correct (honest hreflang — `og:locale:alternate` legitimately absent).

---

## 2. Findings (ranked)

### 🟠 HIGH

**P3-01 — DE `seo.educational_level` preschool↔kindergarten term SWAP.** *(Effort: S fix + M retrofit) — resolves Part 2 P2-16*
Confirmed in source: `frontend/messages/de.json` `seo.educational_level` = `{"preschool":"Kindergarten","kindergarten":"Vorschule",…}` — **literally inverted**. (`en.json` and the other 9 locales are correct per the §17.4.3 matrix.) Live `/de/decks/picture-path/` (`typicalAgeRange:5-7`) renders `<title> … — Vorschule` while its own JSON-LD says `educationalLevel:"Kindergarten"` (correct). So Google receives a **correct level signal in JSON-LD but a contradicting level word in the title/meta/snippet** — and the deck also disagrees with its linked topic page (whose DE slugs `vorschule`/`kindergarten` are correct). Scope: every DE deck at age 3-5 or 5-7 (~3,000; kindergarten dominates the corpus). The title/meta term is wrong; `educationalLevel`/`typicalAgeRange` are right.
**Fix:** swap the two values in `de.json` (single source of truth), then retrofit the static DE deck.html titles/meta via the existing `republish-seo` path.

**P3-02 — Standards page LearningResource + AlignmentObject not server-rendered.** *(Effort: S)*
Confirmed: a live `/en/standards/1.NBT.B.2` fetch contains only `FAQPage` as a real SSR `<script type="application/ld+json">`. The `LearningResource` + `educationalAlignment`/`AlignmentObject` — the entire purpose of a standards page — is emitted via `next/script strategy="afterInteractive"`, so on the raw HTML / initial Rich-Results fetch it isn't a real JSON-LD element. Crawlers that don't render JS, and the Rich Results Test's initial fetch, see no alignment markup.
**Fix:** emit it as a plain SSR `<script type="application/ld+json">` (the deck/topic pattern) in `standards/[code]/page.tsx`.

**P3-03 — Tool `<title>` double-brands.** *(Effort: S) — confirms Part 2 P2-07*
All 33 tool URLs render `… | LessonCraftStudio · LessonCraftStudio`: the `tool-content` `metaTitle` already ends `| LessonCraftStudio`, then the root template (`layout.tsx` `%s · LessonCraftStudio`) appends again. Fix: drop the suffix from the metaTitle source, or use `title.absolute` to bypass the template (`tools/[tool]/page.tsx:68`).

**P3-04 — DE homepage `<title>` = 91 chars.** *(Effort: S)*
Pixel-truncates in the SERP. Trim head copy to ≤60 chars before the brand suffix; audit the other long-locale homepages (de/fr/it/pt/fi tend to run long) for the same.

### 🟡 MEDIUM

**P3-05 — Worksheets hub has zero JSON-LD.** *(Effort: M)* A catalog hub full of topic links returns "no items detected" in the Rich Results Test. Add `CollectionPage` + `BreadcrumbList` (and ideally `ItemList`). `worksheets/page.tsx`.

**P3-06 — Missing BreadcrumbList on activity / tool / standards.** *(Effort: S each)* All three render a *visible* breadcrumb but emit no `BreadcrumbList` markup → not breadcrumb-rich-result eligible. Reuse `frontend/lib/seo/breadcrumb-schema.ts buildBreadcrumbSchema` (already used by topic pages).

**P3-07 — `twitter:image:alt` missing on all 5 SSR page types.** *(Effort: S)* They emit only 4 twitter tags (card/title/description/image); decks emit 5. Caused by passing `images:[string]` instead of the object form in the twitter metadata block (e.g. `activities/[slug]:189`, `tools/[tool]:95`, `topic/[slug]:283`).

**P3-08 — Romance/FR topic-title casing + elision.** *(Effort: M)* "Fiches de Addition" (should elide to "Fiches d'Addition"), "Hojas de trabajo de Suma" (should be lowercase "suma"), "Schede di Addizione". Topic titles come from a separate `topicPage.meta.title` ICU template that applies raw `capFirst` (`topic/[slug]:225,256`), bypassing the `composeTitle` sentenceCase + `ofTypeElision` that deck titles use. Port the same casing/elision logic to topic titles.

**P3-09 — FAQPage boilerplate (monitor, don't expand).** *(Effort: monitor)* An identical 3-question templated set ("what teaches / is it free / who for") repeats across every activity, standards, and topic page. Google restricted FAQ rich results to authoritative gov/health sites (Aug 2023), so an EdTech catalog will essentially never win FAQ rich results, and the repetition carries mild scaled-content risk. Keep it (it aids entity understanding and is harmless) but don't build further reliance; consider diversifying the question set.

**P3-10 — Under-optimized themeless deck titles.** *(Effort: M)* `/de/decks/sudoku/` = 25 chars vs the 50-70 budget. `composeTitle` collapses short for themeless + no-variant decks across locales — an under-used keyword surface. Consider padding with a localized descriptor (e.g. exercise-type phrase + level) when theme is absent.

### 🟢 LOW / INFO

- **P3-11** — Decks have `datePublished` but no `dateModified` (freshness signal absent, despite multiple retrofits). *(LOW/S)*
- **P3-12** — `Organization.sameAs:[]` empty (no social/authority links) + `WebSite` has no `SearchAction` (not sitelinks-searchbox eligible). Populate `sameAs` when profiles exist. *(LOW-MED/S)*
- **P3-13** — Activity/tool use the generic `og-homepage.png` as a plain string `image` (not an `ImageObject`, not per-page) → image-rich-result ineligible. *(LOW/S)*
- **P3-14** — Deck pages emit no `<meta name="robots">` (static nginx; functionally fine — in sitemap, no noindex). `og:image:secure_url` present on deck.html but absent on Next-generated SSR pages (Metadata API limitation). *(LOW)*
- **P3-15** — Deck `keywords` mix localized + English tokens ("Worksheet, interactive, free" stay English in DE). Minor cross-language inconsistency. *(LOW)*

### Tooling note
`scripts/audit-meta-lengths.js` only reads the legacy seller-era `frontend/config/app-content/en/*.ts` tree (140-165 band) — **not** the live deck/topic/activity/tool/standards surfaces. It is not a reliable guardrail for current page types; the real deck guardrail is `audit-deck-html.js` Check 15 (120-170 rendered). Treat live-curl as authoritative for these page types.

---

## 3. Scorecard

| Dimension | Status | Evidence |
|---|---|---|
| Heading structure | 🟢 | single h1 every type; deck h1+h2×2 |
| JSON-LD validity | 🟢 | all SSR blocks parse |
| Topic structured data | 🟢 | CollectionPage+ItemList+FAQ+exact-mirror Breadcrumb |
| Deck ImageObject | 🟢 | complete, image-rich-result eligible |
| Title/description length | 🟡 | DE homepage 91; tool double-brand 71; themeless decks 25 |
| OG/Twitter completeness | 🟡 | twitter:image:alt missing on SSR types |
| Rich-result eligibility | 🟡 | FAQ won't trigger (2023); breadcrumb only on topic; image only on deck |
| Cross-field consistency | 🟠 | DE level swap (title vs JSON-LD vs topic page) |
| Breadcrumb markup coverage | 🟠 | activity/tool/standards visible-but-unmarked |
| Standards structured data | 🔴 | LearningResource+AlignmentObject not SSR |
| Worksheets-hub structured data | 🔴 | none at all |

---

## 4. Remediation order

1. **🟠 P3-01** — fix the DE `seo.educational_level` swap (2-line) + republish-seo DE retrofit. *(Wrong grade level in a primary market's snippets; self-contradicting + topic-contradicting.)*
2. **🟠 P3-02** — server-render the standards LearningResource+AlignmentObject.
3. **🟠 P3-03 / P3-04** — fix tool double-brand title; trim DE (and other long-locale) homepage titles.
4. **🟡 P3-05 / P3-06** — add CollectionPage+Breadcrumb to worksheets hub; add BreadcrumbList to activity/tool/standards (reuse `buildBreadcrumbSchema`).
5. **🟡 P3-07 / P3-08** — twitter:image:alt on SSR; port casing/elision to topic titles.
6. **🟡 P3-09 / P3-10** — monitor FAQ boilerplate; pad themeless deck titles.
7. **🟢 P3-11…P3-15** — opportunistic (dateModified, Org sameAs, per-page OG, deck robots meta, keyword language).

---

## 5. Notes for the master roadmap

- **Net-new vs known:** P3-01 (DE level swap — root cause located: a 2-line i18n inversion behind ~3,000 wrong-grade DE snippets), P3-02 (standards JSON-LD not SSR), P3-05 (worksheets-hub no JSON-LD), P3-06 (breadcrumb markup gap), P3-07 (twitter:image:alt) are net-new. P3-03 confirms Part 2's P2-07.
- **Highest ROI, lowest effort:** P3-01 is a 2-line source fix with a retrofit, and it removes a self-contradiction Google can see three ways (title vs own JSON-LD vs linked topic page) in the #1 non-English market.
- **Reusable asset under-used:** `buildBreadcrumbSchema` already powers topic pages cleanly; extending it to activity/tool/standards (P3-06) is low-effort and closes the breadcrumb-eligibility gap on 3 page types at once.
- **Read-only confirmation:** no code/config/server/DB changes. Only this report was written, under `docs/audit-results/`.
