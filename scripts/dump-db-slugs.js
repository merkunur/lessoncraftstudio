/**
 * Dump all DB slugs and locale slugs for analysis.
 * Run on server: cd /opt/lessoncraftstudio/frontend && node scripts/dump-db-slugs.js
 */
const { PrismaClient } = require('../node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });

  const result = posts.map(p => ({
    id: p.id,
    primarySlug: p.slug,
    enTitle: p.translations?.en?.title || '',
    localeSlugs: {}
  }));

  for (const r of result) {
    const post = posts.find(p => p.id === r.id);
    for (const locale of ['en','de','fr','es','pt','it','nl','da','sv','no','fi']) {
      r.localeSlugs[locale] = post.translations?.[locale]?.slug || null;
    }
  }

  // Write to JSON file
  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(
    path.join(__dirname, 'db-slugs-dump.json'),
    JSON.stringify(result, null, 2),
    'utf8'
  );
  console.log('Written ' + result.length + ' posts to db-slugs-dump.json');

  // Print first 5 for quick check
  for (const r of result.slice(0, 5)) {
    console.log('\n' + r.primarySlug);
    console.log('  en slug: ' + r.localeSlugs.en);
    console.log('  de slug: ' + r.localeSlugs.de);
    console.log('  fr slug: ' + r.localeSlugs.fr);
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
