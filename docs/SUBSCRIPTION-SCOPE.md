# SUBSCRIPTION-SCOPE.md

**Status:** Canonical scope specification for the LessonCraftStudio $69/year subscription.
**Authored:** 2026-04-30 (chat-side strategic conversation, post-Brief-B sealing).
**Supersedes:** All prior informal references to "$69 subscription unlocking workflow features" in CLAUDE.md §3 and elsewhere. This document is the authoritative source for what the subscription contains.
**Audience:** Future Claude sessions, future Claude Code sessions, operator reference. Upload alongside CONVERSATION-HANDOFF.md to any future session that touches subscription-adjacent work (home page copy, pricing page, signup flow, account dashboard, FAQ).

---

## Summary

The $69/year subscription contains three feature areas:

1. **Lesson plans** — content-only library of pre-written, deck-linked lesson plans.
2. **Premium deck bundles** — curated themed bundles, paired with lesson plans on the same themes.
3. **Workspace and catalog-management tooling** — organizational features for teachers managing the platform's growing catalog (5000+ decks expected within a short time).

Embedding is **not** part of the subscription. It remains fully free, in service of the §3 structural acquisition flywheel (embed-driven Path B traffic).

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
- Wants ready-to-use materials (lesson plans, themed bundles) when time-pressured.
- Wants persistent organization (collections, workspace, curriculum mapping) for the materials they use.
- Will renew year-over-year because their saved structure carries forward.

The subscription is **not** built for the occasional user (free experience is complete for them), the institutional buyer (separate school-license tier per CLAUDE.md §11, downstream), or the power-user with strong custom workflow demands (a builder/composer audience, deliberately not served — see "Deliberately not in scope" below).

---

## Feature Area 1: Lesson plans (content-only)

### Shape

A library of pre-written lesson plans, each one tied to specific decks in the catalog. Teachers browse the lesson-plan library, pick a plan relevant to their grade/language/topic, and use it as-is — print it, follow it, adapt it informally in their classroom.

**Explicitly excluded:** plan-builder tool, plan editor, "save as my own" affordance, custom plan composition. Operator decision: lesson plans are content only, not a tool. The teacher who wants to compose their own plans uses Tool 4 (curriculum mapping) in feature area 3 instead, which provides lighter-weight persistent structure without the engineering cost of a full builder.

### Pedagogical and format requirements

Pre-written lesson plans must be **opinionated to be useful**. Vague plans ("introduce vocabulary, do worksheet, review") are worse than no plans because teachers can produce that themselves in seconds. Useful plans require:

- **A specific pedagogical approach** — the platform's stance on K-3 multilingual instruction. This needs to be defined before lesson-plan content authoring begins. Candidates (operator to decide separately): CLIL (Content and Language Integrated Learning), communicative language teaching, phonics-first, or a deliberately eclectic stance with the approach noted on each plan. **Open decision: pedagogical stance for lesson plans not yet locked.**
- **A defined structural format** — e.g., warmup → introduction → practice → review, with timing per section. Consistent across all plans in the library so teachers learn the format once.
- **A clear point of view** — what does good K-3 multilingual instruction look like? Plans should reflect a coherent philosophy, not a generic template filled in.

### Content pipeline commitment

A lesson-plan library that doesn't grow stops being a paid-tier reason within a year. Once a teacher has used the relevant plans, the value is exhausted. The subscription requires an **ongoing content pipeline**:

- New plans added regularly across the 11 languages.
- Coverage across the topic taxonomy (currently 4 of 29 apps registered; full coverage gated on taxonomy expansion brief per CLAUDE.md §11).
- Pedagogical review for quality before publication.
- Localization where needed (a German lesson plan is not just a translated English one — it reflects German classroom conventions, vocabulary expectations, and pedagogical norms).

This is a recurring content-investment cost. The operator should plan for this pipeline as part of the subscription's ongoing operation, not as a one-time launch effort.

---

## Feature Area 2: Premium deck bundles

### Shape

**Curated themed bundles**, hand-assembled and paid-tier-only.

Each bundle is a set of decks unified by a theme (seasonal, topical, occasion-based, curricular unit, etc.) plus a paired lesson plan from feature area 1. Examples:

- "Halloween bundle" — themed decks across the relevant apps + a Halloween lesson plan.
- "First week of school bundle" — icebreaker / introductory decks + a first-week lesson plan.
- "Numbers 1-20 in German bundle" — a coherent unit of German number-learning decks + a unit lesson plan.

### Bundle/lesson-plan pairing

**Bundles ship with paired lesson plans on the same theme.** A bundle is "a set of decks + a lesson plan," not "a set of decks alone." This was an explicit operator decision in scope conversation. The pairing makes both feature areas more valuable than they'd be separately:

