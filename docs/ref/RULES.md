# RULES & MANDATES

> Extracted from REFERENCE.md Sections 1.1-1.12. This file contains ALL rules — no additional rules are introduced in other split files.

---

## 1.1 Mandatory Stop Rule

**DON'T PROCEED TO THE NEXT PART WITHOUT ASKING FOR PERMISSION!**

- NEVER start the next part without an explicit "YES" from the user
- ALWAYS finish the current part completely, then ASK: "Part X is complete. Do you want me to start Part X+1?"
- WAIT for the user to say YES before touching anything
- ONE PART AT A TIME — use 100% of your capacity on each part
- Parts exist to overcome context limits — each part deserves full focus
- DO NOT mention, tease, or preview the next part until the current part is FULLY DONE
- If you catch yourself starting a new part without permission: STOP IMMEDIATELY

**This rule applies to ALL phases, ALL page types, ALL locales. No exceptions.**

## 1.2 Zero Fabrication

- **NEVER** write fake testimonials, fake reviews, or fake social proof
- **NEVER** fabricate statistics, revenue claims, or download numbers
- **NEVER** invent user quotes, customer names, or success stories
- **NEVER** assume or guess app capabilities — ALWAYS verify by reading the HTML source in REFERENCE APPS/
- **NEVER** claim specific income results (e.g., "earn $2K/month") without real, verifiable data
- If you don't know a fact, say so or look it up — never make it up
- This applies to ALL content: sales pages, guides, landing pages, dashboards, emails

## 1.3 Verify App Features Before Writing

- Before writing ANY content about an app, READ its HTML file in `REFERENCE APPS/`
- Each app has unique features — do not generalize or copy from one app to another
- The app analysis tables in Section 11 are a starting point — always verify against the actual source

## 1.4 Two-Tier Feature Accuracy

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

**CRITICAL**: For visual-only apps (see BUSINESS.md Section 2.3), language doesn't affect the worksheet content — it only changes the UI labels. Don't advertise "11 languages" as a major feature for these apps.

**CRITICAL**: For language-sensitive apps, the language changes the ACTUAL WORKSHEET CONTENT (words in puzzles, labels on images, etc.). This is a genuine, high-value feature for these apps.

## 1.5 Performance Mandate

**Target:** 90+ on Google PageSpeed Insights (mobile AND desktop). Design must NEVER slow down the page.

**YouTube Videos — Facade Pattern ONLY:**

All YouTube embeds MUST use the click-to-play facade pattern (proven implementation: `frontend/app/[locale]/get/[product]/SalesPageClient.tsx` lines 183-230):

1. Render a static thumbnail: `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg` via Next.js `<Image>`
2. Overlay a CSS play button (no JS, no external SVG)
3. On click: `useState` flips to `true` then render `<iframe>` with `src="https://www.youtube-nocookie.com/embed/{VIDEO_ID}?autoplay=1&rel=0"`
4. **NEVER** embed a raw `<iframe>` in initial HTML — it loads ~1 MB of YouTube JS on every page load

**Every page in the system — all 2,134 — MUST include at least one YouTube video tutorial using the facade pattern. No exceptions.** See BUSINESS.md Section 11.4 for video IDs.

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

## 1.6 Content Architecture Principles

**3,000+ Words Per Page:** Every page must exceed 3,000 rendered words. The content structure varies by page type but always includes: extended description, step-by-step content, features/benefits, business use cases, audience segments, FAQ section.

**One Language at a Time:** Never mix languages in a single content creation session. Complete all content for one language before starting the next. English always first.

**Session Independence:** Each session receives clear instructions from REFERENCE.md and produces verifiable output without needing context from prior sessions. Each content file is self-contained.

**Graceful Fallback:** All page templates render correctly even when enriched content files don't exist yet. Missing content falls back to existing thin content (app pages) or shows a minimal placeholder (new page types).

## 1.7 SEO: Internal Linking & Keyword Strategy

### Internal Linking Rules

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

### Keyword Uniqueness Rules

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

### Keywords in Headings Rules

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

## 1.8 Visual Integration Rules

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

## 1.9 Localization of Product Names

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

## 1.10 Conversion-Focused Content Voice

**Section 1.2 (Zero Fabrication) still applies unconditionally.** Excitement must come from real capabilities, never invented claims. The rules below govern *how* we present truthful information — energetically, not lifelessly.

