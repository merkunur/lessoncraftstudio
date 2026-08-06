/**
 * Verify Part 121: Finnish Theme+Grade SEO — Themes 25–28
 * Checks that all 20 grade entries have seoTitle, seoDescription, seoKeywords
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const themes = ['household', 'insects', 'jobs', 'music'];
const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

let pass = 0;
let fail = 0;

for (const theme of themes) {
  const filePath = path.join(BASE, theme, 'fi.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  for (const grade of grades) {
    const label = `${theme}/${grade}`;

    // Extract grade block using regex
    const gradePattern = new RegExp(`'${grade}':\\s*\\{([\\s\\S]*?)(?='(?:${grades.join('|')})':\\s*\\{|\\};)`, 'm');
    const match = content.match(gradePattern);

    if (!match) {
      console.log(`FAIL ${label}: grade block not found`);
      fail++;
      continue;
    }

    const block = match[1];

    // Check seoTitle
    const titleMatch = block.match(/seoTitle:\s*'([^']+)'/);
    if (!titleMatch) {
      console.log(`FAIL ${label}: missing seoTitle`);
      fail++;
      continue;
    }
    const title = titleMatch[1];
    if (title.length < 40 || title.length > 65) {
      console.log(`FAIL ${label}: seoTitle length ${title.length} (expected 40-65): "${title}"`);
      fail++;
      continue;
    }

    // Check seoDescription
    const descMatch = block.match(/seoDescription:\s*'([^']+)'/);
    if (!descMatch) {
      console.log(`FAIL ${label}: missing seoDescription`);
      fail++;
      continue;
    }
    const desc = descMatch[1];
    if (desc.length < 100 || desc.length > 170) {
      console.log(`FAIL ${label}: seoDescription length ${desc.length} (expected 100-170): "${desc}"`);
      fail++;
      continue;
    }

    // Check seoKeywords
    const kwMatch = block.match(/seoKeywords:\s*'([^']+)'/);
    if (!kwMatch) {
      console.log(`FAIL ${label}: missing seoKeywords`);
      fail++;
      continue;
    }
    const kw = kwMatch[1];
    const phrases = kw.split(',').map(s => s.trim()).filter(Boolean);
    if (phrases.length !== 5) {
      console.log(`FAIL ${label}: seoKeywords has ${phrases.length} phrases (expected 5)`);
      fail++;
      continue;
    }

    console.log(`PASS ${label}: title=${title.length}ch, desc=${desc.length}ch, kw=${phrases.length} phrases`);
    pass++;
  }
}

console.log(`\n${pass} passed, ${fail} failed out of ${pass + fail} total (expected 20)`);
if (fail > 0) process.exit(1);
