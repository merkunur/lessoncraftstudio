#!/usr/bin/env node
/**
 * Populate Sample SEO Templates
 *
 * This script populates the samples.items[] arrays in all content files
 * with SEO template entries that match the seo.images[] captions.
 *
 * The SEO data flow is:
 * 1. seo.images[] - Contains URLs and captions for og:image and JSON-LD (already exists)
 * 2. samples.items[] - Contains sample entries for SampleGallery filename-based SEO lookup (needs population)
 *
 * Usage: node scripts/populate-sample-seo-templates.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'product-pages');
const DRY_RUN = process.argv.includes('--dry-run');

// Locale to language folder mapping
const localeToFolder = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  it: 'italian',
  pt: 'portuguese',
  nl: 'dutch',
  da: 'danish',
  sv: 'swedish',
  no: 'norwegian',
  fi: 'finnish',
};

// Stats
let filesProcessed = 0;
let filesUpdated = 0;
let filesSkipped = 0;
let errors = [];

/**
 * Extract SEO images from content file and create samples.items entries
 */
function extractSeoImages(content) {
  // Match the seo.images array
  const imagesMatch = content.match(/images:\s*\[([\s\S]*?)\],?\s*(?:}\s*,|$)/);
  if (!imagesMatch) {
    return null;
  }

  const imagesBlock = imagesMatch[1];

  // Extract individual image objects
  const imageObjects = [];
  const imageRegex = /\{\s*url:\s*['"`]([^'"`]+)['"`]\s*,\s*width:\s*(\d+)\s*,\s*height:\s*(\d+)\s*,\s*caption:\s*['"`]([^'"`]+)['"`]\s*,?\s*\}/g;

  let match;
  while ((match = imageRegex.exec(imagesBlock)) !== null) {
    const url = match[1];
    const caption = match[4];

    // Extract filename from URL
    const urlPath = url.replace('https://www.lessoncraftstudio.com', '');
    const filename = path.basename(urlPath);

    // Extract base path for worksheetSrc
    const worksheetSrc = urlPath;

    imageObjects.push({
      worksheetSrc,
      filename,
      altText: caption,
      imageTitle: caption.split(' - ')[0], // Use first part of caption as title
    });
  }

  return imageObjects;
}

/**
 * Generate the samples.items array content
 * Sample interface requires: id, worksheetSrc, answerKeySrc, altText
 * Optional: imageTitle, pdfDownloadUrl
 */
function generateSamplesItems(seoImages) {
  if (!seoImages || seoImages.length === 0) {
    return '[]';
  }

  const items = seoImages.map((img, index) => {
    const id = `sample-${index + 1}`;
    // answerKeySrc defaults to worksheetSrc if no separate answer key
    return `      {
        id: '${id}',
        worksheetSrc: '${img.worksheetSrc}',
        answerKeySrc: '${img.worksheetSrc}',
        altText: '${img.altText.replace(/'/g, "\\'")}',
        imageTitle: '${img.imageTitle.replace(/'/g, "\\'")}',
      }`;
  }).join(',\n');

  return `[
${items},
    ]`;
}

/**
 * Process a single content file
 */
function processContentFile(filePath) {
  try {
    filesProcessed++;

    const content = fs.readFileSync(filePath, 'utf-8');

    // Find the samples section and check if items is empty
    // Pattern: samples: { ... items: [], ... }
    const samplesBlockMatch = content.match(/samples:\s*\{[^}]*items:\s*\[\s*\]/);
    if (!samplesBlockMatch) {
      // Either no samples section or items is already populated
      console.log(`  Skipped (samples.items not empty or missing): ${path.basename(filePath)}`);
      filesSkipped++;
      return;
    }

    // Extract SEO images
    const seoImages = extractSeoImages(content);
    if (!seoImages || seoImages.length === 0) {
      console.log(`  Skipped (no SEO images found): ${path.basename(filePath)}`);
      filesSkipped++;
      return;
    }

    // Generate the new items array
    const newItemsArray = generateSamplesItems(seoImages);

    // Only replace empty items arrays that appear AFTER "samples:" and before the closing }
    // This regex is more targeted to only affect the samples section
    // Find samples: { ... } block and replace only the items: [] within it
    let newContent = content;

    // Match the samples section and replace items: [] within it
    const samplesRegex = /(samples:\s*\{[^}]*)(items:\s*\[\s*\]\s*,?\s*(?:\/\/[^\n]*)?\n)([^}]*\})/;
    const match = content.match(samplesRegex);

    if (match) {
      const beforeItems = match[1];
      const afterItems = match[3];
      newContent = content.replace(
        samplesRegex,
        `${beforeItems}items: ${newItemsArray},\n${afterItems}`
      );
    }

    if (newContent === content) {
      console.log(`  Skipped (no change needed): ${path.basename(filePath)}`);
      filesSkipped++;
      return;
    }

    if (DRY_RUN) {
      console.log(`  Would update: ${path.basename(filePath)} (${seoImages.length} samples)`);
      console.log(`    Sample entries to add:`);
      seoImages.forEach((img, i) => {
        console.log(`      ${i + 1}. ${img.filename}: "${img.altText.substring(0, 50)}..."`);
      });
    } else {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`  Updated: ${path.basename(filePath)} (${seoImages.length} samples)`);
    }

    filesUpdated++;
  } catch (error) {
    console.error(`  Error processing ${filePath}: ${error.message}`);
    errors.push({ file: filePath, error: error.message });
  }
}

/**
 * Process all content files in a locale directory
 */
function processLocaleDir(localeDir) {
  const localeName = path.basename(localeDir);
  console.log(`\nProcessing locale: ${localeName}`);

  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    processContentFile(filePath);
  }
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60));
  console.log('Populate Sample SEO Templates');
  console.log('='.repeat(60));

  if (DRY_RUN) {
    console.log('\n*** DRY RUN MODE - No files will be modified ***\n');
  }

  // Check if content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  // Get all locale directories
  const localeDirs = fs.readdirSync(CONTENT_DIR)
    .map(name => path.join(CONTENT_DIR, name))
    .filter(p => fs.statSync(p).isDirectory());

  // Process each locale
  for (const localeDir of localeDirs) {
    processLocaleDir(localeDir);
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Files processed: ${filesProcessed}`);
  console.log(`Files updated: ${filesUpdated}`);
  console.log(`Files skipped: ${filesSkipped}`);
  console.log(`Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
  }

  if (DRY_RUN) {
    console.log('\n*** DRY RUN - Run without --dry-run to apply changes ***');
  }
}

main();
