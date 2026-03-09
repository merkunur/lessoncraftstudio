#!/usr/bin/env node
/**
 * Audit all 194 German content files for SEO field quality.
 * Reports: titleTag length, metaDescription length, keyword presence, FAQ count, links count.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const CATEGORIES = [
  { name: 'app-content', dir: path.join(BASE, 'app-content', 'de'), hasKeywords: true },
  { name: 'tool-content', dir: path.join(BASE, 'tool-content', 'de'), hasKeywords: true },
  { name: 'bundle-content', dir: path.join(BASE, 'bundle-content', 'de'), hasKeywords: true },
  { name: 'start-content', dir: path.join(BASE, 'start-content', 'de'), hasKeywords: true },
  { name: 'guide-content', dir: path.join(BASE, 'guide-content', 'de'), hasKeywords: true },
  { name: 'idea-content', dir: path.join(BASE, 'idea-content', 'de'), hasKeywords: false },
];

const TITLE_MAX = 60;
const META_MIN = 150;
const META_MAX = 160;

function extractField(content, fieldName) {
  // Match: fieldName: 'value' or fieldName: "value" (single line)
  const singleRe = new RegExp(`${fieldName}:\\s*['"](.+?)['"]\\s*[,}]`);
  const m = content.match(singleRe);
  if (m) return m[1];

  // Multi-line string with template literal
  const templateRe = new RegExp(`${fieldName}:\\s*\`([^\\x60]+)\``);
  const m2 = content.match(templateRe);
  if (m2) return m2[1].replace(/\n\s*/g, ' ').trim();

  // Multi-line with concatenation using +
  const multiRe = new RegExp(`${fieldName}:\\s*\\n\\s*['"](.+?)['"]`, 's');
  const m3 = content.match(multiRe);
  if (m3) return m3[1];

  return null;
}

function extractStringField(content, fieldName) {
  // For titleTag and metaDescription which may span multiple lines with string concat
  // Strategy: find the field, then collect everything until the next field or closing
  const patterns = [
    // Simple single-quoted string
    new RegExp(`${fieldName}:\\s*'([^']*)'`),
    // Simple double-quoted string
    new RegExp(`${fieldName}:\\s*"([^"]*)"`)
  ];

  for (const re of patterns) {
    const m = content.match(re);
    if (m) return m[1];
  }

  // Multi-line string concatenation: fieldName:\n      'part1' +\n      'part2',
  const concatRe = new RegExp(`${fieldName}:\\s*\\n((?:\\s*['"][^'"]*['"]\\s*\\+?\\s*\\n?)+)`, 'm');
  const cm = content.match(concatRe);
  if (cm) {
    const parts = cm[1].match(/['"]([^'"]*)['"]/g);
    if (parts) return parts.map(p => p.slice(1, -1)).join('');
  }

  return null;
}

function extractArray(content, fieldName) {
  // Find the array and count elements
  const re = new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\]`, 'm');
  const m = content.match(re);
  if (!m) return [];
  // Count string elements
  const items = m[1].match(/['"`][^'"`]+['"`]/g);
  return items || [];
}

