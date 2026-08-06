#!/usr/bin/env node
/**
 * fix-image-library-refs.js
 *
 * Fixes all broken image-library references by restoring original filenames
 * that match the actual server files (which were NOT renamed during SEO fix).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Replacement map: broken filename → correct filename (URL-encoded where needed)
const FILENAME_FIXES = {
  // Hyphenated back to space (URL-encoded)
  'cat-2.webp': 'cat%202.webp',
  'bell-pepper.webp': 'bell%20pepper.webp',
  'alarm-clock.webp': 'alarm%20clock.webp',
  'candy-cane.webp': 'candy%20cane.webp',
  'fire-truck.webp': 'fire%20truck.webp',
  'watering-can.webp': 'watering%20can.webp',
  'tyrannosaurus-rex.webp': 'tyrannosaurus%20rex.webp',
  // Case fixes
  'earth.webp': 'Earth.webp',
  'jupiter.webp': 'Jupiter.webp',
  'santa.webp': 'Santa.webp',
};

// Folder fixes: wrong folder → correct folder
const FOLDER_FIXES = [
  { from: '/image-library/kitchen/', to: '/image-library/kitchen%20tools/' },
  { from: '/image-library/food/apple', to: '/image-library/fruits/apple' },
  { from: '/image-library/food/banana', to: '/image-library/fruits/banana' },
  { from: '/image-library/food/strawberry', to: '/image-library/fruits/strawberry' },
];

// Full path fixes for non-existent images
const PATH_FIXES = [
  // butterfly is in 'insects and bugs', not 'animals'
  { from: '/image-library/animals/butterfly.webp', to: '/image-library/insects%20and%20bugs/butterfly.webp' },
  // cheetah doesn't exist - use leopard
  { from: '/image-library/animals/cheetah.webp', to: '/image-library/animals/leopard.webp' },
  // bear doesn't exist in animals - check what's available
  { from: '/image-library/animals/bear.webp', to: '/image-library/animals/koala.webp' },
  // lightning doesn't exist in weather - use cloud
  { from: '/image-library/weather/lightning.webp', to: '/image-library/weather/rainbow.webp' },
];

// Seagull→butterfly fix: only when caption contains butterfly-related words
const BUTTERFLY_CAPTIONS = [
  'butterfly', 'sommerfugl', 'schmetterling', 'mariposa', 'papillon',
  'farfalla', 'vlinder', 'fjäril', 'perhonen', 'borboleta'
];

function walkDir(dir, exts) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.next') results.push(...walkDir(full, exts));
      else if (exts.some(ext => e.name.endsWith(ext))) results.push(full);
    }
  } catch {}
  return results;
}

function main() {
  const dirs = [
    path.join(ROOT, 'frontend/config'),
    path.join(ROOT, 'frontend/app'),
    path.join(ROOT, 'frontend/lib'),
  ];

  let totalFiles = 0;
  let fixedFiles = 0;
  let totalChanges = 0;

  for (const dir of dirs) {
    const files = walkDir(dir, ['.ts', '.tsx']);
    for (const file of files) {
      totalFiles++;
      let content = fs.readFileSync(file, 'utf-8');
      let original = content;
      let changes = 0;

      // 1. Fix filenames (only in image-library paths)
      for (const [broken, correct] of Object.entries(FILENAME_FIXES)) {
        // Only replace within image-library paths
        const pattern = new RegExp(`(image-library/[^'"]*/)${broken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
        const before = content;
        content = content.replace(pattern, `$1${correct}`);
        if (content !== before) changes++;
      }

      // 2. Fix folder paths
      for (const fix of FOLDER_FIXES) {
        if (content.includes(fix.from)) {
          content = content.split(fix.from).join(fix.to);
          changes++;
        }
      }

      // 3. Fix full path replacements
      for (const fix of PATH_FIXES) {
        if (content.includes(fix.from)) {
          content = content.split(fix.from).join(fix.to);
          changes++;
        }
      }

      // 4. Fix seagull→butterfly: only when caption indicates butterfly
      if (content.includes('animals/seagull.webp')) {
        const lines = content.split('\n');
        let modified = false;
        for (let i = 0; i < lines.length; i++) {
          if (!lines[i].includes('animals/seagull.webp')) continue;
          // Check next 2 lines for butterfly-related captions
          const block = lines.slice(i, i + 3).join(' ').toLowerCase();
          const isButterfly = BUTTERFLY_CAPTIONS.some(cap => block.includes(cap));
          if (isButterfly) {
            lines[i] = lines[i].replace(
              /\/image-library\/animals\/seagull\.webp/g,
              '/image-library/insects%20and%20bugs/butterfly.webp'
            );
            // Also fix the alt text
            lines[i] = lines[i].replace(/alt:\s*'Butterfly\s*--\s*themed/g, "alt: 'Butterfly — themed");
            modified = true;
            changes++;
          }
        }
        if (modified) content = lines.join('\n');
      }

      // 5. Fix caption for replaced images (cheetah→leopard, bear→koala)
      if (content.includes('animals/leopard.webp')) {
        // Only fix caption if it says "Cheetah"
        content = content.replace(
          /animals\/leopard\.webp(['"][^}]*?)caption:\s*(['"])Cheetah\2/g,
          "animals/leopard.webp$1caption: $2Leopard$2"
        );
      }
      if (content.includes('animals/koala.webp')) {
        content = content.replace(
          /animals\/koala\.webp(['"][^}]*?)caption:\s*(['"])Bear\2/g,
          "animals/koala.webp$1caption: $2Koala$2"
        );
      }

      if (content !== original) {
        fs.writeFileSync(file, content);
        fixedFiles++;
        totalChanges += changes;
        console.log(`  FIXED: ${path.relative(ROOT, file)} (${changes} changes)`);
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Files scanned: ${totalFiles}`);
  console.log(`  Files fixed:   ${fixedFiles}`);
  console.log(`  Total changes: ${totalChanges}`);
}

main();
