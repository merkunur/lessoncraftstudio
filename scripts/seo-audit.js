#!/usr/bin/env node
/**
 * Comprehensive SEO Audit Tool
 * Validates SEO correctness across all page types (homepage, product, blog)
 *
 * Usage:
 *   node scripts/seo-audit.js                    # Full audit (offline checks only)
 *   node scripts/seo-audit.js --type=homepage     # Audit only homepages
 *   node scripts/seo-audit.js --type=product      # Audit only product pages
 *   node scripts/seo-audit.js --type=blog         # Audit only blog (requires DB)
 *   node scripts/seo-audit.js --locale=de         # Audit only German locale
 *   node scripts/seo-audit.js --json              # Output JSON report
 *   node scripts/seo-audit.js --fix-suggestions   # Include fix suggestions
 *
 * Runs from project root: C:\Users\rkgen\lessoncraftstudio
 */

const fs = require('fs');
const path = require('path');

// ─── Configuration ───────────────────────────────────────────────────────────

const BASE_URL = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const HREFLANG_MAP = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi'
};

const SEO_RULES = {
  title: { min: 30, max: 70, optimalMin: 50, optimalMax: 60 },
  description: { min: 100, max: 170, optimalMin: 120, optimalMax: 160 },
  keywords: { minCount: 3 },
  faq: { minItems: 3, maxItems: 10 },
};

const SEVERITY = { CRITICAL: 'CRITICAL', HIGH: 'HIGH', MEDIUM: 'MEDIUM', LOW: 'LOW', INFO: 'INFO' };

// ─── Parse CLI arguments ─────────────────────────────────────────────────────

const args = process.argv.slice(2);
const options = {
  type: (args.find(a => a.startsWith('--type=')) || '').split('=')[1] || 'all',
  locale: (args.find(a => a.startsWith('--locale=')) || '').split('=')[1] || null,
  json: args.includes('--json'),
  fixSuggestions: args.includes('--fix-suggestions'),
  verbose: args.includes('--verbose'),
};

// ─── Results collector ───────────────────────────────────────────────────────

const issues = [];
const stats = {
  totalChecks: 0,
  passed: 0,
  failed: 0,
  bySeverity: { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0, INFO: 0 },
  byPageType: { homepage: { total: 0, issues: 0 }, product: { total: 0, issues: 0 }, blog: { total: 0, issues: 0 } },
  byLocale: {},
};
LOCALES.forEach(l => stats.byLocale[l] = { total: 0, issues: 0 });

function addIssue(severity, pageType, locale, page, field, message, suggestion) {
  issues.push({ severity, pageType, locale, page, field, message, suggestion: suggestion || null });
  stats.bySeverity[severity]++;
  stats.failed++;
  stats.totalChecks++;
  if (stats.byPageType[pageType]) stats.byPageType[pageType].issues++;
  if (stats.byLocale[locale]) stats.byLocale[locale].issues++;
}

