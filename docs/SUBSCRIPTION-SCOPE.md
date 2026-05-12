# SUBSCRIPTION-SCOPE.md

**Status:** Canonical scope specification for the LessonCraftStudio $69/year subscription. **v3** — 6-condition launch-trigger re-lock + Pillar 2 redefinition (teaching-package bundles) + NSR bifurcated discipline + post-Arc-4 master/locale count update.
**Authored:** 2026-04-30 (chat-side strategic conversation, post-Brief-B sealing).
**Revised:** 2026-05-08 (v3 reconciliation merging operator-pasted v2 6-condition re-lock against current canonical state).
**Supersedes:**
- v1 (chat-side strategic conversation 2026-04-30) and prior informal references to "$69 subscription unlocking workflow features" in CLAUDE.md §3.
- v2 draft (2026-05-07; operator-side workspace authoring; never merged as a separate document — folded directly into this v3 with the 7 reconciliation deltas resolved per operator ratification batch 2026-05-08).
- The legacy clause-(a)/(b)/(c) framing under the lesson-plan-as-text-plans definition. The lesson-plan substrate underwent a fundamental redefinition during the Arc 1-3 lesson-plans series: lesson plans are no longer text deliverables; they are **teaching packages** — pedagogical learning targets with composed exercises and image-library-driven materials. The 6-condition launch-trigger framework in §1 below is the canonical successor framework.
**Audience:** Future Claude sessions, future Claude Code sessions, operator reference. Upload alongside CONVERSATION-HANDOFF.md to any future session that touches subscription-adjacent work (home page copy, pricing page, signup flow, account dashboard, FAQ, lesson-plan authoring, bundle authoring, NSR-flag clearance work).

---

## Summary

The $69/year subscription contains three feature areas:

