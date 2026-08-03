# SEO Audit — Part 6: Competitive & Keyword Landscape

**Date:** 2026-05-30
**Site:** LessonCraftStudio — free, multilingual (11-locale) K-3 worksheet/activity/manipulative platform.
**Method:** External research via WebSearch across en/de/es/nl/sv/fi competitor SERPs + keyword-intent + SERP-feature + discovery-channel analysis. The capstone finding (`site:` index state) re-verified directly. **No exact search volumes / rankings / backlink counts** — those require Ahrefs/SEMrush/GSC and are explicitly flagged. Zero changes.
**Part of:** the 6-part exhaustive SEO audit. **This part surfaced the single most consequential finding of the whole audit.**

---

## 1. The capstone finding (verified directly)

**The pivot is organically invisible. Google's index of lessoncraftstudio.com still reflects the OLD KDP/Etsy seller site.**

A direct `site:lessoncraftstudio.com` search returns **only seller-era pages**:
- Homepage indexed as *"LessonCraftStudio: 33 Printable Generators for KDP…"* and *"Professional Printable Generators | Create & Sell on Etsy & KDP"*
- 410-Gone `/apps/*` pages (the §17.1 teardown) **still indexed** with titles like *"Picture Crossword Generator | Create & Sell Image Crosswords"*, *"Cryptogram Puzzle Generator — Adult KDP Puzzle Books"*, *"Coloring Page Generator for Etsy & KDP Sellers"*
- *"Printable Profit Hub — Track Your Etsy & KDP Earnings"*
- Seller-era `/blog/*` (*"Worksheet Generator Comparison: LessonCraftStudio vs Competitors"*)

**Zero `/decks/`, `/topic/`, or `/activities/` URLs appear.** The entire 16,551-deck catalog + activities + tool landing pages have **no organic visibility**, and Google's entity understanding of the domain is stale — it still classifies the site as a *seller tool for KDP/Etsy publishers*, not a *K-3 educator platform*.

A secondary index-level defect is also visible: a **Norwegian title** (*"Skattejakt gratis å skrive ut | Generator sporløype online"*) is indexed on an **`/en/`** URL — a locale-leak that has reached the production index (corroborates the Part 2 locale-residue theme at the index layer).

**Why this is the #1 finding:** everything in Parts 1-5 — and every competitive opportunity below — is **moot until the new catalog is crawled and indexed.** The on-site SEO is largely well-built, but Google isn't seeing it.

**Likely causes (to confirm in GSC):**
- **Internal-linking starvation (Part 5).** The homepage exposes ~12 links (2 topic links), the footer/nav topic mesh is client-gated (0 crawlable), and decks don't link up to hubs — so the **XML sitemap is nearly the only discovery path** into 16,551 decks. Weak internal linking slows reindexing and dilutes the signal that the site's identity has changed.
- **Stale entity/brand classification.** The old seller titles still rank for the brand; Google hasn't re-evaluated the domain's topic.
- **Possibly the edge crawler policy (Part 1 P1-02)** — worth ruling out that Googlebot itself isn't impeded.

**This is a GSC-answerable question** (Coverage/Indexing report: crawled-not-indexed? discovered-not-crawled? soft-404? manual action? stale cache?). The `site:` proxy strongly indicates the catalog isn't indexed; GSC confirms the exact state and unlocks "Request indexing."

---

## 2. Competitive landscape (qualitative)

### Per-locale competitor map

| Locale | Top page-1 incumbents | Strength | Character | LCS visibility |
|---|---|---|---|---|
| **en** | K5 Learning, Superstar/Super Teacher, worksheetfun, TPT, Canva, Etsy; interactive: IXL, SplashLearn, ABCmouse, Education.com | **Saturated** | Industrial PDF mills + funded apps | seller pages only; catalog absent |
| **de** | grundschulkoenig.de, materialguru.de, lernwolf.de, kleineschule.com.de | **Moderate-High** | **Local** incumbents; Twinkl/education.com absent | none |
| **es** | edufichas.com, mundoprimaria.com, webdeldocente.com; interactive: cokitos, arbolabc | **Moderate** | **Local** fichas networks + Pinterest | none |
| **nl** | wijzeroverdebasisschool.nl, oefenboeken.nl, kleuteridee.nl, juf-* blogs, Zwijsen | **Moderate** | **Local** teacher-blogs + publisher | none |
| **sv** | brainytoon, klassklur (Weebly), skolmagi, elevspel | **Thin** | blogs/Weebly/single-teacher | none |
| **fi** | LukiMat (university), Lasten Keskus, Puuhakerho, Pinterest | **Thin** | academic/NGO + Pinterest | none |

