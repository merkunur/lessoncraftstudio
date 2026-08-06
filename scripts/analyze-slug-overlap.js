/**
 * Analyze how many DB locale slugs match ground truth slugs.
 * This tells us whether the DB slugs are the original file slugs or SEO-optimized versions.
 */
const db = require('./db-slugs-dump.json');
const gt = require('./ground-truth-slugs.json');

const ALL_LOCALES = ['en','de','fr','es','pt','it','nl','da','sv','no','fi'];

// Build index: every ground truth slug -> {fileNum, locale}
const gtSlugIndex = {};
for (const [num, locales] of Object.entries(gt)) {
  for (const [locale, data] of Object.entries(locales)) {
    gtSlugIndex[data.slug] = { fileNum: num, locale };
  }
}

// For each DB post, check each locale slug against GT index
let exactMatches = 0;
let totalSlugs = 0;
const matchesByLocale = {};

for (const locale of ALL_LOCALES) {
  matchesByLocale[locale] = { total: 0, exact: 0, examples: [] };
}

for (const post of db) {
  for (const locale of ALL_LOCALES) {
    const dbSlug = post.localeSlugs[locale];
    if (!dbSlug) continue;

    totalSlugs++;
    matchesByLocale[locale].total++;

    if (gtSlugIndex[dbSlug]) {
      exactMatches++;
      matchesByLocale[locale].exact++;

      // Check if it matches the SAME locale or a different one
      const gtMatch = gtSlugIndex[dbSlug];
      if (gtMatch.locale !== locale) {
        matchesByLocale[locale].examples.push({
          dbSlug,
          inLocale: locale,
          gtLocale: gtMatch.locale,
          gtFileNum: gtMatch.fileNum,
          postPrimary: post.primarySlug
        });
      }
    }
  }
}

console.log(`Total locale slugs in DB: ${totalSlugs}`);
console.log(`Exact matches to GT: ${exactMatches} (${(100*exactMatches/totalSlugs).toFixed(1)}%)\n`);

console.log('Matches by locale:');
for (const [locale, stats] of Object.entries(matchesByLocale)) {
  const pct = stats.total ? (100*stats.exact/stats.total).toFixed(0) : '0';
  const wrongLocale = stats.examples.length;
  console.log(`  ${locale}: ${stats.exact}/${stats.total} match GT (${pct}%), ${wrongLocale} in wrong locale`);
}

// Show examples of wrong-locale matches
console.log('\nExamples of DB slugs matching WRONG GT locale:');
for (const [locale, stats] of Object.entries(matchesByLocale)) {
  for (const ex of stats.examples.slice(0, 3)) {
    console.log(`  DB ${ex.inLocale}: "${ex.dbSlug}" -> GT says this is ${ex.gtLocale} (file ${ex.gtFileNum})`);
  }
}

// Also check: for DB posts where NO locale slug matches GT, what do they look like?
console.log('\nPosts where NO locale slug matches any GT slug:');
let noMatchCount = 0;
for (const post of db) {
  let anyMatch = false;
  for (const locale of ALL_LOCALES) {
    const dbSlug = post.localeSlugs[locale];
    if (dbSlug && gtSlugIndex[dbSlug]) {
      anyMatch = true;
      break;
    }
  }
  if (!anyMatch) {
    noMatchCount++;
    if (noMatchCount <= 5) {
      console.log(`  ${post.primarySlug}`);
    }
  }
}
console.log(`Total posts with NO GT match: ${noMatchCount}`);
