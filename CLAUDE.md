# CLAUDE.md — LessonCraftStudio Interactive Worksheets Platform

**Version:** 3.1 (post lesson-plans-domain nuke) **Last updated:** 2026-05-17

---

## [AMENDMENT 2026-05-17] Teaching-packages domain removed

Per operator commission this date, the **lesson-plans / teaching-packages / themed-bundles domain** was nuked in full (commits `[D-1 inventory]` → `[D-2 code+UI removal]` → `920aebbc` "[REMOVE][SCHEMA] DROP teaching-packages domain tables"). The removal covers:

- **Code:** `frontend/app/[locale]/{teaching-packages,lesson-plans,flashcards,themed-bundles}/` route trees; `frontend/components/teaching-packages/`, `frontend/components/lesson-plan-reader/`, `frontend/components/flashcards/`, `frontend/components/themed-bundles/`; `frontend/lib/lesson-plans.ts` + sibling lib files; `frontend/config/learning-targets.json`; `frontend/scripts/scale-checkpoint/`; 8 teaching-package material generators (`frontend/scripts/generate-*.ts`).
- **Data:** `docs/lesson-plans/` entire directory (~202 teaching-package YAMLs + ~60 bundle YAMLs).
- **DB schema:** `Topic`, `LessonPlan`, `ParentNote`, `Bundle`, `BundleDeck`, `BundleLessonPlan`, `TeachingPackage`, `BundleTeachingPackage` Prisma models DROPped via migration `20260517143000_drop_teaching_packages_domain`.
- **i18n:** `lessonPlanReader`, `flashcardReader`, `teachingPackagePage`, `bundlePage` top-level namespaces stripped across 11 locales + scattered `homepage.fourCardGrid.teachingPackages` / `homepage.subscription.lessonPlans` / `nav.categories.teachingPackages` keys.
- **Middleware:** 410-Gone added for `/teaching-packages`, `/lesson-plans`, `/flashcards`, `/themed-bundles` prefixes.

**Subscription scope is now 2-pillar** (was 3-pillar): (1) **Themed bundles** [FUTURE — aspirational, awaiting rebuild from scratch], (2) **Workspace + catalog-management tooling** [load-bearing operational pillar]. See §7.

**Doctrine impact:** §17.9 (Pillar 1 lesson-plan production discipline) marked removed; §17.4.1 dual-slug convention marked removed; §8.1 schema models stripped; scattered references throughout §1, §3.4, §4.3, §6, §9, §15, §16, §17.4, §19 amended. The §A.13.x doctrine sub-sections that empirically surfaced through Arc 14-19 teaching-package work retain their general-purpose discipline content (substrate verification, canonical-artifact grounding, content authoring) — only the teaching-package-specific anchors are out-of-date; the disciplines themselves remain applicable to other domains.

**For future sessions:** if a task touches lesson plans, teaching packages, themed bundles, or flashcards, **STOP** — surface to operator that the domain was removed and ask whether a fresh rebuild is in scope.

---

## 1. What we are building

A subscription catalog platform for **multilingual early-childhood educators** (international schools, dual-language/immersion programs, bilingual European schools — children ages 3-7). Promise: quality interactive worksheets and printable resources for K-3 multilingual classrooms, in 11 languages with consistent quality.

**Primary UX is the topic destination page.** When a teacher arrives at a topic ("addition for kindergarten in Spanish"), the site shows a curated page bundling recommended interactive decks plus companion printable PDFs. A flat faceted listing is the fallback. This is the deliberate divergence from education.com's results-list pattern. (Lesson-plan card on topic pages was removed 2026-05-17 per the teaching-packages-domain nuke; see §7.)

**Variety-signal complements topic-page-as-destination; it does not replace it.** Below the recommended-decks grid, algorithmic variety strips (§16.2) surface decks from neighboring axes and other locales. Shipped at `55ac5687` (Catalog Variety Arc 1).

**Every public page embeds a working sample deck** the visitor can play immediately. Conversion mechanism: the product proves itself before the visitor encounters signup.

The 29 catalog-shipping apps are operator-internal production tooling — teachers never see them (canonical list §14.10). The remaining 4 of 33 (`coloring`, `writing`, `draw-and-color`, `drawing-lines`) are PDF-only.

**Revenue:** Single tier annual subscription at $69/year for individual teachers, with a school-license tier deferred to v1.5. Free tier is generous; subscription unlocks two pillars (post 2026-05-17 lesson-plans-domain nuke per `docs/SUBSCRIPTION-SCOPE.md`): (1) themed bundles [FUTURE — aspirational, awaiting rebuild], (2) workspace/catalog-management tooling [load-bearing operational pillar]. Conversion is value-driven, not scarcity-driven. See §7.

**The previous KDP/Etsy seller positioning is fully discontinued.** Public surfaces deleted; technical foundation (Next.js, Postgres, Lemon Squeezy, apps, image library, vocabulary) preserved. See §11 + §17.

**SEO-first emit-site framing:** every manifest field participating in a deck's URL slug or `<head>` (`theme`, `exercise_mode`, `language`, `age_range` via `educational_level`) is an SEO surface, not a data field. Operator-strategic adjudication on emit-site contracts prioritizes search-keyword alignment over technical UI labels. The §15.16 publish-cli reconciliation gate catches emit-defects before they collapse SEO across a wave (§A.13.4 DERIVED-vs-HARDCODED-NULL classification).

**SEO + embed-virality acquisition flywheel.** SEO drives visitors to deck pages → visitors copy embed snippets → embedded decks spread to classroom blogs and school sites → backlinks compound search authority. Structural, not promotional (no ads, no influencer outreach). Three-layer embed architecture (locked):

1. **Mechanism** — deck.html iframe-safe; self-contained per §14.1; verified at `7f91f1b8`.
2. **Per-deck discovery UX** — operator-discoverable "Embed this" affordance; shipped `e8cec493`.
3. **Homepage signaling** — embed-virality CTA above-fold; shipped `a793d7c9` (Alt A Arc 3).

Layer 1→2→3 sequencing prevents credibility gaps (homepage CTA pointing at non-existent embed flow). Canonical example of §16.7 lock-with-dependency-pause discipline.

**Backlink-bearing vs visibility-only mechanisms.** Iframes alone are not backlinks; the snippet's visible `<a href>` tags OUTSIDE the iframe (wrapper `<div>` + caption with brand-anchor + keyword-anchor per `e8cec493`) ARE the backlinks. Future distribution mechanisms classify into one bucket at design time.

**Embed-attribution is visible-load-bearing, not technically-enforced (Technique 2 lock at Arc 2 A4).** Don't fight host-site stripping programmatically; design attribution so removal looks broken. Trade minor strip-leakage for low-friction-virality at scale.

**Three-second-budget homepage doctrine.** Teachers arriving via SEO decide stay-or-leave in three seconds. Homepage's job: magnitude + variety + browse-path signaling — not value-prop persuasion (Hero handles), not feature enumeration (deferred to below-fold). Three at-a-glance: structural breadth (29 exercise types + 100 themes), multilingual differentiator (11 flags), one primary acquisition CTA (embed-virality). Alt A architecture (`a793d7c9`) operationalizes this.

**Sampling vs structural-display are distinct UX jobs.** BreadthGrid (9 deck previews per `e5bb3cb4`) samples but doesn't communicate breadth; ExerciseTypeGrid (29 types) enumerates structural axis without rendering individual decks. Conflating them under-signals catalog scale.

**Magnitude-via-structural-axes-not-population.** At 500-decks-per-day cadence toward 55,000-deck target, today's count is stale signal. Communicate via durable structural axes (29 × 100 × 11 = 14,487 publish-eligible combinations per §6). Published-deck count is footnote only. Implemented in `MagnitudeFraming.tsx` (`a93ebb7c`).

**Crawl-bait-density as homepage SEO metric.** Above-fold internal-link count per locale × locales is load-bearing: Alt A targets ~140 above-fold internal links per locale × 11 = ~1,540 crawl-bait surface. Future homepage extensions must raise or preserve this density.

**Foundation-doctrine reality-check pattern.** Periodically (typically at fold-pass cycles), verify foundation doctrine against current ship-state. When foundation references unshipped mechanisms, either accelerate the mechanism or amend the doctrine; don't power-through.

**Cross-references on the embed flywheel:** §14.1 self-contained deck.html (substrate); §14.3a `buildShareAffordance` + `buildEmbedAffordance` shared-helper precedent for fan-out across 29 apps; Homepage Alt A Arc 1 (`d039d8e2`) + Arc 2 (`a93ebb7c`) + Arc 3 (`a793d7c9`).

## 2. Why this matters — operator situation

Two years building 33 apps + 3,000-image library + 11-language vocabulary system with grammatically correct singular/plural/gender data. No comparable platform offers consistent K-3 quality across these 11 languages. Previous seller positioning produced no sustainable revenue. Strategic conclusion: full reset to multilingual K-3 educators monetizes the existing technical asset.

**Runway:** ~12 months. First meaningful subscription revenue targeted months 6-9. SEO-led organic growth + direct outreach to international school networks + content marketing.

## 3. Core principles

### 3.1 Existing codebase is production; treat it with care
Project extends the existing repo at `C:\Users\rkgen\lessoncraftstudio\`. Next.js frontend, Prisma DB, auth, Lemon Squeezy, 33 HTML apps, image library, vocabulary all stay. Before modifying existing files, check production impact. New work is **additive**: add files rather than modify; create new routes alongside old; introduce new tables, don't migrate destructively.

### 3.2 The 29 apps' generation logic is not to be rewritten
The apps' Fabric.js rendering code is the source of truth for what a worksheet looks like. Interactive output reuses this logic; never rewrites it. We add a second serialization target (interactive deck export) alongside the existing one (PDF). If extending an app requires touching core logic, ask first.

### 3.3 Catalog is the product; apps are private tooling
Teachers never see the apps. Apps gated behind operator authentication; produce decks flowing through the publish pipeline. No "create worksheet" buttons, no "customize" flows for teachers.

### 3.4 Launch with depth in priority languages, breadth across features
MV launch: full public-site rebuild, all 29 apps producing catalog-ready output, 400-600 seeded decks distributed per §19 launch sequence, teacher catalog with search/filter/topic pages, student play, local AI service producing enrichments, sample decks on every public page, subscriber-only features per `docs/SUBSCRIPTION-SCOPE.md`.

**Excluded from launch:** student accounts, class management, progress tracking, parent portals, SSO, custom worksheet tools for teachers, AI-assisted *deck generation* (AI enriches; doesn't produce decks), assignment sequences.

**[REMOVED 2026-05-17] Pillar 1 production pattern.** Lesson-plans / teaching-packages / themed-bundles domain nuked per operator commission (commit `920aebbc`). The CC + copilot cooperation production loop and the Mac-Studio-strategic-fit framing tied to lesson-plan production are historical; Mac Studio remains targeted at deterministic-AI tasks (deck enrichment §4.5; OG images; alt-text + structured-data + meta enrichment) but no longer carries any pedagogical-voice content responsibility.

**Adjudicator-forward decision-locking.** When operator delegates strategic input ("you choose," "make the call"), the adjudicator (CC, copilot, or strategic Claude) locks per CLAUDE.md priority foundations and commits. Consultative-by-default wastes operator-attention when delegation is explicit. Operator override at any later moment is normal. Empirical: §17.8.5 default-mode-emits-null taxonomy lock at `109a91d4`.

**Lock-with-dependency-pause.** When operator strategic input locks a downstream choice but an upstream dependency hasn't shipped, lock the choice AND pause downstream implementation. Don't power through against an unsubstantiated upstream claim. Operationalized at Alt A Arc 1→2→3 sequencing.

### 3.5 Three-machine infrastructure
- **PC workstation** (Windows). Runs 29 apps + Claude Code; produces decks.
- **Mac Studio M3 Ultra** (headless, on Tailscale). Local AI service via Ollama (model TBD; 70B-class quantized). Reads catalog DB; writes enrichment.json.
- **Hetzner dedicated server**. Hosts Next.js + Postgres + Lemon Squeezy + catalog API + publish pipeline.
- **Cloudflare CDN** (free tier; active 2026-04-30). Orange-cloud proxy on apex + www; SSL Full (strict); AI crawler bot policy = "Do not block." Nameservers `selah.ns.cloudflare.com` + `sevki.ns.cloudflare.com`.

Tailscale connects all three privately. Mac Studio is **never** exposed to public internet; **never** synchronous in a teacher request. AI work is asynchronous batch (§15).

Stack: Next.js 14 App Router, Prisma + Postgres, NextAuth, Lemon Squeezy, next-intl, Tailwind, Fabric.js 5.3.1.

### 3.6 Clarity over cleverness
Long clear names. Explicit over implicit. No frameworks-within-frameworks. No abstractions that exist only to be flexible someday.

### 3.7 When uncertain, ask
The cost of a clarifying question is five minutes; the cost of building the wrong thing is a week.

## 4. The five architectural layers

### 4.1 Existing apps (foundation, mostly unchanged)
33 worksheet generators in `REFERENCE APPS/`. 29 ship interactive output + catalog-export pipeline (§14.10); 4 are PDF-only. **What changes:** a new export function per app emitting self-contained interactive HTML (§14). One "Export to catalog" action produces a ZIP (HTML + manifest + PDF + answer key + thumbnail). **What does not change:** generation algorithms, UIs, image selection, layout.

### 4.2 Deck storage + publishing (new)
New Prisma `Deck` model stores published decks. Data = merge of three layered manifests (§15): `generation.json` (app at gen time), `metadata.json` (publish step + operator review), `enrichment.json` (local AI). Originals kept on disk as reproducible source of truth. Operator: generate in app → click Export to catalog → review auto-filled metadata → Publish → Hetzner validates + ingests + writes static assets (cached by Cloudflare). Decks immutable after publish; edits create new versions.

### 4.3 Teacher-facing catalog (new)
Routes under `/[locale]/catalog/`:
- Catalog landing with category tiles
- **Topic destination pages** at `/[locale]/topic/[slug]/` — primary surface (§16). Deck grid + companion printable PDFs (lesson-plan card removed 2026-05-17).
- Browse/search/filter page (faceted fallback)
- Individual deck page with embedded sample + share + QR + PDF download + embed code (free) + add-to-collection (subscribers per `docs/SUBSCRIPTION-SCOPE.md` Pillar 3)
- My Decks (favorites for free; collections/embeds/parent-notes for subscribers)
- Subscription management

URL slugs in the page's language, not English transliterations (§17.4). Server-rendered. Schema.org `LearningResource` (decks) + lesson-plan-collection markup (topics). hreflang for languages where content actually exists.

Browsing, deck access, search, PDF download, embed codes all public — no account required. Email signup offered after first use. Subscription gates only the three pillars per `docs/SUBSCRIPTION-SCOPE.md`.

### 4.4 Student play experience (new)
Route `/play/[linkId]` where `linkId` is random 10-char alphanumeric. No auth. No student account. **No session tracking** — K-3 audience does not benefit from analytics dashboards (§7 cut).

Play page resolves linkId → serves the deck's self-contained HTML (§14). HTML embeds its own runtime; offline-capable. Interactions stay client-side.

Student experience is identical regardless of teacher's subscription tier. Free teachers' shared links work indefinitely. Subscriber lapses don't break links — a small "this teacher's subscription has lapsed — renew here" message appears.

Static HTML cached aggressively at Cloudflare edge. Hetzner involved only in link resolution. linkId entropy: 10 chars alphanumeric ≈ 3.6 quadrillion combinations. Embedded play (subscriber-config) optionally restricts via `Referer` against `allowedOrigins`.

deck.html carries the SEO surface in §17.8 (semantic HTML, alt attributes, structured data, canonical URL placeholder, hreflang insertion point, end-of-deck links). Modifications must preserve SEO contract; modifications to SEO contract must preserve cacheability (no per-request templating, no tier-dependent content).

### 4.5 Local AI enrichment service (new, runs on Mac Studio)
Long-running service. Pull-based: polls Hetzner for work; pushes results back. Hetzner never calls Mac Studio. Tasks: deck metadata embeddings (for semantic search + related-decks); Topic row embeddings (§16.1); longer pedagogical descriptions + learning objectives in 11 languages; topic lesson plans; discoverability tags; curriculum-framework alignment tags. **Never in synchronous teacher-request path.** If Mac Studio offline, decks served without enrichment; topic pages fall back to faceted listing.

## 5. Technology decisions — locked for v1
Next.js 14 App Router · TypeScript · Postgres via Prisma · NextAuth (email+password) · Lemon Squeezy · next-intl · Tailwind · Fabric.js 5.3.1 · Cloudflare free tier · Hetzner dedicated for app/DB · headless Mac Studio M3 Ultra for AI · Ollama runtime · Tailscale · local filesystem on Hetzner · Sharp · WebP for image library + interactive backdrops (PDFs decode WebP, re-encode losslessly into Flate). No additions without explicit operator approval.

## 6. The 11 languages
English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish.

`REFERENCE TRANSLATIONS/image-vocabulary.js` is canonical — 1,246 entries with singular/plural/gender across 11 languages. Never modified directly without operator approval. All teacher-facing UI works in all 11 languages via next-intl. Catalog metadata (subjects, ages, tags, topic descriptions) needs 11-language translations. AI-generated long descriptions are produced per language, not auto-translated. (Lesson plans + parent notes removed 2026-05-17.)

**Full 11-locale substrate complete** at `a47ea021` (2026-05-04). TOPIC_LOCALES + topics-taxonomy.json slug+name maps for all 134 axis-keys + topicPage namespace + Footer empty-array placeholders per §16.6 honesty. Wave 2 + Wave 3 ship per-locale on demand. Combinatorial: 100 themes × 11 locales × 13 themed-emitting apps = 14,300 themed + 17 themeless × 11 = 187 themeless = **14,487 publish-eligible combinations**. Originating commits: `b3f0d1f3` (it) + `9ea577fe` (fr) + `589fd554` (pt) + `a47ea021` (sv+da+no+fi).

**`pt` = Brazilian Portuguese canonical** (`589fd554`). Single `pt` locale code; no pt-BR/pt-PT split. BR register (caminhão / ônibus / educação infantil / anos iniciais). Future European Portuguese extension is downstream.

**`no` = bokmål canonical** (`a47ea021`). Single `no` locale code; no nb/nn split. Bokmål register (barnehage / 1. trinn).

## 7. Pricing and access model

**Free for everyone. No tiers; no paid subscription; no daily cap; no sign-up requirement to use any worksheet resource.** Revenue model TBD (operator-strategic; separate adjudication).

Every resource — interactive worksheets, printable PDFs, answer keys, worksheet-generator app downloads — is anonymous-accessible. Plain `<a href>` navigation; no JS gate; no proxy. The operator's stated rationale (2026-05-17): friction-free access maximizes acquisition traffic.

**Anonymous-accessible (everything load-bearing):**
- Play every interactive worksheet (catalog deck pages, embedded samples, direct-link plays)
- Download every PDF + answer key
- Use every worksheet-generator app, including downloading their interactive-HTML output
- Browse / search / filter / topic pages / variety strips / homepage breadth grid
- All catalog actions (deck-card clicks, deck Play, PDF links) — direct browser navigation

**Sign-in-bound (account features, NOT "resources"):**
- Workspace landing (`/[locale]/workspace`)
- Collections (create / view / manage / share)
- Per-user state (favorites, share-history, etc.)

These pages check `!!user` and prompt sign-in if absent — they're personal-organization features, not platform resources per the operator-defined distinction. Sign-in is voluntary; the catalog stays fully open.

**Voluntary sign-up affordances (no coercion):**
- Hero CTA "Join for free →" on homepage → `/[locale]/auth/signup`
- SubscriptionSection CTA "Join for free →" (signed-out) / "Go to workspace" (signed-in) at the bottom of the homepage
- These exist as inviting affordances; nothing forces them; no friction on the catalog side.

**Future revenue model — operator-internal, NOT to be surfaced on the website.** Operator plans to add educational games behind a subscription gate in a future commission. Until that commission ships and explicitly authorizes user-facing copy, **no marketing surface mentions any future subscription tier**. Sign-up flow + Lemon Squeezy scaffolding + Subscription Prisma model + isLcsSubscriptionActive helper all stay in place dormant for that future.

**Historical (do-not-revive without operator authorization):**
- Subscription model with $69/year tier (retired 2026-05-17 — LS variant stuck Pending for 17+ days; operator pivot)
- 2/day quota gate (built then removed 2026-05-17 — operator preferred unlimited free access)
- Sign-in-required-for-resources gate (built then removed 2026-05-17 — operator preferred anonymous traffic)

## 8. Technical standards

### 8.1 Database schema additions

All new tables via Prisma migrations. Don't modify existing migrations. Don't rename existing tables. Don't remove existing columns. Changes to existing tables need operator approval.

Key new tables:

```prisma
model Deck {
  id              String   @id @default(cuid())
  slug            String   // §17.8.5 — uniqueness via @@unique([language, slug])
  title           Json     // {en: "...", de: "...", ...} for 11 languages
  description     Json     // operator-authored short description per language
  exerciseType    String   // one of 29 §14.10 types
  exerciseMode    String?  // app-specific submode (e.g., "image-image", "find-addend")
  language        String   // primary content language
  subjectTags     String[]
  topicSlugs      String[] // soft-FK strings into the §16.5 axis-key set; Topic table itself removed 2026-05-17
  ageRange        String   // "3-5" | "5-7" | "6-8" | "7-9" | "8-10"
  htmlUrl         String   // self-contained interactive HTML on CDN
  pdfUrl          String
  answerKeyUrl    String?
  thumbnailUrl    String
  manifestUrl     String   // merged manifest JSON (reproducibility)
  publishedAt     DateTime?
  status          String   @default("draft") // "draft" | "published" | "archived"
  createdBy       String   // operator user id
  version         Int      @default(1)
  contentFamilyId String?  // §17.8.7 — null in v1; populated by v2 translate-this-deck workflow
  titleHash       String?  // §17.8.17 invariant 1 — @@unique([language, titleHash])
  descriptionHash String?  // §17.8.17 invariant 2 — @@unique([language, descriptionHash])
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  enrichment      DeckEnrichment?
  playLinks       PlayLink[]
  favorites       DeckFavorite[]
  collectionMemberships CollectionDeck[]
  @@unique([language, slug])
  @@unique([language, titleHash])
  @@unique([language, descriptionHash])
  @@index([status, publishedAt])
  @@index([exerciseType, language])
}

model DeckEnrichment {
  deckId            String   @id
  deck              Deck     @relation(fields: [deckId], references: [id])
  embedding         Bytes
  longDescription   Json
  learningObjectives Json
  aiTags            String[]
  enrichedAt        DateTime @default(now())
  enrichmentVersion Int      @default(1)
}

// [REMOVED 2026-05-17] Topic, LessonPlan, ParentNote, Bundle, BundleDeck,
// BundleLessonPlan, TeachingPackage, BundleTeachingPackage models were
// dropped per the teaching-packages-domain nuke commission (commit
// `920aebbc` "[REMOVE][SCHEMA] DROP teaching-packages domain tables").
// Topic destination pages now operate purely against axis-keys from
// `topics-taxonomy.json` (see §16.5); deck-grid rendering does not depend
// on a Topic table. Future revival of any of these would require a fresh
// schema commission and operator-strategic re-scoping.

model PlayLink {
  id            String   @id @default(cuid())
  linkId        String   @unique @db.VarChar(10)
  deckId        String
  teacherId     String
  embedConfigId String?
  createdAt     DateTime @default(now())
  deck          Deck     @relation(fields: [deckId], references: [id])
  teacher       User     @relation(fields: [teacherId], references: [id])
  embedConfig   EmbedConfig? @relation(fields: [embedConfigId], references: [id])
  @@index([teacherId])
}

// Subscriber feature: organize favorites into named collections
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
  position     Int
  addedAt      DateTime @default(now())
  collection   Collection @relation(fields: [collectionId], references: [id])
  deck         Deck       @relation(fields: [deckId], references: [id])
  @@id([collectionId, deckId])
  @@index([collectionId, position])
}

// Free-tier: trigger for collections CTA after fifth favorite
model DeckFavorite {
  teacherId   String
  deckId      String
  favoritedAt DateTime @default(now())
  teacher     User     @relation(fields: [teacherId], references: [id])
  deck        Deck     @relation(fields: [deckId], references: [id])
  @@id([teacherId, deckId])
  @@index([teacherId, favoritedAt])
}

// Platform-infrastructure (free per §3 acquisition flywheel)
model EmbedConfig {
  id             String   @id @default(cuid())
  teacherId      String
  deckId         String
  width          String?
  height         String?
  allowedOrigins String[]
  createdAt      DateTime @default(now())
  teacher        User     @relation(fields: [teacherId], references: [id])
  playLinks      PlayLink[]
  @@index([teacherId])
}

