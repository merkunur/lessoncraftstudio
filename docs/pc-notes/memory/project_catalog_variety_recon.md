---
name: Catalog variety recon (Path 2 rebalancing)
description: Read-only recon designing the breadth-signal layer that complements §1 topic-destination architecture. Sections 1-6 per operator brief.
type: project
originSessionId: de342ceb-c0c5-463a-8cea-62f861933fc9
---
# Catalog variety recon (Path 2 rebalancing)

**Posture:** read-only recon, no code, no commits, no DB writes, no deploys.
**Parent commit:** `2511e181` ([DOCS] doctrine pass — a47ea021-arc folded).
**Catalog state at recon:** n=116 published decks (29 mechanics × 4 locales en/de/es/nl).
**Date:** 2026-05-04.

---

## TL;DR (executive summary)

Three findings reshape the brief's framing:

1. **The competitor premise is wrong.** education.com and Twinkl do NOT produce the "broad catalog" snap-judgment via tile density. Both use **categorical-funnel** chrome (4-card subject buckets / mega-menus) + **numeric scale copy** ("38,000+ worksheets"; "1,000,000+ resources"). Path 2 should target *categorical-breadth signal* + *cross-link density*, not *aggressive tile shelves*.
2. **Catalog shape is currently flat-broad.** 29 mechanics × 4 locales = perfect mechanic spread, kindergarten-heavy (76%), 1 theme tag (`animals`, 42% of decks). Variety strips at n=116 have abundant mechanic + locale diversity, near-zero theme diversity, weak age diversity. Path 2 must work at current shape AND scale forward.
3. **Path 2's load-bearing lever is the topic page, not the homepage.** Homepage is the cleanest place to add a breadth strip but the cheapest in actual SEO + visitor-conversion impact at n=116. Topic page is where teachers land via search and where the §1 doctrine commits to *primary teacher-facing surface* — its current deck-grid-only composition is the strongest variety-signal gap. Below-the-fold variety surfaces on topic pages also strengthen internal linking (§17.4 "every cross-link makes the link graph richer").

**Recommended sequencing:** single arc, single commission. Topic-page variety extension (Section 4.1) is the highest-leverage first commit because it touches every search-landing surface AND adds internal links the link-graph needs anyway. Homepage Section 2 extension defers to a follow-on commission that also handles deck-page surfaces. §1 + §16.2 + §18.4 amendments queue for next doctrine pass.

---

## Section 1 — education.com analysis (and Twinkl, and TPT, with halt notes)

### 1.0 Halt-and-surface — WebFetch limitations

Of the 4 surfaces the brief named, only education.com's homepage was successfully fetched. Deeper paths (`/resources/worksheets/`, `/worksheets/`, `/games/`, `/lesson-plans/`, kindergarten-math topic page) returned **HTTP 403** to the WebFetch user-agent. Wayback Machine paths also rejected from this environment. **Teachers Pay Teachers homepage** also 403. Twinkl homepage was fetchable.

Workaround applied: Twinkl homepage + education.com homepage carry the structural pattern that matters for the recon's question — both confirm the categorical-funnel + numeric-copy posture, which is the load-bearing finding. Operator-supplied screenshots of education.com's deeper surfaces (topic page + worksheet detail page + search results) would refine Section 1.2-1.4 but are not blocking for Section 3 gap analysis: the homepage finding alone already inverts the brief's framing.

### 1.1 Education.com homepage — observed pattern

**WebFetch URL:** `https://www.education.com/` (200 OK).

Concrete findings:
- **Zero distinct content tiles above the fold.** No worksheet thumbnails, no "trending" shelves, no horizontal-scroll catalog strips.
- **Hero + 4 categorical cards.** Single row of 4 equal-width cards: Lesson Plans / Worksheets / Games / Activities. These are *navigation portals*, not catalog content.
- **No algorithmic recommendation surfaces** (no "Trending", "Popular", "Recommended") visible on the homepage.
- **Numeric breadth-signaling copy is the catalog-effect mechanism**: *"Explore 38,000+ teacher-created worksheets, hands-on activities, and learning games"* + *"With thousands of digital and printable resources"* + *"44 million parents, teachers, and students served"*. Three independent scale claims in chrome.
- Top nav: minimal (Log In / Sign Up).
- Footer: "Learning Library" + the same 4 type buckets.
- Architecture: **categorical funnel → detail pages**, not item-level browsing.

The "broad catalog" impression is **asserted in copy and reinforced by 4-bucket categorical breadth**, not demonstrated by tile density on the homepage itself.

### 1.2 Twinkl homepage — confirms the same pattern

**WebFetch URL:** `https://www.twinkl.com/` (200 OK).

- **Categorical-funnel** model: primary nav by educational stage (EYFS / KS1 / KS2 / KS3-4 / KS5) with mega-menus into subject/topic hierarchies.
- **"Twinkl Recommends..."** sections appear (curated-by-stage, not algorithmic), plus "Explore Inclusive Resources" and "New-in" collections.
- **Numeric scale signal**: *"Tillgång till över 1,000,000 resurser"* — over 1 million resources.
- **Locale switcher + role selector** (Förskollärare / Lärare / etc. — Swedish locale captured).
- Catalog-breadth impression: **categorical-funnel + numeric copy**, same as education.com.

### 1.3 Topic-equivalent + worksheet-detail + search-results surfaces — halt-noted

