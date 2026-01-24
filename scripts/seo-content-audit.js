/**
 * SEO Content Audit Script for LessonCraftStudio
 *
 * Checks all product pages against GATE 1 and GATE 1.5 requirements:
 * - GATE 1: Universal keywords appear 5+ times in file
 * - GATE 1.5: Keywords appear 3+ times specifically in title/heading fields
 *
 * Usage: node scripts/seo-content-audit.js [--locale=xx] [--verbose]
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const localeArg = args.find(a => a.startsWith('--locale='));
const filterLocale = localeArg ? localeArg.split('=')[1] : null;
const verbose = args.includes('--verbose');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Universal keywords per language (from Product Page SEO.md)
const UNIVERSAL_KEYWORDS = {
  en: [
    'free worksheet',
    'free worksheet for kids',
    'free worksheets',
    'free printables',
    'worksheet for kids',
    'worksheet for kindergarten',
    'worksheet'
  ],
  de: [
    'kostenloses arbeitsblatt',
    'kostenloses arbeitsblatt für kinder',
    'kostenlose arbeitsblätter',
    'kostenlose druckvorlagen',
    'arbeitsblatt für kinder',
    'arbeitsblatt für vorschule',
    'arbeitsblatt'
  ],
  fr: [
    'fiche gratuite',
    'fiche gratuite pour enfants',
    'fiches gratuites',
    'imprimables gratuits',
    'fiche pour enfants',
    'fiche pour maternelle',
    'fiche'
  ],
  es: [
    'ficha gratis',
    'ficha gratis para niños',
    'fichas gratis',
    'imprimibles gratis',
    'ficha para niños',
    'ficha para preescolar',
    'ficha'
  ],
  pt: [
    'atividade grátis',
    'atividade grátis para crianças',
    'atividades grátis',
    'imprimíveis grátis',
    'atividade para crianças',
    'atividade para educação infantil',
    'atividade'
  ],
  it: [
    'scheda gratuita',
    'scheda gratuita per bambini',
    'schede gratuite',
    'stampabili gratuiti',
    'scheda per bambini',
    "scheda per scuola dell'infanzia",
    'scheda'
  ],
  nl: [
    'gratis werkblad',
    'gratis werkblad voor kinderen',
    'gratis werkbladen',
    'gratis printables',
    'werkblad voor kinderen',
    'werkblad voor kleuters',
    'werkblad'
  ],
  sv: [
    'gratis arbetsblad',
    'gratis arbetsblad för barn',
    'gratis arbetsblad',
    'gratis utskrifter',
    'arbetsblad för barn',
    'arbetsblad för förskoleklass',
    'arbetsblad'
  ],
  da: [
    'gratis arbejdsark',
    'gratis arbejdsark til børn',
    'gratis arbejdsark',
    'gratis printables',
    'arbejdsark til børn',
    'arbejdsark til børnehaveklasse',
    'arbejdsark'
  ],
  no: [
    'gratis arbeidsark',
    'gratis arbeidsark for barn',
    'gratis arbeidsark',
    'gratis utskrifter',
    'arbeidsark for barn',
    'arbeidsark for 1. trinn',
    'arbeidsark'
  ],
  fi: [
    'ilmainen työarkki',
    'ilmainen työarkki lapsille',
    'ilmaiset työarkit',
    'ilmaiset tulosteet',
    'työarkki lapsille',
    'työarkki esiopetukseen',
    'työarkki'
  ],
};

// Minimum thresholds
const GATE1_MIN = 5;  // Minimum occurrences in whole file
const GATE1_5_MIN = 3; // Minimum occurrences in title fields

const CONTENT_DIR = path.join(__dirname, '../frontend/content/product-pages');

/**
 * Count occurrences of a keyword in the entire content (case-insensitive)
 */
function countKeywordInContent(content, keyword) {
  const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  return (content.match(regex) || []).length;
}

/**
 * Extract only title fields from content and count keyword occurrences
 * Title fields: title, sectionTitle, subtitle, question
 */
