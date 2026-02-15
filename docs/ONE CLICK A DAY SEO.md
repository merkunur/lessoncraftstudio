# ONE CLICK A DAY SEO

## MANDATORY RULE
**After completing each one of the 500 parts, STOP and ask: "Do you want me to start Part X?" WAIT for explicit YES before proceeding. NEVER start the next part without permission. Each part must be started in planning mode to refresh context.**

---

## Context

LessonCraftStudio has ~5,000 indexed pages across 11 locales that currently receive minimal organic search traffic. The goal is to optimize every page's metadata (title, description, keywords, H1) with researched, low-competition keywords so that each page earns at least 1 organic click per day. This requires treating the entire site as an interconnected SEO machine where each page targets a unique keyword niche to avoid self-cannibalization.

## Page Inventory

| Page Type | Formula | Count | Metadata Source |
|-----------|---------|-------|-----------------|
| Product Pages | 33 apps x 11 locales | **363** | `frontend/content/product-pages/{locale}/{slug}.ts` -> `seo.title`, `seo.description`, `seo.keywords`, `hero.title`, `hero.subtitle` |
| Blog Posts | 112 posts x 11 locales | **1,232** | PostgreSQL `blog_posts.translations` JSONB -> `metaTitle`, `metaDescription`, `focusKeyword` |
| Theme+Grade Pages | 50 themes x 5 grades x 11 locales | **2,750** | `frontend/content/themes/{theme}/{locale}.ts` -> `gradeContent[gradeId].intro` (first ~160 chars become meta description); title generated in `page.tsx` lines 98-100 |
| Theme Hub Pages | 50 themes x 11 locales | **550** | Same theme content files -> `title`, `description`, `keywords`, `heading` |
| Secondary Pages | categories, grades, static | **~200** | Config files + inline metadata in page.tsx |
| **TOTAL** | | **~5,095** | |

---

## Strategy: Keyword Differentiation by Intent

Each page type targets a different search intent to prevent cannibalization:

| Page Type | Intent | Keyword Pattern | Example (EN) |
|-----------|--------|-----------------|--------------|
| Product Pages | Transactional | `{app} generator`, `create {app}`, `{app} maker` | "addition worksheet generator with pictures" |
| Theme Hubs | Navigational | `{theme} worksheets for kids`, `{theme} printable activities` | "animal worksheets for kids printable" |
| Theme+Grade | Long-tail specific | `{theme} worksheets for {grade}`, `{theme} {grade} activities` | "animal worksheets for kindergarten free" |
| Blog Posts | Informational | `how to teach {topic}`, `best {topic} ideas`, `{topic} guide` | "how to teach addition to kindergarteners" |
| Category Hubs | Browsing | `{category} worksheet generators`, `{category} printables` | "math worksheet generators for teachers" |
| Grade Hubs | Browsing | `{grade} worksheets`, `worksheets for {age} year olds` | "kindergarten worksheets free printable" |

### Why Intent Differentiation Matters

Without intent differentiation, a product page for "addition" and a blog post about "addition" would compete for the same queries. By assigning distinct intent patterns:
- The **product page** targets users ready to create/generate worksheets (transactional)
- The **theme hub** targets users browsing for a collection of themed activities (navigational)
- The **theme+grade page** targets users with a very specific need (long-tail)
- The **blog post** targets users seeking teaching strategies and ideas (informational)

This ensures Google sees each page as the best answer for its specific query type.

---

## Competition Tiers by Locale

| Tier | Locales | Strategy | Keyword Length | Est. Monthly Search Volume Range |
|------|---------|----------|----------------|----------------------------------|
| **Tier 1 (Very Low)** | fi, da, no | Target broader 2-3 word keywords. Very few competitors in educational content. | Short-tail OK | 10-500 searches/month per keyword |
| **Tier 2 (Low)** | sv, nl | Target 3-4 word combinations. Some competition but gaps remain. | Medium-tail | 50-1,000 searches/month |
| **Tier 3 (Medium)** | it, pt | Target 3-5 word specific queries. Growing education markets. | Medium-to-long tail | 100-2,000 searches/month |
| **Tier 4 (High)** | es, fr, de | Target 4-6 word very specific queries. Competitive markets. | Long-tail only | 200-5,000 searches/month |
| **Tier 5 (Highest)** | en | Target 5-7 word ultra-specific queries. Need unique angle per page. | Ultra long-tail | 500-10,000 searches/month |

### Locale-Specific Keyword Patterns

#### Finnish (fi) - Tier 1
- Educational terms: "tyosivu" (worksheet), "tulostettava" (printable), "tehtava" (exercise)
- Grade terms: "esikoulu" (preschool), "1. luokka" (1st grade)
- Low competition means broader terms rank easily

#### Danish (da) - Tier 1
- Educational terms: "arbejdsark" (worksheet), "opgaver" (exercises), "udskrivbar" (printable)
- Grade terms: "forskole" (preschool), "borneahveklasse" (kindergarten)