### 1.10.1 Target Audience Mindset

Every page speaks to real people at different stages of their printable-selling journey. Write for these four personas:

| Persona | Mindset | What They Need |
|---------|---------|----------------|
| **Curious Explorer** | "I heard you can make money selling printables — is this real?" | Proof it's achievable, clear next steps, low barrier to entry |
| **Overwhelmed Beginner** | "There are so many tools and platforms — where do I even start?" | Simplicity, hand-holding, confidence that this tool removes the hard parts |
| **Active Seller** | "I already sell on Etsy/KDP but need to scale faster and stand out" | Speed, variety, competitive advantage, professional quality |
| **Teacher-Turned-Entrepreneur** | "I make great classroom resources — can I turn this into a real business?" | Validation of their skills, path from classroom to marketplace, commercial licensing |

**Key insight:** These visitors are excited but uncertain. They need **confidence**, not hype. Show them the path clearly and honestly.

### 1.10.2 Voice Principles

| Principle | DO | DON'T | Example |
|-----------|-----|--------|---------|
| **Energetic** | Use active verbs, short sentences, forward momentum | Sound robotic, clinical, or like a product manual | DO: "Create a complete word search in under 60 seconds" / DON'T: "The word search generator allows users to create word searches" |
| **Empowering** | Make the reader the hero — they create, they earn, they build | Position the tool as the hero or talk down to the reader | DO: "You choose the theme, the words, the layout — your brand, your way" / DON'T: "Our powerful tool does everything for you" |
| **Specific** | Name exact features, exact platforms, exact formats | Use vague marketing language or empty superlatives | DO: "Export at 300 DPI — the minimum for Amazon KDP print quality" / DON'T: "High-quality professional output" |
| **Honest** | State real capabilities, real limitations, real use cases | Oversell, imply guaranteed income, or hide restrictions | DO: "Commercial Pack includes 10 image themes — enough to launch your first 50+ products" / DON'T: "Unlimited creative possibilities" |
| **Action-Oriented** | End sections with a clear next step | Leave the reader wondering "so what?" or "what now?" | DO: "Try the free version below — no signup needed" / DON'T: "The tool is available for use" |
| **Benefit-First** | Lead with what the reader gains, then explain the feature | Lead with technical details or feature names | DO: "Stand out on Etsy with 104 hand-drawn image themes that no competitor can replicate" / DON'T: "The image library contains 104 themes" |

### 1.10.3 Opening Hook Rules

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

### 1.10.4 Pain-to-Solution Framework

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

### 1.10.5 Platform-Specific Excitement Rules

Readers get excited when they see their exact platform named with realistic scenarios. Follow these rules:

1. **Name real platforms explicitly:** Etsy, Amazon KDP, Teachers Pay Teachers (TPT), Gumroad, Creative Fabrica, Creative Market, Shopify. Never use vague "online marketplaces."

2. **Use locale-appropriate platform domains:** Reference etsy.com for EN, etsy.de for DE, amazon.fr for FR, etc. See BUSINESS.md Section 11.8 for the full locale-marketplace reference table.

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
   - (See BUSINESS.md Section 11.8 for all locales)

6. **Language-as-multiplier framing** — ONLY for language-sensitive apps (see BUSINESS.md Section 2.3):
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

### 1.10.6 CTA (Call-to-Action) Rules

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

### 1.10.7 Anti-Patterns (Content That Kills Conversions)

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

### 1.10.8 Per-Page-Type Tone Adaptation

While the voice principles (1.10.2) apply everywhere, each page type emphasizes different emotional notes:

| Page Type | Tone Emphasis | Lead Emotion | Key Phrase Patterns |
|-----------|--------------|--------------|---------------------|
| 1: App Detail | Confident, demo-focused | "I can see exactly what I'll get" | "See it in action" · "Here's what you'll create" · "Try it free" |
| 2: Free Tool | Inviting, low-pressure | "I can try this risk-free right now" | "No signup needed" · "Free, right here" · "When you're ready to sell..." |
| 3: Bundle | Value-focused, strategic | "This is the smart way to buy" | "Everything you need for [category]" · "One purchase, [N] generators" · "Save [X]% vs. individual" |
| 4: Cornerstone Guide | Authoritative, mentoring | "I trust this guide — it knows the space" | "Here's how it actually works" · "The path from zero to selling" · "What successful sellers do" |
| 5: Create X Guide | Practical, step-by-step | "I can follow this and get a result today" | "Step 1..." · "Here's exactly how" · "By the end of this guide..." |
| 6: Niche/Theme Ideas | Inspiring, opportunity-focused | "I see an opening I can fill" | "Underserved niche" · "Growing demand" · "Here's your angle" · "Low competition" |

