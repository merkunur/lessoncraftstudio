# Individual App Pages - Design & Implementation Guide

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║  🚨🚨🚨 CRITICAL WARNING - READ BEFORE ANY WORK 🚨🚨🚨                       ║
║                                                                              ║
║  YOU SHOULD BE VERY CAREFUL NOT TO OVERWRITE ANYTHING.                       ║
║  YOU DID IT SEVERAL TIMES AND YOU OVERWROTE THINGS WITH OLDER VERSIONS.      ║
║  YOU SHOULD ANALYZE THE DEPLOYMENT.MD FILE THOROUGHLY NOT TO MAKE            ║
║  SUCH MISTAKE.                                                               ║
║                                                                              ║
║  You should always use the REFERENCE APPS, REFERENCE CONTENT MANAGERS        ║
║  AND REFERENCE TRANSLATIONS in case of redeployment of the website.          ║
║                                                                              ║
║  📁 REFERENCE APPS = Source of truth for worksheet generators                ║
║  📁 REFERENCE CONTENT MANAGERS = Source of truth for content managers        ║
║  📁 REFERENCE TRANSLATIONS = Source of truth for translation files           ║
║                                                                              ║
║  ⚠️  BEFORE ANY DEPLOYMENT: Read DEPLOYMENT.md completely!                   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

**Created:** 2025-12-29
**Purpose:** Comprehensive reference for designing and implementing 363 product pages
**Status:** Pre-implementation planning

---

## 🎯 PROJECT OVERVIEW

### What We're Building
- **363 unique product pages** (33 apps × 11 languages)
- Each page is a **separate product**, NOT a translation
- Purpose: **Drive organic traffic** through SEO-optimized content
- Design: **Modern SaaS style** (Canva/Notion-inspired)

### What We're NOT Doing
- ❌ NOT modifying worksheet generator HTML apps
- ❌ NOT touching REFERENCE APPS, REFERENCE TRANSLATIONS, or REFERENCE CONTENT MANAGERS
- ❌ NOT linking to subscription-required apps directly

---

## 🔗 CRITICAL: LINKING STRATEGY

### ⛔ NEVER Link To:
```
❌ /worksheet-generators/addition.html (requires subscription)
❌ /worksheet-generators/wordsearch.html (requires subscription)
❌ Any URL that opens the actual app generator
```

**Why:** The worksheet generator apps require a subscription. Linking directly would show users a paywall or error, creating a bad user experience.

### ✅ ALWAYS Link To THE SAME LANGUAGE:

## 🔴🔴🔴 CRITICAL: ALL LINKS MUST MATCH PAGE LANGUAGE 🔴🔴🔴

**If user is on a GERMAN page → ALL links go to GERMAN pages**
**If user is on a FRENCH page → ALL links go to FRENCH pages**
**NEVER mix languages in links!**

### VERIFIED ROUTES (from Navigation.tsx lines 113-229):

| CTA Button | Link Pattern | Source Verification |
|------------|--------------|---------------------|
| Sign Up | `/{locale}/auth/signup` | Navigation.tsx:144, 229 |
| Sign In | `/{locale}/auth/signin` | Navigation.tsx:141, 221 |
| Apps Page | `/{locale}/apps` | Navigation.tsx:113, 168 |
| Pricing | `/{locale}/pricing` | Navigation.tsx:116, 175 |
| Homepage | `/{locale}` | Navigation.tsx:74 |
| Blog | `/{locale}/blog` | Navigation.tsx:119, 182 |
| Dashboard | `/{locale}/dashboard` | Navigation.tsx:122, 189 |
| Download Sample | `/samples/{language}/{app}/{file}.pdf` | Direct file download |
| Related App Links | `/{locale}/apps/{native-slug}` | Product page links |

### CORRECT Examples - Links Match Page Language:

**On German page `/de/apps/additionsarbeitsblatter`:**
```
✅ Signup:    /de/auth/signup
✅ Apps:      /de/apps
✅ Pricing:   /de/pricing
✅ Homepage:  /de
✅ Related:   /de/apps/subtraktionsarbeitsblatter (German slug!)
```

**On French page `/fr/apps/fiches-addition`:**
```
✅ Signup:    /fr/auth/signup
✅ Apps:      /fr/apps
✅ Pricing:   /fr/pricing
✅ Homepage:  /fr
✅ Related:   /fr/apps/fiches-soustraction (French slug!)
```

