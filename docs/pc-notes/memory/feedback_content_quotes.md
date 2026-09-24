---
name: Content String Quote Rules
description: Critical rules for apostrophes and quotes in TypeScript content files — SWC build breaks from curly quotes and unescaped apostrophes
type: feedback
---

## Content String Quote/Apostrophe Rules (ABSOLUTE — BUILD BREAKS WITHOUT THESE)

The SWC TypeScript compiler used by Next.js on the production server rejects non-ASCII quote characters inside single-quoted strings. This caused 15+ failed deploy attempts in March 2026.

### Rules for writing content in .ts files:

1. **NEVER use curly/smart quotes as string delimiters.** Only use straight `'` (U+0027), `"` (U+0022), or backtick `` ` `` (U+0060).

2. **Escape apostrophes inside single-quoted strings.** `'Valentine\'s Day'` not `'Valentine's Day'`. This applies to ALL languages:
   - English: `don\'t`, `it\'s`, `Valentine\'s`, `buyer\'s`
   - French: `d\'addition`, `l\'email`, `l\'écriture`, `n\'offrons`
   - Italian: `dell\'utente`, `l\'app`, `nell\'immagine`
   - German: typically uses `„"` for quotes — escape as `\"im\"` inside single-quoted strings

3. **NEVER use U+2018 `'` or U+2019 `'` (curly single quotes) anywhere in .ts files.** SWC treats them as string terminators. Replace with escaped straight: `\'`

4. **NEVER use U+201E `„`, U+201C `"`, U+201D `"` inside single-quoted strings.** Replace with `\"`

5. **Watch for end-of-word possessives:** `buyers' reviews` → `buyers reviews` or `buyers\' reviews`. The `word' space` pattern breaks strings.

6. **Always close strings.** Unterminated strings (missing closing `'`) are the second most common build failure.

### Fix scripts (run from project root):
- `node scripts/fix-all-quotes-final.js` — character-level parser for curly quotes
- `node scripts/fix-content-only.js` — escape word-internal apostrophes in content dirs only
- `node scripts/fix-word-space-apostrophe.js` — escape `word' space` patterns
- `node scripts/brute-escape-apostrophes.js` — brute-force `letter'letter` escaping
- `node scripts/find-broken-quotes.js` — detect lines with odd unescaped quote counts

### After writing ANY content file:
Run `node scripts/find-broken-quotes.js` to check for broken strings before committing.

**Why:** The agents that wrote the seller-focused content used curly quotes and French/Italian contractions with straight apostrophes, which broke the SWC build. 15 iterative fix-deploy cycles were needed to resolve this.

**How to apply:** Before committing ANY content file changes, verify no unescaped apostrophes exist inside single-quoted strings. Prefer double-quoted strings for content that contains apostrophes, or use escaped `\'`.