model Subscription {
  // extend existing tracking
  // grace-period end = lapsed_at + 60 days
  // schoolLicenseId field added in v1.5
}
```

When `Deck` + `Topic` are actually built, `ageRange` should land as a Prisma enum (`AgeRange { AGE_3_5 AGE_5_7 AGE_6_8 AGE_7_9 AGE_8_10 }`) so DB enforces the §17.8.6 mapping.

### 8.2 File organization

```
frontend/
├── app/
│   ├── [locale]/
│   │   ├── catalog/                        # NEW — teacher-facing catalog
│   │   │   ├── page.tsx                    # catalog landing
│   │   │   ├── topic/[slug]/page.tsx       # topic destination pages
│   │   │   ├── browse/page.tsx             # search/filter/paginate
│   │   │   ├── deck/[slug]/page.tsx
│   │   │   └── my-decks/page.tsx
│   ├── api/{decks,topics,play,ai-ingest}/  # NEW
│   └── play/[linkId]/page.tsx              # NEW
├── components/{catalog,topic-page,play}/   # NEW
└── lib/{deck-publishing,play-access,ai-enrichment-client}/  # NEW
apps/                                       # existing 33 apps; gain Export to catalog
mac-studio-service/{enrichment-worker,lesson-plan-generator,prompts}/  # NEW
publish-cli/                                # NEW; runs on PC
```

### 8.3 Self-contained interactive deck format
Each deck = single self-contained HTML produced by originating app. Two runtime families today (Family A: letter fill-in; Family B: puzzle drag) — see §14.2. New exercise types fit an existing family or get a new family runtime. Hetzner does access checks + serves static HTML (via Cloudflare) or expired-access state. Never renders decks.

### 8.4 Caching and CDN
Static deck HTML + PDFs + thumbnails written to Hetzner's public asset folder at publish time. Cloudflare caches at edge on first request per region. File path includes version hash. Aggressive cache headers (immutable per version). Play access page: short-cache 5 min (subscription-status check per request). Topic destination pages: moderate cache (~10 min). Student interactions never touch server.

### 8.5 SEO considerations
Every catalog page server-rendered. Every deck + topic page has unique title, meta description, OG tags, Schema.org `LearningResource` (decks) or collection markup (topics), hreflang alternates, canonical URL, XML sitemap entry. Sitemap auto-generates from published decks + topic pages; submitted to Google, Bing, Pinterest.

## 9. What "done" looks like for launch

**Engineering:** Previous public site deleted; apps behind operator auth (§17). All 29 apps producing catalog ZIPs (§15). Catalog browse/search/filter/individual deck pages work. Topic pages render with deck grid + PDF list; lesson plan full for subscribers / blurred for free. Student play works across all 29 types on mobile + desktop, identical per tier. Free shareable links + QR codes + email signup all work. Subscription checkout works ($69 individual; school-license deferred). Subscriber features enforce per `docs/SUBSCRIPTION-SCOPE.md`. 60-day grace works (subscriber features off; old links still functional for students). Contextual conversion prompts trigger correctly. **Sample decks embedded on every public page**. Cloudflare CDN active. Tailscale connecting all three machines. Mac Studio AI picking up new decks within minutes.

**SEO foundation from launch (not bolted on):** All public pages SSR. Native-language URL slugs. hreflang per language variant. Schema.org markup. XML sitemap. Mobile-first responsive (validated at 375px). LCP < 2.5s. Internal linking infrastructure. Search Console verified for priority languages. Initial keyword research per §17 + §19.

**Content at launch:** 400-600 published decks per §19 sequence. 30-50 high-priority topic pages with substantive descriptions + 4-8 recommended decks each in priority languages. (Full-lesson-plan + parent-communication-template scope removed 2026-05-17 along with the underlying domain; topic-page depth comes from descriptions + FAQ + curated deck commentary.) 8-12 substantive blog/guide articles.

**Public site rebuild:** Home leads with multilingual K-3 positioning + embedded sample deck + surfaces topic pages. Pricing page presents two-tier with feature comparison. About + FAQ + support written for multilingual K-3 educators. Blog/guide established. Footer + navigation reflect new audience.

**Acquisition foundation:** Pinterest account with initial pins from samples. LinkedIn list of target international school heads compiled for outreach in months 4-6. Email waitlist captured pre-launch. One conference committed (ECIS or COBIS).

v1 launch is **not** trying to achieve substantial organic search traffic (comes months 6-12), revenue at scale (first subs months 6-9), broad K-12 reach (focus is K-3), or institutional revenue (v1.5).

## 10. How Claude Code sessions operate

### 10.1 Before starting
- Read task prompt carefully
- Check conflicts with CLAUDE.md — flag rather than proceed
- Look at relevant existing code before writing new
- Understand what existing files do before modifying

### 10.2 During
- TypeScript, not JavaScript
- Follow existing style
- Add new files rather than modify whenever possible
- If you must modify, smallest change that works
- Run existing test suite where it exists
- New DB tables = new Prisma migration; never edit existing
- Treat local AI service (§4.5, §15) as separate subsystem. Never call Mac Studio synchronously from a request handler

### 10.3 Never do without explicit operator approval
- Rename/delete any existing file
- Modify any of 33 app HTML files' generation or customization logic
- Modify `REFERENCE TRANSLATIONS/image-vocabulary.js` directly
- Modify `/api/images` endpoint behavior
- Change existing DB tables or migrations
- Add new dependencies to `package.json`
- Change Next.js or Prisma major versions
- Remove/alter existing auth flows
- Remove/alter existing Lemon Squeezy integration
- Commit credentials/API keys/.env contents
- Expose Mac Studio tailnet hostname in any public code path
- Make AI service synchronous for any teacher-facing request

### 10.4 Always do
- Ask if a task is ambiguous
- Flag if task requires a 10.3 action
- Small commits with clear messages
- Test in existing dev environment before saying done
- Document new components/modules with brief JSDoc/TS comments

**Commit hygiene.** In-session-commit rule applies to git-tracked files. `MEMORY.md` index + `memory/` directory at `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\`, `CONVERSATION-HANDOFF.md`, `CLAUDE-MD-UPDATES.md` are out-of-tree handoff artifacts; persist at filesystem level without commits; don't `git add` them.

**Read-from-SoT precedence over re-authoring at component-substrate work.** When a component needs localized labels/axis-keys/taxonomy data that already lives at a single SoT (e.g., `topics-taxonomy.json axes.<axis>.<key>.{name,slug}.<locale>` per §16.5; `EXERCISE_MODE_APP_CLASSIFICATION` per §A.13.4; `image_themes.displayNames` per §A.7), the component reads directly. Mirroring is a duplicate-state failure mode — mirror + SoT drift over time. Direct SoT consumption eliminates the drift surface. Arc 1 substrate (`d039d8e2`) shipped 4 components consuming axis-key labels directly from `topics-taxonomy.json` (~870 labels at SoT, not re-authored in `messages/*.json`).

### 10.5 Flag to operator
Anything seeming to conflict with production behavior; any place CLAUDE.md is ambiguous; any task as specified that would break working features; any irreversible-feeling action; any performance concern affecting production traffic; any Mac-Studio-reachability dependency that would create an outage.

## 11. Scope discipline — out of v1

Deferred (don't build without explicit direction): unified worksheet creation studio for teachers (cut: teachers buy finished content); AI-powered deck generation; RTILA/n8n; RAG knowledge base; LoRA fine-tuning; synchronous AI in teacher-facing path; student accounts; class management; parent portals; school-district SSO/SAML; real-time collaboration; native mobile apps; offline play; KDP/Etsy seller features.

**Now in scope** (additions from prior versions): headless Mac Studio running asynchronous deterministic-AI enrichment — Topic embeddings (§16.1), deck-level enrichment + AI-suggested tags + descriptions (§4.5), OG images, alt-text + structured-data + meta enrichment — **NOT** lesson-plan production (cooperation-pattern per §3.4, Q2 final resolution post-`e912b805`). Sample decks on every public page. SEO-from-the-start (§17). Language launch sequence treating depth in priority languages over breadth (§19). From-scratch rebuild of public site for multilingual K-3 audience.

**Removed from scope:** student session analytics (K-3 teachers observe directly all day); assignment-style multi-deck sequences (not justifying engineering weight for K-3); broad "teacher catalog" framing (replaced with multilingual K-3).

**Queued post-Brief-B (Phase 6 close-out 2026-04-30):**
- Catalog page Phase 1/2/Gate 1 share-work revival — unblocked at `4b91adc0` (nginx catalog deck route §15.7); reactivates when operator decides.
- Topic destination pages full-shape brief beyond §16's minimal taxonomy. Separate brief.
- Eleven-deck dry-run — gated on taxonomy expansion brief (now CLOSED 2026-05-01 across all 29 §14.10 apps; subject vocabulary closed at 4 values: math 8 / logic 8 / letters 8 / spatial-reasoning 5; override rate 1/29 = 3.4%; topic destination route §16 implemented separately in Pass 7b).
- Group C brief drafting — 3 apps TBD; structurally identical to Group B per run-batch precedent.
- §19 longer-arc: NSR operationalization, school-license design, home page copy, first acquisition activities, native cartoon library deployment, premium classroom personalization (v2), v2 translate-this-deck workflow §17.8.7, grayscale PDF as user-facing download.

**Future-arc candidates filed at fold pass (post-Track-C-443-wave; doctrine-class but not yet promoted):**
- Manifest-disambiguator-field for fresh-roll-variation slug shape (`variation_id`/`set_label` field flowing into slug as 4th component). Trigger: 2nd+ recurrence of fresh-roll collision pattern at scale (currently 1 instance: 443-wave 3 pairs all earlier-roll-wins-resolved per §15.13).
- ALL_LOCALES DRY-extraction at 4th-consumer threshold (`['en','de','es','nl','fr','it','pt','sv','da','no','fi']` literal). Extract to `frontend/lib/locales.ts ALL_LOCALES` when 4th consumer surfaces.
- Arc-splitting threshold heuristic — generalizable shape for when an arc splits into sub-arcs vs ships as one.
- treasure-hunt manifest-emit-vs-worksheetTheme decoupling (Shape A §A.13.5 expansion).
- `shared.msg.offtheme.dropped` translation-key promotion at 12th-consumer threshold.
- backup-samples.sh path-divergence vs §A.1 (`/opt/lessoncraftstudio/backups/` vs `/var/www/lcs-media/backups/`).

## 12. When this document is wrong

CLAUDE.md will be wrong about some things. The operator's thinking will evolve. When you find something contradicting current reality: don't quietly ignore; don't assume new situation overrides; flag the contradiction explicitly; ask for updated guidance. This document is the stable reference; operator updates it, not you.

## 13. One-sentence summary

> Build a multilingual K-3 educator platform on the existing LessonCraftStudio technical foundation: rebuild the public site from scratch around teachers in international, bilingual, and immersion early-childhood programs; produce a catalog of interactive worksheets and printable PDFs in 11 languages with consistent quality; every public page embeds a working sample deck; gate workspace/catalog-management tooling (and future themed-bundles rebuild) behind $69/year subscription per `docs/SUBSCRIPTION-SCOPE.md`; **post 2026-05-17 lesson-plans-domain nuke (commit `920aebbc`), subscription is 2-pillar (themed bundles [FUTURE/aspirational] + workspace tooling [load-bearing])**; bake SEO into every structural decision; ship within 12 months without destabilizing the existing Hetzner server, Lemon Squeezy integration, image library, or apps.

If your task is outside this scope, stop and ask.

---

## 14. Interactive-HTML export

All 29 apps (§14.10) now ship the self-contained interactive HTML, LCSAttribution footer, and catalog-export ZIP. Detailed history of which app shipped which bundle version is in §14.8.

### 14.1 Architecture
Each deck = single self-contained `.html`:
1. **Snapshot + overlay.** Operator's Fabric canvas captured as JPEG (`toDataURL({format:'jpeg', quality:0.85, multiplier:2})`). JPEG is the backdrop in the HTML. (WebP standardization §5 applies to source image library; in-HTML backdrop stays JPEG.)
2. **Overlay layer.** Per-slot world coords (`calcTransformMatrix`); HTML overlay positioned in % against page size so layout scales with viewport.
3. **No Fabric.js on student side.** Pure HTML+CSS+vanilla JS + single Google Fonts link for Fredoka. ~200-400 KB.
4. **Attribution baked onto canvas.** Shared `LCSAttribution.addToCanvas(canvas, opts)` places small "Made with LessonCraftStudio.com" text at bottom-center; an invisible clickable `<a class="lcs-attrib-link">` overlays the baked text.

The "Download → Interactive Worksheet (HTML)" button is the current direct-emit surface; the "Export to catalog" ZIP (§15) wraps this output along with manifest + PDFs.

### 14.2 Six runtime families
Pick the closest reference app when porting:
- **Family A — Letter fill-in / 2D-grid / Choice** (v4–v14, v16–v18, v27.0, v31.0.2): slot-per-answer with batch-check Green/Red + Stars-on-100%-first-pass. References: `word-guess.html` (clean single-kind), `more-less.html` (choice-button), `odd-one-out.html` (deferred-Check choice-tap), `crossword.html` (2D-grid type-and-check; per-cell world rects captured at DOWNLOAD time, NOT generate time — operator can move/scale/rotate gridGroup between Generate and Download; input filter must be Unicode-aware `/[^\p{L}]/gu` for all 11 languages).
- **Family B — Puzzle drag** (v15, v29.2, v32.0): drag-across-grid with direction snap + endpoint validation. References: `wordsearch.html`, `picture-path.html` (orthogonal-only + per-cell walls), `treasure-hunt.html` (locked-to-start; no walls; revisit-allowed runtime variant). Toggling `mazeWalls`/`endCell`/start-lock through bundle flags makes picture-path's runtime reusable.
- **Family C — Grid-tap / tap-to-mark + count-in-blank** (v19, v30.0): cell-based tap-mark per task type + inputs overlaying baked legend blanks. References: `find-and-count.html`, `find-objects.html` (dual-mode I-Spy + Odd One Out via `mode` switch).
- **Family D — Bar-chart cell tap** (v20): column-snap cell fill; per-column grading. Reference: `chart-count.html`.
- **Family E — Tap-to-connect line drawing** (v21, v23): tap left + tap right draws SVG line; 1-to-1 replacement; tap-line-to-undo. References: `matching.html` (horizontal columns), `shadow-match.html` (top/bottom rows).
- **Family F — Drag-and-drop, deferred Check-Answers feedback** (v22.3, v24.3, v25.1, v26.1, v28.0): pointerdown on palette tile spawns ghost; drag to empty cell. Two-phase: "fill" (free movement, no feedback) → Check enables when all non-clue cells filled → "reviewed" (green/red glow, all locked; celebration on all-correct). Pointer Events for mouse + touch parity. References: `grid-match.html`, `bingo.html` (caller bar; announce-only, doesn't affect right/wrong), `picture-sort.html` (strict scoring + Custom Words mode), `missing-pieces.html` (shape-masked placed pieces + amplified wrong-piece cue), `sudoku.html` (4×4 picture-sudoku with image-index matching).

**Family G** was prototyped in bingo v24.0–v24.1 (drag-with-caller) but retired in v24.2 — pre-drag location hints defeated the literacy task.

### 14.3 Shared attribution module
`frontend/public/worksheet-generators/js/attribution-manager.js` (served by nginx from `/var/www/lcs-media/worksheet-generators/js/`; not in git due to symlink conflict). Exposes:
- `window.LCSAttribution.addToCanvas(canvas, opts)` — places Fabric.Text at `width/2, height-22` tagged `{isAttribution: true}`. Opts override fontSize/fontFamily/fill/bottomMargin.
- `window.LCSAttribution.getRectFromCanvas(canvas)` — returns baked text's world `{x, y, w, h}`.
- `window.LCSAttribution.TEXT` (`"Made with LessonCraftStudio.com"`), `.URL`.

**Per-app port: 7 edits.** (1) Head script tag after `access-guard.js`. (2) `LCSAttribution.addToCanvas(worksheetCanvas, {currentCanvasConfig})` before worksheet `renderAll()`. (3) Same for `answerKeyCanvas`. (4) Bundle return adds `attribution: {text, url, rect}` via `LCSAttribution.getRectFromCanvas(canvas)`. (5) Replace legacy `.lcs-attrib` CSS with three `.lcs-attrib-link` rules (invisible clickable overlay; `pointer-events:auto`). (6) Update `@media print` selector. (7) Render function overlays `<a class="lcs-attrib-link">` at attribution rect (same %-position math as slots).

**Attribution is tier-neutral and SEO-neutral.** Footer text and position independent of §17.8 SEO surface.

### 14.3a Shared catalog-export helpers (`window.LCSCatalogExport`)
`REFERENCE TRANSLATIONS/catalog-export.js` (synced via `scripts\master-sync.bat`; served at `/var/www/lcs-media/worksheet-generators/js/catalog-export.js?v=9`). Loaded by all 29 apps. Public API:

- **`buildSeoHead(manifest, opts)`** — `<head>` SEO string per §17.8.1: title, meta description, canonical link with `__CANONICAL_URL__`, Schema.org LearningResource JSON-LD with `__EDUCATIONAL_LEVEL__` + `__EDUCATIONAL_LEVEL_LOCALIZED__`. publish-cli substitutes per §17.8.5.
- **`buildEndDeckLinks(opts)`** — end-of-deck topic-destination links section per §17.8.2. Default: empty string (direct-download decks); pass `{includePlaceholders: true}` from publish-cli-aware path for `__LINK_*__` placeholders.
- **`buildSrRows({label, rows})`** — `<section class="lcs-sr"><ol><li>...</li></ol></section>` block. Group A pattern §17.8.4. Per-app code builds `rows` strings; helper owns wrapping + HTML-escaping. JSDoc on this function is canonical source for sr* translation-key naming convention (`srExercise<App>`, `srExercise<App><Mode>`, `srPuzzle<App>`, `srWorksheetQuestions`, `srOperator<Name>`, `srShape<Slug>`) and single-vs-≥2-consumer rule.
- **`buildSrPuzzleSummary({label, summary})`** — single-puzzle variant returning `<section class="lcs-sr"><p>{summary}</p></section>`.
- **`buildShareAffordance({canonicalURL?, locale, title})`** — self-contained HTML+CSS+inline-JS snippet for embedding in `lcs-bar` (top-right after `<button class="lcs-mute">`, 40×40, `.lcs-share` class). Resolution: (1) `canonicalURL` non-placeholder → use; (2) `locale + title` → construct `https://lessoncraftstudio.com/<locale>/decks/<slugify(title)>/`; (3) insufficient → empty string. Self-contained per §14.1 — no runtime catalog-export.js load. String resolution uses bare-`translations` per §17.8.14 (`srShareNative`/`srShareTo`/`srShareCopyLink`/`srShareCopied`/`srShareAria{Facebook,WhatsApp,Pinterest,Email,CopyLink}` in `translations-shared.js`). Originating: Sub-phase A hotfix `bbcb444c`; DE keys at `ea8e006a`; see §17.8.15 for click behavior.
- **`vocabKeyFromImage(img)`** — accepts path string OR `{path, word, name}`. Returns vocab-canonical key OR null. Three image source forms:
  1. **Theme path** (`/images/animals/cat.png`) → `ImageVocab.keyFromPath` → bare key.
  2. **Server-stored upload** (`/images/animals/camel-1769386104282-2351c8c4.png`) → strip `-<13digit>-<hash>` suffix. (`LCSImageRef.parseImagePath` leaves suffix intact — bug-family eb510be4 / eb510be4.1.)
  3. **Data URL** (`data:image/png;base64,...`) → no path-derived key; fall back to `img.word || img.name` stripping extension + known suffixes (bug-family eb510be4.2).
- **`HREFLANG_MARKER`** — `<!-- HREFLANG_INSERTION_POINT -->`. Per §17.8.1.5 MUST be last element in `<head>`; publish-cli substitutes per v1/v2.
- **`export(opts)`** — main entry for Export-to-catalog ZIP flow. Public API in catalog-export.js JSDoc.

Companion: `translations-shared.js` (loaded by all 29 apps; merge-on-load into `window.translations` with per-app collision warnings).

#### 14.3a.1 Bundle-shape contract extensions (Group B Phase 1)
- **sudoku** (`9b54ae4b`, bundleVersion 28.3.0): `uniqueImageKeys: [vocabKey, ...]` indexed parallel to `holes[].correctImageIndex` + `cutoutsData[].imageIndex`.
- **cryptogram** (`ac573fe4`→`5775b9c1`, 16.2.1): `cipherMap: {[Letter]: {vocabKey, fallback}}` FILTERED to letters in `legendSlots`.
- **picture-path** (`5bfa496c`→`8fc9f522`→`a3697abe`, 29.4.2): `startCellImage` (pathway only), `endCellImage` (pathway+choose-path), `endpointCount` (choose-path; 1/2/3), `legend.items[].vocabKey` (Treasure Trail variant).

The surfacing rationale is the **structural-vs-identity coverage dimension** at Phase 1 close — bundles can be shape-correct yet structurally undescribable in screen-reader text (WHERE vs WHAT). See `feedback_coverage_dimensions_emerge_from_postmortems.md` dimension 6.

#### 14.3a.2 Number-word lookup convention for small-cardinality counts
Per-app per-locale lookup table at template-fill time:
```js
var lookups = {en: {2:'two', 3:'three'}, de: {2:'zwei', 3:'drei'}};
var lookup = lookups[srLang] || lookups.en;
```
Out-of-range falls back to digit with `console.warn`. Tables in per-app code when single-consumer; promote to shared module if second consumer adopts same shape. Originating: picture-path Phase 2 `75d4a27c` (EN) + Phase 3 `263c67f2` (DE).

#### 14.3a.3 4th-consumer threshold pre-emptive refactor
When the 3rd consumer surfaces AND the 4th is imminent in the open commissions queue, refactor at 3rd-consumer threshold per §A.13 "refactor-during-already-opened-surface" rather than wait for 4th. Originating: `785d63f6` slug-derivation refactor (bulk.js + publish.js + index.js → `slug.js: deriveSeedFromManifest`; 4th consumer Pillar 2 bundle-publish imminent).

### 14.4 Recipe to port a new app

**Step A — Decide family.** Fixed answer positions → Family A. Spatial selection/drawing → Family B. See §14.2 references.

**Step B — Metadata patches** (additive, no visual change):
1. `worksheetCanvas.problemsData = <data>;` in `generateWorksheet()`.
2. Tag interactive elements per feature (`isAnswerLine`, `isBlankLetterCell`, `isWordsearchGrid`, etc.).
3. Carry operator choices needed for validation (`worksheetCanvas.letterCaseValue`, `<rowGroup>.resolvedMode`).

**Step C — Download button + wiring** (4 edits): button in dropdown; const declaration; un-disable in `generateWorksheet`/disable in clear; click listener `downloadInteractiveHtml(worksheetCanvas, '<app>_interactive.html')`.

**Step D — Copy closest reference block and adapt:**
- Bump `bundleVersion`; change `appType`, `title`.
- Rewrite `extractDeckBundle` for new slot shape; reuse `_captureWorksheetImage` + `_worldRectBounds`.
- Extend `renderSlots`/`renderGrid`, `checkAll`, `resetAll` for app-specific interaction.
- 7 attribution edits per §14.3.

**Step E — Validate, sync, commit, deploy** (§14.5–§14.6).

### 14.5 Local dev loop
A pre-existing Next.js route conflict blocks `npm run dev` until `frontend/app/sitemap.xml/route.ts` is renamed `route.ts.DISABLED-FOR-DEV`. **Rename it back before any push to production** or live sitemap breaks. Known wart; deferred.

After edits to `REFERENCE APPS/<app>.html`: `scripts\master-sync.bat` → hard-refresh `localhost:3000/worksheet-generators/<app>.html` → Generate → Download Interactive Worksheet → open downloaded file.

### 14.6 Deployment — TWO-STEP rule
Worksheet-generator HTML updates require BOTH steps (served copy is `chattr +i` immutable):
1. **Push + build:** `plink ... "bash /opt/lessoncraftstudio/deploy.sh"` — runs `git pull`, builds, smoke tests. Updates `/opt/lessoncraftstudio/REFERENCE APPS/<app>.html` but NOT served copy.
2. **Sync served copy:** `plink ... "cp '/opt/lessoncraftstudio/REFERENCE APPS/<app>.html' /tmp/<app>.html && /var/www/lcs-media/scripts/update-worksheet.sh /tmp/<app>.html <app>.html"`
3. **Verify:** `curl -s https://www.lessoncraftstudio.com/worksheet-generators/<app>.html | grep -c 'Interactive-HTML export v<N>'` must be ≥ 1.

### 14.7 Known gotchas (read before debugging)

**Fabric geometry:**
- `getBoundingRect(true, true)` on grouped child returns GROUP-LOCAL coords in Fabric 5.x, not world. Use `calcTransformMatrix()` + `fabric.util.transformPoint`.
- `calcTransformMatrix()` already includes object's own scale. Don't also feed `getScaledWidth()/getScaledHeight()` into `transformPoint` — that double-scales. Use intrinsic `img.width` / `img.height`.
- `exerciseRowGroup.getCenterPoint().y` drifts off equals sign when operands aren't square — bbox center tracks image span, not equation centerline. Anchor to actual `=` sign via `_findEqualsSign`.
- Operator may transform (scale/translate/rotate) rowGroup after generation. `calcTransformMatrix` honors transforms; that's why use it everywhere instead of hardcoded offsets.

**Bundle + runtime authoring:**
- Inline `<script>` inside a string must escape `</script>` as `<\/script>`.
- Runtime stored as array-of-strings joined at render time — avoids template-literal escaping with `${...}` and backticks.
- `expectedAnswer` MUST branch on mode for find-addend / find-subtrahend / missing operand. Otherwise correct answer marked wrong.

**Operator/interactive filter mismatch (wordsearch-class):** When operator pre-filters what shows on the worksheet, interactive export must apply the same filter. wordsearch.html strips non-letters from each word before placing; v15 exporter filters `placedWordsInfo` against `wordsConfig` to mirror operator's display.

**UX rules:**
- Don't duplicate what the baked JPEG already shows (v15 draft had an interactive "Find these words" list below the grid — pulled because the baked worksheet already listed targets with images).
- The operator's `letterCase` choice is baked into clues; interactive input must match. Store `worksheetCanvas.letterCaseValue` at generate time; coerce student input on client; compare case-insensitively.

### 14.8 Bundle versions shipped

| Ver | App | Family | Notable |
|---|---|---|---|
| v4 | addition | A | Base — single numeric slot per row |
| v5 | subtraction | A | v4 + cross-out image hitboxes |
| v6 | code-addition | A | Multi-slot mixed number+letter |
| v7 | more-less | A | Choice-button answer |
| v8 | math-puzzle | A | Drag-to-drop pieces |
| v9 | math-worksheet | A | Symbolic multi-slot algebra |
| v10 | alphabet-train | A | Drag-to-wagon letter matching |
| v11 | pattern-train | A | Drag-to-wagon image matching |
| v12 | prepositions | A | Image-choice circles + fill-in |
| v13 | word-guess | A | Clean single-kind letter blanks (clean reference) |
| v14 | word-scramble | A | v13 + display-only scrambled strip |
| v15 | wordsearch | B | First puzzle-kind drag-to-select grid |
| v16 | cryptogram | A | Global cipher auto-propagation + live legend |
| v17 | big-small | A (choice) | Find-one + order-N; transparent button overlay |
| v18 | pattern-worksheet | A (choice) | Options-tap OR blank-cycle through unique-image palette |
| v19–v32 | (remaining 14 apps) | various | Family A/B/C/D/E/F per §14.2; see `MEMORY.md` for per-app details |

Bundle versions bump on every port so runtime can key on shape if needed.

### 14.9 Porting completion (historical)
Porting of the 14 apps not in v4–v18 (bingo, chart-count, crossword, find-and-count, find-objects, grid-match, matching, missing-pieces, odd-one-out, picture-path, picture-sort, shadow-match, sudoku, treasure-hunt) completed in 2026. All carry interactive HTML + LCSAttribution + catalog-export ZIP. Four apps remain out of scope: `coloring`, `writing`, `draw-and-color`, `drawing-lines` (PDF-only).

### 14.10 The canonical 29 apps (authoritative)

`addition`, `alphabet-train`, `big-small`, `bingo`, `chart-count`, `code-addition`, `crossword`, `cryptogram`, `find-and-count`, `find-objects`, `grid-match`, `matching`, `math-puzzle`, `math-worksheet`, `missing-pieces`, `more-less`, `odd-one-out`, `pattern-train`, `pattern-worksheet`, `picture-path`, `picture-sort`, `prepositions`, `shadow-match`, `subtraction`, `sudoku`, `treasure-hunt`, `word-guess`, `word-scramble`, `wordsearch`

All 29 ship: interactive HTML (§14), shared LCSAttribution (§14.3), catalog-export ZIP (§15), deck.html SEO placeholders (§17.8).

**Out of scope, NOT in 29:** `coloring`, `writing`, `draw-and-color`, `drawing-lines`.

**Maintenance:** when this list changes, update §14.10 first; all other references defer to this list.

**Canonical-name-vs-emission contract.** Each app's `generator.app` field in `manifest.json` MUST match the §14.10 canonical name verbatim (e.g., `sudoku`, NOT `picture-sudoku`). Verified across all 29 at Brief B Phase 2 `59a0cde9`.

### 14.11 Runtime UI i18n: bake-at-source + force-set-in-init

Standalone deck.html displays runtime UI strings (title strip, Check/Try Again buttons, mute/share/embed, result modal). The **bake-at-source-time + force-set-in-init** pattern is canonical (locked 2026-05-10 across 29 apps × 11 locales).

**STRINGS_ALL bake.** Each app's `INTERACTIVE_RUNTIME_LINES` carries `var STRINGS_ALL = {en:{...},de:{...},...,fi:{...}};` literal. Runtime selects from `DECK_BUNDLE.contentLanguage`:
```js
var STRINGS_ALL = {en:{title:"Code Addition Practice",...},fr:{title:"Exercices d'addition codée",...},...};
var STRINGS = STRINGS_ALL[((DECK_BUNDLE && DECK_BUNDLE.contentLanguage) || "en").slice(0,2)] || STRINGS_ALL.en;
function T(k){return STRINGS[k]||STRINGS_ALL.en[k]||k}
```
Bake-at-source eliminates the dependency chain that broke under stale browser cache / translations-shared.js merge race / `js/translations.js` 404 (5 apps reference a non-existent file). Each deck.html gains ~3-6KB; acceptable for i18n robustness.

**Force-set every UI element in init().** init() MUST force-set every UI element's textContent from STRINGS — never trust HTML template literals or `DECK_BUNDLE.title || T("title")` short-circuits:
```js
titleEl.textContent=T("title");
if(typeof checkBtn!=="undefined"&&checkBtn){var _ck=STRINGS.checkAnswers||STRINGS.check;if(_ck)checkBtn.textContent=_ck;}
if(typeof resetBtn!=="undefined"&&resetBtn)resetBtn.textContent=T("tryAgain");
```
Earlier patterns baked button text from `escapeHtml(bundle.runtimeStrings.checkAnswers)` into the HTML template at gen time; if `bundle.runtimeStrings` was English (window.translations not loaded), template shipped English the runtime never overwrote. Force-set in init() runs AFTER STRINGS_ALL is in scope; always picks up correct locale. Canonical IDs: `#lcs-title`, `#lcs-check`, `#lcs-reset`. Vars: `titleEl`, `checkBtn`, `resetBtn` (wordsearch lacks `checkBtn`).

**Adding a new UI surface:**
1. Element with stable `id` (`lcs-<name>` convention)
2. STRINGS key in translations-shared.js (≥2-consumer rule §14.3a) OR per-app translations
3. init() force-set via `T("<key>")`
4. Re-run `scripts/inline-all-locales-strings.js`
5. Bump `translations-shared.js?v=N+1`
6. TWO-STEP §14.6 deploy

Originating: `30f21267` (29 apps STRINGS_ALL bake) + `691ac1c7` (29 apps force-set fix). Verified 2026-05-10. Cache-buster `translations-shared.js?v=9` live.

---

## 15. The catalog data pipeline

End-to-end flow: worksheet generated in one of 29 apps (§14.10) → catalog with full enrichment.

### 15.1 The three-layer manifest

Each deck's metadata splits across three JSONs, never overwriting. Catalog DB holds merged view; originals stay on disk.

Manifest drives §17.8 deck.html SEO surface: `generation.json` carries reserved `content_family_id`; `metadata.json` carries `educational_level` + `educational_level_localized` (deterministic from `age_range` per §17.8.6).

**`generation.json`** — written by app at generation time. Fully automatic:
```json
{
  "schema_version": "1.0",
  "deck_id": "addition-image-image-es-2026-04-25-001",
  "generated_at": "2026-04-25T14:30:00Z",
  "generator": {"app": "addition", "app_version": "...", "bundle_version": 4},
  "language": "es",
  "exercise_type": "addition",
  "exercise_mode": "image-image",
  "settings": {"items_per_group_min": 1, "items_per_group_max": 5, "exercises_per_page": 8, "letter_case": "lower"},
  "theme": "farm-animals",
  "images_used": ["cow-001.webp", "sheep-002.webp"],
  "vocabulary": ["vaca", "oveja"],
  "exercises": [/* problems with answers */],
  "assets": {"html": "...", "pdf": "...", "answer_key_pdf": "...", "thumbnail": "..."},
  "content_family_id": null
}
```

- **`content_family_id`** — nullable. Reserved schema field for cross-language sibling tracking. **In v1 always `null`.** v2 (translate-this-deck workflow §17.8.7) populates when operator explicitly translates. Format: `<exercise_type>-<exercise_mode>-<theme_or_'plain'>-<unique_suffix>`. Without this, no hreflang block (§17.8.1.5).

**`metadata.json`** — written by publish step on operator PC. Reads `generation.json`; applies topic taxonomy lookup; auto-fills sensible defaults; operator overrides via small form:
```json
{
  "schema_version": "1.0",
  "deck_id": "addition-image-image-es-2026-04-25-001",
  "title": {"es": "Sumas con animales de granja", "en": "Farm animal addition"},
  "short_description": {"es": "...", "en": "..."},
  "subject": "math",
  "topic_slugs": ["addition-kindergarten-spanish", "math-spanish-kindergarten"],
  "age_range": "5-7",
  "operator_tags": ["farm-animals", "kindergarten", "visual-aids"],
  "publish_status": "published",
  "operator_review_completed_at": "...",
  "educational_level": "Kindergarten",
  "educational_level_localized": "Kindergarten"
}
```

Two new SEO-driven fields, both deterministically derived by publish-cli from `age_range`:
- **`educational_level`** — `Preschool`/`Kindergarten`/`Grade 1`/`Grade 2`/`Grade 3`. Drives Schema.org `educationalLevel` + `__EDUCATIONAL_LEVEL__` placeholder. See §17.8.6 mapping.
- **`educational_level_localized`** — looked up via next-intl key `seo.educational_level.<level>`. Drives localized `<title>` + meta description via `__EDUCATIONAL_LEVEL_LOCALIZED__`. Examples: de→`Kindergarten`; fr→`Maternelle`; fi→`Esikoulu`.

Backwards-compatible — manifests written before this amendment lacked them. publish-cli treats missing as "no SEO content" for legacy decks (currently zero; bulk generation hasn't begun).

**`enrichment.json`** — written by local AI service on Mac Studio after publish:
```json
{
  "schema_version": "1.0",
  "deck_id": "addition-image-image-es-2026-04-25-001",
  "enrichment_version": 1,
  "model": "ollama:llama3.3:70b@q4",
  "enriched_at": "...",
  "embedding": [/* vector */],
  "long_description": {"es": "...", "en": "...", /* all 11 */},
  "learning_objectives": {"es": ["..."], "en": ["..."], /* all 11 */},
  "ai_tags": ["counting", "single-digit-addition", "visual-math"]
}
```

### 15.2 The publish flow

`catalogExport(appConfig, generatedContent)` in shared codebase. Every app calls at generation time; produces `generation.json` in-memory.

"Export to catalog" button on each app replaces four legacy KDP/Etsy downloads. Produces single ZIP `<deck_id>.zip`: `manifest.json` (= `generation.json` at this stage), `deck.html`, `printable.pdf`, `answer-key.pdf`, `thumbnail.png`.

Operator runs `publish-cli` on PC (watches folder; drop deck ZIP):
1. Validates manifest against schema
2. Auto-fills `metadata.json` via topic taxonomy lookup; small confirmation prompt
3. Posts `deck.html`, `printable.pdf`, `answer-key.pdf`, `thumbnail.png` to Hetzner static-asset endpoint → public asset folder behind Cloudflare CDN
4. Generates native-language slug from manifest's localized title; stores on new `slug` column (additive, `@@unique([language, slug])`, MUST land before first deck publishes). Substitutes deck.html SEO placeholders per §17.8: `__CANONICAL_URL__`, `__EDUCATIONAL_LEVEL__`, `__EDUCATIONAL_LEVEL_LOCALIZED__` (both from `age_range` via §17.8.6), `<!-- HREFLANG_INSERTION_POINT -->` (block for v2, empty for v1 `content_family_id=null`), topic-destination URL placeholders. On v2 sibling publish, re-injects updated hreflang into all siblings of same content family.
5. Posts merged manifest to Hetzner publish endpoint → inserts `Deck` row

Mac Studio polls `/api/ai-ingest/pending` within minutes; generates `enrichment.json`; posts back `/api/ai-ingest/complete`.

**Note on `bundle.canonicalURL`.** v1 does NOT promote canonicalURL to a proper bundle field. In-deck share affordance (§17.8.15) constructs URL at deck.html gen time using predicted-slug fallback — `https://lessoncraftstudio.com/<locale>/decks/<slugify(bundle.title)>/` (Option A authorized at social-share-v1 Sub-phase A). Proper bundle field arrives when (a) publish-cli substitutes real `__CANONICAL_URL__` AND (b) catalog deck route `/[locale]/decks/[slug]` exists. See §17.8.15.

