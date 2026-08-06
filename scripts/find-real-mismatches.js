/**
 * Find REAL language mismatches by looking at titles/slugs that are clearly
 * in the wrong language (not just similar-language detection errors).
 *
 * Strategy:
 * 1. Find titles that are identical to another locale's title (exact duplicate)
 * 2. Find slugs that are identical to another locale's slug (exact duplicate)
 * 3. Find titles/slugs containing words unique to a specific language
 */
const db = require('./db-slugs-dump.json');
const audit = require('./blog-language-audit.json');

const ALL_LOCALES = ['en','de','fr','es','pt','it','nl','da','sv','no','fi'];

console.log('=== FINDING REAL LANGUAGE MISMATCHES ===\n');

// Get full post data including titles from audit
const auditPosts = audit.posts;

const realMismatches = [];

for (const auditPost of auditPosts) {
  const dbPost = db.find(p => p.primarySlug === auditPost.primarySlug ||
    p.localeSlugs.en === auditPost.locales?.en?.slug);

  if (!dbPost) continue;

  // Check 1: Find locales where the slug is identical to another locale's slug
  for (const localeA of ALL_LOCALES) {
    const slugA = dbPost.localeSlugs[localeA];
    if (!slugA) continue;

    for (const localeB of ALL_LOCALES) {
      if (localeA === localeB) continue;
      const slugB = dbPost.localeSlugs[localeB];
      if (!slugB) continue;

      if (slugA === slugB) {
        realMismatches.push({
          type: 'duplicate-slug',
          post: dbPost.primarySlug,
          localeA,
          localeB,
          slug: slugA
        });
      }
    }
  }

  // Check 2: Find locales where the title is identical to another locale's title
  for (const localeA of ALL_LOCALES) {
    const titleA = auditPost.locales?.[localeA]?.title;
    if (!titleA) continue;

    for (const localeB of ALL_LOCALES) {
      if (localeA >= localeB) continue; // Avoid duplicates
      const titleB = auditPost.locales?.[localeB]?.title;
      if (!titleB) continue;

      if (titleA.trim() === titleB.trim()) {
        realMismatches.push({
          type: 'duplicate-title',
          post: dbPost.primarySlug,
          localeA,
          localeB,
          title: titleA.substring(0, 80)
        });
      }
    }
  }

  // Check 3: Find non-English locales where the slug is clearly English
  // (contains common English words and no non-English characters)
  const englishMarkers = ['the', 'for', 'with', 'how', 'why', 'your', 'from', 'that',
    'this', 'into', 'every', 'using', 'their', 'when', 'through', 'behind',
    'ensuring', 'building', 'choosing', 'creating', 'developing', 'integrating',
    'combining', 'preventing', 'maintaining', 'celebrating', 'leveraging'];

  for (const locale of ALL_LOCALES) {
    if (locale === 'en') continue;
    const slug = dbPost.localeSlugs[locale];
    if (!slug) continue;

    const words = slug.split('-');
    const englishWordCount = words.filter(w => englishMarkers.includes(w)).length;

    if (englishWordCount >= 3 && words.length > 3) {
      const enSlug = dbPost.localeSlugs.en;
      realMismatches.push({
        type: 'english-slug-in-wrong-locale',
        post: dbPost.primarySlug,
        locale,
        slug,
        englishWordCount,
        isExactCopyOfEn: slug === enSlug
      });
    }
  }
}

// Deduplicate
const seen = new Set();
const unique = realMismatches.filter(m => {
  const key = `${m.type}:${m.post}:${m.localeA || m.locale}:${m.localeB || ''}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log('Total real mismatches found:', unique.length);

// Group by type
const byType = {};
for (const m of unique) {
  byType[m.type] = byType[m.type] || [];
  byType[m.type].push(m);
}

for (const [type, items] of Object.entries(byType)) {
  console.log(`\n=== ${type} (${items.length}) ===`);
  for (const item of items.slice(0, 20)) {
    if (type === 'duplicate-slug') {
      console.log(`  ${item.post}: ${item.localeA} = ${item.localeB} = "${item.slug}"`);
    } else if (type === 'duplicate-title') {
      console.log(`  ${item.post}: ${item.localeA} = ${item.localeB} = "${item.title}"`);
    } else {
      console.log(`  ${item.locale} has English slug: "${item.slug}" (exact copy of en: ${item.isExactCopyOfEn})`);
    }
  }
}
