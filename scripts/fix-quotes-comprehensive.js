/**
 * Comprehensive quote fix for all content files.
 *
 * 1. Convert curly single quotes (U+2018, U+2019) to escaped straight: \'
 * 2. Leave German/typographic double quotes (U+201E „, U+201C ") as-is (they're fine in single-quoted TS strings)
 * 3. Convert curly double quotes (U+201C, U+201D) to escaped straight: \"
 *    (Only when they appear inside single-quoted strings; leave them alone in double-quoted strings)
 *
 * Actually, simplest correct approach:
 * - U+2019 (right single quote / curly apostrophe) INSIDE single-quoted strings terminates the string on SWC
 * - Solution: Replace U+2019 with \' (escaped straight apostrophe) everywhere in .ts files
 * - This preserves the string delimiter ' and the content apostrophe \'
 * - German „" (U+201E, U+201C) are fine inside single-quoted strings since they're not '
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

    const content = fs.readFileSync(fp, 'utf8');

    // Replace U+2019 (RIGHT SINGLE QUOTATION MARK) with \' (escaped straight apostrophe)
    // This is the ONLY character that breaks single-quoted TS strings on SWC
    // U+2018 (LEFT SINGLE QUOTATION MARK) also breaks strings
    const fixed = content
      .replace(/\u2019/g, "\\'")  // Right single quote → escaped apostrophe
      .replace(/\u2018/g, "\\'"); // Left single quote → escaped apostrophe

    if (fixed !== content) {
      const count = (content.match(/[\u2018\u2019]/g) || []).length;
      fs.writeFileSync(fp, fixed, 'utf8');
      totalFiles++;
      totalFixes += count;
    }
  }
}

processDir('frontend/config');
console.log(`Fixed ${totalFixes} curly quotes in ${totalFiles} files`);
