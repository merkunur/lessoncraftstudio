# CLAUDE.md — LessonCraftStudio Interactive Worksheets Platform

**Version:** 3.6 (size-reduction pass: empirical anchors / worked examples / reference specs / historical narration relocated to `docs/claude-md/`; every forward-rule, guard, cross-ref, and commit-hash anchor kept inline) **Last updated:** 2026-06-08

> **Companion-docs convention (v3.6).** This file was ~halved by *relocating* (never deleting) the justification layer — commit-hash anchors, worked examples, code snippets, historical narration, and code-implemented reference specs — into git-tracked companions under `docs/claude-md/`. Each terse section keeps its forward-rule + cross-refs + a `→ docs/claude-md/<file>` pointer. The companions: `verification-hygiene.md` (§A.13), `scaling-audit.md` (§A.14), `deck-html-seo-surface.md` (§17.8), `catalog-pipeline.md` (§15 + §14 helpers/gotchas/bundles), `site-topic-export-detail.md` (§14.4 / §16.5.1 / §17.4.3 / §17.5-6 / §18.4), `topic-and-i18n-detail.md` (§16.7 / §16.8 / §17.10), `activities-detail.md` (§20.7), `misc-detail.md` (§11 / §17.1 / §20.3 / §21 tables / §22.2-3 / §A.7.x). When a terse entry isn't enough, read its companion. Working-recall SoT for activities/landing stays the `memory/` + plan files.

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

**SEO + embed-virality acquisition flywheel.** SEO → deck pages → visitors copy embed snippets → embedded decks spread to classroom blogs/school sites → backlinks compound search authority (structural, not promotional). Three-layer embed architecture (locked): (1) iframe-safe self-contained deck.html (§14.1); (2) per-deck "Embed this" affordance; (3) homepage embed-virality CTA above-fold — sequenced 1→2→3 to prevent credibility gaps. **Backlinks = the visible `<a href>` tags OUTSIDE the iframe** (wrapper + caption with brand+keyword anchors), not the iframe itself; **embed-attribution is visible-load-bearing, NOT technically-enforced** (design it so removal looks broken). **Homepage doctrine:** three-second budget (magnitude + variety + browse-path signaling, not persuasion); magnitude-via-structural-axes (29 × 100 × 11 = 14,487 combinations per §6, NOT deck count); **crawl-bait-density** (~140 above-fold internal links/locale × 11 ≈ 1,540) is load-bearing — future homepage work must raise or preserve it. **Foundation-doctrine reality-check:** periodically verify foundation doctrine vs ship-state; accelerate the mechanism or amend the doctrine, don't power-through. Full doctrine + commit anchors → docs/claude-md/misc-detail.md.

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

**[AMENDMENT 2026-05-24] Live homepage promoted from v2 to v3.** As of commit `bc215a5c`, `frontend/app/[locale]/page.tsx` renders the 9-section homepage-v3 stack (HeroV3 → 5 pillars → TierTransition → EmbedShareV3 → SignupV3) across all 11 locales. `homepage-v2` components preserved on disk at `frontend/components/homepage-v2/*` for rollback safety (cleanup deferred). `/[locale]/preview/homepage-v3/` route kept in place with `robots: { index: false, follow: false }` as visual-diff safety net. Comprehensive `generateMetadata()` machinery preserved from v2 (canonical, hreflang × 11, OG, JSON-LD; reuses `homepage.meta` namespace for brand-level copy). v3 components live at `frontend/components/homepage-v3/*`; `.hv3` CSS scope class at `frontend/app/[locale]/preview/homepage-v3/homepage-v3.css` (imported via relative path from live page.tsx). Direction A typography (Baloo 2 + Nunito) at page level. Companion catalog hub at `/[locale]/worksheets/` chrome localized in all 11 languages via `worksheetsPage` namespace (commit `3dc57dfe`). 11-locale recreation discipline locked at §A.13.48; per-locale curriculum framework squiggle taxonomy locked at §A.13.49.

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

`REFERENCE TRANSLATIONS/image-vocabulary.js` is canonical — 1,246 entries with singular/plural/gender across 11 languages. Never modified directly without operator approval. Catalog-wide or cross-locale corrections to it follow the **§A.13.58** layered-gate + per-locale-gender-authority doctrine. All teacher-facing UI works in all 11 languages via next-intl. Catalog metadata (subjects, ages, tags, topic descriptions) needs 11-language translations. AI-generated long descriptions are produced per language, not auto-translated. (Lesson plans + parent notes removed 2026-05-17.)

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

**Schema is code; the SoT is `frontend/prisma/schema.prisma` (`model Deck` at ~:1137).** The catalog tables — `Deck`, `DeckEnrichment`, `PlayLink`, `Collection`, `CollectionDeck`, `DeckFavorite`, `EmbedConfig`, `Subscription` — live there; do NOT re-author them here.

Load-bearing `Deck` invariants referenced throughout this doc: SEO-bearing columns `slug` / `titleHash` / `descriptionHash`, each with a compound `@@unique([language, <col>])` (§17.8.5 + §17.8.17 invariants 1-2); `contentFamilyId` (null in v1; v2 hreflang siblings per §17.8.7); `topicSlugs` are soft-FK strings into the §16.5 axis-key set (the Topic table was removed 2026-05-17 — top AMENDMENT; deck-grid rendering does NOT depend on it); `ageRange` ∈ {3-5,5-7,6-8,7-9,8-10} drives §17.8.6 educational-level (when it lands as an enum: `AgeRange { AGE_3_5 AGE_5_7 AGE_6_8 AGE_7_9 AGE_8_10 }` so the DB enforces §17.8.6). `Subscription` extends existing tracking (grace-period end = lapsed_at + 60 days; `schoolLicenseId` in v1.5). The dropped teaching-packages models (Topic, LessonPlan, ParentNote, Bundle, BundleDeck, BundleLessonPlan, TeachingPackage, BundleTeachingPackage) are gone per commit `920aebbc`; revival needs a fresh schema commission.

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

Launch "done" = **(Engineering)** 29 apps producing catalog ZIPs; browse/search/filter/deck pages; topic pages (deck grid + PDFs); student play across 29 types mobile+desktop tier-identical; free links/QR/email-signup; $69 checkout; 60-day grace; Cloudflare + Tailscale + Mac-Studio active. **(SEO)** all SSR, native slugs, hreflang, schema, sitemap, mobile-first @375px, LCP<2.5s, Search-Console verified. **(Content)** 400-600 decks, 30-50 topic pages, 8-12 guides. **(Public site)** multilingual K-3 home + pricing + about/FAQ/support + footer/nav. **(Acquisition)** Pinterest, LinkedIn target list, email waitlist, one conference. v1 does NOT target organic-traffic-at-scale / revenue-at-scale / K-12 breadth / institutional revenue (those come later). Full per-area checklist → docs/claude-md/misc-detail.md.

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
- **SEO is implied on every publish.** When the operator says publish/add new decks, interactive worksheets, activities, or tools, the FULL SEO treatment per **§21** is automatic and non-negotiable — NEVER ask whether to make it indexable, write alt-text, emit JSON-LD/hreflang, or author per-locale metadescriptions. Run the §21 per-type standard without being asked.