function countFaqs(content) {
  // Count { question: patterns
  const matches = content.match(/question:\s*['"]/g);
  return matches ? matches.length : 0;
}

function countInternalLinks(content) {
  const matches = content.match(/anchorText:\s*['"]/g);
  return matches ? matches.length : 0;
}

function hasYoutubeId(content) {
  return /youtubeId:\s*['"]/.test(content);
}

function auditFile(filePath, hasKeywords) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.ts');

  const titleTag = extractStringField(content, 'titleTag');
  const metaDescription = extractStringField(content, 'metaDescription');
  const primaryKeyword = extractStringField(content, 'primaryKeyword');
  const secondaryKeywords = extractArray(content, 'secondaryKeywords');
  const lsiKeywords = extractArray(content, 'lsiKeywords');
  const faqCount = countFaqs(content);
  const linkCount = countInternalLinks(content);
  const hasYoutube = hasYoutubeId(content);

  const issues = [];

  // Title tag checks
  if (!titleTag) {
    issues.push('MISSING titleTag');
  } else if (titleTag.length > TITLE_MAX) {
    issues.push(`titleTag too long: ${titleTag.length} chars (max ${TITLE_MAX})`);
  }

  // Meta description checks
  if (!metaDescription) {
    issues.push('MISSING metaDescription');
  } else if (metaDescription.length < META_MIN) {
    issues.push(`metaDescription too short: ${metaDescription.length} chars (min ${META_MIN})`);
  } else if (metaDescription.length > META_MAX) {
    issues.push(`metaDescription too long: ${metaDescription.length} chars (max ${META_MAX})`);
  }

  // Keyword checks (only for types that should have them)
  if (hasKeywords) {
    if (!primaryKeyword) issues.push('MISSING primaryKeyword');
    if (secondaryKeywords.length < 3) issues.push(`secondaryKeywords: only ${secondaryKeywords.length} (need 3-5)`);
    if (lsiKeywords.length < 2) issues.push(`lsiKeywords: only ${lsiKeywords.length} (need 2-3)`);
  } else {
    // idea-content currently lacks keyword fields - flag if missing
    if (!primaryKeyword) issues.push('NO primaryKeyword (type lacks field)');
    if (secondaryKeywords.length === 0) issues.push('NO secondaryKeywords (type lacks field)');
    if (lsiKeywords.length === 0) issues.push('NO lsiKeywords (type lacks field)');
  }

  return {
    file: fileName,
    titleTag: titleTag || '(missing)',
    titleLength: titleTag ? titleTag.length : 0,
    metaDescription: metaDescription || '(missing)',
    metaLength: metaDescription ? metaDescription.length : 0,
    primaryKeyword: primaryKeyword || null,
    secondaryKeywordsCount: secondaryKeywords.length,
    lsiKeywordsCount: lsiKeywords.length,
    faqCount,
    linkCount,
    hasYoutube,
    issues,
  };
}

// Run audit
const report = { totalFiles: 0, totalIssues: 0, categories: {} };
const allIssues = [];

for (const cat of CATEGORIES) {
  const files = fs.readdirSync(cat.dir).filter(f => f.endsWith('.ts'));
  const results = [];

  for (const file of files) {
    const filePath = path.join(cat.dir, file);
    const result = auditFile(filePath, cat.hasKeywords);
    results.push(result);
    report.totalFiles++;
    if (result.issues.length > 0) {
      report.totalIssues += result.issues.length;
      allIssues.push({ category: cat.name, ...result });
    }
  }

  report.categories[cat.name] = {
    fileCount: files.length,
    results,
  };
}

// Summary
console.log('\n=== GERMAN SEO AUDIT REPORT ===\n');
console.log(`Total files: ${report.totalFiles}`);
console.log(`Total issues: ${report.totalIssues}\n`);

// Issue breakdown by type
const titleTooLong = allIssues.filter(i => i.issues.some(x => x.includes('titleTag too long')));
const metaTooShort = allIssues.filter(i => i.issues.some(x => x.includes('metaDescription too short')));
const metaTooLong = allIssues.filter(i => i.issues.some(x => x.includes('metaDescription too long')));
const missingKeywords = allIssues.filter(i => i.issues.some(x => x.includes('NO primaryKeyword')));

console.log('--- Issue Breakdown ---');
console.log(`Title tags > ${TITLE_MAX} chars: ${titleTooLong.length} files`);
console.log(`Meta descriptions < ${META_MIN} chars: ${metaTooShort.length} files`);
console.log(`Meta descriptions > ${META_MAX} chars: ${metaTooLong.length} files`);
console.log(`Missing keyword fields (idea-content): ${missingKeywords.length} files`);
console.log('');

// Per-category summary
for (const cat of CATEGORIES) {
  const catResults = report.categories[cat.name].results;
  const catIssueFiles = catResults.filter(r => r.issues.length > 0);
  console.log(`\n--- ${cat.name} (${catResults.length} files, ${catIssueFiles.length} with issues) ---`);

  for (const r of catResults) {
    const titleStatus = r.titleLength <= TITLE_MAX ? 'OK' : `FAIL(${r.titleLength})`;
    const metaStatus = r.metaLength >= META_MIN && r.metaLength <= META_MAX ? 'OK' : `FAIL(${r.metaLength})`;
    const marker = r.issues.length > 0 ? '  ✗' : '  ✓';
    console.log(`${marker} ${r.file}: title=${titleStatus} meta=${metaStatus} faq=${r.faqCount} links=${r.linkCount} yt=${r.hasYoutube ? 'Y' : 'N'}`);
    if (r.issues.length > 0) {
      for (const issue of r.issues) {
        console.log(`      → ${issue}`);
      }
    }
  }
}

// Detail: all title tags that are too long
if (titleTooLong.length > 0) {
  console.log('\n\n=== TITLE TAGS TO FIX (> 60 chars) ===\n');
  for (const item of titleTooLong) {
    console.log(`[${item.category}] ${item.file} (${item.titleLength} chars):`);
    console.log(`  "${item.titleTag}"`);
    console.log('');
  }
}

// Detail: all meta descriptions that need fixing
const metaIssues = allIssues.filter(i => i.issues.some(x => x.includes('metaDescription')));
if (metaIssues.length > 0) {
  console.log('\n=== META DESCRIPTIONS TO FIX ===\n');
  for (const item of metaIssues) {
    console.log(`[${item.category}] ${item.file} (${item.metaLength} chars):`);
    console.log(`  "${item.metaDescription.substring(0, 100)}..."`);
    console.log('');
  }
}

// Write JSON report
const reportPath = path.join(__dirname, 'de-seo-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\nFull report written to: ${reportPath}`);