## 1.11 Per-Page SEO Perfection Checklist

Every page created under this blueprint MUST pass ALL applicable items before the part is marked complete.

### Category A: Technical SEO (7 items)

| # | Check | Requirement |
|---|-------|-------------|
| A1 | **Title tag** | Unique, contains primary keyword, <= 60 characters, locale language |
| A2 | **Meta description** | Unique, contains primary keyword, 150-160 characters, locale language, includes CTA verb |
| A3 | **Canonical URL** | Self-referencing canonical on every page, fully qualified URL with locale prefix |
| A4 | **Hreflang tags** | All 11 locales + `x-default` (pointing to EN), bidirectional (every page links to all siblings) |
| A5 | **Robots directives** | `index, follow` on all public pages; `noindex` only on auth/admin/error pages |
| A6 | **JSON-LD schema** | Valid schema matching the page type (see schema type table below), language matches locale |
| A7 | **OpenGraph tags** | `og:title`, `og:description`, `og:url`, `og:type`, `og:image`, `og:locale` — all in page locale |

### Category B: On-Page SEO (6 items)

| # | Check | Requirement |
|---|-------|-------------|
| B1 | **Single H1** | Exactly one `<h1>` per page, contains primary keyword, locale language |
| B2 | **Heading hierarchy** | H1 > H2 > H3 (no skipping levels), all headings in locale language |
| B3 | **Keyword in first 100 words** | Primary keyword appears in the first 100 words of visible body text |
| B4 | **Keyword density** | Primary keyword appears at 1-2% density (not stuffed, not absent) |
| B5 | **Image alt text** | Every `<img>` has descriptive alt text in the page's locale language |
| B6 | **Internal link anchors** | Anchor text is descriptive and keyword-relevant — never "click here" or "read more" |

### Category C: Content SEO (8 items)

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

### Category D: Structured Data (4 items)

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

### Category E: Performance (5 items)

| # | Check | Requirement |
|---|-------|-------------|
| E1 | **YouTube facade** | ALL YouTube embeds use click-to-play facade (Section 1.5) — no raw iframes |
| E2 | **Image optimization** | All images use Next.js `<Image>` with appropriate `width`, `height`, `loading="lazy"` |
| E3 | **No blocking scripts** | No `<script>` tags in initial HTML that block rendering (defer/async or dynamic import) |
| E4 | **No animation libraries** | No framer-motion, GSAP, or similar — use CSS `@keyframes` only (Section 1.5 learning) |
| E5 | **Font loading** | All fonts loaded via `next/font` — no external font CSS imports |

### Category F: Mobile & Accessibility (4 items)

| # | Check | Requirement |
|---|-------|-------------|
| F1 | **Responsive layout** | Page renders correctly on 320px-1440px viewports, no broken layouts |
| F2 | **Touch targets** | All interactive elements (buttons, links) are minimum 44x44px on mobile |
| F3 | **No horizontal scroll** | No content overflows viewport width on any screen size |
| F4 | **Semantic HTML** | Proper use of `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<header>`, `<footer>` |

### Category G: Cross-Locale (3 items)

| # | Check | Requirement |
|---|-------|-------------|
| G1 | **No untranslated English** | Zero English strings on non-EN pages — includes product names, tier names, category names (Section 1.9) |
| G2 | **Localized slug** | URL slug is translated per the slug config file for this page type (Section 10) |
| G3 | **Locale-appropriate references** | Marketplace domains, school terminology, and example scenarios match the locale (Section 11.8) |

### Mandatory Items Per Page Type

