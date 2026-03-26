#!/usr/bin/env node

/**
 * Swedish SEO Audit Script
 *
 * Audits all 194 Swedish content files across 6 content types for SEO quality.
 * Checks: titleTag length, metaDescription length, keywords, FAQs, internal links,
 * hero title, hero image/alt, and content word count.
 *
 * Usage:
 *   node scripts/audit-sv-seo-all.js                 # Full audit
 *   node scripts/audit-sv-seo-all.js --type app      # Single content type
 *   node scripts/audit-sv-seo-all.js --json           # Save JSON report
 *   node scripts/audit-sv-seo-all.js --verbose        # Show passing checks too
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALE = 'sv';
const args = process.argv.slice(2);
const typeFilter = args.includes('--type') ? args[args.indexOf('--type') + 1] : null;
const saveJson = args.includes('--json');
const verbose = args.includes('--verbose');

// ── Content type configs ──

const CONTENT_TYPES = [
  {
    type: 'app-content',
    shortName: 'app',
    dir: path.join(ROOT, 'frontend', 'config', 'app-content', LOCALE),
    faqRequired: true,
    linksRequired: true,
    heroImageField: 'heroImages', // visuals.heroImages.primary
    minWordCount: 400,
  },
  {
    type: 'tool-content',
    shortName: 'tool',
    dir: path.join(ROOT, 'frontend', 'config', 'tool-content', LOCALE),
    faqRequired: true,
    linksRequired: true,
    heroImageField: 'heroImages',
    minWordCount: 400,
  },
  {
    type: 'guide-content',
    shortName: 'guide',
    dir: path.join(ROOT, 'frontend', 'config', 'guide-content', LOCALE),
    faqRequired: true,
    linksRequired: true,
    heroImageField: 'heroImage',
    minWordCount: 800,
  },
  {
    type: 'bundle-content',
    shortName: 'bundle',
    dir: path.join(ROOT, 'frontend', 'config', 'bundle-content', LOCALE),
    faqRequired: true,
    linksRequired: true,
    heroImageField: 'heroImages',
    minWordCount: 400,
  },
  {
    type: 'idea-content',
    shortName: 'idea',
    dir: path.join(ROOT, 'frontend', 'config', 'idea-content', LOCALE),
    faqRequired: false,
    linksRequired: false,
    heroImageField: null,
    minWordCount: 400,
  },
  {
    type: 'start-content',
    shortName: 'start',
    dir: path.join(ROOT, 'frontend', 'config', 'start-content', LOCALE),
    faqRequired: false,
    linksRequired: false,
    heroImageField: 'heroImage',
    minWordCount: 400,
  },
];

// ── Extraction helpers ──

function extractString(fieldName, source) {
  // Match: fieldName: 'value' or fieldName: `value`
  const reSingle = new RegExp(`(?:^|\\n)\\s*${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's');
  const m = source.match(reSingle);
  if (m) return resolveEscapes(m[1]);
  const reBacktick = new RegExp(`(?:^|\\n)\\s*${fieldName}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``, 's');
  const mb = source.match(reBacktick);
  if (mb) return resolveEscapes(mb[1]);
  return null;
}

function extractNestedString(parent, child, source) {
  // Match: parent: { ... child: 'value' ... }
  const reParent = new RegExp(`${parent}:\\s*\\{([^}]*(?:\\{[^}]*\\}[^}]*)*)\\}`, 's');
  const mp = source.match(reParent);
  if (!mp) return null;
  // Use inline-aware extraction (no newline requirement)
  const reSingle = new RegExp(`${child}:\\s*'((?:[^'\\\\]|\\\\.)*)'`);
  const m = mp[1].match(reSingle);
  if (m) return resolveEscapes(m[1]);
  const reBacktick = new RegExp(`${child}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``);
  const mb = mp[1].match(reBacktick);
  if (mb) return resolveEscapes(mb[1]);
  return null;
}

function resolveEscapes(str) {
  if (!str) return str;
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  const clean = text.replace(/\\n/g, ' ').trim();
  if (!clean) return 0;
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function countArrayItems(fieldName, source) {
  // Find: fieldName: [ ... ] and count objects inside
  const re = new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\n\\s*\\]`, 's');
  const m = source.match(re);
  if (!m) return 0;
  // Count opening { that start an object (heuristic)
  const objects = m[1].match(/\{/g);
  return objects ? objects.length : 0;
}

function extractStringArray(fieldName, source) {
  const re = new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\]`);
  const m = source.match(re);
  if (!m) return [];
  const items = m[1].match(/'([^']*)'/g);
  return items ? items.map(s => s.replace(/'/g, '')) : [];
}

function collectAllText(source) {
  // Collect all string values from the file for word count
  const strings = [];
  // Get description, introduction, content fields
  const descFields = ['description', 'tagline', 'introduction', 'marketOverview'];
  for (const f of descFields) {
    const val = extractString(f, source);
    if (val) strings.push(val);
  }
  // Get text from array items (steps, features, cases, etc.)
  const arrayTextRe = /description:\s*(?:'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`)/gs;
  let m;
  while ((m = arrayTextRe.exec(source)) !== null) {
    strings.push(m[1] || m[2] || '');
  }
  // Get content fields from tutorial/mainContent sections
  const contentRe = /content:\s*(?:'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`)/gs;
  while ((m = contentRe.exec(source)) !== null) {
    strings.push(m[1] || m[2] || '');
  }
  // Get answer fields from FAQs
  const answerRe = /answer:\s*(?:'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`)/gs;
  while ((m = answerRe.exec(source)) !== null) {
    strings.push(m[1] || m[2] || '');
  }
  return strings.join(' ');
}

function hasHeroImage(source, heroImageField) {
  if (!heroImageField) return true; // Not required for this type
  if (heroImageField === 'heroImages') {
    return !!extractNestedString('heroImages', 'primary', source);
  }
  if (heroImageField === 'heroImage') {
    return !!extractNestedString('heroImage', 'src', source);
  }
  return false;
}

function hasHeroAlt(source, heroImageField) {
  if (!heroImageField) return true;
  if (heroImageField === 'heroImages') {
    return !!extractNestedString('heroImages', 'primaryAlt', source);
  }
  if (heroImageField === 'heroImage') {
    return !!extractNestedString('heroImage', 'alt', source);
  }
  return false;
}

// ── Audit logic ──

function auditFile(filePath, config) {
  const source = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.ts');
  const checks = [];

  // 1. titleTag length (50-60 chars)
  const titleTag = extractString('titleTag', source);
  const titleLen = titleTag ? titleTag.length : 0;
  checks.push({
    check: 'titleTag',
    pass: titleLen >= 50 && titleLen <= 60,
    value: titleLen,
    detail: titleTag ? `${titleLen} chars` : 'MISSING',
    severity: titleLen === 0 ? 'error' : (titleLen < 50 || titleLen > 60 ? 'warn' : 'pass'),
  });

  // 2. metaDescription length (150-160 chars)
  const metaDesc = extractString('metaDescription', source);
  const metaLen = metaDesc ? metaDesc.length : 0;
  checks.push({
    check: 'metaDescription',
    pass: metaLen >= 150 && metaLen <= 160,
    value: metaLen,
    detail: metaDesc ? `${metaLen} chars` : 'MISSING',
    severity: metaLen === 0 ? 'error' : (metaLen < 150 || metaLen > 160 ? 'warn' : 'pass'),
  });

  // 3. primaryKeyword
  const pk = extractString('primaryKeyword', source);
  checks.push({
    check: 'primaryKeyword',
    pass: !!pk && pk.length > 0,
    value: pk ? pk.length : 0,
    detail: pk || 'MISSING',
    severity: !pk ? 'error' : 'pass',
  });

  // 4. secondaryKeywords (3+)
  const sk = extractStringArray('secondaryKeywords', source);
  checks.push({
    check: 'secondaryKeywords',
    pass: sk.length >= 3,
    value: sk.length,
    detail: `${sk.length} items`,
    severity: sk.length < 3 ? 'warn' : 'pass',
  });

  // 5. lsiKeywords (3+)
  const lsi = extractStringArray('lsiKeywords', source);
  checks.push({
    check: 'lsiKeywords',
    pass: lsi.length >= 3,
    value: lsi.length,
    detail: `${lsi.length} items`,
    severity: lsi.length < 3 ? 'warn' : 'pass',
  });

  // 6. hero.title (10+ chars)
  const heroTitle = extractString('title', source);
  const heroTitleLen = heroTitle ? heroTitle.length : 0;
  checks.push({
    check: 'heroTitle',
    pass: heroTitleLen >= 10,
    value: heroTitleLen,
    detail: heroTitleLen >= 10 ? `${heroTitleLen} chars` : (heroTitle || 'MISSING'),
    severity: heroTitleLen < 10 ? 'error' : 'pass',
  });

  // 7. FAQ count (5+ for required types)
  const faqCount = countArrayItems('faq', source);
  const faqRequired = config.faqRequired;
  const faqPass = faqRequired ? faqCount >= 5 : (faqCount === 0 || faqCount >= 3);
  checks.push({
    check: 'faqCount',
    pass: faqPass,
    value: faqCount,
    detail: `${faqCount} FAQs${faqRequired ? ' (5+ required)' : ' (optional)'}`,
    severity: faqRequired && faqCount < 5 ? 'warn' : 'pass',
  });

  // 8. internalLinks count (2+)
  const linkCount = countArrayItems('internalLinks', source);
  const linksRequired = config.linksRequired;
  const linksPass = linksRequired ? linkCount >= 2 : true;
  checks.push({
    check: 'internalLinks',
    pass: linksPass,
    value: linkCount,
    detail: `${linkCount} links${linksRequired ? ' (2+ required)' : ' (optional)'}`,
    severity: linksRequired && linkCount < 2 ? 'warn' : 'pass',
  });

  // 9. Hero image present
  const hasImg = hasHeroImage(source, config.heroImageField);
  checks.push({
    check: 'heroImage',
    pass: hasImg,
    value: hasImg ? 1 : 0,
    detail: hasImg ? 'present' : (config.heroImageField ? 'MISSING' : 'N/A'),
    severity: !hasImg && config.heroImageField ? 'warn' : 'pass',
  });

  // 10. Hero image alt text
  const hasAlt = hasHeroAlt(source, config.heroImageField);
  checks.push({
    check: 'heroImageAlt',
    pass: hasAlt,
    value: hasAlt ? 1 : 0,
    detail: hasAlt ? 'present' : (config.heroImageField ? 'MISSING' : 'N/A'),
    severity: !hasAlt && config.heroImageField ? 'warn' : 'pass',
  });

  // 11. Content word count
  const allText = collectAllText(source);
  const wordCount = countWords(allText);
  checks.push({
    check: 'wordCount',
    pass: wordCount >= config.minWordCount,
    value: wordCount,
    detail: `${wordCount} words (min ${config.minWordCount})`,
    severity: wordCount < config.minWordCount ? 'warn' : 'pass',
  });

  const passCount = checks.filter(c => c.pass).length;
  const failCount = checks.filter(c => !c.pass).length;

  return {
    file: fileName,
    type: config.shortName,
    checks,
    passCount,
    failCount,
    score: Math.round((passCount / checks.length) * 100),
  };
}

// ── Main ──

function main() {
  const results = [];
  const summary = {};

  for (const config of CONTENT_TYPES) {
    if (typeFilter && config.shortName !== typeFilter) continue;

    if (!fs.existsSync(config.dir)) {
      console.log(`SKIP: ${config.type}/${LOCALE} directory not found`);
      continue;
    }

    const files = fs.readdirSync(config.dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    summary[config.shortName] = { total: files.length, perfect: 0, failing: 0, issues: {} };

    for (const file of files) {
      const result = auditFile(path.join(config.dir, file), config);
      results.push(result);

      if (result.failCount === 0) {
        summary[config.shortName].perfect++;
      } else {
        summary[config.shortName].failing++;
        for (const check of result.checks) {
          if (!check.pass) {
            summary[config.shortName].issues[check.check] =
              (summary[config.shortName].issues[check.check] || 0) + 1;
          }
        }
      }
    }
  }

  // ── Output ──

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║         SWEDISH SEO AUDIT — ALL 194 PAGES              ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Per-type summary
  let totalFiles = 0;
  let totalPerfect = 0;
  let totalFailing = 0;

  for (const [type, data] of Object.entries(summary)) {
    totalFiles += data.total;
    totalPerfect += data.perfect;
    totalFailing += data.failing;
    const pct = data.total > 0 ? Math.round((data.perfect / data.total) * 100) : 0;
    const status = pct === 100 ? '✓' : '✗';
    console.log(`${status} ${type.padEnd(8)} ${data.perfect}/${data.total} perfect (${pct}%)`);
    if (Object.keys(data.issues).length > 0) {
      for (const [issue, count] of Object.entries(data.issues).sort((a, b) => b[1] - a[1])) {
        console.log(`    └─ ${issue}: ${count} files`);
      }
    }
  }

  console.log(`\n── TOTAL: ${totalPerfect}/${totalFiles} perfect (${Math.round((totalPerfect / totalFiles) * 100)}%) ──\n`);

  // Show failing files
  const failing = results.filter(r => r.failCount > 0);
  if (failing.length > 0) {
    console.log(`\n── ${failing.length} FILES WITH ISSUES ──\n`);
    for (const r of failing) {
      const failedChecks = r.checks.filter(c => !c.pass);
      console.log(`${r.type}/${r.file} (score: ${r.score}%)`);
      for (const c of failedChecks) {
        const icon = c.severity === 'error' ? '✗' : '⚠';
        console.log(`  ${icon} ${c.check}: ${c.detail}`);
      }
    }
  }

  // Verbose: show all results
  if (verbose) {
    console.log('\n── ALL RESULTS ──\n');
    for (const r of results) {
      console.log(`${r.type}/${r.file} — ${r.score}%`);
      for (const c of r.checks) {
        const icon = c.pass ? '✓' : '✗';
        console.log(`  ${icon} ${c.check}: ${c.detail}`);
      }
    }
  }

  // Save JSON report
  if (saveJson) {
    const reportPath = path.join(ROOT, 'scripts', 'sv-seo-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({ summary, results }, null, 2));
    console.log(`\nJSON report saved to: ${reportPath}`);
  }

  // Exit code
  const hasErrors = results.some(r => r.checks.some(c => c.severity === 'error'));
  process.exit(hasErrors ? 1 : 0);
}

main();
