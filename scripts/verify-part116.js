/**
 * Verify Part 116: Finnish Theme+Grade SEO — Themes 5–8
 * Checks that all 20 grade entries (4 themes × 5 grades) have valid SEO fields.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const themes = ['body', 'camping', 'circus', 'clothing'];
const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let totalChecked = 0;
let totalPassed = 0;
let errors = [];

for (const theme of themes) {
  const filePath = path.join(BASE, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const gradeId of gradeIds) {
    totalChecked++;
    const label = `${theme}/${gradeId}`;

    // Extract seoTitle
    const titleMatch = content.match(new RegExp(`'${gradeId}':\\s*\\{[^}]*?seoTitle:\\s*'([^']*(?:\\\\.[^']*)*)'`, 's'));
    const descMatch = content.match(new RegExp(`'${gradeId}':\\s*\\{[^}]*?seoDescription:\\s*'([^']*(?:\\\\.[^']*)*)'`, 's'));
    const kwMatch = content.match(new RegExp(`'${gradeId}':\\s*\\{[^}]*?seoKeywords:\\s*'([^']*(?:\\\\.[^']*)*)'`, 's'));

    if (!titleMatch) {
      errors.push(`${label}: MISSING seoTitle`);
      continue;
    }
    if (!descMatch) {
      errors.push(`${label}: MISSING seoDescription`);
      continue;
    }
    if (!kwMatch) {
      errors.push(`${label}: MISSING seoKeywords`);
      continue;
    }

    const title = titleMatch[1];
    const desc = descMatch[1];
    const kw = kwMatch[1];

    // Check seoTitle length (40-65 chars)
    if (title.length < 40 || title.length > 65) {
      errors.push(`${label}: seoTitle length ${title.length} (expected 40-65): "${title}"`);
    }

    // Check seoDescription length (130-170 chars)
    if (desc.length < 130 || desc.length > 170) {
      errors.push(`${label}: seoDescription length ${desc.length} (expected 130-170): "${desc.substring(0, 60)}..."`);
    }

    // Check seoKeywords has exactly 5 phrases (comma-separated)
    const phrases = kw.split(',').map(p => p.trim()).filter(p => p.length > 0);
    if (phrases.length !== 5) {
      errors.push(`${label}: seoKeywords has ${phrases.length} phrases (expected 5)`);
    }

    if (title.length >= 40 && title.length <= 65 &&
        desc.length >= 130 && desc.length <= 170 &&
        phrases.length === 5) {
      totalPassed++;
      console.log(`  OK ${label} — title:${title.length} desc:${desc.length} kw:${phrases.length} phrases`);
    }
  }
}

console.log(`\n--- Results ---`);
console.log(`Checked: ${totalChecked}`);
console.log(`Passed:  ${totalPassed}`);
console.log(`Failed:  ${errors.length}`);

if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  ✗ ${e}`));
  process.exit(1);
} else {
  console.log(`\nAll 20 entries verified successfully!`);
}
