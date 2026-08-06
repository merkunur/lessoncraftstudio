#!/usr/bin/env node
/**
 * Verify Part 125 — Finnish Theme+Grade SEO for themes 41–44
 * Checks seoTitle, seoDescription, seoKeywords in gradeContent entries.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const FILES = ['summer/fi.ts', 'superheroes/fi.ts', 'toys/fi.ts', 'transportation/fi.ts'];
const GRADES = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let total = 0;
let pass = 0;
let fail = 0;
const errors = [];

for (const relPath of FILES) {
  const filePath = path.join(BASE, relPath);
  const src = fs.readFileSync(filePath, 'utf8');

  for (const grade of GRADES) {
    total++;
    const label = `${relPath} > ${grade}`;

    // Extract grade block
    const gradePatStr = `['"]${grade}['"]\\s*:\\s*\\{`;
    const gradeIdx = src.search(new RegExp(gradePatStr));
    if (gradeIdx === -1) {
      errors.push(`${label}: grade block not found`);
      fail++;
      continue;
    }

    // Find intro after grade key
    const afterGrade = src.slice(gradeIdx);

    // Extract seoTitle
    const titleMatch = afterGrade.match(/seoTitle:\s*'([^']+)'/);
    const descMatch = afterGrade.match(/seoDescription:\s*'([^']+)'/);
    const kwMatch = afterGrade.match(/seoKeywords:\s*'([^']+)'/);

    if (!titleMatch) {
      errors.push(`${label}: seoTitle missing`);
      fail++;
      continue;
    }
    if (!descMatch) {
      errors.push(`${label}: seoDescription missing`);
      fail++;
      continue;
    }
    if (!kwMatch) {
      errors.push(`${label}: seoKeywords missing`);
      fail++;
      continue;
    }

    const title = titleMatch[1];
    const desc = descMatch[1];
    const kw = kwMatch[1];

    let ok = true;

    // Title length 40-65
    if (title.length < 40 || title.length > 65) {
      errors.push(`${label}: seoTitle length ${title.length} (need 40-65): "${title}"`);
      ok = false;
    }

    // Description length 100-170
    if (desc.length < 100 || desc.length > 170) {
      errors.push(`${label}: seoDescription length ${desc.length} (need 100-170): "${desc}"`);
      ok = false;
    }

    // Keywords: exactly 5 comma-separated phrases
    const phrases = kw.split(',').map(s => s.trim()).filter(Boolean);
    if (phrases.length !== 5) {
      errors.push(`${label}: seoKeywords has ${phrases.length} phrases (need 5)`);
      ok = false;
    }

    if (ok) {
      pass++;
      console.log(`  OK  ${label} — title=${title.length}ch, desc=${desc.length}ch, kw=${phrases.length} phrases`);
    } else {
      fail++;
    }
  }
}

console.log(`\n========================================`);
console.log(`Total: ${total}  |  Pass: ${pass}  |  Fail: ${fail}`);
if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  ✗ ${e}`));
}
console.log(`========================================`);
process.exit(fail > 0 ? 1 : 0);