**On Spanish page `/es/apps/fichas-de-sumas`:**
```
✅ Signup:    /es/auth/signup
✅ Apps:      /es/apps
✅ Pricing:   /es/pricing
✅ Homepage:  /es
✅ Related:   /es/apps/fichas-de-restas (Spanish slug!)
```

### ❌ WRONG Examples - NEVER Do This:

**On German page `/de/apps/additionsarbeitsblatter`:**
```
❌ /en/auth/signup (WRONG - English link on German page!)
❌ /en/apps (WRONG - English link on German page!)
❌ /de/apps/subtraction-worksheets (WRONG - English slug on German page!)
```

### Implementation in Code:

```tsx
// The locale prop comes from the page params
interface ProductPageProps {
  locale: string; // 'en', 'de', 'fr', 'es', etc.
}

// ALL links use the same locale
const ProductPage = ({ locale }: ProductPageProps) => {
  return (
    <>
      {/* Primary CTA - SAME locale */}
      <Button href={`/${locale}/auth/signup`}>
        {translations[locale].startCreating}
      </Button>

      {/* Apps page - SAME locale */}
      <Link href={`/${locale}/apps`}>
        {translations[locale].viewAllApps}
      </Link>

      {/* Pricing - SAME locale */}
      <Link href={`/${locale}/pricing`}>
        {translations[locale].seePricing}
      </Link>

      {/* Related apps - SAME locale + native slug */}
      <Link href={`/${locale}/apps/${relatedApp.nativeSlug}`}>
        {relatedApp.nativeName}
      </Link>
    </>
  );
};
```

### Full Link Matrix by Language (VERIFIED from Navigation.tsx):

| Locale | Signup | Apps | Pricing | Homepage | Blog |
|--------|--------|------|---------|----------|------|
| en | /en/auth/signup | /en/apps | /en/pricing | /en | /en/blog |
| de | /de/auth/signup | /de/apps | /de/pricing | /de | /de/blog |
| fr | /fr/auth/signup | /fr/apps | /fr/pricing | /fr | /fr/blog |
| es | /es/auth/signup | /es/apps | /es/pricing | /es | /es/blog |
| it | /it/auth/signup | /it/apps | /it/pricing | /it | /it/blog |
| pt | /pt/auth/signup | /pt/apps | /pt/pricing | /pt | /pt/blog |
| nl | /nl/auth/signup | /nl/apps | /nl/pricing | /nl | /nl/blog |
| sv | /sv/auth/signup | /sv/apps | /sv/pricing | /sv | /sv/blog |
| da | /da/auth/signup | /da/apps | /da/pricing | /da | /da/blog |
| no | /no/auth/signup | /no/apps | /no/pricing | /no | /no/blog |
| fi | /fi/auth/signup | /fi/apps | /fi/pricing | /fi | /fi/blog |

**Source:** `frontend/components/layout/Navigation.tsx` lines 74, 113-229

---

## 🚨 DEPLOYMENT SAFEGUARDS (FROM DEPLOYMENT.md)

### Files I Must NEVER Touch:
```
❌ REFERENCE APPS/ folder
❌ REFERENCE TRANSLATIONS/ folder
❌ REFERENCE CONTENT MANAGERS/ folder
❌ frontend/public/worksheet-generators/*.html
❌ frontend/public/worksheet-generators/js/translations-*.js
❌ Any file that should be deployed from REFERENCE folders
```

### Files I WILL Create/Modify:
```
✅ frontend/components/product-page/*.tsx (NEW components)
✅ frontend/app/[locale]/apps/[slug]/page.tsx (modify for new design)
✅ frontend/app/[locale]/apps/[slug]/ProductPageClient.tsx (NEW)
✅ frontend/lib/product-page-content.ts (NEW - content loader)
✅ Content JSON files for 363 pages
✅ frontend/tailwind.config.js (add animations)
✅ frontend/app/globals.css (add styles)
```

### This Is Scenario 1 (Code Changes):
```bash
# Safe deployment command - does NOT touch worksheet generators
git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio
```

---

## 📐 DESIGN SPECIFICATIONS

### Style: Modern SaaS (Canva/Notion-inspired)