### §19.3 thesis check
- **English brutal — CONFIRMED (stronger than stated).** Printables owned by K5/Superstar/worksheetfun; interactive owned by funded apps (IXL/SplashLearn).
- **de/es/nl "moderate" — CONFIRMED but recalibrated:** these are **local-incumbent** markets, *not* Twinkl/education.com. Beating grundschulkoenig.de is a more winnable fight; the wedge is **native-slug + interactive + 11-locale breadth**.
- **Nordic "near-empty" — OVERSTATED → "thinly defended."** Incumbents exist but are amateur/academic/Pinterest. Still the best opportunity.

### Ranked thin-competition opportunities
1. **fi** — interactive K-3 (almost no commercial player).
2. **sv** — same (blog/Weebly incumbents easily outranked).
3. **no/da** — structurally identical thin field (Tier 3/4).
4. **nl interactive decks** — printables crowded; self-correcting interactive is unfilled.
5. **de long-tail theme×level native-slug combos** — incumbents own generic printables; specific combos open.
6. **es interactive** — fichas own printables; clean curriculum-aligned interactive per theme is a gap.
- **Not near-term:** en generic head terms (years; convert via referral/embed/Pinterest instead).

### Realistic time-to-traction
- **en:** 18-36 mo generic; never head terms → use for referral/embed + international-school long-tail.
- **de:** 9-18 mo long-tail native combos.
- **es/nl:** 9-15 mo interactive + long-tail.
- **sv/fi (+no/da):** **6-12 mo** to page-1 long-tail — best risk-adjusted bet.

---

## 3. Keyword-intent vs the site taxonomy

**Aligned:** the **exercise-type** axis (addition, subtraction, wordsearch…) and **educational-level** axis (kindergarten, grade-1…) map cleanly to how teachers search (operation/skill + grade + "free/printable"). Native-slug topic pages and "Addition Worksheet — Kindergarten" titles are intent-aligned.

**Mis-aligned (the intent gap):**
1. **The theme axis (animals/vehicles/food, 100 themes) does NOT match how teachers search.** Incumbents structure URLs by **skill** and **grade+subject**, essentially never by visual theme. "Animal addition worksheets" is a real but **niche long-tail** query. The theme×type×level combinatorial inflates URL count far faster than *addressable-query* count → the structural engine behind the long-tail intersection thinness (Part 4 P4-01). *(High confidence on the pattern; per-combo demand is Ahrefs-only.)*
2. **Standard-code intent (`K.CC.4 worksheets`) is served by the activities pedagogy but not by URLs** (CC code deliberately kept out of slugs, §20.3). Defensible for non-US locales; for **EN** it cedes a real query class incumbents own via dedicated code pages. Consider an EN-only standard-code alias path.
3. **Bounded-skill phrasing (`addition to 5`, `sums to 10`, `counting to 20`) is under-exposed.** Incumbents rank precisely on these; the activities layer partially covers it — surface the phrasing in EN titles/H1s.

**Interactive vs printable:** both intents are served (playable deck + printable PDF on every page) — a genuine differentiator. But the **printable/PDF** intent is still higher-volume in all three sampled languages, so PDF discoverability must not be sacrificed to the interactive framing.

---

## 4. SERP features — which structured-data investments pay off

| Feature | State (2025-26) | Pays off here? |
|---|---|---|
| **FAQPage rich result** | Deprecated 2023 → **fully removed May 2026** | **NO** — keep the *content* (AI-citation/long-tail), drop the display expectation. Confirms Part 3 P3-09. |
| **Featured snippet** | ~0.24% of searches — near-dead | NO |
| **BreadcrumbList** | Still live | **YES** — cheap, real; ensure JSON-LD mirrors the visible trail (Part 3/5). |
| **Image pack** | Common on worksheet queries | **YES — best-paying bet.** The ImageObject + 2-image-per-deck image-sitemap stack (§17.8.19) is well-aimed. Payoff probabilistic (Google picks the image). |
| **AI Overviews** | Education 60-90% coverage; informational CTR 7.6%→1.6% | Double-edged — see below. |

