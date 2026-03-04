#!/usr/bin/env node
/**
 * verify-all-slugs.js — Slug Validation Across All Page Types
 *
 * Loads all 6 slug config files and validates:
 * 1. Every slug matches /^[a-z0-9]+(-[a-z0-9]+)*$/
 * 2. No diacritics leak into slugs
 * 3. No cross-page-type slug collisions
 * 4. No duplicate slugs within the same locale+page-type
 * 5. Reports untranslated English slugs in non-EN locales
 *
 * Run: node scripts/verify-all-slugs.js
 */

const fs = require('fs');
const path = require('path');

const SLUG_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DIACRITIC_REGEX = /[^\x00-\x7F]/;
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

// We parse the TS files directly since we can't import them in plain Node
function extractSlugsFromFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  SKIP: ${path.basename(filePath)} not found`);
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const results = [];

  // Extract the array name and items using regex
  // Pattern: { appId/toolId/bundleId/guideId/ideaId: 'xxx', slugs: { en: 'xxx', ... } }
  const idFieldMatch = content.match(/(\w+Id):\s*['"]([^'"]+)['"]/g);
  const slugBlockRegex = /(\w+Id):\s*['"]([^'"]+)['"],\s*\n\s*slugs:\s*\{([^}]+)\}/g;

  let match;
  while ((match = slugBlockRegex.exec(content)) !== null) {
    const idField = match[1];
    const idValue = match[2];
    const slugBlock = match[3];

    const slugEntries = {};
    const slugPairs = slugBlock.matchAll(/(\w+):\s*['"]([^'"]+)['"]/g);
    for (const pair of slugPairs) {
      slugEntries[pair[1]] = pair[2];
    }

    results.push({ id: idValue, idField, slugs: slugEntries });
  }

  return results;
}

function main() {
  const configDir = path.join(__dirname, '..', 'frontend', 'config');

  const slugFiles = [
    { name: 'App Detail',    file: 'product-page-slugs.ts', route: '/apps/' },
    { name: 'Free Tool',     file: 'tool-page-slugs.ts',    route: '/tools/' },
    { name: 'Bundle',        file: 'bundle-page-slugs.ts',  route: '/bundles/' },
    { name: 'Cornerstone',   file: 'start-page-slugs.ts',   route: '/start/' },
    { name: 'Create X Guide',file: 'guide-page-slugs.ts',   route: '/guides/' },
    { name: 'Niche Ideas',   file: 'idea-page-slugs.ts',    route: '/ideas/' },
  ];

  let errors = 0;
  let warnings = 0;

  // Collect ALL slugs across all types for cross-type collision check
  // Key: `${locale}:${slug}`, Value: `${pageType}:${id}`
  const globalSlugMap = new Map();

  console.log('='.repeat(60));
  console.log('  SLUG VALIDATION REPORT');
  console.log('='.repeat(60));
  console.log();

  for (const sf of slugFiles) {
    const filePath = path.join(configDir, sf.file);
    console.log(`--- ${sf.name} (${sf.file}) ---`);

    const entries = extractSlugsFromFile(filePath);
    if (entries.length === 0) {
      console.log('  No entries found or file missing.\n');
      continue;
    }

    console.log(`  Found ${entries.length} entries.`);

    // Per-locale slug uniqueness within this page type
    const localeSlugMap = new Map(); // locale -> Map<slug, id>

    for (const entry of entries) {
      for (const [locale, slug] of Object.entries(entry.slugs)) {
        if (!LOCALES.includes(locale)) continue;

        // Check 1: Valid slug format
        if (!SLUG_REGEX.test(slug)) {
          console.log(`  ERROR: Invalid slug format: ${locale}:${slug} (${entry.id})`);
          errors++;
        }

        // Check 2: No diacritics
        if (DIACRITIC_REGEX.test(slug)) {
          console.log(`  ERROR: Diacritics in slug: ${locale}:${slug} (${entry.id})`);
          errors++;
        }

        // Check 3: Slug length
        if (slug.length > 60) {
          console.log(`  WARN: Slug > 60 chars: ${locale}:${slug} (${slug.length} chars, ${entry.id})`);
          warnings++;
        }

        // Check 4: No consecutive hyphens
        if (slug.includes('--')) {
          console.log(`  ERROR: Consecutive hyphens: ${locale}:${slug} (${entry.id})`);
          errors++;
        }

        // Check 5: Per-type uniqueness
        if (!localeSlugMap.has(locale)) localeSlugMap.set(locale, new Map());
        const lsm = localeSlugMap.get(locale);
        if (lsm.has(slug)) {
          console.log(`  ERROR: Duplicate slug within ${sf.name}: ${locale}:${slug} (${entry.id} vs ${lsm.get(slug)})`);
          errors++;
        } else {
          lsm.set(slug, entry.id);
        }

        // Check 6: Cross-type collision
        const globalKey = `${locale}:${slug}`;
        if (globalSlugMap.has(globalKey)) {
          console.log(`  ERROR: Cross-type slug collision: ${locale}:${slug}`);
          console.log(`    - ${globalSlugMap.get(globalKey)}`);
          console.log(`    - ${sf.name}:${entry.id}`);
          errors++;
        } else {
          globalSlugMap.set(globalKey, `${sf.name}:${entry.id}`);
        }
      }

      // Check 7: Untranslated slugs (non-EN locale using the EN slug)
      const enSlug = entry.slugs.en;
      if (enSlug) {
        for (const locale of LOCALES) {
          if (locale === 'en') continue;
          const locSlug = entry.slugs[locale];
          if (locSlug && locSlug === enSlug) {
            console.log(`  WARN: ${locale.toUpperCase()} slug identical to EN: ${locSlug} (${entry.id}) — may be untranslated`);
            warnings++;
          }
        }
      }
    }

    console.log();
  }

  // Summary
  console.log('='.repeat(60));
  console.log(`  RESULT: ${errors} errors, ${warnings} warnings`);
  if (errors === 0) {
    console.log('  STATUS: PASS');
  } else {
    console.log('  STATUS: FAIL — fix errors before building');
  }
  console.log('='.repeat(60));

  process.exit(errors > 0 ? 1 : 0);
}

main();
