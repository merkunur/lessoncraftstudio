#!/usr/bin/env node
/**
 * Verify Part 127: Finnish Theme+Grade SEO — Themes 49–50 (FINAL BATCH)
 * xmas, zoo — 2 themes × 5 grades = 10 entries
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = [
  { dir: 'xmas', name: 'Joulu' },
  { dir: 'zoo', name: 'El\u00e4intarha' },
];

const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
const gradeLabels = {
  'preschool': 'Esikoulu',
  'kindergarten': 'Esiopetus',
  'first-grade': '1. Luokka',
  'second-grade': '2. Luokka',
  'third-grade': '3. Luokka',
};

let pass = 0;
let fail = 0;
const errors = [];

function check(condition, msg) {
  if (condition) {
    pass++;
  } else {
    fail++;
    errors.push(msg);
  }
}

for (const theme of themes) {
  const filePath = path.join(BASE, theme.dir, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const grade of grades) {
    const label = `${theme.name} / ${gradeLabels[grade]}`;

    // Extract seoTitle
    const titleRe = new RegExp(`'${grade}':\\s*\\{[^}]*?seoTitle:\\s*'([^']*)'`, 's');
    const titleMatch = content.match(titleRe);
    check(titleMatch, `${label}: missing seoTitle`);

    if (titleMatch) {
      const title = titleMatch[1];
      check(title.length >= 40 && title.length <= 65, `${label}: seoTitle length ${title.length} (want 40-65) — "${title}"`);
      check(title.endsWith('| LCS'), `${label}: seoTitle should end with "| LCS" — "${title}"`);
    }

    // Extract seoDescription
    const descRe = new RegExp(`'${grade}':\\s*\\{[^}]*?seoDescription:\\s*'([^']*)'`, 's');
    const descMatch = content.match(descRe);
    check(descMatch, `${label}: missing seoDescription`);

    if (descMatch) {
      const desc = descMatch[1];
      check(desc.length >= 100 && desc.length <= 170, `${label}: seoDescription length ${desc.length} (want 100-170) — "${desc.substring(0, 60)}..."`);
    }

    // Extract seoKeywords
    const kwRe = new RegExp(`'${grade}':\\s*\\{[^}]*?seoKeywords:\\s*'([^']*)'`, 's');
    const kwMatch = content.match(kwRe);
    check(kwMatch, `${label}: missing seoKeywords`);

    if (kwMatch) {
      const kw = kwMatch[1];
      const phrases = kw.split(',').map(s => s.trim()).filter(Boolean);
      check(phrases.length === 5, `${label}: seoKeywords has ${phrases.length} phrases (want 5)`);
    }
  }
}

console.log(`\n=== Part 127 Verification (FINAL BATCH) ===`);
console.log(`Themes: xmas, zoo`);
console.log(`Expected: 2 themes \u00d7 5 grades = 10 entries`);
console.log(`\nResults: ${pass} passed, ${fail} failed`);

if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  \u2717 ${e}`));
  process.exit(1);
} else {
  console.log(`\n\u2713 All 10 grade entries have valid SEO metadata!`);
  console.log(`\u2713 FINAL BATCH COMPLETE — All 50 Finnish themes × 5 grades = 250 pages optimized!`);
}
