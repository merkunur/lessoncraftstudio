/**
 * Diagnostic Script: Analyze blog post slugs for 404 issues
 *
 * This script checks all blog posts for:
 * 1. Missing translations.en.slug
 * 2. Mismatched slugs between primary and translations
 * 3. Posts that might cause 404 errors
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function diagnoseBlogSlugs() {
  console.log('=== BLOG SLUG DIAGNOSTIC REPORT ===\n');

  try {
    // Fetch all blog posts
    const posts = await prisma.blogPost.findMany({
      select: {
        id: true,
        slug: true,
        status: true,
        translations: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`Total posts in database: ${posts.length}\n`);

    // Categorize posts
    const issues = {
      missingEnTranslation: [],
      missingEnSlug: [],
      slugMismatch: [],
      notPublished: [],
      healthy: []
    };

    for (const post of posts) {
      const translations = post.translations;

      // Check if not published
      if (post.status !== 'published') {
        issues.notPublished.push({
          id: post.id,
          slug: post.slug,
          status: post.status
        });
        continue;
      }

      // Check if translations.en exists
      if (!translations || !translations.en) {
        issues.missingEnTranslation.push({
          id: post.id,
          slug: post.slug,
          hasTranslations: !!translations,
          translationKeys: translations ? Object.keys(translations) : []
        });
        continue;
      }

      // Check if translations.en.slug exists
      if (!translations.en.slug) {
        issues.missingEnSlug.push({
          id: post.id,
          primarySlug: post.slug,
          enTitle: translations.en.title || '(no title)'
        });
        continue;
      }

      // Check if slugs match
      if (translations.en.slug !== post.slug) {
        issues.slugMismatch.push({
          id: post.id,
          primarySlug: post.slug,
          enSlug: translations.en.slug
        });
        continue;
      }

      // Post is healthy
      issues.healthy.push({
        id: post.id,
        slug: post.slug
      });
    }

    // Print report
    console.log('=== ISSUE SUMMARY ===\n');

    console.log(`Healthy posts (will load correctly): ${issues.healthy.length}`);
    console.log(`Not published: ${issues.notPublished.length}`);
    console.log(`Missing translations.en object: ${issues.missingEnTranslation.length}`);
    console.log(`Missing translations.en.slug: ${issues.missingEnSlug.length}`);
    console.log(`Slug mismatch (en.slug != primary): ${issues.slugMismatch.length}`);

    // Detailed reports for issues
    if (issues.missingEnTranslation.length > 0) {
      console.log('\n=== POSTS MISSING translations.en ===');
      console.log('These posts will 404 for English URLs:\n');
      issues.missingEnTranslation.forEach(p => {
        console.log(`  - ${p.slug}`);
        console.log(`    ID: ${p.id}`);
        console.log(`    Has translations: ${p.hasTranslations}`);
        console.log(`    Available languages: ${p.translationKeys.join(', ') || 'none'}`);
        console.log('');
      });
    }

    if (issues.missingEnSlug.length > 0) {
      console.log('\n=== POSTS MISSING translations.en.slug ===');
      console.log('These posts may 404 if accessed via translated slug:\n');
      issues.missingEnSlug.forEach(p => {
        console.log(`  - Primary slug: ${p.primarySlug}`);
        console.log(`    ID: ${p.id}`);
        console.log(`    English title: ${p.enTitle}`);
        console.log('');
      });
    }

    if (issues.slugMismatch.length > 0) {
      console.log('\n=== POSTS WITH SLUG MISMATCH ===');
      console.log('Primary slug differs from translations.en.slug:\n');
      issues.slugMismatch.forEach(p => {
        console.log(`  - Primary: ${p.primarySlug}`);
        console.log(`    EN slug: ${p.enSlug}`);
        console.log(`    ID: ${p.id}`);
        console.log('');
      });
    }

    if (issues.notPublished.length > 0) {
      console.log('\n=== NOT PUBLISHED POSTS ===');
      issues.notPublished.forEach(p => {
        console.log(`  - ${p.slug} (status: ${p.status})`);
      });
    }

    // Summary
    console.log('\n=== ROOT CAUSE ANALYSIS ===\n');

    const totalIssues = issues.missingEnTranslation.length + issues.missingEnSlug.length + issues.slugMismatch.length;

    if (totalIssues > 0) {
      console.log(`FOUND ${totalIssues} posts with potential 404 issues!`);
      console.log('');
      console.log('Recommended fixes:');

      if (issues.missingEnTranslation.length > 0) {
        console.log(`  1. Add translations.en object to ${issues.missingEnTranslation.length} posts`);
      }
      if (issues.missingEnSlug.length > 0) {
        console.log(`  2. Set translations.en.slug = primary slug for ${issues.missingEnSlug.length} posts`);
      }
      if (issues.slugMismatch.length > 0) {
        console.log(`  3. Review ${issues.slugMismatch.length} posts with mismatched slugs`);
        console.log('     (These might be intentional for SEO, but could cause issues)');
      }
    } else {
      console.log('All published posts have correct slug configuration!');
      console.log('The 404 issue may be caused by ISR caching - try redeploying.');
    }

    return {
      total: posts.length,
      issues
    };

  } catch (error) {
    console.error('Error diagnosing blog slugs:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the diagnostic
diagnoseBlogSlugs()
  .then(result => {
    console.log('\n=== DIAGNOSTIC COMPLETE ===');
    process.exit(0);
  })
  .catch(error => {
    console.error('Diagnostic failed:', error);
    process.exit(1);
  });
