/**
 * Fix script: Remove "final-optimized", "-optimized", and similar suffixes from blog slugs
 *
 * Usage:
 *   node scripts/fix-optimized-slugs.js --dry-run   # Preview changes
 *   node scripts/fix-optimized-slugs.js --apply     # Apply fixes
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

const DRY_RUN = !process.argv.includes('--apply');

// Patterns to remove from slugs
const BAD_PATTERNS = [
  /-final-optimized$/i,
  /-optimized$/i,
  /-final$/i
];

async function fix() {
  console.log('=== FIX OPTIMIZED SLUGS ===\n');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes)' : 'APPLY CHANGES'}\n`);

  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { id: true, slug: true, translations: true }
  });

  console.log(`Total posts: ${posts.length}\n`);

  // Backup
  if (!DRY_RUN) {
    const backup = posts.map(p => ({ id: p.id, slug: p.slug, translations: p.translations }));
    fs.writeFileSync('/tmp/blog-slugs-backup.json', JSON.stringify(backup, null, 2));
    console.log('Backup saved to /tmp/blog-slugs-backup.json\n');
  }

  const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  const fixes = [];
  const allNewSlugs = new Map(); // Track to prevent duplicates

  // First pass: collect all planned fixes and check for duplicates
  for (const post of posts) {
    const trans = post.translations || {};
    const postFixes = [];

    for (const locale of locales) {
      const t = trans[locale];
      if (!t?.slug) continue;

      let newSlug = t.slug;
      let wasFixed = false;

      for (const pattern of BAD_PATTERNS) {
        if (pattern.test(newSlug)) {
          newSlug = newSlug.replace(pattern, '');
          wasFixed = true;
        }
      }

      if (wasFixed && newSlug !== t.slug) {
        // Check for potential duplicates
        const key = `${locale}:${newSlug}`;
        if (allNewSlugs.has(key)) {
          console.log(`⚠️ Warning: Duplicate slug would result for ${locale}: ${newSlug}`);
          console.log(`   - Post 1: ${allNewSlugs.get(key)}`);
          console.log(`   - Post 2: ${post.slug}`);
          // Add counter to make unique
          let counter = 2;
          while (allNewSlugs.has(`${locale}:${newSlug}-${counter}`)) {
            counter++;
          }
          newSlug = `${newSlug}-${counter}`;
          console.log(`   -> Using: ${newSlug}\n`);
        }
        allNewSlugs.set(`${locale}:${newSlug}`, post.slug);

        postFixes.push({
          locale,
          oldSlug: t.slug,
          newSlug
        });
      }
    }

    if (postFixes.length > 0) {
      fixes.push({
        postId: post.id,
        postSlug: post.slug,
        fixes: postFixes
      });
    }
  }

  // Summary by language
  console.log('=== FIXES BY LANGUAGE ===\n');
  const byLang = {};
  for (const fix of fixes) {
    for (const f of fix.fixes) {
      byLang[f.locale] = (byLang[f.locale] || 0) + 1;
    }
  }
  for (const [lang, count] of Object.entries(byLang).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${lang}: ${count} slugs to fix`);
  }

  // Show sample fixes
  console.log('\n=== SAMPLE FIXES ===\n');
  let shown = 0;
  for (const fix of fixes) {
    if (shown >= 10) break;
    for (const f of fix.fixes) {
      if (shown >= 10) break;
      console.log(`[${f.locale}] ${fix.postSlug}`);
      console.log(`  Before: ${f.oldSlug}`);
      console.log(`  After:  ${f.newSlug}`);
      console.log();
      shown++;
    }
  }

  const totalFixes = fixes.reduce((sum, f) => sum + f.fixes.length, 0);
  console.log(`Total slugs to fix: ${totalFixes}\n`);

  // Apply fixes
  if (!DRY_RUN && fixes.length > 0) {
    console.log('=== APPLYING FIXES ===\n');

    let success = 0;
    let errors = 0;

    for (const fix of fixes) {
      try {
        // Fetch current post data
        const post = await prisma.blogPost.findUnique({
          where: { id: fix.postId },
          select: { translations: true }
        });

        if (!post) {
          console.log(`  ❌ Post not found: ${fix.postSlug}`);
          errors++;
          continue;
        }

        // Update translations
        const newTranslations = { ...post.translations };
        for (const f of fix.fixes) {
          if (newTranslations[f.locale]) {
            newTranslations[f.locale] = {
              ...newTranslations[f.locale],
              slug: f.newSlug
            };
          }
        }

        // Save
        await prisma.blogPost.update({
          where: { id: fix.postId },
          data: { translations: newTranslations }
        });

        console.log(`  ✓ Fixed: ${fix.postSlug} (${fix.fixes.length} slugs)`);
        success++;

      } catch (error) {
        console.log(`  ❌ Error fixing ${fix.postSlug}: ${error.message}`);
        errors++;
      }
    }

    console.log(`\nCompleted: ${success} posts fixed, ${errors} errors`);
  }

  // Summary
  console.log('\n=== SUMMARY ===\n');

  if (DRY_RUN) {
    console.log('DRY RUN complete. No changes made.');
    console.log(`\nTo apply ${totalFixes} fixes, run:`);
    console.log('  node scripts/fix-optimized-slugs.js --apply\n');
  } else if (fixes.length > 0) {
    console.log('Fixes applied!');
    console.log('\nNext steps:');
    console.log('1. Verify: node scripts/list-bad-slugs.js');
    console.log('2. Regenerate sitemap');
    console.log('3. Request re-indexing in Google Search Console');
  } else {
    console.log('No fixes needed.');
  }

  await prisma.$disconnect();
}

fix().catch(e => {
  console.error(e);
  process.exit(1);
});
