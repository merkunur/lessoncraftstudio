/**
 * Examine language mismatches from audit data to understand the pattern.
 */
const audit = require('./blog-language-audit.json');
const posts = audit.posts;

const flagged = [];
for (const post of posts) {
  for (const [locale, data] of Object.entries(post.locales)) {
    if (!data.titleMatch) {
      flagged.push({
        primarySlug: post.primarySlug,
        locale,
        detectedLang: data.titleLang,
        localeSlug: data.slug,
        title: data.title ? data.title.substring(0, 80) : '?',
        confidence: data.titleConf
      });
    }
  }
}

console.log('Total flagged title mismatches:', flagged.length);
console.log('\n=== Norwegian (60 mismatches) ===');
flagged.filter(f => f.locale === 'no').slice(0, 5).forEach(f => {
  console.log(`  no detected as ${f.detectedLang} (${f.confidence}): "${f.title}"`);
  console.log(`    slug: ${f.localeSlug}`);
});

console.log('\n=== Finnish (41 mismatches) ===');
flagged.filter(f => f.locale === 'fi').slice(0, 5).forEach(f => {
  console.log(`  fi detected as ${f.detectedLang} (${f.confidence}): "${f.title}"`);
  console.log(`    slug: ${f.localeSlug}`);
});

console.log('\n=== Danish (20 mismatches) ===');
flagged.filter(f => f.locale === 'da').slice(0, 5).forEach(f => {
  console.log(`  da detected as ${f.detectedLang} (${f.confidence}): "${f.title}"`);
  console.log(`    slug: ${f.localeSlug}`);
});

console.log('\n=== Spanish (20 mismatches) ===');
flagged.filter(f => f.locale === 'es').slice(0, 5).forEach(f => {
  console.log(`  es detected as ${f.detectedLang} (${f.confidence}): "${f.title}"`);
  console.log(`    slug: ${f.localeSlug}`);
});

console.log('\n=== German (5 mismatches) ===');
flagged.filter(f => f.locale === 'de').forEach(f => {
  console.log(`  de detected as ${f.detectedLang} (${f.confidence}): "${f.title}"`);
  console.log(`    slug: ${f.localeSlug}`);
});

console.log('\n=== Italian (2 mismatches) ===');
flagged.filter(f => f.locale === 'it').forEach(f => {
  console.log(`  it detected as ${f.detectedLang} (${f.confidence}): "${f.title}"`);
  console.log(`    slug: ${f.localeSlug}`);
});

// Check: for the Norwegian mismatches, what languages are detected?
console.log('\n=== Norwegian detected-as distribution ===');
const noByLang = {};
flagged.filter(f => f.locale === 'no').forEach(f => {
  noByLang[f.detectedLang] = (noByLang[f.detectedLang] || 0) + 1;
});
console.log(noByLang);

// Finnish detected-as distribution
console.log('\n=== Finnish detected-as distribution ===');
const fiByLang = {};
flagged.filter(f => f.locale === 'fi').forEach(f => {
  fiByLang[f.detectedLang] = (fiByLang[f.detectedLang] || 0) + 1;
});
console.log(fiByLang);
