# COMPLETE HOMEPAGE TEXT CHECKLIST
## Every Single Text Element That Must Be Dynamic

### ❌ CURRENT STATE: FRONTEND-BACKEND MISMATCH
- **Frontend**: Uses static translations from i18n files
- **Content Manager**: Has different data structure
- **Result**: Changes in content manager don't appear on frontend

### ✅ TARGET STATE: EVERYTHING DYNAMIC
- **ALL text loads from API**: `/api/homepage/content?locale={locale}`
- **NO static translations**: Remove all useTranslations() calls
- **Content Manager controls everything**: Single source of truth

---

## NAVIGATION BAR (Navigation.tsx)
### Currently:
- ✅ Logo text - LOADS FROM API
- ✅ Logo image - LOADS FROM API
- ✅ Menu items (Apps, Pricing, Blog) - LOADS FROM API
- ✅ Buttons (Sign In, Start Free) - LOADS FROM API

---

## HERO SECTION (page.tsx)
### Currently:
- ✅ Title - LOADS FROM API
- ✅ Subtitle - LOADS FROM API
- ✅ Primary CTA button - LOADS FROM API
- ✅ Secondary CTA button - LOADS FROM API

### Missing from Content Manager:
- ❌ Button URLs (hardcoded as /auth/signup, /apps)
- ❌ Background gradient style

---

## WORKSHEET SAMPLES SECTION (WorksheetSamples.tsx)
### Currently:
- ✅ Section title - LOADS FROM API
- ✅ Section subtitle - LOADS FROM API
- ✅ CTA text - LOADS FROM API
- ✅ Sample names - LOADS FROM API
- ✅ Sample descriptions - LOADS FROM API
- ⚠️ Age ranges - LOADS but not translatable
- ❌ Difficulty levels - NOT TRANSLATED PROPERLY
- ❌ Category names - NOT TRANSLATED IN DISPLAY

### Problems:
- Line 198: Hardcoded difficulty comparisons in multiple languages!
- Categories/difficulties stored in samplesSection but not used
- Modal texts ("Age Range:", "Difficulty:") are hardcoded

---

## FEATURES SECTION (page.tsx)
### Currently:
- ✅ Section title - LOADS FROM API
- ✅ Feature titles - LOADS FROM API
- ✅ Feature descriptions - LOADS FROM API

### Missing:
- ❌ Icon selection logic (hardcoded)

---

## PRICING SECTION (page.tsx)
### Currently:
- ✅ Section title - LOADS FROM API
- ✅ Tier names - LOADS FROM API
- ✅ Prices - LOADS FROM API
- ✅ Features lists - LOADS FROM API
- ✅ CTA buttons - LOADS FROM API
- ✅ Badge text ("Most Popular") - LOADS FROM API

### Problems:
- ❌ "/mo" suffix is hardcoded (line 241, 272)
- ❌ Button URLs hardcoded

---

## FOOTER (Footer.tsx)
### Currently:
- ❌ Company name - STATIC "LessonCraftStudio"
- ❌ Tagline - STATIC "Professional worksheet generators..."
- ❌ Section titles - STATIC "Product", "Support", "Legal"
- ❌ All link texts - STATIC
- ❌ Copyright text - STATIC "© 2024 LessonCraftStudio..."

### THIS IS COMPLETELY STATIC - NEEDS FULL REWRITE

---

## METADATA/SEO (page.tsx generateMetadata)
### Currently:
- ✅ Title - LOADS FROM API
- ✅ Description - LOADS FROM API
- ✅ Keywords - LOADS FROM API

---

## HIDDEN/MISSING TEXTS
### These exist in content manager but aren't used:
- ❌ commonUI translations (loading, error, success, etc.)
- ❌ Category translations for samples
- ❌ Difficulty translations for samples
- ❌ Period translations (/month, /year)
- ❌ Footer section translations

---

## CRITICAL ISSUES TO FIX

### 1. Footer is 100% static
- Needs complete rewrite to load from API
- Currently ignores all content manager data

### 2. WorksheetSamples difficulty check is insane
- Line 198 checks difficulty in 11 languages manually!
- Should use difficulty translations from API

### 3. Hardcoded text fragments
- "/mo" in pricing
- "Age Range:" in modal
- "Difficulty:" in modal

### 4. URLs are hardcoded everywhere
- Auth URLs
- App URLs
- Footer links

### 5. No error state UI texts
- What shows when API fails?
- Loading states?
- Error messages?

---

## ACTION PLAN

### Phase 1: Update Content Manager Structure
1. Add missing URL fields for all links
2. Add period suffix translations
3. Add modal label translations
4. Add loading/error state texts

### Phase 2: Update Components
1. **Footer.tsx** - Complete rewrite to use API
2. **WorksheetSamples.tsx** - Fix difficulty/category display
3. **page.tsx** - Remove hardcoded URLs and suffixes

### Phase 3: Remove Static Dependencies
1. Remove all useTranslations() imports
2. Delete static translation files
3. Ensure everything comes from API

### Phase 4: Testing
1. Test each language
2. Test API failure scenarios
3. Test content manager updates

---

## CONTENT STRUCTURE NEEDED

```typescript
interface CompleteHomepageContent {
  // Navigation
  navigation: {
    logo: { text: string; image: string }
    menuItems: {
      apps: { text: TranslatedText; url: string }
      pricing: { text: TranslatedText; url: string }
      blog: { text: TranslatedText; url: string }
    }
    buttons: {
      signIn: { text: TranslatedText; url: string }
      startFree: { text: TranslatedText; url: string }
    }
  }

  // Hero
  hero: {
    title: TranslatedText
    subtitle: TranslatedText
    ctaPrimary: { text: TranslatedText; url: string }
    ctaSecondary: { text: TranslatedText; url: string }
    backgroundStyle: string
  }

  // Samples
  samplesSection: {
    title: TranslatedText
    subtitle: TranslatedText
    cta: { text: TranslatedText; url: string }
    modalLabels: {
      ageRange: TranslatedText
      difficulty: TranslatedText
      close: TranslatedText
    }
  }

  // Features
  featuresSection: {
    title: TranslatedText
  }

  // Pricing
  pricingSection: {
    title: TranslatedText
    periodSuffixes: {
      month: TranslatedText
      year: TranslatedText
    }
  }

  // Footer
  footer: {
    companyName: TranslatedText
    tagline: TranslatedText
    sections: [
      {
        title: TranslatedText
        links: [{ text: TranslatedText; url: string }]
      }
    ]
    copyright: TranslatedText
  }

  // UI States
  uiStates: {
    loading: TranslatedText
    error: TranslatedText
    noResults: TranslatedText
    tryAgain: TranslatedText
  }
}
```

---

## IMMEDIATE ACTIONS REQUIRED

1. **Stop using static translations immediately**
2. **Update Footer component NOW - it's 100% static**
3. **Fix the insane difficulty checking in WorksheetSamples**
4. **Add ALL missing fields to content manager**
5. **Test with German locale to verify**