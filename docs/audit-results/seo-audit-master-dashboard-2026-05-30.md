# SEO Audit — Master Health Dashboard & Remediation Roadmap

**Date:** 2026-05-30
**Site:** LessonCraftStudio — multilingual (11-locale) K-3 educator platform; ~16,551 decks + ~9,432 topic pages + 187 activities + 33 tool landing pages, Next.js 14 + nginx-served static deck.html.
**Scope:** Consolidates the 6-part exhaustive SEO audit. Read-only throughout — zero code/config/server/DB changes; the only outputs are the seven reports under `docs/audit-results/`.
**Method:** Each part employed 2-3 senior-SEO expert agents (code + live curl/WebSearch); every Critical/High finding was re-verified directly. Per-part reports:
`seo-audit-part1-technical-crawlability` · `part2-international-hreflang` · `part3-onpage-structured-data` · `part4-content-depth-thin-pages` · `part5-internal-linking-architecture` · `part6-competitive-keyword-landscape` (all `-2026-05-30.md`).

---

## 1. Executive summary

**The on-site SEO is, in most dimensions, well-built and well-disciplined** — clean 4-shard image sitemap, correct apex→www canonicalization, reciprocal substrate-honest hreflang on the Next.js side, valid JSON-LD everywhere, exemplary topic pages, a thin-page problem already largely solved (8,144 → 242), and idiomatic per-locale content. The platform's existing SEO doctrine and tooling are unusually mature.

**But three things override that good work:**

1. **🔴 The catalog is organically invisible.** Google still indexes the *old KDP/Etsy seller site*; zero `/decks//topic//activities/` URLs surface in `site:` results. **Until this is fixed, the entire on-site investment earns nothing.** *(P6-01)*
2. **🔴 The internal-link mesh is half-built** — decks don't link up to hubs, the homepage crawl-bait collapsed (~140 → ~12), and the footer/nav topic mesh is client-gated (0 crawlable). This is both a ranking problem and a **likely contributing cause of #1** (the sitemap is nearly the only discovery path). *(P5-01/02/03)*
3. **🔴 A few high-leverage content/data defects leak into the index** — English CCSS strand names in non-EN activity pages, a German educational-level term swap on ~3,000 decks, and standards-page alignment markup that isn't server-rendered. *(P2-01, P3-01, P3-02)*

**The strategic read (Part 6):** the markets are **local, not Anglo** (beat grundschulkoenig.de, not Twinkl); the near-term wins are **Nordic + long-tail + Pinterest**, not EN head terms; and the site is **needlessly foreclosing the AI-answer-engine channel** at the edge. None of this overturns existing doctrine (§19.3) — it sharpens it.

**One-line verdict:** *Strong on-site SEO that Google can't see yet. Fix indexability + internal linking first; everything else is high-quality polish on top.*

---

## 2. Master health scorecard

| Dimension | Status | Part | Note |
|---|---|---|---|
| Sitemap integrity | 🟢 | 1 | 4 shards, 19,537 decks, clean partition, 19,694 image entries |
| Canonical integrity | 🟢 | 1 | apex→www, self-canonical, trailing-slash agreement |
| hreflang reciprocity + substrate-honesty (Next.js) | 🟢 | 2 | reciprocal, honest, no hreflang→404 |
| Native-slug architecture + per-locale register | 🟢 | 2 | native routing + idiomatic titles incl. Nordic |
| Heading structure + JSON-LD validity | 🟢 | 3 | single h1 everywhere; all SSR JSON-LD valid |
| Topic-page structured data + crawl mesh | 🟢 | 3,5 | exemplary CollectionPage/ItemList/Breadcrumb; 173 anchors/page |
| Word-count thin pages | 🟢 | 4 | 242 left (0 critical), down from 8,144 |
| Content completeness (single-axis prose, non-EN activity bodies) | 🟢 | 4 | ~solved |
| Embed-backlink mechanism + anchor-text quality | 🟢 | 5 | correct by design |
| Crawl-control (410 / carve-outs) | 🟡 | 1 | clean, but dead header block + AI-block drift |
| hreflang code correctness (deck-side) | 🟠 | 1,2 | bare `pt`≠`pt-BR`; x-default=`da` |
| Native-slug completeness (exercise-mode) | 🟠 | 2 | English tokens in ~8-15k non-EN URLs |
| Shared-nav / homepage residue + casing | 🟠/🟡 | 2,3 | "Browse All Apps"; tool double-brand; topic casing |
| OG/Twitter + rich-result completeness | 🟡 | 3 | twitter:image:alt; FAQ dead; breadcrumb only on topic |
| Topic-intersection + deck-description differentiation | 🟡 | 4 | templated long-tail |
| Indexation control (private surfaces) | 🔴 | 1 | `/admin` publicly indexable |
| **Activity strand residue (non-EN)** | 🔴 | 2 | English "Counting & Cardinality" in indexable JSON-LD+prose |
| **Standards + worksheets-hub structured data** | 🔴 | 3 | alignment not SSR; hub has no JSON-LD |
| Cross-field consistency (DE level) | 🟠 | 3 | title vs JSON-LD vs topic-page swap |
| **Deck→topic up-links / homepage crawl-bait / footer-nav mesh** | 🔴 | 5 | half-built internal-link graph |
| AI-answer-engine channel | 🔴 | 6 | foreclosed by edge block |
| **Organic visibility + brand classification** | 🔴 | 6 | still indexed as KDP/Etsy seller |
| Competitive winnability (Nordic/long-tail) | 🟢 | 6 | thin field |
| Competitive winnability (EN head) | 🔴 | 6 | saturated (expected per §19.3) |