| Page Type | A (7) | B (6) | C (8) | D (4) | E (5) | F (4) | G (3) | Total |
|-----------|-------|-------|-------|-------|-------|-------|-------|-------|
| 1: App Detail | All 7 | All 6 | All 8 | D1, D3, D4 | All 5 | All 4 | All 3 | **36** |
| 2: Free Tool | All 7 | All 6 | All 8 | D1, D3, D4 | All 5 | All 4 | All 3 | **36** |
| 3: Bundle | All 7 | All 6 | All 8 | D3, D4 | All 5 | All 4 | All 3 | **35** |
| 4: Cornerstone | All 7 | All 6 | All 8 | All 4 | All 5 | All 4 | All 3 | **37** |
| 5: Create X | All 7 | All 6 | All 8 | All 4 | All 5 | All 4 | All 3 | **37** |
| 6: Niche/Theme | All 7 | All 6 | All 8 | All 4 | All 5 | All 4 | All 3 | **37** |

### How to Use This Checklist

- **During content creation (Phase 1-6):** Categories A, B, C, D, G are validated per part via the content file and page component
- **During build verification:** Categories E, F are validated by building and inspecting the rendered page
- **During deploy verification:** All categories spot-checked on live pages
- **Translation phases (7-16):** Focus on A1-A2 (translated title/meta), B1-B2 (translated headings), C6 (voice rules), D4 (schema language), G1-G3 (full cross-locale)

### Content File SEO Integration

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

## 1.12 Free Trial Emphasis & Refund Policy

Every page in the system must communicate the free trial advantage and include a no-refund FAQ. This section defines what to say, where to say it, and how to enforce it. These rules work alongside Section 1.2 (Zero Fabrication) and Section 1.4 (Two-Tier Accuracy) — never overstate what the free version includes.

### 1.12.1 The Free Trial Fact

All 33 apps work in the browser with ZERO restrictions on features:

- Every setting, every theme (within tier), every language, every export option works
- The ONLY difference: downloaded PDFs have a watermark
- No signup required, no credit card, no email, no time limit
- This applies equally to Commercial Pack and Full Access Pack features being previewed
- Purchasing removes the watermark — that is the sole change

### 1.12.2 Mandatory Free Trial Mentions (Per Page Type)

Every page type must mention the free trial in specific locations. Use natural phrasing appropriate to the context:

| Page Type | Where to Mention | How to Frame |
|-----------|-----------------|--------------|
| 1: App Detail | Hero section, How It Works, CTA sections, FAQ | "Try it free right now — all features, no signup. Only downloaded files have a watermark." |
| 2: Free Tool | Hero (primary message), embedded tool intro, FAQ | "Use the full tool below — free, no signup. Love it? Remove the watermark with a one-time purchase." |
| 3: Bundle | Value proposition, comparison table, FAQ | "Try every app in this bundle free before buying. All features work — watermark is the only difference." |
| 4: Cornerstone Guide | Tools Recommended section, FAQ | "Every tool mentioned in this guide is free to try — test them all before investing." |
| 5: Create X Guide | Tool introduction, step-by-step section, FAQ | "Follow along with the free version — it has all the same features. Buy when you're ready to sell." |
| 6: Niche/Theme Ideas | How to Create section, tool links, FAQ | "Start creating in this niche today — every tool is free to try with full features." |

### 1.12.3 Mandatory Refund Policy FAQ

EVERY page's FAQ section must include a refund policy Q&A. This is non-negotiable across all 6 page types and all 11 locales.

**Question pattern:** "What is your refund policy?" (localized naturally per locale)

**Answer pattern:** "We do not offer refunds because every app is free to try with all features before you buy. The only difference between the free version and the paid version is a watermark on downloaded files. We encourage you to try before you buy — test the app thoroughly, create worksheets, check the quality, and only purchase when you're completely satisfied."

**Rules:**
- This FAQ must appear on ALL 6 page types, ALL 11 locales
- It must be included in the `FAQPage` JSON-LD schema
- Position: among the last 3 FAQs (not first — lead with value FAQs)
- The answer must reference the free trial as justification — never state the policy without the reason
- Locale versions must use natural phrasing, not literal translations

### 1.12.4 Free Trial Framing Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Use "free to try" or "try free" | "Try it free with all features" | "Start your free trial" (implies time limit) |
| Always mention no signup | "No signup, no credit card" | Omitting the signup detail |
| Clarify watermark is the ONLY difference | "The only difference is a watermark" | "Some features require purchase" |
| Never imply feature limits | "All features included" | "Limited free version" or "Basic free version" |
| Locale-appropriate phrasing | Natural equivalent in target language | Word-for-word translation of English phrase |
