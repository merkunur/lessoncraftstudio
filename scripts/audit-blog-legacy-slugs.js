/**
 * Blog Legacy Slug Audit Script
 *
 * This script extracts old->new slug mappings by comparing:
 * 1. URL slugs from markdown files' **URL Slug** field (old slugs)
 * 2. Database slugs in blog_posts.translations[locale].slug (new slugs)
 *
 * FIXED: Now matches posts by TITLE SIMILARITY instead of file index position.
 * The old approach assumed file 016-xxx.html corresponded to database post #16,
 * but database ordering by createdAt doesn't match file numbering.
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
 * Get all Markdown filenames from a blog folder
 */
function getMarkdownFilesFromFolder(folderPath) {
  try {
    if (!fs.existsSync(folderPath)) {
      console.warn(`Folder not found: ${folderPath}`);
      return [];
    }
    const files = fs.readdirSync(folderPath);
    return files.filter(f => f.endsWith('.md') && /^\d{2,3}-/.test(f));
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error.message);
    return [];
  }
}

/**
 * Extract URL slug and title from markdown file
 * Format: **URL Slug**: /blog/commercial-license-selling-worksheets-tpt-etsy
 *    or: **URL Slug**: /es/blog/fichas-visuales-aprendizaje-autismo-tea
 * Returns: { slug: "commercial-license...", title: "..." }
 */
function extractMetaFromMarkdown(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Match URLs with optional locale prefix: /blog/slug OR /es/blog/slug
    const slugMatch = content.match(/\*\*URL Slug\*\*:\s*(?:\/[a-z]{2})?\/blog\/([^\s\n]+)/);
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return {
      slug: slugMatch ? slugMatch[1].trim() : null,
      title: titleMatch ? titleMatch[1].trim() : null,
    };
  } catch (error) {
    return { slug: null, title: null };
  }
}

/**
 * Normalize a string for comparison
 */