#### Norwegian (no) - Tier 1
- Educational terms: "arbeidsark" (worksheet), "oppgaver" (exercises), "utskrivbar" (printable)
- Grade terms: "forskole" (preschool), "barnehage" (kindergarten)

#### Swedish (sv) - Tier 2
- Educational terms: "arbetsblad" (worksheet), "utskrivbar" (printable), "ovningar" (exercises)
- Grade terms: "forskola" (preschool), "forskoleklass" (preschool class)

#### Dutch (nl) - Tier 2
- Educational terms: "werkblad" (worksheet), "afdrukbaar" (printable), "oefeningen" (exercises)
- Grade terms: "kleuterschool" (kindergarten), "groep 1" (group 1)

#### Italian (it) - Tier 3
- Educational terms: "scheda didattica" (worksheet), "stampabile" (printable), "esercizi" (exercises)
- Grade terms: "prescolare" (preschool), "scuola materna" (kindergarten)

#### Portuguese (pt) - Tier 3
- Educational terms: "folha de atividade" (activity sheet), "imprimivel" (printable), "exercicios" (exercises)
- Grade terms: "pre-escolar" (preschool), "jardim de infancia" (kindergarten)
- Brazil focus: "atividades" preferred over "exercicios" in many contexts

#### Spanish (es) - Tier 4
- Educational terms: "hoja de trabajo" (worksheet), "imprimible" (printable), "actividades" (activities)
- Grade terms: "preescolar" (preschool), "jardin de infantes" (kindergarten)
- Latin America vs Spain variations considered

#### French (fr) - Tier 4
- Educational terms: "fiche d'exercice" (exercise sheet), "imprimable" (printable), "activites" (activities)
- Grade terms: "maternelle" (preschool/kindergarten), "CP" (1st grade)

#### German (de) - Tier 4
- Educational terms: "Arbeitsblatt" (worksheet), "druckbar" (printable), "Ubungen" (exercises)
- Grade terms: "Vorschule" (preschool), "Kindergarten", "1. Klasse" (1st grade)
- Extremely competitive "Arbeitsblatter" market requires very specific long-tail

#### English (en) - Tier 5
- Most competitive locale. Must use ultra-specific long-tail keywords
- Include modifiers: "free", "printable", "with pictures", "PDF", "for teachers"
- Target underserved niches: specific theme+grade+feature combinations

---

## What Gets Modified Per Page

### Product Pages (363 files)
**File**: `frontend/content/product-pages/{locale}/{slug}.ts`

Fields to optimize:
- `seo.title` — 50-60 chars, primary keyword front-loaded
- `seo.description` — 150-160 chars, keyword + benefit + CTA
- `seo.keywords` — 8-12 unique, differentiated keywords
- `hero.title` — H1 aligned with primary keyword
- `hero.subtitle` — secondary keyword integration

**Example current state (addition/en):**
```typescript
seo: {
  title: "Addition Worksheets | LessonCraftStudio",
  description: "Create custom addition worksheets with pictures for kids.",
  keywords: ["addition worksheets", "math worksheets"]
}
```

**Example optimized state:**
```typescript
seo: {
  title: "Addition Worksheet Generator with Pictures | Free Printable",
  description: "Create custom addition worksheets with colorful pictures for PreK-3rd grade. Choose themes, difficulty levels & number ranges. Print instantly or save as PDF.",
  keywords: [
    "addition worksheet generator",
    "addition worksheets with pictures",
    "create addition worksheets free",
    "printable addition worksheets kindergarten",
    "custom math worksheets for kids",
    "addition practice sheets with images",
    "picture addition worksheets PDF",
    "kindergarten addition worksheet maker"
  ]
}
```

### Theme Hub Pages (550 — within 550 theme content files)
**File**: `frontend/content/themes/{theme}/{locale}.ts`

Fields to optimize:
- `title` — 50-60 chars, theme-specific keyword
- `description` — 150-160 chars, unique per theme
- `keywords` — differentiated from product pages (navigational intent, not transactional)
- `heading` — H1 matching title keyword

**Example current vs optimized (animals theme hub):**
```typescript
// BEFORE
title: "Animal Worksheets",
description: "Explore our collection of animal-themed worksheets.",

// AFTER
title: "Animal Worksheets for Kids | Printable Activities & Exercises",
description: "Browse 33 animal-themed worksheet generators for PreK-3rd grade. Coloring pages, counting activities, word searches & more with cute animal illustrations.",
```

### Theme+Grade Pages (2,750 — within same 550 theme files)
**File**: `frontend/content/themes/{theme}/{locale}.ts` -> `gradeContent[gradeId]`

Fields to optimize:
- `intro` — first sentence (140-160 chars) becomes meta description; must be keyword-rich and compelling

