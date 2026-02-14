# Enriched Content System - Maintenance Guide

## Architecture Overview

The enriched content system replaces the legacy `theme-page-content.ts` monolith with **550 individual TypeScript files** organized by theme and locale. Each file contains SEO metadata, educational narratives, curated app selections, teaching tips, activities, curriculum alignments, and FAQs.

### File Structure

```
frontend/content/themes/
  types.ts                    # EnrichedThemeContent interface + all type definitions
  index.ts                    # Content loader with registry + fallback to legacy
  register-all.ts             # Imports all 550 locale files (triggers self-registration)
  grades-types.ts             # Grade-specific type utilities
  [theme]/                    # 50 theme directories
    en.ts                     # English content (self-registers on import)
    de.ts                     # German
    fr.ts                     # French
    es.ts                     # Spanish
    pt.ts                     # Portuguese
    it.ts                     # Italian
    nl.ts                     # Dutch
    sv.ts                     # Swedish
    da.ts                     # Danish
    no.ts                     # Norwegian
    fi.ts                     # Finnish
```

### Supporting Config Files

| File | Purpose |
|------|---------|
| `frontend/config/theme-slugs.ts` | URL slugs for all 50 themes |
| `frontend/config/grade-slugs.ts` | Localized grade URL slugs (5 grades x 11 locales) |
| `frontend/config/theme-app-mapping.ts` | Maps 33 apps to 4 categories (math, literacy, visual, puzzles) |
| `frontend/config/theme-categories.ts` | Groups 50 themes into 8 semantic categories |
| `frontend/config/theme-page-labels.ts` | UI labels for all 11 locales |

### Components (frontend/components/theme-page/)

| Component | Renders |
|-----------|---------|
| `ThemeAppGrid.tsx` | Curated app cards grouped by category with thumbnails |
| `GradeEducationalContent.tsx` | Grade-specific intro, developmental notes, tips |
| `ThemeActivities.tsx` | Hands-on activity suggestions with materials/duration |
| `ThemeCurriculumNotes.tsx` | Curriculum standard alignments |
| `ThemeLearningObjectives.tsx` | Learning objectives by curriculum area |
| `ThemeSamplePreviews.tsx` | Sample worksheet images (if available) |
| `ThemeTeachingTips.tsx` | Teaching tips with audience badges |

---

## How to Add a New Theme

1. **Create the theme directory:**
   ```
   frontend/content/themes/[new-theme]/
   ```

2. **Create 11 locale files** following the `EnrichedThemeContent` interface. Each file must:
   - Import `registerThemeContent` from `../index`
   - Import `EnrichedThemeContent` from `../types`
   - Export a `const content: EnrichedThemeContent` object
   - Call `registerThemeContent('[new-theme]', '[locale]', content)` at the bottom

   Example structure:
   ```typescript
   import { registerThemeContent } from '../index';
   import type { EnrichedThemeContent } from '../types';

   const content: EnrichedThemeContent = {
     name: 'Dinosaurs',
     title: 'Dinosaur Worksheets for Kids | LessonCraftStudio',
     description: 'Free printable dinosaur worksheets...',
     keywords: 'dinosaur worksheets, dino activities...',
     heading: 'Dinosaur Worksheets',
     intro: '...300+ words...',
     educationalOverview: '...200+ words...',
     parentGuide: '...150+ words...',
     curatedAppIds: ['coloring', 'find-and-count', ...],  // 8-15 apps
     appCategories: [
       { category: 'visual', appIds: ['coloring', ...], featured: true },
       ...
     ],
     teachingTips: [...],        // 3-5 tips
     activities: [...],          // 3-4 activities
     curriculumAlignment: [...], // 3+ standards
     gradeContent: { ... },      // Per-grade learning content
     faq: [...],                 // 8-10 Q&A pairs
     relatedThemes: [...],       // 5-7 related ThemeIds
     relatedBlogCategories: [...],
   };

   registerThemeContent('dinosaurs', 'en', content);
   ```

3. **Register in `register-all.ts`:** Add import statements for all 11 locale files.

4. **Add URL slug** to `frontend/config/theme-slugs.ts`.

5. **Validate:**
   ```bash
   node scripts/validate-theme-content.js --theme [new-theme]
   ```

---

## How to Update Existing Content

1. Edit the `.ts` file directly: `frontend/content/themes/[theme]/[locale].ts`
2. Run validation: `node scripts/validate-theme-content.js --theme [theme] --locale [locale]`
3. Commit the change

---

## How to Add a New Locale

1. Add the locale code to `ALL_LOCALES` in `frontend/content/themes/types.ts`
2. Create a `[locale].ts` file in every theme directory (50 files)
3. Add import statements to `register-all.ts` for all 50 new files
4. Add locale translations to `frontend/config/theme-page-labels.ts`
5. Add grade slugs to `frontend/config/grade-slugs.ts`
6. Validate: `node scripts/validate-theme-content.js --locale [locale]`

---

## Content Quality Checklist

| Field | Minimum Requirement |
|-------|-------------------|
| `intro` | 300+ words, educational narrative |
| `educationalOverview` | 200+ words, pedagogical depth |
| `parentGuide` | 150+ words, actionable tips |
| `curatedAppIds` | 8-15 apps (hand-picked, not all 33) |
| `teachingTips` | 3-5 tips, mixed audience (teacher/parent/both) |
| `activities` | 3-4 activities with materials and duration |
| `curriculumAlignment` | 3+ standards with framework references |
| `faq` | 8-10 unique Q&A pairs (no near-duplicates) |
| `relatedThemes` | 5-7 valid ThemeId references |

---

## Validation Commands

```bash
# Validate all themes and locales
node scripts/validate-theme-content.js

# Validate a single theme
node scripts/validate-theme-content.js --theme animals

# Validate one locale across all themes
node scripts/validate-theme-content.js --locale de

# Strict mode (exit code 1 on warnings)
node scripts/validate-theme-content.js --strict

# Export JSON report
node scripts/validate-theme-content.js --json report.json

# Validate live pages (checks rendered HTML)
node scripts/validate-live-pages.js

# Content statistics (word counts, coverage)
node scripts/content-stats.js
```

---

## Data Flow

```
Content Files (550 .ts files)
    |
    v
register-all.ts imports all files on app startup
    |
    v
Each file calls registerThemeContent() -> populates enrichedRegistry map
    |
    v
getThemeContentWithFallback(themeId, locale)
    |--- enriched content found -> returns EnrichedThemeContent
    |--- not found -> falls back to legacy ThemePageContent
    v
Theme page components render the data
    |-- ThemeAppGrid (curated apps by category)
    |-- GradeEducationalContent (per-grade learning content)
    |-- ThemeActivities (hands-on activities)
    |-- ThemeCurriculumNotes (curriculum standards)
    |-- ThemeTeachingTips (tips with audience)
    v
Rendered HTML with SEO metadata (structured data, hreflang, etc.)
```

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Self-registration pattern | Files auto-register on import; no manual list to maintain |
| English fallback | Missing translations don't break pages |
| 4 app categories | Consolidated from 8 legacy categories for cleaner UX |
| Curated app selection | Eliminates "doorway page" SEO signals (not all 33 apps on every page) |
| Per-file locale split | Enables incremental updates without touching other locales |
| TypeScript type checking | Compile-time validation of content structure |
