#!/usr/bin/env node
/**
 * validate-content.js — Content File Validator
 *
 * Validates a content file against the SEO checklist from RULES.md Section 1.11.
 *
 * Usage:
 *   node scripts/validate-content.js frontend/config/app-content/en/addition.ts
 *   node scripts/validate-content.js --all          # Validate all content files
 *   node scripts/validate-content.js --type app-detail --locale en
 */

const fs = require('fs');
const path = require('path');

const CONFIG_DIR = path.join(__dirname, '..', 'frontend', 'config');
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

const CONTENT_DIRS = {
  'app-detail':    { dir: 'app-content',    minFaq: 10, minLinks: 5, minWords: 2800 },
  'free-tool':     { dir: 'tool-content',   minFaq: 8,  minLinks: 5, minWords: 2800 },
  'bundle':        { dir: 'bundle-content', minFaq: 8,  minLinks: 5, minWords: 2800 },
  'cornerstone':   { dir: 'start-content',  minFaq: 6,  minLinks: 8, minWords: 2800 },
  'create-x':      { dir: 'guide-content',  minFaq: 5,  minLinks: 6, minWords: 2800 },
  'niche-ideas':   { dir: 'idea-content',   minFaq: 5,  minLinks: 6, minWords: 2800 },
};

// Banned phrases from Section 1.10.7 and 1.10.5
const BANNED_PHRASES = [
  'passive income',
  'money machine',
  'cash cow',
  'guaranteed sales',
  'guaranteed income',
  'everyone is buying',
  'trending now',
  'limited time',
  'act now',
  "don't miss out",
  'best-selling',
  'revolutionary',
  'game-changing',
  'industry-leading',
];

// Banned free trial phrases from Section 1.12.4
const BANNED_TRIAL_PHRASES = [
  'limited free version',
  'basic free version',
  'start your free trial',
  'free trial period',
];

// Banned opening patterns from Section 1.10.3
const BANNED_OPENERS = [
  /^this tool/i,
  /^welcome to/i,
  /^in this section/i,
  /^are you looking for/i,
  /^\w+ is a (?:tool|generator|maker|app)/i,
];

function detectContentType(filePath) {
  for (const [type, config] of Object.entries(CONTENT_DIRS)) {
    if (filePath.includes(config.dir)) return type;
  }
  return null;
}

function detectLocale(filePath) {
  for (const locale of LOCALES) {
    if (filePath.includes(`/${locale}/`) || filePath.includes(`\\${locale}\\`)) return locale;
  }
  return null;
}

