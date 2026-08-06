/**
 * Fix files where U+2018/U+2019 (curly single quotes) are used as
 * TypeScript string delimiters. These must be U+0027 (straight apostrophe).
 *
 * Strategy:
 * - Replace ALL U+2018 (left curly) with U+0027 (straight) — these are always delimiters
 * - Replace U+2019 (right curly) with U+0027 ONLY at string-closing positions
 *   (followed by , ; ) } ] \n or at end of line)
 * - Replace U+2019 inside strings with \' (escaped straight apostrophe)
 */
const fs = require('fs');
const path = require('path');

let totalFiles = 0;
let totalFixes = 0;

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { processDir(fp); continue; }
    if (!e.name.endsWith('.ts')) continue;

    let content = fs.readFileSync(fp, 'utf8');
    const original = content;

    // Step 1: Replace U+2018 (LEFT SINGLE QUOTATION MARK) → U+0027
    // These are ALWAYS string openers — never valid inside strings
    content = content.replace(/\u2018/g, "'");

    // Step 2: Handle U+2019 (RIGHT SINGLE QUOTATION MARK)
    // These can be either string closers OR apostrophes inside strings
    // Heuristic: if followed by , ; ) } ] \n space+keyword, it's a closer → replace with '
    // Otherwise it's an internal apostrophe → replace with \'
    let result = '';
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '\u2019') {
        // Look at next character to determine if this is a closer or apostrophe
        const next = i + 1 < content.length ? content[i + 1] : '\n';

        if (/[,;)}\]\n\r]/.test(next)) {
          // String closer position
          result += "'";
        } else if (next === ' ') {
          // Could be closer (before next property) or apostrophe (Kids' Activities)
          // Look ahead more: if next non-space char is }, ], or a keyword, it's a closer
          let k = i + 1;
          while (k < content.length && content[k] === ' ') k++;
          const afterSpaces = k < content.length ? content[k] : '\n';
          if (/[})\]\n]/.test(afterSpaces) || /[+]/.test(afterSpaces)) {
            result += "'";
          } else {
            // Internal apostrophe
            result += "\\'";
            totalFixes++;
          }
        } else if (/[a-zA-ZÀ-ÿ]/.test(next)) {
          // Apostrophe before a letter (e.g., equation's, l'écriture)
          result += "\\'";
          totalFixes++;
        } else {
          // Default: treat as closer
          result += "'";
        }
      } else {
        result += content[i];
      }
    }

    if (result !== original) {
      fs.writeFileSync(fp, result, 'utf8');
      totalFiles++;
    }
  }
}

processDir('frontend/config');
console.log(`Fixed ${totalFiles} files, ${totalFixes} internal apostrophes escaped`);
