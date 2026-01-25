#!/usr/bin/env node
/**
 * Update Sample Paths Script v2
 *
 * Updates all content files to use the new sample-N.jpeg naming convention.
 * Preserves all SEO metadata (altText, imageTitle, etc.) while updating file paths.
 *
 * Usage: node scripts/update-sample-paths.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const CONTENT_DIR = path.join(__dirname, '../frontend/content/product-pages');

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
  fi: 'finnish'
};

const appIdToFolder = {
  'addition': 'addition',
  'subtraction': 'subtraction',
  'math-worksheet': 'math worksheet',
  'pattern-worksheet': 'pattern worksheet',
  'wordsearch': 'wordsearch',
  'word-scramble': 'word scramble',
  'word-guess': 'word guess',
  'alphabet-train': 'alphabet train',
  'prepositions': 'prepositions',
  'bingo': 'bingo',
  'coloring': 'coloring',
  'sudoku': 'sudoku',
  'treasure-hunt': 'treasure hunt',
  'odd-one-out': 'odd one out',
  'picture-path': 'picture path',
  'pattern-train': 'pattern train',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'draw-and-color': 'draw and color',
  'drawing-lines': 'drawing lines',
  'find-and-count': 'find and count',
  'find-objects': 'find objects',
  'grid-match': 'grid match',
  'matching': 'matching',
  'math-puzzle': 'math puzzle',
  'missing-pieces': 'missing pieces',
  'more-less': 'more less',
  'picture-sort': 'picture sort',
  'shadow-match': 'shadow match',
  'writing': 'writing',
  'big-small': 'big small',
  'chart-count': 'chart count',
  'code-addition': 'code addition'
};

function getAllContentFiles(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getAllContentFiles(fullPath));
      } else if (entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  } catch (e) {
    console.error('Error reading directory:', dir, e.message);
  }
  return files;
}

function extractAppIdFromContent(content) {
  const match = content.match(/appId:\s*['"]([^'"]+)['"]/);
  return match ? match[1] : null;
}

function extractLocaleFromPath(filePath) {
  const parts = filePath.split(path.sep);
  const idx = parts.indexOf('product-pages');
  return (idx >= 0 && parts[idx + 1]) ? parts[idx + 1] : null;
}

function hasLegacyPaths(content) {
  const matches = content.match(/worksheetSrc:\s*['"][^'"]+['"]/g) || [];
  return matches.some(m => !m.match(/sample-\d+(-answer)?\.jpeg/));
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateSamplePaths(content, locale, appId) {
  const langFolder = localeToFolder[locale];
  const appFolder = appIdToFolder[appId];

  if (!langFolder || !appFolder) {
    console.log('  Warning: Unknown locale (' + locale + ') or appId (' + appId + ')');
    return content;
  }

  let updated = content;
  const basePath = '/samples/' + langFolder + '/' + appFolder;

  // Find and update worksheetSrc paths
  const wsRegex = /worksheetSrc:\s*['"]([^'"]+)['"]/g;
  let wsMatch;
  let wsIndex = 0;
  const wsReplacements = [];

  while ((wsMatch = wsRegex.exec(content)) !== null) {
    wsIndex++;
    const oldPath = wsMatch[1];
    if (!oldPath.match(/sample-\d+\.jpeg$/)) {
      wsReplacements.push({
        old: oldPath,
        new: basePath + '/sample-' + wsIndex + '.jpeg'
      });
    }
  }

  for (const r of wsReplacements) {
    updated = updated.replace(
      new RegExp("worksheetSrc:\\s*['\"]" + escapeRegex(r.old) + "['\"]", 'g'),
      "worksheetSrc: '" + r.new + "'"
    );
  }

  // Find and update answerKeySrc paths
  const asRegex = /answerKeySrc:\s*['"]([^'"]+)['"]/g;
  let asMatch;
  let asIndex = 0;
  const asReplacements = [];

  while ((asMatch = asRegex.exec(updated)) !== null) {
    asIndex++;
    const oldPath = asMatch[1];
    if (oldPath && !oldPath.match(/sample-\d+(-answer)?\.jpeg$/)) {
      asReplacements.push({
        old: oldPath,
        new: basePath + '/sample-' + asIndex + '-answer.jpeg'
      });
    }
  }

  for (const r of asReplacements) {
    updated = updated.replace(
      new RegExp("answerKeySrc:\\s*['\"]" + escapeRegex(r.old) + "['\"]", 'g'),
      "answerKeySrc: '" + r.new + "'"
    );
  }

  // Find and update pdfDownloadUrl paths
  const pdfRegex = /pdfDownloadUrl:\s*['"]([^'"]+\.pdf)['"]/g;
  let pdfMatch;
  let pdfIndex = 0;
  const pdfReplacements = [];

  while ((pdfMatch = pdfRegex.exec(updated)) !== null) {
    pdfIndex++;
    const oldPath = pdfMatch[1];
    if (!oldPath.match(/sample-\d+\.pdf$/)) {
      pdfReplacements.push({
        old: oldPath,
        new: basePath + '/sample-' + pdfIndex + '.pdf'
      });
    }
  }

  for (const r of pdfReplacements) {
    updated = updated.replace(
      new RegExp("pdfDownloadUrl:\\s*['\"]" + escapeRegex(r.old) + "['\"]", 'g'),
      "pdfDownloadUrl: '" + r.new + "'"
    );
  }

  // Update hero.previewImageSrc
  const heroMatch = updated.match(/previewImageSrc:\s*['"]([^'"]+)['"]/);
  if (heroMatch && !heroMatch[1].match(/sample-\d+\.jpeg$/)) {
    updated = updated.replace(
      /previewImageSrc:\s*['"][^'"]+['"]/,
      "previewImageSrc: '" + basePath + "/sample-1.jpeg'"
    );
  }

  // Update seo.images URLs
  let seoIndex = 0;
  updated = updated.replace(
    /url:\s*['"]https:\/\/www\.lessoncraftstudio\.com\/samples\/[^'"]+['"]/g,
    (match) => {
      seoIndex++;
      if (match.match(/sample-\d+\.jpeg/)) return match;
      return "url: 'https://www.lessoncraftstudio.com/samples/" + langFolder + "/" + appFolder + "/sample-" + seoIndex + ".jpeg'";
    }
  );

  return updated;
}

function main() {
  console.log('='.repeat(60));
  console.log('Sample Path Update Script v2');
  console.log(DRY_RUN ? '(DRY RUN - no files will be modified)' : '');
  console.log('='.repeat(60));
  console.log('');

  const files = getAllContentFiles(CONTENT_DIR);
  console.log('Found ' + files.length + ' content files');
  console.log('');

  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const filePath of files) {
    const relativePath = path.relative(CONTENT_DIR, filePath);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');

      if (!hasLegacyPaths(content)) {
        skippedCount++;
        continue;
      }

      const locale = extractLocaleFromPath(filePath);
      const appId = extractAppIdFromContent(content);

      if (!locale || !appId) {
        console.log('Skipping ' + relativePath + ': Could not extract locale/appId');
        skippedCount++;
        continue;
      }

      console.log('Updating: ' + relativePath + ' (locale: ' + locale + ', appId: ' + appId + ')');

      const updatedContent = updateSamplePaths(content, locale, appId);

      if (updatedContent !== content) {
        if (!DRY_RUN) {
          fs.writeFileSync(filePath, updatedContent, 'utf-8');
        }
        updatedCount++;
        console.log('  -> Updated sample paths');
      } else {
        console.log('  -> No changes needed');
        skippedCount++;
      }

    } catch (error) {
      console.error('Error processing ' + relativePath + ': ' + error.message);
      errorCount++;
    }
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('Summary:');
  console.log('  Updated: ' + updatedCount + ' files');
  console.log('  Skipped: ' + skippedCount + ' files');
  console.log('  Errors:  ' + errorCount + ' files');
  console.log('='.repeat(60));

  if (DRY_RUN && updatedCount > 0) {
    console.log('');
    console.log('Run without --dry-run to apply changes');
  }
}

main();
