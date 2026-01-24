/**
 * Product Page SEO Audit Script
 *
 * Audits all 363 product pages for SEO compliance
 * Checks keyword density in H2/H3 titles
 *
 * Run with: node scripts/product-page-seo-audit.js
 *
 * SEO GATES:
 * - GATE 1: Keyword density >= 5 keywords in page content
 * - GATE 1.5: Keywords in H2/H3 titles >= 3
 * - Title length: 50-70 characters
 * - Description length: 150-160 characters
 */

const fs = require('fs');
const path = require('path');

// SEO Rules
const SEO_RULES = {
  KEYWORD_DENSITY_MIN: 5,
  KEYWORDS_IN_TITLES_MIN: 3,
  TITLE_MIN: 50,
  TITLE_MAX: 70,
  DESCRIPTION_MIN: 150,
  DESCRIPTION_MAX: 160,
};

// Supported locales
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Primary keywords per language (what we check for)
const PRIMARY_KEYWORDS = {
  en: ['worksheet', 'worksheets', 'free', 'printable', 'kids', 'kindergarten', 'first grade'],
  de: ['arbeitsblatt', 'arbeitsblätter', 'kostenlos', 'kinder', 'kindergarten', 'grundschule'],
  fr: ['fiche', 'fiches', 'gratuit', 'enfants', 'maternelle', 'primaire'],
  es: ['ficha', 'fichas', 'gratis', 'niños', 'preescolar', 'primaria'],
  pt: ['planilha', 'planilhas', 'grátis', 'crianças', 'infantil'],
  it: ['scheda', 'schede', 'gratis', 'bambini', 'scuola'],
  nl: ['werkblad', 'werkbladen', 'gratis', 'kinderen', 'kleuterschool'],
  sv: ['arbetsblad', 'gratis', 'barn', 'förskola'],
  da: ['arbejdsark', 'gratis', 'børn', 'børnehave'],
  no: ['arbeidsark', 'gratis', 'barn', 'barnehage'],
  fi: ['tehtävä', 'tehtävät', 'ilmainen', 'lapset', 'esikoulu'],
};

/**
 * Extract a string value handling escaped quotes
 * @param {string} content - The content to search in
 * @param {string} fieldName - The field name to find
 * @returns {string|null} - The extracted value or null
 */
function extractStringField(content, fieldName) {
  // Find the field
  const fieldRegex = new RegExp(`${fieldName}:\\s*(['"\`])`);
  const fieldMatch = content.match(fieldRegex);
  if (!fieldMatch) return null;

  const quoteChar = fieldMatch[1];
  const startIdx = fieldMatch.index + fieldMatch[0].length;

  // Extract value handling escaped quotes
  let value = '';
  let i = startIdx;
  while (i < content.length) {
    const char = content[i];
    if (char === '\\' && i + 1 < content.length) {
      // Escaped character - add the next char and skip
      value += content[i + 1];
      i += 2;
    } else if (char === quoteChar) {
      // End of string
      break;
    } else {
      value += char;
      i++;
    }
  }

  return value;
}

/**
 * Extract text content from a TypeScript file
 * Focuses on string values in the exported object
 */
function extractTextFromTsFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const strings = [];

    // Find SEO block
    const seoBlockMatch = content.match(/seo:\s*\{([\s\S]*?)\n\s*\},?\s*\n/);
    const seoBlock = seoBlockMatch ? seoBlockMatch[1] : '';

    // Extract seo.title
    const seoTitle = extractStringField(seoBlock, 'title');
    if (seoTitle) {
      strings.push({ type: 'seo.title', text: seoTitle });
    }

    // Extract seo.description
    const seoDesc = extractStringField(seoBlock, 'description');
    if (seoDesc) {
      strings.push({ type: 'seo.description', text: seoDesc });
    }

    // Extract seo.keywords
    const seoKeywords = extractStringField(seoBlock, 'keywords');
    if (seoKeywords) {
      strings.push({ type: 'seo.keywords', text: seoKeywords });
    }

    // Match title fields (for H2/H3 keyword counting)
    const titleMatches = content.matchAll(/title:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/g);
    for (const match of titleMatches) {
      const value = match[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
      strings.push({ type: 'title', text: value });
    }

    // Match sectionTitle fields (H2)
    const sectionTitleMatches = content.matchAll(/sectionTitle:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/g);
    for (const match of sectionTitleMatches) {
      const value = match[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
      strings.push({ type: 'sectionTitle', text: value });
    }

    // Match subtitle fields (H3)
    const subtitleMatches = content.matchAll(/subtitle:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/g);
    for (const match of subtitleMatches) {
      const value = match[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
      strings.push({ type: 'subtitle', text: value });
    }

    // Match question fields (FAQ H3)
    const questionMatches = content.matchAll(/question:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/g);
    for (const match of questionMatches) {
      const value = match[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
      strings.push({ type: 'question', text: value });
    }

    // Match answer fields
    const answerMatches = content.matchAll(/answer:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/g);
    for (const match of answerMatches) {
      const value = match[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
      strings.push({ type: 'answer', text: value });
    }

    // Match description fields
    const descMatches = content.matchAll(/description:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/g);
    for (const match of descMatches) {
      const value = match[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
      strings.push({ type: 'description', text: value });
    }

    return strings;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Count keyword occurrences in text
 */
function countKeywords(text, keywords) {
  const lowerText = text.toLowerCase();
  let count = 0;

  for (const keyword of keywords) {
    const regex = new RegExp(keyword.toLowerCase(), 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      count += matches.length;
    }
  }

  return count;
}

/**
 * Analyze a product page file
 */
function analyzeProductPage(filePath, locale) {
  const strings = extractTextFromTsFile(filePath);
  const keywords = PRIMARY_KEYWORDS[locale] || PRIMARY_KEYWORDS['en'];

  // Get SEO metadata
  const seoTitle = strings.find(s => s.type === 'seo.title')?.text || '';
  const seoDescription = strings.find(s => s.type === 'seo.description')?.text || '';
  const seoKeywords = strings.find(s => s.type === 'seo.keywords')?.text || '';

  // Collect H2/H3 titles (sectionTitle, subtitle, question)
  const h2h3Titles = strings.filter(s =>
    s.type === 'sectionTitle' ||
    s.type === 'subtitle' ||
    s.type === 'title' ||
    s.type === 'question'
  );

  // Count keywords in titles
  let keywordsInTitles = 0;
  for (const title of h2h3Titles) {
    keywordsInTitles += countKeywords(title.text, keywords);
  }

  // Count total keywords in all content
  let totalKeywords = 0;
  for (const str of strings) {
    totalKeywords += countKeywords(str.text, keywords);
  }

  // Build results
  const results = {
    file: path.basename(filePath),
    locale,
    seoTitle: {
      value: seoTitle,
      length: seoTitle.length,
      valid: seoTitle.length >= SEO_RULES.TITLE_MIN && seoTitle.length <= SEO_RULES.TITLE_MAX,
      message: seoTitle.length < SEO_RULES.TITLE_MIN
        ? `Too short (${seoTitle.length} chars, min ${SEO_RULES.TITLE_MIN})`
        : seoTitle.length > SEO_RULES.TITLE_MAX
          ? `Too long (${seoTitle.length} chars, max ${SEO_RULES.TITLE_MAX})`
          : 'OK',
    },
    seoDescription: {
      value: seoDescription.slice(0, 100) + (seoDescription.length > 100 ? '...' : ''),
      length: seoDescription.length,
      valid: seoDescription.length >= SEO_RULES.DESCRIPTION_MIN && seoDescription.length <= SEO_RULES.DESCRIPTION_MAX,
      message: seoDescription.length < SEO_RULES.DESCRIPTION_MIN
        ? `Too short (${seoDescription.length} chars, min ${SEO_RULES.DESCRIPTION_MIN})`
        : seoDescription.length > SEO_RULES.DESCRIPTION_MAX
          ? `Too long (${seoDescription.length} chars, max ${SEO_RULES.DESCRIPTION_MAX})`
          : 'OK',
    },
    gate1: {
      keywordDensity: totalKeywords,
      passed: totalKeywords >= SEO_RULES.KEYWORD_DENSITY_MIN,
      message: totalKeywords >= SEO_RULES.KEYWORD_DENSITY_MIN
        ? `PASS (${totalKeywords} keywords)`
        : `FAIL (${totalKeywords} keywords, min ${SEO_RULES.KEYWORD_DENSITY_MIN})`,
    },
    gate1_5: {
      keywordsInTitles,
      passed: keywordsInTitles >= SEO_RULES.KEYWORDS_IN_TITLES_MIN,
      message: keywordsInTitles >= SEO_RULES.KEYWORDS_IN_TITLES_MIN
        ? `PASS (${keywordsInTitles} in titles)`
        : `FAIL (${keywordsInTitles} in titles, min ${SEO_RULES.KEYWORDS_IN_TITLES_MIN})`,
    },
    h2h3Count: h2h3Titles.length,
  };

  results.overallPassed = results.gate1.passed && results.gate1_5.passed;

  return results;
}

/**
 * Main audit function
 */
async function auditProductPages() {
  console.log('='.repeat(80));
  console.log('PRODUCT PAGE SEO AUDIT REPORT');
  console.log('Generated:', new Date().toISOString());
  console.log('='.repeat(80));
  console.log('');

  const contentDir = path.join(__dirname, '..', 'frontend', 'content', 'product-pages');

  // Track stats
  const stats = {
    totalPages: 0,
    passingPages: 0,
    failingPages: 0,
    byLocale: {},
  };

  const failingFiles = [];
  const allResults = [];

  // Process each locale directory
  for (const locale of LOCALES) {
    const localeDir = path.join(contentDir, locale);

    if (!fs.existsSync(localeDir)) {
      console.log(`Skipping ${locale} - directory not found`);
      continue;
    }

    stats.byLocale[locale] = {
      total: 0,
      passed: 0,
      failed: 0,
    };

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));

    for (const file of files) {
      const filePath = path.join(localeDir, file);
      const result = analyzeProductPage(filePath, locale);

      stats.totalPages++;
      stats.byLocale[locale].total++;
      allResults.push(result);

      if (result.overallPassed) {
        stats.passingPages++;
        stats.byLocale[locale].passed++;
      } else {
        stats.failingPages++;
        stats.byLocale[locale].failed++;
        failingFiles.push(result);
      }
    }
  }

  // Print Summary by Locale
  console.log('='.repeat(80));
  console.log('SUMMARY BY LOCALE');
  console.log('='.repeat(80));
  console.log('');
  console.log('Locale | Total | Passed | Failed | Pass Rate');
  console.log('-'.repeat(60));

  for (const locale of LOCALES) {
    const localeStats = stats.byLocale[locale];
    if (localeStats && localeStats.total > 0) {
      const passRate = Math.round((localeStats.passed / localeStats.total) * 100);
      console.log(
        `${locale.padEnd(6)} | ${String(localeStats.total).padEnd(5)} | ` +
        `${String(localeStats.passed).padEnd(6)} | ${String(localeStats.failed).padEnd(6)} | ${passRate}%`
      );
    }
  }

  // Print Overall Summary
  console.log('');
  console.log('='.repeat(80));
  console.log('OVERALL SUMMARY');
  console.log('='.repeat(80));
  console.log('');
  console.log(`Total Pages Audited: ${stats.totalPages}`);
  console.log(`Passing Pages:       ${stats.passingPages} (${Math.round((stats.passingPages / stats.totalPages) * 100)}%)`);
  console.log(`Failing Pages:       ${stats.failingPages} (${Math.round((stats.failingPages / stats.totalPages) * 100)}%)`);

  // Print Gate Pass Rates
  const gate1PassCount = allResults.filter(r => r.gate1.passed).length;
  const gate1_5PassCount = allResults.filter(r => r.gate1_5.passed).length;

  console.log('');
  console.log('Gate Pass Rates:');
  console.log(`  GATE 1 (Keyword Density >= ${SEO_RULES.KEYWORD_DENSITY_MIN}):    ${gate1PassCount}/${stats.totalPages} (${Math.round((gate1PassCount / stats.totalPages) * 100)}%)`);
  console.log(`  GATE 1.5 (Keywords in Titles >= ${SEO_RULES.KEYWORDS_IN_TITLES_MIN}): ${gate1_5PassCount}/${stats.totalPages} (${Math.round((gate1_5PassCount / stats.totalPages) * 100)}%)`);

  // Print Failing Files (if any)
  if (failingFiles.length > 0) {
    console.log('');
    console.log('='.repeat(80));
    console.log(`FAILING FILES (${failingFiles.length})`);
    console.log('='.repeat(80));
    console.log('');

    // Group by failure type
    const gate1Failures = failingFiles.filter(f => !f.gate1.passed);
    const gate1_5Failures = failingFiles.filter(f => !f.gate1_5.passed);

    if (gate1Failures.length > 0) {
      console.log(`GATE 1 Failures (${gate1Failures.length}):`);
      gate1Failures.slice(0, 20).forEach(f => {
        console.log(`  - [${f.locale}] ${f.file}: ${f.gate1.message}`);
      });
      if (gate1Failures.length > 20) {
        console.log(`  ... and ${gate1Failures.length - 20} more`);
      }
      console.log('');
    }

    if (gate1_5Failures.length > 0) {
      console.log(`GATE 1.5 Failures (${gate1_5Failures.length}):`);
      gate1_5Failures.slice(0, 20).forEach(f => {
        console.log(`  - [${f.locale}] ${f.file}: ${f.gate1_5.message}`);
      });
      if (gate1_5Failures.length > 20) {
        console.log(`  ... and ${gate1_5Failures.length - 20} more`);
      }
      console.log('');
    }
  }

  // Title/Description Issues
  const titleIssues = allResults.filter(r => !r.seoTitle.valid);
  const descIssues = allResults.filter(r => !r.seoDescription.valid);

  if (titleIssues.length > 0 || descIssues.length > 0) {
    console.log('');
    console.log('='.repeat(80));
    console.log('META TAG ISSUES');
    console.log('='.repeat(80));

    if (titleIssues.length > 0) {
      console.log('');
      console.log(`Title Issues (${titleIssues.length}):`);
      titleIssues.slice(0, 10).forEach(f => {
        console.log(`  - [${f.locale}] ${f.file}: ${f.seoTitle.message}`);
      });
      if (titleIssues.length > 10) {
        console.log(`  ... and ${titleIssues.length - 10} more`);
      }
    }

    if (descIssues.length > 0) {
      console.log('');
      console.log(`Description Issues (${descIssues.length}):`);
      descIssues.slice(0, 10).forEach(f => {
        console.log(`  - [${f.locale}] ${f.file}: ${f.seoDescription.message}`);
      });
      if (descIssues.length > 10) {
        console.log(`  ... and ${descIssues.length - 10} more`);
      }
    }
  }

  // Calculate SEO Score
  console.log('');
  console.log('='.repeat(80));
  console.log('SEO SCORE CALCULATION');
  console.log('='.repeat(80));
  console.log('');

  const gate1Score = Math.round((gate1PassCount / stats.totalPages) * 100);
  const gate1_5Score = Math.round((gate1_5PassCount / stats.totalPages) * 100);
  const titleScore = Math.round(((stats.totalPages - titleIssues.length) / stats.totalPages) * 100);
  const descScore = Math.round(((stats.totalPages - descIssues.length) / stats.totalPages) * 100);

  // Weighted overall score
  const overallScore = Math.round(
    (gate1Score * 0.30) +
    (gate1_5Score * 0.30) +
    (titleScore * 0.20) +
    (descScore * 0.20)
  );

  console.log('Component Scores (weighted):');
  console.log(`  GATE 1 - Keyword Density (30%):     ${gate1Score}%`);
  console.log(`  GATE 1.5 - Keywords in Titles (30%): ${gate1_5Score}%`);
  console.log(`  Meta Title Length (20%):            ${titleScore}%`);
  console.log(`  Meta Description Length (20%):      ${descScore}%`);
  console.log('');
  console.log(`OVERALL PRODUCT PAGE SEO SCORE: ${overallScore}/100`);
  console.log(`Grade: ${overallScore >= 95 ? 'A+' : overallScore >= 90 ? 'A' : overallScore >= 80 ? 'B' : overallScore >= 70 ? 'C' : overallScore >= 60 ? 'D' : 'F'}`);

  // Export results to JSON
  const report = {
    generatedAt: new Date().toISOString(),
    stats,
    seoScore: {
      overall: overallScore,
      gate1: gate1Score,
      gate1_5: gate1_5Score,
      metaTitle: titleScore,
      metaDescription: descScore,
    },
    failingFiles: failingFiles.map(f => ({
      file: f.file,
      locale: f.locale,
      gate1: f.gate1,
      gate1_5: f.gate1_5,
    })),
  };

  const reportPath = './product-page-seo-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log('');
  console.log(`Detailed report saved to: ${reportPath}`);

  console.log('');
  console.log('='.repeat(80));
  console.log('AUDIT COMPLETE');
  console.log('='.repeat(80));

  return report;
}

// Run the audit
auditProductPages().catch(error => {
  console.error('Audit failed:', error);
  process.exit(1);
});
