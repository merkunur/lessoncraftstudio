# CLAUDE.md — LessonCraftStudio Interactive Worksheets Platform

**Version:** 2.0
**Last updated:** 2026-04-27
**Audience:** Every Claude Code session working on this project reads this file first.

---

## 1. What we are building

We are building a **subscription catalog platform for multilingual early-childhood educators** — specifically teachers and program directors working with children ages 3-7 in international schools, dual-language and immersion programs, bilingual European schools, and other contexts where children learn in languages other than (or in addition to) the dominant local language.

The platform's defining promise: quality interactive worksheets and printable resources designed for K-3 multilingual classrooms, available in 11 languages with consistent quality across all of them. Every deck exists in every language at the same level of polish, with grammatically correct vocabulary, age-appropriate visual design, and pedagogical care.

The catalog's central UX is the **topic destination page**: when a teacher arrives at a topic ("addition for kindergarten in Spanish") the site shows a curated page bundling a few recommended interactive decks, the printable PDFs that pair with them, and (for subscribers) a lesson plan for the topic. A flat faceted listing exists as a fallback for "show me all 47 decks" but is not the primary experience. This is the deliberate divergence from education.com's results-list pattern.

**Every public-facing page embeds a working sample deck** that the visitor can play immediately, in their chosen language. The home page, blog posts, topic pages, the about page, the pricing page — every surface lets the visitor experience the actual product rather than read descriptions of it. This is the conversion mechanism: the product proves itself before the visitor encounters any signup or subscription friction.

The 33 worksheet generator apps now exist exclusively as the operator's internal production tooling. Teachers never touch the apps. The apps live behind authentication accessible only to the operator and produce decks that flow through the publish pipeline into the catalog.

Revenue comes from a single tier of annual subscription at $69/year for individual teachers, with a school-license tier for international schools that prefer institutional purchase (pricing TBD; see §7). The platform is fundamentally free — every deck is freely accessible, freely shareable with students, freely printable. Subscription unlocks workflow features that emerge as needs once a teacher has integrated the platform into their work: full lesson plans on topic pages, embed codes for the teacher's own websites, parallel bilingual deck views, parent-communication templates, multi-deck assignment sharing, collections and organization, and watermark-free PDFs. The strategic principle is that conversion is value-driven (you got significant value from free, the subscription deepens it) rather than scarcity-driven (you hit a wall and had to pay). See §7 for the full feature split.

**The previous seller-facing positioning has been fully discontinued.** All public-facing pages currently visible at lessoncraftstudio.com (the home page selling KDP/Etsy worksheet generators, the seller tools like the KDP Royalty Calculator, the seller-focused guides, the per-app pricing) are being deleted. The site is being rebuilt from scratch with the multilingual K-3 educator audience in mind. The technical foundation (Next.js, Postgres, Lemon Squeezy, the apps, the image library, the vocabulary system) all stays; only the public-facing surface is being rewritten. See §11 and §17 for the deletion and rebuild scope.

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

The minimum viable launch includes: the entire public-facing site rebuilt from scratch for the multilingual K-3 audience (see §17), all 31 eligible apps producing catalog-ready output, a catalog of 400-600 seeded decks distributed across languages per the launch sequence (see §19), the teacher-facing catalog with search, filter, and topic destination pages, the student play experience working across all 31 exercise types, the local AI service running and producing enrichments, sample decks embedded on every public page, and the subscriber-only features (lesson plans, embed codes, parallel bilingual views, collections, watermark-free PDFs).

