/**
 * SEO Audit Generator
 *
 * Reads all English content files (app, tool, guide, blog, idea, start, bundle, compare)
 * and produces a TypeScript audit file at frontend/data/seo-overhaul.ts with issue detection.
 *
 * Usage: node frontend/scripts/generate-seo-audit.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const CONFIG = path.join(ROOT, 'frontend', 'config');
const OUTPUT = path.join(ROOT, 'frontend', 'data', 'seo-overhaul.ts');

// Content type directories and their category mapping
const CONTENT_TYPES = [
  { dir: 'app-content/en', type: 'app', category: 'PRODUCT' },
  { dir: 'tool-content/en', type: 'tool', category: 'PRODUCT' },
  { dir: 'guide-content/en', type: 'guide', category: 'SELLER' },
  { dir: 'blog-content/en', type: 'blog', category: 'SELLER' },
  { dir: 'idea-content/en', type: 'idea', category: 'SELLER' },
  { dir: 'start-content/en', type: 'start', category: 'SELLER' },
  { dir: 'bundle-content/en', type: 'bundle', category: 'PRODUCT' },
  { dir: 'compare-content/en', type: 'compare', category: 'HYBRID' },
];

/**
 * Extract a single-quoted or double-quoted string value for a given key from file text.
 * Handles multi-line values and escaped quotes.
 */
