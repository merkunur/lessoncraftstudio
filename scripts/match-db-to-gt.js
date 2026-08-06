/**
 * Local script to figure out how to match DB posts to ground truth file numbers.
 * This tries multiple matching strategies.
 */
const db = require('./db-slugs-dump.json');
const gt = require('./ground-truth-slugs.json');

const ALL_LOCALES = ['en','de','fr','es','pt','it','nl','da','sv','no','fi'];

// Build reverse lookup: gtSlug -> {fileNum, locale}
const slugToGT = {};
for (const [num, locales] of Object.entries(gt)) {
  for (const [locale, data] of Object.entries(locales)) {
    slugToGT[data.slug] = { fileNum: num, locale };
  }
}
console.log('GT slugs in index:', Object.keys(slugToGT).length);

// Strategy 1: Match by any locale slug (exact or stripped)
const matchResults = {};
const unmatched = [];

for (const post of db) {
  let matched = false;

  for (const locale of ALL_LOCALES) {
    const dbSlug = post.localeSlugs[locale];
    if (!dbSlug) continue;

    // Exact match
    if (slugToGT[dbSlug]) {
      matchResults[post.id] = {
        fileNum: slugToGT[dbSlug].fileNum,
        method: `exact:${locale}`,
        matchSlug: dbSlug
      };
      matched = true;
      break;
    }

    // Stripped match
    const stripped = dbSlug.replace(/-(final-optimized|final|optimized)$/, '');
    if (stripped !== dbSlug && slugToGT[stripped]) {
      matchResults[post.id] = {
        fileNum: slugToGT[stripped].fileNum,
        method: `stripped:${locale}`,
        matchSlug: stripped
      };
      matched = true;
      break;
    }
  }

  if (!matched) {
    unmatched.push(post);
  }
}

console.log('\nStrategy 1 (exact/stripped locale slug match):');
console.log('  Matched:', Object.keys(matchResults).length);
console.log('  Unmatched:', unmatched.length);

if (unmatched.length > 0) {
  console.log('\n--- Unmatched posts ---');
  for (const post of unmatched) {
    console.log('  DB primary:', post.primarySlug);
    console.log('    en slug:', post.localeSlugs.en);
    // Show first few locale slugs
    for (const loc of ['de', 'fr', 'es']) {
      console.log(`    ${loc} slug:`, post.localeSlugs[loc]);
    }
  }

  // Strategy 2: Fuzzy slug matching using word overlap
  console.log('\n--- Strategy 2: Word overlap matching ---');
  for (const post of unmatched) {
    const dbWords = new Set((post.localeSlugs.en || post.primarySlug).split('-'));

    let bestMatch = null;
    let bestScore = 0;

    for (const [num, locales] of Object.entries(gt)) {
      if (!locales.en) continue;
      const gtWords = new Set(locales.en.slug.split('-'));

      // Calculate Jaccard similarity
      const intersection = [...dbWords].filter(w => gtWords.has(w)).length;
      const union = new Set([...dbWords, ...gtWords]).size;
      const score = intersection / union;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = { fileNum: num, gtSlug: locales.en.slug, score };
      }
    }

    if (bestMatch && bestScore > 0.3) {
      console.log(`  DB: ${post.primarySlug}`);
      console.log(`  GT: ${bestMatch.gtSlug} (file ${bestMatch.fileNum}, score ${bestMatch.score.toFixed(2)})`);
      matchResults[post.id] = {
        fileNum: bestMatch.fileNum,
        method: `fuzzy:en:${bestMatch.score.toFixed(2)}`,
        matchSlug: bestMatch.gtSlug
      };
    } else {
      console.log(`  FAILED: ${post.primarySlug} (best score: ${bestScore.toFixed(2)})`);
    }
  }
}

// Check for duplicate file number assignments
const fileNumCounts = {};
for (const [id, match] of Object.entries(matchResults)) {
  fileNumCounts[match.fileNum] = (fileNumCounts[match.fileNum] || 0) + 1;
}
const duplicates = Object.entries(fileNumCounts).filter(([_, count]) => count > 1);
if (duplicates.length > 0) {
  console.log('\nWARNING: Duplicate file number assignments:');
  for (const [fileNum, count] of duplicates) {
    const posts = Object.entries(matchResults).filter(([_, m]) => m.fileNum === fileNum);
    console.log(`  File ${fileNum}: assigned to ${count} posts`);
    for (const [id, m] of posts) {
      const post = db.find(p => p.id === id);
      console.log(`    - ${post.primarySlug} (via ${m.method})`);
    }
  }
}

// Check coverage
const assignedFileNums = new Set(Object.values(matchResults).map(m => m.fileNum));
const missingFileNums = [];
for (let i = 1; i <= 112; i++) {
  const num = String(i).padStart(3, '0');
  if (!assignedFileNums.has(num)) {
    missingFileNums.push(num);
  }
}
if (missingFileNums.length > 0) {
  console.log('\nFile numbers not assigned to any DB post:', missingFileNums.join(', '));
}

console.log('\nFinal matched:', Object.keys(matchResults).length, '/ 112');

// Save the mapping
const fs = require('fs');
const path = require('path');
fs.writeFileSync(
  path.join(__dirname, 'db-to-file-mapping.json'),
  JSON.stringify(matchResults, null, 2),
  'utf8'
);
console.log('Mapping saved to db-to-file-mapping.json');
