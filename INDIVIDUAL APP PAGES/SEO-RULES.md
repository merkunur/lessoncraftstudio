# SEO APP PAGES - CRITICAL RULES (DO NOT FORGET!)

---

## 🔴🔴🔴 MANDATORY: THREE FILES MUST BE UPDATED FOR EVERY PRODUCT PAGE 🔴🔴🔴

**THIS IS THE #1 CAUSE OF DEPLOYMENT FAILURES. READ THIS FIRST.**

When creating a new product page with a language-specific slug (e.g., French `comparaison-quantites-fiches`), you MUST update **ALL THREE** of these files or the page WILL NOT WORK correctly:

### THE THREE MANDATORY FILES:

| # | File Path | Purpose | What to Add |
|---|-----------|---------|-------------|
| **1** | `frontend/content/product-pages/[locale]/[app]-worksheets.ts` | Content file | The actual page content with SEO slug |
| **2** | `frontend/config/product-page-content.ts` | Content registry | Import + slug-to-content mapping |
| **3** | `frontend/config/product-page-slugs.ts` | Slug lookup | App ID to locale-specific slug mapping |
| **4** | `frontend/components/apps/AppCard.tsx` | Link generation | Hardcoded slug mapping in `appIdToProductSlugByLocale` |

### ⚠️ CRITICAL: AppCard.tsx HAS ITS OWN HARDCODED MAPPING ⚠️

**THIS IS THE MOST COMMONLY MISSED FILE!**

`AppCard.tsx` contains a **separate hardcoded slug mapping** called `appIdToProductSlugByLocale` that is **NOT** connected to `product-page-slugs.ts`.

**If you don't update AppCard.tsx:**
- The apps listing page (`/fr/apps`) will link to ENGLISH slugs
- User clicks "More or Less" on French page → Goes to `/fr/apps/more-less-worksheets` (WRONG!)
- Should go to `/fr/apps/comparaison-quantites-fiches` (CORRECT!)

### EXAMPLE: Adding French slug for "more-less" app

**File 1: `frontend/content/product-pages/fr/more-less-worksheets.ts`**
```typescript
seo: {
  slug: 'comparaison-quantites-fiches',  // French SEO slug
  appId: 'more-less',
  // ... rest of content
}
```

**File 2: `frontend/config/product-page-content.ts`**
```typescript
// Add import at top
import moreLessFrContent from '@/content/product-pages/fr/more-less-worksheets';

// Add to fr: { } section in contentRegistry
'comparaison-quantites-fiches': moreLessFrContent,
```

**File 3: `frontend/config/product-page-slugs.ts`**
```typescript
{
  appId: 'more-less',
  slugs: {
    en: 'more-less-worksheets',
    sv: 'jamforelse-arbetsblad',
    de: 'mehr-weniger-arbeitsblaetter',
    fr: 'comparaison-quantites-fiches',  // ADD THIS LINE
  },
},
```

**File 4: `frontend/components/apps/AppCard.tsx`** (around line 174)
```typescript
'more-less': {
  en: 'more-less-worksheets',
  sv: 'jamforelse-arbetsblad',
  de: 'mehr-weniger-arbeitsblaetter',
  fr: 'comparaison-quantites-fiches',  // ADD THIS LINE - CRITICAL!
},
```

### 🚨 VERIFICATION CHECKLIST - DO THIS BEFORE DEPLOYMENT 🚨

Before deploying ANY product page, verify ALL FOUR locations:

- [ ] **Content file created** in `frontend/content/product-pages/[locale]/`
- [ ] **Import added** to `frontend/config/product-page-content.ts`
- [ ] **Slug mapping added** to `frontend/config/product-page-content.ts` registry
- [ ] **Slug added** to `frontend/config/product-page-slugs.ts`
- [ ] **Slug added** to `frontend/components/apps/AppCard.tsx` in `appIdToProductSlugByLocale`
- [ ] **Metadata added** to `frontend/app/[locale]/apps/[slug]/page.tsx` (generateMetadata function)
- [ ] **Static param added** to `frontend/app/[locale]/apps/[slug]/page.tsx` (generateStaticParams)

### WHY THIS ARCHITECTURE EXISTS

The codebase has **duplicate slug configurations** due to legacy code:
- `product-page-slugs.ts` = intended centralized source (newer)
- `AppCard.tsx` = legacy hardcoded mapping (older, still actively used)

**AppCard.tsx generates links from the apps listing page**, so if you don't update it, users clicking on app cards will navigate to the WRONG URL.

**DO NOT ASSUME `product-page-slugs.ts` IS USED EVERYWHERE. IT IS NOT.**

---

## 🚨🚨🚨 THE ONLY THING THAT MATTERS: KEYWORD COUNTS IN H2/H3 TITLES 🚨🚨🚨

**THE PRIMARY MISSION - NEVER FORGET THIS:**

**Get EVERY keyword from keywords.txt to appear MINIMUM 10 times IN H2/H3 TITLES ONLY.**

**NOT in body text. ONLY in H2/H3 titles. Body text does NOT count.**

---

## ⚠️⚠️⚠️ CATASTROPHIC FAILURE EXAMPLE ⚠️⚠️⚠️

**CODE ADDITION APP PAGE - COMPLETE FAILURE:**

**Required:** MINIMUM 10 occurrences in H2/H3 titles ONLY for ALL keywords

**What was delivered:**
- Kindergarten worksheets: **1** ❌ (needed 10)
- Sight words worksheets: **0** ❌ (needed 10)
- Phonics worksheets: **1** ❌ (needed 10)
- Alphabet worksheets: **1** ❌ (needed 10)
- Tracing worksheets: **1** ❌ (needed 10)
- Coloring worksheets: **1** ❌ (needed 10)
- First grade worksheets: **2** ❌ (needed 10)

**Result:** THE ENTIRE 7500-WORD PAGE IS COMPLETELY USELESS FOR SEO.

**Why it happened:** Got focused on pricing verification and forgot the PRIMARY MISSION.

**This must NEVER happen again.**

---

## 🔥🔥🔥 MANDATORY KEYWORD TRACKING - DO THIS OR FAIL 🔥🔥🔥

**BEFORE WRITING SECTION 1, YOU MUST:**

1. **Create a keyword tracking file:** `[app-name]-keyword-count.txt`
2. **List ALL 10 keywords from keywords.txt**
3. **Set counter to 0 for each keyword**

**AFTER WRITING EACH SECTION, YOU MUST:**

1. **Count how many times EACH keyword appears in H2/H3 titles of that section**
2. **Update the tracking file with running totals**
3. **Report the updated counts to the user**
4. **If any keyword has < 10 total after Section 7, THE PAGE HAS FAILED**

**EXAMPLE TRACKING FILE FORMAT:**
```
KEYWORD TRACKING - Code Addition App

After Section 1 (Hero):
- Kindergarten worksheets: 0
- Math worksheets: 2
- Sight words worksheets: 0
- Phonics worksheets: 0
- Alphabet worksheets: 0
- Addition worksheets: 1
- Tracing worksheets: 0
- Free printable worksheets: 1
- Coloring worksheets: 0
- First grade worksheets: 0

After Section 2 (Features):
- Kindergarten worksheets: 1 (added 1 in this section)
- Math worksheets: 5 (added 3 in this section)
[... etc]

FINAL TOTALS AFTER SECTION 7:
- Kindergarten worksheets: 12 ✓ (minimum 10 met)
- Math worksheets: 15 ✓
[... all must be ✓]
```

**IF YOU DO NOT MAINTAIN THIS TRACKING FILE, YOU WILL FAIL THE PRIMARY MISSION.**

---

## 🚨🚨🚨 100% LANGUAGE CONSISTENCY RULE - NO ENGLISH ON NON-ENGLISH PAGES 🚨🚨🚨

**THIS IS A TOP PRIORITY RULE - VIOLATIONS ARE UNACCEPTABLE**

### The Problem
ProductPageClient components have **hardcoded English default props**. When the content file doesn't provide UI labels, components fall back to English text. This causes English words to appear on Swedish, German, French, etc. pages.

**Example of failure:**
- Swedish page shows "Features" instead of "Funktioner"
- Swedish page shows "Read more" instead of "Läs mer"
- Swedish page shows "Full Access" instead of "Full Tillgång"

### The Rule
**EVERY SINGLE WORD on a non-English page MUST be in the target language.**

- NO English text on Swedish pages
- NO English text on German pages
- NO English text on French pages
- This includes ALL: badges, buttons, labels, trust indicators, CTA text

### Components with English Defaults (MUST OVERRIDE)

The following components have hardcoded English defaults that MUST be overridden in content files:

1. **HeroSection.tsx** - CTA labels, trust badges, floating stats
2. **SampleGallery.tsx** - 11 English string defaults
3. **FeaturesGrid.tsx** - 8 English string defaults
4. **HowToGuide.tsx** - 7 English string defaults
5. **FAQSection.tsx** - 17+ English string defaults
6. **RelatedApps.tsx** - 9+ English string defaults

---

## 🚨 MANDATORY UI LABELS CHECKLIST - INCLUDE ALL OF THESE 🚨

**BEFORE CREATING ANY NON-ENGLISH PRODUCT PAGE, YOU MUST INCLUDE ALL THESE LABELS:**

### Hero Section - Required Labels
```typescript
hero: {
  ctaLabels: {
    tryFree: '[TRANSLATE: Try Free]',
    viewSamples: '[TRANSLATE: View Samples]',
  },
  trustBadges: {
    languages: '[TRANSLATE: 11 Languages]',
    images: '[TRANSLATE: 3000+ Images]',
    license: '[TRANSLATE: Commercial License]',
  },
  readMoreLabel: '[TRANSLATE: Read more]',
  showLessLabel: '[TRANSLATE: Show less]',
  floatingStats: {
    time: '[TRANSLATE: 3 min]',
    action: '[TRANSLATE: Create & Download]',
    quality: '[TRANSLATE: 300 DPI]',
  },
}
```

