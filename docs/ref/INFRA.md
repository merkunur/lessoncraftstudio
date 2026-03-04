# INFRASTRUCTURE: URLs, Slugs, Architecture, Phases

> Extracted from REFERENCE.md Sections 3, 10, 12, and 13.

---

## 3. Page Type Overview

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

## 10. URL & Slug Strategy

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
// REQUIRED HELPER FUNCTION 1: Internal ID -> localized slug (with English fallback)
export function getToolSlugForLocale(toolId: string, locale: SupportedLocale): string | undefined

// REQUIRED HELPER FUNCTION 2: Any slug (any language) -> { toolId, locale }
export function getToolConfigBySlug(slug: string): { toolId: string; locale: SupportedLocale } | undefined

// REQUIRED HELPER FUNCTION 3: All slug+locale pairs for generateStaticParams()
export function getAllToolPageSlugs(): { locale: SupportedLocale; slug: string }[]

// REQUIRED HELPER FUNCTION 4: hreflang alternates for all locales
export function getToolAlternateUrls(toolId: string, baseUrl?: string): Record<string, string>

// REQUIRED HELPER FUNCTION 5: Validate slug belongs to specific locale
export function hasToolPage(slug: string, locale: SupportedLocale): boolean
```

### Middleware Redirect Protection (3-Layer System)

The existing `middleware.ts` (lines 11-51) builds **3 redirect maps** at startup from `productPageSlugs` to prevent slug/locale mismatches. **Every new page type MUST replicate this exact pattern.**

For each new page type, middleware needs:

**Map 1: Legacy/Internal ID -> Localized Slug Redirect** (301)
**Map 2: English Slug -> Correct Locale Slug Redirect** (301)
**Map 3: Cross-Locale Slug -> Correct Locale Slug Redirect** (301)

### Slug Translation Rules
- Slugs must be **lowercase, hyphenated, no diacritics** (URL-safe)
- Use `normalizeSlug()` from `scripts/slug-utils.js` for transliteration
- Regex validation: `/^[a-z0-9]+(-[a-z0-9]+)*$/`
- Use the language's natural word for the concept, not a transliteration of English
- Keep slug length under 60 characters
- Include the primary target keyword for that language
- The route segment (`/tools/`, `/bundles/`, `/start/`, `/guides/`, `/ideas/`) stays in English across all locales

### Fallback Behavior
If a locale slug is `undefined`, the page uses the English slug as fallback via `config.slugs[locale] || config.slugs.en`.

---

## 12. Key Files & Architecture

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

### 12.5-12.8 Key Config, Library Files, Payment Status, Server Infrastructure

See REFERENCE.md for complete details on these subsections. Key points:
- **Stripe:** 78 products created, $27/$47 individual, $79/$119 bundles
- **PayPal:** Live REST API credentials obtained
- **Server:** 65.108.5.250, code at `/opt/lessoncraftstudio/`, media at `/var/www/lcs-media/`

---

## 13. Implementation Phases

### Part Naming Convention

All parts follow the pattern: `P{phase}-{locale}-{sequence}`

Examples:
- `P0-001` — Infrastructure part 1
- `P1-EN-001` — Phase 1, English, Addition (app detail)
- `P7-DE-001` — Phase 7, German, slug setup

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
| P7-DE through P16-FI | 10 languages x 195 parts each | 1,950 |
| P17 | Final Verification & Deploy | 6 |
| **TOTAL** | | **2,180** |

### Phase 0: Infrastructure (~30 parts)

| Part | Task |
|------|------|
| P0-001 | Create `scripts/inventory-samples.js` |
| P0-002 | Run `scripts/inventory-samples.js` and verify output |
| P0-003 | Create `frontend/config/tool-page-slugs.ts` |
| P0-004 | Create `frontend/config/bundle-page-slugs.ts` |
| P0-005 | Create `frontend/config/guide-page-slugs.ts` |
| P0-006 | Create `frontend/config/idea-page-slugs.ts` |
| P0-007 | Create `frontend/config/start-page-slugs.ts` |
| P0-008 | Create slug helper functions for all 5 new slug config files |
| P0-009-013 | Update middleware.ts for tools, bundles, start, guides, ideas |
| P0-014 | Create `scripts/verify-all-slugs.js` |
| P0-015-019 | Create content type definitions for all 5 new page types |
| P0-020 | Create content index files |
| P0-021-026 | Create/modify route templates |
| P0-027 | Create hub pages |
| P0-028 | Add routes to sitemap |
| P0-029 | Add uiStrings for section headings |
| P0-030 | Verify + build + deploy |

### Phases 1-6: English Content (194 parts)
- P1: 33 app detail pages
- P2: 33 free tool pages
- P3: 6 bundle pages
- P4: 12 cornerstone guides
- P5: 65 "Create X" guides
- P6: 45 niche idea pages

### Phases 7-16: Translations (1,950 parts)
Language order: de, fr, es, pt, it, nl, sv, da, no, fi
Per-language: 1 slug setup + 194 content translations = 195 parts each

### Phase 17: Final Verification (6 parts)
- Slug validation, content verification, build test, rich results, hreflang check, deploy
