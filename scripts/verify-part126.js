#!/usr/bin/env node
/**
 * Verify Part 126: Finnish Theme+Grade SEO — Themes 45–48
 * Checks all 20 grade entries have valid seoTitle, seoDescription, seoKeywords
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = [
  { dir: 'travel', name: 'Matkailu' },
  { dir: 'vegetables', name: 'Vihannekset' },
  { dir: 'weather', name: 'Sää' },
  { dir: 'winter', name: 'Talvi' },
];

const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let pass = 0;
let fail = 0;
const errors = [];

for (const theme of themes) {
  const filePath = path.join(BASE, theme.dir, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const grade of grades) {
    const label = `${theme.dir}/${grade}`;

    // Extract seoTitle
    const titleMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoTitle:\\s*'([^']*)'`));
    // Extract seoDescription
    const descMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoDescription:\\s*'([^']*)'`));
    // Extract seoKeywords
    const kwMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoKeywords:\\s*'([^']*)'`));

    if (!titleMatch) {
      errors.push(`${label}: MISSING seoTitle`);
      fail++;
      continue;
    }
    if (!descMatch) {
      errors.push(`${label}: MISSING seoDescription`);
      fail++;
      continue;
    }
    if (!kwMatch) {
      errors.push(`${label}: MISSING seoKeywords`);
      fail++;
      continue;
    }

    const title = titleMatch[1];
    const desc = descMatch[1];
    const kw = kwMatch[1];

    // Check title length (40–65 chars)
    if (title.length < 40 || title.length > 65) {
      errors.push(`${label}: seoTitle length ${title.length} (expected 40–65): "${title}"`);
      fail++;
    } else {
      pass++;
    }

    // Check description length (100–170 chars)
    if (desc.length < 100 || desc.length > 170) {
      errors.push(`${label}: seoDescription length ${desc.length} (expected 100–170): "${desc}"`);
      fail++;
    } else {
      pass++;
    }

    // Check keywords: exactly 5 long-tail phrases (comma-separated)
    const phrases = kw.split(',').map(s => s.trim()).filter(Boolean);
    if (phrases.length !== 5) {
      errors.push(`${label}: seoKeywords has ${phrases.length} phrases (expected 5)`);
      fail++;
    } else {
      pass++;
    }

    // Check title ends with | LCS
    if (!title.endsWith('| LCS')) {
      errors.push(`${label}: seoTitle doesn't end with "| LCS"`);
      fail++;
    } else {
      pass++;
    }
  }
}

console.log(`\n=== Part 126 Verification ===`);
console.log(`Themes: ${themes.map(t => t.dir).join(', ')}`);
console.log(`Grades: ${grades.length} per theme`);
console.log(`Total entries: ${themes.length * grades.length}`);
console.log(`\nChecks passed: ${pass}`);
console.log(`Checks failed: ${fail}`);

if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  ✗ ${e}`));
  process.exit(1);
} else {
  console.log(`\n✓ All 20 grade entries verified successfully!`);
}
