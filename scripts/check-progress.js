#!/usr/bin/env node
/**
 * check-progress.js — Content Pipeline Progress Tracker
 *
 * Scans content directories and reports what's done, what's next.
 * Run: node scripts/check-progress.js
 */

const fs = require('fs');
const path = require('path');

const CONFIG_DIR = path.join(__dirname, '..', 'frontend', 'config');
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

// Content directories and their expected counts per locale
const CONTENT_TYPES = [
  { name: 'App Detail',       dir: 'app-content',    expected: 33, phase: 'P1', type: 'app-detail' },
  { name: 'Free Tool',        dir: 'tool-content',   expected: 33, phase: 'P2', type: 'free-tool' },
  { name: 'Bundle',           dir: 'bundle-content', expected: 6,  phase: 'P3', type: 'bundle' },
  { name: 'Cornerstone Guide',dir: 'start-content',  expected: 12, phase: 'P4', type: 'cornerstone' },
  { name: 'Create X Guide',   dir: 'guide-content',  expected: 65, phase: 'P5', type: 'create-x' },
  { name: 'Niche Ideas',      dir: 'idea-content',   expected: 45, phase: 'P6', type: 'niche-ideas' },
];

// Phase 0 infrastructure items
const INFRA_ITEMS = [
  { name: 'sample-inventory.json',           check: () => fs.existsSync(path.join(__dirname, 'sample-inventory.json')) },
  { name: 'tool-page-slugs.ts',             check: () => fs.existsSync(path.join(CONFIG_DIR, 'tool-page-slugs.ts')) },
  { name: 'bundle-page-slugs.ts',           check: () => fs.existsSync(path.join(CONFIG_DIR, 'bundle-page-slugs.ts')) },
  { name: 'guide-page-slugs.ts',            check: () => fs.existsSync(path.join(CONFIG_DIR, 'guide-page-slugs.ts')) },
  { name: 'idea-page-slugs.ts',             check: () => fs.existsSync(path.join(CONFIG_DIR, 'idea-page-slugs.ts')) },
  { name: 'start-page-slugs.ts',            check: () => fs.existsSync(path.join(CONFIG_DIR, 'start-page-slugs.ts')) },
  { name: 'app-content/types.ts',           check: () => fs.existsSync(path.join(CONFIG_DIR, 'app-content', 'types.ts')) },
  { name: 'tool-content/types.ts',          check: () => fs.existsSync(path.join(CONFIG_DIR, 'tool-content', 'types.ts')) },
  { name: 'bundle-content/types.ts',        check: () => fs.existsSync(path.join(CONFIG_DIR, 'bundle-content', 'types.ts')) },
  { name: 'start-content/types.ts',         check: () => fs.existsSync(path.join(CONFIG_DIR, 'start-content', 'types.ts')) },
  { name: 'guide-content/types.ts',         check: () => fs.existsSync(path.join(CONFIG_DIR, 'guide-content', 'types.ts')) },
  { name: 'idea-content/types.ts',          check: () => fs.existsSync(path.join(CONFIG_DIR, 'idea-content', 'types.ts')) },
  { name: 'tools/[slug]/page.tsx route',    check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'tools', '[slug]', 'page.tsx')) },
  { name: 'bundles/[slug]/page.tsx route',  check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'bundles', '[slug]', 'page.tsx')) },
  { name: 'start/[slug]/page.tsx route',    check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'start', '[slug]', 'page.tsx')) },
  { name: 'guides/[slug]/page.tsx route',   check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'guides', '[slug]', 'page.tsx')) },
  { name: 'ideas/[slug]/page.tsx route',    check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'ideas', '[slug]', 'page.tsx')) },
  { name: 'tools listing page',             check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'tools', 'page.tsx')) },
  { name: 'bundles listing page',           check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'bundles', 'page.tsx')) },
  { name: 'start listing page',             check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'start', 'page.tsx')) },
  { name: 'guides listing page',            check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'guides', 'page.tsx')) },
  { name: 'ideas listing page',             check: () => fs.existsSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'ideas', 'page.tsx')) },
  { name: 'check-progress.js',              check: () => true },
  { name: 'validate-content.js',            check: () => fs.existsSync(path.join(__dirname, 'validate-content.js')) },
  { name: 'generate-content-skeleton.js',   check: () => fs.existsSync(path.join(__dirname, 'generate-content-skeleton.js')) },
  { name: 'build-keyword-registry.js',      check: () => fs.existsSync(path.join(__dirname, 'build-keyword-registry.js')) },
  { name: 'verify-all-slugs.js',            check: () => fs.existsSync(path.join(__dirname, 'verify-all-slugs.js')) },
];

