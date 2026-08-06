/**
 * Verify Part 122: Finnish Theme+Grade SEO — Themes 29–32
 * Checks that all 20 grade entries have seoTitle, seoDescription, seoKeywords
 * with correct lengths and keyword counts.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = ['nature', 'numbers', 'ocean', 'pets'];
const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let passed = 0;
let failed = 0;
const errors = [];

for (const theme of themes) {
  const filePath = path.join(BASE, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const grade of gradeIds) {
    const label = `${theme}/${grade}`;

    // Extract seoTitle
    const titleMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoTitle:\\s*'([^']*(?:\\\\.[^']*)*)'`));
    // Extract seoDescription
    const descMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoDescription:\\s*'([^']*(?:\\\\.[^']*)*)'`));
    // Extract seoKeywords
    const kwMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoKeywords:\\s*'([^']*(?:\\\\.[^']*)*)'`));

    if (!titleMatch) {
      errors.push(`${label}: MISSING seoTitle`);
      failed++;
      continue;
    }
    if (!descMatch) {
      errors.push(`${label}: MISSING seoDescription`);
      failed++;
      continue;
    }
    if (!kwMatch) {
      errors.push(`${label}: MISSING seoKeywords`);
      failed++;
      continue;
    }

    const title = titleMatch[1];
    const desc = descMatch[1];
    const kw = kwMatch[1];

    // Validate title length (40–65 chars)
    if (title.length < 40 || title.length > 65) {
      errors.push(`${label}: seoTitle length ${title.length} (expected 40–65): "${title}"`);
      failed++;
    } else {
      passed++;
    }

    // Validate description length (100–170 chars)
    if (desc.length < 100 || desc.length > 170) {
      errors.push(`${label}: seoDescription length ${desc.length} (expected 100–170): "${desc.substring(0, 50)}..."`);
      failed++;
    } else {
      passed++;
    }

    // Validate keywords: exactly 5 long-tail phrases (comma-separated)
    const phrases = kw.split(',').map(p => p.trim()).filter(p => p.length > 0);
    if (phrases.length !== 5) {
      errors.push(`${label}: seoKeywords has ${phrases.length} phrases (expected 5)`);
      failed++;
    } else {
      passed++;
    }
  }
}

console.log(`\n=== Part 122 Verification ===`);
console.log(`Themes: ${themes.join(', ')}`);
console.log(`Grades: ${gradeIds.length} per theme`);
console.log(`Total entries: ${themes.length * gradeIds.length}`);
console.log(`Checks passed: ${passed}`);
console.log(`Checks failed: ${failed}`);

if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  ✗ ${e}`));
  process.exit(1);
} else {
  console.log(`\n✓ All 20 grade entries verified successfully!`);
}
