/**
 * Quick check: do the 2 previously-stale slugs now exist in the DB?
 */
const path = require('path');
const { PrismaClient } = require(path.join(__dirname, '../frontend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

async function check() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, translations: true },
  });

  const targetSlugs = [
    'top-10-opgavegeneratorer-3-klasse',
    'algoritmo-deteccion-varianza-piezas-puzzle-significativas',
  ];

  for (const target of targetSlugs) {
    let found = false;
    for (const post of posts) {
      const t = post.translations || {};
      const enSlug = t.en?.slug || post.slug;
      if (enSlug === target) {
        console.log(target + ' -> en (primary)');
        found = true;
      }
      for (const [loc, val] of Object.entries(t)) {
        if (val?.slug === target) {
          console.log(target + ' -> ' + loc);
          found = true;
        }
      }
    }
    if (!found) console.log(target + ' -> NOT FOUND IN DB');
  }

  // Check shared slugs
  const slugMap = new Map();
  for (const post of posts) {
    const t = post.translations || {};
    const enSlug = t.en?.slug || post.slug;
    if (!slugMap.has(enSlug)) slugMap.set(enSlug, []);
    slugMap.get(enSlug).push('en');
    for (const [loc, val] of Object.entries(t)) {
      if (loc === 'en') continue;
      if (val?.slug) {
        if (!slugMap.has(val.slug)) slugMap.set(val.slug, []);
        slugMap.get(val.slug).push(loc);
      }
    }
  }

  const shared = [];
  for (const [s, locs] of slugMap) {
    if (locs.length > 1) shared.push({ slug: s, locales: locs });
  }
  console.log('\nShared slugs: ' + shared.length);
  for (const s of shared) console.log('  ' + s.slug + ' -> ' + s.locales.join(', '));
  console.log('\nTotal unique slugs: ' + slugMap.size);

  await prisma.$disconnect();
}

check();
