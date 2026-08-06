#!/usr/bin/env node
/**
 * Italian SEO Audit Script
 *
 * Reads all 194 Italian content files (app, tool, guide, idea, bundle, start)
 * and produces a JSON report checking:
 *   - titleTag length (flag if outside 50–60 chars)
 *   - metaDescription length (flag if outside 150–160 chars)
 *   - primaryKeyword appears in titleTag
 *   - secondaryKeywords count (flag if < 3)
 *   - lsiKeywords count (flag if < 2)
 *   - Banned phrases: bare "gratis"/"gratuito" without "prova"/"filigrana"
 *
 * Usage:
 *   node scripts/audit-it-seo.js
 *
 * Output: scripts/it-seo-audit-report.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_DIR = path.join(ROOT, 'frontend', 'config');
const OUTPUT = path.join(__dirname, 'it-seo-audit-report.json');

const CATEGORIES = [
  { name: 'app-content', dir: path.join(CONFIG_DIR, 'app-content', 'it') },
  { name: 'tool-content', dir: path.join(CONFIG_DIR, 'tool-content', 'it') },
  { name: 'guide-content', dir: path.join(CONFIG_DIR, 'guide-content', 'it') },
  { name: 'idea-content', dir: path.join(CONFIG_DIR, 'idea-content', 'it') },
  { name: 'bundle-content', dir: path.join(CONFIG_DIR, 'bundle-content', 'it') },
  { name: 'start-content', dir: path.join(CONFIG_DIR, 'start-content', 'it') },
];

// Banned phrase detection:
// Flag bare "gratis"/"gratuito"/"gratuita" that don't appear near "prova" or "filigrana"
function findBannedPhrases(text) {
  if (!text || typeof text !== 'string') return [];
  const found = [];

  // Check for bare "gratis"/"gratuito"/"gratuita" without qualification
  const barePatterns = [
    /(?:^|[\s,;.!?()])gratis(?:[\s,;.!?()]|$)/gi,
    /(?:^|[\s,;.!?()])gratuit[oae](?:[\s,;.!?()]|$)/gi,
  ];

  for (const pattern of barePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const start = Math.max(0, match.index - 80);
      const end = Math.min(text.length, match.index + match[0].length + 80);
      const context = text.substring(start, end).toLowerCase();
      // It's OK if "prova" or "filigrana" appears nearby
      if (!context.includes('prova') && !context.includes('filigrana')) {
        // Exclude legitimate third-party/platform references
        // Check if ANY of these context words appear nearby (indicating third-party usage)
        const legitimateContextWords = [
          'isbn', 'piano', 'spedizione', 'account', 'email',
          'alternative', 'fonti', 'concorrenza', 'concorrenti',
          'competitor', 'competere', 'siti', 'sito',
          'apparentemente', 'formato', 'formati', 'supportano',
          'generatori supportano', 'royalty-free', 'royalty',
          'campione', 'anteprima', 'recension',
          'sezione', 'licenza', 'diritti', 'etichetta',
          'distinguano', 'competitiv', 'nessun sito', 'tipicamente',
        ];
        const isLegitimate = legitimateContextWords.some(w => context.includes(w));
        if (!isLegitimate) {
          found.push(match[0].trim());
        }
      }
    }
  }

  return [...new Set(found)];
}

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function collectAllText(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj.map(collectAllText).join(' ');
  if (typeof obj === 'object') return Object.values(obj).map(collectAllText).join(' ');
  return String(obj);
}

// Extract a string value from a TypeScript field, handling escaped quotes
function extractStringField(raw, fieldName) {
  // Find the field start
  const fieldPattern = new RegExp(fieldName + ':\\s*\\n?\\s*');
  const fieldMatch = fieldPattern.exec(raw);
  if (!fieldMatch) return '';

  const startIdx = fieldMatch.index + fieldMatch[0].length;
  const quoteChar = raw[startIdx];
  if (quoteChar !== "'" && quoteChar !== '"' && quoteChar !== '`') return '';

  // Walk forward, handling escaped quotes
  let result = '';
  let i = startIdx + 1;
  while (i < raw.length) {
    if (raw[i] === '\\' && i + 1 < raw.length) {
      // Escaped character — include the actual character
      result += raw[i + 1];
      i += 2;
    } else if (raw[i] === quoteChar) {
      break;
    } else {
      result += raw[i];
      i++;
    }
  }
  return result.replace(/\n\s*/g, ' ').trim();
}

// Count items in an array field like secondaryKeywords: [...]
function countArrayItems(raw, fieldName) {
  const pattern = new RegExp(fieldName + ':\\s*\\[([\\s\\S]*?)\\]');
  const match = pattern.exec(raw);
  if (!match) return 0;
  const block = match[1].trim();
  if (!block) return 0;
  // Count string entries by matching complete quoted strings (handling escaped quotes)
  let count = 0;
  let inString = false;
  let quoteChar = '';
  for (let i = 0; i < block.length; i++) {
    if (!inString) {
      if (block[i] === "'" || block[i] === '"') {
        inString = true;
        quoteChar = block[i];
      }
    } else {
      if (block[i] === '\\' && i + 1 < block.length) {
        i++; // skip escaped char
      } else if (block[i] === quoteChar) {
        inString = false;
        count++;
      }
    }
  }
  return count;
}

function extractSeoFromFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');

  const titleTag = extractStringField(raw, 'titleTag');
  const metaDescription = extractStringField(raw, 'metaDescription');
  const primaryKeyword = extractStringField(raw, 'primaryKeyword');
  const secondaryKeywordsCount = countArrayItems(raw, 'secondaryKeywords');
  const lsiKeywordsCount = countArrayItems(raw, 'lsiKeywords');

  // Word count of full content
  const wordCount = countWords(collectAllText(raw));

  // Count FAQ sections
  const faqMatches = raw.match(/question:/g);
  const faqCount = faqMatches ? faqMatches.length : 0;

  // Check for YouTube
  const hasYoutube = /youtube|youtu\.be/i.test(raw);

  // Check for refund FAQ
  const refundFaq = /rimbors|refund|rimborso|garanzia.*rimborso/i.test(raw);

  // Check for free trial mention
  const freeTrial = /prova.*gratuit|prova.*filigrana|free.*trial|prova gratuita/i.test(raw);

  // Banned phrases in all text
  const allText = collectAllText(raw);
  const bannedPhrases = findBannedPhrases(allText);
  const bareFreeCount = bannedPhrases.length;

  return {
    titleTag,
    metaDescription,
    primaryKeyword,
    secondaryKeywordsCount,
    lsiKeywordsCount,
    wordCount,
    faqCount,
    hasYoutube,
    refundFaq,
    freeTrial,
    bannedPhrases,
    bareFreeCount,
  };
}

function auditFile(filePath, category) {
  const fileName = path.basename(filePath, '.ts');
  const data = extractSeoFromFile(filePath);
  const issues = [];

  const titleLength = data.titleTag.length;
  const metaLength = data.metaDescription.length;

  // Title tag length check
  if (titleLength < 50) {
    issues.push(`Title too short: ${titleLength} chars (min 50)`);
  }
  if (titleLength > 60) {
    issues.push(`Title too long: ${titleLength} chars (max 60)`);
  }

  // Meta description length check
  if (metaLength < 150) {
    issues.push(`Meta description too short: ${metaLength} chars (min 150)`);
  }
  if (metaLength > 160) {
    issues.push(`Meta description too long: ${metaLength} chars (max 160)`);
  }

  // Primary keyword in title
  if (data.primaryKeyword && data.titleTag) {
    const pkLower = data.primaryKeyword.toLowerCase();
    const titleLower = data.titleTag.toLowerCase();
    if (!titleLower.includes(pkLower)) {
      // Check partial match (first 2 significant words)
      const pkWords = pkLower.split(/\s+/).filter(w => w.length > 2);
      const matchingWords = pkWords.filter(w => titleLower.includes(w));
      if (matchingWords.length < Math.ceil(pkWords.length * 0.5)) {
        issues.push(`Primary keyword not in title: "${data.primaryKeyword}"`);
      }
    }
  }

  // Secondary keywords count
  if (data.secondaryKeywordsCount < 3) {
    issues.push(`Only ${data.secondaryKeywordsCount} secondary keywords (min 3)`);
  }

  // LSI keywords count
  if (data.lsiKeywordsCount < 2) {
    issues.push(`Only ${data.lsiKeywordsCount} LSI keywords (min 2)`);
  }

  // Banned phrases
  if (data.bareFreeCount > 0) {
    issues.push(`Banned bare "gratis/gratuito" without "prova/filigrana": ${data.bannedPhrases.join(', ')}`);
  }

  return {
    file: fileName,
    category,
    titleTag: data.titleTag,
    titleLength,
    metaDescription: data.metaDescription,
    metaLength,
    primaryKeyword: data.primaryKeyword,
    secondaryKeywordsCount: data.secondaryKeywordsCount,
    lsiKeywordsCount: data.lsiKeywordsCount,
    wordCount: data.wordCount,
    faqCount: data.faqCount,
    hasYoutube: data.hasYoutube,
    refundFaq: data.refundFaq,
    freeTrial: data.freeTrial,
    bannedPhrases: data.bannedPhrases,
    bareFreeCount: data.bareFreeCount,
    issues,
  };
}

// Main
const report = {
  totalFiles: 0,
  totalIssues: 0,
  totalPassing: 0,
  categories: {},
};

for (const cat of CATEGORIES) {
  if (!fs.existsSync(cat.dir)) {
    console.warn(`Directory not found: ${cat.dir}`);
    continue;
  }

  const files = fs.readdirSync(cat.dir).filter(f => f.endsWith('.ts'));
  const results = [];

  for (const file of files) {
    const filePath = path.join(cat.dir, file);
    const result = auditFile(filePath, cat.name);
    results.push(result);
  }

  const passingCount = results.filter(r => r.issues.length === 0).length;

  report.categories[cat.name] = {
    fileCount: files.length,
    passingCount,
    results,
  };

  report.totalFiles += files.length;
  report.totalPassing += passingCount;
  report.totalIssues += results.reduce((sum, r) => sum + r.issues.length, 0);
}

// Write report
fs.writeFileSync(OUTPUT, JSON.stringify(report, null, 2));

// Console summary
console.log('\n=== Italian SEO Audit Report ===\n');
console.log(`Total files: ${report.totalFiles}`);
console.log(`Passing: ${report.totalPassing}`);
console.log(`Issues: ${report.totalIssues}`);
console.log(`Report: ${OUTPUT}\n`);

for (const [catName, catData] of Object.entries(report.categories)) {
  const failCount = catData.fileCount - catData.passingCount;
  console.log(`  ${catName}: ${catData.fileCount} files, ${catData.passingCount} passing, ${failCount} failing`);

  for (const result of catData.results) {
    if (result.issues.length > 0) {
      console.log(`    ✗ ${result.file}:`);
      for (const issue of result.issues) {
        console.log(`      - ${issue}`);
      }
    }
  }
}

console.log('\nDone.');