403 on all attempts. From CLAUDE.md §19.3 ("Education.com, Twinkl, Teachers Pay Teachers, and dozens of others have decades of accumulated authority") — these are competitive references, not implementation models. The recon's gap-analysis (Section 3) does not depend on resolving their topic-page composition; the homepage finding (categorical-funnel + scale-copy) is sufficient for the strategic recommendation.

If operator wants topic-page-pattern detail, three workaround options:
- Operator-supplied screenshots of education.com's `/worksheets/kindergarten/math/` etc.
- Manual visit by operator with notes back
- Different WebFetch approach (cached search engine snapshot via Google Cache; not currently accessible from this environment)

### 1.4 Synthesis — variety-signal patterns competitor sites use

| Pattern | What it signals | Structural cost |
|---|---|---|
| **Numeric scale copy in chrome** ("38,000+ worksheets") | "vast catalog" via assertion | trivial — homepage hero copy |
| **Categorical-bucket portal** (4-6 type cards above fold) | breadth via *type variety* not item count | minimal — static config |
| **Mega-menu by stage × subject** | breadth via *topical hierarchy depth* | medium — taxonomy-driven nav |
| **"Recommends..." / "New-in" shelves** | curated freshness signal | small — operator-curated config row |
| **Locale + role selector in chrome** | "the catalog speaks to me" personalization | small — already present (locale switcher exists; role-selector does not) |

What competitors do **not** rely on for catalog-effect impression:
- Tile density above the fold (education.com homepage has zero tiles)
- Algorithmic personalization (no "trending" / "for you" prominence)
- Horizontal-scroll catalog strips on the homepage
- Item-level recommendations on homepage

The brief's premise that "education.com surfaces dozens of items above the fold from across many subject areas" is **not borne out** by the homepage. They surface zero items above the fold and assert breadth via copy + categorical architecture.

This inverts the strategic posture. Path 2 doesn't need to compete on tile density. It needs **categorical-breadth signal + cross-link density + numeric scale copy** to match the catalog-effect impression.

---

## Section 2 — current platform surface analysis

### 2.1 Homepage — current state

Source: `frontend/app/[locale]/page.tsx` + 5 child components (`Hero`, `BreadthGrid`, `LanguageProof`, `FreeExperience`, `SubscriptionSection`). 1-hour ISR. SSR.

Per HOMEPAGE-SAVE-STATE.md the page architecture is:
1. **Hero** — locked headline ("Worksheets that actually work in your second language") + locked subhead. **NO embedded sample deck despite §18 doctrine** (variety-signal-relevant: sample-on-hero is a separate gap).
2. **BreadthGrid (Section 2)** — 8-tile grid backed by `frontend/config/homepage-featured-decks.json`. 4-locale balance (2 en + 2 de + 2 es + 2 nl) per §18.4 three-equilibria. 4 themed (`animals`-tagged) + 4 themeless. 8 distinct mechanics. 1 featured tile (sudoku-en) plays inline; 7 link out to deck pages via plain `<a>` (per §15.7 nginx-routed convention).
3. **LanguageProof** — comparison section showing auto-translation failure modes vs LCS correctness in DE + FR. Most rhetorically aggressive section per HOMEPAGE-SAVE-STATE.md.
4. **FreeExperience** — 4 capability blocks: browse, generate PDF, embed, share-link.
5. **SubscriptionSection** — 3-pillar block + $69 price.

What the homepage does NOT have:
- No "by topic" surface (Section 6 footer covers this; not above-the-fold)
- No "by language" surface (footer)
- No "by exercise type" surface (footer)
- No numeric scale signal in chrome (no "29 worksheet types × 4 languages = 116 decks" or equivalent)
- No "recently added" shelf
- No mega-menu / category nav in top nav
- No second variety strip below the curated 8

**Variety-signal density of homepage:** 8 deliberately-curated cells, hand-balanced. Equilibria-stable but cardinality-thin. Compared to Section 1's competitor pattern: LCS *does* surface 8 tiles (which education.com does NOT) — but lacks the *categorical-funnel* + *numeric-copy* signals competitors lean on. The two postures (tile density vs categorical breadth) are independent levers; LCS uses the first lightly and the second not at all.

### 2.2 Topic page — current state

Source: `frontend/app/[locale]/topic/[slug]/page.tsx`. SSR + 1-hour ISR. CollectionPage Schema.org JSON-LD. hreflang to other locales where the same axis-key has decks (honest siblings per §17.4).

Page composition (top to bottom):
1. **Header** — `<h1>` heading + intro paragraph + `decksCount` ("47 decks total").
2. **Lesson plan card** (when `lessonPlanSummary` exists for this `axisKey + locale`) — title + duration + warmup excerpt + "Read full plan" CTA. Phase 1c authoring shipped 4 reference plans (en/de × addition+sudoku); 152 remaining at Path A scope.
3. **Deck grid** (`DeckGridClient`) — full filtered list (no pagination; orderBy `publishedAt desc, id asc`), each card carrying play link + PDF link.

