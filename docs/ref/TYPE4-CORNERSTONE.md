# Page Type 4: Business Cornerstone Guides (12 guides x 11 locales = 132 pages)

> Extracted from REFERENCE.md Section 7.

## Session Instructions
1. Run: `node scripts/check-progress.js`
2. Load: `docs/ref/RULES.md` + this file + `docs/ref/BUSINESS.md`
3. Next items: determined by progress script output
4. Per item: create content file
5. After each file: `node scripts/validate-content.js {path}`
6. End of session: commit

---

## Purpose
Pillar content pages targeting high-volume "how to start a printable business" keywords. These are the authority pages that build topical relevance for the entire domain.

## Route: `/{locale}/start/{localized-slug}`

## Word Count Breakdown (3,500+ words)

| Section | Words |
|---------|-------|
| Hero (guide title, what you'll learn, reading time) | 200 |
| Introduction (problem/opportunity statement) | 300 |
| Main Content (8-12 sections with detailed guidance) | 1,800 |
| Action Steps (numbered checklist) | 300 |
| Tools Recommended (our apps as solutions) | 300 |
| FAQ (6-8 questions + 1 mandatory refund policy Q&A) | 400 |
| Next Steps / Related Guides | 200 |

## All 12 Cornerstone Guides

| # | Guide Title | Slug | Target Keyword |
|---|-------------|------|----------------|
| 1 | The Complete Guide to Starting a Printable Business | complete-guide-printable-business | how to start a printable business |
| 2 | How to Create Professional Worksheets That Sell | create-worksheets-that-sell | how to create worksheets to sell |
| 3 | The Printable Business Blueprint: From Idea to Income | printable-business-blueprint | printable business ideas |
| 4 | Etsy Printable Business Masterclass | etsy-printable-business | sell printables on etsy |
| 5 | Amazon KDP Activity Book Business Guide | amazon-kdp-activity-books | how to sell activity books on amazon |
| 6 | How to Create Worksheets in 11 Languages | create-multilingual-worksheets | multilingual worksheet generator |
| 7 | The Commercial License Guide for Printable Sellers | commercial-license-guide | commercial use printable license |
| 8 | Printable Business Income: Realistic Expectations | printable-business-income | how much can you make selling printables |
| 9 | Essential Tools for Printable Business Owners | tools-for-printable-business | best tools for printable sellers |
| 10 | Marketing Your Printable Business Online | marketing-printable-business | how to market printable worksheets |
| 11 | Scaling from Side Hustle to Full-Time Printable Business | scaling-printable-business | scale printable business |
| 12 | Printable Business Taxes and Legal Basics | printable-business-legal | selling printables tax requirements |

## File Structure
```
frontend/app/[locale]/start/page.tsx             -- Cornerstone hub (new)
frontend/app/[locale]/start/[slug]/page.tsx      -- Individual guide (new)
frontend/config/start-content/
  types.ts
  index.ts
  en/complete-guide-printable-business.ts
  ... (12 per locale x 11 locales)
```
