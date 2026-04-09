#!/usr/bin/env node
/**
 * apply-image-rename.js
 *
 * Reads the rename map from scripts/image-rename-map.json and:
 * 1. Updates all TypeScript config files that reference old .webp filenames
 * 2. Validates no broken references remain
 *
 * This does NOT rename actual files — that happens on the server via
 * scripts/rename-samples-server.sh
 *
 * Usage:
 *   node scripts/apply-image-rename.js              # Dry run (default)
 *   node scripts/apply-image-rename.js --apply       # Actually modify files
 *   node scripts/apply-image-rename.js --validate    # Only validate, no changes
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const mode = process.argv[2] || '--dry-run';

// Recursively find all .ts/.tsx files that contain .webp references
const FRONTEND = path.join(ROOT, 'frontend');
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

const FILES_TO_UPDATE = findAllWebpReferencingFiles(FRONTEND);

function main() {
  const mapPath = path.join(ROOT, 'scripts', 'image-rename-map.json');
  if (!fs.existsSync(mapPath)) {
    console.error('ERROR: image-rename-map.json not found. Run generate-image-rename-map.js first.');
    process.exit(1);
  }

  const renameMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
  const entries = Object.entries(renameMap);
  console.log(`Loaded rename map with ${entries.length} entries`);

  if (mode === '--validate') {
    validate(renameMap);
    return;
  }

  // Sort by length descending to avoid partial replacements
  // (e.g., "Word Search 1.webp" shouldn't partially match inside "Word Search 10.webp")
  entries.sort((a, b) => b[0].length - a[0].length);

  let totalReplacements = 0;
  let filesModified = 0;

  for (const relPath of FILES_TO_UPDATE) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) {
      console.warn(`  SKIP (not found): ${relPath}`);
      continue;
    }

    let content = fs.readFileSync(absPath, 'utf-8');
    let fileReplacements = 0;

    for (const [oldName, newName] of entries) {
      // Escape special regex chars in the old filename
      const escaped = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Match the filename in quotes (single or double), preserving surrounding context
      const regex = new RegExp(escaped, 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, newName);
        fileReplacements += matches.length;
      }
    }

    if (fileReplacements > 0) {
      filesModified++;
      totalReplacements += fileReplacements;
      console.log(`  ${relPath}: ${fileReplacements} replacements`);

      if (mode === '--apply') {
        fs.writeFileSync(absPath, content, 'utf-8');
      }
    }
  }

  console.log(`\n${mode === '--apply' ? 'APPLIED' : 'DRY RUN'}: ${totalReplacements} replacements across ${filesModified} files`);

  if (mode !== '--apply') {
    console.log('\nTo apply changes, run: node scripts/apply-image-rename.js --apply');
  } else {
    console.log('\nRunning validation...');
    validate(renameMap);
  }
}

function validate(renameMap) {
  const oldNames = new Set(Object.keys(renameMap));
  let brokenRefs = 0;

  for (const relPath of FILES_TO_UPDATE) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) continue;

    const content = fs.readFileSync(absPath, 'utf-8');
    for (const oldName of oldNames) {
      if (content.includes(oldName)) {
        console.warn(`  BROKEN REF: "${oldName}" still found in ${relPath}`);
        brokenRefs++;
      }
    }
  }

  if (brokenRefs === 0) {
    console.log('Validation PASSED: No old filenames found in config files');
  } else {
    console.error(`Validation FAILED: ${brokenRefs} old filename references still present`);
    process.exit(1);
  }
}

main();
