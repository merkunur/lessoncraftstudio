# Page Type 2: Free Tool Landing Pages (33 tools x 11 locales = 363 pages)

> Extracted from REFERENCE.md Section 5.

## Session Instructions
1. Run: `node scripts/check-progress.js`
2. Load: `docs/ref/RULES.md` + this file + `docs/ref/BUSINESS.md`
3. Next items: determined by progress script output
4. Per item: read `REFERENCE APPS/{app}.html` → create content file
5. After each file: `node scripts/validate-content.js {path}`
6. End of session: commit

---

## Purpose
SEO magnets targeting "free [type] worksheet generator" keywords. Each page embeds the actual free app (via iframe) surrounded by substantial content. The free tool with watermark IS the lead magnet — it demonstrates value and drives paid conversions.

## Route: `/{locale}/tools/{localized-slug}`

## Word Count Breakdown (3,200 words)

| Section | Words |
|---------|-------|
| Hero (tool name, what it creates, instant-access CTA) | 200 |
| Embedded Tool (iframe + caption) | 50 |
| What You Can Create (5-6 product examples with descriptions) | 600 |
| Step-by-Step Tutorial (8-10 steps with screenshots descriptions) | 700 |
| Business Ideas (5-6 money-making scenarios with this tool) | 600 |
| Pro Tips (5-7 expert tips for best results) | 400 |
| Related Tools (4-5 complementary generators) | 200 |
| FAQ (8-10 tool-specific questions + 1 mandatory refund policy Q&A) | 450 |

## All 33 Tool Pages

| # | Tool Page | URL Slug (English) | Target Keyword |
|---|-----------|-------------------|----------------|
| 1 | Free Addition Worksheet Maker | free-addition-worksheet-maker | free addition worksheet generator |
| 2 | Free Subtraction Worksheet Maker | free-subtraction-worksheet-maker | free subtraction worksheet generator |
| 3 | Free Code Addition Worksheet Maker | free-code-addition-worksheet-maker | free code breaker math worksheet |
| 4 | Free More or Less Worksheet Maker | free-more-or-less-worksheet-maker | free greater than less than worksheets |
| 5 | Free Math Puzzle Maker | free-math-puzzle-maker | free math puzzle worksheet generator |
| 6 | Free Math Worksheet Maker | free-math-worksheet-maker | free math worksheet generator |
| 7 | Free Alphabet Train Worksheet Maker | free-alphabet-train-maker | free alphabet worksheet generator |
| 8 | Free Prepositions Worksheet Maker | free-prepositions-worksheet-maker | free prepositions worksheet generator |
| 9 | Free Word Guess Worksheet Maker | free-word-guess-maker | free hangman worksheet generator |
| 10 | Free Word Scramble Maker | free-word-scramble-maker | free word scramble generator |
| 11 | Free Word Search Maker | free-word-search-maker | free word search generator |
| 12 | Free Cryptogram Maker | free-cryptogram-maker | free cryptogram puzzle generator |
| 13 | Free Handwriting Worksheet Maker | free-handwriting-worksheet-maker | free handwriting practice generator |
| 14 | Free Big & Small Worksheet Maker | free-big-and-small-worksheet-maker | free size comparison worksheet |
| 15 | Free Pattern Train Maker | free-pattern-train-maker | free pattern worksheet generator |
| 16 | Free Pattern Worksheet Maker | free-pattern-worksheet-maker | free pattern recognition worksheet |
| 17 | Free Draw & Color Worksheet Maker | free-draw-and-color-maker | free drawing worksheet generator |
| 18 | Free Drawing Lines Worksheet Maker | free-drawing-lines-maker | free line tracing worksheet |
| 19 | Free Coloring Page Maker | free-coloring-page-maker | free coloring page generator |
| 20 | Free Chart Count Worksheet Maker | free-chart-count-maker | free picture graph worksheet |
| 21 | Free Matching Worksheet Maker | free-matching-worksheet-maker | free matching worksheet generator |
| 22 | Free Grid Match Maker | free-grid-match-maker | free grid matching worksheet |
| 23 | Free Shadow Match Maker | free-shadow-match-maker | free shadow matching worksheet |
| 24 | Free Bingo Card Maker | free-bingo-card-maker | free picture bingo card generator |
| 25 | Free Picture Sort Maker | free-picture-sort-maker | free sorting worksheet generator |
| 26 | Free Missing Pieces Puzzle Maker | free-missing-pieces-maker | free jigsaw puzzle worksheet |
| 27 | Free Odd One Out Maker | free-odd-one-out-maker | free odd one out worksheet |
| 28 | Free Picture Sudoku Maker | free-sudoku-maker | free picture sudoku for kids |
| 29 | Free Picture Path Maze Maker | free-picture-path-maker | free maze worksheet generator |
| 30 | Free Find & Count Maker | free-find-and-count-maker | free I spy worksheet generator |
| 31 | Free Hidden Object Maker | free-hidden-object-maker | free hidden object worksheet |
| 32 | Free Crossword Puzzle Maker | free-crossword-maker | free picture crossword generator |
| 33 | Free Treasure Hunt Maker | free-treasure-hunt-maker | free treasure hunt worksheet |

## File Structure
```
frontend/app/[locale]/tools/[tool]/page.tsx    -- Template (new)
frontend/config/tool-content/
  types.ts
  index.ts
  en/free-addition-worksheet-maker.ts
  en/free-subtraction-worksheet-maker.ts
  ... (33 per locale x 11 locales)
```