### 15.3 Local AI service contract

Pull-based worker, not push target. Endpoints on Hetzner:
- `GET /api/ai-ingest/pending` — up to N decks needing enrichment; Tailscale-bound shared secret auth (lesson-plan endpoint variant removed 2026-05-17)
- `POST /api/ai-ingest/complete` — accepts `enrichment.json` keyed by `deck_id` or topic-and-language

When Mac Studio offline, decks accumulate in `pending`. New decks visible without enrichment but rank lower in semantic search; topic pages fall back to faceted listing.

### 15.4 Strict-arg parsing
`scripts/publish-cli/strict-args.js`. SCHEMAS table per subcommand (`publish`, `publish-bulk`, `unpublish`). Errors on unknown flags pre-side-effect; Levenshtein suggestions; non-zero stderr. `publish-bulk` requires `--confirm` for real (Phase 4 Q2 lock); without it dry-run regardless of `--dry-run`. Origin: `772a3375` (Brief B Phase 4). Motivated by unintended `addition-image-image-2/v1` during Phase 3 v4.

### 15.5 Edit-in-place contract
`--update-slug <slug>` updates a published deck. Atomicity via temp-staging + symlink-swap (Brief B Phase 3 v4 A1): write new `<slug>-v<N+1>/` then `fs.symlinkSync(target, link + '.new')` + `fs.renameSync(link + '.new', link)`. `rename(2)` on symlink is atomic at kernel level. Do NOT use `ln -sfn`. DB-FS-inconsistency: if asset succeeds but DB fails, assets stay; error logged; operator manually reconciles. Slug-stable on update; versioning internal (`<slug>-v<N>/`); URL stays `/<locale>/decks/<slug>/`. `--update-slug` SOLE update flag (`--update-deck-id` removed `9a30f049` — Deck schema lacks `deck_id`).

### 15.6 Slugify divergence
Two slug generators intentionally differ on non-ASCII: `catalog-export.js: slugify` at `:90` (`.replace(/[^a-z0-9-]+/g, '-')`; non-ASCII → hyphen; deck.html gen time fallback) vs `scripts/publish-cli/slug.js` (§17.8.5 ASCII-fold spec; upload time). Intentional for v1: `bundle.title` English-only across all 29 apps. Load-bearing when apps localize titles AND in-deck predicted-slug fallback consumed in non-en.

### 15.7 Catalog deck route
`/[locale]/decks/<slug>/` served by **nginx**, NOT Next.js. Config at `/etc/nginx/sites-enabled/lessoncraftstudio` (server-side, NOT in git). Deployed `4b91adc0` (Brief B Phase 1). `<slug>` is symlink at `/var/www/lcs-media/decks/<locale>/<slug>` → `<slug>-v<N>/`. Atomic swap via `fs.symlinkSync` + `fs.renameSync` (NOT `ln -sfn`). Canonical URLs `https://www.lessoncraftstudio.com/<locale>/decks/<slug>/`; apex→www 301 via nginx (§A.10).

**Routing-contract implication for Next.js components.** Two URL classes coexist: Next.js routes (trailing-slash-tolerant per `next.config.js: trailingSlash: false`; 308 normalizes) and nginx-served URLs (trailing-slash-strict; no-slash form 404s via Next.js catch-all). Next.js `<Link>` strips trailing slash on render → broken link if pointing at nginx URL. **Convention:** `<Link>` for Next.js routes; plain `<a href="...">` for nginx URLs (deck pages, PDF downloads). Pass 7b deck-card 404 was the cautionary case.

### 15.8 Cloudflare cache-invalidation
5-min short-TTL via nginx `add_header Cache-Control "public, max-age=300"`. Cloudflare honors origin. No purge-API calls. Fresh edits propagate within 5 min. Load-bearing post-2026-04-30 (Cloudflare onboarding); pre-2026-04-30 empirically inert.

### 15.9 `_collisions.txt` archived-vs-published differentiation
INSERT-route collisions surface different recommendations: published-row → `add to --updates-manifest mapping (<slug> ← <zipfile>) OR rename source ZIP`; archived-row → `pick a different slug — UPDATE-via-manifest NOT valid for archived rows; reactivation out-of-scope per Phase 5 Q2 lock`. Origin: `0ad626cb`.

### 15.10 Block-on-archived UPDATE
`publish.js` rejects `--update-slug` when `existingRow.status !== 'published'`. The `(language, slug)` compound unique constraint surviving on archived rows is the mechanism. Origin: `0ad626cb`.

**Cross-locale-OK.** §15.10 block applies only same-locale. Cross-locale INSERTs of an archived slug clean (compound unique is `(language, slug)`). (en, picture-path) archived at `0ad626cb` does NOT block (de/es/nl, picture-path) INSERTs. Locale-conditional emission at apps-side (`67d5d99d`): `en` emits `picture-trail`; `de`/`es`/`nl` emit canonical `picture-path`. Routing matrix at NL Batch 6 (`645ca7ff`): /en/decks/picture-trail/ 200; /en/decks/picture-path/ 404; /de/decks/picture-path/ 200; /es/decks/picture-path/ 200 (`1be13b8a`); /nl/decks/picture-path/ 200 (`645ca7ff`); /nl/decks/picture-trail/ 404.

### 15.11 Unpublish handler
Single-deck CLI (Phase 5 Q1 lock; bulk-unpublish deferred): `node scripts/publish-cli/index.js unpublish <slug> --language <locale> --confirm`. Pipeline FS-first DB-last: (1) `db.findExistingBySlug(language, slug)` must return published; (2) `place-assets.unpublishAssets(locale, slug)` removes `<slug>` symlink (immediate 404) then `fs.renameSync` every `<slug>-vN/` to `.archived/<locale>/<slug>-unpublished-<utc>/`; (3) `db.unpublishDeck(id)` flips status. Origin: `0ad626cb`.

### 15.12 Archive folder structure
Two namespaces at `/var/www/lcs-media/decks/.archived/<locale>/`: `<slug>-pruned-<utc>/` (KEEP_VERSIONS=3 pruning) + `<slug>-unpublished-<utc>/` (unpublish handler). Cleanup-cron deferred (>1 GB OR 100+ decks). Origin: `0ad626cb`.

### 15.13 Dry-run-vs-real parity
Per-deck staging set (`manifest.json` + post-substitution `deck.html` + `deck.html.diff` + `substitution-report.{json,txt}` + `warnings.txt`) byte-identical between dry-run and real-mode. `_summary.txt` diverges by design. `_results.txt` + `_failures/` real-mode-only. Mechanism: `bulk.js` invokes `dryRunBatch()` as own pre-flight. Origin: Brief B Sub-phase 5.7.

**Within-batch collision-pair inspection-before-confirm.** Default to surfacing inspection report before `--confirm` rather than auto-suffix. Tiebreak: drop LATER-generated ZIP (earlier-roll-wins). Track C 443→440-deck en wave 2026-05-05: 3 pairs dropped; final 440 decks with no `-2` slugs.

### 15.14 Asset placement / OG image / pruning
Layout: `/var/www/lcs-media/decks/<locale>/<slug>-v<N>/{deck.html, printable.pdf, answer-key.pdf, thumbnail.png, og-image.png}` + symlink. Ownership: `lcs-media:lcs-media` 755/644; locale-dir auto-chown via `ensureLocaleDir` (`9a30f049`). OG image: 1200×630 Sharp-composite (480×620 thumbnail centered on white, `channels:3` flattens alpha). Pruning: KEEP_VERSIONS=3 moves aged-out dirs to `.archived/`.

### 15.15 publish-bulk per-locale isolation
`publish-bulk` has NO `--language` flag. SCHEMAS declares `--dry-run`, `--confirm`, `--updates-manifest`, `--batch-id`, `--staging-dir`. Per-locale isolation enforced at folder-content layer (`bulk.js` reads via `fs.readdirSync` non-recursive, filters `.zip`; dot-prefixed subdirs naturally skipped).

**Operational pattern** (14 ES + NL Track C batches; `b18b8654`–`d3b4f962`): (1) archive prior batch's residue `mkdir -p .tier2-trackc-batch-N-{cluster}-{locale}/ && mv *.zip .tier2-trackc-batch-N-{cluster}-{locale}/`; (2) SCP new ZIPs to top level of `publish-inbound/`; (3) `publish-bulk publish-inbound/ --dry-run` then `--confirm`. Premise drift at Batch 4 ES (`b18b8654`) assumed phantom `--language` flag. Folder-content control IS the safeguard.

### 15.16 Manifest-content reconciliation gate
Two-dimension gate on every manifest before slug derivation; halts batch if any halt-class fires.

**Dimension 1 — `theme` reconciliation** (`reconcileManifestTheme` in `slug.js`). Compares `manifest.theme` against `parseThemeFromImagePath(manifest.exercises[0].image.path)` (fallback `images_used[0]`). Categories: CLEAN / MISSING_THEME / MISSING_PRIMARY / THEME_DISAGREE. Hyphen/underscore + case normalization. Themeless-app legitimate-null path preserved (declared null + no `image.theme` OR CUID-shaped dir).

**Dimension 2 — `exerciseMode` reconciliation** (`reconcileExerciseMode`). Validates `manifest.exercise_mode` against `EXERCISE_MODE_APP_CLASSIFICATION`. Categories: CLEAN (DERIVED app emit, OR null from DERIVED app per default-mode contract §17.8.5) / MODE_NULL_FROM_HARDCODED_APP (the defect class; halts). Post Commission ε at `109a91d4` this list is empty across all 29; gate stays as backstop.

**Operational:** Both dimensions run in `dryRunBatch()` pre-side-effect. Halts surfaced in `_reconciliation.txt`. Themeless legitimate-null preserved (no false halts on Track A baseline). Single-deck `publish.js` wires identically.

**Why structural:** gate runs at publish-cli boundary, not authoring-app boundary — doesn't replace Shape A discipline §A.13.5 but catches whatever apps' emit-sites fail to enforce. Future regression halts before URL-collision or SEO-degradation propagates.

**Tests:** 56 unit tests in `slug.test.js` (21 slugify + 8 deriveSeed + 13 parseThemeFromImagePath + 11 reconcileManifestTheme + 11 reconcileExerciseMode); 5 integration tests in `reconciliation.integration.test.js`.

**Halt-surface predicate calibration vs ground-truth.** When the gate fires unexpectedly, first diagnostic is NOT "gate malfunctioning" — it's "verify predicate against ground-truth." Run `parseThemeFromImagePath` + `reconcileManifestTheme` against a sample manifest by hand. Empirical: code-addition wave halt at `9051b43d` correctly diagnosed as real emit-defect via this calibration before salvage script authored.

Origin: `580b0ca2` (theme) + `2b555b57` (exerciseMode).

### 15.17 Salvage scripts pattern (`rewrite-manifest-<field>.js`)
Generation-side emit-defects produce structurally-broken manifests across already-staged ZIPs. One-shot salvage scripts derive correct value from in-bundle content signal and repack in-place with backup.

References:
- `rewrite-manifest-theme.js` (`9051b43d`) — salvages from `exercises[0].image.theme` (fallback `images_used[0]` path-derived). Reuses `parseThemeFromImagePath`.
- `rewrite-manifest-exercise-mode.js` (`0f0c648d`) — salvages from `settings.<mode-distinguishing-field>` (e.g., `settings.word_reveal_mode` for code-addition). 2-mode contract per operator adjudication.

**Pattern requirements:**
1. Pre-pass classification before any FS write (Phase 1 reads every ZIP; classifies rewrite/skip-clean/halt-class; prints summary; no backups/repacks). If any halt-class → exit before Phase 2.
2. Halt-classes: `unparseable` (in-bundle signal missing) + `ambiguous` (multiple signals disagree OR CUID-shaped). Defensive.
3. Backup-then-rewrite ordering. Theme rewriter: `<workingDir>.original/` sibling. Exercise-mode rewriter: `.<utc-prefix>/` dot-subdir within workingDir.
4. Verification post-apply: re-run §15.16 gate; expected N/N CLEAN.
5. Authoring-side root-cause fix queued separately. Salvage closes present wave; authoring fix per §A.13.5 Shape A closes structural defect for future waves.

Empirical (153 en code-addition wave 2026-05-05): theme rewriter Phase 2 dry-run found 150 rewrite + 3 skip-clean + 0 halts; Phase 3 apply rewrote 150 in-place; Phase 4 gate 153/153 CLEAN. Exercise-mode rewriter Phase 2 found 49 rewrite + 104 skip-clean + 0 halts; Phase 3 rewrote 49; gate 153/153 CLEAN. Phase 5 publish: 153/153 INSERT in 11.1s; live curl HTTP 200 across all 3 slug-shape variants.

