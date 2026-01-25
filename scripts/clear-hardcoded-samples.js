#!/usr/bin/env node
/**
 * Clear Hardcoded Samples Script
 *
 * Removes all hardcoded sample items from content files.
 * Samples are now loaded dynamically from the content manager API.
 *
 * Usage: node scripts/clear-hardcoded-samples.js
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../frontend/content/product-pages');

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

function clearSampleItems(content) {
  // Match the items array with all its contents and replace with empty array
  // This regex matches: items: [ ... ],  where ... can be any content including nested objects
  const regex = /items:\s*\[\s*\{[\s\S]*?\}\s*,?\s*\]\s*,/g;

  if (regex.test(content)) {
    return content.replace(regex, 'items: [], // Samples loaded dynamically from content manager\n    ');
  }
  return content;
}

function main() {
  console.log('='.repeat(60));
  console.log('Clear Hardcoded Samples Script');
  console.log('='.repeat(60));
  console.log('');

  const files = getAllContentFiles(CONTENT_DIR);
  console.log('Found ' + files.length + ' content files');
  console.log('');

  let updatedCount = 0;
  let skippedCount = 0;

  for (const filePath of files) {
    const relativePath = path.relative(CONTENT_DIR, filePath);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Check if file has hardcoded sample items
      if (!content.includes('items: [') || content.includes('items: [], //')) {
        skippedCount++;
        continue;
      }

      const updatedContent = clearSampleItems(content);

      if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent, 'utf-8');
        updatedCount++;
        console.log('Cleared: ' + relativePath);
      } else {
        skippedCount++;
      }

    } catch (error) {
      console.error('Error processing ' + relativePath + ': ' + error.message);
    }
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('Summary:');
  console.log('  Cleared: ' + updatedCount + ' files');
  console.log('  Skipped: ' + skippedCount + ' files');
  console.log('='.repeat(60));
}

main();
