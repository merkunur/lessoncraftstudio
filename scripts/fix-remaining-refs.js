#!/usr/bin/env node
/**
 * fix-remaining-refs.js
 *
 * Fixes remaining broken image references by:
 * 1. Replacing %20 in /samples/ paths with hyphens
 * 2. Replacing remaining underscores with hyphens in filenames
 * 3. Lowercasing remaining uppercase in filenames
 * 4. Collapsing multiple hyphens
 * 5. Fixing _key patterns → -key
 *
 * Processes ALL .ts files under frontend/config/ and frontend/app/
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

function normalizeImagePath(fullPath) {
  // Only process /samples/ paths
  if (!fullPath.includes('/samples/')) return fullPath;

  // Split into segments: /samples/lang/folder/filename
  const samplesIdx = fullPath.indexOf('/samples/');
  const prefix = fullPath.substring(0, samplesIdx + '/samples/'.length);
  const rest = fullPath.substring(samplesIdx + '/samples/'.length);

  // Split by /
  const parts = rest.split('/');
  if (parts.length < 3) return fullPath;

  const lang = parts[0];     // Keep as-is (always lowercase already)
  const folder = parts[1];   // Keep as-is (folders use spaces/encoded spaces on server)
  const filename = parts.slice(2).join('/'); // The actual filename

  // Decode the filename first
  let decoded;
  try {
    decoded = decodeURIComponent(filename);
  } catch {
    decoded = filename;
  }

  // Normalize the filename
  let normalized = decoded
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/\((\d+)\)/g, '$1')
    .replace(/[()]/g, '')
    .replace(/-+/g, '-')
    .replace(/-\./g, '.')
    .trim();

  // Re-encode the folder for the URL path (folders have spaces)
  let decodedFolder;
  try {
    decodedFolder = decodeURIComponent(folder);
  } catch {
    decodedFolder = folder;
  }

  // Reconstruct with encoded folder but normalized filename (no encoding needed for hyphens)
  return `${prefix}${lang}/${encodeURIComponent(decodedFolder)}/${normalized}`;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let updated = content;
  let changes = 0;

  // Find all /samples/ paths (in strings)
  const pathPattern = /(['"])\/samples\/([^'"]+)\1/g;
  let match;
  const replacements = [];

  while ((match = pathPattern.exec(content)) !== null) {
    const quote = match[1];
    const fullPath = '/samples/' + match[2];
    const normalized = normalizeImagePath(fullPath);
    if (normalized !== fullPath) {
      replacements.push({ from: match[0], to: `${quote}${normalized}${quote}` });
    }
  }

  // Also handle paths without surrounding quotes (in template literals etc)
  const barePathPattern = /\/samples\/[^\s'"`,)]+\.webp/g;
  while ((match = barePathPattern.exec(content)) !== null) {
    const fullPath = match[0];
    const normalized = normalizeImagePath(fullPath);
    if (normalized !== fullPath && !replacements.some(r => r.from.includes(fullPath))) {
      replacements.push({ from: fullPath, to: normalized });
    }
  }

  for (const { from, to } of replacements) {
    updated = updated.split(from).join(to);
    changes++;
  }

  if (changes > 0) {
    fs.writeFileSync(filePath, updated);
    return changes;
  }
  return 0;
}

function walkDir(dir, extensions) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        results.push(...walkDir(fullPath, extensions));
      }
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

function main() {
  console.log('Scanning for remaining broken image paths...\n');

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
      const changes = processFile(file);
      if (changes > 0) {
        fixedFiles++;
        totalChanges += changes;
        const rel = path.relative(ROOT, file);
        console.log(`  FIXED: ${rel} (${changes} changes)`);
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Total files scanned: ${totalFiles}`);
  console.log(`  Files fixed:         ${fixedFiles}`);
  console.log(`  Total changes:       ${totalChanges}`);
}

main();