Things **deliberately excluded from launch**: student accounts, class management, progress tracking, teacher dashboards with analytics on student session data (this was previously in scope and has been cut — see §7), parent portals, SSO, school-district SSO/SAML features, complex DRM, custom worksheet creation tools for teachers, AI-assisted *deck generation* (the AI enriches decks; it does not produce them), assignment sequences (cut as not justifying their weight for K-3 audiences). Each of these is a rabbit hole. Do not add any of them without explicit operator direction.

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
- **Topic destination pages** at `/[locale]/topic/[slug]/` — the primary teacher-facing surface. Each page shows the topic title and description, a curated grid of recommended interactive decks, a list of companion printable PDFs, and a "show all N decks" link to the faceted browse view. The lesson plan card displays full content for subscribers and a blurred preview with a subscribe CTA for free users. Subscribers also see the parent-communication template card and the parallel-bilingual view option. See §16.
- Browse/search/filter page with pagination — the fallback when no topic matches or the teacher wants to see everything; supports filtering by language pair (e.g. "decks available in both Spanish and English")
- Individual deck page with embedded sample (the deck itself plays right on the page), metadata, share-with-class, QR code generation, PDF download (free for everyone), embed code (subscribers only), parallel-bilingual view (subscribers only), and add-to-collection (subscribers only)
- My Decks page showing the teacher's favorited decks (free users) plus collections, embed configs, and saved parent notes (subscribers)
- Subscription management page

URL structure note: slugs are in the page's language, not English transliterations. The German topic page is `/de/topic/mathe-kindergarten-addition/`, not `/de/topic/math-kindergarten-addition/`. Native-language slugs rank in native-language search; English-pattern slugs in foreign domains do not. See §17 for the SEO-from-the-start design principles.

All catalog pages are server-rendered for SEO. Schema.org `LearningResource` markup on deck pages and lesson-plan-collection markup on topic pages. hreflang for the language variants in which the content actually exists (not all 11 by default — see §19 for the language launch sequence).

Authentication and feature gating: browsing, deck access, search, and PDF download are fully public — no account required to use the platform. Email signup is offered after first use for favoriting and the new-deck digest. Account creation is free. Subscription gates only the specific subscriber-tier features listed in §7 (lesson plan content, parallel bilingual view, parent communication templates, embeds, collections, watermark-free PDFs).

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
- Generate longer pedagogical descriptions and formal learning objectives in all 11 languages
- Generate or refresh the lesson plan for each topic destination page
- Generate parent communication notes per topic per language (the subscriber-tier ParentNote feature)
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

