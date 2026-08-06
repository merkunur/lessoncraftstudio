#!/usr/bin/env node
/**
 * Verify Part 124: Finnish Theme+Grade SEO — shapes, space, sports, spring
 * Checks all 20 grade entries have valid seoTitle, seoDescription, seoKeywords.
 */
const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const THEMES = ['shapes', 'space', 'sports', 'spring'];
const GRADES = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let pass = 0;
let fail = 0;
const errors = [];

for (const theme of THEMES) {
  const filePath = path.join(THEMES_DIR, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const grade of GRADES) {
    const label = `${theme}/${grade}`;

    // Extract seoTitle
    const titleMatch = content.match(new RegExp(`'${grade}'[^}]*?seoTitle:\\s*'([^']*)'`,'s'));
    // Extract seoDescription
    const descMatch = content.match(new RegExp(`'${grade}'[^}]*?seoDescription:\\s*'([^']*)'`,'s'));
    // Extract seoKeywords
    const kwMatch = content.match(new RegExp(`'${grade}'[^}]*?seoKeywords:\\s*'([^']*)'`,'s'));

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

    // Title length: 40-65 chars
    if (title.length < 40 || title.length > 65) {
      errors.push(`${label}: seoTitle length ${title.length} (want 40-65): "${title}"`);
      fail++;
    } else {
      pass++;
    }

    // Description length: 100-170 chars
    if (desc.length < 100 || desc.length > 170) {
      errors.push(`${label}: seoDescription length ${desc.length} (want 100-170): "${desc}"`);
      fail++;
    } else {
      pass++;
    }

    // Keywords: exactly 5 comma-separated phrases
    const phrases = kw.split(',').map(p => p.trim()).filter(p => p.length > 0);
    if (phrases.length !== 5) {
      errors.push(`${label}: seoKeywords has ${phrases.length} phrases (want 5)`);
      fail++;
    } else {
      pass++;
    }
  }
}

console.log(`\nPart 124 Verification: ${THEMES.length} themes x ${GRADES.length} grades = ${THEMES.length * GRADES.length} entries\n`);
console.log(`PASS: ${pass}`);
console.log(`FAIL: ${fail}`);

if (errors.length > 0) {
  console.log('\nErrors:');
  errors.forEach(e => console.log(`  - ${e}`));
}

console.log(`\nResult: ${fail === 0 ? 'ALL PASS' : 'SOME FAILURES'}`);
process.exit(fail > 0 ? 1 : 0);
