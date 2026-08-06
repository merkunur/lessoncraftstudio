/**
 * Part 115 Verification: Finnish Theme+Grade SEO — Themes 1–4
 * Validates seoTitle, seoDescription, seoKeywords in gradeContent
 * for alphabet, animals, birds, birthday Finnish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const themes = ['alphabet', 'animals', 'birds', 'birthday'];
const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let totalChecked = 0;
let totalErrors = 0;

for (const theme of themes) {
  const filePath = path.join(BASE, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const gradeId of gradeIds) {
    totalChecked++;
    const label = `${theme}/${gradeId}`;

    // Extract grade block using regex
    const gradePattern = new RegExp(`'${gradeId}':\\s*\\{([\\s\\S]*?)(?=\\n    '(?:preschool|kindergarten|first-grade|second-grade|third-grade)':|\\n  \\},)`);
    const match = content.match(gradePattern);

    if (!match) {
      console.log(`  FAIL ${label}: grade block not found`);
      totalErrors++;
      continue;
    }

    const block = match[1];

    // Check seoTitle
    const titleMatch = block.match(/seoTitle:\s*'([^']+)'/);
    if (!titleMatch) {
      console.log(`  FAIL ${label}: seoTitle missing`);
      totalErrors++;
    } else {
      const title = titleMatch[1];
      const len = title.length;
      if (len < 40 || len > 60) {
        console.log(`  WARN ${label}: seoTitle length ${len} (expected 40-60): "${title}"`);
      } else {
        console.log(`  OK   ${label}: seoTitle (${len} chars)`);
      }
    }

    // Check seoDescription
    const descMatch = block.match(/seoDescription:\s*'([^']+)'/);
    if (!descMatch) {
      console.log(`  FAIL ${label}: seoDescription missing`);
      totalErrors++;
    } else {
      const desc = descMatch[1];
      const len = desc.length;
      if (len < 130 || len > 160) {
        console.log(`  WARN ${label}: seoDescription length ${len} (expected 130-160): "${desc.substring(0, 60)}..."`);
      } else {
        console.log(`  OK   ${label}: seoDescription (${len} chars)`);
      }
    }

    // Check seoKeywords
    const kwMatch = block.match(/seoKeywords:\s*'([^']+)'/);
    if (!kwMatch) {
      console.log(`  FAIL ${label}: seoKeywords missing`);
      totalErrors++;
    } else {
      const kw = kwMatch[1];
      const phrases = kw.split(',').map(p => p.trim()).filter(p => p.length > 0);
      if (phrases.length !== 5) {
        console.log(`  WARN ${label}: seoKeywords has ${phrases.length} phrases (expected 5)`);
      } else {
        console.log(`  OK   ${label}: seoKeywords (${phrases.length} phrases)`);
      }
    }
  }
}

console.log(`\n--- Summary ---`);
console.log(`Checked: ${totalChecked} grade entries (4 themes x 5 grades)`);
console.log(`Errors: ${totalErrors}`);
if (totalErrors === 0) {
  console.log(`\nAll ${totalChecked} entries have valid SEO fields!`);
} else {
  console.log(`\nFix ${totalErrors} errors above.`);
  process.exit(1);
}
