/**
 * Search for specific problematic slugs mentioned in the issue
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function search() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });

  // Known problem patterns from the original issue
  const problemPatterns = [
    { pattern: 'vorschule', lang: 'German' },
    { pattern: 'feinmotorik', lang: 'German' },
    { pattern: 'aktivitaeten', lang: 'German' },
    { pattern: 'generador-sopa', lang: 'Spanish' },
    { pattern: 'strumenti-alfabetizzazione', lang: 'Italian' },
    { pattern: 'feter-100-jours', lang: 'French' },
    { pattern: 'activites-fiches', lang: 'French' },
    { pattern: 'kaupallinen-lisenssi', lang: 'Finnish' },
    { pattern: 'arbeitsblaetter', lang: 'German' },
    { pattern: 'fichas-de-', lang: 'Spanish' },
    { pattern: 'fiches-de-', lang: 'French' },
    { pattern: 'schede-di-', lang: 'Italian' }
  ];

  console.log('Searching for misplaced translations...\n');

  const mismatches = [];

  for (const post of posts) {
    const trans = post.translations;
    if (!trans) continue;

    for (const [declaredLang, content] of Object.entries(trans)) {
      const slug = content?.slug || '';
      const title = content?.title || '';

      if (!slug) continue;

      for (const { pattern, lang: actualLang } of problemPatterns) {
        if (slug.toLowerCase().includes(pattern.toLowerCase())) {
          // Check if this is a mismatch
          const langCodes = {
            'German': 'de',
            'Spanish': 'es',
            'French': 'fr',
            'Italian': 'it',
            'Finnish': 'fi'
          };

          if (langCodes[actualLang] && langCodes[actualLang] !== declaredLang) {
            mismatches.push({
              postSlug: post.slug,
              postId: post.id,
              declaredKey: declaredLang,
              actualLang: actualLang,
              actualLangCode: langCodes[actualLang],
              translationSlug: slug,
              title: title.substring(0, 60),
              matchedPattern: pattern
            });
          }
        }
      }
    }
  }

  // Print results
  console.log(`Found ${mismatches.length} clear mismatches:\n`);

  // Group by type
  const byType = {};
  for (const m of mismatches) {
    const key = `${m.declaredKey} → ${m.actualLangCode}`;
    if (!byType[key]) byType[key] = [];
    byType[key].push(m);
  }

  for (const [type, items] of Object.entries(byType)) {
    console.log(`\n=== ${type} (${items.length} items) ===\n`);
    for (const item of items) {
      console.log(`Post: ${item.postSlug}`);
      console.log(`  Key "${item.declaredKey}" contains ${item.actualLang} content`);
      console.log(`  Slug: ${item.translationSlug}`);
      console.log(`  Title: ${item.title}...`);
      console.log(`  Matched: ${item.matchedPattern}`);
      console.log();
    }
  }

  // Output JSON for fix script
  if (mismatches.length > 0) {
    console.log('\n=== FIX DATA (JSON) ===\n');
    console.log(JSON.stringify(mismatches, null, 2));
  }

  await prisma.$disconnect();
}

search().catch(e => {
  console.error(e);
  process.exit(1);
});
