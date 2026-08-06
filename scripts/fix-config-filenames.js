#!/usr/bin/env node
/**
 * fix-config-filenames.js
 *
 * For every file changed by commit 555a903c, this script:
 * 1. Reads the ORIGINAL version (from parent commit 895762f5)
 * 2. Reads the CURRENT version
 * 3. Extracts all .webp filenames from the ORIGINAL
 * 4. Normalizes each filename using the SAME rules as the server rename
 * 5. In the CURRENT file, replaces any .webp filename with the correct normalized version
 *
 * This ensures configs match the post-rename server filenames.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PARENT_COMMIT = '895762f5';  // The commit BEFORE the broken rename

// The SAME normalization used for server rename
function normalizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/\((\d+)\)/g, '$1')
    .replace(/[()]/g, '')
    .replace(/-+/g, '-')
    .replace(/-\./g, '.')
    .replace(/\.-/g, '.')
    .trim();
}

// Load the post-rename server inventory for validation
function loadServerInventory() {
  const invFile = path.join(__dirname, 'server-file-inventory.txt');
  const lines = fs.readFileSync(invFile, 'utf-8').split('\n').filter(l => l.trim());
  const files = new Set();
  const prefix = '/var/www/lcs-media/samples/';
  for (const line of lines) {
    const rel = line.startsWith(prefix) ? line.slice(prefix.length) : line;
    // Store just the filename (last segment) for quick lookup
    const parts = rel.split('/');
    files.add(rel);
  }
  return files;
}

// Get list of files changed by the broken commit
function getChangedFiles() {
  const output = execSync(
    `git diff --name-only ${PARENT_COMMIT}..555a903c -- "*.ts" "*.tsx"`,
    { cwd: ROOT, encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
  );
  return output.split('\n').filter(f => f.trim());
}

// Get original file content from git
function getOriginalContent(filePath) {
  try {
    return execSync(
      `git show ${PARENT_COMMIT}:${filePath}`,
      { cwd: ROOT, encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    );
  } catch {
    return null; // File didn't exist before
  }
}

// Extract all .webp filenames from content
function extractWebpFilenames(content) {
  const filenames = new Set();
  // Match any string containing .webp
  const patterns = [
    /['"]([^'"]*\.webp)['"]/g,        // 'filename.webp' or "filename.webp"
    /\/([^/'"]+\.webp)/g,             // /path/filename.webp
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const raw = match[1];
      // Extract just the filename (last path segment)
      const filename = raw.includes('/') ? raw.split('/').pop() : raw;
      if (filename && filename.endsWith('.webp')) {
        // Decode URL encoding
        try {
          filenames.add(decodeURIComponent(filename));
        } catch {
          filenames.add(filename);
        }
      }
    }
  }
  return filenames;
}

function main() {
  console.log('Loading server inventory...');
  const serverFiles = loadServerInventory();
  console.log(`  ${serverFiles.size} files on server\n`);

  console.log('Getting changed files from commit 555a903c...');
  const changedFiles = getChangedFiles();
  console.log(`  ${changedFiles.length} files changed\n`);

  // Build the master replacement map: original filename → normalized filename
  // AND original filename (URL-encoded) → normalized filename
  // AND any other variant → normalized filename
  const masterMap = new Map(); // Maps various forms to the normalized version

  let filesProcessed = 0;
  let filesSkipped = 0;
  let totalReplacements = 0;

  for (const filePath of changedFiles) {
    // Skip non-content/config files
    if (filePath.startsWith('scripts/') || filePath.includes('node_modules')) {
      continue;
    }

    const fullPath = path.join(ROOT, filePath);
    if (!fs.existsSync(fullPath)) continue;

    const originalContent = getOriginalContent(filePath);
    if (!originalContent) {
      filesSkipped++;
      continue;
    }

    const currentContent = fs.readFileSync(fullPath, 'utf-8');

    // Extract original filenames
    const originalFilenames = extractWebpFilenames(originalContent);

    // Build replacement map for this file
    const replacements = new Map();

    for (const origFilename of originalFilenames) {
      const normalized = normalizeFilename(origFilename);
      if (origFilename === normalized) continue; // Already normalized

      // The broken commit may have partially normalized (e.g., lowercased but kept spaces)
      // We need to find what the current file has and replace it with the correct normalized form
      const currentVariants = [
        origFilename,                                    // Original: "Additionsspa 1.webp"
        origFilename.toLowerCase(),                      // Lowercased: "additionsspa 1.webp"
        encodeURIComponent(origFilename),                // Encoded original
        encodeURIComponent(origFilename.toLowerCase()),  // Encoded lowercased
        origFilename.replace(/\s+/g, '%20'),             // Space→%20 original
        origFilename.toLowerCase().replace(/\s+/g, '%20'), // Space→%20 lowercased
      ];

      for (const variant of currentVariants) {
        if (currentContent.includes(variant) && variant !== normalized) {
          replacements.set(variant, normalized);
        }
      }
    }

    if (replacements.size === 0) {
      filesSkipped++;
      continue;
    }

    // Apply replacements
    let updatedContent = currentContent;
    for (const [from, to] of replacements) {
      // Use replaceAll to catch all instances
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      updatedContent = updatedContent.replace(new RegExp(escaped, 'g'), to);
    }

    if (updatedContent !== currentContent) {
      fs.writeFileSync(fullPath, updatedContent);
      filesProcessed++;
      totalReplacements += replacements.size;
      console.log(`  FIXED: ${filePath} (${replacements.size} replacements)`);
    } else {
      filesSkipped++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Files fixed:     ${filesProcessed}`);
  console.log(`  Files skipped:   ${filesSkipped}`);
  console.log(`  Total replacements: ${totalReplacements}`);
}

main();
