#!/usr/bin/env node
/**
 * build-verified-rename-map.js
 *
 * Reads the actual server file inventory and creates a verified rename map
 * for files that still need to be renamed to SEO-friendly format.
 *
 * Usage:
 *   node scripts/build-verified-rename-map.js
 *
 * Input:  scripts/server-file-inventory.txt (from `find /var/www/lcs-media/samples -type f -name '*.webp'`)
 * Output: scripts/verified-rename-map.json   (old relative path -> new relative path)
 *         scripts/server-files-already-seo.txt (files already in SEO format)
 *         scripts/server-files-need-rename.txt (files that need renaming)
 */

const fs = require('fs');
const path = require('path');

const INVENTORY_FILE = path.join(__dirname, 'server-file-inventory.txt');
const OUTPUT_MAP = path.join(__dirname, 'verified-rename-map.json');
const OUTPUT_ALREADY_SEO = path.join(__dirname, 'server-files-already-seo.txt');
const OUTPUT_NEED_RENAME = path.join(__dirname, 'server-files-need-rename.txt');
const SAMPLES_PREFIX = '/var/www/lcs-media/samples/';

function normalizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '-')        // spaces -> hyphens
    .replace(/_/g, '-')          // underscores -> hyphens
    .replace(/\((\d+)\)/g, '$1') // "(1)" -> "1"
    .replace(/[()]/g, '')        // remove remaining parens
    .replace(/-+/g, '-')         // collapse multiple hyphens
    .replace(/-\./g, '.')        // remove trailing hyphen before extension
    .replace(/\.-/g, '.')        // fix ".-" patterns
    .trim();
}

function main() {
  if (!fs.existsSync(INVENTORY_FILE)) {
    console.error(`ERROR: ${INVENTORY_FILE} not found. Run the server inventory command first.`);
    process.exit(1);
  }

  const lines = fs.readFileSync(INVENTORY_FILE, 'utf-8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  console.log(`Loaded ${lines.length} files from server inventory`);

  const renameMap = {};
  const alreadySeo = [];
  const needRename = [];
  const collisions = {};

  for (const fullPath of lines) {
    // Strip prefix to get relative path like "danish/addition/Sjov Addition 1.webp"
    const relPath = fullPath.startsWith(SAMPLES_PREFIX)
      ? fullPath.slice(SAMPLES_PREFIX.length)
      : fullPath;

    // Split into dir + filename
    const lastSlash = relPath.lastIndexOf('/');
    const dir = relPath.substring(0, lastSlash);
    const filename = relPath.substring(lastSlash + 1);

    const seoFilename = normalizeFilename(filename);
    const seoPath = `${dir}/${seoFilename}`;

    if (filename === seoFilename) {
      alreadySeo.push(relPath);
    } else {
      // Check for collisions
      if (collisions[seoPath]) {
        console.warn(`  COLLISION: "${relPath}" and "${collisions[seoPath]}" both normalize to "${seoPath}"`);
      } else {
        collisions[seoPath] = relPath;
        renameMap[relPath] = seoPath;
        needRename.push(`${relPath}  ->  ${seoPath}`);
      }
    }
  }

  // Write outputs
  fs.writeFileSync(OUTPUT_MAP, JSON.stringify(renameMap, null, 2));
  fs.writeFileSync(OUTPUT_ALREADY_SEO, alreadySeo.join('\n'));
  fs.writeFileSync(OUTPUT_NEED_RENAME, needRename.join('\n'));

  console.log(`\n=== Summary ===`);
  console.log(`  Total files:        ${lines.length}`);
  console.log(`  Already SEO-ready:  ${alreadySeo.length}`);
  console.log(`  Need renaming:      ${Object.keys(renameMap).length}`);
  console.log(`  Collisions:         ${Object.keys(collisions).length - Object.keys(renameMap).length}`);
  console.log(`\nOutputs:`);
  console.log(`  Rename map:         ${OUTPUT_MAP}`);
  console.log(`  Already SEO:        ${OUTPUT_ALREADY_SEO}`);
  console.log(`  Need rename list:   ${OUTPUT_NEED_RENAME}`);
}

main();
