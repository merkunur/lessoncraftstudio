/**
 * STEP 1: Build Ground Truth from Source Files
 *
 * Reads ALL .html files from BLOG BUILDING/ folders (11 languages x 112 posts)
 * and builds a definitive mapping of post numbers to locale-specific slugs and titles.
 *
 * Output: scripts/ground-truth-slugs.json
 *
 * Run locally: node scripts/build-ground-truth.js
 */

const fs = require('fs');
const path = require('path');

const BLOG_BUILDING_DIR = path.join(__dirname, '..', 'BLOG BUILDING');

const LANGUAGES = {
  'ENGLISH BLOGPOSTS': 'en',
  'GERMAN BLOGPOSTS': 'de',
  'FRENCH BLOGPOSTS': 'fr',
  'SPANISH BLOGPOSTS': 'es',
  'PORTUGUESE BLOGPOSTS': 'pt',
  'ITALIAN BLOGPOSTS': 'it',
  'DUTCH BLOGPOSTS': 'nl',
  'DANISH BLOGPOSTS': 'da',
  'SWEDISH BLOGPOSTS': 'sv',
  'NORWEGIAN BLOGPOSTS': 'no',
  'FINNISH BLOGPOSTS': 'fi'
};

// Suffixes to strip from filenames (these are build artifacts, not part of the slug)
const SUFFIX_PATTERN = /-(final-optimized|final|optimized)$/;

function extractSlugFromFilename(filename) {
  return filename
    .replace(/^\d{3}-/, '')      // Remove "001-" prefix
    .replace(/\.html$/, '')       // Remove .html extension
    .replace(SUFFIX_PATTERN, ''); // Remove build suffixes
}

function extractTitleFromHtml(htmlContent) {
  const match = htmlContent.match(/<title[^>]*>(.*?)<\/title>/i);
  return match ? match[1].trim() : '';
}

function main() {
  console.log('Building ground truth from BLOG BUILDING/ source files...\n');

  const groundTruth = {};
  let totalFiles = 0;
  let missingFiles = 0;

  for (const [folderName, locale] of Object.entries(LANGUAGES)) {
    const folderPath = path.join(BLOG_BUILDING_DIR, folderName);

    if (!fs.existsSync(folderPath)) {
      console.error(`ERROR: Folder not found: ${folderPath}`);
      continue;
    }

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.html'));
    console.log(`${locale}: ${files.length} files in ${folderName}`);

    for (let postNum = 1; postNum <= 112; postNum++) {
      const postNumber = String(postNum).padStart(3, '0');
      const pattern = new RegExp(`^${postNumber}-.*\\.html$`);
      const htmlFile = files.find(f => pattern.test(f));

      if (!htmlFile) {
        console.warn(`  WARNING: No file for post ${postNumber} in ${locale}`);
        missingFiles++;
        continue;
      }

      const slug = extractSlugFromFilename(htmlFile);
      const htmlContent = fs.readFileSync(path.join(folderPath, htmlFile), 'utf8');
      const title = extractTitleFromHtml(htmlContent);

      if (!groundTruth[postNumber]) {
        groundTruth[postNumber] = {};
      }

      groundTruth[postNumber][locale] = {
        slug,
        title,
        originalFilename: htmlFile
      };

      totalFiles++;
    }
  }

  // Validation
  console.log(`\n--- Validation ---`);
  console.log(`Total files processed: ${totalFiles}`);
  console.log(`Missing files: ${missingFiles}`);

  let postsWithAllLocales = 0;
  let postsWithMissingLocales = 0;

  for (let postNum = 1; postNum <= 112; postNum++) {
    const postNumber = String(postNum).padStart(3, '0');
    const locales = groundTruth[postNumber] ? Object.keys(groundTruth[postNumber]) : [];
    if (locales.length === 11) {
      postsWithAllLocales++;
    } else {
      postsWithMissingLocales++;
      console.warn(`  Post ${postNumber} has only ${locales.length} locales: missing ${
        Object.values(LANGUAGES).filter(l => !locales.includes(l)).join(', ')
      }`);
    }
  }

  console.log(`Posts with all 11 locales: ${postsWithAllLocales}`);
  console.log(`Posts with missing locales: ${postsWithMissingLocales}`);

  // Check for slug collisions within a locale
  const slugsByLocale = {};
  let collisions = 0;
  for (const [postNumber, locales] of Object.entries(groundTruth)) {
    for (const [locale, data] of Object.entries(locales)) {
      if (!slugsByLocale[locale]) slugsByLocale[locale] = {};
      if (slugsByLocale[locale][data.slug]) {
        console.warn(`  COLLISION: ${locale} slug "${data.slug}" used by posts ${slugsByLocale[locale][data.slug]} and ${postNumber}`);
        collisions++;
      }
      slugsByLocale[locale][data.slug] = postNumber;
    }
  }
  console.log(`Slug collisions: ${collisions}`);

  // Write output
  const outputPath = path.join(__dirname, 'ground-truth-slugs.json');
  fs.writeFileSync(outputPath, JSON.stringify(groundTruth, null, 2), 'utf8');
  console.log(`\nOutput written to: ${outputPath}`);
  console.log(`Posts: ${Object.keys(groundTruth).length}, Total locale entries: ${totalFiles}`);
}

main();
