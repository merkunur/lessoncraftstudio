#!/usr/bin/env node
/**
 * generate-image-rename-map.js
 *
 * Scans all config files that reference sample worksheet images (.webp)
 * and generates a JSON mapping of old filenames -> new SEO-friendly filenames.
 *
 * New naming convention:
 *   - All lowercase
 *   - Spaces and underscores become hyphens
 *   - Collapse multiple hyphens
 *   - Remove parenthetical suffixes like (1), (2) and merge into base name
 *   - Trim leading/trailing hyphens
 *   - Keep localized names (German, French, etc.) just normalized
 *
 * Output: scripts/image-rename-map.json
 *
 * Usage: node scripts/generate-image-rename-map.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');

// Recursively find all .ts/.tsx files that contain .webp references
function findAllWebpReferencingFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.next' || entry.name === 'node_modules') continue;
      findAllWebpReferencingFiles(fullPath, results);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes('.webp')) {
          results.push(path.relative(ROOT, fullPath).replace(/\\/g, '/'));
        }
      } catch {}
    }
  }
  return results;
}

const CONFIG_FILES = findAllWebpReferencingFiles(FRONTEND);

// Extract all .webp filenames from a file
function extractWebpFilenames(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filenames = new Set();

  // Match quoted strings ending in .webp
  const regex = /['"]([^'"]*\.webp)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let name = match[1];
    // Strip any path prefix — we only want the filename
    const lastSlash = name.lastIndexOf('/');
    if (lastSlash !== -1) {
      name = name.substring(lastSlash + 1);
    }
    // Skip bogus matches (regex artifacts from template literals, etc.)
    if (name.includes(')}') || name.includes('${') || name.length < 3) continue;
    filenames.add(name);
  }
  return filenames;
}

// Normalize a filename to SEO-friendly format
function normalizeFilename(original) {
  let name = original;

  // Remove .webp extension for processing
  name = name.replace(/\.webp$/, '');

  // Handle parenthetical numbers like (1), (2) etc.
  // Pattern: "base (N)" -> "base-N"
  name = name.replace(/\s*\((\d+)\)/g, '-$1');

  // Replace underscores and spaces with hyphens
  name = name.replace(/[_ ]+/g, '-');

  // Lowercase
  name = name.toLowerCase();

  // Collapse multiple hyphens
  name = name.replace(/-{2,}/g, '-');

  // Trim leading/trailing hyphens
  name = name.replace(/^-+|-+$/g, '');

  // Re-add extension
  return name + '.webp';
}

// Main
function main() {
  const allFilenames = new Set();
  const fileSourceMap = {}; // filename -> which config files reference it

  for (const relPath of CONFIG_FILES) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) {
      console.warn(`  SKIP (not found): ${relPath}`);
      continue;
    }
    const names = extractWebpFilenames(absPath);
    for (const name of names) {
      allFilenames.add(name);
      if (!fileSourceMap[name]) fileSourceMap[name] = [];
      fileSourceMap[name].push(relPath);
    }
  }

  console.log(`Found ${allFilenames.size} unique .webp filenames across ${CONFIG_FILES.length} config files\n`);

  // Generate the rename map
  const renameMap = {};
  const newNameToOriginals = {}; // track which originals map to same new name
  let alreadyClean = 0;
  let renamed = 0;
  let collisions = 0;

  for (const original of [...allFilenames].sort()) {
    const normalized = normalizeFilename(original);

    if (normalized === original) {
      alreadyClean++;
      continue; // Already SEO-friendly, skip
    }

    // Check for collision — different originals mapping to same normalized name
    if (newNameToOriginals[normalized]) {
      const existingOriginal = newNameToOriginals[normalized];
      // Only a real collision if they're different originals (case-insensitive)
      if (existingOriginal.toLowerCase() !== original.toLowerCase()) {
        console.warn(`  COLLISION: "${original}" -> "${normalized}" (conflicts with "${existingOriginal}")`);
        collisions++;
        const deduped = normalized.replace(/\.webp$/, `-v${collisions}.webp`);
        renameMap[original] = deduped;
        newNameToOriginals[deduped] = original;
      } else {
        // Same filename different case — both map to same normalized name, that's fine
        renameMap[original] = normalized;
      }
    } else {
      renameMap[original] = normalized;
      newNameToOriginals[normalized] = original;
      renamed++;
    }
  }

  // Output stats
  console.log(`Results:`);
  console.log(`  Already clean (no rename needed): ${alreadyClean}`);
  console.log(`  To be renamed: ${renamed}`);
  console.log(`  Collisions resolved: ${collisions}`);
  console.log(`  Total unique filenames: ${allFilenames.size}`);

  // Write the map
  const outputPath = path.join(ROOT, 'scripts', 'image-rename-map.json');
  fs.writeFileSync(outputPath, JSON.stringify(renameMap, null, 2), 'utf-8');
  console.log(`\nRename map written to: ${outputPath}`);
  console.log(`  Entries: ${Object.keys(renameMap).length}`);

  // Also write a source reference (which files reference each filename)
  const sourcePath = path.join(ROOT, 'scripts', 'image-rename-sources.json');
  fs.writeFileSync(sourcePath, JSON.stringify(fileSourceMap, null, 2), 'utf-8');
  console.log(`Source map written to: ${sourcePath}`);

  // Show some examples
  console.log(`\nExamples:`);
  const examples = Object.entries(renameMap).slice(0, 15);
  for (const [old, renamed] of examples) {
    console.log(`  "${old}" -> "${renamed}"`);
  }
  if (Object.keys(renameMap).length > 15) {
    console.log(`  ... and ${Object.keys(renameMap).length - 15} more`);
  }
}

main();