---

## 3. Consolidated remediation roadmap (deduped, severity × effort)

Findings that recurred across parts are merged; the cross-references show every part that flagged them.

### 🔴 CRITICAL / blocker — do first

| ID | Finding | Effort | Refs |
|---|---|---|---|
| **R1** | **Catalog not indexed — Google still shows the old KDP/Etsy seller site.** Open GSC, confirm Coverage state (crawled-not-indexed / discovered-not-crawled / soft-404 / manual action / stale), request-indexing, ensure sitemaps submitted, out-rank/deprecate old seller titles. **Depends on R2 to give crawlers paths.** | Investigation S; resolution varies | P6-01 |
| **R2** | **Build the internal-link mesh (the highest-leverage on-site lever).** (a) Emit deck→topic end-links on the forward path + retrofit ~9,800 decks (machinery exists; `buildEndDeckLinks` just isn't called with placeholders — `catalog-export.js:962`; precedent `inject-deck-end-strip.js`). (b) Always-on SSR footer/nav topic mesh (un-gate `{isOpen &&}` in `FooterCategoryDropdowns.tsx:153` / `CategoryNav.tsx:114`; data already server-resolved). (c) Restore homepage crawl-bait (topic-link block / deck grid; regressed at `bc215a5c`). | M (each) | P5-01/02/03 |
| **R3** | **`/admin` is publicly indexable.** Add `robots:{index:false,follow:false}` to the `/admin` route group (mirror the auth layout); audit other matcher-excluded prefixes. | S | P1-01 |
| **R4** | **English CCSS strand names in non-EN activity pages** (indexable JSON-LD + prose, all non-EN activity pages). Localize ~6 strand names × 10 locales + render localized + add a strand-leak assert to `audit-activity-pages.js`. | M | P2-01 |

### 🟠 HIGH

| ID | Finding | Effort | Refs |
|---|---|---|---|
| **R5** | **Make publish-cli consume the `hreflang.ts` SoT.** Fixes deck.html bare `pt`→`pt-BR` + `<html lang>` + og/hreflang self-contradiction + x-default `da`→en, in one publish-cli change + re-injection. | M | P1-03, P2-02/03 |
| **R6** | **DE `seo.educational_level` swap** (`de.json` preschool↔kindergarten inverted) → ~3,000 decks show the wrong grade and contradict their own JSON-LD + topic page. 2-line fix + `republish-seo` DE retrofit. | S + M retrofit | P2-16, P3-01 |
| **R7** | **English exercise-mode tokens in non-EN deck slugs** (~8-15k URLs). Fill `axes.exercise-mode.<key>.slug.<locale>` natively (stops future waves) + optional retrofit of published de/es/fr/it/pt. | M fwd + L retrofit | P2-04 |
| **R8** | **Standards page: server-render the LearningResource+AlignmentObject** (currently `next/script afterInteractive`). | S | P3-02 |
| **R9** | **Reconcile + unblock AI-answer-engine crawlers** (edge block contradicts §3.5; forecloses Perplexity/ChatGPT-search). Cloudflare-dashboard decision. | M (operator) | P1-02, P6-02 |
| **R10** | **Elevate Pinterest to a primary early channel** (top-3 education-printables driver; pin assets already exist). Strategic/marketing, not code. | — | P6-04 |
| **R11** | **Localize the "Browse All Apps" nav CTA** + fix the **tool `<title>` double-brand** + trim the **DE (and other long-locale) homepage titles** (91 chars). | S (each) | P2-05/07, P3-03/04 |

### 🟡 MEDIUM

| ID | Finding | Effort | Refs |
|---|---|---|---|
| **R12** | Add BreadcrumbList to activity/tool/standards (reuse `buildBreadcrumbSchema`); add a breadcrumb to deck.html. | S-M | P3-06, P5-04/08 |
| **R13** | Rebuild the `/worksheets` hub (add CollectionPage+Breadcrumb JSON-LD, list topic axes/recent decks) — closes three findings at once. | M | P3-05, P4-03, P5-05 |
| **R14** | `twitter:image:alt` on the 5 SSR page types; standards `og:locale` + alternates; port topic-title casing/elision. | S-M | P2-06, P3-07/08 |
| **R15** | Differentiate the long-tail: enrich the **intersection prose template** (axis-aware variation) + inject the title noun-phrase into **deck descriptions** + author the next topic-prose hub set. Treat theme-permuted pages as long-tail-only; validate combos against demand (Ahrefs) before mass-publishing more. | M (template) / L (authoring) | P4-01/02, P6-03 |
| **R16** | Republish sv/da/no/fi/nl English-slug residue decks (fi also clears the "varten" connector); harden `reconcileLocaleResidue` against non-empty≠localized. | S-M | P2-08/09/10 |
| **R17** | Fix gate/tooling fidelity: align `count-inbound-surfaces` with rendered HTML; build a live-corpus orphan check; retire seller-era cannibalization scripts; add a `topicMeta` coverage CI assert. | M | P4-05/07, P5-06/07 |
| **R18** | Stop investing in FAQPage for rich results (dead May 2026) → redirect to image-pack + breadcrumb; add EN-only skill-phrase + standard-code exposure. | S-M | P3-09, P6-06/07 |

### 🟢 LOW / opportunistic
deck `dateModified`; Organization `sameAs`/WebSite SearchAction; per-page OG images for activity/tool; deck `<meta robots>` + `og:image:secure_url`; deck keyword-language consistency; standalone low-priority taxonomy fixes (`matching.slug.no`, `thanksgivinng` typo, `household_bw` collision); doc cleanup (CLAUDE.md §4.3/§19 "decks only en/es/pt"; `activity-content.ts:21` "Phase 3 EN-only"). *(P2-11..15, P3-11..15, P4-04/06, P5-09)*

---

## 4. Cross-cutting themes (root causes worth fixing structurally)

1. **"Doctrine-satisfied on paper, absent in rendered HTML."** The §16.6 footer mesh, §15.18 ≥3-inbound floor, §1 homepage crawl-bait, and §17.8.2 end-deck links all *exist in code* but produce **zero/weak crawlable output live** — client-gating, an un-passed `includePlaceholders` flag, a homepage-v3 regression, and DB-projected (not HTML) gate counters. **Guardrails should assert rendered output, not code presence.** (Same lesson behind the activity strand-leak slipping `audit-activity-pages.js` 187/187.)
2. **publish-cli re-inlines locale logic instead of consuming the `hreflang.ts` SoT** — the single root cause behind the deck-side pt-BR drift, x-default=da, and (historically) the residue gate weaknesses. One "consume the SoT" effort (R5) closes several findings.
3. **Theme-axis combinatorial vs query demand.** The 100-theme × type × level explosion (§6) is the engine behind both the long-tail intersection thinness (Part 4) and a real keyword-intent gap (Part 6) — teachers don't search by visual theme. Govern future mass-publishing by demand, not by combinatorial completeness.
4. **Audit-tooling currency.** Several "100% pass" signals understate risk (`audit-meta-lengths.js` checks the dead seller tree; `audit-orphan-pages.js` audits 410-Gone URLs; the inbound gate counts DB projections; the activity guardrail doesn't check residue; seller-era cannibalization scripts audit the dead content tree). Modernize the guardrails to the live corpus.

---

## 5. Suggested sequencing

- **Sprint 0 (unlock — days):** R3 (`/admin` noindex), R1 GSC investigation, R9 reconcile AI-crawler policy. Cheap, and R1 tells you the true indexation state.
- **Sprint 1 (the lever — 1-2 weeks):** R2 internal-link mesh (deck up-links + footer/nav SSR + homepage crawl-bait). This is the highest-ROI on-site work and feeds R1.
- **Sprint 2 (index-quality fixes):** R4 strand localization, R6 DE level swap, R8 standards JSON-LD, R5 publish-cli SoT + re-inject, R11 quick title/nav fixes.
- **Sprint 3 (depth + breadth):** R7 native mode-slugs, R12-R14 structured-data/breadcrumb polish, R13 worksheets hub, R15 long-tail differentiation, R16 residue republish.
- **Ongoing (strategic):** R10 Pinterest, R17 tooling modernization, R18 SERP-feature/keyword strategy; acquire **Ahrefs/SEMrush** + actively use **GSC**.

---

## 6. What only the operator / paid tools can resolve

- **GSC** — the true indexation state (R1), coverage monitoring, request-indexing, manual-action checks, sitemap submission status. *The single biggest blind spot in this audit.*
- **Cloudflare dashboard** — the AI-crawler edge policy (R9) + reconciling it with CLAUDE.md §3.5.
- **Ahrefs / SEMrush** — search volumes, keyword difficulty, per-theme-combo demand, competitor authority/backlinks (governs R7, R15, R18 prioritization).
- **Marketing decisions** — Pinterest channel investment (R10), international-school outreach (§9), the EN standard-code strategy (R18).

---

## 7. Audit integrity

- **Live ground-truth:** every 🔴/🟠 finding was confirmed by a direct live `curl`/WebSearch + Grep/Read before landing in a report (not code intent alone).
- **No regression risk:** the audit wrote only Markdown under `docs/audit-results/` (this dashboard + six part reports) and ran only read-only scripts/queries — zero code/config/server/DB changes.
- **Reconciled against prior state:** findings were checked against `MASTER-DIAGNOSIS.md`, `docs/SEO/deck-page-arc-close-summary.md`, and the `seo-100pct-*` reports; net-new vs verified-still-open is noted per part. Two priors were actively corrected: the "8,144 thin pages" figure (now 242) and the "decks only en/es/pt" framing (now 5 full markets).

*End of master dashboard.*
