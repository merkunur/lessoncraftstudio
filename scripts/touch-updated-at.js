/**
 * Touch updatedAt for blog post with the French slug that Google has stale metadata for.
 * This signals freshness in the sitemap, prompting Google to re-crawl.
 *
 * Run on server: cd /opt/lessoncraftstudio/frontend && node ../scripts/touch-updated-at.js
 */

const path = require('path');
const { PrismaClient } = require(path.join(__dirname, '../frontend/node_modules/@prisma/client'));

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, updatedAt: true, translations: true },
  });

  const targetSlug = 'guide-complet-maitriser-les-generateurs-de-fiches-pedagogiques-de-a-a-z';
  const target = posts.find(function(p) {
    return p.translations && p.translations.fr && p.translations.fr.slug === targetSlug;
  });

  if (target) {
    console.log('Found post:', target.slug);
    console.log('Current updatedAt:', target.updatedAt.toISOString());
    console.log('FR title:', target.translations.fr.title);
    console.log('FR metaTitle:', target.translations.fr.metaTitle);

    // Touch updatedAt to signal freshness
    const now = new Date();
    await prisma.blogPost.update({
      where: { id: target.id },
      data: { updatedAt: now },
    });
    console.log('Updated timestamp to:', now.toISOString());
    console.log('Done - sitemap will now show fresh lastmod date');
  } else {
    console.log('Post not found by FR slug:', targetSlug);
    console.log('Checking all FR slugs...');
    var frSlugs = posts
      .filter(function(p) { return p.translations && p.translations.fr && p.translations.fr.slug; })
      .map(function(p) { return p.translations.fr.slug; });
    // Look for partial match
    var matches = frSlugs.filter(function(s) { return s.includes('generateur') || s.includes('fiches'); });
    if (matches.length > 0) {
      console.log('Possible matches:', matches);
    } else {
      console.log('No partial matches found. Total FR posts:', frSlugs.length);
    }
  }

  await prisma.$disconnect();
}

main().catch(async function(e) {
  console.error('Error:', e);
  await prisma.$disconnect();
  process.exit(1);
});
