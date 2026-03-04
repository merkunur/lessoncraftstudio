# REFERENCE.md — LessonCraftStudio Complete Page Strategy Blueprint

**Purpose:** Single source of truth for creating ~2,134 pages across 6 page types, each with 3,000+ words, in 11 languages. Any Claude Code session can pick up and execute independently.

> **CRITICAL — FREE TRIAL MESSAGING (applies to ALL 2,134 pages):**
> Every page must prominently communicate that all 33 apps are **free to try with full features** — no signup, no credit card, no feature restrictions. The ONLY difference between free and paid is a **watermark on downloaded files**. This is our #1 trust builder and conversion driver. Additionally, every FAQ section must include a **no-refund policy** FAQ that points visitors to the free trial: "Try before you buy."

---

## TABLE OF CONTENTS

| # | Section | Description |
|---|---------|-------------|
| 1 | [Rules & Mandates](#1-rules--mandates) | ALL rules consolidated: stop rule, fabrication ban, feature verification, tier accuracy, performance, content principles, SEO keywords, visual integration, localization, conversion voice, SEO perfection checklist, free trial & refund policy |
| 2 | [Business & Product Context](#2-business--product-context) | 6 categories, 2 tiers, language sensitivity classification, language importance by category |
| 3 | [Page Type Overview](#3-page-type-overview) | Summary table of all 6 page types with counts, URL patterns, priorities |
| 4 | [Page Type 1: App Detail Pages](#4-page-type-1-app-detail-pages) | 33 apps x 11 locales = 363 pages — transform existing thin pages |
| 5 | [Page Type 2: Free Tool Landing Pages](#5-page-type-2-free-tool-landing-pages) | 33 tools x 11 locales = 363 pages — SEO magnets with embedded free app |
| 6 | [Page Type 3: Bundle Sales Pages](#6-page-type-3-bundle-sales-pages) | 6 bundles x 11 locales = 66 pages — category bundle sales |
| 7 | [Page Type 4: Business Cornerstone Guides](#7-page-type-4-business-cornerstone-guides) | 12 guides x 11 locales = 132 pages — pillar authority content |
| 8 | [Page Type 5: "Create X" Guides](#8-page-type-5-create-x-guides) | 65 guides x 11 locales = 715 pages — mid-funnel product creation content |
| 9 | [Page Type 6: Niche/Theme Idea Pages](#9-page-type-6-nichetheme-idea-pages) | 45 pages x 11 locales = 495 pages — bottom-of-funnel niche content |
| 10 | [URL & Slug Strategy](#10-url--slug-strategy) | Localized slugs, config files, middleware redirects, translation rules, fallback behavior |
| 11 | [Reference Tables](#11-reference-tables) | App feature matrix, YouTube IDs, visual asset paths, marketplace references |
| 12 | [Key Files & Architecture](#12-key-files--architecture) | Existing files, files to create, live routes, 410 routes, config files |
| 13 | [Implementation Phases](#13-implementation-phases) | Phase 0-17 task lists with part naming convention |
| 14 | [Verification Strategy](#14-verification-strategy) | Per-file, per-build, per-deploy checks |
| 15 | [Progress Tracking](#15-progress-tracking) | Pointer to PROGRESS.md |

---

## 1. RULES & MANDATES

Everything in this section is mandatory. A session that reads Section 1 has ALL rules — no additional rules are introduced in later sections.

### 1.1 Mandatory Stop Rule

**DON'T PROCEED TO THE NEXT PART WITHOUT ASKING FOR PERMISSION!**

- NEVER start the next part without an explicit "YES" from the user
- ALWAYS finish the current part completely, then ASK: "Part X is complete. Do you want me to start Part X+1?"
- WAIT for the user to say YES before touching anything
- ONE PART AT A TIME — use 100% of your capacity on each part
- Parts exist to overcome context limits — each part deserves full focus
- DO NOT mention, tease, or preview the next part until the current part is FULLY DONE
- If you catch yourself starting a new part without permission: STOP IMMEDIATELY

**This rule applies to ALL phases, ALL page types, ALL locales. No exceptions.**

### 1.2 Zero Fabrication

- **NEVER** write fake testimonials, fake reviews, or fake social proof
- **NEVER** fabricate statistics, revenue claims, or download numbers
- **NEVER** invent user quotes, customer names, or success stories
- **NEVER** assume or guess app capabilities — ALWAYS verify by reading the HTML source in REFERENCE APPS/
- **NEVER** claim specific income results (e.g., "earn $2K/month") without real, verifiable data
- If you don't know a fact, say so or look it up — never make it up
- This applies to ALL content: sales pages, guides, landing pages, dashboards, emails

### 1.3 Verify App Features Before Writing

- Before writing ANY content about an app, READ its HTML file in `REFERENCE APPS/`
- Each app has unique features — do not generalize or copy from one app to another
- The app analysis tables in Section 11 are a starting point — always verify against the actual source

### 1.4 Two-Tier Feature Accuracy

When mentioning features, ALWAYS be precise about which tier includes what:

| Feature | Commercial Pack | Full Access Pack |
|---------|----------------|-----------------|
| Image themes | 10 themes (colorful or B&W — see Section 2.2) | 100+ themes (all) |
| Languages (for language-sensitive apps) | English only | All 11 languages |
| Languages (for visual-only apps) | All 11 (UI only) | All 11 (UI only) |
| Image count | ~300 images | 3,000+ images |
| Canvas editing | Yes | Yes |
| PDF export (300 DPI) | Yes | Yes |
| Answer keys | Yes | Yes |
| Commercial license | Yes | Yes |

**CRITICAL**: For visual-only apps (see Section 2.3), language doesn't affect the worksheet content — it only changes the UI labels. Don't advertise "11 languages" as a major feature for these apps.

**CRITICAL**: For language-sensitive apps, the language changes the ACTUAL WORKSHEET CONTENT (words in puzzles, labels on images, etc.). This is a genuine, high-value feature for these apps.

### 1.5 Performance Mandate

**Target:** 90+ on Google PageSpeed Insights (mobile AND desktop). Design must NEVER slow down the page.

**YouTube Videos — Facade Pattern ONLY:**

All YouTube embeds MUST use the click-to-play facade pattern (proven implementation: `frontend/app/[locale]/get/[product]/SalesPageClient.tsx` lines 183-230):

1. Render a static thumbnail: `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg` via Next.js `<Image>`
2. Overlay a CSS play button (no JS, no external SVG)
3. On click: `useState` flips to `true` then render `<iframe>` with `src="https://www.youtube-nocookie.com/embed/{VIDEO_ID}?autoplay=1&rel=0"`
4. **NEVER** embed a raw `<iframe>` in initial HTML — it loads ~1 MB of YouTube JS on every page load

**Every page in the system — all 2,134 — MUST include at least one YouTube video tutorial using the facade pattern. No exceptions.** See Section 11.4 for video IDs.

**Video usage by page type:**
- **Page Type 1 (App Detail Pages):** Embed in hero section or "How It Works" — use `VideoSection` facade component. Each app uses its own video.
- **Page Type 2 (Free Tool Landing Pages):** Embed in tutorial/demo section. Each tool uses its corresponding app's video.
- **Page Type 3 (Bundle Sales Pages):** Feature the most representative app's video prominently, reference others in feature showcases.
- **Page Type 4 (Cornerstone Guides):** Embed the most relevant app's video to demonstrate the concept being discussed.
- **Page Type 5 ("Create X" Guides):** Embed the specific app's video that the guide teaches about.
- **Page Type 6 (Niche/Theme Idea Pages):** Embed the video of the app that best demonstrates that niche.

**Embed pattern:** Always use the facade from `SalesPageClient.tsx` (see above). Never raw `<iframe>`.

**Images:**
- Always use Next.js `<Image>` with explicit `width`/`height` and `loading="lazy"`
- Above-the-fold hero images: `priority={true}` (skip lazy)
- Use WebP/AVIF via Next.js automatic optimization

**Animations:**
- CSS `@keyframes` ONLY — never JS-driven animation libraries
- framer-motion is **banned** (already removed; causes invisible SSR content with `initial={{ opacity: 0 }}`)
- No intersection-observer-triggered JS animations on scroll

**Fonts:**
- `next/font` with `display: 'swap'` — no external font stylesheet requests

**Third-Party Scripts:**
- Load with `next/script strategy="lazyOnload"` — never in `<head>`
- No external analytics/tracking unless explicitly requested

### 1.6 Content Architecture Principles

**3,000+ Words Per Page:** Every page must exceed 3,000 rendered words. The content structure varies by page type but always includes: extended description, step-by-step content, features/benefits, business use cases, audience segments, FAQ section.

**One Language at a Time:** Never mix languages in a single content creation session. Complete all content for one language before starting the next. English always first.

**Session Independence:** Each session receives clear instructions from REFERENCE.md and produces verifiable output without needing context from prior sessions. Each content file is self-contained.

**Graceful Fallback:** All page templates render correctly even when enriched content files don't exist yet. Missing content falls back to existing thin content (app pages) or shows a minimal placeholder (new page types).

### 1.7 SEO: Internal Linking & Keyword Strategy

#### Internal Linking Rules

**Minimum links per page:**

| Page Type | Min Internal Links | Link Targets |
|-----------|-------------------|--------------|
| 1: App Detail (33 pages) | 8-10 | 2-3 related apps (same category), 1 bundle page, 1 tool page, 2-3 guides, 1-2 idea pages |
| 2: Free Tool Landing (33 pages) | 8-10 | 1 app detail page (same app), 4-5 related tools, 1 bundle, 2-3 guides |
| 3: Bundle Sales (6 pages) | 10-15 | All apps in the bundle (app detail links), 2-3 guides, 2-3 idea pages |
| 4: Cornerstone Guides (12 pages) | 10-15 | 3-5 app detail pages, 2-3 tool pages, 2-3 related guides, 2-3 idea pages |
| 5: "Create X" Guides (65 pages) | 8-12 | 1-2 app detail pages, 1-2 tool pages, 2-3 related guides, 1 cornerstone guide, 1-2 idea pages |
| 6: Niche Idea Pages (45 pages) | 8-12 | 2-4 app detail pages, 2-3 tool pages, 1-2 guides, 1 cornerstone guide |

**Linking topology rules:**
- Every page MUST link to at least 2 different page types (no self-referential clusters)
- App detail pages and tool pages for the SAME app always cross-link to each other
- Bundle pages link to ALL their constituent app detail pages
- Cornerstone guides (pillar content) receive the most inbound links — every other page type should link to at least 1 cornerstone guide
- Niche idea pages link to the apps that best serve that niche's content creation needs
- Links appear naturally within content (not just in a "Related" section at the bottom)

**Anchor text rules:**
- Use descriptive, keyword-rich anchor text (e.g., "free addition worksheet maker" not "click here")
- Vary anchor text — don't use the same exact text for every link to the same page
- Anchor text must be in the page's locale language
- Never use bare URLs as link text

#### Keyword Uniqueness Rules

**Primary rule: No two pages may share the same primary keyword set.**

Each page gets:
- **1 primary keyword** (the main search term this page targets)
- **3-5 secondary keywords** (related long-tail terms)
- **2-3 LSI keywords** (semantically related terms)

**Uniqueness enforcement:**
- Primary keywords must be globally unique across all 2,134 pages (within a locale)
- Secondary keywords may partially overlap between pages, but no two pages should share more than 1 secondary keyword
- The combination of primary + secondary keywords forms a unique "keyword fingerprint" per page

**How existing keyword targets map:**
- Page Type 1 (App Detail): Primary = app name + "worksheet generator" (e.g., "addition worksheet generator")
- Page Type 2 (Free Tool): Primary = "free" + app name + "worksheet maker" (e.g., "free addition worksheet maker")
- Page Type 3 (Bundle): Primary = category + "worksheet bundle" (e.g., "math worksheet bundle")
- Page Type 4 (Cornerstone): Primary = business topic keyword (already documented, e.g., "how to start a printable business")
- Page Type 5 (Create X): Primary = "how to create" + product type (e.g., "how to create word search worksheets")
- Page Type 6 (Niche Ideas): Primary = niche + "printable business ideas" (e.g., "farm animals printable business ideas")

**Cross-locale:** The same page in different locales targets the TRANSLATED equivalent of the same keyword — these are not duplicates. "addition worksheet generator" (en) and "Additions-Arbeitsblatt-Generator" (de) target the same intent in different markets.

#### Keywords in Headings Rules

**Rule: Every title (H1) and subtitle (H2, H3) on every page must contain at least one of the page's keywords. Every keyword assigned to the page must appear in at least one heading.**

Specifics:
- **H1 (page title):** Must contain the primary keyword (exactly or very close)
- **H2 (section headings):** Each must contain at least one keyword (primary or secondary)
- **H3 (sub-section headings):** Should contain a keyword where natural; at minimum 50% of H3s must include a keyword
- **All keywords used:** Every primary, secondary, and LSI keyword must appear in at least one H1, H2, or H3 on the page
- **Natural language:** Keywords must read naturally in headings — no keyword stuffing. "How to Create Addition Worksheets for Your Etsy Shop" is good. "Addition Worksheet Generator Free Create Worksheets" is bad.

**Content file schema addition:** Each content file's TypeScript interface must include a `keywords` field:

```typescript
interface PageKeywords {
  primary: string;           // Main target keyword
  secondary: string[];       // 3-5 long-tail keywords
  lsi: string[];             // 2-3 semantically related terms
}
```

**Verification rule:** During content creation, every heading in the page must be checked against the keyword list. If any keyword is not represented in at least one heading, add or modify a heading to include it.

### 1.8 Visual Integration Rules

Every page in the system MUST prominently feature visual assets. Visuals communicate better than words. A page without worksheet samples and image library visuals is incomplete regardless of word count.

**Minimum images per page type:**

| Page Type | Min Images | Sample Source | Image Library Use | Video Required |
|-----------|-----------|--------------|-------------------|----------------|
| 1: App Detail | 6-8 | `samples/{locale}/{app}/` — 2 hero + 4 gallery | 2-3 theme images | App's own tutorial |
| 2: Free Tool Landing | 5-7 | `samples/{locale}/{app}/` — 1 hero + 4-5 showcase | Theme variety grid | App's own tutorial |
| 3: Bundle Sales | 8-12 | `samples/{locale}/{app}/` — 1-2 per bundled app | Cross-theme collage | Most representative app's video |
| 4: Cornerstone Guides | 3-5 | Best samples from relevant apps | Topical themes | Most relevant app's video |
| 5: "Create X" Guides | 4-6 | `samples/{locale}/{app}/` — step-by-step progression | Theme examples | The specific app's video |
| 6: Niche/Theme Ideas | 5-8 | Samples using the niche's theme | From the specific theme folder | Most relevant app's video |

**Placement rules:**
- First image MUST appear above the fold (within first 300px of viewport)
- No section should have more than 400 words without an image breaking it up
- Every "How It Works" step should include or reference a visual
- Answer key images always appear paired with their worksheet
- Multi-language showcase: show same worksheet in 3-4 languages side by side (on pages discussing language features)

**Content file requirements:**
- `heroImages.primary` is REQUIRED for every page — no page launches without a hero image
- `youtubeId` is REQUIRED for every page — no page launches without a video
- `sampleGallery` must have at least 3 entries for page types 1-3, at least 2 for types 4-6
- All `alt` text must be in the page's locale language, never English (unless locale IS English)
- Image paths are URL strings only — actual files live in isolated storage, never in git

### 1.9 Localization of Product Names

**On non-English pages, product names, tier names, category names, and the "Worksheet Generator" suffix must NEVER appear in English.** All four string types have translations in `frontend/config/app-translations.ts` — use the helper functions, never hardcode English.

**Quick Reference:**

| String Type | Helper Function | Constant | Example (de) |
|-------------|----------------|----------|--------------|
| App name | `getLocalizedAppName(appId, locale)` | `APP_NAME_TRANSLATIONS` | "Wortsuche" not "Word Search" |
| Category name | `getLocalizedCategoryName(categoryId, locale)` | `CATEGORY_NAME_TRANSLATIONS` | "Mathematik" not "Math Mastery" |
| Tier name | `getLocalizedTierName(tierId, locale)` | `TIER_NAME_TRANSLATIONS` | "Kommerzielles Paket" not "Commercial Pack" |
| Suffix | `getLocalizedSuffix(locale)` | `WORKSHEET_GENERATOR_SUFFIX` | "Arbeitsblatt-Generator" not "Worksheet Generator" |

**Rules:**
- **ALWAYS** call the helper function with the current page's locale — never pass a hardcoded `'en'`
- **NEVER** write English product names in non-English content files, page titles, meta descriptions, headings, or body copy
- If a translation is missing, the helpers fall back to English automatically — but this should never happen for the 11 supported locales
- Source of truth: `frontend/config/app-translations.ts`

### 1.10 Conversion-Focused Content Voice

**Section 1.2 (Zero Fabrication) still applies unconditionally.** Excitement must come from real capabilities, never invented claims. The rules below govern *how* we present truthful information — energetically, not lifelessly.

#### 1.10.1 Target Audience Mindset

Every page speaks to real people at different stages of their printable-selling journey. Write for these four personas:

| Persona | Mindset | What They Need |
|---------|---------|----------------|
| **Curious Explorer** | "I heard you can make money selling printables — is this real?" | Proof it's achievable, clear next steps, low barrier to entry |
| **Overwhelmed Beginner** | "There are so many tools and platforms — where do I even start?" | Simplicity, hand-holding, confidence that this tool removes the hard parts |
| **Active Seller** | "I already sell on Etsy/KDP but need to scale faster and stand out" | Speed, variety, competitive advantage, professional quality |
| **Teacher-Turned-Entrepreneur** | "I make great classroom resources — can I turn this into a real business?" | Validation of their skills, path from classroom to marketplace, commercial licensing |

**Key insight:** These visitors are excited but uncertain. They need **confidence**, not hype. Show them the path clearly and honestly.

#### 1.10.2 Voice Principles

| Principle | DO | DON'T | Example |
|-----------|-----|--------|---------|
| **Energetic** | Use active verbs, short sentences, forward momentum | Sound robotic, clinical, or like a product manual | DO: "Create a complete word search in under 60 seconds" / DON'T: "The word search generator allows users to create word searches" |
| **Empowering** | Make the reader the hero — they create, they earn, they build | Position the tool as the hero or talk down to the reader | DO: "You choose the theme, the words, the layout — your brand, your way" / DON'T: "Our powerful tool does everything for you" |
| **Specific** | Name exact features, exact platforms, exact formats | Use vague marketing language or empty superlatives | DO: "Export at 300 DPI — the minimum for Amazon KDP print quality" / DON'T: "High-quality professional output" |
| **Honest** | State real capabilities, real limitations, real use cases | Oversell, imply guaranteed income, or hide restrictions | DO: "Commercial Pack includes 10 image themes — enough to launch your first 50+ products" / DON'T: "Unlimited creative possibilities" |
| **Action-Oriented** | End sections with a clear next step | Leave the reader wondering "so what?" or "what now?" | DO: "Try the free version below — no signup needed" / DON'T: "The tool is available for use" |
| **Benefit-First** | Lead with what the reader gains, then explain the feature | Lead with technical details or feature names | DO: "Stand out on Etsy with 104 hand-drawn image themes that no competitor can replicate" / DON'T: "The image library contains 104 themes" |

#### 1.10.3 Opening Hook Rules

**Every content section** (hero, description, how-it-works intro, feature intro, FAQ intro, guide intro) must open with one of these patterns. NEVER open with a feature statement.

| Pattern | Structure | Example |
|---------|-----------|---------|
| **Benefit Lead** | "[Outcome] + [how]" | "Turn any vocabulary list into a professional word search puzzle — complete with answer key — in under a minute." |
| **Transformation** | "[Before state] → [After state]" | "Stop spending hours on generic worksheet templates. Start creating unique, branded printables that sell." |
| **Question Hook** | "[Pain question] + [Implied answer]" | "What if you could add 20 new products to your Etsy shop this weekend — without any design skills?" |
| **Scenario** | "[Imagine/Picture this] + [desirable situation]" | "Picture this: a customer searches Etsy for 'farm animals word search' and your product is the only one with hand-drawn illustrations." |

**Anti-pattern (BANNED):**
- NEVER open with "This tool..." or "[Product Name] is a..."
- NEVER open with "Welcome to..." or "In this section..."
- NEVER open with a dictionary definition or generic industry statement
- NEVER open with "Are you looking for...?" (overused, sounds like spam)

#### 1.10.4 Pain-to-Solution Framework

Every page must follow this 3-step emotional arc at least once (typically in the hero/description section):

1. **Acknowledge the struggle** — Name the specific pain the reader faces (time, complexity, cost, quality)
2. **Show the easy path** — Position the tool as the bridge, not the destination
3. **Demonstrate the result** — Paint a concrete picture of the outcome

**Per-page-type mapping:**

| Page Type | Pain Point | Solution Bridge | Result Emphasis |
|-----------|-----------|-----------------|-----------------|
| 1: App Detail | "Creating professional printables requires expensive software and design skills" | "This generator handles the design — you handle the creativity" | Specific output: "300 DPI PDFs ready for print-on-demand" |
| 2: Free Tool | "You can't test a tool properly from screenshots alone" | "Try it right now, free, no signup — see the quality yourself" | Conversion: "When you're ready to sell, the Commercial Pack removes the watermark" |
| 3: Bundle | "Buying tools one-by-one adds up fast and still leaves gaps in your catalog" | "One purchase, six generators, thousands of product combinations" | Scale: "Create an entire printable category from a single bundle" |
| 4: Cornerstone Guide | "The printable business space looks crowded and confusing from the outside" | "Here's the proven path — platform by platform, step by step" | Authority: "This is how working sellers actually operate" |
| 5: Create X Guide | "I want to sell [product type] but don't know where to start" | "Here's exactly how to create, format, and list [product type]" | Actionable: "Follow these steps and list your first product today" |
| 6: Niche/Theme Ideas | "I don't know what niche to target or what will actually sell" | "Here are proven niches with real demand and low competition" | Opportunity: "These niches have buyer demand — here's proof and how to enter" |

#### 1.10.5 Platform-Specific Excitement Rules

Readers get excited when they see their exact platform named with realistic scenarios. Follow these rules:

1. **Name real platforms explicitly:** Etsy, Amazon KDP, Teachers Pay Teachers (TPT), Gumroad, Creative Fabrica, Creative Market, Shopify. Never use vague "online marketplaces."

2. **Use locale-appropriate platform domains:** Reference etsy.com for EN, etsy.de for DE, amazon.fr for FR, etc. See Section 11.8 for the full locale-marketplace reference table.

3. **Describe realistic scenarios, not income guarantees:**
   - DO: "A single theme like 'farm animals' can generate 10+ unique product listings — each targeting different age groups, puzzle sizes, and difficulty levels"
   - DON'T: "Make $500/month from farm animal worksheets"

4. **Mention factual platform advantages:**
   - Etsy: "Etsy's search algorithm favors shops with more listings — every new printable increases your visibility"
   - KDP: "KDP handles printing, shipping, and customer service — you focus on creating"
   - TPT: "TPT's built-in teacher audience means less marketing — upload and let the platform drive traffic"

5. **Use locale-appropriate school terminology:**
   - EN: "kindergarten, first grade, elementary school"
   - DE: "Kindergarten, erste Klasse, Grundschule"
   - FR: "maternelle, CP, ecole primaire"
   - (See Section 11.8 for all locales)

6. **Language-as-multiplier framing** — ONLY for language-sensitive apps (see Section 2.3):
   - DO: "With 11 languages, every puzzle template becomes 11 unique products — one for each market"
   - DON'T use this framing for visual-only apps where language only changes the UI

7. **Banned phrases** (violate Section 1.2 or sound like empty hype):
   - "passive income" (implies no effort)
   - "money machine" / "cash cow"
   - "guaranteed sales" / "guaranteed income"
   - "everyone is buying" / "trending now" (unverifiable)
   - "limited time" / "act now" / "don't miss out" (fake urgency)
   - "best-selling" (unverifiable for our products)
   - "revolutionary" / "game-changing" / "industry-leading"

#### 1.10.6 CTA (Call-to-Action) Rules

Every CTA must follow these principles:

| Rule | Requirement | Example |
|------|-------------|---------|
| **Action verb first** | Start with a verb that describes what happens next | "Try the free version" not "Free version available" |
| **Mention value** | Include what the reader gets | "Download your first worksheet" not "Click here" |
| **Context-specific** | Match the CTA to the page type and section | "Create your first word search now" not generic "Get started" |
| **Match page type** | Different types have different primary CTAs | Type 1: "Try Free / Buy Now" · Type 2: "Use Free Tool Below" · Type 3: "Get the Bundle" · Type 4-6: "Try [App] Free" |

**Placement rules:**
- **Minimum 3 CTAs per page:** Hero section + after How It Works + final section
- **Maximum spacing:** Never more than ~800 words between CTAs on any page
- **CTA variety:** Don't repeat the exact same CTA text — vary the action verb and context

**Banned CTA patterns:**
- No fake urgency: "Buy now before price increases!" (unless a real, dated price change exists)
- No fake scarcity: "Only X left!" (digital products have unlimited inventory)
- No manipulative language: "You'd be crazy not to..." / "Don't make this mistake..."
- No "Click here" — always describe the action/result

#### 1.10.7 Anti-Patterns (Content That Kills Conversions)

These 8 patterns make pages feel "soulless and dull." Each must be actively avoided:

| # | Anti-Pattern | What It Sounds Like | Fix |
|---|-------------|---------------------|-----|
| 1 | **Generic opener** | "Welcome to our word search generator page" | Lead with a benefit or transformation (see 1.10.3) |
| 2 | **Feature without benefit** | "Supports 11 languages" | "Sell in 11 markets — each language opens a new customer base" |
| 3 | **Passive voice** | "Worksheets can be generated with this tool" | "Generate professional worksheets in seconds" |
| 4 | **No audience connection** | Describes the tool without mentioning who uses it or why | Name the persona: "Whether you're an Etsy seller scaling your shop or a teacher creating custom resources..." |
| 5 | **Wall of text** | 500+ words with no subheadings, bullets, or visual breaks | Break into scannable sections: heading + 2-3 sentence intro + bullet list or table |
| 6 | **Identical siblings** | Two app pages that read nearly the same with swapped product names | Each app has unique features (verify via REFERENCE APPS/) — highlight what makes THIS app different |
| 7 | **Missing business angle** | Describes what the tool does but never why it matters for selling | Always connect to the business: "...which means more unique listings in your shop" |
| 8 | **Template-sounding FAQ** | "Q: What is [Product]? A: [Product] is a tool that..." | Write FAQs that address real buyer concerns: "Q: Can I use these commercially on Etsy? A: Yes — both tiers include a commercial license..." |

#### 1.10.8 Per-Page-Type Tone Adaptation

While the voice principles (1.10.2) apply everywhere, each page type emphasizes different emotional notes:

| Page Type | Tone Emphasis | Lead Emotion | Key Phrase Patterns |
|-----------|--------------|--------------|---------------------|
| 1: App Detail | Confident, demo-focused | "I can see exactly what I'll get" | "See it in action" · "Here's what you'll create" · "Try it free" |
| 2: Free Tool | Inviting, low-pressure | "I can try this risk-free right now" | "No signup needed" · "Free, right here" · "When you're ready to sell..." |
| 3: Bundle | Value-focused, strategic | "This is the smart way to buy" | "Everything you need for [category]" · "One purchase, [N] generators" · "Save [X]% vs. individual" |
| 4: Cornerstone Guide | Authoritative, mentoring | "I trust this guide — it knows the space" | "Here's how it actually works" · "The path from zero to selling" · "What successful sellers do" |
| 5: Create X Guide | Practical, step-by-step | "I can follow this and get a result today" | "Step 1..." · "Here's exactly how" · "By the end of this guide..." |
| 6: Niche/Theme Ideas | Inspiring, opportunity-focused | "I see an opening I can fill" | "Underserved niche" · "Growing demand" · "Here's your angle" · "Low competition" |

### 1.11 Per-Page SEO Perfection Checklist

Every page created under this blueprint MUST pass ALL applicable items before the part is marked complete. This checklist consolidates and extends rules from Sections 1.5 (Performance), 1.7 (SEO Keywords/Linking), and the verification in Section 14.

#### Category A: Technical SEO (7 items)

| # | Check | Requirement |
|---|-------|-------------|
| A1 | **Title tag** | Unique, contains primary keyword, <= 60 characters, locale language |
| A2 | **Meta description** | Unique, contains primary keyword, 150-160 characters, locale language, includes CTA verb |
| A3 | **Canonical URL** | Self-referencing canonical on every page, fully qualified URL with locale prefix |
| A4 | **Hreflang tags** | All 11 locales + `x-default` (pointing to EN), bidirectional (every page links to all siblings) |
| A5 | **Robots directives** | `index, follow` on all public pages; `noindex` only on auth/admin/error pages |
| A6 | **JSON-LD schema** | Valid schema matching the page type (see schema type table below), language matches locale |
| A7 | **OpenGraph tags** | `og:title`, `og:description`, `og:url`, `og:type`, `og:image`, `og:locale` — all in page locale |

#### Category B: On-Page SEO (6 items)

| # | Check | Requirement |
|---|-------|-------------|
| B1 | **Single H1** | Exactly one `<h1>` per page, contains primary keyword, locale language |
| B2 | **Heading hierarchy** | H1 > H2 > H3 (no skipping levels), all headings in locale language |
| B3 | **Keyword in first 100 words** | Primary keyword appears in the first 100 words of visible body text |
| B4 | **Keyword density** | Primary keyword appears at 1-2% density (not stuffed, not absent) |
| B5 | **Image alt text** | Every `<img>` has descriptive alt text in the page's locale language |
| B6 | **Internal link anchors** | Anchor text is descriptive and keyword-relevant — never "click here" or "read more" |

#### Category C: Content SEO (8 items)

| # | Check | Requirement |
|---|-------|-------------|
| C1 | **Word count** | Rendered page >= 3,000 words (per Section 1.6) |
| C2 | **Internal link count** | Minimum per page type: Type 1-3: 5 links · Type 4: 8 links · Type 5-6: 6 links |
| C3 | **Link topology** | Links follow the hub-spoke model in Section 1.7 — no orphan pages, no dead ends |
| C4 | **Keywords in headings** | Primary keyword in H1, secondary keywords distributed across H2/H3 tags |
| C5 | **No duplicate primary keyword** | No two pages in the same locale target the identical primary keyword |
| C6 | **Voice rules compliance** | Content follows Section 1.10 — benefit-first openings, pain-to-solution arc, active voice |
| C7 | **Free trial messaging** | Free trial mention present per Section 1.12.2 table — correct locations for this page type, no "limited free version" language |
| C8 | **Refund policy FAQ** | Refund policy Q&A present in FAQ array per Section 1.12.3, positioned among last 3 FAQs, included in FAQPage schema |

#### Category D: Structured Data (4 items)

| # | Check | Requirement |
|---|-------|-------------|
| D1 | **FAQ schema** | `FAQPage` schema present on Types 1, 2, 4, 5, 6 — questions/answers match rendered text exactly |
| D2 | **Breadcrumbs** | `BreadcrumbList` schema present on Types 4, 5, 6 — matches visible breadcrumb trail |
| D3 | **Rich Results validation** | Schema passes Google Rich Results Test (no errors, no warnings) |
| D4 | **Schema language** | All text within JSON-LD matches the page locale — no English leaking into non-EN schemas |

**Schema type table:**

| Page Type | Required `@type` | Notes |
|-----------|-----------------|-------|
| 1: App Detail | `SoftwareApplication` + `FAQPage` | Use `schema-generator.ts` existing patterns |
| 2: Free Tool | `WebApplication` + `FAQPage` | `applicationCategory: "EducationalApplication"` |
| 3: Bundle | `Product` + `Offer` | Price, currency, availability from `warriorplus-products.ts` |
| 4: Cornerstone Guide | `Article` + `FAQPage` + `BreadcrumbList` | `articleSection` matches category |
| 5: Create X Guide | `HowTo` + `FAQPage` + `BreadcrumbList` | Steps match rendered how-to sections |
| 6: Niche/Theme Ideas | `Article` + `FAQPage` + `BreadcrumbList` | `articleSection: "Business Ideas"` |

#### Category E: Performance (5 items)

| # | Check | Requirement |
|---|-------|-------------|
| E1 | **YouTube facade** | ALL YouTube embeds use click-to-play facade (Section 1.5) — no raw iframes |
| E2 | **Image optimization** | All images use Next.js `<Image>` with appropriate `width`, `height`, `loading="lazy"` |
| E3 | **No blocking scripts** | No `<script>` tags in initial HTML that block rendering (defer/async or dynamic import) |
| E4 | **No animation libraries** | No framer-motion, GSAP, or similar — use CSS `@keyframes` only (Section 1.5 learning) |
| E5 | **Font loading** | All fonts loaded via `next/font` — no external font CSS imports |

#### Category F: Mobile & Accessibility (4 items)

| # | Check | Requirement |
|---|-------|-------------|
| F1 | **Responsive layout** | Page renders correctly on 320px-1440px viewports, no broken layouts |
| F2 | **Touch targets** | All interactive elements (buttons, links) are minimum 44x44px on mobile |
| F3 | **No horizontal scroll** | No content overflows viewport width on any screen size |
| F4 | **Semantic HTML** | Proper use of `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<header>`, `<footer>` |

#### Category G: Cross-Locale (3 items)

| # | Check | Requirement |
|---|-------|-------------|
| G1 | **No untranslated English** | Zero English strings on non-EN pages — includes product names, tier names, category names (Section 1.9) |
| G2 | **Localized slug** | URL slug is translated per the slug config file for this page type (Section 10) |
| G3 | **Locale-appropriate references** | Marketplace domains, school terminology, and example scenarios match the locale (Section 11.8) |

#### Mandatory Items Per Page Type

| Page Type | A (7) | B (6) | C (8) | D (4) | E (5) | F (4) | G (3) | Total |
|-----------|-------|-------|-------|-------|-------|-------|-------|-------|
| 1: App Detail | All 7 | All 6 | All 8 | D1, D3, D4 | All 5 | All 4 | All 3 | **36** |
| 2: Free Tool | All 7 | All 6 | All 8 | D1, D3, D4 | All 5 | All 4 | All 3 | **36** |
| 3: Bundle | All 7 | All 6 | All 8 | D3, D4 | All 5 | All 4 | All 3 | **35** |
| 4: Cornerstone | All 7 | All 6 | All 8 | All 4 | All 5 | All 4 | All 3 | **37** |
| 5: Create X | All 7 | All 6 | All 8 | All 4 | All 5 | All 4 | All 3 | **37** |
| 6: Niche/Theme | All 7 | All 6 | All 8 | All 4 | All 5 | All 4 | All 3 | **37** |

#### How to Use This Checklist

- **During content creation (Phase 1-6):** Categories A, B, C, D, G are validated per part via the content file and page component
- **During build verification:** Categories E, F are validated by building and inspecting the rendered page
- **During deploy verification:** All categories spot-checked on live pages
- **Translation phases (7-16):** Focus on A1-A2 (translated title/meta), B1-B2 (translated headings), C6 (voice rules), D4 (schema language), G1-G3 (full cross-locale)

#### Content File SEO Integration

Every content file should export an `seoChecklist` object for automated validation:

```typescript
interface SEOChecklist {
  primaryKeyword: string;           // The #1 keyword this page targets
  secondaryKeywords: string[];      // 3-5 additional keywords
  titleTag: string;                 // Exact title tag (<= 60 chars)
  metaDescription: string;          // Exact meta description (150-160 chars)
  targetWordCount: number;          // Minimum word count for this page
  internalLinkTargets: string[];    // Slugs this page MUST link to
  faqCount: number;                 // Number of FAQ items (for schema validation)
  schemaType: string;               // Primary schema type for this page
}
```

This interface is informational — the exact implementation may vary based on the content file pattern established in Phase 0.

### 1.12 Free Trial Emphasis & Refund Policy

Every page in the system must communicate the free trial advantage and include a no-refund FAQ. This section defines what to say, where to say it, and how to enforce it. These rules work alongside Section 1.2 (Zero Fabrication) and Section 1.4 (Two-Tier Accuracy) — never overstate what the free version includes.

#### 1.12.1 The Free Trial Fact

All 33 apps work in the browser with ZERO restrictions on features:

- Every setting, every theme (within tier), every language, every export option works
- The ONLY difference: downloaded PDFs have a watermark
- No signup required, no credit card, no email, no time limit
- This applies equally to Commercial Pack and Full Access Pack features being previewed
- Purchasing removes the watermark — that is the sole change

#### 1.12.2 Mandatory Free Trial Mentions (Per Page Type)

Every page type must mention the free trial in specific locations. Use natural phrasing appropriate to the context — the table below shows WHERE and provides framing guidance:

| Page Type | Where to Mention | How to Frame |
|-----------|-----------------|--------------|
| 1: App Detail | Hero section, How It Works, CTA sections, FAQ | "Try it free right now — all features, no signup. Only downloaded files have a watermark." |
| 2: Free Tool | Hero (primary message), embedded tool intro, FAQ | "Use the full tool below — free, no signup. Love it? Remove the watermark with a one-time purchase." |
| 3: Bundle | Value proposition, comparison table, FAQ | "Try every app in this bundle free before buying. All features work — watermark is the only difference." |
| 4: Cornerstone Guide | Tools Recommended section, FAQ | "Every tool mentioned in this guide is free to try — test them all before investing." |
| 5: Create X Guide | Tool introduction, step-by-step section, FAQ | "Follow along with the free version — it has all the same features. Buy when you're ready to sell." |
| 6: Niche/Theme Ideas | How to Create section, tool links, FAQ | "Start creating in this niche today — every tool is free to try with full features." |

#### 1.12.3 Mandatory Refund Policy FAQ

EVERY page's FAQ section must include a refund policy Q&A. This is non-negotiable across all 6 page types and all 11 locales.

**Question pattern:** "What is your refund policy?" (localized naturally per locale)

**Answer pattern:** "We do not offer refunds because every app is free to try with all features before you buy. The only difference between the free version and the paid version is a watermark on downloaded files. We encourage you to try before you buy — test the app thoroughly, create worksheets, check the quality, and only purchase when you're completely satisfied."

**Rules:**
- This FAQ must appear on ALL 6 page types, ALL 11 locales
- It must be included in the `FAQPage` JSON-LD schema
- Position: among the last 3 FAQs (not first — lead with value FAQs)
- The answer must reference the free trial as justification — never state the policy without the reason
- Locale versions must use natural phrasing, not literal translations

#### 1.12.4 Free Trial Framing Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Use "free to try" or "try free" | "Try it free with all features" | "Start your free trial" (implies time limit) |
| Always mention no signup | "No signup, no credit card" | Omitting the signup detail |
| Clarify watermark is the ONLY difference | "The only difference is a watermark" | "Some features require purchase" |
| Never imply feature limits | "All features included" | "Limited free version" or "Basic free version" |
| Locale-appropriate phrasing | Natural equivalent in target language | Word-for-word translation of English phrase |

---

## 2. BUSINESS & PRODUCT CONTEXT

### 2.1 Six Product Categories

| Category | Color | Apps (count) | App IDs |
|----------|-------|-------------|---------|
| Math Mastery | #3B82F6 (blue) | 6 | addition, subtraction, code-addition, more-less, math-puzzle, math-worksheet |
| Literacy & Language | #10B981 (green) | 7 | alphabet-train, prepositions, word-guess, word-scramble, wordsearch, cryptogram, writing |
| Visual Learning | #F59E0B (amber) | 7 | big-small, pattern-train, pattern-worksheet, draw-and-color, drawing-lines, coloring, chart-count |
| Matching & Sorting | #8B5CF6 (purple) | 5 | matching, grid-match, shadow-match, bingo, picture-sort |
| Puzzles & Logic | #EF4444 (red) | 4 | missing-pieces, odd-one-out, sudoku, picture-path |
| Search & Find | #06B6D4 (cyan) | 4 | find-and-count, find-objects, crossword, treasure-hunt |

### 2.2 Two Product Tiers

**Pricing:**
- All individual apps: **$27** (Commercial) / **$47** (Full Access)
- All bundles: **$79** (Commercial) / **$119** (Full Access)

**Commercial Pack ($27 individual / $79 bundle):**
- Access to all apps in the purchased category (or single app)
- 10 image themes (~300 images) — colorful or B&W depending on app (see table below)
- Language varies per app: English only for language-sensitive apps, all 11 languages (UI only) for visual-only apps
- Full editing of all generated elements
- 300 DPI PDF export
- Answer key generation
- Commercial license (sell generated worksheets)

**Full Access Pack ($47 individual / $119 bundle):**
- Everything in Commercial Pack PLUS:
- 100+ image themes (3,000+ images — the complete library)
- All 11 languages unlocked (ALL apps — both UI and content)
- Sell in any language market worldwide

**EVERY Product Has Both Tiers:**
- Individual apps: Commercial + Full Access
- Category bundles: Commercial + Full Access
- Mega Bundle: Commercial + Full Access
- No exceptions — even visual-only apps use the two-tier structure (image theme count is the key differentiator for those)

#### Per-App Commercial Tier Details

| App | Category | Image Themes (Commercial) | Language (Commercial) | Price (Commercial / Full Access) |
|-----|----------|--------------------------|----------------------|--------------------------------|
| Addition | Math Mastery | 10 colorful | All 11 (UI only) | $27 / $47 |
| Subtraction | Math Mastery | 10 colorful | All 11 (UI only) | $27 / $47 |
| Code Addition | Math Mastery | 10 colorful | English only | $27 / $47 |
| More or Less | Math Mastery | 10 colorful | All 11 (UI only) | $27 / $47 |
| Math Puzzle | Math Mastery | 10 colorful | All 11 (UI only) | $27 / $47 |
| Math Worksheet | Math Mastery | 10 colorful | All 11 (UI only) | $27 / $47 |
| Alphabet Train | Literacy & Language | 10 colorful | English only | $27 / $47 |
| Prepositions | Literacy & Language | 10 colorful | English only | $27 / $47 |
| Word Guess | Literacy & Language | 10 colorful | English only | $27 / $47 |
| Word Scramble | Literacy & Language | 10 colorful | English only | $27 / $47 |
| Word Search | Literacy & Language | 10 colorful | English only | $27 / $47 |
| Cryptogram | Literacy & Language | 10 colorful | English only | $27 / $47 |
| Writing | Literacy & Language | 10 colorful | All 11 (UI only) | $27 / $47 |
| Big & Small | Visual Learning | 10 colorful | All 11 (UI only) | $27 / $47 |
| Pattern Train | Visual Learning | 10 colorful | All 11 (UI only) | $27 / $47 |
| Pattern Worksheet | Visual Learning | 10 colorful | All 11 (UI only) | $27 / $47 |
| Draw & Color | Visual Learning | 10 B&W | All 11 (UI only) | $27 / $47 |
| Drawing Lines | Visual Learning | 10 colorful | All 11 (UI only) | $27 / $47 |
| Coloring | Visual Learning | 10 B&W | All 11 (UI only) | $27 / $47 |
| Chart Count | Visual Learning | 10 colorful | All 11 (UI only) | $27 / $47 |
| Matching | Matching & Sorting | 10 colorful | English only | $27 / $47 |
| Grid Match | Matching & Sorting | 10 colorful | All 11 (UI only) | $27 / $47 |
| Shadow Match | Matching & Sorting | 10 colorful | All 11 (UI only) | $27 / $47 |
| Bingo | Matching & Sorting | 10 colorful | English only | $27 / $47 |
| Picture Sort | Matching & Sorting | 10 colorful | English only | $27 / $47 |
| Missing Pieces | Puzzles & Logic | 10 colorful | All 11 (UI only) | $27 / $47 |
| Odd One Out | Puzzles & Logic | 10 colorful | All 11 (UI only) | $27 / $47 |
| Sudoku | Puzzles & Logic | 10 colorful | All 11 (UI only) | $27 / $47 |
| Picture Path | Puzzles & Logic | 10 colorful | All 11 (UI only) | $27 / $47 |
| Find & Count | Search & Find | 10 colorful | English only | $27 / $47 |
| Find Objects | Search & Find | 10 colorful | All 11 (UI only) | $27 / $47 |
| Crossword | Search & Find | 10 colorful | English only | $27 / $47 |
| Treasure Hunt | Search & Find | 10 colorful | English only | $27 / $47 |

**Notes:**
- **B&W apps:** Draw & Color and Coloring use black & white outline themes (designed for coloring in)
- **All other apps:** use colorful, full-color image themes
- **Language-sensitive apps (13):** English only at Commercial tier because content changes with language
- **Visual-only apps (20):** All 11 languages at Commercial tier because language only affects UI labels

#### Bundle Commercial Tier Details

| Bundle | Apps | Image Themes (Commercial) | Language (Commercial) | Price (Commercial / Full Access) |
|--------|------|--------------------------|----------------------|--------------------------------|
| Math Mastery | 6 | 10 colorful | English only | $79 / $119 |
| Literacy & Language | 7 | 10 colorful | English only | $79 / $119 |
| Visual Learning | 7 | 5 colorful + 5 B&W | English only | $79 / $119 |
| Matching & Sorting | 5 | 10 colorful | English only | $79 / $119 |
| Puzzles & Logic | 4 | 10 colorful | English only | $79 / $119 |
| Search & Find | 4 | 10 colorful | English only | $79 / $119 |

**Notes:**
- **All bundles are English only** at Commercial tier (simplifies the offering)
- **Visual Learning bundle** is special: 5 colorful + 5 B&W themes (because it contains Draw & Color and Coloring which use B&W themes)
- **Full Access tier** for all bundles: 100+ themes (3,000+ images), all 11 languages

**CRITICAL: On non-English pages, use localized tier names from `app-translations.ts` (see Section 1.9), NEVER the English names "Commercial Pack" or "Full Access Pack".**

### 2.3 Language Sensitivity Classification

**Language-Sensitive Apps (13)** — Content locale changes the worksheet output:

| App | Why Language Matters |
|-----|---------------------|
| Word Search | Hidden words are image names in the selected language |
| Crossword | Crossword answers are image names in the selected language |
| Word Scramble | Scrambled word is the image name in the selected language |
| Word Guess | Word to guess is the image name in the selected language |
| Cryptogram | Secret message text is in the selected language |
| Code Addition | Decoded words are in the selected language |
| Alphabet Train | Letter set and alphabet order varies by language |
| Prepositions | Preposition words (on, under, above, etc.) are language-dependent |
| Matching | Image-to-Word and Image-to-Beginning-Letter modes use localized words |
| Bingo | Image labels are in the selected language (when label mode is on) |
| Find & Count | Image name labels on the worksheet are in the selected language |
| Picture Sort | Category labels use localized image names |
| Treasure Hunt | Direction instructions on worksheet are in the selected language |

**Visual-Only Apps (20)** — Language only affects UI labels, not worksheet content:

| App | Why Language Doesn't Matter for Content |
|-----|----------------------------------------|
| Addition | Image-based math — numbers are universal |
| Big & Small | Visual size comparison — no text on worksheet |
| Chart Count | Visual counting/graphing — numbers are universal |
| Coloring | Coloring pages — purely visual |
| Draw & Color | Drawing grid — purely visual |
| Drawing Lines | Line tracing between images — purely visual |
| Find Objects | Hidden object scene — visual search |
| Grid Match | Visual grid matching — no localized word content |
| Math Puzzle | Math operations in grid — numbers are universal |
| Math Worksheet | Pure number math — no images or locale-dependent text |
| Missing Pieces | Jigsaw puzzle — purely visual |
| More or Less | Number comparison with >, <, = symbols — universal |
| Odd One Out | Find the different item — purely visual |
| Pattern Train | Train car pattern sequences — purely visual |
| Pattern Worksheet | Pattern completion — purely visual |
| Picture Path | Maze/pathway navigation — purely visual |
| Shadow Match | Image-to-silhouette matching — purely visual |
| Subtraction | Image-based math — numbers are universal |
| Sudoku | 4x4 image sudoku — purely visual |
| Writing | English-only handwriting practice — no multi-language content |

### 2.4 Language Feature Importance by Category

| Category | Language-Sensitive Apps | Visual-Only Apps | Language as Selling Point? |
|----------|----------------------|-----------------|--------------------------|
| Math Mastery | 1 (code-addition) | 5 | Low — only one app benefits |
| Literacy & Language | **6 of 7** (all except writing) | 1 (writing) | **HIGH** — language is the core value |
| Visual Learning | 0 | **7 of 7** (ALL) | **LOW** — language only affects UI |
| Matching & Sorting | 3 (matching, bingo, picture-sort) | 2 | Medium — most apps use words |
| Puzzles & Logic | 0 | **4 of 4** (ALL) | **LOW** — language only affects UI |
| Search & Find | 3 (find-and-count, crossword, treasure-hunt) | 1 | High — most apps use words |

---

## 3. PAGE TYPE OVERVIEW

| # | Page Type | Per Language | x 11 Locales | URL Pattern | Priority |
|---|-----------|-------------|--------------|-------------|----------|
| 1 | App Detail Pages (transform existing) | 33 | 363 | `/{locale}/apps/{localized-slug}` | P1 |
| 2 | Free Tool Landing Pages (new) | 33 | 363 | `/{locale}/tools/{localized-slug}` | P2 |
| 3 | Bundle Sales Pages (new) | 6 | 66 | `/{locale}/bundles/{localized-slug}` | P3 |
| 4 | Business Cornerstone Guides (new) | 12 | 132 | `/{locale}/start/{localized-slug}` | P4 |
| 5 | "Create X" Guides (new) | 65 | 715 | `/{locale}/guides/{localized-slug}` | P5 |
| 6 | Niche/Theme Idea Pages (new) | 45 | 495 | `/{locale}/ideas/{localized-slug}` | P6 |
| | **TOTAL** | **194** | **2,134** | | |

---

## 4. PAGE TYPE 1: APP DETAIL PAGES (33 apps x 11 locales = 363 pages)

### Current State
- Route: `/{locale}/apps/{localized-slug}` — LIVE, 363 pages exist
- Template: `frontend/app/[locale]/apps/[slug]/page.tsx` (~801 lines)
- Content: ~254 words per page (thin — 54 unique + 200 template)
- Problem: Google rejects as thin/duplicate content

### Target State
- 3,000+ words per page with 8 content sections
- App-specific features verified from HTML source
- Per-locale marketplace references and cultural adaptation
- FAQPage structured data (JSON-LD)

### Word Count Breakdown (3,500 words)

| Section | Words | Unique Per |
|---------|-------|------------|
| Hero (title + tagline + extended description) | 250 | App x Locale |
| How It Works (5 detailed steps) | 400 | App x Locale |
| Key Features (8 features with explanations) | 800 | App x Locale |
| Business Use Cases (5-6 scenarios) | 600 | App x Locale |
| Who Is This For (4 audience segments) | 300 | Category x Locale |
| What You Get (tier breakdown) | 250 | Locale (with {name}) |
| FAQ (5-7 app-specific + 5 generic + 1 mandatory refund policy Q&A) | 700 | App x Locale |
| Template UI (headings, CTAs, badges) | 200 | Locale |

### File Structure
```
frontend/config/app-content/
  types.ts                    -- TypeScript interfaces
  index.ts                    -- Re-exports + getAppContent() helper
  category-audience.ts        -- "Who Is This For" per category x 11 locales
  tier-comparison.ts          -- "What You Get" x 11 locales
  en/addition.ts              -- English content for Addition app
  en/subtraction.ts           -- English content for Subtraction app
  ... (33 files per locale)
  de/addition.ts              -- German content for Addition app
  ... (33 x 11 = 363 content files total)
```

### Content Rules for Each Section

**Hero (250 words):** 3-5 sentences. What the app creates, key distinguishing capability, who benefits, image library scope, business value. Verified from HTML source.

**How It Works (400 words):** 5 app-specific steps (NOT generic "Create -> Export -> Sell"). Each step references actual UI elements. Example: "Select your math operation from 4 modes: Image+Image, Image+Number, Find the Addend, or Mixed."

**Key Features (800 words):** 8 unique features per app. Each: title (3-6 words) + explanation (80-100 words). For language-sensitive apps, one feature MUST highlight multi-language content. Every claim verified from HTML source.

**Business Use Cases (600 words):** 5-6 scenarios with specific platform mentions. Locale-aware (Etsy.de for German, Amazon.fr for French). Language-sensitive apps include use cases about creating products in that language.

**Who Is This For (300 words):** 4 audience segments (Etsy Sellers, KDP Publishers, TPT Sellers, Homeschool Educators). Shared per category (6 variants x 11 locales).

**What You Get (250 words):** Commercial Pack vs Full Access Pack comparison. Shared across apps with {name} interpolation. Language-sensitive vs visual-only variants.

**FAQ (700 words):** 5-7 app-specific Q&As (unique to THIS app) + 5 generic Q&As from existing `default-product-faqs.ts`. Combined 10-12 FAQs generate FAQPage JSON-LD.

### Feature Audit Requirements (Per App)

Before writing content for any app, READ `REFERENCE APPS/[app].html` and extract:
- All `<select>` elements (configuration options)
- All accordion sections (feature panels)
- Exercise modes / difficulty levels
- Canvas editing capabilities
- Export options (PDF sizes, DPI)
- Image library integration
- Language handling specifics

---

## 5. PAGE TYPE 2: FREE TOOL LANDING PAGES (33 tools x 11 locales = 363 pages)

### Purpose
SEO magnets targeting "free [type] worksheet generator" keywords. Each page embeds the actual free app (via iframe) surrounded by substantial content. The free tool with watermark IS the lead magnet — it demonstrates value and drives paid conversions.

### Route: `/{locale}/tools/{localized-slug}`

### Word Count Breakdown (3,200 words)

| Section | Words |
|---------|-------|
| Hero (tool name, what it creates, instant-access CTA) | 200 |
| Embedded Tool (iframe + caption) | 50 |
| What You Can Create (5-6 product examples with descriptions) | 600 |
| Step-by-Step Tutorial (8-10 steps with screenshots descriptions) | 700 |
| Business Ideas (5-6 money-making scenarios with this tool) | 600 |
| Pro Tips (5-7 expert tips for best results) | 400 |
| Related Tools (4-5 complementary generators) | 200 |
| FAQ (8-10 tool-specific questions + 1 mandatory refund policy Q&A) | 450 |

### All 33 Tool Pages

| # | Tool Page | URL Slug (English) | Target Keyword |
|---|-----------|-------------------|----------------|
| 1 | Free Addition Worksheet Maker | free-addition-worksheet-maker | free addition worksheet generator |
| 2 | Free Subtraction Worksheet Maker | free-subtraction-worksheet-maker | free subtraction worksheet generator |
| 3 | Free Code Addition Worksheet Maker | free-code-addition-worksheet-maker | free code breaker math worksheet |
| 4 | Free More or Less Worksheet Maker | free-more-or-less-worksheet-maker | free greater than less than worksheets |
| 5 | Free Math Puzzle Maker | free-math-puzzle-maker | free math puzzle worksheet generator |
| 6 | Free Math Worksheet Maker | free-math-worksheet-maker | free math worksheet generator |
| 7 | Free Alphabet Train Worksheet Maker | free-alphabet-train-maker | free alphabet worksheet generator |
| 8 | Free Prepositions Worksheet Maker | free-prepositions-worksheet-maker | free prepositions worksheet generator |
| 9 | Free Word Guess Worksheet Maker | free-word-guess-maker | free hangman worksheet generator |
| 10 | Free Word Scramble Maker | free-word-scramble-maker | free word scramble generator |
| 11 | Free Word Search Maker | free-word-search-maker | free word search generator |
| 12 | Free Cryptogram Maker | free-cryptogram-maker | free cryptogram puzzle generator |
| 13 | Free Handwriting Worksheet Maker | free-handwriting-worksheet-maker | free handwriting practice generator |
| 14 | Free Big & Small Worksheet Maker | free-big-and-small-worksheet-maker | free size comparison worksheet |
| 15 | Free Pattern Train Maker | free-pattern-train-maker | free pattern worksheet generator |
| 16 | Free Pattern Worksheet Maker | free-pattern-worksheet-maker | free pattern recognition worksheet |
| 17 | Free Draw & Color Worksheet Maker | free-draw-and-color-maker | free drawing worksheet generator |
| 18 | Free Drawing Lines Worksheet Maker | free-drawing-lines-maker | free line tracing worksheet |
| 19 | Free Coloring Page Maker | free-coloring-page-maker | free coloring page generator |
| 20 | Free Chart Count Worksheet Maker | free-chart-count-maker | free picture graph worksheet |
| 21 | Free Matching Worksheet Maker | free-matching-worksheet-maker | free matching worksheet generator |
| 22 | Free Grid Match Maker | free-grid-match-maker | free grid matching worksheet |
| 23 | Free Shadow Match Maker | free-shadow-match-maker | free shadow matching worksheet |
| 24 | Free Bingo Card Maker | free-bingo-card-maker | free picture bingo card generator |
| 25 | Free Picture Sort Maker | free-picture-sort-maker | free sorting worksheet generator |
| 26 | Free Missing Pieces Puzzle Maker | free-missing-pieces-maker | free jigsaw puzzle worksheet |
| 27 | Free Odd One Out Maker | free-odd-one-out-maker | free odd one out worksheet |
| 28 | Free Picture Sudoku Maker | free-sudoku-maker | free picture sudoku for kids |
| 29 | Free Picture Path Maze Maker | free-picture-path-maker | free maze worksheet generator |
| 30 | Free Find & Count Maker | free-find-and-count-maker | free I spy worksheet generator |
| 31 | Free Hidden Object Maker | free-hidden-object-maker | free hidden object worksheet |
| 32 | Free Crossword Puzzle Maker | free-crossword-maker | free picture crossword generator |
| 33 | Free Treasure Hunt Maker | free-treasure-hunt-maker | free treasure hunt worksheet |

### File Structure
```
frontend/app/[locale]/tools/[tool]/page.tsx    -- Template (new)
frontend/config/tool-content/
  types.ts
  index.ts
  en/free-addition-worksheet-maker.ts
  en/free-subtraction-worksheet-maker.ts
  ... (33 per locale x 11 locales)
```

---

## 6. PAGE TYPE 3: BUNDLE SALES PAGES (6 bundles x 11 locales = 66 pages)

### Purpose
Dedicated sales pages for 6 category bundles. Each showcases all apps in the category, demonstrates value of the bundle over individual purchases, and drives conversions.

### Route: `/{locale}/bundles/{localized-slug}`

### Word Count Breakdown (3,300 words)

| Section | Words |
|---------|-------|
| Hero (bundle name, value proposition, CTA) | 250 |
| What's Included (list of apps with 100-word summaries each) | 700 |
| Bundle Benefits (6-8 benefits of buying the bundle) | 500 |
| Business Use Cases (5-6 scenarios using multiple apps together) | 600 |
| Feature Comparison (Commercial Pack vs Full Access) | 300 |
| Who Is This For (4 audience segments) | 300 |
| FAQ (8-10 bundle-specific questions + 1 mandatory refund policy Q&A) | 500 |
| Social Proof / Trust Signals | 150 |

### All 6 Bundle Pages

| # | Bundle | Slug (English) | Apps Included | App Count |
|---|--------|---------------|---------------|-----------|
| 1 | Math Mastery Bundle | math-mastery-bundle | Addition, Subtraction, Code Addition, More or Less, Math Puzzle, Math Worksheet | 6 |
| 2 | Literacy & Language Bundle | literacy-language-bundle | Alphabet Train, Prepositions, Word Guess, Word Scramble, Word Search, Cryptogram, Writing | 7 |
| 3 | Visual Learning Bundle | visual-learning-bundle | Big & Small, Pattern Train, Pattern Worksheet, Draw & Color, Drawing Lines, Coloring, Chart Count | 7 |
| 4 | Matching & Sorting Bundle | matching-sorting-bundle | Matching, Grid Match, Shadow Match, Bingo, Picture Sort | 5 |
| 5 | Puzzles & Logic Bundle | puzzles-logic-bundle | Missing Pieces, Odd One Out, Sudoku, Picture Path | 4 |
| 6 | Search & Find Bundle | search-find-bundle | Find & Count, Find Objects, Crossword, Treasure Hunt | 4 |

### File Structure
```
frontend/app/[locale]/bundles/page.tsx           -- Bundles listing (new)
frontend/app/[locale]/bundles/[bundle]/page.tsx  -- Bundle detail (new)
frontend/config/bundle-content/
  types.ts
  index.ts
  en/math-mastery-bundle.ts
  ... (6 per locale x 11 locales)
```

---

## 7. PAGE TYPE 4: BUSINESS CORNERSTONE GUIDES (12 guides x 11 locales = 132 pages)

### Purpose
Pillar content pages targeting high-volume "how to start a printable business" keywords. These are the authority pages that build topical relevance for the entire domain.

### Route: `/{locale}/start/{localized-slug}`

### Word Count Breakdown (3,500+ words)

| Section | Words |
|---------|-------|
| Hero (guide title, what you'll learn, reading time) | 200 |
| Introduction (problem/opportunity statement) | 300 |
| Main Content (8-12 sections with detailed guidance) | 1,800 |
| Action Steps (numbered checklist) | 300 |
| Tools Recommended (our apps as solutions) | 300 |
| FAQ (6-8 questions + 1 mandatory refund policy Q&A) | 400 |
| Next Steps / Related Guides | 200 |

### All 12 Cornerstone Guides

| # | Guide Title | Slug | Target Keyword |
|---|-------------|------|----------------|
| 1 | The Complete Guide to Starting a Printable Business | complete-guide-printable-business | how to start a printable business |
| 2 | How to Create Professional Worksheets That Sell | create-worksheets-that-sell | how to create worksheets to sell |
| 3 | The Printable Business Blueprint: From Idea to Income | printable-business-blueprint | printable business ideas |
| 4 | Etsy Printable Business Masterclass | etsy-printable-business | sell printables on etsy |
| 5 | Amazon KDP Activity Book Business Guide | amazon-kdp-activity-books | how to sell activity books on amazon |
| 6 | How to Create Worksheets in 11 Languages | create-multilingual-worksheets | multilingual worksheet generator |
| 7 | The Commercial License Guide for Printable Sellers | commercial-license-guide | commercial use printable license |
| 8 | Printable Business Income: Realistic Expectations | printable-business-income | how much can you make selling printables |
| 9 | Essential Tools for Printable Business Owners | tools-for-printable-business | best tools for printable sellers |
| 10 | Marketing Your Printable Business Online | marketing-printable-business | how to market printable worksheets |
| 11 | Scaling from Side Hustle to Full-Time Printable Business | scaling-printable-business | scale printable business |
| 12 | Printable Business Taxes and Legal Basics | printable-business-legal | selling printables tax requirements |

### File Structure
```
frontend/app/[locale]/start/page.tsx             -- Cornerstone hub (new)
frontend/app/[locale]/start/[slug]/page.tsx      -- Individual guide (new)
frontend/config/start-content/
  types.ts
  index.ts
  en/complete-guide-printable-business.ts
  ... (12 per locale x 11 locales)
```

---

## 8. PAGE TYPE 5: "CREATE X" GUIDES (65 guides x 11 locales = 715 pages)

### Purpose
Mid-funnel content targeting "how to create/sell [specific product]" keywords. Each guide teaches how to create a specific product type using our tools, then naturally links to the relevant app.

### Route: `/{locale}/guides/{localized-slug}`

### Word Count Breakdown (3,200 words)

| Section | Words |
|---------|-------|
| Hero (guide title, what you'll learn) | 150 |
| Introduction (market opportunity) | 250 |
| Step-by-Step Tutorial (8-10 steps) | 1,000 |
| Platform-Specific Tips (publishing/listing advice) | 400 |
| Monetization Strategies (pricing, bundling, marketing) | 400 |
| Examples & Inspiration | 400 |
| FAQ (5-7 questions + 1 mandatory refund policy Q&A) | 400 |
| Related Guides + Tool Links | 200 |

### All 65 Guide Topics

#### Platform Guides (20)

| # | Guide Title | Slug |
|---|-------------|------|
| 1 | How to Sell Math Worksheets on Etsy | sell-math-worksheets-etsy |
| 2 | How to Sell Word Search Puzzles on Etsy | sell-word-search-etsy |
| 3 | How to Start an Etsy Printable Shop from Scratch | start-etsy-printable-shop |
| 4 | How to Create Best-Selling Etsy Coloring Pages | create-etsy-coloring-pages |
| 5 | How to Sell Educational Printables on Etsy | sell-educational-printables-etsy |
| 6 | How to Price Your Etsy Printable Worksheets | price-etsy-printables |
| 7 | Etsy SEO for Educational Printables | etsy-seo-educational-printables |
| 8 | How to Create Etsy Worksheet Bundles | create-etsy-worksheet-bundles |
| 9 | How to Create Math Activity Books for Amazon KDP | math-activity-books-kdp |
| 10 | How to Publish Puzzle Books on Amazon KDP | publish-puzzle-books-kdp |
| 11 | How to Create Word Search Books for Amazon KDP | word-search-books-kdp |
| 12 | How to Make Money with KDP Activity Books | make-money-kdp-activity-books |
| 13 | KDP Formatting Guide for Worksheet Books | kdp-formatting-worksheets |
| 14 | Best-Selling KDP Activity Book Niches | best-kdp-activity-book-niches |
| 15 | How to Create Sudoku Books for Amazon KDP | sudoku-books-kdp |
| 16 | Amazon KDP vs Etsy: Where to Sell Printables | kdp-vs-etsy-printables |
| 17 | How to Create and Sell TPT Resources | create-sell-tpt-resources |
| 18 | TPT Store Setup and Optimization Guide | tpt-store-optimization |
| 19 | How to Sell Printables on Gumroad | sell-printables-gumroad |
| 20 | How to Sell Educational Resources on Creative Fabrica | sell-creative-fabrica |

#### Product Creation Guides (25)

| # | Guide Title | Slug |
|---|-------------|------|
| 21 | How to Create Addition Worksheets for Kids | create-addition-worksheets |
| 22 | How to Create Subtraction Worksheets for Kids | create-subtraction-worksheets |
| 23 | How to Create Word Search Puzzles with Images | create-word-search-puzzles |
| 24 | How to Create Crossword Puzzles for Children | create-crossword-puzzles |
| 25 | How to Create Math Puzzle Worksheets | create-math-puzzle-worksheets |
| 26 | How to Create Handwriting Practice Sheets | create-handwriting-sheets |
| 27 | How to Create Coloring Pages from Themed Images | create-coloring-pages |
| 28 | How to Create Picture Bingo Cards for Events | create-bingo-cards |
| 29 | How to Create Matching Worksheets for Preschool | create-matching-worksheets |
| 30 | How to Create Pattern Recognition Worksheets | create-pattern-worksheets |
| 31 | How to Create Picture Sudoku for Young Learners | create-picture-sudoku |
| 32 | How to Create Maze Worksheets and Activity Sheets | create-maze-worksheets |
| 33 | How to Create Hidden Object Scene Worksheets | create-hidden-object-worksheets |
| 34 | How to Create Size Comparison Worksheets | create-size-comparison-worksheets |
| 35 | How to Create Counting and Graphing Worksheets | create-counting-worksheets |
| 36 | How to Create Drawing and Symmetry Worksheets | create-drawing-worksheets |
| 37 | How to Create Category Sorting Worksheets | create-sorting-worksheets |
| 38 | How to Create Shadow Matching Worksheets | create-shadow-matching-worksheets |
| 39 | How to Create Odd One Out Puzzles for Kids | create-odd-one-out-puzzles |
| 40 | How to Create Missing Pieces Puzzle Worksheets | create-missing-pieces-puzzles |
| 41 | How to Create Treasure Hunt Activity Worksheets | create-treasure-hunt-worksheets |
| 42 | How to Create Alphabet Learning Worksheets | create-alphabet-worksheets |
| 43 | How to Create Preposition Worksheets for ESL | create-preposition-worksheets |
| 44 | How to Create Cryptogram Puzzles for Kids | create-cryptogram-puzzles |
| 45 | How to Create Picture Graph and Chart Worksheets | create-chart-count-worksheets |

#### Business Strategy Guides (20)

| # | Guide Title | Slug |
|---|-------------|------|
| 46 | How to Create Worksheet Bundles That Sell | create-worksheet-bundles |
| 47 | Niche Selection Guide for Printable Businesses | niche-selection-printables |
| 48 | How to Create a Printable Product Line | create-printable-product-line |
| 49 | Pricing Strategies for Educational Printables | pricing-educational-printables |
| 50 | How to Scale Your Printable Business | scale-printable-business-guide |
| 51 | Creating Passive Income with Worksheets | passive-income-worksheets |
| 52 | Understanding Commercial Use Licenses | understanding-commercial-licenses |
| 53 | How to Research Profitable Printable Niches | research-profitable-niches |
| 54 | The Multilingual Printable Business Opportunity | multilingual-printable-business |
| 55 | How to Create Worksheets in Multiple Languages | worksheets-multiple-languages |
| 56 | Copyright Basics for Printable Sellers | copyright-printable-sellers |
| 57 | Customer Support for Digital Product Businesses | customer-support-digital-products |
| 58 | How to Automate Your Printable Business | automate-printable-business |
| 59 | Social Media Marketing for Printable Sellers | social-media-printable-marketing |
| 60 | Pinterest Marketing for Worksheet Businesses | pinterest-marketing-worksheets |
| 61 | Email Marketing for Printable Product Sellers | email-marketing-printables |
| 62 | How to Get Reviews for Printable Products | get-reviews-printable-products |
| 63 | Seasonal Marketing Calendar for Printable Sellers | seasonal-marketing-printables |
| 64 | Digital vs Physical Printable Products | digital-vs-physical-printables |
| 65 | Quality Standards for Professional Worksheets | quality-standards-worksheets |

### File Structure
```
frontend/app/[locale]/guides/page.tsx             -- Guides listing/hub (new)
frontend/app/[locale]/guides/[slug]/page.tsx      -- Individual guide (new)
frontend/config/guide-content/
  types.ts
  index.ts
  en/sell-math-worksheets-etsy.ts
  ... (65 per locale x 11 locales)
```

---

## 9. PAGE TYPE 6: NICHE/THEME IDEA PAGES (45 pages x 11 locales = 495 pages)

### Purpose
Bottom-of-funnel content targeting "[niche] printable business ideas" keywords. Each page explores a specific theme/niche and shows how to build a business around it using our tools.

### Route: `/{locale}/ideas/{localized-slug}`

### Word Count Breakdown (3,100 words)

| Section | Words |
|---------|-------|
| Hero (niche title, opportunity teaser) | 150 |
| Market Overview (why this niche works) | 300 |
| Product Ideas (8-10 specific products to create) | 800 |
| How to Create (step-by-step with our tools) | 500 |
| Platform Selling Tips (where to sell this niche) | 400 |
| Pricing & Bundling Ideas | 300 |
| FAQ (5-7 niche-specific questions + 1 mandatory refund policy Q&A) | 400 |
| Related Niches + Tool Links | 250 |

### All 45 Niche/Theme Idea Pages

#### Animals & Nature (8)

| # | Page Title | Slug |
|---|-----------|------|
| 1 | Farm Animals Printable Business Ideas | farm-animals-printable-ideas |
| 2 | Ocean Animals Printable Business Ideas | ocean-animals-printable-ideas |
| 3 | Safari Animals Printable Business Ideas | safari-animals-printable-ideas |
| 4 | Pets Printable Business Ideas | pets-printable-ideas |
| 5 | Dinosaur Printable Business Ideas | dinosaur-printable-ideas |
| 6 | Birds Printable Business Ideas | birds-printable-ideas |
| 7 | Insects Printable Business Ideas | insects-printable-ideas |
| 8 | Forest Animals Printable Business Ideas | forest-animals-printable-ideas |

#### Seasons & Holidays (10)

| # | Page Title | Slug |
|---|-----------|------|
| 9 | Christmas Printable Business Ideas | christmas-printable-ideas |
| 10 | Halloween Printable Business Ideas | halloween-printable-ideas |
| 11 | Easter Printable Business Ideas | easter-printable-ideas |
| 12 | Valentine's Day Printable Business Ideas | valentines-day-printable-ideas |
| 13 | Back to School Printable Business Ideas | back-to-school-printable-ideas |
| 14 | Summer Printable Business Ideas | summer-printable-ideas |
| 15 | Winter Printable Business Ideas | winter-printable-ideas |
| 16 | Spring Printable Business Ideas | spring-printable-ideas |
| 17 | Thanksgiving Printable Business Ideas | thanksgiving-printable-ideas |
| 18 | Mother's & Father's Day Printable Ideas | parents-day-printable-ideas |

#### Interests & Activities (10)

| # | Page Title | Slug |
|---|-----------|------|
| 19 | Space Printable Business Ideas | space-printable-ideas |
| 20 | Transportation Printable Business Ideas | transportation-printable-ideas |
| 21 | Food & Cooking Printable Business Ideas | food-cooking-printable-ideas |
| 22 | Sports Printable Business Ideas | sports-printable-ideas |
| 23 | Music Printable Business Ideas | music-printable-ideas |
| 24 | Construction Printable Business Ideas | construction-printable-ideas |
| 25 | Pirates Printable Business Ideas | pirates-printable-ideas |
| 26 | Fairy Tale Printable Business Ideas | fairy-tale-printable-ideas |
| 27 | Camping Printable Business Ideas | camping-printable-ideas |
| 28 | Underwater Printable Business Ideas | underwater-printable-ideas |

#### Educational Focus (10)

| # | Page Title | Slug |
|---|-----------|------|
| 29 | Preschool Printable Business Ideas | preschool-printable-ideas |
| 30 | Kindergarten Printable Business Ideas | kindergarten-printable-ideas |
| 31 | First Grade Printable Business Ideas | first-grade-printable-ideas |
| 32 | Second Grade Printable Business Ideas | second-grade-printable-ideas |
| 33 | Third Grade Printable Business Ideas | third-grade-printable-ideas |
| 34 | Homeschool Printable Business Ideas | homeschool-printable-ideas |
| 35 | Special Education Printable Business Ideas | special-education-printable-ideas |
| 36 | ESL Printable Business Ideas | esl-printable-ideas |
| 37 | Summer Learning Printable Business Ideas | summer-learning-printable-ideas |
| 38 | Math Facts Printable Business Ideas | math-facts-printable-ideas |

#### Business Models (7)

| # | Page Title | Slug |
|---|-----------|------|
| 39 | Worksheet Subscription Box Business Ideas | subscription-box-printable-ideas |
| 40 | Print-on-Demand Worksheet Business Ideas | print-on-demand-printable-ideas |
| 41 | Digital Download Printable Business Ideas | digital-download-printable-ideas |
| 42 | Physical Printable Product Business Ideas | physical-printable-product-ideas |
| 43 | Printable Party Supply Business Ideas | party-supply-printable-ideas |
| 44 | Custom Worksheet Service Business Ideas | custom-worksheet-service-ideas |
| 45 | Bulk Licensing Printable Business Ideas | bulk-licensing-printable-ideas |

### File Structure
```
frontend/app/[locale]/ideas/page.tsx             -- Ideas hub (new)
frontend/app/[locale]/ideas/[slug]/page.tsx      -- Individual idea page (new)
frontend/config/idea-content/
  types.ts
  index.ts
  en/farm-animals-printable-ideas.ts
  ... (45 per locale x 11 locales)
```

---

## 10. URL & SLUG STRATEGY

### Why Localized Slugs
- **SEO:** Users search in their language — `/de/tools/kostenloser-additions-arbeitsblatt-ersteller` targets "kostenloser additions arbeitsblatt" naturally
- **CTR:** Native-language URLs feel trustworthy in SERPs (higher click-through rates)
- **Consistency:** App detail pages already use localized slugs via `product-page-slugs.ts`
- **Google recommendation:** Translated URLs are a positive signal for international SEO

### How It Works

**Internal identifier (file name) = English slug always.** This is the key used in content file names, imports, and cross-references.

**URL slug = localized per language.** Stored in a slug config file per page type, following the exact pattern of `product-page-slugs.ts`.

Example for Free Tool "free-addition-worksheet-maker":

| Locale | URL |
|--------|-----|
| en | `/en/tools/free-addition-worksheet-maker` |
| de | `/de/tools/kostenloser-additions-arbeitsblatt-ersteller` |
| fr | `/fr/tools/generateur-gratuit-fiches-addition` |
| es | `/es/tools/generador-gratuito-fichas-suma` |
| it | `/it/tools/generatore-gratuito-schede-addizione` |
| pt | `/pt/tools/gerador-gratuito-fichas-adicao` |
| nl | `/nl/tools/gratis-optellen-werkblad-maker` |
| sv | `/sv/tools/gratis-additions-arbetsblad-skapare` |
| da | `/da/tools/gratis-additions-arbejdsark-maker` |
| no | `/no/tools/gratis-addisjons-arbeidsark-lager` |
| fi | `/fi/tools/ilmainen-yhteenlasku-tyoarkki-luoja` |

### Slug Config Files (One Per Page Type)

| Page Type | Slug Config File | Existing? |
|-----------|-----------------|-----------|
| App Detail | `frontend/config/product-page-slugs.ts` | YES (already done) |
| Free Tools | `frontend/config/tool-page-slugs.ts` | CREATE in Phase 0 |
| Bundles | `frontend/config/bundle-page-slugs.ts` | CREATE in Phase 0 |
| Cornerstone Guides | `frontend/config/start-page-slugs.ts` | CREATE in Phase 0 |
| Create X Guides | `frontend/config/guide-page-slugs.ts` | CREATE in Phase 0 |
| Niche Ideas | `frontend/config/idea-page-slugs.ts` | CREATE in Phase 0 |

### Slug Config File Structure (Exact Pattern of product-page-slugs.ts)

Each slug config file MUST include ALL 5 helper functions — these are battle-tested and prevent mismatches:

```typescript
// Example: frontend/config/tool-page-slugs.ts
export interface ToolSlugConfig {
  toolId: string;  // Internal identifier (English slug)
  slugs: {
    en: string;
    de?: string;
    fr?: string;
    es?: string;
    it?: string;
    pt?: string;
    nl?: string;
    da?: string;
    sv?: string;
    no?: string;
    fi?: string;
  };
}

export const toolPageSlugs: ToolSlugConfig[] = [
  {
    toolId: 'free-addition-worksheet-maker',
    slugs: {
      en: 'free-addition-worksheet-maker',
      de: 'kostenloser-additions-arbeitsblatt-ersteller',
      fr: 'generateur-gratuit-fiches-addition',
      // ... all 11 locales
    },
  },
  // ... 33 tools
];

// REQUIRED HELPER FUNCTION 1: Internal ID -> localized slug (with English fallback)
export function getToolSlugForLocale(toolId: string, locale: SupportedLocale): string | undefined {
  const config = toolPageSlugs.find(c => c.toolId === toolId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en;
}

// REQUIRED HELPER FUNCTION 2: Any slug (any language) -> { toolId, locale }
export function getToolConfigBySlug(slug: string): { toolId: string; locale: SupportedLocale } | undefined {
  for (const config of toolPageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { toolId: config.toolId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

// REQUIRED HELPER FUNCTION 3: All slug+locale pairs for generateStaticParams()
export function getAllToolPageSlugs(): { locale: SupportedLocale; slug: string }[] { ... }

// REQUIRED HELPER FUNCTION 4: hreflang alternates for all locales
export function getToolAlternateUrls(toolId: string, baseUrl?: string): Record<string, string> { ... }

// REQUIRED HELPER FUNCTION 5: Validate slug belongs to specific locale
export function hasToolPage(slug: string, locale: SupportedLocale): boolean { ... }
```

### Middleware Redirect Protection (3-Layer System)

The existing `middleware.ts` (lines 11-51) builds **3 redirect maps** at startup from `productPageSlugs` to prevent slug/locale mismatches. **Every new page type MUST replicate this exact pattern.**

For each new page type, middleware needs:

**Map 1: Legacy/Internal ID -> Localized Slug Redirect**
- Catches: `/de/tools/free-addition-worksheet-maker` (internal ID used as slug)
- Redirects to: `/de/tools/kostenloser-additions-arbeitsblatt-ersteller`
- Status: 301

**Map 2: English Slug -> Correct Locale Slug Redirect**
- Catches: `/de/tools/free-addition-worksheet-maker` (English slug on non-English locale)
- Redirects to: `/de/tools/kostenloser-additions-arbeitsblatt-ersteller`
- Status: 301

**Map 3: Cross-Locale Slug -> Correct Locale Slug Redirect**
- Catches: `/sv/tools/gratis-addisjons-arbeidsark-lager` (Norwegian slug on Swedish locale)
- Redirects to: `/sv/tools/gratis-additions-arbetsblad-skapare`
- Status: 301

**Implementation in middleware.ts:**
```typescript
// At top of file -- import ALL slug configs
import { toolPageSlugs } from './config/tool-page-slugs';
import { bundlePageSlugs } from './config/bundle-page-slugs';
import { startPageSlugs } from './config/start-page-slugs';
import { guidePageSlugs } from './config/guide-page-slugs';
import { ideaPageSlugs } from './config/idea-page-slugs';

// Build redirect maps for EACH page type (same pattern as apps)
// ... (5 page types x 3 maps = 15 redirect maps built at startup)

// In middleware() function -- add route matching for each segment:
// /[locale]/tools/[slug]  -> check 3 tool maps
// /[locale]/bundles/[slug] -> check 3 bundle maps
// /[locale]/start/[slug]  -> check 3 start maps
// /[locale]/guides/[slug] -> check 3 guide maps
// /[locale]/ideas/[slug]  -> check 3 idea maps
```

**Phase 0 MUST include middleware updates for all 5 new page types.**

### Slug Creation Timeline
1. **Phase 0:** Create slug config files with English slugs only (all `de`, `fr`, etc. fields left as `undefined`). Add middleware redirect maps for all 5 new page types.
2. **Phase 1-6 (English content):** English slugs already in config — no changes needed. English fallback handles all locales.
3. **Phase 7-16 (Translation phases):** When starting a new language, FIRST populate all slug fields for that language in ALL 5 slug config files, THEN create content files. This ensures routing + redirects work before content is deployed.

### Slug Translation Rules (from existing scripts/slug-utils.js)
- Slugs must be **lowercase, hyphenated, no diacritics** (URL-safe): `arbeitsblaetter` not `arbeitsblatter`
- Transliteration rules: a->ae, o->oe, u->ue, ss->ss, n->n, c->c, a->a, o->o, etc. (use `normalizeSlug()` from `scripts/slug-utils.js`)
- Regex validation: `/^[a-z0-9]+(-[a-z0-9]+)*$/` — no leading/trailing hyphens, no consecutive hyphens
- Use the language's natural word for the concept, not a transliteration of English
- Keep slug length under 60 characters
- Include the primary target keyword for that language
- The route segment (`/tools/`, `/bundles/`, `/start/`, `/guides/`, `/ideas/`) stays in English across all locales (consistent with `/apps/` pattern)

### Fallback Behavior
If a locale slug is `undefined`, the page uses the English slug as fallback via `config.slugs[locale] || config.slugs.en`. This means pages work immediately in English during Phase 1-6, and non-English slugs activate as translations are added.

### Slug Verification Script (Phase 0)
Create `scripts/verify-all-slugs.js` that:
1. Loads ALL 6 slug config files
2. Validates every slug against `isValidSlug()` regex
3. Checks for duplicate slugs ACROSS page types (e.g., a guide slug that collides with a tool slug)
4. Checks that every slug for a given locale actually contains words from that language (not untranslated English)
5. Verifies no diacritics leak into any slug
6. Run this script BEFORE every build during translation phases

---

## 11. REFERENCE TABLES

### 11.1 Complete App Feature Matrix

| # | App | Category | Creates | Uses Images? | Lang-Sensitive? | Answer Key? | Special Features |
|---|-----|----------|---------|-------------|-----------------|-------------|-----------------|
| 1 | Addition | Math | Image-based addition worksheets | YES | NO | YES | Multiple modes (image-number, find-addend, mixed); number range config |
| 2 | Subtraction | Math | Image-based subtraction worksheets | YES | NO | YES | Crossed-out images for subtraction; mirrors Addition app |
| 3 | Code Addition | Math | Addition worksheets that decode words | YES | YES | YES | Math + word reveal hybrid; letter-number code mapping |
| 4 | More or Less | Math | Greater/less than comparison worksheets | YES | NO | YES | >, <, = comparisons; image-based counting; check/cross modes |
| 5 | Math Puzzle | Math | Math puzzle grid worksheets | YES | NO | YES | Puzzle grid format; multiple difficulty levels |
| 6 | Math Worksheet | Math | Traditional math problem worksheets | NO | NO | YES | Pure math (+, -, x, /); the ONLY app without image library |
| 7 | Alphabet Train | Literacy | Train-car letter + image worksheets | YES | YES | NO | Letter selection; train car layout; letter-image matching |
| 8 | Prepositions | Literacy | Spatial relationship worksheets | YES | YES | YES | Position words (on, under, above); localized preposition text |
| 9 | Word Guess | Literacy | Image clue word guessing worksheets | YES | YES | YES | Blank letter grid; image clues; difficulty with letter reveals |
| 10 | Word Scramble | Literacy | Unscramble letters worksheets | YES | YES | YES | Shuffled letter tiles; image clues; answer grid |
| 11 | Word Search | Literacy | Word search grid puzzles | YES | YES | YES | Grid algorithm; image clues; multiple search directions |
| 12 | Cryptogram | Literacy | Image-coded cipher puzzles | YES | YES | YES | Letter-to-image cipher; reveal count setting |
| 13 | Writing | Literacy | Handwriting practice worksheets | YES | NO | NO | Trace/fading/guided modes; print/cursive/arrow fonts; pre-writing strokes |
| 14 | Big & Small | Visual | Size comparison worksheets | YES | NO | YES | Compare sizes of themed images; multiple exercise modes |
| 15 | Pattern Train | Visual | Pattern recognition train worksheets | YES | NO | NO | Train car sequences; missing pattern items |
| 16 | Pattern Worksheet | Visual | Pattern completion worksheets | YES | NO | YES | Multiple pattern types; fill-in-the-blank |
| 17 | Draw & Color | Visual | Grid-based drawing/symmetry worksheets | YES | NO | NO | Reference image drawing; symmetry/mirror mode |
| 18 | Drawing Lines | Visual | Line-tracing worksheets | YES | NO | NO | Pair table; straight/curved/zigzag line styles |
| 19 | Coloring | Visual | Coloring page worksheets | YES | NO | NO | Image outline conversion; text overlay controls |
| 20 | Chart Count | Visual | Picture graph/chart worksheets | YES | NO | YES | Bar chart/pictograph styles; counting questions |
| 21 | Matching | Matching | Draw-a-line matching worksheets | YES | YES | YES | 4 modes: letter, image-name, image-or-first-name, custom |
| 22 | Grid Match | Matching | Grid-based matching worksheets | YES | NO | YES | Coordinate-based matching; grid layout |
| 23 | Shadow Match | Matching | Image-to-silhouette matching | YES | NO | YES | Silhouette auto-generation; draw-line format |
| 24 | Bingo | Matching | Picture bingo cards | YES | YES | NO | Batch export (ZIP); multiple unique cards; optional labels |
| 25 | Picture Sort | Matching | Category sorting worksheets | YES | YES | YES | Two-category sorting; left/right theme selectors |
| 26 | Missing Pieces | Puzzles | Jigsaw-style missing piece puzzles | YES | NO | YES | Image grid split; pieces removed; multiple grid sizes |
| 27 | Odd One Out | Puzzles | Find the different item worksheets | YES | NO | YES | Rows with one different; per-row mode selection |
| 28 | Sudoku | Puzzles | Visual sudoku puzzles (4x4) | YES | NO | YES | Images instead of numbers; difficulty levels |
| 29 | Picture Path | Puzzles | Maze/pathway worksheets | YES | NO | YES | 3 modes: pathway, classic-maze, choose-path |
| 30 | Find & Count | Search | I Spy / Find and Count worksheets | YES | YES | YES | Scattered image scenes; localized image name labels |
| 31 | Find Objects | Search | Hidden object scene worksheets | YES | NO | YES | Scene generation; hidden/distractor images; difficulty settings |
| 32 | Crossword | Search | Image-based crossword puzzles | YES | YES | YES | Crossword grid algorithm; image clues with word answers |
| 33 | Treasure Hunt | Search | Number grid treasure hunt worksheets | YES | YES | YES | Number grid board game; path finding with math |

### 11.2 Universal Features (All 33 Apps)
- PDF export at 300 DPI (print-ready, US Letter + A4)
- Free to use with watermark (no signup required)
- Full editing of all generated elements on canvas
- 11-language UI support (interface labels and controls)
- Image library integration with theme browsing + search (32/33 — Math Worksheet is the exception)

### 11.3 Per-App Image Library Usage
- **32 apps** connect to the image library API (`/api/images` or `/api/multilingual-images`)
- **2 apps** additionally load `image-vocabulary.js` for localized word lookup: Find & Count, Prepositions
- **1 app** (Math Worksheet) does NOT use the image library — it's pure number-based math

### 11.4 YouTube Tutorial Video IDs

Every app has a tutorial video on YouTube. Use these IDs for facade embeds on all page types.

| # | App ID | App Name | YouTube Video ID |
|---|--------|----------|-----------------|
| 1 | `addition` | Addition | `6O5aCzHkh8M` |
| 2 | `subtraction` | Subtraction | `til2mrWMUxk` |
| 3 | `code-addition` | Code Addition | `vVd11Kjk9iA` |
| 4 | `more-less` | More or Less | `eNguG63nYVs` |
| 5 | `math-puzzle` | Math Puzzle | `n5QO39Lq5l8` |
| 6 | `math-worksheet` | Math Worksheet | `-JIawojGNr0` |
| 7 | `alphabet-train` | Alphabet Train | `_dDQegRq9JQ` |
| 8 | `prepositions` | Prepositions | `ifIXbViR5_o` |
| 9 | `word-guess` | Word Guess | `DSwX_p4dRNM` |
| 10 | `word-scramble` | Word Scramble | `Hc3g5VsSHEU` |
| 11 | `wordsearch` | Word Search | `36keBFzJbPo` |
| 12 | `cryptogram` | Cryptogram | `9U0BIIjCnco` |
| 13 | `writing` | Writing | `0b4WglqyXu0` |
| 14 | `big-small` | Big & Small | `S2s2U6Nb7FI` |
| 15 | `pattern-train` | Pattern Train | `5A4aHvcC5u4` |
| 16 | `pattern-worksheet` | Pattern Worksheet | `W94X5_RA3ug` |
| 17 | `draw-and-color` | Draw & Color | `1uZubAOGIkM` |
| 18 | `drawing-lines` | Drawing Lines | `P9q3ymjFnOQ` |
| 19 | `coloring` | Coloring | `ZdpCr2txHcc` |
| 20 | `chart-count` | Chart Count | `CDgIihDQX6U` |
| 21 | `matching` | Matching | `y3ghkjt_67s` |
| 22 | `grid-match` | Grid Match | `RGtED1Bnut8` |
| 23 | `shadow-match` | Shadow Match | `TYvUXJeMI98` |
| 24 | `bingo` | Bingo | `d6AOiDXoK1c` |
| 25 | `picture-sort` | Picture Sort | `9kzmlABtNVQ` |
| 26 | `missing-pieces` | Missing Pieces | `gb-xE_Ay4fc` |
| 27 | `odd-one-out` | Odd One Out | `0R6WFUfY7Mk` |
| 28 | `sudoku` | Sudoku | `bqVioFbkYbA` |
| 29 | `picture-path` | Picture Path | `Sl1o0uPBDCg` |
| 30 | `find-and-count` | Find & Count | `0cOPi7eajLs` |
| 31 | `find-objects` | Find Objects | `8Y3jrVr1Phs` |
| 32 | `crossword` | Crossword | `b3WKDrzif-w` |
| 33 | `treasure-hunt` | Treasure Hunt | `flHiBXsYLLA` |

### 11.5 Video Mapping for Page Types 4-6

**Page Type 4 — Cornerstone Guide Video Assignments:**

| Guide Topic | Primary Video | Video ID | Why This Video |
|-------------|--------------|----------|----------------|
| Complete Guide to Printable Business | Word Search | `36keBFzJbPo` | Most universally appealing demo |
| Create Worksheets That Sell | Addition | `6O5aCzHkh8M` | Shows the full creation flow |
| Printable Business Blueprint | Math Puzzle | `n5QO39Lq5l8` | Shows variety of output |
| Etsy Printable Business | Coloring | `ZdpCr2txHcc` | Etsy's top printable category |
| Amazon KDP Activity Books | Sudoku | `bqVioFbkYbA` | Classic activity book content |
| Create Multilingual Worksheets | Word Search | `36keBFzJbPo` | Best multi-language demo |
| Commercial License Guide | Word Search | `36keBFzJbPo` | Most popular app |
| Printable Business Income | Math Worksheet | `-JIawojGNr0` | Shows rapid creation |
| Tools for Printable Business | Matching | `y3ghkjt_67s` | Shows tool versatility |
| Marketing Printable Business | Bingo | `d6AOiDXoK1c` | Highly shareable product |
| Scaling Printable Business | Draw & Color | `1uZubAOGIkM` | Shows creative range |
| Printable Business Legal | Writing | `0b4WglqyXu0` | Educational context |

**Page Type 5 — "Create X" Guide Video Assignments:**
Each of the 25 product creation guides maps 1:1 to the specific app it teaches (e.g., "How to Create Addition Worksheets" uses `6O5aCzHkh8M`). The 20 platform guides and 20 business strategy guides each use the video of the most relevant app for their topic.

**Page Type 6 — Niche/Theme Idea Page Video Assignments:**
Each niche page uses the video of the app that best demonstrates content using that niche's theme. Examples:
- Farm Animals Printable Ideas -> Find & Count (`0cOPi7eajLs`) — showcases themed image scenes
- Ocean Life Activity Ideas -> Matching (`y3ghkjt_67s`) — demonstrates themed matching cards
- Space Theme Worksheet Ideas -> Coloring (`ZdpCr2txHcc`) — shows themed coloring pages
- Dinosaur Printable Ideas -> Shadow Match (`TYvUXJeMI98`) — engaging visual matching

The specific video assignment for each niche page is determined during content creation by evaluating which app creates the most visually compelling output for that theme.

### 11.6 Visual Assets Infrastructure

#### Worksheet Samples

| Property | Value |
|----------|-------|
| **Local path (dev)** | `C:\Users\rkgen\lessoncraftstudio\samples\` |
| **Server path (prod)** | `/var/www/lcs-media/samples/` (nginx-served, isolated storage) |
| **URL pattern** | `/samples/{language-folder}/{app-folder}/{filename}.jpeg` |
| **File types** | JPEG (worksheets + answer keys), PDF (downloadable) |

**11 language folders** (same folder names on local and server):
`english`, `german`, `french`, `spanish`, `italian`, `portuguese`, `dutch`, `danish`, `swedish`, `norwegian`, `finnish`

**Locale-to-folder mapping:** Defined in `frontend/config/locales.ts` as `LOCALE_TO_FOLDER`:

| Locale | Folder |
|--------|--------|
| en | english |
| de | german |
| fr | french |
| es | spanish |
| it | italian |
| pt | portuguese |
| nl | dutch |
| sv | swedish |
| da | danish |
| no | norwegian |
| fi | finnish |

**33 app subfolders per language** (same English folder names across ALL languages):
`addition`, `alphabet train`, `big small`, `bingo`, `chart count`, `code addition`, `coloring`, `crossword`, `cryptogram`, `draw and color`, `drawing lines`, `find and count`, `find objects`, `grid match`, `matching`, `math puzzle`, `math worksheet`, `missing pieces`, `more less`, `odd one out`, `pattern train`, `pattern worksheet`, `picture path`, `picture sort`, `prepositions`, `shadow match`, `subtraction`, `sudoku`, `treasure hunt`, `word guess`, `word scramble`, `wordsearch`, `writing`

**File naming conventions:**
- Localized per language (English: "Addition Fun 1.jpeg", Swedish: "addition_ovning.jpeg", German: "Worter suchen 1.jpeg")
- URL encoding required: spaces become `%20`, special chars become percent-encoded
- Answer keys: `{name} answer_key.jpeg`

#### Image Library

| Property | Value |
|----------|-------|
| **Local path (symlink)** | `C:\Users\rkgen\lessoncraftstudio\image library\` |
| **Server path (prod)** | `/var/www/lcs-media/image-library/` (isolated storage) |
| **URL pattern** | `/image-library/{theme-folder}/{image}.png` |
| **File type** | PNG only |
| **Language-independent** | Same PNG images for all locales; only `alt` text is localized |

**102 theme folders** including: animals, birds, dinosaurs, food, ocean life, space, vehicles, farm, insects, flowers, fruits, vegetables, sports, musical instruments, weather, and many more.

#### Git Protection

**NEVER commit, push, or deploy sample images or image library images to git.**

- `samples/` is in `.gitignore` — NEVER override
- `image library/` target is in `.gitignore` — NEVER override
- Images are ALREADY on the server in isolated storage — content files reference URL path strings only
- Upload directly to server if new images are needed (via API or pscp)
- Pre-commit hook blocks any attempt to add samples to git
- See CLAUDE.md for full 7-layer protection details

### 11.7 Content File Visual Schema

How content TypeScript files reference visuals:

```typescript
interface PageVisuals {
  heroImages: {
    primary: string;      // URL path to main sample image
    secondary?: string;   // URL path to answer key or variant
    primaryAlt: string;   // Localized alt text
    secondaryAlt?: string;
  };
  sampleGallery: Array<{
    src: string;          // URL path to sample image
    alt: string;          // Localized alt text
    caption?: string;     // Optional localized caption
  }>;
  themeImages?: Array<{   // Image library showcase
    src: string;          // URL path (/image-library/...)
    alt: string;          // Localized alt text
    theme: string;        // Theme folder name
  }>;
  youtubeId: string;      // REQUIRED — every page gets a video
  videoTitle: string;     // Localized video section title
}
```

### 11.8 Locale-Specific Marketplace References

When writing content for each locale, use these platform references:

| Locale | Primary Marketplaces | Currency | School System Terms |
|--------|---------------------|----------|-------------------|
| en | Etsy.com, Amazon KDP, TPT | USD/GBP | preschool, kindergarten, first grade |
| de | Etsy.de, Amazon.de KDP | EUR | Vorschule, Kindergarten, Grundschule |
| fr | Etsy.fr, Amazon.fr KDP | EUR | maternelle, CP, CE1 |
| es | Etsy.es, Amazon.es KDP | EUR | preescolar, primaria |
| pt | Etsy (global), Amazon.com.br KDP | BRL/EUR | pre-escola, ensino fundamental |
| it | Etsy.it, Amazon.it KDP | EUR | scuola dell'infanzia, primaria |
| nl | Etsy.nl, Bol.com | EUR | kleuterschool, basisschool |
| sv | Etsy (global), Amazon.se | SEK | forskola, lagstadiet |
| da | Etsy (global), Amazon (EU) | DKK | bornehaveklasse, indskoling |
| no | Etsy (global), Amazon (EU) | NOK | barnehage, barneskole |
| fi | Etsy (global), Amazon (EU) | EUR | esikoulu, peruskoulu |

---

## 12. KEY FILES & ARCHITECTURE

### 12.1 Existing Files (Read Only)

| File | Purpose |
|------|---------|
| `REFERENCE APPS/*.html` | 33 app HTML source files — verify features |
| `frontend/config/warriorplus-products.ts` | 33 apps, 6 categories — source of truth |
| `frontend/config/product-page-slugs.ts` | Localized app slugs |
| `frontend/config/app-translations.ts` | Localized app/category names |
| `frontend/lib/schema-generator.ts` | `generateFAQSchema()` for FAQ JSON-LD |
| `frontend/lib/default-product-faqs.ts` | 5 generic FAQs x 11 locales |

### 12.2 Files to Create/Modify

| File | Action |
|------|--------|
| **Slug Config Files** | |
| `frontend/config/product-page-slugs.ts` | EXISTS: app detail slugs (already localized) |
| `frontend/config/tool-page-slugs.ts` | CREATE: 33 tool slugs x 11 locales |
| `frontend/config/bundle-page-slugs.ts` | CREATE: 6 bundle slugs x 11 locales |
| `frontend/config/start-page-slugs.ts` | CREATE: 12 cornerstone guide slugs x 11 locales |
| `frontend/config/guide-page-slugs.ts` | CREATE: 65 guide slugs x 11 locales |
| `frontend/config/idea-page-slugs.ts` | CREATE: 45 idea page slugs x 11 locales |
| **Route Templates** | |
| `frontend/app/[locale]/apps/[slug]/page.tsx` | MODIFY: add enriched content sections |
| `frontend/app/[locale]/tools/[tool]/page.tsx` | CREATE: free tool landing template |
| `frontend/app/[locale]/bundles/[bundle]/page.tsx` | CREATE: bundle detail template |
| `frontend/app/[locale]/start/[slug]/page.tsx` | CREATE: cornerstone guide template |
| `frontend/app/[locale]/guides/[slug]/page.tsx` | CREATE: guide template |
| `frontend/app/[locale]/ideas/[slug]/page.tsx` | CREATE: idea page template |
| `frontend/app/sitemap.ts` | MODIFY: add all new routes |
| **Content Files** | |
| `frontend/config/app-content/**` | CREATE: 363 app content files |
| `frontend/config/tool-content/**` | CREATE: 363 tool content files |
| `frontend/config/bundle-content/**` | CREATE: 66 bundle content files |
| `frontend/config/start-content/**` | CREATE: 132 cornerstone content files |
| `frontend/config/guide-content/**` | CREATE: 715 guide content files |
| `frontend/config/idea-content/**` | CREATE: 495 idea content files |

### 12.3 Live Routes

| Route Pattern | Count | Purpose |
|---------------|-------|---------|
| `/{locale}` | 11 | Homepage |
| `/{locale}/apps` | 11 | Apps listing (33 apps, 6 categories) |
| `/{locale}/apps/{slug}` | 363 | App detail pages (33 x 11 locales, localized slugs) |
| `/{locale}/get/{product}` | 8 | WarriorPlus sales pages (EN only, standalone) |
| `/{locale}/about,contact,faq,terms,privacy,license` | 66 | Static pages |
| `/{locale}/auth/signin,signup,...` | ~55 | Auth pages |
| `/member`, `/member/dashboard`, `/member/welcome` | 3 | Member area |
| `/admin/...` | ~50 | Admin panel (dormant) |

### 12.4 410 Gone Routes (removed in pivot)
- `/{locale}/blog/*` — all blog
- `/{locale}/worksheets/*` — all theme/worksheet pages
- `/{locale}/pricing` — pricing page
- `/{locale}/apps/category/*` — category hubs
- `/{locale}/apps/grades/*` — grade hubs
- `/buy/*` — old buy pages

### 12.5 Key Config Files

| File | Purpose |
|------|---------|
| `frontend/config/warriorplus-products.ts` | 33 apps, 6 categories, bundle definitions — SOURCE OF TRUTH |
| `frontend/config/product-page-slugs.ts` | Localized slugs (33 apps x 11 locales) |
| `frontend/config/sales-pages.ts` | 8 WarriorPlus sales configs |
| `frontend/config/app-translations.ts` | Localized app names for 11 locales |
| `frontend/config/locales.ts` | Locale definitions, LOCALE_TO_FOLDER mapping |

### 12.6 Key Library Files

| File | Purpose |
|------|---------|
| `frontend/lib/license-manager.ts` | License CRUD, `getMergedAppAccess()`, tiers |
| `frontend/lib/license-device-manager.ts` | Device fingerprint enforcement |
| `frontend/lib/auth-middleware.ts` | `withAuth()`, `withAdmin()` |
| `frontend/lib/email-license.ts` | License delivery email |
| `frontend/lib/schema-generator.ts` | JSON-LD schemas |
| `frontend/lib/prisma.ts` | Prisma DB client |

### 12.7 Payment Status
- **Stripe:** 78 products created (33 apps x 2 tiers + 6 bundles x 2 tiers). Individual: $27/$47, Bundles: $79/$119. All one-time, USD.
- **Stripe config:** `frontend/config/stripe-products.ts` (app ID to product/price ID mapping)
- **Stripe backup:** `/opt/lessoncraftstudio/stripe-backup/stripe-config.backup` (immutable)
- **PayPal:** Live REST API credentials obtained, stored in `/opt/lessoncraftstudio/stripe-backup/paypal-config.backup` (immutable)
- **DB triggers** prevent TRUNCATE on users/subscriptions tables
- **PM2 ecosystem.config.js** has Stripe env vars
- **TODO:** Checkout integration, webhooks, license activation on the website

### 12.8 Server Infrastructure

- **Server**: 65.108.5.250 (root)
- **Code**: `/opt/lessoncraftstudio/`
- **Samples**: `/var/www/lcs-media/samples/` (ISOLATED — never touch)
- **Image Library**: `/var/www/lcs-media/image-library/` (ISOLATED — 3,000+ PNGs)
- **Worksheet Generators**: `/var/www/lcs-media/worksheet-generators/` (SYMLINKED)
- **Admin Panels**: `/var/www/lcs-media/admin-panels/` (SYMLINKED)
- **Stripe Backup**: `/opt/lessoncraftstudio/stripe-backup/stripe-config.backup` (IMMUTABLE)

See CLAUDE.md for full protection rules, deployment procedures, and NEVER-DO lists.

---

## 13. IMPLEMENTATION PHASES

**Reminder:** The Mandatory Stop Rule (Section 1.1) applies to every phase transition and every part within a phase. Never proceed without explicit permission.

### Part Naming Convention

All parts follow the pattern: `P{phase}-{locale}-{sequence}`

Examples:
- `P0-001` — Infrastructure part 1
- `P1-EN-001` — Phase 1, English, Addition (app detail)
- `P7-DE-001` — Phase 7, German, slug setup
- `P7-DE-002` — Phase 7, German, Addition (app detail)

### Part Count Summary

| Phase | Description | Parts |
|-------|-------------|-------|
| P0 | Infrastructure (components, routes, slugs, scripts, types) | 30 |
| P1-EN | English App Detail Pages (1 per app) | 33 |
| P2-EN | English Free Tool Pages (1 per tool) | 33 |
| P3-EN | English Bundle Pages (1 per bundle) | 6 |
| P4-EN | English Cornerstone Guides (1 per guide) | 12 |
| P5-EN | English "Create X" Guides (1 per guide) | 65 |
| P6-EN | English Niche Idea Pages (1 per page) | 45 |
| P7-DE | German: 1 slug setup + 194 content pages | 195 |
| P8-FR | French: 1 slug setup + 194 content pages | 195 |
| P9-ES | Spanish: 1 slug setup + 194 content pages | 195 |
| P10-PT | Portuguese: 1 slug setup + 194 content pages | 195 |
| P11-IT | Italian: 1 slug setup + 194 content pages | 195 |
| P12-NL | Dutch: 1 slug setup + 194 content pages | 195 |
| P13-SV | Swedish: 1 slug setup + 194 content pages | 195 |
| P14-DA | Danish: 1 slug setup + 194 content pages | 195 |
| P15-NO | Norwegian: 1 slug setup + 194 content pages | 195 |
| P16-FI | Finnish: 1 slug setup + 194 content pages | 195 |
| P17 | Final Verification & Deploy | 6 |
| **TOTAL** | | **2,180** |

**To reach ~2,500:** Phase 0 infrastructure is further split so each component, each slug config file, each route file, each type definition, and each build-test step is its own part. Per-language build-test parts are also added. This brings the total to approximately **2,400-2,500 parts**.

---

### Phase 0: Infrastructure (~30 parts)

Each of these is a separate part requiring permission to proceed:

| Part | Task |
|------|------|
| P0-001 | Create `scripts/inventory-samples.js` — scans all 11 language folders in `samples/`, lists all JPEG filenames per app folder, outputs `scripts/sample-inventory.json` as `{ [language]: { [appFolder]: string[] } }`. This JSON prevents content files from referencing non-existent images. MUST be run before any content creation begins. |
| P0-002 | Run `scripts/inventory-samples.js` and verify output |
| P0-003 | Create `frontend/config/tool-page-slugs.ts` (Free Tool slugs, English only initially) |
| P0-004 | Create `frontend/config/bundle-page-slugs.ts` (Bundle slugs, English only initially) |
| P0-005 | Create `frontend/config/guide-page-slugs.ts` (Cornerstone + Create X slugs, English only initially) |
| P0-006 | Create `frontend/config/idea-page-slugs.ts` (Niche Idea slugs, English only initially) |
| P0-007 | Create `frontend/config/start-page-slugs.ts` (Cornerstone guide slugs, English only initially) |
| P0-008 | Create slug helper functions for all 5 new slug config files |
| P0-009 | Update `frontend/middleware.ts` — add redirect maps for tools page type |
| P0-010 | Update `frontend/middleware.ts` — add redirect maps for bundles page type |
| P0-011 | Update `frontend/middleware.ts` — add redirect maps for start/cornerstone page type |
| P0-012 | Update `frontend/middleware.ts` — add redirect maps for guides page type |
| P0-013 | Update `frontend/middleware.ts` — add redirect maps for ideas page type |
| P0-014 | Create `scripts/verify-all-slugs.js` validation script |
| P0-015 | Create shared content types: `frontend/config/tool-content/types.ts` |
| P0-016 | Create shared content types: `frontend/config/bundle-content/types.ts` |
| P0-017 | Create shared content types: `frontend/config/guide-content/types.ts` |
| P0-018 | Create shared content types: `frontend/config/idea-content/types.ts` |
| P0-019 | Create shared content types: `frontend/config/start-content/types.ts` |
| P0-020 | Create content index files for all 5 new content types |
| P0-021 | Modify `app/[locale]/apps/[slug]/page.tsx` for enriched content |
| P0-022 | Create route: `frontend/app/[locale]/tools/[slug]/page.tsx` |
| P0-023 | Create route: `frontend/app/[locale]/bundles/[slug]/page.tsx` |
| P0-024 | Create route: `frontend/app/[locale]/start/[slug]/page.tsx` |
| P0-025 | Create route: `frontend/app/[locale]/guides/[slug]/page.tsx` |
| P0-026 | Create route: `frontend/app/[locale]/ideas/[slug]/page.tsx` |
| P0-027 | Create hub pages: tools listing, bundles listing, start listing, guides listing, ideas listing |
| P0-028 | Add all new routes to `frontend/app/sitemap.ts` |
| P0-029 | Add new uiStrings for section headings across all 11 locales |
| P0-030 | Run `verify-all-slugs.js` + TypeScript compile check + build test + deploy |

---

### Phase 1: English App Detail Pages (33 parts)

Each app = 1 part. Read the app's HTML source in `REFERENCE APPS/` before writing content.

| Part | App | Category |
|------|-----|----------|
| P1-EN-001 | Addition | Math Mastery |
| P1-EN-002 | Subtraction | Math Mastery |
| P1-EN-003 | Code Addition | Math Mastery |
| P1-EN-004 | More or Less | Math Mastery |
| P1-EN-005 | Math Puzzle | Math Mastery |
| P1-EN-006 | Math Worksheet | Math Mastery |
| P1-EN-007 | Alphabet Train | Literacy & Language |
| P1-EN-008 | Prepositions | Literacy & Language |
| P1-EN-009 | Word Guess | Literacy & Language |
| P1-EN-010 | Word Scramble | Literacy & Language |
| P1-EN-011 | Word Search | Literacy & Language |
| P1-EN-012 | Cryptogram | Literacy & Language |
| P1-EN-013 | Writing | Literacy & Language |
| P1-EN-014 | Big & Small | Visual Learning |
| P1-EN-015 | Pattern Train | Visual Learning |
| P1-EN-016 | Pattern Worksheet | Visual Learning |
| P1-EN-017 | Draw & Color | Visual Learning |
| P1-EN-018 | Drawing Lines | Visual Learning |
| P1-EN-019 | Coloring | Visual Learning |
| P1-EN-020 | Chart Count | Visual Learning |
| P1-EN-021 | Matching | Matching & Sorting |
| P1-EN-022 | Grid Match | Matching & Sorting |
| P1-EN-023 | Shadow Match | Matching & Sorting |
| P1-EN-024 | Bingo | Matching & Sorting |
| P1-EN-025 | Picture Sort | Matching & Sorting |
| P1-EN-026 | Missing Pieces | Puzzles & Logic |
| P1-EN-027 | Odd One Out | Puzzles & Logic |
| P1-EN-028 | Sudoku | Puzzles & Logic |
| P1-EN-029 | Picture Path | Puzzles & Logic |
| P1-EN-030 | Find & Count | Search & Find |
| P1-EN-031 | Find Objects | Search & Find |
| P1-EN-032 | Crossword | Search & Find |
| P1-EN-033 | Treasure Hunt | Search & Find |

---

### Phase 2: English Free Tool Landing Pages (33 parts)

Same 33 apps, same order as Phase 1. Each tool page = 1 part.

| Part | Tool |
|------|------|
| P2-EN-001 | Free Addition Worksheet Maker |
| P2-EN-002 | Free Subtraction Worksheet Maker |
| P2-EN-003 | Free Code Addition Worksheet Maker |
| P2-EN-004 | Free More or Less Worksheet Maker |
| P2-EN-005 | Free Math Puzzle Maker |
| P2-EN-006 | Free Math Worksheet Maker |
| P2-EN-007 | Free Alphabet Train Maker |
| P2-EN-008 | Free Prepositions Worksheet Maker |
| P2-EN-009 | Free Word Guess Maker |
| P2-EN-010 | Free Word Scramble Maker |
| P2-EN-011 | Free Word Search Maker |
| P2-EN-012 | Free Cryptogram Maker |
| P2-EN-013 | Free Writing Worksheet Maker |
| P2-EN-014 | Free Big & Small Worksheet Maker |
| P2-EN-015 | Free Pattern Train Maker |
| P2-EN-016 | Free Pattern Worksheet Maker |
| P2-EN-017 | Free Draw & Color Maker |
| P2-EN-018 | Free Drawing Lines Maker |
| P2-EN-019 | Free Coloring Page Maker |
| P2-EN-020 | Free Chart Count Maker |
| P2-EN-021 | Free Matching Worksheet Maker |
| P2-EN-022 | Free Grid Match Maker |
| P2-EN-023 | Free Shadow Match Maker |
| P2-EN-024 | Free Bingo Card Maker |
| P2-EN-025 | Free Picture Sort Maker |
| P2-EN-026 | Free Missing Pieces Maker |
| P2-EN-027 | Free Odd One Out Maker |
| P2-EN-028 | Free Sudoku Maker |
| P2-EN-029 | Free Picture Path Maker |
| P2-EN-030 | Free Find & Count Maker |
| P2-EN-031 | Free Find Objects Maker |
| P2-EN-032 | Free Crossword Maker |
| P2-EN-033 | Free Treasure Hunt Maker |

---

### Phase 3: English Bundle Sales Pages (6 parts)

| Part | Bundle |
|------|--------|
| P3-EN-001 | Math Mastery Bundle (6 apps) |
| P3-EN-002 | Literacy & Language Bundle (7 apps) |
| P3-EN-003 | Visual Learning Bundle (7 apps) |
| P3-EN-004 | Matching & Sorting Bundle (5 apps) |
| P3-EN-005 | Puzzles & Logic Bundle (4 apps) |
| P3-EN-006 | Search & Find Bundle (4 apps) |

---

### Phase 4: English Cornerstone Guides (12 parts)

| Part | Guide Topic |
|------|-------------|
| P4-EN-001 | Complete Guide to Printable Business |
| P4-EN-002 | Create Worksheets That Sell |
| P4-EN-003 | Printable Business Blueprint |
| P4-EN-004 | Etsy Printable Business |
| P4-EN-005 | Amazon KDP Activity Books |
| P4-EN-006 | Create Multilingual Worksheets |
| P4-EN-007 | Commercial License Guide |
| P4-EN-008 | Printable Business Income |
| P4-EN-009 | Tools for Printable Business |
| P4-EN-010 | Marketing Printable Business |
| P4-EN-011 | Scaling Printable Business |
| P4-EN-012 | Printable Business Legal |

---

### Phase 5: English "Create X" Guides (65 parts)

65 guides split into 3 subcategories:
- **25 Product Creation Guides** (P5-EN-001 through P5-EN-025): "How to Create [App] Worksheets" — one per app that has strong standalone creation value
- **20 Platform Guides** (P5-EN-026 through P5-EN-045): "How to Sell [Type] on [Platform]" — Etsy, Amazon KDP, TPT strategies
- **20 Business Strategy Guides** (P5-EN-046 through P5-EN-065): Pricing, bundling, seasonal strategies, niche selection

Each guide = 1 part. Full list determined during Phase 0 infrastructure when content type files are created.

---

### Phase 6: English Niche/Theme Idea Pages (45 parts)

45 niche pages, each = 1 part. Examples:

| Part | Niche Topic |
|------|-------------|
| P6-EN-001 | Farm Animals Printable Ideas |
| P6-EN-002 | Ocean Life Activity Ideas |
| P6-EN-003 | Space Theme Worksheet Ideas |
| P6-EN-004 | Dinosaur Printable Ideas |
| P6-EN-005 | Vehicle & Transportation Ideas |
| ... | ... |
| P6-EN-045 | Holiday & Seasonal Ideas |

Full list of 45 niches determined during Phase 0 infrastructure when idea content types are finalized.

---

### Phases 7-16: Translation (10 languages x 195 parts each = 1,950 parts)

**Language order:** de (P7), fr (P8), es (P9), pt (P10), it (P11), nl (P12), sv (P13), da (P14), no (P15), fi (P16)

**Per-language structure (195 parts each):**

| Part Range | Task | Count |
|------------|------|-------|
| PX-{LANG}-001 | Populate all localized slugs in ALL 5 slug config files | 1 |
| PX-{LANG}-002 through PX-{LANG}-034 | App Detail page translations (33 apps) | 33 |
| PX-{LANG}-035 through PX-{LANG}-067 | Free Tool page translations (33 tools) | 33 |
| PX-{LANG}-068 through PX-{LANG}-073 | Bundle page translations (6 bundles) | 6 |
| PX-{LANG}-074 through PX-{LANG}-085 | Cornerstone Guide translations (12 guides) | 12 |
| PX-{LANG}-086 through PX-{LANG}-150 | "Create X" Guide translations (65 guides) | 65 |
| PX-{LANG}-151 through PX-{LANG}-195 | Niche Idea page translations (45 ideas) | 45 |
| **Subtotal per language** | | **195** |

**Example for German (P7):**
- `P7-DE-001`: German slug setup (all 5 config files)
- `P7-DE-002`: Addition app detail (German)
- `P7-DE-003`: Subtraction app detail (German)
- ...
- `P7-DE-034`: Treasure Hunt app detail (German)
- `P7-DE-035`: Free Addition Worksheet Maker (German)
- ...
- `P7-DE-195`: Holiday & Seasonal Ideas (German)

---

### Phase 17: Final Verification & Deploy (6 parts)

| Part | Task |
|------|------|
| P17-001 | Run `verify-all-slugs.js` across all 11 locales |
| P17-002 | Run content verification scripts (word count, schema, image refs) |
| P17-003 | TypeScript compile check + full build test |
| P17-004 | Google Rich Results Test on sample pages from each page type |
| P17-005 | Verify hreflang tags are bidirectional across all locales |
| P17-006 | Deploy to production |

---

### Grand Total

| Category | Parts |
|----------|-------|
| Phase 0: Infrastructure | 30 |
| Phases 1-6: English content | 194 |
| Phases 7-16: 10 languages | 1,950 |
| Phase 17: Verification | 6 |
| **TOTAL** | **2,180 minimum** |

With fine-grained infrastructure splitting (each component/file = 1 part) and per-language build-test parts, the total reaches approximately **2,400-2,500 parts**.

---

## 14. VERIFICATION STRATEGY

Every part must pass the checks below before being marked complete. Section 1.11 (SEO Perfection Checklist) provides the item-level detail — this section defines *when* and *how* those items are verified.

### Per-File Checks (automated script — run after every content file)

1. File exports `content` object matching expected type
2. All required sections present (description, howItWorks, features, useCases, faq)
3. Word count >= 2,800 per content file (C1 buffer for rendered page >= 3,000)
4. No untranslated English text in non-English files (G1)
5. No duplicate content across files in same category
6. `seoChecklist.primaryKeyword` is unique — no other file in the same locale targets the same keyword (C5)
7. `seoChecklist.titleTag` is <= 60 characters and contains primary keyword (A1)
8. `seoChecklist.metaDescription` is 150-160 characters and contains primary keyword (A2)
9. `seoChecklist.internalLinkTargets` has minimum link count for this page type (C2)
10. Primary keyword appears in the first 100 words of description text (B3)
11. FAQ items count matches `seoChecklist.faqCount` (D1)
12. Opening sentences follow Section 1.10.3 hook patterns — no banned openers (C6)
13. Pain-to-solution arc present in description section per Section 1.10.4 (C6)
14. All product names, tier names, category names use locale helpers not English strings (G1, Section 1.9)
15. Platform references use locale-appropriate domains per Section 11.8 (G3)
16. Free trial mention present in content per Section 1.12.2 table for this page type (C7)
17. Refund policy FAQ present in FAQ array, positioned among last 3 FAQs (C8)
18. No "limited free version", "basic free version", or "free trial" (implies time limit) language — per Section 1.12.4 framing rules

### Per-Build Checks (run after `npm run build`)

1. TypeScript compiles without errors
2. All routes render (no 500 errors)
3. Word count on rendered page >= 3,000 (C1)
4. Exactly one `<h1>` per page, containing primary keyword (B1)
5. Heading hierarchy H1 > H2 > H3 with no skipped levels (B2)
6. All `<img>` tags have alt text in the page's locale language (B5)
7. All YouTube embeds use facade pattern — no raw `<iframe>` in initial HTML (E1)
8. No framer-motion, GSAP, or animation library imports in the page bundle (E4)
9. JSON-LD schema is valid JSON and matches the required `@type` for this page type (A6, D3)
10. All text within JSON-LD matches the page locale — no English in non-EN schemas (D4)

### Per-Deploy Checks (run after deploy.sh on live server)

1. Google Rich Results Test passes for FAQ/HowTo schema — no errors (D3)
2. Sample pages load correctly in all 11 locales (smoke test)
3. Hreflang tags present, bidirectional, all 11 locales + x-default (A4)
4. Canonical URL resolves to self (no redirect chains) (A3)
5. Google PageSpeed Insights >= 90 on mobile for 2 random pages per page type (E1-E5)
6. Random spot-check: pick 3 pages, verify all 35-37 SEO checklist items from Section 1.11 pass

### Per-Page SEO Audit (mandatory for every part)

Before any part is marked complete, confirm:

1. **All applicable items from Section 1.11** have been addressed (35-37 items depending on page type)
2. **Section 1.10 voice rules** are reflected in the content — benefit-first openings, active voice, platform-specific excitement, no anti-patterns from 1.10.7
3. **Keyword uniqueness** — the primary keyword is not used by any other page in the same locale
4. **Link topology** — new pages are linked FROM existing pages (no orphans) and link TO related pages per Section 1.7

If any item fails, fix it before marking the part complete. Do not defer SEO fixes to a later phase.

---

## 15. PROGRESS TRACKING

All progress tracking checkboxes have been moved to **`PROGRESS.md`** to keep this blueprint focused on specifications.

See [PROGRESS.md](PROGRESS.md) for the full checklist of 2,180+ parts across all 17 phases.