**How the meta description is generated:**
The theme+grade page at `frontend/app/[locale]/worksheets/[theme]/[grade]/page.tsx` uses the first ~160 characters of `gradeContent[gradeId].intro` as the meta description. This means the intro text must:
1. Front-load the primary keyword in the first sentence
2. Be compelling and descriptive within 160 characters
3. Naturally flow into the rest of the intro paragraph

**Title generation:**
Currently auto-generated at `page.tsx:98-100` using a formula like:
`{Theme} Worksheets for {Grade} | LessonCraftStudio`

This may need enhancement to support content-sourced title overrides for better keyword targeting. Each theme+grade combination should have a unique title that incorporates the specific long-tail keyword.

**Example (animals + kindergarten):**
```typescript
gradeContent: {
  kindergarten: {
    intro: "Discover free printable animal worksheets for kindergarten with colorful illustrations. These engaging activities help 5-6 year olds learn counting, letter recognition, and sorting through fun animal themes. Each worksheet is customizable and ready to print.",
    // First ~160 chars: "Discover free printable animal worksheets for kindergarten with colorful illustrations. These engaging activities help 5-6 year olds learn counting, letter..."
  }
}
```

### Blog Posts (1,232 — database)
**Method**: Node.js update scripts using Prisma

Fields to optimize in `translations.{locale}` JSONB:
- `metaTitle` — optimized title (50-60 chars)
- `metaDescription` — compelling description (150-160 chars)
- `focusKeyword` — primary keyword for the post

