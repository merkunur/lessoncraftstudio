/**
 * Blog Legacy Slug Audit Script
 *
 * This script extracts old->new slug mappings by comparing:
 * 1. HTML filenames in BLOG BUILDING/[LANG] BLOGPOSTS/ folders (old slugs)
 * 2. Database slugs in blog_posts.translations[locale].slug (new slugs)
 *
 * Output: JSON mapping of { oldSlug, newSlug, locale } for all changed slugs
 *
 * Usage (run on server with database access):
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/audit-blog-legacy-slugs.js
 */

// Must run from frontend directory where node_modules is
const path = require('path');
const prismaPath = path.join(__dirname, '../frontend/node_modules/@prisma/client');
const { PrismaClient } = require(prismaPath);
const fs = require('fs');

const prisma = new PrismaClient();

// Locale to folder name mapping
const LOCALE_FOLDER_MAP = {
  'en': 'ENGLISH BLOGPOSTS',
  'de': 'GERMAN BLOGPOSTS',
  'fr': 'FRENCH BLOGPOSTS',
  'es': 'SPANISH BLOGPOSTS',
  'pt': 'PORTUGUESE BLOGPOSTS',
  'it': 'ITALIAN BLOGPOSTS',
  'nl': 'DUTCH BLOGPOSTS',
  'sv': 'SWEDISH BLOGPOSTS',
  'da': 'DANISH BLOGPOSTS',
  'no': 'NORWEGIAN BLOGPOSTS',
  'fi': 'FINNISH BLOGPOSTS',
};

const LOCALES = Object.keys(LOCALE_FOLDER_MAP);

/**
 * Extract slug from HTML filename
 * Format: "007-wortsuche-generator-90-sekunden.html"
 * Returns: "wortsuche-generator-90-sekunden"
 */
function extractSlugFromFilename(filename) {
  // Remove .html extension
  const withoutExt = filename.replace(/\.html$/, '');
  // Remove numeric prefix (e.g., "007-")
  return withoutExt.replace(/^\d{2,3}-/, '');
}

/**
 * Get all HTML filenames from a blog folder
 */
function getHtmlFilesFromFolder(folderPath) {
  try {
    if (!fs.existsSync(folderPath)) {
      console.warn(`Folder not found: ${folderPath}`);
      return [];
    }
    const files = fs.readdirSync(folderPath);
    return files.filter(f => f.endsWith('.html') && /^\d{2,3}-/.test(f));
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error.message);
    return [];
  }
}

/**
 * Build index number to filename slug mapping from HTML files
 */
function buildFileSlugIndex(blogBuildingPath, locale) {
  const folderName = LOCALE_FOLDER_MAP[locale];
  const folderPath = path.join(blogBuildingPath, folderName);
  const files = getHtmlFilesFromFolder(folderPath);

  const index = {};
  for (const file of files) {
    // Extract index number from filename (e.g., "007" from "007-wortsuche.html")
    const match = file.match(/^(\d{2,3})-/);
    if (match) {
      const num = parseInt(match[1], 10);
      index[num] = extractSlugFromFilename(file);
    }
  }
  return index;
}

async function main() {
  console.log('Starting blog legacy slug audit...\n');

  // Determine blog building path
  const possiblePaths = [
    '/opt/lessoncraftstudio/BLOG BUILDING',
    path.join(__dirname, '..', 'BLOG BUILDING'),
    'C:\\Users\\rkgen\\lessoncraftstudio\\BLOG BUILDING',
  ];

  let blogBuildingPath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      blogBuildingPath = p;
      break;
    }
  }

  if (!blogBuildingPath) {
    console.error('Could not find BLOG BUILDING folder');
    process.exit(1);
  }

  console.log(`Using blog building path: ${blogBuildingPath}\n`);

  // Build file slug index for each locale
  const fileSlugsByLocale = {};
  for (const locale of LOCALES) {
    fileSlugsByLocale[locale] = buildFileSlugIndex(blogBuildingPath, locale);
    console.log(`Found ${Object.keys(fileSlugsByLocale[locale]).length} HTML files for ${locale}`);
  }

  // Fetch all published blog posts from database
  console.log('\nFetching blog posts from database...');
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      slug: true,
      translations: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Found ${posts.length} published blog posts\n`);

  // Compare and find mismatches
  const redirectMappings = [];
  const stats = {
    total: 0,
    matches: 0,
    mismatches: 0,
    missing: 0,
  };

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const postIndex = i + 1; // 1-indexed to match filename prefixes
    const translations = post.translations || {};

    for (const locale of LOCALES) {
      const translation = translations[locale];
      if (!translation || !translation.slug) continue;

      stats.total++;
      const dbSlug = translation.slug;
      const fileSlug = fileSlugsByLocale[locale][postIndex];

      if (!fileSlug) {
        stats.missing++;
        continue;
      }

      if (fileSlug === dbSlug) {
        stats.matches++;
      } else {
        stats.mismatches++;
        redirectMappings.push({
          oldSlug: fileSlug,
          newSlug: dbSlug,
          locale: locale,
          postIndex: postIndex,
        });
      }
    }
  }

  // Output results
  console.log('=== AUDIT RESULTS ===\n');
  console.log(`Total translations checked: ${stats.total}`);
  console.log(`Exact matches (no redirect needed): ${stats.matches}`);
  console.log(`Mismatches (redirect needed): ${stats.mismatches}`);
  console.log(`Missing file slugs: ${stats.missing}`);
  console.log();

  if (redirectMappings.length > 0) {
    console.log('=== REDIRECT MAPPINGS ===\n');

    // Group by locale for readability
    const byLocale = {};
    for (const mapping of redirectMappings) {
      if (!byLocale[mapping.locale]) byLocale[mapping.locale] = [];
      byLocale[mapping.locale].push(mapping);
    }

    for (const locale of LOCALES) {
      if (!byLocale[locale] || byLocale[locale].length === 0) continue;
      console.log(`\n--- ${locale.toUpperCase()} (${byLocale[locale].length} redirects) ---`);
      for (const m of byLocale[locale].slice(0, 5)) {
        console.log(`  ${m.oldSlug}`);
        console.log(`  -> ${m.newSlug}`);
        console.log();
      }
      if (byLocale[locale].length > 5) {
        console.log(`  ... and ${byLocale[locale].length - 5} more\n`);
      }
    }

    // Output JSON for use in redirect configuration
    const outputPath = path.join(__dirname, 'blog-legacy-slugs.json');
    fs.writeFileSync(outputPath, JSON.stringify(redirectMappings, null, 2));
    console.log(`\nFull mapping saved to: ${outputPath}`);

    // Also output TypeScript format for easy copy-paste
    const tsOutputPath = path.join(__dirname, 'blog-legacy-slugs.ts');
    const tsContent = `// Auto-generated blog legacy slug mappings
// Generated: ${new Date().toISOString()}
// Total redirects: ${redirectMappings.length}

export interface BlogLegacySlug {
  oldSlug: string;
  newSlug: string;
  locale: string;
}

export const legacyBlogSlugs: BlogLegacySlug[] = ${JSON.stringify(redirectMappings.map(m => ({
  oldSlug: m.oldSlug,
  newSlug: m.newSlug,
  locale: m.locale,
})), null, 2)};
`;
    fs.writeFileSync(tsOutputPath, tsContent);
    console.log(`TypeScript format saved to: ${tsOutputPath}`);
  } else {
    console.log('No redirects needed - all slugs match!');
  }

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
