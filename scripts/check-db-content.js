/**
 * Check DB content for the 4 problem locales to see if they have wrong-language content.
 * Run on server: cd /opt/lessoncraftstudio/frontend && node scripts/check-db-content.js
 */
const { PrismaClient } = require('../node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Posts to check
  const checks = [
    { slug: 'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces', locale: 'es', issue: 'slug+title English' },
    { slug: 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9', locale: 'da', issue: 'slug+title English' },
    { slug: 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11', locale: 'it', issue: 'content detected as English' },
    { slug: 'early-childhood-prek-k-developmentally-appropriate-worksheet-activities', locale: 'fi', issue: 'content detected as English' },
  ];

  for (const check of checks) {
    const post = await prisma.blogPost.findFirst({
      where: { slug: check.slug, status: 'published' },
      select: { id: true, slug: true, translations: true }
    });

    if (!post) {
      console.log(`NOT FOUND: ${check.slug}`);
      continue;
    }

    const trans = post.translations[check.locale];
    console.log(`\n=== ${check.slug} (${check.locale}) ===`);
    console.log(`Issue: ${check.issue}`);
    console.log(`DB ID: ${post.id}`);

    if (trans) {
      console.log(`  title: ${(trans.title || '').substring(0, 80)}`);
      console.log(`  slug: ${trans.slug || 'NO SLUG'}`);
      console.log(`  metaTitle: ${(trans.metaTitle || '').substring(0, 80)}`);
      console.log(`  content first 300 chars: ${(trans.content || '').replace(/<[^>]+>/g, '').substring(0, 300)}`);
    } else {
      console.log('  NO TRANSLATION for this locale');
    }
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
