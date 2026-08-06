#!/usr/bin/env node
/**
 * Fix broken image library links: hyphenated filenames → URL-encoded spaces
 *
 * Server files use spaces (e.g., "cat 2.webp") but content files reference
 * them with hyphens (e.g., "cat-2.webp"). Since folder names already use %20,
 * we fix filenames to use %20 as well.
 */

const fs = require('fs');
const path = require('path');

// Map of broken filename → correct filename (with %20 for spaces)
const filenameReplacements = {
  'cat-2.webp': 'cat%202.webp',
  'baby-girl.webp': 'baby%20girl.webp',
  'candy-cane.webp': 'candy%20cane.webp',
  'beach-ball.webp': 'beach%20ball.webp',
  'baseball-2.webp': 'baseball%202.webp',
  'bell-pepper.webp': 'bell%20pepper.webp',
  'alarm-clock.webp': 'alarm%20clock.webp',
  'caulking-gun.webp': 'caulking%20gun.webp',
  'electric-drill.webp': 'electric%20drill.webp',
  'extension-cord.webp': 'extension%20cord.webp',
};

const contentDirs = [
  'frontend/config/app-content',
  'frontend/config/bundle-content',
  'frontend/config/guide-content',
  'frontend/config/idea-content',
  'frontend/config/start-content',
  'frontend/config/tool-content',
];

let totalFiles = 0;
let totalReplacements = 0;

function walkDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      files.push(full);
    }
  }
  return files;
}

for (const dir of contentDirs) {
  const files = walkDir(dir);
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    let fileReplacements = 0;

    for (const [broken, fixed] of Object.entries(filenameReplacements)) {
      if (content.includes(broken)) {
        // Only replace in image-library paths (not in other contexts)
        const regex = new RegExp(broken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = content.match(regex);
        if (matches) {
          content = content.replace(regex, fixed);
          fileReplacements += matches.length;
          modified = true;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      totalFiles++;
      totalReplacements += fileReplacements;
      console.log(`  Fixed ${fileReplacements} reference(s) in ${file}`);
    }
  }
}

console.log(`\nDone: ${totalReplacements} replacements across ${totalFiles} files`);