**Example update script pattern:**
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateBlogSEO() {
  // Update specific post's English translation metadata
  await prisma.$executeRaw`
    UPDATE blog_posts
    SET translations = jsonb_set(
      jsonb_set(
        jsonb_set(translations, '{en,metaTitle}', '"New Optimized Title"'),
        '{en,metaDescription}', '"New compelling description with keywords."'
      ),
      '{en,focusKeyword}', '"primary keyword phrase"'
    )
    WHERE slug = 'post-slug-here'
  `;
}
```

### Secondary Pages (~200)
**Files**:
- `frontend/config/category-content.ts` — 8 category hub pages (math, literacy, visual, puzzles, etc.)
- `frontend/config/grade-content.ts` — 5 grade hub pages (preschool through third grade)
- Various `page.tsx` files — homepage, apps index, worksheets index, blog index

---

## 500-Part Breakdown

### PHASE 0: Foundation & English Keyword Research (Parts 1-10)

| Part | Scope | Deliverable | Estimated Pages Affected |
|------|-------|-------------|--------------------------|
| **1** | Baseline audit — extract all current titles/descriptions across all English pages | Analysis document showing current state, duplicates, gaps, cannibalization issues. Script to extract metadata from all content files and database. | 0 (audit only) |
| **2** | Keyword research framework — define methodology, rules, templates | Master keyword differentiation document with rules for each page type, naming conventions, and anti-cannibalization guidelines | 0 (framework only) |
| **3** | English keyword map: all 33 product pages | Unique primary + secondary keywords assigned per product page. Spreadsheet/document mapping each app to its target keywords. | 0 (research only) |
| **4** | English keyword map: themes 1-25 (hub pages) | Unique keywords per theme hub, differentiated from product pages | 0 (research only) |
| **5** | English keyword map: themes 26-50 (hub pages) | Unique keywords per theme hub | 0 (research only) |
| **6** | English keyword map: theme+grade batch 1 (themes 1-10 x 5 grades = 50 pages) | Grade-specific long-tail keywords for each theme+grade combination | 0 (research only) |
| **7** | English keyword map: theme+grade batch 2 (themes 11-20 x 5 grades = 50 pages) | Grade-specific keywords | 0 (research only) |
| **8** | English keyword map: theme+grade batch 3 (themes 21-35 x 5 grades = 75 pages) | Grade-specific keywords | 0 (research only) |
| **9** | English keyword map: theme+grade batch 4 (themes 36-50 x 5 grades = 75 pages) | Grade-specific keywords | 0 (research only) |
| **10** | English keyword map: 112 blog posts + secondary pages | Blog + secondary page keywords mapped | 0 (research only) |

#### Part 1 Details: Baseline Audit
The audit will:
1. Write a Node.js script that reads all `frontend/content/product-pages/en/*.ts` files and extracts `seo.title`, `seo.description`, `seo.keywords`
2. Read all `frontend/content/themes/*/en.ts` files and extract `title`, `description`, `keywords`, `heading`
3. Extract `gradeContent[*].intro` first 160 chars from all theme files
4. Query the database for all English blog post `metaTitle`, `metaDescription`, `focusKeyword`
5. Extract metadata from secondary page config files
6. Produce a comprehensive report identifying:
   - Duplicate/near-duplicate titles
   - Missing descriptions
   - Keyword cannibalization (same keywords targeting multiple pages)
   - Title length violations (too short or too long)
   - Description length violations
   - Pages with generic/uninformative metadata

#### Part 2 Details: Keyword Research Framework
The framework will establish:
1. **Naming conventions** — how to construct keywords for each page type
2. **Anti-cannibalization rules** — what keyword patterns are reserved for which page types
3. **Modifier lists** — approved modifiers per locale (free, printable, PDF, etc.)
4. **Quality checklist** — criteria each keyword must meet
5. **Templates** — fill-in templates for titles and descriptions per page type

---

### PHASE 1: English Product Pages (Parts 11-21) — 33 pages, 3 per part

Each part modifies exactly 3 product page content files in `frontend/content/product-pages/en/`.

| Part | Apps | Files Modified |
|------|------|----------------|
| **11** | addition, alphabet-train, big-small | `addition.ts`, `alphabet-train.ts`, `big-small.ts` |
| **12** | chart-count, code-addition, coloring | `chart-count.ts`, `code-addition.ts`, `coloring.ts` |
| **13** | crossword, cryptogram, draw-and-color | `crossword.ts`, `cryptogram.ts`, `draw-and-color.ts` |
| **14** | drawing-lines, find-and-count, find-objects | `drawing-lines.ts`, `find-and-count.ts`, `find-objects.ts` |
| **15** | grid-match, matching, math-puzzle | `grid-match.ts`, `matching.ts`, `math-puzzle.ts` |
| **16** | math-worksheets, missing-pieces, more-less | `math-worksheets.ts`, `missing-pieces.ts`, `more-less.ts` |
| **17** | odd-one-out, pattern-train, pattern-worksheets | `odd-one-out.ts`, `pattern-train.ts`, `pattern-worksheets.ts` |
| **18** | picture-bingo, picture-path, picture-sort | `picture-bingo.ts`, `picture-path.ts`, `picture-sort.ts` |
| **19** | prepositions, shadow-match, subtraction | `prepositions.ts`, `shadow-match.ts`, `subtraction.ts` |
| **20** | sudoku, treasure-hunt, word-guess | `sudoku.ts`, `treasure-hunt.ts`, `word-guess.ts` |
| **21** | word-scramble, word-search, writing | `word-scramble.ts`, `word-search.ts`, `writing.ts` |

#### Per-Part Process (Product Pages):
1. Read the current content file
2. Apply the keyword map from Part 3
3. Rewrite `seo.title` (50-60 chars, primary keyword front-loaded)
4. Rewrite `seo.description` (150-160 chars, keyword + benefit + CTA)
5. Rewrite `seo.keywords` (8-12 unique keywords)
6. Align `hero.title` with primary keyword
7. Update `hero.subtitle` with secondary keyword
8. Verify no cannibalization with other optimized pages
9. Validate character counts

---

### PHASE 2: English Theme Hub Pages (Parts 22-31) — 50 pages, 5 per part

Each part modifies 5 theme content files (the hub-level metadata only).

| Part | Themes | Files Modified |
|------|--------|----------------|
| **22** | animals, food, transportation, nature, school | `animals/en.ts`, `food/en.ts`, `transportation/en.ts`, `nature/en.ts`, `school/en.ts` |
| **23** | sports, emotions, body, clothing, household | `sports/en.ts`, `emotions/en.ts`, `body/en.ts`, `clothing/en.ts`, `household/en.ts` |
| **24** | toys, music, jobs, space, seasons | `toys/en.ts`, `music/en.ts`, `jobs/en.ts`, `space/en.ts`, `seasons/en.ts` |
| **25** | holidays, weather, colors, shapes, numbers | `holidays/en.ts`, `weather/en.ts`, `colors/en.ts`, `shapes/en.ts`, `numbers/en.ts` |
| **26** | alphabet, furniture, easter, halloween, xmas | `alphabet/en.ts`, `furniture/en.ts`, `easter/en.ts`, `halloween/en.ts`, `xmas/en.ts` |
| **27** | winter, farm, ocean, dinosaurs, insects | `winter/en.ts`, `farm/en.ts`, `ocean/en.ts`, `dinosaurs/en.ts`, `insects/en.ts` |
| **28** | fruits, vegetables, flowers, birds, pets | `fruits/en.ts`, `vegetables/en.ts`, `flowers/en.ts`, `birds/en.ts`, `pets/en.ts` |
| **29** | zoo, garden, camping, pirates, fairy-tales | `zoo/en.ts`, `garden/en.ts`, `camping/en.ts`, `pirates/en.ts`, `fairy-tales/en.ts` |
| **30** | robots, superheroes, construction, cooking, travel | `robots/en.ts`, `superheroes/en.ts`, `construction/en.ts`, `cooking/en.ts`, `travel/en.ts` |
| **31** | birthday, circus, forest, spring, summer | `birthday/en.ts`, `circus/en.ts`, `forest/en.ts`, `spring/en.ts`, `summer/en.ts` |

#### Per-Part Process (Theme Hubs):
1. Read the current theme `en.ts` file
2. Apply the keyword map from Parts 4-5
3. Rewrite `title` (50-60 chars, navigational keyword)
4. Rewrite `description` (150-160 chars, theme collection focus)
5. Rewrite `keywords` (8-12 keywords, browsing/navigational intent)
6. Align `heading` (H1) with title keyword
7. Verify differentiation from product page keywords
8. Validate character counts

---

### PHASE 3: English Theme+Grade Pages (Parts 32-81) — 250 pages, 1 theme (5 grades) per part

Each part optimizes ONE theme's grade content across all 5 grade levels.

| Part | Theme | Grades | File |
|------|-------|--------|------|
| **32** | animals | preschool, kindergarten, first-grade, second-grade, third-grade | `content/themes/animals/en.ts` -> gradeContent |
| **33** | food | all 5 grades | `content/themes/food/en.ts` |
| **34** | transportation | all 5 grades | `content/themes/transportation/en.ts` |
| **35** | nature | all 5 grades | `content/themes/nature/en.ts` |
| **36** | school | all 5 grades | `content/themes/school/en.ts` |
| **37** | sports | all 5 grades | `content/themes/sports/en.ts` |
| **38** | emotions | all 5 grades | `content/themes/emotions/en.ts` |
| **39** | body | all 5 grades | `content/themes/body/en.ts` |
| **40** | clothing | all 5 grades | `content/themes/clothing/en.ts` |
| **41** | household | all 5 grades | `content/themes/household/en.ts` |
| **42** | toys | all 5 grades | `content/themes/toys/en.ts` |
| **43** | music | all 5 grades | `content/themes/music/en.ts` |
| **44** | jobs | all 5 grades | `content/themes/jobs/en.ts` |
| **45** | space | all 5 grades | `content/themes/space/en.ts` |
| **46** | seasons | all 5 grades | `content/themes/seasons/en.ts` |
| **47** | holidays | all 5 grades | `content/themes/holidays/en.ts` |
| **48** | weather | all 5 grades | `content/themes/weather/en.ts` |
| **49** | colors | all 5 grades | `content/themes/colors/en.ts` |
| **50** | shapes | all 5 grades | `content/themes/shapes/en.ts` |
| **51** | numbers | all 5 grades | `content/themes/numbers/en.ts` |
| **52** | alphabet | all 5 grades | `content/themes/alphabet/en.ts` |
| **53** | furniture | all 5 grades | `content/themes/furniture/en.ts` |
| **54** | easter | all 5 grades | `content/themes/easter/en.ts` |
| **55** | halloween | all 5 grades | `content/themes/halloween/en.ts` |
| **56** | xmas | all 5 grades | `content/themes/xmas/en.ts` |
| **57** | winter | all 5 grades | `content/themes/winter/en.ts` |
| **58** | farm | all 5 grades | `content/themes/farm/en.ts` |
| **59** | ocean | all 5 grades | `content/themes/ocean/en.ts` |
| **60** | dinosaurs | all 5 grades | `content/themes/dinosaurs/en.ts` |
| **61** | insects | all 5 grades | `content/themes/insects/en.ts` |
| **62** | fruits | all 5 grades | `content/themes/fruits/en.ts` |
| **63** | vegetables | all 5 grades | `content/themes/vegetables/en.ts` |
| **64** | flowers | all 5 grades | `content/themes/flowers/en.ts` |
| **65** | birds | all 5 grades | `content/themes/birds/en.ts` |
| **66** | pets | all 5 grades | `content/themes/pets/en.ts` |
| **67** | zoo | all 5 grades | `content/themes/zoo/en.ts` |
| **68** | garden | all 5 grades | `content/themes/garden/en.ts` |
| **69** | camping | all 5 grades | `content/themes/camping/en.ts` |
| **70** | pirates | all 5 grades | `content/themes/pirates/en.ts` |
| **71** | fairy-tales | all 5 grades | `content/themes/fairy-tales/en.ts` |
| **72** | robots | all 5 grades | `content/themes/robots/en.ts` |
| **73** | superheroes | all 5 grades | `content/themes/superheroes/en.ts` |
| **74** | construction | all 5 grades | `content/themes/construction/en.ts` |
| **75** | cooking | all 5 grades | `content/themes/cooking/en.ts` |
| **76** | travel | all 5 grades | `content/themes/travel/en.ts` |
| **77** | birthday | all 5 grades | `content/themes/birthday/en.ts` |
| **78** | circus | all 5 grades | `content/themes/circus/en.ts` |
| **79** | forest | all 5 grades | `content/themes/forest/en.ts` |
| **80** | spring | all 5 grades | `content/themes/spring/en.ts` |
| **81** | summer | all 5 grades | `content/themes/summer/en.ts` |

#### Per-Part Process (Theme+Grade):
1. Read the current theme `en.ts` file
2. Apply the keyword map from Parts 6-9
3. For each of 5 grades in `gradeContent`:
   a. Rewrite `intro` so the first 140-160 chars form a keyword-rich meta description
   b. Ensure the primary long-tail keyword appears in the first sentence
   c. Make the intro compelling and descriptive (not just keyword-stuffed)
   d. Verify the intro flows naturally into the rest of the content
4. Verify each grade targets a DIFFERENT long-tail variation
5. Verify differentiation from the theme hub page keywords
6. Validate description length (first sentence = 140-160 chars)

---

### PHASE 4: English Blog Posts (Parts 82-93) — 112 posts, ~10 per part

Blog posts are updated via Node.js scripts that modify the PostgreSQL database.

| Part | Posts | Method |
|------|-------|--------|
| **82** | Blog posts 1-10 (by creation date, oldest first) | Node.js script updating JSONB via Prisma |
| **83** | Blog posts 11-20 | Same |
| **84** | Blog posts 21-30 | Same |
| **85** | Blog posts 31-40 | Same |
| **86** | Blog posts 41-50 | Same |
| **87** | Blog posts 51-60 | Same |
| **88** | Blog posts 61-70 | Same |
| **89** | Blog posts 71-80 | Same |
| **90** | Blog posts 81-90 | Same |
| **91** | Blog posts 91-100 | Same |
| **92** | Blog posts 101-110 | Same |
| **93** | Blog posts 111-112 | Same |

#### Per-Part Process (Blog Posts):
1. Query database to get current blog post metadata for the batch
2. Apply the keyword map from Part 10
3. For each post:
   a. Write optimized `metaTitle` (50-60 chars, informational keyword)
   b. Write optimized `metaDescription` (150-160 chars, compelling + keyword)
   c. Assign `focusKeyword` (primary informational keyword)
4. Create Node.js script to apply updates
5. Run script on production server
6. Verify updates took effect

---

### PHASE 5: English Secondary Pages (Parts 94-97)

| Part | Scope | Files | Details |
|------|-------|-------|---------|
| **94** | 8 category hub pages | `frontend/config/category-content.ts` | Optimize metadata for math, literacy, visual, puzzles categories across page metadata |
| **95** | 5 grade hub pages | `frontend/config/grade-content.ts` | Optimize metadata for preschool, kindergarten, first-grade, second-grade, third-grade |
| **96** | Homepage, apps index, worksheets index | `frontend/app/[locale]/page.tsx`, `frontend/app/[locale]/apps/page.tsx`, `frontend/app/[locale]/worksheets/page.tsx` | Top-level navigation pages |
| **97** | Blog index, blog categories, static pages | `frontend/app/[locale]/blog/page.tsx`, about, privacy, terms pages | Supporting pages |

---

### PHASE 6: English Verification & Deploy (Parts 98-100)

| Part | Scope | Details |
|------|-------|---------|
| **98** | Validate all English metadata | Script to check: title lengths (50-60 chars), description lengths (150-160 chars), keyword uniqueness across all pages, no primary keyword duplicates, correct language |
| **99** | Cross-check English internal linking | Verify internal link anchor texts align with new target keywords, sitemap URLs match optimized pages, hreflang tags consistent |
| **100** | Commit, push, deploy English changes | Git commit all English optimizations, push to remote, deploy via deploy.sh, verify live meta tags on 10+ sample pages across all page types |

#### Part 98 Validation Checklist:
- [ ] All 33 product page titles: 50-60 chars
- [ ] All 33 product page descriptions: 150-160 chars
- [ ] All 50 theme hub titles: 50-60 chars
- [ ] All 50 theme hub descriptions: 150-160 chars
- [ ] All 250 theme+grade intro first sentences: 140-160 chars
- [ ] All 112 blog post metaTitles: 50-60 chars
- [ ] All 112 blog post metaDescriptions: 150-160 chars
- [ ] Zero primary keyword duplicates across all English pages
- [ ] All metadata in English (no locale leakage)

---

### PHASES 7-16: Non-English Locales (Parts 101-495)

Each non-English locale gets approximately **39-40 parts**, ordered from lowest to highest competition. This order maximizes early wins — low-competition locales will rank faster, generating traffic and momentum while high-competition locales are being optimized.

#### Phase 7: Finnish (fi) — Parts 101-140

| Sub-Part | Part # | Scope | Pages |
|----------|--------|-------|-------|
| 1 | **101** | Finnish keyword research — all page types | Research only |
| 2 | **102** | Product pages: apps 1-4 | 4 files |
| 3 | **103** | Product pages: apps 5-8 | 4 files |
| 4 | **104** | Product pages: apps 9-12 | 4 files |
| 5 | **105** | Product pages: apps 13-16 | 4 files |
| 6 | **106** | Product pages: apps 17-20 | 4 files |
| 7 | **107** | Product pages: apps 21-24 | 4 files |
| 8 | **108** | Product pages: apps 25-28 | 4 files |
| 9 | **109** | Product pages: apps 29-33 | 5 files |
| 10 | **110** | Theme hubs: themes 1-10 | 10 theme files (fi.ts) |
| 11 | **111** | Theme hubs: themes 11-20 | 10 files |
| 12 | **112** | Theme hubs: themes 21-30 | 10 files |
| 13 | **113** | Theme hubs: themes 31-40 | 10 files |
| 14 | **114** | Theme hubs: themes 41-50 | 10 files |
| 15 | **115** | Theme+grade: themes 1-4 (x5 grades = 20 pages) | 4 theme files |
| 16 | **116** | Theme+grade: themes 5-8 | 4 files |
| 17 | **117** | Theme+grade: themes 9-12 | 4 files |
| 18 | **118** | Theme+grade: themes 13-16 | 4 files |
| 19 | **119** | Theme+grade: themes 17-20 | 4 files |
| 20 | **120** | Theme+grade: themes 21-24 | 4 files |
| 21 | **121** | Theme+grade: themes 25-28 | 4 files |
| 22 | **122** | Theme+grade: themes 29-32 | 4 files |
| 23 | **123** | Theme+grade: themes 33-36 | 4 files |
| 24 | **124** | Theme+grade: themes 37-40 | 4 files |
| 25 | **125** | Theme+grade: themes 41-44 | 4 files |
| 26 | **126** | Theme+grade: themes 45-48 | 4 files |
| 27 | **127** | Theme+grade: themes 49-50 | 2 files |
| 28 | **128** | Blog posts 1-19 (fi translations) | DB update script |
| 29 | **129** | Blog posts 20-38 | DB update script |
| 30 | **130** | Blog posts 39-56 | DB update script |
| 31 | **131** | Blog posts 57-75 | DB update script |
| 32 | **132** | Blog posts 76-93 | DB update script |
| 33 | **133** | Blog posts 94-112 | DB update script |
| 34 | **134** | Secondary pages: categories + grades (fi) | Config files |
| 35 | **135** | Secondary pages: homepage, indexes (fi) | page.tsx files |
| 36 | **136** | Finnish verification: lengths, uniqueness, language | Validation script |
| 37 | **137** | Finnish cross-check: links, sitemap, hreflang | Verification |
| 38 | **138** | Finnish commit + deploy | Deployment |
| 39 | **139** | Finnish live verification | Post-deploy checks |
| 40 | **140** | Finnish buffer/overflow | Any remaining items |

#### Phase 8: Danish (da) — Parts 141-179
Same structure as Finnish, with Danish-specific keyword research and terminology.

#### Phase 9: Norwegian (no) — Parts 180-218
Same structure as Finnish, with Norwegian-specific keyword research and terminology.

#### Phase 10: Swedish (sv) — Parts 219-258
Same structure, 40 parts. Swedish market slightly more competitive — keywords 3-4 words.

#### Phase 11: Dutch (nl) — Parts 259-297
Same structure, 39 parts. Dutch market moderate competition — keywords 3-4 words.

#### Phase 12: Italian (it) — Parts 298-337
Same structure, 40 parts. Italian growing education market — keywords 3-5 words.

#### Phase 13: Portuguese (pt) — Parts 338-376
Same structure, 39 parts. Portuguese Brazil focus — keywords 3-5 words. Special attention to Brazilian Portuguese vs European Portuguese terminology.

#### Phase 14: Spanish (es) — Parts 377-416
Same structure, 40 parts. Spanish highly competitive — keywords 4-6 words. Consider Latin American vs Spain variations.

#### Phase 15: French (fr) — Parts 417-456
Same structure, 40 parts. French very competitive — keywords 4-6 words. Special attention to Quebec vs France terminology.

#### Phase 16: German (de) — Parts 457-495
Same structure, 39 parts. German extremely competitive "Arbeitsblatter" market — keywords 4-6 words. Compound nouns provide unique keyword opportunities.

---

### PHASE 17: Final Cross-Locale Optimization (Parts 496-500)

| Part | Scope | Details |
|------|-------|---------|
| **496** | Global cannibalization audit | Verify no two pages in the same locale target identical primary queries. Script to compare all primary keywords across all pages within each locale. Flag and resolve any duplicates. |
| **497** | Hreflang consistency check | Verify all hreflang alternate tags point to optimized pages with matching metadata. Ensure x-default points to English. Check for missing hreflang entries. |
| **498** | Sitemap regeneration and validation | Regenerate sitemaps for all locales. Validate every sitemap URL resolves to a page with optimized metadata. Check lastmod dates are current. |
| **499** | Internal linking optimization | Audit all internal link anchor texts across the site. Align anchor texts with target keywords of destination pages. Update `frontend/lib/internal-linking.ts` keyword mappings. |
| **500** | Final deployment and validation | Full site deployment. Live validation script checking meta tags on 50+ sample pages across all locales and page types. Establish traffic baseline for future measurement. |

---

## Per-Page Optimization Template

### Title Formula
`{Primary Keyword} | {Unique Differentiator} | LessonCraftStudio`
- 50-60 characters total
- Primary keyword front-loaded (appears first)
- Differentiator prevents cannibalization between similar pages
- Brand name at end (can be dropped if title exceeds 60 chars)

### Description Formula
`{Action verb} {specific benefit} with {unique feature}. {Target audience}. {CTA}.`
- 150-160 characters total
- Includes primary keyword naturally in the first 100 characters
- Includes a compelling benefit (not just feature description)
- Ends with action-oriented CTA ("Print now", "Try free", "Browse collection")

### Keyword Rules
1. 8-12 keywords per page
2. Primary keyword appears in title, H1, and first 160 chars of description
3. No two pages in the same locale share the same primary keyword
4. Secondary keywords complement (don't duplicate) related pages
5. Keywords must be in the correct language for the locale
6. Keywords should include a mix of:
   - Exact-match primary keyword
   - Close variations (singular/plural, word order)
   - Long-tail extensions
   - Related semantic keywords
   - At least 1-2 "free" or "printable" modifiers (where natural)

### H1 (Heading) Rules
1. Must contain the primary keyword or a close variation
2. Should differ slightly from the title tag (avoids exact duplication)
3. Should be natural and compelling (not just keyword-stuffed)
4. 30-70 characters recommended

---

## Technical Considerations

### 1. File Encoding
Theme and product content files use Unicode escapes (`\u00e4` for a, `\u2014` for em dash). When modifying these files:
- Use the Write tool + `scripts/fix-unicode.js` for files with special characters
- Or write a Node.js script to generate content (JS parses `\uXXXX` in source code)
- Always verify file integrity after writing

### 2. Blog Database Updates
Blog posts are stored in PostgreSQL with translations in a JSONB column. Updates require:
- Node.js scripts using Prisma ORM
- Scripts run on the production server via plink
- Always verify updates with a SELECT query after running

### 3. Theme+Grade Title Generation
Currently auto-generated at `frontend/app/[locale]/worksheets/[theme]/[grade]/page.tsx:98-100`.
- May need enhancement to support content-sourced title overrides
- Each theme+grade combination should ideally have a unique title
- If modifying the page.tsx generation logic, ensure backward compatibility

### 4. Keyword Research Approach
Since real-time search volume data is not available:
- Use linguistic analysis to identify natural search patterns
- Consider semantic relevance and user intent
- Estimate competition based on locale tier
- Focus on long-tail specificity and intent differentiation
- Leverage knowledge of educational vocabulary in each language

### 5. ISR Revalidation
Pages use Incremental Static Regeneration with 30-60 minute revalidation:
- Changes to content files take effect after next build/deploy
- Database changes (blog posts) take effect after ISR revalidation
- Manual revalidation can be triggered if needed

### 6. Deployment Safety
- Always commit and push before deploying
- Never use `git add .` (follow CLAUDE.md rules)
- Add specific files: `git add frontend/content/product-pages/en/addition.ts`
- Deploy via the standard deploy.sh command

---

## Verification Per Phase

After each locale is complete (every ~40 parts), run verification:

1. **Title length**: all titles 50-60 chars (flag violations)
2. **Description length**: all descriptions 150-160 chars (flag violations)
3. **Keyword uniqueness**: no primary keyword duplicates within locale
4. **Language correctness**: all metadata in correct locale language (no English leaking into non-EN pages)
5. **Live HTML check**: meta tags render correctly on deployed pages
6. **Cannibalization check**: no two pages targeting the same search query
7. **Hreflang alignment**: alternate language versions exist and have matching intent

---

## Success Metrics

After all 500 parts are complete:
- **5,095 pages** with unique, optimized metadata
- **Zero** primary keyword duplicates within any locale
- **100%** title compliance (50-60 chars)
- **100%** description compliance (150-160 chars)
- **11 locales** with locale-appropriate keywords
- **5 search intents** properly differentiated across page types
- Target: **1+ organic click per day per page** within 3-6 months of indexing

---

## Progress Tracking

| Phase | Parts | Locale | Status |
|-------|-------|--------|--------|
| 0 | 1-10 | EN (research) | Pending |
| 1 | 11-21 | EN (product) | Pending |
| 2 | 22-31 | EN (theme hubs) | Pending |
| 3 | 32-81 | EN (theme+grade) | Pending |
| 4 | 82-93 | EN (blog) | Pending |
| 5 | 94-97 | EN (secondary) | Pending |
| 6 | 98-100 | EN (verify+deploy) | Pending |
| 7 | 101-140 | fi | Pending |
| 8 | 141-179 | da | Pending |
| 9 | 180-218 | no | Pending |
| 10 | 219-258 | sv | Pending |
| 11 | 259-297 | nl | Pending |
| 12 | 298-337 | it | Pending |
| 13 | 338-376 | pt | Pending |
| 14 | 377-416 | es | Pending |
| 15 | 417-456 | fr | Pending |
| 16 | 457-495 | de | Pending |
| 17 | 496-500 | Cross-locale | Pending |