### Samples Section - Required Labels
```typescript
samples: {
  downloadLabel: '[TRANSLATE: Download Free Sample]',
  worksheetLabel: '[TRANSLATE: Worksheet]',
  answerKeyLabel: '[TRANSLATE: Answer Key]',
  viewAllLabel: '[TRANSLATE: View larger]',
  noPdfLabel: '[TRANSLATE: Preview only]',
  freePdfCountLabel: '[TRANSLATE: free downloads]',
  badgeText: '[TRANSLATE: Free Samples]',
  downloadingLabel: '[TRANSLATE: Downloading...]',
  ofLabel: '[TRANSLATE: of]',
}
```

### Features Section - Required Labels
```typescript
features: {
  highlightBadgeText: '[TRANSLATE: Key Feature]',
  badgeText: '[TRANSLATE: Features]',
  readMoreLabel: '[TRANSLATE: Read more]',
  showLessLabel: '[TRANSLATE: Show less]',
  trustBadges: {
    allFeatures: '[TRANSLATE: All features included]',
    noHiddenFees: '[TRANSLATE: No hidden fees]',
    cancelAnytime: '[TRANSLATE: Cancel anytime]',
  },
}
```

### How-To Section - Required Labels
```typescript
howTo: {
  ctaText: '[TRANSLATE: Start Creating Now]',
  badgeText: '[TRANSLATE: How It Works]',
  stepLabel: '[TRANSLATE: Step]',
  completionTitle: '[TRANSLATE: Done!]',
  completionSubtitle: '[TRANSLATE: Your worksheet is ready]',
  readyTime: '[TRANSLATE: Ready in under 3 minutes]',
  noSkillsNeeded: '[TRANSLATE: No design skills needed]',
  readMoreLabel: '[TRANSLATE: Read more]',
  showLessLabel: '[TRANSLATE: Show less]',
}
```

### Use Cases Section - Required Labels
```typescript
useCases: {
  badgeText: '[TRANSLATE: Use Cases]',
  readMoreLabel: '[TRANSLATE: Read more]',
  showLessLabel: '[TRANSLATE: Show less]',
}
```

### FAQ Section - Required Labels
```typescript
faq: {
  showMoreText: '[TRANSLATE: Show more questions]',
  showLessText: '[TRANSLATE: Show fewer]',
  badgeText: '[TRANSLATE: FAQ]',
  readMoreLabel: '[TRANSLATE: Read more]',
  showLessLabel: '[TRANSLATE: Show less]',
  secureCheckout: '[TRANSLATE: Secure checkout]',
  cancelAnytime: '[TRANSLATE: Cancel anytime]',
}
```

### Pricing Section - Required Labels
```typescript
pricing: {
  title: '[TRANSLATE: Full Access]',  // CRITICAL: Not "Full Access"!
  priceInterval: '[TRANSLATE: /year]',
  priceSuffix: '[TRANSLATE: Billed annually]',
  ctaText: '[TRANSLATE: Start Creating Now]',
}
```

### Related Apps Section - Required Labels
```typescript
relatedApps: {
  ctaTitle: '[TRANSLATE: Ready to Create Amazing Worksheets?]',
  ctaDescription: '[TRANSLATE: Join thousands of educators...]',
  primaryCtaText: '[TRANSLATE: Start Free Trial]',
  secondaryCtaText: '[TRANSLATE: View All 33 Apps]',
  badgeText: '[TRANSLATE: Works Great With]',
  exploreText: '[TRANSLATE: Explore all apps]',
  trustBadges: {
    securePayment: '[TRANSLATE: Secure payment]',
    cancelAnytime: '[TRANSLATE: Cancel anytime]',
  },
}
```

---

## 📋 SWEDISH UI LABELS TEMPLATE (Copy for Swedish Pages)

```typescript
// SWEDISH UI LABELS - Copy these exactly for Swedish product pages

hero: {
  ctaLabels: {
    tryFree: 'Prova Gratis',
    viewSamples: 'Visa Exempel',
  },
  trustBadges: {
    languages: '11 Språk',
    images: '3000+ Bilder',
    license: 'Kommersiell Licens',
  },
  readMoreLabel: 'Läs mer',
  showLessLabel: 'Visa mindre',
  floatingStats: {
    time: '3 min',
    action: 'Skapa & Ladda Ner',
    quality: '300 DPI',
  },
}

samples: {
  downloadLabel: 'Ladda Ner Gratis Exempel',
  worksheetLabel: 'Arbetsblad',
  answerKeyLabel: 'Facit',
  viewAllLabel: 'Visa större',
  noPdfLabel: 'Endast förhandsgranskning',
  freePdfCountLabel: 'gratis nedladdningar',
  badgeText: 'Gratis Exempel',
  downloadingLabel: 'Laddar ner...',
  ofLabel: 'av',
}

features: {
  highlightBadgeText: 'Nyckelfunktion',
  badgeText: 'Funktioner',
  readMoreLabel: 'Läs mer',
  showLessLabel: 'Visa mindre',
  trustBadges: {
    allFeatures: 'Alla funktioner inkluderade',
    noHiddenFees: 'Inga dolda avgifter',
    cancelAnytime: 'Avsluta när som helst',
  },
}

howTo: {
  ctaText: 'Börja Skapa Nu',
  badgeText: 'Så Fungerar Det',
  stepLabel: 'Steg',
  completionTitle: 'Klart!',
  completionSubtitle: 'Ditt arbetsblad är redo',
  readyTime: 'Klart på under 3 minuter',
  noSkillsNeeded: 'Inga designkunskaper behövs',
  readMoreLabel: 'Läs mer',
  showLessLabel: 'Visa mindre',
}

useCases: {
  badgeText: 'Användningsområden',
  readMoreLabel: 'Läs mer',
  showLessLabel: 'Visa mindre',
}

faq: {
  showMoreText: 'Visa fler frågor',
  showLessText: 'Visa färre',
  badgeText: 'Vanliga Frågor',
  readMoreLabel: 'Läs mer',
  showLessLabel: 'Visa mindre',
  secureCheckout: 'Säker betalning',
  cancelAnytime: 'Avsluta när som helst',
}

pricing: {
  title: 'Full Tillgång',  // NOT "Full Access"!
  priceInterval: '/år',
  priceSuffix: 'Faktureras årligen',
  ctaText: 'Börja Skapa Nu',
}

relatedApps: {
  ctaTitle: 'Redo att Skapa Fantastiska Arbetsblad?',
  ctaDescription: 'Gå med tusentals pedagoger som skapar professionella arbetsblad.',
  primaryCtaText: 'Starta Gratis Provperiod',
  secondaryCtaText: 'Visa Alla 33 Appar',
  badgeText: 'Fungerar Utmärkt Med',
  exploreText: 'Utforska alla appar',
  trustBadges: {
    securePayment: 'Säker betalning',
    cancelAnytime: 'Avsluta när som helst',
  },
}
```

---

## 🔍 LANGUAGE VERIFICATION CHECKLIST

**AFTER CREATING ANY NON-ENGLISH PRODUCT PAGE:**

- [ ] ALL UI labels included in content file (not relying on defaults)
- [ ] NO English text appears anywhere on the page
- [ ] Verified by curl/grep: `curl -s '[URL]' | grep -oiE 'Features|Read more|Show less|Full Access|...'` returns empty
- [ ] Pricing section uses translated product name (e.g., "Full Tillgång" not "Full Access")
- [ ] Trust badges are fully translated
- [ ] CTA buttons are fully translated

### COMMON ENGLISH WORDS TO SEARCH FOR:
Search the rendered page for these English words that should NOT appear:
- Features, FAQ, Use Cases, How It Works
- Read more, Show less, Show more
- Full Access, Core Bundle
- Try Free, View Samples, Start Creating
- Cancel anytime, Secure payment, No hidden fees
- Download, Downloading, Preview
- Step, Done, Ready

---

## ⚠️⚠️⚠️ PRICING VERIFICATION - SECONDARY REQUIREMENT ⚠️⚠️⚠️

**AFTER verifying keywords, THEN verify pricing:**

1. **Scroll down to "COMPLETE APP PRICING LIST"**
2. **Find the app name in the list**
3. **Verify if it's Core Bundle ($144) or Full Access ($240)**
4. **Use ONLY the correct pricing throughout the entire document**

