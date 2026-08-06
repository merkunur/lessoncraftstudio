/**
 * Verify Part 123: Finnish Theme+Grade SEO — Themes 33–36
 * Checks that all 20 grade entries have seoTitle, seoDescription, seoKeywords
 * with correct lengths and format.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = ['pirates', 'robots', 'school', 'seasons'];
const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let total = 0;
let passed = 0;
let failed = 0;
const errors = [];

for (const theme of themes) {
  const filePath = path.join(BASE, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const grade of gradeIds) {
    total++;
    const label = `${theme}/${grade}`;

    // Check seoTitle
    const titleMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoTitle:\\s*'([^']*)'`, 's'));
    if (!titleMatch) {
      errors.push(`${label}: missing seoTitle`);
      failed++;
      continue;
    }
    const title = titleMatch[1];
    if (title.length < 40 || title.length > 65) {
      errors.push(`${label}: seoTitle length ${title.length} (expected 40-65): "${title}"`);
      failed++;
      continue;
    }

    // Check seoDescription
    const descMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoDescription:\\s*'([^']*)'`, 's'));
    if (!descMatch) {
      errors.push(`${label}: missing seoDescription`);
      failed++;
      continue;
    }
    const desc = descMatch[1];
    if (desc.length < 100 || desc.length > 170) {
      errors.push(`${label}: seoDescription length ${desc.length} (expected 100-170): "${desc.substring(0, 60)}..."`);
      failed++;
      continue;
    }

    // Check seoKeywords
    const kwMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoKeywords:\\s*'([^']*)'`, 's'));
    if (!kwMatch) {
      errors.push(`${label}: missing seoKeywords`);
      failed++;
      continue;
    }
    const kw = kwMatch[1];
    const phrases = kw.split(',').map(s => s.trim()).filter(Boolean);
    if (phrases.length !== 5) {
      errors.push(`${label}: seoKeywords has ${phrases.length} phrases (expected 5)`);
      failed++;
      continue;
    }

    passed++;
    console.log(`  OK ${label} — title:${title.length} desc:${desc.length} kw:${phrases.length}`);
  }
}

console.log(`\n--- Results ---`);
console.log(`Total: ${total} | Passed: ${passed} | Failed: ${failed}`);

if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  ERROR: ${e}`));
  process.exit(1);
} else {
  console.log(`\nAll 20 grade entries verified successfully!`);
}
