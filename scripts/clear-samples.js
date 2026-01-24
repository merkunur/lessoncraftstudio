/**
 * Script to clear all sample arrays from product page content files
 * This makes the content manager the only source of samples
 */

const fs = require('fs');
const path = require('path');

const PRODUCT_PAGES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern 1: Clear the items array in samples section
  // Match: items: [ ... anything ... ]
  const itemsPattern = /items:\s*\[\s*[\s\S]*?\n\s*\],/g;
  if (itemsPattern.test(content)) {
    content = content.replace(itemsPattern, 'items: [],');
    modified = true;
  }

  // Pattern 2: Clear previewImageSrc in hero section
  // Match: previewImageSrc: '/samples/...'
  const previewPattern = /previewImageSrc:\s*['"][^'"]*['"]/g;
  if (previewPattern.test(content)) {
    content = content.replace(previewPattern, "previewImageSrc: ''");
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += processDirectory(fullPath);
    } else if (entry.name.endsWith('.ts')) {
      if (processFile(fullPath)) {
        console.log(`Cleared: ${fullPath}`);
        count++;
      }
    }
  }

  return count;
}

console.log('Clearing sample arrays from product pages...');
const count = processDirectory(PRODUCT_PAGES_DIR);
console.log(`\nDone! Modified ${count} files.`);