**Commit hygiene.** In-session-commit rule applies to git-tracked files. `MEMORY.md` index + `memory/` directory at `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\`, `CONVERSATION-HANDOFF.md`, `CLAUDE-MD-UPDATES.md` are out-of-tree handoff artifacts; persist at filesystem level without commits; don't `git add` them.

**Read-from-SoT precedence over re-authoring at component-substrate work.** When a component needs localized labels/axis-keys/taxonomy data that already lives at a single SoT (e.g., `topics-taxonomy.json axes.<axis>.<key>.{name,slug}.<locale>` per §16.5; `EXERCISE_MODE_APP_CLASSIFICATION` per §A.13.4; `image_themes.displayNames` per §A.7), the component reads directly. Mirroring is a duplicate-state failure mode — mirror + SoT drift over time. Direct SoT consumption eliminates the drift surface. Arc 1 substrate (`d039d8e2`) shipped 4 components consuming axis-key labels directly from `topics-taxonomy.json` (~870 labels at SoT, not re-authored in `messages/*.json`).

### 10.5 Flag to operator
Anything seeming to conflict with production behavior; any place CLAUDE.md is ambiguous; any task as specified that would break working features; any irreversible-feeling action; any performance concern affecting production traffic; any Mac-Studio-reachability dependency that would create an outage.

## 11. Scope discipline — out of v1

Deferred (don't build without explicit direction): unified worksheet creation studio for teachers (cut: teachers buy finished content); AI-powered deck generation; RTILA/n8n; RAG knowledge base; LoRA fine-tuning; synchronous AI in teacher-facing path; student accounts; class management; parent portals; school-district SSO/SAML; real-time collaboration; native mobile apps; offline play; KDP/Etsy seller features.

**Now in scope** (additions from prior versions): headless Mac Studio running asynchronous deterministic-AI enrichment — Topic embeddings (§16.1), deck-level enrichment + AI-suggested tags + descriptions (§4.5), OG images, alt-text + structured-data + meta enrichment — **NOT** lesson-plan production (cooperation-pattern per §3.4, Q2 final resolution post-`e912b805`). Sample decks on every public page. SEO-from-the-start (§17). Language launch sequence treating depth in priority languages over breadth (§19). From-scratch rebuild of public site for multilingual K-3 audience.

**Removed from scope:** student session analytics (K-3 teachers observe directly all day); assignment-style multi-deck sequences (not justifying engineering weight for K-3); broad "teacher catalog" framing (replaced with multilingual K-3).

**Queued + future-arc backlog** (catalog-share-revival; topic-page full-shape brief; Group-C brief; §19 longer-arc items; plus filed future-arc candidates — manifest-disambiguator field, ALL_LOCALES DRY-extraction at 4th-consumer, arc-splitting heuristic, treasure-hunt decoupling, `shared.msg.offtheme.dropped` promotion, backup-path divergence) → docs/claude-md/misc-detail.md + [[project-deferred-items-queue]].

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
`REFERENCE TRANSLATIONS/catalog-export.js` (synced via `scripts\master-sync.bat`; served at `/var/www/lcs-media/worksheet-generators/js/catalog-export.js?v=9`), loaded by all 29 apps. Public API: **`buildSeoHead(manifest, opts)`** (§17.8.1 `<head>` with `__CANONICAL_URL__`/`__EDUCATIONAL_LEVEL__` placeholders); **`buildEndDeckLinks(opts)`** (§17.8.2 end-of-deck topic links; `{includePlaceholders:true}` from publish-cli path); **`buildSrRows`/`buildSrPuzzleSummary`** (sr-only blocks — JSDoc is canonical for sr* key naming + the single-vs-≥2-consumer rule); **`buildShareAffordance({canonicalURL?, locale, title})`** (§17.8.15 in-deck share; bare-`translations` lookup per §17.8.14); **`vocabKeyFromImage(img)`** (3 image-source forms — theme path / server-upload / data-URL — → vocab-canonical key OR null); **`HREFLANG_MARKER`** (MUST be last in `<head>` §17.8.1); **`export(opts)`** (Export-to-catalog ZIP). Companion `translations-shared.js` merges into `window.translations` (per-app collision warnings). Bundle-shape contract extensions (sudoku `uniqueImageKeys` / cryptogram `cipherMap` / picture-path endpoints), the number-word lookup convention, and the 4th-consumer pre-emptive-refactor threshold → **docs/claude-md/catalog-pipeline.md#143a**.
### 14.4 Recipe to port a new app
**Step A** decide family (fixed answer positions → Family A; spatial selection/drawing → Family B; see §14.2). **Step B** additive metadata patches (`problemsData`, tag interactive elements, carry operator choices needed for validation). **Step C** download button + wiring (4 edits). **Step D** copy the closest reference block + adapt (bump `bundleVersion`, rewrite `extractDeckBundle`, extend render/check/reset, 7 attribution edits per §14.3). **Step E** validate/sync/commit/deploy (§14.5-§14.6). Full step detail → docs/claude-md/site-topic-export-detail.md#144.

### 14.5 Local dev loop
A pre-existing Next.js route conflict blocks `npm run dev` until `frontend/app/sitemap.xml/route.ts` is renamed `route.ts.DISABLED-FOR-DEV`. **Rename it back before any push to production** or live sitemap breaks. Known wart; deferred.

After edits to `REFERENCE APPS/<app>.html`: `scripts\master-sync.bat` → hard-refresh `localhost:3000/worksheet-generators/<app>.html` → Generate → Download Interactive Worksheet → open downloaded file.

### 14.6 Deployment — TWO-STEP rule
Worksheet-generator HTML updates require BOTH steps (served copy is `chattr +i` immutable):
1. **Push + build:** `plink ... "bash /opt/lessoncraftstudio/deploy.sh"` — runs `git pull`, builds, smoke tests. Updates `/opt/lessoncraftstudio/REFERENCE APPS/<app>.html` but NOT served copy.
2. **Sync served copy:** `plink ... "cp '/opt/lessoncraftstudio/REFERENCE APPS/<app>.html' /tmp/<app>.html && /var/www/lcs-media/scripts/update-worksheet.sh /tmp/<app>.html <app>.html"`
3. **Verify:** `curl -s https://www.lessoncraftstudio.com/worksheet-generators/<app>.html | grep -c 'Interactive-HTML export v<N>'` must be ≥ 1.

### 14.7 Known gotchas (read before debugging)
Full list (Fabric geometry, bundle/runtime authoring, operator/interactive filter mismatch, UX rules) → **docs/claude-md/catalog-pipeline.md#147**. Headlines: use `calcTransformMatrix()` + `fabric.util.transformPoint` for world coords (NOT `getBoundingRect` which is group-local in Fabric 5.x), and don't double-scale (use intrinsic `img.width`/`img.height`); the operator may transform the rowGroup after generation — `calcTransformMatrix` honors it; escape `<\/script>` inside inline string scripts; store the runtime as array-of-strings joined at render (avoids template-literal escaping); `expectedAnswer` MUST branch on mode (find-addend/find-subtrahend/missing-operand); interactive export MUST apply the operator's display filter (wordsearch-class); don't duplicate what the baked JPEG already shows; coerce student input to the operator's `letterCase` and compare case-insensitively.
### 14.8 Bundle versions shipped
Bundle version bumps on every port so the runtime can key on shape if needed. The full v4-v32 table (app → family → notable) → **docs/claude-md/catalog-pipeline.md#148**; per-app details in MEMORY.md. All 29 apps (§14.10) ship interactive HTML + LCSAttribution + the catalog-export ZIP across runtime Families A-F (§14.2). Family G (bingo v24.0-24.1 drag-with-caller) was prototyped then retired.
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

End-to-end: a worksheet generated in one of the 29 apps (§14.10) → catalog with full enrichment. Terse rules below; **full three-layer manifest JSON schemas, per-subcommand contracts, and empirical anchors live in `docs/claude-md/catalog-pipeline.md`.**

### 15.1 The three-layer manifest
Each deck's metadata splits across three never-overwriting JSONs (catalog DB holds the merged view; originals stay on disk): **`generation.json`** (app at gen time — deck_id, generator, language, exercise_type/mode, settings, theme, images/vocab, exercises-with-answers, assets, reserved `content_family_id`=null in v1); **`metadata.json`** (publish step + operator review — title/description per locale, subject, `topic_slugs`, age_range, tags, status, + the two SEO fields `educational_level` + `educational_level_localized` deterministically derived from `age_range` per §17.8.6); **`enrichment.json`** (Mac Studio AI — embedding, long_description ×11, learning_objectives ×11, ai_tags). Full schemas in companion.

### 15.2 The publish flow
`catalogExport(appConfig, generatedContent)` produces `generation.json` in-memory; the "Export to catalog" button produces one ZIP (`manifest.json` + deck.html + printable.pdf + answer-key.pdf + thumbnail.png). Operator runs `publish-cli` (watch-folder): validates manifest → auto-fills metadata via taxonomy → posts assets to Hetzner (behind Cloudflare) → generates native-language slug (`@@unique([language, slug])`; migration must land first) + substitutes deck.html SEO placeholders (§17.8) → inserts the `Deck` row. Mac Studio polls within minutes. **`bundle.canonicalURL` note:** v1 does NOT promote it to a bundle field; the in-deck share affordance (§17.8.15) uses a predicted-slug fallback until publish-cli substitutes the real `__CANONICAL_URL__` AND the catalog deck route exists.

### 15.3 Local AI service contract
Pull-based worker (not a push target). Endpoints on Hetzner: `GET /api/ai-ingest/pending` (Tailscale-bound shared secret) + `POST /api/ai-ingest/complete` (keyed by deck_id). When Mac Studio is offline, decks accumulate in `pending` and serve without enrichment (rank lower; topic pages fall back to faceted).

### 15.4 Strict-arg parsing
`scripts/publish-cli/strict-args.js` — SCHEMAS per subcommand (`publish`/`publish-bulk`/`unpublish`); errors on unknown flags pre-side-effect (Levenshtein suggestions). `publish-bulk` requires `--confirm` for real (without it, dry-run regardless of `--dry-run`).

### 15.5 Edit-in-place contract
`--update-slug <slug>` updates a published deck via temp-staging + symlink-swap (`fs.symlinkSync` + `fs.renameSync` — kernel-atomic; NOT `ln -sfn`). Slug-stable on update; versioning is internal (`<slug>-v<N>/`). `--update-slug` is the SOLE update flag.

### 15.6 Slugify divergence
Two slug generators intentionally differ on non-ASCII: `catalog-export.js: slugify` (non-ASCII → hyphen; deck.html gen-time fallback) vs `scripts/publish-cli/slug.js` (§17.8.5 ASCII-fold; upload time). Intentional for v1 (English-only `bundle.title`).

### 15.7 Catalog deck route
`/[locale]/decks/<slug>/` served by **nginx** (config at `/etc/nginx/sites-enabled/lessoncraftstudio`, server-side, NOT in git), NOT Next.js. `<slug>` is a symlink → `<slug>-v<N>/`; atomic swap via `fs.symlinkSync`+`fs.renameSync`. Canonical URLs are www-form (§A.10). **Routing-contract for Next.js components: `<Link>` for Next.js routes (trailing-slash-tolerant); plain `<a href>` for nginx URLs (deck pages, PDFs) — `<Link>` strips the trailing slash and 404s nginx URLs.**

### 15.8 Cloudflare cache-invalidation
5-min short-TTL via nginx `Cache-Control: public, max-age=300`; Cloudflare honors origin; no purge-API. Fresh edits propagate within 5 min (load-bearing post-2026-04-30).

### 15.9 `_collisions.txt` archived-vs-published differentiation
INSERT-route collisions surface different recommendations: published-row → add to `--updates-manifest` OR rename source ZIP; archived-row → pick a different slug (UPDATE-via-manifest invalid for archived rows).

### 15.10 Block-on-archived UPDATE
`publish.js` rejects `--update-slug` when `existingRow.status !== 'published'` (the surviving `(language, slug)` unique constraint is the mechanism). **Cross-locale-OK** — the block is same-locale only; cross-locale INSERTs of an archived slug are clean (locale-conditional emission, e.g. en `picture-trail` vs de/es/nl `picture-path`).

### 15.11 Unpublish handler
Single-deck CLI (`unpublish <slug> --language <locale> --confirm`), FS-first DB-last: find published → `unpublishAssets` (remove symlink → immediate 404; rename `<slug>-vN/` to `.archived/.../<slug>-unpublished-<utc>/`) → flip DB status.

### 15.12 Archive folder structure
Two namespaces at `/var/www/lcs-media/decks/.archived/<locale>/`: `<slug>-pruned-<utc>/` (KEEP_VERSIONS=3 pruning) + `<slug>-unpublished-<utc>/` (unpublish). Cleanup-cron deferred (>1 GB OR 100+ decks).

### 15.13 Dry-run-vs-real parity
Per-deck staging set is byte-identical between dry-run and real (`bulk.js` invokes `dryRunBatch()` as its own pre-flight); `_summary.txt`/`_results.txt`/`_failures/` diverge by design. **Within-batch collision: surface an inspection report before `--confirm` (anti-pattern: auto-suffix); tiebreak = drop the LATER-generated ZIP (earlier-roll-wins).**

### 15.14 Asset placement / OG image / pruning
Layout `/var/www/lcs-media/decks/<locale>/<slug>-v<N>/{deck.html, printable.pdf, answer-key.pdf, thumbnail.png, og-image.png}` + symlink; ownership `lcs-media:lcs-media` 755/644; KEEP_VERSIONS=3 → `.archived/`. **OG image** = 1200×630 Sharp two-column composite (left thumbnail / right cream `#FEFAF3` + title + theme/level + wordmark) + embedded XMP packet; legacy centered layout at `og-image.js: deriveLegacy()`. See §17.8.19.

### 15.15 publish-bulk per-locale isolation
`publish-bulk` has NO `--language` flag; per-locale isolation is enforced at the folder-content layer (`bulk.js` reads non-recursive, filters `.zip`; dot-prefixed subdirs skipped). Operational pattern: archive prior batch's residue into a dot-subdir → SCP new ZIPs to top level → `--dry-run` then `--confirm`.

### 15.16 Manifest-content reconciliation gate
Two-dimension gate on every manifest before slug derivation (runs in `dryRunBatch()` pre-side-effect; halts surfaced in `_reconciliation.txt`): **Dimension 1 theme** (`reconcileManifestTheme` — manifest.theme vs `parseThemeFromImagePath`; CLEAN/MISSING_THEME/MISSING_PRIMARY/THEME_DISAGREE; themeless legitimate-null preserved) + **Dimension 2 exerciseMode** (`reconcileExerciseMode` vs `EXERCISE_MODE_APP_CLASSIFICATION`; the halt class is `MODE_NULL_FROM_HARDCODED_APP` — empty across all 29, gate stays as backstop). Structural backstop at the publish-cli boundary (complements Shape A §A.13.5). **Halt-surface calibration: on unexpected fire, first verify the predicate against ground-truth, not "gate malfunctioning."** 56 unit + 5 integration tests in `slug.test.js`/`reconciliation.integration.test.js`.

### 15.17 Salvage scripts pattern (`rewrite-manifest-<field>.js`)
Generation-side emit-defects across already-staged ZIPs → one-shot salvage scripts derive the correct value from in-bundle content + repack in-place with backup (`rewrite-manifest-theme.js`, `rewrite-manifest-exercise-mode.js`). Requirements: pre-pass classification before any FS write (halt-classes `unparseable`/`ambiguous` exit before Phase 2); backup-then-rewrite; post-apply re-run the §15.16 gate (expect N/N CLEAN); authoring-side root-cause fix (Shape A §A.13.5) queued separately. Preferred over regeneration when the in-bundle signal is recoverable.

### 15.18 Inbound-link surface counter + gate doctrine
`scripts/publish-cli/count-inbound-surfaces.js` (CJS port of the TS counter) implements the 8-surface counter consumed by `reconcileInboundLinkSurface`; predicate fires `INBOUND_LINK_COUNT_BELOW_TARGET` when count <3 (WARN pre-Phase-5, HALT post). **§15.18.1 bulk.js wire-in CLOSED** via default-fallback (`opts.findExistingByTitleHash || db.findExistingByTitleHash`, same for descriptionHash) — bulk-publish now enforces the same uniqueness invariants as single-publish. **§15.18.2 pre-vs-post-publish semantics:** for INSERT-path dry-run, `manifest.deck_id ≠ DB CUID` → count=0 → predicate fires; resolution deferred-empirical (commission only if halt rate >~5%). Cross-ref §A.13.7.
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

**`topics-taxonomy.json` schema** — `$schema_version` + `apps.<name>.{default_subject, default_age_range, exercise_type_axis_key}` + `axes.{exercise-type,theme,educational-level,exercise-mode}.<axis-key>.slug.<locale>`. Full schema block → docs/claude-md/site-topic-export-detail.md.

Locale coverage per launch tier (§19): Tier 1 (en, de) from day one; Tier 2 (es, nl) at Tier 2 launch; Tier 3 (sv, fi, no) at Tier 3; Tier 4 (fr, it, da, pt) at Tier 4.

**publish-cli substitution** reads `topics-taxonomy.json` and substitutes end-of-deck-link placeholders per §17.8.2 / §17.8.5. Canonical names per emitter at `REFERENCE TRANSLATIONS/catalog-export.js:34-46`: heading `__END_DECK_HEADING__`; URLs `__LINK_MORE_TYPE__` / `__LINK_MORE_THEME__` / `__LINK_MORE_LEVEL__` / `__LINK_BROWSE_ALL__`; localized text `__LINK_TEXT_*__`. Localized text accepts `{type}` / `{theme}` / `{level}` ICU-style against per-axis-key `name.<locale>`.

#### 16.5.1 Theme axis-key registration: Path X 1:1 with image-library
`axes.theme` is registered 1:1 with `image_themes` `type='images'` rows — **50 color + 50 BW = 100 axis-keys**; per (theme, locale) `slug = slugify(displayNames.<locale>)`, `name = passthrough`. Decoration assets (backgrounds/borders) are NOT registered (generation-time visual inputs, not browse classifications). The drops/renames (`food` dropped, `fruit`→`fruits`), the `name` singular→plural shift, and the Spanish-displayName collision Option-A fallback → docs/claude-md/site-topic-export-detail.md#1651 (+ §A.7.1 underlying data fix).

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
Topic pages render rich locale-natural prose above the deck grid, i18n-keyed per (axis-key, locale). Full detail → docs/claude-md/topic-and-i18n-detail.md.
### 16.7.1 Q3 fallback chain pattern
3-level: `topicProse.<axisKey>` / `topicProse.<a1>__<a2>` (rich, top-N) → `topicPage.intro.<intent>` → `topicPage.intersection.intro`; `TopicProseContainer.tsx` takes the first non-empty.
### 16.7.2 topicProse key shape canonical
Single-axis `topicProse.<axis-key>`; 2-axis `topicProse.<a1>__<a2>` with axis-keys in **alphabetic order** (`lookupTopicProse` sorts before lookup).
### 16.7.3 Path B by default for content-authoring arcs
Rich content for top-N per locale; long-tail falls through substrate-honestly to template intros. Top-N is operator-strategic (default: top-N by published-deck-count).
## 16.8 Filter-sort-pagination
### 16.8.1 TOPIC_PAGE_SIZE = 24
Locked at 24 (4 cols × 6 rows desktop); constant at `frontend/lib/topic-decks.ts: TOPIC_PAGE_SIZE`, imported by all paginated surfaces.
### 16.8.2 Filter-sidebar architecture pattern
`FilterSidebar.tsx` renders 3 facet groups in order **theme → educational-level → exercise-type** (theme top-12-then-expand; level all-5; type all-29). URL query-string (§16.5.4) is the state truth-source (NOT React state); the path-bound axis is excluded from its facet.
### 16.8.3 Canonical-tag-on-pagination
Pagination/sort URLs 308-redirect to the bare path when params equal defaults (`?sort=newest`/`?page=1` stripped). Compare RAW incoming `searchParams` against canonical-form (the subtle bug: comparing two already-canonicalized forms never fires).

## 17. Public site rebuild + SEO-from-the-start

Previous KDP/Etsy seller positioning fully discontinued; rebuilt for multilingual K-3 audience.

### 17.1 What was deleted
**Status: complete** at tag `v1-teardown-complete` on `pivot/printable-business-toolkit` (9 passes removed all public seller surfaces, seller-era namespaces/config, purchase-admin tooling, `Purchase`/`purchases`/`wplus_transactions`). Deleted prefixes return **410 Gone** via `middleware.ts`; reshelled dirs (`pricing/`/`about/`/`faq/`) **404** until new content. Pass 1-9 commit chain → docs/claude-md/misc-detail.md.

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
Lesson-plan URL surface deleted with the domain (commit `920aebbc`; see top AMENDMENT). Topic-page URLs at `/[locale]/topic/<native-language-slug>/` remain canonical per §17.4; native-language-slug discipline at the topic-page surface is unchanged.

#### 17.4.2 Per-locale axis-key name parentheticals reflect platform age-range
Educational-level axis-keys have canonical age-range semantics per §17.8.6. Per-locale `slug` + `name` maps use the PLATFORM's age-range numbers in parentheticals, NOT the locale's school-system numbers (cross-locale consistency at platform-abstraction layer). Example: Italian `Scuola dell'infanzia` covers ages 3-6 in actual Italian school structure; preschool axis-key uses platform's `(3-5 anni)`. Established at `b3f0d1f3` + `9ea577fe` + `589fd554` + `a47ea021`.

#### 17.4.3 Cross-locale educational-level matrix (canonical)
The 5 educational-level axis-keys (preschool/kindergarten/grade-1/grade-2/grade-3) have a canonical per-locale slug+name across all 11 locales — **full 11×5 matrix in docs/claude-md/site-topic-export-detail.md#1743** (also encoded in `topics-taxonomy.json`). **Descriptor-differentiation pattern:** where a locale's school system unifies multiple platform axis-keys under one term (it/fr/pt/no), the per-locale name differentiates via a parenthetical; 7 locales (en/de/es/nl/sv/da/fi) have discrete per-axis-key terminology. Parentheticals use the PLATFORM's age-range numbers (§17.4.2), not the locale's school-system numbers.

### 17.5 Keyword research workflow
Claude (chat) does on-demand keyword research when new content is commissioned (web-search what ranks, competing content, gaps, the natural target-language slug); findings accumulate in `seo-strategy.md`. Strategic not tactical (no precise volumes without Ahrefs/SEMrush). Full workflow + article examples → docs/claude-md/site-topic-export-detail.md#175.

#### 17.5.1 NSR-flag pattern for Nordic + non-Romance commissions
Claude's Nordic quality is weaker than Romance/Germanic; Nordic + future non-Romance commissions ship at correct-enough state with an `[NSR-FLAG]` in the commit message marking deferred native-speaker review. Does NOT apply where chrome shipped via cross-locale precedent with native-equivalent confidence.

### 17.6 Content marketing surface
One substantive article/week in the strongest content language, adapted into priority languages over time; topics specific to multilingual K-3 educators (home-language support, age-appropriate activities, multilingual parents, international-school early years). Every guide embeds a sample deck (§18). Article-topic examples → docs/claude-md/site-topic-export-detail.md#176.

### 17.7 What this means for Claude Code

When commissioned for a public page, CC:
1. Reads current `seo-strategy.md`
2. If new content territory, asks operator to commission keyword research from Claude first
3. Implements server-rendered with proper schema markup, hreflang, embedded sample deck, mobile-first, lazy-loaded, native-language URL slugs
4. Adds to XML sitemap
5. Cross-links from related pages both directions
6. Validates LCP < 2.5s before done

### 17.8 The deck.html SEO surface

Each published deck is a self-contained static HTML at a public URL; Google sees each as its own page (a long-tail SEO surface across thousands of decks × 11 locales). SEO is **baked at publish time** (§4.4 cacheability — same bytes to teachers + Googlebot, no request-time templating) and does NOT modify the §14.3 attribution footer. **v1/v2 split:** v1 ships the SEO surface with `content_family_id=null` + empty hreflang; v2 (SHIPPED 2026-05-19) populates cross-language siblings + hreflang (§17.8.7).

Terse contract below; **full `<head>`/`<body>` spec, slug ASCII-fold rules + example tables, per-app emit detail, and empirical anchors live in `docs/claude-md/deck-html-seo-surface.md`.** Emit machinery is `LCSCatalogExport.buildSeoHead` + `build-seo-head.js` (publish-cli port).

#### 17.8.1 deck.html `<head>` requirements
`<html lang>` from manifest; localized `<title>` (`<Type> Worksheet — <Theme> — <Level> | LessonCraftStudio`, 50-60 chars) + `<meta description>` (150-160 chars) carrying `__EDUCATIONAL_LEVEL_LOCALIZED__`; `<link rel=canonical href=__CANONICAL_URL__>` (`https://lessoncraftstudio.com/<locale>/decks/<native-slug>/`, trailing slash, no `.html`); `<!-- HREFLANG_INSERTION_POINT -->` LAST in `<head>`; Schema.org `LearningResource` JSON-LD (name/description/`learningResourceType:Worksheet`/`educationalLevel`/`teaches`/`inLanguage`/`isAccessibleForFree`/creator/audience/url). Full field spec in companion.

#### 17.8.2 deck.html `<body>` requirements
One `<h1>` (worksheet title); instruction in `<p>`; `alt` on every library `<img>` (= vocab entry in deck's language; missing = vocab bug); hidden `sr-only`/`aria-label` describing exercise content from the `exercises` array; **end-of-deck internal links** — real `<a href>` to the deck's α-granular topic pages (§16.5) + locale root, substituted by publish-cli.

#### 17.8.3 Out of scope (anti-SEO)
No keyword-stuffing, no head-term competition (long-tail only), no platform-wide content per deck, no AI marketing copy, no tier-dependent SEO, no request-time templating.

#### 17.8.4 Changes in `catalogExport()` (shared module §15.2)
`catalogExport()` emits SEO STRUCTURE with placeholders (`__EDUCATIONAL_LEVEL__`/`__EDUCATIONAL_LEVEL_LOCALIZED__`/`__CANONICAL_URL__`/HREFLANG marker/`aria-label`/`sr-only`); per-app changes are surgical (title `<div>`→`<h1>`, instruction `<div>`→`<p>`, add `alt`+`aria-label`). Apps do NOT populate educational_level or canonical URL (publish-cli's job). Multi-template-variant pattern dispatches on `bundle.mode`.

#### 17.8.5 Changes in `publish-cli`
publish-cli on every upload: (1) **generates a native-language slug** from the manifest (per-locale via `topics-taxonomy.json`; ASCII-fold; stored on `Deck.slug` with `@@unique([language, slug])`); (2) substitutes `__CANONICAL_URL__`; (3) computes `educational_level` + `_localized` from `age_range` (§17.8.6); (4) substitutes the HREFLANG block (v2 siblings / v1 empty); (5) substitutes the 4 `__LINK_*__` + 4 `__LINK_TEXT_*__` topic-destination placeholders from `topics-taxonomy.json`. **Slug shape for themed decks = `<exercise-type>-<exercise-mode>-<theme>`** (operation+mechanic+content ordering); themeless preserve `<type>-<mode>`. **Default-mode-emits-null contract**: most-common mode emits null (shorter URL); non-default modes get an explicit slug component. **Native-language slug derivation** reads per-locale slugs from taxonomy (fallback chain: missing entry → bare key; missing locale → `slug.en`); EN unchanged (taxonomy invariant `slug.en === key`). Surface slug-pattern preview via `publish-bulk --dry-run` before `--confirm` (anti-pattern: auto-suffix on collision — surface inspection per §15.13). ASCII-fold impl + example tables in companion.

#### 17.8.6 The age-range → educational-level mapping
`educational_level` is deterministically derived from `age_range` by publish-cli (apps never compute; single SoT):

| `age_range` | `educational_level` (English; Schema.org) | i18n key |
|---|---|---|
| `3-5` | `Preschool` | `seo.educational_level.preschool` |
| `5-7` | `Kindergarten` | `seo.educational_level.kindergarten` |
| `6-8` | `Grade 1` | `seo.educational_level.grade_1` |
| `7-9` | `Grade 2` | `seo.educational_level.grade_2` |
| `8-10` | `Grade 3` | `seo.educational_level.grade_3` |

English populates Schema.org `educationalLevel`; the localized form (`seo.educational_level.<key>`) populates localized `<title>` + meta description. Both stored on `metadata.json`. grade-3 (8-10) defined-but-unused at the K-3 ceiling; stays for forward-compat.

#### 17.8.7 v1 vs v2 scope: cross-language sibling tracking
Hreflang matters only with real cross-language siblings. **v2 (SHIPPED 2026-05-19):** `populate-and-inject-hreflang.js` groups published decks by 5-tuple (exercise_type, exercise_mode, theme, age_range, variant_id); multi-locale groups get a `content_family_id` + a `<!-- HREFLANG_BLOCK_* -->` block (one `<link hreflang>` per sibling + `x-default`). Forward path: `substitute.js` accepts `opts.siblings`; callers look up siblings via DB when `content_family_id` is set. Translate-this-deck UI deferred; the SEO substrate is in place.

#### 17.8.8 What this section does NOT change
Attribution (§14.3, tier-neutral), tier model (§7), cache (§4.4), pricing (§7), which apps export (§14.9), the catalog-export ZIP (§15.2), the topic URL pattern (§16.5). Manifest gains one field on generation.json + two on metadata.json (§15.1).

#### 17.8.9 Answer-bearing-field hygiene
Bundle fields holding puzzle answers are comment-marked at construction (`// ANSWER-BEARING — sr-only template MUST NOT echo this`): sudoku `holes[].correctImageIndex`; picture-path `solutionPath`+`legend.items[].correctCount`; cryptogram `slots[].cipherLetter`+`.expected`; subtraction/5A `slot.expected`.

#### 17.8.10 Row+col 1-indexed indexing convention for sr-only
Bundle is 0-indexed; per-app code converts to 1-indexed at sr-only template-fill.

#### 17.8.11 Defensive-skip discipline for sr-only emission
When bundle invariants are violated at sr-only emission, SKIP emission entirely — never render a degraded variant (per-app invariants: sudoku/cryptogram/picture-path skip on missing required fields).

#### 17.8.12 Mode-conditional dispatch with sub-variants
Dispatch order: (1) mode → one of N templates; (2) secondary scalar branching within mode; (3) conditional segment presence. (Extends §17.8.4.)

#### 17.8.13 List-joiner convention (promote at 4th-consumer threshold)
Use `Intl.ListFormat(srLang, …)` with a defensive hardcoded-English fallback. Promote to `LCSCatalogExport.formatList` at the 4th consumer.

#### 17.8.14 Sr-only-emission srLang-keyed lookup convention
Sr-only emission uses **`translations[srLang][key]` direct lookup** (3-level fallback srLang→en→hardcoded-EN; `srLang` from `bundle.contentLanguage`), bypassing per-app `t()` (whose locale-binding causes mixed-locale sr-only). (§A.13.46 extends this to SEO chrome.)

#### 17.8.15 In-deck share affordance
Each deck.html ships `LCSCatalogExport.buildShareAffordance` (top-right of `lcs-bar`, `.lcs-share`). Web Share API progressive enhancement → OS share sheet; fallback = self-contained 5-platform overlay (Facebook/WhatsApp/Pinterest/email/copy-link) in the deck's content-locale (plain anchor links, no SDKs). Defensive-skip (§17.8.11) when no canonicalURL and no constructible `locale+title`. v1 predicted-slug fallback `…/<locale>/decks/<slugify(title)>/`. Tier-neutral + SEO-neutral.

#### 17.8.16 Mutable-regions contract via SEO_INSERTION_POINT marker pair
deck.html `<head>` SEO uses paired `<!-- SEO_INSERTION_POINT_START/END -->` defining a mutable retrofit region. Classes A/A.1/A.2/B per marker+trace presence (B = markers absent → strip pre-existing SEO + inject marker pair). Atomic temp+rename (`republish-seo.js: rewriteDeckHtmlAtomic`).

#### 17.8.17 Phase 2 §1-§7 invariants codified as deck-page SEO doctrine
7 deck-page SEO invariants, each enforced by a predicate at `scripts/publish-cli/seo-reconciliation.js`, all **HALT-class on every new publish** via `reconcileDeckPageSEO` (the gate IS the reminder; operator need not remind):
1. Title uniqueness per (language, titleHash) — `@@unique` + `findExistingByTitleHash`
2. Description uniqueness per (language, descriptionHash)
3. Canonical-URL pattern (www-form §A.10 + locale + native slug + trailing slash)
4. OG-tag completeness (14 tags: 7 og:* + 7 twitter:*)
5. Inbound-link minimum N≥3 non-sitemap surfaces (`count-inbound-surfaces.js`; HALT post-Phase-5)
6. Locale-residue absence (`manifest.seo_trace`)
7. Single-h1 per deck

1 WARN retained: `OG_IMAGE_FALLBACK_USED`. Hash algorithm per §17.8.18.

#### 17.8.19 Image SEO signal stack (multi-signal for Google thumbnails)
Every deck page exposes a redundant 5-channel image signal: (1) `<head>` meta (`og:image`+width/height/alt/secure_url/type, `twitter:image`, `link rel=image_src`, global `max-image-preview:large`); (2) Schema.org `ImageObject` (1200×630) + `thumbnailUrl` + keywords + typicalAgeRange; (3) XML sitemap `<image:image>` entries via custom routes `frontend/app/sitemap/{0,1}.xml/route.ts`; (4) embedded XMP packet in og-image.png (`og-image-xmp.js`); (5) the two-column og-image composite (`og-image.js: derive`). Retrofit via `regenerate-og-images.js` — do NOT re-author the Sharp pipeline (§A.14.10).

#### 17.8.18 Canonical hash algorithm for titleHash + descriptionHash
**SHA-1 normalized** (trim + lowercase + whitespace-collapse → `crypto.sha1` hex, length 40) is canonical for `Deck.titleHash`/`descriptionHash`, computed via `seo-reconciliation.js: hashTitleOrDescription(s)`. Standardized 2026-05-19 (was a SHA-1/SHA-256 mix). For future hash-writing code: import + use `hashTitleOrDescription`; NEVER `sha256()` for title/description; `audit-deck-html.js` flags any length-64 DB hash as stale.

#### 17.8.20 Printable-PDF indexing policy: deck.html is the single indexable surface
**Locked 2026-05-31; reviewed + kept.** The two PDF assets per deck are linked from deck.html but MUST NOT be indexed (they duplicate the deck page as thin docs). **Mechanism = `X-Robots-Tag: noindex` at nginx** (a `location ~ …/decks/…\.pdf$` block BEFORE the generic deck-asset catch-all so og-image.png + thumbnail.png stay indexable; `noindex` only, NOT `nofollow` — PDFs stay crawlable so Google sees the header + keeps link equity). Do NOT use `robots.txt Disallow: *.pdf` (blocks the crawl → bare URL-only index entries). Tooling: `patch-nginx-pdf-noindex.py` (idempotent; re-run after any nginx rebuild). Slug-integrity auditor `audit-slug-fs-db-consistency.js` (0 hard defects across 19,537 decks 2026-05-31). The `thanksgivinng`→`thanksgiving` typo fixer is the template for any future single-token slug-data typo. Full mechanism + audit detail in companion.
### 17.9 [REMOVED 2026-05-17] Pillar 1 lesson-plan production discipline

Section deleted per operator commission (commit `920aebbc`; see top AMENDMENT). The lesson-plans / teaching-packages / themed-bundles cooperation-pattern production discipline is obsolete and no longer load-bearing; a future teacher-facing-pedagogical-content commission would re-scope from scratch.

### 17.10 I18n hygiene + sitemap-shard infrastructure
**17.10.1** 4-shard sitemap-index hash-partitioning (shards 0/1 = deck URLs by `Deck.id` last-char parity; 2 = 2-axis intersections; 3 = single-axis topic + locale-root + meta; index hard-codes [0,1,2,3]; shards 0+1 are custom routes emitting `<image:image>`, 2+3 via Next `generateSitemaps()`). **17.10.2** reuse one shared i18n key when (key,locale) values are identical. **17.10.3** substrate-honesty namespace-boundary (grep ALL 11 locale files for a namespace's key set; mismatch → raw-key-leak). **17.10.4** Wave-N namespace-migration discipline (cross-locale audit → per-locale gap-fill → single commit → per-locale curl + raw-key grep). **17.10.5** runtime-consumer-audit is load-bearing (which keys the component actually calls). **17.10.6** legacy-namespace-residue audit-on-arc-Phase-1 (audit BOTH forward gap AND backward residue). **17.10.7** cross-locale convention-parity (sample Tier-1+2 actual canonical TEXT shape, not just key presence). Full detail → docs/claude-md/topic-and-i18n-detail.md.
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
Cross-ref §16.2. Cardinality caps encode variety SHAPE (Strip 1 max-1-per-locale; Strip 2 max-2-per-axis-key; Strip 3 max-1-per-level + self-skip on level pages; Strip 4 max-1-per-topicSlug + max-1-per-locale). Self-skip per-strip when cardinality <2. Cross-locale variety ON during the substrate-only-locale period. ISR `revalidate=3600`, no module-scoped memoization. Full detail → docs/claude-md/site-topic-export-detail.md#1841.

#### 18.4.2 BreadthGrid 4-family hybrid + 9-cell composition + day-of-week rotation
4-family locale map (Germanic en/de/nl; Nordic sv/da/no; Romance es/fr/it/pt; Finnic fi with Nordic sibling-proxy) preferring visitor-recognition over linguistic typology; 9-cell = 6 visiting + 2 cross-locale sibling + 1 featured (`sudoku-en`); UTC day-of-week rotation (within-day stable, ISR-cache-preserving; anti-pattern: per-request randomization fragments ISR cache). Sibling pools + full composition → docs/claude-md/site-topic-export-detail.md#1842.

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
- **Tier 3 (sv, fi, no) + Tier 4 (fr, it, da, pt):** Track A + Wave 1 substrate complete (`b3f0d1f3`, `9ea577fe`, `589fd554`, `a47ea021`); deck-publish unblocked; Track C remaining as open per-locale commissions prioritized per operator. **fr** full-market catalog published (2,986 decks, 2026-05-30). **da** full-market catalog published (~3,065 decks, 2026-06, via `publish-wave.js`; see [[project-danish-deck-wave]]).

---

## 20. K-3 Common Core activities + literacy engines (2026-05 commission)

Parallel workstream to the deck/catalog pipeline. Builds K-3 Common Core-aligned interactive activities (Math + Literacy/ELA) as the platform's primary product surface. Distinct from the 33 worksheet-generator apps (operator-tooling) and from the catalog deck pipeline (PDF + interactive HTML production). See per-topic memory files at `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\` for full doctrine; this section is the CLAUDE.md index.

### 20.1 Product north star
Activities are THE product. Target: full K-3 Common Core coverage across BOTH Math and Literacy/ELA — **500+ activities, uncapped** (~250-300 distinct engine-instances; ~4,880 instance-equivalents at one base locale × 11 locales per §6). See [[project-activities-north-star]] for full statement. Operator is non-technical; wants decisions made for him. Surface only (a) live pages to approve and (b) genuine business forks (assets he must supply, audience priority, pricing).

**Two-builder workflow.** A separate Claude instance (PM Claude) writes the prompts; this CC instance builds + deploys. **One prompt → one activity → one engine at a time.** Each must be 100% complete + deployed + operator-approved before next starts. Nothing accumulates.

### 20.2 Engine inventory + live surface
See [[project-activities-live-inventory]] for the canonical list. As of 2026-05-25 (commit `4b014cbc`):
- **3 manipulatives** live: ten-frame, number-line, ruler (`/mini-tools/*.html`)
- **E1 ten-frame-activity** — 5 K-Math activities (K.CC.B.4 ×2, K.CC.B.5, K.CC.A.3, K.NBT.A.1)
- **E2 choice-tap** — 10 activities (K.G.A.2, K.G.B.4, K.CC.C.6, K.CC.C.7 ×2, K.CC.B.5, K.G.A.3, 2.OA.C.3, **K.MD.A.2**, **K.MD.B.3**). **Comparing Length (K.MD.A.2)** — platform's FIRST Measurement & Data activity; same noun at two sizes via a wrapper-injected scale transform (`cl-big`/`cl-small`), tap taller/longer/shorter, no counting (structurally distinct from which-more cardinality); 11/11 locales LIVE 2026-06-02 (`choice-board-activity.js?v=13`, `ACTIVITY_WRAPPER_VERSION='7.73'`, hreflang chain 12); 0 lines to choice-board-core.js / lcs-shell.* / Direction A CSS — all logic in the activity layer (`compare-length` branch + wrapper `<style>`). **Sort and Count (K.MD.B.3)** — 2nd Measurement & Data activity; classify-then-count over a MIXED pile (name a category → tap how many belong; distractors = total + other-category count make classification load-bearing; distinct from which-more compare + how-many-group homogeneous count); 11/11 LIVE 2026-06-03 (`choice-board-activity.js?v=25`, `ACTIVITY_WRAPPER_VERSION='7.86'`, hreflang chain 12); same 0-core-line bar (heterogeneous subject via wrapper `render()` override + per-category full prompts + full-object prose override). See [[project-activities-live-inventory]] + §A.13.56. **K-Math distinct-skill phase essentially done.**
- **E7 CVC builder** — 1 EN-only activity (RF.K.3 "Build the CVC Word"). Non-EN return 404 by design.
- **E8 Syllable Builder** — **5 fan-outs LIVE (RF.K.2.B), all at 28 words** post the depth pass (2026-06): ES "Forma las sílabas" (`forma-las-silabas`) · IT "Forma la parola con le sillabe" (`forma-la-parola-con-le-sillabe`) · PT "Forme as sílabas" (`forme-as-silabas`) · FR "Forme le mot en syllabes" (`forme-le-mot-en-syllabes`) · FI "Muodosta sana tavuista" (`muodosta-sana-tavuista`). (IT + FR shipped — no longer pending/flagged; the original ES/FI/PT 8/7/7-word counts are superseded by 28.) Engine: `mini tools/word-builder-core.js` + `syllable-builder-activity.js` (sibling to E7's cvc-builder-core; NOT a refactor). Tap-to-place + per-tile TTS + blended-word TTS on correct Check. Deck depths + per-locale curation in [[project-activities-live-inventory]].
- **E9 Sound-Chunk Builder** — **5 Nordic-cluster Group-C fan-outs LIVE (RF.K.2.B) — Group-C COMPLETE:** DE "Bau das Wort aus Silben" + NL "Bouw het woord met klankgroepen" (both shipped pre-2026-05-23) + SV "Bygg ordet av stavelser" (`c2bc4249`) + NO "Bygg ordet av stavelser" (`f834efd1`) + DA "Byg ordet af stavelser" (`4b014cbc`). Same engine as E8 (`word-builder-core.js` + `syllable-builder-activity.js`); only word-source pool differs. **Manifest-id `.<locale>` suffix convention** (started NO; defensive against `_loadActivity` find() collisions when slug-shapes overlap — SV+NO share slug-shape `bygg-ordet-av-stavelser` differentiated only by `/sv/` vs `/no/` locale + manifest id `.no`). **NO+DA ng-rule**: default 2-chunk walker → boundary BETWEEN n and g (engel → en-gel); DIFFERENT from SV `sv.js` ng-as-coda special case (ängel → äng-el). **DA K-1-safe pool**: per §20.7 phonemic-divergence policy, only 402/794 approved DA words are `policy_managed:false`; first DA activity authored exclusively from this pool. See [[project-phonics-safety-pipeline]] for per-locale gate state.
- **E4 match-pairs** — tap-to-pair, single-row-multi-locale manifest. **All FIVE activities LIVE 11/11:** (1) "Make the Number" (K.OA.A.3); (2) "Addition & Subtraction Pairs" (1.OA.D.7, equal-value design, number-free celebration); (3) "Three Ways to Show a Number" (2.NBT.A.3, `three-form` template, Grade 2 NBT; closed at PT commit `b4ab207a`); (4) "Find the Missing Number" (1.OA.D.8); (5) "Compare Three-Digit Numbers" (2.NBT.A.4). ~18 pairs each (three-form 12/18-values). Non-EN cite national frameworks per §20.10; cognate-aware sequential fan-out per §A.13.53. See [[project-activities-live-inventory]].
- **E12 place-value** — build-on-columns engine `mini tools/place-value-core.js` + `place-value-activity.js` (config-driven 2-place/3-place via `places` descriptor; manipulative blocks → readout → digit caption + spoken decomposition). **3 activities LIVE, each 11/11 = 33 combinations:** A1 "Tens and Ones" (1.NBT.B.2, `tens-and-ones`); A2 "Hundreds, Tens, and Ones" (2.NBT.A.1, `hundreds-tens-and-ones`); A3 **"Expanded Form" (2.NBT.A.3)** — fan-out CLOSED at FI commit `97ddaad1` (`place-value-activity.js?v=36`, core `?v=25`, `ACTIVITY_WRAPPER_VERSION='7.64'`). A3 mechanism = locale-generic `speakExpandedForm` (speaks each place-VALUE summand as a bare `type:number` unit, then a `{connective} N` blend `type:ui`) driven by the per-locale `EXPANDED_FORM_L10N.<loc>` table (connective + zero-place phrases); summands stay bare per-place cardinals (joiner/elision/trema/agglutination live ONLY in the blend total); native-language slugs; per-locale connective + zero-place case-rule verified vs each locale's live `_NUMBER_WORD_HELPERS` + A1/A2 decomposition copula (e.g. FR singular `zéro dizaine`, NL/PT/ES/IT plural, FI partitive-singular `nolla kymmentä`); `[NSR-FLAG][fi]`. Full per-locale table + commits in [[project-activities-live-inventory]]. Core untouched (0 lines) across all cycles; no match-pairs import.

Engines NOT yet built: E5/E6 tracing, E9 sight-word, E3 sort, E13 array, E10 clock, E18 number-bond. (E8 is now LIVE in all 5 facade locales es/it/pt/fr/fi; E4 match-pairs [5 activities ×11] + E12 place-value [3 activities ×11 = 33] engines are BUILT + live; **E14 fractions recognition family is BUILT on the E2 choice-board engine** — #1 "Equal Halves and Fourths" (1.G.A.3) + #2 "Same Size, Different Shape" (2.G.A.3 non-congruence), each **11/11 LIVE** (#2 closing `c2bb562c`); anchor-and-match + FRACTION_FIGURES wrapper layer, **0 protected-core lines**; `choice-board-activity.js?v=62`/`ACTIVITY_WRAPPER_VERSION='8.63'`; the active-partition facet **#3 (tap-to-partition) is DEFERRED — needs a new `fractions-core.js`**; full record [[project-e14-fractions-series]] + the per-locale fan-out doctrine §A.13.59 — see above + [[project-activities-live-inventory]].) See [[project-activities-master-queue]] for leverage ranking + queue triage.

**Variety mechanism (catalog-wide):** within a deck, the order of words/rounds is a fresh **per-session Fisher–Yates permutation** computed in `mini tools/lcs-shell.js getTask` (a new `Math.random` seed each mount, rebuilt only on pool-size change) — so the depth-pass pools (28-word syllable decks, ~18-item match-pairs, etc.) surface in a different order every visit without re-serving or skipping within a cycle. This is the variety surface the depth pass feeds.

### 20.3 Architecture summary
See [[project-activities-architecture]]. Key constraints: **shell+tool split** (`mini tools/lcs-shell.{css,js}` own chrome; tools declare a `tasks` array); **Direction A card design LOCKED** (cream `#FBF3E4` + teal `#146B5E` + coral `#F2784B`; Baloo 2 + Nunito; dual-shadow card max-width 720px); `ActivityIframe.tsx` postMessage auto-resize; activity route SSR + ISR 3600 + JSON-LD, **CC code NEVER in URL**, native-language slugs; **mini-tools served by nginx not Next** (`middleware.ts` carve-out); `CategoryNav.tsx` wraps decks+activities+manipulatives (NOT the 33 worksheet apps). Full detail → docs/claude-md/misc-detail.md.
### 20.4 Approval cadence
See [[feedback-activities-approval-cadence]]. **The bar is NOT "tests pass + HTTP 200."** The bar is: **live render + 3-viewport screenshots (phone/tablet/desktop) + operator eyeball.** Empirical bugs that passed tests but were visually broken: blank pages, MIME 307→404 redirect chains, layout breaks at narrow viewports, COUNT readout showing the answer, badge overlapping the board, oversized blank card area beneath short activities. **No timer / score / SmartScore / streak / countdown anywhere — operator-locked.** Warm K-3 no-shame tone. **Mobile-layout gate is MANDATORY: every new/changed activity MUST pass `scripts/audit-activity-mobile.js` (all phone widths 280→768, empty+filled, 0 hard fails) before ship — see §A.13.55** (this replaces ad-hoc single-width spot checks for the "layout breaks at narrow viewports" + "oversized blank card" classes above).

**Mini-tools cp/deploy race hazard:** standalone Next.js build indexes the static `/mini-tools/` manifest at build time. New files MUST be cp'd to `/var/www/lcs-media/mini-tools/` BEFORE `deploy.sh` runs `npm run build`, OR the build sees a stale manifest. Safe pattern: single chain `git pull → cp → bash deploy.sh`.

### 20.5 Asset rules
See [[feedback-activities-asset-rules]]. Hard requirements:
- Images at `/image-library-webp/themes/<theme>/<noun>@2x.webp`
- `REFERENCE TRANSLATIONS/image-vocabulary.js` (§6) = authoritative for WHICH word; 1,263 noun keys × 11 locales × [singular, plural, gender]. NO phonics data. NEVER modified.
- **Color-only**. Exclude B&W themes.
- **B&W themes identified by LOCALIZED end-of-theme-name marker, NOT literal "BW"**: da:SH · de:SW · en:BW · es:BN · fi:MV · fr:NB · it:BN · nl:ZW · no:SH · pt:PB · sv:SV. Filter MUST be language-aware; naive "BW" match leaks B&W into 10 of 11 locales.
- **Ignore trailing numbers on filenames AND theme names** (`cat 2` → use image, label "cat"). Parsing order: strip trailing number → resolve vocab key; strip trailing number from theme → apply B&W filter (handle combined `animals bw 2`).
- Use existing localized article+plural data; don't generate.
- Phonics activities draw from `approved-words-<locale>.json` (the gated output of the safety pipeline) — direct reads from image-vocabulary.js bypass the gate and are FORBIDDEN.

### 20.6 Master activity queue + engine leverage
See [[project-activities-master-queue]]. Triage of ~4,920 instance-equivalents:
- **~240 buildable now** (existing E1+E2+E7)
- **~4,550 engine-blocked** (need E8/E9/E4/E12/E5-E6/E9-sw/E14/E3/E13/E10/E18)
- **~90 asset-blocked** (K.G.A.1 position-words is canonical; needs staged scene art)
- **~40 open-ended** (need pedagogical design before engineering)

Engine leverage (decreasing): **E2 (~600+) >> E7 (~200) > E4 (~120) > E12 (~80) > E5/E6 (~73) > E9 sight-word (~70) > E14 (~50) > E3 (~40) > E13 (~35) > E10 (~25) > E18 (~20).**

**Fill discipline:** batch-by-skill, operator reviews each set live, NOT mass-fill (thin-pages SEO risk + operator-attention-load risk). Theme-expansion held to LAST as small waves. Slug component-generator proposed (not built) — becomes load-bearing at 500+ scale.

### 20.7 Literacy engines + phonics safety pipeline
See [[project-phonics-safety-pipeline]]. 3 engines over a shared word-builder core: **E7** single-letter (EN) · **E8** Syllable Builder (es/it/pt/fr/fi LIVE, 28-word) · **E9** Sound-Chunk Builder (de/nl/sv/da/no LIVE, 28-word de 30). E2 covers letter-recognition / sight-words / initial-sound.

**Safety requirement (operator, non-negotiable):** a syllable/decoding error must be **structurally impossible to publish** — every break confirmed by ≥3 independent sources OR quarantine (source stack: TeX `hyphen` + in-repo rule-syllabifier + NST lexicons + Wiktionary IPA + `vocabulary-phonics.json` syl + per-locale curriculum chunk tables + DA quarantine regex).

**Per-language verdicts (LOCKED, verbatim):**
- **sv** — fully safe, no quarantine
- **no** — safe + ~30-60 kj/sj/skj quarantine (kj+sj distinct in K-1, awareness grade 2)
- **de** — safe + ~80-120 multigraph-onset quarantine (Augst & Dehn chunk table)
- **nl** — safe + ~200-300 multigraph quarantine; thinnest source coverage (Wiktionary 84% > 60% threshold)
- **da** — safe + 35-55% policy-managed-decoration rate; policy DECIDED orthographic syllables K-1 / phonemic-divergence awareness grade 2 (Elbro). The `da-quarantine.js` 5-criterion regex is DECORATION (`policy_managed:true`), NOT hard quarantine — K-1 strict uses the `policy_managed:false` pool (402/794 DA).
- **es/it/pt/fr/fi** — GREEN auto-gate, no concern

**No live per-word human review.** Output `output/approved-words-<locale>.json` (authoring SoT) + `quarantine-report.json`; read-only inputs image-vocabulary.js + vocabulary-phonics.json (NEVER touched). Gate evolution (v1.1 GREEN-locale authoritative-when-agreeing + per-locale rule fixes), live per-locale pool counts, adjacent-syllabifier audit verdicts, and the OPEN ~14 Nordic compound-seam backlog (the GREEN-widening prerequisite) → docs/claude-md/activities-detail.md (+ §A.13.57).

### 20.8 Parked decisions
See [[project-activities-parked]]:
- **K.G.A.1 position words** — asset-blocked (needs staged scene art OR port prepositions-app scene-composition logic). Operator-undecided.
- **"Demonstrate not touch the standard"** rule — early "Decompose 10" activity was REMOVED for failing this (anti-pattern). Before assigning a CC code, verify the activity directly INSTANTIATES the standard, not just touches its topic.
- **CC code assignment discipline** — only assign when activity directly instantiates the standard; flag uncertain, NEVER invent codes.
- **Hint-localization minor bug** — activity strand label (e.g., "Counting & Cardinality") renders in English regardless of page locale. Fold a fix into the next code touch in that area; not a standalone commission.

### 20.9 IMMEDIATE next action
**[STATUS 2026-06 — current head.]** Both E14 recognition fraction activities are LIVE 11/11 (#1 "Equal Halves and Fourths" 1.G.A.3 + #2 "Same Size, Different Shape" 2.G.A.3 non-congruence; EN + 10-locale fan-out on the **E2 choice-board engine**, **0 protected-core lines**, full 11-locale + x-default hreflang; per-locale construction + doctrine §A.13.59, record [[project-e14-fractions-series]]). Also live this period: the **3,065-deck Danish (`da`) catalog wave** ([[project-danish-deck-wave]]). **NEXT: the worksheet-hub initiative** (operator-flagged plan-mode investigation) — do NOT auto-start; await the prompt. Standing backlog: E14 **active-partition #3** (tap-to-partition; needs `fractions-core.js`) + the deferred-by-decision residuals below. **Do NOT auto-resume the E8/E9/E2/E12/E4 queue without an explicit prompt; all remain standing backlog.**

**[ARC CLOSED 2026-06-04] The variety + depth arc is complete — the residual is deferred-by-decision, not pending build.** The per-engine **depth pass** brought every activity pool to its ceiling (E8/E9 syllable decks at **28 words**, de + en at 30; per-engine deck depths + per-locale curation in [[project-activities-live-inventory]]). The **Nordic school-convention arc** (§A.13.57: sv surgical carve-out, da TeX-accepted) and **strand-name localization** (all 11 locales on national-curriculum domains, §20.10) also shipped. Variety surfaces via the §20.2 per-session Fisher–Yates reshuffle.

**Residual = DEFERRED-BY-DECISION (record so it is not mistaken for unfinished build work):**
- **fr mute-e convention review** — French oral syllable-clapping (CP conscience phonologique) does NOT count the final mute-e (`lune`=1, `ba-nane`=2), but the shipped pipeline uses *syllabes écrites* (mute-e counted) across the gate, the live fr deck, and all 11 locales' established treatment. Filed for a deliberate wrong-for-purpose ruling + pipeline-wide scope assessment (parallel to the sv typographic-vs-sound-out finding); switching fr alone de-harmonizes it. NOT folded into a depth task.
- **cross-locale oral-syllable-pedagogy convention audit** (candidate standalone initiative) — the written-vs-oral / typographic-vs-sound-out through-line keeps surfacing (sv resolved via carve-out, fr flagged, da TeX-accepted). **Not every locale's established split convention has been audited against the activity's oral-clapping pedagogy** — this is known, deliberately-deferred territory, not an oversight.
- **Nordic seam root-fix / GREEN-widening** (§A.13.57) — hardening sv's compound-seam handling is the prerequisite to any future GREEN move.
- **optional PDF quality pass** (§17.8.20) — footer-backlink / filename / compression; reviewed + KEPT noindex; not yet commissioned.

**Do not jump ahead. Await the next prompt from PM Claude.**

### 20.10 National-framework localization of the activity layer (2026-05-31)

The non-EN **activity layer** cites each locale's **national curriculum framework NAME** instead of "Common Core" — **name only, no national code**. EN is unchanged ("Common Core <code>"). **Decks stay on Common Core** (separate future commission; do NOT touch deck SEO for this). Rationale: Common Core is US-specific; DE/FR/Nordic/NL/Romance teachers use their own national curricula.

**The CCSS code is RETAINED as the machine/SEO anchor** — only the human-facing framework *name* is localized. The code lives on at JSON-LD `educationalAlignment.targetName`, the `/standards/<code>` hub (a deliberate CCSS-code search surface), the manifest `alignment.code`, and the teacher chip.

**Framework name SoT = two code maps** (lexicon per §A.13.49): `EDUCATIONAL_FRAMEWORK_BY_LOCALE` in `frontend/app/[locale]/activities/[slug]/page.tsx` + `FRAMEWORK_BY_LOCALE` in `frontend/app/[locale]/standards/[code]/page.tsx`. **Tech-debt:** these duplicate the same lexicon — dedupe to one shared const at next touch (read-from-SoT precedence, §10.4).

**Surfaces localized (5):** (1) activity-route JSON-LD `educationalFramework`; (2) activities-landing `pageIntro`/`metaDescription` (`activities/page.tsx LANDING_STRINGS`); (3) body templates `frontend/messages/activity-content/<10 non-EN>.json` (dropped `{code}`); (4) manifest `page_intro` clauses in `mini tools/*-activities.json`; (5) standards-hub `standardsPage`+FAQ in `frontend/messages/<10 non-EN>.json` + standards JSON-LD.

**Why the standards hub had to change too (flight-data bleed):** `NextIntlClientProvider` serializes the *entire* locale message set into every page's RSC flight-data, so the `standardsPage` "Common Core" strings leaked onto activity pages even though they render only on the hub. Localizing the standards namespace cleared BOTH. Future rule: a "framework name" change in messages must sweep the standards namespace, not just activity-content.

**Verification:** `node scripts/audit-activity-pages.js` + per-locale `curl … | grep -c "Common Core"` (expect 0 for the 10 non-EN, >0 for en). Verified live 2026-05-31. Commits `fe15a60b` (route + landing + manifests + 9 body templates) · `f76588ad` (pt body template) · `adb1a976` (standards hub, `[NSR-FLAG]`). **Pending polish (flagged, not blocking):** fr "au Programmes officiels"→"aux programmes officiels", it "al Indicazioni nazionali"→"alle Indicazioni"; Nordic sv/da/no/fi light native NSR.

**Companion — strand/DOMAIN-name localization (2026-06).** Beyond the framework NAME, the per-activity strand/DOMAIN name (the CCSS domain rendered in the teacher chip + JSON-LD `teaches`/`targetDescription` + `whatsInsideStrand` + byStrand prose, e.g. "Counting & Cardinality") is now localized to each locale's **national-curriculum domain name** across **all 11 locales** via `frontend/lib/seo/strand-names.ts` (`STRAND_NAMES` + `localizeStrand`). Commits `f049e150` (byStrand prose + chip for de/fr/nl/sv/da/no/fi) + `87196795` (es/it/pt → national-curriculum domains). Several CCSS strands legitimately **collapse onto one national domain** per locale (es Counting/Operations/Base-Ten → "Sentido numérico"; it → "Numeri"; pt → "Números") — §17.4.3 descriptor pattern. **byStrand / chip / JSON-LD English-strand leak = 0 catalog-wide** (`audit-activity-pages.js` 266/266 pass). The **CCSS code is preserved** as the machine/SEO identifier (JSON-LD `targetName` + the `/standards/<code>` hub). Cross-ref §A.13.54 (strand-names is leak-guard for new activities) + §A.13.56.

---

## 21. Content Publishing SEO Standard (standing doctrine)

**The platform's content is published in waves of the SAME few types** — decks, interactive worksheets, activities, tools. The full SEO treatment for each type is **already automatic by construction** (template-derived, not per-item authored). This section is the standing contract so that "publish these X" implies the entire treatment **without the operator ever re-stating it**.

### 21.0 The standing trigger (also in §10.4)

> When the operator says **publish / add new decks, interactive worksheets, activities, or tools**, the FULL SEO treatment is implied and non-negotiable. **NEVER ask** whether to make it indexable, write alt-text, emit JSON-LD, declare hreflang, author per-locale titles/metadescriptions, or add it to the sitemap. Execute the per-type standard below automatically, then run the per-type verification.

Corollary: the heavy SEO work needs **no per-item authoring**. Per-locale titles, descriptions, and alt-text are **derived** from manifests + shared i18n tables + `image-vocabulary.js`. Employing native-expert linguists per item is **wrong** — it's needed only for a new TYPE or new LOCALE (§21.3).

### 21.1 What is automatic per type (do NOT rebuild — just run it)
Per-type SEO is automatic by construction: **deck/interactive-worksheet** (self-contained `deck.html`; template title/desc + alt-text from `image-vocabulary.js`; `LearningResource`+`ImageObject` JSON-LD; cross-locale hreflang; sitemap shards 0/1), **activity** (SSR `/[locale]/activities/<slug>/`; prose + `LearningResource`+`FAQPage`+`educationalAlignment`; shard 3), **tool** (SSR `/[locale]/tools/<slug>/`; `LearningResource:Manipulative`; shard 3). The hreflang map is a single SoT at `frontend/lib/seo/hreflang.ts` (`HREFLANG_MAP`; pt→pt-BR; x-default→en) — never re-inline. Full per-type table → docs/claude-md/misc-detail.md.
### 21.2 What I run automatically on "publish decks" (the formerly-manual steps)

Decks are the one type with post-publish finalization steps. **`scripts/publish-cli/publish-wave.js` is THE entry point** — it runs all 9 so none is ever forgotten. The flow is one-command even for wordy non-EN waves (fr/it/pt/de/nl/sv/da/no/fi):

0. **Pre-flight** — §A.14.8 manifest theme reconciliation (`rewrite-manifest-theme.js --dry-run --themeless-ok --fail-on-rewrite`). Never auto-mutates. `--themeless-ok` waves legitimately-themeless decks (cryptogram = text-decode, no images → new `skip-themeless` class) through instead of false-halting; `--fail-on-rewrite` HALTs on recoverable theme-emit defects so the operator salvages BEFORE STEP 1 (which rebuilds SEO from `manifest.theme`). `halt-ambiguous` / `halt-seometa-unmatched` / corruption still halt.
1. **Preband** — `preband-staged-descriptions.js` (commit `58e4aaca`). Pre-publish re-band of the staged ZIPs' SEO `<head>`: descriptions into the 120-170 band (wordy locales overflow publish-bulk's 170-char `DESCRIPTION_LENGTH_TOO_LONG` HALT — the app-gen path emits the unbanded placeholder description by design per §17.8.5; banding is the retrofit's job) + `variant_id` title disambiguation (the catalog title engine drops `variant_id`, colliding same-(type,theme,level) siblings; `TITLE_NON_UNIQUE` is a HALT). Preserves `__CANONICAL_URL__`. **Runs for ALL waves** (keeps fresh app output consistent with the republish-seo'd catalog); idempotent; makes a `.preband-backup`. Dry-run = preview (no mutation).
2. **Publish** — `index.js publish-bulk --confirm` (its own dry-run + §15.16 + §17.8.17 HALT gates; native slug, canonical, OG, JSON-LD, title/desc hashes emitted here).
3. **OG images** — `regenerate-og-images.js --locales=<wave>` (two-column composite + XMP, §17.8.19).
4. **Alt-text** — `rewrite-deck-html-alt-text.js --confirm --locales=<wave>` (worksheet `alt` + app `aria-label` + deckend-thumb alts; the 29 apps emit empty body alt — this is the "alt-text SEO commission 2026-05-27" retrofit, never folded into the apps). Idempotent; preserves the hreflang block.
5. **End-links** — `inject-deck-end-topic-links.js --locale=<each wave locale>` (non-rewrite). Backfills the localized end-of-deck "Want more?" topic-links `<aside class="lcs-end-deck">` on any deck missing it so EVERY deck — not just EN — carries per-locale internal links opening that language's pages (§16.5 / §17.8.2). Idempotent (decks that already baked it are skipped). The "Browse all worksheets" link targets `/<locale>/worksheets` (the hub), not the locale root. Runs BEFORE hreflang so the hreflang block stays last in `<head>`.
6. **Embed-hide** — `inject-embed-hide-style.js --locale=<each wave locale>`. Injects a marker-guarded `<style id="lcs-embed-hide">` keyed on `body.lcs-embedded` so the in-deck internal link sections (`.lcs-end-deck` + `.lcs-deckend-suggestions`) do NOT render when the deck loads inside an embed iframe (they stay on the standalone page — SEO links preserved). Idempotent; inserts at the top of `<head>`.
7. **Hreflang** — `populate-and-inject-hreflang.js --confirm --locales=<ALL 11>` (cross-locale siblings span every locale; the orchestrator always passes the full 11-locale set — passing only the wave locale is a no-op).
8. **Audit** — `audit-deck-html.js --locales=<wave>` (invariants, §A.14.9).

Invocation (Hetzner, env loaded):
```
node scripts/publish-cli/publish-wave.js <staging-folder> --locales=<csv> --confirm
```
Without `--confirm` it previews the whole wave (dry-run) and **mutates nothing** — STEP 1 preband runs in preview, so publish-bulk's dry-run runs on un-prebanded ZIPs and any `DESCRIPTION_LENGTH_TOO_LONG` / `TITLE_NON_UNIQUE` it reports is EXPECTED (auto-fixed by preband under `--confirm`). Escape hatches: `--skip-preflight` / `--skip-preband` / `--skip-alt-text` / `--skip-audit` / `--no-db-check`. **Pre-flight on the staging dir is non-recursive — flatten any per-app subfolders first.** Origin: long-locale fold 2026-05-30 (the fr wave exposed the gaps); see [[long-locale-wave-publish-gaps]] memory + §A.14.8.

Activities + tools have **no** post-publish finalization — adding a manifest row / content-file entry is the whole publish. After deploy, run the verifier (§21.4).

### 21.3 Native-expert-linguist trigger (when per-locale authoring IS needed)

Per-locale **content/i18n authoring** (not per-item — the items are template-derived) is required ONLY when introducing:
- a **new content TYPE** (its one-time i18n tables, prose templates, JSON-LD shape, route, sitemap shard wiring), or
- a **new LOCALE** (its slot in every shared table + `tool-content`/`*-activities.json`/taxonomy maps).

In those cases, automatically employ the **§A.13.48 native-expert-ensemble-per-locale discipline** (3-agent native ensemble: linguist + marketing + K-3 educator, plan-mode per locale) and the §A.13.49 curriculum-framework squiggle table. Do **not** invoke this for ordinary content waves of an existing type in existing locales.

### 21.4 Verification standard (run after every publish/deploy)
Deck → `audit-deck-html.js` (auto via publish-wave) + live curl spot-check. Activity → `audit-activity-pages.js` + `audit-activity-mobile.js` (§A.13.55). Tool → `audit-tool-pages.js` (33/33). Mind Cloudflare 5-min TTL (§15.8) before the edge reflects new bytes. Full table → docs/claude-md/misc-detail.md.
### 21.5 Hand-maintained sync points (the only places adding content touches code)
Hreflang map + `LIVE_TOOL_SLUGS` are auto-derived. Remaining hand-maintained: **new theme** → `topics-taxonomy.json` (§16.5.1); **new noun** → `image-vocabulary.js` (operator-approved §10.3); **new tool** → `TOOL_KEYS` + `messages/tool-content/<locale>.json`; **new activity** → a row in `mini-tools/*-activities.json`; **new locale** → §21.3 native-ensemble + every shared table. Detail → docs/claude-md/misc-detail.md.
### 21.6 Worksheet-app SEO chrome

The 29 worksheet generators emit deck.html SEO chrome via the content-locale-direct `_seoT` helper (§A.13.46), never per-app `_t`, so generated decks carry correct per-locale SEO regardless of operator UI language. Any new app port or SEO-emission refactor uses the `_seoT` shape verbatim.

Origin: Content Publishing SEO Standardization arc 2026-05-30 (hreflang SoT + auto-derived LIVE_TOOL_SLUGS + tool-page guardrail + publish-wave orchestrator + this doctrine).

---

## 22. SEO / Landing-Page Program — tier-3 deck landing pages (2026-06; EN ARC COMPLETE — locale fan-out next)

A multi-commission program building **tier-3 deck landing pages** to fix the thin/orphan `deck.html` surface: a crawl graph **hub → landing → asset**. New SSR route **`/[locale]/worksheets/[slug]`** sits between the topic hubs and the nginx-served `deck.html` assets. **Full blow-by-blow record + every ruling = the plan file `C:\Users\rkgen\.claude\plans\commission-to-cc-structured-hollerith.md`** (Phases 1–5 + Fan-out Planning Parts 1–3 + Wave-1 Execution). Memory: [[seo-landing-page-program]].

**STATUS (2026-06-08):** 🏁 **THE EN ARC IS COMPLETE — pilot + Waves 1, 1b, 2, 3, 4, 5, 6, 7, 8 LIVE + verified + CLOSED; 1812 EN landings.** The 8 waves cover two subjects (math + ELA) across four grade bands (Preschool/K/Gr1/Gr2), every CCSS strand + the consolidated readiness class, three alignment shapes, the proven-durable first live-query hub change (the picture-sort de-orphan, Wave 5), and a similarity discipline that held through every coupled slice / grade boundary / natural-floor / constraint-bound-floor case without a gate failure surviving to ship. Per-wave counts, commits, and the blow-by-blow are in the plan file + [[project-seo-landing-page-program]]; the durable doctrine each wave produced is folded into §22.1 below. **Total live EN: 1812.**

**LOCALE FAN-OUT IN PROGRESS — `de` COMPLETE (the FIRST full locale), `es` NEXT.** (2026-06-08.) The de locale fan-out shipped end-to-end this session: **STEPs 1–4, de.json 1779 landings, Math + readiness + literacy, all 3 German bands (Vorschule 1057 / 1.Klasse 548 / 2.Klasse 174).** The per-locale machinery + doctrine (3-band re-grade-by-mechanic axis, the picture-domain→readiness / grapheme-text-domain→CARRIES framework classifier, R3 band-vs-code, R5 per-locale compat authority, the investigation-then-rule discipline, the config-driven `gen-de-readiness` engine, the locale-agnostic de-orphan) is now **proven on a complete locale — see §22.3**. The native ensembles (pedagogue + linguist + B2C) engage per-locale: each locale authors its OWN compat booleans + P1 frames + native keyword research + strand/label localization. Sequence de→**es**→nl→fr→it→pt→sv→da→no/fi-last; **es is the next locale-priority + pacing call** (es brings Romance no-neuter gender, the Spanish onset inventory, es-native keyword research). **Carry-forward (browse-hub, NOT a landing-program task):** `/en/topic/sudoku` 404 (§22.2; confirmed per-axis-key, not systemic — every Wave-6/7/8 type hub is 200; the W8 `/en/topic/food` 404 is a **dropped-axis-key arg artifact** per §16.5.1, NOT a defect).

**TRUE INVENTORY = ≈22,419** generable, valid, correctly-levelable landing coordinates (NOT the 24,494 coordinate count, NOT the 28,562 deck-asset count — the headline figures were never the generable number). Per-locale net level buckets: plan file P3.a.

### 22.1 Locked decisions (do NOT re-litigate; the plan file holds the reasoning)
- **Canonical = option (b):** the landing self-canonicals (Next SSR `generateMetadata`); each `deck.html` repoints its baked `__CANONICAL_URL__` → its landing via string-substitution — **NO nginx change**. PDFs stay `noindex` (§17.8.20). Deck assets leave the sitemap; the ≈22,419 landings enter it.
- **Hub→landing = "landing-existence-conditional repoint" — the UNIVERSAL hub-mutation mechanism for every wave.** `deckLinkFor` points a deck card at `/worksheets/<landing>` IFF a published landing exists for that deck (reverse map `landingSlugForDeck` in `frontend/lib/seo/landing-content.ts`, built from `en.json` `canonicalDeckSlug` + `collapseSiblings`), else keeps `/decks/<slug>/`. This **auto-bounds** the live `/topic/` mutation to exactly the published wave (blast radius = the published set, every wave); **rollback = unpublish a landing (fails closed → card reverts to `/decks/`) or git-revert**. Three `deckLinkFor` sites: `components/catalog/VarietyStrip.tsx` + `app/[locale]/topic/[slug]/page.tsx` + `app/[locale]/topic/[slug]/[secondary]/page.tsx`.
- **The page's grade comes from the MECHANIC, not the DB `age_range` tag** — ledger-level-override applied at **(type,mode)** granularity (treasure-hunt/bingo/prepositions each carry two true bands across modes). **`math-worksheet` is REMOVED from the program** (Gr3-6 algebra, above the K-2 ceiling). **Readiness-class policy:** visual-spatial puzzles with no clean CCSS standard (grid-match, missing-pieces, bingo-image, sudoku, picture-path, shadow-match, treasure-hunt-maze, pattern-parts) **fan out** with NO `educationalAlignment`; `teaches` = an honest non-CCSS readiness strand. Scope guard: a mechanic teaching NOTHING identifiable is a removal candidate, not a readiness landing.
- **theme×mechanic validity = a property table** (`frontend/content/seo-landing/theme-mechanic-compat.json`: `discrete_countable`/`collective_risk`/`physical_size_orderable`/`phonetic_variety` per theme + per-mechanic gate + override whitelist), enforced by the ONE pre-render **`scripts/seo-landing/validity-gate.js`** (blocks `body_parts`+sum, `"a tray of buns"`+count, etc.). Countability gate applies only to the count/sum/size mechanics. **Per-locale booleans are authored WITH each locale's wave** (collective_risk/phonetic_variety are language-dependent — never on EN judgment, §15.1).
- **P1-enrichment / cell-space floor (corrected at the Wave-1b second-calibration — SUPERSEDES the earlier "≥4 / 6–8 skeletons is the floor" framing; the floor is NOT a skeleton count):** **cell space (skeletons × P2 variants) must STRICTLY exceed a class's theme breadth, with a non-periodic / coprime assignment** so no two themes share a (skeleton, P2) cell while empty cells remain. A periodic `i mod N` index clusters collisions the moment cells ≤ themes — the 8×4 = 32 < 50 dead-zone that produced two consecutive at-the-line FAILs in Wave-1b mixed (`flowers~toys` 0.807, then `christmas~things-that-fly` 0.800). `gen-wave1b.js` enforces this with a **coprime-stride bijection + a runtime guard that warns when cells ≤ themes** (mixed shipped at 8×7 = 56 > 50 → 0 forced collisions, max 0.489). Apply to every mode / wave / locale's P1 authoring. **Proven default shape: 8×7 = 56 for ~40–50-theme breadths** (Wave-1b mixed + every Wave-2/Wave-3 mode; strictly exceeds with margin, max ~0.43–0.50). This cannibalization invariant is DISTINCT from the grade ≤N quantity-ceiling check (below). **Known exception — image-number grandfathered-by-gate:** 6×4 = 24 < 50 violates the invariant but PASSES the gate (0 FAIL, max 0.783) via the coprime scatter; held at 6, NOT condemned; its trigger to take the cell-space fix is an *actual* FAIL (≥0.80), never a near-line reading. **Similarity gate** (`scripts/seo-landing/gate.js`, now multi-cluster) = whole-page RAW word-3-gram Jaccard, **FAIL ≥0.80 / WARN 0.65–0.80** — **held program-wide; the gauge is never moved to clear a pair** (fix content + structure, not the threshold); slot-normalization is cross-class template-collision only (≥0.90 = defect). Every landing body ≥200 words.
- **Tiered native review:** T1 (native author+review the template-CLASS prose system) / **T2 = 8 stratified renders per class** / T3 (automated lints+gate). **No machine-translation step anywhere** — every page is native-template + native-data by construction.
- **Per-wave source-read LEDGER-LOCK before authoring ANY type** (never the slug; the B-failure / body_parts pattern). **Interrupt-and-surface on any grade surprise** (a non-K-2 type or a mode-split) — STOP the wave for a ruling. Ledger: `docs/seo-landing/mechanic-ledger-mathK.md` + the Part-2 STEP-A locks (bingo/prepositions/grid-match/missing-pieces).
- **No-targetUrl AlignmentObject — the program-wide standard for every standard-bearing landing (all locales, all waves).** Emit `educationalAlignment` = `{'@type':'AlignmentObject', alignmentType:'educationalSubject', targetName:<CCSS code>, educationalFramework:'Common Core State Standards'}` — **NO `targetUrl`** (corestandards.org standard pages 404; `targetName` is the durable machine anchor). Unifies the landing + activity-page CCSS surfaces. §20.10 holds: CCSS code lives in JSON-LD only, the framework name in prose, the on-page chip reads "Common Core"; strand-only (no-standard) landings keep the dashed "Aligned standard — coming soon" chip. Ratified Wave 2 (`310a1911`), applied Wave 3 (1.OA.C.6 math-puzzle / 1.OA.D.8 subtraction / 1.OA.A.2 code-addition).
- **≤N quantity-ceiling spot-check (REQUIRED at any quantity-defined grade boundary).** theme×mechanic validity is necessary but NOT sufficient where a *generated* quantity (not the mechanic) sets the grade: a numeric-ceiling check is mandatory for such modes. Grade is evaluated **per-coordinate against the actual quantity the child SEES, wherever it lives** — manifest field, `generation.json`, OR the rendered `deck.html` sum-slot (the code-addition legend values + sums are render-time, absent from the manifest → read the baked `"slotType":"sum"…"expected"`). **"Within N" governs operands AND results** (strict 1.OA reading: "24−14" is Gr2 though the result is 10; a results-only reading would launder it — wrong). Grade caps: **K ≤10 · Gr1 ≤20 · Gr2 ≤100 (2.NBT) / ≤20 fluency (2.OA.B.2)**. Instrument = committed `scripts/seo-landing/check-sum-ceiling.js`, a proven 4-shape gate (minuend+result / minuend-only / multi-addend running-sum / rendered deck.html sum-slot; `--source=deck-html`, `--ceiling=N`). Empirical: caught **71 Gr2 coords invisible to the DB tag, the mechanic ledger, AND the similarity gate** (math-puzzle 30 of 42, code-addition 41 of 85) — the doctrine's first deployment paid for itself.
- **Grade-split-family finding.** The same `(type,mode)` can span grades: math-puzzle = 12 Gr1 (all numbers ≤20) + 30 Gr2 (21–25 operands); code-addition = 44 Gr1 + 41 Gr2. Grade is set **per-coordinate by the generated quantities, not by type/mode** — so the **level axis AND the conditional repoint both bound per-coordinate** (proven live in Wave-3's auto-bound test: Gr2 same-type siblings stay `/decks/` while their Gr1 siblings repoint to `/worksheets/`, LEAK=0). Breachers are EXCLUDED + recorded as **Gr2-candidates** (out-of-tree `wave3-mathpuzzle-gr2-breachers.md`, 71 coords with max-sums) — candidates-not-confirmed, each pending the future Gr2 wave's own ledger-lock + ≤100 spot-check + per-coordinate re-grade (some code-addition sums reach 40 — may exceed even Gr2's band). A mechanic resolving OFF the wave's grade (e.g. find-addend → K, not Gr1) is REMOVED from the wave, not force-fit.
- **Per-entry level-wiring standard (debuted Wave 3, regression-proven).** The route emits per-entry level → "Grade N" chip + JSON-LD `educationalLevel`/`typicalAgeRange` from `coordinate.level` (the LEVELS map in `app/[locale]/worksheets/[slug]/page.tsx`), **K-default-safe** (absent/unknown level → "Kindergarten", live K landings unchanged). Standard for every non-K landing, all locales/waves. The shared-route level map is a live-page-touch: **the K-stays-Kindergarten regression (sample one live landing per prior grade on the rendered DOM) is a PERMANENT execution check at any wave that touches the map.**
- **No-clean-standard readiness-class template — PROVEN at multi-mode scale (Wave 5).** Extends the readiness-class policy above. A teaches-only readiness landing carries: NO `educationalAlignment`; a **raw-rendered `l.strand` teaches-label** (NOT wired into `strand-names.ts` for EN — the route renders `l.strand` verbatim; per-locale localization deferred to fan-out, the bingo precedent); the dashed **"Aligned standard — coming soon"** chip; non-math subject (the strand IS the subject signal — confirm not an inherited math/logic tag); level = the ledger-true floor; body targets the readiness search intent. Proven bingo (W4, single 18-theme tail) → **sudoku / picture-sort / odd-one-out / find-objects (W5, 4 types × multi-mode, 332 landings)**. The scope-guard is load-bearing: a mechanic teaching NOTHING identifiable is a REMOVAL candidate, not a readiness landing — the pedagogical agent calls it at the ledger-lock.
- **Readiness-label-family distinctness.** Multiple readiness types may share a label root ("…classification…", "Logical reasoning…") but MUST carry DISTINCT labels when they teach distinct skills — odd-one-out **"Logical reasoning — classification (readiness)"** (exclusion) vs sudoku **"Logical reasoning (readiness)"** (constraint-satisfaction). Distinct labels + distinct skill-intent keep them non-cannibalizing (odd-one-out↔picture-sort 0.108 — the within-readiness-family analog of W4's within-Language-strand check). Collapsing them would blur two genuinely different readiness skills.
- **Chart-count fence.** A readiness mechanic adjacent to a standard-bearer uses a DISTINCT lexicon to stay off the standard's head term: picture-sort **sort / categorize / group** vs chart-count **classify-and-count** → **0.044**, the lowest cross-class number in the program. Reserve "classify / count / tally / chart" for K.MD.B.3 (chart-count); lint count-framing leakage in the readiness generator. This is why picture-sort was ruled READINESS, not K.MD.B.3 — alignment honesty AND non-cannibalization on one decision.
- **Same-CCSS-code, different-mechanic (NEW, Wave 5).** Two coordinates may legitimately claim ONE CCSS code without cannibalizing IFF their mechanic + query intent differ — **matching/letter + find-and-count both RF.K.3.a → 0.101** (match-picture-to-letter vs find-letter-starting-pictures-in-a-scene). The alignment-axis analog of Wave-2's "same-shape, different-operation" 0.46 ceiling (and far lower, the mechanics being more distinct). Non-cannibalization is satisfied on the QUERY axis even when the standard is shared; if the same-code cross-class number were materially high, the copy differentiates harder on mechanic/intent (the standard stays shared).
- **The de-orphan — first live-query hub change; FINAL mechanism + the rendered-grid verify lesson.** picture-sort `-vs-` decks carry a SINGLE combined `X-vs-Y` subjectTag, so the old `subjectTags:{has:axisKey}` matched NEITHER component theme hub. **Final mechanism (SUPERSEDES the originally-ruled raw-SQL `LIKE` element-pattern): pure-Prisma `hasSome` over the EXACT `-vs-` component keys** — `frontend/lib/topic-decks.ts: themeSubjectTagsWhere` returns `{subjectTags:{hasSome:[axisKey, ...vsKeys]}}` where `vsKeys` = published `-vs-` subjectTags whose `split('-vs-')` has axisKey as an exact component. Exact-component split (NOT substring) makes the false-positive `animals`↔`zoo_animals-vs-X` **structurally impossible** (an inherent guarantee, verified 0 false-positives — better than the raw-SQL anchor that merely guarded against it). Composes with the grid's sort/pagination/filter-chips. Applied to BOTH `fetchDecksForAxis` (metadata) AND `fetchDecksForTopicWithFilters` (the rendered grid). **CANONICAL LESSON — verify a live-query change on the RENDERED GRID, not the metadata path:** the v1 commit (`baa89b1f`) patched only `fetchDecksForAxis`; the rendered-DOM verify caught **0 grid results despite the predicate matching 37**; v2 (`04bfcbee`) reached `fetchDecksForTopicWithFilters`. A grep / flight-data pass would have seen the predicate "working" and shipped silently-orphaned hubs. Rollback = revert the 2 de-orphan commits → `{has:axisKey}`, fails-closed, zero data/content impact (content commit untouched). Verifier: `scripts/seo-landing/verify-deorphan.js` (dual-membership + anchor-precision + type-hub-unregressed). **DURABILITY (Wave 6, the first wave shipping after the de-orphan):** proved durable + coexistent under live load — `/en/topic/animals` carries BOTH the W5 picture-sort `-vs-` decks (via `hasSome`-over-exact-keys) AND the new W6 regular-`['animals']`-tag landings, without interference (the `hasSome` includes the bare axisKey, so regular-tag decks surface alongside the `-vs-` pattern); all 4 W6 Spatial type hubs 200 (no sudoku-class 404 — confirms sudoku's 404 is per-axis-key, not a systemic browse-hub class). The first live-query change is proven durable.
- **Multi-mode-of-one-mechanic similarity ceiling (Wave 6).** Modes that are PARAMETER-variations of ONE mechanic (not distinct mechanics) carry inherently higher cross-mode similarity (~0.6–0.7 raw pre-sharpening vs Wave-4/5 distinct-mechanic ~0.10–0.15) — elevation by construction, acceptable. **The ceiling is the closest-cousin pair's natural number as a SIGNAL-LEVEL test — NOT a strict ≤ inequality and NOT the 0.90 defect line:** a meaningful inversion (a structurally-LESS-similar pair scoring materially ABOVE a more-similar one — the prose-coupling tell) MUST be fixed; a noise-level edge (the 0.007 aab↔aabb-vs-aab↔abb case) is accepted. 0.90 is the defect threshold, never the target. Empirical: pattern-train ×5 (within-class 0.51–0.625, cross-mode 0.12–0.24 after sharpening).
- **The boilerplate→mode-true sharpening lever (Wave 6).** When cross-mode similarity is elevated, the fix is replacing shared generic boilerplate framing with **accurate per-mode pedagogy** — the more-accurate copy is also the more-distinct copy; do NOT manufacture artificial divergence. Proven on pattern-train (aabb↔abc 0.719→0.239, aab↔aabb 0.680→0.242: the unit descriptions were already distinct; the shared "foundational-readiness / familiar-X / looking-not-counting" framing was the coupling). **Diagnostic:** if elevated similarity collapses under a boilerplate→mode-true pass it was prose-coupling (fixable); if it resists, the modes are structurally that close and the ceiling is naturally higher.
- **Conditional-ship-on-distinct-query-face (Wave 6).** A coordinate sharing a skill + taxonomy (+ even the same readiness label) with an existing one can still SHIP if it holds a genuinely distinct QUERY FACE — **sameness of skill is not redundancy; sameness of query is.** Test = the gate's cross-class number vs the existing coordinate; mechanism = a lint enforcing face-separation. Proven: pattern-worksheet (generic-printable face) ships alongside pattern-train (themed-unit-ladder) at 0.106 — *more* distinct than pattern-train's own modes are from each other. **Conditional-authoring pattern** — author ready-to-ship → the gate decides ship-or-drop → drop = clean discard (en.json entries not committed) — is the reusable tool for redundancy forks.
- **Shared-label/strand-family non-cannibalization — SETTLED PRINCIPLE (4× proven; supersedes any earlier shared-strand caution).** Coordinates sharing a readiness teaches-label OR a CCSS strand stay non-cannibalizing when their skill-intent differs, landing reliably in the **~0.10–0.12 band**: odd-one-out↔picture-sort 0.108 (readiness-classification family), word-guess↔prepositions 0.097 (Language strand), find-odd↔odd-one-out 0.115/0.118 (the boundary), shadow-match↔find-objects 0.109 (Visual-discrimination family). **Strand/label co-membership is NOT a cannibalization risk; mechanic differentiation carries it.**
- **Preschool grade-band / sub-K level-wiring + universal-readiness-below-K (Wave 7).** Preschool is the program's FIRST below-K level: LEVELS-map entry `'preschool': {chip:'Preschool', schema:'Preschool', age:'3-4'}` (route-narrowed display age, non-overlapping below K's 5-6; ladder **Preschool 3-4 → K 5-6 → Gr1 6-7**). **CCSS begins at K → NO sub-K standards → every Preschool coordinate is readiness-class BY NECESSITY** (teaches-label, no `educationalAlignment`, level Preschool). Head Start ELOF / state pre-K alignment DECLINED (non-uniform across states, no SEO/CCSS-hub anchor, fragments the template). **The three-band regression (K-stays AND Gr1-stays AND Preschool-renders) is the PERMANENT execution check whenever the LEVELS map is touched** — the level axis now extends both directions from K, and each extension must verify non-regressive on the rendered DOM (the below-K analog of W3's K-stays-Kindergarten). Origin: W7 `16fe8a37`.
- **Natural-floor refinement: operation-vs-attribute (Wave 7) — the precise rule; SUPERSEDES the looser W6 "shared-structural-layer" wording.** The natural cross-class floor for a shared-label/related pair is set by shared **OPERATION/mechanic structure, NOT shared attribute.** Calibration: distinct-mechanic shared-label **~0.10–0.12** (the four W4–6 pairs); shared-**attribute**-distinct-operation **~0.13** (findBig/orderAsc — size attribute, compare-vs-order operations — COLLAPSED under the lever); shared-**operation** **~0.177** (grid-match/missing-pieces, complete-by-placing-a-piece — RESISTED; corroborated live + unprompted by more-less↔big-small **0.174**, shared comparison operation). **A shared attribute does NOT imply a higher floor — TEST it, don't assume it.**
- **Constraint-bound natural floor (Wave 8) — refines the natural-floor doctrine.** A deliberately-imposed cross-class constraint can RAISE a within-pair floor ABOVE the unconstrained baseline — and accepting that is the correct trade when the constraint protects the higher-stakes boundary. null↔secret-word floored at **0.230** (vs the Gr1 baseline 0.138) because the **mandatory within-100 vocab fence** (which holds the Gr1-vs-Gr2 boundary at 0.062) forces shared vocabulary into both submodes; chasing 0.14 would strip the fence and regress the boundary — **the forbidden trade**. When two cross-class goals are in tension, the floor reflects the prioritization (a clean cross-grade boundary > a marginally-lower within-pair number). The collapse-vs-resist test still applies (51% collapse confirmed the boilerplate was real), but the plateau is read against the **CONSTRAINED** expectation, not the unconstrained baseline.
- **Gr2 grade-band + the four-band level axis COMPLETE (Wave 8).** `LEVELS['grade-2'] = {chip:'Grade 2', schema:'Grade 2', age:'7-8'}` — the ladder is now complete: **Preschool 3-4 → K 5-6 → Gr1 6-7 → Gr2 7-8** (route-narrowed, non-overlapping, proven non-regressive across EVERY extension from the K-only origin; the four-band regression on the rendered DOM is the permanent LEVELS-touch check). Gr2 is the program's **TOP band** → the **Gr3+ removal ceiling is now terminal** (>100 child-seen quantity = above the K-2 product ceiling = removal/defer, never a landing — the math-worksheet Gr3-6 precedent). Gr2 is **all-standard** (full CCSS Gr2 coverage), unlike Preschool (universal-readiness-by-necessity, no sub-K standards).
- **Grade-saturates-copy (Wave 8) — inverts the naive same-type-risk expectation.** A same-type-**DIFFERENT-grade** boundary fences CLEANER than a same-grade-different-mechanic one, because grade is a MORE pervasive copy axis than mechanic — it saturates the standard, strand, quantity-language, and grade-chip, not just the mechanic description. Proven: math-puzzle Gr2↔Gr1 **0.040**, code-addition Gr2↔Gr1 **0.062**, crossword↔word-guess **0.068** (all predicted ~0.4-0.5, all landed ~0.04-0.07). **Same-type pairs are among the SAFEST when the grade differs** — the opposite of the intuition that same-type = riskiest.
- **Within-grade-coupling vs cross-grade-differentiation (Wave 8) — the two-directional tension.** Grade-distinguishing framing (within-100/two-digit/grade-level language) DIFFERENTIATES across grades but COUPLES within a grade. When coordinates share grade + standard + strand, the grade-framing is shared-by-construction and CANNOT be the within-grade differentiation lever — that must come from **mechanic/reveal-face pedagogy**, with grade-framing present (for accuracy + the cross-grade fence) but NOT load-bearing for within-grade distinctness. Proven: the within-100 fence that cleaned code-addition Gr2↔Gr1 (0.062) coupled null↔secret-word + ↔math-puzzle until reveal-face sharpening (decode vs spell-word vs jigsaw) separated them. (The within-100 generic = the W7 "foundational-readiness boilerplate" analog at Gr2.)
- **Full-corpus re-grade over the breacher-record (Wave 8) — vindicated twice.** A deferred-coordinate record (the Wave-3 71 breachers) is a **point-in-time exclusion artifact, NOT the authoritative set** — re-derive the grade by per-coordinate quantity over the FULL corpus (`check-sum-ceiling.js`: ≤20→Gr1-skip / 21-100→Gr2-author / >100→Gr3-remove) at authoring. Caught the gap BOTH times: math-puzzle **33** (not the recorded 30), code-addition **50** (not 41). The quantity is the truth; the record is a convenience pointer.
- **The collapse-vs-resist test is the natural-floor arbiter (Wave 7).** NEVER accept an elevated cross-class/cross-mode number as a "natural ceiling" without running the boilerplate→mode-true sharpening pass. The collapse **MAGNITUDE** distinguishes fixable coupling from genuine floor: a real coupling collapses hard (pattern-train 41%, grid-match/missing-pieces 41%, big-small 32% — all residual framing); a genuine floor RESISTS with the remaining shared n-grams being **accurate-for-both vocabulary** (only grid-match/missing-pieces' 0.177 has genuinely resisted to date). The pass is mandatory before accept; the magnitude decides; the accept-as-natural-ceiling escape valve applies only when a genuine pass plateaus on accurate vocabulary.

### 22.2 Wave sequence + next-wave runbook
EN waves 1→8 COMPLETE (1812 landings); **locale fan-out in progress** (de COMPLETE 1779; next = es; sequence de→es→nl→fr→it→pt→sv→da→no/fi-last, native ensembles per locale). Per-wave cadence (ledger-lock → lead-slice → coupled-slices → execute+repoint+verify → stop-for-ruling) + the per-wave runbook (cell-space pre-check, ≤N quantity-ceiling spot-check, conditional-repoint auto-bound, rendered-DOM verify via `verify-hub-autobind.js`) + key-files list → the plan file `commission-to-cc-structured-hollerith.md` + docs/claude-md/misc-detail.md. Carry-forward categories (grade-deferred / breadth-non-viable / browse-hub-defect `/en/topic/sudoku` 404 / content-expansion) → plan file.
### 22.3 Locale fan-out — `de` COMPLETE (the first full locale); next = `es`
Per-locale-durable doctrine (3-band re-grade-by-mechanic; the picture-domain→readiness / grapheme-text-domain→CARRIES framework classifier; R3 band-vs-code keeping the EN CCSS code as `targetName`; R5 per-locale compat authority — never cross-applied; investigation-then-rule for held slices; the locale-agnostic de-orphan; config-driven `gen-de-readiness.js`) → [[project-de-landing-fanout-investigation]] + the de plan file `plan-mode-commission-de-enchanted-lagoon.md`. de = 1779 landings (vorschule 1057 / 1-klasse 548 / 2-klasse 174).
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

#### A.7.1 image_themes displayName data-quality logs (es/it Class-2 collisions; multi-locale accent-loss; fr correction)
Backlog of `image_themes` displayName issues — Spanish/Italian Class-2 collisions resolved via §16.5.1 Option-A fallback (`home_bw`/`household_bw` → `Hogar BN`/`Casa BN`; fix = operator-curated rename, then Option A removed), systematic multi-locale accent-loss (pt/it/sv/da/no/fi; slug-level safe since slugify ASCII-folds; sweep `image_themes` UPDATE when accumulated), and the fr Class-2 documentation correction. Full per-entry log + commits → docs/claude-md/misc-detail.md.

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

Operational discipline applied at Phase 4 verification of any commission. Each sub-doctrine below is the terse forward-rule; **full text + empirical anchors (commit hashes, worked examples, before/after counts) live in `docs/claude-md/verification-hygiene.md`** (relocated 2026-06-08 — nothing deleted).

#### A.13.1 Phase 4 zoom-in label-readability discipline
Spot-checks MUST include zoom-in inspection of UI labels in narrow-column contexts (mobile 375px; faceted-sidebar/filter-strip). Status-200 + structural smoke tests verify routing+render, NOT label-readability.

#### A.13.2 Gap-fold-in-same-commit doctrine
Latent bug fixable with ≤10 short strings OR ≤1 component edit at zero strategic cost AND same fold-target → FOLD into arc's commit; else surface as separate [FIX].

#### A.13.3 Refactor-during-already-opened-surface principle
When a [FIX] opens a code surface, audit for adjacent same-shape refactor; ≥3 instances + imminent 4th consumer per §14.3a → fold the refactor.

#### A.13.4 DERIVED vs HARDCODED-NULL emit-site classification
App emit-sites for SEO-bearing manifest fields classify via `EXERCISE_MODE_APP_CLASSIFICATION` in `slug.js`: **DERIVED** (reads operator signal; null legitimate per §17.8.5) vs **HARDCODED-NULL** (literal `null`; defect). §15.16 gate halts HARDCODED-NULL+null; DERIVED+null CLEAN. All 29 apps DERIVED; gate stays as backstop.

#### A.13.5 Shape A canonical authoring pattern + reconciliation gate as structural complement
§15.16 gate is the publish-time backstop; **Shape A** is the canonical authoring-app pattern: at `prepareExerciseImages()` filter `selectedImages` against active theme before pool-construction (off-theme dropped + UI warning), so `theme: themeSelect.value` becomes correct. Per-app scoping varies; off-theme key `<app>.msg.offtheme.dropped` ×11 → promote to `shared.*` at 4th consumer.

#### A.13.6 Spec-vs-shipped-contract validation discipline
When a commission spec classifies a code surface with shipped contracts, validate the spec's rules against the shipped contract empirically BEFORE commit; halt + surface to operator on conflict. Paired with §A.13.8.

#### A.13.7 Per-app first-publish verification cadence
When a publish-cli gate covers N apps, per-app first-publish verification folds into Track-C cadence (the gate IS the verification mechanism), not a separate audit; gate-firing → follow-on `[FIX][AUTHORING]`.

#### A.13.8 Adjudication-reversal discipline
When recon surfaces a cost dimension the original adjudication didn't account for (esp. a cheaper fix path on the dimension the operator pays), recalibrate as a Phase-2 batched review before executing. Paired with §A.13.6.

#### A.13.9 Two-defect pattern recon
When one emit-defect surfaces at a wave boundary, run the §15.16 gate on a sample for every OTHER emit-site class in the same app before declaring fixable; fold both into one Shape-A fix if a second surfaces.

#### A.13.10 Manifest-as-schema-contract discipline
Manifest is the contract between authoring app + publish-cli. Fix defects at the emit-side; do NOT add downstream content-vs-metadata reconciliation when avoidable. §15.16 gate is backstop; salvage scripts (§15.17) are for already-staged waves only.

#### A.13.11 Operator-strategic adjudication batching at recon-completion
Batch multiple operator-strategic adjudications into one consolidated review at recon-completion; do NOT surface mid-stream (N batched ≈ one context-switch; N separate ≈ N).

#### A.13.12 Mechanical-fan-out vs architectural-sweep distinction at 29-app scope
**Mechanical fan-out** = sed-replaceable single-line per app (~30-90 LoC, no per-app reasoning). **Architectural sweep** = 2+ files per app OR shape-level variance (~300-500+ LoC). See also §A.13.15 (3rd category).

#### A.13.13 Fan-out verification-hygiene at mechanical-fan-out execution
**6 grep dimensions:** open-tag, close-tag, JS-string-escaped open, JS-string-escaped close, line-context match, cross-locale spread. Single-dim misses JS-string-literal escape variants.

#### A.13.14 Phase 1 Explore-agent fidelity validation
Explore agents are for breadth-survey; fidelity-critical claims ("X has shape Y at line N?") use direct `Grep`+`Read`. Explore reads excerpts — don't trust it for line-precise claims.

#### A.13.15 Structured-fan-out as 3rd category between mechanical and architectural
Per-app structural diff >1 file BUT identical shape across 29 + same metadata-threading + no per-app conditional logic (~5-step diff per app). Verify per §A.13.16.

#### A.13.16 Verification-hygiene at structured-fan-out execution
6 dimensions: per-app structural-shape match; per-app diff-line consistency (sample 3-5); cross-app naming-pattern; post-deploy curl-spot-check (3 apps × 2 locales); full test-suite pass; per-app metadata-threading audit (extractDeckBundle → renderStandaloneHTML → buildSeoHead → deck.html).

#### A.13.17 Slug-vs-title-shape redundancy as separate doctrine class
Slug-level hygiene is distinct from title-shape. **(a) Shape-pathology** collisions (same locale+shape → identical title-hash) resolve via title-shape adjustment; **(b) Catalog-data-hygiene** collisions (same locale+slug from operator workflow / legacy renames) need an operator-strategic rationalization commission. (μ) CLOSED via `disambiguate-titles-mu.js` (rendered-title grouping + ordinal variant_id).

#### A.13.18 Backfill-rate as commission close-out metric
When a deliverable enforces a uniqueness invariant via a DB-side hash, close-out reports BOTH file-level retrofit rate AND DB-level enforcement rate (silent under-enforcement is worse than visible partial).

#### A.13.19 Capitalization "small word" handling under uniform title-case
Default to **uniform title-case** (every word capitalized; deterministic, locale-independent). AP-style small-word lowercasing is an operator-strategic, locale-dependent refinement (future-arc).

#### A.13.20 Retrofit-rerun decision: per-locale need-vs-no-need classification
Changes affecting retrofit output for SOME locales not others → per-locale rerun classification (document skip-locales explicitly), NOT uniform all-or-nothing.

#### A.13.21 Operator-pre-recommendation substrate verification at theme/category selection
When an operator pre-recommendation involves theme/category/package selection, verify candidates against canonical-state at the planning step before locking scope; surface divergence as a §A.13.6 firing.

#### A.13.22 Audit-doc-vs-canonical-state divergence at commencement-time
Audit docs go stale across commission cycles. At commencement of work derived from an audit doc, re-verify against canonical-state; surface divergence as a §A.13.6 firing. (vs §A.13.21: that's at plan step, this at commencement step.)

#### A.13.23 Empirical-saturation as commission-cycle close-point signal
When commission work consumes finite substrate space, query consumption + availability; below-threshold availability is a natural close-point signal → surface via AskUserQuestion.

#### A.13.24 Double-close-out paired commission CLOSED as multi-pillar trajectory milestone
When two commission cycles close at the same paired moment, the paired-close is itself a structural milestone + natural strategic-input window.

#### A.13.25 Bundle cluster taxonomy sub-pattern emergence at scale
At ~14+ clusters / ~48+ bundles, audit for sub-patterns (**paired-cluster**, **crossover-bundle**); resist premature authoring before scale-emergence.

#### A.13.26 Schema migration timestamp-stratification doctrine
A DB column added via migration → pre-migration rows are NULL by definition (structural, NOT regression). Stratify by `createdAt` vs migration timestamp; pre-migration NULL = retrofit per §15.17 if warranted; post-migration NULL = emit-time regression (Shape A §A.13.5).

#### A.13.27 Trajectory-vs-static-state pricing inspection
When classifying a trajectory change as regression vs natural-progression, inspect numerator AND denominator separately — same numerator + growing denominator yields a declining percentage that LOOKS like regression but is a statistical artifact.

#### A.13.28 Phase 4 production-canonical-path verification at deploy boundary
At production-ship, curl-spot-check 3-5 representative URLs (`curl -I` → 200 + correct content-type; grep content) BEFORE declaring Phase 4 done — catches nginx-config divergence, symlink-swap timing, Cloudflare latency, DB-vs-FS divergence.

#### A.13.29 Ground-truth source-citation discipline for behavior-describing content
Content describing BEHAVIOR of a component you haven't observed MUST cite source code (`// Verified against: <path> lines X-Y` + mode dispatch + kid interaction + audit date). Empty-citation = defect. Re-verify on source change. (Family with §A.13.30 + §A.13.31.)

#### A.13.30 Audience-perspective discipline for user-facing content
User-facing content is from the reader's perspective (what they get + do) — NEVER internal taxonomy / implementation primitives / architecture / aesthetic-meta. **Third-party brand stamps forbidden in private external communications** (parent letters, take-home); classroom-internal materials MAY carry §14.3 attribution.

#### A.13.31 Per-instance content-awareness discipline
A commission naming a specific package/deck/topic/lesson-plan/material → Phase 1 MUST read the canonical artifact (YAML/manifest/data file) BEFORE Phase 2; no inference from the name. Applies to operator IDE-open signals. (Family with §A.13.29 + §A.13.30.)

#### A.13.32 Canonical-artifact-grounding-at-composition-time discipline
Ground composition against canonical SoT at the spec-authoring step — NOT prior-session close-outs, carried-forward prompts, or training-fluency. Six sub-doctrines (slug-grounding, generator-inventory completeness, per-package×per-generator matrix scope, generator-executability, strand-state baseline, drafting-from-prior-close-out) — detail in companion.

#### A.13.33 Phase 0 explicit-methodology reporting at substrate audit
Every Phase-0 count states its (1) denominator, (2) locale scope, (3) status filter, (4) temporal anchor, (5) parent-class vs sub-track layer.

#### A.13.34 Parallel-strand-framing pattern for cross-strand content overlap
When an existing package overlaps a canonical fill at the observable-activity layer, default to surfacing the parallel-framing distinction in `compositionalRationale` (both ship; naming the distinction is structural, not optional). Anti-pattern: defer-or-skip on observable-activity overlap.

#### A.13.34.1 FULL-OVERRIDE threshold-class enumeration
Locale variants diverge from en at one of three classes — **Materials-level** (linguistic surface only), **Pedagogy-level** (locale-specific pedagogy; reframe with `compositionalRationale.<locale>` per §A.13.34.2), **No-equivalent** (substrate-fill OR pkg-removal). Classify each variant at Phase 1 before locking format.

#### A.13.34.2 Locale-canonical-curriculum-divergence sub-class
Pedagogy-level reframing MUST anchor to the locale's canonical-curriculum SoT (CCSS for en; BNCC for pt-BR), NOT en CCSS; `compositionalRationale.<locale>` cites the locale reference (structural — absent it reads as ad-hoc deviation).

#### A.13.35 Canonical generator-mode-verification at extension boundaries
Extending/referencing a generator's modes → verify against the canonical mode enumeration at source AND maintain the versioned mode list in the companion (`manipulative-cut-outs` = `single-repeat`, `variety` per `manipulative-cut-outs-package-loader.ts:30`). Generalizes to any mode-parameter generator; stale table → §A.13.6 firing.

#### A.13.36 CC↔assistant cooperation cadence within commission
Per-package pedagogical-judgment + class-conditional adjudication resolves between CC + assistant within a commission (per-session, not transitive), NOT operator routing. Operator routing reserved for phase-boundary ratification, strategic-direction adjudication, explicit-delegation moments (§3.4).

#### A.13.37 Class-conditional disposition pattern as canonical materials composition gate
Materials composition is dictated by package class per the fixed canonical table (Numeracy 7 / Literacy 8 / Vocabulary 8 / World-knowledge 7 / SEL case-by-case / Logic 8) — table in companion. Table IS the gate; deviations need explicit `compositionalRationale` + assistant ratification at Phase 1 close.

#### A.13.38 Decoupled-ship pattern across arc-close empirical reliability
Ship in decoupled cadence: P1 package authoring at filesystem level (recoverable across crash) → single arc-close commit → P2 close-out cycle (PDFs/CDN/cross-bundle/scope-doc). Three-tier commit discipline: (a) arc-close in-tree, (b) P2 close-out in-tree, (c) working-memory out-of-tree (§A.8.3, NOT committed). Tier-confusion is the anti-pattern.

#### A.13.39 Fold-cycle doctrine-content empirical-grounding at Round 1 + Round 2 review
[DOCS] fold Round 2 adds a 6th dimension: empirical-content verification — Read the canonical SoT directly and compare every doctrine-table cell / mode-list / artifact-path / cited line range against source; flag divergence as §A.13.6 BEFORE the surgical-fixes commit.

#### A.13.40 Operational-tooling canonical-patterns
Recurring toolchain failure modes: (1) Puppeteer `browser.close()` + chained `| tail -N` pipes hang → single-generator-per-job; (2) Windows `pscp` needs `-l user host:path` (POSIX `user@host:path` silently fails); (3) `tar -C` extract path ordering preserves entry-relative paths; (4) curl-verification at the 6-dimension grep pattern (§A.13.13 + §A.13.28).

#### A.13.41 Authoring-drift recognition discipline — class (a)/(b)/(c) framework
Classify canonical-vs-shipped divergence BEFORE remediating: **(a) Authoring drift** (retrofit shipped), **(b) Doctrine drift** (amend doctrine + audit prior commissions), **(c) Parallel framing** (ratify both with `compositionalRationale`). Test (c) first (§A.13.34), (b) second (§A.13.39), default (a). Anti-pattern: reflexive (b) when actually (a).

#### A.13.42 Cache-buster discipline on mini-tools .js changes
Every change to a `*-core.js` / `*-activity.js` in `mini tools/` MUST bump the `?v=N` query in the wrapper's `<script src>` (same commit). Without it, cached/CDN/service-worker copies serve stale JS.

#### A.13.43 Programmatic textContent assertions for chrome i18n
Shared-chrome i18n changes MUST include programmatic `textContent` assertions via Puppeteer `$eval` with `setCacheEnabled(false)` — not just a screenshot eyeball (fresh Chromium can render correctly while user cache is broken). Cross-ref §A.13.42.

#### A.13.44 Pipeline regression-snapshot discipline
For ANY change to `scripts/v2-data/verify-syllable-boundaries/` (gate.js, cli.js, rule-syllabifiers/*.js), snapshot `output/approved-words-<locale>.json` + `quarantine-report.json` to `.before-<arc>.json` siblings BEFORE re-running — the diff is the only auditable evidence the target class shifted and nothing else regressed. Snapshots out-of-tree (§A.8.3).

#### A.13.45 Pre-flight hand-trace encoding fidelity
When hand-tracing rule-syllabifier behavior, keep accented chars as canonical Unicode codepoints (`ã` = U+00E3, in `NASAL_VOWELS`) via direct Read — not mental-model reasoning that strips diacritics. Hand-traces predict; empirical runs validate (§A.13.14).

#### A.13.46 Content-locale-direct SEO chrome lookup (anti-`_t()`-locale-binding-drift)
App-side SEO chrome emission (`seoMeta.*` per §17.8.4) MUST use a content-locale-direct `_seoT` lookup against `window.translations` (bind `loc` to content locale, return `null` on miss), NOT per-app `t()` — which has two bug classes (returns key-string on miss; uses `uiLocale` not content locale). `_seoT` helper shape + the 4-app failure set in companion; cross-refs §17.8.14, §17.8.17 invariant 6, §A.14.8 step 2b.

#### A.13.47 Activity-page CSS pitfalls (compiled from v7.1→v7.13 polish session)
10 hard-won rules + operator-collaboration rules for every `/[locale]/activities/[slug]/` + `mini tools/*-activity.html` edit (iframe `vh`/`vmin` is iframe-relative → use `vw`; `flex` defaults to row; grid `max-width` falls back to left → pair with `place-self:center`; `repeat(N,1fr)` makes huge gaps → `repeat(N,auto)+justify-content:center`; `width` ≠ `max-width`; engine-injected CSS wins ties → `!important`; card `overflow:hidden`+fixed-height clips → `height:auto`; tablet 768 is its own breakpoint; iframe `?v=N` required; tests-pass ≠ visual-approval). Full rules + empirical in companion; cross-ref §A.13.55.

#### A.13.48 11-locale i18n recreation discipline via 3-agent native ensemble
**Recreating** (not translating) a content namespace across all 11 locales = plan-mode-PER-locale + a 3-agent native ensemble per locale (linguist + B2C-marketing + K-3-educator) → synthesize → AskUserQuestion on high-impact forks → write into plan file → ExitPlanMode per locale → apply → commit (`[NSR-FLAG]` for sv/da/no/fi per §17.5.1) → deploy → verify. **Hybrid OK for ≤10-string namespaces; ensemble is the rule for ≥50 substantive strings.** NOT for typo/CSS/refactor.

#### A.13.49 Locale-credible curriculum-framework squiggle taxonomy
Per-locale credible "aligned-to" framework targets for any K-3 credibility surface (en Common Core / de Lehrplan / fr programmes officiels / es los planes de estudio / pt BNCC / it Indicazioni nazionali / nl SLO Kerndoelen / sv Lgr22 / da Fælles Mål / no LK20 / fi OPS 2014). **Use the table directly; do NOT re-derive via fresh ensemble.** Full table + sources + collocations in companion. Pair with §A.13.48.

#### A.13.50 Client-component dropdown SSR verification gotcha
Client-rendered dropdown items gated by `{isOpen && (...)}` do NOT appear in curl SSR HTML (false-negative trap). Verify via source-diff + build-success, OR Puppeteer click + `.textContent` (§A.13.43), OR operator eyeball. `CategoryNav.tsx` is the canonical case. The 7th dimension of §A.13.13.

#### A.13.51 Homepage-v3 hardcoded card1 tile pattern
`PillarActivities.tsx` hardcodes card1 tiles as `['gat','to']` (Italian "gatto"); per-locale `card1SubjectAlt` is alt-text-only and does NOT change the visible tiles. Card3 IS per-locale (`card3ByLocale`); card1 per-locale recreation is deferred (operator-strategic). The `card3ByLocale` map is the precedent if card1 is localized.

#### A.13.52 Rule-syllabifier WORD_BLACKLIST — R abstains, never overrides T
Per the locked safety invariant (a wrong split NEVER reaches an activity; quarantine beats publishing), rule-syllabifier R is an additional agreeing source, never authoritative. When R's principled K-1 convention conflicts with TeX for a NATIVE word, R RETURNS NULL (a `WORD_BLACKLIST` early-return) so the word recovers via T+N+S — "R abstains," never "R overrides." NOT for loanwords. Cross-ref §20.7, [[project-phonics-safety-pipeline]], `gate.js:226-238`.

#### A.13.53 Cognate-aware locale-leakage verify discipline at sequential per-locale fan-outs
For ONE activity shipped as N sequential per-locale commissions, apply from commission 1: single-row-multi-locale manifest (NEVER per-locale rows); per-locale Puppeteer verify with `FORBIDDEN_SUBSTR` of OTHER locales' **full phrases (never bare roots** — substring traps like `blir`⊂`bliver`, `Tryk`⊂`Trykk`); cognate-drop calibration when roots are shared; pre-commit gate asserting priors byte-untouched; PVC-locked cardinal tables (no PVC import); document NEXT locale's needed cognate-drops at close. Distinct from §A.13.48. Cross-ref [[feedback-cognate-aware-verify-discipline]].

#### A.13.54 Activity-layer i18n fan-out — gender-safe prompt anchoring + per-locale definiteness + 0-line engine bar
Building a new distinct-skill activity + 11-locale fan-out touches ONLY the activity layer (wrapper `task_template`+`<style>`, `*-activities.json` row, `activity-content/<locale>.json`, `strand-names.ts`, `ACTIVITY_WRAPPER_VERSION`) — the cores + `lcs-shell.*` + Direction-A CSS stay byte-identical (`git diff --name-only` = 0 is the regression proof). **Gender-safe prompt anchoring**: anchor agreement to a FIXED noun (fr/es/it/pt feminine *image*; nl neuter; sv common; de neuter substantivized; fi partitive). **Per-locale definiteness is a trap** (DA single vs NO/SV double) — confirm with a native expert. Strand localization is the leak-guard. Cross-ref [[feedback-activity-i18n-fanout-gender-anchor]].

#### A.13.55 Mobile-layout audit is mandatory for every activity ship
Activities render in an iframe `scrolling="no"` + card `overflow-x:hidden`, so any over-wide content is clipped. **Gate = `scripts/audit-activity-mobile.js`** (widths 280-768, empty+filled; hard-fail on overflow/clip/off-screen-control/sibling-overlap/console-error). MANDATORY before shipping any new/changed activity: 0 hard fails at every width + eyeball screenshots + bump cache-busters (§A.13.42) + edit source under `mini tools/` + re-run against LIVE. Full gate spec + deploy steps in companion; cross-refs §A.13.47, §20.4, §21.4.

#### A.13.56 Activity i18n fan-out — 3-agent native ensemble + the fixed-token-apposition rule
Extends §A.13.48/§A.13.54. A fixed-nominative i18n token (e.g. `{strand}`) used as an inline apposition is **locale-dependent grammar** — clean in Germanic/Romance but ungrammatical in case-heavy Finnish (drop the token, write the inflected form literally; only the native linguist catches it). Per-locale 3-agent ensemble, ship-on-ensemble-clear (AskUserQuestion only on genuine forks), strict one-at-a-time, use `general-purpose` agents NOT `Explore`. 0-core-line patterns (flag-guarded `render()` override; per-category prompt-key dispatch; `prose[id]` full-StrandTemplate override) in companion.

#### A.13.57 Syllabifier reviewer-dispute triage vs the multi-source gate
A reviewer dispute is a **gate-viable rule fix** ONLY when (a) the gate's other sources already agree with the reviewer AND (b) the change is count-preserving. If TeX backs the current split it's USUALLY convention-not-defect → leave it (flipping the rule makes rule≠TeX → quarantine). If the dispute needs a syllable-COUNT change, defer to an operator-approved `vocabulary-phonics.json` edit (§10.3). Never override the multi-source gate for a convention preference. **EXCEPTION — Nordic K-literacy sound-out carve-out**: for a sound-out product TeX is wrong-for-purpose, so the school split wins via SURGICAL pattern-matched rule-authority within the strict gate (`isRegisteredSchoolDivergence` + per-locale `SCHOOL_DIVERGENCE`) — **NOT GREEN** (full GREEN rejected: it trusts the rule wholesale and would auto-publish wrong seam splits). sv pilot carve-out, no = empty divergence set (already school-correct), da = TeX-accepted (no `da.js`). **Rule-file git-tracking flag: any commit touching a rule-syllabifier MUST `git add` it** (`de.js`/`nl.js` untracked; `da.js` absent). Full carve-out spec, registered patterns, seam-recovery, and the oral-vs-written through-line in companion; cross-refs §A.13.44, §A.13.52, §20.7.

#### A.13.58 Catalog-wide / cross-locale data-quality fixes: the layered-gate stack + per-locale gender authority
For any catalog-wide / cross-locale fix to a canonical multi-locale data file (`image-vocabulary.js` is the type case), agent/audit output is a BASELINE not a complete list — run the gate stack in order, each layer catches what the prior cannot: (1) same-head-noun consistency sweep, (2) dictionary-plural re-verify (incl. already-approved), (3) cross-locale probe, (4) exhaustive native confirm of the bounded set (never a hand-picked subset). **Per-locale gender authority — NEVER cross-apply a code** (sv/da `t`=neuter `n`=common; no `n`=neuter `m`=common; de `m/f/n`; nl `d`=common `h`=neuter); resolve every entry against its own locale (`lås` common in da/no but neuter in sv). Mechanics + DE+NL extensions + arc status in companion; cross-ref [[project-de-nl-gender-audit-complete]].

#### A.13.59 Recognition-standard activity + two-sentence anchor+comparison per-locale fan-out
A multi-clause CC standard can be honestly claimed via its RECOGNITION clause on a 0-core engine (child recognizes, never performs the active verb; explicit guardrail; defer the active-verb facet to a new core). The two-sentence anchor+comparison construction has a per-locale grammar-trap taxonomy (also-adverb placement, relativizer, definiteness, elision, preposition, gender/agreement, V2-vs-verb-final) — validate each locale with a native ensemble. §20.10 framework-name + content-vs-discovery split applied per-locale; multi-sibling full-phrase cognate clearance (Scandinavian). Verify: `audit-activity-mobile.js` 8/8 + hreflang chain 12 + 0-protected-core git diff + §20.10 leak grep. Cross-ref [[project-e14-fractions-series]].
### A.14 Scaling Arc audit doctrine

`[CHORE][AUDIT]` commissions measure publish-cli's path against scale targets without production change. Terse rules below; **full empirical detail, script descriptions, and the pre-publish-wave checklist's history live in `docs/claude-md/scaling-audit.md`.**

#### A.14.1 Scale-ceiling order
publish-cli's ceilings under growth, in order: (1) time-death tolerance ~10K decks (≈59ms/deck → 10 min/batch); (2) within-batch slug-collision rate ~5-10K; (3) Sharp+chown overhead ~30-55K (CPU-bound); (4) stale-staging-dir lockout (any scale). Engineer in order: chunked batches > pre-collision-check > `fchown` > auto-cleanup. No memory/disk ceiling within 55K/250K.

#### A.14.2 Defer-trigger heuristic for performance commissions
Each commission has an explicit empirical trigger; **default-defer** rather than engineer-now (checkpoint/resume at 5K+/batch or first mid-batch death; collision pre-check at 5K+; `fchown` at 30K+; stale-dir cleanup after first lockout).

#### A.14.3 Sequential publish is a feature
The sequential await loop is intentional — concurrency would race within-batch slug-collision detection + `create.deck`. To scale, **chunk via `--staging-dir`** (race-safe), do NOT parallelize.

#### A.14.4 publish-cli non-idempotent retry posture
Re-running a partial bulk-publish needs staging-dir hygiene; NOT safe to retry blind (M completed → re-INSERT hits unique-constraint). Recovery: move the M completed ZIPs out of staging, re-run against N-M.

#### A.14.5 Asset-tree audit-only `[CHORE][AUDIT]` commission shape
Read-only: audit-report deliverable (`docs/<arc>-audit-<utc>.md`) + Phase-3 operator-strategic questions; no DB writes, no FS modification, no `deploy.sh`. Phases: inventory → empirical recon → findings → doctrine carry-forward.

#### A.14.6 Backup-coverage audit class
Backup gaps surface as **URGENT** (catastrophic FS loss is unrecoverable; gap is cheap to close). Verify backup OR file `[FIX][OPS]` for any asset-tree at `/var/www/lcs-media/<dir>/`. Off-host backup deferred trigger: ~10 GB OR ~6-7K decks.

#### A.14.7 Scale-projection methodology extension
Measure BOTH layers: **filesystem-level** (disk bytes + inode count per deck × target population) and **publish-cli timing** (per-deck wall-clock × batch size). Flag non-linear factors (DB index bloat, ext4 dir_index thresholds).

#### A.14.8 Pre-publish-wave audit doctrine
Three defect classes recur on operator-staged ZIPs. **Run this 5-step checklist BEFORE `publish-bulk --confirm`** (largely automated now by `publish-wave.js` §21.2, but verify):
1. **theme-emit audit** — sample 1 ZIP/app; `manifest.theme` non-null when operator picked a theme; else Shape A (§A.13.5) or salvage (§15.17).
2. **seoMeta audit (source app HTML)** — `extractDeckBundle()` populates `bundle.seoMeta.themeName` via `LCSCatalogExport.deriveThemeName`.
2b. **bundle-vs-current-app reconciliation (operator ZIP)** — sample deck.html for `seoMeta` populated; absent/null on a themed deck = operator bundle predates the seoMeta fix (hard-refresh + regenerate, or `rewrite-deck-html-title.js` salvage). `_seoT` (§A.13.46) removes this emit-defect class going forward.
3. **canonical-host check** — `substitute.js CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com'` (www; apex breaks embed auto-resize per §A.10); retrofit via `rewrite-canonical-host.js`.
4. **deckend-suggestions strip presence** — sample deck.html for `lcs-deckend-suggestions` (≥3 hits); 0-2 = stale `catalog-export.js`; recover via `inject-deck-end-strip.js --rewrite`.
5. **post-publish spot-check** — curl a sample deck/app: title includes theme word, `var url=` is www-form, `lcs-deckend-tile` ≥1, embed auto-resize works.

#### A.14.9 SEO-100pct audit infrastructure (canonical reference)
Reusable pair under `scripts/publish-cli/`: **`audit-published-baseline.js`** (DB enumeration of published decks; pre/post-migration NULL-hash stratification) + **`audit-deck-html.js`** (per-deck FS audit of 10 SEO invariants — title/desc uniqueness, canonical pattern, ≥14 OG tags, ≥3 inbound links, locale-residue, single-h1, theme-keyword-in-title, deckend strip, www canonical-host). Invoke these; do NOT re-author DB/FS-walking logic. Invariant list + invocation in companion.

#### A.14.10 Image-SEO retrofit infrastructure (SEO-thumbnail commission)
`og-image-text.js` (SVG-text, DejaVu Sans) + `og-image-xmp.js` (XMP packet) + `regenerate-og-images.js` (walks all decks; two-column composite + XMP; ~100ms/deck). Custom sitemap routes at `frontend/app/sitemap/{0,1}.xml/route.ts` emit `<image:image>`. For future image-SEO: extend the text/XMP builders + re-run the regenerator; do NOT touch the Sharp pipeline.

#### A.14.11 Deploy-window stale-chunk failure mode (login/interactive break) + two-layer fix
Frequent redeploys churn Next `_next/static` hashes; nginx caching a transient deploy-window 404 → signin-page JS 404s → "can't log in" (the login API itself succeeds). Two-layer fix (both creds-free): (1) **nginx** `/_next/static` returns `no-store` on 404 (`proxy_intercept_errors on` + `@next_static_miss`; NEVER leave a `.bak` in `sites-enabled/`); (2) **deploy.sh** retains recent builds' chunks in `.next-static-archive/<BUILD_ID>/` (a SIBLING of `.next/` — `cleanDistDir` wipes anything inside `.next/`), merged with `cp -rn`, pruned to KEEP=5, with a WARN-only post-deploy signin/static curl. Full nginx block + retention script + `set -e` guards in companion.
*End of CLAUDE.md.*
