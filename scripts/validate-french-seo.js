#!/usr/bin/env node
/**
 * French SEO Validation Script
 * Checks all 194 French content files for SEO field compliance.
 *
 * Usage: node scripts/validate-french-seo.js [--type app|tool|guide|bundle|idea|start]
 */

const fs = require('fs');
const path = require('path');

const CONTENT_ROOT = path.join(__dirname, '..', 'frontend', 'config');

const CONTENT_TYPES = [
  { type: 'app', dir: 'app-content/fr', expected: 33 },
  { type: 'tool', dir: 'tool-content/fr', expected: 33 },
  { type: 'guide', dir: 'guide-content/fr', expected: 65 },
  { type: 'bundle', dir: 'bundle-content/fr', expected: 6 },
  { type: 'idea', dir: 'idea-content/fr', expected: 45 },
  { type: 'start', dir: 'start-content/fr', expected: 12 },
];

// Parse CLI args
const typeFilter = process.argv.find(a => a.startsWith('--type='));
const filterType = typeFilter ? typeFilter.split('=')[1] : null;

let totalErrors = 0;
let totalWarnings = 0;
let totalFiles = 0;
const allPrimaryKeywords = new Map(); // keyword -> file path

function countWords(text) {
  if (!text) return 0;
  return text.replace(/\\'/g, "'").replace(/\\n/g, ' ').trim().split(/\s+/).filter(w => w.length > 0).length;
}

function extractField(content, fieldName) {
  // Extract a string field value from TypeScript content
  // Handles both single-quoted and template literal strings
  const patterns = [
    // Single-quoted: fieldName: 'value',
    new RegExp(`${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's'),
    // Double-quoted: fieldName: "value",
    new RegExp(`${fieldName}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's'),
    // Template literal: fieldName: `value`,
    new RegExp(`${fieldName}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``, 's'),
    // Multi-line with concatenation
    new RegExp(`${fieldName}:\\s*\\n\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's'),
  ];

  for (const pat of patterns) {
    const m = content.match(pat);
    if (m) return m[1];
  }
  return null;
}

function extractArray(content, fieldName) {
  // Extract array of strings
  const pat = new RegExp(`${fieldName}:\\s*\\[([^\\]]*?)\\]`, 's');
  const m = content.match(pat);
  if (!m) return [];
  const items = m[1].match(/'(?:[^'\\]|\\.)*'/g) || m[1].match(/"(?:[^"\\]|\\.)*"/g) || [];
  return items.map(s => s.slice(1, -1));
}

