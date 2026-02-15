// Validation script for en-theme-hubs.md (Part 5)
const fs = require('fs');
const content = fs.readFileSync('docs/seo-keywords/en-theme-hubs.md', 'utf8');

// Extract entries by splitting on ### headers
const sections = content.split(/### \d+\. /);
const entries = [];

for (let i = 1; i < sections.length; i++) {
  const section = sections[i];

  // Extract fields
  const primaryMatch = section.match(/\*\*Primary Keyword\*\* \| (.+?) \|/);
  const titleMatch = section.match(/\*\*SEO Title\*\* \| (.+?) \|$/m);
  const titleCharsMatch = section.match(/\*\*Title Chars\*\* \| (\d+) \|/);
  const descMatch = section.match(/\*\*Meta Description\*\* \| (.+?) \|$/m);
  const descCharsMatch = section.match(/\*\*Desc Chars\*\* \| (\d+) \|/);

  if (primaryMatch && titleMatch && descMatch) {
    entries.push({
      num: i,
      primary: primaryMatch[1],
      title: titleMatch[1].replace(/\\\|/g, '|'),
      titleCharsStated: parseInt(titleCharsMatch[1]),
      desc: descMatch[1],
      descCharsStated: parseInt(descCharsMatch[1])
    });
  }
}

console.log(`Found ${entries.length} entries\n`);

// Check uniqueness of primary keywords
const primaryKeywords = entries.map(e => e.primary);
const uniqueKeywords = new Set(primaryKeywords);
console.log(`=== PRIMARY KEYWORD UNIQUENESS ===`);
console.log(`Total: ${primaryKeywords.length}, Unique: ${uniqueKeywords.size}`);
if (primaryKeywords.length !== uniqueKeywords.size) {
  const seen = {};
  primaryKeywords.forEach((kw, i) => {
    if (seen[kw] !== undefined) {
      console.log(`  DUPLICATE: "${kw}" at entries ${seen[kw]+1} and ${i+1}`);
    }
    seen[kw] = i;
  });
} else {
  console.log(`  PASS - 0 duplicates`);
}

// Check no "generator" or "maker" in primary keywords
console.log(`\n=== NO TRANSACTIONAL MODIFIERS ===`);
let transactionalFails = 0;
entries.forEach(e => {
  if (/generator|maker/i.test(e.primary)) {
    console.log(`  FAIL #${e.num}: "${e.primary}" contains generator/maker`);
    transactionalFails++;
  }
});
if (transactionalFails === 0) console.log(`  PASS - no generator/maker in any primary keyword`);

// Check "for kids" or other collection modifier
console.log(`\n=== COLLECTION MODIFIER CHECK ===`);
let modifierFails = 0;
entries.forEach(e => {
  if (!/for kids|activities|themed/i.test(e.primary)) {
    console.log(`  FAIL #${e.num}: "${e.primary}" missing collection modifier`);
    modifierFails++;
  }
});
if (modifierFails === 0) console.log(`  PASS - all contain collection modifiers`);

// Validate title character counts
console.log(`\n=== TITLE CHARACTER COUNTS ===`);
let titleFails = 0;
entries.forEach(e => {
  const actual = e.title.length;
  const inRange = actual >= 50 && actual <= 60;
  const matchesStated = actual === e.titleCharsStated;
  if (!inRange || !matchesStated) {
    console.log(`  FAIL #${e.num}: actual=${actual}, stated=${e.titleCharsStated}, range=${inRange ? 'OK' : 'OUT'}  kw="${e.primary}"`);
    console.log(`    Title: "${e.title}"`);
    titleFails++;
  }
});
if (titleFails === 0) {
  const titleLengths = entries.map(e => e.title.length);
  console.log(`  PASS - range: ${Math.min(...titleLengths)}-${Math.max(...titleLengths)} chars`);
} else {
  console.log(`  ${titleFails} title(s) need fixing`);
}

// Validate description character counts
console.log(`\n=== DESCRIPTION CHARACTER COUNTS ===`);
let descFails = 0;
entries.forEach(e => {
  const actual = e.desc.length;
  const inRange = actual >= 150 && actual <= 160;
  const matchesStated = actual === e.descCharsStated;
  if (!inRange || !matchesStated) {
    console.log(`  FAIL #${e.num}: actual=${actual}, stated=${e.descCharsStated}, range=${inRange ? 'OK' : 'OUT'}  kw="${e.primary}"`);
    console.log(`    Desc: "${e.desc}"`);
    descFails++;
  }
});
if (descFails === 0) {
  const descLengths = entries.map(e => e.desc.length);
  console.log(`  PASS - range: ${Math.min(...descLengths)}-${Math.max(...descLengths)} chars`);
} else {
  console.log(`  ${descFails} description(s) need fixing`);
}

// Check for overlap with product page keywords
const productKeywords = [
  'addition worksheet generator', 'math worksheet generator with pictures',
  'picture graph worksheet maker', 'picture addition worksheet maker',
  'math puzzle generator for kids', 'greater than less than worksheet maker',
  'subtraction worksheet generator', 'alphabet train worksheet generator',
  'word scramble generator for kids', 'prepositions worksheet maker',
  'letter tracing worksheet generator', 'word search puzzle generator',
  'picture crossword maker for kids', 'word guess puzzle generator',
  'picture cryptogram worksheet maker', 'coloring page generator for kids',
  'grid drawing worksheet maker', 'find and count worksheet generator',
  'hidden objects worksheet maker', 'missing pieces puzzle generator',
  'matching worksheet generator', 'grid match puzzle maker',
  'shadow match worksheet generator', 'picture sorting worksheet maker',
  'big and small worksheet maker', 'sudoku puzzle maker for kids',
  'odd one out worksheet generator', 'picture maze worksheet maker',
  'treasure hunt worksheet generator', 'line tracing worksheet maker',
  'pattern train worksheet generator', 'pattern recognition worksheet maker',
  'picture bingo card generator'
];

console.log(`\n=== PRODUCT PAGE OVERLAP CHECK ===`);
let overlapFails = 0;
entries.forEach(e => {
  if (productKeywords.includes(e.primary)) {
    console.log(`  FAIL #${e.num}: "${e.primary}" duplicates a product page keyword`);
    overlapFails++;
  }
});
if (overlapFails === 0) console.log(`  PASS - 0 overlaps with 33 product page keywords`);

// Summary
console.log(`\n=== SUMMARY ===`);
const totalFails = (primaryKeywords.length !== uniqueKeywords.size ? 1 : 0) + transactionalFails + modifierFails + titleFails + descFails + overlapFails;
if (totalFails === 0) {
  console.log(`ALL CHECKS PASSED - ${entries.length} entries validated`);
} else {
  console.log(`${totalFails} issue(s) found - see details above`);
}