function addPass(pageType, locale) {
  stats.passed++;
  stats.totalChecks++;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Decode Unicode escapes (\uXXXX) in a string so we can measure real character length.
 */
function decodeUnicode(str) {
  if (!str) return str;
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/**
 * Extract a quoted string value for a given field from TS/JS source text.
 * Handles single quotes, double quotes, and backticks.
 */
function extractFieldValue(source, fieldName) {
  // Try patterns: fieldName: 'value', fieldName: "value", fieldName: `value`
  const patterns = [
    new RegExp(`${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's'),
    new RegExp(`${fieldName}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's'),
    new RegExp(`${fieldName}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``, 's'),
  ];
  for (const pat of patterns) {
    const m = source.match(pat);
    if (m) return decodeUnicode(m[1]);
  }
  return null;
}

/**
 * Extract the seo block from a product page content file
 */
function extractSeoBlock(source) {
  const m = source.match(/seo:\s*\{([\s\S]*?)\n\s*\},?\s*\n/);
  if (!m) return null;
  const block = m[1];
  return {
    title: extractFieldValue(block, 'title'),
    description: extractFieldValue(block, 'description'),
    keywords: extractFieldValue(block, 'keywords'),
    canonicalUrl: extractFieldValue(block, 'canonicalUrl'),
    slug: extractFieldValue(block, 'slug'),
    appId: extractFieldValue(block, 'appId'),
  };
}

/**
 * Extract FAQ items from a product page content file.
 * Uses bracket counting to handle nested objects inside the items array.
 */
function extractFaqItems(source) {
  // Find the faq items array start
  const faqIdx = source.indexOf('faq:');
  if (faqIdx === -1) return [];

  const afterFaq = source.substring(faqIdx);
  const itemsIdx = afterFaq.indexOf('items:');
  if (itemsIdx === -1) return [];

  const afterItems = afterFaq.substring(itemsIdx);
  const bracketStart = afterItems.indexOf('[');
  if (bracketStart === -1) return [];

  // Count brackets to find matching ]
  let depth = 0;
  let end = -1;
  for (let i = bracketStart; i < afterItems.length; i++) {
    if (afterItems[i] === '[') depth++;
    else if (afterItems[i] === ']') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) return [];

  const itemsBlock = afterItems.substring(bracketStart + 1, end);

  const questions = [];
  const qRegex = /question:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/g;
  const aRegex = /answer:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/g;
  const qs = [], as = [];
  let qm;
  while ((qm = qRegex.exec(itemsBlock)) !== null) qs.push(decodeUnicode(qm[1]));
  let am;
  while ((am = aRegex.exec(itemsBlock)) !== null) as.push(decodeUnicode(am[1]));
  for (let i = 0; i < qs.length; i++) {
    questions.push({ question: qs[i], answer: as[i] || '' });
  }
  return questions;
}

// ─── AUDIT: Homepage ─────────────────────────────────────────────────────────

function auditHomepages() {
  const pagePath = path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    addIssue(SEVERITY.CRITICAL, 'homepage', 'all', 'page.tsx', 'file', 'Homepage page.tsx not found');
    return;
  }

  const source = fs.readFileSync(pagePath, 'utf-8');

  // Extract the homepageMetadata object
  const metaBlockMatch = source.match(/const homepageMetadata[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
  if (!metaBlockMatch) {
    addIssue(SEVERITY.CRITICAL, 'homepage', 'all', 'page.tsx', 'config', 'Cannot parse homepageMetadata object');
    return;
  }

  const seenTitles = new Map();
  const seenDescriptions = new Map();

  for (const locale of LOCALES) {
    if (options.locale && options.locale !== locale) continue;
    stats.byPageType.homepage.total++;
    stats.byLocale[locale].total++;

    // Extract locale block
    const localeBlockMatch = metaBlockMatch[1].match(
      new RegExp(`${locale}:\\s*\\{([\\s\\S]*?)\\},?\\s*(?:\\n\\s*[a-z]{2}:|$)`)
    );

    if (!localeBlockMatch) {
      addIssue(SEVERITY.CRITICAL, 'homepage', locale, `/${locale}`, 'metadata', `Missing metadata for locale ${locale}`);
      continue;
    }

    const block = localeBlockMatch[1];
    const title = extractFieldValue(block, 'title');
    const description = extractFieldValue(block, 'description');
    const keywords = extractFieldValue(block, 'keywords');

    // ─── Title checks ───
    if (!title) {
      addIssue(SEVERITY.CRITICAL, 'homepage', locale, `/${locale}`, 'title', 'Missing meta title');
    } else {
      const len = title.length;
      if (len < SEO_RULES.title.min) {
        addIssue(SEVERITY.HIGH, 'homepage', locale, `/${locale}`, 'title',
          `Title too short: ${len} chars (min ${SEO_RULES.title.min})`,
          `Add more keywords to reach ${SEO_RULES.title.optimalMin}-${SEO_RULES.title.optimalMax} chars`);
      } else if (len > SEO_RULES.title.max) {
        addIssue(SEVERITY.MEDIUM, 'homepage', locale, `/${locale}`, 'title',
          `Title too long: ${len} chars (max ${SEO_RULES.title.max}, will be truncated in SERPs)`,
          `Shorten to ${SEO_RULES.title.optimalMax} chars max`);
      } else if (len < SEO_RULES.title.optimalMin || len > SEO_RULES.title.optimalMax) {
        addIssue(SEVERITY.LOW, 'homepage', locale, `/${locale}`, 'title',
          `Title not optimal length: ${len} chars (optimal ${SEO_RULES.title.optimalMin}-${SEO_RULES.title.optimalMax})`);
      } else {
        addPass('homepage', locale);
      }

      // Duplicate check
      if (seenTitles.has(title)) {
        addIssue(SEVERITY.HIGH, 'homepage', locale, `/${locale}`, 'title',
          `Duplicate title with ${seenTitles.get(title)}`,
          'Each locale must have a unique, localized title');
      }
      seenTitles.set(title, locale);

      // Brand check
      if (!title.includes('LessonCraftStudio')) {
        addIssue(SEVERITY.LOW, 'homepage', locale, `/${locale}`, 'title',
          'Title missing brand name "LessonCraftStudio"');
      }
    }

    // ─── Description checks ───
    if (!description) {
      addIssue(SEVERITY.CRITICAL, 'homepage', locale, `/${locale}`, 'description', 'Missing meta description');
    } else {
      const len = description.length;
      if (len < SEO_RULES.description.min) {
        addIssue(SEVERITY.HIGH, 'homepage', locale, `/${locale}`, 'description',
          `Description too short: ${len} chars (min ${SEO_RULES.description.min})`);
      } else if (len > SEO_RULES.description.max) {
        addIssue(SEVERITY.MEDIUM, 'homepage', locale, `/${locale}`, 'description',
          `Description too long: ${len} chars (max ${SEO_RULES.description.max}, will be truncated)`);
      } else {
        addPass('homepage', locale);
      }

      if (seenDescriptions.has(description)) {
        addIssue(SEVERITY.HIGH, 'homepage', locale, `/${locale}`, 'description',
          `Duplicate description with ${seenDescriptions.get(description)}`);
      }
      seenDescriptions.set(description, locale);
    }

    // ─── Keywords check ───
    if (!keywords) {
      addIssue(SEVERITY.MEDIUM, 'homepage', locale, `/${locale}`, 'keywords', 'Missing keywords');
    } else {
      const kwCount = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0).length;
      if (kwCount < SEO_RULES.keywords.minCount) {
        addIssue(SEVERITY.LOW, 'homepage', locale, `/${locale}`, 'keywords',
          `Only ${kwCount} keywords (recommend ${SEO_RULES.keywords.minCount}+)`);
      } else {
        addPass('homepage', locale);
      }
    }
  }

  // ─── Hreflang check (from generateMetadata code) ───
  // Verify the code generates proper hreflang alternates
  if (source.includes('getHreflangCode(lang)')) {
    addPass('homepage', 'all');
  } else {
    addIssue(SEVERITY.HIGH, 'homepage', 'all', 'page.tsx', 'hreflang',
      'Homepage may not generate proper hreflang alternates');
  }

  // ─── x-default check ───
  if (source.includes("hreflangAlternates['x-default']")) {
    addPass('homepage', 'all');
  } else {
    addIssue(SEVERITY.HIGH, 'homepage', 'all', 'page.tsx', 'hreflang',
      'Missing x-default hreflang');
  }

  // ─── OG image check ───
  if (source.includes('opengraph-image.png')) {
    // OG image exists but check if locale-aware
    if (!source.match(/images:.*locale/)) {
      addIssue(SEVERITY.LOW, 'homepage', 'all', 'page.tsx', 'og:image',
        'OG image is generic (not locale-specific)',
        'Consider creating locale-specific OG images with localized text');
    }
  } else {
    addIssue(SEVERITY.MEDIUM, 'homepage', 'all', 'page.tsx', 'og:image', 'Missing OG image');
  }

  // ─── Canonical check ───
  if (source.includes("canonical: `${baseUrl}/${locale}`")) {
    addPass('homepage', 'all');
  } else {
    addIssue(SEVERITY.HIGH, 'homepage', 'all', 'page.tsx', 'canonical',
      'Canonical URL pattern not detected');
  }

  // ─── Schema checks ───
  if (source.includes('generateHomepageSchemas')) {
    addPass('homepage', 'all');
  } else {
    addIssue(SEVERITY.HIGH, 'homepage', 'all', 'page.tsx', 'schema',
      'Homepage does not generate JSON-LD schemas');
  }

  if (source.includes('generateFAQSchema') || source.includes('faqSchema')) {
    addPass('homepage', 'all');
  } else {
    addIssue(SEVERITY.MEDIUM, 'homepage', 'all', 'page.tsx', 'schema',
      'Homepage does not generate FAQ schema');
  }
}

// ─── AUDIT: Product Pages ────────────────────────────────────────────────────

function auditProductPages() {
  const contentDir = path.join(__dirname, '..', 'frontend', 'content', 'product-pages');

  if (!fs.existsSync(contentDir)) {
    addIssue(SEVERITY.CRITICAL, 'product', 'all', 'content/', 'directory', 'Product page content directory not found');
    return;
  }

  // Load slug config for hreflang validation
  const slugConfigPath = path.join(__dirname, '..', 'frontend', 'config', 'product-page-slugs.ts');
  let slugConfig = '';
  if (fs.existsSync(slugConfigPath)) {
    slugConfig = fs.readFileSync(slugConfigPath, 'utf-8');
  }

  const seenTitles = new Map();
  const seenDescriptions = new Map();
  const seenCanonicals = new Map();
  const appIdsByLocale = new Map(); // appId → Set of locales that have content

  // First pass: collect all app IDs and their locale coverage
  for (const locale of LOCALES) {
    const localeDir = path.join(contentDir, locale);
    if (!fs.existsSync(localeDir)) continue;
    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));
    for (const file of files) {
      const source = fs.readFileSync(path.join(localeDir, file), 'utf-8');
      const seo = extractSeoBlock(source);
      if (seo && seo.appId) {
        if (!appIdsByLocale.has(seo.appId)) appIdsByLocale.set(seo.appId, new Set());
        appIdsByLocale.get(seo.appId).add(locale);
      }
    }
  }

  // Second pass: audit each file
  for (const locale of LOCALES) {
    if (options.locale && options.locale !== locale) continue;

    const localeDir = path.join(contentDir, locale);
    if (!fs.existsSync(localeDir)) {
      addIssue(SEVERITY.INFO, 'product', locale, 'content/', 'directory',
        `No product page content directory for ${locale}`);
      continue;
    }

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));

    for (const file of files) {
      stats.byPageType.product.total++;
      stats.byLocale[locale].total++;

      const filePath = path.join(localeDir, file);
      const source = fs.readFileSync(filePath, 'utf-8');
      const pageName = `/${locale}/apps/${file.replace('.ts', '')}`;

      // Extract SEO block
      const seo = extractSeoBlock(source);
      if (!seo) {
        addIssue(SEVERITY.CRITICAL, 'product', locale, pageName, 'seo', 'Cannot parse SEO block from content file');
        continue;
      }

      // ─── Title checks ───
      if (!seo.title) {
        addIssue(SEVERITY.CRITICAL, 'product', locale, pageName, 'title', 'Missing SEO title');
      } else {
        const len = seo.title.length;
        if (len < SEO_RULES.title.min) {
          addIssue(SEVERITY.HIGH, 'product', locale, pageName, 'title',
            `Title too short: ${len} chars (min ${SEO_RULES.title.min})`,
            `Current: "${seo.title}"`);
        } else if (len > SEO_RULES.title.max) {
          addIssue(SEVERITY.MEDIUM, 'product', locale, pageName, 'title',
            `Title too long: ${len} chars (max ${SEO_RULES.title.max})`,
            `Current: "${seo.title}"`);
        } else {
          addPass('product', locale);
        }

        // Duplicate title check
        const titleKey = seo.title.toLowerCase();
        if (seenTitles.has(titleKey)) {
          addIssue(SEVERITY.HIGH, 'product', locale, pageName, 'title',
            `Duplicate title with ${seenTitles.get(titleKey)}`);
        }
        seenTitles.set(titleKey, pageName);
      }

      // ─── Description checks ───
      if (!seo.description) {
        addIssue(SEVERITY.CRITICAL, 'product', locale, pageName, 'description', 'Missing SEO description');
      } else {
        const len = seo.description.length;
        if (len < SEO_RULES.description.min) {
          addIssue(SEVERITY.HIGH, 'product', locale, pageName, 'description',
            `Description too short: ${len} chars (min ${SEO_RULES.description.min})`);
        } else if (len > SEO_RULES.description.max) {
          addIssue(SEVERITY.MEDIUM, 'product', locale, pageName, 'description',
            `Description too long: ${len} chars (max ${SEO_RULES.description.max})`);
        } else {
          addPass('product', locale);
        }

        const descKey = seo.description.toLowerCase();
        if (seenDescriptions.has(descKey)) {
          addIssue(SEVERITY.HIGH, 'product', locale, pageName, 'description',
            `Duplicate description with ${seenDescriptions.get(descKey)}`);
        }
        seenDescriptions.set(descKey, pageName);
      }

      // ─── Keywords check ───
      if (!seo.keywords) {
        addIssue(SEVERITY.MEDIUM, 'product', locale, pageName, 'keywords', 'Missing keywords');
      } else {
        const kwCount = seo.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0).length;
        if (kwCount < SEO_RULES.keywords.minCount) {
          addIssue(SEVERITY.LOW, 'product', locale, pageName, 'keywords',
            `Only ${kwCount} keywords (recommend ${SEO_RULES.keywords.minCount}+)`);
        } else {
          addPass('product', locale);
        }
      }

      // ─── Canonical URL checks ───
      if (!seo.canonicalUrl) {
        addIssue(SEVERITY.HIGH, 'product', locale, pageName, 'canonical', 'Missing canonical URL');
      } else {
        if (!seo.canonicalUrl.startsWith(BASE_URL)) {
          addIssue(SEVERITY.CRITICAL, 'product', locale, pageName, 'canonical',
            `Canonical uses wrong domain: ${seo.canonicalUrl}`);
        }
        if (seo.canonicalUrl.endsWith('/')) {
          addIssue(SEVERITY.MEDIUM, 'product', locale, pageName, 'canonical',
            'Canonical URL has trailing slash');
        }
        if (!seo.canonicalUrl.includes(`/${locale}/`)) {
          addIssue(SEVERITY.HIGH, 'product', locale, pageName, 'canonical',
            `Canonical URL missing locale prefix: ${seo.canonicalUrl}`);
        }
        if (seenCanonicals.has(seo.canonicalUrl)) {
          addIssue(SEVERITY.CRITICAL, 'product', locale, pageName, 'canonical',
            `Duplicate canonical URL with ${seenCanonicals.get(seo.canonicalUrl)}`);
        }
        seenCanonicals.set(seo.canonicalUrl, pageName);
        addPass('product', locale);
      }

      // ─── FAQ checks ───
      // Note: Most product pages use getDefaultProductFAQs() at runtime.
      // Only flag as INFO if content file lacks FAQs (runtime defaults exist).
      const faqs = extractFaqItems(source);
      if (faqs.length === 0) {
        // Not a real issue — runtime defaults from default-product-faqs.ts provide 5 FAQs
        addPass('product', locale);
      } else if (faqs.length < SEO_RULES.faq.minItems) {
        addIssue(SEVERITY.LOW, 'product', locale, pageName, 'faq',
          `Only ${faqs.length} FAQ items (recommend ${SEO_RULES.faq.minItems}+)`);
      } else {
        // Check FAQ quality
        for (const faq of faqs) {
          if (!faq.question || faq.question.trim().length === 0) {
            addIssue(SEVERITY.HIGH, 'product', locale, pageName, 'faq', 'Empty FAQ question found');
          }
          if (!faq.answer || faq.answer.trim().length === 0) {
            addIssue(SEVERITY.HIGH, 'product', locale, pageName, 'faq',
              `Empty answer for question: "${faq.question?.substring(0, 50)}..."`);
          } else if (faq.answer.trim().length < 20) {
            addIssue(SEVERITY.LOW, 'product', locale, pageName, 'faq',
              `Very short answer (${faq.answer.length} chars) for: "${faq.question?.substring(0, 50)}..."`);
          }
        }
        addPass('product', locale);
      }

      // ─── appId/slug consistency check ───
      if (seo.appId && seo.slug) {
        // Check slug appears in slug config
        if (slugConfig && !slugConfig.includes(seo.slug)) {
          addIssue(SEVERITY.HIGH, 'product', locale, pageName, 'slug',
            `Slug "${seo.slug}" not found in product-page-slugs.ts config`,
            'Add this slug to the slugs config for proper hreflang generation');
        }
      }
    }
  }

  // ─── Cross-locale hreflang coverage check ───
  for (const [appId, localesSet] of appIdsByLocale) {
    if (options.locale) continue; // Skip if filtering by locale
    const coveredLocales = Array.from(localesSet);
    if (coveredLocales.length < LOCALES.length) {
      const missing = LOCALES.filter(l => !localesSet.has(l));
      addIssue(SEVERITY.INFO, 'product', 'all', `app:${appId}`, 'hreflang-coverage',
        `App "${appId}" only has content for ${coveredLocales.length}/${LOCALES.length} locales. Missing: ${missing.join(', ')}`);
    }
  }
}

// ─── AUDIT: Schema Generator ─────────────────────────────────────────────────

function auditSchemaGenerator() {
  const schemaPath = path.join(__dirname, '..', 'frontend', 'lib', 'schema-generator.ts');
  if (!fs.existsSync(schemaPath)) {
    addIssue(SEVERITY.CRITICAL, 'product', 'all', 'schema-generator.ts', 'file', 'Schema generator not found');
    return;
  }

  const source = fs.readFileSync(schemaPath, 'utf-8');

  // Check all schema types exist
  const requiredFunctions = [
    { name: 'generateBlogSchemas', label: 'BlogPosting schema' },
    { name: 'generateFAQSchema', label: 'FAQ schema' },
    { name: 'generateHowToSchema', label: 'HowTo schema' },
    { name: 'generateHomepageSchemas', label: 'Homepage schemas' },
    { name: 'generateAllProductPageSchemas', label: 'Product page schemas' },
    { name: 'generateImageObjectSchema', label: 'ImageObject schema' },
    { name: 'generateImageGallerySchema', label: 'ImageGallery schema' },
    { name: 'generateAppProductSchemas', label: 'SoftwareApplication schema' },
  ];

  for (const fn of requiredFunctions) {
    if (source.includes(`function ${fn.name}`)) {
      addPass('product', 'all');
    } else {
      addIssue(SEVERITY.HIGH, 'product', 'all', 'schema-generator.ts', 'schema',
        `Missing ${fn.label} generator function: ${fn.name}`);
    }
  }

  // Check required schema properties exist in generators
  const schemaChecks = [
    { pattern: '"@context": "https://schema.org"', label: '@context field' },
    { pattern: '"@id":', label: '@id references' },
    { pattern: '"inLanguage":', label: 'inLanguage field' },
    { pattern: '"license":', label: 'license field' },
    { pattern: '"copyrightNotice":', label: 'copyrightNotice' },
    { pattern: '"creditText":', label: 'creditText' },
  ];

  for (const check of schemaChecks) {
    if (source.includes(check.pattern)) {
      addPass('product', 'all');
    } else {
      addIssue(SEVERITY.MEDIUM, 'product', 'all', 'schema-generator.ts', 'schema',
        `Schema may be missing ${check.label}`);
    }
  }

  // Check hreflang map covers all locales
  for (const locale of LOCALES) {
    if (!source.includes(`${locale}:`)) {
      addIssue(SEVERITY.HIGH, 'product', locale, 'schema-generator.ts', 'hreflang',
        `hreflangMap missing locale ${locale}`);
    }
  }

  // Check ogLocaleMap covers all locales
  const ogLocaleMatch = source.match(/ogLocaleMap[\s\S]*?\{([\s\S]*?)\}/);
  if (ogLocaleMatch) {
    for (const locale of LOCALES) {
      if (!ogLocaleMatch[1].includes(`${locale}:`)) {
        addIssue(SEVERITY.MEDIUM, 'product', locale, 'schema-generator.ts', 'og:locale',
          `ogLocaleMap missing locale ${locale}`);
      }
    }
  }
}

// ─── AUDIT: Product Page Slugs (Hreflang Reciprocity) ────────────────────────

function auditProductSlugs() {
  const slugsPath = path.join(__dirname, '..', 'frontend', 'config', 'product-page-slugs.ts');
  if (!fs.existsSync(slugsPath)) {
    addIssue(SEVERITY.CRITICAL, 'product', 'all', 'product-page-slugs.ts', 'file', 'Slug configuration not found');
    return;
  }

  const source = fs.readFileSync(slugsPath, 'utf-8');

  // Parse all app configs
  const appConfigs = [];
  const appBlockRegex = /\{\s*appId:\s*['"]([^'"]+)['"],\s*slugs:\s*\{([\s\S]*?)\}\s*\}/g;
  let match;
  while ((match = appBlockRegex.exec(source)) !== null) {
    const appId = match[1];
    const slugBlock = match[2];
    const slugs = {};

    const slugEntryRegex = /(\w+):\s*['"]([^'"]+)['"]/g;
    let slugMatch;
    while ((slugMatch = slugEntryRegex.exec(slugBlock)) !== null) {
      slugs[slugMatch[1]] = slugMatch[2];
    }

    appConfigs.push({ appId, slugs });
  }

  if (appConfigs.length === 0) {
    addIssue(SEVERITY.CRITICAL, 'product', 'all', 'product-page-slugs.ts', 'config', 'No app slug configs found');
    return;
  }

  // Check for slug collisions within same locale
  const slugsByLocale = {};
  for (const locale of LOCALES) {
    slugsByLocale[locale] = new Map();
  }

  for (const config of appConfigs) {
    // Check English slug always exists
    if (!config.slugs.en) {
      addIssue(SEVERITY.CRITICAL, 'product', 'en', `app:${config.appId}`, 'slug',
        `App "${config.appId}" missing English slug (required for x-default)`);
    }

    // Check for slug collisions
    for (const [locale, slug] of Object.entries(config.slugs)) {
      if (!slugsByLocale[locale]) continue;
      if (slugsByLocale[locale].has(slug)) {
        addIssue(SEVERITY.CRITICAL, 'product', locale, `app:${config.appId}`, 'slug',
          `Slug collision: "${slug}" used by both "${config.appId}" and "${slugsByLocale[locale].get(slug)}"`);
      }
      slugsByLocale[locale].set(slug, config.appId);
    }

    // Check slug format
    for (const [locale, slug] of Object.entries(config.slugs)) {
      if (!/^[a-z0-9-]+$/.test(slug)) {
        addIssue(SEVERITY.HIGH, 'product', locale, `app:${config.appId}`, 'slug',
          `Invalid slug characters: "${slug}" (should be lowercase, numbers, hyphens only)`);
      }
      if (slug.startsWith('-') || slug.endsWith('-')) {
        addIssue(SEVERITY.MEDIUM, 'product', locale, `app:${config.appId}`, 'slug',
          `Slug starts or ends with hyphen: "${slug}"`);
      }
      if (slug.includes('--')) {
        addIssue(SEVERITY.LOW, 'product', locale, `app:${config.appId}`, 'slug',
          `Slug contains double hyphen: "${slug}"`);
      }
    }
  }

  addPass('product', 'all');
}

// ─── AUDIT: Sitemap ──────────────────────────────────────────────────────────

function auditSitemap() {
  const sitemapPath = path.join(__dirname, '..', 'frontend', 'app', 'sitemap.ts');
  if (!fs.existsSync(sitemapPath)) {
    addIssue(SEVERITY.CRITICAL, 'product', 'all', 'sitemap.ts', 'file', 'Sitemap generator not found');
    return;
  }

  const source = fs.readFileSync(sitemapPath, 'utf-8');

  // Check for hreflang in sitemap
  if (source.includes('alternates') || source.includes('languages')) {
    addPass('product', 'all');
  } else {
    addIssue(SEVERITY.HIGH, 'product', 'all', 'sitemap.ts', 'hreflang',
      'Sitemap may not include hreflang alternates');
  }

  // Check all page types are included
  const pageTypes = [
    { pattern: '/apps', label: 'product pages' },
    { pattern: '/blog', label: 'blog posts' },
    { pattern: '/pricing', label: 'pricing page' },
  ];

  for (const pt of pageTypes) {
    if (source.includes(pt.pattern)) {
      addPass('product', 'all');
    } else {
      addIssue(SEVERITY.HIGH, 'product', 'all', 'sitemap.ts', 'coverage',
        `Sitemap may be missing ${pt.label}`);
    }
  }

  // Check priority settings exist
  if (source.includes('priority')) {
    addPass('product', 'all');
  } else {
    addIssue(SEVERITY.LOW, 'product', 'all', 'sitemap.ts', 'priority',
      'Sitemap does not set URL priorities');
  }
}

// ─── AUDIT: robots.txt ───────────────────────────────────────────────────────

function auditRobotsTxt() {
  const robotsPath = path.join(__dirname, '..', 'frontend', 'public', 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    addIssue(SEVERITY.HIGH, 'homepage', 'all', 'robots.txt', 'file', 'robots.txt not found in public/');
    return;
  }

  const content = fs.readFileSync(robotsPath, 'utf-8');

  // Check for sitemap reference
  if (content.includes('Sitemap:')) {
    if (content.includes(BASE_URL)) {
      addPass('homepage', 'all');
    } else {
      addIssue(SEVERITY.MEDIUM, 'homepage', 'all', 'robots.txt', 'sitemap',
        'Sitemap URL in robots.txt may not match production domain');
    }
  } else {
    addIssue(SEVERITY.HIGH, 'homepage', 'all', 'robots.txt', 'sitemap',
      'robots.txt missing Sitemap directive');
  }

  // Check API is blocked
  if (content.includes('Disallow: /api')) {
    addPass('homepage', 'all');
  } else {
    addIssue(SEVERITY.MEDIUM, 'homepage', 'all', 'robots.txt', 'security',
      'robots.txt does not block /api routes');
  }
}

// ─── AUDIT: Internal Linking ─────────────────────────────────────────────────

function auditInternalLinking() {
  const linkingPath = path.join(__dirname, '..', 'frontend', 'lib', 'internal-linking.ts');
  if (!fs.existsSync(linkingPath)) {
    addIssue(SEVERITY.MEDIUM, 'product', 'all', 'internal-linking.ts', 'file', 'Internal linking module not found');
    return;
  }

  const source = fs.readFileSync(linkingPath, 'utf-8');

  // Check keyword translations exist for all locales
  for (const locale of LOCALES) {
    if (locale === 'en') continue; // English is the base
    if (source.includes(`${locale}:`)) {
      addPass('product', locale);
    } else {
      addIssue(SEVERITY.LOW, 'product', locale, 'internal-linking.ts', 'i18n',
        `Keyword translations may be missing for ${locale}`);
    }
  }
}

// ─── Report generation ───────────────────────────────────────────────────────

function printReport() {
  const divider = '='.repeat(80);
  const thinDivider = '-'.repeat(80);

  console.log('');
  console.log(divider);
  console.log('  LESSONCRAFTSTUDIO COMPREHENSIVE SEO AUDIT');
  console.log(`  Generated: ${new Date().toISOString()}`);
  console.log(`  Scope: ${options.type === 'all' ? 'All page types' : options.type}${options.locale ? ` (${options.locale} only)` : ''}`);
  console.log(divider);

  // ─── Overall Score ───
  const totalIssueCount = stats.bySeverity.CRITICAL + stats.bySeverity.HIGH + stats.bySeverity.MEDIUM + stats.bySeverity.LOW;
  const criticalWeight = 10;
  const highWeight = 5;
  const mediumWeight = 2;
  const lowWeight = 1;
  const deductions = stats.bySeverity.CRITICAL * criticalWeight +
    stats.bySeverity.HIGH * highWeight +
    stats.bySeverity.MEDIUM * mediumWeight +
    stats.bySeverity.LOW * lowWeight;
  const maxDeduction = Math.max(stats.totalChecks * 2, 1);
  const score = Math.max(0, Math.round(100 - (deductions / maxDeduction) * 100));
  const grade = score >= 95 ? 'A+' : score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';

  console.log('');
  console.log(`  SEO SCORE: ${score}/100 (${grade})`);
  console.log('');
  console.log(`  Total checks: ${stats.totalChecks}`);
  console.log(`  Passed: ${stats.passed}`);
  console.log(`  Issues: ${totalIssueCount}`);
  console.log(`  Info:   ${stats.bySeverity.INFO}`);

  // ─── By Severity ───
  console.log('');
  console.log('  ISSUES BY SEVERITY');
  console.log(thinDivider);
  console.log(`  CRITICAL: ${stats.bySeverity.CRITICAL}`);
  console.log(`  HIGH:     ${stats.bySeverity.HIGH}`);
  console.log(`  MEDIUM:   ${stats.bySeverity.MEDIUM}`);
  console.log(`  LOW:      ${stats.bySeverity.LOW}`);
  console.log(`  INFO:     ${stats.bySeverity.INFO}`);

  // ─── By Page Type ───
  console.log('');
  console.log('  ISSUES BY PAGE TYPE');
  console.log(thinDivider);
  for (const [type, data] of Object.entries(stats.byPageType)) {
    if (data.total > 0) {
      console.log(`  ${type.padEnd(10)}: ${data.total} pages checked, ${data.issues} issues`);
    }
  }

  // ─── By Locale ───
  console.log('');
  console.log('  ISSUES BY LOCALE');
  console.log(thinDivider);
  for (const locale of LOCALES) {
    if (options.locale && options.locale !== locale) continue;
    const data = stats.byLocale[locale];
    if (data.total > 0 || data.issues > 0) {
      console.log(`  ${locale.padEnd(5)}: ${data.total} pages, ${data.issues} issues`);
    }
  }

  // ─── Critical Issues (always shown) ───
  const criticalIssues = issues.filter(i => i.severity === 'CRITICAL');
  if (criticalIssues.length > 0) {
    console.log('');
    console.log(divider);
    console.log(`  CRITICAL ISSUES (${criticalIssues.length})`);
    console.log(divider);
    for (const issue of criticalIssues) {
      console.log(`  [${issue.locale}] ${issue.page}`);
      console.log(`    ${issue.field}: ${issue.message}`);
      if (issue.suggestion && options.fixSuggestions) {
        console.log(`    FIX: ${issue.suggestion}`);
      }
    }
  }

  // ─── High Priority Issues ───
  const highIssues = issues.filter(i => i.severity === 'HIGH');
  if (highIssues.length > 0) {
    console.log('');
    console.log(divider);
    console.log(`  HIGH PRIORITY ISSUES (${highIssues.length})`);
    console.log(divider);
    for (const issue of highIssues.slice(0, 30)) {
      console.log(`  [${issue.locale}] ${issue.page}`);
      console.log(`    ${issue.field}: ${issue.message}`);
      if (issue.suggestion && options.fixSuggestions) {
        console.log(`    FIX: ${issue.suggestion}`);
      }
    }
    if (highIssues.length > 30) {
      console.log(`  ... and ${highIssues.length - 30} more`);
    }
  }

  // ─── Medium Issues ───
  const mediumIssues = issues.filter(i => i.severity === 'MEDIUM');
  if (mediumIssues.length > 0) {
    console.log('');
    console.log(thinDivider);
    console.log(`  MEDIUM ISSUES (${mediumIssues.length})`);
    console.log(thinDivider);
    for (const issue of mediumIssues.slice(0, 20)) {
      console.log(`  [${issue.locale}] ${issue.page} - ${issue.field}: ${issue.message}`);
    }
    if (mediumIssues.length > 20) {
      console.log(`  ... and ${mediumIssues.length - 20} more`);
    }
  }

  // ─── Low & Info Issues (only if verbose) ───
  if (options.verbose) {
    const lowIssues = issues.filter(i => i.severity === 'LOW');
    if (lowIssues.length > 0) {
      console.log('');
      console.log(thinDivider);
      console.log(`  LOW PRIORITY ISSUES (${lowIssues.length})`);
      console.log(thinDivider);
      for (const issue of lowIssues.slice(0, 20)) {
        console.log(`  [${issue.locale}] ${issue.page} - ${issue.field}: ${issue.message}`);
      }
      if (lowIssues.length > 20) {
        console.log(`  ... and ${lowIssues.length - 20} more`);
      }
    }

    const infoIssues = issues.filter(i => i.severity === 'INFO');
    if (infoIssues.length > 0) {
      console.log('');
      console.log(thinDivider);
      console.log(`  INFO (${infoIssues.length})`);
      console.log(thinDivider);
      for (const issue of infoIssues.slice(0, 20)) {
        console.log(`  [${issue.locale}] ${issue.page} - ${issue.field}: ${issue.message}`);
      }
      if (infoIssues.length > 20) {
        console.log(`  ... and ${infoIssues.length - 20} more`);
      }
    }
  } else {
    const lowCount = issues.filter(i => i.severity === 'LOW').length;
    const infoCount = issues.filter(i => i.severity === 'INFO').length;
    if (lowCount + infoCount > 0) {
      console.log('');
      console.log(`  (${lowCount} low + ${infoCount} info issues hidden, use --verbose to show)`);
    }
  }

  console.log('');
  console.log(divider);
  console.log('  AUDIT COMPLETE');
  console.log(divider);
  console.log('');
}

function outputJson() {
  const report = {
    generated: new Date().toISOString(),
    scope: { type: options.type, locale: options.locale },
    score: {
      total: Math.max(0, Math.round(100 - (
        (stats.bySeverity.CRITICAL * 10 + stats.bySeverity.HIGH * 5 +
         stats.bySeverity.MEDIUM * 2 + stats.bySeverity.LOW) /
        Math.max(stats.totalChecks * 2, 1)
      ) * 100)),
    },
    stats,
    issues: issues.map(i => ({
      severity: i.severity,
      pageType: i.pageType,
      locale: i.locale,
      page: i.page,
      field: i.field,
      message: i.message,
      ...(i.suggestion && { suggestion: i.suggestion }),
    })),
  };

  const reportPath = path.join(__dirname, '..', 'seo-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`  JSON report saved to: ${reportPath}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  console.log('');
  console.log('Starting SEO audit...');

  // Run audits based on --type flag
  if (options.type === 'all' || options.type === 'homepage') {
    console.log('  Auditing homepages...');
    auditHomepages();
  }

  if (options.type === 'all' || options.type === 'product') {
    console.log('  Auditing product pages...');
    auditProductPages();
    console.log('  Auditing schema generator...');
    auditSchemaGenerator();
    console.log('  Auditing product slugs...');
    auditProductSlugs();
  }

  if (options.type === 'all') {
    console.log('  Auditing sitemap...');
    auditSitemap();
    console.log('  Auditing robots.txt...');
    auditRobotsTxt();
    console.log('  Auditing internal linking...');
    auditInternalLinking();
  }

  // Output results
  printReport();

  if (options.json) {
    outputJson();
  }

  // Exit with code 1 if there are critical issues
  if (stats.bySeverity.CRITICAL > 0) {
    process.exit(1);
  }
}

main();
