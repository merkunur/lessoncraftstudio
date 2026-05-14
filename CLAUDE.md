# CLAUDE.md — LessonCraftStudio Interactive Worksheets Platform

**Version:** 2.0
**Last updated:** 2026-04-27
**Audience:** Every Claude Code session working on this project reads this file first.

---

## 1. What we are building

We are building a **subscription catalog platform for multilingual early-childhood educators** — specifically teachers and program directors working with children ages 3-7 in international schools, dual-language and immersion programs, bilingual European schools, and other contexts where children learn in languages other than (or in addition to) the dominant local language.

The platform's defining promise: quality interactive worksheets and printable resources designed for K-3 multilingual classrooms, available in 11 languages with consistent quality across all of them. Every deck exists in every language at the same level of polish, with grammatically correct vocabulary, age-appropriate visual design, and pedagogical care.

The catalog's central UX is the **topic destination page**: when a teacher arrives at a topic ("addition for kindergarten in Spanish") the site shows a curated page bundling a few recommended interactive decks, the printable PDFs that pair with them, and (for subscribers) a lesson plan for the topic. A flat faceted listing exists as a fallback for "show me all 47 decks" but is not the primary experience. This is the deliberate divergence from education.com's results-list pattern.

**Variety-signal complements topic-page-as-destination; it does not replace it.** Below the recommended-decks grid on each topic page, algorithmic variety strips (per §16.2) surface decks from neighboring axes and other locales — a discovery / cross-sell layer that helps Google understand topical relationships and gives teachers cross-axis browsing without leaving the destination page. The topic page remains the primary surface; strips are the secondary discovery affordance. This is the Path 2 commitment realized at `55ac5687` (Catalog Variety Arc 1). See §16.2 for strip composition rules and §16.2's audit-trail tail for the shipped-state record.

**Every public-facing page embeds a working sample deck** that the visitor can play immediately, in their chosen language. The home page, blog posts, topic pages, the about page, the pricing page — every surface lets the visitor experience the actual product rather than read descriptions of it. This is the conversion mechanism: the product proves itself before the visitor encounters any signup or subscription friction.

The 33 worksheet generator apps now exist exclusively as the operator's internal production tooling. Teachers never touch the apps. The apps live behind authentication accessible only to the operator. 29 of the 33 ship interactive output and produce decks that flow through the publish pipeline into the catalog (canonical list per §14.10); the remaining 4 (`coloring.html`, `writing.html`, `draw-and-color.html`, `drawing-lines.html`) are PDF-only printable activities that don't fit the interactive-deck pattern (§4.1).

Revenue comes from a single tier of annual subscription at $69/year for individual teachers, with a school-license tier for international schools that prefer institutional purchase (pricing TBD; see §7). The platform is fundamentally free — every deck is freely accessible, freely shareable with students, freely printable. Subscription unlocks three feature pillars per `docs/SUBSCRIPTION-SCOPE.md`: lesson plans (deck-linked, K-3 multilingual classroom-shaped), premium themed bundles (curated, paired with lesson plans), and workspace/catalog-management tooling (collections, workspace home, advanced filtering, curriculum mapping, bulk operations). The strategic principle is that conversion is value-driven (you got significant value from free, the subscription deepens it) rather than scarcity-driven (you hit a wall and had to pay). See §7 for the full feature split.

**The previous seller-facing positioning has been fully discontinued.** All public-facing pages currently visible at lessoncraftstudio.com (the home page selling KDP/Etsy worksheet generators, the seller tools like the KDP Royalty Calculator, the seller-focused guides, the per-app pricing) are being deleted. The site is being rebuilt from scratch with the multilingual K-3 educator audience in mind. The technical foundation (Next.js, Postgres, Lemon Squeezy, the apps, the image library, the vocabulary system) all stays; only the public-facing surface is being rewritten. See §11 and §17 for the deletion and rebuild scope.

**SEO-first framing for app emit-site contracts.** Every manifest field that participates in a deck's URL slug or `<head>` metadata — `theme`, `exercise_mode`, `language`, `age_range` (via `educational_level`) — is an SEO surface, not a data field. The 29 §14.10 catalog apps emit these fields at static `LCSCatalogExport.export()` call sites; the values land in the deck's canonical URL via §17.8.5 slug derivation and in Schema.org `LearningResource` metadata via §17.8.1. Operator-strategic adjudication on emit-site contracts (which mode strings to use, which fields default to null, how default-mode emits) prioritizes search-keyword alignment + teacher-search-query patterns over technical UI labels. Per §A.13.4 the publish-cli reconciliation gate at dry-run boundary is the structural backstop catching emit-defects before they collapse SEO across a catalog wave.

**SEO + embed-virality acquisition flywheel — operational doctrine.** The acquisition strategy is a flywheel: SEO surfaces drive visitors to deck pages → visitors copy embed snippets → embedded decks spread to classroom blogs and school sites → embedded contexts surface in Google's index with backlinks pointing back to the catalog → search authority compounds → SEO surface ranks higher. The flywheel is structural, not promotional (no ads, no influencer outreach, no social-media engagement strategy — explicitly rejected). It runs on its own time once the substrate exists; the operator's job is to ship the substrate in dependency order. SEO-inventory generation without a distribution channel is dead capital — catalog growth ahead of the embed mechanism is investment without compounding return.

**Three-layer embed architecture (locked).** Distribution-mechanism work decomposes into three layers, each strictly downstream of the prior:

1. **Mechanism** — deck.html is iframe-safe (no X-Frame-Options / CSP / Permissions-Policy headers blocking embedding); self-contained per §14.1; in-iframe attribution per §14.3. Verified empirically functional at recon `7f91f1b8`.
2. **Per-deck discovery UX** — operator-discoverable "Embed this" affordance on each deck.html with copy-snippet workflow. Shipped at `e8cec493`.
3. **Homepage signaling** — embed-virality CTA as first-class above-fold surface routing to representative decks where Layer 2 is one click away. Shipped at `a793d7c9` (Alt A Arc 3).

Inversion of the dependency order produces credibility gaps: a homepage CTA pointing at a non-existent embed flow signals capability that doesn't deliver. The Layer 1 → 2 → 3 sequencing is the canonical example of §16.7 lock-with-dependency-pause discipline applied at architectural scale.

**Backlink-bearing distribution mechanisms vs visibility-only mechanisms.** Iframes alone are not backlinks per Google's link-equity model — iframe content is visibility-only, not link-equity-transfer. The embed snippet's visible `<a href>` tags OUTSIDE the iframe (wrapper `<div>` + caption with brand-anchor + keyword-anchor per `e8cec493` snippet shape) are the backlinks. Distribution-mechanism doctrine distinguishes these: not all "shareable" surfaces deliver SEO equity. Sharing a deck via QR code or short URL is visibility-only; embedding via the snippet is backlink-bearing. Future distribution mechanisms classify into one bucket or the other at design time; the bucket determines whether the mechanism contributes to the §1 acquisition flywheel's link-equity loop or only to its visibility-spread loop.

**Embed-attribution as visible-load-bearing, not technically-enforced (Technique 2).** Don't fight host-site stripping programmatically; design attribution so removal looks broken. The Technique 2 snippet shape (visible-integral attribution outside the iframe via wrapper + caption + 2 backlinks) trades minor strip-leakage by sophisticated users for low-friction-virality at scale: most embeds stay intact because attribution removal makes the deck frame read as orphaned. Coercive enforcement (DRM-style anti-strip) breaks the flywheel because it raises friction at the embed-adoption boundary, where adoption is the load-bearing variable. The acquisition strategy depends on broad voluntary embedding, not on per-embed attribution-purity. Anti-pattern locked at Arc 2 A4 adjudication.

**Three-second-budget homepage doctrine.** Teachers arriving via SEO traffic decide stay-or-leave in three seconds. The homepage's job in that window is magnitude + variety + browse-path signaling — not value-prop persuasion (Hero handles that), not feature enumeration (deferred to below-fold). Three things must be visible at-a-glance: the catalog's structural breadth (29 exercise types as a visible icon grid; 100 themes as a horizontal strip), the multilingual differentiator (11 flags), and one primary acquisition CTA (embed-virality). The Alt A architectural lock (`a793d7c9` Arc 3 ship) operationalizes this for production traffic. Future homepage commissions verify any addition against the three-second-budget test: does it contribute to magnitude / variety / browse-path signaling, or does it dilute the visible-at-a-glance density?

**Sampling vs structural-display as distinct UX jobs.** Sampling components (BreadthGrid showing 9 deck previews per `e5bb3cb4`) are NOT structural-display — they sample what's available but don't communicate breadth. Structural-display components (ExerciseTypeGrid showing 29 exercise-types) are NOT sampling — they enumerate the structural axis without rendering individual deck content. Sampling and structural-display are distinct UX jobs needing distinct components. Conflating them produces a homepage that under-signals the catalog's scale (the `Catalog Variety Arc 2 = expand BreadthGrid 9→12 cells` proposal that was retired pre-Alt A is the cautionary case). At Arc 3 the BreadthGrid demoted to Section 4 as a "see one in action" sub-section because its sampling job genuinely belongs in the embed/share-capability context, not at the magnitude-signaling above-fold position.

**Magnitude-via-structural-axes-not-population.** When growth rate is fast relative to current population (operator's 500-decks-per-day cadence toward a 55,000-deck target), today's count is stale signal — magnitude communication should reference durable structural axes (29 exercise-types × 100 themes × 11 locales = 14,487 publish-eligible combinations per §6 amendment). The published-deck count surfaces as footnote only. A homepage promising "1,044 worksheets" frames the catalog as a finite inventory; one promising "thousands of unique worksheets across 29 × 100 × 11 axes" frames the catalog as a generative space. The latter is durable; the former goes stale within hours of authoring at 500/day cadence. Implemented in `MagnitudeFraming.tsx` (Arc 2 A4 / `a93ebb7c`) consuming `getCatalogAxes()` SoT.

**Crawl-bait-density as homepage SEO surface metric.** Above-fold internal-link count per locale × locales is a load-bearing SEO surface metric. The Alt A homepage architecture targets ~140 above-fold internal links per locale (29 exercise-types + 100 themes + 11 locales) × 11 locales = ~1,540 crawl-bait surface — every link a topic-page anchor that helps Google's link-graph parse the catalog's structure. This is structural SEO, not link-stuffing: the links are user-discoverable browse paths that happen to be crawler-discoverable too. Future homepage extensions verify against this metric: any addition that does not raise (or at minimum preserve) above-fold internal-link density is decorative, not load-bearing for the §1 SEO loop.

**Foundation-doctrine reality-check pattern.** Doctrine in §1 (and elsewhere) describes the strategic foundation. Periodically — typically at fold-pass cycles or commission-completion moments — verify the foundation against current reality. "SEO + embed-virality is the acquisition strategy" is foundation doctrine; "the embed Layer 2 surface ships at `e8cec493`" is current reality. When foundation doctrine references mechanisms that haven't shipped, the reality-check surfaces the gap and either accelerates the mechanism (Layer 2 implementation precedes Alt A Arc 2) or amends the doctrine (if the foundation premise is wrong, fix the doctrine; don't power-through). The pattern applies broadly: any time §1 (or any load-bearing doctrine section) makes a strategic claim about how the platform operates, periodic reality-checks against current ship-state catch foundation-vs-reality drift before it causes downstream commission errors.

**Cross-references on the embed flywheel.**

- §14.1 self-contained deck.html is the embed-readiness substrate; modifications must preserve iframe-compatibility (no host-page dependencies; no cookies; no parent-frame messaging required by default — postMessage auto-resize per `be99db52` is sender-side voluntary, not host-side mandatory).
- §14.3a `buildShareAffordance` (`bbcb444c`) + `buildEmbedAffordance` (`e8cec493`) are the canonical shared-helper precedent for fan-out work across the 29 §14.10 apps. Future fan-out additions (QR-code affordance, badge generator, custom-deck-link shortener, etc.) follow the same pattern: single shared helper in `catalog-export.js` + 29-app single-line fan-out in each `renderStandaloneHTML()`. The pattern keeps per-app code surface minimal while centralizing affordance logic for consistent behavior across the 29 apps; per §14.6 any change to a shared helper triggers TWO-STEP deploy across all consumers.
- Homepage Alt A architecture (Arc 1 substrate at `d039d8e2`; Arc 2 real assets at `a93ebb7c`; Arc 3 above-fold integration at `a793d7c9`) is the canonical example of the §1 flywheel's homepage signaling layer. The 5 Arc 2 components (`ExerciseTypeGrid`, `MagnitudeFraming`, `ThemeStrip`, `LocaleStrip`, `EmbedViralityCTA`) operationalize structural-axes magnitude + multilingual signal + embed-virality CTA above the fold.

## 2. Why this matters — the operator's situation

The operator has spent two years building the 33 apps, the 3,000-image library, and the 11-language vocabulary system with grammatically correct singular/plural/gender data. This technical foundation is genuinely rare. No comparable platform offers consistent K-3 quality across all 11 of these languages — competitors are either English-first with multilingual translations bolted on, or single-language regional players, or focused on language-learning specifically rather than subject content in multiple languages.

The previous positioning sold individual app licenses to KDP/Etsy sellers. It did not produce sustainable revenue and the SEO from that positioning has not earned meaningful traffic. The strategic conclusion is clean: there is nothing to preserve from the previous direction. The full reset to multilingual K-3 educators is the operator's chance to monetize the existing technical asset by serving a market where the asset's specific advantages — language coverage, visual richness, K-3 appropriateness, consistent quality — are recognized as valuable.

Runway: approximately 12 months. First meaningful subscription revenue is targeted for months six through nine. The strategic path is SEO-led organic growth (slow but compound) supplemented by direct outreach to international school networks and content marketing for multilingual education queries. The launch must be designed for these audiences from day one rather than retrofit later.

## 3. Core principles — read these before writing any code

### 3.1 The existing codebase is production; treat it with care

This project extends the existing LessonCraftStudio codebase at `C:\Users\rkgen\lessoncraftstudio\`. It does not create a parallel project. The Next.js frontend, Prisma database, authentication, Lemon Squeezy integration, the 33 HTML apps, the image library, and the vocabulary files all continue to live where they are.

**Before modifying any existing file**, check whether the change affects production behavior. The existing 33 apps still serve the operator's own workflow. The existing `/api/images` endpoint still serves the apps. The existing user accounts still work. All of this must continue working during and after the new work.

When in doubt: add new files rather than modifying existing ones. Create new routes alongside old ones. Introduce new database tables, don't migrate existing ones destructively. The interactive platform is **additive**.

### 3.2 The 29 apps' generation logic is not to be rewritten

The apps work. They produce deterministic, consistent content. They are the result of thousands of hours of work and subtle fixes. We extend them — we do not rewrite them.

Specifically: each app's existing rendering code (which builds Fabric.js canvas scenes) is the source of truth for what the worksheet looks like. The interactive output mode reuses this rendering logic; it does not duplicate or reimplement it. The new work is adding a second serialization target (interactive deck export) alongside the existing one (PDF). The apps' generation algorithms, image selection, layout, and customization surfaces are preserved unchanged.

If extending an app requires touching its core logic, stop and ask the operator before proceeding.

### 3.3 The catalog is the product; the apps are private tooling

Teachers never see the apps. The apps are gated behind operator authentication and produce decks that flow through the publish pipeline into the catalog. The previous public app-access pages (`/en/apps/...`) are being deleted; a new admin route at `/admin/apps/` serves the operator only.

When designing the teacher-facing UI: no "create worksheet" buttons, no "customize" flows, no app configurators. The teacher sees finished content, topic destination pages with lesson plans, search and filter, embedded sample decks, a subscribe button, and a share link. That's the whole experience.

### 3.4 Launch with depth in priority languages, breadth across features

The minimum viable launch includes: the entire public-facing site rebuilt from scratch for the multilingual K-3 audience (see §17), all 29 eligible apps producing catalog-ready output, a catalog of 400-600 seeded decks distributed across languages per the launch sequence (see §19), the teacher-facing catalog with search, filter, and topic destination pages, the student play experience working across all 29 exercise types, the local AI service running and producing enrichments, sample decks embedded on every public page, and the subscriber-only features (lesson plans, themed bundles, collections and workspace tooling per `docs/SUBSCRIPTION-SCOPE.md`).

Things **deliberately excluded from launch**: student accounts, class management, progress tracking, teacher dashboards with analytics on student session data (this was previously in scope and has been cut — see §7), parent portals, SSO, school-district SSO/SAML features, complex DRM, custom worksheet creation tools for teachers, AI-assisted *deck generation* (the AI enriches decks; it does not produce them), assignment sequences (cut as not justifying their weight for K-3 audiences). Each of these is a rabbit hole. Do not add any of them without explicit operator direction.

**Pillar 1 production pattern locked.** Lesson plans (the Pillar 1 launch-trigger content per `docs/SUBSCRIPTION-SCOPE.md` clause (a)) are produced by CC + copilot cooperation pattern: CC drafts, copilot reviews substantively, CC revises, iterate to exemplar grade. The Mac Studio AI-assist arc is removed from the Pillar 1 dependency chain. Mac Studio strategic-fit candidates are deterministic-AI tasks (Topic.embedding generation per §16.1; deck enrichment per §4.5; OG image generation; alt-text + structured-data + meta enrichment), not pedagogical-voice content. Lesson-plan production stays cooperation-pattern through clause (a) closure and beyond. Phase 1c apply at `e912b805` established the loop; the operator override of recon Q2 (manual-authoring) is the locked resolution.

**Adjudicator-forward decision-locking discipline.** When the operator delegates strategic input — "you choose," "make the call," "I'm not technical, decide" — the adjudicator (whichever party holds the delegation: CC, copilot, or strategic-thinking partner Claude) locks per CLAUDE.md priority foundations and commits. Consultative-by-default is the wrong posture when delegation is explicit: surfacing the decision back to operator as a multi-option menu wastes operator-attention and treats the delegation as advisory. The discipline applies at emit-site taxonomy adjudication (e.g., §17.8.5 default-mode-emits-null; commit `109a91d4`'s SEO-first taxonomy lock for the 10 multi-mode apps), at fold-pass target adjudication (§A.13 vs new section, etc.), and at any other strategic input the operator delegates rather than retains. Operator override at any later moment is normal — adjudicator-forward locking does not foreclose operator course-correction; it just prevents the consultative-pause from re-routing through operator-attention when the operator already declined that route.

**Lock-with-dependency-pause discipline.** When operator strategic input locks a downstream architectural choice but an upstream dependency hasn't yet shipped, lock the choice AND pause downstream implementation until the dependency lands. Do not power through the locked choice against an unsubstantiated upstream claim. Operationalized at the Alt A homepage redesign sequence: Arc 1 substrate landed (`d039d8e2`), Arc 2 component build was authorized but downstream of Embed Layer 2 deploy verification, Arc 3 above-fold integration was authorized but downstream of Arc 2's deploy verification. Each arc's implementation paused on the prior arc's empirical-functional verification. The discipline composes with adjudicator-forward (above): adjudicator locks the choice immediately when delegation is explicit; pause discipline gates implementation on upstream-readiness independently of the lock. Inverting the order — implementing Arc 3 against an Arc 2 that hadn't shipped — would have produced a credibility gap (homepage CTAs pointing at an embed flow that didn't exist). The pattern is the §1 SEO + embed-virality flywheel's three-layer architecture (mechanism → per-deck UX → homepage signaling) applied at commission-cadence resolution.

### 3.5 Three-machine infrastructure, otherwise standard stack

The infrastructure spans three machines connected via Tailscale, plus Cloudflare:

- **PC workstation** (operator's main machine, Windows). Runs the 29 apps, runs Claude Code, produces decks. Source of all `generation.json` and `metadata.json`.
- **Mac Studio M3 Ultra (headless, on Tailscale).** Dedicated to the local AI service. Runs Ollama with a chosen model. Reads from the catalog database, generates `enrichment.json` outputs (embeddings, descriptions, topic-level lesson plans), writes them back. Operator never logs in interactively except for maintenance.
- **Hetzner dedicated server** (existing). Hosts the Next.js app, Postgres database, Lemon Squeezy integration, the catalog API, the operator's publish pipeline. The hub.
- **Cloudflare CDN** (free tier; activated 2026-04-30). Caches and serves static deck HTML files, PDFs, thumbnails from the Hetzner origin. Sits in front of `lessoncraftstudio.com` (orange-cloud proxy on apex + www) and absorbs viral student traffic. SSL/TLS encryption mode = Full (strict). AI crawler bot policy set to "Do not block (allow crawlers)" preserving §17.4 acquisition-strategy alignment. DNSSEC off. Nameservers `selah.ns.cloudflare.com` + `sevki.ns.cloudflare.com` at Namecheap. The deck files themselves live on Hetzner; Cloudflare populates each edge cache on first request from that region. **Pre-2026-04-30 state:** Cloudflare was not in path; this caching expectation was aspirational and §15.8's `Cache-Control: public, max-age=300` contract was empirically inert (per Brief B Sub-phase 5.8 finding). Post-2026-04-30 state: edge cache active; cache headers load-bearing; viral student traffic absorbed by edge; geographic latency improved for international audience.

Tailscale connects the PC, Mac Studio, and Hetzner server as a private network. The Hetzner server reaches the Mac Studio at a tailnet hostname for AI tasks. The Mac Studio is **never** exposed to the public internet; it is **never** in the synchronous path of a teacher request. AI work is asynchronous batch (see §15).

Otherwise the stack stays standard: Next.js 14 App Router, Prisma + Postgres, NextAuth, Lemon Squeezy, next-intl, Tailwind, Fabric.js. No microservices, no serverless functions, no Docker clusters, no Redis, no Elasticsearch, no message queues.

### 3.6 Writing code: prefer clarity over cleverness

Every future Claude Code session and every human reviewer should be able to understand any piece of code on first reading. Favor explicit over implicit. Favor long clear names over short cryptic ones. Avoid frameworks-within-frameworks. Avoid abstractions that exist only to be flexible someday.

### 3.7 When uncertain, ask

If a task requires interpreting operator intent beyond what this document or the specific task prompt provides, stop and ask. Do not guess. The cost of a clarifying question is five minutes; the cost of building the wrong thing is a week.

## 4. The five architectural layers

### 4.1 Layer 1 — The existing apps (mostly unchanged foundation)

33 worksheet generator apps in the existing repo. 29 of them ship interactive output and the catalog-export pipeline; 4 remain PDF-only (`coloring.html`, `writing.html`, `draw-and-color.html`, `drawing-lines.html`) — these produce printable activities without discrete exercises and don't fit the interactive-worksheet pattern. See §14.10 for the canonical list of the 29. Each app contains its own Fabric.js-based rendering logic, its own UI for customization, its own consumption of the image library and vocabulary.

**What changes:** A new export function on each app that emits a self-contained interactive HTML file (see §14 for the implementation, now shipping in all 29 apps). The single **Export to catalog** action produces a ZIP containing the HTML, the manifest, the printable PDF, the answer key PDF, and a thumbnail (see §15).

**What does not change:** The apps' generation algorithms, customization UIs, image selection, layout code, or any behavior visible to existing operator workflows.

### 4.2 Layer 2 — The deck storage and publishing system (new)

A new Prisma model `Deck` stores published decks. The deck's data is the merge of three layered manifest files (see §15): `generation.json` (written by the app at generation time), `metadata.json` (written by the publish step with operator review), and `enrichment.json` (written by the local AI). The catalog database holds the merged view; the original three files are kept on disk as the reproducible source of truth.

A new admin route lets the operator publish a deck. The flow: the operator generates a worksheet in one of the 29 apps, clicks "Export to catalog," reviews the auto-filled metadata in a small publish form, hits Publish. The Hetzner server validates the manifest, ingests it into the database, and writes the static assets (HTML, PDF, thumbnail) to the public asset folder where Cloudflare's CDN caches them on first request from each region. Within a few minutes the local AI picks up the new deck and writes its enrichment.

Decks are immutable after publish — editing a published deck creates a new version, not an in-place edit. This keeps shared links stable over time.

### 4.3 Layer 3 — The teacher-facing catalog (new)

New Next.js routes under `/[locale]/catalog/` provide:

- Catalog landing page with category tiles (subject, age, exercise type, language pair) and links to popular topic destination pages
- **Topic destination pages** at `/[locale]/topic/[slug]/` — the primary teacher-facing surface. Each page shows the topic title and description, a curated grid of recommended interactive decks, a list of companion printable PDFs, and a "show all N decks" link to the faceted browse view. The lesson plan card displays full content for subscribers and a blurred preview with a subscribe CTA for free users. Subscribers also see any themed-bundle suggestions relevant to the topic. See §16.
- Browse/search/filter page with pagination — the fallback when no topic matches or the teacher wants to see everything; supports filtering by language pair (e.g. "decks available in both Spanish and English")
- Individual deck page with embedded sample (the deck itself plays right on the page), metadata, share-with-class, QR code generation, PDF download (free for everyone), embed code (free for everyone per §3 acquisition flywheel), and add-to-collection (subscribers only per `docs/SUBSCRIPTION-SCOPE.md` Pillar 3)
- My Decks page showing the teacher's favorited decks (free users) plus collections, embed configs, and saved parent notes (subscribers)
- Subscription management page

URL structure note: slugs are in the page's language, not English transliterations. The German topic page is `/de/topic/mathe-kindergarten-addition/`, not `/de/topic/math-kindergarten-addition/`. Native-language slugs rank in native-language search; English-pattern slugs in foreign domains do not. See §17 for the SEO-from-the-start design principles.

All catalog pages are server-rendered for SEO. Schema.org `LearningResource` markup on deck pages and lesson-plan-collection markup on topic pages. hreflang for the language variants in which the content actually exists (not all 11 by default — see §19 for the language launch sequence).

Authentication and feature gating: browsing, deck access, search, PDF download, and embed codes are fully public — no account required to use the platform. Email signup is offered after first use for favoriting and the new-deck digest. Account creation is free. Subscription gates only the three feature pillars specified in `docs/SUBSCRIPTION-SCOPE.md` (lesson plans, premium themed bundles, workspace and catalog-management tooling).

### 4.4 Layer 4 — The student play experience (new)

Route pattern: `/play/[linkId]` where `linkId` is a random 10-character alphanumeric code. No authentication. No student account. No tracking of student sessions — sessions are not recorded anywhere because the K-3 audience does not benefit from analytics dashboards (see §7 for why analytics was deliberately cut from the subscription tier).

The play page resolves the link to its deck and serves the deck's self-contained HTML file (see §14 for the export format). The HTML file embeds its own runtime — there is no separate shared play-mode renderer; each export is a complete, offline-capable document. Student interactions stay entirely client-side in the deck's own runtime.

Critically, the student experience is identical regardless of the teacher's subscription tier. Free teachers' shared links work indefinitely. Subscriber lapses do not break links — the only effect of a lapsed subscription on shared links is a small "this teacher's subscription has lapsed — renew here" message on the play page, which preserves student access while creating renewal pressure on the teacher.

The static HTML files are cached aggressively at the Cloudflare edge. The Hetzner server is involved only in the link resolution itself (a single quick lookup), not in serving deck content during play. Student interactions never touch the server during play. CDN caching means viral decks become free.

Access control: the linkId is random enough to be unguessable (10 chars alphanumeric ≈ 3.6 quadrillion combinations). Embedded play (subscriber feature) optionally restricts which origins can iframe the link; this is enforced by checking the `Referer` against the embed's `allowedOrigins` list at link resolution time.

The deck.html also carries the SEO surface defined in §17.8 (semantic HTML, alt attributes, structured data, canonical URL placeholder, hreflang insertion point, end-of-deck internal links). Modifications to deck.html structure must preserve the SEO contract; modifications to the SEO contract must preserve cacheability (no per-request templating, no tier-dependent content).

### 4.5 Layer 5 — The local AI enrichment service (new, runs on Mac Studio)

A long-running service on the headless Mac Studio that does asynchronous batch work for the catalog. Its inputs are decks in the catalog database that lack enrichment; its outputs are written back to the database as `DeckEnrichment` rows and `LessonPlan` rows.

Tasks the service performs:

- Generate embeddings for each deck's metadata (used for semantic search ranking and for "related decks" suggestions)
- Generate embeddings for each Topic row (used for §16.1 embedding-similarity topic resolution)
- Generate longer pedagogical descriptions and formal learning objectives in all 11 languages
- Generate or refresh the lesson plan for each topic destination page
- Suggest additional discoverability tags
- Suggest curriculum-framework alignment tags (PYP, IPC, Cambridge Primary)

The service is **never** in the synchronous path of a teacher request. If the Mac Studio is down or the home internet is flaking, the catalog continues to serve everything that has already been enriched. New decks may be served without enrichment until the AI catches up; the topic page falls back to faceted listing in that interim. See §15 for the data flow and §16 for how lesson plans connect to topic pages.

## 5. Technology decisions — locked for v1

These are not up for debate without operator sign-off:

- **Framework:** Next.js 14 App Router (existing)
- **Language:** TypeScript
- **Database:** Postgres via Prisma (existing)
- **Auth:** NextAuth with email+password (existing)
- **Billing:** Lemon Squeezy (existing integration extended)
- **i18n:** next-intl (existing)
- **UI:** Tailwind CSS (existing)
- **Canvas rendering:** Fabric.js 5.3.1 (existing, used by the apps)
- **CDN:** Cloudflare free tier
- **Hosting:** existing Hetzner dedicated server for app/DB; headless Mac Studio M3 Ultra for local AI
- **AI runtime:** Ollama on the Mac Studio (model TBD; budget is a 70B-class quantized model)
- **Inter-machine connectivity:** Tailscale private network (PC + Mac Studio + Hetzner)
- **File storage:** local filesystem on Hetzner for everything (app assets and deck content alike); Cloudflare's CDN caches the static deck content at edges on first request
- **Image processing:** Sharp (existing)
- **Image format (library + interactive backdrops):** WebP, lossy at the quality level the apps already use. PDFs decode WebP and re-encode losslessly into Flate at PDF generation time.

No additions without explicit justification and operator approval.

## 6. The 11 languages

English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish.

The vocabulary file `REFERENCE TRANSLATIONS/image-vocabulary.js` is the canonical source of linguistic data. It contains 1,246 entries with singular, plural, and grammatical gender across all 11 languages. It is never modified directly without operator approval.

All teacher-facing UI must work in all 11 languages via next-intl. All catalog metadata (subjects, ages, tags, topic descriptions, lesson plan section labels) must have 11-language translations. Deck content generated by the apps already handles all 11 languages through the vocabulary system. The AI-generated long descriptions and lesson plans are produced per language, not auto-translated from English.

**Full 11-locale platform substrate complete (milestone at `a47ea021`, 2026-05-04).** All 11 platform locales are publish-ready at the structural-substrate layer: TOPIC_LOCALES registration + topics-taxonomy.json slug+name maps for all 134 axis-keys (29 exercise-type + 5 educational-level + 100 theme) + topicPage namespace in messages/{locale}.json + Footer.tsx empty-array placeholders per §16.6 honesty discipline. Wave 2 (workspace + collections + bulk + share namespaces) and Wave 3 (lessonPlanReader namespace) ship per-locale on demand; not blocking for deck-publish. Track C deck-creation per locale is the remaining work for full operational catalog state. Full combinatorial-space publish-eligibility: 100 themes × 11 locales × 13 themed-emitting apps = 14,300 themed combinations + 17 themeless × 11 = 187 themeless = **14,487 total publish-eligible combinations**. Originating commits: `b3f0d1f3` (it) + `9ea577fe` (fr) + `589fd554` (pt) + `a47ea021` (sv+da+no+fi).

**`pt` = Brazilian Portuguese canonical (locked at `589fd554`).** Single `pt` locale code; no pt-BR / pt-PT split. Brazilian Portuguese vocabulary register applies (caminhão / ônibus / trem / educação infantil / anos iniciais — NOT EU forms). Future European Portuguese extension is a downstream possibility outside current scope; the BR-canonical lock is the operating assumption for all Track A + Wave 1 + Track C work in `pt`.

**`no` = bokmål canonical (locked at `a47ea021`).** Single `no` locale code; no nb / nn split. Bokmål register applies (barnehage / 1. trinn / etc.). Future nynorsk extension is a downstream possibility outside current scope; the bokmål-canonical lock is the operating assumption for all Track A + Wave 1 + Track C work in `no`.

## 7. Pricing and subscription model

The platform is fundamentally free-to-use for teachers, with a clearly differentiated paid tier targeting teachers who have integrated the platform into their workflow. The strategic principle: the free tier needs to be generous enough that teachers genuinely adopt the platform, and the paid tier needs to solve specific frustrations that emerge naturally from sustained free-tier use. Conversion is value-driven, not scarcity-driven.

The premium feature set is shaped specifically for multilingual K-3 educators (see §1 for audience). Features common in other teacher-tools markets that don't add value for this audience — student progress tracking dashboards, multi-deck assignment sequencing, detailed performance analytics — have been deliberately excluded because K-3 teachers are physically present with their students all day and don't need windows into independent work they aren't directly observing.

**Free tier — unlimited use of the core platform:**
- Full access to every deck in the catalog, in all 11 languages
- Full search, browse, filter across the entire catalog
- Unlimited shareable links (no expiration, no student count limits, no per-month caps) for sharing decks with students, parents, and colleagues
- QR code generation for any deck for in-classroom use
- Printable PDF downloads for every deck (with a small "Made with LessonCraftStudio" attribution footer)
- Answer key PDF downloads for every deck
- Email signup to save favorite decks and receive new-deck digests
- Topic destination pages with deck recommendations and printable PDF lists (lesson plan content shown blurred with a subscribe-to-read overlay; the lesson plan structure is visible to motivate conversion)

**Annual subscription: $69/year (individual teacher).** The subscription's canonical scope is specified in `docs/SUBSCRIPTION-SCOPE.md`. Three feature pillars:

1. **Lesson plans** — content-only library of pre-written, deck-linked lesson plans for K-3 multilingual classrooms.
2. **Premium themed bundles** — curated bundles paired with lesson plans on the same themes.
3. **Workspace and catalog-management tooling** — collections, personal workspace, advanced filtering, curriculum mapping, bulk operations. Load-bearing as the catalog grows past thousands of decks.

The free tier remains as enumerated above; the subscription layers on top of it. Auto-renew with 30/14/3 day notification emails.

**Features previously listed in this section that are NOT in the current canonical scope:**
- **Embed codes** — moved to free tier per the §3 acquisition flywheel (Path B distribution requires that anyone can embed; gating embedding would weaken the flywheel).
- **Parallel bilingual deck view** — deferred. The 29 apps' generation logic produces independent per-locale decks (no cross-language pairing infrastructure); reviving this feature would require app-side work that conflicts with §3.2's "do not rewrite app generation logic" doctrine. Reconsider as a v2 candidate when subscription has traction signal.
- **Parent communication templates** — deferred. The local AI service has the technical capability per §4.5; scoped out at SUBSCRIPTION-SCOPE.md authoring as not load-bearing for the three-pillar value proposition.
- **Watermark-free PDFs** — deferred. Aesthetic tier-distinction; not a load-bearing pillar.

**School license tier (TBD in v1.5):**
International schools and dual-language programs typically prefer institutional purchase rather than letting individual teachers expense subscriptions. A school-license tier is a likely v1.5 addition (probably $399-799/year covering up to 10 teachers, with higher tiers for larger institutions). Not in v1 launch scope but worth designing the data model to accommodate it cleanly. Lemon Squeezy supports tiered pricing; the catch will be account-grouping logic that lets a school admin invite up to N teachers and have them all access the institutional license.

**Grace period on subscription lapse:** 60 days. Subscription-tier features continue to work for 60 days after subscription ends. Links generated while subscribed continue to function indefinitely (because they share the same infrastructure as free links), but the teacher can no longer access lesson plans, themed bundles, or workspace tooling during the lapse period. After 60 days, share links continue to work for students but display a small "this teacher's subscription has lapsed — renew here" message to drive renewal.

**Notes on what is deliberately NOT gated:**
- Sharing with students is never gated. Free users get unlimited links and QR codes. Gating sharing would defeat the platform's purpose.
- Individual deck access is never gated. Every deck plays for any visitor. Hitting a paywall on actual content makes teachers bounce.
- Language switching is never gated. The 11-language coverage is the primary differentiator and must be visible to all visitors.
- Search and browse are never gated. Discovery friction loses adoption faster than any other failure mode.
- Free PDFs are real PDFs that work for printing. The footer attribution is small. The free PDF must be genuinely useful, not crippleware.

**Individual deck purchase:** Not offered. The two-tier free/subscription model is the entire commercial structure.

**Conversion mechanics in the product:**
- After a teacher saves their fifth favorite deck, an inline message appears: "Want to organize your saved decks into collections by class or unit? That's part of subscription."
- On topic destination pages, the lesson plan section is partially visible — structure visible, content blurred — with "See the full plan" CTA.
- On bundle pages (subscription-only themed bundles), free users see the bundle preview with a "Subscribe to unlock this bundle" CTA.
- After a teacher has shared at least one deck, they receive a single follow-up email a few days later with a parent-communication template they can adapt for their class — a free outreach touch.

These contextual prompts are not aggressive popups. They are small, non-blocking surface treatments that show up at the moment the relevant feature would matter. The conversion message is "you've found something useful here, and the subscription makes it more useful in these specific ways" — never "subscribe to access content."

## 8. Technical standards

### 8.1 Database schema additions

All new tables are added via Prisma migrations. Do not modify existing migrations. Do not rename existing tables. Do not remove existing columns. Any change to an existing table requires operator approval.

Key new tables (minimum; more added as needed):

```prisma
model Deck {
  id              String   @id @default(cuid())
  slug            String   // §17.8.5 — uniqueness enforced via @@unique([language, slug]) below
  title           Json     // {en: "...", de: "...", ...} for 11 languages
  description     Json     // operator-authored short description, per language
  exerciseType    String   // "word-search" | "matching" | "sudoku" | ... (one of 29 app types — see §14.10)
  exerciseMode    String?  // app-specific submode (e.g., "image-image", "find-addend")
  language        String   // deck's primary content language
  subjectTags     String[]
  topicSlugs      String[] // foreign keys into Topic.slug; a deck can belong to multiple topics
  ageRange        String   // "3-5" | "5-7" | "6-8" | "7-9" | "8-10"
  htmlUrl         String   // path to the self-contained interactive HTML on CDN
  pdfUrl          String   // path to the printable PDF on CDN
  answerKeyUrl    String?  // path to answer-key PDF on CDN (optional)
  thumbnailUrl    String
  manifestUrl     String   // path to the merged manifest JSON (for reproducibility)
  publishedAt     DateTime?
  status          String   @default("draft") // "draft" | "published" | "archived"
  createdBy       String   // operator user id
  version         Int      @default(1)
  contentFamilyId String?  // §17.8.7 — null in v1; populated by v2 translate-this-deck workflow
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  enrichment      DeckEnrichment?
  playLinks       PlayLink[]
  favorites       DeckFavorite[]
  collectionMemberships CollectionDeck[]

  @@unique([language, slug])  // §17.8.5 — slugs unique per locale, not globally
  @@index([status, publishedAt])
  @@index([exerciseType, language])
}

model DeckEnrichment {
  deckId          String   @id
  deck            Deck     @relation(fields: [deckId], references: [id])
  embedding       Bytes    // serialized vector for semantic search
  longDescription Json     // {en: "...", de: "...", ...} AI-generated, per language
  learningObjectives Json  // {en: ["..."], de: ["..."], ...}
  aiTags          String[]
  enrichedAt      DateTime @default(now())
  enrichmentVersion Int    @default(1)  // bumps when the AI prompts/model change
}

model Topic {
  slug            String   @id  // e.g. "addition-kindergarten-spanish"
  title           Json     // {en: "...", ...}
  description     Json
  subject         String
  ageRange        String   // "3-5" | "5-7" | "6-8" | "7-9" | "8-10"
  language        String
  curriculumTags  String[] // e.g. ["pyp-mathematics-numbers", "ipc-early-years-counting", "cambridge-primary-stage1"]
  parentSlug      String?  // optional taxonomy nesting
  isHighPriority  Boolean  @default(false)  // gates whether the topic gets a curated lesson plan
  embedding       Bytes?   // serialized vector for §16.1 embedding-similarity topic resolution. Generated asynchronously by the Mac Studio AI service per §4.5; nullable because rows can exist before generation catches up. Mirrors DeckEnrichment.embedding shape.
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  lessonPlans     LessonPlan[]
  parentNotes     ParentNote[]

  @@index([subject, language])
}

model LessonPlan {
  id              String   @id @default(cuid())
  topicSlug       String
  topic           Topic    @relation(fields: [topicSlug], references: [slug])
  language        String
  durationMinutes Int
  structure       Json     // {warmup: {...}, main: {...}, closure: {...}}
  recommendedDeckIds String[]  // ordered list — drives the deck grid on the topic page
  recommendedPdfDeckIds String[]
  generatedBy     String   // model identifier, e.g. "ollama:llama3.3:70b@q4"
  generatedAt     DateTime @default(now())
  generationVersion Int    @default(1)

  @@unique([topicSlug, language])
}

// Subscriber-only feature for multilingual classrooms: AI-generated parent notes
// per topic per language explaining what the child is working on and how parents
// can support at home in the child's home language.
model ParentNote {
  id              String   @id @default(cuid())
  topicSlug       String
  topic           Topic    @relation(fields: [topicSlug], references: [slug])
  language        String   // the home language for which this note is written
  body            String   // the actual note content
  tone            String   // "formal" | "warm" | "playful" — matches school conventions
  generatedBy     String
  generatedAt     DateTime @default(now())
  generationVersion Int    @default(1)

  @@unique([topicSlug, language, tone])
}

model PlayLink {
  id            String   @id @default(cuid())
  linkId        String   @unique @db.VarChar(10)  // the 10-char random public ID
  deckId        String
  teacherId     String
  embedConfigId String?  // present if this link backs an embed — subscriber feature
  createdAt     DateTime @default(now())
  deck          Deck     @relation(fields: [deckId], references: [id])
  teacher       User     @relation(fields: [teacherId], references: [id])
  embedConfig   EmbedConfig? @relation(fields: [embedConfigId], references: [id])

  @@index([teacherId])
}

// Subscriber-only feature: teachers organize favorited decks into named collections.
model Collection {
  id          String   @id @default(cuid())
  teacherId   String
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  teacher     User     @relation(fields: [teacherId], references: [id])
  decks       CollectionDeck[]

  @@index([teacherId])
}

model CollectionDeck {
  collectionId String
  deckId       String
  position     Int      // ordered within the collection
  addedAt      DateTime @default(now())
  collection   Collection @relation(fields: [collectionId], references: [id])
  deck         Deck     @relation(fields: [deckId], references: [id])

  @@id([collectionId, deckId])
  @@index([collectionId, position])
}

// Free-tier feature: teachers favorite decks (saved for later) without organization.
// Trigger for collections-feature CTA after fifth favorite.
model DeckFavorite {
  teacherId  String
  deckId     String
  favoritedAt DateTime @default(now())
  teacher    User     @relation(fields: [teacherId], references: [id])
  deck       Deck     @relation(fields: [deckId], references: [id])

  @@id([teacherId, deckId])
  @@index([teacherId, favoritedAt])
}

// Platform-infrastructure model (free for all users per §3 acquisition flywheel
// + `docs/SUBSCRIPTION-SCOPE.md`). Not subscription-gated. Each EmbedConfig is a
// per-teacher per-deck iframe configuration; embedding itself is free.
model EmbedConfig {
  id           String   @id @default(cuid())
  teacherId    String
  deckId       String
  width        String?  // e.g. "100%", "640px"
  height       String?  // e.g. "480px", "auto"
  allowedOrigins String[] // optional list of domains to restrict iframe loading to
  createdAt    DateTime @default(now())
  teacher      User     @relation(fields: [teacherId], references: [id])
  playLinks    PlayLink[]

  @@index([teacherId])
}

model Subscription {
  // extend existing subscription tracking as needed
  // grace-period end computed as (lapsed_at + 60 days)
  // when grace expires, subscriber-only features are disabled but old PlayLink rows
  // continue to function — the student-facing experience is never broken
  // schoolLicenseId field is added in v1.5 when school-license tier ships
}
```

When the `Deck` and `Topic` models are actually built in `schema.prisma`, `ageRange` should land as a Prisma `enum AgeRange { AGE_3_5 AGE_5_7 AGE_6_8 AGE_7_9 AGE_8_10 }` rather than a free-form `String`, so the database enforces the same five-tier set as §17.8.6.

### 8.2 File organization

New code follows the existing repo conventions:

```
frontend/
├── app/
│   ├── [locale]/
│   │   ├── catalog/                        # NEW — teacher-facing catalog
│   │   │   ├── page.tsx                    # catalog landing
│   │   │   ├── topic/[slug]/page.tsx       # topic destination pages
│   │   │   ├── browse/page.tsx             # search/filter/paginate (fallback)
│   │   │   ├── deck/[slug]/page.tsx        # individual deck view
│   │   │   └── my-decks/page.tsx           # subscriber's link history
│   │   └── ...
│   ├── api/
│   │   ├── decks/                          # NEW — deck CRUD, play link generation
│   │   ├── topics/                         # NEW — topic resolution from search query
│   │   ├── play/                           # NEW — play link resolution, access check
│   │   ├── ai-ingest/                      # NEW — endpoint Mac Studio writes enrichment to
│   │   └── ...
│   └── play/
│       └── [linkId]/page.tsx               # NEW — student play access page
├── components/
│   ├── catalog/                            # NEW
│   ├── topic-page/                         # NEW
│   └── play/                               # access-check UI; the deck HTML is self-contained
└── lib/
    ├── deck-publishing/                    # NEW — manifest validation, asset upload
    ├── play-access/                        # NEW — subscription + grace period check
    ├── ai-enrichment-client/               # NEW — Hetzner-side helpers for AI ingest
    └── ...

apps/
└── (existing 33 apps, gain "Export to catalog" button per §15)

mac-studio-service/                          # NEW — runs on Mac Studio, not on Hetzner
├── enrichment-worker/                       # pulls decks needing enrichment, generates outputs
├── lesson-plan-generator/                   # produces lesson plans per topic per language
└── prompts/                                 # versioned prompt templates

publish-cli/                                 # NEW — runs on PC, ingests deck ZIPs
```

### 8.3 Self-contained interactive deck format

Each deck is a single self-contained HTML file produced by the originating app. The file embeds its own runtime tuned to the exercise type. There are two runtime families today (Family A: letter fill-in; Family B: puzzle drag) — see §14.2. New exercise types either fit an existing family or get a new family runtime added.

The Hetzner server does not render decks. It performs access checks and serves either the static HTML (via Cloudflare) or the expired-access state.

### 8.4 Caching and CDN

Static deck HTML files, PDFs, and thumbnails are written to Hetzner's public asset folder at publish time. Cloudflare's CDN caches them at the edge on first request from each region. File path includes a version hash so deck updates don't cache-collide. Aggressive cache headers because the content is immutable per version.

The play access page on Hetzner is short-cache (5 minutes) because it does the subscription-status check on every request. If subscription is active or grace-period-valid, the access page hands off to the static deck HTML. If not, the page shows the expired state.

Topic destination pages are server-rendered with a moderate cache (e.g. 10 minutes), revalidated when the topic's recommended decks or lesson plan change.

Student interactions never touch the server. All answer validation is client-side JavaScript embedded in the deck HTML.

### 8.5 SEO considerations

Every catalog page is server-rendered. Every deck page and every topic destination page has:
- Unique, descriptive title tag
- Meta description with content summary
- Open Graph tags for Pinterest/Facebook previews
- Schema.org `LearningResource` (decks) or `Course` / `LearningResource` collection (topics) markup
- hreflang alternates for all 11 language variants
- Canonical URL
- XML sitemap entry

The sitemap auto-generates from published decks and topic pages, and is submitted to Google, Bing, and Pinterest.

## 9. What "done" looks like for the launch

**Engineering completeness:**
- The previous public-facing site (seller home page, KDP tools, seller guides, public app pages) deleted; the apps moved behind operator authentication (see §17 for migration details)
- All 29 eligible apps producing catalog-ready output via the publish pipeline
- "Export to catalog" workflow producing a ZIP per deck (§15) implemented for all 29 apps
- Catalog browse, search, filter, individual deck pages all work
- Topic destination pages render correctly with deck grid + PDF list; lesson plan section displays full content for subscribers and blurred preview with subscribe CTA for free users
- Student play access page works across all 29 exercise types on mobile and desktop, identical experience regardless of teacher's tier
- Free shareable link generation (no expiration, no student count limits) works for all teachers
- QR code generation for any deck works for all teachers
- Email signup with deck favoriting works for all teachers
- Subscription checkout works (free tier and $69/year individual tier; school-license tier deferred to v1.5)
- Subscriber-only features all enforce correctly per `docs/SUBSCRIPTION-SCOPE.md`: lesson plan content display, premium themed bundles access, workspace and catalog-management tooling (collections, workspace home, advanced filtering, curriculum mapping, bulk operations)
- Grace period on lapsed subscriptions works correctly (subscriber features disabled but old shared links continue to work for students)
- Contextual conversion prompts trigger correctly (collections prompt at fifth saved deck, lesson plan blur with CTA on topic pages, themed-bundle subscribe CTA on bundle pages)
- **Sample decks embedded on every public-facing page** (home, about, pricing, blog posts, topic pages) — visitors experience the actual product before encountering signup
- Cloudflare CDN in front of the site
- Tailscale connecting PC, Mac Studio, Hetzner
- Local AI service running on Mac Studio, picking up new decks within minutes of publish, generating lesson plans and parent notes for priority topics

**SEO foundation (in place from launch, not bolted on):**
- All public pages server-rendered
- URL structure with native-language slugs (German pages use German slugs, etc.)
- hreflang tags for all language variants of every multi-language page
- Schema.org `LearningResource` markup on deck pages, collection-style markup on topic pages
- XML sitemap auto-generating from published decks and topic pages, submitted to Google, Bing, Pinterest
- Mobile-first responsive design (validated at 375px width minimum)
- Page speed: lazy-loaded sample decks below the fold, LCP under 2.5 seconds
- Internal linking infrastructure (topic pages link to related topics, deck pages link to topic pages, hreflang links between language variants of same content)
- Search Console verified for all priority languages
- Initial keyword research completed for priority languages (see §17 and §19)

**Content completeness at launch:**
- 400–600 published decks in the catalog, distributed per the language launch sequence (see §19)
- 30–50 high-priority topic destination pages with full lesson plans and 4–8 recommended decks each, in priority languages
- Topic page descriptions with substantive content (not just deck grids — see §17 for content depth requirements)
- Initial blog/guide content: 8–12 substantive articles addressing multilingual K-3 educator queries, in priority languages
- Parent communication templates generated for all topics in priority languages

**Public site rebuild (from scratch):**
- Home page leads with the multilingual K-3 educator positioning, embeds a working sample deck, surfaces topic destination pages
- Pricing page presents the two-tier Free / $69-year structure clearly with feature comparison table
- About page tells the story of the platform credibly for the new audience
- FAQ and support pages written for multilingual K-3 educators
- Blog/guide section established with initial content (see §17 for the content marketing principle)
- Footer and navigation reflect the new audience and information architecture
- All seller-era content deleted; existing seller-customer access path preserved at a non-promoted URL until quietly retired (see §17)

**Acquisition foundation:**
- Pinterest account set up with initial pins drawn from sample decks (Pinterest is the strongest non-SEO channel for this audience)
- LinkedIn presence: list of target international school heads, curriculum coordinators, multilingual education advocates compiled for direct outreach in months 4-6
- Email waitlist captured during pre-launch (visitors who sign up before the platform is publicly announced)
- One conference presence committed for the year (probably ECIS or COBIS regional event)

What v1 launch is **not** trying to achieve: substantial organic search traffic (that comes in months 6-12), revenue at scale (first meaningful subscriptions in months 6-9), broad K-12 audience reach (the focus is K-3 specifically), institutional school-license revenue (that's v1.5 with the school-license tier).

## 10. How Claude Code sessions should operate

### 10.1 Before starting a task

- Read the specific task prompt carefully
- Check if it conflicts with anything in this CLAUDE.md — if so, flag it to the operator rather than proceeding
- Look at the relevant existing code before writing new code
- If the task touches an existing file, understand what that file currently does before modifying it

### 10.2 During a task

- Write TypeScript, not JavaScript
- Follow the existing code's style conventions even if they're not your preferred style
- Add new files rather than modifying existing ones whenever possible
- If you must modify an existing file, make the smallest change that works
- Run the existing test suite before considering a task done (if tests exist for that area)
- When adding a database table, add a Prisma migration; do not edit existing migrations
- Treat the local AI service (§4.5, §15) as a separate subsystem. Do not call the Mac Studio synchronously from a request handler. The Hetzner server reads enrichment from the database; it does not call out to the Mac Studio in the request path.

### 10.3 What to never do without explicit operator approval

- Rename or delete any existing file
- Modify any of the 33 app HTML files' generation or customization logic
- Modify `REFERENCE TRANSLATIONS/image-vocabulary.js` directly
- Modify the existing `/api/images` endpoint's behavior
- Change existing database tables or migrations
- Add new dependencies to `package.json`
- Change the Next.js or Prisma major versions
- Remove or alter existing authentication flows
- Remove or alter existing Lemon Squeezy integration
- Commit credentials, API keys, or `.env` contents
- Expose the Mac Studio's tailnet hostname in any public-facing code path
- Make the AI service a synchronous dependency of any teacher-facing request

### 10.4 What to always do

- Ask if a task is ambiguous
- Flag if a task requires one of the "never do without approval" actions
- Write small commits with clear messages
- Test your work in the existing dev environment before saying it's done
- Document new components and new modules with brief JSDoc or TS comments explaining purpose and usage

**Note on commit hygiene.** The in-session-commit hygiene rule applies to git-tracked files only (CLAUDE.md amendments + code commits). The `MEMORY.md` index + `memory/` directory at `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\`, `CONVERSATION-HANDOFF.md`, and `CLAUDE-MD-UPDATES.md` are out-of-tree handoff artifacts that persist at filesystem level without commits. Don't `git add` them.

**Read-from-SoT precedence over re-authoring at component-substrate work.** When a component needs localized labels, axis-keys, or other taxonomy data that already lives at a single source-of-truth (e.g., `topics-taxonomy.json axes.<axis>.<key>.{name,slug}.<locale>` per §16.5; `EXERCISE_MODE_APP_CLASSIFICATION` per §A.13.4; `image_themes.displayNames` per §A.7), the component reads directly from the SoT rather than re-authoring the data in `messages/<locale>.json` or another mirror location. Mirroring is a duplicate-state failure mode — the mirror and the SoT drift over time as one is updated and the other isn't. Direct SoT consumption eliminates the drift surface entirely; localization happens at the SoT, not at every consumer. The Arc 1 substrate (`d039d8e2`) shipped 4 components consuming axis-key labels directly from `topics-taxonomy.json` per this discipline (operator commission spec estimated ~1,000-1,200 i18n entries; adjudicator-forward call kept ~870 axis-key labels at the SoT instead of re-authoring in `messages/*.json` — the canonical empirical anchor). Future component work follows the same precedence: if the SoT exists, consume it; only author new entries in `messages/<locale>.json` for genuinely component-specific copy that does not live anywhere else.

### 10.5 What to flag to the operator

- Anything that seems to conflict with production behavior
- Any place where this CLAUDE.md is ambiguous or contradicts the specific task
- Any time a task as specified would break something that currently works
- Any time you are about to do something that feels irreversible
- Any performance concern that could affect production traffic
- Any dependency on the Mac Studio being reachable that would create an outage if it weren't

## 11. Scope discipline — what stays out of v1

These ideas have come up in conversation and have been explicitly deferred. Do not build any of them without explicit operator direction:

- Unified worksheet creation studio for teachers (cut: teachers buy finished content, not tools)
- AI-powered *deck generation* (cut: the AI enriches; the apps generate the decks)
- RTILA or similar scraping infrastructure
- n8n or similar workflow orchestration
- Knowledge base with RAG retrieval for teacher Q&A
- LoRA fine-tuning or any model training
- Synchronous AI calls in any teacher-facing request path
- Student accounts, logins, or per-student data
- Class management, assignment delivery, gradebooks
- Parent portals or parent-facing features
- School-district admin features, SSO, SAML
- Real-time collaboration features
- Mobile apps (native iOS/Android)
- Offline play
- KDP/Etsy seller-facing product features (the seller line is discontinued)

What is now **in scope** (additions and changes from previous versions): the headless Mac Studio running a local AI service for asynchronous **deterministic-AI enrichment** (Topic embeddings per §16.1; deck-level enrichment + AI-suggested tags + descriptions per §4.5; OG image generation; alt-text + structured-data + meta enrichment) — **NOT lesson-plan production**, which is on the cooperation-pattern path per §3.4 (Q2 final resolution post-`e912b805` Phase 1c apply); sample decks embedded on every public-facing page; SEO-from-the-start as a structural design principle (see §17); the language launch sequence treating depth in priority languages over breadth across all 11 (see §19); the from-scratch rebuild of the public-facing site with the multilingual K-3 audience as the only audience.

What was **removed from scope** in this version (previously included, now deliberately cut): student session analytics dashboard for subscribers (cut because K-3 teachers don't benefit from the data — they observe students directly all day); assignment-style multi-deck sequences (cut as not justifying the engineering weight for the K-3 audience); the broad "teacher catalog" framing (replaced with the multilingual K-3 educator framing in §1).

**Queued post-Brief-B (Phase 6 close-out 2026-04-30):**

- **Catalog page Phase 1/2/Gate 1 share-work revival** — unblocked at Brief B Phase 1 (`4b91adc0` shipped the nginx catalog deck route per §15.7); reactivates as follow-on brief whenever operator decides. Inherits OG metadata on `/[locale]/decks/[slug]`, share row component, OG image at 1200×630.
- **Topic destination pages** — full-shape brief beyond §16's minimal taxonomy. Separate brief.
- **Eleven-deck dry-run** — locale × app coverage exercise. Now gated on the taxonomy expansion brief below.
- **Taxonomy expansion arc — CLOSED 2026-05-01.** All 29 §14.10 canonical apps registered in `topics-taxonomy.json` across 6 batched passes (Pass 1 math / Pass 2 visual / Pass 3 matching / Pass 4 literacy / Pass 5 search / Pass 6 puzzle) plus Pass 7a closeout (schema cleanup + doctrine amendments). Subject vocabulary closed at 4 values: math (8), logic (8), letters (8), spatial-reasoning (5) — distribution 8+8+8+5 across 29 apps. exercise-type axis-keys 1:1 with §14.10. Locale coverage en+de Tier 1; Tier 2-4 fold in at their respective tier launches per §19. Override rate across the arc: 1/29 = 3.4% (one subject override: bingo math→letters via MEMORY's "purely a literacy prompt" framing; zero German-naturalness overrides). Topic destination route per §16 implemented separately in Pass 7b.
- **Group C brief drafting** — 3 apps TBD; structurally identical to Group B per the run-batch precedent.
- **§19 longer-arc items:** NSR operationalization, school-license design, home page copy, first acquisition activities, native cartoon library deployment in marketing, premium classroom personalization (v2), v2 translate-this-deck workflow per §17.8.7, grayscale PDF as user-facing download.

**Future-arc candidates filed at fold pass (post-Track-C-443-wave; doctrine-class but not yet doctrine-promoted):**

- **Manifest-disambiguator-field for fresh-roll-variation slug shape** — when operator authors fresh-roll variations of decks at the same `(exercise-type, exercise-mode, theme)` combination, the §17.8.5 slug-derivation collapses them to identical slugs and `resolveCollision` auto-suffixes (`-2`, `-3`, ...). For low-cardinality cases the §15.13 within-batch collision-pair inspection-before-confirm pattern handles via earlier-roll-wins tiebreak. For higher-cardinality cases (operator-strategic deck-variation workflow), introduce manifest-level `variation_id` or `set_label` field flowing into slug as a 4th component (e.g., `addition-find-addend-animals-set-a` + `addition-find-addend-animals-set-b`). Trigger: 2nd+ recurrence of fresh-roll collision pattern at scale (currently 1 instance: 443-wave 3 pairs, all earlier-roll-wins-resolved). Scope: small `[FEATURE][PUBLISH-CLI]` extending §17.8.5; not active doctrine yet.

- **ALL_LOCALES DRY-extraction at 4th-consumer threshold** — the `['en','de','es','nl','fr','it','pt','sv','da','no','fi']` literal currently has ≥3 consumers across `frontend/components/layout/Footer.tsx FOOTER_LANGUAGES`, `frontend/lib/breadth-grid-selection.ts SIBLING_POOLS`, and various per-locale per-component literals. Per §14.3a 4th-consumer threshold: extract to `frontend/lib/locales.ts ALL_LOCALES` shared constant when 4th consumer surfaces. Trigger: 4th consumer in the open commissions queue; pre-emptive refactor at 3rd-consumer threshold per §14.3.a if 4th is imminent.

- **Arc-splitting threshold heuristic** — when does an arc split into sub-arcs (Arc 6 split into 6c + 6a + 6b + 6d) vs ship as one (Wave 2 single-arc, Track C single-wave)? Recent arcs surfaced both shapes; threshold heuristic isn't yet generalizable. Trigger: 3rd-4th case provides enough material to extract a generalizable threshold (e.g., commit-count expectations, surface-count thresholds, code-volume estimates). Surface as future-arc-candidate; fold when material accumulates.

- **treasure-hunt manifest-emit-vs-worksheetTheme decoupling** — separate defect class from the Shape A (§A.13.5) scope that closed the 10-sibling-app theme-filter wave at `05d0940e`. treasure-hunt's path-A emit-site (`worksheetThemeValue`-driven manifest-emit decoupling, distinct from path-B's `selectedImages.length === 6` branch) was kept out of scope per operator adjudication; gate-protected at publish-time per §A.13. Trigger: when treasure-hunt enters a Track C wave AND the §15.16 reconciliation gate fires on the non-Shape-A path. Scope: small `[FEATURE][AUTHORING]` extending Shape A coverage; manifest-emit-vs-worksheetTheme decoupling is the structural fix.

- **`shared.msg.offtheme.dropped` translation-key promotion** — 11 consumers × 11 locales = 121 translation entries with the same semantic message ("N image(s) outside the active theme were dropped"). Per §14.3a 4th-consumer threshold met (10 sibling apps shipped at `05d0940e` + code-addition at `44cbdda1` = 11 consumers), this is a clean candidate for promotion to a `shared.msg.offtheme.dropped` key in `translations-shared.js` + per-app call-site dedup. Trigger: 12th-consumer addition (any new app adopting Shape A) OR pre-emptive per §14.3a.3 when an open commission opens an adjacent surface. Scope: small refactor commission (Commission β candidate).

- **backup-samples.sh path-divergence vs §A.1** — backup-samples.sh writes its tarball to `/opt/lessoncraftstudio/backups/` rather than `/var/www/lcs-media/backups/` per the §A.1 isolated-storage convention. The new backup-decks.sh shipped at `15be6ef5` mirrors backup-samples.sh's path (consistency) but propagates the divergence. Trigger: at any future backup-script consolidation or off-host backup migration (per §A.14.6 backup-coverage doctrine + Scaling Arc 3 Q3 trigger ~10 GB asset-bytes). Scope: small `[CHORE][OPS]` aligning both backup scripts to §A.1 isolated-storage path; not blocking.

## 12. When this document is wrong

This CLAUDE.md will be wrong about some things. The operator's thinking will evolve. The product will reveal new constraints after launch. When you (Claude Code) find something in this document that seems to contradict current reality:

- Do not quietly ignore it
- Do not assume the new situation overrides it
- Flag the contradiction to the operator explicitly
- Ask for updated guidance before proceeding

This document is the stable reference. When reality diverges from it, the operator updates the document, not you.

## 13. The one sentence summary for every future session

> Build a multilingual K-3 educator platform on the existing LessonCraftStudio technical foundation: rebuild the public site from scratch around teachers in international, bilingual, and immersion early-childhood programs; produce a catalog of interactive worksheets and printable PDFs in 11 languages with consistent quality; **post Tier-2 closeout at `d3b4f962` (2026-05-03), 116 decks published across en+de+es+nl with all 4 locales at 100% C-1 catalog coverage; Wave 1 + Wave 2 i18n chrome shipped per locale; 4-locale Section 2 breadth grid balanced per §18.4 three-equilibria doctrine**; make every public page embed a working sample deck; gate lesson plans, themed bundles, and workspace tooling behind a $69/year subscription per `docs/SUBSCRIPTION-SCOPE.md`; bake SEO into every structural decision; **next-arc options post-Tier-2-closeout: Wave 3 chrome (support/billing/auth/legal long-tail), Tier 3 launch (sv/fi/no), or Pillar 1 lesson-plan authoring (launch-trigger-gating per `docs/SUBSCRIPTION-SCOPE.md` clause-a)**; ship within 12 months without destabilizing the existing Hetzner server, Lemon Squeezy integration, image library, or apps.

If your task appears to be outside this scope, stop and ask the operator before proceeding.

---

## 14. Interactive-HTML export — current implementation status & porting recipe

As of 2026-04-25, **15 of the 29 apps** had shipped the interactive-HTML export: addition (v4), subtraction (v5), code-addition (v6), more-less (v7), math-puzzle (v8), math-worksheet (v9), alphabet-train (v10), pattern-train (v11), prepositions (v12), word-guess (v13), word-scramble (v14), wordsearch (v15), cryptogram (v16), big-small (v17), pattern-worksheet (v18). Porting subsequently completed for the remaining 14 apps; **all 29 apps now ship the interactive HTML feature, the LCSAttribution footer (see §14.3), and the catalog-export ZIP (see §15)**. The canonical app list is in §14.10.

### 14.1 What the current implementation is

Each converted app has a new **Download → "Interactive Worksheet (HTML)"** button that emits a single self-contained `.html` file. The file works fully offline once downloaded:

1. **Snapshot + overlay architecture.** The operator's Fabric canvas is captured as a JPEG (via `canvas.toDataURL({format:'jpeg', quality:0.85, multiplier:2})`) — this preserves every design element, border, background, theme image and header exactly as authored. The JPEG is the backdrop in the downloaded HTML. (Note: the WebP standardization in §5 applies to the source image library; the in-HTML backdrop capture remains JPEG until proven beneficial to switch.)
2. **Overlay layer with interactive elements.** For each exercise, the exporter records per-slot world coordinates (via `calcTransformMatrix`) and emits an HTML overlay positioned in % against the page size so the layout scales with viewport.
3. **No Fabric.js on the student side.** The downloaded HTML is pure HTML + CSS + vanilla JS + a single Google Fonts link for Fredoka. Typical file size: ~200–400 KB including the JPEG backdrop.
4. **Attribution baked onto the canvas.** The shared `LCSAttribution.addToCanvas(canvas, opts)` module places a small "Made with LessonCraftStudio.com" text object at the bottom-center of both the worksheet and answer-key canvases — so it appears in PDF/JPEG/interactive exports uniformly. The interactive file also overlays an invisible clickable `<a class="lcs-attrib-link">` at the baked text's world rect so students can tap it.

The "Download → Interactive Worksheet (HTML)" button is the current implementation surface. The future "Export to catalog" button (§15) wraps this output along with the manifest and PDF into a single ZIP — it does not replace the underlying HTML export logic.

### 14.2 Two runtime families

Twelve ports have converged into two reusable families. Pick the closest reference app when porting a new one:

#### A. **Letter fill-in** (v4–v14) — slot-per-answer, batch-check
Student types into N independent input slots. "Check Answers" turns every slot green/red at once; wrong slots show the correct value in a green pill. Stars-out-of-3 celebration on 100% first-pass correct.

- **Canonical reference:** `REFERENCE APPS/code-addition.html` (v6) for multi-slot with mixed kinds (numbers + letters); `REFERENCE APPS/word-guess.html` (v13) for the cleanest single-kind letter fill-in; `REFERENCE APPS/subtraction.html` (v5) for a base-plus-cross-out extension.
- **Tagging convention:** tag each cell/line the student fills with a per-feature flag (e.g., `isAnswerLine`, `isBlankLetterCell`, `isSumBlank`, `isLetterBlank`). For apps with operator-controlled case (`letterCase` radio), store the chosen case on the canvas (`worksheetCanvas.letterCaseValue = …`) and put it in the bundle so the runtime coerces student input to match; compare case-insensitively.
- **Extensions seen so far:** cross-out (subtraction), multi-slot rows with mixed number+letter kinds (code-addition), choice-button answer (more-less), drag-to-drop pieces (math-puzzle), drag-to-wagon matching (alphabet-train, pattern-train), image-choice plus optional fill-in (prepositions).

#### B. **Puzzle drag** (v15+) — spatial selection, no per-answer slots
Student drags across a letter grid; path snaps to one of 8 directions. On release, endpoints are validated against known placed words; matches lock a pastel highlight over the path.

- **Canonical reference:** `REFERENCE APPS/wordsearch.html` (v15).
- **Tagging convention:** tag the Fabric grid group with `isWordsearchGrid: true` + metadata (rows, cols, cellSize). Attach puzzle data (`grid`, `placedWordsInfo`, `settings`) to `worksheetCanvas.problemsData`. The exporter uses the group's first-child background rect for the grid's world AABB.
- **Runtime shape:** transparent cell overlay absolute-positioned on top of the baked JPEG at the grid bbox; pointer events live on the overlay; a `foundLayer` sibling holds rotated-pill highlights; a progress counter in the top bar shows "N / M found".

### 14.3 Shared attribution module

`frontend/public/worksheet-generators/js/attribution-manager.js` (already on production — it's served by nginx from `/var/www/lcs-media/worksheet-generators/js/` and NOT in git because of a symlink conflict). Exposes:

- `window.LCSAttribution.addToCanvas(canvas, opts)` — places a Fabric.Text at `width/2, height-22` tagged `{ isAttribution: true }`. Opts can override fontSize/fontFamily/fill/bottomMargin.
- `window.LCSAttribution.getRectFromCanvas(canvas)` — returns the baked text's world `{x, y, w, h}` (center/size).
- `window.LCSAttribution.TEXT` (`"Made with LessonCraftStudio.com"`), `.URL` (`"https://lessoncraftstudio.com"`).

**Per-app port needs 7 edits:**
1. Head script tag `<script src="/worksheet-generators/js/attribution-manager.js?v=1"></script>` after `access-guard.js`.
2. `LCSAttribution.addToCanvas(worksheetCanvas, { currentCanvasConfig })` immediately before the worksheet `renderAll()`.
3. Same call for `answerKeyCanvas` before its `renderAll()`.
4. Bundle return gets `attribution: { text, url, rect }` using `LCSAttribution.getRectFromCanvas(canvas)` (null-coalesce when the module isn't loaded).
5. Replace the legacy `.lcs-attrib` CSS rules with three `.lcs-attrib-link` rules (invisible clickable overlay: `position:absolute;transform:translate(-50%,-50%);pointer-events:auto;cursor:pointer;background:transparent`).
6. Change `@media print { ... .lcs-attrib ... }` → `.lcs-attrib-link`.
7. In the runtime's render function, overlay an `<a class="lcs-attrib-link">` at the attribution rect (same %-position math as the slots).

**Attribution is tier-neutral and SEO-neutral.** The footer text and position are independent of the SEO surface defined in §17.8. Future SEO changes to deck.html must not modify attribution; future attribution changes must not affect the SEO content.

### 14.3a Shared catalog-export helpers (`window.LCSCatalogExport`)

`REFERENCE TRANSLATIONS/catalog-export.js` (synced into `frontend/public/worksheet-generators/js/catalog-export.js` by `scripts\master-sync.bat`, served from `/var/www/lcs-media/worksheet-generators/js/catalog-export.js?v=9`). Loaded by all 29 apps. Exposes the following public API on `window.LCSCatalogExport`:

- **`buildSeoHead(manifest, opts)`** — returns the `<head>` SEO surface string for deck.html: `<title>`, `<meta name="description">`, `<link rel="canonical">` (with `__CANONICAL_URL__` placeholder), Schema.org `LearningResource` JSON-LD (with `__EDUCATIONAL_LEVEL__` and `__EDUCATIONAL_LEVEL_LOCALIZED__` placeholders). Per CLAUDE.md §17.8.1 / Brief A §4. The placeholder set is substituted at upload time by publish-cli per §17.8.5.
- **`buildEndDeckLinks(opts)`** — returns the end-of-deck topic-destination links section per §17.8.2 / Brief A §5.5. Default behavior: returns empty string so direct-download decks (operator's "Download → Interactive HTML" button) don't ship raw placeholder text. Pass `{includePlaceholders: true}` from a publish-cli-aware code path (the future catalog-export ZIP flow) to emit the placeholder block (`__LINK_*__` URLs and `__LINK_TEXT_*__` labels) that publish-cli substitutes at upload.
- **`buildSrRows({label, rows})`** — returns a `<section class="lcs-sr" aria-label="{label}"><ol><li>{row}</li>…</ol></section>` block. Group A pattern (§17.8.4 / Brief A §5.4) — used by multi-row apps where deck.html contains repeating exercise rows. Per-app code is responsible for building the `rows` strings (because exercise data shape varies per app); helper owns the structural wrapping and HTML-escaping. JSDoc on this function is the canonical source for the sr* translation-key naming convention table (`srExercise<App>`, `srExercise<App><Mode>`, `srPuzzle<App>`, `srWorksheetQuestions`, `srOperator<Name>`, `srShape<Slug>`) and the single-vs-≥2-consumer rule.
- **`buildSrPuzzleSummary({label, summary})`** — single-puzzle variant of `buildSrRows`. Returns a `<section class="lcs-sr"><p>{summary}</p></section>` block. Used by single-puzzle apps (wordsearch, treasure-hunt, etc.) where the deck has one puzzle and a deck-level summary describes it instead of per-row content.
- **`buildShareAffordance({canonicalURL?, locale, title})`** — returns a self-contained HTML+CSS+inline-JS snippet for embedding inside `lcs-bar` (top-right, immediately after `<button class="lcs-mute">`, 40×40 icon button with `.lcs-share` class). Resolution order for the canonical URL:
  1. `canonicalURL` provided AND not `__placeholder__`-shaped (regex `/^__[A-Z_]+__$/`) → use as-is.
  2. `canonicalURL` absent or placeholder, `locale + title` both present → construct `https://lessoncraftstudio.com/<locale>/decks/<slugify(title)>/` using the existing `slugify` at `catalog-export.js:90`.
  3. Insufficient inputs → return empty string (defensive skip per §17.8.11).

  Self-contained constraint per §14.1: deck.html does NOT load catalog-export.js at runtime; the helper returns a snippet embedded at generation time with click handlers inlined. **String resolution uses bare-`translations` identifier per §17.8.14 convention** — reads at generation time from operator-side `window.translations` (populated by `translations-shared.js` + per-app `translations-<app>.js` merge); resolved strings (per-locale `srShareNative` / `srShareTo` / `srShareCopyLink` / `srShareCopied` / `srShareAria{Facebook,WhatsApp,Pinterest,Email,CopyLink}` keys, all carried in `translations-shared.js` from social-share-v1 onward) bake into the emitted snippet. No runtime translations lookup in the standalone deck.html. Originating commits: Sub-phase A (helper construction) → Sub-phase A.1 hotfix `bbcb444c` (string-resolution `global.translations` → bare-`translations` fix); Sub-phase C `ea8e006a` (DE keys); see §17.8.15 for click-behavior contract.
- **`vocabKeyFromImage(img)`** — accepts a path string OR an image object `{path, word, name}`. Returns a vocabulary-canonical key (string) or `null`. Three image source forms documented (each surfaces a distinct bug if mis-handled):
  1. **Theme path** — clean filename (e.g. `/images/animals/cat.png`). Resolved via `ImageVocab.keyFromPath` → bare key.
  2. **Server-stored upload** — suffix-bearing filename (e.g. `/images/animals/camel-1769386104282-2351c8c4.png`). `ImageVocab.keyFromPath` strips the `-<13digit-timestamp>-<hash>` suffix to recover the bare key. (`LCSImageRef.parseImagePath` leaves the suffix intact and breaks downstream vocab lookup — bug-family eb510be4 / eb510be4.1.)
  3. **Data URL upload** — client-side FileReader-encoded image (e.g. `data:image/png;base64,iVBORw0K…`). No path-derived key is meaningful; falls back to `img.word || img.name` (the original filename the upload form captured), then strips extension and known suffix patterns. (Bug-family eb510be4.2.)

  Single helper covers all three so callers don't replicate the dispatch logic per-app. Required for any site that feeds the result into `ImageVocab.singular()` / `.plural()` / `.gender()`. See `feedback_coverage_dimensions_emerge_from_postmortems.md` for the bug-family chain (parseImagePath vs keyFromPath, real URL vs data URL) that motivated the helper's three-branch dispatch.
- **`HREFLANG_MARKER`** — string constant `<!-- HREFLANG_INSERTION_POINT -->`. Per §17.8.1.5 it MUST be the last element inside `<head>`. Apps emit this marker; publish-cli substitutes it at upload with the hreflang block for v2 decks (`content_family_id` populated) or with empty string for v1 decks.
- **`export(opts)`** — main entry point for the "Export to catalog" ZIP flow. Public API documented in catalog-export.js JSDoc on `exportCatalog`.

The shared keyset complement to this module is `translations-shared.js` (loaded by all 29 apps; merge-on-load into `window.translations` with per-app collision warnings). See JSDoc on `buildSrRows` for the convention rule about when keys live in `translations-shared.js` vs per-app `translations-<app>.js` files.

#### 14.3a.1 Bundle-shape contract extensions (Group B Phase 1)

Three apps gained mode-conditional and identity-mapping bundle fields during Group B Phase 1. The new fields are documented as part of the catalog-export bundle contract:

- **sudoku** (bundleVersion `28.3.0`, commit `9b54ae4b`): `uniqueImageKeys: [vocabKey, ...]` — array of vocab-canonical keys for the N unique images in the picture-sudoku puzzle (4 for default 4×4). Sourced from script-scope `lastGeneratedImages` via `vocabKeyFromImage`. Indexed parallel to `holes[].correctImageIndex` and `cutoutsData[].imageIndex`.
- **cryptogram** (bundleVersion `16.2.1`, commits `ac573fe4` → `5775b9c1`): `cipherMap: {[Letter]: {vocabKey, fallback}}` — letter-keyed dictionary FILTERED to letters appearing in `legendSlots` (minimum-needed shape per Phase 1 iteration round). Each entry has `vocabKey` (via `vocabKeyFromImage`) and `fallback` (`img.word || img.name`) for vocab-miss resilience.
- **picture-path** (bundleVersion `29.4.2`, commits `5bfa496c` → `8fc9f522` → `a3697abe`): four new fields with mode-asymmetric population:
  - `startCellImage: vocabKey | null` — populated for pathway, null for classic-maze + choose-path (arrows, not images at start)
  - `endCellImage: vocabKey | null` — populated for pathway + choose-path (correct endpoint via `data.items[type==='end-correct'].image`), null for classic-maze
  - `endpointCount: number | null` — count of endpoint destinations in choose-path mode (1, 2, or 3 per UI `#choosePathNumPaths`); null for pathway + classic-maze (Phase 1 reopen `a3697abe`)
  - `legend.items[].vocabKey: vocabKey | null` — populated when collectibles configured (Treasure Trail variant of maze modes); existing `correctCount` field on items remains

The surfacing rationale for these extensions is the **structural-vs-identity coverage** dimension promoted at Phase 1 close — bundles can be shape-correct, code-path-covered, image-source-clean, path-encoding-handled, and linkage-loss-free yet still **structurally undescribable** in screen-reader text because they tell you WHERE puzzle elements are without telling you WHAT they are. Recovery requires bundle-extension code to source the identity-mapping data from the puzzle generator's working state at extract time. See `feedback_coverage_dimensions_emerge_from_postmortems.md` dimension 6 for the full rationale.

#### 14.3a.2 Number-word lookup convention for small-cardinality counts

When a bundle field exposes a small-cardinality count needing K-3-natural rendering (e.g. picture-path's `endpointCount` in `{1, 2, 3}`), per-app code defines a small per-locale lookup table at template-fill time:

```js
var lookups = {
    en: { 2: 'two', 3: 'three' },
    de: { 2: 'zwei', 3: 'drei' }
};
var lookup = lookups[srLang] || lookups.en;
```

Out-of-range values fall back to digit form with a `console.warn` (defensive for future UI changes that might offer larger ranges). Tables live in per-app code (not in shared modules) when single-consumer; promote to a shared module if a second consumer adopts the same shape.

Originating commits: picture-path Phase 2 `75d4a27c` (EN) + Phase 3 `263c67f2` (DE).

#### 14.3a.3 4th-consumer threshold pre-emptive refactor

The §14.3a "single-consumer keys per-app, ≥2-consumer keys shared" convention names the boundary at which DRY-extraction is justified. The pre-emptive variant: when the 3rd consumer surfaces AND the 4th consumer is imminent in the open commissions queue, refactor at the 3rd-consumer threshold rather than waiting for the 4th. The 4th commission would have to either (a) re-introduce copy-paste OR (b) trigger the refactor itself; lower marginal cost to refactor while the surface is already opened for editing.

**How to apply:** at any commission that opens a code surface with ≥3 consumers of a copy-paste pattern, audit the open-commissions queue for an imminent 4th consumer. If imminent, fold the refactor into the current commission per the §A.13 refactor-during-already-opened-surface principle.

Originating commit: `785d63f6` `[FEATURE][PUBLISH-CLI]` (slug-derivation refactor; bulk.js + publish.js + index.js → `slug.js: deriveSeedFromManifest`; 4th consumer Pillar 2 bundle-publish path imminent in open commissions queue).

### 14.4 How to port a new app (recipe)

**Step A — Decide which family (§14.2).** If the worksheet has a fixed set of answer positions → family A. If the interaction is spatial selection/drawing → family B.

**Step B — Metadata patches in the operator's rendering code** (all additive, no visual change):
1. `worksheetCanvas.problemsData = <the data object the exporter needs>;` inside `generateWorksheet()`.
2. Tag the interactive elements with per-feature booleans (e.g., `isAnswerLine: true` on each fabric.Line the student fills, `isBlankLetterCell: !isAnswerKey && !clues.has(j)` on each non-clue letter cell, `isWordsearchGrid: true` on the grid group).
3. For mode-branching worksheets, carry the operator choices needed for validation (e.g., `worksheetCanvas.letterCaseValue`, `<rowGroup>.resolvedMode`).

**Step C — Download button + wiring** (4 edits):
1. New `<button id="downloadInteractiveHtmlBtn">` in the download dropdown.
2. `const downloadInteractiveHtmlBtn = document.getElementById(...)` alongside the other download consts.
3. Un-disable it alongside the others in `generateWorksheet()`; disable it alongside the others in the clear/reset path.
4. Click listener: `downloadInteractiveHtml(worksheetCanvas, '<app>_interactive.html')`.

**Step D — Copy the closest reference block and adapt:**
- Bump `bundleVersion` to next N, change `appType` and `title`.
- Rewrite `extractDeckBundle` for the new app's slot shape; reuse `_captureWorksheetImage`, `_worldRectBounds` as-is.
- Extend `renderSlots`/`renderGrid`, `checkAll`, `resetAll` for app-specific interaction if needed.
- Include the 7 attribution edits from §14.3.

**Step E — Validate, sync, commit, deploy** (see §14.5–§14.6).

### 14.5 Local dev loop

A pre-existing unrelated Next.js route conflict blocks `npm run dev` until `frontend/app/sitemap.xml/route.ts` is renamed to `route.ts.DISABLED-FOR-DEV`. **Rename it back before any push to production** or the live sitemap breaks. This is a known wart; fixing it at the source is deferred.

After edits to `REFERENCE APPS/<app>.html`:
1. `scripts\master-sync.bat` (refreshes the two sibling tracked copies and the gitignored frontend/public copy).
2. Hard-refresh `http://localhost:3000/worksheet-generators/<app>.html`.
3. Click Generate, Download → Interactive Worksheet (HTML), open the downloaded file.

### 14.6 Deployment — the TWO-STEP rule

Worksheet-generator HTML updates require BOTH steps; `deploy.sh` alone is not enough because the served copy is `chattr +i` (immutable):

1. **Push + build:** `plink ... "bash /opt/lessoncraftstudio/deploy.sh"` — runs `git pull`, builds, smoke tests. Updates `/opt/lessoncraftstudio/REFERENCE APPS/<app>.html` but NOT the served copy.
2. **Sync the served copy** (the critical second step that is easy to forget):
   ```
   plink ... "cp '/opt/lessoncraftstudio/REFERENCE APPS/<app>.html' /tmp/<app>.html && /var/www/lcs-media/scripts/update-worksheet.sh /tmp/<app>.html <app>.html"
   ```
3. **Verify:** `curl -s https://www.lessoncraftstudio.com/worksheet-generators/<app>.html | grep -c 'Interactive-HTML export v<N>'` must return ≥ 1.

Skip step 2 and the site keeps serving the old HTML — we hit this on the addition deploy.

### 14.7 Known gotchas (read before debugging)

**Fabric geometry**
- **`getBoundingRect(true, true)` on a grouped child returns GROUP-LOCAL coords in Fabric 5.x**, not world coords. Use `calcTransformMatrix()` + `fabric.util.transformPoint` instead.
- **`calcTransformMatrix()` already includes the object's own scale.** Do not also feed `getScaledWidth()/getScaledHeight()` into `transformPoint` — that double-scales. Use intrinsic `img.width` / `img.height`.
- **`exerciseRowGroup.getCenterPoint().y` drifts off the equals sign when operand images aren't square** because the bbox center tracks the image span, not the equation centerline. Anchor to the actual `=` sign via `_findEqualsSign`.
- **The operator may transform (scale/translate/rotate) the rowGroup after generation.** `calcTransformMatrix` honors these transforms; that's why we use it everywhere instead of hardcoded offsets.

**Bundle & runtime authoring**
- **Inline `<script>` inside a string must escape `</script>` as `<\/script>`** to avoid the outer HTML parser closing the script prematurely. Search the new block before committing.
- **Runtime stored as array-of-strings joined at render time** — avoids template-literal escaping issues with `${...}` and backticks. Keep this pattern when copying a block.
- **`expectedAnswer` MUST branch on mode** for find-addend / find-subtrahend / any "missing operand" mode. Otherwise every answer is compared against the arithmetic result and the student's correct answer is marked wrong.

**Operator/interactive filter mismatch (wordsearch-class)**
- **When the operator pre-filters what shows on the worksheet, the interactive export must apply the same filter.** Example: `wordsearch.html` strips non-letters from each word before placing it in the grid, then `createPuzzleObjects` only renders a word-list entry when the *original* `wordsConfig[i].word` uppercases to match the *stripped* placed word. That leaves stray entries in `placedWordsInfo` that never appear to the student — if the interactive export includes them as targets, the 100%-found celebration can never fire. The v15 exporter filters `placedWordsInfo` against `wordsConfig` to mirror the operator's display. Any puzzle app that shows a subset of what it places needs the same double-check.

**UX rules**
- **Don't duplicate what the baked JPEG already shows.** The v15 draft had an interactive "Find these words" list below the grid — pulled immediately because the baked worksheet already listed the targets with images. The overlay layer adds interaction; it doesn't re-present content. The progress counter in the sticky bar is sufficient feedback.
- **The operator's letterCase choice is baked into the clues; the interactive input must match it.** Store `worksheetCanvas.letterCaseValue` at generate time, put it in the bundle, coerce student input on the client. Compare case-insensitively (typing the "wrong" case is still correct — it's the display that matters).

### 14.8 Bundle versions shipped

| Version | App | Family | Notable shape |
|---|---|---|---|
| v4 | addition | Letter fill-in | Base — single numeric slot per row |
| v5 | subtraction | Letter fill-in | v4 + cross-out image hitboxes |
| v6 | code-addition | Letter fill-in | Multi-slot rows; number + letter kinds |
| v7 | more-less | Letter fill-in | Choice-button answer variant |
| v8 | math-puzzle | Letter fill-in | Drag-to-drop puzzle pieces |
| v9 | math-worksheet | Letter fill-in | Symbolic multi-slot algebra |
| v10 | alphabet-train | Letter fill-in | Drag-to-wagon letter matching |
| v11 | pattern-train | Letter fill-in | Drag-to-wagon image matching |
| v12 | prepositions | Letter fill-in | Image-choice circles + fill-in |
| v13 | word-guess | Letter fill-in | Clean single-kind letter blanks (clean reference) |
| v14 | word-scramble | Letter fill-in | Same as v13, with display-only scrambled strip |
| v15 | wordsearch | Puzzle drag | First puzzle-kind; drag-to-select grid |
| v16 | cryptogram | Letter fill-in | Global cipher auto-propagation + live legend read-only display |
| v17 | big-small | Letter fill-in (choice) | Find-one + order-N; transparent button-over-image overlay, per-problem progress dots |
| v18 | pattern-worksheet | Letter fill-in (choice) | Per-puzzle mode: options-tap OR blank-cycle through the puzzle's unique-image palette |

Bundle versions bump on every port so the runtime can key on shape if needed. Family A ports share most code; Family B will grow its own references as crossword/matching/sudoku are added.

### 14.9 Porting completion (historical)

Porting completed in 2026 for the 14 apps not in the original v4–v18 batch shown in §14.8: bingo, chart-count, crossword, find-and-count, find-objects, grid-match, matching, missing-pieces, odd-one-out, picture-path, picture-sort, shadow-match, sudoku, treasure-hunt. All 14 received the interactive HTML feature, the LCSAttribution footer, and the catalog-export ZIP integration in the same wave.

Simple Family-A ports (chart-count, find-and-count, find-objects, odd-one-out, picture-sort, missing-pieces, shadow-match) each fit in an afternoon. Puzzle apps (crossword, sudoku, matching, bingo) needed bespoke Family-B runtimes — roughly a session each. The historical effort estimates in earlier drafts of this document proved roughly accurate.

Four apps remain explicitly out of scope and are NOT part of the canonical 29: `coloring`, `writing`, `draw-and-color`, `drawing-lines`. These are PDF-only activities without discrete exercise instances and don't fit the interactive-worksheet-with-answers pattern. They produce printable outputs only and are not part of the catalog system.

### 14.10 The canonical 29 apps (authoritative list)

**This is the single authoritative source for the count and identity of the worksheet-generator apps in the catalog system.** All briefs, scope statements, and Claude Code prompts that reference "the apps" mean exactly these 29:

`addition`, `alphabet-train`, `big-small`, `bingo`, `chart-count`, `code-addition`, `crossword`, `cryptogram`, `find-and-count`, `find-objects`, `grid-match`, `matching`, `math-puzzle`, `math-worksheet`, `missing-pieces`, `more-less`, `odd-one-out`, `pattern-train`, `pattern-worksheet`, `picture-path`, `picture-sort`, `prepositions`, `shadow-match`, `subtraction`, `sudoku`, `treasure-hunt`, `word-guess`, `word-scramble`, `wordsearch`

All 29 ship:
- The interactive HTML export feature (§14)
- The shared LCSAttribution footer module (§14.3)
- The catalog-export ZIP feature (§15)
- The deck.html SEO surface placeholders (§17.8) — once Brief A ships

**Out of scope, NOT part of the canonical 29:** `coloring`, `writing`, `draw-and-color`, `drawing-lines`. PDF-only activities; printable outputs only; not part of the catalog system.

**Maintenance rule:** when this list changes (apps added or removed from the catalog system), update §14.10 first. All other CLAUDE.md references and any active brief defer to this list as the source of truth. Resist the temptation to update count references elsewhere without first updating §14.10 — drift between sections is a load-bearing risk for a document this reference-heavy.

**Canonical-name-vs-emission contract.** Each app's `generator.app` field in its `manifest.json` MUST match the §14.10 canonical app name verbatim (e.g., `sudoku`, NOT `picture-sudoku`). Any future taxonomy entry, config key, or downstream integration that keys by app name MUST use the §14.10 canonical name. Verified across all 29 apps at Brief B Phase 2 commit `59a0cde9`. Drift surfaced at Phase 2 real-ZIP spot-check when `topics-taxonomy.json` keyed `picture-sudoku` instead of `sudoku`.

### 14.11 Runtime UI i18n architecture — bake-at-source + force-set-in-init

The standalone deck.html displays runtime UI strings (worksheet title strip, Check Answers button, Try Again button, mute/share/embed buttons, result modal heading + score + buttons + status text) which must localize correctly across all 11 platform locales. The **bake-at-source-time + force-set-in-init** pattern is the canonical architecture (locked 2026-05-10 across 29 apps × 11 locales).

#### 14.11.1 STRINGS_ALL bake-at-source

Each app's `INTERACTIVE_RUNTIME_LINES` array contains a `var STRINGS_ALL = {en:{...},de:{...},...,fi:{...}};` literal carrying ALL 11 locales' runtime strings. The runtime selects the locale block from `DECK_BUNDLE.contentLanguage`:

```js
var STRINGS_ALL = {en:{title:"Code Addition Practice",...},fr:{title:"Exercices d'addition codée",...},...};
var STRINGS = STRINGS_ALL[((DECK_BUNDLE && DECK_BUNDLE.contentLanguage) || "en").slice(0,2)] || STRINGS_ALL.en;
function T(k){return STRINGS[k]||STRINGS_ALL.en[k]||k}
```

**Why bake-at-source, not build-at-extractDeckBundle.** Building `bundle.runtimeStrings` from `window.translations[contentLanguage]` at extractDeckBundle time was the prior architecture and proved fragile under multiple historical failure modes:
- Browser cache stale on per-app HTML / per-app translations / translations-shared.js
- translations-shared.js merge race with per-app translations-`<X>`.js (load-order dependent)
- `js/translations.js` 404 (5 apps reference a non-existent file: code-addition / chart-count / pattern-worksheet / sudoku / draw-and-color)
- The `_rt(key, fallback)` lookup chain falls through to the English fallback for ALL keys when translations didn't load — bundle.runtimeStrings ships English values silently

Bake-at-source eliminates the dependency chain. STRINGS_ALL travels with the deck.html literal — locale selection is purely DECK_BUNDLE.contentLanguage. Each deck.html gains ~3-6KB; acceptable for the i18n robustness gain.

**Per-app STRINGS source order:** the `inline-all-locales-strings.js` bake script (commit `30f21267`) reads `REFERENCE TRANSLATIONS/translations-shared.js` (12 runtimeXxx keys × 11 locales) for shared keys, per-app `translations-<X>.js` for `runtimeTitle`, and parses each app's existing English STRINGS dict to preserve key order + any per-app keys (slotNumber, cellNumber, problem, sumLabel, legendTitle, crossOut, wordsFound, etc.). Per-app keys without a translation source default to the English value across all 11 locales (acceptable fallback per K-3-naturalness lock).

#### 14.11.2 Force-set every UI element in init()

The runtime init() MUST force-set every UI element's textContent from STRINGS — never trust HTML template literals or `DECK_BUNDLE.title || T("title")` short-circuits. Canonical pattern (commit `691ac1c7`):

```js
titleEl.textContent=T("title");
if(typeof checkBtn!=="undefined"&&checkBtn){var _ck=STRINGS.checkAnswers||STRINGS.check;if(_ck)checkBtn.textContent=_ck;}
if(typeof resetBtn!=="undefined"&&resetBtn)resetBtn.textContent=T("tryAgain");
```

**Why force-set, not template-literal.** Earlier patterns baked button text from `escapeHtml(bundle.runtimeStrings.checkAnswers)` into the HTML template at gen time; if `bundle.runtimeStrings` was English (window.translations not loaded), the template shipped English literals that the runtime never overwrote. The title surface had `titleEl.textContent = DECK_BUNDLE.title || T("title")` — the `||` short-circuited on English bundle.title before STRINGS_ALL[fr] could resolve via T("title"). Both patterns failed silently when translations didn't load at gen time.

Force-set in init() runs AFTER STRINGS_ALL is in scope, so it always picks up the correct locale regardless of what the HTML template or bundle fields contain. The typeof guards handle wordsearch (no `checkBtn` variable) and apps using either `checkAnswers` or `check` key.

**Element IDs canonical across all 29 apps:** `#lcs-title`, `#lcs-check`, `#lcs-reset`.
**Variable names canonical:** `titleEl`, `checkBtn`, `resetBtn` (wordsearch lacks `checkBtn`).

#### 14.11.3 Adding new runtime UI surfaces

When adding a new UI element to deck.html that displays text:
1. Add the element with a stable `id` (use the `lcs-<name>` convention)
2. Add a STRINGS key to translations-shared.js (≥2-consumer rule per §14.3a) OR per-app `translations-<X>.js`
3. In init(), force-set the element's textContent from `T("<key>")`
4. Re-run `scripts/inline-all-locales-strings.js` to refresh STRINGS_ALL bakes across all 29 apps
5. Bump `translations-shared.js?v=N+1` cache-buster as a fresh-state signal
6. TWO-STEP §14.6 deploy: `deploy.sh` then `update-worksheet.sh` for all 29 served HTMLs

NEVER bake the English text as an HTML literal that the runtime won't overwrite. NEVER short-circuit `T("<key>")` with `DECK_BUNDLE.<field> || T(...)` — the bundle field may carry stale English from an extractDeckBundle that ran with translations not loaded.

#### 14.11.4 Originating commits + verification

- `30f21267` — `inline-all-locales-strings.js` + 29 apps bake STRINGS_ALL with all 11 locales
- `691ac1c7` — `fix-runtime-element-textcontent.js` + 29 apps force-set titleEl/checkBtn/resetBtn at init()

Verified working across all 29 apps × 11 locales by operator on 2026-05-10. Cache-buster `translations-shared.js?v=9` live.

---

## 15. The catalog data pipeline

This section describes the end-to-end flow from a worksheet being generated in one of the 29 apps (see §14.10 for the canonical list) to its appearance in the teacher-facing catalog with full enrichment.

### 15.1 The three-layer manifest

Each deck's metadata is split across three JSON files, each written by a different source, never overwriting each other. The catalog database holds the merged view; the originals stay on disk as the reproducible source of truth.

The manifest also drives the deck.html SEO surface defined in §17.8: `generation.json` carries the reserved `content_family_id` field; `metadata.json` carries `educational_level` and `educational_level_localized`, both deterministically derived by `publish-cli` from `metadata.json`'s existing `age_range` per the mapping table in §17.8.6.

**`generation.json`** — written by the app at generation time. Fully automatic; no human input. Captures everything the app already knows in memory:

```json
{
  "schema_version": "1.0",
  "deck_id": "addition-image-image-es-2026-04-25-001",
  "generated_at": "2026-04-25T14:30:00Z",
  "generator": {
    "app": "addition",
    "app_version": "...",
    "bundle_version": 4
  },
  "language": "es",
  "exercise_type": "addition",
  "exercise_mode": "image-image",
  "settings": {
    "items_per_group_min": 1,
    "items_per_group_max": 5,
    "exercises_per_page": 8,
    "letter_case": "lower"
  },
  "theme": "farm-animals",
  "images_used": ["cow-001.webp", "sheep-002.webp", "..."],
  "vocabulary": ["vaca", "oveja", "..."],
  "exercises": [ /* the actual problems with answers */ ],
  "assets": {
    "html": "decks/addition-image-image-es-2026-04-25-001/deck.html",
    "pdf": "decks/addition-image-image-es-2026-04-25-001/printable.pdf",
    "answer_key_pdf": "decks/addition-image-image-es-2026-04-25-001/answer-key.pdf",
    "thumbnail": "decks/addition-image-image-es-2026-04-25-001/thumbnail.png"
  },
  "content_family_id": null
}
```

The new SEO-driven field on `generation.json` (added per §17.8):

- **`content_family_id`** — nullable string. Reserved schema field for cross-language sibling tracking. **In v1 this is always `null`.** v2 (the translate-this-deck workflow, see §17.8.7) populates it when an operator explicitly translates a deck to another language. Format when populated: `<exercise_type>-<exercise_mode>-<theme_or_'plain'>-<unique_suffix>` (e.g., `addition-image-image-farm-animals-x7k2m`). Reserving the field from day one — rather than adding it as a column later — avoids migrating any v1 deck once v2 ships, since v1 decks simply hold `null` until a translation is created. Without `content_family_id`, no hreflang block is emitted (per §17.8.1.5).

**`metadata.json`** — written by the publish step on the operator's PC. Reads `generation.json`, applies the topic taxonomy (a lookup table from app + mode → subject/topic/age range), auto-fills sensible defaults for title and description, and lets the operator override anything via a small form. Stored alongside `generation.json`.

```json
{
  "schema_version": "1.0",
  "deck_id": "addition-image-image-es-2026-04-25-001",
  "title": { "es": "Sumas con animales de granja", "en": "Farm animal addition" },
  "short_description": { "es": "...", "en": "..." },
  "subject": "math",
  "topic_slugs": ["addition-kindergarten-spanish", "math-spanish-kindergarten"],
  "age_range": "5-7",
  "operator_tags": ["farm-animals", "kindergarten", "visual-aids"],
  "publish_status": "published",
  "operator_review_completed_at": "2026-04-25T14:35:00Z",
  "educational_level": "Kindergarten",
  "educational_level_localized": "Kindergarten"
}
```

The two new SEO-driven fields on `metadata.json` (added per §17.8) are **deterministically derived by `publish-cli` from the existing `age_range` field**; the apps never compute them and the operator never edits them by hand:

- **`educational_level`** — string, required for v1 onward. The English-form school-grade equivalent of the deck. Allowed values: `Preschool`, `Kindergarten`, `Grade 1`, `Grade 2`, `Grade 3`. Computed by `publish-cli` from `age_range` via the mapping table in §17.8.6. Drives Schema.org's `educationalLevel` and the `__EDUCATIONAL_LEVEL__` placeholder substitution in deck.html. Example: `Kindergarten`. Rationale: matches Schema.org's vocabulary 1:1 and matches the educational-level commitment §17.4 already made.

- **`educational_level_localized`** — string, required for v1 onward. The localized rendering of `educational_level` in the deck's language. Looked up by `publish-cli` via the existing next-intl translation system using the i18n key `seo.educational_level.<level>`. Drives the localized `<title>` and `<meta name="description">` content via the `__EDUCATIONAL_LEVEL_LOCALIZED__` placeholder. Examples: `de` → `Kindergarten` (German uses the loanword); `fr` → `Maternelle`; `fi` → `Esikoulu`. Rationale: lets `catalogExport()` produce the localized SEO strings deterministically without re-running translation lookups at upload time.

These fields are backwards-compatible — manifests written before this amendment lacked them. `publish-cli` treats missing fields as "no SEO content" for legacy decks, which is currently zero decks (bulk generation has not begun).

**`enrichment.json`** — written by the local AI service on the Mac Studio after publishing. Adds embeddings, longer pedagogical descriptions in all 11 languages, formal learning objectives, AI-suggested tags. Versioned independently so re-running enrichment with an upgraded model bumps `enrichment_version` without touching the layers below.

```json
{
  "schema_version": "1.0",
  "deck_id": "addition-image-image-es-2026-04-25-001",
  "enrichment_version": 1,
  "model": "ollama:llama3.3:70b@q4",
  "enriched_at": "2026-04-25T15:00:00Z",
  "embedding": [/* vector */],
  "long_description": { "es": "...", "en": "...", /* all 11 */ },
  "learning_objectives": { "es": ["..."], "en": ["..."], /* all 11 */ },
  "ai_tags": ["counting", "single-digit-addition", "visual-math"]
}
```

### 15.2 The publish flow

A new shared module `catalogExport(appConfig, generatedContent)` lives in the apps' shared codebase. Every app calls it at generation time. It produces `generation.json` from in-memory state and the standardized JSON shape.

A new "Export to catalog" button on each app replaces the four legacy download buttons (worksheet PDF, worksheet JPEG, answer key PDF, answer key JPEG — all relics of the discontinued KDP/Etsy product line). It produces a single ZIP per deck named `<deck_id>.zip` containing:

- `manifest.json` — at this stage, identical to `generation.json` (the metadata layer is added by the publish CLI)
- `deck.html` — the self-contained interactive deck (§14)
- `printable.pdf` — for teachers who choose paper
- `answer-key.pdf` — companion to the printable
- `thumbnail.png` — for the catalog card

The operator runs a small `publish-cli` tool on the PC (Claude Code-built). It watches a folder; drop a deck ZIP in, the CLI:

1. Validates the manifest against the schema
2. Auto-fills the `metadata.json` layer using the topic taxonomy lookup, presents a small confirmation prompt
3. Posts `deck.html`, `printable.pdf`, `answer-key.pdf`, and `thumbnail.png` to a static-asset endpoint on the Hetzner server, which writes them to the public asset folder served behind the Cloudflare CDN
4. Generates the native-language slug from the manifest's localized title and stores it on a new `slug` column on the `Deck` table (additive Prisma column, unique on `(language, slug)`, must land before the first deck publishes). Substitutes the SEO placeholders in `deck.html` per §17.8: `__CANONICAL_URL__` becomes `https://lessoncraftstudio.com/<locale>/decks/<slug>/`; `__EDUCATIONAL_LEVEL__` and `__EDUCATIONAL_LEVEL_LOCALIZED__` are computed from `metadata.json`'s `age_range` via the mapping table in §17.8.6 and written into both deck.html and `metadata.json`; `<!-- HREFLANG_INSERTION_POINT -->` is replaced with the hreflang block for v2 decks or with an empty string for v1 decks (`content_family_id = null`); the topic-destination URL placeholders in the end-of-deck links are filled in. On any v2 sibling publish, re-injects the updated hreflang block into all already-published siblings of the same content family.
5. Posts the merged `generation.json` + `metadata.json` to the Hetzner publish endpoint, which inserts the `Deck` row

Within a minute or two, the local AI service on the Mac Studio polls `/api/ai-ingest/pending`, picks up the new deck's manifest, generates `enrichment.json` outputs, and posts them back to `/api/ai-ingest/complete`. The deck now has full enrichment and is ranked correctly in semantic search and shows up as a candidate for topic destination pages.

**Note on `bundle.canonicalURL`.** v1 does NOT promote `canonicalURL` to a proper bundle field. The in-deck share affordance (§17.8.15) constructs its canonical URL at deck.html generation time using the predicted-slug fallback — `https://lessoncraftstudio.com/<locale>/decks/<slugify(bundle.title)>/` — Option A authorized at social-share-v1 Sub-phase A. The proper bundle field arrives when (a) `publish-cli` ships and starts substituting the real `__CANONICAL_URL__` placeholder per §17.8.5, AND (b) the catalog deck route `/[locale]/decks/[slug]` exists. See §17.8.15 for the predicted-slug construction detail and the two filed deferred-queue trade-offs (collision-suffix mismatch; English-title-derived slug regardless of content locale).

**Concrete CLI surfaces** (single-publish, bulk-publish, unpublish), the strict-arg parser, the edit-in-place contract, the slugify divergence, the catalog deck route, the Cloudflare cache-invalidation policy, the `_collisions.txt` differentiation, the block-on-archived UPDATE contract, the unpublish handler, the archive folder structure, the dry-run-vs-real parity guarantee, and the asset placement / OG image / pruning policy are documented in §15.4 through §15.14 below.

### 15.3 The local AI service contract

The AI service is a pull-based worker, not a push target. It polls Hetzner for work and pushes results back. Hetzner never calls the Mac Studio. This keeps the Mac Studio off any synchronous request path and means home-internet hiccups can't break teacher-facing pages.

Endpoints on Hetzner that the AI service uses:

- `GET /api/ai-ingest/pending` — returns up to N decks needing enrichment (or topics needing lesson plans), with auth via a Tailscale-bound shared secret
- `POST /api/ai-ingest/complete` — accepts `enrichment.json` payloads keyed by `deck_id` or topic-and-language

When the Mac Studio is offline, decks accumulate in `pending`. New decks are visible in the catalog without enrichment but rank lower in semantic search until the AI catches up. Topic destination pages fall back to faceted listing when their lesson plan hasn't been generated yet.

### 15.4 The strict-arg-parsing contract

publish-cli's command-line surface is governed by a schema-driven parser at `scripts/publish-cli/strict-args.js`. Every subcommand (`publish`, `publish-bulk`, `unpublish`) declares its allowed flags in a SCHEMAS table. The parser:

- Errors on unknown flags before any side-effect (no DB query, no FS write, no network call).
- Suggests the closest known flag via Levenshtein distance when a typo is detected.
- Exits non-zero with structured stderr.
- Always requires `--confirm` for real bulk-publish (Phase 4 Q2 lock); without it, bulk-publish operates as dry-run regardless of `--dry-run` presence.

**Why strict.** Earlier permissive parsing produced an unintended `addition-image-image-2/v1` deck during Brief B Phase 3 v4 verification when `publish foo.zip --update-deck-id bar` silently fell through to new-publish path (the parser dropped the unknown flag instead of erroring, then the publish path treated the unprefixed `foo.zip` as a fresh INSERT). The strict parser closes this safety gap.

Origin: Brief B Phase 4 commit `772a3375`.

### 15.5 The edit-in-place contract

publish-cli supports editing an already-published deck via the `--update-slug <slug>` flag. The contract:

- **Atomicity** — temp-staging-then-symlink-swap on assets per Brief B Phase 3 v4 amendment A1: write the new versioned dir `<slug>-v<N+1>/`, then `fs.symlinkSync(target, link + '.new')` + `fs.renameSync(link + '.new', link)` to atomically point the `<slug>` symlink at the new version. `rename(2)` on a symlink is atomic at the kernel level. Do NOT use `ln -sfn` (two-syscall non-atomic).
- **DB-asset-inconsistency failure-mode** — locked decision: if the asset placement succeeds but the DB write fails, assets stay in place, error is logged with reconciliation commands in stderr, operator manually reconciles. Per Brief B Phase 3 v4 failure-mode UX policy.
- **Slug-stable-on-update** — the slug doesn't change across versions of the same deck. Versioning happens internally (`<slug>-v<N>/` directory naming); the public URL stays at `/<locale>/decks/<slug>/`.
- **`--update-slug <slug>` is the SOLE update flag.** `--update-deck-id` was removed at pre-Phase-4 hygiene commit `9a30f049` because the Deck schema lacks a `deck_id` column.

### 15.6 Slugify divergence between catalog-export.js and publish-cli

Two slug generators exist in the codebase, and their behavior on non-ASCII input intentionally differs:

- **`catalog-export.js`'s `slugify`** at `:90` does `.replace(/[^a-z0-9-]+/g, '-')` — any non-ASCII character becomes a hyphen. Used at deck.html generation time by the in-deck share affordance's predicted-slug fallback.
- **publish-cli's slug generator** at `scripts/publish-cli/slug.js` implements the §17.8.5 ASCII-fold spec (`String.prototype.normalize('NFD')` + non-decomposable map). Used at upload time to mint the canonical slug stored in the `Deck` row.

The divergence is intentional for v1: it's not load-bearing because `bundle.title` is currently English-only across all 29 apps (deferred-queue entry "apps hardcode English title literal in bundle.title"). The divergence becomes load-bearing when (a) apps localize titles AND (b) the in-deck affordance's predicted-slug fallback is consumed in non-en contexts. At that point the helper's `slugify` upgrades to match publish-cli's ASCII-fold or the helper accepts a real `canonicalURL` from publish-cli post-publish.

### 15.7 The catalog deck route

Deck pages at `/<locale>/decks/<slug>/` are served by an nginx location-block, NOT a Next.js handler. The nginx config lives server-side at `/etc/nginx/sites-enabled/lessoncraftstudio` and is NOT in git (matching the §A.1 isolated-storage pattern for production nginx config). Deployed at Brief B Phase 1 commit `4b91adc0`.

Resolution: `<slug>` is a symlink at `/var/www/lcs-media/decks/<locale>/<slug>` pointing to `<slug>-v<N>/`. Atomic swap on edit-in-place uses `fs.symlinkSync(target, link + '.new')` + `fs.renameSync(link + '.new', link)` — `rename(2)` on a symlink is atomic at the kernel level. Do NOT use `ln -sfn` (two-syscall non-atomic).

**Canonical URLs are `https://www.lessoncraftstudio.com/<locale>/decks/<slug>/`; apex-to-www enforced via nginx 301 — see §A.10.**

**Routing-contract implication for Next.js components.** Two URL classes coexist in production: Next.js routes (handled by `frontend/app/[locale]/...`) and nginx-served URLs (deck pages per this section, PDF downloads, hero video, static assets under `/var/www/lcs-media/`). Next.js routes are trailing-slash-tolerant — Next.js's normalization (configured at `frontend/next.config.js: trailingSlash: false`) strips trailing slashes on rendered output, and the Next.js router handles either form via 308 redirect. nginx-served URLs are trailing-slash-strict — the location-block matches only the with-slash canonical form per §17.4 doctrine; the no-slash form 404s (falls through to Next.js's `[locale]/[...slug]` catch-all, which doesn't recognize the slug, so returns 404).

A Next.js `<Link>` component pointing at an nginx-served URL therefore produces a broken link: Link strips the trailing slash on render, the resulting `<a href>` falls through to nginx, nginx 404s. **Convention:** use Next.js `<Link>` for Next.js-routed paths (`/topic/...`, `/`, locale switches, internal app navigation); use plain `<a href="...">` for nginx-served URLs (deck pages, PDF downloads, anything else nginx routes). The PDF download in any deck-card component is the canonical example: it MUST be a plain `<a>`. The deck-page link from any catalog-render component (topic page, breadth grid, search results, future related-decks rows) MUST also be a plain `<a>`. The trailing-slash routing-contract incident at Pass 7b's deck-card 404 (locale-mirror closure pass diagnostic recon) is the cautionary case in point.

**Defense-in-depth (deferred).** A nginx 301 redirect from no-slash to canonical with-slash form on the deck location-block would catch external referrers, copy-pasted no-slash links, and any future code violating the convention. Filed in deferred queue under "Trailing-slash routing-contract divergence — partially mitigated"; out-of-tree nginx-config work, operator-coordinated.

### 15.8 Cloudflare cache-invalidation policy

5-min short-TTL on deck.html via nginx-side `add_header Cache-Control "public, max-age=300"`. Cloudflare honors origin Cache-Control by default. No Cloudflare API integration in publish-cli; no purge-API calls; no cache-tag headers. Fresh edits propagate within 5 minutes.

**Now load-bearing post-2026-04-30** (Cloudflare onboarding date — see §3.5 amendment). Pre-2026-04-30 the contract was empirically inert because no edge cache was in path (Sub-phase 5.8 finding).

Re-evaluate post-launch only if update frequency proves problematic (filed deferred).

### 15.9 `_collisions.txt` archived-vs-published differentiation

INSERT-route collisions surface different recommendations depending on the colliding row's status:

- **Published-row collision:** `add to --updates-manifest mapping (<slug> ← <zipfile>) OR rename source ZIP`
- **Archived-row collision:** `pick a different slug — slug already used by an archived (unpublished) deck. UPDATE-via-manifest is NOT valid for archived rows; reactivation is out-of-scope per Phase 5 Q2 lock.`

The archived-row recommendation closes the loop with §15.10 (block-on-archived UPDATE); a future reactivation brief would change this surface.

Origin: Brief B Phase 5 commit `0ad626cb` (`bulk.js` extension; `result.collision` carries `existingStatus`).

### 15.10 The block-on-archived UPDATE contract

`publish.js` rejects `--update-slug` when `existingRow.status !== 'published'`. Single-publish + bulk-publish both flow through `publish()` so the block enforces at both call sites. Structured rejection:

> `Error: publish: cannot update deck "<slug>" (status='archived'). Only published decks can be updated via --update-slug. Pick a different slug or implement reactivation in a future brief (Phase 5 Q2 lock = block).`

The `(language, slug)` compound unique constraint (§17.8.5) surviving on archived rows is the mechanism that makes Q2 block-on-reuse work without schema changes.

Origin: Brief B Phase 5 commit `0ad626cb` (`publish.js` extension).

**Cross-locale-OK worked example (added 2026-05-03):** §15.10 same-locale block applies only to `(language, slug)` UPDATE attempts within the same locale. Cross-locale INSERTs of an archived slug are clean because the `Deck` table compound unique constraint is `(language, slug)`, not `slug`-alone. The (en, picture-path) row archived at `0ad626cb` does NOT block subsequent (de, picture-path) + (es, picture-path) + (nl, picture-path) INSERTs in different locales.

**Worked instances:**
- (de, picture-path) — pre-Phase-3a, published before en archive
- (es, picture-path) — `1be13b8a` ES Batch 6 closeout
- (nl, picture-path) — `645ca7ff` NL Batch 6 closeout

**Locale-conditional emission at apps-side** (Phase-3a 5b-1 source-edit `67d5d99d`) handles the SAME-LOCALE case where an archived slug must be replaced. The pattern: `en` context emits `picture-trail` slug; `de` + `es` + `nl` contexts emit canonical `picture-path` slug. This is checked at app-side, not at publish-cli.

**Routing matrix at NL Batch 6 closeout** (`645ca7ff`):

| URL | Status | Source |
|---|---|---|
| /en/decks/picture-trail/ | 200 | `9b2c608e` (en-only canonical) |
| /en/decks/picture-path/ | 404 | `0ad626cb` (archive contract holds) |
| /de/decks/picture-path/ | 200 | pre-Phase-3a |
| /es/decks/picture-path/ | 200 | `1be13b8a` |
| /nl/decks/picture-path/ | 200 | `645ca7ff` |
| /nl/decks/picture-trail/ | 404 | no nl deck at this slug |

### 15.11 The unpublish handler

Single-deck-only CLI surface (Brief B Phase 5 Q1 lock; bulk-unpublish deferred to a future brief if volume ever justifies it):

```
node scripts/publish-cli/index.js unpublish <slug> --language <locale> --confirm
```

Pipeline ordering FS-first DB-last, matching §15.5 publish ordering:

1. `db.findExistingBySlug(language, slug)` — must return `status='published'` row.
2. `place-assets.unpublishAssets(locale, slug)` — symlink-removed-first ordering: removes `<slug>` symlink (immediate 404), then `fs.renameSync` every `<slug>-vN/` to `.archived/<locale>/<slug>-unpublished-<utc>/`.
3. `db.unpublishDeck(id)` — flips `status='archived'`. `updatedAt` auto-tracks via Prisma `@updatedAt`.

DB-failure-post-FS-archive surfaces structured stderr with reconciliation commands (manual psql UPDATE or FS restore) per §15.5 failure-mode UX policy.

Origin: Brief B Phase 5 commit `0ad626cb`.

### 15.12 Archive folder structure

Two namespaces sit alongside in `/var/www/lcs-media/decks/.archived/<locale>/`:

- `<slug>-pruned-<utc>/` — versioned dirs retired by KEEP_VERSIONS=3 pruning at edit-in-place time (Phase 3 behavior).
- `<slug>-unpublished-<utc>/` — versioned dirs archived by the unpublish handler (Phase 5 behavior).

Cleanup-cron deferred to trigger condition (>1 GB OR 100+ decks; filed under archive-cleanup deferred-queue entry).

Origin: Brief B Phase 5 commit `0ad626cb` (`place-assets.js` extension; `unpublishAssets` helper sibling to `place()`).

### 15.13 Dry-run-vs-real-publish parity guarantee

Per-deck staging artifact set (`manifest.json` + post-substitution `deck.html` + `deck.html.diff` + `substitution-report.{json,txt}` + `warnings.txt`) is **byte-identical** between dry-run and real-mode batches (`diff -r` clean across both modes). `_summary.txt` diverges by design (dry-run header lists routing+slug+collision+warnings; real-mode header lists outcome+routing+slug+version). `_results.txt` and `_failures/` are real-mode-only by architectural construction.

**Why this works:** `bulk.js` invokes `dryRunBatch()` as its own pre-flight before any side-effect, then proceeds to publish, then overwrites `_summary.txt` with post-publish outcomes. The shared code path guarantees parity by construction.

Origin: Brief B Sub-phase 5.7 verification (no impl change; document existing contract).

**Within-batch collision-pair inspection-before-confirm pattern (added 2026-05-05).** When `publish-bulk` dry-run surfaces within-batch slug collisions on operator-authored deck waves, default to surfacing inspection report before `--confirm` rather than auto-suffix-and-proceed. Author-intent reconstruction from manifest + asset metadata costs one CC turn; reversal of accidentally-shipped duplicates via §15.5 edit-in-place is more expensive. Inspection report covers per-ZIP filename + manifest summary (exercise_type / exercise_mode / theme / settings / images_used / exercise sample) + asset filename list + file size + mtime per pair, grouped by collision-pair.

**Tiebreak rule (deterministic when operator can't distinguish content quality):** drop the LATER-generated ZIP per pair (earlier-roll-wins). The earlier roll typically represents the operator's first complete authoring; later rolls represent regeneration variation. Operator can override by surfacing roll-preference at inspection time.

Origin: Track C 443→440-deck en addition+subtraction wave at 2026-05-05. 3 collision pairs surfaced; all 3 dropped via earlier-roll-wins tiebreak; final shipped state 440 decks with no `-2` numeric-suffix slugs.

### 15.14 Asset placement, ownership, OG image derivation, pruning

**Asset layout:** `/var/www/lcs-media/decks/<locale>/<slug>-v<N>/{deck.html, printable.pdf, answer-key.pdf, thumbnail.png, og-image.png}` plus the `<slug>` symlink pointing to the latest version dir.

**Ownership:** `lcs-media:lcs-media` 755/644 matching `/var/www/lcs-media/*` siblings. Locale-dir auto-chown via `ensureLocaleDir` helper at first-publish time (Brief B pre-Phase-4 hygiene commit `9a30f049`).

**OG image:** 1200×630 derivation step in publish-cli's pipeline between substitution and asset placement. Sharp-based composite (480×620 thumbnail centered on white 1200×630 background; `channels: 3` flattens any alpha). Atomicity treatment same as other assets (versioned directory + symlink swap).

**Pruning:** versioned dirs aged out by KEEP_VERSIONS=3 are moved (NOT removed) to `.archived/<locale>/<slug>-pruned-<utc>/` per §A.3 spirit. Cross-reference §15.12 for the unpublish-namespace alongside pruned-namespace coexistence.

### 15.15 publish-bulk per-locale isolation contract

`publish-bulk` does not have a `--language` flag. The strict-args schema at `scripts/publish-cli/strict-args.js` declares only `--dry-run`, `--confirm`, `--updates-manifest`, `--batch-id`, `--staging-dir` for the `publish-bulk` subcommand. Per-locale isolation is enforced **at the folder-content layer**, not via CLI argument:

- `bulk.js` scans the input folder via `fs.readdirSync(folder)` and filters to `.zip` extension only (top-level non-recursive)
- Dot-prefixed subdirectories (e.g., `.tier2-trackc-batch-N-{cluster}-{locale}/`) are naturally skipped because `readdirSync` non-recursive + `.zip` filter excludes directories regardless of name

**Operational pattern (locked across 14 ES + NL Track C batches; carried through `b18b8654`–`d3b4f962`):**

1. Before SCP'ing a new batch's ZIPs to `/opt/lessoncraftstudio/publish-inbound/`, archive the prior batch's residue: `mkdir -p .tier2-trackc-batch-N-{cluster}-{locale}/ && mv *.zip .tier2-trackc-batch-N-{cluster}-{locale}/`
2. SCP the new batch's ZIPs to the top level of `publish-inbound/`
3. Run `publish-bulk publish-inbound/ --dry-run` then `--confirm`
4. The dot-prefixed archive subdirs accumulate as a chronological history of all prior batches at this folder level

**Why this matters:** premise drift surfaced at Batch 4 ES (`b18b8654`) when an early brief assumed a `--language=<locale>` filter existed. It does not. Folder-content control IS the per-locale safeguard. New briefs should reference this section rather than imagine a CLI flag.

**Audit at session-state authoring time:** any brief that says "filter ZIPs by locale via X" must reference folder-content control, not a phantom CLI flag.

### 15.16 Manifest-content reconciliation gate

publish-cli's dry-run pre-flight runs a two-dimension reconciliation gate on every manifest before slug derivation, halting the batch if any halt-class fires. The gate is the structural backstop for emit-defects at the 29 §14.10 catalog apps (per §A.13.4 DERIVED-vs-HARDCODED-NULL classification).

**Dimension 1 — `theme` reconciliation** (`reconcileManifestTheme` in `scripts/publish-cli/slug.js`). Compares `manifest.theme` against `parseThemeFromImagePath(manifest.exercises[0].image.path)` (with `images_used[0]` as fallback). Categories:
- **CLEAN** — theme declared + matches first-image path-derived theme (or both null for themeless apps with CUID-shaped image dirs per Track A baseline).
- **MISSING_THEME** — theme null but first-image path declares a theme.
- **MISSING_PRIMARY** — theme declared but no parseable image-path signal.
- **THEME_DISAGREE** — theme declared + first-image path declares different theme.

Hyphen/underscore + case normalization on comparison. Themeless-app legitimate-null path preserved (declared null/undefined + either no `image.theme` OR CUID-shaped image dir).

**Dimension 2 — `exerciseMode` reconciliation** (`reconcileExerciseMode` in `slug.js`). Validates `manifest.exercise_mode` against the app's emit-site classification per the `EXERCISE_MODE_APP_CLASSIFICATION` constant. Categories:
- **CLEAN** — declared value present (DERIVED app emit), OR null from a DERIVED app (legitimate default-mode contract per §17.8.5).
- **MODE_NULL_FROM_HARDCODED_APP** — null from a HARDCODED-NULL app (the defect class; halts batch). Post-Commission ε at `109a91d4` this list is empty across all 29 catalog apps; the gate stays as a backstop ready to fire on any future regression.

**Operational behavior:**
- Both dimensions run in `dryRunBatch()` before any side-effect (no DB query, no FS write).
- Halts are surfaced in `_reconciliation.txt` with per-category + per-app aggregation.
- Themeless apps' legitimate-null path preserved (no false halts on Track A baseline shape).
- Single-deck publish path (`publish.js`) wires dimension 1 + dimension 2 the same way.

**Why this works structurally:** the gate runs at the publish-cli boundary, not at the authoring-app boundary — the gate doesn't replace per-app Shape A discipline (per §A.13.5) but catches whatever the apps' emit-sites fail to enforce. Future regression (an app's emit-site reverting to hardcoded-null OR a new app with HARDCODED-NULL classification) halts at the gate before any URL-collision or SEO-degradation propagates.

**Tests:** 56 unit tests in `scripts/publish-cli/slug.test.js` (21 slugify + 8 deriveSeed + 13 parseThemeFromImagePath + 11 reconcileManifestTheme + 11 reconcileExerciseMode); 5 integration tests in `reconciliation.integration.test.js`.

**Halt-surface predicate calibration vs ground-truth.** When the gate fires unexpectedly (e.g., halts a wave the operator believed clean), the first diagnostic is NOT "the gate is malfunctioning" — it's "verify the predicate against ground-truth." Run `parseThemeFromImagePath` + `reconcileManifestTheme` (or the exerciseMode equivalents) against a sample manifest by hand and compare the gate's classification to manual inspection of the manifest's actual content. Statistical-consistency check at the predicate level catches: (a) genuine emit-defects the operator didn't notice; (b) edge-cases in the predicate (e.g., CUID-shaped image paths, themeless apps); (c) genuine gate bugs (rarer than the first two). Empirical precedent: code-addition wave halt at `9051b43d` was correctly diagnosed as a real emit-defect, not a gate bug, via this calibration step before the salvage script was authored.

Origin: `580b0ca2` (theme reconciliation) + `2b555b57` (exerciseMode reconciliation) + halt-surface predicate calibration discipline codified at this fold pass.

### 15.17 Salvage scripts pattern (`rewrite-manifest-<field>.js`)

When generation-side emit-defects produce structurally-broken manifests across an already-staged ZIP wave, one-shot salvage scripts derive the correct field value from in-bundle content signal and repack the ZIPs in-place with backup. The pattern preserves operator-side generation hours (no regeneration required) and lets the authoring-side root-cause fix ship separately.

**Canonical references:**
- `scripts/publish-cli/rewrite-manifest-theme.js` (`9051b43d`) — salvages `manifest.theme` from `exercises[0].image.theme` (with `images_used[0]` path-derived fallback). Reuses `parseThemeFromImagePath` from `slug.js` so classifications produce values that pass the §15.16 gate downstream.
- `scripts/publish-cli/rewrite-manifest-exercise-mode.js` (`0f0c648d`) — salvages `manifest.exercise_mode` from `settings.<mode-distinguishing-field>` (e.g., `settings.word_reveal_mode` for code-addition). 2-mode contract per operator adjudication.

**Pattern requirements:**
1. **Pre-pass classification before any FS write.** Phase 1 reads every ZIP in the working directory, classifies each into rewrite / skip-clean / halt-class buckets, prints summary. No backups created, no ZIPs repacked. If any halt-class fires → exit before Phase 2.
2. **Halt-classes:** `unparseable` (in-bundle signal missing — `exercises[0]` has no image-bearing object) and `ambiguous` (multiple signals disagree OR signal is CUID-shaped — no derivable value). Defensive — not expected per recon.
3. **Backup-then-rewrite ordering.** Phase 2 writes backups before any in-place modification. Backup convention varies per script:
   - **theme rewriter:** `<workingDir>.original/` sibling directory.
   - **exercise-mode rewriter:** `.<utc-prefix>/` dot-subdir within workingDir, per §15.15 archive convention.
4. **Verification post-apply:** re-run §15.16 reconciliation gate against the rewritten wave; expected output is N/N CLEAN.
5. **Authoring-side root-cause fix is queued separately.** The salvage script closes the present wave; the authoring-side fix (per §A.13.5 Shape A discipline) closes the structural defect for future waves.

**Empirical validation (153 en code-addition wave, 2026-05-05):** theme rewriter at Phase 2 dry-run found 150 rewrite + 3 skip-clean + 0 halts; Phase 3 apply rewrote 150 in-place; Phase 4 reconciliation gate produced 153/153 CLEAN. Exercise-mode rewriter at Phase 2 dry-run found 49 rewrite + 104 skip-clean + 0 halts; Phase 3 apply rewrote 49 in-place; reconciliation gate 153/153 CLEAN. Phase 5 publish: 153/153 INSERT in 11.1s; live curl HTTP 200 across all 3 slug-shape variants.

**Trigger condition:** an emit-defect surfaces post-generation across a staged wave. Always preferred over regeneration when the in-bundle signal is recoverable; regeneration is the fallback when signal is unparseable + ambiguous across the wave.

Origin: `9051b43d` (theme rewriter) + `0f0c648d` (exercise-mode rewriter).

### 15.18 Inbound-link surface counter + gate doctrine

`scripts/publish-cli/count-inbound-surfaces.js` (Phase 4b CJS port from `frontend/lib/seo/count-inbound-surfaces.ts`) implements the 8-surface inbound-link counter consumed by `reconcileInboundLinkSurface` predicate at `seo-reconciliation.js:708`. Counts presence across:

1. exerciseTypeTopicPage (always-true for published)
2. educationalLevelTopicPage (always-true via §17.8.6 mapping)
3. themeTopicPages (true when subjectTags non-empty)
4. siblingAxisStrip (true when locale has ≥2 distinct exerciseTypes)
5. varietyStripRotation (always-true; rotational §16.2)
6. crossAxisPivots (always-true; §16.2 + Arc 6a)
7. deckEndSuggestionStrip (true when locale catalog ≥7 decks)
8. breadthGridFeatured (Phase 3a conservative `false`)

Predicate fires `INBOUND_LINK_COUNT_BELOW_TARGET` when `count < 3` per concern 4 minimum invariant. WARN-class pre-Phase-5; HALT-class post-Phase-5 close per concern 4 escalation schedule.

#### 15.18.1 bulk.js wire-in gap discipline

`scripts/publish-cli/publish.js` (single-publish path) wires `db.findExistingByTitleHash` + `db.findExistingByDescriptionHash` directly at the `reconcileDeckPageSEO` call (lines 205-206). `scripts/publish-cli/bulk.js` (batch path) threads through `ctx.X` from `opts.X` at ctx construction (lines 579-582); but `index.js` (the bulk.dryRunBatch / publishBatch caller at lines 335 + 383) does NOT populate these opts. Production runs receive `undefined` and the predicate's same-locale uniqueness checks silently no-op-pass.

This is the **structurally identical wire-in gap** that Phase 4b closed for `countInboundFn` via default-fallback at ctx construction (`opts.countInboundFn || countInboundMod.countInboundSurfacesForDeck` per `bulk.js` post-`13b7f407`). publish.js (single-publish) wires correctly; bulk.js (batch) falls through unless caller populates opts.

**§A.13.3 candidate at any future bulk.js touch.** When a future commission opens bulk.js for editing, audit `opts.findExistingBy*` callbacks for the same wire-in gap and apply default-fallback pattern matching Phase 4b's countInboundFn closure. OR commission a small `[FIX][PUBLISH-CLI]` scoped to close the gap structurally (estimated <30 LoC + tests).

**Why surfaced as doctrine vs auto-fix:** Phase 4b scope was bounded to countInboundFn per operator commission. Expanding scope mid-execution to fix the parallel title_hash + description_hash wire-in would have crossed §A.13.6 spec-vs-shipped-contract conflict surface; surfaced for explicit operator adjudication rather than silent absorption.

Origin: Phase 4b close-out Item 12; codified at Phase 6 fold.

#### 15.18.2 Pre-publish-state vs post-publish-state semantics for inbound predicate

The inbound-link predicate has a semantic mismatch at dry-run boundary: predicate calls `countInboundFn(deckId, language)` where `deckId` derives from `manifest.deck_id` (operator-space identifier, e.g., `big-small-findbig-en-20260507200010`); helper does `findUnique({where: {id: deckId}})` against `Deck.id` (Prisma CUID, e.g., `cml1k9...`). For pre-publish dry-run, `manifest.deck_id ≠ DB CUID` → `findUnique` returns `null` → helper returns `count: 0` → `0 < 3` → predicate fires.

This is **technically correct** for the deck's actual current DB state (pre-publish, no row), but it surfaces every dry-run as predicate-firing rather than the conceptually-meaningful "post-publish projection."

**Three resolution paths to consider at fold cycle:**

- **Option A — pre-publish skip:** predicate skips for INSERT-path dry-run; runs only for UPDATE-path (existing DB row). Limits predicate's reach to UPDATE flow.
- **Option B — post-publish projection:** helper accepts `(language, exerciseType, ageRange, subjectTags)` directly from manifest; computes projected count by counting WHAT the deck WILL belong to post-publish. Restructures helper signature.
- **Option C — defer-empirical-resolution:** keep current semantics; rely on Phase 5 HALT-class flip + post-publish revalidation cycle to surface real-state count via empirical halt rate.

**Phase 5 close authorized WARN→HALT flip despite this concern.** Operational consequence: any new publish whose deck reaches <3 inbound surfaces aborts publish-bulk batch. For typical en deck pre-publish dry-run state where deck doesn't yet exist in DB, predicate returns count=0 and fires HALT-class. Operator-strategic intervention may be required if production workflow surfaces unexpected halts at scale.

**Trigger condition for resolution.** If empirical halt rate at Track C deck-publish exceeds operator-tolerable threshold (operator-defined; suggested ~5% baseline), commission resolution per A/B/C above. If empirical halt rate stays at ~0% (typical-publish path doesn't trip the pre-publish-state edge case), no resolution needed.

**Cross-reference §A.13.7 first-publish-verification cadence:** the inbound predicate's empirical behavior surfaces at first-publish per app per locale. Track per-app first-publish events for halt-class fires; resolve only at empirical surface.

Origin: Phase 4b close-out Item 13 + Phase 5 risk acceptance; codified at Phase 6 fold.

## 16. Topic destination pages

Topic destination pages are the primary teacher-facing surface and the deliberate divergence from education.com's flat search results. Each page is a curated bundle of resources for a specific (axis × axis-value × locale) combination per the α-granular schema in §16.5 — one of three axes: exercise-type, theme, or educational-level. URL pattern: `/<locale>/topic/<native-language-slug>/` per §17.4 (locale-prefixed; native-language slug; trailing slash; `topic` is an English path constant).

**Implementation status (Pass 7b, 2026-05-01).** Single-axis topic pages — one page per non-empty (axis × axis-key × Tier 1 locale) combination from `topics-taxonomy.json` — implemented at `/[locale]/topic/[slug]/` (`frontend/app/[locale]/topic/[slug]/page.tsx`). Each page filters the catalog by the topic's axis-key and renders a deck grid with no lesson plan card (the §16.2 fallback shape). hreflang alternates list only locales where the same axis-key has decks (honest siblings per §17.4). Cross-product topic pages per §16.1's resolution machinery (subject × topic × age × language with `Topic` row + `LessonPlan` row + embedding-similarity match) require the catalog-side Prisma models from §8.1 plus lesson plan content authoring per `docs/SUBSCRIPTION-SCOPE.md` feature area 1 — both downstream of taxonomy completion. Single-axis pages are the substrate; cross-product pages layer on top when the Topic table and LessonPlan content exist.

### 16.1 Topic resolution

When a teacher submits a search query, the catalog backend tries to resolve it to a known topic before falling back to faceted search:

1. Exact slug match (e.g., `/en/topic/addition/`, `/de/topic/tiere/`, `/de/topic/kindergarten/`)
2. Embedding similarity match against existing `Topic` rows (top hit above a threshold)
3. Fallback to faceted browse (`/<locale>/browse/?q=...`)

The resolution is server-side; teachers always see one of: a topic destination page, or the faceted browse with their query as a search term.

### 16.2 Page composition

Each topic destination page is composed of:

- **Header.** Topic title, breadcrumb (subject › age › topic), brief description, language/grade/subject pills.
- **Lesson plan card.** The `LessonPlan` row for this topic and language. Shows the warmup / main / closure structure with timing, the recommended decks inline, and a "view full plan" link. If no lesson plan exists yet, this card is omitted and the page falls back to a deck-only layout.
- **Recommended interactive decks.** A grid of 4–8 deck cards, ordered by `LessonPlan.recommendedDeckIds` if a plan exists, otherwise by an embedding-similarity ranking against the topic.
- **Companion printable PDFs.** A small list of the recommended decks' printable versions, surfaced for teachers who prefer paper.
- **Show all link.** "47 decks total in this topic — show all" linking to the faceted browse pre-filtered to this topic.
- **Variety strips.** Below the recommended-decks grid: 3–4 algorithmic variety strips (Path 2 commitment locked at recon `2026-05-04`; shipped at `55ac5687`). See substantive composition below.

**Variety-strip composition (locked):**

- **Strip 1 — same axis-key in other locales.** Surfaces decks at the page's axis-key from other locales. Cardinality cap: max 1 deck per locale (cross-locale spread). Cap 6–8 visible decks total.
- **Strip 2 — related topics in current locale.** Surfaces decks at neighboring axis-keys within the same locale. Cardinality cap: max 2 decks per axis-key. Cap 6–8 visible.
- **Strip 3 — other educational levels at same axis-key.** Surfaces the same axis-key at adjacent educational levels in the same locale. Cardinality cap: max 1 deck per educational-level. **Per-page-axis self-skip: SKIP entirely on educational-level axis pages** (rendering "other educational levels at this educational level" makes no sense). Cap 6 visible.
- **Strip 4 — catalog highlights.** Broadest variety surface; aggregate sample across the catalog. Cardinality cap: max 1 per topicSlug + max 1 per locale (broadest spread). Cap 8 visible.

**Self-skip threshold:** each strip self-skips independently when its cardinality drops below 2. Single-tile strips read broken (the kid sees a lone variety pick that signals "we're not really showing you variety, we're showing you leftover"); minimum 2 tiles signals genuine variety. Apply per-strip, not per-page.

**Cross-locale variety ON throughout.** Decks from en/de/es/nl surface on it/fr/pt/sv/da/no/fi pages until those locales have published decks. Once a locale has Track C catalog, Strip 1 prioritizes its own surfaces but other strips continue to draw cross-locale.

**Caching:** ISR per-page revalidation (`revalidate=3600` per shipped state). No module-scoped global memoization at this scale; module-scoped global memoization is filed for future commission when scale-of-traffic warrants the optimization.

**Audit trail (Catalog Variety Arc 1).** Topic-page variety strips shipped at `55ac5687`. The companion homepage BreadthGrid scale-copy line was reverted at `383b7d34` per operator taste-call; references to a "homepage numeric-scale-copy intro" in earlier doctrine drafts are historical and do not describe the shipped state. The Path-2-commitment doctrine (§1, §16.2, §18.4.1) records only what shipped: topic-page strips. Future homepage-side variety surfaces (Catalog Variety Arc 2 expansion to 12 cells + second variety strip; Arc 3 deck-page end-of-deck-link extension) ship per their own future commissions.

**Sibling-axis strip density doctrine.** Beyond the 4 variety strips, topic pages also carry a sibling-axis strip surfacing decks at neighboring axis-keys within the SAME axis (e.g., on `/en/topic/addition/`, surface decks from `/en/topic/subtraction/` and other math exercise-types). The strip caps at max-N-per-related-axis (default N=2) and self-skips when cardinality < 2 (single-tile sibling-strip reads broken; minimum 2 tiles signals genuine sibling variety). Same self-skip threshold as the §16.2 variety strips per consistent visual-density principle.

Originating commit: `15444fe8` Arc 6a (depth-UI overlay; sibling-axis strip + cross-axis pivots + breadcrumbs + result-count + topic-prose container shipped together).

### 16.3 Pre-built vs on-demand

Topic destination pages for the highest-priority topics (`Topic.isHighPriority = true`) are fully pre-built: the lesson plan exists, the recommended decks are chosen, the page is server-rendered with cache. These are the topics shown on the catalog landing page and most likely to be hit by search.

Lower-priority topics that don't yet have a lesson plan render a deck-only version of the page. The AI service generates lesson plans for these in priority order over time.

Truly novel queries that don't resolve to any topic fall through to the faceted browse view. These can be promoted to topic status manually if the operator notices a recurring search.

### 16.4 The topic taxonomy

A `topics-taxonomy.json` file at `frontend/config/topics-taxonomy.json` defines the canonical taxonomy schema across two layers:

1. **Per-app defaults** (`apps.<app-name>.{default_subject, default_age_range, exercise_type_axis_key}`) — used by `publish-cli` to auto-fill the `metadata.json` layer at publish time (§15.2 step 2). Operator confirms / overrides per deck.
2. **Per-axis localized slugs** (`axes.<axis>.<axis-key>.slug.<locale>`) — used by `publish-cli` to substitute end-of-deck topic-link placeholders per §17.8.2 / §17.8.5 + §16.5's α-granular axis commitment.

Three axes per §16.5: `exercise-type`, `theme`, `educational-level`. Schema documented in detail in §16.5.

The `publish-cli` tool reads this when auto-filling `metadata.json` and substituting end-of-deck links; the AI service reads this when generating lesson plans. The taxonomy is the single source of truth for how decks get organized.

This file is operator-authored (with AI assistance during the seeding phase) and is treated like a database migration: changes are explicit, reviewed, and committed to git.

`apps.*.default_subject` is a free-string field, NOT a 4th formal axis. The decision to keep it as free-string was made at recon (Brief B Phase 2) to let the corpus shape the value set rather than design a vocabulary up-front. The Pass 1-6 taxonomy expansion arc closed the value set at 4 values: **math, logic, letters, spatial-reasoning**. Distribution across the 29 §14.10 apps: math 8, logic 8, letters 8, spatial-reasoning 5. New apps must fit one of these four values; introducing a 5th value triggers a doctrine review (operator decision).

#### 16.4.1 `products.ts.category` and `apps.*.default_subject` are orthogonal

Two related-but-distinct taxonomies live in the codebase:

- **`products.ts.category`** (per-app, in `frontend/config/products.ts`): mechanic-shape taxonomy. Names how the kid interacts with the worksheet — letter fill-in, visual scan, matching, search, drag-and-trace, etc. Drives generation-side concerns: runtime family, render pipeline, bundle version.
- **`apps.*.default_subject`** (per-app, in `frontend/config/topics-taxonomy.json`): pedagogical-content taxonomy. Names what the kid is learning — math, logic, letters, spatial-reasoning. Drives discovery-side concerns: topic destination pages, search filtering, lesson-plan grouping.

These are orthogonal. The Pass 1-6 taxonomy expansion arc registered all 29 apps batched by `products.ts.category` and authored `default_subject` per app independently. The cumulative pattern:

| Pass | Cluster (products.ts.category) | Apps | Subject distribution | Shape |
|---|---|---:|---|---|
| 1 | math | 5 | math×5 | full collapse |
| 2 | visual | 4 | math + logic + spatial-reasoning×2 | spread |
| 3 | matching | 5 | letters + logic×3 + spatial-reasoning | spread |
| 4 | literacy | 5 | letters×5 | full collapse |
| 5 | search | 4 | letters + math + logic + spatial-reasoning | full spread |
| 6 | puzzle | 2 | logic×2 | full collapse |

3 collapses + 3 spreads. The collapse-vs-spread divide tracks "what is the cluster about?" — content-named clusters (math, literacy, puzzle) collapse to a single subject; mechanic-named clusters (visual, matching, search) spread across multiple subjects. Override rate across the arc: 1/29 (3.4%) — bingo's math→letters via MEMORY's "literacy prompt" framing.

**Implication for downstream work.** Subject-aware features (topic destination pages, lesson-plan grouping, curriculum mapping by subject, faceted browse subject filter) MUST read `apps.*.default_subject` from `topics-taxonomy.json`, never infer from `products.ts.category`. The category field describes the runtime; the subject field describes the pedagogy.

### 16.5 URL pattern and α-granular topic-page axes (locked decision)

Topic destination page URLs follow the canonical pattern **`/<locale>/topic/<native-language-slug>/`** per §17.4. Native-language slugs throughout (e.g., `/de/topic/tiere/`, NOT `/de/topic/animals/`). Locale-prefixed. Trailing slash. `topic` is an English path constant alongside the native-language slug.

**α-granular axes (locked).** Each deck links to one topic page per axis it occupies. Three axes:

| Axis | Slug source | Example (DE) | Cardinality per deck |
|---|---|---|---|
| `exercise-type` | App + mode → `exercise_type_axis_key` → slug-per-locale | `/de/topic/addition/` | always one |
| `theme` | Operator-set theme → axis-key → slug-per-locale | `/de/topic/tiere/` | conditional (only when theme is set on the deck) |
| `educational-level` | `age_range` → §17.8.6 mapping → axis-key → slug-per-locale | `/de/topic/kindergarten/` | always one |
| `exercise-mode` | App emit-site `manifest.exercise_mode` → axis-key → slug-per-locale | (not a topic-page axis; slug-component-only per §17.8.5 native-language slug derivation) | conditional (only when exercise_mode is non-null per §17.8.5 default-mode-emits-null contract) |

A deck's end-of-deck links (§17.8.2) point to its three (or two, when theme absent) granular topic pages plus a locale-rooted catalog-home link `/<locale>/`.

**`exercise-mode` is a slug-component axis only, NOT a topic-page axis.** The three topic-page axes (exercise-type, theme, educational-level) generate `/<locale>/topic/<slug>/` destination pages per §16.1 resolution. `exercise-mode` participates only in deck-page slug derivation (§17.8.5 native-language slug shape) — it does NOT generate its own topic page. Rationale: modes (find-addend, image-image, cross-out, etc.) are mechanic distinctions within an exercise-type, not standalone discovery surfaces — teachers searching for "subtraction" want all subtraction modes on one topic page, not separate pages per mechanic.

**Compound search-intent topic pages** (e.g., `/de/topic/mathe-kindergarten-addition/`) are NOT in v1 scope. The URL space remains available for future addition without breaking the granular pattern; they would live alongside α-granular pages, not replace them. Deferred per the §17.8.5 publish-cli substitution simplicity vs combinatorial-explosion tradeoff.

**Topic-page composition** stays as documented in §16.2 — the page filters the catalog by the topic's axis value and renders the resulting deck list.

**`topics-taxonomy.json` schema** (§16.4 references this; authoritative shape):

```json
{
  "$schema_version": "1.0",
  "apps": {
    "<app-name>": {
      "default_subject": "math|letters|logic|spatial-reasoning|...",
      "default_age_range": "3-5|5-7|6-8|7-9|8-10",
      "exercise_type_axis_key": "<key into axes.exercise-type>"
    }
  },
  "axes": {
    "exercise-type": {
      "<axis-key>": { "slug": { "<locale>": "<native-language-slug>" } }
    },
    "theme": {
      "<axis-key>": { "slug": { "<locale>": "<native-language-slug>" } }
    },
    "educational-level": {
      "<axis-key>": { "slug": { "<locale>": "<native-language-slug>" } }
    },
    "exercise-mode": {
      "<axis-key>": { "slug": { "<locale>": "<native-language-slug>" } }
    }
  }
}
```

Locale coverage per launch tier (§19): Tier 1 (en, de) authored from day one; Tier 2 (es, nl) folds in at Tier 2 launch; Tier 3 (sv, fi, no) at Tier 3; Tier 4 (fr, it, da, pt) at Tier 4. Missing locale entries cause `publish-cli` to skip end-of-deck link substitution for that locale until coverage lands.

**publish-cli substitution at upload time** reads `topics-taxonomy.json` and substitutes the placeholder pairs in deck.html's end-of-deck links section per §17.8.2 / §17.8.5. Canonical names per the emitter at `REFERENCE TRANSLATIONS/catalog-export.js:34-46` (deployed at `?v=9`): one heading placeholder `__END_DECK_HEADING__`; four URL placeholders `__LINK_MORE_TYPE__`, `__LINK_MORE_THEME__`, `__LINK_MORE_LEVEL__`, `__LINK_BROWSE_ALL__`; four matching localized-text placeholders `__LINK_TEXT_MORE_TYPE__`, `__LINK_TEXT_MORE_THEME__`, `__LINK_TEXT_MORE_LEVEL__`, `__LINK_TEXT_BROWSE_ALL__`. Nine end-of-deck-link placeholders total. The localized-text placeholders accept `{type}` / `{theme}` / `{level}` ICU-style interpolation against per-axis-key localized names (read from `topics-taxonomy.json`'s per-axis-key `name.<locale>` field — see §16.4).

#### 16.5.1 Theme axis-key registration: Path X 1:1 with image-library

`topics-taxonomy.json axes.theme` is registered 1:1 with the `image_themes` Postgres table's `type='images'` rows. **50 color themes + 50 BW themes = 100 axis-keys** (post-`947ad260`). Auto-derivation rule: for each (theme, locale) pair, `slug = slugify(image_themes.displayNames.<locale>)` per §17.8.5; `name = passthrough of image_themes.displayNames.<locale>`. Generator pattern: schema-to-schema script that reads the DB, slugifies per locale, writes the merged `axes.theme` map.

**Decoration assets** in `image_themes` (`type='backgrounds'`, 12 rows; `type='borders'`, 5 rows) are **NOT** registered as axis-keys. They are generation-time visual inputs, not catalog-browsing classifications. The structural distinction: `axes.theme` registers content classifications (what a deck IS); decoration assets are styling choices that don't affect catalog classification. The `image_themes.type` column is the canonical source for the distinction. Registering decoration assets produced 27 of 28 surfaced collisions during the `947ad260` recon (color↔`*_bg` displayName overlap), with zero combinatorial gain — they would have produced dead axis-keys with empty deck inventories.

**Drops + renames at `134614dc`:**
- `food` axis-key DROPPED — no DB theme matched, 0 decks ever used it. Food-adjacent DB themes (`bakery`, `breakfast`, `desserts_and_sweets`, `kitchen_tools`, `at_the_supermarket`) are registered separately as their own axis-keys at `134614dc`.
- `fruit` (singular) RENAMED to `fruits` (plural) to match DB convention. Old `fruit` axis-key dropped; new `fruits` populated from `image_themes.displayNames` via standard auto-derivation.

**`name` field semantic shift at `134614dc`:** `axes.theme.<key>.name.<locale>` shifted from operator-curated singular forms ("animal") to DB-derived plural-capitalized ("Animals"). Existing 116 published decks keep their pre-`134614dc` singular form on end-of-deck links (manifest-baked at publish time); new publishes use the plural form via `__LINK_TEXT_MORE_THEME__` interpolation. Coexistence is correct; no migration required.

**Slug-collision Option A fallback** (recorded at `947ad260`): when `image_themes` data has a Spanish-displayName collision (e.g., `home_bw` + `household_bw` both `"Hogar BN"` pre-fix), the demoted axis-key uses `slugify(image_themes.name)` for the colliding locale only, with the `name` field passthrough preserved. The fallback is bounded — it engages on the colliding locale only; other locales use the standard displayName-derived path. Audit-trail: §A.7.1 documents the underlying `image_themes` Spanish data-quality fix needed (operator-strategic rename to remove the collision; once renamed, the Option A fallback can be removed and slug re-derived via standard path).

#### 16.5.2 "Topics" vocabulary reservation

The word **"topics"** is reserved for the architectural concept defined here: topic-destination pages at `/<locale>/topic/<native-language-slug>/` per §1 / §16.1 / §16.5. User-facing copy does NOT use "topics" as a generic browse-axis label — surface copy uses concrete axis-names (**exercise types**, **themes**, **educational levels**) so the word "topic" stays bound to its architectural meaning across the platform.

This reservation prevents drift between (a) the architectural concept (a curated destination page bundling decks + a lesson plan + variety strips at a single axis-key per locale) and (b) the colloquial use of "topic" as "any browse facet a teacher might pick." Future user-facing surfaces (catalog landing copy, search hint text, footer column headings, marketing surfaces, in-deck end-of-deck-link labels) must use concrete axis-names rather than the generic "topics" label.

Established at Catalog Variety Arc 1 Q2 adjudication (BreadthGrid intro string used `{exerciseTypeCount}` rather than `{topicCount}`). The reservation persists even though that specific surface was reverted at `383b7d34` — the principle applies to any future user-facing surface that names a browse axis.

#### 16.5.3 Path-based 2-axis intersection routes

Beyond the α-granular single-axis topic pages (one axis per page), 2-axis intersection pages live at **`/<locale>/topic/<axis-1>/<axis-2>/`** — locale-prefixed; both axis-keys in their native-language slug form per §17.4 doctrine. Examples:

- `/en/topic/addition/animals/` — addition exercises themed on animals
- `/de/topic/addition/kindergarten/` — addition for kindergarten
- `/de/topic/tiere/kindergarten/` — animal theme × kindergarten

**Canonical axis-ordering.** Axes are ordered as **theme → educational-level → exercise-type** in the URL path. Wrong-order URLs 308-redirect to the canonical form (e.g., `/en/topic/animals/addition/` is wrong-order; canonical is `/en/topic/addition/animals/`? — actually canonical reads as "exercise-type at theme" depending on which axis-pairing rule applies; verify per the live router). The 308 redirect ensures one canonical URL per intersection regardless of how the visitor arrives at the page.

**Why path-based not query-string for 2-axis intersections:** path-based URLs surface as distinct indexable pages with their own SEO surface (title / meta / structured data / sitemap entry); query-string variants would dilute ranking signal across canonical-URL variations. The cost of path-based is route complexity (Next.js `[secondary]` catch-all + canonical-redirect logic); the benefit is dedicated SEO surface per intersection.

Origin: `85f090a3` Arc 6c (intersection routes + sitemap-shard infrastructure shipped together).

#### 16.5.4 Query-string-param convention for filter-sort-pagination

The `topicPage` filter/sort/pagination surface uses **universal English-canonical axis-keys** as query-string params, distinct from the path-based native-language slugs:

- `?level=<English-canonical-axis-key>` — e.g., `?level=kindergarten`
- `?theme=<English-canonical-axis-key>` — e.g., `?theme=animals`
- `?type=<English-canonical-axis-key>` — e.g., `?type=addition`
- `?sort=<sort-key>` — `newest` (default) | `alphaAsc` | `alphaDesc`
- `?page=<n>` — page number (1-indexed; default 1)

**Rationale for English-canonical query-strings vs native-language slugs in path:** different surfaces, different reading grammars. Path-based URLs (single-axis topic pages + 2-axis intersection routes) are SEO-load-bearing identity surfaces — native-language slugs maximize per-locale ranking signal. Query-strings are facet/sort filters layered on top — universal English keys keep filter logic locale-portable and let the same axis-key map across all 11 locales without translation drift.

**Default-value canonicalization:** when a query-string param matches its default value (e.g., `?sort=newest` or `?page=1`), the URL canonical-redirects to the bare path (or to the URL with default-valued params stripped). See §16.8 for the canonical-tag-on-pagination implementation detail.

Origin: `73640794` Arc 6b (filter + sort + pagination shipped together).

### 16.6 Footer rendering doctrine

The Footer surfaces topic-page links across three columns per `frontend/components/layout/Footer.tsx`:

- **Column 1 — `byLanguage`:** locales with published catalog content (`FOOTER_LANGUAGES` array; per Pass 7b F4 honesty, only locales where catalog decks exist link out)
- **Column 2 — `byTopic`:** theme + educational-level axis-keys merged into a single `FOOTER_TOPICS_BY_LOCALE` map (no separate `FOOTER_EDUCATIONAL_LEVELS_BY_LOCALE` map exists; the Footer's "by topic" column merges both subject-matter axes per §16.5 schema)
- **Column 3 — `byExerciseType`:** exercise-type axis-keys per `FOOTER_EXERCISE_TYPES_BY_LOCALE` map

**Pass 7b F4 honesty discipline:** array membership IS the gate — only axis-keys with at least 1 published deck row link out. Fabricating links to empty topic pages erodes trust and produces 404s on click.

**Closeout-batch surfacing discipline (added 2026-05-03 post NL Batch 7 `d3b4f962`):**

Closeout batches that introduce a new educational-level age range (typically 7-9 from `crossword`, less commonly 8-10 from no current §14.10 app) require Footer Col 2 update alongside the more obvious Col 3 (+N exercise-type) update. This is easy-to-miss because the closeout focus is mechanically on Col 3 (1:1 per §14.10 app shipped). The retroactive `grado-2` (es) fix at `d3b4f962` was the precedent that surfaced this discipline — `crossword-es` shipped at `eefced25` (ES Batch 7 closeout) but `grado-2` was not added to `FOOTER_TOPICS_BY_LOCALE.es` until `d3b4f962` caught the gap during NL Batch 7 audit.

**Audit rule:** at every closeout batch, before commit, query the DB for distinct `age_range` values per locale + reconcile against current `FOOTER_TOPICS_BY_LOCALE.<locale>` array. Any new `age_range` mapping per §17.8.6 to an axis-key absent from the array requires an entry. Per `topics-taxonomy.json` Track A `cbabd7e5` mapping:

| age_range | educational-level axis-key per locale |
|---|---|
| 3-5 | preschool / vorschule / preescolar / peuterklas |
| 5-7 | kindergarten / kindergarten / jardin-infantil / kleuterklas |
| 6-8 | grade-1 / 1-klasse / grado-1 / groep-3 |
| 7-9 | grade-2 / 2-klasse / grado-2 / groep-4 |
| 8-10 | grade-3 / 3-klasse / grado-3 / groep-5 (currently zero §14.10 apps fall here; defined-but-unused per §17.8.6) |

#### 16.6.1 Substrate-honesty discipline: topic pages and FOOTER_LANGUAGES extension

Two parallel honesty disciplines apply to newly-substrated locales (locales with Track A + Wave 1 shipped but no Track C deck-publish yet). Both extend the §16.6 footer-honesty principle to other surfaces that should NOT advertise empty inventory.

**Topic-page expectation: 404 until first Track C deck publishes.** A newly-substrated locale's topic pages return 404 until that locale has at least one published deck at the page's axis-key. By design — surfacing an empty topic page (header + zero-deck grid) erodes trust and produces visibly-broken Google cards. Verification matrices for Track A + Wave 1 commissions should NOT score these 404s as failures; they're the honest-substrate-without-content outcome. First documented as CC's correction at `9ea577fe` when the post-shipping verification matrix incorrectly flagged it/fr topic-page 404s as regressions.

**FOOTER_LANGUAGES extension is deferred to first-deck-publish, not bundled with Track A.** The Footer's Column 1 (`byLanguage`) array gates which locales render as footer language-switcher links per §16.6's Pass 7b F4 honesty discipline. Adding a newly-substrated locale to `FOOTER_LANGUAGES` BEFORE that locale has its first published deck would link out to a locale-root page with no catalog content — the same trust-erosion failure mode the gate prevents. Discipline: `FOOTER_LANGUAGES` extension waits for first Track C deck publish in the locale; it does NOT bundle with the Track A locale-substrate commission. Track A commissions ship `FOOTER_TOPICS_BY_LOCALE.<locale> = []` and `FOOTER_EXERCISE_TYPES_BY_LOCALE.<locale> = []` empty-array placeholders (per §16.6 honesty discipline already documented); `FOOTER_LANGUAGES` extension is the parallel deferred-to-first-publish operation.

Both disciplines compose: a newly-substrated locale (e.g. `fi` post-`a47ea021`) returns 404 on `/fi/topic/<any-slug>/`, has no entry in `FOOTER_LANGUAGES`, and has empty arrays in `FOOTER_TOPICS_BY_LOCALE.fi` + `FOOTER_EXERCISE_TYPES_BY_LOCALE.fi`. All three resolve when Track C deck-publish lands the first deck in that locale.

## 16.7 Prose substrate

Topic destination pages render rich descriptive prose above the deck grid — locale-natural multi-sentence paragraphs that describe the topic's pedagogical purpose, the cognitive skills exercised, and the appropriate developmental window. The prose is i18n-keyed per (axis-key, locale) and substituted into a server-rendered container.

### 16.7.1 Q3 fallback chain pattern

Prose lookup follows a 3-level fallback chain:

1. **`topicProse.<axisKey>`** (single-axis pages) or **`topicProse.<a1>__<a2>`** (2-axis intersection pages) — rich prose authored for top-N axis-keys per locale; locale-natural multi-sentence content
2. **`topicPage.intro.<intent>`** (single-axis fallback) where intent ∈ {`exerciseType`, `theme`, `educationalLevel`} — short ICU template ("Worksheets featuring {topic}.")
3. **`topicPage.intersection.intro`** (intersection fallback) — short ICU template ("Worksheets at the intersection of {primary} and {secondary}.")

The container component (`TopicProseContainer.tsx`) checks levels in order, rendering the first non-empty match. Long-tail axis-keys without `topicProse` content substrate-honestly fall through to the template intro; this is intended behavior, not a defect — Path B for content-authoring arcs (§16.7.3).

The chain pattern is broader than topic-page prose; reusable across surfaces where progressive coverage scales with content authoring (specific key → template → fallback intro).

Origin: `15444fe8` Arc 6a (Q3 fallback chain shipped with deferral comment foreshadowing topicProse population) + `c03fdb8e` Arc 6d (component edit + 660 prose blocks across 11 locales).

### 16.7.2 topicProse key shape canonical

i18n key shape per axis count:

- **Single-axis page:** `topicProse.<axis-key>` — e.g., `topicProse.addition`, `topicProse.kindergarten`, `topicProse.animals`
- **2-axis intersection:** `topicProse.<a1>__<a2>` with axis-keys in **alphabetic order** — e.g., `topicProse.addition__animals`, `topicProse.kindergarten__sudoku`

The lookup function (`lookupTopicProse` in `TopicProseContainer.tsx`) sorts the two axis-keys before constructing the lookup key, so callers don't need to remember ordering. Authoring discipline: the i18n message file MUST use alphabetic-ordered keys to match the lookup; out-of-order keys silently fall through to the template fallback.

Origin: `c03fdb8e` Arc 6d.

### 16.7.3 Path B by default for content-authoring arcs

Content-authoring arcs follow **Path B by default**: rich content authored for top-N axis-keys per locale; long-tail axis-keys substrate-honestly fall through to template intros.

**Why Path B not Path A (full coverage):** Path A scales linearly with combinatorial space (axis-keys × locales × intersection-pairs), which can exceed reasonable authoring effort even at modest catalog scale. Path B caps authoring at the high-traffic surfaces while preserving structural coverage via the §16.7.1 fallback chain.

Per-locale Path B target depends on catalog state — at 291-deck catalog (Tier-2-closeout shape), per-locale ≈ 60 prose blocks (1 theme + 20 ex-types + 4 levels + 12 theme×ex-type + 3 theme×level + 20 ex-type×level intersections); cross-11-locale total ≈ 660. Long-tail axis-keys (the other 9 of 29 ex-types, the 99 unauthored themes, etc.) fall through.

**Operator-strategic decision per arc:** which axis-keys are "top-N" — driven by deck-volume, query-volume, or audience priority. Default at scale: top-N by published-deck-count.

Origin: `c03fdb8e` Arc 6d (Path B + intersection.intro gap-fold; 660 prose blocks shipped + 7 intersection.intro gap-fills).

## 16.8 Filter-sort-pagination

Topic destination pages support faceted filter + sort + paginated browsing as a structural fallback for the curated grid + variety strips. The filter sidebar surfaces facet counts; the sort dropdown switches result ordering; pagination caps result density at a fixed per-page limit.

### 16.8.1 TOPIC_PAGE_SIZE = 24

Per-page result count is locked at **24 decks per page** for topic + intersection pages. The constant lives at `frontend/lib/topic-decks.ts: TOPIC_PAGE_SIZE`; all paginated surfaces import from there to keep the count consistent.

**Why 24:** balances grid density (4 columns × 6 rows on desktop) with page-load weight (24 deck cards + thumbnails fits in a single ISR-cached render without exceeding LCP budget). Smaller (e.g., 12) increases pagination friction at scale; larger (e.g., 48) bloats render and risks LCP regression.

Locked at Arc 6b Q-pagination adjudication.

### 16.8.2 Filter-sidebar architecture pattern

The filter sidebar (`FilterSidebar.tsx`) renders 3 facet groups in a fixed order: **theme → educational-level → exercise-type** (matches §16.5.3 axis-ordering convention). Per-axis behavior:

- **Theme facet:** top-N expand pattern — first 12 themes visible by default; "Show all themes" expand button reveals the full set. THEME_TIER1_COUNT = 12 (default in `FacetGroup.themeTier1Count`).
- **Educational-level facet:** all 5 axis-keys visible (no expand pattern; the set is small enough).
- **Exercise-type facet:** all 29 axis-keys visible (operator-curated browsing surface).

**URL-state truth source:** filter checkbox state is read from the URL query-string (`?level/theme/type` per §16.5.4), NOT from React component state. Toggling a facet `router.push`es the new URL with the param added/removed. Component state is presentation-only (theme expand/collapse local state).

**Path-bound axis exclusion:** when the page itself is anchored on an axis (e.g., visiting `/en/topic/addition/` already filters to `type=addition`), that facet group is excluded from the sidebar — the page-level path-bound axis is locked, not toggleable. Only the unbound axes render as facets.

Origin: `73640794` Arc 6b. UX truncation defect surfaced at `91ae41a7` (label-readability fix per §A.13).

### 16.8.3 Canonical-tag-on-pagination

Pagination + sort URLs canonical-redirect to bare path when params equal default values:

- `?sort=newest` → bare path (newest is the default)
- `?page=1` → bare path (page 1 is the default)
- `?sort=alphaAsc&page=1` → `?sort=alphaAsc` (page-1 stripped; non-default sort preserved)

Implementation: server component compares incoming `searchParams` against canonical-form (`buildFilterUrl` strips DEFAULT_VALUES); if mismatch, 308-redirect to canonical. Prevents duplicate-content SEO penalties from ?page=1 vs bare-path appearing as distinct URLs.

**Subtle bug class precedent (`1d105da5` fix):** an earlier implementation compared `sp` (already canonicalized) against `currentSp` (also canonicalized), making them always equal and the redirect never firing. The fix is to compare the RAW incoming `searchParams.toString()` against the canonical form, not two canonicalized variants.

Origin: `73640794` Arc 6b ship + `1d105da5` canonical-redirect fix.

---

## 17. Public site rebuild and SEO-from-the-start

The previous public-facing site (positioned for KDP/Etsy printable sellers) is being deleted in its entirety and rebuilt from scratch for the multilingual K-3 educator audience. This section describes what's being deleted, what's being preserved, and the SEO-first design principles that govern everything new.

### 17.1 What was deleted

**Status: complete** as of tag `v1-teardown-complete` on
`pivot/printable-business-toolkit`. Removed across nine sequenced passes:

- **Pass 1** (`e8c1c28f`): public seller surfaces — 10 route prefixes,
  17 orphan components, 12 cascade files, 9 child sitemaps,
  `apps` message namespace.
- **Pass 2** (`b6c8166e`): static-pages anomaly, `deploy.sh` smoke tests.
- **Pass 3** (`c605c911`): zero-consumer config infrastructure —
  6 directory trees (~80 MB), 10 showcase-images files.
- **Pass 4** (`42f4fd5f`): `compare/`, `gallery/`, `compare-content/`,
  `compare-page-slugs.ts`.
- **Pass 5** (`49b501b0`): middleware rewrite (37 KB → 9.3 KB) with
  410-Gone short-circuit; 7 `*-page-slugs.ts` deleted;
  `blog-legacy-redirect-map.ts` deleted.
- **Pass 6** (`c7d316dc`): member-dashboard legacy buy-button removal;
  Pass 5 SHA backfill.
- **Pass 7** (`38181bd5`): webhook handler legacy-purchase scrub.
- **Pass 8** (`7c24630e`): admin/user-control surgical scrub;
  member/dashboard + verify-app-access converted to admin-only;
  `lemonsqueezy-products.ts` (plural) deleted.
- **Pass 9** (this commit): `DROP TABLE purchases`, `DROP TABLE
  wplus_transactions`; `Purchase` model + `User.purchases` relation
  removed from Prisma schema.

Removed:

- The seller home page replaced with the new multilingual K-3 educator
  home (preceded the teardown sequence, commit `63deeb93`)
- `/[locale]/apps/` and individual app marketing pages — apps are no
  longer publicly browsable (Pass 1)
- `/[locale]/pricing/` — removed Pass 1; directory shell preserved for
  the future two-tier free/$69 pricing page
- `/[locale]/tools/` (KDP Royalty Calculator, Niche Finder, Profit Hub,
  KDP Cover Size Calculator, Activity Book Planner) — removed Pass 1
- `/[locale]/guides/` — removed Pass 1
- `/[locale]/bundles/`, `/[locale]/ideas/`, `/[locale]/start/` —
  removed Pass 1
- `/[locale]/blog/` — removed Pass 1; replacement content per §17.6 lands
  in a separate workstream
- `/[locale]/about/`, `/[locale]/faq/` — removed Pass 1; directory shells
  preserved for new content
- `/[locale]/compare/` and `/[locale]/gallery/` — removed Pass 4 after
  recon confirmed 100% seller-era content (KDP-keyword comparisons,
  33-app worksheet-generator gallery linking exclusively at deleted
  `/apps/`)
- `image-sitemap-index.xml`, `video-sitemap-index.xml` and child sitemap
  routes — removed Pass 1 cascade
- 6 zero-consumer config directory trees
  (`{app,tool,bundle,guide,idea,start}-content/`, ~2,251 files, ~80MB)
  — removed Pass 3
- 10 zero-consumer `*-showcase-images.ts` language files — removed Pass 3
- 7 `*-page-slugs.ts` files (blog/bundle/guide/idea/product/start/tool)
  and `resolve-internal-link.ts` — removed Passes 4–5 after middleware
  rewrite dropped the last consumer
- Static-pages catch-all entries: `en/pages/apps.html`,
  `en/pages/homepage.html`, `de/pages/homepage.html` — removed Pass 2
- Seller-era message namespace `apps` across 11 locales — removed Pass 1
- `frontend/config/lemonsqueezy-products.ts` (plural, 7 dead exports
  after Pass 7's webhook scrub) — removed Pass 8 after §A.3 amendment
- `frontend/app/admin/user-control/grant-access/`,
  `revoke-purchase/`, `search/` API routes — removed Pass 8
  (seller-era purchase admin tooling). Surrounding user-management
  endpoints (`cancel`, `refund`, `reactivate`, `suspend`, `upgrade`,
  `grant-lifetime`, `[userId]`, `export`) preserved.

Public-facing routes matching the deleted prefixes return **HTTP 410 Gone**
(set in `middleware.ts` as of Pass 5) for cleaner search-engine
deindexing. Reshelled directories (`pricing/`, `about/`, `faq/`) return
**404** until new content lands.

### 17.2 What is being preserved (technical foundation)

**Status: still in force** as of tag `v1-teardown-complete`, with
annotations below for items removed in the teardown sequence after
closer recon showed they were seller-era despite original
categorization, and items scope-narrowed to admin-only.

Preserved unchanged:

- The Next.js application, routing infrastructure, build system
- Postgres database (existing tables remain; new tables added per
  migrations; operator-authorized DROP statements for empty seller-era
  tables remain pending in a future pass)
- NextAuth authentication system
- Lemon Squeezy integration and the webhook handler at
  `/api/webhooks/lemonsqueezy/route.ts`
- `lemonsqueezy-product-config.ts` (singular) — defines the $69
  subscription product. Consumed by the webhook handler and the
  homepage SubscribeCTA
- The existing `/api/images` endpoint serving the apps
- The 33 worksheet generator HTML files in `REFERENCE APPS/` (now
  accessed only through admin authentication)
- The image library at `/var/www/lcs-media/image-library/`
- `REFERENCE TRANSLATIONS/image-vocabulary.js` (canonical, never modified
  directly)
- The deployment pipeline, server configuration, all of Appendix A
- Cross-cutting utilities `frontend/lib/schema-generator.ts` and
  `frontend/lib/encode-image-path.ts` — consumer set is healthy
  preserved infra (locale roots, deck pages, etc.)

Originally listed as preserved but **deleted in subsequent teardown work**
after recon showed seller-era content with no K-3 retention case:

- `frontend/app/[locale]/compare/` route and
  `frontend/config/compare-page-slugs.ts` (3 KDP-keyword entries) — Pass 4
- `frontend/app/[locale]/gallery/` route — Pass 4
- `frontend/lib/resolve-internal-link.ts` — Pass 4 (only consumer was
  `compare/[slug]`)
- 7 `*-page-slugs.ts` files in `frontend/config/` — Pass 5 (orphaned by
  middleware rewrite)
- `frontend/config/lemonsqueezy-products.ts` (plural) — Pass 8 after the
  webhook scrub left it 100% dead (zero external consumers). §A.3
  amended to remove from never-delete list

Originally listed as preserved but **scope-narrowed in subsequent teardown
work**:

- `frontend/app/api/member/dashboard/route.ts` — admin-only as of Pass 8.
  Non-admin requests return 403. Source-of-truth shifted from
  `purchases.appsAccess` to admin override only; the seller-era
  reads were dropped because no production purchase rows exist and
  the new platform's subscriber surface (when it lands) will be a
  new component, not an evolution of this dashboard.
- `frontend/app/member/dashboard/page.tsx` — admin-only landing as of
  Pass 8. Non-admins redirect to `/`. Admin path preserves the
  launcher for the 33 worksheet apps.
- `frontend/app/api/verify-app-access/route.ts` — admin-only as of
  Pass 8. Non-admins receive `hasAccess: false`. Aligns with §17.2's
  "33 apps now accessed only through admin authentication."

### 17.3 Seller-customer transition (closed)

**Status: closed** as of tag `v1-teardown-complete`. Production seller-era
tables `purchases` and `wplus_transactions` were dropped Pass 9 with
zero rows in either. The contingency that protected the case of
late-arriving seller-tier customers is now moot — there is no table to
write to, no data path to migrate. The originally-specified
`/legacy-apps/[app-name]?key=[purchase-token]` URL pattern was never
built and will not be.

Historical context: see git tag `v1-teardown-complete` for the
post-teardown HEAD, and the Pass 1–9 commit chain for the path it took.

### 17.4 SEO as a structural design principle

SEO is not a launch checklist item. It is built into every public-facing page from the first commit. The following principles govern Claude Code's work on any teacher-facing surface:

**URL structure with native-language slugs.** Every public page has a URL that is semantic and stable. Slugs are in the page's language, not English transliterations. The German topic page is `/de/topic/mathe-kindergarten-addition/`, not `/de/topic/math-kindergarten-addition/`. Native-language slugs rank in native-language search; English-pattern slugs in foreign domains do not. Same principle for guide URLs, deck slugs, and any other indexable content.

**hreflang implementation per page.** Every page that exists in multiple language variants must declare its alternates in the `<head>` and in the XML sitemap. The hreflang declarations must be accurate to the actual language coverage — declaring a Finnish version that doesn't exist is worse than declaring nothing. The catalog and topic pages have alternates in the languages where they actually have content.

**Crawlability and internal linking.** Every page in the catalog must be reachable from the home page in a small number of clicks. Topic destination pages link to popular topics from the catalog landing. Individual decks link from their topic pages. Topic pages link to neighboring topics in the taxonomy and to all their language-variant siblings. Every cross-link makes the link graph richer and helps Google understand the topical relationships. Orphan pages don't get indexed.

**Schema.org structured markup.** Every deck page carries `LearningResource` schema with `educationalLevel`, `inLanguage`, `audience`, and `learningResourceType` properties. Every topic page carries collection-style schema linking to its component decks. Every guide article carries `Article` schema. This is what surfaces rich snippets in search results and what differentiates educational content from generic web pages in Google's understanding.

**Content depth on topic pages.** Topic destination pages need substantive textual content to rank — the deck grid alone is thin content. Each topic page has a description (200-400 words explaining the topic, the skills involved, the pedagogical approach, the appropriate age range), the lesson plan content (substantial in itself), the recommended decks with descriptions, and frequently asked questions about the topic. Without this content depth, the page won't rank for its target queries.

**Mobile-first design.** Google's index is mobile-first. Every design decision is validated at 375px width before being validated at desktop widths. The catalog grid, the topic page layout, the navigation, the embedded sample decks, the lesson plan card — all of these need to work well on phones because that's how Google evaluates them.

**Page speed at the structural level.** Sample decks on every page (see §18) is great for conversion but means pages carry meaningful asset weight. The structural answer is lazy-loading samples below the fold, server-rendering everything else, deferring non-critical JavaScript, and serving images in modern formats. LCP under 2.5 seconds for every public page is the target.

**Server-side rendering for indexable content.** Every page intended to rank in search is server-rendered, not client-rendered. JavaScript-only pages don't reliably rank. The catalog landing, topic pages, deck pages, guide articles, and the home page are all SSR.

#### 17.4.1 Dual-slug convention: topic-page URL vs LessonPlan.topicSlug

Two distinct slug conventions coexist in the system:

1. **Topic-page URL slug** at `/[locale]/topic/<slug>/` uses the **native-language slug** from `topics-taxonomy.json` (e.g., `/de/topic/tiere/`, `/en/topic/picture-sudoku/`). Honors §17.4 native-language-slug doctrine.
2. **Standalone lesson-plan URL** at `/[locale]/lesson-plans/<slug>/` uses **`LessonPlan.topicSlug` directly** (e.g., `/de/lesson-plans/sudoku/`), which is the **English-canonical axis-key** per Phase 1a Schema-intent-B at `1114dedb`.

These are different conventions. Initial verification of `/en/topic/sudoku/` at Phase 1c apply (`e912b805`) hit 404s correctly because the en native-language slug for axis-key `sudoku` is `picture-sudoku`; re-verification with native-language slugs passed. Future surfaces that link between topic-page and lesson-plan-reader must translate between the two conventions explicitly — typically by reading `topics-taxonomy.json` axis-key from the topic-page slug, then constructing the lesson-plan URL from the axis-key directly.

The two conventions reflect a deliberate separation: topic-page URLs are public-SEO surfaces (native-language slugs maximize per-locale ranking); lesson-plan URLs are subscriber-facing surfaces (English-canonical axis-keys make the LessonPlan FK target legible across the operator's content-authoring tooling). Maintenance rule: don't unify the conventions; translate between them at link-construction time.

#### 17.4.2 Per-locale axis-key name parentheticals reflect platform age-range semantics

Educational-level axis-keys (`preschool` / `kindergarten` / `grade-1` / `grade-2` / `grade-3`) have canonical age-range semantics per Phase 1a Schema-intent-B (per §17.8.6 mapping table):

- `preschool`: 3-5
- `kindergarten`: 5-7
- `grade-1`: 6-8
- `grade-2`: 7-9
- `grade-3`: 8-10

Per-locale `slug` + `name` maps describe the locale's terminology for each age band, USING THE PLATFORM'S AGE-RANGE NUMBERS in parentheticals (where parentheticals apply per §17.4.3) — NOT the locale's school-system age boundary numbers. This preserves cross-locale axis-key age-range consistency: same axis-key represents the same age band across all locales.

**Example resolution:** Italian `Scuola dell'infanzia` covers ages 3-6 in actual Italian school-system structure; Italian preschool axis-key entry uses the platform's `(3-5 anni)` parenthetical, NOT Italian school-system `(3-6 anni)`. Cross-locale-consistency frame at the platform-axis-key abstraction layer.

Established at `b3f0d1f3` (it) + `9ea577fe` (fr) + `589fd554` (pt) + `a47ea021` (no) per Option 1 adjudication.

#### 17.4.3 Descriptor-differentiation pattern

Where a locale's school-system terminology UNIFIES multiple platform axis-keys under a single term, per-locale name maps differentiate via parenthetical descriptor. Where locale terminology is discrete per axis-key, no parenthetical is used.

**4 of 11 locales apply descriptor-differentiation as of `a47ea021`:**
- `it`: `scuola dell'infanzia` covers preschool + kindergarten unified
- `fr`: `école maternelle` covers preschool + kindergarten unified (with petite/moyenne section + grande section sub-bands)
- `pt`: `educação infantil` covers preschool + kindergarten unified (with creche + pré-escola sub-bands per BR-MEC BNCC)
- `no`: `barnehage` covers preschool + early-kindergarten boundary (Norwegian school structure)

**7 of 11 locales with clean per-axis-key terminology (no parentheticals):**
- `en`, `de`, `es`, `nl`, `sv`, `da`, `fi`

The pattern is structural to each locale's school system, **NOT** to a Romance/Germanic language-family divide. it (Romance) + fr (Romance) + pt (Romance) + **no** (Germanic) all apply descriptor-differentiation; sv (Germanic) + da (Germanic) + nl (Germanic) + en (Germanic) + de (Germanic) do not. The structural property is whether the locale's school-system terminology unifies multiple platform axis-keys.

Future locale arcs (any nynorsk extension; any pt-PT extension; any platform expansion past 11 locales) inherit this pattern: assess whether the locale's school-system terminology has discrete per-axis-key terms or unifying terms; apply descriptor-differentiation only where unification occurs.

**Cross-locale educational-level audit (full 11-locale matrix; `a47ea021`):**

| Locale | preschool | kindergarten | grade-1 | grade-2 | grade-3 |
|---|---|---|---|---|---|
| `en` | preschool | kindergarten | grade 1 | grade 2 | grade 3 |
| `de` | Vorschule | Kindergarten | 1. Klasse | 2. Klasse | 3. Klasse |
| `es` | preescolar | jardín infantil | grado 1 | grado 2 | grado 3 |
| `nl` | peuterklas | kleuterklas | groep 3 | groep 4 | groep 5 |
| `it` | Scuola dell'infanzia (3-5 anni) | Scuola dell'infanzia (5-7 anni) | Scuola primaria classe prima | Scuola primaria classe seconda | Scuola primaria classe terza |
| `fr` | École maternelle (petite/moyenne section, 3-5 ans) | École maternelle (grande section, 5-7 ans) | CP (cours préparatoire) | CE1 (cours élémentaire 1) | CE2 (cours élémentaire 2) |
| `pt` | Educação infantil (creche, 3-5 anos) | Educação infantil (pré-escola, 5-7 anos) | 1º ano do ensino fundamental | 2º ano do ensino fundamental | 3º ano do ensino fundamental |
| `sv` | Förskola | Förskoleklass | Årskurs 1 | Årskurs 2 | Årskurs 3 |
| `da` | Børnehave | Børnehaveklasse | 1. klasse | 2. klasse | 3. klasse |
| `no` | Barnehage (3-5 år) | Barnehage (5-7 år) | 1. trinn | 2. trinn | 3. trinn |
| `fi` | Varhaiskasvatus | Esiopetus | 1. luokka | 2. luokka | 3. luokka |

#### 17.4.4 Cross-system-boundary parentheticals are acceptable trade-offs

The platform's `kindergarten` axis-key (5-7) extends one year past the locale's school-system early-childhood boundary in some locales:

- `it`: `scuola dell'infanzia` ends at 6; kindergarten name `Scuola dell'infanzia (5-7 anni)` extends past
- `fr`: `école maternelle` ends at 6; kindergarten name `École maternelle (grande section, 5-7 ans)` extends past
- `pt`: `educação infantil pré-escola` ends at 5; kindergarten name `Educação infantil (pré-escola, 5-7 anos)` extends past significantly
- `no`: `barnehage` ends at 5; kindergarten name `Barnehage (5-7 år)` extends past significantly

These parentheticals read slightly forced from a locale-school-system-purist view. **Forced-ness is the cost; cross-locale axis-key age-range consistency at the platform-abstraction-layer is the benefit.** Established trade-off across 4 locales; codified here so future locale arcs do not re-litigate.

#### 17.4.5 Class 2 collision pattern is per-locale variant

The `home_bw` + `household_bw` `image_themes` pair has identical Spanish + Italian displayNames (`Hogar BN` / `Casa BN` respectively) — surfaced as Class 2 slug collision in those locales' Track A commissions; resolved via §16.5.1 Option A fallback (demoted axis-key uses `slugify(image_themes.name)` for the colliding locale; name passthrough preserved).

The other 9 of 11 locales have distinct translations for `home_bw` / `household_bw`; standard displayName-derived slug path applies. **Pattern: per-locale Class 2 check is needed at every Track A commission; do NOT presume collision pattern from prior locales.**

**Empirical state as of `a47ea021`:**
- **Collision (Option A fallback applied):** `es` (`947ad260`), `it` (`b3f0d1f3`)
- **Distinct (standard path):** `en`, `de`, `nl`, `fr`, `pt`, `sv`, `da`, `no`, `fi`

Underlying data fix per §A.7.1: future operator-curated rename of `household_bw.displayNames.es` (and `it`) to a distinct Spanish/Italian translation resolves the underlying duplicate; once renamed, Option A fallback in `topics-taxonomy.json` can be removed and slug re-derived via standard path.

#### 17.4.6 IT retroactive fix audit-trail (`9ea577fe`)

Italian preschool/kindergarten parentheticals were retroactively corrected at `9ea577fe` (during the French Track A + Wave 1 commission, alongside fr authoring). Pre-fix state shipped at `b3f0d1f3` with age-representative parentheticals (`Scuola dell'infanzia (3-4 anni)` / `Scuola dell'infanzia (5 anni)`), reflecting Italian school-system age-representative framing. Post-fix state per §17.4.2 + §17.4.3 table: `Scuola dell'infanzia (3-5 anni)` / `Scuola dell'infanzia (5-7 anni)` — platform-canonical age-range parentheticals.

The correction was the first surfacing of the §17.4.2 doctrine (per-locale axis-key name parentheticals reflect platform age-range, not locale school-system boundary). The `b3f0d1f3` ship had used the locale-school-system framing without that doctrine yet locked; `9ea577fe`'s authoring of fr's `École maternelle (petite/moyenne section, 3-5 ans)` / `École maternelle (grande section, 5-7 ans)` surfaced the cross-locale-consistency need at the platform-abstraction layer, retroactively triggering the it correction.

**Safe-slug-change verification:** at retroactive-fix time, 0 it decks had been published (Track C deck-creation in `it` was not yet underway). The slug change from age-representative to age-range form had no live consumer; Topic-row keys, deck `topic_slugs` arrays, end-of-deck link substitutions, and Footer.tsx topic-link arrays were all unaffected because empty. Future locale-substrate retroactive corrections after Track C deck-publish has begun will require a deck-rewrite + URL-redirect commission shape; this `9ea577fe` correction landed cleanly because it preceded any deck commitment in the locale.

### 17.5 Keyword research workflow

Claude (Anthropic's Claude in chat, the operator's strategic-thinking partner) performs keyword research on demand for the operator. The workflow:

When new content is being commissioned (a new topic page, a new guide article, a new section of the home page), Claude is asked to research the keyword space for that specific topic and language. Claude uses web search to evaluate what currently ranks for relevant queries, what competing content looks like, what gaps exist, and what the natural URL slug should be in the target language. The output is a brief that informs Claude Code's content production.

A working document `seo-strategy.md` accumulates findings across content commissions. New research extends it. This is a working artifact, not a static plan — it grows as the catalog grows.

For languages where Claude's quality assessment is less reliable (Swedish, Danish, Norwegian, Finnish), a native-speaker review pass is recommended before publishing content. The operator handles this through informal connections; if no native speaker review is available for a piece of content, that content is held until review is possible. The cost of unnaturally translated content in tight-knit professional communities is high and hard to recover from.

Claude's keyword research is strategic, not tactical. Claude can assess "this query has thin competition in Swedish and your platform can rank quickly" but cannot produce precise monthly search volumes or keyword difficulty scores (those require paid tools like Ahrefs or SEMrush, which the operator has chosen not to use at this stage). For your stage and scale, strategic keyword work matters more than tactical precision.

**Phase 6 NSR-flag list status:** 57 keys flagged for native-speaker review across two populations: 17 organic-phrasing flags (4 EN + 13 DE; accumulated one-at-a-time during Brief A 5A) + 40 bulk-i18n-tier flags (`seo.educational_level.*` + `endDeck.*` × 4 NSR-flagged tiers from Brief B Phase 2: sv, fi, no, da). Romance Tier 4 (fr, it, pt) authored without NSR per the stronger Claude quality assessment in those languages. The population distinction matters for review-workflow operationalization (per-flag NSR sessions for Population 1 vs tier-batch NSR by native speaker for Population 2). See `project_k3_phrasing_native_speaker_review.md`.

#### 17.5.1 NSR-flag pattern for Nordic and non-Romance commissions

Claude's quality assessment in Nordic languages (`sv` / `da` / `no` / `fi`) is weaker than in Romance/Germanic. Track A + Wave 1 commissions for those locales (`a47ea021`) ship at correct-enough state per established patterns:
- Auto-derived theme axis-key entries are mechanical (slugify on `image_themes.displayNames`)
- topicPage namespace authoring mirrors structural shape from earlier Romance commissions
- Per-locale chrome translation reaches functional state via cross-locale precedent mirroring

**NSR-flag in commit message identifies the deferred review.** Future native-speaker review commissions can refine chrome translations without re-shipping the full Track A + Wave 1 work. NSR-flag pattern applies to:

- Nordic: `sv`, `da`, `no`, `fi` (`a47ea021`)
- Future locale arcs in non-Romance language families if platform expansion extends past the current 11-locale set

NSR-flag does NOT apply where the locale's chrome shipped via cross-locale-precedent mirroring with native-speaker-equivalent confidence (`en`/`de`/`es`/`nl`/`it`/`fr`/`pt` at their respective Track A commissions; `image_themes.displayNames` pre-existing 11-locale data established by prior diacritics-correctness cycle per §A.7).

### 17.6 Content marketing surface (the blog/guide section)

The platform has a content marketing surface — practically called either "Blog" or "Guides" or "Resources" depending on what the operator chooses. The minimum publishing cadence is one substantive article per week in the strongest content language (probably English), with translation/adaptation into other priority languages over time.

The article topics are not generic teacher content. They address the specific concerns of multilingual K-3 educators:
- "Five ways to support Spanish-speaking children in English-medium kindergarten"
- "How to choose age-appropriate math activities for multilingual learners ages 4-6"
- "Working with multilingual parents in early childhood programs"
- "Integrating home languages into classroom instruction without disrupting curriculum"
- "Lesson planning for international school early years"

These topics are searched for by the target audience. Quality answers don't currently exist in many of the relevant languages. Filling this gap is both audience service and SEO investment.

Every guide article embeds a sample deck relevant to the article's topic — the same principle as every other public page (see §18).

### 17.7 What this means for Claude Code

When commissioned to build a public-facing page, Claude Code:

1. Reads the current `seo-strategy.md` for relevant guidance
2. If the page is new content territory, asks the operator to commission keyword research from Claude before building
3. Implements the page server-rendered with proper schema markup, hreflang to language siblings, an embedded sample deck, mobile-first layout, lazy-loaded below-the-fold assets, and native-language URL slugs
4. Adds the page to the XML sitemap
5. Cross-links from related pages in both directions
6. Validates LCP under 2.5 seconds before considering the page done

The Tailwind UI patterns, the Next.js routing structure, and the database query patterns are all standard for this stack. The SEO discipline is what distinguishes pages that rank from pages that don't, and Claude Code carries that discipline as a default rather than as a launch-checklist afterthought.

### 17.8 The deck.html SEO surface

Each deck published to the catalog is also a self-contained static HTML file at a public URL (per §4.4). That URL is independently indexable: Google sees each deck.html as its own page. Across the launch target of 400–600 decks (§19) growing toward thousands as the catalog matures, each in 11 language variants where applicable, this is a meaningful long-tail SEO surface — but only if the individual decks rank for their own queries. Generic titles, missing structured data, blank image alts, and absent hreflang siblings collectively waste the entire long tail.

The SEO design is locked **before bulk generation begins**. Retroactively adding markup to thousands of already-published deck.html files would require regenerating the entire catalog — expensive, slow, and risks visual regression. The window to lock the surface is now.

Two existing constraints govern the design:

- **§4.4 cacheability.** The deck.html served to teacher A, teacher B, and Googlebot must be the same bytes — Cloudflare's cache key is one-per-deck-version, not one-per-tier or one-per-request. All SEO content is baked into the file at publish time; no request-time templating.
- **§14.3 attribution neutrality.** SEO additions do not modify the attribution footer. The "Made with LessonCraftStudio.com" text and its position are independent of SEO content.

**v1 / v2 scope split.** The amendment ships in two waves. **v1 (now)**: each deck.html carries the SEO surface — head metadata, semantic HTML, structured data, internal links, image alts, hidden exercise text, canonical URL — but no cross-language sibling tracking. Decks are generated independently in their own languages. `content_family_id` is a reserved nullable schema field that ships from day one and stays `null` for every v1 deck; the hreflang block is empty in v1. **v2 (later sprint)**: a "translate this deck" operator workflow generates language siblings sharing a `content_family_id`, and `publish-cli` then injects hreflang blocks linking the siblings. Reserving the schema field now avoids migrating v1 decks once v2 lands. Detailed in §17.8.7.

#### 17.8.1 What the deck.html `<head>` must contain

1. **`<html lang="...">`** at the document root, set from the manifest's `language` field (two-letter ISO 639-1).

2. **`<title>`** generated from the manifest. Pattern: `<Exercise type, capitalized> Worksheet — <Theme, capitalized> — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio`. Example after `publish-cli` substitution: `Addition Worksheet — Animals — Kindergarten | LessonCraftStudio`. The `__EDUCATIONAL_LEVEL_LOCALIZED__` placeholder is filled by `publish-cli` (see §17.8.5 and §17.8.6); the apps emit the placeholder rather than the value because the apps don't have access to `metadata.json`'s `age_range` at generation time. Fallbacks: omit the theme segment if no theme is set; omit the educational-level segment (and the surrounding em-dash) if no `age_range` is set in `metadata.json`. Length target 50–60 characters where possible; truncate gracefully. Localized to the deck's language (the exercise type and theme are already localized in the manifest; the "Worksheet" word is looked up via existing translation keys).

3. **`<meta name="description">`** generated from the manifest, with the same `__EDUCATIONAL_LEVEL_LOCALIZED__` placeholder. Pattern: `Free interactive <exercise type> worksheet <theme phrase> for __EDUCATIONAL_LEVEL_LOCALIZED__. <Activity instruction sentence>. Print or play online.` Example after substitution: `Free interactive addition worksheet with animal pictures for kindergarten. Add the numbers and write your answers. Print or play online.` The activity instruction sentence is the same one rendered at the top of the worksheet (already localized). Length target 150–160 characters; truncate gracefully. Localized.

4. **`<link rel="canonical" href="__CANONICAL_URL__">`** with the placeholder substituted at publish time by `publish-cli`. The canonical URL pattern is **`https://lessoncraftstudio.com/<locale>/decks/<native-language-slug>/`** — locale-prefixed (per §17.4), with `decks` as a constant English path noun (consistent with §17.4's pattern of English path nouns and native-language slugs — `topic` stays English in `/de/topic/...`, only the slug is German), and `<native-language-slug>` derived deterministically from the manifest's localized title by `publish-cli`. Trailing slash, no `.html` extension. Examples:
   - `https://lessoncraftstudio.com/de/decks/addition-tiere-kindergarten/`
   - `https://lessoncraftstudio.com/en/decks/addition-animals-kindergarten/`
   - `https://lessoncraftstudio.com/fi/decks/yhteenlasku-elaimet-esikoulu/`

   The internal `deck_id` (e.g., `addition-image-image-de-2026-04-25-001`) stays as the database key, the manifest key, and the ZIP filename — it does not appear in the public URL. Slug generation, the new `Deck.slug` Prisma column, and collision handling are detailed in §17.8.5.

5. **`<!-- HREFLANG_INSERTION_POINT -->`** HTML comment marker at the end of `<head>`. Replaced by `publish-cli` at upload time:
   - **v1 decks** (`content_family_id = null`): the marker is replaced with an empty string. No hreflang block is emitted, because no cross-language siblings exist (see §17.8.7).
   - **v2 decks** (`content_family_id` populated by the translate-this-deck workflow): the marker is replaced with one `<link rel="alternate" hreflang="..." href="...">` per language sibling that exists for this deck's content family, plus a `hreflang="x-default"` link pointing to the English version (or, if no English version exists, the first published language). Whenever a new sibling is published, `publish-cli` re-injects the updated block into all existing siblings of the same family.

6. **`<script type="application/ld+json">`** Schema.org `LearningResource` block with these fields:

   - `@context`: `https://schema.org`
   - `@type`: `LearningResource`
   - `name`: same string as the `<title>` minus the ` | LessonCraftStudio` suffix (with `__EDUCATIONAL_LEVEL_LOCALIZED__` substituted by `publish-cli`)
   - `description`: same as the `<meta name="description">` content (with the same substitution)
   - `learningResourceType`: `Worksheet`
   - `educationalLevel`: the English form, populated by `publish-cli` from the `__EDUCATIONAL_LEVEL__` placeholder (`Preschool`, `Kindergarten`, `Grade 1`, `Grade 2`, or `Grade 3`)
   - `teaches`: the exercise type's topic slug (e.g., `addition`, `letter recognition`, `shape matching`)
   - `inLanguage`: language code from the manifest
   - `isAccessibleForFree`: `true`
   - `creator`: `{"@type": "Organization", "name": "LessonCraftStudio", "url": "https://lessoncraftstudio.com"}`
   - `audience`: `{"@type": "EducationalAudience", "educationalRole": "student"}`
   - `url`: same as the canonical URL (publish-cli substitutes via `__CANONICAL_URL__`)

   Serialize as compact JSON inside the script tag. No newlines, no comments, no trailing whitespace.

#### 17.8.2 What the deck.html `<body>` must contain

1. **One `<h1>` per deck**, containing the worksheet title (e.g., `Addition Fun`). One only. Visually styled to match the existing title design — replace the existing `<div>` wrapper that renders the title; do not add a second h1. The text is unchanged from what the worksheet already shows; the change is the wrapping element, not the content.

2. **Instruction sentence wrapped in `<p>`**, not a `<div>`. Same content as today; semantic markup only.

3. **`alt` attributes on every `<img>` element rendered from the image library.** The alt text is the vocabulary entry for that image, in the deck's language. The vocabulary system (`REFERENCE TRANSLATIONS/image-vocabulary.js`) already knows what each image represents; pipe that string through to `alt`. No alt may be empty — a missing vocabulary entry is a vocabulary bug to fix, not a reason to omit the alt.

4. **Hidden text describing the actual exercise content**, for screen-reader and crawler access. Each exercise row carries an `aria-label` or visually-hidden span containing the exercise in words: e.g., "Question 1: 1 bat plus 5 bats equals blank." This text:
   - Lives in the deck's language
   - Is screen-reader accessible (a real accessibility win, not just SEO theater)
   - Is generated from the manifest's `exercises` array — the data is already there, just not rendered as text
   - Uses the standard `sr-only` CSS pattern for visually-hidden-but-readable content

5. **End-of-deck internal links** — 3–4 real `<a href>` links to topic destination pages, rendered when the student finishes the deck (the existing "well done" or end-screen state). Per §16.5's α-granular axes the targets are:
   - `/<locale>/topic/<exercise-type-slug>/` — e.g. `/de/topic/addition/` ("More addition worksheets")
   - `/<locale>/topic/<theme-slug>/` — e.g. `/de/topic/tiere/` ("More animal-themed worksheets") — only when theme is set
   - `/<locale>/topic/<educational-level-slug>/` — e.g. `/de/topic/kindergarten/` ("More worksheets for kindergarten")
   - `/<locale>/` — final "Browse all worksheets" link to the locale-rooted catalog home

   Real anchor elements with real `href` values — not JavaScript-driven buttons. Link text is in the deck's language. `publish-cli` substitutes the final URLs at upload time using the placeholder pairs `__LINK_MORE_TYPE__` / `__LINK_MORE_THEME__` / `__LINK_MORE_LEVEL__` / `__LINK_BROWSE_ALL__` for URLs and `__LINK_TEXT_MORE_TYPE__` / `__LINK_TEXT_MORE_THEME__` / `__LINK_TEXT_MORE_LEVEL__` / `__LINK_TEXT_BROWSE_ALL__` for the localized link text, plus `__END_DECK_HEADING__` for the section heading. Canonical names per the emitter at `REFERENCE TRANSLATIONS/catalog-export.js:34-46`. URL substitution per §16.5's α-granular schema; `publish-cli` reads `topics-taxonomy.json` (§16.4) at upload time.

#### 17.8.3 What is explicitly out of scope (anti-SEO)

- **No keyword stuffing.** Hidden keyword blocks, repeated terms, or unnatural phrase density are not permitted. Google penalizes it; the platform doesn't need it.
- **No competing for high-volume head terms.** The deck.html SEO targets long-tail specificity. The catalog ranks for queries like "kindergarten subtraction worksheet animals German," not "free worksheets." High-volume head terms are dominated by sites with a decade of authority; chasing them is wasted effort (consistent with §17.4).
- **No platform-wide content embedded in each deck.html.** No "About LessonCraftStudio" paragraph, no full nav menu, no sitewide footer linking to every topic page. Each deck.html is lean and focused on its own content.
- **No AI-generated marketing copy in decks.** The Mac Studio AI enrichment (§4.5, §15) writes to `enrichment.json` for catalog browsing, not into deck.html. Per Google's helpful-content guidelines, AI-generated paragraphs in static HTML target penalty risk.
- **No tier-dependent SEO content.** Same deck.html for free and paid teachers, consistent with the tier-neutral attribution design (§14.3). The CDN cache key is one-per-deck-version, not one-per-tier.
- **No request-time templating of deck.html.** SEO content is baked in by the originating app at generation time and by `publish-cli` at upload time. No server-rendered overlays, no per-request injection.

#### 17.8.4 What changes in `catalogExport()` (the shared module from §15.2)

The shared module gains responsibility for emitting the **structure** of the SEO surface — element types, placeholder strings, JSON-LD scaffolding, comment markers — without filling in values that depend on `metadata.json` or the published-deck context. Specifically `catalogExport()` emits:

- The `<title>` element with the `__EDUCATIONAL_LEVEL_LOCALIZED__` placeholder
- The `<meta name="description">` element with the same placeholder
- The Schema.org JSON-LD block with the `__EDUCATIONAL_LEVEL__`, `__EDUCATIONAL_LEVEL_LOCALIZED__`, and `__CANONICAL_URL__` placeholders
- The `<!-- HREFLANG_INSERTION_POINT -->` comment marker
- The `__CANONICAL_URL__` placeholder in the `<link rel="canonical">` tag and in the JSON-LD `url` field
- The placeholder URL strings for end-of-deck topic-destination links
- The `aria-label` / `sr-only` text for each exercise row, generated from the manifest's `exercises` array

**Multi-template-variant pattern (Group B Phase 2 — picture-path):** for apps whose sr-only output is mode-conditional, the per-row pattern generalizes to multiple template keys dispatched on `bundle.mode`. Picture-path establishes the pattern with four template keys:

- `srPuzzlePicturePathPathway` — both endpoints have images
- `srPuzzlePicturePathClassicMaze` — both endpoints are arrows
- `srPuzzlePicturePathChoosePathSingle` — choose-path with `endpointCount === 1` (structurally a single-endpoint maze with image-at-end; reuses classic-maze structural language with image substitution)
- `srPuzzlePicturePathChoosePath` — choose-path with `endpointCount >= 2` (multi-endpoint framing with number-word substitution per §14.3a.2)

Per-app code in `renderStandaloneHTML()` selects the variant on `bundle.mode` (and secondary discriminators when applicable — see §17.8.12). Conditional segments — e.g. picture-path's collectibles segment when `bundle.legend.items[]` is non-empty — are handled by the same per-app code, appending after the mode-template-fill. Originating commit: picture-path Phase 2 `75d4a27c`. Single-template apps continue using a single `srPuzzle<App>` or `srExercise<App>` key as before.

These all live in `catalog-export.js` and are written into the deck.html string before the ZIP is bundled. Per §3.2 the apps' generation algorithms are extended, not rewritten — per-app changes are surgical:

- Replace the title element wrapper (`<div>` → `<h1>`)
- Replace the instruction wrapper (`<div>` → `<p>`)
- Add `alt` attributes to image rendering (uses the vocabulary lookup the apps already do for image selection)
- Add `aria-label` generation to exercise-row rendering (uses the same exercise data the app already has)

The apps deliberately do **not** populate `educational_level` or the canonical URL; those are `publish-cli`'s job (see §17.8.5).

#### 17.8.5 What changes in `publish-cli`

`publish-cli` (§15.2) inherits these substitutions on every upload:

1. **Generates the native-language slug** from the manifest's localized title. The slug is lowercase, hyphen-separated, ASCII-folded for URL-path safety (e.g., German `ä` → `a`, Finnish `ä` → `a`, Spanish `ñ` → `n`), and de-duplicated by appending a numeric suffix if a collision exists for the same locale. The slug is stored in a new **`slug` column on the Prisma `Deck` table** — additive, nullable for any pre-existing rows, required for new rows, with a unique constraint on `(language, slug)`. This Prisma migration is small and non-breaking but **must land before the first deck publishes** so every published deck has a stable canonical URL from day one.

2. **Substitutes `__CANONICAL_URL__`** with `https://lessoncraftstudio.com/<locale>/decks/<slug>/`, computed from the deck's `language` and freshly-generated `slug`.

3. **Computes `educational_level` and `educational_level_localized`** from `metadata.json`'s `age_range` field via the deterministic mapping table in §17.8.6. The values are stored on the merged manifest (specifically: in the `metadata.json` layer — see §15.1) and substituted into deck.html at the `__EDUCATIONAL_LEVEL__` and `__EDUCATIONAL_LEVEL_LOCALIZED__` placeholders. The apps do not touch these fields. Centralizing the mapping in `publish-cli` keeps a single source of truth and prevents per-app drift.

4. **Substitutes `<!-- HREFLANG_INSERTION_POINT -->`** with the hreflang block for v2 decks (siblings exist in this `content_family_id`), or with an empty string for v1 decks (`content_family_id = null` or no siblings yet).

5. **Substitutes the topic-destination URL placeholders** in the end-of-deck links with the actual `/<locale>/topic/<slug>/` URLs per §16.5's α-granular schema, reading `topics-taxonomy.json` (§16.4) for axis-key → slug-per-locale mapping. Substitutes the four `__LINK_*__` URL placeholders + four `__LINK_TEXT_*__` localized-text placeholders per §17.8.2.

Additionally, when a v2 sibling is published, `publish-cli` re-injects the updated hreflang block into all already-published siblings of the same content family. This is the only operation that touches an already-published deck.html — the hreflang block is the only mutable region. `publish-cli` therefore needs:

- The static asset path of every published deck (already known via the database)
- The capability to PUT updated bytes to the static-asset endpoint (capability scope item — flag if not yet built when implementing)

**ASCII-fold spec implementation confirmation.** Implementation lives at `scripts/publish-cli/slug.js`; uses `String.prototype.normalize('NFD').replace(/[̀-ͯ]/g, '')` for combining-mark strip; explicit map for non-decomposable equivalents (`ä→a`, `ß→ss`, `æ→ae`, `ø→o`, `å→a`, `ł→l`). Romance-apostrophe slug treatment v1 hyphenates (`l'addition → l-addition`); v2 strip-instead-of-hyphen refinement filed deferred under slug-related family.

**Empirical examples** (from theme registration at `134614dc` + `947ad260`):

| Input displayName | Output slug | Notes |
|---|---|---|
| `4. Juli` (de) | `4-juli` | period → hyphen; collapse runs |
| `Süßigkeiten` (de) | `sussigkeiten` | ü→u, ß→ss via non-decomposable map |
| `Bäume` (de) | `baume` | ä→a |
| `Vögel 2` (de) | `vogel-2` | ö→o; numeric variant suffix preserved |
| `Christmas B&W` (en) | `christmas-b-w` | `&` → hyphen; runs collapsed |
| `Postres y dulces` (es) | `postres-y-dulces` | spaces → hyphens; lowercased |
| `Réveil` (fr-style) | `reveil` | é → e via combining-mark strip |
| `Hogar BN` (es; Class 2 fallback) | `hogar-bn` (standard) OR `household-bw` (Option A fallback for `household_bw` only — see §16.5.1) | standard path applies for `home_bw`; fallback for `household_bw` due to es-displayName collision |

**Slug-shape canonical for theme-bearing decks (locked at `785d63f6`).** When `manifest.theme` is non-null, the slug shape is **`<exercise-type>-<exercise-mode>-<theme-axis-key>`** — operation+mechanic+content ordering. Examples:

- `addition-find-addend-animals` (en)
- `addition-image-image-4th-of-july` (en)
- `subtraction-cross-out-valentine-bw` (en)

Themeless decks (manifest.theme=null per pattern-worksheet remediation precedent) preserve `<exercise-type>-<exercise-mode>` shape — no theme component — per the `if (manifest.theme)` guard in `slug.js: deriveSeedFromManifest`.

**Why operation+mechanic+content ordering, not theme-prefix or mid-position theme:**
- URL-prefix-match aligns with Google search-snippet leading-segment prominence + teacher operation-first search grammar
- Mechanic-clustering reads naturally for teachers scanning a list of search results (operation+mechanic combinations stay adjacent across alphabetic-sort positions; theme variation in trailing segment differentiates within group)
- Reads as a deck-identity claim ("an addition find-addend deck themed on animals"), not a navigation breadcrumb
- Distinct from intersection-URL axis-ordering (theme→level→type per §16.5.3 navigation grammar); deck-page URLs are leaf-level destinations with identity-claim grammar; different surfaces, different reading grammars

**Slug-derivation gap class.** Slug-derivation rules that drop manifest fields propagate SEO degradation across catalog growth waves. Phase 1 inventory of any catalog-growth wave should include slug-pattern preview check via `publish-bulk --dry-run` BEFORE proceeding to `--confirm`; surface if surfaced patterns don't include all axis-key signals visitor-facing surfaces depend on. The 443-deck Track C en addition+subtraction wave (2026-05-05) surfaced this when dry-run revealed slugs collapsed to 8 unique patterns across 443 ZIPs because pre-fix `slug-derivation` read only `exercise_type + exercise_mode` — at real-mode `resolveCollision` would have produced `addition-find-addend-2`, ..., `-50+` numeric-suffixed URLs that bury theme distinction.

**Anti-pattern:** auto-suffix-and-proceed when within-batch slug collisions surface at dry-run. The auto-suffix machinery works mechanically but degrades SEO and reads as broken to teachers copy-pasting deck links. Default to surfacing inspection report per §15.13 within-batch collision-pair pattern.

Origin: `785d63f6` `[FEATURE][PUBLISH-CLI]` (theme-aware slug derivation + single-SoT refactor across bulk.js + publish.js + index.js).

**Default-mode-emits-null contract pattern.** For app emit-sites with multi-mode contracts (§A.13.4 DERIVED classification), the most-common mode emits null (shorter URL); non-default modes get an explicit slug component. Reusable across catalog apps with default-mode contracts.

The pattern shortens canonical URLs for the high-traffic case while preserving per-mode SEO discrimination: a kindergarten-default sudoku deck slugs as `sudoku-animals` (cleaner, keyword-aligned with teacher-search) rather than `sudoku-easy-animals`; non-default `medium` + `hard` modes become `sudoku-medium-animals` + `sudoku-hard-animals`. The locked taxonomy for the 10 multi-mode apps from Commission ε lives in commit `109a91d4`'s body as audit-trail reference (no embedded table here — taxonomy may extend if apps add modes; commit-body-only avoids CLAUDE.md drift).

Operator-strategic adjudication anchors the choice of which mode is "default" per the §1 SEO-first emit-site framing: default = most-common authoring intent + shortest URL. The pattern applies at any future app extension that adds a mode dimension.

Origin: `109a91d4` (Commission ε emit-site fix across 16 hardcoded-null apps post-`5078f491` code-addition reference).

**Native-language slug derivation (locked at native-language-slug commission 2026-05-11).** publish-cli derives slug components per-locale from `topics-taxonomy.json` rather than from raw English-canonical axis-keys. Closes the §17.4 native-language-slug doctrine gap that was latent since publish-cli's first slug derivation; surfaced empirically at first non-EN catalog publish at scale (1018-deck ES math-cluster wave 2026-05-11).

Component resolution:

- `manifest.exercise_type` → `axes.exercise-type.<key>.slug.<manifest.language>`
- `manifest.exercise_mode` → `axes.exercise-mode.<key>.slug.<manifest.language>`
- `manifest.theme`         → `axes.theme.<key>.slug.<manifest.language>`
- `manifest.variant_id`    → appended bare (NOT localizable per the §17.8.5 disambiguator contract)

**Fallback chain (slug.js `localizeAxisKey`):**

1. taxonomy entry for `(axis, key)` missing → emit WARN, fall back to bare key (matches pre-amendment behavior for keys not yet registered)
2. taxonomy entry present but `slug.<locale>` null/missing → emit WARN, fall back to `slug.en`
3. `slug.en` itself missing → fall back to bare axis-key

WARN entries surface locale-coverage gaps to fold into the next taxonomy-expansion commission per §16.6.1 substrate-honesty discipline.

**Example (es):** manifest `{exercise_type:'subtraction', exercise_mode:'find-subtrahend', theme:'animals', language:'es', variant_id:'1507'}` derives seed `resta buscar-sustraendo animales 1507` → slug `resta-buscar-sustraendo-animales-1507`.

**Backwards compatibility:** EN decks slug identically to pre-amendment behavior because `axes.<axis>.<key>.slug.en === <key>` (taxonomy invariant — verified across all currently-registered axes at amendment time). No EN-deck retrofit needed.

**Anti-scope:** non-EN already-published deck slug retrofit is per-commission scope. The ES wave (1018 decks) is retrofit at the native-language-slug commission via unpublish-then-republish. Future de/nl/fr/it/pt/sv/da/no/fi waves derive native-language slugs by construction at first publish.

**Cross-reference:** §17.4 native-language-slug doctrine (the parent doctrine this operationalizes); §16.5 axes schema box (lists `axes.exercise-mode` alongside the original 3 axes).

Origin: native-language-slug commission 2026-05-11 (operator-locked option 2 of plan-entry AskUserQuestion: exercise_mode localizes via new `axes.exercise-mode` taxonomy axis).

#### 17.8.6 The age-range to educational-level mapping

`educational_level` is **deterministically derived** from `metadata.json`'s `age_range` by `publish-cli`. The apps never compute it. This rule keeps a single source of truth and prevents any drift between apps.

| `age_range` (metadata.json) | `educational_level` (English, used in `<title>` segment fallback and Schema.org) | i18n key for the localized form |
|---|---|---|
| `3-5` | `Preschool` | `seo.educational_level.preschool` |
| `5-7` | `Kindergarten` | `seo.educational_level.kindergarten` |
| `6-8` | `Grade 1` | `seo.educational_level.grade_1` |
| `7-9` | `Grade 2` | `seo.educational_level.grade_2` |
| `8-10` | `Grade 3` | `seo.educational_level.grade_3` |

The English value populates Schema.org's `educationalLevel`. The localized value (looked up via `seo.educational_level.<key>` in the existing next-intl translation system per §6) populates the localized `<title>` and `<meta name="description">`. Both are stored on the `metadata.json` layer of the manifest so that `publish-cli` doesn't recompute them per upload.

**Per-tier i18n coverage status at Phase 6:** Tier 1-2 (en, de, es, nl) operator-authored; Tier 3 (sv, fi, no) authored with operator-best-effort + NSR flag; Tier 4 (da) NSR-flagged per Nordic posture; Tier 4 (fr, it, pt) operator-best-effort without NSR per §17.5 stronger Claude quality assessment. See `project_k3_phrasing_native_speaker_review.md` for the 57-key two-population NSR flag list.

**Corpus ceiling note (Pass 7a, 2026-05-01).** 5 axis-keys are defined (preschool, kindergarten, grade-1, grade-2, grade-3); the Pass 1-6 taxonomy expansion arc exercised 4-of-5 across the 29 §14.10 apps: preschool 4, kindergarten 19, grade-1 5, grade-2 1, grade-3 0. grade-3 (8-10) is defined-but-unused at the K-3 audience natural ceiling. The axis stays at 5 keys for forward compatibility — content authored at grade-3 level in a future arc maps cleanly without taxonomy changes.

#### 17.8.7 v1 vs v2 scope: cross-language sibling tracking

The hreflang surface only matters when real cross-language siblings exist. Real siblings only exist when the operator explicitly translates a deck rather than independently generating decks in different languages. Independent generation in different languages produces unrelated decks that happen to share an exercise type — they are not siblings, and tying them together via hreflang would mislead Google.

**v1 (now): independent decks, no sibling tracking.**

- `content_family_id` is a reserved **nullable** column on the `Deck` Prisma table.
- `content_family_id` is `null` for every v1 deck.
- **`publish-cli` behavior under null `content_family_id` is normative, not defensive.** When `publish-cli` encounters `content_family_id = null` it (1) replaces the `<!-- HREFLANG_INSERTION_POINT -->` marker with an empty string and (2) skips the sibling re-injection step entirely. v1 publish-cli implementers must **not** add a validation check that errors or warns on null — null is the expected, valid v1 state, and rejecting it would silently break every v1 deck publish.
- Each deck's canonical URL is its own; Google indexes each deck independently.
- Multilingual SEO compounding does not happen yet — single-language decks rank for single-language queries.

**v2 (later sprint): the translate-this-deck workflow.**

- The operator selects a published deck and clicks "translate to <language>". The workflow generates a new deck with the same image set, same exercise structure, same theme — only the language strings differ.
- The translate action assigns a shared `content_family_id` to both the source deck (back-filled if it was the first to gain a sibling) and the new sibling. v2 backfills `content_family_id` only on decks that participate in a translation, never on every v1 deck.
- `publish-cli` picks up the family ID, links siblings via hreflang, and the multilingual SEO surface activates.

**Why the schema field is reserved now:** if `content_family_id` were added later, every v1 deck would need a database migration to add the column. By reserving the column from day one (nullable, default null), v1 decks ship clean and v2 backfills only the decks that actually become siblings. No migration of pre-v2 decks is required.

The exact translate-this-deck workflow shape (button in the existing app, separate operator tool, AI-assisted, etc.) is out of scope for this amendment and will be specified when v2 is scoped.

**v2-forward-compatibility:** the v1 substitution function accepts an optional sibling-list parameter that defaults to empty in v1, populated by the v2 caller. The v2 caller is just an additional invocation path not built in v1. Phase 1 schema includes `contentFamilyId String?` (v1 always null) reserving the v2 hook. No v1 → v2 rework anticipated.

#### 17.8.8 What this section does NOT change

- Attribution stays as in §14.3 (tier-neutral, position fixed, text fixed).
- Tier model stays as in §7 (free / $69 individual / TBD school license).
- Cache strategy stays as in §4.4 (Cloudflare CDN, immutable per version, full-document caching).
- Pricing stays as in §7.
- Which apps export decks stays as in §14.9 (29 of 33).
- The catalog-export ZIP bundle structure stays as in §15.2 (manifest + four assets); the manifest gains one new field on `generation.json` and two on `metadata.json` per §15.1.
- The URL pattern for `/<locale>/topic/<slug>/` destination pages is committed in §16.5; `publish-cli` substitutes per the α-granular schema in `topics-taxonomy.json` (§16.4).

#### 17.8.9 Answer-bearing-field hygiene

Bundle fields that contain puzzle answers must be comment-marked at construction site with the canonical pattern:

```js
// ANSWER-BEARING — sr-only template MUST NOT echo this
```

Bundle fields exposing puzzle solutions are necessary for runtime evaluation (the kid's interactive client-side validation) but become a leak risk if the sr-only template author copies them into the screen-reader text. The comment establishes intent at the source-of-truth and protects against the leak when future sr-only template work touches the same bundle.

Concrete answer-bearing fields per Group B Phase 0 inventory:

- **sudoku**: `holes[].correctImageIndex` (the image index expected at each blank cell)
- **picture-path**: `solutionPath` (the cell-by-cell trace), `legend.items[].correctCount` (per-collectible counts the kid must count)
- **cryptogram**: `slots[].cipherLetter` AND `slots[].expected` — BOTH fields contain the plaintext answer letter; **naming is misleading** (`cipherLetter` despite holding the plaintext, not the cipher symbol)
- **subtraction** (and other Brief A 5A apps): `slot.expected` — by template convention not echoed; included for completeness

When a new app's bundle code adds an answer-bearing field, the canonical comment is required. The §17.8.11 defensive-skip discipline protects against wrong-end emission, but the comment-at-construction-site is the upstream protection.

#### 17.8.10 Row+col 1-indexed indexing convention for sr-only output

Bundle data uses 0-indexed row/col coordinates (matches source code's internal representation). Per-app code converts to 1-indexed at template-fill time when row/col reads as part of human-facing sr-only output. Bundle is structural truth; sr-only output is human-readable adaptation.

```js
var startRow1 = (bundle.startCell.r != null) ? (bundle.startCell.r + 1) : '';
var startCol1 = (bundle.startCell.c != null) ? (bundle.startCell.c + 1) : '';
```

First surfacing app: picture-path Phase 2 (commit `75d4a27c`) — four template variants render row/col positions (e.g. "row 7 column 4" instead of bundle's `{r:6, c:3}`). Verified across 10 picture-path Gate 1 decks (Phase 4) and 2 sudoku decks. Generalization: any future app whose sr-only output names cell positions follows this convention. Bundle stays 0-indexed; per-app code converts.

#### 17.8.11 Defensive-skip discipline for sr-only emission

When bundle invariants are violated at sr-only emission time, sr-only emission is **skipped entirely** — do NOT render a degraded variant. Defensive skip protects against silently-wrong sr-only output for non-default operator configurations.

Concrete invariants per app (Group B Phase 2):

- **sudoku**: skip when `bundle.uniqueImageKeys` missing/empty/non-array OR `bundle.gridDims`/`bundle.holes` missing
- **cryptogram**: skip when `bundle.cipherMap` missing OR `bundle.legendSlots` empty
- **picture-path**: skip when `bundle.mode` unrecognized OR `bundle.gridDims`/`bundle.startCell`/`bundle.endCell` missing OR mode-specific image-field contracts violated (pathway with null `startCellImage` or null `endCellImage`; choose-path with null `endCellImage`) OR choose-path with null/undefined/0/non-numeric `endpointCount`

When implementing sr-only emission, declare the invariants the template depends on. Skip emission if any invariant is violated. Do NOT guess or fall through to a degraded template — silent wrongness is worse than silent absence (the existing instruction sr-only span at §17.8.2 still provides minimal screen-reader access).

Originating commits: sudoku Phase 2 `37cbec62`, cryptogram Phase 2 `9c9b1b55`, picture-path Phase 2 `75d4a27c`.

#### 17.8.12 Mode-conditional dispatch with sub-variants

Extension of §17.8.4's multi-template-variant pattern. For apps with multi-axis configuration variability, dispatch order:

1. **Mode (primary):** `bundle.mode` → one of N template variants
2. **Secondary scalar (when applicable):** a bundle field that further branches within a mode (e.g. picture-path's `endpointCount === 1` → `ChoosePathSingle` template; `endpointCount >= 2` → `ChoosePath` template)
3. **Conditional segment presence:** optional segments appended when their backing data is non-null (e.g. picture-path's collectibles segment when `bundle.legend.items[]` non-empty; segment text shared across all mode variants — applied universally)

First surfacing app: picture-path Phase 2 (commit `75d4a27c`) — 4-key dispatch (`Pathway` / `ClassicMaze` / `ChoosePathSingle` / `ChoosePath`) on `mode + endpointCount`, plus universal collectibles segment. Phase 1 reopen (`a3697abe`) added the `endpointCount` bundle field to enable the secondary-scalar dispatch.

Generalization: any future app with multi-axis configuration variability follows this pattern. Cross-reference §17.8.4 for the multi-template-variant base pattern; sub-variants are the natural extension when a mode has internal configuration variability.

#### 17.8.13 List-joiner convention (placeholder — promote to shared helper at 4th-consumer threshold)

Locale-correct list joining at sr-only emission sites uses `Intl.ListFormat` directly with defensive fallback to a hardcoded English Oxford-comma joiner:

```js
try {
    if (typeof Intl !== 'undefined' && Intl.ListFormat) {
        list = new Intl.ListFormat(srLang, { style: 'long', type: 'conjunction' }).format(items);
    } else {
        throw new Error('Intl.ListFormat unavailable');
    }
} catch (e) {
    if (items.length === 1) list = items[0];
    else if (items.length === 2) list = items[0] + ' and ' + items[1];
    else list = items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
}
```

For `srLang === 'en'` produces "a, b, and c" (Oxford-comma in V8/Chrome); for `'de'` produces "a, b und c" (no comma before "und"); for other locales, locale-correct conjunction word + punctuation. Browser support: Chrome 72+, Firefox 78+, Safari 14.1+ (all 2020+) — matches the apps' modern Canvas/Pointer Events baseline.

Currently lives at three call sites: sudoku (`uniqueImageKeys`), cryptogram (`legendSlots` vocab list), picture-path (collectibles `{itemList}`). **Promote to `LCSCatalogExport.formatList(items, locale)` shared helper when a 4th consumer adopts the same shape.** Same threshold as §14.3a's "single-consumer keys per-app, ≥2-consumer keys shared" convention for translation keys — list-joining helpers follow the parallel rule.

Originating commit: hotfix `8f4f9685`.

#### 17.8.14 Sr-only-emission srLang-keyed lookup convention

Sr-only emission sites use **srLang-keyed `translations[srLang][key]` lookup directly**, bypassing the per-app `t()` helper:

```js
var srTpl = (typeof translations !== 'undefined'
    && translations[srLang] && translations[srLang]['srPuzzleX'])
    || (typeof translations !== 'undefined'
        && translations.en && translations.en['srPuzzleX'])
    || '<hardcoded English fallback>';
```

Three-level fallback: `srLang → en → hardcoded EN string`. `srLang` is derived from `bundle.contentLanguage` at extract time (consistent with `ImageVocab.singular` and `Intl.ListFormat` dispatch at adjacent sites).

**Reason:** per-app architectural divergence in `t()` locale binding causes mixed-locale sr-only output for content-locale-driven sr-only when the in-page picker switches `currentLocale` without touching `uiLocale`. Sudoku's `t()` binds to `currentLocale` (content-correct by accident); cryptogram's binds to `uiLocale` (URL-locked); picture-path's binds to `uiLocale` with `currentLocale` fallback only when `uiLocale` is undefined. The srLang-keyed direct lookup avoids the divergence at content-locale-driven emission sites.

**Convention rule:** at sr-only emission sites in `renderStandaloneHTML()`, do NOT call `t(key)`. Use the explicit srLang-keyed lookup pattern. Optionally factor into a per-app local helper (e.g. picture-path's `srTranslate(key, fallback)`) for sites with multiple lookups.

Cross-references: hotfix `573f69e0` (cryptogram + picture-path lookup-mechanism fix). The underlying root cause — per-app `t()` locale-binding architectural divergence — is filed in `project_deferred_items_queue.md` for cross-cutting operational hygiene work; not in scope for this convention to fix globally.

#### 17.8.15 In-deck share affordance

Each deck.html ships an in-deck share affordance produced by `LCSCatalogExport.buildShareAffordance` (§14.3a). The affordance lets a teacher share the deck's canonical URL to a social platform or copy it to clipboard, directly from the deck's `lcs-bar`.

**Placement.** Top-right of `lcs-bar`, immediately after `<button class="lcs-mute">`, as a 40×40 icon button with `.lcs-share` class (parallel to `.lcs-mute`). All 29 in-scope apps' `renderStandaloneHTML()` emit one `buildShareAffordance` call site at this position; per-app placement uniformity validated at Sub-phase D Gate 2 across the 4-app deep-test reference set (addition / sudoku / cryptogram / picture-path × EN + DE).

**Click behavior — Web Share API progressive enhancement.** Feature-detect `navigator.share` at click time:

- **Web Share API capable** (most modern desktop and mobile browsers): invoke `navigator.share({title, url})` to open the OS-native share sheet. The sheet UI is rendered by the OS in the OS display language, **not under helper control**. The verification is structural — that `navigator.share` is invoked with the correct `{title, url}` payload — not visual.
- **No Web Share API** (Firefox desktop, older browsers): open a self-contained 5-platform overlay rendered in the deck's content-locale via baked-at-generation-time strings. Both paths use the **same baked canonical URL**.

Force-overlay diagnostic on Web-Share-API-capable browsers: paste `delete navigator.share` in the console before clicking the share button. The overlay path renders.

**v1 platform set (locked decision).** Facebook, WhatsApp, Pinterest, email, copy-link, plus Web Share API on capable browsers. Skipping X, LinkedIn, Reddit, Threads, Bluesky.

**Pre-filled share captions: empty (locked decision).** The OG card on the catalog deck route carries the marketing surface; share-intent text stays empty.

**No platform JavaScript SDKs (locked decision).** Plain anchor links to share-intent URLs:

- Facebook: `https://www.facebook.com/sharer/sharer.php?u={encodedURL}`
- WhatsApp: `https://api.whatsapp.com/send?text={encodedURL}`
- Pinterest: `https://pinterest.com/pin/create/button/?url={encodedURL}&description=`
- Email: `mailto:?subject={encodedTitle}&body={encodedURL}`
- Copy-link: `<button>` carrying `data-label-default` and `data-label-copied`; click handler invokes `navigator.clipboard.writeText(url)` with a 2-second feedback toast (the `srShareCopied` key — `Copied!` / `Kopiert!`).

`encodedURL = encodeURIComponent(url)` and `encodedTitle = encodeURIComponent(title)` are baked at generation time.

**Defensive-skip per §17.8.11.** When `canonicalURL` is missing AND `locale + title` cannot construct one, the helper returns an empty string and the affordance does NOT render. No degraded variant.

**Cross-reference to §17.8.14.** `buildShareAffordance` is the **second consumer** of the §17.8.14 srLang-keyed lookup convention (sr-only emission sites being the first). Helper-emission sites adopting bare-`translations` from now on follow this precedent. The Sub-phase A.1 hotfix `bbcb444c` corrected an initial typo where the helper guarded with `typeof global !== 'undefined'` (Node.js builtin, undefined in browsers) — switching to bare `translations` matches the established convention exactly.

**v1 canonical URL source — Option A predicted-slug fallback.** v1 ships without a real `canonicalURL` source (the catalog deck route `/[locale]/decks/[slug]` does not yet exist; ships post-Brief-B). The helper's resolution order falls through to the predicted-slug branch in v1 — `https://lessoncraftstudio.com/<locale>/decks/<slugify(bundle.title)>/`. Two filed deferred-queue items bound the v1 risk:

- Predicted slug may collide with `publish-cli`'s eventual de-duplication suffixing (§17.8.5); rare, bounded.
- All 29 apps currently hardcode English title literals in `bundle.title`, so the predicted slug is English-letter regardless of content locale — diverges from §17.4's native-language-slug principle. Resolves when apps populate localized titles into `bundle.title` AND `publish-cli` ASCII-folds correctly (§17.8.5 spec; current `slugify` at `catalog-export.js:90` converts non-ASCII to hyphens rather than ASCII-folding).

Both items are bounded for v1 and await the catalog deck route + publish-cli before they become load-bearing.

**Out-of-scope: catalog-page-side share work.** OG metadata on `/[locale]/decks/[slug]`, share row component on the catalog page, OG image at 1200×630 derived from the existing 480×620 `thumbnail.png` — all deferred to a future brief once the catalog deck route ships (likely follows Brief B publish-cli). The in-deck affordance ships now in both direct-download and catalog-export ZIP flows; the catalog-page surface is upstream-dependent.

**Tier-neutral and SEO-neutral, like attribution (§14.3).** The same affordance bytes ship to free and subscriber teachers and are immutable per Cloudflare's per-version cache key (§4.4). Modifications must preserve cacheability; no per-request templating, no tier-dependent content.

#### 17.8.16 Mutable-regions contract via SEO_INSERTION_POINT marker pair

deck.html `<head>` SEO surface uses paired HTML-comment markers `<!-- SEO_INSERTION_POINT_START -->` + `<!-- SEO_INSERTION_POINT_END -->` to define the **mutable region** for retrofit operations. Region between markers is replaceable by republish-seo retrofit (Class A path); content outside markers preserves operator-side authoring (per-app deck.html source).

**Class A (post-Phase-3a.2 decks)** — markers present; retrofit replaces between-markers content + leaves outside intact. Class A.1 (post-Phase-3b decks): marker pair AND `manifest.seo_trace` present; retrofit sources values from trace. Class A.2 (post-Phase-3a.2 pre-Phase-3b): marker pair present; trace absent; retrofit derives values from i18n + taxonomy + English fallback.

**Class B (pre-Phase-3a.2 decks)** — markers ABSENT; retrofit (a) strips pre-existing SEO elements (`<title>` / `<meta name="description">` / `<link rel="canonical">` / `<meta property="og:*">` / `<meta name="twitter:*">` / `<script type="application/ld+json">`); (b) injects marker pair + canonical SEO surface; (c) preserves outside-markers content per Class A semantics post-injection.

**Defensive strip** at Class B injection: pre-existing SEO elements may exist outside any clear convention; defensive strip per Phase 4a Checkpoint 1 fix-2 (`b5c1f3c1`) prevents duplicate-element emission. Class A retrofit also strips OUTSIDE markers (defensive cleanup for contaminated state).

**Atomicity:** retrofit writes via temp+rename per `republish-seo.js: rewriteDeckHtmlAtomic`. `rename(2)` is atomic at kernel level; partial-write states impossible.

**Cross-references:**
- §17.8.1 — `<head>` SEO surface canonical shape (between markers)
- §17.8.4 — `catalogExport()` + `LCSCatalogExport.buildSeoHead` emission helpers (forward-flow source)
- §17.8.5 — publish-cli substitute.apply contract for `__CANONICAL_URL__` placeholder + insertion-point markers
- §15.17 — salvage scripts pattern (republish-seo as Class A/B retrofit; sibling pattern)

Origin: Phase 4a Checkpoint 1 (`a0ab3cf0` → `b5c1f3c1`); codified at Phase 6 fold.

#### 17.8.17 Phase 2 §1-§7 invariants codified as deck-page SEO doctrine

The `[ARC][SEO][DECK-PAGE]` commission's Phase 2 doctrine document (`docs/SEO/deck-page-arc-phase-2-doctrine-draft.md`) enumerated 7 deck-page SEO invariants. Each invariant is enforced by a predicate at `scripts/publish-cli/seo-reconciliation.js` per the commission's auto-control mechanism.

| # | Invariant | Predicate | Class |
|---|---|---|---|
| 1 | Title uniqueness per (language, titleHash) | `reconcileTitleUniqueness` | HALT |
| 2 | Description uniqueness per (language, descriptionHash) | `reconcileDescriptionUniqueness` | HALT |
| 3 | Canonical-URL pattern (www-form + locale + native-language slug + trailing slash) | `reconcileCanonicalURLPattern` | HALT |
| 4 | OG tag completeness (14 tags: 7 og:* + 7 twitter:*) | `reconcileOGTags` | HALT |
| 5 | Inbound-link minimum invariant N≥3 non-sitemap surfaces | `reconcileInboundLinkSurface` | HALT (post-Phase-5) |
| 6 | Locale-residue absence (path-(b) trace per Phase 3b) | `reconcileLocaleResidue` | HALT |
| 7 | Single-h1 per deck | `reconcileSingleH1` | HALT |

**1 WARN-class predicate** retained alongside: `OG_IMAGE_FALLBACK_USED` (informational; per-deck thumbnail vs site-default fallback signal).

**Invariant 1 + 2 (uniqueness):** enforced at DB level via `@@unique([language, titleHash])` + `@@unique([language, descriptionHash])` Prisma constraints; predicate-side check fires pre-INSERT/UPDATE via `findExistingByTitleHash` + `findExistingByDescriptionHash` callbacks. Forward-flow at 100% post-(θ); backward-flow at 63.3% en + 100% non-en backfill (Phase 4a (ι) close).

**Invariant 3 (canonical URL):** uses www-form per §A.10 (origin nginx 301 redirects apex→www); locale prefix per §17.4; native-language slug per §17.4.1 dual-slug convention + §17.8.5 ASCII-fold spec; trailing slash per §15.7 catalog deck route convention.

**Invariant 4 (OG tags):** 14 tags emitted by `LCSCatalogExport.buildSeoHead` (forward-flow) + `build-seo-head.js` Node-CJS port (republish-seo retrofit). Predicate enforces all 14 present in deck.html post-substitution.

**Invariant 5 (inbound-link):** N≥3 non-sitemap surfaces via 8-surface counter at `scripts/publish-cli/count-inbound-surfaces.js` (Phase 4b CJS port). Predicate operational at HALT-class post-Phase-5 close per concern 4 escalation schedule.

**Invariant 6 (locale-residue):** path-(b) origin-tracing via `manifest.seo_trace` (Phase 3b primary path); path-(a) lexicon-fallback at `seo-reconciliation-exceptions.json` (deprecated; defensive fallback only).

**Invariant 7 (single-h1):** structural HTML invariant; predicate counts h1 elements in deck.html post-substitution. Phase 3b architectural sweep moved celebration h1 → h2 across 29 apps to satisfy.

**Auto-control mechanism state at commission close:** all 7 invariants enforced HALT-class on every new publish via `reconcileDeckPageSEO` orchestrator at `seo-reconciliation.js:778`. Operator does not need to remind CC about deck-page SEO emission — the gate is the reminder.

Cross-references:
- §17.8.1-15 (per-invariant emission spec)
- §15.16 (reconciliation gate at publish-cli)
- §17.8.16 (mutable-regions contract for retrofit emission)
- `docs/SEO/deck-page-arc-phase-2-doctrine-draft.md` (Phase 2 source)

Origin: Phase 2 doctrine document (`ac9109c7`); codified into canonical CLAUDE.md doctrine at Phase 6 fold.

### 17.9 Pillar 1 lesson-plan production discipline (post-Phase-1c)

Established at `e912b805` (Phase 1c apply) and the revision-pass discipline that preceded it. These principles govern future Pillar 1 lesson-plan authoring + tooling work.

**Schema-authority over commission-spec field-enumeration.** When a commission references a sealed schema (e.g., `LessonPlan` model from `9ba9fa2d`), the schema is the canonical field list. Commission specs that re-enumerate fields drift into under-specification. At Phase 1c pre-flight `01f64c18`, `durationMinutes` + `recommendedDeckIds` + `recommendedPdfDeckIds` were schema fields not in the Phase 1b commission's enumerated list; the under-specification surfaced when the seed-script's parser-shape inferred from schema differed from the brief's stated frontmatter set. **Doctrine:** future commissions referencing a sealed schema defer to the schema as authority rather than re-enumerate.

**Pedagogical voice register: constructive over corrective.** When plan content models teacher behavior, prefer constructive ("modellieren Sie X" — "model X") over corrective ("korrigieren Sie nicht Y" — "do not correct Y"). The constructive register lands developmental points more memorably and respects teacher expertise; the corrective register reads instructional and condescending. Established empirically in the de/sudoku V-final acquisition note during Phase 1c revision pass.

**Closure forward-pointer pattern.** Plan closures use locale-natural variants of *"When [we/the class] [return-clause], the [pattern] will be [there/here] for us"* — topic-neutral phrasing that's plan-portable across one-off and unit-sequence usage. Established at `e912b805` in en+de exemplars; future es+nl + Tier 3+4 plans should construct parallel forms in their target locales.

**Reference plans as exemplars: fix the tool, not the content.** When tooling halts during exemplar production (e.g., parser bug; substitute gate; etc.), the default action is fixing tooling. Stripping semantically load-bearing fields from exemplars to dodge tool bugs corrupts the exemplar set for downstream consumers (manual-authoring guidance, AI-assist prompt templates, training-data integrity if Mac Studio is later applied to other content pipelines per §3.4 / §11). Recorded at Phase 1c apply when the parseScalar bug for non-empty array literals was fixed in seed-lesson-plans.js rather than empty-arraying the drafts' `recommendedDeckIds`.

**Dry-run gate must validate against schema-typed columns.** Phase 1c surfaced a parser bug where `seed-lesson-plans.js` dry-run printed `Plans to insert: 4` cleanly because the dry-run output template didn't include the offending field; real-mode then failed at Prisma's `String[]` constraint. **Doctrine:** future seed scripts' dry-run output must surface every parsed value with its inferred type alongside the schema-expected type, fail loudly on mismatch. Applies retroactively to `seed-topics.js` (low-risk; simpler columns) and forward to bundles + ParentNotes seed scripts.

**Cross-locale teacher-address-register discipline.** Lesson-plan content addresses the teacher in formal register per locale: Sie-form (de), usted (es), u-form (nl), and equivalents per locale (it: Lei; pt: você for pt-BR / vocês formal-collective; fr: vous; Nordic: standard formal forms). Established at de/addition revision pass (Phase 1c); cross-locale lock for future plan-authoring across all 11 platform locales.

**Illustrative-example framing for deck-portable plans.** Lesson plans teach the topic, not specific deck contents. When a plan uses concrete vocabulary as illustration (e.g., "cats and dogs" in en/addition), it must be framed explicitly as illustrative ("the example below uses cats and dogs; substitute whatever animals your deck includes") so the plan is portable across any deck at the same axis-key + locale. The schema's `LessonPlan @@unique([topicSlug, language])` constraint at one-plan-per-axis-key-per-locale shape requires this portability discipline — a plan covers ALL decks in its (topic, locale) bucket. Established at the Phase 1c revision pass that immediately preceded `e912b805`.

### 17.10 I18n hygiene + sitemap-shard infrastructure

This section consolidates i18n + sitemap-substrate doctrine that touches multiple surfaces (per-locale URL inventory, namespace-migration discipline, content-substitution patterns, sitemap shard distribution). All items are doctrine-class principles surfaced empirically through Arc 6 split + Wave 2 footer migration + the 443-wave fold pass.

#### 17.10.1 4-shard sitemap-index hash-partitioning

The sitemap surface is a 4-shard index with hash-partitioned URL distribution per `e5bb3cb4` BreadthGrid hash-partition convention extended at `85f090a3` Arc 6c sitemap-shard infrastructure:

- **Shard 0 (`/sitemap/0.xml`, "decks-a"):** published deck URLs whose `Deck.id` last character has even ASCII parity
- **Shard 1 (`/sitemap/1.xml`, "decks-b"):** published deck URLs whose `Deck.id` last character has odd ASCII parity
- **Shard 2 (`/sitemap/2.xml`, "intersections"):** 2-axis intersection page URLs per §16.5.3 path-based routes
- **Shard 3 (`/sitemap/3.xml`, "other"):** single-axis topic pages + locale-root pages + other meta surfaces

**Hash-partitioning rationale:** 4-shard split keeps any one shard under Google's 50K-URL recommended sitemap limit at catalog scale. Last-char ASCII parity provides deterministic 50/50 distribution across decks-a + decks-b without requiring server-side maintenance of partition keys. Cross-locale content all flows through the same 4 shards (no per-locale sitemap split) to keep crawl-budget concentrated.

**Master sitemap index** at `/sitemap.xml` lists all 4 child shards. Auto-generated via Next.js `generateSitemaps` returning `[{id:0}, {id:1}, {id:2}, {id:3}]`; per-shard `generateSitemap(id)` queries DB filtered by partition key.

Origin: `85f090a3` Arc 6c (sitemap-shard infrastructure).

#### 17.10.2 Reuse-existing-i18n-key-when-strings-identical convention

When two i18n surfaces produce identical string values for a given (key, locale), reuse a single shared key rather than duplicating per-surface keys. The convention surfaces during component design when authoring would otherwise produce two keys (e.g., `breadcrumb.home` + `nav.home` both rendering "Home"). Single key `home` (or `nav.home` etc.) used across both surfaces.

**Why:** keeps i18n message files leaner; reduces translation drift when a single key gets retranslated and the duplicate doesn't. Anti-pattern: surface-specific naming (e.g., `topicPage.breadcrumb.home` vs `homePage.nav.home`) that produces duplicate strings — indicates a missed reuse opportunity.

**How to apply:** at component-design time, before authoring a new i18n key, grep existing message files for an identical string value at any locale; if found, reuse the existing key. Distinguishing-by-context naming is fine when contexts genuinely diverge across locales (German might pluralize differently per surface); identical-strings-across-locales is the trigger for reuse.

Origin: `15444fe8` Arc 6a (depth-UI overlay component design — multiple surfaces sharing identical strings via single keys like `topicPage.breadcrumb.home`).

#### 17.10.3 Substrate-honesty namespace-boundary discipline

When a commission introduces or extends an i18n namespace, Phase 1 inventory MUST grep ALL platform locale message files for the namespace's key set; Phase 4 verification MUST confirm presence in 11/11 locales before declaring complete. Mismatch — present in some locales but not others — produces raw-key-leak in production for the missing locales.

**How to apply:**
- Phase 1: enumerate the canonical key set from the canonical baseline (typically `messages/en.json`); cross-locale grep to identify gaps
- Phase 4: post-deploy, curl per-locale rendered HTML; grep response body for raw-key-leak pattern (`<namespace>\.<key>`); 0 user-visible occurrences per locale

The Arc 6d gap-fold of `topicPage.intersection.intro` (7 locales missing baseline) and the Wave 2 footer namespace migration (7 locales carrying legacy 13-key shape) both followed this discipline. Wave-N namespace-migration discipline (§17.10.4) is a specific application of the substrate-honesty principle.

Origin: `c03fdb8e` Arc 6d.

#### 17.10.4 Wave-N namespace-migration discipline

When a Wave 1 commission ships canonical baseline coverage for a subset of locales (typically Tier 1+2: en/de/es/nl), a Wave 2+ commission folds in the remaining locales. The pattern surfaces 1-2 arcs after the baseline ships, when build-warnings or downstream-arc Phase 1 inventory reveals the gap.

**Wave-N commission shape (small-arc gap-fold, NOT full namespace migration):**
- Phase 1 inventory: cross-locale namespace-key audit; structural-divergence vs gap-fill classification
- Phase 2: per-locale gap-fill OR namespace migration (delete legacy + insert canonical) — operator-strategic decision per scope
- Phase 3: single commit covering N locale message files (where N = locales requiring change)
- Phase 4: per-locale curl spot-check + raw-key-leak grep

**Distinct from:** full namespace authoring commission (Romance/Nordic homepage batches) which authors NEW content at scale rather than gap-filling/migrating existing namespaces.

Origin: `672e771b` + `a1c78529` Wave 2 footer migration (7 newer locales: fr/it/pt/sv/da/no/fi).

#### 17.10.5 Runtime-consumer-audit is load-bearing

When a Wave-N commission audits namespace coverage, the runtime consumer (which keys does the component actually call?) is the load-bearing inventory. Static-text references in admin tooling (content-manager HTMLs, isolated per §A.1) are isolated from runtime; they don't gate the migration.

**How to apply:**
- Grep `useTranslations\(['"]<namespace>` and `getTranslations.*<namespace>` for runtime callers
- Grep `<namespace>\.<key>` across all source files; classify each match as runtime-bound (next-intl call) vs static-text reference
- Migration scope = runtime-bound consumers only; static-text references can be cleaned up in separate scope

**Anti-pattern:** treating all source-file references as runtime consumers. The Wave 2 footer migration discovered legacy 13-key shape was referenced only in 2 admin HTMLs (static-text placeholders, not next-intl bindings); deletion was safe because runtime consumer was just `Footer.tsx`.

Origin: `672e771b` Wave 2 footer migration runtime-consumer audit.

#### 17.10.6 Legacy-namespace-residue audit-on-arc-Phase-1

Locales that received Wave 1 partial coverage but didn't receive subsequent namespace renames carry legacy seller-era shapes that linger as runtime-orphaned residue. The Wave 2 footer migration discovered this in 7 newer locales (fr/it/pt/sv/da/no/fi) carrying a 13-key seller-era shape (companyName / companyTagline / support.* / legal.*) that didn't match the canonical 9-key Footer.tsx consumer.

**How to apply:** at any Wave-N commission's Phase 1, audit BOTH:
- Forward gap (Wave 1 keys missing in later-tier locales)
- Backward residue (legacy keys lingering in later-tier locales from pre-Wave-1 era)

Both classes of drift fold into the same Wave-N commit; structural-divergence handling at Phase 2 covers both.

Origin: `672e771b` + `a1c78529` Wave 2 footer migration.

#### 17.10.7 Cross-locale convention parity verification

Phase 1 inventory of any namespace migration should sample Tier 1+2 actual canonical TEXT shape — not just key presence — to prevent register divergence. The Wave 2 footer migration initially used bare-prefix forms ("Par langue" / "Per lingua" etc.) until Phase 4 verification revealed Tier 1+2 canonical pattern is noun-prefixed ("Worksheets by language" / "Arbeitsblätter nach Sprache" / "Hojas de trabajo por lengua" / "Werkbladen per taal"). A fix-up commit (`a1c78529`) realigned the 7 newer locales to canonical noun-prefix pattern.

**How to apply:**
- Phase 1: read the actual TEXT values of Tier 1+2 (en/de/es/nl) for the namespace's keys; identify pattern (noun-prefix, bare-prefix, ICU template, etc.)
- Phase 2 authoring: mirror the Tier 1+2 register pattern, not just the key shape
- Phase 4 verification: Tier 1+2 regression spot-check uses the same expected-pattern strings (NOT operator-locked wording from the commission spec — the actual rendered TEXT)

**Anti-pattern:** authoring per the commission spec's literal example strings without verifying canonical register at Tier 1+2. Commission specs evolve; canonical-text drift over time. Source-of-truth is the live Tier 1+2 message files at commission time.

Origin: `a1c78529` Wave 2 footer migration follow-up (cross-locale convention parity fix).

---

## 18. Sample decks embedded on every public page

This is a structural design principle, not a feature: every public-facing page on the site includes a working interactive deck the visitor can play immediately, in their chosen language. The home page, the about page, the pricing page, every topic destination page, every guide article — each surface lets the visitor experience the actual product rather than read descriptions of it.

### 18.1 Why this matters

Most education tool sites describe their product and ask visitors to sign up to try it. The conversion psychology is weak: the visitor must trust the marketing copy enough to commit before experiencing the product. Reversing this — putting the product directly on every marketing page — is unusually generous and produces stronger conversion because the visitor's experience of the product becomes the persuasion.

This also disciplines the rest of the site. If every page has a working sample deck, every page communicates the product's actual nature: multilingual, visually rich, K-3-appropriate, interactive. Marketing copy doesn't have to do all the persuasion work because the sample does some of it. Pages can be shorter, less hyperbolic, more honest.

### 18.2 Implementation principles

**The same iframe infrastructure powers samples and subscriber embeds.** The mechanism that puts a sample deck on the home page is the same mechanism that lets a subscriber embed a deck on their classroom blog (the subscriber feature in §7). Build it once, use it for both purposes.

**Each sample deck is curated for its page context.** Not every deck is equally good as a sample. The home page sample needs to be approachable for someone with no context — probably a colorful matching or counting activity, not a complex word puzzle. A guide article about supporting Spanish-speaking children in English-medium classrooms needs a sample that demonstrates a Spanish-English deck specifically. Each page benefits from a curator's eye choosing what represents the platform best in that context. The operator selects samples per page rather than letting the system choose randomly.

**Samples render in the page's language.** A Swedish visitor on the Swedish home page sees the sample deck in Swedish. A German guide article shows its sample in German. The hreflang setup handles URL-level language routing; the sample on each page renders in the page's language by selecting the appropriate language variant of the curated deck.

**Samples are not gated content.** The deck embedded on the home page is the same deck a visitor finds in the catalog at full quality, accessible to everyone. There is no "best content reserved for subscribers" — the free tier and the marketing samples are the same library. Trying to gate "premium" content while showing "lesser" content on marketing pages would be discovered immediately and damage trust.

**Lazy-loading below the fold.** A page with one embedded sample is fine for performance. A page with multiple samples (a topic page might naturally show 4-8 deck previews) requires lazy-loading — the sample loads only when the visitor scrolls to it. This keeps the page's LCP performant while preserving the embedded-experience principle.

### 18.3 What the sample provides

The sample is a fully playable deck — the visitor can answer questions, get feedback, complete the activity. It is not a screenshot, a video, or a preview image. The interaction is the marketing.

The sample has a small "Made with LessonCraftStudio" attribution per the existing `LCSAttribution` system (§14.3), which links back to the full catalog. A visitor who plays the sample and likes it has an obvious next step to explore more.

The sample does not have signup walls, subscription prompts, or login requirements. It just plays. The signup and subscription prompts live elsewhere on the page, around the sample, not inside it.

### 18.4 Section 2 breadth-grid curation: three load-bearing equilibria

The home page Section 2 grid (8 deck thumbnails + 1 featured inline-play tile) is curated against three independently-load-bearing equilibria, all three of which must hold post any stagger event:

1. **Locale balance.** Distribution of picks across the active production locales. Established at 2-en/2-de/2-es/2-nl 4-locale grid at NL Track C Batch 1 (`d361a03e`). Future locale launches (Tier 3+) will extend per SECTION-2-CURATION-v1.md spec.
2. **Theme/themeless balance.** 4 themed (in canonical-English `subject_tags` set: `{animals|vehicles|food|fruit}`) / 4 themeless. Locked since Track C Batch 1 ES (`035852c3`).
3. **Mechanic-diversity.** 8 distinct mechanics across 8 picks (no app duplication beyond cross-locale demonstration of same-mechanic). The featured slot (currently `sudoku-en`) counts as one mechanic.

All three are load-bearing. Locale + theme alone underspecify the grid: a 2/2/2/2 grid with 4-themed/4-themeless can still cluster picks on a single mechanic and feel visually monotonic (NL Batch 1 at `d361a03e` shipped `matching-letter-nl` + `shadow-match-nl` which both rendered as matching-mechanic, thinning visual diversity even though locale + theme equilibria were preserved).

**Mid-arc theme-refresh swap pattern** is the right move when a prior batch's pair clustered on a single mechanic. Worked example: NL Batch 4 at `0bb02030` dropped `matching-letter-nl` + `shadow-match-nl` (both matching-mechanic) and added `missing-pieces-nl` + `chart-count-nl` (visual-completion + Family-D bar-chart, restoring 8 distinct mechanics). Locale balance held at 2/2/2/2; theme balance held at 4/4. The swap is mid-arc-correct because:

- It does not shift locale weighting (which would reset SECTION-2-CURATION-v1.md spec assumptions)
- It introduces fresher catalog content from the recent batch
- It restores mechanic-diversity without operator-strategic locale rebalancing

**When NOT to apply theme-refresh swap:** at first-publish events (which establish locale baseline) or at closeout milestones (which can hold the post-arc composition or refresh per operator strategic call). At Tier-2 closeout (NL Batch 7 `d3b4f962`), operator chose hold-2/2/2/2 because the Batch 4 mechanic-diversity restoration still held and there was no clustered-mechanic to address.

**Cross-reference to SECTION-2-CURATION-v1.md:** that document is the canonical curation spec and houses per-pick rationale + thumbnail-quality criteria. This subsection extends the spec with the three-equilibrium framing surfaced through the ES + NL Track C arcs.

#### 18.4.2 BreadthGrid 4-family hybrid + 9-cell composition + day-of-week rotation

The BreadthGrid Section 2 shipped at `e5bb3cb4` as a 4-family-hybrid locale-grouping with 9-cell composition and day-of-week deck-rotation rhythm.

**4-family canonical locale-family map:**

- **Germanic:** en, de, nl
- **Nordic:** sv, da, no
- **Romance:** es, fr, it, pt
- **Finnic singleton:** fi (with Nordic-as-sibling-proxy)

Sibling pools per visiting locale: `en→[de,nl]`, `de→[en,nl]`, `nl→[de,en]`, `sv→[da,no]`, `da→[no,sv]`, `no→[sv,da]`, `es→[fr,it,pt]`, `fr→[es,it,pt]`, `it→[es,fr,pt]`, `pt→[es,fr,it]`, `fi→[sv,da,no]` (Finnic-with-Nordic-as-proxy).

**Visitor-recognition vs linguistic-typology adjudication principle.** The 4-family map prefers **visitor-recognition** (locales that visitors expect to be grouped together based on geographic / cultural proximity) over **scholarly-typology** (Indo-European / Uralic family trees). Finnic fi is grouped with Nordic in the sibling pool because Finnish teachers searching for Nordic-language K-3 content recognize sv/da/no as adjacent-market peers — even though Finnish is Uralic, not Germanic. Same principle: nl grouped with Germanic en/de (visitor-natural), not Romance (geographically Belgian-adjacent). When visitor-recognition + scholarly-typology disagree, visitor-recognition wins.

**9-cell composition canonical (6+2+1):**

- **6 visiting-locale tiles** — decks from the visitor's own locale; surfaces the per-locale catalog
- **2 cross-locale tiles** — one tile per sibling-locale (rotated through the sibling pool); surfaces the multilingual differentiator
- **1 featured tile** — operator-curated featured deck (currently `sudoku-en` per SECTION-2-CURATION-v1.md); inline-playable; cross-arc-stable

The 9-cell shape balances per-locale catalog representation against the multilingual claim. Smaller (e.g., 6+1+1=8) under-represents cross-locale; larger (e.g., 8+3+1=12) over-densifies (Catalog Variety Arc 2 candidate).

**Day-of-week rotation rhythm:**

```js
function dayOfWeekRotation(): number {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % 7;
}
```

UTC-anchored; within-day stable across all visitors; varies across days. Within-day stability preserves ISR-cache discipline (1-hour revalidate per topic-page convention; cache hits return identical composition for the same day). Day-of-week rotation cycles deck picks through the available pool, giving repeat visitors variety without breaking cache discipline.

**Anti-pattern:** per-request randomization (would fragment ISR cache; every request rebuilds the page). The day-of-week rotation strikes the right balance: cycling rhythm at the day granularity, cache stability at the hour granularity.

Origin: `e5bb3cb4` `[REFACTOR][HOMEPAGE]` (4-family hybrid + 9-cell + day-of-week rotation refactor).

### 18.4.1 Variety-strip composition rules at scale

Cross-reference: §16.2 holds the canonical strip-composition spec (Strip 1–4 cardinality caps, self-skip threshold, cross-locale variety, ISR caching). This subsection extends the spec with the **composition-discipline framing** surfaced during the Catalog Variety Arc 1 commission and worked example shipped at `55ac5687`.

**Cardinality caps as variety-shape signals.** Each strip's cap is not arbitrary — it encodes the variety SHAPE the strip is meant to surface:

- **Strip 1's max-1-per-locale cap** spreads picks across locales (cross-locale demonstration); raising it would cluster the strip on a single locale and lose the cross-locale signal that justifies its existence.
- **Strip 2's max-2-per-axis-key cap** allows mild clustering (a related axis-key may legitimately surface 2 of its decks) but prevents single-axis-key dominance; raising it would make the strip read like a recommended-decks duplicate.
- **Strip 3's max-1-per-educational-level cap + per-page-axis self-skip** preserves the educational-level-as-discovery-axis purpose; the self-skip prevents the structurally-incoherent "other educational-levels at this educational-level" rendering.
- **Strip 4's max-1-per-topicSlug + max-1-per-locale double-cap** is the broadest-spread surface; the double-cap prevents either-axis dominance and forces the strip to operate as catalog-overview rather than topic-detail.

**Self-skip threshold (cardinality < 2).** Single-tile strips read broken — the kid sees what looks like a leftover pick rather than a curated variety. Apply per-strip independently; do NOT skip the whole row of strips when one strip falls below threshold (the others remain valuable surfaces). The threshold is locked at 2; future commissions may experiment with higher thresholds (3? 4?) for visual-density reasons but must surface the rationale and ship as an explicit doctrine amendment, not silently.

**Cross-locale variety ON during substrate-only-locale period.** While substrate-only locales (it/fr/pt/sv/da/no/fi at session-of-amendment) have no Track C deck-publish, Strip 1 surfaces decks from en/de/es/nl on those locales' topic pages. Once Track C lands first decks per locale, Strip 1's max-1-per-locale cap continues to draw cross-locale by construction (the locale's own deck count will be small compared to the Tier 1+2 catalog for some time). Cross-locale-OFF as a future configuration knob (per-locale toggle once locales reach catalog parity) is filed as a future-commission candidate.

**ISR per-page revalidation.** `revalidate=3600` per shipped state. No module-scoped global memoization at this scale: at <500 decks the per-page ISR cost is bounded; module-scoped global memoization would add a code surface (cache-invalidation logic on every deck-publish, every Track A locale-extension, every taxonomy edit) without traffic-scale to justify it. The optimization is filed for future commission when traffic warrants — likely post-Tier-3 deck-publish or post-1000-deck catalog scale, whichever surfaces first.

**Worked example: Catalog Variety Arc 1 ship at `55ac5687`.** Topic pages at `/<locale>/topic/<slug>/` gained the four-strip surface per the composition rules in §16.2. The shipped state is the canonical reference for future variety-surface commissions (Arc 2 Section 2 expansion to 12 cells + second variety strip; Arc 3 deck-page end-of-deck-link extension). See §16.2's audit-trail tail for the homepage-side scale-copy revert at `383b7d34`.

---

## 19. The language launch sequence

The platform supports 11 languages technically (see §6). The launch and content production strategy treats these languages as priority tiers rather than equal parallel tracks, because depth in priority languages produces stronger SEO and audience presence than uniform shallow coverage across all 11.

### 19.1 The priority tiers

**Tier 1 — depth at launch (months 1-3):** English, German.

These are the languages where Claude's keyword research and content quality assessment are strongest, where the audience volume is largest, and where the moderate competition still allows ranking with sustained content investment. Target at launch: 50+ topic destination pages each, 30+ guide articles each, 200+ decks each, all subscriber features fully populated per `docs/SUBSCRIPTION-SCOPE.md` (lesson plans, themed bundles, workspace tooling).

**Tier 2 — depth in months 3-6:** Spanish, Dutch.

Both languages have meaningful audience volume and reasonable competition. Spanish particularly because of the dual-language education market in the US and Latin America, and the bilingual classroom prevalence in Spain. Dutch because international schools in the Netherlands and Belgium are a strong fit for the platform. Target by month 6: 30+ topic pages, 15+ guide articles, 100+ decks each.

**Tier 3 — differentiation languages, months 6-9:** Swedish, Finnish, Norwegian.

These are smaller audiences but with virtually no competition — your platform is genuinely differentiated in these markets. Even modest content depth ranks immediately. Native-speaker review is more important here because of Claude's lower confidence in these languages. Target by month 9: 15-20 topic pages, 8-10 guide articles, 60+ decks each.

**Tier 4 — completion languages, months 9-12:** French, Italian, Danish, Portuguese.

The remaining four languages launched with minimal depth (catalog presence, a few topic pages, a small number of decks) and grown opportunistically based on what audience signals emerge. French and Italian have larger audience volume but stronger competition. Danish and Portuguese fit the platform but may have smaller serviceable markets in your specific niche.

### 19.2 What "depth" means concretely

A depth-launched language has:
- A complete home page with localized copy and an embedded sample deck in that language
- A pricing page in that language
- A populated catalog with the target deck count, including across all 29 exercise types
- Topic destination pages for the target topic count, with full lesson plans
- A guide/blog section with the target article count
- Native-language URL slugs throughout
- hreflang siblings linking to other depth-launched languages
- Native-speaker review of the most important pages (home, pricing, top topic pages)

A non-depth language at launch has the catalog technically populated (decks have been generated and exist) but minimal pedagogical content (no full lesson plans, no parent notes, no guide articles), and the home page may be auto-translated as a stub until proper localization happens later.

### 19.3 The English-content honest caveat

English is in Tier 1 because of audience volume, but the competitive reality of English-language K-3 educational content is significantly harder than the other tier-1 language (German). Education.com, Twinkl, Teachers Pay Teachers, and dozens of others have decades of accumulated authority. English content competing for "kindergarten math worksheets" probably can't rank for years, even with strong content investment.

The strategic role of English content is therefore different from the role of German content. English content's job is to convert visitors who arrive through other channels (LinkedIn outreach, conference connections, direct partnerships) and to be findable by international school teachers searching specific multilingual queries that have less competition ("multilingual kindergarten worksheets," "international school math activities," "bilingual addition activities for kindergarten"). The bulk of search-driven traffic will come from non-English markets where the platform is genuinely differentiated.

This means content investment ratio should not be 50/50 English vs other languages. A more honest ratio is closer to 30% English / 70% other priority languages, weighted toward the markets where the moat is strongest. Claude Code and the operator should be conscious of this when deciding where to invest content production effort during the launch period.

### 19.4 Adjustments based on what the data shows

The launch sequence is a starting plan, not a fixed commitment. Three months after launch, the operator and Claude review what's actually happening:

- Which languages are producing organic search traffic? Which are not?
- Which language pages have the lowest bounce rates and highest engagement?
- Which languages produced the first subscribers?
- Which conferences, partnerships, or outreach attempts produced inbound interest?

Languages exceeding expectations get accelerated content investment. Languages underperforming get either deeper investment (if the audience exists but the content doesn't reach them yet) or quiet deprioritization (if the audience isn't there). The plan adapts based on evidence rather than continuing on autopilot.

### 19.5 Launch-state update (post-substrate-complete, 2026-05-03)

As of `a47ea021` the platform substrate is complete across all 11 locales: every locale has Track A (`TOPIC_LOCALES` registration + `topics-taxonomy.json` slug-and-name maps for all axes per `topics-taxonomy.json` schema in §16.5) plus Wave 1 (per-locale `topicPage` namespace authoring) shipped. Deck-publish is unblocked for any (axis-key × locale) combination.

**Tier 1 (en, de):** Track A + Wave 1 + Track C catalog complete; depth-launch state per §19.1.

**Tier 2 (es, nl):** Track A + Wave 1 + Track C catalog complete (Tier-2 closeout `d3b4f962`, 116 decks across en+de+es+nl with all 4 locales at 100% C-1 catalog coverage); depth-launch state per §19.1.

**Tier 3 (sv, fi, no) + Tier 4 (fr, it, da, pt):** Track A + Wave 1 substrate complete (`b3f0d1f3`, `9ea577fe`, `589fd554`, `a47ea021`); deck-publish capacity unblocked; **Track C deck-creation remaining as open per-locale commissions**, prioritized per operator strategic call rather than §19-sequence-gated. Wave 2 (advanced chrome) + Wave 3 (long-tail) deferred per-locale.

**Implication:** the §19.1-§19.4 launch-tier sequencing operationalized substrate readiness ahead of catalog-content production. Substrate-complete state means new deck-publish commissions for any of the 9 substrate-only locales (it, fr, pt, sv, da, no, fi, plus continuation in es/nl) are unblocked and can begin in any order. Track C arc shape mirrors Tier-2 Track C precedent (cluster batches × locale × dominant-level).

---

## Appendix A — Production safety rules (operational guardrails)

These are concrete operational rules that have prevented real incidents. They supplement §3.1 and §10.3 with specific paths and commands. Treat them as non-negotiable.

### A.1 Server & isolated storage

- **Host:** `65.108.5.250` (root). SSH via plink/pscp with `-pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU`.
- **Code (git repo):** `/opt/lessoncraftstudio`
- **Isolated storage (NOT in git, bulletproof):** `/var/www/lcs-media/`
  - `samples/` — product sample images
  - `image-library/` — source PNGs (2.6 GB, 3000+ files)
  - `worksheet-generators/` — 33 HTML apps + `js/` translations
  - `admin-panels/` — content-manager HTMLs
  - `design-elements/` — 81+ SVGs + palettes + manifest
  - `backups/` — hourly/daily/weekly/monthly tarballs
  - `scripts/` — update/backup/health/restore helpers
- **Symlinks** (follow transparently from the code repo; never remove them):
  - `frontend/public/worksheet-generators` → `/var/www/lcs-media/worksheet-generators`
  - `frontend/public/admin` → `/var/www/lcs-media/admin-panels`
  - `image library` → `/var/www/lcs-media/image-library`
- Samples are served by nginx directly (`location /samples/`), bypassing Next.js.

### A.2 Reference folders (source of truth)

Always edit these first; they are canonical for deployment:
- `REFERENCE APPS/` — 33 worksheet generator HTML files
- `REFERENCE TRANSLATIONS/` — translation JS files
- `REFERENCE CONTENT MANAGERS/` — content-manager HTML files

After modifying, run `scripts\master-sync.bat` to update local copies.

### A.3 NEVER DO

**Git:**
- `git add .` in project root (could pull in samples/images).
- `git add samples/` or any image/PDF/sample file — the pre-commit hook blocks sample commits; 16 GB would crash the repo.

**Never `rm -rf`, `mv`, bulk-delete, `find -delete`, or `chattr -i` on:**
- `/var/www/lcs-media/samples`
- `/var/www/lcs-media/image-library` (and the `image library` symlink)
- `/var/www/lcs-media/worksheet-generators`
- `/var/www/lcs-media/admin-panels`
- `/var/www/lcs-media/design-elements`
- `/opt/lessoncraftstudio/stripe-backup` (immutable; legacy reference — not the active payment system)

**Never delete these files/symlinks:**
- `frontend/public/worksheet-generators` (symlink)
- `frontend/public/admin` (symlink)
- `frontend/app/api/webhooks/lemonsqueezy/route.ts`
- Immutable content managers in `frontend/public/` (`homepage-content-manager.html`, `user-control.html`)

**Never run without EXPLICIT operator approval:**
- `chattr -i` / `chattr -R -i` on any protected path.
- Modify any `LEMONSQUEEZY_*` env var.
- `DELETE` / `TRUNCATE` / `DROP` on: `users`, `ls_webhook_events`, `design_elements`, `image_library_items`.
- Re-run `scripts/import-*-images.js` — these strip diacritics; must re-run fix scripts afterward.
- Regenerate `image-vocabulary.js` without verifying diacritics in the raw JSON source.

### A.4 Update helpers — never direct `cp` on immutable files

- Worksheet / translation / content-manager updates: `/var/www/lcs-media/scripts/update-worksheet.sh`
- Design-element updates: `/var/www/lcs-media/scripts/update-design-element.sh`

These handle unlock → copy → re-lock. Direct `cp` on an immutable file fails and leaves the path in an inconsistent state.

### A.5 Deployment

**ALWAYS commit + push BEFORE running deploy.** `deploy.sh` runs `git pull`, so unpushed commits never arrive.

- Code deploy: `plink ... "bash /opt/lessoncraftstudio/deploy.sh"`
- Per-scenario commands for worksheet / translation / content-manager updates live in **`DEPLOYMENT.md`**.

#### A.5.1 Schema migrations require a two-step deploy

`deploy.sh` runs `git pull` + build + smoke; it does **NOT** run `prisma migrate deploy`. Pending Prisma migrations are NOT applied by `deploy.sh` alone. Surfaced empirically at `b9e75fbe` post-deploy `\d decks` showed only the pre-migration index set even after smoke PASS.

**For `[FEATURE][SCHEMA]` commits introducing pending migrations**, after `deploy.sh` completes:

```
plink ... "cd /opt/lessoncraftstudio/frontend && set -a && source .env.production && set +a && npx prisma migrate deploy"
```

Verify post-apply via Hetzner-side `\d <table>` to confirm the migration's expected schema changes are present. The 17 successful `_prisma_migrations` rows on Hetzner predating 2026-05-03 establish this two-step pattern empirically; established sessions ran the manual step without doctrine recording it. `b9e75fbe` was the first session to surface and record the requirement.

**For migrations generated when local Postgres is unavailable:** `prisma migrate diff` is the canonical generation path. Phase 1a + 1c established that `prisma migrate dev` requires running local DB; the `b9e75fbe` commission established `migrate diff` as the alternative. Invocation:

```
git show HEAD:frontend/prisma/schema.prisma > _baseline-schema-tmp.prisma
npx prisma migrate diff \
  --from-schema-datamodel _baseline-schema-tmp.prisma \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/<TIMESTAMP>_<name>/migration.sql
rm _baseline-schema-tmp.prisma
```

Match existing migration-directory timestamp format exactly (`YYYYMMDDHHMMSS_<name>` prefix; verify against existing `prisma/migrations/` dirs before authoring). The `--from-migrations` form requires `--shadow-database-url` (a temporary DB to replay history); the schema-to-schema form does not and is the documented alternative when shadow DB isn't available.

**Prisma client regeneration is its own concern alongside migration apply.** Schema migrations require THREE-STEP discipline at first introduction (DB schema apply + Prisma client regenerate + code referencing new columns deploys). The `npx prisma migrate deploy` step applies SQL migrations to the DB but does NOT regenerate the Prisma client used by code. Without regeneration, code references to new columns hit "Unknown argument" runtime errors silently.

**Empirical surface:** Phase 4a Checkpoint 1 (`a0ab3cf0`) added `titleHash` + `descriptionHash` columns to the Deck table via migration; deploy.sh ran clean + smoke PASS + DB schema applied; but retrofit's `db.update({titleHash, descriptionHash})` calls silently no-op'd because the Prisma client on Hetzner was generated against the pre-migration schema. Post-discovery, manual `npx prisma generate` resolved (35.1% → 63.3% en backfill rate at retrofit-rerun).

**Phase 4a Checkpoint 2 doctrine fix (`655e786c`):** `deploy.sh` patched to run `npx prisma generate` automatically alongside `git pull` + build + smoke. With this fix, `prisma generate` is AUTOMATIC on every deploy; only `prisma migrate deploy` remains manual per existing prose.

**THREE-STEP discipline post-`655e786c`:**
1. **Migration apply** (manual): `npx prisma migrate deploy` per existing prose
2. **Client regenerate** (automatic at deploy.sh): `npx prisma generate` runs each deploy
3. **Code deploy** (existing): `git pull` + build + smoke per deploy.sh

Audit-trail continuity: `b9e75fbe` first surfaced the migration-apply gap (THREE-STEP step 1); `a0ab3cf0` first surfaced the client-regenerate gap (THREE-STEP step 2); `655e786c` automated step 2 into deploy.sh.

### A.6 Lemon Squeezy (current payment integration — extended, not replaced, by the new subscription model)

- **Source of truth:** `frontend/config/lemonsqueezy-product-config.ts` (singular — defines `SUBSCRIPTION_PRODUCT` for the $69/year tier). The plural `lemonsqueezy-products.ts` was deleted Pass 8 after the seller-era teardown left it 100% dead.
- **Webhook handler:** `frontend/app/api/webhooks/lemonsqueezy/route.ts` (HMAC-SHA256, idempotent via `ls_webhook_events.event_id`)
- **Required env vars:** `LEMONSQUEEZY_WEBHOOK_SECRET`, `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_STORE_SLUG`, plus `SMTP_*` / `EMAIL_PROVIDER`.
- Stripe is **not** the active processor. The backup at `/opt/lessoncraftstudio/stripe-backup/` is immutable historical reference — do not use, do not delete.

### A.7 Diacritics (image translations)

`image_library_items.translations` was fully corrected on 2026-03-03. `deploy.sh` runs auto-healing every deployment; Test 13 is the smoke test.

Fix scripts at `/opt/lessoncraftstudio/server-scripts/`:
- `audit-db-diacritics.js` — reports mismatches
- `fix-db-diacritics.js` — base-key translations
- `fix-db-diacritics-numbered.js` — numbered variants
- `image-vocabulary-raw.json` — source of truth

#### A.7.1 image_themes Spanish-displayName data-quality issue

Surfaced at `947ad260` (BW theme registration). `home_bw` and `household_bw` both currently have Spanish displayName `"Hogar BN"` in `image_themes.displayNames.es`. The Class 2 collision was resolved by Option A fallback (`household_bw.slug.es = "household-bw"` English-derived; `name.es` passthrough preserved at `"Hogar BN"`). See §16.5.1 for the fallback rule.

**Underlying fix needed:** operator-curated rename of `household_bw.displayNames.es` to a distinct Spanish translation (e.g., `"Vajilla BN"` or `"Doméstico BN"` — operator-strategic call). Once renamed, the Option A fallback in `topics-taxonomy.json` `axes.theme.household_bw.slug.es` can be removed and the slug re-derived via the standard slugify path; commission shape: small `topics-taxonomy.json` edit + `image_themes` UPDATE.

The Italian `home_bw` / `household_bw` pair (both `"Casa BN"`) has the same shape; Option A fallback also applied at `b3f0d1f3`. Same operator-curated rename resolution applies for `it`.

#### A.7.2 image_themes accent-data-quality cycle (multi-locale)

Audit-trail findings across multiple locales as of `a47ea021`:

- **`pt`**: `accessories.pt = "Acessorios"` (missing acute accent; expected `"Acessórios"`); surfaced at `589fd554`
- **`it`**: `activities.it = "Attivita"` (missing grave accent; expected `"Attività"`); surfaced at `589fd554`
- **`sv`**: `accessories.sv = "Tillbehor"` (missing umlaut; expected `"Tillbehör"`); surfaced at `a47ea021`
- **`da`**: `accessories.da = "Tilbehor"` (missing slashed-o; expected `"Tilbehør"`); surfaced at `a47ea021`
- **`no`**: `accessories.no = "Tilbehor"` (same; expected `"Tilbehør"`); surfaced at `a47ea021`
- **`fi`**: `animals_bw.fi = "Elaimet MV"` (missing umlaut; expected `"Eläimet MV"` — note `animals.fi = "Eläimet"` has the umlaut; only the BW variant lost it); surfaced at `a47ea021`

Pattern suggests systematic accent-loss at a prior data-import step affecting multiple locales (at minimum 6 locales surfaced; full audit not performed). **Slug-level safe** (slugify ASCII-folds; downstream URL routing unaffected). **Name-level minor display issue** (theme names render without expected accents in chrome).

**Resolution shape:** small `image_themes` UPDATE commission can sweep all 11 locales for accent-integrity once accumulated. Operator-curated review per locale; data fix is targeted UPDATE statements per (theme, locale) tuple. Not blocking for deck-publish or any current commission; sweep when prioritized.

Filing for accumulating data-quality cycle alongside §A.7.1.

#### A.7.3 fr Class 2 documentation correction (9ea577fe)

The `9ea577fe` closeout report stated `home_bw.fr = "Casa NB"` and `household_bw.fr = "Ménage NB"` — actually empirical state (verified at `a47ea021` cross-locale audit) was distinct translations (`Casa NB` / `Ménage NB`) with no Class 2 collision. The `9ea577fe` closeout's listing was **correct in the data** but ambiguous in the report's prose phrasing (which read in some passes as suggesting both might be `"Ménage NB"`). Empirical state at `a47ea021`: fr standard path applied (no Option A fallback); confirmed via topics-taxonomy.json + cross-locale audit table.

No code change needed; documentation correction only. Filed for audit-trail completeness.

### A.8 Sample-commit protection

- Local `samples/` is in `.gitignore`.
- `.git/hooks/pre-commit` blocks any sample-file commit.
- Uploads flow: **Content Manager UI → API → `/var/www/lcs-media/samples/`** — never via git.

#### A.8.1 Pre-commit hook exception for [SCHEMA] commits

The pre-commit hook also blocks commits matching schema-change patterns and instructs use of `git commit --no-verify` as the documented bypass. The blanket "never skip hooks" framing in §A.1 (sandbox-protocol Git Safety subsection) has a project-documented exception specifically for `[SCHEMA]` commits — the `--no-verify` bypass IS the hook's own escape path, not a violation. Established empirically across 6+ prior `[SCHEMA]` commits including `9ba9fa2d`, `4b91adc0`, `79268e49`, `1ea0bb9b`, `140fdacb`, `b9e75fbe`.

For all non-`[SCHEMA]` commits, the hook stays mandatory; `--no-verify` is **not** a general escape. The exception applies specifically when:
- The commit's bracket tag includes `[SCHEMA]` (or the project-equivalent indicator), AND
- The hook explicitly outputs the `--no-verify` instruction in its rejection message, AND
- The commit's actual diff is consistent with the hook's documented schema-change pattern (Prisma schema changes; migration directory additions)

If any of those three conditions fails, the bypass does not apply and the underlying issue is to be investigated per the §A.1 / global "never skip hooks" rule.

#### A.8.2 Multi-copy doctrine-file drift discipline

When a doctrine file exists at multiple paths (e.g., `docs/SUBSCRIPTION-SCOPE.md` AND `important/SUBSCRIPTION-SCOPE.md`; or any future case where canonical-copy + working-snapshot coexist), fold operations target the path **cross-referenced from CLAUDE.md** as canonical. The CLAUDE.md cross-reference is the authoritative path locator; alternate copies are working-memory snapshots and may drift.

**How to apply:**
- Phase 1 inventory verifies which path is cross-referenced from CLAUDE.md (e.g., §7 cites `docs/SUBSCRIPTION-SCOPE.md` literally — that's canonical)
- Fold operations edit the canonical path only; alternate copies stay as-is
- Surface drift in [DOCS] commit closeout: "alternate copy at `<path>` is now ~one fold-pass-cycle behind canonical; recommend separate `[CHORE][DOCS]` reconciliation commission as follow-on"

**Why:** reconciling multi-copy divergence is a separate commission shape (state-reconciliation arc), not a fold pass. Bundling reconciliation into a fold pass would conflate "consume queue items" with "resolve file-state divergence" — different concerns, different scopes.

**Anti-pattern:** updating both copies in a fold pass to "keep them in sync." Either copy a is canonical and copy b is residual (commission a separate cleanup) OR both are load-bearing for distinct purposes (commission a separate scope-clarification). Fold passes don't resolve the question.

Origin: this commission's Phase 1 finding; SUBSCRIPTION-SCOPE.md exists at `docs/` (canonical per CLAUDE.md §7 cross-reference) and `important/` (working snapshot).

#### A.8.3 Working-memory file post-fold-pass cleanup discipline

When a [DOCS] fold pass consumes carry-forward items from working-memory files (typically `important/SESSION-STATE.md` doctrine-queue section + `important/CONVERSATION-HANDOFF.md` doctrine-queue section), the [DOCS] commit's Phase 4 verification step explicitly clears the consumed entries from the working-memory file (or marks them resolved-by-commit-hash). Avoids the failure mode where stale working-memory queues mislead future fold passes about active-doctrine state.

**How to apply (Phase 4 of any [DOCS] fold pass):**
1. Identify the working-memory file's doctrine-queue section
2. For each item that the [DOCS] commit folded into canonical CLAUDE.md, mark the item as "resolved by `<commit-hash>`" OR delete the item (operator preference; default: mark resolved to preserve audit trail)
3. Update the section header / preamble to reflect 0 items pending post-fold

**Working-memory edits are NOT in the [DOCS] commit.** Per §10.4, working-memory files (`MEMORY.md`, `CONVERSATION-HANDOFF.md`, `SESSION-STATE.md` in `important/`) are out-of-tree handoff artifacts that persist at filesystem level without commits. The [DOCS] commit covers canonical CLAUDE.md only; the working-memory cleanup happens in the same operator-attention session but on a separate disposition path.

**Why this matters:** the failure mode this prevents was surfaced empirically by THIS commission's Phase 1 finding — `important/SESSION-STATE.md` §8 listed 18 items as "pending next [DOCS] cycle" but all 18 were already folded by `2511e181` (~7 hours earlier). Without this discipline, future fold passes would have re-folded the same items or wasted Phase 1 inventory time discovering the staleness.

Origin: this commission's Phase 1 inventory finding (`2511e181` pre-resolved 18 items; SESSION-STATE.md §8 stale).

### A.9 Mac Studio operational rules (new)

- The Mac Studio is reachable only over Tailscale. Never expose its services to the public internet.
- The shared secret used by the Mac Studio worker to authenticate against `/api/ai-ingest/*` is in env var `AI_INGEST_SHARED_SECRET` on both machines. Rotate it like any credential.
- The AI service must survive being killed and restarted at any time without producing duplicate enrichments. Every write to `/api/ai-ingest/complete` is idempotent on `(deck_id, enrichment_version)`.
- Never deploy a Mac-Studio-side change that would make Hetzner block while waiting on the Mac Studio. The contract is pull-based for a reason.

### A.10 Origin nginx www-canonicalization

`https://lessoncraftstudio.com/<path>` returns HTTP 301 redirecting to `https://www.lessoncraftstudio.com/<path>`. Pre-existing rule at the Hetzner-side nginx server-block; predates Brief B. The redirect is at origin, not at Cloudflare edge.

**Implication:** all canonical URLs in CLAUDE.md, deck.html `__CANONICAL_URL__` substitutions, share-intent URLs, and external crawl/share targets MUST use the `www.` form. Substitutions that omit the prefix work via 301 but lose one round-trip.

**Load-bearing implementation:** `scripts/publish-cli/substitute.js: CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com'` — this constant drives all `__CANONICAL_URL__` placeholder substitutions across the publish pipeline. **Apex form is NOT acceptable** here: the apex→www 301 redirect breaks the embed iframe's auto-resize listener (per §14.3a `buildEmbedAffordance` snippet shape). The listener compares `e.data.url` (postMessage URL = `location.href` = www post-redirect) against `f.src` (iframe element src = whatever the embed snippet was generated with). When the snippet was generated with apex-form `var url = '__CANONICAL_URL__'` substituted to apex, post-redirect they don't match and the resize message is rejected. Iframe stays at the default `aspect-ratio: 800/1400` showing visible whitespace below the worksheet for sparse-content apps (alphabet-train, prepositions); dense-content apps (math-worksheet with full puzzle layouts, addition/subtraction with 6-equation grids) coincidentally fill ~1400px height and mask the issue.

**Recovery:** `scripts/publish-cli/rewrite-canonical-host.js` is the canonical retrofit script for existing deck.html files — walks `/var/www/lcs-media/decks/<locale>/<slug>-v1/deck.html`, replaces apex form with www form (both plain `https://lessoncraftstudio.com/` and URL-encoded `https%3A%2F%2Flessoncraftstudio.com%2F` for share-intent links). Idempotent. Originating commit: `6fb6ee3d`.

Cross-reference: §15.7 catalog deck route operates on `www.lessoncraftstudio.com`; §15.8 Cloudflare cache-invalidation policy applies to both apex and `www` (orange-cloud proxy on both records since 2026-04-30 per §3.5); §A.14.8 pre-publish-wave audit doctrine includes the canonical-host check as a load-bearing gate.

### A.11 More detail

- **`DEPLOYMENT.md`** — full deployment scenarios + recovery workflows.
- **`docs/reference/server-verification.md`** — health checks, file-count verification, backup inspection, image/payment recovery commands.
- **`docs/reference/design-elements-integration.md`** — 22 load-bearing rules for the Design Elements accordion (read before porting it to a new app).
- **`docs/reference/12-content-creation-guide.md`** — content creation guide.

### A.12 Fast-forward push default policy

Plain `git push` is the default for fast-forward cases (local just ahead of remote with no diverging history). `git push --force-with-lease` is reserved for genuine history rewrites (rebase + push of an already-pushed branch).

**Why this is policy-locked (added 2026-05-03 post Batch 4 ES drift correction at `b18b8654`):** the Claude Code agent safety policy blocks `--force-with-lease` even on non-destructive cases (e.g., when local is just ahead of remote and no history rewrite is needed). When a brief specifies `--force-with-lease` for a fast-forward case, the safety block fires and force-with-lease is unnecessary anyway. Plain `git push` succeeds without any flag.

**Briefs that mention `--force-with-lease`:** check whether the case is a genuine history rewrite (commit amends, rebases, etc.) or a fast-forward. Default to plain `git push` for fast-forwards. If the safety policy blocks the force-with-lease attempt, don't escalate — just use plain push.

### A.13 Verification hygiene

This section consolidates verification-pass discipline surfaced empirically through Arc 6 split + the Track C 443→440-deck wave. Items here are operational — they apply at Phase 4 verification of any commission, not at architecture/design time.

#### A.13.1 Phase 4 zoom-in label-readability discipline

Phase 4 verification spot-checks must include zoom-in inspection of UI labels in narrow-column contexts. UX-truncation defects on wrong CSS class assignment surface only on close inspection — at standard browser width the page renders, deck cards load, faceted filters work, but text labels are truncated to 2-3 characters with ellipsis ("a..", "b..", "c..").

**How to apply (Phase 4 of any UI commission):**
- Mobile narrow-viewport check (375px): verify labels render fully, not ellipsis-truncated
- Faceted-sidebar / filter-strip / similar narrow-column UI surfaces: zoom in on actual rendered text
- Sample 3-5 representative labels per surface; confirm full-text readability

**Why:** the standard "page returns 200, deck-grid renders, headings present" smoke test passes even with severe label truncation. Text-readability-at-narrow-column is a distinct verification dimension.

**Anti-pattern:** trusting status-200 + structural-presence smoke tests as sufficient Phase 4 verification for UI components. Status-200 verifies routing; structural-presence verifies components render; label-readability verifies layout-CSS-class-correctness. All three are independent.

Origin: `91ae41a7` `[FIX][UX]` Filter sidebar — label truncation + column-width allocation (operator screenshot at `/en/topic/animals/kindergarten/` revealed truncated labels on a render that appeared structurally correct).

#### A.13.2 Gap-fold-in-same-commit doctrine

When an arc surfaces a latent bug fixable with **≤10 short strings** OR **≤1 component-level edit at zero strategic cost**, fold the fix into the arc's commit rather than commissioning a separate [FIX] arc. The Arc 6c→6d intersection.intro precedent established this: 7 missing intersection.intro strings (gap-fill) + 1 component edit (TopicProseContainer.tsx topicProse lookup) folded into the Arc 6d topicProse authoring commit because (a) the latent bug surfaced during Arc 6d Phase 1 inventory and (b) folding cost zero strategic surface — single small additive change at the same fold target.

**How to apply (Phase 2 of any arc):**
- If Phase 1 surfaces a latent bug AND the fix is ≤10 short strings OR ≤1 component edit AND the fix lives at the same fold-target file(s) as the arc's primary work: FOLD into the arc's commit
- If the fix exceeds these thresholds OR touches a different surface OR has strategic implications operator should adjudicate: SURFACE as separate [FIX] commission

**Why:** small-fix-bundling reduces commit-history fragmentation while preserving operator-strategic decisions for non-trivial fixes. The 6c→6d intersection.intro fix at zero-cost-fold was the right call; an out-of-scope publish-cli refactor would have been the wrong fold (different surface, different scope, requires operator strategic-adjudication).

**Anti-pattern:** folding ANY fix into the arc's commit because "we're already editing nearby files." The threshold is structural (≤10 strings / ≤1 component / same-surface), not opportunistic.

Origin: Arc 6c→6d intersection.intro precedent (`c03fdb8e`).

#### A.13.3 Refactor-during-already-opened-surface principle

When a [FIX] commission opens a code surface for editing, audit the surface for adjacent refactor opportunities of the same shape. Lower marginal cost during already-opened surface than commissioning a separate refactor arc later. The principle is structurally identical to §A.13.2 gap-fold but applies to refactor opportunities (not bug-fix opportunities).

**How to apply (during any [FIX] commission's Phase 1 inventory):**
- After identifying the bug's root-cause surface, scan adjacent code for the same anti-pattern
- If the surface has ≥3 instances of the same anti-pattern AND a 4th consumer is imminent (per §14.3a 4th-consumer threshold), fold the refactor into the [FIX] commission
- If the refactor scope exceeds the [FIX] surface OR introduces new architectural decisions: surface as separate refactor commission

**Why:** opened-surface refactors are economically efficient (no need to re-establish context); deferred refactors compound technical debt. The 443-wave publish-cli refactor (`785d63f6`) folded a 3-call-site refactor into the theme-aware-slug fix because the surface was already opened for editing AND a 4th consumer (Pillar 2 bundle-publish path) was imminent.

**Anti-pattern:** opportunistic refactor-creep that expands the [FIX] commission's scope beyond the bug. The trigger is "same anti-pattern at adjacent call sites with imminent 4th consumer," not "this code could be cleaner."

Origin: `785d63f6` `[FEATURE][PUBLISH-CLI]` (slug-derivation refactor folded into theme-aware-slug fix; bulk.js + publish.js + index.js → `slug.js: deriveSeedFromManifest`).

#### A.13.4 DERIVED vs HARDCODED-NULL emit-site classification

App emit-sites for SEO-bearing manifest fields (theme, exerciseMode, etc.) classify as one of two structural shapes per the `EXERCISE_MODE_APP_CLASSIFICATION` constant in `scripts/publish-cli/slug.js`:

- **DERIVED** — the emit-site reads from operator UI signal at emit time. The value passed to `LCSCatalogExport.export({exerciseMode: <expr>, ...})` is computed from a UI control (e.g., `document.getElementById('difficultySelect').value`, `settings.word_reveal_mode`, etc.). Null from a DERIVED app is legitimate (default-mode contract per §17.8.5); the operator-side intent is "default mode" not "no mode."
- **HARDCODED-NULL** — the emit-site is a literal `exerciseMode: null` at the static call site, with no operator-side intent behind the null. This is the defect class; future multi-mode waves at this app would collapse into a shared slug-namespace at publish-time.

The §15.16 reconciliation gate uses the classification to differentiate: HARDCODED-NULL+null halts the batch (`MODE_NULL_FROM_HARDCODED_APP` category); DERIVED+null is CLEAN. Post-Commission ε at `109a91d4`, all 29 §14.10 catalog apps are DERIVED; the HARDCODED-NULL list is empty. The gate stays as a backstop ready to fire on any future regression.

**Implication for new app additions.** Any future app added to §14.10 must classify into `EXERCISE_MODE_APP_CLASSIFICATION` at first-publish — DERIVED if the emit-site reads from UI signal, HARDCODED-NULL if not. HARDCODED-NULL is acceptable as a transitional state IFF a follow-on Shape-A-equivalent commission is filed concurrently; otherwise the §A.13.5 structural complement is broken at the new app's boundary.

Origin: `2b555b57` (gate extension introducing classification constant) + `109a91d4` (Commission ε flipping all 16 prior HARDCODED-NULL apps to DERIVED).

**Recon-and-park outputs feed gate logic structurally.** The `EXERCISE_MODE_APP_CLASSIFICATION` constant in `scripts/publish-cli/slug.js` is not just documentation of Commission ε's locked taxonomy — it IS the live taxonomy that the §15.16 gate consumes at runtime. Recon outputs that lock app-classification, mode-counts, theme-axis-keys, etc. should be encoded as code-level constants the gate reads directly, not as prose-in-CLAUDE.md the gate references conceptually. The pattern: recon → operator-strategic adjudication → locked taxonomy → code-constant → gate predicate input. Each step structurally chained; no human-mediated lookup at gate-runtime. Future gate extensions (e.g., a future `LOCALE_NSR_FLAG_CLASSIFICATION` for translation-quality gating) follow the same recon-output-as-code-constant pattern.

#### A.13.5 Shape A canonical authoring pattern + reconciliation gate as structural complement

The §15.16 reconciliation gate is the publish-time backstop; **Shape A** is the canonical authoring-app pattern at the upstream boundary. Together they form the structural complement that closes emit-defects at both layers.

**Shape A definition:** at the authoring-app's `prepareExerciseImages()` boundary (or equivalent image-pool-construction site), filter `selectedImages` against the active theme before passing to downstream pool-construction. Operator-clicked off-theme images are dropped with a non-blocking UI warning naming the dropped count + active theme. The existing emit-site `theme: themeSelect.value` becomes correct once the image-pool is theme-constrained (no separate emit-site fix needed).

**Per-app scoping varies per operator adjudication:**
- **Verbatim fix** at top of `prepareExerciseImages()` with `selectedImages → baseSelection` rename in immediate local block (addition, subtraction reference shape).
- **Branch-scoped fix** when only one code path has the defect (e.g., bingo's `customCalloutsCheckbox.checked` branch only; word-scramble + word-guess fallback else branch only).
- **Decoupling-deferred** when the defect class is structurally distinct from Shape A's image-pool boundary (e.g., treasure-hunt's path-A `worksheetThemeValue`-driven manifest-emit decoupling; gate-protected; future commission per §11).

**Translation-key convention:** each app ships an `<app>.msg.offtheme.dropped` key with `{count, theme}` interpolation across 11 locales. Per §14.3a 4th-consumer threshold the keys promote to `shared.msg.offtheme.dropped` once consumer count crosses threshold — currently filed as future-arc candidate per §11.

**Why structural complement (not redundancy):** Shape A prevents the defect at the authoring boundary; the gate catches whatever slips through (e.g., a future app added before Shape A is applied; a regression that re-introduces the defect; a per-app branch-scoping miss). Belt-and-suspenders structural defense.

Origin: `44cbdda1` (code-addition Shape A reference) + `05d0940e` (Shape A across 10 sibling apps).

#### A.13.6 Spec-vs-shipped-contract validation discipline

When a commission spec includes classification rules over a code surface that has independently-shipped contracts, the implementation step must validate the spec's rules against the shipped contract BEFORE commit, not after.

**How to apply (Phase 3 of any commission introducing classification rules):**
- Identify every shipped contract on the surface the spec touches (existing emit-site behaviors, existing API responses, existing user-facing state).
- Run the spec's rules against the shipped state empirically (regression test, not desk-check).
- If the spec's rules conflict with a shipped contract, halt before commit + surface to operator for adjudication.

**Empirical precedent.** Commission δ Phase 3 regression caught the spec's strict-DERIVED rule (every DERIVED app must emit non-null exerciseMode) conflicting with code-addition's null-for-standard contract shipped at `5078f491` (default mode emits null per §17.8.5). 104 of 153 en code-addition standard-mode decks would have halted at the gate. Operator adjudicated to Interpretation Y (lenient gate: only HARDCODED-NULL+null halts; DERIVED+null is CLEAN) before commit. The discipline saved a multi-deck rebuild; without it, the gate would have shipped silently-wrong and surfaced only at a later Track C wave.

**Anti-pattern:** trusting the commission spec as the final classification authority. The shipped contract IS the contract; specs propose rules against it but don't override it. Specs and shipped contracts can both be wrong; only empirical regression discriminates.

**Paired discipline with §A.13.8 (adjudication-reversal).** §A.13.6 surfaces the spec-vs-shipped conflict; §A.13.8 governs the reversal once surfaced. The two are canonical-paired across multi-phase commissions: at any commission's recon step, surface conflicts (§A.13.6); at any conflict surface, reversal-vs-power-through is the operator-strategic call (§A.13.8). The `[ARC][SEO][DECK-PAGE]` commission (Phases 3a-5) fired the paired discipline 5 times: (1) Phase 3b multi-h1 single-shared-site (architectural sweep vs mechanical fan-out lock); (2) Phase 4a Checkpoint 2 5-step-diff Explore-agent recon (5-step-diff fan-out depth vs 3-step-diff initial); (3) Phase 4a Checkpoint 2 DB backfill silent-swallow (35.1% en backfill rate vs 100%-implied lock); (4) Phase 4a Checkpoint 2.5 (θ) residual class-distinction (close-at-63.3% vs power-through to 100%); (5) Phase 4b Sub-step 0 5th-firing TS→CJS path adjudication (a-1 CJS port vs (a) build-time compile). Each firing surfaced a cost-asymmetry the original adjudication didn't model; each was operator-ratified pre-execution rather than silently absorbed.

Origin: `2b555b57` (Commission δ adjudication baking the lenient gate posture).

#### A.13.7 Per-app first-publish verification cadence

When a structural exposure-class is closed by a publish-cli gate covering N apps, per-app first-publish verification folds into Track C cadence rather than a separate audit commission. The gate is the verification mechanism; first-publish in each app is the empirical-trigger moment.

**How to apply.** At any commission shipping a publish-cli gate that covers ≥10 §14.10 apps (per §A.13.4 classification scope), do NOT commission a separate per-app verification audit. Instead:
1. Document the gate's coverage in the closing commit body (which apps the gate now protects).
2. Track per-app first-publish events as Track C deck-publish occurs.
3. The gate fires (or doesn't) at first-publish per app — empirical verification by construction.
4. If the gate fires at any app's first-publish, surface as a follow-on `[FIX][AUTHORING]` commission for that app.

**Why this scales.** A separate audit commission for 16+ apps would cost weeks of operator-attention to manually verify each app's emit-site by hand; the gate accomplishes the same coverage at zero per-app cost during the natural Track C cadence. The audit-commission-shape is reserved for surfaces the gate cannot reach (e.g., asset-tree organization audits per §A.14.5; backup-coverage audits per §A.14.6; cross-cutting taxonomy audits).

**Empirical anchor:** at `580b0ca2` the §15.16 theme reconciliation gate shipped covering 27 unverified apps; per-app first-publish verification folded into Track C cadence rather than spawn a 27-app audit commission. The gate caught code-addition's emit-defect at first-publish (153 ZIPs with broken theme); the salvage scripts pattern (§15.17) handled the recovery without operator-attention proportional to N apps.

Origin: `580b0ca2` (theme reconciliation gate covering 27 unverified apps).

#### A.13.8 Adjudication-reversal discipline

When recon (typically Phase 1 inventory of any commission) surfaces a cost dimension the original adjudication didn't account for, recalibrate before executing — don't power through doctrine purity at operator-side cost.

**Empirical anchor.** Initial adjudication on the manifest.theme defect arc proposed operator-side regeneration of 153 ZIPs to align manifest fields with content. Operator pushed back; correct fix was downstream rewrite using content signals already present in the manifests (`9051b43d` salvage script). The original adjudication cost-modeled as "rebuild-the-defective-state from scratch" but the empirical cost was "operator's generation hours" vs "CC's code change" — a calibration gap that doctrine purity would have masked.

**How to apply.** When a Phase 1 inventory surfaces a fix path that was not in the original adjudication's option set AND the new path is materially cheaper on the dimension the operator actually pays (typically generation hours, attention budget, or session cycles), surface the recalibration as a Phase 2 batched review rather than executing the original adjudication. The §15.17 salvage scripts pattern is the canonical example of authoring-side root-cause + publish-side patching co-existing as a layered fix shape.

**Anti-pattern.** Treating an adjudication-lock as immutable when recon surfaces material cost asymmetry. Adjudicator-forward decision-locking (§3.4) does not mean adjudications are final-vs-reality — they're final until reality contradicts the cost-model the adjudication assumed. When that happens, surface and re-lock.

**Paired discipline with §A.13.6 (spec-vs-shipped-contract validation).** §A.13.6 surfaces the conflict; §A.13.8 governs the recalibration once surfaced. Cross-reference §A.13.6's audit-trail of 5 firings across the `[ARC][SEO][DECK-PAGE]` commission for the canonical-paired pattern.

Origin: code-addition manifest.theme defect arc (`44cbdda1` Shape A + `9051b43d` salvage script), recalibration surfaced post-recon.

#### A.13.9 Two-defect pattern recon

When one emit-defect surfaces in an authoring app at a wave boundary, recon for additional emit-defects in the same app at the same wave before declaring the wave fixable.

**How to apply (during any `[FIX][AUTHORING]` Phase 1).**
- Identify the surfaced defect's emit-site class (theme, exerciseMode, age_range, locale, etc. per §17.8.5 SEO-bearing manifest fields).
- For every OTHER emit-site class in the same app, run the §15.16 reconciliation gate (or its conceptual equivalent) on a sample of the wave's manifests.
- If a second defect surfaces, fold both into a single Shape-A-style fix per §A.13.5 — don't ship two sequential fixes when both can land in one commit.

**Why this matters.** Code-addition's first surfaced defect was manifest.theme (`9051b43d`); cross-theme matrix testing then surfaced exerciseMode emit-defect (`5078f491`) in the same wave. Without two-defect recon, the second defect would have surfaced post-publish in a downstream wave, requiring a second salvage script + second authoring fix + cumulative operator-attention. Two-defect recon catches both at the same recon turn.

**Empirical anchor.** code-addition (`5078f491` exerciseMode + `9051b43d` theme) — both surfaced at the same wave once cross-theme matrix testing exposed the first one. Commission ε at `109a91d4` then closed exerciseMode across all 16 hardcoded-null apps in one stroke after the pattern was recognized.

#### A.13.10 Manifest-as-schema-contract discipline

The manifest is the contract between authoring app and publish-cli. Defects fix at the emit-side (authoring app boundary) — do not introduce downstream content-vs-metadata reconciliation when avoidable. The §15.16 reconciliation gate is a backstop, not a primary fix mechanism.

**How to apply.**
- When an emit-defect surfaces, the first question is: where in the authoring app does the defective field get computed? Fix there (Shape A discipline per §A.13.5).
- The second question is: does the §15.16 gate already catch this class? If yes, the gate is sufficient backstop for any future regression; the authoring fix closes the present wave.
- The third question is NEVER: can publish-cli reconstruct the correct value from content signals? — that's salvage-script territory (§15.17) for already-staged waves only, not a primary fix path.

**Why this matters.** Salvage scripts (§15.17) exist to recover already-generated waves where regeneration cost > script cost. They are NOT a maintenance pattern for ongoing emit-defect tolerance. Letting publish-cli reconcile content vs metadata as a primary fix encodes the wrong contract — manifests stop being the source of truth for SEO surfaces and become advisory metadata that publish-cli routinely overrides. That breaks the §17.8.5 SEO-first emit-site framing because operator-strategic adjudication on emit values (which mode strings, which themes) loses authority to publish-cli's content-derivation heuristics.

**Anti-pattern.** Adding new content-vs-metadata reconciliation logic to publish-cli when an authoring-side fix is available. The reconciliation gate's role is binary (CLEAN / HALT), not corrective.

Origin: §15.17 salvage scripts as recovery pattern only (not primary fix); §A.13.5 Shape A as authoring-side root-cause framework; this subsection codifies the priority ordering.

#### A.13.11 Operator-strategic adjudication batching at recon-completion

When Phase 1 recon surfaces multiple operator-strategic adjudications, batch them into a single consolidated review at recon-completion — do NOT surface adjudications mid-stream as they emerge during inventory.

**How to apply.** During Phase 1 inventory of any commission:
1. Note each item that requires operator-strategic input as it surfaces; do not interrupt inventory to surface.
2. At Phase 1 completion, surface ALL accumulated adjudications in a single consolidated review with concrete options + recommendations per item.
3. Wait for batched response; receive locked decisions per item; then proceed to Phase 2-3-4.

**Why batching beats per-item streaming.** Operator-attention is the load-bearing variable across most commissions. Each context-switch into adjudication mode has a fixed setup cost — re-establishing the commission's state, re-reading the relevant CLAUDE.md sections, re-considering what was already locked. Three adjudications surfaced as one batch cost ~one context-switch; surfaced as three separate questions cost ~three context-switches. Batching is the dominant strategy unless an early adjudication blocks ALL subsequent inventory work (rare).

**Empirical anchor.** Arc 2 Phase 1 completion (`a93ebb7c` predecessor) surfaced four adjudications in one batch: A1 flag iconography source, A2 exercise-type icons source, A3 theme thumbnails source, A4 EmbedViralityCTA target URL. Operator response locked all four in one round-trip. Arc 3 Phase 1 completion surfaced zero adjudications because the rubric (FOLD/CONSOLIDATE/RE-QUEUE/DROP per the [DOCS] fold pass) absorbed all judgment calls at the rubric layer, demonstrating the batching pattern's higher form: when a commission's rubric is well-specified, recon-completion batching reduces to recon-completion close-out.

**Anti-pattern.** Per-question consultative-by-default — "I found item X, what should I do?" → operator response → "I found item Y, what should I do?" → ... — wastes operator-attention proportional to N items even when the items are independent. Adjudicator-forward (§3.4) handles items where the call is clear per CLAUDE.md priority foundations; adjudication batching handles the residual items requiring operator-strategic input.

Origin: Arc 2 Phase 1 four-adjudication batched review (`a93ebb7c` predecessor turn); pattern codified at this fold pass.

#### A.13.12 Mechanical-fan-out vs architectural-sweep distinction at 29-app scope

When a fix needs to land across the 29 §14.10 catalog apps, classify as **mechanical fan-out** (single-line edit per app, identical pattern, no per-app variance) vs **architectural sweep** (multi-file per app, shape-level changes, per-app structural variance) before pricing the cost envelope. The distinction governs verification-hygiene shape (§A.13.13) + cost-balloon escape hatch threshold (concern 3 in any commission spec) + structured-fan-out 3rd category (§A.13.15).

**How to apply.** At any commission whose scope crosses 29-app boundary:
- **Mechanical fan-out** — sed-replaceable single-line per app; all 29 apps' diffs identical at line-level. Examples: `<h1 class="lcs-celebration__title">` → `<h2 class="lcs-celebration__title">` (Phase 3a.2 Resolution A); `worksheet.title` → `bundle.title` rename. ~30-90 LoC total across 29 apps; no per-app reasoning needed.
- **Architectural sweep** — touches 2+ files per app OR introduces shape-level variance (e.g., per-app conditional dispatch on app-specific bundle fields); requires per-app reasoning at design time. Examples: Phase 3b multi-h1 architectural sweep (per-app celebration template + per-app bundle metadata threading); ~300-500+ LoC total across 29 apps.

**Empirical anchor:** Phase 3a.2 mechanical h1→h2 fan-out (29 apps × 1 LoC ≈ 29 LoC, ~30 minutes execution); Phase 3b multi-h1 architectural sweep (29 apps × 5-step diff ≈ 145 LoC, ~2 hours execution + 4 §A.13.6 firings during execution). The cost differential is ~3x in LoC + ~4x in execution time; classification at planning step prevents under-pricing.

Origin: Phase 3a/3b commission cycles; pattern codified at Phase 6 fold.

#### A.13.13 Fan-out verification-hygiene at mechanical-fan-out execution

For mechanical fan-out across 29-app scope, verification-hygiene uses **6-dimension grep pattern** to confirm fan-out completeness post-edit. Single-dim grep is insufficient because mechanical patterns often have escape variants (e.g., `<h1 ...>` AND `\\u003ch1 ...\\u003e` AND JS-string-escaped `\"<h1\" + ... + \"</h1>\"`).

**6 verification dimensions:**

1. **Open-tag canonical form** — grep for `<h1 ` (or pattern equivalent) across all 29 app files; expected count = 0 post-fan-out
2. **Close-tag canonical form** — grep for `</h1>`; expected = 0 post-fan-out (assuming celebration h1 was the only h1 per app)
3. **JS-string-escaped open** — grep for `"<h1` or `\"<h1` in inline-JS-string contexts; expected = 0
4. **JS-string-escaped close** — grep for `</h1>"` or `</h1>\"`; expected = 0
5. **Line-context match** — grep for the canonical pattern at line-level (e.g., `lcs-celebration__title` to confirm the celebration-class wraps `<h2>` not `<h1>`)
6. **Cross-locale spread** — for any per-locale variant, verify spread matches expected locale set (e.g., 11 locales × N variants = expected spread count)

**Empirical anchor:** Phase 3a.2 + Phase 4a Checkpoint 1 surfaced celebration h1 escape variants in JS-string-literal contexts (`"<h1 class=\"...\">"+T(...)+"</h1>"` form). Single-dim grep on the canonical `<h1 ` pattern missed the escaped variants; 6-dim coverage caught them.

Origin: Phase 3a.2 + Phase 4a Checkpoint 1 (`3d1027e5` line-context regex fix); pattern codified at Phase 6 fold.

#### A.13.14 Phase 1 Explore-agent fidelity validation

Explore agents are tools for breadth-survey questions where fidelity isn't load-bearing (e.g., "what files reference X?", "what's the rough shape of Y?"). For operationally-consequential decisions — those where a wrong recon answer causes downstream cost (rework, false halt-class fires, mis-priced cost envelopes) — direct grep + file-inspection is the canonical recon mechanism.

**How to apply.** At any Phase 1 recon step:
- If the recon question is breadth-survey ("what's the surface area of X?"), Explore is appropriate
- If the recon question is fidelity-critical ("does X have shape Y at line N?"), use direct `Grep` + `Read` tools
- If unsure, default to direct tools — Explore can compress accurate recon into compact output that LOOKS authoritative but loses precision at the line-level

**Anti-pattern:** trusting Explore-agent output for line-precise claims about shipped code state. Explore agents read excerpts; they do not guarantee whole-file fidelity. The §A.13.6 spec-vs-shipped-contract conflict surface often hides at sub-line granularity that Explore agents cannot reliably surface.

**Empirical anchor:** operator-surfaced doctrine at Phase 3b Checkpoint 2 when an Explore-agent recon claimed 3-step-diff per app; direct grep verification surfaced 5-step-diff per app. The §A.13.6 5th-firing at Phase 4b Sub-step 0 used direct grep + Read at recon to confirm zero frontend consumers of the orphan TS file; an Explore-agent recon would have surfaced the doc-only references but might have under-emphasized the absence of code consumers.

Origin: Phase 3b operator-surfaced; pattern codified at Phase 6 fold.

#### A.13.15 Structured-fan-out as 3rd category between mechanical and architectural

Structured fan-out is a 3rd category between mechanical (§A.13.12) and architectural (sweep). It applies when **per-app structural diff > 1 file BUT not pure architectural touch**:
- Multi-line additions per app, identical structural shape across all 29 apps
- Same metadata-threading pattern; same opts contract; same call-site location
- No per-app conditional logic; no per-app structural variance

**Cost shape:** 5-step-diff per app per Phase 3b Item 7 doctrine. 5 dimensions × 28 apps ≈ 140-145 LoC; 1-2 hours execution; 0-2 §A.13.6 firings expected.

**How to apply.** At any commission whose scope crosses 29-app boundary AND per-app diff exceeds 1 line:
- Verify the diff shape is identical across all 29 apps (no app-specific variance) — if YES, structured fan-out
- If per-app variance present (e.g., per-app conditional dispatch on app-specific bundle fields), architectural sweep
- Cost-balloon escape hatch (c) bound: structured fan-out at ~145 LoC across 28-app scope is the empirical ceiling before architectural sweep classification triggers

**Empirical anchor:** Phase 3b Checkpoint 2 5-step-diff fan-out (28 apps; ~145 LoC); Phase 4a Checkpoint 2.5 (θ) structured fan-out (28 apps; rawExerciseMode + exerciseModeName threading). Both within structured-fan-out cost shape; neither tipped into architectural-sweep cost.

Origin: Phase 3b Item 7 doctrine; canonical reference established at Phase 4a Checkpoint 2.5 second instance; codified at Phase 6 fold.

#### A.13.16 Verification-hygiene at structured-fan-out execution

For structured fan-out, verification-hygiene adapts the 6-dim grep pattern (§A.13.13) to structured-shape match:

1. **Per-app structural-shape match** — grep for the structural anchor (e.g., `seoTrace.title.modeName`) across all 29 apps; expected count = 1 per app
2. **Per-app diff-line consistency** — sample 3-5 apps; verify diff shape identical (5-step diff per app per Phase 3b Item 7)
3. **Cross-app naming-pattern verification** — verify per-app helper variable names follow consistent convention (e.g., `derivedExerciseMode` not `localExerciseMode` in some apps)
4. **Post-deploy curl-spot-check sample** — sample 3 apps × 2 locales × 1 deck = 6 production decks; verify rendered output matches expected
5. **Test-suite full-pass** — run all publish-cli test files; expected zero regressions
6. **Per-app metadata threading audit** — confirm metadata flows from extractDeckBundle → renderStandaloneHTML → buildSeoHead → deck.html without drop-out at any per-app boundary

**Empirical anchor:** Phase 4a Checkpoint 2.5 (θ) structured fan-out used 6-dim verification post-execution; caught 1 var-hoisting bug at fanout-theta-handler.js (script's `var exerciseModeForBundle = derivedExerciseMode;` hoisted before assignment) before commit.

Origin: Phase 3b verification methodology; codified at Phase 6 fold.

#### A.13.17 Slug-vs-title-shape redundancy as separate doctrine class

Slug-level catalog data hygiene is structurally distinct from title-shape doctrine; collisions at the slug level cannot be resolved by title-shape adjustments alone.

**How to apply.** At any future title-shape work, distinguish:
- **(a) Shape-pathology collisions** — multiple decks at same (locale, shape) producing identical title-hash. Resolvable via title-shape adjustment (e.g., adding a discriminator field per Phase 4a Checkpoint 2.5 (θ): mode discriminator)
- **(b) Catalog-data-hygiene collisions** — multiple decks at same (locale, slug) tuple due to operator-side workflow OR legacy slug renames. Requires operator-strategic catalog rationalization commission; NOT resolvable via title-shape alone

**Pricing remediation:** if recon shows the residual is class (b), do NOT promise 100% backfill via title-shape adjustment. Phase 4a (θ) achieved 63.3% en + 100% non-en backfill; the residual 36.7% en was class (b) which (μ) slug-rationalization commission-stub addresses (filed at Phase 4a close).

**Empirical anchor:** Phase 4a Checkpoint 2.5 (ι) close. Operator pushback on (ε) accept-partial recommendation surfaced (θ) structural fix; (θ) closed shape-pathology gap; (ι) close-at-63.3% surfaced catalog-data-hygiene as separate class requiring (μ) commission.

Origin: Phase 4a Checkpoint 2.5; codified at Phase 6 fold.

#### A.13.18 Backfill-rate as commission close-out metric

When a commission's primary deliverable enforces a uniqueness invariant via DB-side hash (e.g., `@@unique([language, titleHash])`), close-out doc must report **backfill-rate breakdown** per locale, not just file-level retrofit count. Silent under-enforcement (file-level: "100% retrofitted") is worse than visible partial enforcement ("DB-level: 63.3% en + 100% non-en backfilled").

**How to apply.** Close-out doc Section "Verification" reports two distinct metrics:
- **File-level retrofit rate** — N of M decks' files rewritten at retrofit
- **DB-level invariant-enforcement rate** — N of M DB rows have the hash column populated AND unique-constraint enforceable

Phase 4a precedent: file-level 2776/2776 (100%); DB-level 1693/2673 (63.3% en) + 29/29 (100% non-en). Both reported.

**Anti-pattern:** reporting only file-level retrofit rate. The uniqueness invariant operates at DB level; file-level is necessary but not sufficient.

Origin: Phase 4a Checkpoint 2.5 (ι) close report-shape; codified at Phase 6 fold.

#### A.13.19 Capitalization "small word" handling under uniform title-case discipline

When a commission applies title-case transformation across multiple locales (e.g., (λ) topics-taxonomy.json `axes.exercise-type.name.<locale>` capitalization at Phase 5 Sub-item 3), small-word handling has two valid forms:

- **Uniform title-case** — every space-separated word capitalized: "More Or Less", "Tren Del Abecedario", "Picture Sort". Deterministic transform; locale-independent algorithm.
- **AP-style title-case** — small words (a/an/the/and/or/of/to/etc. in en; del/la/el/y in es; etc.) lowercase except at sentence-start. Locale-dependent small-words list.

**How to apply.** Default to uniform title-case for SEO consistency + product-name framing. AP-style title-case is operator-strategic refinement; adopt small-words list per locale ONLY if SEO impact monitoring or operator manual review surfaces preference.

**Empirical anchor:** Phase 5 Q1 plan-time AskUserQuestion locked uniform title-case across all 11 locales. "More Or Less" / "Tren Del Abecedario" land grammatically valid (some style guides permit) but diverge from AP-style. Phase 5 Item 14 fold-queue carries the small-word refinement as future-arc candidate.

Origin: Phase 5 Sub-item 3 Q1 ratification; codified at Phase 6 fold.

#### A.13.20 Retrofit-rerun decision: per-locale need-vs-no-need classification

When a commission ships changes that affect retrofit output for SOME locales but not others, the retrofit-rerun decision splits per-locale: rerun for changed-locale set; skip for unchanged-locale set. NOT a uniform retrofit-all-or-nothing decision.

**How to apply.** At any retrofit-rerun decision point (typically post-Phase commission deliverable that affects emission templates, i18n keys, or taxonomy data):
1. **Classify per-locale.** For each of 11 locales, determine if the commission's deliverables would change retrofit output (string differences, structural differences, etc.). YES → rerun; NO → skip.
2. **Document classification.** Close-out doc records the per-locale decision + reasoning. Skip-locales explicit ("en intentionally not retrofitted at <commission>; future retrofit triggered by separate concern").
3. **Audit-trail.** Future retrofit-rerun decisions cross-reference earlier classifications to establish which locales are at which retrofit-state.

**Why per-locale classification matters.** Bulk-retrofit-all is wasteful when most locales would receive identical bytes back; per-locale-skip preserves operator-attention budget + reduces cache invalidation surface. But silent skip without classification doc creates audit-trail gap — future commission can't tell which locales reflect the latest retrofit state vs which lag.

**Empirical anchor:** Phase 5 Sub-step 7 retrofit-rerun:
- de + es + nl: 95 decks rerun (seo.words.* localization changed retrofit output for these locales)
- en: 2681 decks NOT rerun (English seo.words.* values are the defaults; no string change to existing retrofit output)

Phase 5 close-out doc records the en-not-rerun decision explicitly per Item 15 fold-queue absorption.

**Anti-pattern.** Reflexively retrofit-all on every commission close. Bulk-retrofit-all is the right move only when ALL locales are affected. For commissions affecting subset-of-locales (typical for i18n / taxonomy / per-locale-template work), per-locale classification is the correct discipline.

Origin: Phase 5 Sub-item 2 + 3 + Sub-step 7; codified at Phase 6 fold.

#### A.13.21 Operator-pre-recommendation substrate verification at theme/category selection

When operator pre-recommendation involves theme / category / package selection (e.g., "use these 4 themes" / "these 5 packages" / "4-5 additional themed bundles"), CC verifies candidate items against canonical-state at planning step before locking commission scope. Saves operator-attention by surfacing substrate-state divergence at planning step rather than execution-time.

**How to apply (during any Phase 1 plan step receiving operator pre-recommendation):**

1. **Identify the recommendation's substrate dependencies.** Theme names → `topics-taxonomy.json axes.theme` keys. Category labels → `apps.*.default_subject` values. Package slugs → `docs/lesson-plans/packages/<slug>/` directory. ThemeAxisKey choices → existing `image_themes` table entries.
2. **Empirically query the substrate** before responding to operator. Concrete forms: `node -e "..."` queries against `topics-taxonomy.json`; directory listing at `docs/lesson-plans/packages/` or `docs/lesson-plans/bundles/`; cross-reference against canonical inventory.
3. **Surface divergence as §A.13.6 firing** if substrate-state contradicts operator pre-recommendation. Per §A.13.8 cost-recalibration, do NOT silently accept the pre-recommendation against contradicting substrate — surface for re-adjudication.

**Why this matters.** Operator pre-recommendations frame commission scope at planning step. If the recommendation assumes substrate-state that doesn't hold, the commission ships against wrong substrate (wasted authoring) OR fails at execution (wasted operator-attention re-adjudicating mid-commission). Pre-flight verification at planning step catches the divergence early when re-adjudication cost is low.

**Empirical anchors:**
- **Pillar 2 Arc 6 Phase 1 themeAxisKey verification:** operator pre-recommended 4 themes; Phase 1 verification showed 3 of 4 unverified per `image_themes` substrate; CC self-adjudicated substitute picks per §A.13.8 (zoo-animals + space + tools replacing library + garden + arts_and_crafts). 10th §A.13.6 firing.
- **Pillar 2 Arc 7 Phase 2 saturation finding:** operator framed "4-5 additional themed bundles bringing 48 → ~52-53." Phase 1 empirical query against `topics-taxonomy.json axes.theme` (100 keys; 50 canonical-color) + bundle inventory (48 dirs) revealed 48/50 canonical-color saturation; only `birds_2` + `miscellaneous` unbundled. Surfaced via AskUserQuestion; operator ratified (P2-close-pillar2). 16th §A.13.6 firing.

**Relationship to §A.13.5 + §A.13.6:**
- §A.13.5 Shape A discipline addresses authoring-app boundary substrate verification (per-app emit-site)
- §A.13.6 spec-vs-shipped-contract validation addresses commission-spec boundary
- §A.13.21 (this section) addresses operator-recommendation boundary — the substrate verification at commission-input

The three form a layered defense: substrate verification at app boundary (Shape A) + spec boundary (§A.13.6) + recommendation boundary (§A.13.21).

Origin: Pillar 2 Arc 6 Phase 1 (`bf2dfc3c` + `df1c4ee1` 10th firing) + Pillar 2 Arc 7 Phase 2 saturation finding (`957eb8ff` 16th firing); codified at Phase 6 fold.

#### A.13.22 Audit-doc-vs-canonical-state divergence at commencement-time inspection

Audit documents become stale during commission cycles. At commencement of any work derived from an audit doc, re-verify the audit's empirical claims against canonical-state. Don't trust audit-state at commencement.

**How to apply (at any commission's Phase 1 commencement when work is sourced from a prior audit doc):**

1. **Identify the audit doc's load-bearing empirical claims** (e.g., "5 packages have theme-dir absent" / "84+ NSR-flag entries pending" / "27 unverified apps").
2. **Re-verify each claim against canonical-state at commencement.** Direct grep + file inspection per §A.13.14 Phase 1 Explore-agent fidelity validation; don't trust audit-doc summary at face value.
3. **Surface divergence as §A.13.6 firing** if audit-doc claim contradicts canonical-state. Re-classify per empirical reality before commencing execution.

**Why this matters.** Audit docs capture state at audit-authoring time; commission cycles advance state between audit + commencement (per Items 17 + 20 + 26). Audit-doc-driven work that doesn't re-verify ships against stale state, producing same failure modes as §A.13.6 spec-vs-shipped-contract divergence at recommendation boundary.

**Empirical anchor:** Stream A Arc 2 Phase 1 (P1-C2-only) commission cycle (commit `e87c464c`). Audit doc `docs/lesson-plans/stream-a-arc-2-substrate-audit.md` §1.3 claimed 5 packages had theme-dir absence (school-objects + foods × 5 packages). Edit-time re-verification revealed only 3 of 5 packages had `themeName: foods` OR `themeName: school-objects` (identify-community-helpers + identify-days-of-week + subtract-within-10); the 2 prepositions packages (use-position-vocabulary + use-spatial-position-words) did NOT use `themeName: foods` — they used `themeName: animals` (existing theme) + empty `vocabKeyList` for flashcards (separate failure mode class). 15th §A.13.6 firing at edit-time; 3 valid migrations applied; 2 prepositions packages preserved unchanged and filed for follow-on commission.

**Distinction from §A.13.21:**
- §A.13.21 verifies operator-pre-recommendation substrate at PLAN STEP (before commission scope locks)
- §A.13.22 verifies audit-doc empirical claims at COMMENCEMENT STEP (before execution begins)
- Different inspection boundaries; same underlying §A.13.6 firing pattern

**Cross-references:**
- §A.13.5 Shape A authoring-app substrate verification
- §A.13.6 + §A.13.8 spec-vs-shipped + cost-recalibration paired discipline
- §A.13.14 Phase 1 Explore-agent fidelity validation (recon-quality discipline)
- §A.13.21 operator-pre-recommendation substrate verification

Origin: Stream A Arc 2 Phase 1 audit-doc inaccuracy (`e87c464c` 15th firing); codified at Phase 6 fold.

#### A.13.23 Empirical-saturation as commission-cycle close-point signal

When commission work consumes a finite substrate space (themes, packages, slug variations, axis-keys), saturation of that substrate space signals a natural commission-cycle close-point. Distinct from chronological / milestone-based cycle close — saturation is structural-empirical, not time-driven.

**How to apply (at any commission cycle's next-iteration planning step):**

1. **Identify the commission's substrate space.** What finite resource does the next iteration consume? Themes from `topics-taxonomy.json axes.theme`? Packages from `docs/lesson-plans/packages/`? Slug variations within a (locale, exercise-type) tuple? Bundle axis-keys?
2. **Query substrate consumption + availability.** Empirical count of consumed-vs-available candidates. Above-threshold availability → continue iteration; below-threshold → saturation signal.
3. **Surface saturation as natural close-point** to operator rather than commencing next iteration against speculative/marginal substrate. Per §A.13.21 operator-pre-recommendation substrate verification, surface via AskUserQuestion when divergence appears at planning step.

**Why this matters.** Iteration against saturated substrate produces:
- Marginal-quality additions (the remaining substrate is what was previously skipped for good reason)
- Forced-fit commissions (operator-attention spent justifying iteration against pedagogically weak candidates)
- Artificial milestone-extension (commission cycle continues past natural close, deferring strategic-input surface)

Recognizing saturation produces:
- Clean cycle close at empirical state
- Strategic-input surface at correct moment (next-cycle commission shape determination per (R2) readiness framing)
- Future commission cycle re-opens at empirical trigger (substrate-extension commission OR new pillar emergence) per natural cadence

**Empirical anchors:**
- **Pillar 2 Arc 7 Phase 2 (16th §A.13.6 firing):** `topics-taxonomy.json axes.theme` contained 100 keys (69 non-`_bw` + 31 strict `_bw`); 50 canonical-color themeAxisKeys; 48 already bundled at 48 bundles. Operator pre-recommendation of "4-5 additional themed bundles bringing 48 → ~52-53" empirically incompatible with 48/50 saturation. Only `birds_2` (numeric variant) + `miscellaneous` (catch-all) remained — neither with clean Phase 2 bundle-authoring fit. Operator ratified (P2-close-pillar2); Pillar 2 commission cycle CLOSED at natural close-point per saturation signal.

**Distinction from §A.13.18-19 backfill-rate close-out metric:**
- §A.13.18-19 measures retrofit success rate as percentage (forward-flow correctness restoration)
- §A.13.23 (this section) measures substrate consumption rate as count-against-finite-space (commission-cycle close-point signal)

Different dimensions; both are commission-cycle close-out metrics. §A.13.18-19 governs "how complete is this retrofit"; §A.13.23 governs "is the iteration space saturated."

Origin: Pillar 2 Arc 7 Phase 2 saturation finding (`957eb8ff` Pillar 2 commission cycle CLOSED; 16th §A.13.6 firing); codified at Phase 6 fold.

#### A.13.24 Double-close-out paired commission CLOSED as multi-pillar trajectory milestone

When two commission cycles close at the same paired moment (e.g., Pillar 4 + Pillar 2 commission cycles both reaching CLOSED state simultaneously), the paired-close moment is itself a structural milestone. Captures convergence in commission framework trajectory and surfaces a natural strategic-input window.

**How to apply (at commission cycle scheduling + close-out):**

1. **Recognize when multiple cycles approach natural close at same paired moment.** Schedule as paired close-out per (P3) β shape rather than sequential close-out. Captures multi-pillar significance in shared commit cadence.
2. **Treat the double-close-out moment as strategic-input surface** for next-cycle commission shape determination. Don't commence next-cycle work mid-double-close-out; surface readiness review for operator strategic call.
3. **Document multi-pillar milestone significance** in close-out recon docs (not just per-pillar close-out docs). The convergence is meta-pillar; deserves its own audit trail in working-memory artifacts (e.g., Subscribe-flip readiness review).

**Why this matters.** Sequential close-out treats each pillar's close as isolated event. Double-close-out recognizes that convergence-points in commission framework are themselves significant — they mark trajectory milestones (e.g., "most-advanced launch-trigger Condition state in commission history" per consolidation cycle close). Capturing the milestone in working memory + canonical doctrine prevents loss of context across future sessions.

**Empirical anchor:** consolidation cycle close (2026-05-11): Pillar 4 Arc 3 (ζ) close-out at `6e2b17fa` + Pillar 2 commission cycle close-out at `957eb8ff` shipped at same session. First multi-pillar trajectory milestone in commission history. Subscribe-flip readiness review at `ba9e55c8` codified the milestone significance + surfaced next-cycle strategic-input via 3-surface adjudication batch ((R) readiness state + (N) next-cycle commission shape + (M) marketing-narrative artifact).

**Cross-references:**
- §A.13.11 Operator-strategic adjudication batching at recon-completion — batch readiness review at double-close-out
- §A.13.23 Empirical-saturation close-point signal — saturation often triggers paired close-out
- (P3) β shape paired-commission cadence — double-close-out emerges naturally from sustained β shape

Origin: consolidation cycle close-out (`6e2b17fa` + `957eb8ff` + readiness review at `ba9e55c8`); codified at Phase 6 fold.

#### A.13.25 Bundle cluster taxonomy sub-pattern emergence at scale

At Pillar 2 bundle architecture maturity (~14+ clusters, ~48+ bundles), sub-patterns emerge as natural cluster sub-divisions. The flat cluster taxonomy from early Pillar 2 Arc work doesn't capture relationships visible at scale; sub-patterns are the empirical pattern emergence.

**Sub-pattern classes:**

1. **Paired-cluster patterns** — two bundle clusters composing a broader pillar concept via sub-axis division. Example: **cultural-arts cluster** = music + activities (auditory-arts + recreation/physical-arts sub-axes). The two bundles share parent cluster framing but anchor distinct sub-axes; together they cover the cluster more fully than either alone.

2. **Crossover-bundle patterns** — bundles whose composition bridges two clusters via cross-strand teaching-package selection. Example: a bundle that anchors at one theme but composes packages drawing from multiple clusters (cross-cluster pedagogical bridge). Surfaces when shared teaching packages (e.g., `count-objects-1-to-10` at 27-instance reuse) bridge cluster boundaries naturally.

**How to apply (at any bundle cluster taxonomy scaling commission):**

1. **Audit emergence at scale.** When bundle count approaches ~48+ with cluster count at ~14+, audit for sub-pattern emergence in existing cluster groupings. Don't force flat cluster taxonomy when sub-patterns emerge naturally.
2. **Document sub-patterns in close-out recon.** Sub-patterns are bundle-architecture findings, not arbitrary categorizations. Capture them in commission-cycle close-out docs (e.g., `pillar-2-cycle-close-out.md` §4) so future commission cycles can reference established patterns.
3. **Resist premature sub-pattern authoring.** Don't pre-design sub-patterns before scale-emergence; let them emerge from empirical cluster taxonomy at maturity. Premature design produces forced-fit categorization.

**Why this matters.** Bundle architecture at scale (48+ bundles) admits hierarchical organization (clusters with sub-clusters) that flat enumeration doesn't capture. Sub-pattern recognition enables:
- Cluster expansion via parallel sub-axes (e.g., cultural-arts cluster can extend with dance + visual-arts as additional sub-axes)
- Crossover-bundle commissioning at strategic moments (cross-cluster pedagogical bridges)
- Future Pillar 2 re-open path framing (§16.5.1 + `pillar-2-cycle-close-out.md` §5(a) taxonomy expansion)

**Empirical anchor:** Pillar 2 Arc 6 + Arc 7 commission cycles produced cultural-arts cluster paired-cluster pattern (music + activities). Activities-bundle `bundle.yaml` thematicCoherence section explicitly references "2nd cultural-arts cluster bundle (after music-bundle)" + "Cross-strand cultural-arts cluster bundle parallel to music-bundle but distinguished by physical-recreation anchor" — first explicit paired-cluster sub-pattern documentation in commission audit-trail. 14+ clusters at Pillar 2 cycle close per `pillar-2-cycle-close-out.md` §4.

**Cross-references:**
- §16.5.1 Theme axis-key registration: Path X 1:1 with image-library
- `pillar-2-cycle-close-out.md` §4 strategic reassessment + cluster taxonomy emergence
- `pillar-2-cycle-close-out.md` §5(a) taxonomy expansion future re-open path

Origin: Pillar 2 Arc 6 + Arc 7 commission cycles cultural-arts paired-cluster emergence (`bf2dfc3c` + `df1c4ee1` + `4205ff60` + `f8681da0`); codified at Phase 6 fold.

#### A.13.26 Schema migration timestamp-stratification doctrine

When a database column is added via schema migration to an existing table, pre-migration rows have NULL by definition (the column didn't exist when those rows were inserted). Post-migration rows populate the column correctly via emit-time logic. **Pre-migration NULL residue is structural, not regression.**

Discipline: at any commission cycle that surfaces a DB-state anomaly involving a column added via prior migration, **timestamp-stratify the inventory** before classifying root cause:
- **Pre-migration cohort** (rows with `createdAt < migration_timestamp`): NULL is expected; retrofit pattern per §15.17 salvage scripts if recovery warranted
- **Post-migration cohort** (rows with `createdAt >= migration_timestamp`): NULL indicates emit-time regression OR uniqueness-constraint collision class; investigate emit-site per Shape A discipline

**How to apply (at any commission cycle with DB-state anomaly):**

1. **Identify column-introduction timestamp.** Find the relevant migration: `frontend/prisma/migrations/<timestamp>_<name>/migration.sql`. The migration's filename timestamp anchors pre-vs-post-migration cohort boundary.
2. **Stratify the anomaly inventory by `createdAt` against migration timestamp.** Per-locale + per-cohort breakdown:
   - Pre-migration cohort: structurally NULL (expected)
   - Post-migration cohort: emit-correctness check needed
3. **Classify root cause per cohort.** Pre-migration: structural residue (consider retrofit per §15.17 OR accept as bounded state). Post-migration: regression class requires Shape A authoring fix per §A.13.5.

**Why this matters.** Without timestamp-stratification, pre-migration residue can be misclassified as regression-class, producing wasted Shape A fix work + operator-attention spent on emit-site investigation that's not the root cause. Timestamp-stratification is a 1-query inventory operation; saves operator-strategic time when DB-state anomaly surfaces.

**Empirical anchor:** (μ) Phase 1 revised diagnostic (`0e51ba8d`). Original Phase 1 (`f6f8ea38`) misclassified 1,288 en NULL title_hash decks as "authoring-side regression at 10 §14.10 apps emitting identical titles." Phase 1 revised diagnostic ran timestamp-distribution analysis:
- **Pre-2026-05-09 (migration date):** 1,288 en + 195 Tier 3+4 = 1,483 NULL (pre-migration residue per schema migration `20260509083000_add_seo_hash_columns`)
- **Post-2026-05-09:** 1,202 new en publishes; 100% title_hash backfill correct by construction

The 5.5pp en backfill drop (74.7% → 69.2%) was statistical artifact of denominator growth (new publishes added to total count while NULL residue stayed fixed). Recalibration via §A.13.8 surfaced (2a-revised) Retrofit-only path; saved ~3 sessions of misallocated effort on 10-app Shape A fix that wasn't needed (apps were already correct post-migration).

**Cross-references:**
- §A.5.1 Schema migrations require a two-step deploy (operational protocol)
- §15.17 Salvage scripts pattern (`rewrite-manifest-<field>.js`) — retrofit pattern for pre-migration residue
- §A.13.5 Shape A canonical authoring pattern — post-migration emit-correctness defense
- §A.13.6 Spec-vs-shipped-contract validation — paired discipline for surfacing classification errors

Origin: (μ) Phase 1 revised diagnostic (`0e51ba8d`); reframed at Phase 6 fold.

#### A.13.27 Trajectory-vs-static-state pricing inspection

When classifying a trajectory-state change (e.g., backfill-rate drop; per-locale coverage shift; saturation-rate change) as regression vs natural-progression, inspect denominator AND numerator separately before classifying. Trajectory readings are percentage-of-denominator readings that can drift due to denominator growth even with fixed numerator. **Same numerator + growing denominator produces declining percentage that LOOKS like regression but is statistical artifact.**

**How to apply (at any commission cycle where trajectory-rate change surfaces):**

1. **Decompose the trajectory reading into numerator + denominator separately.** What's the absolute count (numerator)? What's the total count (denominator)? Has denominator grown since last reading?
2. **Compare denominator-growth vs numerator-growth between readings.** If numerator stayed fixed but denominator grew, the percentage decline is statistical-artifact-of-growth, NOT regression class.
3. **Recalibrate classification per inspection.** Static-state regression vs trajectory-artifact have different root causes + different recovery paths. Don't classify regression until denominator + numerator are inspected separately.

**Why this matters.** Trajectory readings without denominator-numerator inspection produce false-positive regression classifications. Cost: operator-attention spent on root-cause investigation that's looking for non-existent regression. Saved by 1-step pre-classification inspection.

**Empirical anchor:** (μ) Phase 1 framing. The 5.5pp en backfill drop (74.7% → 69.2%) was assistant-side wrong-pricing of the drop as structural-regression-class. Operator pushback ("the Item D framing I drafted at prior turn priced the 5.5pp drop as structural-regression class. I argued for diagnostic-first explicitly *because* the drop signaled forward-flow correctness regression — that argument was wrong") surfaced the assistant-side discipline gap. Numerator (NULL count) stayed fixed at 1,483 entries; denominator (total en deck count) grew from 3,870 to 4,183 during the trajectory window. Same NULL count + growing total = lower percentage, NOT regression.

**Operator-side framing (per (μ) revised diagnostic commit message):** "Trajectory-vs-static-state pricing requires denominator-vs-numerator inspection before classifying as regression."

**Cross-references:**
- §A.13.6 Spec-vs-shipped-contract validation — paired discipline at execution
- §A.13.8 Adjudication-reversal discipline — recalibrate when cost-asymmetry surfaces
- §A.13.26 Schema migration timestamp-stratification — common source of trajectory-artifact (denominator growth from new post-migration publishes)
- §A.13.11 Operator-strategic adjudication batching — surface recalibration at batch boundary

Origin: (μ) Phase 1 framing + operator pushback on wrong-pricing (`0e51ba8d`); codified at Phase 6 fold.

#### A.13.28 Phase 4 production-canonical-path verification at deploy boundary

At Phase 4 production-ship deploy boundary, verify the actual production-canonical-path (the URL pattern serving real traffic) via curl-spot-check **before** declaring Phase 4 complete. Catches deploy-completion-vs-actual-serving gaps that smoke tests miss.

**How to apply (at any Phase 4 production-ship commission):**

1. **Identify production-canonical-path** per §17.4 / §15.7 routing-contract docs. Concrete URL pattern: `https://www.lessoncraftstudio.com/<locale>/<route>/<slug>/`
2. **Sample 3-5 representative URLs** from the deploy's affected scope (e.g., one per locale; one per app per surface).
3. **`curl -I` each URL** post-deploy. Expected: HTTP 200 with correct content-type. Investigate any 404 / 301 / 500 / unexpected redirect.
4. **Verify content via curl + grep** for representative content markers (e.g., `<title>` content matches expected pattern; OG tags present; schema.org JSON-LD present).
5. **Document verification audit-trail** in commission close-out doc — curl-command + observed output per sampled URL.

**Why this matters.** Deploy-completion (deploy.sh exits 0; smoke tests pass) does NOT guarantee actual-production-serving (real traffic hits production-canonical-path + receives correct response). Gaps surface at:
- nginx config divergence (e.g., new location-block exists in git but not yet active on Hetzner)
- Symlink-swap timing (atomic-swap completed but cache-stale at edge)
- Cloudflare cache-invalidation latency (5-min TTL per §15.8; first request post-deploy hits stale cache)
- DB-state-vs-FS-state divergence (per §15.10 archive contract — DB row published but FS asset missing)

Curl-spot-check at deploy boundary catches all four classes with bounded effort (~2-5 min for 3-5 sample URLs).

**Empirical anchors:**
- Pillar 4 Arc 2 Phase 4 production ship (`e9e4d04a`): curl-spot-check verified UI routes + access-check API + CDN regression all 200 across en + de + fi sample
- Brief B Phase 1 catalog deck route deploy (`4b91adc0`): curl-spot-check verified deck route serving via nginx location-block
- (μ) 308 404 class verification (per §A.13.22 + Component (N3) of consolidation cycle): curl-spot-check surfaces production-canonical-path gaps at retrofit + audit boundaries

**Cross-references:**
- §A.5 Deployment (TWO-STEP deploy protocol)
- §A.5.1 Schema migrations require a two-step deploy
- §17.4 Production routing-contract (locale-prefixed; native-language slug; trailing slash)
- §15.7 Catalog deck route nginx location-block + atomic symlink swap
- §15.8 Cloudflare cache-invalidation policy (5-min TTL post-2026-04-30)

Origin: Pillar 4 Arc 2 Phase 4 + Brief B Phase 1 + (μ) Phase 2 retrofit production-canonical-path verification audit-trail; codified at Phase 6 fold.

#### A.13.29 Ground-truth source-citation discipline for behavior-describing content

When authoring content (prose templates, per-mode explanations, UI-mechanic guidance, kid-interaction descriptions, correct-answer-shape summaries) that describes the BEHAVIOR of an external component the author has not directly observed, the content MUST cite the source code it was verified against. Behavior-describing content authored from mental-model assumption alone is a defect class equivalent to TypeScript `any`: structurally permitted, semantically wrong.

**How to apply (any commission authoring behavior-describing content):**

1. **Phase 1 MUST verify against actual source code BEFORE authoring.** Launch an Explore agent (or direct Read+Grep) against `REFERENCE APPS/<app>.html` or the equivalent source file. Identify: mode dispatch (which params trigger which rendering); kid interaction (tap | circle | write | draw line | drag); answer shape; visual feedback; correctness criteria.
2. **Cite source per entry.** Every per-entry comment block MUST carry:
   ```
   // Verified against: REFERENCE APPS/<app>.html lines X-Y
   // Mode dispatch: <which params trigger which rendering>
   // Kid interaction: <tap | circle | write | draw line | drag>
   // Audited <YYYY-MM-DD> against actual app source.
   ```
3. **Empty-citation OR missing-comment-block = defect.** Reviewer (operator OR self-audit) rejects on sight. Same severity as a TypeScript `any` or a missing test for a new code path.
4. **Re-verify on source change.** When the cited source component's rendering logic changes, grep for the cited line range; if shifted, re-audit the rendering behavior; update template prose + citation line range. Stale citations are silent drift accumulators.

**Cross-references (verification-hygiene doctrine family):**

- §A.13.6 spec-vs-shipped-contract validation (code+spec layer)
- §A.13.14 Phase 1 Explore-agent fidelity validation (exploration-quality layer)
- §A.13.21 Operator-pre-recommendation substrate verification (input boundary layer)
- §A.13.22 Audit-doc-vs-canonical-state divergence (audit-document layer)
- §A.13.29 (this section) — behavior-description layer

**Empirical anchor:** Sub-Phase 2.4 commit `7eac8f50` (25th §A.13.6 firing). Pre-fix state: `exercise-answer-templates.ts` shipped 10 per-(appName, exerciseMode) prose templates authored assumption-based. Phase 1 Explore audit ground-truthed all 10 against actual `REFERENCE APPS` source; 4 of 10 templates DRIFTED — `find-and-count` (assumed per-row counting; actual is category-counting with legend blanks), `more-less` (assumed circle-the-group; actual is tap one of three symbol buttons >, <, =), `word-guess` (used wrong param name "clue-density" as content descriptor; actual `difficulty` parameter sets letter-reveal ratio), `odd-one-out` (assumed circle-the-odd-one; actual is choice-tap one of 4 image buttons; odd image is from a different paired theme, not "unrelated generically"). Post-fix state: discipline preamble + per-template source-citation comments + 4 drifted templates rewritten. Doctrine added 2026-05-11 to prevent recurrence.

**Generalization beyond per-app templates:** applies to ANY content authoring where the author describes behavior they haven't directly observed:

- Per-(appName, exerciseMode) prose templates (the surfaced case)
- Parent-letter / take-home-letter prose IF it claims specific exercise mechanics
- Sentence-strips guidance IF it claims specific UI layouts (sentence-frame templates themselves are operator-authored verbatim port = ground-truth by construction)
- Any future material-generator copy describing kid interactions, correct-answer shapes, or app-specific UI conventions
- Per-app "what does this generate" docs (admin tooling copy, marketing copy, support content, FAQ entries)

**File-level preamble pattern:** `frontend/scripts/lib/exercise-answer-templates.ts` lines 1-50 (Sub-Phase 2.4 canonical reference). Future content-authoring files of similar shape MUST adopt the same preamble pattern.

**Memory cross-reference:** `feedback_template_ground_truth_discipline.md` (sibling of `feedback_documentation_against_real_emitter.md` for the documentation/config layer; both describe the same pattern at different layers — claims verified against real state before relied upon).

Origin: Sub-Phase 2.4 (`7eac8f50`) + multi-mechanism discipline lock commission this session.

#### A.13.30 Audience-perspective discipline for user-facing content

All user-facing content (i18n message strings, PDF text, page descriptions, UI labels, download-button copy, modal text, error messages) MUST be written from the reader's perspective — what they get, what they do with it — never how the system produces it internally. Audience-blind copy reads as engineer-talk and breaks reader trust at first contact.

**How to apply (any commission authoring user-facing copy):**

1. **Identify the reader role explicitly.** Before authoring, name the audience: K-3 teacher? Parent of a K-3 child? Subscriber on the admin dashboard? Each role has a different vocabulary and concerns.
2. **Use plain reader-vocabulary, never operator-internal taxonomy.** Specifically forbidden in teacher/parent-facing copy:
   - Internal taxonomy names: `composedExercises`, `materialSlug`, `framePreset`, `package metadata`, `pedagogical framing`, `curriculum standards` (as a label)
   - Implementation primitives: `IMAGE_VOCABULARY`, `NUMBER_WORDS`, `auto-resolved`, `gender data`, `locale resolution`, `target language` (use "the language your kids are learning" instead)
   - Architectural concepts: `packages`, `decks`, `generators`, `ground-truth`, `locales-as-codes`, `print pipeline`, `mass-run`
   - Aesthetic-meta descriptors: `warm-tone summary`, `picture-cue grid`, `multi-strip printable` (describe the thing, not your characterization of it)
3. **Describe what the reader gets + what they DO with it.** "Print, cut along the dashed lines, and use the cards for counting" — not "Image-only cards for cut-and-handle classroom work".
4. **Third-party brand stamps in private external communications are forbidden.** Parent letters, take-home content, family-facing materials a teacher sends home — these are private teacher-parent communication. Never stamp them with platform branding. Classroom-internal materials (flashcards, worksheets, answer keys for the teacher's own use) MAY carry attribution per the §14.3 attribution-neutrality contract; private external communication MAY NOT.
5. **Self-audit before commit.** Read every line out loud as the reader would. If the reader role would not understand a word, would think "what is this software trying to tell me", or would not trust the document, the copy fails.

**Cross-references (verification-hygiene doctrine family):**

- §A.13.6 spec-vs-shipped-contract validation (code+spec layer)
- §A.13.14 Phase 1 Explore-agent fidelity validation (exploration-quality layer)
- §A.13.21 Operator-pre-recommendation substrate verification (input boundary layer)
- §A.13.22 Audit-doc-vs-canonical-state divergence (audit-document layer)
- §A.13.29 Ground-truth source-citation discipline (behavior-description layer)
- §A.13.30 (this section) — audience-perspective layer

**Empirical anchor:** Sub-Phase 2.5 commit (this session). Pre-fix state: 7 teaching-package section descriptions × 4 Tier 1+2 locales = 28 entries all written from engineering perspective, leaking jargon (`IMAGE_VOCABULARY-driven article and gender resolution`, `composed exercises`, `pedagogical framing`, `target-language labels`, `auto-resolved from the vocabulary's gender data`). Parent-letter PDF shipped with `LessonCraftStudio` brand stamp at both header and footer of letters teachers send home to parents. Operator surfaced as absurd + unprofessional. Post-fix state: branding removed from parent-letter; 28 i18n entries rewritten in plain teacher-vocabulary; discipline established at §A.13.30.

**Generalization:** Applies forward to ANY user-facing content authoring — homepage hero copy, deck-page descriptions, blog/guide articles, FAQ entries, support content, modal text, error messages, email templates, admin tooling labels surfaced to subscribers. Every commission that touches reader-visible copy must self-audit against the §A.13.30 checklist before shipping.

**Memory cross-reference:** `feedback_audience_perspective_user_facing_content.md` (sibling of `feedback_template_ground_truth_discipline.md` at the audience-perspective layer of the discipline family).

Origin: Sub-Phase 2.5 multi-mechanism discipline lock commission this session.

#### A.13.31 Per-instance content-awareness discipline

When a commission's scope NAMES a specific package, deck, topic, lesson plan, material instance, or any other content artifact identified by slug / ID / name, Phase 1 MUST read the canonical artifact for that named instance BEFORE Phase 2 design begins. The artifact's NAME is a label; its YAML / manifest / data file is the truth. Authoring content ABOUT a specific named artifact without reading that artifact's canonical data is a defect class.

**How to apply (any commission whose scope names a specific content artifact):**

1. **Identify the named instance(s).** The commission spec, operator message, or IDE-open signal names one or more specific artifacts (`count-objects-1-to-10` package, `compare-by-weight` package, `/de/decks/addition-tiere-kindergarten/` deck, `addition-kindergarten-spanish` topic, the parent-letter material for package X).
2. **Read the canonical artifact for each named instance BEFORE Phase 2.** Canonical paths:
   - Package → `docs/lesson-plans/packages/<slug>/package.yaml` (full file; not just the title/description fields)
   - Topic → `frontend/config/topics-taxonomy.json` axis entry for the topic axis-key + grep packages composing the topic
   - Deck → manifest JSON + bundle + exercise data at the canonical asset path
   - Lesson plan → `docs/lesson-plans/packages/<slug>/lessons/<lesson>.yaml` (if it exists at the canonical path)
   - Material instance → the package.yaml's `materials:` entry for that specific (package, materialSlug) tuple
3. **No inference from name.** The package name `compare-by-weight` is a label; its YAML reveals the actual content (warmup routine, contentActivity, composed exercises, materials, assessment criteria). The slug `count-objects-1-to-10` hints at the topic but doesn't reveal the specific `themeSelect: animals` config that drives the composed exercises. The topic identifier `addition-kindergarten-spanish` names a topic but doesn't enumerate the specific decks composing it. Always read past the name.
4. **Cite canonical artifact paths in commission close-out / commit message.** "Verified against `docs/lesson-plans/packages/compare-by-weight/package.yaml`" or equivalent.
5. **Doctrine ALSO applies to operator's IDE-open signals.** When the operator opens a specific package YAML / deck file / config in the IDE alongside a commission, Phase 1 reads that file as part of context-establishment — even if commission scope doesn't explicitly name it. The IDE-open signal is contextual intent.

**Cross-references (verification-hygiene doctrine family):**

- §A.13.6 spec-vs-shipped-contract validation (code+spec layer)
- §A.13.14 Phase 1 Explore-agent fidelity validation (exploration-quality layer)
- §A.13.21 Operator-pre-recommendation substrate verification (input boundary layer)
- §A.13.22 Audit-doc-vs-canonical-state divergence (audit-document layer)
- §A.13.29 Ground-truth source-citation discipline (behavior-description layer)
- §A.13.30 Audience-perspective discipline (reader-perspective layer)
- §A.13.31 (this section) — per-instance content-awareness layer

The three content-discipline doctrines (§A.13.29 / §A.13.30 / §A.13.31) form a complete family covering source / reader / instance dimensions of every content commission:

- §A.13.29 catches assumption-based BEHAVIOR descriptions (per-(app, mode) templates)
- §A.13.30 catches engineer-perspective READER copy (i18n, page descriptions, UI labels)
- §A.13.31 catches authoring content ABOUT a specific named INSTANCE without reading its data

**Empirical anchor:** This session's discipline-lock commission. Retrospective framing: Sub-Phase 2.4 find-and-count drift was partly per-instance content-blindness — I described what `find-and-count|unified` exercises do in general (covered by §A.13.29) without reading `docs/lesson-plans/packages/count-objects-1-to-10/package.yaml` to verify which specific configuration the C5 package actually uses (`themeSelect: animals` triggers object-counting, not letter-spotting). IDE-open signal at this commission's surface: `docs/lesson-plans/packages/compare-by-weight/package.yaml` open in operator's IDE. Reading the YAML revealed substantive package data (Preschool/Kindergarten weight-comparison teaching, direct-lifting routine, comparative vocabulary heavier/lighter/same-weight, composes against big-small + matching apps, 5 exercises + 7 materials over a 1-week unit) that the package NAME `compare-by-weight` only labels — never describes.

**Generalization:** any time a commission's scope names a specific instance, the instance's canonical data file is the source-of-truth. Read past the name. Cite the artifact path. The discipline scales: per-package content authoring, per-deck SEO surfaces, per-topic destination pages, per-material customization, per-lesson-plan authoring — every named-instance commission triggers the same Phase 1 read-the-artifact pre-flight.

**Memory cross-reference:** `feedback_per_instance_content_awareness.md` (third sibling of the content-discipline feedback memory family, alongside `feedback_template_ground_truth_discipline.md` for §A.13.29 and `feedback_audience_perspective_user_facing_content.md` for §A.13.30).

Origin: Multi-mechanism discipline lock commission this session.

#### A.13.32 Canonical-artifact-grounding-at-composition-time discipline

Commission specs that name specific canonical artifacts (taxonomy slugs, generator inventory, per-package material lists, per-package YAML configs) MUST ground composition-time content against canonical SoT at the commission-spec authoring step — NOT against prior-session close-out summaries, carried-forward operator-facing prompts, or assumed inventory state. The discipline is the composition-time complement to §A.13.21 / §A.13.22 / §A.13.31 substrate verification at recommendation / audit-doc / per-instance content boundaries.

**Canonical SoT paths:**
- Taxonomy slugs → `frontend/config/learning-targets.json` strand/target enumeration
- Per-package YAML → `docs/lesson-plans/packages/<slug>/package.yaml`
- Generator inventory → canonical generator code paths + §A.13.35 canonical-mode tables

**Four sub-doctrines (all consolidated here):**

1. **Slug-grounding.** Taxonomy slugs in commission specs verify against `learning-targets.json` strand/target enumeration BEFORE locking spec. Naming-from-memory or naming-from-prior-session-close-out is the defect class.
2. **Generator-inventory completeness.** At any commission referencing the canonical generator set, verify the inventory at composition time, not against prior count or assumed enumeration. New generators added since the last reference are silent expansions of scope.
3. **Per-package × per-generator matrix as mass-run scope.** Mass-run commission scope IS the full (package, generator) matrix, NOT the materials-yaml union. A package's `materials:` list enumerates the materials it composes; the mass-run scope at a generator-extension commission is every package whose class-template includes that generator, regardless of whether the specific package YAML currently references it.
4. **Generator-executability verification.** YAML-reference-existence is insufficient. A package YAML can reference a generator that doesn't yet exist OR whose code path doesn't yet handle the package's parameters. Verify the actual code path the generator runs against — not just the reference at the YAML.

**How to apply (Phase 0 of any commission referencing canonical artifacts):**
- Read the canonical SoT for each named artifact (taxonomy entry, package YAML, generator code path).
- Cross-reference against the commission spec's claims. Surface divergence as §A.13.6 firing BEFORE Phase 1 execution.
- Cite canonical artifact paths in commission spec + close-out.

**Empirical anchors (4 Arc 17 firings):**
- Arc 17 Phase 1.3 slug-grounding firing — commission-spec slug naming diverged from `learning-targets.json` strand enumeration; surfaced at Phase 1 commencement.
- Arc 17 P2 numeral-cards generator-inventory firing — mass-run spec assumed inventory matching prior session's count; canonical state had additional generators added since.
- Arc 17 P2 identify-community-places matrix-scope firing — spec assumed mass-run scope as materials-yaml union per package; canonical scope is per-package × per-generator matrix (broader by construction).
- Arc 17 Phase 1.4 clock-mat generator-executability firing — package YAML references clock-mat generator; code path didn't exist OR didn't handle the package's parameters; YAML-reference-existence was insufficient.

**When-to-apply trigger:** at any commission whose spec names canonical artifacts (taxonomy slugs / package YAMLs / generator inventory / class-template references). Phase 0 commission-spec authoring step performs the verification; divergence halts spec-lock and routes to operator-strategic re-adjudication per §A.13.6 paired discipline.

**Cross-references (substrate-verification family):**
- §A.13.21 Operator-pre-recommendation substrate verification (recommendation boundary)
- §A.13.22 Audit-doc-vs-canonical-state divergence (audit-doc boundary)
- §A.13.31 Per-instance content-awareness (per-instance content boundary)
- §A.13.32 (this section) — canonical-artifact at composition-spec boundary

The four together form the substrate-verification family at distinct inspection boundaries. §A.13.32 is the earliest-boundary defense in the family: §A.13.21 fires at recommendation, §A.13.22 at audit-doc carry-forward, §A.13.31 at per-instance content authoring, §A.13.32 at commission-spec composition itself — before any of the downstream boundaries get a chance to fire.

Origin: Arc 17 Phase 1.3 + P2 numeral-cards + P2 identify-community-places + Phase 1.4 clock-mat — four firings in single arc cite already-backlogged candidates as preventable-causes; doctrine fold absorbs the pattern.

#### A.13.33 Phase 0 explicit-methodology reporting at substrate audit

When Phase 0 substrate-audit outputs reference counts that could diverge by methodology (total-catalog vs strand-subset; en-only vs en+pt; pre-arc vs post-arc; published-only vs all-status; etc.), report methodology explicitly in audit findings. Silent methodology shifts between successive phases produce baseline-divergence surfaces that cost operator-attention to reconcile at later-phase commencement.

**How to apply (Phase 0 of any commission emitting count-based findings):**

Audit-report's findings section explicitly states for every count:
1. **Denominator** — what's being divided into (e.g., "total catalog 167 packages" vs "logic-strand subset 22 packages")
2. **Locale scope** — en-only / en+pt / all-locales / per-locale stratified
3. **Status filter** — published-only / all-status / pre-publish-staging-only
4. **Temporal anchor** — pre-arc / post-arc / at-commencement / latest-known

Two successive Phase 0 audits with the same denominator-label but different scope underneath is the silent failure mode. Explicit-methodology reporting prevents it by construction.

**Empirical anchor:** Arc 17 Phase 1.3 → 1.4 → 1.5 baseline shifts where each phase's Phase 0 counts used different denominators without disclosure:
- Phase 1.3 used strand-subset denominator (logic-strand only)
- Phase 1.4 used total-catalog denominator (all 167 packages)
- Phase 1.5 used en+pt union denominator (locale-bilingual subset)

Reconciliation cost operator-attention at Phase 1.5 commencement; explicit-methodology reporting at Phase 1.3 + 1.4 close-outs would have surfaced the denominator shifts at the earlier boundary.

**When-to-apply trigger:** at any Phase 0 audit emitting count-based findings, regardless of audit shape. Counts that look comparable across phases must be denominator-comparable, or denominator differences must be disclosed.

**Cross-references (count-reporting discipline family):**
- §A.13.18 Backfill-rate as commission close-out metric (per-locale stratification + file-level-vs-DB-level distinction)
- §A.13.27 Trajectory-vs-static-state pricing inspection (denominator-vs-numerator inspection at trajectory-rate change)
- §A.13.33 (this section) — methodology disclosure at substrate audit

The three together govern count-reporting discipline at audit / close-out / trajectory-reading boundaries. §A.13.33 is the substrate-audit-time complement to §A.13.27's trajectory-time inspection: the same denominator-vs-numerator decomposition discipline applies at both moments, surfaced explicitly when methodology could diverge.

Origin: Arc 17 Phase 1.3 → 1.4 → 1.5 baseline-shift reconciliation.

#### A.13.34 Parallel-strand-framing pattern for cross-strand content overlap

When an existing package covers content that overlaps a Phase X canonical fill at the observable-activity layer, default to surfacing the parallel framing distinction in `compositionalRationale` rather than defer-or-skip. Two packages can coexist as parallel strand framings of the same observable activity when each frames the content under a distinct strand's pedagogy.

**The pattern.** An observable activity (e.g., "the kid reads the clock") can be the surface for content authored under multiple strands' pedagogy:
- One package frames it under measurement strand (clock-mat manipulative-first; physical manipulation of clock pieces)
- Another package frames it under telling-time strand (productive vocabulary; speaking the time aloud)

Both packages have legitimate strand-canonical pedagogy; both ship at filesystem level; `compositionalRationale` in each names the strand-framing distinction explicitly so future commissions don't conflate the two as duplicates.

**Anti-pattern: defer-or-skip on observable-activity overlap.** Observable-activity overlap alone does NOT mean a package is duplicate. The strand-framing distinction is the canonical pedagogical reality — different strands' canonical pedagogy can route through the same observable surface. Defer-or-skip at observable-activity overlap silently drops legitimate strand coverage.

**How to apply (Phase 1 of any commission step where canonical fill overlaps existing package):**

1. **Identify the existing package's strand framing.** Read its `compositionalRationale` + strand assignment. (Per §A.13.31, the YAML reveals what the name only labels.)
2. **Identify the new package's strand framing.** Per the commission's canonical-fill spec.
3. **Compare strand framings.** If distinct, the packages are parallel strand framings — both ship; each `compositionalRationale` names the distinction. If identical, the new package IS a duplicate — defer-or-skip is correct.
4. **Ratify with operator at Phase 1 close** if the framing distinction is non-trivial (e.g., closely-adjacent strands; emerging strand pattern).

**Empirical anchor:** Arc 17 Phase 1.4 read-time-vs-tell-time pattern. Observable activity "the kid reads the clock" overlapped existing tell-time package framed under telling-time-productive-vocabulary strand. New read-time package framed under measurement strand (clock-mat manipulative-first) coexisted; both shipped at filesystem level; each `compositionalRationale` names the strand-framing distinction. Initial draft proposed defer-or-skip on observable-activity overlap; parallel-strand-framing surface caught the duplicate-vs-parallel distinction before authoring decision locked.

**When-to-apply trigger:** at any Phase 1 step where canonical-fill spec's observable activity overlaps existing package. Default to parallel-strand-framing inspection BEFORE defaulting to defer-or-skip.

**Cross-references:** §A.13.31 (per-instance content-awareness) — the existing package's strand framing is in its canonical artifact, NOT inferrable from the slug or activity name. Parallel-strand-framing requires §A.13.31's discipline as a prerequisite.

Origin: Arc 17 Phase 1.4 read-time-vs-tell-time pattern surfacing.

#### A.13.35 Canonical generator-mode-verification at extension boundaries

When extending a generator with new modes OR referencing a generator's modes from commission spec, verify against the canonical mode enumeration at the generator's source code AND maintain a versioned canonical-mode list in CLAUDE.md per generator. Inventing new modes outside the canonical set without operator-strategic ratification + canonical-list amendment is structural drift.

**Maintenance rule.** At any generator-extension commission, amend the canonical-state table below BEFORE shipping the extension. Future commissions reference this table at Phase 1 audit to confirm scope.

**Current canonical state of record (Arc 17 close):**

| Generator | Canonical modes |
|---|---|
| `manipulative-cut-outs` | `single-repeat`, `base-ten-blocks`, `3d-shape-nets`, `counters`, `clock-pieces` |

(Additional generators' mode enumerations folded into this table as future commissions surface them. The pattern: generator-name + canonical-mode list as of latest extension.)

**How to apply:**

- **At commission referencing generator modes in spec:** Phase 1 audit reads the canonical-mode table here AND grep-verifies against the generator's source code. Surface divergence as §A.13.6 firing.
- **At generator-extension commission:** amend the canonical-mode table in this section as part of the extension commit. Table-amendment is a load-bearing artifact, not a documentation afterthought — future commissions read this table as canonical.
- **At Phase 1 inventory step where mode enumeration is load-bearing:** cross-reference table + source. If the table is stale relative to source, that's a §A.13.6 firing pointing at the prior extension commission's failed table-amendment discipline.

**Empirical anchor:** Arc 17 Phase 1.4 canonical mode-verification surfaced `clock-pieces` as the 5th canonical manipulative-cut-outs mode. Pre-Arc-17 generator extension had added `clock-pieces` to the source code; canonical-state table in CLAUDE.md did not exist at the time (this section establishes it). Documenting forward as canonical-state surface prevents future commissions from re-inventing OR re-discovering existing modes.

**When-to-apply trigger:** at any (a) commission referencing generator modes in spec; (b) generator-extension commission adding new modes; (c) Phase 1 inventory step where mode enumeration is load-bearing.

**Cross-references:** §A.13.32 (canonical-artifact-grounding-at-composition-time) — generator-mode-verification is the generator-side specialization of canonical-artifact-grounding. The canonical-mode table here IS the artifact §A.13.32 grounds against.

Origin: Arc 17 Phase 1.4 canonical mode-verification + forward-looking table establishment.

#### A.13.36 CC↔assistant cooperation cadence within commission

Per-package pedagogical-judgment + class-conditional adjudication resolves between CC + assistant within a commission, NOT through operator routing. Operator routing is reserved for (a) phase-boundary ratification, (b) strategic-direction adjudication, (c) explicit-delegation surface adjudication (per §3.4 adjudicator-forward). Implicit operator routing on per-package adjudication wastes operator-attention proportional to package count.

**The cadence.**

- **Per-package pedagogical-judgment** (which strand frames this content; which class-template applies; which materials compose; which canonical-fill ordering serves the launch envelope): CC drafts; assistant reviews substantively; CC revises; iterate to exemplar grade. Operator does not route.
- **Class-conditional adjudication** (does this package fit Numeracy 7 / Literacy 8 / Vocabulary 8 / World-knowledge 7 / SEL case-by-case / Logic 8 template? per §A.13.37): CC reads the class-conditional table; applies template; surfaces deviations to assistant for ratification. Operator does not route.
- **Phase-boundary ratification** (arc-close commit; commission spec lock; Phase N → N+1 transition): routes to operator. The phase-boundary is the operator-attention surface, not the per-package work within a phase.
- **Strategic-direction adjudication** (Pillar 5 mass-run scope; launch-envelope lock; cross-pillar prioritization; new pillar emergence): routes to operator.
- **Explicit-delegation moments** (operator says "you choose" / "make the call" / "decide"): adjudicator-forward per §3.4; CC OR assistant locks per delegation; does not re-route to operator.

**Anti-pattern:** "I drafted X for package Y; please confirm" per package across an N-package commission. Operator-attention cost scales with N; cooperation-cadence cost is bounded by phase count. The implicit operator-routing pattern surfaces as commission-completion latency proportional to per-package routing roundtrips.

**Empirical validation:** 5 Arc 17 phases (Phase 1.1 + 1.2 + 1.3 + 1.4 + 1.5) + Arc 14 / 15 / 16 — CC↔assistant cooperation resolved per-package pedagogical-judgment, class-conditional materials selection, parallel-strand-framing decisions, and canonical-fill prioritization without operator routing. Operator routing appeared at: arc-close phase-boundary ratification, strategic-direction questions (Pillar 5 mass-run scope, launch-envelope lock, double-close-out trajectory moments), explicit-delegation moments.

**When-to-apply trigger:** at any per-package adjudication within commission scope. Resolve between CC + assistant first; surface to operator only if (a) operator-strategic dimension surfaces OR (b) explicit-delegation moment is the appropriate disposition.

**Cross-references:**
- §3.4 (adjudicator-forward decision-locking) — governs explicit-delegation moments within the cadence
- §A.13.11 (operator-strategic adjudication batching at recon-completion) — when operator routing is appropriate, batch at phase-boundary rather than streaming
- §A.13.21 (operator-pre-recommendation substrate verification) — operator-pre-recommendation does NOT mean per-package routing; substrate verification at recommendation boundary IS the operator-routing surface

Origin: Arc 17 cycle 5-phase empirical validation + canonical correction from prior cycle's implicit per-package operator-routing pattern.

#### A.13.37 Class-conditional disposition pattern as canonical materials composition gate

At authoring time for any teaching-package, the materials composition is dictated by package class per a fixed canonical table. The table IS the gate: the materials list ships against the class-template, not against per-package improvisation. Deviations require explicit `compositionalRationale` rationale + assistant ratification at Phase 1 close.

**Canonical class-conditional disposition table (Arc 16+17 empirical lock):**

| Package class | Materials count | Composition |
|---|---:|---|
| Numeracy | 7 | flashcards, picture-cards, place-value-mat, vocabulary-tracing-strips, manipulative-cut-outs, parent-take-home-letter, answer-key |
| Literacy | 8 | (class-template per established Arc 16 patterns; see canonical package YAMLs at `docs/lesson-plans/packages/identify-letter-sounds-vowels/` and siblings) |
| Vocabulary | 8 | (class-template per established Arc 16 patterns; see canonical package YAMLs) |
| World-knowledge | 7 | (class-template per established Arc 17 patterns; see canonical package YAMLs at `docs/lesson-plans/packages/identify-living-vs-nonliving/` and siblings) |
| SEL | case-by-case | strand-specific composition; default to PSED-class-template when applicable; otherwise per-strand canonical |
| Logic | 8 | Arc 17 Phase 1.1 logic-class canonical composition: standard 7 + matching-mat (logic-class addition) |

**How to apply (Phase 1 of any teaching-package authoring step):**

1. **Identify the package class** per its strand assignment.
2. **Read the class-conditional row** in the table above.
3. **Compose materials against the class-template.** Default disposition: identical to class-template; no improvisation.
4. **Surface deviations at Phase 1 close.** If the package legitimately needs a deviation (e.g., parallel-strand-framing per §A.13.34 imposes a different composition; per-package pedagogical-judgment surfaces a load-bearing class-template miss), the deviation MUST be ratified at Phase 1 close with explicit rationale in `compositionalRationale`.

**Empirical validation:** 3-package empirical basis at Arc 16 close (`count-objects-1-to-10` + `identify-letter-sounds-vowels` + `identify-living-vs-nonliving`) — first-shipped exemplars per class. Cross-class generalization at Arc 17 across 5 phases (logic-class canonical composition at Phase 1.1; numeracy + literacy + vocabulary + world-knowledge applied consistently across Phase 1.2-1.5). Class-conditional gate fired consistently; no per-package improvisation surfaced as load-bearing across the validation set.

**Anti-pattern:** per-package improvisation at materials composition without class-template grounding. The class-conditional table IS the canonical authoring pattern at the materials layer; improvisation without ratification at Phase 1 close drifts the class-template silently.

**When-to-apply trigger:** at any teaching-package authoring step. Phase 1 materials composition reads the class-conditional table; deviations route to assistant ratification.

**Cross-references:**
- §A.13.5 (Shape A canonical authoring pattern) — Shape A governs authoring-app-side defect prevention; §A.13.37 governs teaching-package authoring-time materials composition. Different surfaces, parallel canonical-authoring discipline.
- §A.13.21 (operator-pre-recommendation substrate verification) — class assignment per strand is canonical-state; substrate verification at recommendation boundary IS the gate that catches class-misalignment.
- §A.13.34 (parallel-strand-framing) — parallel-strand-framing legitimately imposes deviations from class-template; ratification at Phase 1 close is the appropriate surface.

Origin: 3-package Arc 16 empirical basis + Arc 17 5-phase cross-class generalization; canonical table establishment.

#### A.13.38 Decoupled-ship pattern across arc-close empirical reliability

Multi-pillar commission cycles (package-authoring + materials regen + CDN deploy + cross-bundle + scope-doc amendment) ship in a decoupled cadence: (1) package authoring at filesystem level; (2) arc-close commit; (3) P2 close-out cycle absorbs materials regen + CDN deploy + cross-bundle + scope-doc amendment. The decoupling preserves rollback granularity AND absorbs unplanned-failure-mode at the filesystem-level discipline boundary.

**The cadence in three phases:**

1. **Phase P1 — package authoring at filesystem level.** Write `package.yaml` + asset trees to disk BEFORE git-stage. Filesystem captures the work; intermediate failure-modes (PC-power-loss, crash, accidental process-kill) leave the work recoverable from filesystem state, not lost.
2. **Arc-close commit.** Single commit captures the recoverable filesystem state atomically. Rollback granularity = one commit per arc; git history clean.
3. **Phase P2 — close-out cycle.** Absorbs the downstream-deploy dimensions in a separate cadence: materials regen (PDF assets) + CDN deploy (per §15.8 5-min TTL) + cross-bundle updates (per `docs/SUBSCRIPTION-SCOPE.md`) + scope-doc amendments (per §A.8.2 multi-copy doctrine-file discipline). P2 ships separately so per-dimension failure-modes don't entangle with arc-authoring rollback.

**Sub-doctrine — filesystem-level discipline absorbs unplanned-failure-mode.** Authoring at filesystem level (writing `package.yaml` + asset trees BEFORE git-stage) means PC-power-loss / crash / accidental-process-kill leaves the work recoverable from filesystem state. Arc-close commit then captures the recoverable state atomically; intermediate failure modes do not corrupt git history. Validated empirically at Arc 17 P2 PC-power-loss recovery: filesystem state preserved across power-loss event; arc-close commit re-ran cleanly post-recovery without re-authoring loss.

**Empirical validation:** Arc 14 / 15 / 16 / 17 — 4-arc empirical reliability of the decoupled-ship cadence. P2 close-out cycle absorbed materials regen + CDN deploy at each arc without coupling to arc-authoring commit boundary. The cadence is the canonical multi-pillar shape, not an exception.

**Anti-pattern:** coupled-ship at arc-authoring commit boundary (package authoring + materials regen + CDN deploy + scope-doc amendment all in one commit). Couples per-dimension failure-modes to rollback granularity; entangles concerns. Coupled-ship trades rollback granularity for atomicity — rarely the right tradeoff at multi-pillar scale.

**When-to-apply trigger:** at any multi-pillar commission cycle with package-authoring + downstream-deploy dimensions. Default to decoupled-ship cadence; surface to operator at arc-close if coupled-ship would benefit (rare; coupled-ship trades rollback granularity for atomicity).

**Cross-references:**
- §A.13.11 (operator-strategic adjudication batching) — P2 close-out cycle IS the canonical batching surface for downstream-deploy adjudication. Operator routing at P2 close-out, not at per-deploy-dimension within P2.
- §A.13.24 (double-close-out paired commission milestone) — when two pillars' commission cycles converge at the same paired close-out moment, the decoupled-ship cadence still applies per-pillar; double-close-out is a phase-boundary, not a coupling event.
- §A.8.2 (multi-copy doctrine-file drift discipline) — scope-doc amendments at P2 close-out follow §A.8.2 canonical-vs-alternate copy discipline.

Origin: Arc 14 / 15 / 16 / 17 4-arc empirical reliability + Arc 17 P2 PC-power-loss recovery validating the filesystem-level discipline sub-doctrine.

### A.14 Scaling Arc audit doctrine

`[CHORE][AUDIT]` commissions measure publish-cli's path against scale targets without making any production change. The doctrine here governs both the audit commission shape and the engineering decisions that follow.

#### A.14.1 Scale-ceiling order

publish-cli's scale ceilings arrive in this order under realistic catalog growth:
1. **Time-death tolerance** at ~10K decks (10 min wall-clock at current 59.3ms/deck).
2. **Within-batch slug collision rate** at ~5K-10K decks (probabilistic; depends on theme distribution).
3. **Sharp + chown overhead** at ~30K-55K decks (CPU-bound; subprocess-spawn dominates).
4. **Stale-staging-dir lockout** (any scale, low probability per batch).

**Engineer accordingly:** chunked batches > pre-collision-check > subprocess-free chown via `fchown` > auto-cleanup. Each ceiling has a corresponding defer-trigger (§A.14.2). No memory ceiling within 55K plausible (216 MB peak RSS at 440-deck baseline). No disk ceiling within 250K (379 GB free + 28.8M inodes at audit time).

Origin: `f765b991` (Scaling Arc 5 audit at 440-wave baseline; empirical timing recovered from `_results.txt` + per-deck `Deck.createdAt`).

#### A.14.2 Defer-trigger heuristic for performance commissions

Each performance commission has an explicit empirical trigger; default-defer with rationale rather than engineer-now. Specifically:
- **Checkpoint/resume** — trigger at 5K+ decks per batch OR first real mid-batch death event. Until then, sequential await loop is sufficient.
- **Within-batch slug collision pre-check** — trigger at 5K+ decks per batch. Until then, the §15.13 within-batch collision-pair inspection-before-confirm pattern catches the cases empirically.
- **Subprocess-free chown via fchown** — trigger at 30K+ decks per batch. Until then, subprocess-spawn overhead is bounded.
- **Stale-staging-dir auto-cleanup** — trigger after first lockout event. Until then, manual cleanup is acceptable.

**Anti-pattern:** engineering performance commissions ahead of empirical trigger. The §A.14.3 sequential-publish-as-feature framing protects against this: the current architecture is intentional, not a bottleneck-by-default.

Origin: `f765b991`.

#### A.14.3 Sequential publish is a feature

publish-cli's sequential await loop (no `Promise.all`, no concurrency primitives) is intentional, not a deficiency. Concurrency would introduce within-batch race conditions on slug-collision detection + `create.deck` — two parallel publishes of the same `(language, slug)` would either deadlock on the unique constraint OR produce a numeric-suffixed slug racing the canonical (whichever loses the race gets `-2`). Sequential ordering by construction prevents both classes.

**Operational implication:** to handle larger batches, **chunk** via `--staging-dir` (split a 10K-batch into 3 × 3.3K-batches) rather than parallelize within a single batch. Chunk boundaries are race-safe (the unique constraint enforces correctness across the boundary).

Origin: `f765b991`.

#### A.14.4 publish-cli non-idempotent retry posture

Re-running a partial-completion bulk-publish requires staging-dir hygiene; not safe to retry blind. Specifically:
- A bulk-publish that completes M of N decks before process-death produces M `Deck` rows + M asset trees + a partially-consumed staging dir.
- Re-running the same `publish-bulk <staging-dir>` command would attempt to re-INSERT the M already-published decks, hitting unique-constraint violations on `(language, slug)`.
- Recovery: identify the M completed decks, move their ZIPs out of the staging dir, re-run `publish-bulk` against only the unpublished N-M ZIPs.

**Defer-trigger for checkpoint/resume:** first real mid-batch death event (per §A.14.2). Until then, the manual-recovery posture is acceptable because mid-batch death is empirically rare at current 440-wave scale.

**Anti-pattern:** assuming `publish-bulk` is idempotent. It is not. Future briefs that imply blind-retry semantics must surface the manual-recovery requirement.

Origin: `f765b991` (audit framing) + the §15.5 publish ordering (FS-first DB-last, per Phase 3 v4 amendment) which establishes the per-deck atomicity but does NOT establish per-batch idempotency.

#### A.14.5 Asset-tree audit-only `[CHORE][AUDIT]` commission shape

Read-only audit commissions produce an audit-report deliverable + Phase 3 operator-strategic questions; no production change, no DB writes, no FS modification, no `deploy.sh`. The audit-report lives at `docs/<arc-name>-audit-<utc-date>.md` for archival.

**Phase shape:**
1. **Inventory** — what's measured, against what target.
2. **Empirical recon** — read-only commands (DB queries, FS counts, profiling) on production state OR isolated-snapshot.
3. **Findings** — headline + supporting data + Phase 3 operator-strategic questions (urgent vs deferred classification).
4. **Doctrine carry-forward** — items folded at next [DOCS] cycle.

**Trigger conditions:** explicit operator commission (e.g., "audit our scaling story") OR a precipitating event (e.g., a near-miss incident, a downstream commission that would benefit from audit baseline). Audit commissions are not autonomous; they ship at operator-attention pace.

Origin: `9850df93` (Scaling Arc 3 audit at 731-deck-catalog state) + `f765b991` (Scaling Arc 5 audit at 440-wave staging snapshot).

#### A.14.6 Backup-coverage audit class

Backup-coverage of asset-trees is a distinct audit class from scale-ceiling audits. Backup gaps surface at zero-coverage discovery as **URGENT** severity — not because the gap is operationally on fire (production is stable), but because catastrophic FS loss would be unrecoverable without backup, and the gap is structurally cheap to close (~40 LOC bash script + cron entry).

**Trigger conditions:**
- Any audit commission discovers a production asset-tree without backup coverage.
- Any new asset-tree gets created at `/var/www/lcs-media/<dir>/`; verify backup script exists OR file [FIX][OPS] alongside the create commission.

**Off-host backup deferred trigger:** ~10 GB asset bytes OR ~6-7K decks (per `9850df93` Scaling Arc 3 Q3). At that scale, same-host weekly tarball becomes fallback to off-host strategy.

**Audit posture:** backup-coverage audits are zero-cost (single `ls` + cross-reference against `/opt/lessoncraftstudio/backup-*.sh` script set). Run at every `[CHORE][AUDIT]` commission's Phase 1; surface findings as separate `[FIX][OPS]` commissions per the urgent-class shape.

Origin: `9850df93` (Scaling Arc 3 audit URGENT finding: `/var/www/lcs-media/decks/` had zero backup coverage at 731-deck-catalog state) + `15be6ef5` (closure: `backup-decks.sh` mirroring `backup-samples.sh` shape).

#### A.14.7 Scale-projection methodology extension

Scale-projection at audit time decomposes into two layers; both must be measured to produce a defensible projection to the operator's design target (currently 55,000 decks).

**Layer 1 — filesystem-level projection.** Disk bytes + inode count per published deck × design-target population. Per-deck-asset breakdown is the load-bearing measurement: deck.html (~200-400 KB), printable.pdf (~50-150 KB), answer-key.pdf (~30-100 KB), thumbnail.png (~20-50 KB), og-image.png (~80-150 KB). At Scaling Arc 3 audit (`9850df93`) the per-deck inventory measured ~6 inodes × 731 decks = ~4,400 inodes at audit time, projecting to ~330,000 inodes at 55K decks = 1.1% of ext4 default inode budget at the production filesystem's geometry. Disk-bytes projection: ~1.5 MB/deck × 55K = ~82.5 GB total (4.6× margin against the production volume's free-space at audit time). Layer 1 is the structural projection — what does the asset tree look like at design-target population?

**Layer 2 — publish-cli timing projection.** Per-deck wall-clock × batch size + concurrency profile. At Scaling Arc 5 audit (`f765b991`) the empirical 59.3 ms/deck timing projected to 10 minutes wall-clock at 10K decks per batch — the time-death tolerance ceiling per §A.14.1. Layer 2 is the operational projection — how does publish-cli behave at design-target wave size?

**How to apply (during any `[CHORE][AUDIT]` Phase 2 empirical recon).** Measure both layers at audit time. Use real production state (or isolated-snapshot per §A.14.5 audit-only commission shape). Project to design-target by linear extrapolation; flag any non-linear scaling factor (e.g., disk-fragmentation effects, DB index bloat, ext4 dir_index thresholds) as additional ceilings to characterize.

**Why both layers matter.** Filesystem-level projection without timing projection misses the operational ceilings (time-death, race conditions, retry posture). Timing projection without filesystem projection misses the storage ceilings (inode exhaustion, free-space margin, backup-tarball weight). The two together produce a defensible projection across both axes.

Origin: `9850df93` (Scaling Arc 3 — filesystem-level layer) + `f765b991` (Scaling Arc 5 — publish-cli timing layer); methodology codified at this fold pass.

#### A.14.8 Pre-publish-wave audit doctrine

Three defect classes have recurred across multiple operator deck-publish hand-offs and were re-diagnosed from scratch each time. All are now captured here as a pre-publish-wave checklist that future sessions MUST run BEFORE invoking `publish-bulk --confirm` on a new operator-staged deck wave. Skipping this audit means re-spending operator-attention on already-solved problems.

**The three recurring defect classes:**

1. **Theme-emit defects** — apps' `LCSCatalogExport.export()` call site or `buildCatalogManifestSettings()` hardcodes `theme: null`, dropping the operator's theme selection. Plus 27 of 29 apps historically didn't populate `bundle.seoMeta.themeName` in `extractDeckBundle()` so deck.html `<title>` and `<meta description>` lacked the theme keyword. Past fixes: `5110d6e0` (math-worksheet + prepositions defect-A); `0e5f1560` (28-app sweep adding `seoMeta.themeName` via shared `LCSCatalogExport.deriveThemeName()` helper).

2. **Embed iframe gap (apex/www mismatch)** — `substitute.js: CANONICAL_URL_BASE` was apex form; nginx 301-redirect to www breaks the embed iframe's auto-resize listener via postMessage URL-match check; iframe stays at default `aspect-ratio: 800/1400` showing whitespace below sparse-content worksheets. Past fix: `6fb6ee3d` (CANONICAL_URL_BASE → www form + `rewrite-canonical-host.js` retrofit).

3. **Deckend-suggestions strip stale-emit** — operator's PC `frontend/public/worksheet-generators/` (gitignored serving copy populated by `scripts\master-sync.bat`) goes stale relative to `REFERENCE TRANSLATIONS/catalog-export.js`. When `LCSCatalogExport.buildDeckEndSuggestionsPlaceholder` is undefined at deck-generation time, the apps' `parts.push(deckEndSuggestions)` pushes empty string and deck.html ships without the strip — `<section class="lcs-deckend-suggestions">` element, CSS, AND/OR un-hide JS guard missing depending on how stale the operator's apps source is. Two failure modes per timestamp ordering: Mode B (oldest, missing all 3 elements) and Mode A (mid-sync, un-hide JS hardcoded but helper undefined → empty section). Result: end-of-deck "Try one of these next:" reel never renders even though publish-cli's `selectDeckEndSuggestions` ran correctly. Past fix: 9-app wave 2026-05-09 — recovery via `scripts/publish-cli/inject-deck-end-strip.js --locale=<X> --rewrite` (strips prior partial injection + re-injects with current code's logic + populates 6 `<li>` tiles via `selectDeckEndSuggestions`). Critical for both UX (post-completion engagement) and §1 SEO flywheel (deck.html outbound topic-page anchors feed Google's link graph).

**Pre-publish-wave checklist** — run BEFORE `publish-bulk --confirm` on a new wave:

1. **theme-emit audit.** Sample 1 ZIP per distinct app in the wave: `unzip -p <zip> manifest.json | jq .theme` should be non-null when the operator selected a theme. Defect-A class. If any null:
   - Apply Shape A authoring fix per §A.13.5 to the offending app's `buildCatalogManifestSettings()`, OR
   - Run salvage script `scripts/publish-cli/rewrite-manifest-theme.js` per §15.17 against the staged wave directory

2. **seoMeta audit (source app HTML).** Each app's `extractDeckBundle()` should populate `bundle.seoMeta.themeName` via the shared `LCSCatalogExport.deriveThemeName(opts)` helper added to `REFERENCE TRANSLATIONS/catalog-export.js`. If absent, deck.html `<title>` will miss the theme keyword (e.g., `Math Worksheet — Kindergarten` instead of `Math Worksheet — Animals — Kindergarten`). Add the helper call at extractDeckBundle return per the post-`0e5f1560` canonical pattern. The 28-app sweep covers all currently-known affected apps; future apps should follow the pattern at first-publish per the §A.13.7 first-publish-verification cadence.

2b. **bundle-vs-current-app reconciliation (operator ZIP audit).** Step 2 audits the SOURCE app HTML; Step 2b audits the OPERATOR-GENERATED ZIP bundle for the same surface. Sample 1 ZIP per app: `unzip -p <zip> deck.html | grep -oE 'seoMeta":\{[^}]*'`. If absent OR `themeName: null` for a deck whose manifest.theme is non-null, halt: the operator's bundle predates the seoMeta-population fix even though the source app is current — typically a browser-cache + service-worker staleness on operator's PC. Operator must hard-refresh the production worksheet generator (Ctrl+Shift+R) and regenerate the affected wave before publishing. If unblocking is operationally urgent, recovery is via `scripts/publish-cli/rewrite-deck-html-title.js` salvage post-publish (§15.17 — see the `ca5d4aa0` commission for catalog-wide recovery precedent). Origin: 95-deck word-guess + word-scramble wave on 2026-05-07 generated ~2h before the `0e5f1560` seoMeta sweep landed in production; surfaced empirically as missing-theme `<title>` post-publish.

3. **canonical-host check.** Confirm `scripts/publish-cli/substitute.js: CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com'` (www form) per §A.10. Apex form breaks embed iframe auto-resize. If defective:
   - Fix the constant (one-line edit)
   - Run `scripts/publish-cli/rewrite-canonical-host.js` against `/var/www/lcs-media/decks/` to retrofit existing decks
   - Cloudflare 5-min TTL refreshes edge cache automatically

4. **deckend-suggestions strip presence audit.** Sample 1 ZIP per app: `unzip -p <zip> deck.html | grep -c 'lcs-deckend-suggestions'`. Expected: ≥3 hits per ZIP — CSS block (`.lcs-deckend-suggestions{margin:...}`) + section element (`<section class="lcs-deckend-suggestions" hidden>`) + un-hide JS guard (`querySelector(".lcs-deckend-suggestions")`). If 0-2 hits, the operator's PC ran with stale `catalog-export.js` (Mode A: 1 hit = un-hide JS only; Mode B: 0 hits = nothing emitted). Recovery options:
   - **Pre-publish** (preferred): operator runs `scripts\master-sync.bat` + hard-refresh (Ctrl+Shift+R) on the affected apps, regenerates the wave
   - **Post-publish salvage**: run `scripts/publish-cli/inject-deck-end-strip.js --locale=<X> --rewrite` against `/var/www/lcs-media/decks/` per §15.17 — handles both Mode A + Mode B uniformly via removeExistingStripAndGuard + re-inject. Idempotent on already-correct decks (refreshes suggestions). Cloudflare 5-min TTL refreshes edge cache automatically per §15.8

5. **post-publish spot-check.** Pick 1 sample published deck per affected app:
   - `curl -s <deck-url> | grep -E '<title>|var url='` — title should include theme word; var url= should be www form
   - `curl -s <deck-url> | grep -c 'lcs-deckend-tile'` should return ≥1 (populated `<li>` tiles for the reel)
   - Embed the deck on a test page; verify auto-resize works (no whitespace gap below content)

**Why this matters at the doctrine level.** Operator-attention is the load-bearing variable across the project's runway. Re-diagnosing these defect classes per wave costs ~1-2 hours of CC + operator round-trips. Pre-checking takes ~5 minutes. The asymmetry justifies the doctrine even at one occurrence per quarter; all three classes have recurred multiple times in close succession.

**How to apply.** At the START of any commission that involves `publish-bulk` on operator-staged ZIPs, run the 5-step checklist before any other work. Surface findings in the commission's Phase 1 inventory; fix BEFORE running publish-bulk's `--confirm`. Each step has a documented canonical solution + recovery script; no inventive solutioning required.

Origin: surfaced empirically across the 345-en-wave + alphabet-train/prepositions embed-gap commission cycles. Step 4 added 2026-05-09 after the 9-app wave (picture-sort/shadow-match/bingo/matching/pattern-worksheet/chart-count/pattern-train/big-small) shipped without populated reels; root-cause was Mode A + Mode B stale-emit from operator's PC sync lag during incremental wave generation. Operator's frustration at the recurrence directly motivated the doctrine capture. Cross-references: §A.10 (canonical-host); §A.13.5 (Shape A); §A.13.7 (first-publish-verification cadence); §15.17 (salvage scripts pattern); §17.8.5 (slug derivation).

*End of CLAUDE.md.*