function countKeywordInTitles(content, keyword) {
  const titles = [];
  let match;

  // Match double-quoted strings (allows single quotes inside)
  const doubleQuotePattern = /^\s*(title|sectionTitle|subtitle|question):\s*"([^"]+)"/gm;
  while ((match = doubleQuotePattern.exec(content)) !== null) {
    titles.push(match[2]);
  }

  // Match single-quoted strings (but stop at unescaped single quote)
  const singleQuotePattern = /^\s*(title|sectionTitle|subtitle|question):\s*'([^']+)'/gm;
  while ((match = singleQuotePattern.exec(content)) !== null) {
    titles.push(match[2]);
  }

  // Also match multiline template literals for titles
  const multiLinePattern = /(title|sectionTitle|subtitle|question):\s*`([^`]+)`/gs;
  while ((match = multiLinePattern.exec(content)) !== null) {
    titles.push(match[2]);
  }

  // Count keyword in extracted titles
  const keywordLower = keyword.toLowerCase();
  return titles.filter(t => t.toLowerCase().includes(keywordLower)).length;
}

/**
 * Audit a single file for GATE 1 and GATE 1.5 compliance
 */
function auditFile(filePath, locale) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.ts');

  const keywords = UNIVERSAL_KEYWORDS[locale] || UNIVERSAL_KEYWORDS['en'];

  const results = {
    locale,
    app: fileName,
    filePath,
    gate1: { pass: true, details: [] },
    gate1_5: { pass: true, details: [] },
    issues: [],
    warnings: []
  };

  // Check each universal keyword
  keywords.forEach((keyword, idx) => {
    const totalCount = countKeywordInContent(content, keyword);
    const titleCount = countKeywordInTitles(content, keyword);

    const keywordResult = {
      keyword,
      totalCount,
      titleCount,
      gate1Pass: totalCount >= GATE1_MIN,
      gate1_5Pass: titleCount >= GATE1_5_MIN
    };

    results.gate1.details.push(keywordResult);
    results.gate1_5.details.push(keywordResult);

    // GATE 1 check
    if (totalCount < GATE1_MIN) {
      results.gate1.pass = false;
      results.issues.push(`GATE 1 FAIL: "${keyword}" appears ${totalCount}x (need ${GATE1_MIN}+)`);
    }

    // GATE 1.5 check
    if (titleCount < GATE1_5_MIN) {
      results.gate1_5.pass = false;
      results.issues.push(`GATE 1.5 FAIL: "${keyword}" appears ${titleCount}x in titles (need ${GATE1_5_MIN}+)`);
    }

    // Warning: keyword in file but not in titles (means it's only in descriptions)
    if (totalCount >= GATE1_MIN && titleCount < GATE1_5_MIN) {
      results.warnings.push(`"${keyword}": found ${totalCount}x total but only ${titleCount}x in titles - keywords likely in descriptions, not headings`);
    }
  });

  return results;
}

/**
 * Run the full audit
 */
function runAudit() {
  const allResults = [];
  const summary = {
    totalPages: 0,
    passingBothGates: 0,
    failingGate1: 0,
    failingGate1_5: 0,
    failingBoth: 0,
    byLocale: {}
  };

  const localesToAudit = filterLocale ? [filterLocale] : LOCALES;

  localesToAudit.forEach(locale => {
    const localeDir = path.join(CONTENT_DIR, locale);

    if (!fs.existsSync(localeDir)) {
      console.log(`Warning: Locale directory not found: ${localeDir}`);
      return;
    }

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));

    summary.byLocale[locale] = {
      total: files.length,
      passing: 0,
      failingGate1: 0,
      failingGate1_5: 0
    };

    files.forEach(file => {
      const filePath = path.join(localeDir, file);
      const result = auditFile(filePath, locale);
      allResults.push(result);
      summary.totalPages++;

      if (result.gate1.pass && result.gate1_5.pass) {
        summary.passingBothGates++;
        summary.byLocale[locale].passing++;
      } else if (!result.gate1.pass && !result.gate1_5.pass) {
        summary.failingBoth++;
        summary.byLocale[locale].failingGate1++;
        summary.byLocale[locale].failingGate1_5++;
      } else if (!result.gate1.pass) {
        summary.failingGate1++;
        summary.byLocale[locale].failingGate1++;
      } else if (!result.gate1_5.pass) {
        summary.failingGate1_5++;
        summary.byLocale[locale].failingGate1_5++;
      }
    });
  });

  // Print report
  console.log('\n' + '='.repeat(80));
  console.log('SEO CONTENT AUDIT REPORT - LessonCraftStudio');
  console.log('='.repeat(80));
  console.log(`\nAudit Date: ${new Date().toISOString()}`);
  console.log(`Locales Audited: ${localesToAudit.join(', ')}`);
  console.log(`\nGATE 1: Universal keywords appear ${GATE1_MIN}+ times in file`);
  console.log(`GATE 1.5: Keywords appear ${GATE1_5_MIN}+ times in title/heading fields`);

  console.log('\n' + '-'.repeat(80));
  console.log('SUMMARY');
  console.log('-'.repeat(80));
  console.log(`Total pages audited: ${summary.totalPages}`);
  console.log(`Passing BOTH gates: ${summary.passingBothGates} (${(summary.passingBothGates/summary.totalPages*100).toFixed(1)}%)`);
  console.log(`Failing GATE 1 only: ${summary.failingGate1}`);
  console.log(`Failing GATE 1.5 only: ${summary.failingGate1_5} (keywords in descriptions, not titles)`);
  console.log(`Failing BOTH gates: ${summary.failingBoth}`);

  console.log('\n' + '-'.repeat(80));
  console.log('BY LOCALE');
  console.log('-'.repeat(80));

  Object.entries(summary.byLocale).forEach(([locale, stats]) => {
    const passRate = (stats.passing / stats.total * 100).toFixed(1);
    console.log(`${locale.toUpperCase()}: ${stats.passing}/${stats.total} passing (${passRate}%) | G1 fail: ${stats.failingGate1} | G1.5 fail: ${stats.failingGate1_5}`);
  });

  // List failing pages
  const failingPages = allResults.filter(r => !r.gate1.pass || !r.gate1_5.pass);

  if (failingPages.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log(`FAILING PAGES (${failingPages.length} total)`);
    console.log('-'.repeat(80));

    failingPages.forEach(page => {
      console.log(`\n[${page.locale.toUpperCase()}] ${page.app}`);
      console.log(`  File: ${page.filePath}`);

      if (verbose) {
        page.issues.forEach(issue => {
          console.log(`  - ${issue}`);
        });
        if (page.warnings.length > 0) {
          console.log('  WARNINGS:');
          page.warnings.forEach(warning => {
            console.log(`    ! ${warning}`);
          });
        }
      } else {
        // Compact view
        const g1Fails = page.gate1.details.filter(d => !d.gate1Pass).length;
        const g1_5Fails = page.gate1_5.details.filter(d => !d.gate1_5Pass).length;
        console.log(`  - GATE 1 fails: ${g1Fails}/7 keywords | GATE 1.5 fails: ${g1_5Fails}/7 keywords`);
      }
    });
  }

  // Write detailed JSON report
  const reportPath = path.join(__dirname, '../SEO_CONTENT_AUDIT_RESULTS.json');
  const detailedReport = {
    generatedAt: new Date().toISOString(),
    summary,
    results: allResults
  };
  fs.writeFileSync(reportPath, JSON.stringify(detailedReport, null, 2));
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Detailed JSON report saved to: ${reportPath}`);
  console.log(`\nRun with --verbose for detailed issue breakdown`);
  console.log(`Run with --locale=xx to audit a specific locale (e.g., --locale=es)`);

  // Exit with error code if any failures
  if (failingPages.length > 0) {
    process.exit(1);
  }
}

// Run the audit
runAudit();
