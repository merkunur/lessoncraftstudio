# Page Type 6: Niche/Theme Idea Pages (45 pages x 11 locales = 495 pages)

> Extracted from REFERENCE.md Section 9.

## Session Instructions
1. Run: `node scripts/check-progress.js`
2. Load: `docs/ref/RULES.md` + this file + `docs/ref/BUSINESS.md`
3. Next items: determined by progress script output
4. Per item: create content file
5. After each file: `node scripts/validate-content.js {path}`
6. End of session: commit

---

## Purpose
Bottom-of-funnel content targeting "[niche] printable business ideas" keywords. Each page explores a specific theme/niche and shows how to build a business around it using our tools.

## Route: `/{locale}/ideas/{localized-slug}`

## Word Count Breakdown (3,100 words)

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

## All 45 Niche/Theme Idea Pages

### Animals & Nature (8)

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

### Seasons & Holidays (10)

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

### Interests & Activities (10)

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

### Educational Focus (10)

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

### Business Models (7)

| # | Page Title | Slug |
|---|-----------|------|
| 39 | Worksheet Subscription Box Business Ideas | subscription-box-printable-ideas |
| 40 | Print-on-Demand Worksheet Business Ideas | print-on-demand-printable-ideas |
| 41 | Digital Download Printable Business Ideas | digital-download-printable-ideas |
| 42 | Physical Printable Product Business Ideas | physical-printable-product-ideas |
| 43 | Printable Party Supply Business Ideas | party-supply-printable-ideas |
| 44 | Custom Worksheet Service Business Ideas | custom-worksheet-service-ideas |
| 45 | Bulk Licensing Printable Business Ideas | bulk-licensing-printable-ideas |

## File Structure
```
frontend/app/[locale]/ideas/page.tsx             -- Ideas hub (new)
frontend/app/[locale]/ideas/[slug]/page.tsx      -- Individual idea page (new)
frontend/config/idea-content/
  types.ts
  index.ts
  en/farm-animals-printable-ideas.ts
  ... (45 per locale x 11 locales)
```