**Trigger:** emit-defect surfaces post-generation across staged wave. Always preferred over regeneration when in-bundle signal recoverable; regeneration fallback when signal unparseable + ambiguous.

### 15.18 Inbound-link surface counter + gate doctrine
`scripts/publish-cli/count-inbound-surfaces.js` (Phase 4b CJS port from `frontend/lib/seo/count-inbound-surfaces.ts`) implements 8-surface counter consumed by `reconcileInboundLinkSurface` predicate at `seo-reconciliation.js:708`. Counts: exerciseTypeTopicPage (always-true) + educationalLevelTopicPage (always-true via §17.8.6) + themeTopicPages (subjectTags non-empty) + siblingAxisStrip (locale ≥2 distinct exerciseTypes) + varietyStripRotation (always-true) + crossAxisPivots (always-true) + deckEndSuggestionStrip (locale ≥7 decks) + breadthGridFeatured (Phase 3a conservative `false`). Predicate fires `INBOUND_LINK_COUNT_BELOW_TARGET` when count <3. WARN pre-Phase-5; HALT post-Phase-5 close.

**§15.18.1 bulk.js wire-in gap discipline.** `publish.js` wires `db.findExistingByTitleHash` + `db.findExistingByDescriptionHash` directly (lines 205-206). `bulk.js` threads `ctx.X` from `opts.X` (lines 579-582) but `index.js` (caller at lines 335 + 383) does NOT populate. Production runs receive `undefined`; predicate's same-locale uniqueness checks silently no-op. Structurally identical wire-in gap that Phase 4b closed for `countInboundFn` via default-fallback at ctx construction (`opts.countInboundFn || countInboundMod.countInboundSurfacesForDeck`). **§A.13.3 candidate at any future bulk.js touch.** Audit `opts.findExistingBy*` and apply default-fallback pattern; OR commission small `[FIX][PUBLISH-CLI]`. Origin: Phase 4b close-out Item 12.

**§15.18.2 Pre-publish-state vs post-publish-state semantics for inbound predicate.** Predicate calls `countInboundFn(deckId, language)` where `deckId` derives from `manifest.deck_id` (operator-space, e.g., `big-small-findbig-en-20260507200010`); helper does `findUnique({where:{id:deckId}})` against `Deck.id` (Prisma CUID). For pre-publish dry-run, `manifest.deck_id ≠ DB CUID` → null → count=0 → predicate fires.

Three resolution paths to consider at fold cycle:
- **Option A — pre-publish skip:** predicate skips for INSERT-path dry-run; runs only UPDATE-path.
- **Option B — post-publish projection:** helper accepts `(language, exerciseType, ageRange, subjectTags)` from manifest; computes projected count.
- **Option C — defer-empirical:** keep current; rely on Phase 5 HALT-flip + post-publish revalidation.

Phase 5 close authorized WARN→HALT despite this concern. Trigger for resolution: if empirical halt rate exceeds ~5% baseline, commission resolution. If stays ~0%, no resolution needed. Cross-reference §A.13.7 first-publish-verification cadence. Origin: Phase 4b close-out Item 13 + Phase 5 risk acceptance.

## 16. Topic destination pages

Primary teacher-facing surface; deliberate divergence from education.com flat results. Each page = curated bundle for a specific (axis × axis-value × locale) per §16.5 α-granular schema — one of three axes (exercise-type / theme / educational-level). URL: `/<locale>/topic/<native-language-slug>/` per §17.4.

**Status (Pass 7b 2026-05-01).** Single-axis topic pages — one per non-empty (axis × axis-key × Tier 1 locale) from `topics-taxonomy.json` — implemented at `/[locale]/topic/[slug]/` (`frontend/app/[locale]/topic/[slug]/page.tsx`). Each filters catalog by topic's axis-key + renders deck grid with no lesson plan card (§16.2 fallback shape). hreflang alternates list only locales where same axis-key has decks. Cross-product topic pages per §16.1 (subject × topic × age × language with `Topic` row + `LessonPlan` row + embedding-similarity) require catalog-side Prisma models from §8.1 plus lesson plan content authoring per `docs/SUBSCRIPTION-SCOPE.md` feature area 1.

### 16.1 Topic resolution
Teacher search query resolution before faceted fallback:
1. Exact slug match (`/en/topic/addition/`, `/de/topic/tiere/`, `/de/topic/kindergarten/`)
2. Embedding similarity match against `Topic` rows (top hit above threshold)
3. Fallback to faceted browse (`/<locale>/browse/?q=...`)

Server-side; teachers always see topic destination page OR faceted browse with query as search term.

### 16.2 Page composition
- **Header.** Title, breadcrumb (subject › age › topic), brief description, language/grade/subject pills.
- **~~Lesson plan card.~~** [REMOVED 2026-05-17] — topic pages no longer render a lesson-plan card; deck-only layout is canonical post lesson-plans-domain nuke.
- **Recommended interactive decks.** Grid of 4–8 cards ordered by embedding-similarity (operator-curated rankings deferred until cataloging-side ordering mechanism is rebuilt).
- **Companion printable PDFs.** Small list for paper-preferring teachers.
- **Show all link.** "47 decks total in this topic — show all" → faceted browse pre-filtered.
- **Variety strips.** 3–4 algorithmic strips below grid (Path 2 commitment locked at recon `2026-05-04`; shipped `55ac5687`).

**Variety-strip composition (locked):**
- **Strip 1 — same axis-key in other locales.** Max 1 deck per locale. Cap 6–8 visible total.
- **Strip 2 — related topics in current locale.** Max 2 per axis-key. Cap 6–8.
- **Strip 3 — other educational levels at same axis-key.** Max 1 per educational-level. **Per-page-axis self-skip: SKIP entirely on educational-level axis pages.** Cap 6.
- **Strip 4 — catalog highlights.** Max 1 per topicSlug + max 1 per locale. Cap 8.

**Self-skip threshold:** each strip self-skips independently when cardinality drops below 2. Per-strip, not per-page.

**Cross-locale variety ON throughout substrate-only-locale period.** Decks from en/de/es/nl surface on it/fr/pt/sv/da/no/fi pages until Track C lands.

**Caching:** ISR per-page (`revalidate=3600` shipped state). No module-scoped global memoization at this scale.

**Audit trail (Catalog Variety Arc 1).** Topic-page variety strips shipped at `55ac5687`. Homepage BreadthGrid scale-copy reverted at `383b7d34` per operator taste-call; references to "homepage numeric-scale-copy intro" in earlier drafts are historical, not shipped state.

**Sibling-axis strip density doctrine.** Beyond 4 variety strips, topic pages carry a sibling-axis strip surfacing decks at neighboring axis-keys within SAME axis (e.g., on `/en/topic/addition/`, surface `/en/topic/subtraction/` etc.). Max-2-per-related-axis; self-skips when <2. Origin: `15444fe8` Arc 6a.

### 16.3 Pre-built vs on-demand
Highest-priority topics (`Topic.isHighPriority=true`) are fully pre-built. Lower-priority render deck-only until AI generates plan. Novel queries fall through to faceted browse; recurring searches can be promoted to topic status.

### 16.4 The topic taxonomy
`frontend/config/topics-taxonomy.json` defines the canonical schema:
1. **Per-app defaults** (`apps.<app-name>.{default_subject, default_age_range, exercise_type_axis_key}`) — publish-cli auto-fills `metadata.json` at publish time (§15.2 step 2).
2. **Per-axis localized slugs** (`axes.<axis>.<axis-key>.slug.<locale>`) — publish-cli substitutes end-of-deck topic-link placeholders per §17.8.2 / §17.8.5.

Three axes per §16.5: `exercise-type`, `theme`, `educational-level`. Schema detail §16.5.

publish-cli reads when auto-filling metadata + substituting links. Treated like a DB migration: changes explicit, reviewed, committed. (AI-service lesson-plan generation responsibility removed 2026-05-17.)

`apps.*.default_subject` is free-string, NOT formal axis. Pass 1-6 expansion arc closed value set at 4: **math, logic, letters, spatial-reasoning**. Distribution across 29 apps: math 8 / logic 8 / letters 8 / spatial-reasoning 5. New apps fit one; introducing 5th triggers doctrine review.

#### 16.4.1 `products.ts.category` and `apps.*.default_subject` are orthogonal
Two related-but-distinct taxonomies:
- **`products.ts.category`** — mechanic-shape (letter fill-in, visual scan, matching, etc.); drives generation-side concerns
- **`apps.*.default_subject`** — pedagogical-content (math, logic, letters, spatial-reasoning); drives discovery-side concerns

