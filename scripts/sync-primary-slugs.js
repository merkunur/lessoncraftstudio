/**
 * Sync Primary Slugs with English Translation Slugs
 *
 * This script fixes the slug mismatch issue where:
 * - post.slug (primary slug) differs from translations.en.slug
 * - This causes 404 errors because the sitemap uses translations.en.slug
 *   but generateStaticParams might generate the wrong path
 *
 * Solution: Update post.slug to match translations.en.slug for all affected posts
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function syncPrimarySlugs() {
  console.log('Starting primary slug sync...\n');

  try {
    // Fetch all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: {
        id: true,
        slug: true,
        translations: true
      }
    });

    console.log(`Found ${posts.length} published posts\n`);

    let mismatchCount = 0;
    let updatedCount = 0;
    const mismatches = [];

    for (const post of posts) {
      const translations = post.translations;
      const englishSlug = translations?.en?.slug;

      if (!englishSlug) {
        console.log(`SKIP: ${post.slug} - No English translation slug found`);
        continue;
      }

      if (post.slug !== englishSlug) {
        mismatchCount++;
        mismatches.push({
          id: post.id,
          currentSlug: post.slug,
          englishSlug: englishSlug
        });

        console.log(`MISMATCH: "${post.slug}" should be "${englishSlug}"`);
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Total mismatches found: ${mismatchCount}`);
    console.log(`${'='.repeat(60)}\n`);

    if (mismatchCount === 0) {
      console.log('All slugs are already in sync!');
      return;
    }

    // Ask for confirmation before updating (in non-interactive mode, proceed)
    console.log('Updating slugs...\n');

    for (const mismatch of mismatches) {
      try {
        // Check if the target slug already exists
        const existing = await prisma.blogPost.findUnique({
          where: { slug: mismatch.englishSlug }
        });

        if (existing && existing.id !== mismatch.id) {
          console.log(`ERROR: Cannot update "${mismatch.currentSlug}" to "${mismatch.englishSlug}" - slug already exists`);
          continue;
        }

        await prisma.blogPost.update({
          where: { id: mismatch.id },
          data: { slug: mismatch.englishSlug }
        });

        updatedCount++;
        console.log(`UPDATED: "${mismatch.currentSlug}" → "${mismatch.englishSlug}"`);
      } catch (error) {
        console.error(`ERROR updating ${mismatch.currentSlug}:`, error.message);
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Successfully updated: ${updatedCount} / ${mismatchCount} posts`);
    console.log(`${'='.repeat(60)}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncPrimarySlugs();
