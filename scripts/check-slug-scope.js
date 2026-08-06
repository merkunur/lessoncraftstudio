const { PrismaClient } = require('./frontend/node_modules/@prisma/client');
const fs = require('fs');
const path = require('path');

// Load DATABASE_URL
const envPath = path.join(__dirname, '..', 'frontend', '.env');
if (!process.env.DATABASE_URL && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^DATABASE_URL=["']?(.+?)["']?\s*$/m);
  if (match) process.env.DATABASE_URL = match[1];
}

const prisma = new PrismaClient();
(async () => {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, translations: true },
  });
  const locales = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];

  console.log('Total published posts:', posts.length);
  console.log('\n=== SLUG COVERAGE BY LOCALE ===\n');

  for (const loc of locales) {
    let hasContent = 0, hasSlug = 0, noSlug = 0;
    for (const p of posts) {
      const d = (p.translations || {})[loc] || {};
      const hasTitle = d.title && d.title.trim().length > 0;
      const hasCont = d.content && d.content.length > 0;
      const hasS = d.slug && d.slug.trim().length > 0;
      if (hasTitle && hasCont) {
        hasContent++;
        if (hasS) hasSlug++;
        else noSlug++;
      }
    }
    const status = noSlug > 0 ? 'PROBLEM' : 'OK';
    console.log(`  ${loc}: ${hasContent} translated, ${hasSlug} with slug, ${noSlug} MISSING slug  [${status}]`);
  }

  // Show specific examples of missing slugs
  console.log('\n=== EXAMPLES OF MISSING SLUGS ===\n');
  let shown = 0;
  for (const p of posts) {
    if (shown >= 5) break;
    const t = p.translations || {};
    const missing = [];
    for (const loc of locales) {
      const d = t[loc] || {};
      if (d.title && d.content && !d.slug) {
        missing.push(loc);
      }
    }
    if (missing.length > 0) {
      console.log(`  Post: ${p.slug.substring(0, 60)}`);
      console.log(`    Missing slugs for: [${missing.join(', ')}]`);
      shown++;
    }
  }
  if (shown === 0) console.log('  None found - all translated posts have slugs');

  await prisma.$disconnect();
})();