What the topic page does NOT have:
- **No "related topics" surface** (the §16.2 spec lists "Optional row of links to neighboring topics in the taxonomy" but it's not implemented today)
- **No "Other languages" / "Same topic in other locales" cross-link surface** beyond the hreflang `<head>` declarations (not user-facing chrome)
- **No "More by exercise type" or "More for kindergarten"** suggestions (those are end-of-deck links on the deck.html itself, not on the topic-page surface)
- **No "Browse all worksheets" footer link / catalog-home strip**
- **No subject-tag filter UI** (the page is single-axis only; cross-product narrowing requires URL editing)
- **No companion printable PDFs section** (the §16.2 spec lists "Companion printable PDFs" as a discrete page section; current implementation surfaces PDF links inline on each deck card, not as a separate section)

**Variety-signal density of topic page:** ZERO. The page is single-axis-narrow by deliberate design (§1 doctrine). Below-the-fold there's nothing — the deck list ends and the footer comes next.

This is the **single biggest variety-signal gap** in the platform's current state. Every topic page is a search-landing surface (per §17.4 SEO doctrine), and every search landing currently terminates at "here are N decks for this exact axis-key, end of page". A visitor exploring "kindergarten" who lands and likes what they see has no in-content path to "try Spanish kindergarten" or "try preschool decks" or "see addition for kindergarten" — they have to navigate via the footer (3-column structural footer) or the URL.

### 2.3 Deck page — premise correction + current state

**Premise correction:** the brief lists `frontend/app/[locale]/decks/[slug]/page.tsx` as a prerequisite. **This file does not exist.** Per CLAUDE.md §15.7 the deck URL `/<locale>/decks/<slug>/` is an **nginx-served static deck.html**, not a Next.js handler. The "deck-page surface" in scope is the static deck.html emitted by `REFERENCE TRANSLATIONS/catalog-export.js`.

Static deck.html surfaces (per §17.8 + §17.8.15):
1. **The interactive deck** itself — fully self-contained HTML+CSS+JS, plays offline, embeds the sample-deck experience the visitor came for.
2. **`<head>` SEO surface** — `<title>`, `<meta name="description">`, `<link rel="canonical">`, Schema.org `LearningResource` JSON-LD, hreflang block (v2 only; v1 empty).
3. **`<h1>`** + instruction `<p>` + `aria-label`/`sr-only` per-row exercise text.
4. **Share affordance** in `lcs-bar` — 40×40 icon button → `navigator.share` (mobile) OR 5-platform overlay (Facebook / WhatsApp / Pinterest / email / copy-link).
5. **Attribution footer** — "Made with LessonCraftStudio.com" link → home.
6. **End-of-deck links** — 4 anchor links in a `<div class="end-deck-links">`:
   - `__LINK_MORE_TYPE__` → `/<locale>/topic/<exercise-type-slug>/` ("More addition worksheets")
   - `__LINK_MORE_THEME__` → `/<locale>/topic/<theme-slug>/` ("More animal-themed worksheets") — only when theme set
   - `__LINK_MORE_LEVEL__` → `/<locale>/topic/<educational-level-slug>/` ("More worksheets for kindergarten")
   - `__LINK_BROWSE_ALL__` → `/<locale>/` (catalog landing — currently the home page)

**Variety-signal density of deck page:** 4 narrow per-axis links + 1 catalog-home link. Per §17.8.2 these are α-granular: a visitor finishing a deck only sees "more like this on the 3 axes this deck occupies + browse all". Concretely an animals-themed kindergarten addition deck sends the visitor to (a) the addition topic page, (b) the animals topic page, (c) the kindergarten topic page, (d) home. None of those four surfaces is itself rich in variety-signal (per Section 2.2 + Section 2.1).

The deck page **only renders these links at puzzle completion** — many visitors won't reach them. End-of-deck completion-rate is unmeasured but surely far below 100%.

Cacheability constraint per §4.4: same deck.html for free + paid teachers + Googlebot. Variety-strip surfaces on deck.html that need DB queries (e.g., "other recently-added decks") would break cacheability — the cache key is per-deck-version, not per-request. Variety surfaces on deck.html must be either **operator-curated at publish time** OR **decoupled into an iframe loaded from a Next.js route** (which has its own cacheability story).

### 2.4 Search / browse — current state

**No catalog search surface exists.** Per project_mass_publish_recon.md Section B, browse falls back to faceted filter via topic-page-listing surfaces; there is no `/search?q=...` route, no autocomplete, no full-text indexing, no semantic-similarity search service. Topic resolution per §16.1 is aspirational (exact slug match → embedding similarity → faceted browse fallback) — only step 1 is implemented; steps 2 + 3 await Mac Studio AI service + faceted browse build.

**Faceted browse does not exist either.** Topic pages are single-axis, no `/<locale>/browse/` route exists. A teacher who wants "kindergarten Spanish addition" today can navigate (a) via topic-page chains (`/es/topic/grado-1/` → manually scan for addition decks), (b) via deck-page end-of-deck links, (c) via Footer cross-links — but no faceted filter UI surfaces the cross-product.

This is a **separate arc** per §11 ("Topic destination pages — full-shape brief beyond §16's minimal taxonomy" + "Catalog page Phase 1/2/Gate 1"). This recon does NOT scope a search build. But it documents that variety-signal will partially substitute for absent search until search ships.

---

## Section 3 — gap analysis

### 3.1 Pattern-by-pattern map

For each variety-signal pattern from Section 1.4, mapping to current platform state from Section 2:

| Pattern | Current state | Gap |
|---|---|---|
| Numeric scale copy in chrome | **Absent.** No "X+ worksheets" / "11 languages" callout in Hero, Section 2, or footer. | Present elsewhere in copy strategy (see §6 + HOMEPAGE-SAVE-STATE.md anti-positioning re: avoid asset counts that grow stale, but "11 languages" is permitted) but NOT load-bearing in chrome. |
| Categorical-bucket portal | **Partial — in footer only.** Section 6 footer has 3 columns (by language / by topic / by exercise type) but it's below-the-fold structural, not above-the-fold portal. | Major. Current architecture trusts visitors to scroll-to-footer for category navigation. Above-the-fold visibility is what produces snap-judgment. |
| Mega-menu / topical hierarchy in top nav | **Absent.** Top nav is minimal. | Major. No path from any page chrome to "browse by language × stage × subject". |
| Curated freshness shelf ("New", "Recommends") | **Absent.** Section 2 is hand-curated but not labeled "new" or "trending". | Medium. Path 2 surfaces could include a "recently added" strip (§6.1 operator-strategic decision). |
| Locale + role selector | **Locale switcher: present.** Role-selector: absent. | Minor. Role-selector adds noise more than signal for K-3 audience (operator already chose to skip per HOMEPAGE-SAVE-STATE.md tone register). |
| Tile density above the fold | **Light** — 8 cells in Section 2. | NOT a gap relative to competitors (education.com has zero). Could expand modestly without becoming a TPT-style feed. |
| Cross-link density between topic pages | **Absent on topic page.** End-of-deck links exist but are post-completion. | **Largest gap.** Every topic page is a dead-end after the deck list. |
| Cross-locale variety on topic page | **Absent on user-facing surface.** hreflang in `<head>` declares siblings but no chrome surfaces them. | Major. Path 2 cross-locale surface = §6.4 operator-strategic. |
| Subject-tag filter UI on topic page | **Absent.** Topic page is single-axis only. | Medium-large. Tied to faceted-browse arc which is out-of-scope here. |

### 3.2 Tradeoffs per pattern adopted vs rejected

Patterns ranked by **(impact ÷ cost) × no-conflict-with-current-doctrine**:

**HIGH RECOMMEND:**

1. **Topic-page below-the-fold variety surfaces** — Major impact, medium cost, zero doctrine conflict.
   - Implementation cost: extending `topic/[slug]/page.tsx` with N additional sections after the deck grid. Each section is a `fetchDecksForAxis`-style query; new helpers needed for "related topics in same locale", "same topic in other locales", "neighbor topics by subject".
   - Performance forecast at catalog-scale: variety queries fan out one level per surface. At n=116 these queries run in <50ms via the indexes shipped at b9e75fbe. At catalog scale (≥5,000 decks) the language+status compound indexes still serve the per-locale filters; cross-locale aggregation would benefit from a small additional index on `(content_family_id, status)` once v2 ships, but v1 doesn't have content-family wired. Filed as forward-deferred.
   - SEO win: each new on-page link enriches the link graph (§17.4 "every cross-link makes the link graph richer"). Topic page is currently a graph-leaf; this gives it 5-10 outbound links per surface section.
   - Doctrine conflict: zero. §1 commits to topic page as **primary curated narrowing** — variety surfaces are **complementary post-curation**, BELOW the curated content. The page still leads with the topic's curated decks.
   - Cacheability: ISR-cached (1 hour). Variety queries run at revalidation; teachers see consistent variety per cache window.

2. **Numeric scale copy in chrome** — Trivial cost, real impact.
   - Implementation cost: copy edit in homepage Hero or BreadthGrid intro; potentially in Footer.
   - HOMEPAGE-SAVE-STATE.md explicitly avoids asset counts that age (no "1,246 vocabulary entries" or "3,000 illustrations") but **explicitly permits "11 languages"**. Extension candidate: "29 exercise types in 11 languages" — both numbers are scope claims, not asset-count claims that grow stale.
   - SEO-neutral, content-discipline-aligned with locked positioning.

**MEDIUM RECOMMEND:**

3. **Homepage Section 2 expansion** — Medium impact, low cost, ~equilibria stress.
   - Cost: extending `homepage-featured-decks.json` from 8 → 12 or 16; `BreadthGrid` already supports any cardinality.
   - §18.4 three-equilibria doctrine becomes harder to compose by hand at 16+ cells (locale + theme + mechanic + age?). At 12 cells the equilibria are still tractable (3-locale × 4 mechanic; etc.).
   - Doctrine extension needed for §18.4 if cell count moves past 16 — operator-curated → algorithmic-curated transition. Filed as next-doctrine-pass amendment.

4. **Homepage second variety strip ("recently added")** — Medium impact, small cost, operator-strategic.
   - §6.1 operator-strategic: does the operator want to commit to "recency" as a first-class catalog signal?
   - Implementation: a `<RecentlyAdded>` component that queries 4-8 most-recently-published decks across all locales (or filtered to current locale). 1-hour ISR.
   - Cross-references §17.5 + §19 — recency-prominence helps Tier 3+4 launch optics ("we just added Italian!").

5. **Deck-page (deck.html) end-of-deck strip extension** — Low-medium impact, small cost, cacheability-constrained.
   - Current 4-link strip (per-axis × catalog-home) is α-granular per §16.5. Extension shape: add 2-4 operator-curated "you might like" picks at deck-publish time, baked into deck.html.
   - Cacheability: per-deck-version cache; no per-request templating. The "you might like" picks must be **operator-curated at publish-cli time** (read `topics-taxonomy.json` for axis siblings + manually pick) OR **algorithmically-derived at publish-cli time** (e.g., "5 most recently published in same exercise-type or theme"). Either approach freezes the picks per deck version — not a problem; just different from a live "recently added" surface.
   - Filed as v1.5-candidate; not first-arc.

**LOW RECOMMEND or DEFER:**

6. **Mega-menu / categorical portal in top nav** — High impact, high cost, doctrine-sensitive.
   - Cost: a navigation overhaul. Top-nav restructure touches every page.
   - HOMEPAGE-SAVE-STATE.md tone register: "professional, quiet, educator-respecting. Spare language, clean typography, content-forward." A mega-menu fights that register.
   - Filed for later commission; if Path 2 fails to produce the catalog-effect at lighter cost, reconsider.

7. **Sidebar-style related-content surfaces on topic pages** — Medium impact, medium cost, mobile-first conflict.
   - §17.4: "Mobile-first design" — sidebars on mobile fold to bottom, becoming the same thing as below-the-fold variety strips. Recommend below-fold-only.

8. **Algorithmic personalization** — High implementation cost, K-3-audience-conflicting.
   - Per §6.3 + §11 (excluded from launch). Not in scope. Tool 6 from SUBSCRIPTION-SCOPE.md is platform-infrastructure-deferred.

### 3.3 The shape of the rebalancing per Path 2

**Recommended composition (single-arc, smallest-viable-first):**

#### Topic page (`/[locale]/topic/[slug]/`)

Below the existing deck grid, add up to 4 below-the-fold sections, in order:

1. **"In other languages"** — same axis-key in other locales where ≥1 deck exists. Renders as 2-4 horizontal language pills with deck-count badges. Each pill links to `/<other-locale>/topic/<localized-slug>/`. Per §17.4 honest hreflang: only siblings that exist link out. CROSS-LOCALE — operator-strategic per §6.4 to authorize.
2. **"Other [educational-level] worksheets"** — when the current axis is `theme` or `exercise-type`, surface `educational-level` axis-keys for the same locale. When axis is `educational-level`, swap for theme axis-keys. Renders as a 4-6-tile sub-grid of representative decks (one per neighboring axis-key).
3. **"Other exercise types"** (only on theme + educational-level pages) — 4-6 tiles representing top exercise-types with decks at this axis intersection. Links to the per-exercise-type topic page filtered by locale.
4. **"Browse all worksheets"** — locale-rooted catalog landing CTA (currently → `/<locale>/`).

Composition rules (algorithmic):
- Each section's tile selection picks one deck per neighboring axis-key, ordered by `publishedAt desc`. Diversity-shuffled to avoid 2 decks from the same exercise-type in the same section (when axis is theme or educational-level).
- ISR-cached at the page level (existing 1-hour revalidate); variety queries regenerate per revalidation.
- Honesty discipline (§16.6): only render a section when ≥2 distinct neighboring axis-keys have published decks. Below threshold, skip the section.

#### Homepage

Two extensions, both small:

A. **Numeric scale copy** in Hero subhead OR BreadthGrid intro: e.g., *"29 worksheet types in 11 languages, all free to play and print."* Operator authors per HOMEPAGE-SAVE-STATE.md tone register; no implementation work beyond copy edit.

B. **Section 2 expansion to 12 cells (deferred to follow-on commission).** §18.4 three-equilibria doctrine extension needed before cardinality moves past 8. Filed for next doctrine pass: at 12 cells, locale balance becomes 3/3/3/3 (4-locale) or 2/2/2/2/2/2 (6-locale at Tier 3 launch); theme balance flexes; mechanic balance approaches "12 distinct mechanics out of 29".

#### Deck page (deck.html)

No first-arc work. Existing 4-link end-of-deck strip is sufficient given per-version cacheability constraints. Future v1.5 candidate: bake 2-4 operator-curated "you might like" picks at publish-cli time.

#### Search / browse

No work — out of scope per §11 + project_mass_publish_recon.md. The topic-page variety surfaces partially substitute for absent search.

### 3.4 §18.4 three-equilibria doctrine extension

At 8 cells (current): locale balance 2/2/2/2; theme 4/4; mechanic 8 distinct. All three equilibria tractable by hand.

At 12-16 cells (homepage Section 2 expansion candidate): equilibria flex. 12-cell options: 3/3/3/3 by locale OR 4/4/2/2 with featured-locale weighting; 6/6 themed/themeless OR 4/4/4 themed/themeless/special; 12 distinct mechanics (out of 29 — comfortable). At 16 cells, locale 4/4/4/4 still tractable; mechanic 16/29 = 55% of catalog mechanics surfaced (good signal).

At 32+ cells (multi-stripe homepage): doctrine breaks. Hand-curation infeasible; algorithmic composition needed. Doctrine extension: per-stripe composition rules (e.g., "stripe A is locale-balanced, stripe B is recency-ordered, stripe C is theme-clustered"). Each stripe inherits stricter equilibria than the whole-page sum.

**§18.4 amendment recommendation for next doctrine pass:**
- At ≤12 cells: existing 3-equilibria doctrine holds.
- At 12-16 cells: relax theme balance to "≥30% themed AND ≥30% themeless"; preserve locale + mechanic equilibria.
- At >16 cells: switch to per-stripe composition rules; the whole-page sum no longer needs joint equilibria.
- Recency becomes a 4th candidate equilibrium when a "recently added" stripe ships (operator-strategic per §6.1).

**Topic-page variety surfaces are ALGORITHMIC from day one** (no curation), so §18.4 doctrine doesn't directly apply. They have their own simpler rule: one tile per neighboring axis-key, recency-ordered, diversity-shuffled.

---

## Section 4 — implementation surfaces (architectural sketch)

### 4.1 First commission (recommended) — topic-page variety extension

**Files touched:**

- `frontend/app/[locale]/topic/[slug]/page.tsx` — extension at the bottom of the rendered output, after `<DeckGridClient>`. Adds 1-4 new `<section>` blocks per the §3.3 composition rules.
- `frontend/lib/topic-decks.ts` — new helpers (recommended additions):
  - `fetchTopicSiblingsCrossLocale(axis, axisKey, currentLocale)` — returns `[{locale, slug, deckCount}]` for other locales where this axis-key has ≥1 deck. Source of "In other languages" section.
  - `fetchNeighboringAxisKeys(currentAxis, currentAxisKey, otherAxis, locale)` — returns ranked axis-keys on `otherAxis` for the current locale, excluding the current axis-key when same-axis. Source of "Other educational-level / theme / exercise-type" sections.
  - `fetchRepresentativeDeck(axis, axisKey, locale)` — returns the most-recently-published deck for the (axis, axisKey, locale) tuple. Used to populate section tiles.
- `frontend/components/topic-page/VarietyStrip.tsx` (NEW) — reusable component for one variety section: heading + tile row. Inputs: section title (from `topicPage.variety.<sectionKey>` translation namespace), array of `{title, href, thumbnailUrl, secondaryLabel}`. Renders horizontal-scroll on mobile, fixed-grid on desktop. Per §17.4 mobile-first.
- `frontend/messages/{en,de,es,nl}.json` — new translation keys under `topicPage.variety.*` (4 section headings × 4 locales = 16 string keys; symmetrical authoring with §17.5 NSR-flagging for any future Tier 3+ additions).

**No DB schema changes.** All new query patterns use the existing indexes shipped at `b9e75fbe`.

**Cacheability:** Topic page already revalidate=3600. Variety queries inherit the cache. Cache cost: 1 query per section per topic-page render at revalidation time. At 116 topic pages × 4 sections = 464 queries per revalidation cycle = manageable.

### 4.2 Composition algorithm details

For each section type:

**A. "In other languages" cross-locale strip (`fetchTopicSiblingsCrossLocale`)**
```sql
SELECT language, COUNT(*) AS deck_count
FROM decks
WHERE status='published'
  AND ( <axis-specific filter for axisKey> )
  AND language != $currentLocale
GROUP BY language
ORDER BY language;
```
Backed by indexes: `(language, status, exercise_type)` for exercise-type axis; `(language, status, age_range)` for educational-level; GIN(`subject_tags`) for theme. All present.

Render: language pill `[NL  •  29 decks]` linking to `/<other-locale>/topic/<localized-slug>/` per `taxonomy.getAxisSlug`.

Honesty: omit section when 0 other locales have decks at this axis-key.

**B. "Other educational-level" / "Other theme" / "Other exercise-type" strips (`fetchNeighboringAxisKeys` + `fetchRepresentativeDeck`)**

For each neighboring axis-key (excluding current):
1. Query `fetchDecksForAxis(otherAxis, axisKey, currentLocale)` — returns published decks at that neighboring axis-key in current locale.
2. If `>0`, take first deck (recency-ordered).
3. Build tile: thumbnail + axis-key localized name + count badge.

Diversity-shuffle: when current axis is `theme` AND axis-key is single-tag (`animals`), the "Other exercise-type" strip might want to prefer non-animals decks for visual diversity. Filed as v1.5 refinement — first commission shows whatever's there.

Honesty: omit section when <2 distinct neighboring axis-keys have decks. At n=116 with single theme, the "Other theme" strip never renders (only `animals` tag exists). Confirms strict honesty discipline; section becomes load-bearing as catalog grows.

**C. "Browse all worksheets" footer**

Single anchor: `<a href="/${locale}/">Browse all 116 worksheets in {languageLabel}</a>`. Numeric scale copy applied. Cardinality count from `prisma.deck.count({where: {status:'published', language: locale}})` — single fast count query.

### 4.3 Performance forecast at catalog scale

Current state n=116:
- Per-locale `fetchDecksForAxis` queries: <10ms each (index-served).
- `listNonEmptyAxisKeys` for cross-locale aggregation: <50ms (single GIN scan + per-axis groupBy).
- Topic-page rendering: dominated by hreflang sibling check (one query per Tier-1 locale = 4 queries). Total render <500ms cold; ISR-cached afterward.

At catalog scale n=5,000:
- Per-locale `fetchDecksForAxis`: ≤50ms with `(language, status, exercise_type)` and `(language, status, age_range)` indexes.
- Theme-axis filter (`subjectTags @> [axisKey]`) via GIN: ≤30ms per query.
- Variety surface adds 4-8 queries per topic-page render. At 5,000 decks × 4 surfaces × ~30ms each = 120ms additional render time. Acceptable for ISR-cached pages.

**No additional indexes recommended for Path 2 at v1 scope.** Forward-defer:
- Recency queries (`ORDER BY published_at DESC LIMIT 8`) at scale benefit from the existing `(status, published_at)` index.
- Cross-locale "same content family" queries (when v2 translate-this-deck workflow ships) want a `(content_family_id, status)` index. Filed for v2 schema migration.

Recommended **monitoring** (not blocking): query plan inspection on the new variety helpers once topic page ships, before scale arrives. EXPLAIN ANALYZE on `fetchTopicSiblingsCrossLocale` at n=5000 simulated row count to confirm index-served plan. No work owed at v1.

### 4.4 Cacheability + cross-locale-honesty implications

ISR caches per locale + per slug. Variety strips on `/it/topic/animali/` mention decks in `/en/topic/animals/` etc. — cross-locale references are rendered into the it cache, not at request time. Cache invalidation cadence: 1 hour (existing). Acceptable freshness for newly-published cross-locale decks.

**Cross-locale variety honesty:** linked deck pages exist in their own locales. Visitor clicks `/de/topic/tiere/` → `[NL • 29 decks]` pill → arrives at `/nl/topic/dieren/`. Locale-switch is explicit (URL changes). hreflang remains correct. **No conflict with §17.4 honest-siblings doctrine.**

**Subscriber-tier value-leak risk:** None at v1. Topic-page variety surfaces show *deck counts* and *thumbnails* — both are free-tier content per §7. Subscriber-only content (lesson plans, themed bundles, workspace tools) is NOT surfaced in variety strips; it has its own pillar surfaces. Confirmed zero leak risk for Path 2 first-arc.

---

## Section 5 — implementation arc shape

### 5.1 Single-arc vs multi-arc

**Recommend: single arc, single commission, smallest-viable-first.**

Topic-page variety extension (§4.1) is the highest-leverage first commit because:
- Touches every search-landing surface (per §17.4 SEO doctrine, topic pages are the SEO win surface)
- Adds internal links the link-graph needs anyway (per §17.4 "every cross-link makes the link graph richer")
- Zero doctrine conflict with §1 topic-destination architecture (variety is **post-curation**, complementary)
- Algorithmic from day-one (no curation backlog)
- Bounded scope: 1 source file edit + 1 new component + 3 new lib helpers + ~16 translation keys × 4 locales

Multi-arc (homepage + topic + deck simultaneously) would risk:
- Inconsistent variety-signal grammar across surfaces (a hand-curated 12-cell homepage strip vs an algorithmic topic-page strip vs an operator-curated deck-page strip — 3 different curation models)
- Doctrine churn — §1 + §16.2 + §18.4 + §17.8.2 amendments simultaneously
- Larger commission with more interfaces to design before the first one ships and proves out

**First commission scope (recommended single-arc):**
Topic-page below-the-fold variety extension + numeric-scale-copy in homepage Hero/BreadthGrid intro. Two file edits, both small, shared §1 + §16.2 amendment. Numeric-scale-copy pairs cleanly with the topic-page work because both target catalog-effect impression at minimal cost.

### 5.2 Sequencing recommendation

**Arc 1 (THIS commission):** Topic-page variety extension + homepage numeric-scale-copy.
- Output: topic pages produce in-content cross-link density; homepage Hero asserts catalog scale.
- Doctrine pass companion: §1 amendment ("variety-signal complements topic-destination architecture per Path 2"), §16.2 amendment (variety surfaces below the deck grid), small §18.4 note.
- Expected ship: 1 commission cycle.

**Arc 2 (follow-on, after Arc 1 ships and traction signal observable):** Homepage Section 2 expansion to 12 cells + second variety strip ("recently added" or "by educational level" — operator-strategic per §6.1).
- Doctrine pass companion: §18.4 extension to >8 cells (the relax-theme-balance / preserve-locale-mechanic rule).
- Operator weights per traction signal: did Arc 1 produce measurable improvement in pages-per-session or avg-pages-per-visitor? If yes, Arc 2 doubles down. If no, reconsider posture before further investment.

**Arc 3 (v1.5):** Deck-page (deck.html) end-of-deck strip extension at publish-cli time. Adds 2-4 operator-curated "you might like" picks per published deck.

**Arc 4 (long-term):** Search + faceted browse arc (per §11 "Catalog page Phase 1/2/Gate 1 share-work revival" + "Topic destination pages full-shape brief beyond §16's minimal taxonomy"). Out of Path 2 scope; references project_mass_publish_recon.md Section B.

### 5.3 Doctrine implications

Path 2 requires a small CLAUDE.md amendment but not a structural rewrite:

- **§1 one-paragraph clarification.** "The topic destination page remains the central UX. Variety-signal surfaces complement curated-narrowing — every page links outward to neighboring topics, alternate locales, and the catalog landing — so visitors form a snap-judgment that the catalog is broad and varied without compromising the topic's curated focus." Filed for next doctrine pass.
- **§16.2 page composition extension.** The "Related topics" optional row from §16.2 becomes load-bearing per Path 2: 1-4 below-the-fold variety sections per topic page. Mark it from "Optional row" to "Variety surfaces (Path 2)".
- **§18.4 amendment** at next-doctrine-pass time when Arc 2 ships (cardinality past 8).
- **§17.8.2** stays unchanged at v1; deck-page extension is Arc 3.

---

## Section 6 — open questions for operator-strategic decisions

### 6.1 Recency as a first-class catalog signal

Path 2 Arc 2 candidate: a "recently added" homepage strip + topic-page recency-ordering. Should "newness" be a load-bearing variety axis, or stay as the implicit `ORDER BY publishedAt DESC` default?

Trade-off:
- **Yes-recency:** strong freshness signal — "this catalog grows" — supports Tier 3+4 launch optics ("Italian just shipped"). Requires a stable publish cadence to be load-bearing.
- **No-recency:** simpler chrome, no calendar pressure, but loses one variety axis.

**Recon recommendation:** filed for Arc 2 commission, not Arc 1. Arc 1's topic-page variety extension uses recency *implicitly* (each section's tiles are recency-ordered) without making "Recently added" a labeled section. Arc 2 surfaces it labeled if operator authorizes.