function countWords(text) {
  // Strip TypeScript syntax, string delimiters, imports, etc.
  const cleaned = text
    .replace(/^import\s+.*$/gm, '')
    .replace(/^export\s+(const|default|interface|type)\s+/gm, '')
    .replace(/['"`]/g, ' ')
    .replace(/\{|\}|\[|\]|\(|\)|;|:|,|=|=>|\/\//g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.split(/\s+/).filter(w => w.length > 1).length;
}

function extractStringValue(content, key) {
  const patterns = [
    new RegExp(`${key}:\\s*['"]([^'"]{1,200})['"]`),
    new RegExp(`${key}:\\s*\`([^\`]{1,200})\``),
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m) return m[1];
  }
  return null;
}

function extractArrayItems(content, key) {
  // Try to find an array: key: [ ... ]
  const regex = new RegExp(`${key}:\\s*\\[([^\\]]{0,10000})\\]`, 's');
  const match = content.match(regex);
  if (!match) return [];
  // Count string items
  const items = match[1].match(/['"][^'"]+['"]/g);
  return items ? items.map(s => s.replace(/['"]/g, '')) : [];
}

function countFaqItems(content) {
  // Count objects with 'question' field in faq arrays
  const questionMatches = content.match(/question:\s*['"`]/g);
  return questionMatches ? questionMatches.length : 0;
}

function hasRefundFaq(content) {
  return /refund/i.test(content) && /policy/i.test(content);
}

function hasFreeTrial(content) {
  const patterns = [
    /free to try/i,
    /try.{0,10}free/i,
    /no signup/i,
    /no credit card/i,
    /watermark/i,
  ];
  return patterns.some(p => p.test(content));
}

function hasYoutubeId(content) {
  return /youtubeId:\s*['"][^'"]+['"]/i.test(content);
}

function hasHeroImage(content) {
  return /heroImage|primary:\s*['"][^'"]*sample/i.test(content) ||
         /heroImages/i.test(content);
}

// 14. Bare "free" without "trial" qualifier (Section 1.0)
function findBareFreeClaims(content) {
  const violations = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip import/export lines and comments
    if (/^\s*(import|export|\/\/)/.test(line)) continue;

    // Find all "free" word occurrences
    const matches = [...line.matchAll(/\bfree\b/gi)];
    for (const m of matches) {
      const start = Math.max(0, m.index - 40);
      const end = Math.min(line.length, m.index + m[0].length + 40);
      const ctx = line.substring(start, end);
      // Safe patterns to skip
      if (/free\s*trial/i.test(ctx)) continue;
      if (/free-form/i.test(ctx)) continue;
      if (/freely/i.test(ctx)) continue;
      if (/watermark-free/i.test(ctx)) continue;
      if (/fee-free/i.test(ctx)) continue;
      if (/gluten-free/i.test(ctx)) continue;
      if (/risk-free/i.test(ctx)) continue;
      if (/Try Free Now/i.test(ctx)) continue;
      if (/free\s+\d+-page/i.test(ctx)) continue;
      if (/free\s+to\s+try/i.test(ctx)) continue;
      if (/experiment\s+free/i.test(ctx)) continue;
      if (/Free Sample Funnel/i.test(ctx)) continue;
      if (/freehand/i.test(ctx)) continue;
      if (/free\s+writing/i.test(ctx)) continue;
      if (/free\s+canvas/i.test(ctx)) continue;

      violations.push(`Line ${i + 1}: bare "free" without "trial" -> "${ctx.trim()}"`);
    }
  }
  return violations;
}

function validateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`  FILE NOT FOUND: ${filePath}`);
    return { pass: false, errors: ['File not found'], warnings: [] };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const contentType = detectContentType(filePath);
  const locale = detectLocale(filePath);
  const config = contentType ? CONTENT_DIRS[contentType] : null;

  const errors = [];
  const warnings = [];

  // 1. Word count
  const wordCount = countWords(content);
  const minWords = config ? config.minWords : 2800;
  if (wordCount < minWords) {
    errors.push(`Word count ${wordCount} < ${minWords} minimum`);
  }

  // 2. Title tag
  const titleTag = extractStringValue(content, 'titleTag');
  if (titleTag) {
    if (titleTag.length > 60) {
      errors.push(`Title tag ${titleTag.length} chars > 60 max: "${titleTag}"`);
    }
  } else {
    warnings.push('No titleTag found');
  }

  // 3. Meta description
  const metaDesc = extractStringValue(content, 'metaDescription');
  if (metaDesc) {
    if (metaDesc.length < 140) {
      warnings.push(`Meta description ${metaDesc.length} chars < 150 target`);
    }
    if (metaDesc.length > 165) {
      errors.push(`Meta description ${metaDesc.length} chars > 160 max`);
    }
  } else {
    warnings.push('No metaDescription found');
  }

  // 4. Primary keyword
  const primaryKeyword = extractStringValue(content, 'primaryKeyword') ||
                         extractStringValue(content, 'primary');
  if (!primaryKeyword) {
    warnings.push('No primaryKeyword found');
  } else {
    // Check if keyword is in title
    if (titleTag && !titleTag.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      errors.push(`Primary keyword "${primaryKeyword}" not in title tag`);
    }
    // Check if keyword is in meta desc
    if (metaDesc && !metaDesc.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      warnings.push(`Primary keyword "${primaryKeyword}" not in meta description`);
    }
  }

  // 5. FAQ count
  const faqCount = countFaqItems(content);
  const minFaq = config ? config.minFaq : 5;
  if (faqCount < minFaq) {
    errors.push(`FAQ count ${faqCount} < ${minFaq} minimum for ${contentType || 'unknown'} type`);
  }

  // 6. Refund FAQ
  if (!hasRefundFaq(content)) {
    errors.push('Missing mandatory refund policy FAQ');
  }

  // 7. Free trial mention
  if (!hasFreeTrial(content)) {
    errors.push('Missing free trial mention (Section 1.12.2)');
  }

  // 8. YouTube ID
  if (!hasYoutubeId(content)) {
    errors.push('Missing youtubeId');
  }

  // 9. Hero image
  if (!hasHeroImage(content)) {
    warnings.push('No hero image reference found');
  }

  // 10. Banned phrases
  for (const phrase of BANNED_PHRASES) {
    if (content.toLowerCase().includes(phrase)) {
      errors.push(`Banned phrase found: "${phrase}"`);
    }
  }

  // 11. Banned trial phrases
  for (const phrase of BANNED_TRIAL_PHRASES) {
    if (content.toLowerCase().includes(phrase)) {
      errors.push(`Banned trial phrase found: "${phrase}"`);
    }
  }

  // 12. Banned openers (check description/hero text)
  const descMatch = content.match(/description:\s*['"`]([^'"`]{10,200})/);
  if (descMatch) {
    const opener = descMatch[1];
    for (const pattern of BANNED_OPENERS) {
      if (pattern.test(opener)) {
        errors.push(`Banned opening pattern: "${opener.slice(0, 60)}..."`);
      }
    }
  }

  // 13. Untranslated English check (non-EN locales)
  if (locale && locale !== 'en') {
    const englishPatterns = [
      /Commercial Pack/,
      /Full Access Pack/,
      /Worksheet Generator(?!['"])/,  // Not in a string literal
      /Math Mastery(?!['"])/,
      /Literacy & Language(?!['"])/,
      /Visual Learning(?!['"])/,
      /Matching & Sorting(?!['"])/,
      /Puzzles & Logic(?!['"])/,
      /Search & Find(?!['"])/,
    ];
    for (const pattern of englishPatterns) {
      // Only check in string values, not variable names
      const stringContent = content.replace(/\/\/.*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
      const matches = stringContent.match(new RegExp(`['"\`][^'"\`]*${pattern.source}[^'"\`]*['"\`]`, 'g'));
      if (matches && matches.length > 0) {
        errors.push(`Untranslated English in ${locale.toUpperCase()}: ${pattern.source}`);
      }
    }
  }

  // 14. Bare "free" without "trial" (Section 1.0)
  const bareFreeClaims = findBareFreeClaims(content);
  if (bareFreeClaims.length > 0) {
    for (const v of bareFreeClaims) {
      warnings.push(v);
    }
  }

  const pass = errors.length === 0;
  return { pass, errors, warnings, wordCount, faqCount };
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node scripts/validate-content.js <path-to-content-file>');
    console.log('  node scripts/validate-content.js --all');
    console.log('  node scripts/validate-content.js --type app-detail --locale en');
    process.exit(0);
  }

  if (args[0] === '--all' || args[0] === '--type') {
    // Batch mode
    let targetType = null;
    let targetLocale = null;

    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--type' && args[i + 1]) targetType = args[i + 1];
      if (args[i] === '--locale' && args[i + 1]) targetLocale = args[i + 1];
    }

    let totalFiles = 0;
    let passCount = 0;
    let failCount = 0;

    const types = targetType ? { [targetType]: CONTENT_DIRS[targetType] } : CONTENT_DIRS;

    for (const [type, config] of Object.entries(types)) {
      if (!config) continue;
      const locales = targetLocale ? [targetLocale] : LOCALES;

      for (const locale of locales) {
        const localeDir = path.join(CONFIG_DIR, config.dir, locale);
        if (!fs.existsSync(localeDir)) continue;

        const files = fs.readdirSync(localeDir)
          .filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');

        for (const file of files) {
          const filePath = path.join(localeDir, file);
          const result = validateFile(filePath);
          totalFiles++;

          if (result.pass) {
            passCount++;
          } else {
            failCount++;
            console.log(`FAIL: ${config.dir}/${locale}/${file}`);
            result.errors.forEach(e => console.log(`  ERROR: ${e}`));
            result.warnings.forEach(w => console.log(`  WARN: ${w}`));
          }
        }
      }
    }

    console.log();
    console.log('='.repeat(50));
    console.log(`  Validated: ${totalFiles} files`);
    console.log(`  Passed: ${passCount}`);
    console.log(`  Failed: ${failCount}`);
    console.log(`  Status: ${failCount === 0 ? 'PASS' : 'FAIL'}`);
    console.log('='.repeat(50));
    process.exit(failCount > 0 ? 1 : 0);

  } else {
    // Single file mode
    const filePath = path.resolve(args[0]);
    console.log(`Validating: ${filePath}`);
    console.log();

    const result = validateFile(filePath);

    console.log(`  Word count: ${result.wordCount || 'N/A'}`);
    console.log(`  FAQ count: ${result.faqCount || 0}`);
    console.log();

    if (result.errors.length > 0) {
      console.log('  ERRORS:');
      result.errors.forEach(e => console.log(`    - ${e}`));
    }

    if (result.warnings.length > 0) {
      console.log('  WARNINGS:');
      result.warnings.forEach(w => console.log(`    - ${w}`));
    }

    console.log();
    console.log(`  RESULT: ${result.pass ? 'PASS' : 'FAIL'}`);
    process.exit(result.pass ? 0 : 1);
  }
}

main();
