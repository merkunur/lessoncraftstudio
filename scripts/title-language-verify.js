/**
 * Verify titles are in the correct language using definitive markers.
 *
 * Key distinguishing features:
 * - Swedish: "och" (and), "för" (for), "som" (that), "är" (is), "att" (to)
 * - Norwegian: "og" (and), "for" (for), "som" (that), "er" (is), "å" (to)
 * - Danish: "og" (and), "for" (for), "som" (that), "er" (is), "at" (to)
 * - Finnish: double vowels (aa, ää, öö), -ssa/-ssä, -lle, -stä suffixes
 * - German: "und" (and), "für" (for), "mit" (with), "die/der/das"
 * - Dutch: "en" (and), "voor" (for), "met" (with), "de/het"
 * - French: "et" (and), "pour" (for), "avec" (with), "les/des/une"
 * - Spanish: "y" (and), "para" (for), "con" (with), "los/las/del"
 * - Portuguese: "e" (and), "para" (for), "com" (with), "os/as/do"
 * - Italian: "e" (and), "per" (for), "con" (with), "i/le/della"
 */
const audit = require('./blog-language-audit.json');
const posts = audit.posts;

const ALL_LOCALES = ['en','de','fr','es','pt','it','nl','da','sv','no','fi'];

// Swedish "och" is very distinctive - Nor/Dan use "og"
// If Swedish title has "og" instead of "och", it's likely Norwegian or Danish
function checkSwedishTitle(title) {
  const words = title.toLowerCase().split(/\s+/);
  const hasOch = words.includes('och');
  const hasOg = words.includes('og');
  const hasFor = words.some(w => w === 'för' || w === 'for');

  if (hasOg && !hasOch) return { issue: 'has "og" (NO/DA) instead of "och" (SV)' };
  return null;
}

// If Norwegian/Danish title has "och", it's likely Swedish
function checkNorDanTitle(title, locale) {
  const words = title.toLowerCase().split(/\s+/);
  const hasOch = words.includes('och');
  if (hasOch) return { issue: `has "och" (SV) in ${locale} title` };
  return null;
}

// Finnish is VERY distinct - check for Finnish vs anything else
function checkFinnishTitle(title) {
  const lower = title.toLowerCase();
  // Finnish has very distinctive endings and double vowels
  const finnishPatterns = ['ää', 'öö', 'uu', 'yy', 'ssä', 'ssa', 'lle', 'stä', 'sta', 'nen'];
  const hasFinnish = finnishPatterns.some(p => lower.includes(p));

  // Also check for non-Finnish: common Scandinavian/English words
  const words = lower.split(/\s+/);
  const nonFinnish = ['and', 'the', 'for', 'with', 'og', 'och', 'und', 'et', 'les'];
  const hasNonFinnish = words.some(w => nonFinnish.includes(w));

  if (!hasFinnish && hasNonFinnish) return { issue: 'no Finnish patterns, has non-Finnish words' };
  if (!hasFinnish && lower.length > 20) return { issue: 'no Finnish patterns detected in long title' };
  return null;
}

// German vs Dutch: German uses "und", "für", "mit"; Dutch uses "en", "voor", "met"
function checkGermanTitle(title) {
  const words = title.toLowerCase().split(/\s+/);
  if (words.includes('en') && words.includes('voor') && !words.includes('und')) {
    return { issue: 'has Dutch "en"/"voor" instead of German "und"/"für"' };
  }
  return null;
}

function checkDutchTitle(title) {
  const words = title.toLowerCase().split(/\s+/);
  if (words.includes('und') && !words.includes('en')) {
    return { issue: 'has German "und" instead of Dutch "en"' };
  }
  return null;
}

const issues = [];

for (const post of posts) {
  for (const [locale, data] of Object.entries(post.locales)) {
    const title = data.title;
    if (!title || title.length < 10) continue;

    let result = null;
    switch(locale) {
      case 'sv':
        result = checkSwedishTitle(title);
        break;
      case 'no':
      case 'da':
        result = checkNorDanTitle(title, locale);
        break;
      case 'fi':
        result = checkFinnishTitle(title);
        break;
      case 'de':
        result = checkGermanTitle(title);
        break;
      case 'nl':
        result = checkDutchTitle(title);
        break;
    }

    if (result) {
      issues.push({
        post: post.primarySlug,
        locale,
        title: title.substring(0, 80),
        issue: result.issue
      });
    }
  }
}

console.log(`Title language issues found: ${issues.length}\n`);

const byLocale = {};
for (const i of issues) {
  byLocale[i.locale] = byLocale[i.locale] || [];
  byLocale[i.locale].push(i);
}

for (const [locale, items] of Object.entries(byLocale)) {
  console.log(`\n=== ${locale} (${items.length}) ===`);
  for (const item of items.slice(0, 10)) {
    console.log(`  "${item.title}"`);
    console.log(`    Issue: ${item.issue}`);
  }
}

// Also do a check: compare each locale pair for identical slugs/titles
// (different from exact match - look for high similarity)
console.log('\n\n=== CROSS-LOCALE TITLE SIMILARITY CHECK ===');
console.log('Checking if any two locales for the same post have suspiciously similar titles...\n');

let similarCount = 0;
for (const post of posts) {
  for (let i = 0; i < ALL_LOCALES.length; i++) {
    for (let j = i + 1; j < ALL_LOCALES.length; j++) {
      const locA = ALL_LOCALES[i];
      const locB = ALL_LOCALES[j];
      const titleA = post.locales[locA]?.title;
      const titleB = post.locales[locB]?.title;

      if (!titleA || !titleB) continue;

      // Check if titles are very similar (high character overlap)
      const wordsA = new Set(titleA.toLowerCase().split(/\s+/));
      const wordsB = new Set(titleB.toLowerCase().split(/\s+/));
      const overlap = [...wordsA].filter(w => wordsB.has(w)).length;
      const maxLen = Math.max(wordsA.size, wordsB.size);
      const ratio = overlap / maxLen;

      if (ratio > 0.7 && maxLen > 3 && locA !== 'en') {
        similarCount++;
        if (similarCount <= 10) {
          console.log(`  ${post.primarySlug}: ${locA} vs ${locB} (${(ratio*100).toFixed(0)}% word overlap)`);
          console.log(`    ${locA}: "${titleA.substring(0, 60)}"`);
          console.log(`    ${locB}: "${titleB.substring(0, 60)}"`);
        }
      }
    }
  }
}
console.log(`Total pairs with >70% title word overlap: ${similarCount}`);
