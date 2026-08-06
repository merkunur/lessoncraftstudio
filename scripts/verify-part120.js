/**
 * Part 120 Verification: Finnish Theme+Grade SEO — Themes 21–24
 * Validates seoTitle, seoDescription, seoKeywords for furniture, garden, halloween, holidays
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const themes = ['furniture', 'garden', 'halloween', 'holidays'];
const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let totalChecked = 0;
let totalPassed = 0;
let errors = [];

for (const theme of themes) {
  const filePath = path.join(BASE, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const grade of gradeIds) {
    totalChecked++;
    const label = `${theme}/${grade}`;

    // Extract seoTitle
    const titleMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoTitle:\\s*'([^']*(?:\\\\'[^']*)*)'`, 's'));
    const descMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoDescription:\\s*'([^']*(?:\\\\'[^']*)*)'`, 's'));
    const kwMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoKeywords:\\s*'([^']*(?:\\\\'[^']*)*)'`, 's'));

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

    // Check seoDescription length (100-170 chars)
    if (desc.length < 100 || desc.length > 170) {
      errors.push(`${label}: seoDescription length ${desc.length} (expected 100-170): "${desc.substring(0, 60)}..."`);
    }

    // Check seoKeywords has exactly 5 long-tail phrases (comma-separated)
    const phrases = kw.split(',').map(p => p.trim()).filter(p => p.length > 0);
    if (phrases.length !== 5) {
      errors.push(`${label}: seoKeywords has ${phrases.length} phrases (expected 5)`);
    }

    // Check ends with LCS
    if (!title.endsWith('| LCS')) {
      errors.push(`${label}: seoTitle doesn't end with "| LCS"`);
    }

    if (errors.length === 0 || errors[errors.length - 1].indexOf(label) === -1) {
      totalPassed++;
      console.log(`  \u2713 ${label}: OK (title=${title.length}ch, desc=${desc.length}ch, kw=${phrases.length} phrases)`);
    }
  }
}

console.log(`\n--- Summary ---`);
console.log(`Checked: ${totalChecked}`);
console.log(`Passed: ${totalPassed}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('\nERRORS:');
  errors.forEach(e => console.log(`  \u2717 ${e}`));
  process.exit(1);
} else {
  console.log('\nAll 20 grade entries validated successfully!');
}