function countContentFiles(contentDir, locale) {
  const localeDir = path.join(CONFIG_DIR, contentDir, locale);
  if (!fs.existsSync(localeDir)) return 0;
  return fs.readdirSync(localeDir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts').length;
}

function getContentFileNames(contentDir, locale) {
  const localeDir = path.join(CONFIG_DIR, contentDir, locale);
  if (!fs.existsSync(localeDir)) return [];
  return fs.readdirSync(localeDir)
    .filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts')
    .map(f => f.replace('.ts', ''));
}

function main() {
  console.log('='.repeat(70));
  console.log('  CONTENT PIPELINE PROGRESS REPORT');
  console.log('  ' + new Date().toISOString().slice(0, 10));
  console.log('='.repeat(70));
  console.log();

  // Phase 0: Infrastructure
  console.log('--- PHASE 0: Infrastructure ---');
  let infraDone = 0;
  for (const item of INFRA_ITEMS) {
    const done = item.check();
    if (done) infraDone++;
    console.log(`  ${done ? '[x]' : '[ ]'} ${item.name}`);
  }
  console.log(`  TOTAL: ${infraDone}/${INFRA_ITEMS.length}`);
  console.log();

  // Content phases
  let totalFiles = 0;
  let totalExpected = 0;

  for (const ct of CONTENT_TYPES) {
    console.log(`--- ${ct.phase}: ${ct.name} Pages ---`);

    for (const locale of LOCALES) {
      const count = countContentFiles(ct.dir, locale);
      const pct = ct.expected > 0 ? Math.round((count / ct.expected) * 100) : 0;
      const bar = '#'.repeat(Math.round(pct / 5)) + '.'.repeat(20 - Math.round(pct / 5));

      if (count > 0 || locale === 'en') {
        console.log(`  ${locale.toUpperCase()}: ${String(count).padStart(3)}/${ct.expected} [${bar}] ${pct}%`);
      }

      totalFiles += count;
      totalExpected += ct.expected;
    }
    console.log();
  }

  // Grand total
  console.log('='.repeat(70));
  const grandPct = totalExpected > 0 ? ((totalFiles / totalExpected) * 100).toFixed(1) : '0.0';
  console.log(`  GRAND TOTAL: ${totalFiles} / ${totalExpected} content files (${grandPct}%)`);
  console.log(`  Infrastructure: ${infraDone}/${INFRA_ITEMS.length}`);
  console.log('='.repeat(70));
  console.log();

  // Determine next action
  console.log('--- NEXT ACTION ---');

  if (infraDone < INFRA_ITEMS.length) {
    const missing = INFRA_ITEMS.filter(item => !item.check());
    console.log(`  Phase 0 incomplete. Missing ${missing.length} items:`);
    missing.forEach(m => console.log(`    - ${m.name}`));
  } else {
    // Find the first incomplete content phase
    for (const ct of CONTENT_TYPES) {
      for (const locale of LOCALES) {
        const count = countContentFiles(ct.dir, locale);
        if (count < ct.expected) {
          const existing = getContentFileNames(ct.dir, locale);
          const phaseLabel = locale === 'en'
            ? ct.phase
            : `P${7 + LOCALES.indexOf(locale) - 1}`;

          console.log(`  ${phaseLabel}-${locale.toUpperCase()}: ${ct.name} — ${count}/${ct.expected} done`);

          // Only show next items for English (other locales depend on EN being complete first)
          if (locale !== 'en' && countContentFiles(ct.dir, 'en') < ct.expected) {
            console.log(`  (Blocked: English ${ct.name} must be completed first)`);
          } else {
            console.log(`  Next: Create ${ct.dir}/${locale}/ content files`);
          }
          return;
        }
      }
    }
    console.log('  ALL CONTENT COMPLETE! Run Phase 17 verification.');
  }
}

main();
