/**
 * Dump all DB slugs for local audit. Run from frontend dir:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/dump-db-slugs-v2.js
 */
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require(path.join(__dirname, '../frontend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true },
  });

  const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'da', 'sv', 'no', 'fi'];

  const result = posts.map(p => {
    const r = {
      id: p.id,
      primarySlug: p.slug,
      enTitle: (p.translations || {}).en?.title || '',
      localeSlugs: {},
    };
    for (const locale of LOCALES) {
      r.localeSlugs[locale] = (p.translations || {})[locale]?.slug || null;
    }
    return r;
  });

  const outputPath = path.join(__dirname, 'db-slugs-dump.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log('Written ' + result.length + ' posts to ' + outputPath);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