**Design Principles:**
1. Clean & Minimal - generous whitespace, clear hierarchy
2. Soft Shadows - subtle depth without heavy borders
3. Rounded Corners - friendly, modern feel (rounded-2xl)
4. Gradient Accents - subtle gradients for CTAs and highlights
5. Smooth Animations - polished micro-interactions using Framer Motion

**Color Palette:**
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #1E40AF | Trust, CTAs, headings |
| Secondary Orange | #FB923C | Action buttons, accents |
| Background | #F9FAFB (gray-50) | Page background |
| Cards | #FFFFFF | Content containers |
| Text (headings) | #111827 (gray-900) | H1, H2, H3 |
| Text (body) | #4B5563 (gray-600) | Paragraphs |

---

## 📝 THE 7-PART DESIGN PROCESS

Each app page is designed in 7 sequential parts with approval between each:

### Part 1: Hero Section
**Content Source:** H1 + intro paragraphs from `INDIVIDUAL APP PAGES/{Language}/{app}.md`

**Elements:**
- Full-width hero with subtle gradient background
- H1 title with primary keyword
- 2-line value proposition (first paragraph summary)
- **CTA Buttons:**
  - Primary: "Start Creating Free" → `/{locale}/auth/signup`
  - Secondary: "View Samples" → scrolls to sample gallery
- Trust badges row: "11 Languages", "3000+ Images", "POD License", "300 DPI"
- Floating worksheet preview image (from samples folder)

**Props:**
```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; onClick: () => void }; // Scroll to samples
  previewImage: string;
  trustBadges: { icon: string; label: string }[];
  locale: string;
}
```

### Part 2: Sample Gallery
**Content Source:** JPEG/PDF files from `samples/{language}/{app}/`

**Elements:**
- Dynamic carousel (handles variable sample counts)
- Thumbnail strip below main image
- Portrait/landscape view toggle
- Answer key toggle (worksheet ↔ answer key)
- Lightbox zoom on click
- **"Download Free Sample" button** → direct PDF download (NO login required)

**Props:**
```typescript
interface SampleGalleryProps {
  samples: {
    thumbnail: string;
    fullImage: string;
    pdfDownload: string;
    altText: string;
    hasAnswerKey: boolean;
    answerKeyImage?: string;
    answerKeyPdf?: string;
  }[];
  locale: string;
}
```

### Part 3: Features Showcase
**Content Source:** H2 "Features" section + 7 H3 subsections from markdown

**Elements:**
- 7 feature cards in responsive grid (3 columns desktop, 1 mobile)
- Icon + title + short description per card
- Scroll-triggered fade-up animations
- Visual emphasis on: POD license, 300 DPI, 11 languages

**The 7 Standard Features (all apps):**
1. Easy creation (theme selection or individual images)
2. Full editability (drag, rotate, scale, delete)
3. Upload custom images
4. 11 languages support
5. POD commercial license
6. 3000+ image library
7. Professional 300 DPI quality

### Part 4: How-To Guide
**Content Source:** H2 "How to Create" section + 5 H3 steps from markdown

**Elements:**
- 5-step visual process with numbered indicators
- Step title + description
- Optional illustration per step
- Progress indicator design
- **CTA at bottom:** "Ready to Start?" → `/{locale}/auth/signup`

### Part 5: Use Cases
**Content Source:** H2 "Use Cases" section + 6 user personas from markdown

**Elements:**
- 6 persona cards (teacher, parent, homeschooler, tutor, entrepreneur, therapist)
- Quote-style design with user type icon
- Local education terminology per language
- Gradient accent colors

### Part 6: FAQ & Subscription
**Content Source:** H2 "FAQ" section (12 questions) + pricing info from markdown

**Elements:**
- 12 expandable FAQ accordion items
- Smooth open/close animations
- Pricing comparison (Core Bundle vs Full Access)
- Value proposition highlights
- **CTA:** "Subscribe Now" → `/{locale}/pricing`

### Part 7: Related Apps & Footer CTA
**Content Source:** H2 "Combine Apps" section from markdown

**Elements:**
- "Works Great With" carousel of 4-6 related apps
- **CRITICAL: Related app links use SAME locale + NATIVE slug:**
  - On `/de/apps/additionsarbeitsblatter` → link to `/de/apps/subtraktionsarbeitsblatter` (NOT subtraction-worksheets!)
  - On `/fr/apps/fiches-addition` → link to `/fr/apps/fiches-soustraction` (NOT subtraction-worksheets!)
