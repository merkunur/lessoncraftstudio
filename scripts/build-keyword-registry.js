#!/usr/bin/env node
/**
 * build-keyword-registry.js — Keyword Collision Detector
 *
 * Scans all content files for primaryKeyword fields.
 * Outputs scripts/keyword-registry.json for collision detection.
 *
 * Run: node scripts/build-keyword-registry.js
 */

const fs = require('fs');
const path = require('path');

const CONFIG_DIR = path.join(__dirname, '..', 'frontend', 'config');
const OUTPUT_FILE = path.join(__dirname, 'keyword-registry.json');
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

const CONTENT_DIRS = [
  'app-content',
  'tool-content',
  'bundle-content',
  'start-content',
  'guide-content',
  'idea-content',
];

function extractPrimaryKeyword(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Try to extract primaryKeyword from the file
    // Patterns: primaryKeyword: 'xxx' or primaryKeyword: "xxx" or primary: 'xxx'
    const patterns = [
      /primaryKeyword:\s*['"]([^'"]+)['"]/,
      /primary:\s*['"]([^'"]+)['"]/,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) return match[1].toLowerCase().trim();
    }

    return null;
  } catch {
    return null;
  }
}

function main() {
  const registry = {};
  let totalFiles = 0;
  let totalKeywords = 0;
  let collisions = 0;

  for (const locale of LOCALES) {
    registry[locale] = {};
  }

  for (const dir of CONTENT_DIRS) {
    for (const locale of LOCALES) {
      const localeDir = path.join(CONFIG_DIR, dir, locale);
      if (!fs.existsSync(localeDir)) continue;

      const files = fs.readdirSync(localeDir)
        .filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');

      for (const file of files) {
        const filePath = path.join(localeDir, file);
        const keyword = extractPrimaryKeyword(filePath);
        totalFiles++;

        if (keyword) {
          totalKeywords++;
          const relativePath = `${dir}/${locale}/${file}`;

          if (registry[locale][keyword]) {
            console.log(`  COLLISION: "${keyword}" in ${locale.toUpperCase()}`);
            console.log(`    - ${registry[locale][keyword]}`);
            console.log(`    - ${relativePath}`);
            collisions++;
          } else {
            registry[locale][keyword] = relativePath;
          }
        }
      }
    }
  }

  // Write registry
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));

  console.log('='.repeat(50));
  console.log('  KEYWORD REGISTRY');
  console.log('='.repeat(50));
  console.log(`  Files scanned: ${totalFiles}`);
  console.log(`  Keywords found: ${totalKeywords}`);
  console.log(`  Collisions: ${collisions}`);
  console.log(`  Output: ${OUTPUT_FILE}`);
  console.log('='.repeat(50));

  if (collisions > 0) {
    console.log('  STATUS: FAIL — fix keyword collisions');
    process.exit(1);
  } else {
    console.log('  STATUS: PASS');
  }
}

main();
