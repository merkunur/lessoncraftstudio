/**
 * Bump updatedAt on ALL published blog posts to signal freshness to Google.
 * This causes the sitemap's <lastmod> to show today's date for every blog URL,
 * prompting Google to re-crawl all 1232 blog post translations.
 *
 * Run on server: cd /opt/lessoncraftstudio/frontend && node ../scripts/bump-all-timestamps.js
 */

const path = require('path');
const { PrismaClient } = require(path.join(__dirname, '../frontend/node_modules/@prisma/client'));

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  console.log('=== Bump All Blog Post Timestamps ===');
  console.log('New timestamp:', now.toISOString());
  console.log('');

  // Count published posts
  const count = await prisma.blogPost.count({ where: { status: 'published' } });
  console.log('Published blog posts:', count);

  // Bulk update all published posts
  const result = await prisma.blogPost.updateMany({
    where: { status: 'published' },
    data: { updatedAt: now },
  });

  console.log('Updated:', result.count, 'posts');
  console.log('');
  console.log('Done. All blog posts now have fresh lastmod dates in the sitemap.');
  console.log('Google will prioritize re-crawling these URLs on its next sitemap check.');

  await prisma.$disconnect();
}

main().catch(async function(e) {
  console.error('Error:', e);
  await prisma.$disconnect();
  process.exit(1);
});
