# Worksheet Generator Apps - Naming Reference

**Last Updated:** 2025-09-30

## Purpose
This document clarifies the distinction between similar-sounding worksheet generator apps to avoid confusion.

---

## Math Puzzle vs Grid Match

### Math Puzzle
- **File Location:** `frontend/public/worksheet-generators/math puzzle.html`
- **Title:** "Math Puzzle Worksheet Generator"
- **Description:** Creates math arithmetic puzzles with addition/subtraction operations and images that represent the answers
- **Key Features:**
  - Addition and subtraction operations
  - Image-based answer matching
  - Configurable number ranges
  - Professional translations available in `/translations/math-puzzle/`
- **Translation Keys Prefix:** `mathpuzzle.*`, `operation.*`

### Grid Match
- **File Location:** `frontend/public/worksheet-generators/grid match.html`
- **Title:** "Grid-Match Worksheet Generator"
- **Description:** Creates visual matching puzzles where students match grid pieces to complete an image
- **Key Features:**
  - Image slicing into grid pieces
  - Visual matching puzzle
  - Configurable grid sizes
  - Professional translations available in `/translations/grid-match/`
- **Translation Keys Prefix:** `gridmatch.*`

---

## Important Notes

1. **These are TWO SEPARATE APPS** - Despite similar names, they serve completely different purposes
2. **The repository had an error** - The `math puzzle.html` file was incorrectly labeled as "Grid-Match Puzzle" in the title tag (fixed on 2025-09-30)
3. **Server vs Static** - There are also server-rendered versions at `localhost:3000/[locale]/apps/[app-name]` which are separate from these static HTML files

---

## Translation Files

### Math Puzzle Translations
- Located in: `translations/math-puzzle/`
- Languages: de, fr, es, it, pt, nl, sv, da, no, fi (10 languages)
- 204 translation keys per language

### Grid Match Translations
- Located in: `translations/grid-match/`
- Integrated via: `js/translations-grid-match.js`

---

## Quick Identification

If you need to identify which app you're looking at:

**Math Puzzle indicators:**
- Contains: `operation.addition`, `operation.subtraction`, `operation.both`
- Has math equations in generated output
- Uses translation key: `mathpuzzle.*`

**Grid Match indicators:**
- Contains: grid slicing/cutting logic
- Visual image matching puzzle
- Uses translation key: `gridmatch.*`