function normalizeForComparison(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Calculate Jaccard similarity between two strings
 */
function jaccardSimilarity(str1, str2) {
  const s1 = new Set(normalizeForComparison(str1).split(' ').filter(w => w.length > 2));
  const s2 = new Set(normalizeForComparison(str2).split(' ').filter(w => w.length > 2));

  if (s1.size === 0 || s2.size === 0) return 0;

  const intersection = new Set([...s1].filter(x => s2.has(x)));
  const union = new Set([...s1, ...s2]);

  return intersection.size / union.size;
}

/**
 * Find the best matching database post for a given file
 * Uses title similarity matching
 */
function findBestMatchingPost(fileTitle, fileSlug, posts, locale) {
  let bestMatch = null;
  let bestScore = 0;

  for (const post of posts) {
    const translation = post.translations?.[locale];
    if (!translation) continue;

    const dbTitle = translation.title || '';
    const dbSlug = translation.slug || '';

    // Calculate similarity scores
    const titleScore = jaccardSimilarity(fileTitle, dbTitle);
    const slugScore = jaccardSimilarity(fileSlug, dbSlug);

    // Combined score (weighted towards title)
    const score = titleScore * 0.7 + slugScore * 0.3;

    // Exact slug match is always best
    if (dbSlug === fileSlug) {
      return { post, score: 1.0 };
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = post;
    }
  }

  return { post: bestMatch, score: bestScore };
}

/**
 * Build file metadata index from Markdown files
 */
function buildFileMetadataIndex(blogBuildingPath, locale) {
  const folderName = LOCALE_FOLDER_MAP[locale];
  const folderPath = path.join(blogBuildingPath, folderName);
  const files = getMarkdownFilesFromFolder(folderPath);

  const fileData = [];
  for (const file of files) {
    const match = file.match(/^(\d{2,3})-/);
    if (match) {
      const meta = extractMetaFromMarkdown(path.join(folderPath, file));
      if (meta.slug || meta.title) {
        fileData.push({
          fileIndex: parseInt(match[1], 10),
          filename: file,
          urlSlug: meta.slug,
          title: meta.title,
        });
      }
    }
  }
  return fileData;
}

/**
 * Build HTML filename index
 */
function buildHtmlSlugIndex(blogBuildingPath, locale) {
  const folderName = LOCALE_FOLDER_MAP[locale];
  const folderPath = path.join(blogBuildingPath, folderName);
  const files = getHtmlFilesFromFolder(folderPath);

  const index = {};
  for (const file of files) {
    const match = file.match(/^(\d{2,3})-/);
    if (match) {
      const num = parseInt(match[1], 10);
      index[num] = extractSlugFromFilename(file);
    }
  }
  return index;
}

async function main() {
  console.log('Starting blog legacy slug audit (FIXED VERSION)...\n');
  console.log('This version uses TITLE MATCHING instead of index position.\n');

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

  // Fetch all published blog posts from database
  console.log('Fetching blog posts from database...');
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      slug: true,
      translations: true,
    },
  });

  console.log(`Found ${posts.length} published blog posts\n`);

  // Build file metadata index for each locale (from Markdown files)
  console.log('Building file metadata index from markdown files...');
  const fileMetaByLocale = {};
  for (const locale of LOCALES) {
    fileMetaByLocale[locale] = buildFileMetadataIndex(blogBuildingPath, locale);
    console.log(`Found ${fileMetaByLocale[locale].length} markdown files for ${locale}`);
  }

  // Build HTML slug index for each locale
  console.log('\nBuilding HTML filename slug index...');
  const htmlSlugsByLocale = {};
  for (const locale of LOCALES) {
    htmlSlugsByLocale[locale] = buildHtmlSlugIndex(blogBuildingPath, locale);
    console.log(`Found ${Object.keys(htmlSlugsByLocale[locale]).length} HTML files for ${locale}`);
  }

  // Compare and find mismatches using title-based matching
  const redirectMappings = [];
  const stats = {
    total: 0,
    matches: 0,
    mismatches: 0,
    noMatch: 0,
    lowConfidence: 0,
  };

  console.log('\nMatching files to database posts by title similarity...\n');

  for (const locale of LOCALES) {
    const fileMeta = fileMetaByLocale[locale];
    const htmlSlugs = htmlSlugsByLocale[locale];

    for (const file of fileMeta) {
      stats.total++;

      // Find the best matching database post
      const { post: matchedPost, score } = findBestMatchingPost(
        file.title,
        file.urlSlug,
        posts,
        locale
      );

      if (!matchedPost) {
        stats.noMatch++;
        continue;
      }

      if (score < 0.3) {
        stats.lowConfidence++;
        console.warn(`Low confidence match (${(score * 100).toFixed(1)}%) for "${file.title}"`);
        continue;
      }

      const dbSlug = matchedPost.translations?.[locale]?.slug;
      if (!dbSlug) {
        stats.noMatch++;
        continue;
      }

      // Check if markdown URL slug differs from DB slug
      if (file.urlSlug && file.urlSlug !== dbSlug) {
        stats.mismatches++;
        redirectMappings.push({
          oldSlug: file.urlSlug,
          newSlug: dbSlug,
          locale: locale,
          source: 'markdown',
          confidence: score,
          fileTitle: file.title,
        });
      } else if (file.urlSlug && file.urlSlug === dbSlug) {
        stats.matches++;
      }

      // Check if HTML filename slug also differs (and is different from markdown slug)
      const htmlSlug = htmlSlugs[file.fileIndex];
      if (htmlSlug && htmlSlug !== dbSlug && htmlSlug !== file.urlSlug) {
        redirectMappings.push({
          oldSlug: htmlSlug,
          newSlug: dbSlug,
          locale: locale,
          source: 'html',
          confidence: score,
          fileTitle: file.title,
        });

        // ALSO add intermediate slug (HTML slug without -final-optimized suffix)
        // Google may have indexed URLs at this intermediate state
        const intermediateSlug = htmlSlug
          .replace(/-final-optimized$/, '')
          .replace(/-optimized$/, '')
          .replace(/-final$/, '');

        // Only add if intermediate differs from both HTML and markdown slugs
        if (intermediateSlug !== htmlSlug &&
            intermediateSlug !== dbSlug &&
            intermediateSlug !== file.urlSlug) {
          redirectMappings.push({
            oldSlug: intermediateSlug,
            newSlug: dbSlug,
            locale: locale,
            source: 'intermediate',
            confidence: score,
            fileTitle: file.title,
          });
        }
      }
    }
  }

  // Output results
  console.log('\n=== AUDIT RESULTS (FIXED VERSION) ===\n');
  console.log(`Total files checked: ${stats.total}`);
  console.log(`Exact matches (no redirect needed): ${stats.matches}`);
  console.log(`Mismatches (redirect needed): ${stats.mismatches}`);
  console.log(`No database match found: ${stats.noMatch}`);
  console.log(`Low confidence matches skipped: ${stats.lowConfidence}`);
  console.log(`Total redirects: ${redirectMappings.length}`);
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
      const mdCount = byLocale[locale].filter(m => m.source === 'markdown').length;
      const htmlCount = byLocale[locale].filter(m => m.source === 'html').length;
      console.log(`\n--- ${locale.toUpperCase()} (${byLocale[locale].length} redirects: ${mdCount} markdown, ${htmlCount} HTML) ---`);

      // Show samples with confidence scores
      for (const m of byLocale[locale].slice(0, 5)) {
        console.log(`  [${m.source}] ${m.oldSlug}`);
        console.log(`  -> ${m.newSlug}`);
        console.log(`  (${(m.confidence * 100).toFixed(0)}% confidence: "${m.fileTitle?.substring(0, 50)}...")`);
        console.log();
      }
      if (byLocale[locale].length > 5) {
        console.log(`  ... and ${byLocale[locale].length - 5} more\n`);
      }
    }

    // Deduplicate: remove entries where oldSlug === newSlug
    const filteredMappings = redirectMappings.filter(m => m.oldSlug !== m.newSlug);

    // Output JSON for use in redirect configuration
    const outputPath = path.join(__dirname, 'blog-legacy-slugs.json');
    fs.writeFileSync(outputPath, JSON.stringify(filteredMappings, null, 2));
    console.log(`\nFull mapping saved to: ${outputPath}`);

    // Output simplified version for blog-redirects.js
    const simplifiedMappings = filteredMappings.map(m => ({
      oldSlug: m.oldSlug,
      newSlug: m.newSlug,
      locale: m.locale,
    }));

    const tsOutputPath = path.join(__dirname, 'blog-legacy-slugs-simplified.json');
    fs.writeFileSync(tsOutputPath, JSON.stringify(simplifiedMappings, null, 2));
    console.log(`Simplified format saved to: ${tsOutputPath}`);

    // Verify the crossword post is now mapped correctly
    console.log('\n=== VERIFICATION: Crossword Post Mapping ===');
    const crosswordMapping = filteredMappings.find(m =>
      m.oldSlug?.includes('crossword') || m.newSlug?.includes('crossword')
    );
    if (crosswordMapping) {
      console.log(`Found crossword mapping:`);
      console.log(`  Old: ${crosswordMapping.oldSlug}`);
      console.log(`  New: ${crosswordMapping.newSlug}`);
      console.log(`  Confidence: ${(crosswordMapping.confidence * 100).toFixed(0)}%`);
    } else {
      console.log('No crossword mapping found (may already match)');
    }

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
