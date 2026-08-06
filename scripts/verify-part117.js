/**
 * Verify Part 117: Finnish Theme+Grade SEO — Themes 9–12
 * Checks seoTitle, seoDescription, seoKeywords in gradeContent
 * for colors, construction, cooking, dinosaurs.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const themes = ['colors', 'construction', 'cooking', 'dinosaurs'];
const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let totalChecked = 0;
let totalErrors = 0;

for (const theme of themes) {
  const filePath = path.join(BASE, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const grade of gradeIds) {
    // Extract the grade block using regex
    const gradePattern = new RegExp(`'${grade}':\\s*\\{([\\s\\S]*?)(?=\\n\\s{4}'(?:preschool|kindergarten|first-grade|second-grade|third-grade)':|\\n\\s{2}\\},)`, 'm');
    const match = content.match(gradePattern);

    if (!match) {
      console.error(`FAIL: ${theme}/${grade} - grade block not found`);
      totalErrors++;
      continue;
    }

    const block = match[1];

    // Check seoTitle
    const titleMatch = block.match(/seoTitle:\s*'([^']*(?:\\'[^']*)*)'/);
    if (!titleMatch) {
      console.error(`FAIL: ${theme}/${grade} - seoTitle not found`);
      totalErrors++;
    } else {
      const title = titleMatch[1].replace(/\\'/g, "'");
      if (title.length < 40 || title.length > 65) {
        console.error(`FAIL: ${theme}/${grade} - seoTitle length ${title.length} (expected 40-65): "${title}"`);
        totalErrors++;
      } else {
        console.log(`  OK: ${theme}/${grade} seoTitle (${title.length} chars)`);
      }
    }

    // Check seoDescription
    const descMatch = block.match(/seoDescription:\s*'([^']*(?:\\'[^']*)*)'/);
    if (!descMatch) {
      console.error(`FAIL: ${theme}/${grade} - seoDescription not found`);
      totalErrors++;
    } else {
      const desc = descMatch[1].replace(/\\'/g, "'");
      if (desc.length < 130 || desc.length > 170) {
        console.error(`FAIL: ${theme}/${grade} - seoDescription length ${desc.length} (expected 130-170): "${desc}"`);
        totalErrors++;
      } else {
        console.log(`  OK: ${theme}/${grade} seoDescription (${desc.length} chars)`);
      }
    }

    // Check seoKeywords
    const kwMatch = block.match(/seoKeywords:\s*'([^']*(?:\\'[^']*)*)'/);
    if (!kwMatch) {
      console.error(`FAIL: ${theme}/${grade} - seoKeywords not found`);
      totalErrors++;
    } else {
      const kw = kwMatch[1].replace(/\\'/g, "'");
      const phrases = kw.split(',').map(p => p.trim()).filter(Boolean);
      if (phrases.length !== 5) {
        console.error(`FAIL: ${theme}/${grade} - seoKeywords has ${phrases.length} phrases (expected 5)`);
        totalErrors++;
      } else {
        console.log(`  OK: ${theme}/${grade} seoKeywords (${phrases.length} phrases)`);
      }
    }

    totalChecked++;
  }
}

console.log(`\n=== Summary ===`);
console.log(`Checked: ${totalChecked} grade entries`);
console.log(`Errors: ${totalErrors}`);
if (totalErrors === 0 && totalChecked === 20) {
  console.log('ALL 20 ENTRIES VERIFIED SUCCESSFULLY');
} else if (totalErrors > 0) {
  console.log('SOME CHECKS FAILED - review above');
  process.exit(1);
} else {
  console.log(`WARNING: Expected 20 entries, got ${totalChecked}`);
  process.exit(1);
}