### 6.2 Popularity as a first-class catalog signal

No tracking infrastructure exists today (no view-counts, no share-counts, no embed-counts beyond unique-link generation per §4.4). Implementing popularity-as-signal requires:
- Counter columns on `Deck` (reads per surface) — schema change
- Increment-write logic (must NOT block teacher requests)
- Aggregation for "popular this week" / "most embedded"

Not in Path 2 scope. Filed as separate v1.5+ candidate. Operator-strategic.

### 6.3 Personalization for logged-in subscribers

Per §6.3 + §11, personalization is excluded from launch. Tool 6 from SUBSCRIPTION-SCOPE.md (personalized-feed) is platform-infrastructure-deferred. Path 2 first-arc scope explicitly avoids personalization.

When personalization eventually ships, the topic-page variety surfaces are already structured to accommodate personalized substitution: the algorithmic helpers (`fetchTopicSiblingsCrossLocale`, `fetchNeighboringAxisKeys`) become layered with a per-user signal.

### 6.4 Cross-locale variety yes/no

**Operator-strategic.** Trade-off:
- **Cross-locale ON:** stronger breadth-signal, helps Tier 3+4 launch optics, increases pages-per-session via locale-pivot. Costs: confusing for visitors who landed on `/it/` expecting Italian content; locale-switch must be explicit (URL-visible). v1 with `it`/`fr`/`pt`/`sv`/`da`/`no`/`fi` at 0 decks each, the cross-locale strip on those locales' pages would render *empty* (per §16.6 honesty); only en/de/es/nl pages render the strip in Arc 1.
- **Cross-locale OFF:** preserves visitor language-expectation. Loses the cross-locale variety axis. Tier 3+4 locales' topic pages stay variety-thin until their Track C catalog ships.

