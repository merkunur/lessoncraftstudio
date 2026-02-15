# SEO Keyword Framework for LessonCraftStudio

> Part 2 of the ONE CLICK A DAY SEO plan.
> This document defines the methodology, rules, templates, and anti-cannibalization guidelines
> that all subsequent keyword mapping (Parts 3-10) and implementation (Parts 11+) must follow.

---

## Table of Contents

1. [Intent-Based Keyword Architecture](#1-intent-based-keyword-architecture)
2. [Anti-Cannibalization Rules](#2-anti-cannibalization-rules)
3. [Modifier Lists](#3-modifier-lists)
4. [Title Templates Per Page Type](#4-title-templates-per-page-type)
5. [Description Templates Per Page Type](#5-description-templates-per-page-type)
6. [Quality Checklist](#6-quality-checklist)
7. [Theme+Grade Title Override Proposal](#7-themegrade-title-override-proposal)

---

## 1. Intent-Based Keyword Architecture

Every page on the site serves exactly one search intent. The primary keyword for each page must match that intent. No two page types may target the same intent with the same keyword.

### 1.1 Page Type Inventory

| Page Type | Count (EN) | Count (all 11 locales) | Search Intent |
|-----------|------------|------------------------|---------------|
| Product Pages | 33 | 363 | **Transactional** - user wants to create/generate a specific worksheet |
| Theme Hub Pages | 50 | 550 | **Navigational/Browse** - user wants to explore a theme's worksheet collection |
| Theme+Grade Pages | 250 | 2,750 | **Long-tail Specific** - user wants worksheets for a specific theme at a specific grade |
| Blog Posts | 112 | 1,232 | **Informational** - user wants teaching strategies, ideas, or guides |
| Category Hub Pages | 8 | 88 | **Platform Browse** - user wants to browse a category of worksheet tools |
| Grade Hub Pages | 5 | 55 | **Grade Browse** - user wants worksheets for a specific grade level |

**Total: 458 EN pages / ~5,038 across all locales**

### 1.2 Exclusive Keyword Territories

Each page type owns a specific keyword pattern. No other page type may use a keyword that fits another type's exclusive pattern.

| Page Type | Exclusive Keyword Pattern | Examples |
|-----------|--------------------------|----------|
| **Product** | `{tool} generator`, `create {tool}`, `{tool} maker`, `make {tool}` | "addition worksheet generator", "create word search", "sudoku maker for kids" |
| **Theme Hub** | `{theme} worksheets for kids`, `{theme} printable activities`, `{theme} worksheet collection` | "animal worksheets for kids", "dinosaur printable activities", "ocean worksheet collection" |
| **Theme+Grade** | `{theme} worksheets {grade}`, `{theme} {grade} activities`, `{theme} worksheets for {age}` | "animal worksheets kindergarten", "dinosaur first grade activities", "ocean worksheets for 5 year olds" |
| **Blog** | `how to teach {topic}`, `{topic} ideas for {audience}`, `best {topic} strategies` | "how to teach addition to kindergarteners", "dinosaur activity ideas for preschoolers" |
| **Category Hub** | `{category} worksheet generators`, `{category} tools for teachers` | "math worksheet generators", "literacy tools for teachers" |
| **Grade Hub** | `{grade} worksheets`, `worksheets for {age} year olds` | "kindergarten worksheets", "worksheets for 6 year olds" |

### 1.3 Keyword Hierarchy

When a keyword could belong to multiple page types, the hierarchy determines which page owns it:

```
Product Page (most specific: the tool itself)
  > Theme+Grade Page (specific: theme + grade combo)
    > Theme Hub Page (medium: the theme as a whole)
      > Grade Hub Page (medium: the grade as a whole)
        > Category Hub Page (broad: the category)
          > Blog Post (informational: teaching the topic)
```

**Example: "addition worksheets"**
- Product page owns: "addition worksheet generator" (transactional)
- Theme+grade page owns: "addition worksheets for first grade" (long-tail)
- Theme hub page owns: "addition worksheet activities for kids" (navigational)
- Blog post owns: "how to teach addition with worksheets" (informational)

---

## 2. Anti-Cannibalization Rules

These 10 rules eliminate the 6 cannibalization groups identified in the Part 1 audit and prevent future overlap.

### Rule 1: One Primary Keyword Per Page

Every page has exactly one primary keyword. No two pages on the entire site may share the same primary keyword. The primary keyword appears in the title tag and is the #1 target for that page.

### Rule 2: Product Pages Own Tool-Action Keywords

Product pages exclusively own keywords containing creation/generation verbs:
- **Reserved words:** generator, maker, creator, create, build, make, design, customize
- **Pattern:** `{tool-name} {reserved-word}` or `{reserved-word} {tool-name}`
- **Resolves:** "addition worksheets" cannibalization (product page becomes "addition worksheet generator"; code-addition becomes "picture addition worksheet maker")

### Rule 3: Theme Hubs Own Theme-Collection Keywords

Theme hub pages exclusively own keywords combining a theme with collection/browse language:
- **Reserved words:** collection, themed, activities, all grades, for kids, printable set
- **Pattern:** `{theme} {collection-word}` or `{theme} worksheets for kids`
- **Resolves:** Generic "free worksheet" overlap (each theme hub gets a unique theme+qualifier combo)

### Rule 4: Theme+Grade Pages Own Theme-Grade Combinations

Theme+grade pages exclusively own keywords combining a theme with a specific grade or age:
- **Reserved words:** specific grade names (preschool, kindergarten, first grade, second grade, third grade), age ranges (ages 3-4, ages 5-6, etc.)
- **Pattern:** `{theme} worksheets {grade}` or `{theme} activities for {age}`
- **No theme hub or product page may include a grade-specific keyword as its primary keyword.**

### Rule 5: Blog Posts Own Informational Keywords

Blog posts exclusively own keywords with informational/educational intent:
- **Reserved words:** how to, guide, tips, ideas, strategies, best, ways to, teaching
- **Pattern:** `how to teach {topic}`, `best {topic} ideas`, `{number} ways to {action}`
- **No product page or theme page may use "how to" or "guide" in its primary keyword.**

### Rule 6: Category/Grade Hubs Own Browsing Keywords

Category and grade hub pages own broad browsing keywords for their respective dimension:
- **Category hubs reserved:** `{category} worksheet generators`, `{category} tools`
- **Grade hubs reserved:** `{grade} worksheets`, `worksheets for {age} year olds`
- **Resolves:** "matching worksheets" cannibalization (product page becomes "matching worksheet generator"; category page becomes "matching & sorting worksheet tools")
- **Resolves:** "math worksheets" cannibalization (product page becomes "math worksheet generator with answer keys"; category page becomes "math worksheet tools for teachers")
- **Resolves:** "pattern worksheets" cannibalization (product page becomes "pattern recognition worksheet maker"; category page becomes "pattern & motor skills worksheet tools")

### Rule 7: Generic Modifiers Require Specific Qualifiers

The words "free", "printable", and "worksheet" are allowed on any page type but must always be paired with a type-specific qualifier that establishes intent:

| Modifier | Product Page Must Pair With | Theme Hub Must Pair With | Theme+Grade Must Pair With |
|----------|-----------------------------|--------------------------|----------------------------|
| free | generator, maker, create | for kids, collection, themed | {grade}, ages {range} |
| printable | {tool-name} | {theme} activities | {theme} {grade} |
| worksheet | generator, maker | collection, for kids | {grade}, for {age} |

**Bad:** "Free Printable Worksheets" (no qualifier - any page could rank)
**Good:** "Free Addition Worksheet Generator" (product), "Free Animal Worksheets for Kids" (theme hub)

### Rule 8: Sibling Product Pages Must Differentiate

When two product pages target similar tools, their primary keywords must differ by more than a single modifier:
- **addition-worksheets** vs **code-addition-worksheets**: differentiate as "addition worksheet generator with answer keys" vs "picture math addition worksheet maker"
- **coloring-worksheets** vs **draw-and-color-worksheets**: differentiate as "coloring page generator for kids" vs "draw and color creative worksheet maker"

### Rule 9: Cross-Type Secondary Keywords Are Allowed But Capped

A page may include secondary keywords from another page type's territory, but:
- Maximum 2 secondary keywords from outside the page's own intent territory
- Secondary keywords must not duplicate any other page's primary keyword
- Secondary keywords carry lower weight and are for supporting relevance only

### Rule 10: Brand Name Placement Is Consistent

"LessonCraftStudio" appears at the end of titles after a pipe separator: `{Primary Keyword Phrase} | LessonCraftStudio`. It is never used as a keyword and never appears in meta descriptions.

---

## 3. Modifier Lists

### 3.1 Product Page Modifiers

**Primary (action/tool) modifiers** - one required per title:
- generator, maker, creator, builder

**Feature modifiers** - use 1-2 to differentiate:
- with answer keys, with pictures, with images, customizable
- PDF download, editable, printable
- easy, step-by-step, drag-and-drop

**Audience modifiers** - use 1 to target:
- for kids, for kindergarten, for preschool, for teachers, for parents
- for ages 3-8, for elementary

**Theme modifiers** (only when product is theme-agnostic):
- math, literacy, puzzle, pattern, visual

### 3.2 Theme Hub Modifiers

**Collection modifiers** - one required per title:
- for kids, activities, collection, printable set, themed

**Scope modifiers** - use 1 to signal breadth:
- all grades, preschool to 3rd grade, ages 3-9
- math reading and more, complete set

**Content modifiers** - use 1-2 to describe what's included:
- math, reading, coloring, puzzles
- tracing, counting, matching, sorting

**Differentiator modifiers** - unique per theme to avoid template sameness:
- Use a unique hook per theme (e.g., "with real animal facts", "explore the solar system", "learn about community helpers")

### 3.3 Theme+Grade Modifiers

**Grade modifiers** - one required per title:
- preschool, pre-K, kindergarten, first grade, 1st grade, second grade, 2nd grade, third grade, 3rd grade

**Age modifiers** - use as alternative to grade:
- ages 3-4, ages 4-5, ages 5-6, ages 6-7, ages 7-8, ages 8-9

**Benefit modifiers** - one required to differentiate from theme hub:
- age-appropriate, developmentally suited, curriculum-aligned
- hands-on, interactive, engaging

**Skill modifiers** - one specific skill per theme+grade page:
- counting, letter recognition, fine motor, reading comprehension
- number sense, phonics, critical thinking, problem solving

### 3.4 Blog Post Modifiers

**Intent modifiers** - one required:
- how to, guide to, tips for, ideas for, strategies for
- ways to, best practices, activities for

**Audience modifiers** - one required:
- teachers, parents, homeschoolers, educators
- kindergarten teachers, preschool parents

**Format modifiers** - optional, for list/resource posts:
- {number} (e.g., "10 ways"), printable, free, easy

### 3.5 Category Hub Modifiers

**Platform modifiers** - one required:
- generators, tools, makers, suite
- online, free, customizable

**Scope modifiers:**
- for teachers, for classrooms, for elementary

### 3.6 Grade Hub Modifiers

**Age modifiers** - one required:
- ages {range}, {age} year olds
- {grade} level, early elementary, upper elementary

**Content promise modifiers:**
- free printable, all subjects, math and reading
- worksheets and activities

---

## 4. Title Templates Per Page Type

All titles must be 50-60 characters including the brand suffix. The brand suffix ` | LessonCraftStudio` is 21 characters, leaving 29-39 characters for the keyword phrase.

### 4.1 Product Page Title Template

```
{Tool Name} {Action Modifier} — {Feature/Audience Qualifier} | LCS
```

**Character budget:** 50-60 total

**Examples:**
| Current Title | Optimized Title | Chars |
|---------------|-----------------|-------|
| Addition Worksheets \| Free Printable Math Generator | Addition Worksheet Generator With Answer Keys \| LCS | 52 |
| Coloring Worksheets \| Free Coloring Pages for Kids | Coloring Page Generator for Kids \| LCS | 41* |
| Sudoku Worksheets \| Free 4x4 Puzzles for Kids | Sudoku Puzzle Maker for Kids - Easy 4x4 Grids \| LCS | 52 |
| Word Search Worksheets \| Free Word Puzzles for Kids | Word Search Generator - Custom Puzzles for Kids \| LCS | 52 |

*Pad short titles with a feature modifier: "Coloring Page Generator for Kids - Free Printable | LCS" (55 chars)

**Note:** "LCS" is used as shorthand in examples. Actual implementation uses "LessonCraftStudio" in full, adjusted to fit character budget. If the full name causes overflow, the pipe separator is dropped and only the keyword phrase is used.

### 4.2 Theme Hub Title Template

```
{Theme} {Activity Type} for Kids — {Unique Differentiator} | LCS
```

**Examples:**
| Current Title | Optimized Title | Chars |
|---------------|-----------------|-------|
| Free Animals Worksheets for Kids \| LessonCraftStudio | Animal Worksheets for Kids - Math Reading & More \| LCS | 55 |
| Free Dinosaurs Worksheets for Kids \| LessonCraftStudio | Dinosaur Activities for Kids - Prehistoric Fun \| LCS | 52 |
| Free Space Worksheets for Kids \| LessonCraftStudio | Space Worksheets for Kids - Explore the Solar System \| LCS | 58 |
| Free Ocean Worksheets for Kids \| LessonCraftStudio | Ocean Worksheets for Kids - Sea Life Activities \| LCS | 51 |

**Key change:** Each theme hub gets a unique differentiator phrase instead of the identical "Free {Theme} Worksheets for Kids" formula.

### 4.3 Theme+Grade Title Template

```
{Theme} {Grade} Worksheets — {Specific Skill/Benefit} | LCS
```

**Examples:**
| Current Title | Optimized Title | Chars |
|---------------|-----------------|-------|
| Free Animals Worksheets for Preschool \| LessonCraftStudio | Animal Preschool Worksheets - Counting & Colors \| LCS | 54 |
| Free Animals Worksheets for Kindergarten \| LessonCraftStudio | Animal Kindergarten Worksheets - Reading & Math \| LCS | 52 |
| Free Dinosaurs Worksheets for First Grade \| LessonCraftStudio | Dinosaur First Grade Worksheets - Facts & Puzzles \| LCS | 55 |

**Key change:** Each theme+grade page gets a skill/benefit qualifier that differentiates it from both the parent theme hub and sibling grade pages.

### 4.4 Blog Post Title Template

```
{How-To / Number-List / Topic}: {Specific Angle} | LCS
```

**Examples:**
| Pattern | Example | Chars |
|---------|---------|-------|
| How-to | How to Teach Addition With Worksheets \| LCS | 46* |
| List | 10 Dinosaur Activities for Preschool Classrooms \| LCS | 54 |
| Guide | Kindergarten Math Worksheet Guide for Teachers \| LCS | 52 |

*Pad short titles: "How to Teach Addition With Worksheets - 5 Methods | LCS" (55 chars)

### 4.5 Category Hub Title Template

```
{Category} Worksheet {Platform Word} — {Scope} | LCS
```

**Examples:**
| Current Title | Optimized Title | Chars |
|---------------|-----------------|-------|
| Free Math Worksheet Generators | Math Worksheet Generators - Free Tools for Teachers \| LCS | 58 |
| Matching & Sorting Worksheets | Matching & Sorting Worksheet Tools - All Ages \| LCS | 52 |

### 4.6 Grade Hub Title Template

```
{Grade} Worksheets Ages {Range} — {Content Promise} | LCS
```

**Examples:**
| Pattern | Example | Chars |
|---------|---------|-------|
| Preschool | Preschool Worksheets Ages 3-4 - Free Printable \| LCS | 54 |
| Kindergarten | Kindergarten Worksheets Ages 5-6 - All Subjects \| LCS | 53 |

---

## 5. Description Templates Per Page Type

All meta descriptions must be 150-160 characters. Descriptions must contain the primary keyword within the first 80 characters (the portion visible in most SERPs).

### 5.1 Product Page Description Template

```
Create custom {tool-type} worksheets with {key-feature}. Free printable {audience-qualifier}. {Unique-benefit-or-CTA}.
```

**Character target:** 150-160

**Examples:**
| Product | Description | Chars |
|---------|-------------|-------|
| addition-worksheets | Create custom addition worksheets with 4 exercise modes and answer keys. Free printable math for K-2. Choose difficulty and download PDF instantly. | 151 |
| coloring-worksheets | Create custom coloring page worksheets with themed images kids love. Free printable for preschool to 3rd grade. Pick a theme and print in seconds. | 150 |
| word-search | Create custom word search puzzles with your own word lists. Free printable word games for elementary classrooms. Generate and download PDF instantly. | 152 |

**Rules:**
- First sentence: "Create custom {tool}" establishes transactional intent
- Second sentence: "Free printable {audience}" includes audience qualifier
- Third sentence: Unique CTA or benefit (avoid repeating "Download PDF in 3 minutes" across all pages)

### 5.2 Theme Hub Description Template

```
Explore {theme}-themed worksheets for kids: {content-list}. Free printable activities for preschool to 3rd grade. {Unique-theme-hook}.
```

**Character target:** 150-160

**Examples:**
| Theme | Description | Chars |
|-------|-------------|-------|
| animals | Explore animal-themed worksheets for kids: math, reading, coloring, and puzzles. Free printable activities for preschool to 3rd grade. 30+ generators. | 153 |
| dinosaurs | Explore dinosaur-themed worksheets for kids: counting, word search, coloring, and more. Free printable prehistoric activities for ages 3-9. | 142* |
| space | Explore space-themed worksheets for kids: planet math, star puzzles, and reading games. Free printable cosmic activities for all elementary grades. | 152 |

*Pad short descriptions with a unique hook: "...for ages 3-9. Learn while having prehistoric fun." (155 chars)

**Rules:**
- First clause: "Explore {theme}-themed worksheets" establishes browse intent
- Colon list: 3-4 content types available
- Second sentence: Free + audience range
- Third sentence: Unique theme hook (never repeated across themes)

### 5.3 Theme+Grade Description Template

```
Free printable {theme} worksheets for {grade} (ages {range}). {Skill-focus-sentence}. Download {theme}-themed {activity-types} — ready to print.
```

**Character target:** 150-160

**Examples:**
| Theme+Grade | Description | Chars |
|-------------|-------------|-------|
| animals + preschool | Free printable animal worksheets for preschool (ages 3-4). Build counting and color recognition skills. Download animal-themed math and coloring pages. | 154 |
| dinosaurs + first grade | Free printable dinosaur worksheets for first grade (ages 6-7). Practice addition and reading comprehension. Download dinosaur-themed math and puzzles. | 155 |

**Rules:**
- First sentence: primary keyword (theme + grade) with age range in parentheses
- Second sentence: 1-2 specific skills targeted at that grade level
- Third sentence: CTA with activity types
- Must differ from both the parent theme hub description and sibling grade descriptions

### 5.4 Blog Post Description Template

```
{Opening-hook-with-primary-keyword}. {Key-insight-or-promise}. {Specific-takeaway-or-number}.
```

**Character target:** 150-160

**Examples:**
| Post Type | Description | Chars |
|-----------|-------------|-------|
| How-to | Learn how to teach addition to kindergarteners with hands-on worksheets. Research-backed strategies that boost math confidence. 5 methods inside. | 148* |
| List post | 33 editable worksheet generators every elementary teacher needs. Compare features, find the best fit for your classroom, and start creating for free. | 155 |

*Pad: "...5 proven methods explained step by step inside." (152 chars)

### 5.5 Category Hub Description Template

```
Browse free {category} worksheet generators for {audience}. {Tool-list-or-count}. Create custom printable {category} activities in minutes.
```

**Character target:** 150-160

### 5.6 Grade Hub Description Template

```
Free {grade} worksheets for ages {range}. {Subject-coverage}. Printable activities covering {skills} — download and use today.
```

**Character target:** 150-160

---

## 6. Quality Checklist

Every keyword, title, and description must pass all 10 criteria before implementation.

### 6.1 Keyword Criteria

| # | Criterion | Pass Condition |
|---|-----------|----------------|
| K1 | **Unique primary** | No other page on the site has this exact primary keyword |
| K2 | **Intent match** | Keyword matches the page type's exclusive intent territory (Section 1) |
| K3 | **Contains core term** | Keyword includes the page's core subject (tool name, theme, or topic) |
| K4 | **Has qualifier** | Keyword includes at least one type-specific modifier (Section 3) |
| K5 | **No orphan generics** | Words like "free", "printable", "worksheet" are always paired with a qualifier |

### 6.2 Title Criteria

| # | Criterion | Pass Condition |
|---|-----------|----------------|
| T1 | **Character count** | 50-60 characters (including brand suffix) |
| T2 | **Primary keyword present** | Title contains the page's primary keyword or a close variant |
| T3 | **Brand suffix** | Ends with `\| LessonCraftStudio` (or abbreviated if needed for length) |
| T4 | **Unique across site** | No other page has the same title |
| T5 | **No keyword stuffing** | Maximum 2 keyword-bearing phrases; reads naturally |

### 6.3 Description Criteria

| # | Criterion | Pass Condition |
|---|-----------|----------------|
| D1 | **Character count** | 150-160 characters |
| D2 | **Primary keyword in first 80 chars** | The primary keyword appears before the 80-character mark |
| D3 | **Unique CTA or hook** | Contains a sentence not shared with any other page's description |
| D4 | **No brand name** | "LessonCraftStudio" does not appear in the description |
| D5 | **Actionable language** | Contains at least one action verb (create, explore, download, learn, discover) |

### 6.4 Pre-Implementation Validation

Before any keyword mapping is committed (Parts 3-10), run these validation steps:

1. **Uniqueness scan:** Export all primary keywords to a flat list; confirm zero duplicates
2. **Intent territory check:** For each keyword, verify it belongs to the correct page type per Section 1.2
3. **Cannibalization cross-check:** For each of the 6 known cannibalization groups, verify the new keywords resolve the overlap
4. **Character count audit:** Verify all titles are 50-60 chars, all descriptions are 150-160 chars
5. **Template compliance:** Verify each title and description matches its page type template (Section 4/5)

---

## 7. Theme+Grade Title Override Proposal

### 7.1 Current Situation

Theme+grade page titles are hardcoded in `frontend/app/[locale]/worksheets/[theme]/[grade]/page.tsx` (line 98-100):

```typescript
const title = locale === 'en'
  ? `Free ${themeName} Worksheets for ${gradeName} | LessonCraftStudio`
  : `${themeName} ${worksheetsLabel[locale] || 'Worksheets'} ${gradeName} | LessonCraftStudio`;
```

This produces identical-structure titles for all 250 English theme+grade pages with zero keyword customization. The meta description is auto-extracted from the first 160 characters of `gradeContent.intro` (line 104-107), which was written as narrative prose, not as an SEO-optimized snippet.

### 7.2 Proposed Type Change

Add three optional SEO override fields to the `GradeLearningContent` interface in `frontend/content/themes/types.ts`:

```typescript
export interface GradeLearningContent {
  /** 200+ word grade-specific intro paragraph */
  intro: string;
  /** Grade-specific learning objectives */
  objectives: LearningObjective[];
  /** Age-appropriate developmental context */
  developmentalNotes: string;
  /** 2-3 grade-specific teaching tips */
  teachingTips: string[];
  /** 3-5 grade-specific FAQ entries */
  faq: Array<{ question: string; answer: string }>;

  // --- NEW: SEO override fields (optional) ---

  /** Custom SEO title for this theme+grade page (50-60 chars). Falls back to template if omitted. */
  seoTitle?: string;
  /** Custom meta description (150-160 chars). Falls back to intro snippet if omitted. */
  seoDescription?: string;
  /** Comma-separated SEO keywords. Falls back to parent theme keywords if omitted. */
  seoKeywords?: string;
}
```

### 7.3 Proposed Page Logic Change

Update `page.tsx` to prefer the override fields when present:

```typescript
// Title: prefer grade-level SEO title, fall back to template
const title = gradeContentMeta?.seoTitle
  ? gradeContentMeta.seoTitle
  : locale === 'en'
    ? `Free ${themeName} Worksheets for ${gradeName} | LessonCraftStudio`
    : `${themeName} ${worksheetsLabel[locale] || 'Worksheets'} ${gradeName} | LessonCraftStudio`;

// Description: prefer grade-level SEO description, fall back to intro snippet
let description: string;
if (gradeContentMeta?.seoDescription) {
  description = gradeContentMeta.seoDescription;
} else if (gradeContentMeta?.intro) {
  const intro = gradeContentMeta.intro;
  const periodIdx = intro.indexOf('.', 140);
  description = periodIdx > 0 && periodIdx < 200
    ? intro.slice(0, periodIdx + 1)
    : intro.slice(0, 160).trim() + '...';
} else {
  description = locale === 'en'
    ? `Create free printable ${themeName.toLowerCase()}-themed worksheets...`
    : `${themeName} ${worksheetsLabel[locale] || ''} ${gradeName}. ${content.description}`;
}

// Keywords: prefer grade-level keywords, fall back to parent theme keywords
const keywords = gradeContentMeta?.seoKeywords || content.keywords;
```

### 7.4 Migration Strategy

The override fields are optional (`?`), so:

1. **No existing files break** - all 550 content files continue to work unchanged
2. **Gradual rollout** - keyword mapping parts (Parts 6-9) will add `seoTitle`, `seoDescription`, and `seoKeywords` to each theme+grade content block as keywords are assigned
3. **Validation** - the existing `scripts/validate-theme-content.js` can be extended to check that override fields meet character limits when present

### 7.5 Implementation Timeline

| Part | Action |
|------|--------|
| Part 3 (code change) | Add the 3 optional fields to `GradeLearningContent` in `types.ts` |
| Part 3 (code change) | Update `page.tsx` to use override fields with fallback |
| Parts 6-9 (content) | Populate `seoTitle`, `seoDescription`, `seoKeywords` for all 250 EN theme+grade combos |
| Parts 101+ (content) | Populate for all 2,500 non-EN theme+grade combos |

---

## Appendix A: Cannibalization Resolution Map

How each of the 6 cannibalization groups identified in Part 1 is resolved by this framework:

### Group 1: "addition worksheets"

| Page | Old Keyword | New Primary Keyword | Rule Applied |
|------|-------------|---------------------|--------------|
| `/en/apps/addition-worksheets` | addition worksheets | addition worksheet generator with answer keys | Rule 2 (tool-action) |
| `/en/apps/code-addition-worksheets` | addition worksheets | picture math addition worksheet maker | Rule 8 (sibling differentiation) |

### Group 2: "free worksheet" (generic)

| Page | Old Keyword | New Primary Keyword | Rule Applied |
|------|-------------|---------------------|--------------|
| `/en/apps/alphabet-train-worksheets` | free worksheet | alphabet train letter tracing generator | Rule 2 + Rule 7 |
| `/en/apps/big-small-worksheets` | free worksheet | big and small comparison worksheet maker | Rule 2 + Rule 7 |

### Group 3: "coloring worksheets"

| Page | Old Keyword | New Primary Keyword | Rule Applied |
|------|-------------|---------------------|--------------|
| `/en/apps/coloring-worksheets` | coloring worksheets | coloring page generator for kids | Rule 2 (tool-action) |
| `/en/apps/draw-and-color-worksheets` | coloring worksheets | draw and color creative worksheet maker | Rule 8 (sibling differentiation) |

### Group 4: "matching worksheets"

| Page | Old Keyword | New Primary Keyword | Rule Applied |
|------|-------------|---------------------|--------------|
| `/en/apps/matching-worksheets` | matching worksheets | matching worksheet generator with pictures | Rule 2 (tool-action) |
| `/en/apps/category/matching-sorting` | matching worksheets | matching and sorting worksheet tools | Rule 6 (category browse) |

### Group 5: "math worksheets"

| Page | Old Keyword | New Primary Keyword | Rule Applied |
|------|-------------|---------------------|--------------|
| `/en/apps/math-worksheets` | math worksheets | math worksheet generator - custom problems | Rule 2 (tool-action) |
| `/en/apps/category/math` | math worksheets | math worksheet generators for teachers | Rule 6 (category browse) |

### Group 6: "pattern worksheets"

| Page | Old Keyword | New Primary Keyword | Rule Applied |
|------|-------------|---------------------|--------------|
| `/en/apps/pattern-worksheets` | pattern worksheets | pattern recognition worksheet maker | Rule 2 (tool-action) |
| `/en/apps/category/patterns-motor` | pattern worksheets | pattern and motor skills worksheet tools | Rule 6 (category browse) |

---

## Appendix B: Character Count Reference

| Component | Target Range | Includes Brand? |
|-----------|-------------|-----------------|
| Title tag | 50-60 chars | Yes (` \| LessonCraftStudio` = 21 chars) |
| Primary keyword phrase | 29-39 chars | No (title minus brand suffix) |
| Meta description | 150-160 chars | No (brand never in description) |
| Primary keyword in description | Within first 80 chars | N/A |
| H1 heading | 30-50 chars | No |
| URL slug | 20-60 chars | No |

---

## Appendix C: Age-Grade Reference

| Grade ID | Display Name | Age Range | Age Modifier Options |
|----------|-------------|-----------|---------------------|
| preschool | Preschool | 3-4 | ages 3-4, 3 year olds, 4 year olds, pre-K |
| kindergarten | Kindergarten | 5-6 | ages 5-6, 5 year olds, 6 year olds, K, kinder |
| first-grade | First Grade | 6-7 | ages 6-7, 1st grade, grade 1 |
| second-grade | Second Grade | 7-8 | ages 7-8, 2nd grade, grade 2 |
| third-grade | Third Grade | 8-9 | ages 8-9, 3rd grade, grade 3 |

---

*Document created: Part 2 of ONE CLICK A DAY SEO*
*Next: Parts 3-10 will use this framework to map unique keywords to every English page.*
