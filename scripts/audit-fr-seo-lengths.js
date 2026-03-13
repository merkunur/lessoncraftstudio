#!/usr/bin/env node
/**
 * Audit all 194 French content files for SEO field lengths.
 * Checks:
 *  - titleTag: must be <= 60 chars
 *  - metaDescription: must be 150-160 chars
 *
 * Usage: node scripts/audit-fr-seo-lengths.js
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const CATEGORIES = [
  { name: 'app-content', dir: 'app-content/fr' },
  { name: 'tool-content', dir: 'tool-content/fr' },
  { name: 'bundle-content', dir: 'bundle-content/fr' },
  { name: 'start-content', dir: 'start-content/fr' },
  { name: 'guide-content', dir: 'guide-content/fr' },
  { name: 'idea-content', dir: 'idea-content/fr' },
];

let totalFiles = 0;
let totalPass = 0;
let totalFail = 0;

const failures = {
  titleTooLong: [],
  metaTooLong: [],
  metaTooShort: [],
  metaMissing: [],
  titleMissing: [],
};

for (const cat of CATEGORIES) {
  const dirPath = path.join(BASE, cat.dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠ Directory not found: ${cat.dir}`);
    continue;
  }

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort();
  let catPass = 0;
  let catFail = 0;

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`${cat.name.toUpperCase()} (${files.length} files)`);
  console.log('═'.repeat(70));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const slug = file.replace('.ts', '');
    totalFiles++;

    // Extract titleTag
    const titleMatch = content.match(/titleTag:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/);
    // Extract metaDescription - handle multiline with template literals or string concat
    const metaMatch = content.match(/metaDescription:\s*\n?\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/);

    const title = titleMatch ? titleMatch[1].replace(/\\'/g, "'") : null;
    const meta = metaMatch ? metaMatch[1].replace(/\\'/g, "'") : null;

    let filePass = true;
    const issues = [];

    // Check title
    if (!title) {
      issues.push('TITLE MISSING');
      failures.titleMissing.push(`${cat.name}/${slug}`);
      filePass = false;
    } else if (title.length > 60) {
      issues.push(`TITLE TOO LONG: ${title.length} chars`);
      failures.titleTooLong.push({ key: `${cat.name}/${slug}`, len: title.length, text: title });
      filePass = false;
    }

    // Check meta
    if (!meta) {
      issues.push('META MISSING');
      failures.metaMissing.push(`${cat.name}/${slug}`);
      filePass = false;
    } else if (meta.length > 160) {
      issues.push(`META TOO LONG: ${meta.length} chars`);
      failures.metaTooLong.push({ key: `${cat.name}/${slug}`, len: meta.length, text: meta });
      filePass = false;
    } else if (meta.length < 150) {
      issues.push(`META TOO SHORT: ${meta.length} chars`);
      failures.metaTooShort.push({ key: `${cat.name}/${slug}`, len: meta.length, text: meta });
      filePass = false;
    }

    if (filePass) {
      catPass++;
      totalPass++;
    } else {
      catFail++;
      totalFail++;
      const titleLen = title ? title.length : '?';
      const metaLen = meta ? meta.length : '?';
      console.log(`  FAIL ${slug} — title:${titleLen} meta:${metaLen} — ${issues.join(', ')}`);
    }
  }

  console.log(`  → ${catPass}/${files.length} pass, ${catFail} fail`);
}

// ── Summary ──
console.log(`\n${'═'.repeat(70)}`);
console.log('SUMMARY');
console.log('═'.repeat(70));
console.log(`Total files: ${totalFiles}`);
console.log(`Pass: ${totalPass}`);
console.log(`Fail: ${totalFail}`);
console.log();

if (failures.titleTooLong.length > 0) {
  console.log(`Title too long (>60): ${failures.titleTooLong.length}`);
  for (const f of failures.titleTooLong) {
    console.log(`  ${f.key} — ${f.len} chars — "${f.text}"`);
  }
  console.log();
}

if (failures.metaTooLong.length > 0) {
  console.log(`Meta too long (>160): ${failures.metaTooLong.length}`);
  for (const f of failures.metaTooLong) {
    console.log(`  ${f.key} — ${f.len} chars`);
  }
  console.log();
}

if (failures.metaTooShort.length > 0) {
  console.log(`Meta too short (<150): ${failures.metaTooShort.length}`);
  for (const f of failures.metaTooShort) {
    console.log(`  ${f.key} — ${f.len} chars`);
  }
  console.log();
}

if (failures.metaMissing.length > 0) {
  console.log(`Meta missing: ${failures.metaMissing.length}`);
  for (const f of failures.metaMissing) {
    console.log(`  ${f}`);
  }
  console.log();
}

if (failures.titleMissing.length > 0) {
  console.log(`Title missing: ${failures.titleMissing.length}`);
  for (const f of failures.titleMissing) {
    console.log(`  ${f}`);
  }
  console.log();
}

if (totalFail === 0) {
  console.log('🎉 ALL 194 FILES PASS SEO LENGTH CHECKS!');
} else {
  console.log(`❌ ${totalFail} files need fixes.`);
}