**Recon recommendation:** **Cross-locale ON** for Arc 1, with strict honesty discipline. Locale-pivot pills carry locale label + deck count badge, click navigates to the other-locale topic page (URL changes; visitor sees explicit locale switch). Honesty discipline (§16.6) ensures pills only render for locales where decks exist. At Tier 3+4 first-publish events, those locales' pages auto-populate. Net positive at minimal risk.

### 6.5 The "second issue" — operator-pending

Per the brief: "Surface in recon if it's still pending; otherwise note as open-pending." No "second issue" surfaced organically during recon execution. Noting as **open-pending**: operator surfaced it implicitly in the brief but did not include the substance. Recon completes; closeout flags this for operator follow-up.

---

## Closeout

- **Document path:** `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\project_catalog_variety_recon.md`
- **Halt conditions hit:**
  - WebFetch 403 on education.com `/resources/worksheets/`, `/worksheets/`, `/games/`, `/lesson-plans/`, `/worksheets/kindergarten/math/`. Wayback Machine also rejected. Twinkl homepage worked. TPT homepage 403. Workaround: education.com homepage + Twinkl homepage gave the load-bearing finding (categorical-funnel + numeric copy, NOT tile density). Operator-supplied screenshots of education.com's deeper surfaces would refine §1.2-§1.4 but are not blocking.
  - Open question 6.5 — the "second issue" the operator referenced did not surface organically; flagged open-pending.
