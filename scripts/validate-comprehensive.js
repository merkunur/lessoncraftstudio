#!/usr/bin/env node
/**
 * validate-comprehensive.js
 *
 * Comprehensively validates ALL image references across the entire codebase
 * against the actual server file inventory. Uses simple string matching
 * instead of complex regex parsing.
 *
 * Checks: ALL .ts/.tsx files under frontend/ for /samples/ paths
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INVENTORY_FILE = path.join(__dirname, 'server-file-inventory.txt');
const SAMPLES_PREFIX = '/var/www/lcs-media/samples/';

function loadServerInventory() {
  const lines = fs.readFileSync(INVENTORY_FILE, 'utf-8')
    .split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const files = new Set();
  for (const line of lines) {
    const rel = line.startsWith(SAMPLES_PREFIX) ? line.slice(SAMPLES_PREFIX.length) : line;
    files.add(rel);
  }
  return files;
}

function walkDir(dir, exts) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.next' && e.name !== '.git') {
        results.push(...walkDir(full, exts));
      } else if (exts.some(ext => e.name.endsWith(ext))) {
        results.push(full);
      }
    }
  } catch {}
  return results;
}

function main() {
  console.log('Loading server inventory...');
  const serverFiles = loadServerInventory();
  console.log(`  ${serverFiles.size} files on server\n`);

  const frontendDir = path.join(ROOT, 'frontend');
  const files = walkDir(frontendDir, ['.ts', '.tsx']);
  console.log(`Scanning ${files.length} TypeScript files...\n`);

  let totalRefs = 0;
  let validRefs = 0;
  let brokenRefs = 0;
  const brokenDetails = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relFile = path.relative(ROOT, file);

    // Find ALL /samples/ paths in the file
    // Match: /samples/{lang}/{folder}/{filename}.webp
    // Handle both encoded (%20) and plain paths
    const pattern = /\/samples\/([a-z]+)\/([^'"\s,`]+)\.webp/g;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      totalRefs++;
      const fullMatch = match[0]; // e.g., /samples/english/addition/addition-fun-1.webp
      // Strip /samples/ prefix
      const serverPath = fullMatch.substring('/samples/'.length);

      // Decode URL encoding
      let decoded;
      try {
        decoded = decodeURIComponent(serverPath);
      } catch {
        decoded = serverPath;
      }

      if (serverFiles.has(decoded)) {
        validRefs++;
      } else {
        brokenRefs++;
        brokenDetails.push({ file: relFile, path: decoded, fullMatch });
      }
    }
  }

  console.log(`=== RESULTS ===`);
  console.log(`  Total references: ${totalRefs}`);
  console.log(`  Valid:            ${validRefs}`);
  console.log(`  BROKEN:           ${brokenRefs}`);

  if (brokenRefs > 0) {
    console.log(`\n=== BROKEN REFERENCES ===\n`);
    // Group by file
    const byFile = {};
    for (const b of brokenDetails) {
      if (!byFile[b.file]) byFile[b.file] = [];
      byFile[b.file].push(b);
    }
    for (const [file, refs] of Object.entries(byFile)) {
      console.log(`${file}:`);
      for (const r of refs) {
        // Find available files in the same directory
        const parts = r.path.split('/');
        const dir = parts.slice(0, -1).join('/');
        const available = [];
        for (const sf of serverFiles) {
          if (sf.startsWith(dir + '/') && sf.split('/').length === parts.length) {
            available.push(sf.split('/').pop());
          }
        }
        console.log(`  MISSING: ${r.path}`);
        if (available.length > 0 && available.length <= 15) {
          console.log(`    Available: ${available.join(', ')}`);
        }
      }
    }
  }

  // Write results
  fs.writeFileSync(path.join(__dirname, 'broken-image-refs.json'), JSON.stringify(brokenDetails, null, 2));
  console.log(`\nResults saved to scripts/broken-image-refs.json`);
}

main();
