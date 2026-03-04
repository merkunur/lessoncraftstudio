# Page Type 3: Bundle Sales Pages (6 bundles x 11 locales = 66 pages)

> Extracted from REFERENCE.md Section 6.

## Session Instructions
1. Run: `node scripts/check-progress.js`
2. Load: `docs/ref/RULES.md` + this file + `docs/ref/BUSINESS.md`
3. Next items: determined by progress script output
4. Per item: create content file
5. After each file: `node scripts/validate-content.js {path}`
6. End of session: commit

---

## Purpose
Dedicated sales pages for 6 category bundles. Each showcases all apps in the category, demonstrates value of the bundle over individual purchases, and drives conversions.

## Route: `/{locale}/bundles/{localized-slug}`

## Word Count Breakdown (3,300 words)

| Section | Words |
|---------|-------|
| Hero (bundle name, value proposition, CTA) | 250 |
| What's Included (list of apps with 100-word summaries each) | 700 |
| Bundle Benefits (6-8 benefits of buying the bundle) | 500 |
| Business Use Cases (5-6 scenarios using multiple apps together) | 600 |
| Feature Comparison (Commercial Pack vs Full Access) | 300 |
| Who Is This For (4 audience segments) | 300 |
| FAQ (8-10 bundle-specific questions + 1 mandatory refund policy Q&A) | 500 |
| Social Proof / Trust Signals | 150 |

## All 6 Bundle Pages

| # | Bundle | Slug (English) | Apps Included | App Count |
|---|--------|---------------|---------------|-----------|
| 1 | Math Mastery Bundle | math-mastery-bundle | Addition, Subtraction, Code Addition, More or Less, Math Puzzle, Math Worksheet | 6 |
| 2 | Literacy & Language Bundle | literacy-language-bundle | Alphabet Train, Prepositions, Word Guess, Word Scramble, Word Search, Cryptogram, Writing | 7 |
| 3 | Visual Learning Bundle | visual-learning-bundle | Big & Small, Pattern Train, Pattern Worksheet, Draw & Color, Drawing Lines, Coloring, Chart Count | 7 |
| 4 | Matching & Sorting Bundle | matching-sorting-bundle | Matching, Grid Match, Shadow Match, Bingo, Picture Sort | 5 |
| 5 | Puzzles & Logic Bundle | puzzles-logic-bundle | Missing Pieces, Odd One Out, Sudoku, Picture Path | 4 |
| 6 | Search & Find Bundle | search-find-bundle | Find & Count, Find Objects, Crossword, Treasure Hunt | 4 |

## File Structure
```
frontend/app/[locale]/bundles/page.tsx           -- Bundles listing (new)
frontend/app/[locale]/bundles/[bundle]/page.tsx  -- Bundle detail (new)
frontend/config/bundle-content/
  types.ts
  index.ts
  en/math-mastery-bundle.ts
  ... (6 per locale x 11 locales)
```