- **Most consequential findings:**
  1. **Competitor catalog-effect is asserted via copy + categorical-funnel, NOT tile density.** Path 2 doesn't need to compete on tile cardinality.
  2. **Topic page is the highest-leverage variety-signal surface.** Currently a graph-leaf; below-the-fold variety extension produces the biggest catalog-effect lift at lowest cost.
- **Recommended sequencing:** Single arc, single commission. Topic-page below-the-fold variety extension (§4.1) + homepage numeric-scale-copy (§3.3 part B). Doctrine companion: §1 + §16.2 + §17.4.x amendments queued for next doctrine pass.
- **Operator-strategic decisions flagged:**
  - 6.1 recency-as-first-class-signal (Arc 2)
  - 6.2 popularity-as-first-class-signal (deferred; needs schema + tracking)
  - 6.3 personalization (out-of-scope per §11)
  - 6.4 cross-locale-variety on/off (recon recommends ON for Arc 1)
  - 6.5 the operator's "second issue" — open-pending
- **Confirmation:** **0 commits, 0 pushes, 0 deploys, 0 DB writes.** Hetzner queries strictly read-only (`SELECT` against `decks` table). Catalog state at recon: n=116 published decks (29 mechanics × 4 locales en/de/es/nl). Age-range heavily kindergarten-weighted (76% at 5-7); 0 grade-3. Theme axis thin (only `animals` tag in production; 49 of 116 decks tagged).
