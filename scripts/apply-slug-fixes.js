/**
 * STEP 4: Apply fixes to the 4 mismatched blog posts.
 *
 * Reads fix-payload.json and updates the database.
 *
 * Modes:
 *   --dry-run   Show what would change (default)
 *   --execute   Apply changes
 *
 * Run on server: cd /opt/lessoncraftstudio/frontend && node scripts/apply-slug-fixes.js [--execute]
 */
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../node_modules/@prisma/client');

const prisma = new PrismaClient();
const DRY_RUN = !process.argv.includes('--execute');

async function main() {
  console.log('=== APPLY BLOG SLUG/CONTENT FIXES ===');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'EXECUTING'}\n`);

  const payloadPath = path.join(__dirname, 'fix-payload.json');
  if (!fs.existsSync(payloadPath)) {
    console.error('ERROR: fix-payload.json not found');
    process.exit(1);
  }

  const fixes = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  console.log(`Fixes to apply: ${fixes.length}\n`);

  const changelog = [];

  for (const fix of fixes) {
    console.log(`--- ${fix.dbSlug} (${fix.locale}) ---`);
    console.log(`Fix type: ${fix.fixType}`);

    const post = await prisma.blogPost.findFirst({
      where: { slug: fix.dbSlug, status: 'published' },
      select: { id: true, slug: true, translations: true }
    });

    if (!post) {
      console.log('  NOT FOUND - skipping\n');
      continue;
    }

    const translations = { ...post.translations };
    const currentTrans = translations[fix.locale] || {};
    const changes = {};

    if (fix.fixType === 'slug-title-meta') {
      // Replace slug, title, metaTitle, metaDescription, excerpt
      changes.slug = { from: currentTrans.slug, to: fix.data.slug };
      changes.title = { from: (currentTrans.title || '').substring(0, 60), to: fix.data.title.substring(0, 60) };
      changes.metaTitle = { from: (currentTrans.metaTitle || '').substring(0, 60), to: fix.data.metaTitle.substring(0, 60) };
      changes.metaDescription = { from: (currentTrans.metaDescription || '').substring(0, 60), to: fix.data.metaDescription.substring(0, 60) };

      translations[fix.locale] = {
        ...currentTrans,
        slug: fix.data.slug,
        title: fix.data.title,
        metaTitle: fix.data.metaTitle,
        metaDescription: fix.data.metaDescription,
        excerpt: fix.data.excerpt
      };
    } else if (fix.fixType === 'content-only') {
      // Replace only content and excerpt
      const currentContentPreview = (currentTrans.content || '').replace(/<[^>]+>/g, '').substring(0, 60);
      const newContentPreview = fix.data.content.replace(/<[^>]+>/g, '').substring(0, 60);
      changes.content = { from: currentContentPreview, to: newContentPreview };

      translations[fix.locale] = {
        ...currentTrans,
        content: fix.data.content,
        excerpt: fix.data.excerpt
      };
    }

    // Log changes
    for (const [field, change] of Object.entries(changes)) {
      console.log(`  ${field}: "${change.from}" -> "${change.to}"`);
    }

    changelog.push({
      postId: post.id,
      dbSlug: fix.dbSlug,
      locale: fix.locale,
      fixType: fix.fixType,
      changes
    });

    if (!DRY_RUN) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { translations }
      });
      console.log('  APPLIED\n');
    } else {
      console.log('  [DRY RUN - not applied]\n');
    }
  }

  // Write changelog
  const logPath = path.join(__dirname, 'fix-changelog.json');
  fs.writeFileSync(logPath, JSON.stringify({
    executedAt: DRY_RUN ? 'DRY RUN' : new Date().toISOString(),
    dryRun: DRY_RUN,
    fixes: changelog
  }, null, 2), 'utf8');
  console.log(`Changelog: ${logPath}`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
