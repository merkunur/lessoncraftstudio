/**
 * Script to generate a JSON mapping of blog slugs to their correct locales.
 * This file is used by middleware for instant redirects without database queries.
 *
 * Run with: npx ts-node scripts/generate-slug-map.ts
 * Or: npx tsx scripts/generate-slug-map.ts
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface SlugMap {
  [slug: string]: string; // slug -> locale
}

async function generateSlugMap(): Promise<void> {
  console.log('Generating slug-locale mapping...');

  const slugMap: SlugMap = {};

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { slug: true, translations: true }
    });

    console.log(`Found ${posts.length} published blog posts`);

    for (const post of posts) {
      const translations = post.translations as Record<string, { slug?: string }>;

      // Add primary slug (English)
      if (post.slug) {
        slugMap[post.slug] = 'en';
      }

      // Add all translated slugs
      for (const [lang, translation] of Object.entries(translations)) {
        if (translation?.slug) {
          slugMap[translation.slug] = lang;
        }
      }
    }

    const outputPath = path.join(__dirname, '..', 'lib', 'blog-slug-map.json');

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(slugMap, null, 2));

    console.log(`Generated mapping for ${Object.keys(slugMap).length} slugs`);
    console.log(`Saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error generating slug map:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

generateSlugMap();