- Final conversion CTA section
- **Primary CTA:** "Create Your First Worksheet" → `/{locale}/auth/signup`
- **Secondary:** "Explore All Apps" → `/{locale}/apps`

**Related Apps Link Pattern:**
```tsx
// CORRECT - Same locale + native slug
<Link href={`/${locale}/apps/${relatedApp.slugs[locale]}`}>
  {relatedApp.names[locale]}
</Link>

// Example on German page:
<Link href="/de/apps/subtraktionsarbeitsblatter">
  Subtraktionsarbeitsblätter
</Link>

// Example on French page:
<Link href="/fr/apps/fiches-soustraction">
  Fiches de Soustraction
</Link>
```

---

## 🌐 SEO REQUIREMENTS

### Each Language Page Must Have:

**Unique Native Slug:**
```
/en/apps/addition-worksheets
/de/apps/additionsarbeitsblatter
/fr/apps/fiches-addition
/es/apps/fichas-de-sumas
...etc (see full mapping below)
```

**Independent Metadata:**
```typescript
// Each page generates its own metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: nativeTitle, // From content file
    description: nativeDescription, // From content file
    keywords: nativeKeywords, // From keywords.txt
    robots: { index: true, follow: true }, // MUST be indexable!
    alternates: {
      canonical: `https://www.lessoncraftstudio.com/${locale}/apps/${nativeSlug}`,
      languages: {
        // hreflang for all 11 versions
        'en': '/en/apps/addition-worksheets',
        'de': '/de/apps/additionsarbeitsblatter',
        // ... etc
      }
    }
  };
}
```

**Language-Specific Elements:**
- Native alt text for all images
- Native anchor text for internal links
- Native schema markup (ProductPage JSON-LD)
- Native Open Graph tags

---

## 📁 CONTENT SOURCES

### Text Content:
```
INDIVIDUAL APP PAGES/
├── English/
│   ├── addition.md
│   ├── alphabet-train.md
│   └── ... (33 files)
├── German/
├── French/
├── Spanish/
├── Italian/
├── Portuguese/
├── Dutch/
├── Swedish/
├── Danish/
├── Norwegian/
└── Finnish/
```

### Sample Images/PDFs:
```
samples/
├── english/
│   ├── addition/
│   │   ├── addition_worksheet portrait.jpeg
│   │   ├── addition_worksheet portrait.pdf
│   │   ├── addition_answer_key portrait.jpeg
│   │   └── ...
│   ├── wordsearch/
│   └── ... (per app)
├── german/
├── french/
└── ... (per language - to be added)
```

### Keywords:
```
INDIVIDUAL APP PAGES/keywords.txt
- 10 keywords per language
- Must appear 10+ times in H2/H3 titles
```

---

## 🏗️ FILE STRUCTURE

### Product Page Components (IMPLEMENTED):
```
frontend/components/product-page/
├── HeroSection.tsx      ✅ CREATED - Full-width hero with gradient, CTAs, trust badges
├── SampleGallery.tsx    ✅ CREATED - Carousel with worksheet/answer key toggle, lightbox
├── FeaturesGrid.tsx     ✅ CREATED - 7 feature cards with staggered animations
├── HowToGuide.tsx       ✅ CREATED - 5-step timeline with progress indicator
├── UseCases.tsx         ✅ CREATED - 6 persona cards with quotes
├── FAQSection.tsx       ✅ CREATED - Accordion FAQ with pricing sidebar
├── RelatedApps.tsx      ✅ CREATED - Related apps grid + final CTA section
├── ProductPageClient.tsx ✅ CREATED - Main assembly component with type definitions
└── index.ts             ✅ CREATED - Exports all components and types
```

### Key Type Definitions (from ProductPageClient.tsx):
- `ProductPageContent` - Main interface for all page content
- `Sample` - Worksheet/answer key image data
- `Feature` - Feature card data
- `Step` - How-to step data
- `UseCase` - User persona data
- `FAQItem` - Question/answer pair
- `RelatedApp` - Related app card data

### Content Files Structure (ACTUAL - IMPLEMENTED):
```
frontend/content/product-pages/
├── en/                              ← English content files
│   ├── addition-worksheets.ts       ✅ CREATED (First file!)
│   ├── subtraction-worksheets.ts    (to be created)
│   ├── alphabet-train.ts            (to be created)
│   └── ... (33 files total)
├── de/                              ← German content files
│   ├── additionsarbeitsblatter.ts   (to be created)
│   └── ...
├── fr/                              ← French content files
├── es/                              ← Spanish content files
├── it/                              ← Italian content files
├── pt/                              ← Portuguese content files
├── nl/                              ← Dutch content files
├── sv/                              ← Swedish content files
├── da/                              ← Danish content files
├── no/                              ← Norwegian content files
└── fi/                              ← Finnish content files