**Annual subscription: $69/year (individual teacher) — adds workflow features for engaged teachers:**
- Full lesson plans on topic destination pages (warmup, main activity, closure structure with timing, recommended decks, assessment guidance, all in the topic's language)
- **Parallel bilingual deck view** — see and use any deck in two languages side-by-side (e.g. Spanish/English, German/French). Direct response to a real and underserved K-3 multilingual classroom need. Built on top of the existing per-language deck output; the engineering work is the side-by-side rendering layer.
- **Parent communication templates** — auto-generated parent notes in the child's home language explaining what the child is working on this week, what skills are being developed, and how parents can support at home. Generated by the local AI per topic per language. This is a uniquely valuable feature for multilingual classrooms where teachers regularly communicate with parents who don't share the school's language.
- Embed codes for any deck (iframe and similar formats for inserting decks into the teacher's own classroom blog, school website, Google Site, Padlet, Notion page, Substack newsletter, etc.)
- Collections and organization — save, group, and rename decks into named collections for repeated use across classes and units
- Watermark-free printable PDFs (the attribution footer is removed)
- Auto-renew with 30/14/3 day notification emails

**School license tier (TBD in v1.5):**
International schools and dual-language programs typically prefer institutional purchase rather than letting individual teachers expense subscriptions. A school-license tier is a likely v1.5 addition (probably $399-799/year covering up to 10 teachers, with higher tiers for larger institutions). Not in v1 launch scope but worth designing the data model to accommodate it cleanly. Lemon Squeezy supports tiered pricing; the catch will be account-grouping logic that lets a school admin invite up to N teachers and have them all access the institutional license.

**Grace period on subscription lapse:** 60 days. Subscription-tier features continue to work for 60 days after subscription ends. Links generated while subscribed continue to function indefinitely (because they share the same infrastructure as free links), but the teacher can no longer access embeds, lesson plans, parallel bilingual views, parent communication templates, or collections during the lapse period. After 60 days, share links continue to work for students but display a small "this teacher's subscription has lapsed — renew here" message to drive renewal.

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
- On every deck page, an "Embed on your website" button appears with a tooltip that explains it's a subscription feature, plus a "View bilingual version" button that surfaces the parallel-language view as a subscriber feature.
- After a teacher has shared at least one deck, they receive a single email a few days later with a parent-communication template they can adapt for their class — a free taste of the parent-communication feature with a note that subscribers get auto-generated templates for every topic.

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

// Subscriber-only feature: configurations for embedding decks on the teacher's
// own websites. Each config produces a stable iframe URL with the teacher's
// chosen sizing and any allowed-origins restrictions.
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
- All 31 eligible apps producing catalog-ready output via the publish pipeline
- "Export to catalog" workflow producing a ZIP per deck (§15) implemented for all 29 apps
- Catalog browse, search, filter, individual deck pages all work
- Topic destination pages render correctly with deck grid + PDF list; lesson plan section displays full content for subscribers and blurred preview with subscribe CTA for free users
- Student play access page works across all 31 exercise types on mobile and desktop, identical experience regardless of teacher's tier
- Free shareable link generation (no expiration, no student count limits) works for all teachers
- QR code generation for any deck works for all teachers
- Email signup with deck favoriting works for all teachers
- Subscription checkout works (free tier and $69/year individual tier; school-license tier deferred to v1.5)
- Subscriber-only features all enforce correctly: embed code generation, parallel bilingual deck view, parent communication templates display, collections management, watermark-free PDF downloads
- Grace period on lapsed subscriptions works correctly (subscriber features disabled but old shared links continue to work for students)
- Contextual conversion prompts trigger correctly (collections prompt at fifth saved deck, lesson plan blur with CTA on topic pages, embed CTA on deck pages, parallel-bilingual CTA on deck pages)
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

What is now **in scope** (additions and changes from previous versions): the headless Mac Studio running a local AI service for asynchronous enrichment (lesson plans, embeddings for semantic search, parent-communication templates, AI-suggested tags); the parallel-bilingual deck view as a subscriber feature; sample decks embedded on every public-facing page; SEO-from-the-start as a structural design principle (see §17); the language launch sequence treating depth in priority languages over breadth across all 11 (see §19); the from-scratch rebuild of the public-facing site with the multilingual K-3 audience as the only audience.

What was **removed from scope** in this version (previously included, now deliberately cut): student session analytics dashboard for subscribers (cut because K-3 teachers don't benefit from the data — they observe students directly all day); assignment-style multi-deck sequences (cut as not justifying the engineering weight for the K-3 audience); the broad "teacher catalog" framing (replaced with the multilingual K-3 educator framing in §1).

**Queued post-Brief-B (Phase 6 close-out 2026-04-30):**

- **Catalog page Phase 1/2/Gate 1 share-work revival** — unblocked at Brief B Phase 1 (`4b91adc0` shipped the nginx catalog deck route per §15.7); reactivates as follow-on brief whenever operator decides. Inherits OG metadata on `/[locale]/decks/[slug]`, share row component, OG image at 1200×630.
- **Topic destination pages** — full-shape brief beyond §16's minimal taxonomy. Separate brief.
- **Eleven-deck dry-run** — locale × app coverage exercise. Now gated on the taxonomy expansion brief below.
- **Taxonomy expansion brief (NEW priority since Brief B Phase 4 retry).** Only 4 of 29 apps registered in `topics-taxonomy.json` (addition, sudoku, cryptogram, picture-path). 25 apps need taxonomy + axis-key i18n authoring before they can publish via `publish-bulk`. Foundational for any non-Phase-2-4-app publishing; queues between Brief B Phase 6 and Group C.
- **Group C brief drafting** — 3 apps TBD; structurally identical to Group B per the run-batch precedent.
- **§19 longer-arc items:** NSR operationalization, school-license design, home page copy, first acquisition activities, native cartoon library deployment in marketing, premium classroom personalization (v2), v2 translate-this-deck workflow per §17.8.7, grayscale PDF as user-facing download.

## 12. When this document is wrong

This CLAUDE.md will be wrong about some things. The operator's thinking will evolve. The product will reveal new constraints after launch. When you (Claude Code) find something in this document that seems to contradict current reality:

- Do not quietly ignore it
- Do not assume the new situation overrides it
- Flag the contradiction to the operator explicitly
- Ask for updated guidance before proceeding

This document is the stable reference. When reality diverges from it, the operator updates the document, not you.

## 13. The one sentence summary for every future session

> Build a multilingual K-3 educator platform on the existing LessonCraftStudio technical foundation: rebuild the public site from scratch around teachers in international, bilingual, and immersion early-childhood programs; produce a catalog of interactive worksheets and printable PDFs in 11 languages with consistent quality; make every public page embed a working sample deck; gate lesson plans, parallel-bilingual views, parent-communication templates, embeds, and collections behind a $69/year subscription; bake SEO into every structural decision; launch with content depth in 4-5 priority languages and grow from there; ship within 12 months without destabilizing the existing Hetzner server, Lemon Squeezy integration, image library, or apps.

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

### 15.14 Asset placement, ownership, OG image derivation, pruning

**Asset layout:** `/var/www/lcs-media/decks/<locale>/<slug>-v<N>/{deck.html, printable.pdf, answer-key.pdf, thumbnail.png, og-image.png}` plus the `<slug>` symlink pointing to the latest version dir.

**Ownership:** `lcs-media:lcs-media` 755/644 matching `/var/www/lcs-media/*` siblings. Locale-dir auto-chown via `ensureLocaleDir` helper at first-publish time (Brief B pre-Phase-4 hygiene commit `9a30f049`).

**OG image:** 1200×630 derivation step in publish-cli's pipeline between substitution and asset placement. Sharp-based composite (480×620 thumbnail centered on white 1200×630 background; `channels: 3` flattens any alpha). Atomicity treatment same as other assets (versioned directory + symlink swap).

**Pruning:** versioned dirs aged out by KEEP_VERSIONS=3 are moved (NOT removed) to `.archived/<locale>/<slug>-pruned-<utc>/` per §A.3 spirit. Cross-reference §15.12 for the unpublish-namespace alongside pruned-namespace coexistence.

## 16. Topic destination pages

Topic destination pages are the primary teacher-facing surface and the deliberate divergence from education.com's flat search results. Each page is a curated bundle of resources for a specific (axis × axis-value × locale) combination per the α-granular schema in §16.5 — one of three axes: exercise-type, theme, or educational-level. URL pattern: `/<locale>/topic/<native-language-slug>/` per §17.4 (locale-prefixed; native-language slug; trailing slash; `topic` is an English path constant).

### 16.1 Topic resolution

When a teacher submits a search query, the catalog backend tries to resolve it to a known topic before falling back to faceted search:

1. Exact slug match (e.g., `/en/topic/addition/`, `/de/topic/tiere/`, `/de/topic/kindergarten/`)
2. Embedding similarity match against existing `Topic` rows (top hit above a threshold)
3. Fallback to faceted browse (`/<locale>/catalog/browse/?q=...`)

The resolution is server-side; teachers always see one of: a topic destination page, or the faceted browse with their query as a search term.

### 16.2 Page composition

Each topic destination page is composed of:

- **Header.** Topic title, breadcrumb (subject › age › topic), brief description, language/grade/subject pills.
- **Lesson plan card.** The `LessonPlan` row for this topic and language. Shows the warmup / main / closure structure with timing, the recommended decks inline, and a "view full plan" link. If no lesson plan exists yet, this card is omitted and the page falls back to a deck-only layout.
- **Recommended interactive decks.** A grid of 4–8 deck cards, ordered by `LessonPlan.recommendedDeckIds` if a plan exists, otherwise by an embedding-similarity ranking against the topic.
- **Companion printable PDFs.** A small list of the recommended decks' printable versions, surfaced for teachers who prefer paper.
- **Show all link.** "47 decks total in this topic — show all" linking to the faceted browse pre-filtered to this topic.
- **Related topics.** Optional row of links to neighboring topics in the taxonomy.

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

### 16.5 URL pattern and α-granular topic-page axes (locked decision)

Topic destination page URLs follow the canonical pattern **`/<locale>/topic/<native-language-slug>/`** per §17.4. Native-language slugs throughout (e.g., `/de/topic/tiere/`, NOT `/de/topic/animals/`). Locale-prefixed. Trailing slash. `topic` is an English path constant alongside the native-language slug.

**α-granular axes (locked).** Each deck links to one topic page per axis it occupies. Three axes:

| Axis | Slug source | Example (DE) | Cardinality per deck |
|---|---|---|---|
| `exercise-type` | App + mode → `exercise_type_axis_key` → slug-per-locale | `/de/topic/addition/` | always one |
| `theme` | Operator-set theme → axis-key → slug-per-locale | `/de/topic/tiere/` | conditional (only when theme is set on the deck) |
| `educational-level` | `age_range` → §17.8.6 mapping → axis-key → slug-per-locale | `/de/topic/kindergarten/` | always one |

A deck's end-of-deck links (§17.8.2) point to its three (or two, when theme absent) granular topic pages plus a locale-rooted catalog-home link `/<locale>/`.

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
    }
  }
}
```

Locale coverage per launch tier (§19): Tier 1 (en, de) authored from day one; Tier 2 (es, nl) folds in at Tier 2 launch; Tier 3 (sv, fi, no) at Tier 3; Tier 4 (fr, it, da, pt) at Tier 4. Missing locale entries cause `publish-cli` to skip end-of-deck link substitution for that locale until coverage lands.

**publish-cli substitution at upload time** reads `topics-taxonomy.json` and substitutes the placeholder pairs in deck.html's end-of-deck links section per §17.8.2 / §17.8.5. Canonical names per the emitter at `REFERENCE TRANSLATIONS/catalog-export.js:34-46` (deployed at `?v=9`): one heading placeholder `__END_DECK_HEADING__`; four URL placeholders `__LINK_MORE_TYPE__`, `__LINK_MORE_THEME__`, `__LINK_MORE_LEVEL__`, `__LINK_BROWSE_ALL__`; four matching localized-text placeholders `__LINK_TEXT_MORE_TYPE__`, `__LINK_TEXT_MORE_THEME__`, `__LINK_TEXT_MORE_LEVEL__`, `__LINK_TEXT_BROWSE_ALL__`. Nine end-of-deck-link placeholders total. The localized-text placeholders accept `{type}` / `{theme}` / `{level}` ICU-style interpolation against per-axis-key localized names (read from `topics-taxonomy.json`'s per-axis-key `name.<locale>` field — see §16.4).

---

## 17. Public site rebuild and SEO-from-the-start

The previous public-facing site (positioned for KDP/Etsy printable sellers) is being deleted in its entirety and rebuilt from scratch for the multilingual K-3 educator audience. This section describes what's being deleted, what's being preserved, and the SEO-first design principles that govern everything new.

### 17.1 What is being deleted

All public-facing pages currently visible at lessoncraftstudio.com are removed. Concretely:

- The seller home page (`/en/` and locale variants) replaced with the new multilingual K-3 educator home
- The `/en/apps/` page and individual app marketing pages (`/en/apps/addition-worksheets`, etc.) deleted — apps are no longer publicly browsable
- The `/en/pricing` page replaced with the new two-tier free/$69 pricing page
- The `/en/tools/` section (KDP Royalty Calculator, Niche Finder, Profit Hub, KDP Cover Size Calculator, Activity Book Planner) deleted entirely
- The `/en/guides/` section (seller-focused how-to articles) deleted entirely
- The `/en/bundles/`, `/en/ideas/`, `/en/start/` seller-funnel pages deleted entirely
- The `/en/blog/` content deleted (will be replaced with new content per §17.4)
- The seller-focused `/en/about/`, `/en/faq/`, and footer content rewritten

### 17.2 What is being preserved (technical foundation)

None of the underlying systems are touched. Specifically:

- The Next.js application, routing infrastructure, build system
- Postgres database (existing tables remain; new tables added per migrations)
- NextAuth authentication system
- Lemon Squeezy integration and the webhook handler at `/api/webhooks/lemonsqueezy/route.ts`
- `lemonsqueezy-products.ts` (existing product configurations preserved; new subscription product added alongside)
- The existing `/api/images` endpoint serving the apps
- The 33 worksheet generator HTML files in `REFERENCE APPS/` (now accessed only through admin authentication)
- The image library at `/var/www/lcs-media/image-library/` (untouched)
- `REFERENCE TRANSLATIONS/image-vocabulary.js` (canonical, never modified directly)
- The deployment pipeline, server configuration, all of Appendix A
- Existing seller-customer accounts and their access to apps they previously purchased (preserved at a non-promoted URL pattern, see §17.3)

### 17.3 The seller-customer transition

A small number of existing customers have purchased individual app licenses or category bundles under the previous pricing. Their access must continue working but is no longer promoted publicly:

- Existing app-purchase access is preserved through a non-public URL pattern (e.g., `/legacy-apps/[app-name]?key=[purchase-token]`) accessible only to authenticated users with the relevant `purchase` rows in the database
- The new public site does not reference these legacy URLs anywhere
- Existing customers receive a one-time email explaining the transition: their purchases remain valid indefinitely, the apps still work for them, the public site is being repositioned for a new audience
- New seller-tier purchases are no longer offered after the public site rebuild
- The legacy access path is reviewed at six months and twelve months post-rebuild; if usage has decayed to near-zero, it can be quietly retired

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

### 17.5 Keyword research workflow

Claude (Anthropic's Claude in chat, the operator's strategic-thinking partner) performs keyword research on demand for the operator. The workflow:

When new content is being commissioned (a new topic page, a new guide article, a new section of the home page), Claude is asked to research the keyword space for that specific topic and language. Claude uses web search to evaluate what currently ranks for relevant queries, what competing content looks like, what gaps exist, and what the natural URL slug should be in the target language. The output is a brief that informs Claude Code's content production.

A working document `seo-strategy.md` accumulates findings across content commissions. New research extends it. This is a working artifact, not a static plan — it grows as the catalog grows.

For languages where Claude's quality assessment is less reliable (Swedish, Danish, Norwegian, Finnish), a native-speaker review pass is recommended before publishing content. The operator handles this through informal connections; if no native speaker review is available for a piece of content, that content is held until review is possible. The cost of unnaturally translated content in tight-knit professional communities is high and hard to recover from.

Claude's keyword research is strategic, not tactical. Claude can assess "this query has thin competition in Swedish and your platform can rank quickly" but cannot produce precise monthly search volumes or keyword difficulty scores (those require paid tools like Ahrefs or SEMrush, which the operator has chosen not to use at this stage). For your stage and scale, strategic keyword work matters more than tactical precision.

**Phase 6 NSR-flag list status:** 57 keys flagged for native-speaker review across two populations: 17 organic-phrasing flags (4 EN + 13 DE; accumulated one-at-a-time during Brief A 5A) + 40 bulk-i18n-tier flags (`seo.educational_level.*` + `endDeck.*` × 4 NSR-flagged tiers from Brief B Phase 2: sv, fi, no, da). Romance Tier 4 (fr, it, pt) authored without NSR per the stronger Claude quality assessment in those languages. The population distinction matters for review-workflow operationalization (per-flag NSR sessions for Population 1 vs tier-batch NSR by native speaker for Population 2). See `project_k3_phrasing_native_speaker_review.md`.

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
- Which apps export decks stays as in §14.9 (31 of 33).
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

---

## 19. The language launch sequence

The platform supports 11 languages technically (see §6). The launch and content production strategy treats these languages as priority tiers rather than equal parallel tracks, because depth in priority languages produces stronger SEO and audience presence than uniform shallow coverage across all 11.

### 19.1 The priority tiers

**Tier 1 — depth at launch (months 1-3):** English, German.

These are the languages where Claude's keyword research and content quality assessment are strongest, where the audience volume is largest, and where the moderate competition still allows ranking with sustained content investment. Target at launch: 50+ topic destination pages each, 30+ guide articles each, 200+ decks each, all subscriber features fully populated (lesson plans, parent notes, parallel-bilingual where applicable).

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
- A populated catalog with the target deck count, including across all 31 exercise types
- Topic destination pages for the target topic count, with full lesson plans and parent communication templates
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
- `frontend/config/lemonsqueezy-products.ts`
- Immutable content managers in `frontend/public/` (`homepage-content-manager.html`, `user-control.html`)

**Never run without EXPLICIT operator approval:**
- `chattr -i` / `chattr -R -i` on any protected path.
- Modify any `LEMONSQUEEZY_*` env var.
- `DELETE` / `TRUNCATE` / `DROP` on: `users`, `purchases`, `ls_webhook_events`, `design_elements`, `image_library_items`.
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

### A.6 Lemon Squeezy (current payment integration — extended, not replaced, by the new subscription model)

- **Source of truth:** `frontend/config/lemonsqueezy-products.ts`
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

### A.8 Sample-commit protection

- Local `samples/` is in `.gitignore`.
- `.git/hooks/pre-commit` blocks any sample-file commit.
- Uploads flow: **Content Manager UI → API → `/var/www/lcs-media/samples/`** — never via git.

### A.9 Mac Studio operational rules (new)

- The Mac Studio is reachable only over Tailscale. Never expose its services to the public internet.
- The shared secret used by the Mac Studio worker to authenticate against `/api/ai-ingest/*` is in env var `AI_INGEST_SHARED_SECRET` on both machines. Rotate it like any credential.
- The AI service must survive being killed and restarted at any time without producing duplicate enrichments. Every write to `/api/ai-ingest/complete` is idempotent on `(deck_id, enrichment_version)`.
- Never deploy a Mac-Studio-side change that would make Hetzner block while waiting on the Mac Studio. The contract is pull-based for a reason.

### A.10 Origin nginx www-canonicalization

`https://lessoncraftstudio.com/<path>` returns HTTP 301 redirecting to `https://www.lessoncraftstudio.com/<path>`. Pre-existing rule at the Hetzner-side nginx server-block; predates Brief B. The redirect is at origin, not at Cloudflare edge.

**Implication:** all canonical URLs in CLAUDE.md, deck.html `__CANONICAL_URL__` substitutions, share-intent URLs, and external crawl/share targets MUST use the `www.` form. Substitutions that omit the prefix work via 301 but lose one round-trip.

Cross-reference: §15.7 catalog deck route operates on `www.lessoncraftstudio.com`; §15.8 Cloudflare cache-invalidation policy applies to both apex and `www` (orange-cloud proxy on both records since 2026-04-30 per §3.5).

### A.11 More detail

- **`DEPLOYMENT.md`** — full deployment scenarios + recovery workflows.
- **`docs/reference/server-verification.md`** — health checks, file-count verification, backup inspection, image/payment recovery commands.
- **`docs/reference/design-elements-integration.md`** — 22 load-bearing rules for the Design Elements accordion (read before porting it to a new app).
- **`docs/reference/12-content-creation-guide.md`** — content creation guide.

*End of CLAUDE.md.*
