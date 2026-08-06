/**
 * Match the 2 problem posts to their ground truth file numbers
 * and extract the correct locale data from source files.
 */
const fs = require('fs');
const path = require('path');
const gt = require('./ground-truth-slugs.json');

// Problem posts (from DB)
const problems = [
  {
    primarySlug: 'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces',
    brokenLocale: 'es',
    issue: 'es has English slug+title'
  },
  {
    primarySlug: 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9',
    brokenLocale: 'da',
    issue: 'da has English slug+title'
  }
];

// Try to match by word overlap between DB English slug and GT English slug
function findBestMatch(dbSlug) {
  const dbWords = new Set(dbSlug.split('-'));
  let bestMatch = null;
  let bestScore = 0;

  for (const [num, locales] of Object.entries(gt)) {
    if (!locales.en) continue;
    const gtWords = new Set(locales.en.slug.split('-'));
    const intersection = [...dbWords].filter(w => gtWords.has(w)).length;
    const union = new Set([...dbWords, ...gtWords]).size;
    const score = intersection / union;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = { fileNum: num, gtSlug: locales.en.slug, score };
    }
  }

  return bestMatch;
}

for (const problem of problems) {
  const match = findBestMatch(problem.primarySlug);
  console.log(`\n=== ${problem.primarySlug} ===`);
  console.log(`Issue: ${problem.issue}`);
  console.log(`Best GT match: file ${match.fileNum} (${match.gtSlug}, score ${match.score.toFixed(2)})`);

  const fileData = gt[match.fileNum];
  const brokenLocale = problem.brokenLocale;

  console.log(`\nGround truth for ${brokenLocale}:`);
  if (fileData[brokenLocale]) {
    console.log(`  slug: ${fileData[brokenLocale].slug}`);
    console.log(`  title: ${fileData[brokenLocale].title}`);
    console.log(`  file: ${fileData[brokenLocale].originalFilename}`);
  } else {
    console.log('  NOT FOUND in ground truth');
  }

  console.log(`\nGround truth for en (for reference):`);
  if (fileData.en) {
    console.log(`  slug: ${fileData.en.slug}`);
    console.log(`  title: ${fileData.en.title}`);
  }

  // Also show ALL locales for this post
  console.log(`\nAll ground truth slugs for file ${match.fileNum}:`);
  for (const [loc, data] of Object.entries(fileData)) {
    console.log(`  ${loc}: ${data.slug}`);
  }
}

// Also check the content mismatch posts
console.log('\n\n=== CONTENT MISMATCH POSTS ===');
const contentProblems = [
  { primarySlug: 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11', locale: 'it' },
  { primarySlug: 'early-childhood-prek-k-developmentally-appropriate-worksheet-activities', locale: 'fi' }
];

for (const problem of contentProblems) {
  const match = findBestMatch(problem.primarySlug);
  console.log(`\n${problem.primarySlug} (${problem.locale} content issue)`);
  console.log(`  Best GT match: file ${match.fileNum} (score ${match.score.toFixed(2)})`);
  const fileData = gt[match.fileNum];
  if (fileData[problem.locale]) {
    console.log(`  GT ${problem.locale} slug: ${fileData[problem.locale].slug}`);
    console.log(`  GT ${problem.locale} title: ${fileData[problem.locale].title}`);
    console.log(`  GT ${problem.locale} file: ${fileData[problem.locale].originalFilename}`);
  }
}