Total: 11 languages × 33 apps = 363 TypeScript content files
```

### Content File Format (TypeScript):
Each content file exports a `ProductPageContent` object:

```typescript
// Example: frontend/content/product-pages/en/addition-worksheets.ts
import { ProductPageContent } from '@/components/product-page/ProductPageClient';

export const additionEnContent: ProductPageContent = {
  hero: { title, subtitle, description, previewImageSrc, ctaLabels, trustBadges },
  samples: { sectionTitle, items: Sample[] },
  features: { sectionTitle, sectionDescription, items: Feature[] },
  howTo: { sectionTitle, steps: Step[] },
  useCases: { sectionTitle, items: UseCase[] },
  faq: { sectionTitle, items: FAQItem[] },
  pricing: { title, price, priceInterval, benefits },
  relatedApps: { sectionTitle, items: RelatedApp[] },
};

export default additionEnContent;
```

### Why TypeScript Instead of JSON:
- Type-safe content structure
- Import type definitions from ProductPageClient
- Better IDE autocomplete and error checking
- Can include comments for translators

### Modified Files:
```
frontend/app/[locale]/apps/[slug]/
├── page.tsx (restructure for product pages)
└── ProductPageClient.tsx (new client component)

frontend/tailwind.config.js (add animations)
frontend/app/globals.css (add product page styles)
```

---

## 🔀 NATIVE SLUG MAPPING

### 🔴 CRITICAL: Slug Mapping Must Be Created First

Before implementation, we need a complete mapping file:
```
frontend/lib/product-page-slugs.ts
```

This file will contain the native slugs for ALL 33 apps in ALL 11 languages (363 entries).

### Example Structure:
```typescript
// frontend/lib/product-page-slugs.ts

export const appSlugs: Record<string, Record<string, string>> = {
  'addition': {
    en: 'addition-worksheets',
    de: 'additionsarbeitsblatter',
    fr: 'fiches-addition',
    es: 'fichas-de-sumas',
    it: 'schede-addizione',
    pt: 'fichas-adicao',
    nl: 'optel-werkbladen',
    sv: 'additions-arbetsblad',
    da: 'additions-arbejdsark',
    no: 'addisjons-arbeidsark',
    fi: 'yhteenlasku-tehtavat',
  },
  'subtraction': {
    en: 'subtraction-worksheets',
    de: 'subtraktionsarbeitsblatter',
    fr: 'fiches-soustraction',
    es: 'fichas-de-restas',
    // ... etc
  },
  // ... 31 more apps
};

// Reverse lookup: find app ID from any native slug
export const slugToAppId: Record<string, string> = {
  'addition-worksheets': 'addition',
  'additionsarbeitsblatter': 'addition',
  'fiches-addition': 'addition',
  'fichas-de-sumas': 'addition',
  // ... all 363 slugs
};

// Get native slug for an app in a specific locale
export function getNativeSlug(appId: string, locale: string): string {
  return appSlugs[appId]?.[locale] || appId;
}

