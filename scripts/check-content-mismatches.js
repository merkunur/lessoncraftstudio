/**
 * Check the 3 content mismatches (it, no, fi) from the audit.
 * These are more reliable since content has more text to analyze.
 */
const audit = require('./blog-language-audit.json');
const db = require('./db-slugs-dump.json');

const ALL_LOCALES = ['en','de','fr','es','pt','it','nl','da','sv','no','fi'];

console.log('=== CONTENT MISMATCHES ===\n');

for (const post of audit.posts) {
  for (const [locale, data] of Object.entries(post.locales)) {
    if (!data.contentMatch) {
      const dbPost = db.find(p => p.primarySlug === post.primarySlug);
      console.log(`Post: ${post.primarySlug}`);
      console.log(`  Locale: ${locale}`);
      console.log(`  Detected language: ${data.contentLang} (${data.contentConf})`);
      console.log(`  Content score: ${data.contentScore}`);
      console.log(`  Second candidate: ${data.contentSecond} (${data.contentSecondScore})`);
      console.log(`  Title: ${data.title ? data.title.substring(0, 80) : '?'}`);
      console.log(`  Title lang: ${data.titleLang} (${data.titleConf})`);
      console.log(`  Slug: ${data.slug}`);
      if (dbPost) {
        console.log(`  DB slug for ${locale}: ${dbPost.localeSlugs[locale]}`);
      }
      console.log();
    }
  }
}

// Also: let me check which posts have da locale with clearly identical patterns to other locales
console.log('\n=== CHECKING ALL es SLUGS for English patterns ===\n');
for (const post of db) {
  const esSlug = post.localeSlugs.es;
  const enSlug = post.localeSlugs.en;
  if (!esSlug || !enSlug) continue;

  // Check if es slug looks English (high word overlap with en slug)
  const esWords = new Set(esSlug.split('-'));
  const enWords = new Set(enSlug.split('-'));
  const overlap = [...esWords].filter(w => enWords.has(w)).length;
  const ratio = overlap / Math.max(esWords.size, enWords.size);

  if (ratio > 0.6 && esWords.size > 3) {
    console.log(`  ${post.primarySlug}`);
    console.log(`    en: ${enSlug}`);
    console.log(`    es: ${esSlug} (overlap: ${(ratio*100).toFixed(0)}%)`);
  }
}

console.log('\n=== CHECKING ALL da SLUGS for English patterns ===\n');
for (const post of db) {
  const daSlug = post.localeSlugs.da;
  const enSlug = post.localeSlugs.en;
  if (!daSlug || !enSlug) continue;

  const daWords = new Set(daSlug.split('-'));
  const enWords = new Set(enSlug.split('-'));
  const overlap = [...daWords].filter(w => enWords.has(w)).length;
  const ratio = overlap / Math.max(daWords.size, enWords.size);

  if (ratio > 0.6 && daWords.size > 3) {
    console.log(`  ${post.primarySlug}`);
    console.log(`    en: ${enSlug}`);
    console.log(`    da: ${daSlug} (overlap: ${(ratio*100).toFixed(0)}%)`);
  }
}

// Check ALL locales for high overlap with English
console.log('\n=== ALL LOCALES: slugs with >60% English word overlap ===\n');
for (const locale of ALL_LOCALES) {
  if (locale === 'en') continue;
  let count = 0;
  for (const post of db) {
    const locSlug = post.localeSlugs[locale];
    const enSlug = post.localeSlugs.en;
    if (!locSlug || !enSlug) continue;

    const locWords = new Set(locSlug.split('-'));
    const enWords = new Set(enSlug.split('-'));
    const overlap = [...locWords].filter(w => enWords.has(w)).length;
    const ratio = overlap / Math.max(locWords.size, enWords.size);

    if (ratio > 0.6 && locWords.size > 3) {
      count++;
      if (count <= 2) {
        console.log(`  ${locale}: ${locSlug} (${(ratio*100).toFixed(0)}% overlap with en)`);
      }
    }
  }
  if (count > 0) console.log(`  ${locale} TOTAL: ${count} high-overlap slugs\n`);
}
