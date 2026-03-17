#!/usr/bin/env node
/**
 * Fix primaryKeyword alignment: ensure primaryKeyword appears in titleTag.
 * Strategy: replace primaryKeyword with the first segment of titleTag (before | or —),
 * lowercased. This is the most meaningful/searchable portion.
 *
 * Usage: node scripts/fix-keyword-alignment.js [--dry-run] [--locale de|fr|es]
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const localeArg = args.find(a => a.startsWith('--locale'));
const targetLocale = localeArg ? args[args.indexOf(localeArg) + 1] : null;

const BASE = path.join(__dirname, '..', 'frontend', 'config');
const CONTENT_TYPES = ['app-content', 'tool-content', 'bundle-content', 'start-content', 'guide-content', 'idea-content'];
const LOCALES = targetLocale ? [targetLocale] : ['de', 'fr', 'es'];

function extractStringField(content, fieldName) {
  const patterns = [
    new RegExp(`${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`),
    new RegExp(`${fieldName}:\\s*"((?:[^"\\\\]|\\\\.)*)"`)
  ];
  for (const re of patterns) {
    const m = content.match(re);
    if (m) return m[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
  }
  return null;
}

let fixed = 0;
let skipped = 0;
let errors = 0;

for (const locale of LOCALES) {
  for (const type of CONTENT_TYPES) {
    const dir = path.join(BASE, type, locale);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
    for (const file of files) {
      const filePath = path.join(dir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      const titleTag = extractStringField(content, 'titleTag');
      const primaryKeyword = extractStringField(content, 'primaryKeyword');

      if (!titleTag || !primaryKeyword) {
        skipped++;
        continue;
      }

      // Check if keyword already in title
      if (titleTag.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        skipped++;
        continue;
      }

      // Generate new keyword from title's first segment
      const newKeyword = titleTag.split(/\s*[|—–:]\s*/)[0].trim().toLowerCase();

      if (!newKeyword || newKeyword.length < 5) {
        console.log(`  SKIP (too short): ${type}/${locale}/${file} → "${newKeyword}"`);
        errors++;
        continue;
      }

      // Verify new keyword appears in title
      if (!titleTag.toLowerCase().includes(newKeyword)) {
        console.log(`  ERROR: candidate "${newKeyword}" not in title "${titleTag}"`);
        errors++;
        continue;
      }

      if (dryRun) {
        console.log(`  WOULD FIX: ${type}/${locale}/${file}`);
        console.log(`    old: "${primaryKeyword}"`);
        console.log(`    new: "${newKeyword}"`);
        fixed++;
        continue;
      }

      // Replace in file - find the exact primaryKeyword line and replace
      // Need to handle both single and double quoted
      let newContent = content;
      const singleQuotePattern = new RegExp(`(primaryKeyword:\\s*)'((?:[^'\\\\]|\\\\.)*)'`);
      const doubleQuotePattern = new RegExp(`(primaryKeyword:\\s*)"((?:[^"\\\\]|\\\\.)*)"`)

      const sm = newContent.match(singleQuotePattern);
      const dm = newContent.match(doubleQuotePattern);

      if (sm) {
        // Escape single quotes in new keyword
        const escaped = newKeyword.replace(/'/g, "\\'");
        newContent = newContent.replace(singleQuotePattern, `$1'${escaped}'`);
      } else if (dm) {
        const escaped = newKeyword.replace(/"/g, '\\"');
        newContent = newContent.replace(doubleQuotePattern, `$1"${escaped}"`);
      } else {
        console.log(`  ERROR: couldn't find primaryKeyword pattern in ${type}/${locale}/${file}`);
        errors++;
        continue;
      }

      fs.writeFileSync(filePath, newContent, 'utf-8');
      fixed++;
    }
  }
}

console.log(`\n${dryRun ? 'DRY RUN' : 'DONE'}: ${fixed} fixed, ${skipped} already OK, ${errors} errors`);