// Get app ID from any native slug
export function getAppIdFromSlug(slug: string): string | null {
  return slugToAppId[slug] || null;
}
```

### Example: Addition Worksheets
| Language | Native Slug | Content File |
|----------|-------------|--------------|
| English | `addition-worksheets` | `en/addition-worksheets.json` |
| German | `additionsarbeitsblatter` | `de/additionsarbeitsblatter.json` |
| French | `fiches-addition` | `fr/fiches-addition.json` |
| Spanish | `fichas-de-sumas` | `es/fichas-de-sumas.json` |
| Italian | `schede-addizione` | `it/schede-addizione.json` |
| Portuguese | `fichas-adicao` | `pt/fichas-adicao.json` |
| Dutch | `optel-werkbladen` | `nl/optel-werkbladen.json` |
| Swedish | `additions-arbetsblad` | `sv/additions-arbetsblad.json` |
| Danish | `additions-arbejdsark` | `da/additions-arbejdsark.json` |
| Norwegian | `addisjons-arbeidsark` | `no/addisjons-arbeidsark.json` |
| Finnish | `yhteenlasku-tehtavat` | `fi/yhteenlasku-tehtavat.json` |

### How Slugs Are Derived:
The native slugs are extracted from the H1 title of each markdown file:

**From `INDIVIDUAL APP PAGES/German/addition.md`:**
```markdown
# Kostenlose Additionsarbeitsblätter zum Ausdrucken...
```
→ Slug: `additionsarbeitsblatter` (lowercase, no umlauts, hyphenated)

**From `INDIVIDUAL APP PAGES/French/addition.md`:**
```markdown
# Fiches d'Addition Gratuites à Imprimer...
```
→ Slug: `fiches-addition` (lowercase, no accents, hyphenated)

*Note: Full slug mapping for all 33 apps × 11 languages = 363 slugs will be extracted from markdown H1 titles*

---

## ✅ APPROVAL WORKFLOW

For each app (starting with English Addition):

1. **Part 1 (Hero)** → I design → You approve → Proceed
2. **Part 2 (Samples)** → I design → You approve → Proceed
3. **Part 3 (Features)** → I design → You approve → Proceed
4. **Part 4 (How-To)** → I design → You approve → Proceed
5. **Part 5 (Use Cases)** → I design → You approve → Proceed
6. **Part 6 (FAQ)** → I design → You approve → Proceed
7. **Part 7 (Related)** → I design → You approve → Complete

After English Addition is complete:
- Apply template to remaining 32 English apps
- Adapt for 10 other languages (330 more pages)

---

## 🚫 COMMON MISTAKES TO AVOID

### ❌ Wrong Link Targets:
```tsx
// WRONG - Links to app that requires subscription
<Button href="/worksheet-generators/addition.html">Try Now</Button>

// CORRECT - Links to signup
<Button href={`/${locale}/auth/signup`}>Start Creating Free</Button>
```

### ❌ Hardcoded English Text:
```tsx
// WRONG
<h1>Free Printable Addition Worksheets</h1>

// CORRECT - From content file
<h1>{content.hero.title}</h1>
```

### ❌ Same Slug Across Languages:
```tsx
// WRONG - Using English slug for all
/de/apps/addition-worksheets
/fr/apps/addition-worksheets

// CORRECT - Native slugs
/de/apps/additionsarbeitsblatter
/fr/apps/fiches-addition
```

### ❌ Missing robots directive:
```tsx
// WRONG - Not indexable (current state!)
robots: { index: false, follow: false }

// CORRECT - Must be indexable
robots: { index: true, follow: true }
```

---

## 📋 CHECKLIST BEFORE EACH DESIGN PART

Before designing any part, verify:

- [ ] I'm creating NEW React/TypeScript components
- [ ] I'm NOT touching REFERENCE folders
- [ ] All CTAs link to signup/apps/pricing pages (NOT worksheet generators)
- [ ] Content comes from `INDIVIDUAL APP PAGES/{Language}/{app}.md`
- [ ] Samples come from `samples/{language}/{app}/`
- [ ] The design is Modern SaaS style
- [ ] Animations use Framer Motion
- [ ] The component is responsive (mobile-first)

---

## 📞 QUICK REFERENCE

### When You Say "Design Part X":
I will use the `frontend-design` plugin to create:
- A React/TypeScript component
- Tailwind CSS styling
- Framer Motion animations
- Props interface for content injection

### I Will NOT:
- Touch any REFERENCE folders
- Link to subscription-required apps
- Modify worksheet generator HTML files
- Overwrite any existing production assets

### Deployment After All Parts Complete:
```bash
# Scenario 1: Code changes only
git pull && cd frontend && npm run build && ...
```

---

**Document Version:** 1.0
**Last Updated:** 2025-12-29
**Author:** Claude (for user reference)
