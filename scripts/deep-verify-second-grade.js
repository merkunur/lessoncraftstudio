const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory()).sort();

console.log('=== DEEP SECOND-GRADE CONTENT AUDIT ===\n');

// 1. Word count for every intro
console.log('--- INTRO WORD COUNTS ---');
let minWords = Infinity, maxWords = 0, totalWords = 0;

for (const theme of dirs) {
  const fp = path.join(base, theme, 'en.ts');
  const content = fs.readFileSync(fp, 'utf8');

  const sgStart = content.indexOf("'second-grade'");
  const faqMarker = content.indexOf('// -- FAQ --', sgStart);
  const sgBlock = content.substring(sgStart, faqMarker);

  // Extract intro
  const introMatch = sgBlock.match(/intro:\s*'([\s\S]*?)(?<!\\)',\s*\n/);
  if (introMatch) {
    const intro = introMatch[1].replace(/\\'/g, "'");
    const words = intro.split(/\s+/).filter(w => w.length > 0).length;
    totalWords += words;
    if (words < minWords) minWords = words;
    if (words > maxWords) maxWords = words;
    if (words < 200) console.log(`  UNDER 200: ${theme} = ${words} words`);
  }
}
console.log(`  Min: ${minWords}, Max: ${maxWords}, Avg: ${Math.round(totalWords / dirs.length)}\n`);

// 2. Check that each file has exactly 4 grades
console.log('--- GRADE COVERAGE ---');
const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade'];
let allHave4 = true;
for (const theme of dirs) {
  const fp = path.join(base, theme, 'en.ts');
  const content = fs.readFileSync(fp, 'utf8');
  const found = grades.filter(g => content.includes(`'${g}'`));
  if (found.length !== 4) {
    console.log(`  ${theme}: only ${found.length} grades: ${found.join(', ')}`);
    allHave4 = false;
  }
}
if (allHave4) console.log('  All 50 themes have 4 grades (preschool, kindergarten, first-grade, second-grade)\n');

// 3. Check objective areas distribution
console.log('--- OBJECTIVE AREAS ---');
const areaCounts = {};
for (const theme of dirs) {
  const fp = path.join(base, theme, 'en.ts');
  const content = fs.readFileSync(fp, 'utf8');
  const sgStart = content.indexOf("'second-grade'");
  const faqMarker = content.indexOf('// -- FAQ --', sgStart);
  const sgBlock = content.substring(sgStart, faqMarker);

  const areaMatches = sgBlock.match(/area:\s*'(\w+)'/g) || [];
  areaMatches.forEach(m => {
    const area = m.match(/area:\s*'(\w+)'/)[1];
    areaCounts[area] = (areaCounts[area] || 0) + 1;
  });
}
for (const [area, count] of Object.entries(areaCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${area}: ${count} objectives`);
}
console.log('');

// 4. Check for cross-theme FAQ duplicates (exact match)
console.log('--- CROSS-THEME FAQ DUPLICATE CHECK ---');
const allQuestions = new Map();
for (const theme of dirs) {
  const fp = path.join(base, theme, 'en.ts');
  const content = fs.readFileSync(fp, 'utf8');
  const sgStart = content.indexOf("'second-grade'");
  const faqMarker = content.indexOf('// -- FAQ --', sgStart);
  const sgBlock = content.substring(sgStart, faqMarker);

  const qRegex = /question:\s*'([^']*(?:\\.[^']*)*)'/g;
  let m;
  while ((m = qRegex.exec(sgBlock)) !== null) {
    const q = m[1].toLowerCase().replace(/\\'/g, "'").trim();
    if (!allQuestions.has(q)) allQuestions.set(q, []);
    allQuestions.get(q).push(theme);
  }
}
let dupes = 0;
for (const [q, themes] of allQuestions) {
  if (themes.length > 1) {
    console.log(`  DUPE: "${q.substring(0, 70)}..." in ${themes.join(', ')}`);
    dupes++;
  }
}
if (dupes === 0) console.log('  No duplicate FAQ questions across themes\n');
else console.log(`  ${dupes} duplicates found\n`);

// 5. Check within-file FAQ overlap (second-grade vs other grades and theme FAQ)
console.log('--- WITHIN-FILE FAQ OVERLAP CHECK ---');
let internalOverlaps = 0;
for (const theme of dirs) {
  const fp = path.join(base, theme, 'en.ts');
  const content = fs.readFileSync(fp, 'utf8');

  // Get second-grade questions
  const sgStart = content.indexOf("'second-grade'");
  const faqMarker = content.indexOf('// -- FAQ --', sgStart);
  const sgBlock = content.substring(sgStart, faqMarker);
  const sgQuestions = [];
  const qRegex = /question:\s*'([^']*(?:\\.[^']*)*)'/g;
  let m;
  while ((m = qRegex.exec(sgBlock)) !== null) {
    sgQuestions.push(m[1].toLowerCase().replace(/\\'/g, "'").trim());
  }

  // Get all other questions in the file
  const otherContent = content.substring(0, sgStart) + content.substring(faqMarker);
  const otherQuestions = [];
  const qRegex2 = /question:\s*'([^']*(?:\\.[^']*)*)'/g;
  while ((m = qRegex2.exec(otherContent)) !== null) {
    otherQuestions.push(m[1].toLowerCase().replace(/\\'/g, "'").trim());
  }

  for (const sq of sgQuestions) {
    if (otherQuestions.includes(sq)) {
      console.log(`  ${theme}: second-grade FAQ overlaps with other: "${sq.substring(0, 60)}..."`);
      internalOverlaps++;
    }
  }
}
if (internalOverlaps === 0) console.log('  No within-file FAQ overlaps\n');
else console.log(`  ${internalOverlaps} internal overlaps found\n`);

// 6. Grade differentiation check: look for second-grade keywords
console.log('--- GRADE DIFFERENTIATION MARKERS ---');
const sg_keywords = ['within one hundred', 'within 100', 'two-digit', 'multi-step', 'multi-paragraph',
  'bar graph', 'data', 'opinion', 'paragraph', 'organized', 'independent', 'research',
  'inference', 'main idea', 'measurement', 'hundred', 'multiplication', 'repeated addition',
  'place value', 'fraction'];
let keywordHits = 0;
for (const theme of dirs) {
  const fp = path.join(base, theme, 'en.ts');
  const content = fs.readFileSync(fp, 'utf8');
  const sgStart = content.indexOf("'second-grade'");
  const faqMarker = content.indexOf('// -- FAQ --', sgStart);
  const sgBlock = content.substring(sgStart, faqMarker).toLowerCase();

  const found = sg_keywords.filter(kw => sgBlock.includes(kw));
  keywordHits += found.length;
  if (found.length < 3) {
    console.log(`  ${theme}: only ${found.length} differentiation keywords found`);
  }
}
console.log(`  Average differentiation keywords per theme: ${(keywordHits / dirs.length).toFixed(1)}\n`);

console.log('=== AUDIT COMPLETE ===');