function checkFile(filePath, type) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const errors = [];
  const warnings = [];

  // 1. Check titleTag
  const titleTag = extractField(content, 'titleTag');
  if (!titleTag) {
    errors.push('Missing titleTag');
  } else {
    const realTitle = titleTag.replace(/\\'/g, "'");
    if (realTitle.length > 60) {
      errors.push(`titleTag too long: ${realTitle.length} chars (max 60): "${realTitle}"`);
    }
    if (!realTitle.endsWith('| LCS') && !realTitle.endsWith('| LessonCraftStudio')) {
      errors.push(`titleTag missing brand suffix: "${realTitle}"`);
    }
  }

  // 2. Check metaDescription
  const metaDesc = extractField(content, 'metaDescription');
  if (!metaDesc) {
    errors.push('Missing metaDescription');
  } else {
    const realDesc = metaDesc.replace(/\\'/g, "'");
    if (realDesc.length > 155) {
      errors.push(`metaDescription too long: ${realDesc.length} chars (max 155): "${realDesc.substring(0, 80)}..."`);
    }
    if (realDesc.length < 80) {
      warnings.push(`metaDescription very short: ${realDesc.length} chars`);
    }
  }

  // 3. Check hero.title (H1)
  const heroTitle = extractField(content, 'title');
  if (!heroTitle) {
    warnings.push('Could not extract hero title');
  } else {
    const realH1 = heroTitle.replace(/\\'/g, "'");
    if (realH1.length > 70) {
      warnings.push(`hero.title may be too long: ${realH1.length} chars (max 70)`);
    }
  }

  // 4. Check primaryKeyword
  const pk = extractField(content, 'primaryKeyword');
  if (!pk && type !== 'idea') {
    errors.push('Missing primaryKeyword');
  } else if (pk) {
    const realPk = pk.replace(/\\'/g, "'");
    if (allPrimaryKeywords.has(realPk)) {
      errors.push(`DUPLICATE primaryKeyword: "${realPk}" (also in ${allPrimaryKeywords.get(realPk)})`);
    } else {
      allPrimaryKeywords.set(realPk, `${type}/${fileName}`);
    }
  }

  // 5. Check secondaryKeywords
  const sk = extractArray(content, 'secondaryKeywords');
  if (sk.length < 4 && type !== 'idea') {
    warnings.push(`secondaryKeywords: only ${sk.length} (should be 4-5)`);
  }

  // 6. Check lsiKeywords
  const lsi = extractArray(content, 'lsiKeywords');
  if (lsi.length < 3 && type !== 'idea') {
    warnings.push(`lsiKeywords: only ${lsi.length} (should be 3+)`);
  }

  // 7. Check hero.description word count
  const heroDesc = extractField(content, 'description');
  if (heroDesc) {
    const wc = countWords(heroDesc);
    if (wc < 80) {
      warnings.push(`hero.description word count low: ${wc} words (target 100-150)`);
    }
  }

  // 8. Check for unicode escapes
  const unicodeMatches = content.match(/\\u[0-9a-fA-F]{4}/g);
  if (unicodeMatches && unicodeMatches.length > 0) {
    errors.push(`Contains \\uXXXX escape sequences: ${unicodeMatches.slice(0, 3).join(', ')}${unicodeMatches.length > 3 ? '...' : ''}`);
  }

  // 9. Check for curly/smart quotes
  if (/[\u2018\u2019\u201C\u201D]/.test(content)) {
    errors.push('Contains curly/smart quotes (must use straight quotes)');
  }

  return { errors, warnings };
}

console.log('=== French SEO Validation ===\n');

for (const ct of CONTENT_TYPES) {
  if (filterType && ct.type !== filterType) continue;

  const dirPath = path.join(CONTENT_ROOT, ct.dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`[SKIP] ${ct.dir} -- directory not found`);
    continue;
  }

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts'));
  console.log(`--- ${ct.type.toUpperCase()}-CONTENT (${files.length}/${ct.expected} files) ---`);

  let typeErrors = 0;
  let typeWarnings = 0;

  for (const file of files.sort()) {
    const filePath = path.join(dirPath, file);
    const { errors, warnings } = checkFile(filePath, ct.type);
    totalFiles++;

    if (errors.length > 0 || warnings.length > 0) {
      console.log(`  ${file}:`);
      for (const e of errors) {
        console.log(`    [ERROR] ${e}`);
        typeErrors++;
        totalErrors++;
      }
      for (const w of warnings) {
        console.log(`    [WARN]  ${w}`);
        typeWarnings++;
        totalWarnings++;
      }
    }
  }

  if (typeErrors === 0 && typeWarnings === 0) {
    console.log(`  All ${files.length} files passed.\n`);
  } else {
    console.log(`  ${typeErrors} errors, ${typeWarnings} warnings\n`);
  }
}

console.log('=== SUMMARY ===');
console.log(`Files checked: ${totalFiles}`);
console.log(`Total errors:   ${totalErrors}`);
console.log(`Total warnings: ${totalWarnings}`);
console.log(`Unique primaryKeywords: ${allPrimaryKeywords.size}`);

if (totalErrors > 0) {
  console.log('\nFAILED -- fix errors before committing.');
  process.exit(1);
} else {
  console.log('\nPASSED (warnings are informational).');
  process.exit(0);
}