function extractStringValue(text, key) {
  // Try single-quoted value first (most common in this codebase)
  // Match key: 'value' or key: 'value that spans
  // multiple lines'
  const singleQuoteRegex = new RegExp(
    key + `\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`,
    's'
  );
  let match = text.match(singleQuoteRegex);
  if (match) {
    return match[1].replace(/\\'/g, "'").replace(/\\n/g, ' ').trim();
  }

  // Try double-quoted value
  const doubleQuoteRegex = new RegExp(
    key + `\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`,
    's'
  );
  match = text.match(doubleQuoteRegex);
  if (match) {
    return match[1].replace(/\\"/g, '"').replace(/\\n/g, ' ').trim();
  }

  // Try template literal (backtick)
  const templateRegex = new RegExp(
    key + '\\s*:\\s*`((?:[^`\\\\]|\\\\.)*)`',
    's'
  );
  match = text.match(templateRegex);
  if (match) {
    return match[1].replace(/\\n/g, ' ').trim();
  }

  return '';
}

/**
 * Detect SEO issues for a given entry.
 */
function detectIssues(titleTag, metaDescription) {
  const issues = [];

  // Title length checks
  if (titleTag.length > 60) issues.push('title-too-long');
  if (titleTag.length < 30) issues.push('title-too-short');

  // Description length checks
  if (metaDescription.length > 160) issues.push('desc-too-long');
  if (metaDescription.length < 100) issues.push('desc-too-short');

  // Title starts with 'How to'
  if (/^How to/i.test(titleTag)) issues.push('title-starts-how-to');

  // Description starts with freebie language
  if (/^(Download free|Free printable)/i.test(metaDescription)) {
    issues.push('desc-freebie-language');
  }

  // Description missing seller CTA (broad match for seller/business-oriented language)
  const hasSellerSignal =
    /etsy|kdp|gumroad|tpt|sell|revenue|income|profit|business|commercial|license|\$49|one-time|sales|market|demand|niche|pricing|listings|competition|buyers|customers|shop/i.test(metaDescription);
  if (!hasSellerSignal) {
    issues.push('desc-missing-seller-cta');
  }

  return issues;
}

/**
 * Process all content files and return audit entries.
 */
function processAllContent() {
  const entries = [];

  for (const { dir, type, category } of CONTENT_TYPES) {
    const dirPath = path.join(CONFIG, dir);

    if (!fs.existsSync(dirPath)) {
      console.warn(`  WARNING: Directory not found: ${dir}`);
      continue;
    }

    const files = fs
      .readdirSync(dirPath)
      .filter((f) => f.endsWith('.ts'))
      .sort();

    for (const file of files) {
      const slug = file.replace(/\.ts$/, '');
      const filePath = path.join(dirPath, file);
      const text = fs.readFileSync(filePath, 'utf-8');

      const titleTag = extractStringValue(text, 'titleTag');
      const metaDescription = extractStringValue(text, 'metaDescription');
      const primaryKeyword = extractStringValue(text, 'primaryKeyword');

      const issues = detectIssues(titleTag, metaDescription);

      entries.push({
        slug,
        type,
        category,
        titleTag,
        metaDescription,
        titleLength: titleTag.length,
        descLength: metaDescription.length,
        primaryKeyword,
        issues,
        status: issues.length === 0 ? 'good' : 'needs-update',
      });
    }
  }

  return entries;
}

/**
 * Escape a string for use inside a TypeScript single-quoted string.
 */
function escapeForTS(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

/**
 * Write the audit entries to a TypeScript file.
 */
function writeOutput(entries) {
  const lines = [];

  lines.push(`export interface PageAuditEntry {`);
  lines.push(`  slug: string;`);
  lines.push(
    `  type: 'app' | 'tool' | 'guide' | 'blog' | 'idea' | 'start' | 'bundle' | 'compare';`
  );
  lines.push(`  category: 'SELLER' | 'PRODUCT' | 'EDUCATOR' | 'HYBRID';`);
  lines.push(`  titleTag: string;`);
  lines.push(`  metaDescription: string;`);
  lines.push(`  titleLength: number;`);
  lines.push(`  descLength: number;`);
  lines.push(`  primaryKeyword: string;`);
  lines.push(`  issues: string[];`);
  lines.push(`  status: 'good' | 'needs-update';`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export const seoAudit: PageAuditEntry[] = [`);

  for (const e of entries) {
    const issuesStr = e.issues.map((i) => `'${i}'`).join(', ');
    lines.push(`  {`);
    lines.push(`    slug: '${escapeForTS(e.slug)}',`);
    lines.push(`    type: '${e.type}',`);
    lines.push(`    category: '${e.category}',`);
    lines.push(`    titleTag: '${escapeForTS(e.titleTag)}',`);
    lines.push(`    metaDescription: '${escapeForTS(e.metaDescription)}',`);
    lines.push(`    titleLength: ${e.titleLength},`);
    lines.push(`    descLength: ${e.descLength},`);
    lines.push(`    primaryKeyword: '${escapeForTS(e.primaryKeyword)}',`);
    lines.push(`    issues: [${issuesStr}],`);
    lines.push(`    status: '${e.status}',`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);

  fs.writeFileSync(OUTPUT, lines.join('\n'), 'utf-8');
}

/**
 * Print summary to console.
 */
function printSummary(entries) {
  const total = entries.length;
  const needsUpdate = entries.filter((e) => e.status === 'needs-update').length;
  const good = total - needsUpdate;

  // Count by issue type
  const issueCounts = {};
  for (const e of entries) {
    for (const issue of e.issues) {
      issueCounts[issue] = (issueCounts[issue] || 0) + 1;
    }
  }

  // Count by content type
  const typeCounts = {};
  for (const e of entries) {
    typeCounts[e.type] = (typeCounts[e.type] || 0) + 1;
  }

  console.log('\n========================================');
  console.log('  SEO AUDIT SUMMARY');
  console.log('========================================\n');

  console.log(`Total pages audited:  ${total}`);
  console.log(`Pages with issues:    ${needsUpdate}`);
  console.log(`Pages passing:        ${good}`);
  console.log(`Pass rate:            ${((good / total) * 100).toFixed(1)}%`);

  console.log('\n--- By Content Type ---');
  for (const [type, count] of Object.entries(typeCounts).sort()) {
    const typeIssues = entries.filter(
      (e) => e.type === type && e.status === 'needs-update'
    ).length;
    console.log(
      `  ${type.padEnd(10)} ${String(count).padStart(4)} files  (${typeIssues} with issues)`
    );
  }

  console.log('\n--- Issue Breakdown ---');
  const sortedIssues = Object.entries(issueCounts).sort((a, b) => b[1] - a[1]);
  for (const [issue, count] of sortedIssues) {
    console.log(`  ${issue.padEnd(30)} ${String(count).padStart(4)} pages`);
  }

  console.log(`\nOutput written to: ${path.relative(ROOT, OUTPUT)}`);
  console.log('========================================\n');
}

// --- Main ---
console.log('Scanning content directories...');
const entries = processAllContent();

if (entries.length === 0) {
  console.error('ERROR: No content files found. Check directory paths.');
  process.exit(1);
}

writeOutput(entries);
printSummary(entries);