- The lesson plan tells the teacher *how to use* the bundle's decks together.
- The bundle gives the lesson plan a coherent set of materials to reference.
- The teacher gets a complete teaching unit, not just raw materials.

### Bundle composition guidelines

- Bundles consist of decks already in the free catalog plus, optionally, decks created specifically for the bundle (premium-only).
- A bundle's decks remain accessible to free users individually; the bundle's value is in the *curation*, not in gating the constituent decks. **Exception:** bundle-specific decks created for that bundle may be premium-only; this is a content-creation decision case-by-case, not a structural gate.
- Bundles must clear a quality bar — they're a primary visible "what does the subscription deliver" surface, so a sloppy bundle costs more credibility than a missing bundle.

### Excluded shapes (decided against)

- **Curriculum-aligned bundles** (IB Primary Years, Cambridge, national curricula). Considered and deferred. Higher-value to international schools specifically, but higher build cost and longer pedagogical-review cycle. Possible later extension; not in initial scope.
- **Premium-only individual decks** (paid-tier-flagged decks not in any bundle). Considered and decided against. Less legible to teachers ("why is this one deck paid?"), undermines the principle that the catalog is free, and creates ongoing content-decision overhead ("should this new deck be free or premium?"). Cleaner to keep individual decks free and let bundles do the curation work.

---

## Feature Area 3: Workspace and catalog-management tooling

### Frame

**Tools for managing the teacher's own teaching practice across a growing catalog**, not tools that improve the catalog itself. This framing matters: if the catalog "gets better" with the subscription, that invites the question "why isn't the catalog organized for everyone?" If the *teacher* gets better-equipped, that's a coherent paid-tier value proposition that doesn't undermine the free experience.

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
Teachers tag saved decks with their own unit labels (e.g., "my Week 3 vocabulary unit," "my Halloween unit," "my Spring numbers review") and pull up everything tagged. This bridges into lesson-plan territory (feature area 1) but as a workspace tool rather than a content product. **This tool became load-bearing once lesson plans were scoped as content-only** — it gives teachers persistent structure for their own thinking even though the platform doesn't provide a builder. A teacher's curriculum map carries forward year-to-year; this is the feature that turns a one-time user into a year-after-year subscriber, which is the core retention bet for an annual subscription.

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

- **Lesson-plan builder / editor / composer.** Considered. Decided against. Lesson plans are content-only.
- **Premium-only individual decks.** Considered. Decided against. Bundles do the curation work; individual decks stay free.
- **Curriculum-aligned bundles** (IB, Cambridge, etc.). Considered. Deferred to possible later extension. Initial scope is themed bundles only.
- **Tool 6 personalized feed.** Considered. Deferred to post-launch.
- **AI-assisted lesson planning.** Briefly raised as a candidate lesson-plan shape. Not pursued — content-only decision rules it out.
- **School / institutional tier.** Real per CLAUDE.md §11 longer-arc items, but downstream of individual-tier traction. Not in this scope; gets sold to schools where teachers already use the platform individually. Belongs on its own page or surfaces only after individual-tier subscription has traction signal.

---

## Open decisions not resolved in scope conversation

These remain to be locked separately, in subsequent strategic work or at implementation time:

1. **Pedagogical stance for lesson plans.** CLIL, communicative language teaching, phonics-first, or eclectic. Required before lesson-plan content authoring begins. Owner: operator + pedagogical advisor if applicable.

2. **Initial lesson-plan library size at subscription launch.** How many plans must exist on day one for the subscription to feel substantive? Thin launch undermines the paid-tier value at the most visible moment. Recommend at least one plan per major topic in the registered taxonomy at launch, scaled to languages.

3. **Initial bundle library size at subscription launch.** Same concern as lesson plans. Recommend a clearly visible set (e.g., 8-12 bundles at launch, covering seasonal + topical + curricular ranges) so the subscription's bundle promise is immediately legible.

4. **Bundle pricing structure.** Are bundles included entirely in the $69 subscription, or are some bundles individually purchasable as one-off content? Operator preference unstated. Default assumption pending decision: all bundles included in subscription.

5. **Lesson-plan localization strategy.** Are plans authored in English and translated, or authored natively per language, or both depending on the plan? Affects content pipeline cost and quality. Operator preference unstated.

6. **Workspace tooling implementation order.** Tools 1, 2, 5 are essential; Tool 3, 4 are differentiators. Recommend ship order: Tool 1 (collections) → Tool 2 (workspace home) → Tool 5 (bulk operations) → Tool 4 (curriculum mapping) → Tool 3 (advanced filtering). Operator may prefer a different order.

---

## Implications for home page Section 5 (subscription block)

The home page subscription section now has a concrete frame to draft against:

**Three-pillar structure:**

- **Pillar 1: Lesson plans** — "ready-to-use lesson plans paired with our decks, written for K-3 multilingual classrooms."
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
