# Page Type 1: App Detail Pages (33 apps x 11 locales = 363 pages)

> Extracted from REFERENCE.md Section 4.

## Session Instructions
1. Run: `node scripts/check-progress.js`
2. Load: `docs/ref/RULES.md` + this file + `docs/ref/BUSINESS.md`
3. Next items: determined by progress script output
4. Per item: read `REFERENCE APPS/{app}.html` → create content file
5. After each file: `node scripts/validate-content.js {path}`
6. End of session: commit

---

## Current State
- Route: `/{locale}/apps/{localized-slug}` — LIVE, 363 pages exist
- Template: `frontend/app/[locale]/apps/[slug]/page.tsx` (~801 lines)
- Content: ~254 words per page (thin — 54 unique + 200 template)
- Problem: Google rejects as thin/duplicate content

## Target State
- 3,000+ words per page with 8 content sections
- App-specific features verified from HTML source
- Per-locale marketplace references and cultural adaptation
- FAQPage structured data (JSON-LD)

## Word Count Breakdown (3,500 words)

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

## File Structure
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

## Content Rules for Each Section

**Hero (250 words):** 3-5 sentences. What the app creates, key distinguishing capability, who benefits, image library scope, business value. Verified from HTML source.

**How It Works (400 words):** 5 app-specific steps (NOT generic "Create -> Export -> Sell"). Each step references actual UI elements. Example: "Select your math operation from 4 modes: Image+Image, Image+Number, Find the Addend, or Mixed."

**Key Features (800 words):** 8 unique features per app. Each: title (3-6 words) + explanation (80-100 words). For language-sensitive apps, one feature MUST highlight multi-language content. Every claim verified from HTML source.

**Business Use Cases (600 words):** 5-6 scenarios with specific platform mentions. Locale-aware (Etsy.de for German, Amazon.fr for French). Language-sensitive apps include use cases about creating products in that language.

**Who Is This For (300 words):** 4 audience segments (Etsy Sellers, KDP Publishers, TPT Sellers, Homeschool Educators). Shared per category (6 variants x 11 locales).

**What You Get (250 words):** Commercial Pack vs Full Access Pack comparison. Shared across apps with {name} interpolation. Language-sensitive vs visual-only variants.

**FAQ (700 words):** 5-7 app-specific Q&As (unique to THIS app) + 5 generic Q&As from existing `default-product-faqs.ts`. Combined 10-12 FAQs generate FAQPage JSON-LD.

## Feature Audit Requirements (Per App)

Before writing content for any app, READ `REFERENCE APPS/[app].html` and extract:
- All `<select>` elements (configuration options)
- All accordion sections (feature panels)
- Exercise modes / difficulty levels
- Canvas editing capabilities
- Export options (PDF sizes, DPI)
- Image library integration
- Language handling specifics