**AI-Overview nuance:** the worst-hit class is **informational**; a worksheet **download/play is transactional**. An AI Overview can summarize "what is addition" but can't hand over a printable PDF or a playable deck — so the site's *core* intent is more defensible than the sector's 79%-collapse headline. The **blog/guides (§17.6) are informational and ARE in the kill-zone** — temper expectations there.

---

## 5. Discovery channels — realism

- **Pinterest — the strongest realistic near-term channel.** Confirmed top-3 education-printables driver; bypasses the domain-authority wall; pin-ready assets (og-image + thumbnail) already exist. **Elevate from "foundation" (§9) to a primary early channel.**
- **AI answer engines — currently foreclosed.** Perplexity/ChatGPT-search cite free-worksheet sources, but the edge blocks AI crawlers (Part 1 P1-02), contradicting §3.5. Low-cost to open, growing exactly as Google CTR erodes. **Reconcile + allow-list answer-engine fetchers (Perplexity especially — it sends real referral clicks).**
- **Embed-virality — compounding-LATER, not a launch driver.** Design is correct (the backlink is the visible `<a>` wrapper, not the iframe), but it's chicken-and-egg (needs traffic to earn embeds). Don't model early growth on it.
- **Honest near-term organic outlook:** months 1-2 indexed/near-zero clicks; 3-6 mo wins only on low-competition long-tail (the small non-EN locales); 6-12+ mo for moderate terms *with active link-building*. EN head/mid: years. Matches §19.3.

---

## 6. Scorecard

| Dimension | Status | Evidence |
|---|---|---|
| Competitive winnability — Nordic/long-tail | 🟢 | thin amateur/academic field |
| Keyword-intent alignment (type/level axes) | 🟢 | maps to real query patterns |
| Pinterest channel readiness | 🟢 | confirmed driver; assets exist, under-used |
| Keyword-intent alignment (theme axis) | 🟡 | not how teachers search; long-tail-only |
| SERP-feature strategy | 🟡 | image + breadcrumb pay off; FAQ dead |
| Competitive winnability — EN head | 🔴 | saturated (expected per §19.3) |
| AI-answer-engine channel | 🔴 | foreclosed by edge block |
| **Organic visibility of the pivot** | 🔴 | not indexed (P6-01) |
| **Brand/entity classification** | 🔴 | still "KDP/Etsy seller" (P6-01) |

---

## 7. Remediation order

1. **🔴 P6-01** — confirm indexation state in GSC; fix discovery (Part 5 internal linking) + request-indexing + out-rank/deprecate old seller titles. **The unlock for the entire audit.**
2. **🟠 P6-02** — reconcile §3.5 and unblock answer-engine fetchers.
3. **🟠 P6-04** — make Pinterest a primary early channel (pins from existing thumbnails).
4. **🟠 P6-03** — treat theme-permuted pages as long-tail-only; validate combos (Ahrefs) before publishing more.
5. **🟡 P6-05 / P6-06 / P6-07** — local-incumbent + Nordic-first focus; drop FAQ-rich-result effort → image/breadcrumb; add EN skill-phrase + standard-code exposure.
6. **🟢 P6-08 / P6-09 / P6-10** — set channel-timeline expectations; protect transactional intent; trust §19.3.

---

## 8. What requires paid tools / operator action

- **Acquire Ahrefs or SEMrush** — for search volumes, keyword difficulty, per-theme-combo demand, competitor backlink/authority.
- **Actively use Google Search Console** — confirm the P6-01 indexation root cause, monitor coverage, request indexing, submit/verify sitemaps, watch for manual actions.
- This part is qualitative landscape only; the numbers above are directional, US-geolocated, and not a substitute for GSC + a rank tracker.

**Read-only confirmation:** no code/config/server/DB changes. Only this report was written, under `docs/audit-results/`.

**Sources:** `site:lessoncraftstudio.com` (verified index state); WebSearch en/de/es/nl/sv/fi K-3 worksheet queries; TPT, SuperTeacherWorksheets (common-core), Workybooks, grundschulkoenig.de, edufichas.com, LiveWorksheets, Wordwall; Google HowTo/FAQ rich-result deprecation (2023) + removal (2026); SERP-feature + AI-Overview impact analyses; Pinterest→education-traffic case studies; Perplexity answer-engine; iframe-SEO + breadcrumb references. (Full URL list in the Part 6 agent research log.)