Pass 1-6 cumulative pattern: 3 collapses (math/literacy/puzzle clusters collapse to single subject) + 3 spreads (visual/matching/search clusters spread). Override rate 1/29 = 3.4% (bingo math→letters via MEMORY's "literacy prompt"). **Implication:** subject-aware features MUST read `default_subject` from taxonomy; never infer from category.

### 16.5 URL pattern + α-granular topic-page axes (locked)

Canonical pattern: **`/<locale>/topic/<native-language-slug>/`** per §17.4. Native-language slugs throughout. Locale-prefixed. Trailing slash. `topic` = English path constant alongside the native slug.

**α-granular axes (locked).** Each deck links to one topic page per axis it occupies. Three axes:

| Axis | Slug source | Example (DE) | Cardinality |
|---|---|---|---|
| `exercise-type` | App + mode → `exercise_type_axis_key` → slug-per-locale | `/de/topic/addition/` | always one |
| `theme` | Operator-set theme → axis-key → slug-per-locale | `/de/topic/tiere/` | conditional (only when theme set) |
| `educational-level` | `age_range` → §17.8.6 → axis-key → slug-per-locale | `/de/topic/kindergarten/` | always one |
| `exercise-mode` | App emit-site `manifest.exercise_mode` → axis-key → slug-per-locale | (slug-component-only, NOT topic-page axis) | conditional (only when non-null per §17.8.5) |

A deck's end-of-deck links (§17.8.2) point to its three (or two, when theme absent) granular topic pages plus locale-rooted catalog-home link `/<locale>/`.

**`exercise-mode` is slug-component-only, NOT topic-page axis.** Three topic-page axes generate `/<locale>/topic/<slug>/` destination pages; `exercise-mode` participates only in deck-page slug derivation (§17.8.5). Rationale: modes are mechanic distinctions within an exercise-type, not standalone discovery surfaces.

**Compound search-intent topic pages** (e.g., `/de/topic/mathe-kindergarten-addition/`) NOT in v1 scope. URL space remains available; would live alongside α-granular pages. Deferred per §17.8.5 publish-cli substitution simplicity tradeoff.

**`topics-taxonomy.json` schema:**
```json
{
  "$schema_version": "1.0",
  "apps": {
    "<app-name>": {
      "default_subject": "math|letters|logic|spatial-reasoning",
      "default_age_range": "3-5|5-7|6-8|7-9|8-10",
      "exercise_type_axis_key": "<key>"
    }
  },
  "axes": {
    "exercise-type":     {"<axis-key>": {"slug": {"<locale>": "<native-slug>"}}},
    "theme":             {"<axis-key>": {"slug": {"<locale>": "<native-slug>"}}},
    "educational-level": {"<axis-key>": {"slug": {"<locale>": "<native-slug>"}}},
    "exercise-mode":     {"<axis-key>": {"slug": {"<locale>": "<native-slug>"}}}
  }
}
```

Locale coverage per launch tier (§19): Tier 1 (en, de) from day one; Tier 2 (es, nl) at Tier 2 launch; Tier 3 (sv, fi, no) at Tier 3; Tier 4 (fr, it, da, pt) at Tier 4.

**publish-cli substitution** reads `topics-taxonomy.json` and substitutes end-of-deck-link placeholders per §17.8.2 / §17.8.5. Canonical names per emitter at `REFERENCE TRANSLATIONS/catalog-export.js:34-46`: heading `__END_DECK_HEADING__`; URLs `__LINK_MORE_TYPE__` / `__LINK_MORE_THEME__` / `__LINK_MORE_LEVEL__` / `__LINK_BROWSE_ALL__`; localized text `__LINK_TEXT_*__`. Localized text accepts `{type}` / `{theme}` / `{level}` ICU-style against per-axis-key `name.<locale>`.

#### 16.5.1 Theme axis-key registration: Path X 1:1 with image-library
`axes.theme` registered 1:1 with `image_themes` table `type='images'` rows. **50 color + 50 BW = 100 axis-keys** (post-`947ad260`). Auto-derivation: for each (theme, locale), `slug = slugify(image_themes.displayNames.<locale>)` per §17.8.5; `name = passthrough`.

**Decoration assets** (`type='backgrounds'` 12 rows; `type='borders'` 5 rows) NOT registered — generation-time visual inputs, not catalog-browsing classifications. Registering them produced 27 of 28 surfaced collisions during `947ad260` recon with zero combinatorial gain.

**Drops + renames at `134614dc`:** `food` axis-key DROPPED (no DB theme matched, 0 decks ever). Food-adjacent (`bakery`, `breakfast`, `desserts_and_sweets`, `kitchen_tools`, `at_the_supermarket`) registered separately. `fruit` (singular) RENAMED to `fruits` to match DB.

**`name` field semantic shift at `134614dc`:** from operator-curated singular ("animal") to DB-derived plural-capitalized ("Animals"). 116 published decks pre-`134614dc` keep singular form on end-of-deck links (manifest-baked); new publishes use plural via `__LINK_TEXT_MORE_THEME__`. Coexistence correct; no migration.

**Slug-collision Option A fallback** (`947ad260`): when `image_themes` data has Spanish-displayName collision (e.g., `home_bw` + `household_bw` both `"Hogar BN"`), demoted axis-key uses `slugify(image_themes.name)` for the colliding locale only; `name` passthrough preserved. §A.7.1 documents underlying data fix needed; once renamed Option A removed.

#### 16.5.2 "Topics" vocabulary reservation
Word **"topics"** reserved for the architectural concept (topic-destination pages at `/<locale>/topic/<native-slug>/`). User-facing copy does NOT use "topics" as generic browse-axis label — uses concrete axis-names (**exercise types**, **themes**, **educational levels**). Established at Catalog Variety Arc 1 Q2 adjudication. Persists even though specific surface reverted at `383b7d34`.

#### 16.5.3 Path-based 2-axis intersection routes
2-axis intersection pages at **`/<locale>/topic/<axis-1>/<axis-2>/`**. Examples: `/en/topic/addition/animals/`, `/de/topic/addition/kindergarten/`, `/de/topic/tiere/kindergarten/`.

**Canonical axis-ordering:** theme → educational-level → exercise-type. Wrong-order 308-redirects to canonical. Path-based not query-string for SEO — surfaces as distinct indexable pages with own title/meta/structured-data/sitemap. Origin: `85f090a3` Arc 6c (intersection routes + sitemap-shard infrastructure shipped together).

#### 16.5.4 Query-string-param convention for filter-sort-pagination
`topicPage` filter/sort/pagination uses **universal English-canonical axis-keys** as query-string, distinct from path-based native slugs:
- `?level=<English-canonical>` (e.g., `?level=kindergarten`)
- `?theme=<English-canonical>` (e.g., `?theme=animals`)
- `?type=<English-canonical>` (e.g., `?type=addition`)
- `?sort=<sort-key>` — `newest` (default) | `alphaAsc` | `alphaDesc`
- `?page=<n>` — 1-indexed; default 1

**Rationale:** path-based URLs are SEO-load-bearing identity surfaces (native-language slugs maximize ranking); query-strings are facet/sort filters (universal English keys keep filter logic locale-portable). Default-value canonicalization: `?sort=newest` or `?page=1` strips to bare path. See §16.8.

Origin: `73640794` Arc 6b.

### 16.6 Footer rendering doctrine
Footer surfaces topic-page links across three columns per `Footer.tsx`:
- **Column 1 — `byLanguage`:** locales with published catalog (`FOOTER_LANGUAGES`)
- **Column 2 — `byTopic`:** theme + educational-level axis-keys merged into single `FOOTER_TOPICS_BY_LOCALE` (no separate `FOOTER_EDUCATIONAL_LEVELS_BY_LOCALE`)
- **Column 3 — `byExerciseType`:** exercise-type axis-keys per `FOOTER_EXERCISE_TYPES_BY_LOCALE`

**Pass 7b F4 honesty:** array membership IS the gate — only axis-keys with ≥1 published deck link out.

**Closeout-batch surfacing discipline** (added 2026-05-03 post NL Batch 7 `d3b4f962`). Closeout batches introducing new educational-level age range (typically 7-9 from `crossword`) require Footer Col 2 update alongside Col 3. Audit at every closeout: query DB for distinct `age_range` per locale + reconcile against current `FOOTER_TOPICS_BY_LOCALE.<locale>`. Per `topics-taxonomy.json` Track A `cbabd7e5`:

| age_range | educational-level axis-key per locale |
|---|---|
| 3-5 | preschool / vorschule / preescolar / peuterklas |
| 5-7 | kindergarten / kindergarten / jardin-infantil / kleuterklas |
| 6-8 | grade-1 / 1-klasse / grado-1 / groep-3 |
| 7-9 | grade-2 / 2-klasse / grado-2 / groep-4 |
| 8-10 | grade-3 / 3-klasse / grado-3 / groep-5 (defined-but-unused per §17.8.6) |

#### 16.6.1 Substrate-honesty discipline: topic pages and FOOTER_LANGUAGES extension
- **Topic-page expectation: 404 until first Track C deck publishes.** Surfacing empty topic page erodes trust + produces visibly-broken Google cards.
- **FOOTER_LANGUAGES extension deferred to first-deck-publish.** Adding a newly-substrated locale before first deck links out to empty locale-root.
- Track A commissions ship `FOOTER_TOPICS_BY_LOCALE.<locale> = []` + `FOOTER_EXERCISE_TYPES_BY_LOCALE.<locale> = []` placeholders.

Both resolve when Track C deck-publish lands first deck.

## 16.7 Prose substrate

Topic pages render rich descriptive prose above deck grid — locale-natural multi-sentence paragraphs. i18n-keyed per (axis-key, locale).

### 16.7.1 Q3 fallback chain pattern
3-level fallback:
1. **`topicProse.<axisKey>`** (single-axis) or **`topicProse.<a1>__<a2>`** (intersection) — rich prose authored for top-N per locale
2. **`topicPage.intro.<intent>`** where intent ∈ {`exerciseType`, `theme`, `educationalLevel`} — short ICU template
3. **`topicPage.intersection.intro`** — short ICU template

`TopicProseContainer.tsx` checks in order; first non-empty match. Long-tail axis-keys without `topicProse` substrate-honestly fall through (§16.7.3 Path B). Origin: `15444fe8` Arc 6a + `c03fdb8e` Arc 6d (660 prose blocks across 11 locales).

### 16.7.2 topicProse key shape canonical
- **Single-axis:** `topicProse.<axis-key>` — e.g., `topicProse.addition`, `topicProse.kindergarten`
- **2-axis intersection:** `topicProse.<a1>__<a2>` with axis-keys in **alphabetic order** — e.g., `topicProse.addition__animals`

`lookupTopicProse` sorts before constructing lookup. Authoring discipline: i18n message file MUST use alphabetic-ordered keys. Origin: `c03fdb8e`.

### 16.7.3 Path B by default for content-authoring arcs
**Path B:** rich content authored for top-N per locale; long-tail substrate-honestly falls through to template intros via §16.7.1. Caps authoring at high-traffic surfaces while preserving structural coverage. Operator-strategic per arc: which axis-keys are "top-N" (deck-volume / query-volume / audience priority). Default at scale: top-N by published-deck-count. Origin: `c03fdb8e` (Path B + intersection.intro gap-fold; 660 prose blocks + 7 intersection.intro gap-fills).

## 16.8 Filter-sort-pagination

### 16.8.1 TOPIC_PAGE_SIZE = 24
Per-page count locked at 24 (4 columns × 6 rows desktop). Constant at `frontend/lib/topic-decks.ts: TOPIC_PAGE_SIZE`; all paginated surfaces import. Balances grid density vs page-load weight. Locked Arc 6b Q-pagination adjudication.

### 16.8.2 Filter-sidebar architecture pattern
`FilterSidebar.tsx` renders 3 facet groups in fixed order: **theme → educational-level → exercise-type** (matches §16.5.3 axis-ordering). Per-axis:
- **Theme:** top-N expand pattern — first 12 visible; "Show all themes" button. `FacetGroup.themeTier1Count = 12`.
- **Educational-level:** all 5 visible (small set).
- **Exercise-type:** all 29 visible.

**URL-state truth source:** filter state from URL query-string (§16.5.4), NOT React state. Toggle facet `router.push`es new URL. **Path-bound axis exclusion:** when page anchored on axis (`/en/topic/addition/` filters to `type=addition`), that facet excluded.

Origin: `73640794`. UX truncation defect at `91ae41a7` (label-readability fix per §A.13.1).

### 16.8.3 Canonical-tag-on-pagination
Pagination + sort URLs canonical-redirect to bare path when params equal defaults: `?sort=newest` → bare; `?page=1` → bare; `?sort=alphaAsc&page=1` → `?sort=alphaAsc` (page-1 stripped).

Server component compares incoming `searchParams` against canonical-form; if mismatch, 308-redirect. Prevents duplicate-content SEO penalties.

**Subtle bug class** (`1d105da5` fix): earlier impl compared `sp` (already canonicalized) against `currentSp` (also canonicalized) — always equal, redirect never fired. Fix: compare RAW incoming `searchParams.toString()` against canonical.

---

## 17. Public site rebuild + SEO-from-the-start

Previous KDP/Etsy seller positioning fully discontinued; rebuilt for multilingual K-3 audience.

### 17.1 What was deleted
**Status: complete** at tag `v1-teardown-complete` on `pivot/printable-business-toolkit`. Removed across 9 sequenced passes (`e8c1c28f`, `b6c8166e`, `c605c911`, `42f4fd5f`, `49b501b0`, `c7d316dc`, `38181bd5`, `7c24630e`, plus Pass 9 final): public seller surfaces (apps/, pricing/, tools/, guides/, bundles/, ideas/, start/, blog/, about/, faq/, compare/, gallery/, sitemap-image/video shells); zero-consumer config trees (~80 MB); seller-era message namespace `apps` across 11 locales; `lemonsqueezy-products.ts` (plural; 7 dead exports); admin/user-control purchase-admin tooling; `DROP TABLE purchases` + `DROP TABLE wplus_transactions`; `Purchase` model + `User.purchases` relation. Public routes matching deleted prefixes return **HTTP 410 Gone** via `middleware.ts`. Reshelled directories (`pricing/`, `about/`, `faq/`) return **404** until new content lands.

See git tag `v1-teardown-complete` for the post-teardown HEAD and Pass 1-9 commit chain.

### 17.2 What is preserved (technical foundation)

Preserved unchanged: Next.js app, routing, build system · Postgres (existing tables remain) · NextAuth · Lemon Squeezy + webhook at `/api/webhooks/lemonsqueezy/route.ts` · `lemonsqueezy-product-config.ts` (singular; defines $69 subscription) · `/api/images` endpoint · 33 worksheet generator HTML files (now admin-auth only) · image library at `/var/www/lcs-media/image-library/` · `REFERENCE TRANSLATIONS/image-vocabulary.js` · deployment pipeline · server config · all of Appendix A · `frontend/lib/schema-generator.ts` + `frontend/lib/encode-image-path.ts` (healthy consumer set).

Scope-narrowed in teardown: `/api/member/dashboard/route.ts` + `/member/dashboard/page.tsx` + `/api/verify-app-access/route.ts` — admin-only as of Pass 8; non-admins 403/redirect.

### 17.3 Seller-customer transition (closed)
**Closed** at tag `v1-teardown-complete`. Production seller-era tables `purchases` + `wplus_transactions` dropped Pass 9 with zero rows. The contingency that protected late-arriving seller-tier customers is moot. Originally-specified `/legacy-apps/[app-name]?key=[purchase-token]` URL pattern was never built and will not be.

### 17.4 SEO as a structural design principle

SEO is not a launch checklist; built into every public surface from first commit.

**URL structure with native-language slugs.** Every public page has a semantic stable URL. Slugs in the page's language, not English transliterations. German topic page is `/de/topic/mathe-kindergarten-addition/`, NOT `/de/topic/math-kindergarten-addition/`. Native-language slugs rank in native-language search; English-pattern slugs in foreign domains do not.

**hreflang per page.** Every multi-language page declares alternates in `<head>` + XML sitemap. Declarations accurate to actual coverage — declaring nonexistent Finnish variant is worse than declaring nothing.

**Crawlability + internal linking.** Every catalog page reachable from home in small clicks. Topic pages link popular topics; deck pages link topic pages; topic pages link neighboring topics + language siblings.

**Schema.org structured markup.** Deck pages: `LearningResource` with `educationalLevel`, `inLanguage`, `audience`, `learningResourceType`. Topic pages: collection-style schema. Guide articles: `Article` schema.

**Content depth on topic pages.** 200-400 words description + recommended decks with descriptions + FAQs. Without depth, page won't rank. (Lesson plan section removed 2026-05-17; FAQ + description carry the depth budget.)

**Mobile-first.** Google's index is mobile-first. Validate every design at 375px before desktop.

**Page speed.** Lazy-load samples below fold; server-render everything else; defer non-critical JS; modern image formats. LCP under 2.5s for every public page.

**Server-side rendering for indexable content.** Catalog landing, topic pages, deck pages, guide articles, home — all SSR.

#### 17.4.1 [REMOVED 2026-05-17] Dual-slug convention (topic-page vs lesson-plan)
Lesson-plan URL surface deleted along with the domain (commit `920aebbc`). Topic-page URLs at `/[locale]/topic/<native-language-slug>/` remain canonical per §17.4. Historical note: the prior dual-slug convention distinguished public-SEO topic-page surfaces from subscriber-facing lesson-plan URLs that used `LessonPlan.topicSlug` (English-canonical axis-key). Native-language-slug discipline at the topic-page surface stays unchanged.

#### 17.4.2 Per-locale axis-key name parentheticals reflect platform age-range
Educational-level axis-keys have canonical age-range semantics per §17.8.6. Per-locale `slug` + `name` maps use the PLATFORM's age-range numbers in parentheticals, NOT the locale's school-system numbers (cross-locale consistency at platform-abstraction layer). Example: Italian `Scuola dell'infanzia` covers ages 3-6 in actual Italian school structure; preschool axis-key uses platform's `(3-5 anni)`. Established at `b3f0d1f3` + `9ea577fe` + `589fd554` + `a47ea021`.

#### 17.4.3 Cross-locale educational-level matrix (canonical)

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

**Descriptor-differentiation pattern.** Where locale's school-system UNIFIES multiple platform axis-keys under single term, per-locale name maps differentiate via parenthetical descriptor. 4 of 11 apply: `it`/`fr`/`pt`/`no`. 7 with discrete per-axis-key terminology: `en`/`de`/`es`/`nl`/`sv`/`da`/`fi`. Pattern structural to each locale's school system, NOT Romance/Germanic family divide. Cross-system-boundary parentheticals acceptable trade-offs.

**Class 2 collision pattern.** `home_bw` + `household_bw` `image_themes` pair has identical Spanish + Italian displayNames (`Hogar BN` / `Casa BN`) — Class 2 slug collision; resolved via §16.5.1 Option A fallback. Other 9 of 11 locales have distinct translations. State: collision in `es` (`947ad260`) + `it` (`b3f0d1f3`); distinct elsewhere. Underlying §A.7.1 data fix resolves long-term.

**IT retroactive fix (`9ea577fe`).** Italian preschool/kindergarten parentheticals corrected during fr Track A commission. Pre-fix shipped `b3f0d1f3` with age-representative parentheticals; post-fix per §17.4.3 matrix. Safe at fix-time: 0 it decks published. Future retroactive corrections after Track C deck-publish require deck-rewrite + URL-redirect commission.

### 17.5 Keyword research workflow

Claude (Anthropic's chat) performs keyword research on demand. When new content is commissioned, Claude is asked to research keyword space for that topic + language. Uses web search to evaluate what currently ranks, competing content, gaps, natural URL slug in target language. Output informs Claude Code's content production.

Working doc `seo-strategy.md` accumulates findings.

For Swedish/Danish/Norwegian/Finnish, native-speaker review recommended before publishing.

Claude's research is strategic, not tactical — can assess "this query has thin competition in Swedish" but cannot produce precise monthly search volumes (requires Ahrefs/SEMrush which operator hasn't adopted).

**Phase 6 NSR-flag list:** 57 keys flagged across 2 populations: 17 organic-phrasing (4 EN + 13 DE) + 40 bulk-i18n-tier (`seo.educational_level.*` + `endDeck.*` × 4 NSR-flagged tiers sv/fi/no/da). Romance Tier 4 (fr, it, pt) authored without NSR per stronger Claude quality assessment. See `project_k3_phrasing_native_speaker_review.md`.

#### 17.5.1 NSR-flag pattern for Nordic + non-Romance commissions
Claude's Nordic quality is weaker than Romance/Germanic. Track A + Wave 1 commissions ship at correct-enough state: auto-derived theme axis-key entries mechanical; topicPage authoring mirrors structural shape; per-locale chrome reaches functional state via cross-locale precedent mirroring. NSR-flag in commit message identifies deferred review. Applies to Nordic + future non-Romance commissions. Does NOT apply where chrome shipped via cross-locale-precedent with native-equivalent confidence.

### 17.6 Content marketing surface
Practical name TBD ("Blog" / "Guides" / "Resources"). Minimum cadence: one substantive article per week in strongest content language, translated/adapted into priority languages over time.

Article topics specific to multilingual K-3 educators:
- "Five ways to support Spanish-speaking children in English-medium kindergarten"
- "How to choose age-appropriate math activities for multilingual learners ages 4-6"
- "Working with multilingual parents in early childhood programs"
- "Integrating home languages into classroom instruction without disrupting curriculum"
- "Lesson planning for international school early years"

Every guide article embeds a sample deck (§18).

### 17.7 What this means for Claude Code

When commissioned for a public page, CC:
1. Reads current `seo-strategy.md`
2. If new content territory, asks operator to commission keyword research from Claude first
3. Implements server-rendered with proper schema markup, hreflang, embedded sample deck, mobile-first, lazy-loaded, native-language URL slugs
4. Adds to XML sitemap
5. Cross-links from related pages both directions
6. Validates LCP < 2.5s before done

### 17.8 The deck.html SEO surface

Each deck published is a self-contained static HTML at a public URL (§4.4). Google sees each deck.html as its own page. Across 400-600 launch target growing to thousands in 11 language variants, this is a meaningful long-tail SEO surface.

SEO design is locked **before bulk generation begins**. Retroactively adding markup would require regenerating thousands of decks.

Two constraints: **§4.4 cacheability** — deck.html served to all teachers + Googlebot is the same bytes; all SEO baked at publish time; no request-time templating. **§14.3 attribution neutrality** — SEO additions do not modify attribution footer.

**v1 / v2 scope split.** v1 (now): each deck.html carries the SEO surface but no cross-language sibling tracking. `content_family_id` reserved nullable schema field ships day one; stays `null` for every v1 deck; hreflang block empty. v2 (later): "translate this deck" workflow generates siblings sharing `content_family_id`; publish-cli injects hreflang. Reserving schema field now avoids migrating v1 decks once v2 lands.

#### 17.8.1 deck.html `<head>` requirements

1. **`<html lang="...">`** from manifest's `language`.
2. **`<title>`** — `<Exercise type capitalized> Worksheet — <Theme capitalized> — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio`. Example: `Addition Worksheet — Animals — Kindergarten | LessonCraftStudio`. Fallbacks: omit theme segment if none; omit ed-level segment + em-dash if no `age_range`. 50–60 chars; truncate. Localized.
3. **`<meta name="description">`** — `Free interactive <exercise type> worksheet <theme phrase> for __EDUCATIONAL_LEVEL_LOCALIZED__. <Activity instruction sentence>. Print or play online.` 150–160 chars; truncate. Localized.
4. **`<link rel="canonical" href="__CANONICAL_URL__">`** substituted by publish-cli. Pattern: **`https://lessoncraftstudio.com/<locale>/decks/<native-language-slug>/`** — locale-prefixed; `decks` constant English noun; native-language slug deterministic from localized title. Trailing slash; no `.html`. Examples: `/de/decks/addition-tiere-kindergarten/`, `/en/decks/addition-animals-kindergarten/`, `/fi/decks/yhteenlasku-elaimet-esikoulu/`. Internal `deck_id` stays as DB key + manifest key + ZIP filename; not in public URL. Slug generation in §17.8.5.
5. **`<!-- HREFLANG_INSERTION_POINT -->`** at end of `<head>`. publish-cli substitutes: v1 → empty string. v2 → one `<link rel="alternate" hreflang>` per sibling + `hreflang="x-default"` to English (or first published). On new sibling publish, re-injects into all existing siblings.
6. **`<script type="application/ld+json">`** Schema.org `LearningResource`:
   - `@context`, `@type: LearningResource`
   - `name` (title minus suffix; substituted)
   - `description` (same as meta description; substituted)
   - `learningResourceType: Worksheet`
   - `educationalLevel` (English from `__EDUCATIONAL_LEVEL__`: `Preschool`/`Kindergarten`/`Grade 1`/`Grade 2`/`Grade 3`)
   - `teaches` (exercise type's topic slug)
   - `inLanguage`, `isAccessibleForFree: true`
   - `creator: {"@type":"Organization", "name":"LessonCraftStudio", "url":"https://lessoncraftstudio.com"}`
   - `audience: {"@type":"EducationalAudience", "educationalRole":"student"}`
   - `url` (substituted via `__CANONICAL_URL__`)

   Compact JSON; no newlines/comments/trailing whitespace.

#### 17.8.2 deck.html `<body>` requirements

1. **One `<h1>` per deck** with worksheet title. Replace existing `<div>` wrapper.
2. **Instruction sentence wrapped in `<p>`**, not `<div>`. Semantic markup only.
3. **`alt` on every `<img>`** from image library. Alt = vocabulary entry in deck's language. No empty alts — a missing vocab entry is a vocab bug.
4. **Hidden text describing exercise content** via `aria-label` or visually-hidden span. Generated from manifest's `exercises` array. Standard `sr-only` CSS.
5. **End-of-deck internal links** — 3-4 real `<a href>` to topic destination pages, rendered at end-screen. Per §16.5 α-granular axes: `/<locale>/topic/<exercise-type-slug>/` + `/<locale>/topic/<theme-slug>/` (only when theme set) + `/<locale>/topic/<educational-level-slug>/` + `/<locale>/`. Real anchors, not JS-driven buttons. Link text in deck's language. publish-cli substitutes via placeholder pairs in §16.5.

#### 17.8.3 Out of scope (anti-SEO)
No keyword stuffing · no competing for high-volume head terms (long-tail specificity only) · no platform-wide content in each deck.html · no AI-generated marketing copy in decks · no tier-dependent SEO content · no request-time templating.

#### 17.8.4 Changes in `catalogExport()` (shared module §15.2)
`catalogExport()` emits structure without filling values dependent on `metadata.json` or published context: `<title>` with `__EDUCATIONAL_LEVEL_LOCALIZED__`; meta description with same; Schema.org JSON-LD with `__EDUCATIONAL_LEVEL__`, `__EDUCATIONAL_LEVEL_LOCALIZED__`, `__CANONICAL_URL__`; HREFLANG_INSERTION_POINT marker; `__CANONICAL_URL__` in canonical link + JSON-LD url; topic-destination URL placeholders; `aria-label`/`sr-only` per exercise row.

Per-app changes surgical: title wrapper `<div>` → `<h1>`; instruction wrapper `<div>` → `<p>`; add `alt`; add `aria-label`. Apps do NOT populate `educational_level` or canonical URL (publish-cli's job).

**Multi-template-variant pattern (Group B Phase 2 — picture-path).** Per-row pattern generalizes to multiple template keys dispatched on `bundle.mode`. Picture-path: `srPuzzlePicturePathPathway` / `srPuzzlePicturePathClassicMaze` / `srPuzzlePicturePathChoosePathSingle` / `srPuzzlePicturePathChoosePath`. Per-app code in `renderStandaloneHTML()` selects on `bundle.mode` (+ secondary discriminators per §17.8.12). Conditional segments appended after mode-template-fill. Originating: `75d4a27c`.

#### 17.8.5 Changes in `publish-cli`

publish-cli inherits these substitutions on every upload:

1. **Generates native-language slug** from manifest's localized title. Lowercase, hyphen-separated, ASCII-folded (`ä`→`a`, `ñ`→`n`); de-duplicated by appending numeric suffix on collision for same locale. Stored in new **`slug` column on `Deck`** — additive, nullable for pre-existing, required for new, `@@unique([language, slug])`. Migration must land before first publish.

2. **Substitutes `__CANONICAL_URL__`** with `https://lessoncraftstudio.com/<locale>/decks/<slug>/`.

3. **Computes `educational_level` + `educational_level_localized`** from `age_range` via §17.8.6. Stored on merged manifest; substituted into deck.html.

4. **Substitutes `<!-- HREFLANG_INSERTION_POINT -->`** with hreflang block (v2 with siblings) OR empty string (v1).

5. **Substitutes topic-destination URL placeholders** in end-of-deck links per §16.5 α-granular schema, reading `topics-taxonomy.json` (§16.4). Four `__LINK_*__` URL + four `__LINK_TEXT_*__` localized-text.

When v2 sibling published, publish-cli re-injects updated hreflang into all already-published siblings — only operation that touches an already-published deck.html.

**ASCII-fold implementation.** `scripts/publish-cli/slug.js` uses `String.prototype.normalize('NFD').replace(/[̀-ͯ]/g, '')` for combining-mark strip; explicit map for non-decomposable (`ä→a`, `ß→ss`, `æ→ae`, `ø→o`, `å→a`, `ł→l`). Romance-apostrophe v1 hyphenates (`l'addition → l-addition`); v2 strip deferred.

**Empirical examples** (from `134614dc` + `947ad260`):

| Input displayName | Output slug | Notes |
|---|---|---|
| `4. Juli` (de) | `4-juli` | period → hyphen; collapse runs |
| `Süßigkeiten` (de) | `sussigkeiten` | ü→u, ß→ss |
| `Bäume` (de) | `baume` | ä→a |
| `Vögel 2` (de) | `vogel-2` | ö→o; numeric variant preserved |
| `Christmas B&W` (en) | `christmas-b-w` | `&` → hyphen; collapse |
| `Postres y dulces` (es) | `postres-y-dulces` | spaces → hyphens; lowercase |
| `Réveil` (fr) | `reveil` | é → e |
| `Hogar BN` (es, Class 2 fallback) | `hogar-bn` standard OR `household-bw` Option A for `household_bw` only | §16.5.1 |

**Slug-shape canonical for theme-bearing decks** (locked at `785d63f6`). `manifest.theme` non-null → **`<exercise-type>-<exercise-mode>-<theme-axis-key>`** — operation+mechanic+content ordering. Examples: `addition-find-addend-animals` (en), `addition-image-image-4th-of-july` (en), `subtraction-cross-out-valentine-bw` (en). Themeless decks (manifest.theme=null) preserve `<exercise-type>-<exercise-mode>` shape per `if (manifest.theme)` guard.

**Why operation+mechanic+content ordering:** URL-prefix-match aligns with Google search-snippet leading-segment prominence + teacher operation-first search grammar. Mechanic-clustering reads naturally across alphabetic-sort positions. Reads as deck-identity claim. Distinct from intersection-URL axis-ordering (theme→level→type per §16.5.3 navigation grammar); deck-page URLs are leaf-level destinations.

**Slug-derivation gap class.** Slug rules dropping manifest fields propagate SEO degradation. Phase 1 inventory includes slug-pattern preview via `publish-bulk --dry-run` BEFORE `--confirm`. The 443-deck Track C en addition+subtraction wave (2026-05-05) surfaced this when dry-run revealed slugs collapsed to 8 unique patterns because pre-fix slug-derivation read only `exercise_type + exercise_mode`.

**Anti-pattern:** auto-suffix-and-proceed when within-batch slug collisions surface at dry-run. Default to surfacing inspection report per §15.13.

Origin: `785d63f6` (theme-aware slug + single-SoT refactor).

**Default-mode-emits-null contract pattern.** For multi-mode apps (§A.13.4 DERIVED), most-common mode emits null (shorter URL); non-default modes get explicit slug component. Kindergarten-default sudoku slugs as `sudoku-animals` (cleaner) not `sudoku-easy-animals`; non-default `medium`/`hard` become `sudoku-medium-animals`/`sudoku-hard-animals`. Locked taxonomy for 10 multi-mode apps from Commission ε in commit `109a91d4` body (no embedded table; avoids CLAUDE.md drift). Operator-strategic per §1 SEO-first: default = most-common authoring intent + shortest URL.

Origin: `109a91d4` (16 hardcoded-null apps → DERIVED post-`5078f491` code-addition reference).

**Native-language slug derivation** (native-language-slug commission 2026-05-11). publish-cli derives slug components per-locale from `topics-taxonomy.json` rather than raw English-canonical axis-keys. Closes §17.4 native-language-slug doctrine gap latent since publish-cli's first slug derivation; surfaced at first non-EN catalog publish at scale (1018-deck ES math-cluster wave 2026-05-11).

Component resolution:
- `manifest.exercise_type` → `axes.exercise-type.<key>.slug.<manifest.language>`
- `manifest.exercise_mode` → `axes.exercise-mode.<key>.slug.<manifest.language>`
- `manifest.theme` → `axes.theme.<key>.slug.<manifest.language>`
- `manifest.variant_id` → appended bare (NOT localizable)

**Fallback chain (`slug.js localizeAxisKey`):** (1) taxonomy entry missing → WARN, fall back to bare key; (2) entry present but `slug.<locale>` null/missing → WARN, fall back to `slug.en`; (3) `slug.en` missing → fall back to bare axis-key. WARN entries surface locale-coverage gaps per §16.6.1.

**Example (es):** manifest `{exercise_type:'subtraction', exercise_mode:'find-subtrahend', theme:'animals', language:'es', variant_id:'1507'}` → seed `resta buscar-sustraendo animales 1507` → slug `resta-buscar-sustraendo-animales-1507`.

**Backwards compat:** EN decks slug identically pre-amendment because `axes.<axis>.<key>.slug.en === <key>` (taxonomy invariant). No EN retrofit needed.

**Anti-scope:** non-EN already-published retrofit is per-commission scope. The ES wave (1018 decks) retrofit at native-language-slug commission via unpublish-then-republish. Future de/nl/fr/it/pt/sv/da/no/fi waves derive natively at first publish.

Origin: native-language-slug commission 2026-05-11.

#### 17.8.6 The age-range → educational-level mapping

`educational_level` is **deterministically derived** from `metadata.json`'s `age_range` by publish-cli. Apps never compute. Single source of truth.

| `age_range` | `educational_level` (English; Schema.org) | i18n key for localized form |
|---|---|---|
| `3-5` | `Preschool` | `seo.educational_level.preschool` |
| `5-7` | `Kindergarten` | `seo.educational_level.kindergarten` |
| `6-8` | `Grade 1` | `seo.educational_level.grade_1` |
| `7-9` | `Grade 2` | `seo.educational_level.grade_2` |
| `8-10` | `Grade 3` | `seo.educational_level.grade_3` |

English populates Schema.org `educationalLevel`. Localized (via `seo.educational_level.<key>` in next-intl) populates localized `<title>` + meta description. Both stored on `metadata.json` so publish-cli doesn't recompute.

**Per-tier i18n coverage at Phase 6:** Tier 1-2 (en/de/es/nl) operator-authored; Tier 3 (sv/fi/no) authored with operator-best-effort + NSR flag; Tier 4 (da) NSR per Nordic; Tier 4 (fr/it/pt) operator-best-effort without NSR.

**Corpus ceiling note.** 5 axis-keys defined; Pass 1-6 exercised 4-of-5 across 29 apps: preschool 4 / kindergarten 19 / grade-1 5 / grade-2 1 / grade-3 0. grade-3 (8-10) defined-but-unused at K-3 natural ceiling. Stays at 5 keys for forward compat.

#### 17.8.7 v1 vs v2 scope: cross-language sibling tracking

Hreflang only matters when real cross-language siblings exist. Real siblings only exist when operator explicitly translates a deck.

**v1 (now):** `content_family_id` reserved **nullable** column on `Deck`. Always `null` for every v1 deck. **publish-cli behavior under null is normative, not defensive.** Encountering null → (1) replaces marker with empty string, (2) skips sibling re-injection. v1 implementers must NOT add validation that errors or warns on null — null is expected v1 state.

**v2 (later):** translate-this-deck workflow. Operator selects published deck, clicks "translate to <language>". Workflow generates new deck with same images/exercise structure/theme; only language strings differ. Translate action assigns shared `content_family_id` to both source (back-filled) + new sibling.

**Why reserve schema field now:** if added later, every v1 deck needs migration. By reserving day one (nullable, default null), v1 ships clean; v2 backfills only decks that become siblings.

**v2-forward-compatibility:** v1 substitution function accepts optional sibling-list parameter defaulting empty; v2 caller populates.

#### 17.8.8 What this section does NOT change
Attribution per §14.3 (tier-neutral). Tier model per §7. Cache per §4.4. Pricing per §7. Apps that export per §14.9. Catalog-export ZIP per §15.2; manifest gains one field on generation.json + two on metadata.json per §15.1. URL pattern for `/<locale>/topic/<slug>/` per §16.5.

#### 17.8.9 Answer-bearing-field hygiene
Bundle fields containing puzzle answers comment-marked at construction: `// ANSWER-BEARING — sr-only template MUST NOT echo this`. Concrete: sudoku `holes[].correctImageIndex`; picture-path `solutionPath` + `legend.items[].correctCount`; cryptogram `slots[].cipherLetter` AND `slots[].expected` (naming misleading; both hold plaintext); subtraction + Brief A 5A apps `slot.expected`.

#### 17.8.10 Row+col 1-indexed indexing convention for sr-only
Bundle 0-indexed; per-app code converts to 1-indexed at template-fill: `var startRow1 = (bundle.startCell.r != null) ? (bundle.startCell.r + 1) : '';`. First surfacing: picture-path Phase 2 `75d4a27c`.

#### 17.8.11 Defensive-skip discipline for sr-only emission
When bundle invariants violated at sr-only emission, emission is **skipped entirely** — do NOT render degraded variant. Invariants per app: sudoku skips if `uniqueImageKeys`/`gridDims`/`holes` missing; cryptogram skips if `cipherMap` missing OR `legendSlots` empty; picture-path skips if `mode` unrecognized OR `gridDims`/`startCell`/`endCell` missing OR mode-specific image-field contracts violated OR choose-path with null/0/non-numeric `endpointCount`. Originating: sudoku `37cbec62`, cryptogram `9c9b1b55`, picture-path `75d4a27c`.

#### 17.8.12 Mode-conditional dispatch with sub-variants
Extension of §17.8.4. Dispatch order: (1) mode primary → one of N templates; (2) secondary scalar branching within mode (picture-path `endpointCount === 1` → ChoosePathSingle; `>= 2` → ChoosePath); (3) conditional segment presence (collectibles when `legend.items[]` non-empty). First surfacing: picture-path Phase 2 `75d4a27c`; Phase 1 reopen `a3697abe` added `endpointCount` bundle field.

#### 17.8.13 List-joiner convention (promote at 4th-consumer threshold)
`Intl.ListFormat` directly with defensive fallback (`try { Intl.ListFormat(srLang, {style:'long',type:'conjunction'}) } catch { hardcoded English Oxford-comma }`). Three call sites: sudoku, cryptogram, picture-path. Promote to `LCSCatalogExport.formatList(items, locale)` at 4th consumer. Originating hotfix: `8f4f9685`.

#### 17.8.14 Sr-only-emission srLang-keyed lookup convention
Sr-only emission sites use **srLang-keyed `translations[srLang][key]` lookup directly**, bypassing per-app `t()`. Three-level fallback: srLang → en → hardcoded EN. `srLang` derived from `bundle.contentLanguage`. Reason: per-app `t()` locale-binding architectural divergence causes mixed-locale sr-only. Convention: at sr-only emission in `renderStandaloneHTML()`, do NOT call `t(key)`. Hotfix `573f69e0`.

#### 17.8.15 In-deck share affordance
Each deck.html ships in-deck share via `LCSCatalogExport.buildShareAffordance` (§14.3a). Placement: top-right of `lcs-bar` after `<button class="lcs-mute">`, 40×40 with `.lcs-share` class. **Web Share API progressive enhancement:** capable → `navigator.share({title, url})` OS-rendered share sheet; no Web Share → self-contained 5-platform overlay in deck's content-locale. v1 platforms locked: Facebook, WhatsApp, Pinterest, email, copy-link + Web Share API. Pre-filled captions empty. No platform SDKs; plain anchor links (`facebook.com/sharer/sharer.php?u=...`, `api.whatsapp.com/send?text=...`, `pinterest.com/pin/create/button/?url=...`, `mailto:?subject=...&body=...`); copy-link invokes `navigator.clipboard.writeText(url)` with 2s `srShareCopied` toast. Defensive-skip per §17.8.11 when `canonicalURL` missing AND `locale + title` cannot construct one. Second consumer of §17.8.14 srLang-keyed lookup (`bbcb444c` initial typo corrected). v1 Option A predicted-slug fallback: `https://lessoncraftstudio.com/<locale>/decks/<slugify(bundle.title)>/` (catalog deck route not yet shipped; deferred items: slug collision rare; apps hardcode English `bundle.title`). Tier-neutral + SEO-neutral; same bytes; immutable per Cloudflare cache key.

#### 17.8.16 Mutable-regions contract via SEO_INSERTION_POINT marker pair
deck.html `<head>` SEO uses paired `<!-- SEO_INSERTION_POINT_START -->` + `<!-- SEO_INSERTION_POINT_END -->` defining mutable region for retrofit. **Class A (post-Phase-3a.2):** markers present; retrofit replaces between-markers, leaves outside intact. **Class A.1 (post-Phase-3b):** marker pair + `manifest.seo_trace` present; retrofit sources from trace. **Class A.2:** marker pair present; trace absent; retrofit derives from i18n + taxonomy + EN fallback. **Class B (pre-Phase-3a.2):** markers ABSENT; retrofit strips pre-existing SEO elements (title / meta / canonical / og:* / twitter:* / JSON-LD) + injects marker pair + canonical surface + preserves outside. Defensive strip per Phase 4a CP1 fix-2 (`b5c1f3c1`). Atomicity: temp+rename per `republish-seo.js: rewriteDeckHtmlAtomic`; `rename(2)` kernel-atomic. Origin: Phase 4a Checkpoint 1 (`a0ab3cf0` → `b5c1f3c1`).

#### 17.8.17 Phase 2 §1-§7 invariants codified as deck-page SEO doctrine

`[ARC][SEO][DECK-PAGE]` commission's Phase 2 doctrine (`docs/SEO/deck-page-arc-phase-2-doctrine-draft.md`) enumerated 7 deck-page SEO invariants. Each enforced by a predicate at `scripts/publish-cli/seo-reconciliation.js`.

| # | Invariant | Predicate | Class |
|---|---|---|---|
| 1 | Title uniqueness per (language, titleHash) | `reconcileTitleUniqueness` | HALT |
| 2 | Description uniqueness per (language, descriptionHash) | `reconcileDescriptionUniqueness` | HALT |
| 3 | Canonical-URL pattern (www-form + locale + native slug + trailing slash) | `reconcileCanonicalURLPattern` | HALT |
| 4 | OG tag completeness (14 tags: 7 og:* + 7 twitter:*) | `reconcileOGTags` | HALT |
| 5 | Inbound-link minimum N≥3 non-sitemap surfaces | `reconcileInboundLinkSurface` | HALT (post-Phase-5) |
| 6 | Locale-residue absence (path-(b) trace per Phase 3b) | `reconcileLocaleResidue` | HALT |
| 7 | Single-h1 per deck | `reconcileSingleH1` | HALT |

**1 WARN-class retained:** `OG_IMAGE_FALLBACK_USED` (informational; per-deck thumbnail vs site-default fallback).

**Invariant 1 + 2:** enforced at DB via `@@unique([language, titleHash])` + `@@unique([language, descriptionHash])`. Predicate-side check pre-INSERT/UPDATE via `findExistingByTitleHash` + `findExistingByDescriptionHash` callbacks. Forward-flow at 100% post-(θ); backward-flow at 63.3% en + 100% non-en (Phase 4a (ι) close).

**Invariant 3:** www-form per §A.10; locale prefix per §17.4; native slug per §17.4.1 + §17.8.5; trailing slash per §15.7.

**Invariant 4:** 14 tags emitted by `LCSCatalogExport.buildSeoHead` + `build-seo-head.js` Node-CJS port (republish-seo retrofit).

**Invariant 5:** N≥3 non-sitemap surfaces via 8-surface counter at `scripts/publish-cli/count-inbound-surfaces.js`. HALT post-Phase-5 close.

**Invariant 6:** path-(b) origin-tracing via `manifest.seo_trace` (Phase 3b primary); path-(a) lexicon-fallback at `seo-reconciliation-exceptions.json` (deprecated; defensive only).

**Invariant 7:** structural HTML; predicate counts h1 elements post-substitution. Phase 3b sweep moved celebration h1 → h2 across 29 apps.

**Auto-control state at commission close:** all 7 enforced HALT-class on every new publish via `reconcileDeckPageSEO` at `seo-reconciliation.js:778`. Operator does not need to remind CC; gate IS the reminder.

Origin: Phase 2 doctrine (`ac9109c7`).

### 17.9 [REMOVED 2026-05-17] Pillar 1 lesson-plan production discipline

Section deleted per operator commission (commit `920aebbc` "[REMOVE][SCHEMA] DROP teaching-packages domain tables"). The lesson-plans / teaching-packages / themed-bundles domain was nuked in full: code + data + DB schema + docs. The cooperation-pattern production discipline previously documented here is historical and no longer load-bearing. Future commissions that touch teacher-facing pedagogical content authoring may revive subsets of this discipline; until then, treat as obsolete.

### 17.10 I18n hygiene + sitemap-shard infrastructure

**17.10.1 4-shard sitemap-index hash-partitioning.** 4 shards: 0/1 = published deck URLs by `Deck.id` last-char ASCII parity (50/50); 2 = 2-axis intersections; 3 = single-axis topic pages + locale-root + meta. Keeps each under Google's 50K limit. Cross-locale through same 4 shards. Master auto-generated via `generateSitemaps`. Origin: `e5bb3cb4` + `85f090a3` Arc 6c.

**17.10.2 Reuse-existing-i18n-key when strings identical.** Identical (key, locale) values reuse single shared key. Origin: `15444fe8` Arc 6a.

**17.10.3 Substrate-honesty namespace-boundary discipline.** Phase 1 grep ALL platform locale files for namespace's key set; Phase 4 confirm 11/11. Mismatch → raw-key-leak. Origin: `c03fdb8e` Arc 6d.

**17.10.4 Wave-N namespace-migration discipline.** Wave 1 ships baseline for subset (Tier 1+2); Wave 2+ folds remaining. Phase 1 cross-locale audit; Phase 2 per-locale gap-fill OR migration; Phase 3 single commit N locale files; Phase 4 per-locale curl + raw-key-leak grep. Origin: `672e771b` + `a1c78529` Wave 2 footer.

**17.10.5 Runtime-consumer-audit is load-bearing.** Runtime consumer (which keys component actually calls) is load-bearing. Static-text references in admin tooling are isolated. Grep `useTranslations\(['"]<namespace>` + `getTranslations.*<namespace>`. Wave 2 footer: legacy 13-key referenced only in 2 admin HTMLs; deletion safe. Origin: `672e771b`.

**17.10.6 Legacy-namespace-residue audit-on-arc-Phase-1.** Locales with Wave 1 partial coverage carry legacy seller-era shapes as runtime-orphaned residue. Wave 2 footer found 7 newer locales with 13-key seller-era shape. Audit BOTH forward gap AND backward residue. Origin: `672e771b` + `a1c78529`.

**17.10.7 Cross-locale convention parity verification.** Phase 1 samples Tier 1+2 actual canonical TEXT shape — not just key presence — to prevent register divergence. Wave 2 footer initially used bare-prefix ("Par langue") until Phase 4 revealed Tier 1+2 is noun-prefixed ("Worksheets by language" / "Arbeitsblätter nach Sprache"). Fix-up `a1c78529`.

---

## 18. Sample decks embedded on every public page

Every public page includes a working interactive deck the visitor can play, in their language. Home, about, pricing, blog, topic, guide — each lets visitors experience the product rather than read about it.

### 18.1 Why this matters
Most education sites describe + ask to sign up. Conversion psychology is weak. Reversing this — product on every marketing page — is generous and produces stronger conversion because experience is persuasion. Also disciplines the rest of the site: marketing copy doesn't have to do all persuasion work.

### 18.2 Implementation principles
- **Same iframe infrastructure powers samples + subscriber embeds.** Build once.
- **Each sample curated for page context.** Operator selects per page rather than random.
- **Samples render in page's language.** hreflang handles URL-level routing.
- **Samples are not gated content.** Same deck as catalog at full quality, free for everyone.
- **Lazy-loading below the fold.** A topic page with 4-8 previews requires lazy-loading. LCP < 2.5s.

### 18.3 What the sample provides
Fully playable — answers questions, gets feedback, completes activity. Not a screenshot/video/preview. Interaction is the marketing. Small "Made with LessonCraftStudio" attribution per `LCSAttribution` links back to catalog. **No signup walls, subscription prompts, or login requirements inside the sample.** Signup + subscription prompts live elsewhere on the page.

### 18.4 Section 2 breadth-grid curation: three load-bearing equilibria

Home Section 2 grid (8 deck thumbnails + 1 featured inline-play tile) curated against three independent equilibria, all three must hold post any stagger event:

1. **Locale balance.** Picks across active production locales. Established 2-en/2-de/2-es/2-nl 4-locale grid at NL Track C Batch 1 (`d361a03e`).
2. **Theme/themeless balance.** 4 themed (`{animals|vehicles|food|fruit}`) / 4 themeless. Locked since Track C Batch 1 ES (`035852c3`).
3. **Mechanic-diversity.** 8 distinct mechanics across 8 picks. Featured (currently `sudoku-en`) counts as one.

All three load-bearing. Locale + theme alone underspecify: a 2/2/2/2 grid with 4-themed/4-themeless can cluster picks on a single mechanic (NL Batch 1 at `d361a03e` shipped `matching-letter-nl` + `shadow-match-nl` both matching-mechanic).

**Mid-arc theme-refresh swap pattern.** NL Batch 4 at `0bb02030` dropped both matching-mechanic decks and added `missing-pieces-nl` + `chart-count-nl` (visual-completion + Family-D bar-chart), restoring 8 distinct mechanics. Locale 2/2/2/2 held; theme 4/4 held. Mid-arc-correct because: doesn't shift locale weighting; introduces fresher content; restores mechanic-diversity without operator-strategic locale rebalancing.

**When NOT to apply:** first-publish events (establish baseline) or closeout milestones (can hold or refresh per operator strategic call). At Tier-2 closeout (NL Batch 7 `d3b4f962`), operator chose hold-2/2/2/2.

Cross-reference SECTION-2-CURATION-v1.md (canonical curation spec).

#### 18.4.1 Variety-strip composition rules at scale
Cross-reference §16.2 for canonical strip-composition spec.

**Cardinality caps as variety-shape signals.** Each strip's cap encodes the variety SHAPE:
- Strip 1's max-1-per-locale spreads (cross-locale demonstration)
- Strip 2's max-2-per-axis-key allows mild clustering but prevents single-axis-key dominance
- Strip 3's max-1-per-educational-level + per-page-axis self-skip
- Strip 4's max-1-per-topicSlug + max-1-per-locale forces catalog-overview operation

**Self-skip threshold (cardinality < 2).** Single-tile reads broken; minimum 2 signals genuine variety. Per-strip. Locked at 2.

**Cross-locale variety ON during substrate-only-locale period.** Decks from en/de/es/nl surface on it/fr/pt/sv/da/no/fi until Track C lands.

**ISR per-page revalidation.** `revalidate=3600`. No module-scoped global memoization at this scale.

**Worked example: Catalog Variety Arc 1 ship at `55ac5687`.** Canonical reference for future variety-surface commissions.

#### 18.4.2 BreadthGrid 4-family hybrid + 9-cell composition + day-of-week rotation

Shipped at `e5bb3cb4`.

**4-family canonical locale-family map:**
- **Germanic:** en, de, nl
- **Nordic:** sv, da, no
- **Romance:** es, fr, it, pt
- **Finnic singleton:** fi (with Nordic-as-sibling-proxy)

Sibling pools: `en→[de,nl]`, `de→[en,nl]`, `nl→[de,en]`, `sv→[da,no]`, `da→[no,sv]`, `no→[sv,da]`, `es→[fr,it,pt]`, `fr→[es,it,pt]`, `it→[es,fr,pt]`, `pt→[es,fr,it]`, `fi→[sv,da,no]`.

**Visitor-recognition vs linguistic-typology.** 4-family map prefers visitor-recognition over scholarly-typology. Finnic fi grouped with Nordic because Finnish teachers searching for Nordic-language K-3 recognize sv/da/no as adjacent-market peers — even though Finnish is Uralic. nl with Germanic en/de (visitor-natural) not Romance.

**9-cell composition (6+2+1):** 6 visiting-locale tiles + 2 cross-locale tiles (one per sibling rotated) + 1 featured tile (operator-curated; currently `sudoku-en`).

**Day-of-week rotation rhythm:**
```js
function dayOfWeekRotation(): number {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % 7;
}
```
UTC-anchored; within-day stable; varies across days. Preserves ISR-cache (1-hour revalidate). Anti-pattern: per-request randomization (fragments ISR cache).

Origin: `e5bb3cb4`.

---

## 19. Language launch sequence

Treats 11 languages as priority tiers rather than equal tracks — depth in priority languages produces stronger SEO than uniform shallow coverage.

### 19.1 Priority tiers
- **Tier 1 (months 1-3) depth at launch:** English, German. Claude's keyword research strongest; largest audience volume; moderate competition. Target: 50+ topic pages, 30+ guide articles, 200+ decks each.
- **Tier 2 (months 3-6) depth:** Spanish, Dutch. Spanish for dual-language US + Latin America + Spain bilingual prevalence; Dutch for international schools in NL + BE. Target by month 6: 30+ topic pages, 15+ guides, 100+ decks each.
- **Tier 3 (months 6-9) differentiation:** Swedish, Finnish, Norwegian. Smaller audiences; virtually no competition. Native-speaker review more important per §17.5.1. Target by month 9: 15-20 topic pages, 8-10 guides, 60+ decks each.
- **Tier 4 (months 9-12) completion:** French, Italian, Danish, Portuguese.

### 19.2 What "depth" means
Depth-launched: complete home page + localized copy + embedded sample · pricing · populated catalog at target deck count across 29 types · topic pages with substantive descriptions · guide section at target article count · native-language URL slugs · hreflang siblings · native-speaker review of important pages. (Lesson-plan + parent-note depth axes removed 2026-05-17.)

Non-depth at launch: catalog populated but minimal pedagogical content; home may be auto-translated stub.

### 19.3 English honest caveat
English in Tier 1 for audience volume, but K-3 English competitive reality is harder than German. Education.com, Twinkl, TPT have decades of authority. English probably can't rank for "kindergarten math worksheets" for years.

English content's role: convert visitors arriving through other channels (LinkedIn, conference, partnerships) + be findable by international school teachers searching specific multilingual queries.

Honest content investment ratio closer to 30% English / 70% other priority languages, weighted toward markets where moat is strongest.

### 19.4 Adjustments based on data
Three months after launch, review which languages produce organic search, lowest bounce + highest engagement, first subscribers, inbound from outreach. Languages exceeding expectations get accelerated investment. Underperforming get either deeper investment (audience exists but content doesn't reach) or quiet deprioritization.

### 19.5 Launch-state update (post-substrate-complete 2026-05-03)
At `a47ea021`: substrate complete across all 11 locales (Track A + Wave 1). Deck-publish unblocked for any (axis-key × locale).
- **Tier 1 (en, de):** Track A + Wave 1 + Track C catalog complete.
- **Tier 2 (es, nl):** Track A + Wave 1 + Track C catalog complete (Tier-2 closeout `d3b4f962`, 116 decks across en+de+es+nl with all 4 locales at 100% C-1 coverage).
- **Tier 3 (sv, fi, no) + Tier 4 (fr, it, da, pt):** Track A + Wave 1 substrate complete (`b3f0d1f3`, `9ea577fe`, `589fd554`, `a47ea021`); deck-publish unblocked; Track C remaining as open per-locale commissions prioritized per operator.

---

## Appendix A — Production safety rules

### A.1 Server + isolated storage
- **Host:** `65.108.5.250` (root). SSH via plink/pscp with `-pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU`.
- **Code (git repo):** `/opt/lessoncraftstudio`
- **Isolated storage (NOT in git):** `/var/www/lcs-media/`
  - `samples/` `image-library/` (2.6 GB, 3000+ files) `worksheet-generators/` (33 apps + `js/`) `admin-panels/` `design-elements/` (81+ SVGs) `backups/` `scripts/`
- **Symlinks** (follow transparently; never remove):
  - `frontend/public/worksheet-generators` → `/var/www/lcs-media/worksheet-generators`
  - `frontend/public/admin` → `/var/www/lcs-media/admin-panels`
  - `image library` → `/var/www/lcs-media/image-library`
- Samples served by nginx directly (`location /samples/`), bypassing Next.js.

### A.2 Reference folders (source of truth)
Always edit first; canonical for deployment:
- `REFERENCE APPS/` — 33 worksheet HTML files
- `REFERENCE TRANSLATIONS/` — translation JS files
- `REFERENCE CONTENT MANAGERS/` — content-manager HTML files

After modifying, run `scripts\master-sync.bat`.

### A.3 NEVER DO

**Git:**
- `git add .` in project root (could pull in samples/images)
- `git add samples/` or any image/PDF/sample file (pre-commit hook blocks)

**Never `rm -rf`, `mv`, bulk-delete, `find -delete`, or `chattr -i` on:**
- `/var/www/lcs-media/samples`
- `/var/www/lcs-media/image-library` (and `image library` symlink)
- `/var/www/lcs-media/worksheet-generators`
- `/var/www/lcs-media/admin-panels`
- `/var/www/lcs-media/design-elements`
- `/opt/lessoncraftstudio/stripe-backup` (immutable; legacy)

**Never delete these files/symlinks:**
- `frontend/public/worksheet-generators` (symlink)
- `frontend/public/admin` (symlink)
- `frontend/app/api/webhooks/lemonsqueezy/route.ts`
- Immutable content managers in `frontend/public/` (`homepage-content-manager.html`, `user-control.html`)

**Never run without EXPLICIT operator approval:**
- `chattr -i` / `chattr -R -i` on protected paths
- Modify any `LEMONSQUEEZY_*` env var
- `DELETE` / `TRUNCATE` / `DROP` on: `users`, `ls_webhook_events`, `design_elements`, `image_library_items`
- Re-run `scripts/import-*-images.js` (strip diacritics; must re-run fix scripts afterward)
- Regenerate `image-vocabulary.js` without verifying diacritics in raw JSON

### A.4 Update helpers — never direct `cp` on immutable files
- Worksheet/translation/content-manager: `/var/www/lcs-media/scripts/update-worksheet.sh`
- Design-element: `/var/www/lcs-media/scripts/update-design-element.sh`

Handle unlock → copy → re-lock. Direct `cp` on immutable file fails + leaves inconsistent state.

### A.5 Deployment
**ALWAYS commit + push BEFORE running deploy.** `deploy.sh` runs `git pull`; unpushed commits never arrive.
- Code deploy: `plink ... "bash /opt/lessoncraftstudio/deploy.sh"`
- Per-scenario commands in `DEPLOYMENT.md`.

#### A.5.1 Schema migrations require a two-step deploy + three-step discipline

`deploy.sh` runs `git pull` + build + smoke; does NOT run `prisma migrate deploy`. Pending migrations NOT applied by `deploy.sh` alone. Surfaced at `b9e75fbe` post-deploy `\d decks` showed only pre-migration index set.

**For `[FEATURE][SCHEMA]` commits with pending migrations**, after `deploy.sh`:
```
plink ... "cd /opt/lessoncraftstudio/frontend && set -a && source .env.production && set +a && npx prisma migrate deploy"
```
Verify via Hetzner `\d <table>`.

**For migrations generated when local Postgres unavailable:** `prisma migrate diff` is canonical:
```
git show HEAD:frontend/prisma/schema.prisma > _baseline-schema-tmp.prisma
npx prisma migrate diff \
  --from-schema-datamodel _baseline-schema-tmp.prisma \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/<TIMESTAMP>_<name>/migration.sql
rm _baseline-schema-tmp.prisma
```
Match existing migration-directory timestamp format exactly.

**Prisma client regeneration is its own concern.** Schema migrations require THREE-STEP at first introduction (DB schema apply + Prisma client regenerate + code referencing new columns deploys). Without regeneration, code references hit "Unknown argument" runtime errors silently.

**Empirical:** Phase 4a Checkpoint 1 (`a0ab3cf0`) added `titleHash` + `descriptionHash`; deploy.sh ran clean + smoke PASS + DB schema applied; but retrofit's `db.update({titleHash, descriptionHash})` silently no-op'd because Prisma client generated against pre-migration schema. Manual `npx prisma generate` resolved (35.1% → 63.3% en backfill).

**Phase 4a Checkpoint 2 doctrine fix (`655e786c`):** `deploy.sh` patched to run `npx prisma generate` automatically. Post-fix, `prisma generate` is AUTOMATIC; only `prisma migrate deploy` remains manual.

**THREE-STEP post-`655e786c`:** (1) Migration apply (manual): `npx prisma migrate deploy`. (2) Client regenerate (automatic at deploy.sh): `npx prisma generate`. (3) Code deploy (existing): `git pull` + build + smoke.

### A.6 Lemon Squeezy (current payment integration)
- **Source of truth:** `frontend/config/lemonsqueezy-product-config.ts` (singular; defines `SUBSCRIPTION_PRODUCT` for $69/year). Plural `lemonsqueezy-products.ts` deleted Pass 8.
- **Webhook handler:** `frontend/app/api/webhooks/lemonsqueezy/route.ts` (HMAC-SHA256, idempotent via `ls_webhook_events.event_id`)
- **Required env:** `LEMONSQUEEZY_WEBHOOK_SECRET`, `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_STORE_SLUG`, plus `SMTP_*` / `EMAIL_PROVIDER`.
- Stripe is **not** active. Backup at `/opt/lessoncraftstudio/stripe-backup/` is immutable historical reference.

### A.7 Diacritics (image translations)
`image_library_items.translations` fully corrected 2026-03-03. `deploy.sh` runs auto-healing every deployment; Test 13 is smoke test.

Fix scripts at `/opt/lessoncraftstudio/server-scripts/`: `audit-db-diacritics.js`, `fix-db-diacritics.js`, `fix-db-diacritics-numbered.js`, `image-vocabulary-raw.json`.

#### A.7.1 image_themes Spanish-displayName data-quality issue
Surfaced `947ad260` (BW theme registration). `home_bw` and `household_bw` both have Spanish displayName `"Hogar BN"`. Class 2 collision resolved by Option A fallback (`household_bw.slug.es = "household-bw"` English-derived; `name.es` passthrough at `"Hogar BN"`). See §16.5.1.

**Fix needed:** operator-curated rename of `household_bw.displayNames.es` to distinct translation. Once renamed, Option A removed; slug re-derived via standard path. Italian `home_bw`/`household_bw` (both `"Casa BN"`) has same shape; Option A also at `b3f0d1f3`.

#### A.7.2 image_themes accent-data-quality cycle (multi-locale)
Multiple locales surfaced through 2026-05:
- **pt:** `accessories.pt = "Acessorios"` (expected `"Acessórios"`); `589fd554`
- **it:** `activities.it = "Attivita"` (expected `"Attività"`); `589fd554`
- **sv:** `accessories.sv = "Tillbehor"` (expected `"Tillbehör"`); `a47ea021`
- **da:** `accessories.da = "Tilbehor"` (expected `"Tilbehør"`); `a47ea021`
- **no:** `accessories.no = "Tilbehor"` (expected `"Tilbehør"`); `a47ea021`
- **fi:** `animals_bw.fi = "Elaimet MV"` (expected `"Eläimet MV"`); `a47ea021`

Pattern suggests systematic accent-loss at prior data-import. Slug-level safe (slugify ASCII-folds). Sweep `image_themes` UPDATE per-locale when accumulated.

#### A.7.3 fr Class 2 documentation correction (`9ea577fe`)
`9ea577fe` closeout stated fr Class 2 collision — empirical state at `a47ea021` cross-locale audit was distinct translations (no collision). Documentation correction only.

### A.8 Sample-commit protection
- Local `samples/` in `.gitignore`.
- `.git/hooks/pre-commit` blocks any sample-file commit.
- Uploads flow: **Content Manager UI → API → `/var/www/lcs-media/samples/`** — never via git.

#### A.8.1 Pre-commit hook exception for [SCHEMA] commits
Hook also blocks schema-change patterns + instructs `git commit --no-verify` as documented bypass. §A.1 "never skip hooks" has a project-documented exception specifically for `[SCHEMA]` — the `--no-verify` bypass IS the hook's own escape path. Established across `9ba9fa2d`, `4b91adc0`, `79268e49`, `1ea0bb9b`, `140fdacb`, `b9e75fbe`.

Exception applies when: commit tag includes `[SCHEMA]`; hook output explicitly says `--no-verify`; commit's diff consistent with documented schema-change pattern.

#### A.8.2 Multi-copy doctrine-file drift discipline
When doctrine file exists at multiple paths (e.g., `docs/SUBSCRIPTION-SCOPE.md` AND `important/SUBSCRIPTION-SCOPE.md`), fold operations target the path **cross-referenced from CLAUDE.md** as canonical. Surface drift in [DOCS] commit closeout: "alternate copy at `<path>` is now ~one fold-cycle behind canonical; recommend separate `[CHORE][DOCS]` reconciliation." Anti-pattern: updating both copies in fold pass to "keep them in sync."

#### A.8.3 Working-memory file post-fold-pass cleanup discipline
When [DOCS] fold consumes carry-forward items from working-memory (typically `important/SESSION-STATE.md` doctrine-queue + `important/CONVERSATION-HANDOFF.md` doctrine-queue), Phase 4 verification clears consumed entries. Working-memory edits are NOT in [DOCS] commit. Per §10.4, working-memory files are out-of-tree handoff artifacts at filesystem level without commits. Failure mode this prevents: `2511e181` pre-resolved 18 items but SESSION-STATE.md §8 was stale; future folds would have re-folded or wasted Phase 1 time.

### A.9 Mac Studio operational rules
- Reachable only over Tailscale. Never expose to public internet.
- Shared secret for `/api/ai-ingest/*` in env var `AI_INGEST_SHARED_SECRET` on both machines.
- AI service must survive kill+restart at any time without producing duplicate enrichments. Every write to `/api/ai-ingest/complete` idempotent on `(deck_id, enrichment_version)`.
- Never deploy Mac-Studio-side change making Hetzner block waiting on Mac Studio. Contract is pull-based for a reason.

### A.10 Origin nginx www-canonicalization
`https://lessoncraftstudio.com/<path>` returns 301 to `https://www.lessoncraftstudio.com/<path>`. Pre-existing rule at Hetzner-side nginx server-block; predates Brief B. Redirect at origin, not Cloudflare edge.

**All canonical URLs MUST use `www.` form.** Omitting prefix works via 301 but loses one round-trip.

**Load-bearing:** `scripts/publish-cli/substitute.js: CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com'` drives all `__CANONICAL_URL__` substitutions. **Apex form NOT acceptable:** apex→www 301 breaks embed iframe's auto-resize listener (per §14.3a `buildEmbedAffordance`). Listener compares `e.data.url` (postMessage URL = `location.href` = www post-redirect) against `f.src` (iframe element src = whatever the snippet was generated with). When snippet generated with apex, post-redirect they don't match; resize message rejected. Iframe stays at default `aspect-ratio: 800/1400` showing whitespace below for sparse-content apps; dense-content (math-worksheet, addition/subtraction with 6-equation grids) coincidentally fill ~1400px height and mask the issue.

**Recovery:** `scripts/publish-cli/rewrite-canonical-host.js` walks `/var/www/lcs-media/decks/<locale>/<slug>-v1/deck.html`, replaces apex with www (both plain `https://lessoncraftstudio.com/` and URL-encoded `https%3A%2F%2Flessoncraftstudio.com%2F`). Idempotent. Origin: `6fb6ee3d`.

### A.11 More detail
- `DEPLOYMENT.md` — full scenarios + recovery
- `docs/reference/server-verification.md` — health checks, file-count verification, backup inspection, image/payment recovery
- `docs/reference/design-elements-integration.md` — 22 load-bearing rules
- `docs/reference/12-content-creation-guide.md` — content creation

### A.12 Fast-forward push default policy
Plain `git push` is default for fast-forward cases. `--force-with-lease` reserved for genuine history rewrites. Locked 2026-05-03 post Batch 4 ES drift correction (`b18b8654`): Claude Code safety policy blocks `--force-with-lease` even on non-destructive cases; when a brief specifies it for fast-forward, safety block fires and force-with-lease is unnecessary anyway.

### A.13 Verification hygiene

Operational discipline applied at Phase 4 verification of any commission. Each sub-doctrine: doctrine statement + empirical anchor (commit hash) + cross-refs as needed.

#### A.13.1 Phase 4 zoom-in label-readability discipline
Spot-checks must include zoom-in inspection of UI labels in narrow-column contexts (mobile 375px; faceted-sidebar/filter-strip). UX-truncation defects surface only on close inspection. Status-200 + structural-presence smoke tests verify routing + render, NOT label-readability. Origin: `91ae41a7` FilterSidebar truncation (operator screenshot revealed).

#### A.13.2 Gap-fold-in-same-commit doctrine
When an arc surfaces a latent bug fixable with ≤10 short strings OR ≤1 component edit at zero strategic cost AND at same fold-target → FOLD into arc's commit; otherwise surface as separate [FIX]. Origin: Arc 6c→6d intersection.intro precedent `c03fdb8e`.

#### A.13.3 Refactor-during-already-opened-surface principle
When a [FIX] opens a code surface, audit for adjacent refactor opportunities of same shape. ≥3 instances + imminent 4th consumer per §14.3a → fold refactor. Origin: `785d63f6` slug-derivation refactor (bulk.js + publish.js + index.js → `slug.js: deriveSeedFromManifest`).

#### A.13.4 DERIVED vs HARDCODED-NULL emit-site classification
App emit-sites for SEO-bearing manifest fields classify via `EXERCISE_MODE_APP_CLASSIFICATION` in `slug.js`: **DERIVED** (reads operator UI signal; null legitimate per §17.8.5) vs **HARDCODED-NULL** (literal `null` at static call site; defect class). §15.16 gate halts HARDCODED-NULL+null (`MODE_NULL_FROM_HARDCODED_APP`); DERIVED+null CLEAN. Post Commission ε at `109a91d4` all 29 apps DERIVED; gate stays as backstop. Constant IS live taxonomy gate consumes at runtime; pattern: recon → adjudication → locked taxonomy → code-constant → predicate input. Origin: `2b555b57` + `109a91d4`.

#### A.13.5 Shape A canonical authoring pattern + reconciliation gate as structural complement
§15.16 gate is publish-time backstop; **Shape A** is canonical authoring-app pattern: at `prepareExerciseImages()` boundary, filter `selectedImages` against active theme before downstream pool-construction. Off-theme dropped with UI warning. Existing emit-site `theme: themeSelect.value` becomes correct once pool theme-constrained. Per-app scoping varies: verbatim (addition, subtraction); branch-scoped (bingo's `customCalloutsCheckbox.checked`; word-scramble + word-guess fallback else); decoupling-deferred (treasure-hunt path-A `worksheetThemeValue`-driven; gate-protected). Translation-key convention: each app ships `<app>.msg.offtheme.dropped` × 11 locales; promote to `shared.msg.offtheme.dropped` at 4th consumer. Origin: `44cbdda1` (code-addition) + `05d0940e` (10 sibling apps).

#### A.13.6 Spec-vs-shipped-contract validation discipline
When commission spec classifies a code surface with shipped contracts, validate spec's rules against shipped contract empirically BEFORE commit. Halt + surface to operator on conflict. Commission δ Phase 3 caught strict-DERIVED rule conflicting with code-addition's null-for-standard (`5078f491`); 104 of 153 decks would have halted. Operator adjudicated Interpretation Y pre-commit. Paired with §A.13.8 — `[ARC][SEO][DECK-PAGE]` Phases 3a-5 fired paired discipline 5 times (Phase 3b multi-h1; Phase 4a CP2 5-step Explore recon; Phase 4a CP2 DB backfill silent-swallow; Phase 4a CP2.5 (θ) close-at-63.3%; Phase 4b Sub-step 0 TS→CJS path). Origin: `2b555b57`.

#### A.13.7 Per-app first-publish verification cadence
When a publish-cli gate covers N apps, per-app first-publish verification folds into Track C cadence rather than separate audit commission. Gate IS verification mechanism. Document gate's coverage in commit body; track per-app first-publish events; gate fires (or doesn't) — empirical verification by construction; firing → follow-on `[FIX][AUTHORING]`. Empirical: `580b0ca2` §15.16 theme gate covered 27 unverified apps; caught code-addition's defect at first-publish (153 ZIPs); §15.17 salvage handled recovery.

#### A.13.8 Adjudication-reversal discipline
When recon surfaces cost dimension original adjudication didn't account for, recalibrate before executing. Initial adjudication on manifest.theme arc proposed operator-side regeneration of 153 ZIPs; operator pushed back; correct fix was downstream rewrite (`9051b43d` salvage). Cost-modeled "rebuild from scratch"; empirical cost was "operator's generation hours vs CC's code change." Apply: when Phase 1 surfaces a fix path not in original adjudication's option set AND materially cheaper on dimension operator pays, surface recalibration as Phase 2 batched review. Paired with §A.13.6. Origin: `44cbdda1` + `9051b43d`.

#### A.13.9 Two-defect pattern recon
When one emit-defect surfaces at a wave boundary, recon for additional emit-defects in same app at same wave before declaring fixable. For every OTHER emit-site class, run §15.16 gate on sample; second surfaces → fold both into single Shape-A-style fix. Empirical: code-addition (`5078f491` exerciseMode + `9051b43d` theme) — both surfaced at same wave; Commission ε `109a91d4` closed exerciseMode across 16 apps.

#### A.13.10 Manifest-as-schema-contract discipline
Manifest is contract between authoring app + publish-cli. Defects fix at emit-side; do NOT introduce downstream content-vs-metadata reconciliation when avoidable. §15.16 gate is backstop, not primary fix. Salvage-script territory (§15.17) is for already-staged waves only. Anti-pattern: adding reconciliation to publish-cli when authoring-side fix available.

#### A.13.11 Operator-strategic adjudication batching at recon-completion
Phase 1 recon surfaces multiple operator-strategic adjudications → batch into single consolidated review at recon-completion. Do NOT surface mid-stream. N adjudications batched cost ~one context-switch; N separate cost ~N. Empirical: Arc 2 Phase 1 (`a93ebb7c` predecessor) surfaced four (flag iconography source, exercise-type icons, theme thumbnails, EmbedViralityCTA target URL) in one batch; operator locked all four in one round-trip.

#### A.13.12 Mechanical-fan-out vs architectural-sweep distinction at 29-app scope
**Mechanical fan-out** — sed-replaceable single-line per app; identical at line-level (e.g., `<h1>` → `<h2>` Phase 3a.2). ~30-90 LoC; no per-app reasoning. **Architectural sweep** — 2+ files per app OR shape-level variance (Phase 3b multi-h1; ~300-500+ LoC). Empirical: Phase 3a.2 (29 × 1 LoC, ~30 min); Phase 3b (29 × 5-step diff ≈ 145 LoC, ~2 hours + 4 §A.13.6 firings).

#### A.13.13 Fan-out verification-hygiene at mechanical-fan-out execution
**6 grep dimensions:** (1) open-tag canonical form `<h1 ` — expected 0; (2) close-tag `</h1>` — expected 0; (3) JS-string-escaped open `"<h1` or `\"<h1` — expected 0; (4) JS-string-escaped close — expected 0; (5) line-context match (e.g., `lcs-celebration__title` confirms class wraps `<h2>`); (6) cross-locale spread matches expected locale set. Phase 3a.2 + Phase 4a Checkpoint 1 surfaced JS-string-literal escape variants; single-dim missed, 6-dim caught. Origin: `3d1027e5`.

#### A.13.14 Phase 1 Explore-agent fidelity validation
Explore agents are for breadth-survey ("what's surface area of X?"); fidelity-critical claims ("does X have shape Y at line N?") use direct `Grep` + `Read`. Anti-pattern: trusting Explore output for line-precise claims — Explore reads excerpts, doesn't guarantee whole-file fidelity. Empirical: Phase 3b Checkpoint 2 operator-surfaced when Explore claimed 3-step-diff per app; direct grep verified 5-step-diff.

#### A.13.15 Structured-fan-out as 3rd category between mechanical and architectural
**Per-app structural diff > 1 file BUT not pure architectural touch**: multi-line additions per app; identical structural shape across 29; same metadata-threading; no per-app conditional logic. Cost: 5-step-diff per app; 5 × 28 ≈ 145 LoC; 1-2 hours; 0-2 §A.13.6 firings expected. Empirical: Phase 3b Checkpoint 2 (28 apps; ~145 LoC); Phase 4a Checkpoint 2.5 (θ) rawExerciseMode + exerciseModeName threading.

#### A.13.16 Verification-hygiene at structured-fan-out execution
6 dimensions: (1) per-app structural-shape match (grep anchor across 29; expected 1 per app); (2) per-app diff-line consistency (sample 3-5); (3) cross-app naming-pattern verification; (4) post-deploy curl-spot-check (3 apps × 2 locales × 1 deck = 6 production decks); (5) test-suite full-pass; (6) per-app metadata threading audit (extractDeckBundle → renderStandaloneHTML → buildSeoHead → deck.html). Empirical: Phase 4a Checkpoint 2.5 (θ) caught var-hoisting bug at fanout-theta-handler.js before commit.

#### A.13.17 Slug-vs-title-shape redundancy as separate doctrine class
Slug-level catalog data hygiene structurally distinct from title-shape; slug-level collisions not resolvable by title-shape alone. **(a) Shape-pathology collisions** — same (locale, shape) → identical title-hash; resolvable via title-shape adjustment. **(b) Catalog-data-hygiene collisions** — same (locale, slug) due to operator workflow OR legacy renames; requires operator-strategic catalog rationalization commission. Phase 4a CP2.5 (ι) close: (ε) → (θ) → (ι) at 63.3% surfaced (b) requiring (μ) slug-rationalization stub.

#### A.13.18 Backfill-rate as commission close-out metric
When primary deliverable enforces uniqueness invariant via DB-side hash, close-out reports **two metrics**: file-level retrofit rate + DB-level invariant-enforcement rate. Silent under-enforcement ("100%" file-level) worse than visible partial enforcement. Phase 4a precedent: file-level 2776/2776 (100%); DB-level 1693/2673 (63.3% en) + 29/29 (100% non-en).

#### A.13.19 Capitalization "small word" handling under uniform title-case
Default to **uniform title-case** (every word capitalized: "More Or Less"); deterministic, locale-independent. AP-style (small words lowercase except sentence-start) is operator-strategic refinement; locale-dependent. Phase 5 Q1 locked uniform across 11 locales; "More Or Less" / "Tren Del Abecedario" grammatically valid. Phase 5 Item 14 carries small-word refinement as future-arc.

#### A.13.20 Retrofit-rerun decision: per-locale need-vs-no-need classification
Changes affecting retrofit output for SOME locales not others → per-locale rerun classification, NOT uniform all-or-nothing. Document in close-out (skip-locales explicit). Phase 5 Sub-step 7: de+es+nl 95 decks rerun (seo.words.* changed); en 2681 NOT rerun (English defaults; no string change). Anti-pattern: reflexively retrofit-all.

#### A.13.21 Operator-pre-recommendation substrate verification at theme/category selection
When operator pre-recommendation involves theme/category/package selection, verify candidates against canonical-state at planning step before locking scope. Identify substrate dependencies; empirically query before responding; surface divergence as §A.13.6 firing. Empirical: Pillar 2 Arc 6 Phase 1 themeAxisKey (3 of 4 unverified per `image_themes`; 10th firing); Arc 7 Phase 2 saturation (48/50 canonical-color; only `birds_2` + `miscellaneous` unbundled; 16th firing).

#### A.13.22 Audit-doc-vs-canonical-state divergence at commencement-time
Audit documents become stale during commission cycles. At commencement of work derived from audit doc, re-verify against canonical-state; surface divergence as §A.13.6 firing. Empirical: Stream A Arc 2 Phase 1 `e87c464c` — audit doc claimed 5 packages had theme-dir absence; re-verification revealed only 3 had `themeName: foods` OR `school-objects`; 2 prepositions used `themeName: animals` (separate class). 15th firing. Distinction from §A.13.21: §A.13.21 at plan step; §A.13.22 at commencement step.

#### A.13.23 Empirical-saturation as commission-cycle close-point signal
When commission work consumes finite substrate space, saturation signals natural close-point. Query consumption + availability; below-threshold → saturation signal; surface as natural close-point via AskUserQuestion. Empirical: Pillar 2 Arc 7 Phase 2 (16th firing) — 100 axes.theme keys; 50 canonical-color; 48 bundled; only `birds_2` + `miscellaneous` unbundled. Pillar 2 CLOSED (P2-close-pillar2).

#### A.13.24 Double-close-out paired commission CLOSED as multi-pillar trajectory milestone
When two commission cycles close at same paired moment, the paired-close is itself a structural milestone — convergence + natural strategic-input window. Empirical: consolidation cycle close 2026-05-11: Pillar 4 Arc 3 (ζ) close at `6e2b17fa` + Pillar 2 close at `957eb8ff` same session. First multi-pillar trajectory milestone. Subscribe-flip readiness review at `ba9e55c8` codified + surfaced 3-surface adjudication batch.

#### A.13.25 Bundle cluster taxonomy sub-pattern emergence at scale
At ~14+ clusters / ~48+ bundles, sub-patterns emerge: **paired-cluster** (two clusters composing pillar via sub-axis, e.g., cultural-arts = music + activities) and **crossover-bundle** (bundles bridging two clusters). Audit for sub-pattern emergence at scale; resist premature authoring before scale-emergence. Empirical: Pillar 2 Arc 6 + Arc 7 cultural-arts paired-cluster (music + activities; activities-bundle thematicCoherence references "2nd cultural-arts cluster bundle").

#### A.13.26 Schema migration timestamp-stratification doctrine
DB column added via schema migration → pre-migration rows have NULL by definition. Post-migration rows populate via emit-time logic. **Pre-migration NULL residue is structural, not regression.** Stratify by `createdAt` against migration timestamp; pre-migration cohort NULL expected (retrofit per §15.17 if recovery warranted); post-migration NULL indicates emit-time regression (Shape A §A.13.5). Empirical: (μ) Phase 1 revised diagnostic (`0e51ba8d`). Original Phase 1 (`f6f8ea38`) misclassified 1,288 en NULL title_hash as "authoring-side regression at 10 apps." Revised stratification: pre-2026-05-09 1,483 NULL (pre-migration per `20260509083000_add_seo_hash_columns`); post-2026-05-09 1,202 new publishes 100% correct. 5.5pp drop was statistical artifact. Recalibration via §A.13.8 saved ~3 sessions.

#### A.13.27 Trajectory-vs-static-state pricing inspection
When classifying trajectory-state change as regression vs natural-progression, inspect denominator AND numerator separately. **Same numerator + growing denominator produces declining percentage that LOOKS like regression but is statistical artifact.** Empirical: (μ) Phase 1. 5.5pp en backfill drop wrong-priced as structural-regression. Numerator (NULL count) fixed at 1,483; denominator (total en) grew 3,870 → 4,183. Same NULL + growing total = lower percentage, NOT regression.

#### A.13.28 Phase 4 production-canonical-path verification at deploy boundary
At Phase 4 production-ship, verify actual production-canonical-path via curl-spot-check BEFORE declaring Phase 4 complete. Sample 3-5 representative URLs; `curl -I` each post-deploy (expected HTTP 200 + correct content-type); verify content via curl + grep for representative markers. Catches gaps smoke tests miss: nginx config divergence + symlink-swap timing + Cloudflare cache-invalidation latency + DB-state-vs-FS-state divergence. Empirical: Pillar 4 Arc 2 Phase 4 (`e9e4d04a`); Brief B Phase 1 catalog deck route (`4b91adc0`); (μ) 308 404 class verification.

#### A.13.29 Ground-truth source-citation discipline for behavior-describing content
Content describing BEHAVIOR of external component author hasn't directly observed MUST cite source code verified against. Mental-model-alone is defect class equivalent to TypeScript `any`. Phase 1 launches Explore against `REFERENCE APPS/<app>.html` (mode dispatch; kid interaction; answer shape; visual feedback; correctness criteria). Cite per entry: `// Verified against: REFERENCE APPS/<app>.html lines X-Y` block with mode dispatch + kid interaction + audit date. Empty-citation = defect; reviewer rejects on sight. Re-verify on source change. Sub-Phase 2.4 `7eac8f50` (25th firing): 4 of 10 templates DRIFTED — find-and-count (assumed per-row; actual category-counting), more-less (assumed circle; actual tap symbol button), word-guess (wrong param "clue-density"; actual `difficulty`), odd-one-out (assumed circle; actual choice-tap one of 4 image buttons). Applies to per-(appName, exerciseMode) prose templates, parent-letter/take-home prose claiming exercise mechanics, sentence-strips guidance claiming UI layouts, future material-generator copy describing kid interactions, admin/marketing/support copy. File-level preamble: `frontend/scripts/lib/exercise-answer-templates.ts` lines 1-50.

#### A.13.30 Audience-perspective discipline for user-facing content
All user-facing content MUST be from reader's perspective — what they get, what they do — never how the system produces it internally. **Forbidden in teacher/parent-facing copy:** internal taxonomy (`composedExercises`, `materialSlug`, `framePreset`, `package metadata`, `pedagogical framing`); implementation primitives (`IMAGE_VOCABULARY`, `auto-resolved`, `gender data`, `target language` — use "the language your kids are learning"); architectural concepts (`packages`, `decks`, `generators`, `mass-run`); aesthetic-meta descriptors. Describe what reader gets + what they DO ("Print, cut along the dashed lines, use the cards for counting" — NOT "Image-only cards for cut-and-handle classroom work"). **Third-party brand stamps in private external communications forbidden** — parent letters, take-home content, family-facing materials teachers send home are private teacher-parent communication; never stamp with platform branding. Classroom-internal (flashcards, worksheets, answer keys) MAY carry §14.3 attribution; private external MAY NOT. Sub-Phase 2.5: 7 teaching-package section descriptions × 4 Tier 1+2 locales = 28 entries engineering-perspective; parent-letter PDF shipped with `LessonCraftStudio` brand at letters teachers send home.

#### A.13.31 Per-instance content-awareness discipline
Commission whose scope NAMES a specific package/deck/topic/lesson-plan/material → Phase 1 MUST read canonical artifact BEFORE Phase 2. NAME is a label; YAML/manifest/data file is truth. Paths: package → `docs/lesson-plans/packages/<slug>/package.yaml`; topic → `frontend/config/topics-taxonomy.json` + grep composing packages; deck → manifest JSON + bundle; lesson plan → `docs/lesson-plans/packages/<slug>/lessons/<lesson>.yaml`; material → package.yaml's `materials:` entry. No inference from name. Cite paths in close-out. **Applies to operator's IDE-open signals** — package YAML open alongside commission = read it. Sub-Phase 2.4 find-and-count drift was per-instance content-blindness — described `find-and-count|unified` without reading `count-objects-1-to-10/package.yaml` (`themeSelect: animals` triggers object-counting, not letter-spotting). **Family of three substrate-verification-by-content (§A.13.29 BEHAVIOR + §A.13.30 READER perspective + §A.13.31 per-instance INSTANCE).**

#### A.13.32 Canonical-artifact-grounding-at-composition-time discipline
Commission specs naming canonical artifacts MUST ground composition against canonical SoT at spec authoring step — NOT prior-session close-out summaries, carried-forward prompts, or assumed inventory state. Anti-pattern: naming-from-memory, drafting-from-prior-close-out, drafting-from-training-fluency. Canonical SoT paths: taxonomy slugs → `learning-targets.json`; per-package YAML → `docs/lesson-plans/packages/<slug>/package.yaml`; generator inventory → canonical generator code paths + §A.13.35 canonical-mode tables.

**Six sub-doctrines:** (1) **Slug-grounding** — verify against `learning-targets.json` BEFORE locking. (2) **Generator-inventory completeness** — verify at composition time. (3) **Per-package × per-generator matrix as mass-run scope** — mass-run IS full (package, generator) matrix, NOT materials-yaml union. (4) **Generator-executability verification** — YAML-reference-existence insufficient; verify actual code path. (5) **Strand-state baseline grounding** — counts drift across arcs; verify against canonical BEFORE locking. (6) **Commission-spec drafting from prior-close-out text** — ground against prior commit's actual close-out scope + body, NOT memory of earlier projections.

**Empirical anchors:**
- Arc 17 firings (1-4): Phase 1.3 slug-grounding; P2 numeral-cards generator-inventory; P2 identify-community-places matrix-scope; Phase 1.4 clock-mat generator-executability
- Arc 18-19 firings (5): Arc 17 P1.3 + Arc 18 P1.3 vocabulary-class-strand-start + Arc 19 P1.3 phonological-awareness + Arc 19 P1.4 spelling-and-encoding baseline drift (`bc128f4b` firing #1)
- Arc 19 + currency-removal (6): Arc 19 P2.3 (`22338d69` firing #6) drafted from P2.1 close-out text without grounding against P2.2's actual close-out. Currency-removal Phase 1c (`0d56e025`) — presumed `money` sub-track wrapper in `learning-targets.json` did not exist; entries are flat siblings within `measurement` `targets[]`.

#### A.13.33 Phase 0 explicit-methodology reporting at substrate audit
Phase 0 outputs reference counts that could diverge by methodology. Every count states: (1) **denominator** (what's being divided into); (2) **locale scope** (en-only / en+pt / all-locales / per-locale); (3) **status filter** (published-only / all-status); (4) **temporal anchor** (pre-arc / post-arc / at-commencement); (5) **parent-class vs sub-track layer** — strand-state reporting distinguishes parent-class (e.g., "measurement", used for C4 saturation) from sub-tracks (e.g., "money" within "measurement"). Empirical: Arc 17 Phase 1.3 → 1.4 → 1.5 baseline shifts. en-baseline 154 → 157 (Phase 1.2 → 1.3, denominator widened); pt-baseline 79 → 66 (Phase 1.3 → 1.4, narrowed); reconciliation cost operator-attention. Dimension 5: currency-removal `0d56e025` dropped 2 packages from measurement's money sub-track; C1 SATISFIED rebaselined 203/203 → 201/201 at parent-class layer; report disclosed "money sub-track ceases; measurement parent-class remains SAT."

#### A.13.34 Parallel-strand-framing pattern for cross-strand content overlap
Existing package covers content overlapping canonical fill at observable-activity layer → default to surfacing parallel framing distinction in `compositionalRationale`. Observable activity ("the kid reads the clock") can be surface for content authored under multiple strands' pedagogy; both have legitimate strand-canonical pedagogy; both ship; `compositionalRationale` MUST name distinction explicitly (structural requirement, not optional). Anti-pattern: defer-or-skip on observable-activity overlap. Empirical: Arc 17 Phase 1.4 read-time-vs-tell-time (measurement clock-mat manipulative-first vs telling-time-productive-vocabulary); Arc 19 Phase 1.4 phonological-awareness vs phonics-decoding strand-boundary (oral phoneme manipulation vs letter-symbol-decoding; `bc128f4b`).

#### A.13.34.1 FULL-OVERRIDE threshold-class enumeration
Locale variants of canonical packages diverge from en at one of three threshold classes:
- **Materials-level** — pedagogical content preserved; only linguistic surface translates. Sparse-override per-material linguistic adjustments. ~80% of pt variants.
- **Pedagogy-level** — package's underlying pedagogy locale-specific (e.g., pt-BR has no r-controlled vowels; pt-BR digraph inventory `LH/NH/RR/SS/CH/Ç` vs en `CH/SH/TH/WH/PH`). Sparse-override REFRAMED with extensive `compositionalRationale.<locale>` citing locale's canonical-curriculum SoT per §A.13.34.2. Empirical `bc128f4b` firing #5: Arc 19 P1.4 read-r-controlled-vowels pt + read-vowel-teams pt + spell-words-with-digraphs pt + write-a-simple-sentence pt.
- **No-equivalent** — package's content has no equivalent in locale's canonical curriculum (USD currency had no canonical pt-BR equivalent). Disposition: substrate-fill OR pkg-removal (currency-removal `0d56e025`). Sparse-override NOT viable.

Apply: at Phase 1 of locale-variant commission, classify each variant BEFORE locking format.

#### A.13.34.2 Locale-canonical-curriculum-divergence sub-class
Pedagogy-level reframing MUST anchor to locale's canonical-curriculum SoT (CCSS for en; BNCC for pt-BR), NOT en CCSS. `compositionalRationale.<locale>` cites locale-canonical-curriculum reference (BNCC `EF01LP*` for pt-BR Year-1 literacy; `EF02MA*` for pt-BR Year-2 math). Citation is structural — without it, reframing reads as ad-hoc deviation. Empirical: Arc 19 P1.4 read-r-controlled-vowels pt (R-positioning per BNCC, 4 positions) + read-vowel-teams + spell-words-with-digraphs (pt-BR digraph inventory per BNCC); Arc 19 P1.5 write-a-simple-sentence pt (pro-drop, adjective-post-noun, gender-agreement, ser/estar per BNCC); Arc 18 P1.2 currency pt FULL-OVERRIDE retired at `0d56e025`.

#### A.13.35 Canonical generator-mode-verification at extension boundaries
Extending a generator with new modes OR referencing modes from spec → verify against canonical mode enumeration at source code AND maintain versioned canonical-mode list in CLAUDE.md per generator. Amend table BEFORE shipping any generator-extension.

**Canonical state of record (Arc 18 Phase 0 audit; corrected post-Phase-6-fold-Round-1 training-fluency defect):**

| Generator | Canonical modes | Source-of-truth |
|---|---|---|
| `manipulative-cut-outs` | `single-repeat`, `variety` | `frontend/scripts/lib/manipulative-cut-outs-package-loader.ts:30` (`CutOutMode` type); originating spec at `materials-catalog.json` lines 215-244 |

Per source: `single-repeat` = one image × itemCount tiles (counting); `variety` = one image per vocabKey × itemCount copies each (sorting). 2 modes entire canonical set. Source-of-truth column is load-bearing per §A.13.32.

**Forward scope:** generalizes to ANY mode-parameter generator (`countMode` `fixed`/`varying`/`explicit + countList`; `tone × locale × strand` axis; `MATERIAL_COUNT_FIELD` lookup). Apply: Phase 1 reads table AND grep-verifies against source; stale table → §A.13.6 firing.

**Self-firing-as-validation footnote.** Round 1 fold `2bf7723b` introduced this table with 5 modes (`single-repeat`, `base-ten-blocks`, `3d-shape-nets`, `counters`, `clock-pieces`) authored from training-fluency. 4 non-canonical were likely `themeName` confusions. Round 2 `6a6f69b0` preserved defect. Arc 18 Phase 0 audit per §A.13.32 caught at next commencement. Discipline designed to prevent training-fluency canonical-naming fired at its own instance. Corrected at `694f9823` before Arc 18 P1.1.

#### A.13.36 CC↔assistant cooperation cadence within commission
Per-package pedagogical-judgment + class-conditional adjudication resolves between CC + assistant within commission, NOT through operator routing. Operator routing reserved for (a) phase-boundary ratification, (b) strategic-direction adjudication, (c) explicit-delegation moments.

**Cadence:** per-package pedagogical-judgment (strand framing; class-template; materials; canonical-fill ordering) — CC drafts, assistant reviews, CC revises; operator does not route. Class-conditional adjudication per §A.13.37 — CC reads table; applies; surfaces deviations to assistant. Phase-boundary ratification (arc-close; commission spec lock; Phase N → N+1) → operator. Strategic-direction adjudication (Pillar 5 mass-run scope; launch-envelope lock; cross-pillar prioritization) → operator. Explicit-delegation moments ("you choose"/"make the call") → adjudicator-forward per §3.4.

**Cross-session-boundary.** "Within commission" is **per-conversation-session**, NOT transitive. New session via working-memory upload → operator routing re-enters at new commission's recommendation boundary (per §A.13.21). Anti-pattern: per-package routing "I drafted X for package Y; please confirm" scales operator-attention with N; cooperation-cadence bounded by phase count. Empirical: 5 Arc 17 phases + Arc 14/15/16 — resolved without operator routing.

#### A.13.37 Class-conditional disposition pattern as canonical materials composition gate
Materials composition dictated by package class per fixed canonical table. Table IS the gate; deviations require explicit `compositionalRationale` rationale + assistant ratification at Phase 1 close.

| Package class | Materials count | Composition |
|---|---:|---|
| Numeracy | 7 | flashcards, picture-cards, place-value-mat, vocabulary-tracing-strips, manipulative-cut-outs, parent-take-home-letter, answer-key |
| Literacy | 8 | class-template per Arc 16 patterns; canonical YAMLs at `docs/lesson-plans/packages/identify-letter-sounds-vowels/` + siblings |
| Vocabulary | 8 | class-template per Arc 16 patterns |
| World-knowledge | 7 | class-template per Arc 17 patterns; canonical YAMLs at `docs/lesson-plans/packages/identify-living-vs-nonliving/` + siblings |
| SEL | case-by-case | strand-specific; default to PSED-class-template when applicable |
| Logic | 8 | Arc 17 Phase 1.1: standard 7 + matching-mat |

Apply (Phase 1): identify class per strand assignment; read row; compose against class-template (default: identical); surface deviations at Phase 1 close with rationale. Empirical: 3-package basis at Arc 16 close + Arc 17 5-phase cross-class generalization (logic-class established Phase 1.1 via complete-analogy-image-pair).

#### A.13.38 Decoupled-ship pattern across arc-close empirical reliability
Multi-pillar commission cycles ship in decoupled cadence preserving rollback granularity + absorbing unplanned-failure-mode:
1. **Phase P1** — package authoring at filesystem level. Write `package.yaml` + asset trees BEFORE git-stage. PC-power-loss / crash leave work recoverable from filesystem.
2. **Arc-close commit** — single commit captures recoverable filesystem state atomically.
3. **Phase P2 close-out cycle** — absorbs downstream-deploy dimensions: materials regen (PDFs) + CDN deploy + cross-bundle updates + scope-doc amendments. Ships separately so per-dimension failure-modes don't entangle with arc-authoring rollback.

Primary empirical: Arc 17 P2 PC-power-loss recovery. Filesystem state preserved across unplanned power-loss; arc-close commit re-ran cleanly without re-authoring loss.

**Three-tier commit discipline:**

| Tier | Scope | Trigger | Git |
|---|---|---|---|
| (a) Arc-close | Master packages + arc-doc | Phase P1 complete | In-tree |
| (b) P2 close-out | PDFs + cross-bundle + scope-doc amendments | Phase P2 complete | In-tree |
| (c) Working-memory | SESSION-STATE.md / CONVERSATION-HANDOFF.md / commission-resolved markers | Within/between commissions | Out-of-tree per §A.8.3; NOT committed |

Tier-confusion (committing tier-c OR coupling tier-a + tier-b) is canonical anti-pattern. Supporting: Arc 14/15/16/17 — 4-arc empirical reliability. Anti-pattern: coupled-ship at arc-authoring boundary trades rollback granularity for atomicity.

#### A.13.39 Fold-cycle doctrine-content empirical-grounding at Round 1 + Round 2 review
[DOCS] fold-cycle Round 1 + Round 2 review MUST include empirical-content verification of every doctrine-table cell, canonical-mode list, canonical-artifact path, cited line range against canonical source. Authoring from training-fluency/memory/prior-session-text produces doctrine-table defects shipping into canonical that propagate downstream.

Round 1 dimensions (existing): structural-shape; cross-reference completeness; anti-pattern pole sharpness; when-to-apply trigger; empirical-anchor commit-hash citation; origin line.

Round 2 **adds 6th dimension: empirical-content verification.** For each doctrine cell introduced by Round 1: Read canonical SoT directly; compare claim against source; flag divergence as §A.13.6 firing BEFORE Round 2 surgical-fixes commit.

Empirical: §A.13.35 self-firing correction at `694f9823` (Arc 18 Phase 0). Round 1 fold `2bf7723b` shipped 5-mode `manipulative-cut-outs` table from training-fluency; Round 2 `6a6f69b0` preserved via surgical-fixes pass without empirical-content verification. Arc 18 Phase 0 audit per §A.13.32 caught: source defines only 2 modes. Discipline caught its own substrate violation; canonical example of §A.13.39's necessity.

#### A.13.40 Operational-tooling canonical-patterns
Production scripts composing shell tools have toolchain-specific failure modes recurring across commissions when undocumented.

**Canonical patterns (as of `22338d69` + `1bdc2789`):**
1. **Puppeteer `browser.close()` + chained-bash `| tail -N` pipes hang.** Subprocess cleanup doesn't release pipe stdin/stdout. Use single-generator-per-job. Anti-pattern: `node scripts/gen-A.js ... | tail -20 && node scripts/gen-B.js ...` — hangs at first browser.close(). Surfaced: Arc 18 P2 (`1bdc2789`).
2. **pscp CLI syntax on Windows requires `-l user host:path`.** PuTTY's `pscp` requires `-l user host:path`; POSIX `user@host:path` silently fails on Windows — file not uploaded, exit code 0. Use: `pscp -pw <pw> -l root <local> <host>:<remote-path>`. Surfaced: Arc 18 P2 deploy when ~590-PDF tarball appeared to upload but Hetzner `ls` showed no file.
3. **tar -C extract path ordering preserves entry-relative paths.** Use `tar -C frontend/.scratch/<gen> en es` producing entries `en/*` + `es/*`; extract `tar -C materials/<gen>` produces clean. Anti-pattern: archive `tar -C frontend/.scratch <gen>/en <gen>/es` produces nested `materials/<gen>/<gen>/en/*`. Surfaced: Arc 19 P2.3 numeral-cards (`22338d69`).
4. **Curl-verification at 6-dimension grep pattern** — cross-refs §A.13.13 + §A.13.28.

Maintenance: new patterns added at commission empirically surfacing them — NOT separate [DOCS] fold.

#### A.13.41 Authoring-drift recognition discipline — class (a)/(b)/(c) framework
When canonical-state-vs-shipped-state divergence surfaces at Phase 0, classify into three structural classes BEFORE locking remediation:

- **Class (a) Authoring drift** — shipped diverges due to authoring error. Canonical correct. Remediation: retrofit shipped via [FIX][LESSON-PLANS] / [FIX][SCHEMA] / [FIX][AUTHORING].
- **Class (b) Doctrine drift** — doctrine/canonical empirically wrong; shipped reflects correct reality. Remediation: amend doctrine via [FIX][DOCS] AND audit prior commissions locked against wrong doctrine.
- **Class (c) Parallel framing** — distinct strands/packages/framings legitimately at same observable activity. Both correct under different framings. Remediation: ratify both with explicit `compositionalRationale` distinction per §A.13.34.

Anti-pattern: reflexive Class (b) (amend doctrine) when actually Class (a). Symmetric: reflexive Class (a) locks against wrong canonical.

**Apply (Phase 0):** identify divergence; quote both with SoT paths; verify canonical is current per §A.13.32. **Test for (c) first** per §A.13.34 (observable-activity overlap ≠ duplicate). **Test for (b) second** per §A.13.39 (empirical-content verification). **Default to (a).**

Canonical reclassification empirical: §A.13.37 literacy 8-vs-7 material reversal at Arc 19 P2.2 (`f41d4146`). Arc 19 P1.4 close (`bc128f4b`) initially Class (b); P2.2 re-read Phase 1.1-1.3 packages (8 materials WITH sentence-strips); identified Phase 1.4-1.5 6 packages as drift; reclassified to Class (a). Doctrine table correct at 8; 6 packages need sentence-strips retrofit.

**Other empirical anchors:**
- §A.13.35 `manipulative-cut-outs`: Class (b) — doctrine wrong (training-fluency Round 1); corrected `694f9823`
- §A.13.34 read-time-vs-tell-time (Arc 17 P1.4): Class (c)
- §A.13.35 `word-cards` mode-drift in 3 Arc 14 packages (`bc128f4b` firing #4): Class (a) — 3 packages need retrofit; no doctrine amendment per Arc 19 P2.1 verification (`7c86233d`)
- §A.13.34 pt FULL-OVERRIDE pedagogy-level (Arc 19 P1.4-1.5; `bc128f4b` firing #5): Class (c) — pt-BR phonics canon (BNCC) legitimately diverges from en CCSS

### A.14 Scaling Arc audit doctrine

`[CHORE][AUDIT]` commissions measure publish-cli's path against scale targets without production change.

#### A.14.1 Scale-ceiling order
publish-cli's ceilings under realistic catalog growth:
1. **Time-death tolerance** at ~10K decks (10 min wall-clock at 59.3ms/deck)
2. **Within-batch slug collision rate** at ~5K-10K decks
3. **Sharp + chown overhead** at ~30K-55K decks (CPU-bound; subprocess-spawn dominates)
4. **Stale-staging-dir lockout** (any scale, low probability per batch)

Engineer: chunked batches > pre-collision-check > subprocess-free chown via `fchown` > auto-cleanup. No memory ceiling within 55K (216 MB peak RSS at 440-deck baseline). No disk ceiling within 250K (379 GB free + 28.8M inodes at audit). Origin: `f765b991`.

#### A.14.2 Defer-trigger heuristic for performance commissions
Each commission has explicit empirical trigger; default-defer rather than engineer-now:
- **Checkpoint/resume** — at 5K+ decks/batch OR first real mid-batch death event
- **Within-batch slug collision pre-check** — at 5K+ decks/batch
- **Subprocess-free chown via fchown** — at 30K+ decks/batch
- **Stale-staging-dir auto-cleanup** — after first lockout

**Anti-pattern:** engineering ahead of empirical trigger.

#### A.14.3 Sequential publish is a feature
publish-cli's sequential await loop is intentional. Concurrency would introduce within-batch races on slug-collision detection + `create.deck` — two parallel publishes of same `(language, slug)` either deadlock on unique constraint OR produce numeric-suffixed slug racing canonical. Sequential prevents both by construction.

**Operational:** to handle larger batches, **chunk** via `--staging-dir` (split 10K into 3 × 3.3K) rather than parallelize. Chunk boundaries race-safe.

#### A.14.4 publish-cli non-idempotent retry posture
Re-running partial-completion bulk-publish requires staging-dir hygiene; NOT safe to retry blind. Bulk-publish completing M of N before process-death produces M `Deck` rows + M asset trees + partially-consumed staging dir. Re-running same `publish-bulk <staging-dir>` attempts re-INSERT of M already-published → unique-constraint violations. Recovery: identify M completed; move ZIPs out of staging; re-run against N-M unpublished.

**Anti-pattern:** assuming `publish-bulk` idempotent. Future briefs implying blind-retry must surface manual-recovery.

#### A.14.5 Asset-tree audit-only `[CHORE][AUDIT]` commission shape
Read-only audits produce audit-report deliverable + Phase 3 operator-strategic questions; no production change, no DB writes, no FS modification, no `deploy.sh`. Audit-report at `docs/<arc-name>-audit-<utc-date>.md`.

**Phase shape:** (1) Inventory; (2) Empirical recon (read-only on production OR isolated-snapshot); (3) Findings — headline + supporting data + Phase 3 questions; (4) Doctrine carry-forward.

**Triggers:** explicit operator commission OR precipitating event (near-miss, downstream commission benefit).

Origin: `9850df93` (Arc 3 at 731-deck-catalog) + `f765b991` (Arc 5 at 440-wave snapshot).

#### A.14.6 Backup-coverage audit class
Backup-coverage is distinct class from scale-ceiling audits. Backup gaps surface as **URGENT** — catastrophic FS loss is unrecoverable without backup, and gap structurally cheap to close (~40 LOC bash + cron).

**Triggers:** audit commission discovers asset-tree without backup coverage OR new asset-tree at `/var/www/lcs-media/<dir>/`; verify backup OR file [FIX][OPS] alongside create.

**Off-host backup deferred trigger:** ~10 GB asset bytes OR ~6-7K decks. At scale, same-host weekly tarball becomes fallback to off-host.

Origin: `9850df93` (URGENT finding: `/var/www/lcs-media/decks/` zero backup at 731-deck state) + `15be6ef5` (closure: `backup-decks.sh`).

#### A.14.7 Scale-projection methodology extension
Scale-projection decomposes into two layers; both measured.

**Layer 1 — filesystem-level.** Disk bytes + inode count per published deck × design-target population. Per-deck-asset: deck.html (~200-400 KB), printable.pdf (~50-150 KB), answer-key.pdf (~30-100 KB), thumbnail.png (~20-50 KB), og-image.png (~80-150 KB). Arc 3 (`9850df93`): ~6 inodes × 731 = ~4,400 at audit, projecting ~330,000 at 55K = 1.1% of ext4 default inode budget. Disk: ~1.5 MB/deck × 55K = ~82.5 GB total (4.6× margin against free-space).

**Layer 2 — publish-cli timing.** Per-deck wall-clock × batch size + concurrency profile. Arc 5 (`f765b991`): empirical 59.3 ms/deck projecting 10 min at 10K/batch — time-death tolerance per §A.14.1.

**Apply:** measure both; use real production state or isolated-snapshot; project linearly; flag non-linear factors (disk-fragmentation, DB index bloat, ext4 dir_index thresholds).

#### A.14.8 Pre-publish-wave audit doctrine

Three defect classes have recurred across multiple operator deck-publish hand-offs and were re-diagnosed from scratch each time. All captured here as pre-publish-wave checklist future sessions MUST run BEFORE invoking `publish-bulk --confirm`.

**Three recurring defect classes:**

1. **Theme-emit defects** — apps' `LCSCatalogExport.export()` or `buildCatalogManifestSettings()` hardcodes `theme: null`, dropping operator's theme. Plus 27 of 29 apps historically didn't populate `bundle.seoMeta.themeName` in `extractDeckBundle()` so deck.html `<title>` + meta description lacked theme keyword. Past fixes: `5110d6e0` (math-worksheet + prepositions defect-A); `0e5f1560` (28-app sweep adding `seoMeta.themeName` via shared `LCSCatalogExport.deriveThemeName()`).

2. **Embed iframe gap (apex/www mismatch)** — `substitute.js: CANONICAL_URL_BASE` was apex; nginx 301 to www breaks embed iframe auto-resize listener via postMessage URL-match. Past fix: `6fb6ee3d` (apex → www + `rewrite-canonical-host.js` retrofit).

3. **Deckend-suggestions strip stale-emit** — operator's PC `frontend/public/worksheet-generators/` (gitignored serving copy populated by `scripts\master-sync.bat`) goes stale relative to `REFERENCE TRANSLATIONS/catalog-export.js`. When `LCSCatalogExport.buildDeckEndSuggestionsPlaceholder` undefined at deck-generation, apps' `parts.push(deckEndSuggestions)` pushes empty string; deck.html ships without strip. Two failure modes per timestamp ordering: Mode B (oldest, missing all 3 elements) and Mode A (mid-sync, un-hide JS hardcoded but helper undefined → empty section). Result: end-of-deck "Try one of these next:" reel never renders. Past fix: 9-app wave 2026-05-09 — recovery via `scripts/publish-cli/inject-deck-end-strip.js --locale=<X> --rewrite`. Critical for UX + §1 SEO flywheel (deck.html outbound topic-page anchors feed Google's link graph).

**Pre-publish-wave checklist — run BEFORE `publish-bulk --confirm`:**

1. **theme-emit audit.** Sample 1 ZIP per distinct app: `unzip -p <zip> manifest.json | jq .theme` should be non-null when operator selected a theme. If any null:
   - Apply Shape A authoring fix per §A.13.5, OR
   - Run salvage script `scripts/publish-cli/rewrite-manifest-theme.js` per §15.17

2. **seoMeta audit (source app HTML).** Each app's `extractDeckBundle()` should populate `bundle.seoMeta.themeName` via shared `LCSCatalogExport.deriveThemeName(opts)`. If absent, deck.html `<title>` will miss theme keyword. Add helper call at extractDeckBundle return per post-`0e5f1560` canonical pattern.

2b. **bundle-vs-current-app reconciliation (operator ZIP audit).** Step 2 audits SOURCE app HTML; Step 2b audits OPERATOR-GENERATED ZIP. Sample 1 ZIP per app: `unzip -p <zip> deck.html | grep -oE 'seoMeta":\{[^}]*'`. If absent OR `themeName: null` for a deck whose manifest.theme is non-null, halt: operator's bundle predates seoMeta-population fix even though source app is current — typically browser-cache + service-worker staleness. Operator must hard-refresh (Ctrl+Shift+R) and regenerate. If unblocking urgent, recovery via `scripts/publish-cli/rewrite-deck-html-title.js` salvage post-publish (§15.17 — see `ca5d4aa0` for catalog-wide recovery precedent). Origin: 95-deck word-guess + word-scramble wave 2026-05-07 generated ~2h before `0e5f1560`.

3. **canonical-host check.** Confirm `scripts/publish-cli/substitute.js: CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com'` (www form) per §A.10. Apex breaks embed iframe auto-resize. If defective:
   - Fix constant (one-line edit)
   - Run `scripts/publish-cli/rewrite-canonical-host.js` against `/var/www/lcs-media/decks/` to retrofit existing
   - Cloudflare 5-min TTL refreshes edge automatically

4. **deckend-suggestions strip presence audit.** Sample 1 ZIP per app: `unzip -p <zip> deck.html | grep -c 'lcs-deckend-suggestions'`. Expected: ≥3 hits per ZIP — CSS block + section element + un-hide JS guard. If 0-2 hits, operator's PC ran with stale `catalog-export.js` (Mode A: 1 hit; Mode B: 0 hits). Recovery:
   - **Pre-publish** (preferred): operator runs `scripts\master-sync.bat` + hard-refresh, regenerates wave
   - **Post-publish salvage**: `scripts/publish-cli/inject-deck-end-strip.js --locale=<X> --rewrite` against `/var/www/lcs-media/decks/` per §15.17 — handles both modes via removeExistingStripAndGuard + re-inject. Idempotent. Cloudflare 5-min TTL refreshes per §15.8

5. **post-publish spot-check.** Pick 1 sample deck per affected app:
   - `curl -s <deck-url> | grep -E '<title>|var url='` — title should include theme word; var url= should be www form
   - `curl -s <deck-url> | grep -c 'lcs-deckend-tile'` should return ≥1
   - Embed deck on test page; verify auto-resize works (no whitespace gap below content)

**Why at doctrine level.** Operator-attention is load-bearing across runway. Re-diagnosing per wave costs ~1-2 hours of CC + operator round-trips. Pre-checking takes ~5 minutes. Asymmetry justifies the doctrine even at one occurrence per quarter; all three classes have recurred multiple times in close succession.

**Apply.** At the START of any commission involving `publish-bulk` on operator-staged ZIPs, run the 5-step checklist before any other work. Surface findings in Phase 1 inventory; fix BEFORE `--confirm`. Each step has documented canonical solution + recovery script.

Origin: surfaced empirically across 345-en-wave + alphabet-train/prepositions embed-gap commission cycles. Step 4 added 2026-05-09 after 9-app wave (picture-sort/shadow-match/bingo/matching/pattern-worksheet/chart-count/pattern-train/big-small) shipped without populated reels; root-cause Mode A + Mode B stale-emit from operator's PC sync lag. Cross-references: §A.10, §A.13.5, §A.13.7, §15.17, §17.8.5.

*End of CLAUDE.md.*