1. **Teaching packages** (referred to in some surfaces as "lesson plans") — content-only library of pre-written, deck-linked teaching packages. Each package is a pedagogical learning target with composed exercises (drawn from the 29 §14.10 catalog apps' palette) and image-library-driven materials a K-3 teacher walks into a classroom and uses.
2. **Premium themed bundles** — curated bundles of teaching packages organized around a unifying theme. Bundles are downstream curation work over existing teaching packages; Pillar 2 closes naturally as a function of Pillar 1 progress.
3. **Workspace and catalog-management tooling** — organizational features for teachers managing the platform's growing catalog (5000+ decks expected within a short time).

Embedding is **not** part of the subscription. It remains fully free, in service of the §3 structural acquisition flywheel (embed-driven Path B traffic).

**Subscribe-flip launch trigger** is gated on the 6-condition framework specified in §1 below. The Tier-1+2 catalog-completion milestone (170 content units; 156 plans + 14 bundles) is **informational milestone, not launch trigger** per §1+§5 below.

---

## Strategic context for this scope

### The catalog-scale frame

The operator stated in the scope conversation that the catalog is expected to reach **at least 5000 decks within a short time**. This number reframes the workspace-tooling feature area from "nice-to-have organization" to "load-bearing usability." A 5000-deck catalog without organizational tooling is not browsable; the platform's central UX challenge becomes "find the deck I need." This makes feature area 3 (workspace tooling) the largest single justification for the subscription's existence — the catalog is free, but managing one's relationship with the catalog at scale requires the subscription.

### The free/paid boundary discipline

The §3 flywheel depends on the free experience being substantively complete. Decisions made during scope conversation that preserve flywheel integrity:

- **Embedding stays fully free.** Moving embedding behind the paywall would kneecap Path B acquisition (embedded decks on third-party sites driving traffic). Operator confirmed.
- **The catalog itself stays fully free.** All decks remain accessible to free users. The subscription does not gate content, with the limited exception of premium themed bundles (which are *additions* to the free catalog, not removals from it).
- **Sharing via link stays fully free.** Free users can share any deck via link; students play in the browser without an account.
- **Generating and downloading PDFs stays fully free.** The free user can take a deck home as a printable artifact.

The subscription's value comes from layering organization, content, and curated bundles *on top of* the free experience — not from gating capabilities that should be free.

### The persona theory

The subscription is built for the **regular-use teacher who has integrated LessonCraftStudio into their ongoing teaching practice**. Specifically, a teacher who:

- Visits the platform weekly or more, not occasionally.
- Has a recurring teaching pattern (consistent grade level, language(s), and topic rotation across the school year).
- Wants ready-to-use materials (teaching packages, themed bundles) when time-pressured.
- Wants persistent organization (collections, workspace, curriculum mapping) for the materials they use.
- Will renew year-over-year because their saved structure carries forward.

The subscription is **not** built for the occasional user (free experience is complete for them), the institutional buyer (separate school-license tier per CLAUDE.md §11, downstream), or the power-user with strong custom workflow demands (a builder/composer audience, deliberately not served — see "Deliberately not in scope" below).

---

## §1 Launch-trigger conditions (6-condition gate)

Notify-me → Subscribe flip occurs when **ALL** of the following are met (AND-gated):

### Condition 1 (Master authoring) — All 203 master teaching-packages authored in en

All 203 unique pedagogical-target packages exist with full authoring at canonical quality in the English locale. Each package includes:
- Composed exercise list (palette references with customization parameter values from `frontend/lib/exercise-palette.json`)
- Materials list (catalog references with per-material customization)
- Metadata (3-level taxonomy reference per `frontend/config/learning-targets.json`, prerequisites, success criteria)
- Validated by `frontend/scripts/author-teaching-package.ts` CLI tooling
- Reviewed by classroom-teacher agent for K-3 classroom-functional fit (per Arc 1 discipline)

**Scope:** 203 master packages (the locked taxonomy size; full coverage, not 200 ± buffer). All 5 domains (early-literacy / early-numeracy / world-knowledge / cognitive-and-executive-function / fine-motor-and-visual-spatial) and all locked strands populated per Condition 4.

### Condition 2 (Locale coverage) — All 11 locales fully populated

For each of the 11 locales (en + es + pt + it + de + fr + nl + sv + da + no + fi), all 203 packages exist as locale variants. Locale variants use the sparse-override architecture from Arc 3 Phase 1; canonical quality required (NSR-flag posture per Condition 3).

**Scope:** 203 packages × 11 locales = 2,233 package instances. 203 master (en) + 2,030 sparse-override locale variants.

### Condition 3 (NSR-flag clearance) — No NSR-flagged content at launch surface

All NSR-flagged locale variants accumulated during in-flight authoring must be resolved to canonical-quality state before launch. NSR-flag-at-ship remains the in-flight discipline (per CLAUDE.md §17.5.1). **NSR-resolution-before-launch is a separate operator-strategic gate** — see §3 below for the bifurcated discipline.

**Implies:**
- Nordic four (sv/da/no/fi) morphological gaps require substantive linguistic resolution.
- Finnish-specific complexities (agglutinative morphology, vowel harmony, gradation) require native-speaker review at minimum, likely native pedagogue review for K-3-appropriate register.
- NUMBER_WORDS gender-default architectural finding from Arc 3 must be resolved (Romance/Nordic/Finnish gender concord work).
- IMAGE_VOCABULARY extension for substrate-gap-blocked targets (family-members + action-verbs candidate keys × 11 locales × gender data) per Arc 4 Phase 1 Path B finding; Arc 5 Phase 1 substrate sweep is the canonical resolution path.
- Any other NSR-flags accumulated during Arc 5+ authoring must close before launch.

**Scope:** all NSR memory entries cleared; full audit confirms zero NSR-flagged content in launch-active package set.

### Condition 4 (Strand coverage) — All 5 domains and all locked strands populated

The 203 packages distribute across all 5 domains (early-literacy / early-numeracy / world-knowledge / cognitive-and-executive-function / fine-motor-and-visual-spatial) and all locked strands per Arc 1 taxonomy v1 with A-G additions. No strand left unpopulated; minimum-1-package-per-strand floor.

**Implies:** Cross-strand validation must complete for all strands before reaching 203-package threshold. Arc 1-4 validated vocabulary-acquisition strand (under early-literacy domain) + early-numeracy domain. Remaining strands across all 5 domains each need Arc-2-style cross-strand stress-test before authoring volume commits. Arc 5 Phase 4 begins this expansion (Option B locked per Arc 5 ratification).

### Condition 5 (Free-tier surface) — 3 packages identified as free SEO-bait, cross-domain

Three packages are designated as free-tier (no Subscribe required), drawn from three different domains for cross-domain demonstration of platform breadth:
- One from **early-literacy** domain (vocabulary-acquisition or phonics or reading-comprehension strand)
- One from **early-numeracy** domain
- One from a **third domain** (world-knowledge / cognitive-and-executive-function / fine-motor-and-visual-spatial — operator picks third domain when free-tier curation begins, deferred to Arc 6+)

**Implies:**
- The 3 free packages must be operator-curated for canonical-quality first treatment.
- Free-tier packages need SEO optimization (meta tags, Open Graph, structured data, internal linking) for organic acquisition.
- Free-tier packages and paid-tier packages must be visually + functionally consistent — no quality split between tiers.
- The 3 packages serve as the organic-traffic landing surface for the §1 acquisition flywheel.

**Scope:** 3 specific packages identified before launch; selection deferred to operator strategic call when Arc 5+ data informs which packages have strongest cross-tier conversion appeal.

### Condition 6 (Themed bundles — Pillar 2 redefined) — ≥N curated bundles spanning ≥M themes

Pillar 2 under the new teaching-package definition: **curated bundles are collections of teaching packages organized around a unifying theme** (e.g., "Farm Life" bundle = farm-animals package + count-farm-objects package + farm-themed sentence-frame variants of literacy packages + farm-themed material variants).

Bundles are **downstream curation work** over existing teaching packages, not separate authoring tracks. Pillar 2 closes naturally as a function of Pillar 1 progress + a bundle-curation arc once master-package volume justifies it.

**Threshold:** ≥N curated bundles spanning ≥M themes (specific N and M operator-locks at bundle-curation arc commission, when empirical Arc-5+ data informs realistic threshold setting). Working placeholder: ≥7 themed bundles spanning ≥7 themes.

**Scope:** bundle-curation arc commissions when ≥50 master packages exist across ≥10 themes (estimated post-Arc-7 or Arc-8 commission window).

### Pillar 3 (Workspace tooling) — UNCHANGED, CLOSED

Pillar 3 closed at `a2829d88` per original SUBSCRIPTION-SCOPE.md. No re-lock needed. Implementation order (Tools 1+2+5 for launch; Tools 3+4 post-launch; Tool 6 deferred) preserved per Resolved decision #6 below.

---

## §2 Decomposition under the new definition (6-clause progress tracking)

The legacy clause-(a)/(b)/(c) decomposition is superseded. New decomposition for ongoing progress tracking:

| Clause | Description | Current state | Threshold |
|---|---|---|---|
| **a** | Master packages authored (en) | **21/203 (10.3%)** | 203 |
| **b** | Locale variants populated | **7/2030 (0.3%)** | 2030 |
| **c** | NSR-flag clearance | Open NSR memory entries (NUMBER_WORDS gender + IMAGE_VOCABULARY extension + Nordic morphological gaps + Romance/Nordic gender-data audit) | 0 |
| **d** | Strand coverage breadth | 2 strands validated (vocabulary-acquisition + early-numeracy) | All locked strands |
| **e** | Free-tier surface | Not yet selected | 3 specified across 3 domains |
| **f** | Themed bundles (Pillar 2 redefined) | Not yet authored (substrate shipped at `20260504081907_add_bundle_schema`; tables empty) | ≥N bundles × ≥M themes (TBD) |
| (Pillar 3) | Workspace tooling | CLOSED | CLOSED |

**Note on master count progression:**
- Arc 1: farm-animals (1) → 1 total
- Arc 2: 8 packages → 9 total
- Arc 3: count-objects-1-to-10 enhancement (numeral-cards anchor, not net-new) + 5 numeracy → 14 total (+ 1 cross-strand prototype = 15 if counting Arc 2's cross-strand independently)
- Arc 4: 3 vocab Phase 1 (foods + zoo-animals + pet-animals via Path B substrate-driven scope pivot) + 3 numeracy Phase 3 (subitize-1-to-5 + count-on-from-given-number + add-within-5) → **21 total at Arc 4 close (`ea5adced`)**

**Note on locale variant progression:**
- Arc 2 Phase 2: 1 es (farm-animals) → 1 total
- Arc 3 Phase 2: 3 pt (farm-animals + clothing + count-objects-1-to-10) → 4 total
- Arc 4 Phase 2: 3 pt (foods + zoo-animals + pet-animals; Brazilian Portuguese register) → **7 total at Arc 4 close (`861b992a`)**

**Note on Pillar 2 substrate readiness:** Bundle table + BundleDeck + BundleLessonPlan + BundleTeachingPackage join tables ALL shipped at migration `20260504081907_add_bundle_schema`. Schema substrate is ready; authoring is operator-side cooperation-pattern work pending Pillar 1 progress + bundle-curation arc commission per Condition 6 scope note.

---

## §3 NSR-flag policy — bifurcated discipline

NSR-flag has two distinct disciplines that must not be conflated:

**In-flight (during authoring):** NSR-flag-at-ship per CLAUDE.md §17.5.1. Sub-canonical-quality state visible-and-queueable. Authoring proceeds; NSR-flag accumulates as known debt. The in-flight discipline supports forward velocity — content ships at best-effort quality with NSR-flag-tagged audit trail; operator reviews accumulated debt at periodic NSR-resolution arcs.

**Launch (before Subscribe flip):** All NSR-flagged content must be resolved to canonical quality. NSR-flag clearance is a launch condition (Condition 3 in §1 above). Resolution requires:
- Native-speaker review for linguistic correctness in target locale
- Native pedagogue review for K-3 register appropriateness (where applicable)
- Validator-tooling pass after corrections applied
- NSR memory entry closed with resolution audit trail

**Estimated NSR-resolution effort scale:** unknown until Arc 4-6 NSR-flag accumulation rate empirically clarifies. Likely substantial — Nordic + Finnish morphological work alone is multi-session expert involvement. May require dedicated infrastructure-sweep arc(s) under `[INFRA][LESSON-PLANS]` shape post-content-authoring-completion.

The bifurcation matters at every authoring decision: in-flight authoring is forgiving (NSR-flag captures debt); launch-readiness is strict (NSR-flag clearance gate). Conflating the two produces either authoring-velocity loss (treating in-flight as launch-strict) or surprise-at-launch (treating launch as in-flight-forgiving).

---

## §4 Authoring-envelope projection

Based on Arc 1-4 empirical data:

- **Master package authoring rate:** Arc 1 ship-1 + Arc 2 ship-8 + Arc 3 ship-5 + Arc 4 ship-6 = 20 over 4 sessions (≈5/session sustained cadence; Arc 4 trending toward higher cadence). Sparse-override + agent-validation maturity continues to improve cadence; Arc 5+ likely improves further.
- **Sparse-override locale variant rate:** ~4× faster than master per Arc 3 evidence (~20 variants per session at peak).

Projected envelope:

- **203 master packages:** ~40 CC sessions (at 5/session sustained cadence; 30-50 high-confidence range)
- **2,030 locale variants:** ~100 CC sessions (at 20/session sustained cadence; 80-150 range)
- **NSR-resolution sweep:** unknown; estimated 50-100 expert-involved sessions (high uncertainty; resolves only when first NSR sweep arc commissions)
- **Cross-strand validation arcs:** ~5-7 stress-test arcs distributed across strand expansion (~10-15 sessions)
- **Free-tier curation + Pillar 2 bundle-curation arcs:** ~30-50 sessions combined
- **Total CC session envelope:** ~300-500 sessions (high-confidence range)

**Implication:** Launch is a multi-month-to-multi-quarter envelope at sustainable cadence. Not a blocker — calibration. The launch trigger is real-work-distance, not paperwork-distance. Future arcs refine the projection empirically as Arc 5+ ship data accumulates.

---

## Feature Area 1: Teaching packages (content-only)

### Shape

A library of pre-written teaching packages (called "lesson plans" in some user-facing surfaces; the architectural term is "teaching packages" per the Arc 1-3 redefinition), each one tied to specific decks in the catalog OR to pedagogical learning targets that compose exercises across multiple decks. Teachers browse the package library, pick a package relevant to their grade/language/topic, and use it as-is — print it, follow it, adapt it informally in their classroom.

**Explicitly excluded:** package-builder tool, package editor, "save as my own" affordance, custom package composition. Operator decision: teaching packages are content only, not a tool. The teacher who wants to compose their own packages uses Tool 4 (curriculum mapping) in feature area 3 instead, which provides lighter-weight persistent structure without the engineering cost of a full builder.

### Pedagogical and format requirements

Pre-written teaching packages must be **opinionated to be useful**. Vague packages ("introduce vocabulary, do worksheet, review") are worse than no packages because teachers can produce that themselves in seconds. Useful packages require:

- **A specific pedagogical approach** — **RESOLVED 2026-05-02 (strategic-decisions session): CLIL (Content and Language Integrated Learning).** Aligns the pedagogical layer with the locked positioning frame (dual-language K-3 teacher) + with the secondary audience (international schools running IB PYP / Cambridge Primary / IPC). Every teaching package reflects the CLIL stance; the stance is named on each package for transparency.
- **A defined structural format** — warmup → content-language integrated activity → language-scaffold + practice → closure, with timing per section. Consistent across all packages in the library so teachers learn the format once. Encoded in `LessonPlan.structure` JSON (Prisma schema commit `9ba9fa2d`) and `TeachingPackage.structure` JSON (Prisma schema commit `3b33fe1d`).
- **A clear point of view** — what does good K-3 multilingual instruction look like under CLIL? Packages should reflect a coherent CLIL philosophy, not a generic template filled in.

### Content pipeline commitment

A teaching-package library that doesn't grow stops being a paid-tier reason within a year. Once a teacher has used the relevant packages, the value is exhausted. The subscription requires an **ongoing content pipeline**:

- New packages added regularly across the 11 languages.
- Coverage across the topic taxonomy (currently 4 of 29 apps registered in `topics-taxonomy.json`; full coverage gated on taxonomy expansion brief per CLAUDE.md §11).
- Pedagogical review for quality before publication.
- Localization where needed (a German teaching package is not just a translated English one — it reflects German classroom conventions, vocabulary expectations, and pedagogical norms).

This is a recurring content-investment cost. The operator should plan for this pipeline as part of the subscription's ongoing operation, not as a one-time launch effort.

---

## Feature Area 2: Premium themed bundles (Pillar 2 redefined)

### Shape

**Curated themed bundles**, hand-assembled and paid-tier-only.

Per the Arc 1-3 lesson-plan-as-teaching-package redefinition (operator ratification 2026-05-08): **bundles are collections of teaching packages organized around a unifying theme**. Bundles are downstream curation work over existing teaching packages, not separate authoring tracks. Pillar 2 closes naturally as a function of Pillar 1 progress.

Each bundle is a set of teaching packages unified by a theme (seasonal, topical, occasion-based, curricular unit, etc.) plus optional paired lesson plans and (where helpful) selected decks for cross-reference. Examples:

- "Halloween bundle" — Halloween-themed teaching packages (e.g., identify-and-name-Halloween-vocabulary + count-Halloween-objects + Halloween-themed sentence-strip variants) + paired lesson plans on the same themes.
- "First week of school bundle" — icebreaker / introductory teaching packages + a first-week lesson plan.
- "Numbers 1-20 in German bundle" — a coherent unit of German number-learning teaching packages + a unit lesson plan.

### Schema (shipped at `20260504081907_add_bundle_schema`)

The Bundle table + companion join tables shipped via Prisma migration `20260504081907_add_bundle_schema`. Tables are empty (substrate-only); authoring is downstream cooperation-pattern work pending Pillar 1 progress + bundle-curation arc commission.

```prisma
model Bundle {
  id           String    @id @default(cuid())
  slug         String    // unique per locale via @@unique([language, slug])
  themeAxisKey String    // soft FK into topics-taxonomy.json axes.theme.<key>
  language     String    // ISO 639-1; one Bundle row = one locale
  title        Json      // {en: "...", de: "...", ...}
  description  Json
  thumbnailUrl String
  status       String    @default("draft")
  publishedAt  DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  decks            BundleDeck[]
  lessonPlans      BundleLessonPlan[]
  teachingPackages BundleTeachingPackage[]

  @@unique([themeAxisKey, language])  // 7×2 launch shape
  @@unique([language, slug])
  @@index([status, publishedAt])
  @@index([language, status])
}

model BundleTeachingPackage {  // PRIMARY content-unit join per v3 Pillar 2 redefinition
  bundleId          String
  teachingPackageId String
  bundle            Bundle          @relation(...)
  teachingPackage   TeachingPackage @relation(...)
  @@id([bundleId, teachingPackageId])
}

model BundleLessonPlan {       // PAIRED lesson plans per Pillar 2 spec
  bundleId     String
  lessonPlanId String
  bundle       Bundle     @relation(...)
  lessonPlan   LessonPlan @relation(...)
  @@id([bundleId, lessonPlanId])
}

model BundleDeck {              // OPTIONAL deck cross-reference (legacy framing preserved)
  bundleId String
  deckId   String
  position Int
  bundle   Bundle @relation(...)
  deck     Deck   @relation(...)
  @@id([bundleId, deckId])
  @@index([bundleId, position])
}
```

No `priceUsd`, no `variantId`, no `isPremium` flag — entitlement is purely "user has active LCS subscription" per the existing Subscription table. Pillar 4 (embedding) stays free per its own section.

**v2→v3 redefinition note:** The pre-v3 canonical described Bundle as "deck-bundles" (Bundle.deckIds[] array). The shipped schema actually has all three M2M joins (BundleDeck + BundleLessonPlan + BundleTeachingPackage); BundleTeachingPackage was reserved per §17.8.7 reservation pattern with no v1 consumers expected. v3 promotes BundleTeachingPackage to PRIMARY join (the operative unit per the Arc 1-3 redefinition); BundleDeck is preserved for optional deck cross-references but no longer the canonical bundle content unit. **No data migration required** (zero rows authored at v3 ratification time; routes deferred; clean substrate).

### Bundle relationship semantics (locked)

Three policy clarifications resolve operator-strategic questions baked into the v3 Pillar 2 schema choice:

**1. Teacher-facing browse-route default.** When the future `/[locale]/bundles/[slug]` route ships (currently route-deferred per substrate-only schema state), the bundle browse page renders content surfaces in this priority order:

- **Primary surface:** the bundle's **teaching packages** (`BundleTeachingPackage` join). The bundle's `composedExercises` materials and pedagogical anchors live here. This is the operative content unit for the subscriber's interaction.
- **Pedagogical wrapper:** the bundle's **paired lesson plan(s)** (`BundleLessonPlan` join), rendered alongside the teaching-package grid as the bundle's "how to use this together" wrapper. Pairing is enforced at authoring time per Feature Area 2 "Bundle/lesson-plan pairing."
- **Optional cross-reference annotation:** the bundle's **decks** (`BundleDeck` join), if present, render as a "Related decks" cross-reference strip below the primary teaching-package grid. NOT a primary content surface; NOT load-bearing for the bundle's value proposition. Bundles can ship with zero `BundleDeck` rows; no validation requires deck membership.

**2. Future deck-bundles: cross-reference annotations only, NOT a parallel surface.** All Bundle rows under v3 are **teaching-package bundles**. There is NO `Bundle.type` field distinguishing teaching-package bundles from deck-bundles; the Bundle table is single-shape. `BundleDeck` rows on a Bundle row are annotations *on that teaching-package bundle*, never constituting an alternative bundle shape on their own.

If a future commission needs deck-only bundles (no teaching packages — e.g., for a "themed deck collection" content surface that doesn't carry teaching-package framing), that requires its own commission to add a `Bundle.type` discriminator field OR a sibling `DeckCollection` table. **Not v3 territory.** Within v3, every published Bundle row is the teaching-package shape; `BundleDeck` is the optional annotation slot only.

**3. §1 SEO flywheel theme-agnosticism preserved.** The CLAUDE.md §1 + Arc 1 architectural lock that **teaching packages are theme-agnostic** (theme picked at material-render time; preserves §1 SEO flywheel separation between curriculum axis and theme axis) carries through cleanly under v3's primary-relationship reframe:

- Bundles organize packages **around** themes (Bundle.themeAxisKey describes the *bundle's* theme), not **by assigning** themes to packages.
- A constituent `TeachingPackage` (e.g., `count-objects-1-to-10`) remains theme-agnostic and can appear in multiple bundles spanning different themes (Halloween counting bundle + farm-animals counting bundle + winter-holidays counting bundle — same package, different bundle theme contexts).
- Material-render-time theme selection still happens per-package per-render, NOT at bundle-membership time. The bundle's `themeAxisKey` is a curation/browse facet on the BUNDLE row; it does not propagate to constituent packages' material rendering.
- This means a teacher rendering a Halloween-bundle's count-objects-1-to-10 package gets the package rendered with Halloween-themed materials *because the operator at bundle-curation time picked Halloween-theme variants of materials when composing the bundle*, NOT because the package itself carries a Halloween theme. The package stays theme-agnostic; the curator's choice of theme materializes at render time per the existing material-render pipeline.

This preserves the SEO flywheel's structural property: every package is reusable across all themes (curation work scales linearly with bundles, not with packages × themes); every theme axis-key remains independently rankable in search; the bundle layer is the curation overlay.

### Pricing (locked)

**RESOLVED 2026-05-02 (strategic-decisions session): all-in-subscription.** Every bundle is included in the $69/year subscription. No per-bundle SKUs, no individual purchase paths, no Purchase model resurrection. Subscription lapse semantics: subscription lapses → bundle access ends. Re-subscribe → bundle access restored. The lapsed teacher's collections + workspace state per Pillar 3 persist across the lapse window per the standard 60-day grace per CLAUDE.md §7.

### Launch bundle list (locked at 7×2 = 14)

Per Resolved decision #3: **7 bundles per locale × 2 locales (en+de Tier 1) = 14 bundles** at the Tier 1+2 catalog completion milestone (per the §"Tier 1+2 catalog completion milestone" subsection below; this is informational milestone, NOT the Subscribe-flip launch trigger which is the 6-condition gate in §1).

Per locale:

1. **Back-to-school** — first-week-of-school packages + first-week lesson plan.
2. **Halloween** — seasonal packages + Halloween lesson plan.
3. **Winter holidays** — seasonal packages + winter-holiday lesson plan.
4. **Valentine's Day** — themed packages + Valentine's lesson plan.
5. **End-of-year** — review/celebration packages + end-of-year lesson plan.
6. **End-of-unit-review (early-year)** — review-format packages + early-year-review lesson plan.
7. **End-of-unit-review (mid-year)** — review-format packages + mid-year-review lesson plan.

Five seasonal/occasion-based bundles + two structural review bundles. Mix is intentional: seasonals carry teacher familiarity ("I know I'll need a Halloween activity"); review bundles answer "what do I do at the end of a unit" — a recurring teacher need that doesn't sit on the calendar.

**es+nl bundle authoring filed as follow-on extension** once en+de bundle library closes and operator commissions Tier 2 bundle expansion.

### Bundle/lesson-plan pairing

**Bundles ship with paired lesson plans on the same theme.** A bundle is "a set of teaching packages + a lesson plan," not "a set of packages alone." This was an explicit operator decision in scope conversation. The pairing makes both feature areas more valuable than they'd be separately:

- The lesson plan tells the teacher *how to use* the bundle's teaching packages together.
- The bundle gives the lesson plan a coherent set of materials to reference.
- The teacher gets a complete teaching unit, not just raw materials.

### Bundle composition guidelines

- Bundles consist of teaching packages that exist in the package catalog plus, optionally, packages created specifically for the bundle (premium-only).
- A bundle's component packages remain accessible to free users individually (free-tier packages per Condition 5 are always free; subscriber-only packages stay subscriber-only); the bundle's value is in the *curation*, not in gating the constituent packages. **Exception:** bundle-specific packages created for that bundle may be premium-only; this is a content-creation decision case-by-case, not a structural gate.
- Bundles must clear a quality bar — they're a primary visible "what does the subscription deliver" surface, so a sloppy bundle costs more credibility than a missing bundle.

### Excluded shapes (decided against)

- **Curriculum-aligned bundles** (IB Primary Years, Cambridge, national curricula). Considered and deferred. Higher-value to international schools specifically, but higher build cost and longer pedagogical-review cycle. Possible later extension; not in initial scope.
- **Premium-only individual decks** (paid-tier-flagged decks not in any bundle). Considered and decided against. Less legible to teachers ("why is this one deck paid?"), undermines the principle that the catalog is free, and creates ongoing content-decision overhead ("should this new deck be free or premium?"). Cleaner to keep individual decks free and let bundles do the curation work via teaching-package collections.

---

## Feature Area 3: Workspace and catalog-management tooling

### Frame

**Tools for managing the teacher's own teaching practice across a growing catalog**, not tools that improve the catalog itself. This framing matters: if the catalog "gets better" with the subscription, that invites the question "why isn't the catalog organized for everyone?" If the *teacher* gets better-equipped, that's a coherent paid-tier value proposition that doesn't undermine the free experience.

### Implementation order (locked)

**RESOLVED 2026-05-02 (strategic-decisions session): 1 → 2 → 5 → 3 → 4.**

- **Launch-day surface (Tools 1, 2, 5):** Collections, Workspace home, Bulk operations. All three ship against the existing Pillar 3 schema substrate landed at commit `9ba9fa2d` (Collection + CollectionDeck + DeckFavorite + EmbedConfig + PlayLink — no further schema work blocks Tools 1+2+5).
- **Post-launch (Tool 3, then Tool 4):** Advanced filtering, then Curriculum mapping. Each carries its own schema commission pass per `project_deferred_items_queue.md` ("Pillar 3 Tools 3+4 commission" entry). Plausible model shapes: SavedFilter (Tool 3), CurriculumTag + CurriculumTagDeck (Tool 4).
- **Tool 6 (personalized feed):** stays deferred to post-launch per the original "Deferred" sub-section below; not in the implementation-order sequence.

### Essential tools (load-bearing for paid-tier value)

**Tool 1: Saved decks + collections.**
Bookmarking with structure. Teachers save decks and organize them into named collections — "Spring vocabulary unit," "Letter recognition practice," "Numbers 1-20 review," "End-of-year activities." Collections are the foundation feature; everything else builds on them. Flat-list bookmarking is insufficient — the mental model of teaching materials is collection-shaped, not flat.

**Tool 2: A "my classroom" workspace.**
A persistent home view the paid teacher returns to. Shows recently used decks, their collections, anything pinned. Not a marketing dashboard with charts — a *working surface*. The paid teacher logs in and lands here, not on the catalog. This is the feature that makes the subscription feel like *a workspace they own* rather than *a storefront they visit*.

**Tool 5: Bulk operations.**
Selecting multiple decks and acting on them as a group: assign to a collection, print as a packet, share a collection via single link, export a collection as a single PDF for substitute teachers. At 5000-deck scale, individual-action UX breaks; bulk operations are the difference between 30-second tasks and 5-minute tasks. None of these are technically novel — they're table-stakes for catalog-scale tooling.

### Differentiator tools (where subscription value perception lives)

**Tool 3: Advanced personalized filtering.**
Filtering tuned to recurring teacher criteria that generic free-tier search can't address. Examples: "decks for grade 1, in German, 15-minute warmup, that I haven't used yet this year," "decks tagged with my Week 3 vocabulary unit," "decks recently added in topics I teach." Some dimensions (grade level, language) are free-tier search; the differentiator dimensions are those that require the platform to know who the teacher is and what they've done. This is where personalization earns its $69 keep.

**Tool 4: Curriculum mapping.**
Teachers tag saved decks with their own unit labels (e.g., "my Week 3 vocabulary unit," "my Halloween unit," "my Spring numbers review") and pull up everything tagged. This bridges into teaching-package territory (feature area 1) but as a workspace tool rather than a content product. **This tool became load-bearing once teaching packages were scoped as content-only** — it gives teachers persistent structure for their own thinking even though the platform doesn't provide a builder. A teacher's curriculum map carries forward year-to-year; this is the feature that turns a one-time user into a year-after-year subscriber, which is the core retention bet for an annual subscription.

### Deferred (not in initial scope)

**Tool 6: Personalized "what's new and relevant for me" feed.**
At 5000+ decks growing constantly, teachers cannot stay current by browsing. A personalized surface — "12 new decks in topics you teach, 3 of them in your languages" — would turn the platform from "a thing I visit when I need something" to "a thing that delivers value passively." High-value once it works, but harder to build well, and not blocking for an initial paid-tier launch. **Defer to post-launch.**

---

## Feature Area 4: Embedding (NOT in subscription, free for all)

Embedding interactive worksheets on personal websites, class sites, or blogs is **fully free**. Operator decision in scope conversation, on §3-flywheel-integrity grounds:

- The structural acquisition mechanism (CLAUDE.md §3) names "free decks + unlimited shareability + embed codes + structural SEO + attribution distribution" as load-bearing.
- Path B of the acquisition flywheel (embedded deck on third-party site → click attribution → home page → conversion) requires that *anyone* can embed.
- Gating embedding behind the subscription would limit Path B to paid users, who are a small subset of total users; this would severely weaken the flywheel.

This means embedding is **not** a subscription feature, **not** mentioned in subscription marketing, and **not** in the home page Section 5 (subscription) block. It belongs in home page Section 4 (free experience) where it's already placed.

---

## Deliberately not in scope (decided against during conversation)

- **Teaching-package builder / editor / composer.** Considered. Decided against. Teaching packages are content-only.
- **Premium-only individual decks.** Considered. Decided against. Bundles do the curation work via teaching-package collections; individual decks stay free.
- **Curriculum-aligned bundles** (IB, Cambridge, etc.). Considered. Deferred to possible later extension. Initial scope is themed bundles only.
- **Tool 6 personalized feed.** Considered. Deferred to post-launch.
- **AI-assisted teaching-package authoring.** Briefly raised as a candidate package-authoring shape. Not pursued — content-only decision rules it out, and Pillar 1 production pattern locked at cooperation-pattern (CC + copilot review) per Resolved decision #7.
- **School / institutional tier.** Real per CLAUDE.md §11 longer-arc items, but downstream of individual-tier traction. Not in this scope; gets sold to schools where teachers already use the platform individually. Belongs on its own page or surfaces only after individual-tier subscription has traction signal.

---

## Resolved decisions (audit trail)

The 6 open decisions originally enumerated were all resolved at the **strategic-decisions session 2026-05-02**. Resolution #7 added at Phase 1c apply (`e912b805`). Resolutions are folded into the §1 Conditions + Pillar sections above; this section preserves the audit trail.

1. **Pedagogical stance for teaching packages.** RESOLVED 2026-05-02: **CLIL (Content and Language Integrated Learning).** Aligns the pedagogical layer with the locked positioning frame (dual-language K-3 teacher) + with the secondary audience (international schools running IB PYP / Cambridge Primary / IPC). Folded in: Feature Area 1 "Pedagogical and format requirements."

2. **Initial teaching-package library size at subscription launch.** RESOLVED 2026-05-02 (combined with #3 as Tier-1+2-catalog-completion milestone): **1 lesson plan per published deck per locale** (legacy Path A definition). Reframed at v3 (operator ratification 2026-05-08): **the legacy 156-plans figure is informational milestone, NOT launch trigger.** Subscribe-flip is gated solely on the §1 6-condition framework. Folded in: §"Tier 1+2 catalog completion milestone" below.

3. **Initial bundle library size at subscription launch.** RESOLVED 2026-05-02: **7 bundles per locale × 2 locales (en+de Tier 1) = 14 bundles total.** Reframed at v3 as Tier-1+2 milestone (NOT launch trigger). The 7 per locale: back-to-school, Halloween, winter holidays, Valentine's Day, end-of-year, plus two end-of-unit-review bundles (early-year + mid-year). Folded in: Feature Area 2 "Launch bundle list" + §"Tier 1+2 catalog completion milestone" below.

4. **Bundle pricing structure.** RESOLVED 2026-05-02: **all-in-subscription.** Every bundle included in $69/year subscription. No per-bundle SKUs, no individual purchase paths, no Purchase model resurrection. Bundle model = content-record-only. Folded in: Feature Area 2 "Pricing" + "Schema."

5. **Teaching-package localization strategy.** RESOLVED 2026-05-01 (Prisma schema commit `9ba9fa2d`): **per-locale rows.** Packages authored per-locale, not auto-translated; en+de Tier 1 at launch. Schema-encoded via `LessonPlan @@unique([topicSlug, language])` + `TeachingPackage @@unique([targetSlug, language])`. Re-asserted at v3 as the canonical localization commitment.

6. **Workspace tooling implementation order.** RESOLVED 2026-05-02: **1 → 2 → 5 → 3 → 4.** Tools 1+2+5 (Collections, Workspace home, Bulk operations) ship first against existing schema substrate (commit `9ba9fa2d`). Tools 3+4 (Advanced filtering, Curriculum mapping) follow, each carrying its own schema commission pass. Tool 6 (Personalized feed) stays deferred per its original "Deferred" sub-section. Folded in: Feature Area 3 "Implementation order."

7. **Pillar 1 production pattern.** RESOLVED 2026-05-04 (Phase 1c apply at `e912b805`): **cooperation-pattern through clause (a) closure and beyond.** Teaching packages authored via CC drafts → copilot reviews substantively → CC revises → seed via Hetzner-side `plink`. Mac Studio AI-assist arc removed from Pillar 1 dependency chain; Mac Studio strategic-fit reframed as candidate for OTHER content pipelines (Topic embeddings per CLAUDE.md §16.1; deck enrichment per §4.5; OG image generation; alt-text + structured-data + meta enrichment), not pedagogical-voice content. Folded in: CLAUDE.md §3.4 (canonical lock); Feature Area 1 "Content pipeline commitment" applies the production discipline through clause (a) closure and beyond.

---

## Tier 1+2 catalog completion milestone (post-`d3b4f962` arithmetic; legacy mapping)

**This is informational milestone, NOT launch trigger.** Subscribe-flip is gated solely on the §1 6-condition framework. The 170-units figure below corresponds to Tier 1+2 catalog scope under the legacy lesson-plan-as-text definition; it is preserved as a tracked progress checkpoint visible in canonical SUBSCRIPTION-SCOPE.md but is **not** a launch threshold.

Tier 2 catalog work fully sealed at `d3b4f962` — all 4 production locales (en+de+es+nl) at 100% C-1 catalog coverage simultaneously, 116 published decks total.

**Legacy clause (a) — schema-true reading (Path A locked).** Every (`Topic.slug`, `language`) tuple where decks have been published has a corresponding `LessonPlan` row. **Plan count is bounded by axis-keys × locales** (NOT by deck count) per `LessonPlan @@unique([topicSlug, language])` schema constraint. At 39 `Topic.slug` values:

- **156 plans** for current Tier 1+2 (4 locales: en+de+es+nl)
- **234 plans** if scaled to 6 main locales (en+de+es+fr+it+pt)
- **429 plans** if scaled to all 11 platform locales

The legacy realized authoring scope is bounded by axis-keys × locales, **not** by deck count. The 4 reference plans authored at `e912b805` (en/de × addition+sudoku) are consistent with Path A; illustrative-example framing applied during the Phase 1c revision pass makes them portable across all decks at the same axis-key + locale (per CLAUDE.md §17.9 "Illustrative-example framing for deck-portable plans").

**Legacy clause (a) progress: 4/156 plans live** (en+de × addition+sudoku) per Phase 1c apply at `e912b805`. The cooperation-pattern production pattern (Resolved decision #7) authors the remaining 152 plans through Tier 1+2 milestone closure.

**Legacy clause (b) bundle scope: 7 × 2 = 14 (en+de canonical) per Option A.** Bundle scope held at 7 × 2 (en+de canonical) post-Tier-2-closeout per `2026-05-03 doctrine pass`. **es+nl bundle authoring filed as follow-on extension** once en+de bundle library closes.

**Legacy total Tier 1+2 milestone scope (4 locales): 170 units** (14 paired-bundle/lesson-plan units + 156 standalone lesson plans). Prior figure of 130 units assumed Path B (116 plans); Path A correction adds 40 plans (156-116) for the educational-level + theme axis-keys not 1:1 with apps.

**v3 framing constraint (operator ratification 2026-05-08):**
- 170-units = Tier 1+2 catalog completion milestone, **NOT** a launch trigger.
- Subscribe-flip is gated solely on the §1 6-condition full readiness.
- The "156 plans" / "14 bundles" / "170 units" arithmetic stays as historical record of the legacy launch-readiness calibration AND as a tracked Tier-1+2 progress checkpoint.
- "156 plans" corresponds to Tier 1+2 catalog scope under the legacy lesson-plan-as-text definition, NOT to a subset of the §1 Condition 1 / 203-target taxonomy. The two scopes are structurally different units (Topic.slug-keyed legacy plans vs learning-target-keyed teaching packages) and do not map 1:1.
- When the 170-units milestone is reached (in operationally-meaningful form under the new architecture), v3 will document the mapping if clean. If the new-architecture teaching-package coverage doesn't map cleanly to "X packages covering Tier 1+2 catalog scope" — because the 203-target taxonomy reorganized differently than legacy plan structure — v3 documents the mismatch and treats 170-units as legacy reference only, not enforceable under new architecture.

**Single launch trigger; multiple progress milestones.** This forecloses the "should we Subscribe-flip at Tier 1+2?" question that two-threshold framings would invite.

---

## §5 Ordering recommendations (Arc 5+)

Based on the launch conditions and the empirical cadence:

**Highest-leverage Arc 5 candidates (operator picks based on Arc 4 ship findings):**

1. **Infrastructure-sweep sub-arc (paired):**
   - **NUMBER_WORDS gender-toggle** — closes the load-bearing architectural debt accumulated at Arc 3.
   - **IMAGE_VOCABULARY extension** — covers the family-members + action-verbs candidate keys × 11 locales × gender data per locale; unblocks Arc 4 Phase 1 deferred targets per Path B substrate-driven scope pivot.

   These pair as a single Phase 1 sub-arc within Arc 5; both are Condition 3 prerequisites and benefit from coordinated authoring against shared substrate concerns.

2. **Strand-expansion arc (Arc 5 Phase 4 Option B locked):** author 1+ packages from non-vocab non-numeracy strands. Validates cross-strand architecture broadly per Condition 4. Phase 4 strand-expansion against newly-completed substrate is the §A.14 scaling-checkpoint discipline at the right moment.

**Lower-priority for Arc 5 but eventually required:**

3. **Continued Track-C-driven localization** — proceeds independent of strand work; builds toward Condition 2.
4. **Continued vocabulary-strand depth** — completes Condition 1 within already-validated strand.

**Bundle-curation and free-tier arcs:** defer to Arc 7-8 window when master-package volume (≥50 packages across ≥10 themes) justifies bundle curation and free-tier candidate set is broad enough for strategic selection.

**Recommended Arc 5 shape (operator-ratified 2026-05-08):** Phase 1 = paired infrastructure sub-arc (NUMBER_WORDS gender-toggle + IMAGE_VOCABULARY family-members + action-verbs extension + Romance/Nordic gender-data audit). Phase 2 = family-members + action-verbs vocab packages (deferral chain from Arc 4 Path B closure). Phase 3 = Track-C-driven locale variants per single-question gate. Phase 4 = strand-expansion content authoring against now-complete substrate (Option B locked).

**Stream B parallel sub-arc:** substrate-gap-inventory `[CHORE][AUDIT]` covering all 188 unauthored packages of the 203-target taxonomy. Single-session, read-only audit. Output: `docs/lesson-plans/substrate-gap-inventory.md`. Operator-side image-authoring list production triggers from Stream B output.

**Stream C operator-pace work:** image authoring against 1,000-image list; integrates into IMAGE_VOCABULARY at future commission.

---

## §6 Open operator-strategic items (not blocking Arc 5)

Items below remain operator-strategic and benefit from being settled progressively, not all at once:

1. **Free-tier package selection** — defer until Arc 6+ provides candidate breadth.
2. **NSR-resolution arc shape** — when does this arc commission, what's the resourcing, native-speaker procurement strategy. Defer until Arc 4-5 NSR accumulation rate empirically clarifies scope.
3. **Pillar 2 bundle-curation thresholds** — exact N bundles × M themes for Condition 6 ratification. Defer until ≥50 master packages exist (Arc 7-8 window).
4. **Subscribe-flip post-launch monitoring** — what metrics confirm launch was successful (organic acquisition rate, free-to-paid conversion %, teacher feedback channels). Defer until launch is in sight.
5. **Marketing surface for the launch event itself** — what changes on the homepage, what comms go out to existing waitlist. Defer until Subscribe-flip is genuinely imminent.

---

## Implications for home page Section 5 (subscription block)

The home page subscription section now has a concrete frame to draft against:

**Three-pillar structure:**

- **Pillar 1: Teaching packages** (user-facing as "Lesson plans") — "ready-to-use teaching packages paired with our decks, written for K-3 multilingual classrooms."
- **Pillar 2: Premium themed bundles** — "curated bundles for the moments that come around every year, each with its own lesson plan."
- **Pillar 3: Your organized workspace** — "as the catalog grows past thousands of decks, the subscription gives you collections, a personal workspace, advanced filtering, curriculum mapping, and bulk tools to manage your own teaching practice."

**Frame:** "Free works for browsing and using individual decks. The subscription is for teachers who use LessonCraftStudio regularly and want their teaching practice organized."

**Anti-positioning to remember at copy time:**

- Not "premium tier with advanced features." (SaaS-positioning, rejected per CLAUDE.md §2.)
- Not "for power users." (Wrong audience grammar.)
- Not "team / school plan." (Different tier, different page.)
- Not feature-grid / pricing-comparison-table. (Single price, single tier, single offering.)

**Price presentation:** "$69 per year. Cancel anytime." No "starting at," no "save X% annually," no monthly-equivalent breakdown.

---

## Application notes

- This document supersedes any prior informal references to subscription scope.
- Future strategic decisions about the subscription should update this document directly rather than scattering across conversation history.
- This document is now in-tree at `docs/SUBSCRIPTION-SCOPE.md` (moved from out-of-tree handoff-artifact status during the doctrine-hygiene pass at commit `116de5d0`).
- When this document changes, regenerate it as a single canonical version rather than maintaining a changelog. Future sessions should always read the current version, not historical states.
- The subscription scope is sufficiently specified to draft home page Section 5 copy.
- Strategic-decisions session 2026-05-02 resolved 6 originally-open decisions. Resolution #7 added at Phase 1c apply (`e912b805`). Resolutions folded into §1 Conditions + Pillar sections + audit-trailed in the "Resolved decisions" section. Schema impacts: per-locale-rows lesson-plan localization (resolution #5) was schema-resolved at commit `9ba9fa2d`; Bundle model (resolution #4) shipped at migration `20260504081907_add_bundle_schema` with BundleDeck + BundleLessonPlan + BundleTeachingPackage join tables.
- Tier 2 closeout doctrine pass 2026-05-03 (post `d3b4f962`) added the Tier 1+2 catalog completion milestone subsection with bundle-scope adjudication = Option A (hold 7 × 2 = 14). Decision rationale: bundles ship with paired lesson plans; bundle localization downstream of lesson-plan localization; es+nl bundle authoring filed as follow-on extension.
- v3 reconciliation 2026-05-08 (this revision) merged operator-pasted v2 6-condition re-lock against current canonical state per 7 reconciliation deltas: master count 15→21 (Delta A), locale variants 4→7 (Delta B), Pillar 2 redefinition to teaching-package bundles (Delta C; v2 supersedes), launch-trigger framework (Delta D; coexist with strict role separation — 170-units becomes informational milestone, 6-condition is sole launch trigger), NSR-flag bifurcated discipline introduction (Delta E), authoring envelope projection introduction (Delta F), CLAUDE.md fold-list deferral (Delta H; separate next-[DOCS]-cycle commit). The CLAUDE.md fold list (§1 launch-trigger / §A.13.X NSR-bifurcated / §A.13.Y substrate-audit-at-arc-commencement / §A.14.X scaling-checkpoint / §7 Pillar 2 reframe / §11 future-arc registry) is queued for the next [DOCS] cycle as its own commit shape per §A.8.2 multi-copy doctrine drift discipline.

---

## Materials-additivity audit finding (added 2026-05-12 post audit ratification R4)

A materials-additivity audit ran against the count-objects-1-to-10 C5 free-tier pilot package on 2026-05-12 and produced operator-ratified findings (R1-R4 batched ratification surface):

- **R1 ratification:** 7 per-material dispositions ratified for count-objects-1-to-10 (numeracy class): REMOVE flashcards + REMOVE picture-cards / KEEP numeral-cards + manipulative-cut-outs + answer-key / REVISE parent-letter + sentence-strips. Honest count for this package post-audit: 3 KEEP + 2 REVISE-pending + 2 REMOVE = 5 effective materials (not 7 format-slots).
- **R2 ratification:** fan-out scope = extend audit to other 2 C5 free-tier packages (identify-letter-sounds-vowels + identify-living-vs-nonliving) before broader cross-package extension. Strand-aware findings expected: vocabulary-class packages likely keep flashcards + picture-cards; numeracy-class packages likely REMOVE per pilot finding.
- **R3 ratification:** F5 (package-YAML mode-mismatch vs production catalog) prioritized as foundational structural fix. F6-F9 ship after F5.
- **R4 ratification (this entry):** materials-surface completeness framing is **partially illusory** at the format-coverage-first measure. Pillar 5 materials-surface story needs strand-aware recalibration:
  - Numeracy-strand packages effective materials count: ~5 post-F6+F7-fix (not 7).
  - Vocabulary-strand packages effective materials count: ~7 (unchanged; audit findings don't apply).
  - Literacy + world-knowledge strands: TBD post-C5-fan-out (the other 2 C5 packages' audits).
  - Prior "7-of-7 generators SHIPPED at C5 free-tier packages (operationally adjacent to Subscribe-flip readiness)" framing should be amended to "7 generators ship; per-package additive count is strand-aware: numeracy effective at ~5 post-fix, vocabulary effective at ~7, literacy + world-knowledge TBD."

**Subscribe-flip readiness implication:** (R2) ADVANCING-NATURALLY operational state is preserved. The readiness STORY is updated to reflect honest materials-surface count rather than format-slot count. Subscribe-flip is structurally achievable post-F5+F6+F7 ship + C5 fan-out validation. The structural-fix triad + cross-package fan-out are the remaining substrate work; not blocking on the format-coverage milestone framing.

**Filings opened during audit (all UNBLOCKED post-ratification; each separate commission):**

- F5: package.yaml composed-exercise mode-mismatch resolution (3 paths: revise YAML / extend pickSampleDeck / generate `unified`-mode decks; operator strategic call on which path)
- F6: `lib/sentence-strips-render.ts` countMode parameter (fixed/varying/explicit + countList; align strip image-count with stated count)
- F7: `parent-letter-tone-templates.ts` strand-aware body-prose variants per locale × tone × strand
- F8: `lib/answer-key-render.ts` in-document vocab-table redundancy consolidation
- F9: Topic-page or teaching-package UX surfacing `Deck.answerKeyUrl` (file exists on CDN + serves 200 HTTP but no teacher-facing UI link)

**Doctrine candidates from audit for next [DOCS] cycle:**

- Editorial-layer gap (P2-§2 of audit plan file): commission framework currently has no slot for editorial judgment about additive value per material per package. Phase 1 6-field per-material structure (deck-zip-provides + package-adds + rendered-output-verification + delta + disposition + cross-package) is the canonical shape candidate for an editorial-layer step at package-authoring or commission-completion.
- Mid-commission spec revision (audit precedent): operator revised the commission spec substantially mid-execution, requiring retroactive Phase 1 rewrite. §A.13.6-class precedent worth folding into the §A.13 verification-hygiene family — when commission spec evolves during execution, the revised spec retroactively reshapes deliverables.

**Audit plan file (full deliverable + audit-trail):** `C:\Users\rkgen\.claude\plans\analyze-the-files-in-luminous-milner.md` (out-of-tree per §10.4 working-memory artifact pattern; persists at filesystem level; cross-reference for next-session resumption).

**Pending separate [CHORE][DOCS] reconciliation (filed):** this canonical `docs/SUBSCRIPTION-SCOPE.md` is behind on Pillar 5 detail (Pillar 5 generator architecture + Phase 1 + Phase 2 close-out shipped during the cycle that closed 2026-05-11 per `important/SUBSCRIPTION-SCOPE.md` working-memory snapshot, but not yet folded into canonical). Per §A.8.2 multi-copy doctrine-file drift discipline, the canonical-state catch-up is a separate commission shape from this in-line audit-finding amendment. Filed as deferred [CHORE][DOCS] reconciliation candidate.

---

## Materials-additivity audit — C5 fan-out (added 2026-05-12 post operator approval of consolidated audit deliverable)

Following the count-objects-1-to-10 baseline audit (above R4 entry) + F5 Path B shipping at commit `d8102dcb`: the audit shape extended to the other 2 C5 free-tier packages (identify-letter-sounds-vowels + identify-living-vs-nonliving) per R2 ratification. Three-package empirical basis is now the canonical strand-aware-disposition-template source for downstream fan-out.

### Class-conditional disposition pattern CONFIRMED (3-package basis)

The R4-amendment's strand-aware framing is empirically validated:

| Material | Numeracy class (count-objects) | Literacy class (letter-sounds) | World-knowledge class (living-vs-nonliving) |
|---|---|---|---|
| Flashcards | REMOVE | KEEP | KEEP |
| Picture-cards | REMOVE | KEEP | KEEP |
| Numeral-cards | KEEP | (not composed) | (not composed) |
| Manipulative-cut-outs | KEEP | KEEP | KEEP |
| Sentence-strips | REVISE (F6 count-mode) | (not composed) | KEEP (this-is-a frame; no F6 defect) |
| Parent-letter | REVISE (F7 strand-aware) | KEEP-as-shipped | KEEP-as-shipped |
| Answer-key | KEEP | KEEP | KEEP |
| Matching-mat | (not composed) | PROSPECTIVE KEEP (F10) | PROSPECTIVE KEEP (F10) |
| Vocabulary-tracing-strips | (not composed) | PROSPECTIVE KEEP (F11) | (not composed) |

Numeracy-class is the outlier. REMOVE flashcards + picture-cards is numeracy-specific. Vocabulary-acquisition artifacts (flashcards + picture-cards) earn slot-residency at literacy + world-knowledge packages because vocabulary IS the instructional content there.

### Substrate-gap finding — 2 materials composed in YAMLs but not yet implemented in production

- **matching-mat** (composed at 2 of 3 C5 packages — both fan-out packages) — NO generator script, NO UI section component, production CDN returns HTTP 404. Status: `substrate-gap` per `frontend/lib/teaching-packages/material-status.ts:29`. Teaching-package UI renders the slot with a substrate-gap badge instead of a download link (graceful failure).
- **vocabulary-tracing-strips** (composed at identify-letter-sounds-vowels only) — same state. Status: `substrate-gap` per `material-status.ts:30`. Production CDN 404.

### F-filing scope refinement per C5 fan-out empirical basis

- **F6 (sentence-strips countMode)**: scope is **NUMERACY-CLASS ONLY** (or any package composing `framePreset: there-are-count-plural`). identify-living-vs-nonliving's `this-is-a` frame has no count parameter; F6 doesn't apply. Refines F6 commission spec to count-bearing-frames only.
- **F7 (parent-letter strand-aware variants)**: scope is **NUMERACY-CLASS PRIMARILY**. Literacy + world-knowledge classes find the current "counting, sorting, matching, listening to new English words" body-prose acceptable (literacy maps to "listening to new English words"; world-knowledge maps to "sorting"). F7 still useful for tightening per-strand tone but not gating disposition acceptance at literacy/world-knowledge classes.
- **F8 (answer-key vocab-table consolidation)**: universal cross-package.
- **F9 (deck-side answer-key UX surfacing)**: universal per-deck.

### New filings opened during C5 fan-out

- **F10**: Generator + UI section + production CDN pipeline for **matching-mat**. High cross-package generalization (composed at 2 of 3 C5 packages; likely composed at many packages beyond C5). Operator strategic-direction call on generator-authoring commission shape.
- **F11**: Generator + UI section + production CDN pipeline for **vocabulary-tracing-strips**. Composed at 1 of 3 C5 packages (literacy class). Same trigger as F10.
- **F12**: Extend F5 Path B's pickSampleDeck theme-fallback to handle apps with non-standard customization-param names. picture-sort uses `leftCategoryThemeSelect` + `rightCategoryThemeSelect` (not `themeSelect`); F5 doesn't activate for picture-sort. identify-living-vs-nonliving slots 1 + 3 collapse post-F5 because the theme-fallback doesn't fire.
- **F13**: picture-sort `subjectTags` shape: `{leftTheme-vs-rightTheme}` compound string vs 2 separate theme tags. May consolidate with F12 if both resolve via pickSampleDeck logic.
- **F14**: identify-letter-sounds-vowels `foods`-theme catalog gap. Slots 4-5 reference `themeSelect: foods` but production catalog has 0 decks with `foods` subject_tag for any composed exerciseType. Either operator authors foods-themed decks (similar to F5b) OR YAML slots revise to align with catalog (animals/fruits/etc.).

### C5 free-tier badge grid recalibrated (3-package consolidated)

| Package | Current effective grid | Post-F-fix effective grid |
|---|---:|---:|
| count-objects-1-to-10 (numeracy) | 3 KEEP + 2 REVISE-pending + 2 REMOVE = **5 of 7** | 5 of 7 post-F6+F7 (REMOVEs stay) |
| identify-letter-sounds-vowels (literacy) | 5 KEEP-shipped + 2 substrate-gap = **5 of 7** | 7 of 7 IFF F10+F11 ship |
| identify-living-vs-nonliving (world-knowledge) | 6 KEEP-shipped + 1 substrate-gap = **6 of 7** | 7 of 7 IFF F10 ships |

**Three-package empirical Pillar 5 materials-surface count: 16 effective slots of 21 total composed across C5 (76%).** Post-F10+F11+F6+F7 fixes: 19 of 21 (90%) effective. The remaining 2 (count-objects-1-to-10 numeracy-class REMOVEs of flashcards + picture-cards) stay REMOVED per audit disposition.

### Subscribe-flip readiness implication updated (3-package basis)

The R4-amendment's strand-aware framing HOLDS empirically. C5 fan-out adds substrate-gap evidence + F10-F14 structural-defect filings. Updated materials-surface readiness:

- **Numeracy class**: 5 effective per package; F6+F7 fixes preserve count
- **Literacy class**: 5 effective CURRENTLY; 7 effective IFF F10+F11 generators ship
- **World-knowledge class**: 6 effective CURRENTLY; 7 effective IFF F10 ships

**(R2) ADVANCING-NATURALLY state preservation HOLDS** — the C5 fan-out characterizes materials-surface state honestly without invalidating launch-trigger readiness. F10 + F11 (substrate-gap generator implementations) become PRIORITIZED follow-on commissions; their absence is bounded + acceptable for (R2)→(R1) re-ratification provided the strand-aware framing is canonical at SUBSCRIPTION-SCOPE.md (this amendment).

**(R2)→(R1) re-ratification gating recommendation:** ship F10 + F11 (substrate-gap closures) + F12 (F5 Path B picture-sort extension) before (R1) re-ratification, OR operator-strategic accept of substrate-gap + slot-collapse state as bounded per current effective grid.

### C5 fan-out audit plan file

Full Phase 0 + Phase 1 + Phase 2 deliverable at `C:\Users\rkgen\.claude\plans\analyze-the-files-in-luminous-milner.md` (working-memory artifact per §10.4; out-of-tree). Audit-trail integrity preserved — count-objects-1-to-10 baseline + F5 commission + C5 fan-out all accumulate in the same plan file via additive section structure.