**RECENT PRICING ERRORS:**
- ❌ Writing "Core Bundle" for Big Small (it's Full Access)
- ❌ Writing "Core Bundle" for Chart Count (it's Full Access)
- ❌ Writing "Core Bundle" for Code Addition (it's Full Access)

---

## PRIMARY MISSION

**Build 33 app pages to rank in TOP 10 search results for ALL keywords in keywords.txt across ALL 11 supported languages.**

**HOW WE RANK:**
- Get EVERY keyword to appear MINIMUM 10 times in H2/H3 titles
- This requires 40-70+ H3 subsections across all 7 sections
- Keywords in body text DO NOT COUNT toward the minimum

### Core Objectives (in priority order):

1. **SEO FIRST** - Rank top 10 for keywords in keywords.txt
2. **User Information SECOND** - Give ordinary users information about the app
3. **Readability MATTERS** - Easy to read = better SEO

### Target:
- 33 apps × 11 languages = 363 pages
- Each page: 5000+ words minimum
- Every keyword appears minimum 10 times in titles/subtitles + body

---

## 🚨🚨🚨 MANDATORY PRE-WRITING CHECKLIST 🚨🚨🚨

**BEFORE WRITING A SINGLE WORD, YOU MUST COMPLETE THIS CHECKLIST:**

### Step 1: VERIFY APP PRICING TIER
- [ ] Look up app name in "COMPLETE APP PRICING LIST" section below
- [ ] Write down: `[APP NAME] = Core Bundle ($144)` OR `[APP NAME] = Full Access ($240)`
- [ ] If app is NOT in the list, STOP and ASK USER

### Step 2: VERIFY CORRECT PRICING LANGUAGE
**If Core Bundle app:**
- [ ] Use "$144/year" or "$15/month"
- [ ] Use "Core Bundle subscription"
- [ ] Use "10 apps included"

**If Full Access app:**
- [ ] Use "$240/year" or "$25/month"
- [ ] Use "Full Access subscription"
- [ ] Use "all 33 apps included"

### Step 3: VERIFY COMMERCIAL LICENSE LANGUAGE
**If Core Bundle app:**
- [ ] "Core Bundle includes commercial license"
- [ ] "Both Core Bundle and Full Access include commercial license"

**If Full Access app:**
- [ ] "Full Access includes commercial license"
- [ ] NEVER say "Core Bundle includes" for Full Access apps

### Step 4: CONFIRM YOU'VE VERIFIED
- [ ] I have looked up the app in the pricing list
- [ ] I have confirmed the correct tier
- [ ] I will use the correct pricing throughout the entire document
- [ ] I will NEVER mix Core Bundle and Full Access pricing

**IF YOU SKIP THIS CHECKLIST, YOU WILL MAKE PRICING ERRORS. DO NOT SKIP.**

---

## 🚨 PRICING FACTS - NEVER VIOLATE THESE 🚨

### CRITICAL: ACCURATE PRICING INFORMATION

**Source of Truth:** https://www.lessoncraftstudio.com/en/pricing

**ONLY Word Search is FREE:**
- Word Search generator (with watermark on worksheets)
- Personal use only (NO commercial use)
- Limited features

**ALL OTHER APPS REQUIRE PAID SUBSCRIPTION:**

---

## 🚨🚨🚨 COMPLETE APP PRICING LIST - VERIFY BEFORE WRITING ANYTHING 🚨🚨🚨

### ✅ CORE BUNDLE APPS ($144/year = $15/month) - ONLY THESE 10 APPS:

1. **Math Worksheets** = Core Bundle ($144/year)
2. **Word Scramble** = Core Bundle ($144/year)
3. **Addition Worksheets** = Core Bundle ($144/year)
4. **Alphabet Train** = Core Bundle ($144/year)
5. **Coloring Pages** = Core Bundle ($144/year)
6. **Find and Count** = Core Bundle ($144/year)
7. **MatchUp Maker** = Core Bundle ($144/year)
8. **Drawing Lines** = Core Bundle ($144/year)
9. **Picture Bingo** = Core Bundle ($144/year)
10. **Sudoku for Kids** = Core Bundle ($144/year)

**Total: 10 apps in Core Bundle at $144/year**

---

### ❌ FULL ACCESS APPS ($240/year = $25/month) - ALL OTHER 23 APPS:

1. **Big Small** = Full Access ($240/year) ⚠️
2. **Chart Count** = Full Access ($240/year) ⚠️
3. **Code Addition** = Full Access ($240/year) ⚠️
4. **Cryptogram** = Full Access ($240/year)
5. **Crossword** = Full Access ($240/year)
6. **Draw and Color** = Full Access ($240/year)
7. **Find Objects** = Full Access ($240/year)
8. **Grid Match** = Full Access ($240/year)
9. **I Spy** = Full Access ($240/year)
10. **Math Puzzle** = Full Access ($240/year)
11. **Missing Pieces** = Full Access ($240/year)
12. **More Less** = Full Access ($240/year)
13. **Odd One Out** = Full Access ($240/year)
14. **Pattern Train** = Full Access ($240/year)
15. **Pattern Worksheet** = Full Access ($240/year)
16. **Picture Path** = Full Access ($240/year)
17. **Picture Sort** = Full Access ($240/year)
18. **Prepositions** = Full Access ($240/year)
19. **Shadow Match** = Full Access ($240/year)
20. **Subtraction** = Full Access ($240/year)
21. **Treasure Hunt** = Full Access ($240/year)
22. **Word Guess** = Full Access ($240/year)
23. **Writing** = Full Access ($240/year)

**Total: 23 apps require Full Access at $240/year**

---

### 🚨 MANDATORY VERIFICATION BEFORE WRITING ANY CONTENT 🚨

**BEFORE writing a single word about ANY app, you MUST:**

1. **Look up the app name in the list above**
2. **Verify if it's Core Bundle ($144) or Full Access ($240)**
3. **Write down which tier it belongs to**
4. **Double-check you have the correct pricing**
5. **ONLY THEN start writing**

**IF YOU CANNOT FIND THE APP IN THE LISTS ABOVE:**
- **STOP IMMEDIATELY**
- **DO NOT GUESS**
- **ASK THE USER**

---

### ⚠️ COMMON MISTAKES TO AVOID ⚠️

**WRONG:**
- Writing "Core Bundle" for Big Small (it's Full Access)
- Writing "Core Bundle" for Chart Count (it's Full Access)
- Writing "Core Bundle" for Code Addition (it's Full Access)
- Writing "$144/year" for any Full Access app
- Writing "$15/month" for any Full Access app

**CORRECT:**
- Big Small = Full Access ($240/year or $25/month)
- Chart Count = Full Access ($240/year or $25/month)
- Code Addition = Full Access ($240/year or $25/month)
- All 23 Full Access apps = $240/year or $25/month

---

**Commercial License (POD):**
- Core Bundle: $144/year (includes 10 apps)
- Full Access: $240/year (includes all 33 apps)
- FREE tier: NO commercial license

### ❌ NEVER SAY:
- "This app is free"
- "Free to use"
- "No cost"
- "Generate unlimited worksheets for free"
- "Free account"

### ✅ ALWAYS SAY:
- "Free printable worksheets" (this is a SEARCH TERM, not a pricing claim)
- "Core Bundle subscription includes..."
- "With your subscription, you can..."
- "Premium features available with Core Bundle"
- "Subscription gives you access to..."

### ✅ SEO KEYWORD vs PRICING REALITY:
- **"Free printable worksheets"** is a TOP 10 keyword that people search for
- USE this keyword in titles for SEO (people searching for free materials)
- But NEVER claim the APP itself is free

### 🚨 CRITICAL: HOW TO USE "FREE" IN H1/H2/H3 TITLES WITHOUT CONFUSION 🚨

**THE PROBLEM:**
"Free" is a top SEO keyword BUT it creates confusion if not used carefully.

**THE RULE:**
"Free printable" ONLY modifies "worksheets" - NEVER modifies "generator/maker/tool"

**CORRECT H1 PATTERNS (Choose One):**

1. **Pattern A - "Free Printable" modifies "Worksheets" clearly:**
   - ✅ "Addition Worksheets Generator - Free Printable Math Worksheets for Kindergarten"
   - ✅ "Math Worksheet Maker - Create Free Printable Addition Worksheets"
   - Why it works: Clear separation - tool name first, then describes the worksheets as "free printable"

2. **Pattern B - Put "Free Printable Worksheets" first, clarify tool second:**
   - ✅ "Free Printable Addition Worksheets - Professional Math Worksheet Generator"
   - ✅ "Free Printable Math Worksheets - Addition Worksheet Maker for Teachers"
   - Why it works: "Free printable" clearly modifies "worksheets", then dash separates the tool description

3. **Pattern C - Drop "Free" entirely if ambiguous:**
   - ✅ "Printable Addition Worksheets - Math Worksheet Generator for Kindergarten"
   - ✅ "Addition Worksheet Maker - Professional Math Worksheets for First Grade"
   - Why it works: No confusion possible, still ranks well

**WRONG H1 PATTERNS (NEVER USE THESE):**
- ❌ "Free Printable Math Worksheets Generator"
  - Why wrong: Sounds like generator is free
- ❌ "Free Addition Worksheet Maker"
  - Why wrong: Says the maker is free
- ❌ "Create addition worksheets with our free printable generator"
  - Why wrong: Says generator is free

**MANDATORY FIRST PARAGRAPH RULE:**
The first paragraph MUST clarify subscription within the first 2-3 sentences.

**CORRECT First Paragraph Pattern:**
```
[H1 using Pattern A, B, or C above]

[Opening sentence with primary keyword]. [Second sentence mentioning Core Bundle subscription or "with your subscription"]. [Third sentence about benefits]. [Fourth sentence about time savings or value].
```

**Example First Paragraph (CORRECT):**
```
# Addition Worksheets Generator - Free Printable Math Worksheets for Kindergarten

Create professional addition worksheets with our math worksheet generator. Your Core Bundle subscription gives you unlimited worksheet creation with no per-worksheet fees. Generate custom printable addition worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.
```

**Example First Paragraph (WRONG - Missing Subscription Clarification):**
```
# Free Printable Addition Worksheets Generator  [WRONG H1]

Create professional addition worksheets in seconds with our free generator. [WRONG - says generator is free]
Perfect for kindergarten teachers who need math worksheets fast. [MISSING subscription mention]
```

### ✅ WHAT "FREE" ACTUALLY MEANS (When You Can Use It):

**"FREE" is acceptable in these contexts:**

1. **"Free printable worksheets"** = SEO search term (people search for this)
   - Use in H1/H2 titles for SEO ranking
   - Does NOT mean the app is free
   - Means: once you subscribe, create UNLIMITED worksheets without per-worksheet fees

2. **"Free from per-worksheet charges"** = Create unlimited worksheets with subscription
   - ✅ "Generate unlimited worksheets with your subscription"
   - ✅ "No per-worksheet fees - create as many as you need"
   - ✅ "Unlimited worksheet creation included in Core Bundle"
   - ❌ "Generate unlimited worksheets for free" (implies no subscription needed)

3. **"Free visual materials included"** = No extra fees for images, backgrounds, borders
   - ✅ "Access 3000+ images included with your subscription"
   - ✅ "All backgrounds and borders included - no extra charges"
   - ✅ "Complete image library access with Core Bundle"
   - ❌ "Free access to 3000+ images" (confusing - implies no subscription)
   - This is a MAJOR VALUE compared to competitors who charge per image or per template

4. **"Free POD license included"** = Commercial license included in subscription
   - ✅ "Print-on-demand commercial license included with Core Bundle"
   - ✅ "Sell your worksheets - commercial license included"
   - ✅ "No extra licensing fees beyond your subscription"
   - ❌ "Free commercial license" (confusing without context)
   - This is HUGE VALUE - competitors charge $50-$200/year EXTRA for commercial rights

### ❌ NEVER USE "FREE" TO MEAN:
- The app itself requires no payment
- No subscription needed
- Try before you buy
- Demo or trial version
- Limited free tier available

### 📝 EXAMPLES: RIGHT vs WRONG WAY TO USE "FREE"

**RIGHT ✅ - SEO Keyword in Title:**
- H1: "Free Printable Math Worksheets Generator"
- Body text: "With your Core Bundle subscription ($15/month), create unlimited math worksheets..."

**WRONG ❌ - Confusing Free Claim:**
- "Our math worksheet generator is completely free to use"
- Why wrong: Implies no subscription needed

**RIGHT ✅ - Unlimited Creation:**
- "Generate unlimited worksheets with your subscription - no per-worksheet fees"
- "Create as many worksheets as you need - all included in Core Bundle"

**WRONG ❌ - Ambiguous:**
- "Generate unlimited free worksheets"
- Why wrong: Unclear if "free" means no subscription or no per-worksheet fees

**RIGHT ✅ - Visual Materials Value:**
- "Access 3000+ images, all backgrounds, and borders included with Core Bundle - no extra charges for visual content"
- "Unlike competitors charging per image, all visual materials are included in your subscription"

**WRONG ❌ - Misleading:**
- "Free access to 3000+ images"
- Why wrong: Sounds like no subscription needed

**RIGHT ✅ - Commercial License Value:**
- "Print-on-demand commercial license included with Core Bundle - no extra licensing fees"
- "Sell your worksheets on Teachers Pay Teachers - commercial rights included in your $144/year subscription"

**WRONG ❌ - Incomplete:**
- "Free POD license for all worksheets"
- Why wrong: Doesn't clarify it's included with subscription

### 💎 THREE LEGITIMATE VALUE PROPOSITIONS (Unique to LessonCraft Studio)

**These are REAL advantages over competitors - emphasize them:**

1. **UNLIMITED WORKSHEET CREATION** (No Per-Worksheet Fees)
   - Competitors: Canva charges per design, Adobe charges per export
   - LessonCraft: $144/year = create unlimited worksheets
   - Value messaging: "Generate as many worksheets as you need - all included"
   - Annual savings vs competitors: $300-$500

2. **ALL VISUAL MATERIALS INCLUDED** (No Per-Image/Per-Template Fees)
   - Competitors: Teachers Pay Teachers charges $1-5 per clipart set, Creative Fabrica charges monthly
   - LessonCraft: 3000+ images, all backgrounds, all borders included in subscription
   - Value messaging: "Access complete image library - no extra charges for visual content"
   - Annual savings vs competitors: $200-$400

3. **COMMERCIAL LICENSE INCLUDED** (No Extra Licensing Fees)
   - Competitors: Creative Fabrica charges $79/year extra, Graphics Bundles charge $99-$199/year extra
   - LessonCraft: POD commercial license included in $144/year Core Bundle
   - Value messaging: "Sell your worksheets on Teachers Pay Teachers - commercial rights included"
   - Annual savings vs competitors: $79-$199

**TOTAL VALUE vs COMPETITORS:**
- Competitors: $144 (base) + $300 (per-design) + $300 (images) + $150 (commercial) = **$894/year**
- LessonCraft: **$144/year total**
- Savings: **$750/year** (83% less than competitors)

**Use this value story in content:**
- ✅ "Unlike competitors charging per worksheet, create unlimited with one subscription"
- ✅ "All images included - no per-image fees like other platforms"
- ✅ "Commercial license included - save $100-200/year compared to competitors"

### CORRECT PRICING LANGUAGE:

**For Section 5 (Subscription Reasons):**
- "Teachers subscribe to Core Bundle for three compelling reasons..."
- "Core Bundle costs $144 per year (or $15/month)"
- "Full Access costs $240 per year (or $25/month)"
- "Core Bundle includes 10 popular apps with commercial license"

**For General Text:**
- "With your Core Bundle subscription..."
- "Subscribers can download unlimited worksheets"
- "Your subscription includes commercial licensing"
- "Premium features require Core Bundle or Full Access"

---

## CONTENT PHILOSOPHY

### What This Content IS:
- **SEO-optimized content** targeting specific keywords
- **Easy-to-read** explanations for ordinary users
- **Factual** information based on actual app analysis
- **Short sentences** and simple language
- **Lots of titles and subtitles** packed with keywords

### What This Content IS NOT:
- ❌ Academic articles
- ❌ Technical documentation
- ❌ Algorithm explanations
- ❌ Technical terminology
- ❌ "How it works" behind the scenes

### Every Single Word Must:
✓ Target SEO ranking
✓ Be easy to understand
✓ Be factually accurate
✓ Use simple, short sentences

---

## WORKFLOW RULES

### ⚠️ RULE #1: WRITE ONE SECTION AT A TIME - NEVER BATCH SECTIONS ⚠️

**THIS IS ABSOLUTELY CRITICAL AND NON-NEGOTIABLE:**

🚫 **NEVER WRITE MULTIPLE SECTIONS IN ONE RESPONSE**
🚫 **NEVER WRITE ALL 7 SECTIONS TOGETHER**
🚫 **NEVER ASSUME YOU CAN CONTINUE TO THE NEXT SECTION**

✅ **ALWAYS WRITE EXACTLY ONE SECTION**
✅ **ALWAYS STOP AFTER COMPLETING ONE SECTION**
✅ **ALWAYS WAIT FOR USER TO SAY "continue" OR "ok" OR "yes"**
✅ **ONLY THEN proceed to the next section**

**THE CORRECT WORKFLOW:**

```
1. Write Section 1 ONLY
2. STOP and output the section
3. WAIT for user approval ("continue", "ok", "yes", etc.)
4. Write Section 2 ONLY
5. STOP and output the section
6. WAIT for user approval
7. Write Section 3 ONLY
8. STOP and output the section
9. WAIT for user approval
... repeat for all 7 sections
```

**WHY THIS MATTERS:**

- Writing all sections at once = **LOW QUALITY** because you run out of context
- ONE section at a time = **HIGH QUALITY** because you maintain focus
- User needs to review each section and approve before continuing
- This is NOT optional - this is MANDATORY

**EXAMPLES OF WHAT NOT TO DO:**

❌ Writing Section 1, then Section 2, then Section 3 in same response
❌ Writing "Here's Section 1... Now Section 2... Now Section 3..."
❌ Using Edit tool multiple times to add all sections
❌ Saying "I'll write all sections now"

**EXAMPLES OF CORRECT BEHAVIOR:**

✅ Write Section 1, then say "Section 1 complete. Waiting for approval to continue to Section 2."
✅ User says "ok" → Write Section 2 ONLY
✅ User says "continue" → Write next section ONLY
✅ User says "yes" → Write next section ONLY

**IF YOU EVER WRITE MORE THAN ONE SECTION IN A SINGLE RESPONSE, YOU HAVE FAILED.**

### 2. LANGUAGE ORDER
- Start with ENGLISH
- Complete ALL 33 app pages for English FIRST
- Only move to other languages after English is 100% complete

### 3. FILE ORGANIZATION

**DON'T CREATE LOTS OF DOCUMENTS!**

The ONLY file per app page is:
- `INDIVIDUAL APP PAGES/[Language]/[app-name].md`
- Example: `INDIVIDUAL APP PAGES/English/word-search.md`

Supporting files (only if needed):
- `[app-name]-features-analysis.md` - factual analysis of actual app
- Create language subfolders as needed

**DO NOT CREATE:**
- Long planning documents
- Multiple strategy files
- Separate keyword tracking files
- Unnecessary documentation

Keep it simple. One app page file. That's it.

---

## THE 7 GENERAL FEATURES (MUST APPEAR IN EVERY APP PAGE)

**CRITICAL**: Every single app page MUST emphasize all 7 features:

### 1. Easy Creation + Full Editability
- Select theme or individual images
- Everything on canvas is editable
- Drag, rotate, scale, delete any element

### 2. Unlimited Customization
- Extensive editability
- Background themes
- Border themes
- Text elements
- Color options
- Font options
- Create unlimited unique designs

### 3. Upload Own Images
- Multi-file upload
- All common formats (JPEG, PNG, GIF)
- Combine with library images
- Personalize for your students

### 4. 11 Languages (CRITICAL FOR SEO!)
**UI Languages**: English, German, French, Spanish, Italian, Portuguese (Brazilian), Dutch, Danish, Swedish, Norwegian, Finnish

**Content Languages**: Same 11 languages

**ESPECIALLY IMPORTANT** for text-based apps:
- Word Search
- Crossword
- Word Scramble
- Word Guess
- Prepositions
- Treasure Hunt
- I Spy

These apps use image filenames to create content - so language matters!

### 5. POD License
- Print-on-demand license included
- Sell on Etsy, Teachers Pay Teachers, Amazon KDP
- No attribution required
- Perfect for teacher entrepreneurs
- 300 DPI commercial quality

### 6. 3000+ Image Library
- Over 3000 child-friendly images
- Theme-based organization
- Easy theme selection
- Individual image browsing
- Backgrounds included
- Borders included
- Search functionality

### 7. Professional 300 DPI Quality
- High-resolution export
- Perfect for printing
- Perfect for selling
- JPEG and PDF formats
- Grayscale option (save ink)
- Professional quality worksheets

**NOTE**: Weave these 7 features naturally throughout ALL sections of every app page.

---

## SEO RULES - ABSOLUTELY CRITICAL

### RULE #1: EVERY H2 AND H3 MUST CONTAIN KEYWORDS FROM KEYWORDS.TXT

**ALL keywords from keywords.txt MUST appear in H2/H3 titles.**

**WRONG:**
```markdown
### Easy to Use
### Full Editing
### Download Options
```

**CORRECT:**
```markdown
### Create Word Search Worksheets in 3 Clicks - Fast Word Search Generator
### Free Printable Kindergarten Worksheets - Edit Everything on Canvas
### Download Math Worksheets and Phonics Worksheets - High-Quality PDF
```

**Why:** Search engines heavily weight H2 and H3 tags. You MUST use keywords from keywords.txt in these titles.

**How to fit ALL keywords in titles:**
- Rotate different keywords across H2/H3 tags
- Combine multiple keywords in one title: "Free Printable Kindergarten Worksheets and First Grade Worksheets"
- Use keyword variations: "Math Worksheets", "Alphabet Worksheets", "Sight Words Worksheets" across different H3s

### RULE #2: KEYWORD IN EVERY TITLE

Every single H1, H2, H3 MUST include:
- Primary keyword (word search, math worksheets, etc.)
- OR a high-value modifier (printable, free, kindergarten, etc.)

**Formula for H3 titles:**
`[Action + Primary Keyword] - [Benefit/Feature]`

Examples:
- "Create Word Search Worksheets in 3 Clicks - Fast Generator"
- "Download Printable Math Worksheets - High-Quality PDF"
- "Free Kindergarten Worksheets - 3000+ Image Library"

### RULE #3: EVERY KEYWORD FROM KEYWORDS.TXT MINIMUM 10 TIMES IN H2/H3 TITLES

**🚨 ABSOLUTELY CRITICAL - THIS IS THE ENTIRE POINT OF THESE PAGES 🚨**

**EVERY single keyword** listed in keywords.txt must appear **AT LEAST 10 times IN H2/H3 TITLES/SUBTITLES ONLY.**

**❌ DO NOT COUNT KEYWORDS IN BODY TEXT ❌**
**✅ ONLY COUNT KEYWORDS IN H2 AND H3 TITLES ✅**

**WHY:** Search engines give massive SEO weight to H2 and H3 tags. Body text keywords have minimal impact. The entire purpose of these 7000-word pages is to create dozens of H2/H3 titles stuffed with keywords from keywords.txt.

Example for English Word Search (from keywords.txt):
- "Kindergarten worksheets" - 10+ times **IN H2/H3 TITLES**
- "Math worksheets" - 10+ times **IN H2/H3 TITLES**
- "Sight words worksheets" - 10+ times **IN H2/H3 TITLES**
- "Phonics worksheets" - 10+ times **IN H2/H3 TITLES**
- "Alphabet worksheets" / "ABC worksheets" - 10+ times **IN H2/H3 TITLES**
- "Free printable worksheets" - 10+ times **IN H2/H3 TITLES**
- "Coloring worksheets" - 10+ times **IN H2/H3 TITLES**
- "First grade worksheets" - 10+ times **IN H2/H3 TITLES**
- "Addition worksheets" - 10+ times **IN H2/H3 TITLES**
- "Tracing worksheets" - 10+ times **IN H2/H3 TITLES**

**HOW TO ACHIEVE THIS:**
- Create MANY H3 subsections (15-25+ H3s across all 7 sections)
- Each H3 must contain 1-3 keywords from keywords.txt
- Rotate keywords across different H3s
- Combine multiple keywords in one H3: "Free Printable Kindergarten Worksheets and First Grade Worksheets"
- Use keyword variations across H3s: "Math Worksheets for Addition", "Phonics Worksheets and Sight Words Worksheets"
- **COUNT ONLY H2/H3 OCCURRENCES** - ignore body text when tracking

**EXAMPLE H3 STRUCTURE FOR ONE SECTION:**
```markdown
### Create Math Worksheets in 3 Clicks - Free Printable Kindergarten Worksheets
### Edit Phonics Worksheets and Sight Words Worksheets on Canvas
### Addition Worksheets for First Grade - Customize Every Element
### Download ABC Worksheets and Alphabet Worksheets as PDF
### Tracing Worksheets and Letter Tracing Worksheets - Professional Quality
### Coloring Worksheets Combined with Math Worksheets
```
(This example shows 6 H3s containing 12 keyword instances total)

### RULE #4: KEYWORD DENSITY TARGETS

Per 5000-word page:
- **Primary keyword**: 50-75 times (1.0-1.5%)
- **"Worksheet/Worksheets"**: 80-100 times
- **Each keyword from keywords.txt**: MINIMUM 10 times
- **"Free"**: 15-20 times
- **"Printable"**: 15-20 times
- **"Kindergarten" (or local equivalent)**: 10-15 times
- **"PDF"**: 8-10 times

### RULE #4: KEYWORDS IN FIRST AND LAST 100 WORDS

- Primary keyword MUST appear in first sentence
- Primary keyword MUST appear in last paragraph
- These positions have higher SEO weight

---

## CONTENT RULES

### SENTENCE LENGTH - CRITICAL FOR READABILITY AND SEO

**⚠️ READABILITY IS CRITICAL FOR SEO RANKING ⚠️**

**RULE: MAXIMUM 15 WORDS PER SENTENCE**

- Most sentences should be 8-12 words
- NEVER exceed 15 words per sentence
- Break long sentences into two or three shorter sentences
- Use periods liberally
- Short sentences = better readability = higher SEO ranking

**WRONG (too long - 25 words):**
```
Our easy-to-use coloring worksheet maker is perfect for kindergarten teachers and preschool educators who need custom coloring worksheets quickly.
```

**CORRECT (split into shorter sentences):**
```
Our coloring worksheet maker is easy to use. Perfect for kindergarten teachers and preschool educators. Create custom coloring worksheets quickly.
```

**Why This Matters:**
- Search engines measure readability scores
- Short sentences = higher readability scores = better SEO
- Users stay on page longer when content is easy to read
- Better engagement = higher search rankings
- Mobile users prefer short, scannable sentences

**Before Writing ANY Sentence:**
1. Count the words
2. If over 15 words, split into multiple sentences
3. Avoid connectors (and, but, so, because) - use periods instead
4. One idea per sentence
5. Aim for 8-12 words per sentence

### NO TECHNICAL LANGUAGE
❌ "The algorithm generates a grid matrix"
❌ "Using canvas rendering technology"
❌ "Optimized data structures"

✅ "Click generate and your worksheet appears"
✅ "Professional-looking worksheets in seconds"
✅ "Simple controls make it easy"

### USER BENEFITS FIRST
Focus on "What will this do for me?" not "How does it work?"

❌ "The system uses Fabric.js for editing"
✅ "Drag, resize, and rotate any image with your mouse"

### NATURAL LANGUAGE
Keywords must read naturally - not stuffed.

❌ "Our word search word search worksheets word search generator creates word search puzzles"
✅ "Our word search generator creates custom worksheets. Each word search puzzle downloads as a printable PDF"

---

## THE 7 GENERAL FEATURES (ALL APPS)

Every app page MUST mention all 7:

1. **Easy worksheet creation** - Theme selection or individual images
2. **Full editability** - Drag, rotate, scale, delete everything
3. **Upload custom images** - Multi-file upload, any format
4. **11 languages** - UI and content in 11 languages (CRITICAL for language-specific apps)
5. **POD license** - 300 DPI, sell on Etsy/TPT/KDP
6. **Image Library** - 3000+ child-friendly images, theme-based
7. **Professional quality** - PDF/JPEG, grayscale option, undo/redo

---

## STANDARD 7-SECTION STRUCTURE FOR ALL APP PAGES

**IMPORTANT:** All 33 apps across all 11 languages must follow this exact 7-section structure.

**Total Target**: 7,000-8,000 words per page

### Section 1: Hero / What Is This Tool (400-500 words)

**Goal:** Immediately answer "What is this?" and capture primary keywords

**Structure:**
- H1 with 3 keywords: `[Primary Keyword] - [Secondary Keyword] - [Tertiary Keyword]`
- 3 paragraphs explaining what the tool does
- Primary keyword appears 4-5 times
- Mention "free" and "printable" in first 2 sentences
- State main benefit clearly

**Example H1:**
```
Free Printable Word Search Worksheets - Word Search Generator for Kindergarten
```

---

### Section 2: Key Features (1000-1200 words)

**Goal:** Explain all 7 general features with keyword integration

**Structure:**
- H2 with keywords: `[App Name] Features - Everything You Need for [Keyword] Worksheets`
- Introduction paragraph (100 words)
- 7 H3 subsections (one per general feature)
- Every H3 contains keywords from keywords.txt
- Primary keyword 20-25 times throughout section

**The 7 H3 Features (adapt to each app):**
1. Easy Creation in 3 Clicks
2. Full Canvas Editability
3. Upload Custom Images
4. 11 Languages Support (emphasize for language-learning apps)
5. POD Commercial License
6. 3000+ Image Library
7. Professional 300 DPI Quality

**Example H3s:**
```
### Create Word Search Worksheets in 3 Clicks - Fast Word Search Generator
### Edit Everything on Your Word Search Worksheet - Full Customization
### Word Search Worksheets in 11 Languages - Multilingual Word Search Maker
```

---

### Section 3: How to Use - Step by Step Guide (1200-1400 words)

**Goal:** Show how easy it is + keyword repetition through examples

**Structure:**
- H2 with keywords: `How to Create [Keyword] Worksheets in 5 Easy Steps`
- Introduction (100 words) stating total time under 3 minutes
- 5 H3 steps (each 200-250 words)
- Every H3 contains keywords
- Primary keyword 25-30 times

**The 5 Standard Steps:**
1. Choose Your Content (theme, images, custom input)
2. Customize Settings (grid size, page format, difficulty)
3. Generate Your Worksheet (instant preview)
4. Edit on Canvas (full customization)
5. Download and Print (PDF/JPEG, answer key)

**Example H3s:**
```
### Step 1: Choose Your Content for Word Search Worksheets - Theme, Images, or Custom Words
### Step 2: Customize Word Search Settings - Printable Worksheets for Any Grade Level
### Step 5: Download Printable Word Search Worksheets - High-Quality PDF and JPEG Files
```

---

### Section 4: Use Cases - Who Benefits (1000-1200 words)

**Goal:** Appeal to different user segments + local education terms

**Structure:**
- H2 with keywords: `Perfect for Teachers, Parents, and Educators - [Keyword] for Every Need`
- Introduction (100 words)
- 6 H3 user types (150-200 words each)
- Every H3 contains keywords
- Use LOCAL education terminology for each language
- Primary keyword 20-25 times

**The 6 Standard User Types:**
1. Kindergarten/Preschool Teachers (use local terms)
2. Elementary School Teachers (first-third grade, local terms)
3. Homeschool Parents
4. ESL/Language Teachers
5. Special Education Teachers
6. Teacher Entrepreneurs (selling worksheets)

**CRITICAL: Use Appropriate Regional Education Terminology**

**English (United States):**
- Use US education system terminology
- "Kindergarten teachers", "first grade through third grade"
- "Preschool", "elementary school", "K-3"
- Common Core State Standards references appropriate
- Grade levels: K, 1st, 2nd, 3rd grade

**Portuguese (Brazilian):**
- Use Brazilian education system terminology
- "Educação Infantil" (ages 0-5), "Ensino Fundamental - Anos Iniciais" (grades 1-5)
- "Pré-escola" (ages 4-5), "1º ano" (ages 6-7), "2º ano" (ages 7-8), "3º ano" (ages 8-9)
- Brazilian curriculum references (BNCC - Base Nacional Comum Curricular)
- Terms: "professores de educação infantil", "alfabetização", "atividades"

**Spanish (South American - General):**
- Use South American Spanish education system terminology
- "Educación Inicial/Infantil" (preschool), "Educación Primaria" (elementary)
- "Preescolar", "Primer grado", "Segundo grado", "Tercer grado"
- Terms: "maestros de preescolar", "docentes de primaria", "fichas educativas"
- Note: Adapt specific grade names if targeting a specific country (e.g., Argentina, Chile, Colombia)

**Other Language Examples:**
- German: "Erzieher in der Vorschule", "1. Klasse bis 3. Klasse Grundschule"
- French: "enseignants de maternelle", "CP, CE1, CE2"
- Dutch: "leerkrachten groep 1-2", "groep 3, 4, 5"
- Danish: "pædagoger i børnehaveklassen", "1. til 3. klasse"
- Italian: "scuola dell'infanzia", "scuola primaria", "classe prima, seconda, terza"
- Swedish: "förskoleklass", "årskurs 1-3", "lågstadiet"
- Norwegian: "barnehage", "1. trinn, 2. trinn, 3. trinn", "småskoletrinnet"
- Finnish: "esiopetus", "alakoulu", "1. luokka, 2. luokka, 3. luokka"

---

### Section 5: Top 3 Reasons Teachers Subscribe - Premium Features (1000-1100 words)

**Goal:** Position the most compelling subscription value propositions

**Structure:**
- H2 with keywords: `Top 3 Reasons Teachers Subscribe - Premium [App Name] Features Worth Paying For`
- Introduction (80 words) explaining premium value
- 3 H3 subscription reasons (300-350 words each)
- Every H3 contains keywords
- Primary keyword 15-20 times

**The 3 Standard Subscription Reasons (adapt to each app):**

1. **Teaching Multiple Languages** (300-350 words)
   - ESL and bilingual education
   - World language instruction
   - Dual-language immersion programs
   - International schools
   - Heritage language programs
   - Adult ESL programs

2. **Commercial Licensing** (300-350 words)
   - Selling on Teachers Pay Teachers
   - Etsy printable shops
   - Amazon KDP low-content books
   - Specific income examples ($500-$5,000/month)
   - Pinterest marketing
   - Subscription/membership business models

3. **Time Savings and Productivity** (300-350 words)
   - 3 minutes vs 30-60 minutes traditional creation
   - Multi-subject worksheet needs
   - Special education differentiation
   - Substitute teacher preparation
   - Homeschool multi-level teaching
   - Teacher burnout reduction and work-life balance

**Example H3s:**
```
### Teaching Multiple Languages - Word Search Worksheets in 11 Languages for ESL
### Commercial Licensing - Selling Word Search Worksheets on Teachers Pay Teachers, Etsy, and Amazon KDP
### Time Savings and Productivity - Creating Professional Worksheets in Minutes Instead of Hours
```

**CRITICAL:** This section positions subscription value BEFORE FAQ where users decide whether to try the tool.

---

### Section 6: FAQ - Common Questions (1400-1600 words)

**Goal:** Long-tail keyword capture + address objections

**Structure:**
- H2 with keywords: `Frequently Asked Questions About [Keyword] Worksheets`
- Introduction (80 words)
- 12 H3 questions (100-140 words each)
- Every H3 is a question containing keywords
- Primary keyword 30-35 times

**The 12 Standard FAQ Questions (adapt to each app):**

1. Is this [app] generator really free to use?
2. Can I print [app] worksheets at home on a regular printer?
3. Do I need design skills to create [app] worksheets?
4. Can I use [app] worksheets in my classroom for students?
5. What languages are [app] worksheets available in?
6. Can I sell [app] worksheets I create with this generator?
7. How do I customize [app] worksheets for my students?
8. What age groups work best with these [app] worksheets?
9. Can I upload my own images to [app] worksheets?
10. How long does it take to create a [app] worksheet?
11. Do [app] worksheets include answer keys? (if applicable)
12. Can I create [app] worksheets about specific school subjects?

---

### 🚨 MANDATORY FAQ ANSWER TEMPLATES - USE THESE EXACTLY 🚨

**FAQ #1: "Is this [app] generator really free to use?"**

**IF CORE BUNDLE APP ($144/year):**
```
The [app] worksheet generator requires a Core Bundle subscription costing $144 annually or $15 monthly. Your subscription gives you unlimited [app] creation with no per-worksheet fees. Generate as many [keyword] worksheets as you need without additional charges. [More details about value...]

The Core Bundle includes 10 popular worksheet generators. Full Access subscription costs $240 annually and includes all 33 worksheet generator types. Both subscriptions include commercial licensing, 11 language support, and professional 300 DPI quality exports.
```

**IF FULL ACCESS APP ($240/year):**
```
The [app] worksheet generator requires a Full Access subscription costing $240 annually or $25 monthly. Your subscription gives you unlimited [app] creation with no per-worksheet fees. Generate as many [keyword] worksheets as you need without additional charges. [More details about value...]

The Core Bundle includes 10 popular worksheet generators and costs $144 annually. Full Access subscription costs $240 annually and includes all 33 worksheet generator types including [app name]. Both subscriptions include commercial licensing, 11 language support, and professional 300 DPI quality exports.
```

**FAQ #4: "Can I use [app] worksheets in my classroom for students?"**

**IF CORE BUNDLE APP:**
```
Core Bundle subscription includes unlimited classroom use. [Details about classroom use...]
```

**IF FULL ACCESS APP:**
```
Full Access subscription includes unlimited classroom use. [Details about classroom use...]
```

**FAQ #6: "Can I sell [app] worksheets I create with this generator?"**

**IF CORE BUNDLE APP:**
```
Yes. Core Bundle subscription includes full commercial print-on-demand licensing at no extra cost. [Details about selling...]
```

**IF FULL ACCESS APP:**
```
Yes. Full Access subscription includes full commercial print-on-demand licensing at no extra cost. [Details about selling...]
```

**⚠️ CRITICAL: DO NOT MIX TIERS IN FAQ ANSWERS**
- If app = Core Bundle, use ONLY Core Bundle language
- If app = Full Access, use ONLY Full Access language
- NEVER say "Core Bundle" when writing about a Full Access app

**Example H3 Questions:**
```
### Is This Word Search Generator Really Free to Use?
### Can I Print Word Search Worksheets at Home on a Regular Printer?
### What Languages Are Available for Word Search Worksheets?
```

---

### Section 7: Combine with Other Apps - Complete Learning Packets (1000-1100 words)

**Goal:** Naturally integrate ALL missing keywords from keywords.txt that haven't reached minimum 10 occurrences

**Structure:**
- H2 with keywords: `Combine [App] Worksheets with Other Free Printable Worksheets - Complete Learning Packets`
- Introduction (100 words) explaining 33 free tools on platform
- 5 H3 subsections (180-200 words each)
- Every H3 contains keywords from keywords.txt
- Use ALL worksheet type keywords naturally

**The 5 Standard Combination Topics:**

1. **[App] Plus Math Worksheets** (200 words)
   - Addition worksheets, subtraction worksheets
   - Math vocabulary practice
   - Themed math learning packets
   - Use keywords: "math worksheets", "addition worksheets"

2. **[App] with Phonics Worksheets** (200 words)
   - Reading foundation practice
   - Sight words worksheets
   - Phonics patterns
   - Use keywords: "phonics worksheets", "sight words worksheets"

3. **Alphabet Worksheets and Tracing Worksheets** (200 words)
   - Preschool and kindergarten writing development
   - Letter recognition
   - Name tracing practice
   - Use keywords: "alphabet worksheets", "tracing worksheets", "letter tracing worksheets"

4. **Coloring Worksheets Combined with [App]** (200 words)
   - Fine motor and literacy integration
   - Differentiated busy work packets
   - Substitute teacher folders
   - Use keywords: "coloring worksheets"

5. **Complete Curriculum Worksheet Packets** (200 words)
   - First grade worksheets collections
   - Weekly homework packets
   - Thematic units across all worksheet types
   - Use keywords: "first grade worksheets", "free printable worksheets"

**Example H3s:**
```
### Word Search Plus Math Worksheets - Complete Math Vocabulary Practice
### Word Search Worksheets with Phonics Worksheets - Reading Foundation Practice
### Alphabet Worksheets and Tracing Worksheets - Preschool and Kindergarten Writing Development
```

**CRITICAL PURPOSE:** This section exists to naturally integrate keywords that don't fit the specific app (e.g., "math worksheets" in a word search page) by discussing how teachers combine different worksheet types into learning packets.

---

## SECTION WORD COUNT TARGETS

| Section | Word Count | Percentage |
|---------|-----------|------------|
| Section 1: Hero | 400-500 | 6% |
| Section 2: Features | 1000-1200 | 15% |
| Section 3: How-To | 1200-1400 | 18% |
| Section 4: Use Cases | 1000-1200 | 15% |
| Section 5: Subscription | 1000-1100 | 14% |
| Section 6: FAQ | 1400-1600 | 20% |
| Section 7: Combine Apps | 1000-1100 | 12% |
| **TOTAL** | **7,000-8,100** | **100%** |

---

## QUALITY CHECKLIST FOR EACH APP PAGE

**🚨🚨🚨 MANDATORY AFTER WRITING EACH SECTION 🚨🚨🚨**

**KEYWORD TRACKING (DO THIS IMMEDIATELY AFTER EVERY SECTION OR FAIL):**

- [ ] **COUNTED:** Extracted all H2/H3 titles from THIS section using grep ✓
- [ ] **COUNTED:** Counted keyword occurrences in H2/H3 titles for THIS section ✓
- [ ] **UPDATED:** Updated keyword tracking file with running totals ✓
- [ ] **REPORTED:** Showed user the updated keyword counts ✓
- [ ] **VERIFIED:** Running totals are on track (proportional to sections completed) ✓

**AFTER SECTION 7, ALL KEYWORDS MUST HAVE 10+ IN H2/H3 TITLES OR THE PAGE FAILED.**

---

Before submitting ANY section:

- [ ] Every H2 contains keywords from keywords.txt ✓
- [ ] Every H3 contains keywords from keywords.txt ✓
- [ ] Section has 5-10+ H3 subsections ✓
- [ ] No technical language ✓
- [ ] Reads naturally (not keyword-stuffed) ✓
- [ ] All 7 features mentioned (if applicable to section) ✓
- [ ] Word count within target range ✓
- [ ] Local education terms used correctly for target language ✓

**🚨 PRICING VERIFICATION (MANDATORY FOR EVERY SECTION):**

- [ ] **VERIFIED:** I looked up this app in the COMPLETE APP PRICING LIST ✓
- [ ] **VERIFIED:** This app requires [CORE BUNDLE $144] or [FULL ACCESS $240] ✓
- [ ] **VERIFIED:** I used the correct subscription name throughout this section ✓
- [ ] **VERIFIED:** I used the correct pricing ($144/$15 OR $240/$25) ✓
- [ ] **VERIFIED:** I NEVER mixed Core Bundle and Full Access language ✓

Before submitting COMPLETE page:

- [ ] All 7 sections written ✓
- [ ] Total word count 7,000-8,100 words ✓
- [ ] **CRITICAL:** Every keyword from keywords.txt counted IN H2/H3 TITLES ONLY ✓
- [ ] **CRITICAL:** All keywords appear minimum 10 times IN H2/H3 TITLES ✓
- [ ] Total H3 count: 40-70+ across all sections ✓
- [ ] Section 5 (Subscription) explains compelling value propositions ✓
- [ ] Section 7 (Combine Apps) integrates all missing keywords ✓

**🚨 FINAL PRICING AUDIT (BEFORE SUBMITTING PAGE):**

- [ ] Search document for "$144" - if found, confirm this IS a Core Bundle app ✓
- [ ] Search document for "$15" - if found, confirm this IS a Core Bundle app ✓
- [ ] Search document for "$240" - if found, confirm this IS a Full Access app ✓
- [ ] Search document for "$25" - if found, confirm this IS a Full Access app ✓
- [ ] Search document for "Core Bundle" - if found, confirm this IS a Core Bundle app ✓
- [ ] Search document for "Full Access" - verify correct usage for this app tier ✓
- [ ] **VERIFIED:** NO pricing contradictions exist in the entire document ✓
- [ ] **VERIFIED:** Pricing is consistent across all 7 sections ✓

## WORKFLOW FOR EACH APP PAGE

### PHASE 1: PREPARATION

**STEP 1:** Read the actual app HTML file from `REFERENCE APPS/[app-name].html`

**STEP 2:** Analyze real features using Grep/Read tools

**STEP 3:** Document findings in `[app-name]-features-analysis.md`

**🚨🚨🚨 STEP 4: CREATE KEYWORD TRACKING FILE (ABSOLUTELY MANDATORY) 🚨🚨🚨**

**BEFORE WRITING A SINGLE WORD, YOU MUST:**

1. **Read keywords.txt** and extract ALL 10 keywords for the target language
2. **Create file:** `[app-name]-keyword-tracking.txt`
3. **Write this exact format in the file:**
   ```
   KEYWORD TRACKING - [App Name] - English

   TARGET: Each keyword must appear MINIMUM 10 times in H2/H3 titles ONLY

   Current Status:
   [ ] 1. Kindergarten worksheets: 0/10
   [ ] 2. Math worksheets: 0/10
   [ ] 3. Sight words worksheets: 0/10
   [ ] 4. Phonics worksheets: 0/10
   [ ] 5. Alphabet worksheets / ABC worksheets: 0/10
   [ ] 6. Addition worksheets: 0/10
   [ ] 7. Tracing worksheets / Letter tracing worksheets: 0/10
   [ ] 8. Free printable worksheets: 0/10
   [ ] 9. Coloring worksheets: 0/10
   [ ] 10. First grade worksheets: 0/10

   After each section, update counts and check boxes when ≥10 reached.
   ```

4. **Report to user:** "Keyword tracking file created. Ready to start Section 1."

**IF YOU DO NOT CREATE THIS FILE, YOU WILL FORGET TO TRACK KEYWORDS AND FAIL.**

---

**STEP 5:** Create a features analysis document

**🚨 STEP 6: VERIFY APP PRICING TIER (MANDATORY - DO NOT SKIP) 🚨**

**AFTER creating keyword tracking file, THEN verify pricing:**

1. **Look up the app name in "COMPLETE APP PRICING LIST" section**
2. **Write down in your response:**
   ```
   PRICING VERIFICATION:
   App Name: [app name]
   Subscription Tier: [Core Bundle $144/year] OR [Full Access $240/year]
   Monthly Price: [$15/month] OR [$25/month]
   ```
3. **Confirm you will use the correct pricing throughout all 7 sections**
4. **If you cannot find the app in the list, STOP and ASK THE USER**

**Example:**
```
PRICING VERIFICATION:
App Name: Code Addition
Subscription Tier: Full Access $240/year
Monthly Price: $25/month
✓ I will use "Full Access" and "$240/$25" throughout this document
✓ I will NEVER use "Core Bundle" or "$144/$15" for this app
```

**IF YOU SKIP THIS STEP, YOU WILL MAKE PRICING ERRORS.**

---

### PHASE 2: WRITE ALL 7 SECTIONS (⚠️ ONE AT A TIME - NEVER BATCH ⚠️)

**🚨 ABSOLUTELY CRITICAL RULE - READ THIS CAREFULLY: 🚨**

**YOU MUST WRITE ONLY ONE SECTION PER RESPONSE.**
**NEVER WRITE MULTIPLE SECTIONS IN ONE RESPONSE.**
**ALWAYS WAIT FOR USER APPROVAL BEFORE WRITING THE NEXT SECTION.**

**IF YOU WRITE MORE THAN ONE SECTION IN A SINGLE RESPONSE, YOU HAVE VIOLATED THIS RULE.**

---

**🔴 CRITICAL WORKFLOW - NEVER LOSE CONTENT AGAIN 🔴**

**STEP 5A: CREATE THE FILE FIRST - BEFORE WRITING ANY SECTIONS**

**BEFORE writing Section 1, you MUST:**
1. Create the app page file: `INDIVIDUAL APP PAGES/[Language]/[app-name].md`
   - Example: `INDIVIDUAL APP PAGES/English/wordsearch.md`
   - Example: `INDIVIDUAL APP PAGES/Spanish/wordsearch.md`
2. Use the **Write tool** to create an empty file with just a placeholder
3. **NEVER write sections in memory** - always write directly to the file

**WHY THIS IS CRITICAL:**
- Writing sections in memory = losing content when context limit is reached
- Writing directly to file = content is ALWAYS saved, never lost
- Each section is preserved immediately when written
- No risk of losing hours of work

**THE CORRECT PATTERN:**
```
1. Use Write tool to CREATE the file: INDIVIDUAL APP PAGES/English/wordsearch.md
2. Use Write tool to write Section 1 to the file
3. Wait for user approval
4. Use Edit tool to ADD Section 2 to the file
5. Wait for user approval
6. Use Edit tool to ADD Section 3 to the file
7. Continue this pattern for all 7 sections
```

**THE WRONG PATTERN (NEVER DO THIS):**
```
❌ Write Section 1 in response
❌ Wait for approval
❌ Write Section 2 in response
❌ Continue until context runs out
❌ Lose all content when trying to save to file
```

**REMEMBER:** The file is your source of truth. Write to it immediately. Never hold sections in memory.

---

**STEP 6:** Create file and write Section 1 (Hero) - 400-500 words
- **FIRST**: Use Write tool to create `INDIVIDUAL APP PAGES/[Language]/[app-name].md`
- **THEN**: Use Write tool to write Section 1 directly to the file
- **🚨 MANDATORY:** Count keywords in Section 1 H2/H3 titles using grep
- **🚨 MANDATORY:** Update keyword tracking file with Section 1 counts
- **🚨 MANDATORY:** Report keyword counts to user
- STOP writing
- WAIT for user to say "continue", "ok", "yes", or similar approval
- DO NOT proceed to Section 2 until user approves

**STEP 7:** Add Section 2 (Features) - 1000-1200 words
- Use **Edit tool** to ADD Section 2 to the existing file
- **🚨 MANDATORY:** Count keywords in Section 2 H2/H3 titles using grep
- **🚨 MANDATORY:** Update keyword tracking file with running totals
- **🚨 MANDATORY:** Report updated keyword counts to user
- STOP writing
- WAIT for user approval
- DO NOT proceed to Section 3 until user approves

**STEP 8:** Add Section 3 (How-To) - 1200-1400 words
- Use **Edit tool** to ADD Section 3 to the existing file
- **🚨 MANDATORY:** Count keywords in Section 3 H2/H3 titles using grep
- **🚨 MANDATORY:** Update keyword tracking file with running totals
- **🚨 MANDATORY:** Report updated keyword counts to user
- STOP writing
- WAIT for user approval
- DO NOT proceed to Section 4 until user approves

**STEP 9:** Add Section 4 (Use Cases) - 1000-1200 words
- Use **Edit tool** to ADD Section 4 to the existing file
- **🚨 MANDATORY:** Count keywords in Section 4 H2/H3 titles using grep
- **🚨 MANDATORY:** Update keyword tracking file with running totals
- **🚨 MANDATORY:** Report updated keyword counts to user
- STOP writing
- WAIT for user approval
- DO NOT proceed to Section 5 until user approves

**STEP 10:** Add Section 5 (Subscription Reasons) - 1000-1100 words
- Use **Edit tool** to ADD Section 5 to the existing file
- **🚨 MANDATORY:** Count keywords in Section 5 H2/H3 titles using grep
- **🚨 MANDATORY:** Update keyword tracking file with running totals
- **🚨 MANDATORY:** Report updated keyword counts to user
- STOP writing
- WAIT for user approval
- DO NOT proceed to Section 6 until user approves

**STEP 11:** Add Section 6 (FAQ) - 1400-1600 words
- Use **Edit tool** to ADD Section 6 to the existing file
- **🚨 MANDATORY:** Count keywords in Section 6 H2/H3 titles using grep
- **🚨 MANDATORY:** Update keyword tracking file with running totals
- **🚨 MANDATORY:** Report updated keyword counts to user
- STOP writing
- WAIT for user approval
- DO NOT proceed to Section 7 until user approves

**STEP 12:** Add Section 7 (Combine Apps) - 1000-1100 words
- Use **Edit tool** to ADD Section 7 to the existing file
- **🚨 MANDATORY:** Count keywords in Section 7 H2/H3 titles using grep
- **🚨 MANDATORY:** Update keyword tracking file with FINAL totals
- **🚨 MANDATORY:** Report FINAL keyword counts to user
- **🚨 CRITICAL:** VERIFY ALL KEYWORDS HAVE 10+ IN H2/H3 TITLES
- **🚨 IF ANY KEYWORD < 10, THE PAGE HAS FAILED THE PRIMARY MISSION**
- STOP writing
- All sections complete
- File now contains all 7 sections and is ready for final verification

### PHASE 3: KEYWORD VERIFICATION

**STEP 13:** Count EVERY single keyword from keywords.txt **ONLY IN H2/H3 TITLES:**
- **COUNT ONLY:** H2 and H3 titles/subtitles
- **DO NOT COUNT:** Body text (body text doesn't matter for SEO)
- **DO NOT COUNT:** H1 (only one H1 per page)

**STEP 14:** Create keyword count report showing H2/H3 occurrences only:
```
Keyword                         | H2/H3 Count | Required | Status
--------------------------------|-------------|----------|--------
Kindergarten worksheets         | 12          | 10       | ✓ PASS
Math worksheets                 | 15          | 10       | ✓ PASS
Sight words worksheets          | 11          | 10       | ✓ PASS
Addition worksheets             | 8           | 10       | ✗ FAIL
```

**STEP 15:** If ANY keyword has less than 10 H2/H3 title occurrences:
- Add MORE H3 subsections containing that keyword
- Section 7 (Combine Apps) is specifically designed to absorb missing keywords
- Create additional H3s in Section 7 with that keyword
- Example: "Addition Worksheets Combined with Math Worksheets"
- Recount H2/H3 titles until ALL keywords meet minimum 10 times

**STEP 16:** If Section 7 already has too many H3s:
- Distribute missing keyword H3s across other sections
- Add H3s to Section 4 (Use Cases) or Section 6 (FAQ)
- Each section should have 5-10+ H3 subsections

**CRITICAL:** Do NOT move to next app page until EVERY keyword appears minimum 10 times IN H2/H3 TITLES ONLY.

---

## 🚨 MANDATORY PRE-WRITING ANALYSIS - FAILURE TO DO THIS IS UNACCEPTABLE 🚨

**BEFORE WRITING A SINGLE WORD OF ANY APP PAGE, YOU MUST:**

### PHASE 0: COMPREHENSIVE APP ANALYSIS (ABSOLUTELY REQUIRED)

**DO NOT SKIP THIS. THIS IS NOT OPTIONAL. THIS IS MANDATORY.**

1. **Read the ENTIRE app HTML file** from `REFERENCE APPS/[app-name].html`
   - Use Read tool with offset/limit to read the full file in chunks
   - Do NOT assume you know what features exist
   - Do NOT rely on memory or patterns from other apps

2. **Search for ALL UI controls systematically:**
   ```
   - All <select> dropdowns (grep for "<select")
   - All input fields (grep for "input type=")
   - All buttons (grep for "<button")
   - All data-translate attributes (grep for "data-translate=")
   - All accordion sections (grep for "accordion-button")
   - All option values (grep for "<option value=")
   ```

3. **Search for ALL functional features:**
   ```
   - Grid/layout options (grep for "grid", "size", "layout", "dimension")
   - Difficulty/complexity settings (grep for "difficulty", "level", "easy", "hard")
   - Image/content options (grep for "theme", "image", "upload")
   - Download/export options (grep for "download", "export", "pdf", "jpeg")
   - Customization options (grep for "color", "font", "background", "border")
   ```

4. **Document EVERY feature found** in `[app-name]-features-analysis.md`
   - Include line numbers from source file
   - Quote exact HTML/JS code
   - List ALL options for every dropdown/selector
   - Verify each feature actually exists in code

5. **Cross-verify your analysis:**
   - Count total accordion sections - did you document all of them?
   - Count total select dropdowns - did you find all options?
   - Count total buttons - did you document what each does?
   - **If you missed ANY feature, your analysis is incomplete and UNACCEPTABLE**

### VERIFICATION CHECKLIST (Must complete before writing)

- [ ] Read entire app HTML file in multiple chunks
- [ ] Searched for all `<select>` dropdowns and documented ALL options
- [ ] Searched for all `<input>` fields and documented types/purposes
- [ ] Searched for all `<button>` elements and documented actions
- [ ] Searched for all `data-translate` keys and documented UI elements
- [ ] Searched for grid/size/layout options specifically
- [ ] Searched for difficulty/complexity options specifically
- [ ] Searched for all theme/image selection options
- [ ] Searched for all customization features (color, font, etc.)
- [ ] Created comprehensive features-analysis.md with line numbers
- [ ] **Verified that EVERY accordion section is documented**
- [ ] **Verified that EVERY dropdown has ALL options listed**
- [ ] **Verified that NO features were missed or assumed**

**IF YOU SKIP THIS ANALYSIS AND MISS FEATURES, YOU HAVE FAILED COMPLETELY.**

---

## FACTUAL ACCURACY - NO MAKING THINGS UP!

**CRITICAL RULE**: Everything must be based on thorough analysis of the actual app.

### Before Writing ANY Section:

1. **Read the actual app HTML file** from `REFERENCE APPS/[app-name].html`
2. **Analyze real features** using Grep/Read tools
3. **Document findings** in `[app-name]-features-analysis.md`
4. **Write content** based ONLY on actual features found

### What You Can Write:
✓ Features that actually exist in the app
✓ Settings users can actually change
✓ Buttons users actually click
✓ Options users actually see
✓ Steps users actually take

### What You CANNOT Write:
❌ Features you think the app should have
❌ Features that sound good but don't exist
❌ Made-up benefits
❌ Imagined capabilities
❌ Assumed functionalities

### If Unsure:
- **Read the app file again**
- **Search for the feature** using Grep
- **Verify it exists** before writing about it

**Remember**: Factual accuracy builds trust. Made-up features destroy credibility.

---

## REMEMBER - CRITICAL MISTAKES TO AVOID

**The #1 FATAL mistake:** Counting keywords in body text instead of H2/H3 titles
- **ONLY COUNT KEYWORDS IN H2/H3 TITLES**
- Body text keywords DO NOT COUNT toward the 10-time minimum
- This is the ENTIRE POINT of these SEO pages

**The #2 mistake:** Not having enough H3 subsections
- Need 40-70+ H3s across all 7 sections to hit 10x for each keyword
- Each section needs 5-10+ H3 subsections
- Every H3 must contain keywords from keywords.txt

**The #3 mistake:** Forgetting keywords in H2/H3 titles
- EVERY H2 and H3 must contain keywords from keywords.txt
- Combine multiple keywords in one title when possible

**The #4 mistake:** Using technical language
- Write for ordinary users, not developers

**The #5 mistake:** Working on multiple sections at once
- ONE section per response, wait for user approval

**The #6 mistake:** Making up features that don't exist
- Base everything on actual app analysis from REFERENCE APPS folder

**Always ask:**
- "Does this H2/H3 title contain keywords from keywords.txt?"
- "Am I counting ONLY H2/H3 titles, not body text?"
- "Do I have enough H3 subsections (40-70+ total)?"
- "Is this feature real or did I analyze it from the actual app?"
- "Am I using simple language an ordinary user would understand?"
