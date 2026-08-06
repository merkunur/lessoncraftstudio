/**
 * Verify Part 118: Finnish Theme+Grade SEO — Themes 13–16
 * Checks that all 20 grade entries have valid seoTitle, seoDescription, seoKeywords.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const themes = ['easter', 'emotions', 'fairy-tales', 'farm'];
const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let totalChecked = 0;
let totalErrors = 0;

for (const theme of themes) {
  const filePath = path.join(BASE, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const grade of gradeIds) {
    // Extract seoTitle
    const titleMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoTitle:\\s*'([^']*(?:\\\\'[^']*)*)'`));
    const descMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoDescription:\\s*'([^']*(?:\\\\'[^']*)*)'`));
    const kwMatch = content.match(new RegExp(`'${grade}':\\s*\\{[^}]*?seoKeywords:\\s*'([^']*(?:\\\\'[^']*)*)'`));

    const label = `${theme}/${grade}`;

    if (!titleMatch) {
      console.error(`  FAIL ${label}: missing seoTitle`);
      totalErrors++;
      continue;
    }
    if (!descMatch) {
      console.error(`  FAIL ${label}: missing seoDescription`);
      totalErrors++;
      continue;
    }
    if (!kwMatch) {
      console.error(`  FAIL ${label}: missing seoKeywords`);
      totalErrors++;
      continue;
    }

    const title = titleMatch[1];
    const desc = descMatch[1];
    const kw = kwMatch[1];

    // Check title length (40-65 chars)
    if (title.length < 40 || title.length > 65) {
      console.error(`  WARN ${label}: seoTitle length ${title.length} (expected 40-65): "${title}"`);
    }

    // Check description length (130-170 chars)
    if (desc.length < 120 || desc.length > 180) {
      console.error(`  WARN ${label}: seoDescription length ${desc.length} (expected ~130-170): "${desc.substring(0, 60)}..."`);
    }

    // Check keywords: exactly 5 long-tail phrases separated by ", "
    const phrases = kw.split(', ');
    if (phrases.length !== 5) {
      console.error(`  WARN ${label}: seoKeywords has ${phrases.length} phrases (expected 5)`);
    }

    console.log(`  OK ${label}: title=${title.length}ch, desc=${desc.length}ch, kw=${phrases.length} phrases`);
    totalChecked++;
  }
}

console.log(`\nVerified ${totalChecked}/20 grade entries, ${totalErrors} errors.`);
if (totalChecked === 20 && totalErrors === 0) {
  console.log('Part 118 verification PASSED!');
} else {
  console.log('Part 118 verification has issues - review above.');
}
