#!/usr/bin/env node
/**
 * Live Page Validation Suite
 *
 * Validates worksheet pages end-to-end: static link integrity,
 * JSON-LD schemas, hreflang tags, heading hierarchy, and sitemaps.
 *
 * Usage:
 *   node scripts/validate-live-pages.js                                    # Full suite against live site
 *   node scripts/validate-live-pages.js --base-url http://localhost:3000   # Local dev
 *   node scripts/validate-live-pages.js --json report.json                 # Save JSON report
 *   node scripts/validate-live-pages.js --section links                    # Run one section only
 *
 * Part 49 of Landing Page SEO Perfection
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// ── Configuration ────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const THEME_SLUGS_FILE = path.join(ROOT, 'frontend', 'config', 'theme-slugs.ts');
const GRADE_SLUGS_FILE = path.join(ROOT, 'frontend', 'config', 'grade-slugs.ts');

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const DEFAULT_BASE_URL = 'https://www.lessoncraftstudio.com';

const SAMPLE_THEMES = ['animals', 'dinosaurs', 'space', 'ocean', 'farm', 'xmas', 'alphabet', 'numbers', 'robots', 'cooking'];
const SAMPLE_LOCALES = ['en', 'de', 'fr', 'es', 'fi'];
const GRADE_IDS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

const MAX_CONCURRENT = 5;
const BATCH_DELAY_MS = 200;

// ── Colors / Display ─────────────────────────────────────────────────

const C = {
  pass: '\x1b[32m', warn: '\x1b[33m', fail: '\x1b[31m',
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
};

function icon(status) {
  if (status === 'pass') return `${C.pass}\u2713${C.reset}`;
  if (status === 'warn') return `${C.warn}\u26A0${C.reset}`;
  return `${C.fail}\u2717${C.reset}`;
}

// ── HTTP helper ──────────────────────────────────────────────────────

function fetchUrl(url, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: timeoutMs }, (res) => {
      // Follow redirects (up to 3)
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return fetchUrl(next, timeoutMs).then(resolve, reject);
      }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function fetchBatch(urls, fn) {
  const results = [];
  for (let i = 0; i < urls.length; i += MAX_CONCURRENT) {
    const batch = urls.slice(i, i + MAX_CONCURRENT);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
    if (i + MAX_CONCURRENT < urls.length) {
      await new Promise(r => setTimeout(r, BATCH_DELAY_MS));
    }
  }
  return results;
}

// ── Parse config files (regex, no eval) ──────────────────────────────

function parseThemeSlugMap() {
  const src = fs.readFileSync(THEME_SLUGS_FILE, 'utf8');
  const map = {};
  // Match each theme block: themeId: { locale: 'slug', ... }
  const blockRe = /['"]?([\w-]+)['"]?\s*:\s*\{([^}]+)\}/g;
  // Only match inside themeSlugMap
  const section = src.match(/themeSlugMap[^{]*\{([\s\S]*?)\n\};/);
  if (!section) return map;
  let m;
  while ((m = blockRe.exec(section[1])) !== null) {
    const themeId = m[1];
    const inner = m[2];
    map[themeId] = {};
    const entryRe = /(\w+)\s*:\s*'([\w-]+)'/g;
    let e;
    while ((e = entryRe.exec(inner)) !== null) {
      map[themeId][e[1]] = e[2];
    }
  }
  return map;
}

function parseGradeSlugMap() {
  const src = fs.readFileSync(GRADE_SLUGS_FILE, 'utf8');
  const map = {};
  const section = src.match(/gradeSlugMap[^{]*\{([\s\S]*?)\n\};/);
  if (!section) return map;
  const blockRe = /['"]?([\w-]+)['"]?\s*:\s*\{([^}]+)\}/g;
  let m;
  while ((m = blockRe.exec(section[1])) !== null) {
    const gradeId = m[1];
    const inner = m[2];
    map[gradeId] = {};
    const entryRe = /(\w+)\s*:\s*'([\w-]+)'/g;
    let e;
    while ((e = entryRe.exec(inner)) !== null) {
      map[gradeId][e[1]] = e[2];
    }
  }
  return map;
}

// ── Section 1: Static Link Integrity ─────────────────────────────────

function validateStaticLinks(themeMap, gradeMap) {
  const checks = [];
  const allThemeIds = Object.keys(themeMap);

  // Check: every theme has slugs for all 11 locales
  let missingThemeSlugs = 0;
  const missingDetails = [];
  for (const themeId of allThemeIds) {
    for (const locale of ALL_LOCALES) {
      if (!themeMap[themeId][locale]) {
        missingThemeSlugs++;
        missingDetails.push(`${themeId}/${locale}`);
      }
    }
  }
  checks.push({
    name: 'theme-slug-completeness',
    status: missingThemeSlugs === 0 ? 'pass' : 'fail',
    detail: missingThemeSlugs === 0
      ? `All ${allThemeIds.length} themes x ${ALL_LOCALES.length} locales = ${allThemeIds.length * ALL_LOCALES.length} slugs present`
      : `${missingThemeSlugs} missing: ${missingDetails.slice(0, 5).join(', ')}${missingDetails.length > 5 ? '...' : ''}`,
  });

  // Check: theme count is 50
  checks.push({
    name: 'theme-count',
    status: allThemeIds.length === 50 ? 'pass' : allThemeIds.length >= 45 ? 'warn' : 'fail',
    detail: `${allThemeIds.length} themes (expected 50)`,
  });

  // Check: every grade has slugs for all 11 locales
  const allGradeIds = Object.keys(gradeMap);
  let missingGradeSlugs = 0;
  const missingGradeDetails = [];
  for (const gradeId of allGradeIds) {
    for (const locale of ALL_LOCALES) {
      if (!gradeMap[gradeId][locale]) {
        missingGradeSlugs++;
        missingGradeDetails.push(`${gradeId}/${locale}`);
      }
    }
  }
  checks.push({
    name: 'grade-slug-completeness',
    status: missingGradeSlugs === 0 ? 'pass' : 'fail',
    detail: missingGradeSlugs === 0
      ? `All ${allGradeIds.length} grades x ${ALL_LOCALES.length} locales = ${allGradeIds.length * ALL_LOCALES.length} slugs present`
      : `${missingGradeSlugs} missing: ${missingGradeDetails.slice(0, 5).join(', ')}`,
  });

  // Check: grade count is 5
  checks.push({
    name: 'grade-count',
    status: allGradeIds.length === 5 ? 'pass' : 'fail',
    detail: `${allGradeIds.length} grades (expected 5)`,
  });

  // Check: cross-product constructability
  const themeUrlCount = allThemeIds.length * ALL_LOCALES.length;
  const gradeUrlCount = allThemeIds.length * allGradeIds.length * ALL_LOCALES.length;
  let emptySlugCount = 0;
  for (const themeId of allThemeIds) {
    for (const locale of ALL_LOCALES) {
      const ts = themeMap[themeId]?.[locale];
      if (!ts || ts.trim() === '') emptySlugCount++;
      for (const gradeId of allGradeIds) {
        const gs = gradeMap[gradeId]?.[locale];
        if (!gs || gs.trim() === '') emptySlugCount++;
      }
    }
  }
  checks.push({
    name: 'url-constructability',
    status: emptySlugCount === 0 ? 'pass' : 'fail',
    detail: emptySlugCount === 0
      ? `${themeUrlCount} theme URLs + ${gradeUrlCount} grade URLs constructable`
      : `${emptySlugCount} empty/undefined slugs found`,
  });

  return checks;
}

// ── Section 2: JSON-LD Schema Validation ─────────────────────────────

function extractJsonLd(html) {
  const schemas = [];
  const re = /<script\s+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1]);
      // Handle arrays of schemas
      if (Array.isArray(parsed)) {
        schemas.push(...parsed);
      } else {
        schemas.push(parsed);
      }
    } catch (e) {
      schemas.push({ _parseError: e.message, _raw: m[1].substring(0, 200) });
    }
  }
  return schemas;
}

function getHreflangCode(locale) {
  if (locale === 'pt') return 'pt-BR';
  return locale;
}

function validateSchemas(schemas, pageType, locale, expectedUrl) {
  const checks = [];
  const types = schemas.map(s => s['@type']).filter(Boolean);

  // Check: no parse errors
  const parseErrors = schemas.filter(s => s._parseError);
  checks.push({
    name: 'json-ld-parse',
    status: parseErrors.length === 0 ? 'pass' : 'fail',
    detail: parseErrors.length === 0 ? 'all valid JSON' : `${parseErrors.length} parse errors`,
  });

  // Check: CollectionPage present
  const collectionPage = schemas.find(s => s['@type'] === 'CollectionPage');
  checks.push({
    name: 'collection-page',
    status: collectionPage ? 'pass' : 'fail',
    detail: collectionPage ? 'present' : 'missing CollectionPage schema',
  });

  if (collectionPage) {
    // Validate @context
    checks.push({
      name: 'collection-context',
      status: collectionPage['@context'] === 'https://schema.org' ? 'pass' : 'fail',
      detail: `@context = ${collectionPage['@context']}`,
    });

    // Validate inLanguage
    const expectedLang = getHreflangCode(locale);
    checks.push({
      name: 'collection-language',
      status: collectionPage.inLanguage === expectedLang ? 'pass' : 'warn',
      detail: `inLanguage = ${collectionPage.inLanguage} (expected ${expectedLang})`,
    });

    // Validate no empty required fields (name, url are required; @id is recommended)
    const requiredFields = ['name', 'url'].filter(f => !collectionPage[f] || collectionPage[f] === '');
    const recommendedFields = ['@id'].filter(f => !collectionPage[f] || collectionPage[f] === '');
    checks.push({
      name: 'collection-required-fields',
      status: requiredFields.length === 0 ? (recommendedFields.length === 0 ? 'pass' : 'warn') : 'fail',
      detail: requiredFields.length > 0
        ? `missing required: ${requiredFields.join(', ')}`
        : recommendedFields.length > 0
          ? `missing recommended: ${recommendedFields.join(', ')}`
          : 'all fields present',
    });
  }

  // Check: BreadcrumbList present
  const breadcrumb = schemas.find(s => s['@type'] === 'BreadcrumbList');
  checks.push({
    name: 'breadcrumb-list',
    status: breadcrumb ? 'pass' : 'fail',
    detail: breadcrumb ? 'present' : 'missing BreadcrumbList schema',
  });

  if (breadcrumb) {
    const items = breadcrumb.itemListElement || [];
    const expectedItems = pageType === 'theme' ? 3 : 4;
    checks.push({
      name: 'breadcrumb-items',
      status: items.length >= expectedItems ? 'pass' : 'warn',
      detail: `${items.length} items (expected ${expectedItems}+)`,
    });

    // Check sequential positions
    const positions = items.map(i => i.position);
    const sequential = positions.every((p, idx) => p === idx + 1);
    checks.push({
      name: 'breadcrumb-positions',
      status: sequential ? 'pass' : 'fail',
      detail: sequential ? 'sequential from 1' : `positions: ${positions.join(', ')}`,
    });
  }

  // Check: FAQPage present
  const faqPage = schemas.find(s => s['@type'] === 'FAQPage');
  checks.push({
    name: 'faq-page',
    status: faqPage ? 'pass' : 'warn',
    detail: faqPage
      ? `${(faqPage.mainEntity || []).length} Q&A pairs`
      : 'missing FAQPage schema',
  });

  // Check: WebPage present with speakable
  const webPage = schemas.find(s => s['@type'] === 'WebPage');
  if (webPage) {
    checks.push({
      name: 'webpage-speakable',
      status: webPage.speakable ? 'pass' : 'warn',
      detail: webPage.speakable ? 'speakable present' : 'missing speakable',
    });
  }

  // Check: minimum schema count
  const minSchemas = 3;
  checks.push({
    name: 'schema-count',
    status: schemas.length >= minSchemas ? 'pass' : schemas.length >= 2 ? 'warn' : 'fail',
    detail: `${schemas.length} schemas (min ${minSchemas})`,
  });

  return checks;
}

// ── Section 3: Hreflang Validation ───────────────────────────────────

function extractHreflangs(html) {
  const tags = [];
  const re = /<link\s+[^>]*rel\s*=\s*["']alternate["'][^>]*hreflang\s*=\s*["']([^"']+)["'][^>]*href\s*=\s*["']([^"']+)["'][^>]*\/?>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    tags.push({ hreflang: m[1], href: m[2] });
  }
  // Also match reversed order (href before hreflang)
  const re2 = /<link\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*hreflang\s*=\s*["']([^"']+)["'][^>]*\/?>/gi;
  while ((m = re2.exec(html)) !== null) {
    // Avoid duplicates
    const exists = tags.some(t => t.hreflang === m[2] && t.href === m[1]);
    if (!exists) {
      tags.push({ hreflang: m[2], href: m[1] });
    }
  }
  return tags;
}

function validateHreflangs(tags, locale, pageUrl) {
  const checks = [];

  // Check: 11+ hreflang links (11 locales + x-default)
  checks.push({
    name: 'hreflang-count',
    status: tags.length >= 12 ? 'pass' : tags.length >= 11 ? 'warn' : 'fail',
    detail: `${tags.length} hreflang links (expected 12: 11 locales + x-default)`,
  });

  // Check: x-default present
  const xDefault = tags.find(t => t.hreflang === 'x-default');
  checks.push({
    name: 'hreflang-x-default',
    status: xDefault ? 'pass' : 'fail',
    detail: xDefault ? `x-default -> ${xDefault.href}` : 'missing x-default',
  });

  // Check: x-default points to English version
  if (xDefault) {
    const pointsToEn = xDefault.href.includes('/en/');
    checks.push({
      name: 'x-default-english',
      status: pointsToEn ? 'pass' : 'warn',
      detail: pointsToEn ? 'points to /en/' : `points to ${xDefault.href}`,
    });
  }

  // Check: Portuguese uses pt-BR
  const ptTag = tags.find(t => t.hreflang === 'pt-BR' || t.hreflang === 'pt');
  if (ptTag) {
    checks.push({
      name: 'pt-hreflang-code',
      status: ptTag.hreflang === 'pt-BR' ? 'pass' : 'warn',
      detail: `Portuguese hreflang: ${ptTag.hreflang} (expected pt-BR)`,
    });
  }

  // Check: self-referencing hreflang present
  const selfLang = getHreflangCode(locale);
  const selfTag = tags.find(t => t.hreflang === selfLang);
  checks.push({
    name: 'hreflang-self-ref',
    status: selfTag ? 'pass' : 'fail',
    detail: selfTag ? `self-ref ${selfLang} present` : `missing self-ref for ${selfLang}`,
  });

  return checks;
}

// ── Section 4: Heading Hierarchy ─────────────────────────────────────

function extractHeadings(html) {
  const headings = [];
  const re = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const level = parseInt(m[1][1]);
    // Strip HTML tags from inner text
    const text = m[2].replace(/<[^>]*>/g, '').trim();
    headings.push({ level, text });
  }
  return headings;
}

function validateHeadings(headings) {
  const checks = [];

  // Check: exactly 1 H1
  const h1s = headings.filter(h => h.level === 1);
  checks.push({
    name: 'single-h1',
    status: h1s.length === 1 ? 'pass' : 'fail',
    detail: `${h1s.length} H1 tags (expected 1)`,
  });

  // Check: H1 non-empty
  if (h1s.length > 0) {
    checks.push({
      name: 'h1-non-empty',
      status: h1s[0].text.length > 0 ? 'pass' : 'fail',
      detail: h1s[0].text.length > 0 ? `H1: "${h1s[0].text.substring(0, 60)}"` : 'H1 is empty',
    });
  }

  // Check: no heading level skips
  let hasSkip = false;
  let skipDetail = '';
  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1].level;
    const curr = headings[i].level;
    // Going deeper should not skip levels (h1 -> h3 is bad, h3 -> h1 is fine)
    if (curr > prev && curr - prev > 1) {
      hasSkip = true;
      skipDetail = `h${prev} -> h${curr}`;
      break;
    }
  }
  checks.push({
    name: 'heading-hierarchy',
    status: hasSkip ? 'warn' : 'pass',
    detail: hasSkip ? `skips level: ${skipDetail}` : 'no level skips',
  });

  return checks;
}

// ── Section 5: Sitemap Validation ────────────────────────────────────

async function validateSitemaps(baseUrl) {
  const checks = [];

  for (let id = 0; id <= 6; id++) {
    const url = `${baseUrl}/sitemap/${id}.xml`;
    try {
      const { status, body } = await fetchUrl(url);
      if (status !== 200) {
        checks.push({
          name: `sitemap-${id}-fetch`,
          status: 'fail',
          detail: `HTTP ${status}`,
        });
        continue;
      }

      // Count <url> entries
      const urlMatches = body.match(/<url>/g);
      const urlCount = urlMatches ? urlMatches.length : 0;

      // Expected counts
      const expectedMap = {
        3: { min: 540, max: 560, label: 'theme hubs (~550)' },
        4: { min: 2700, max: 2800, label: 'theme+grade (~2750)' },
      };

      if (expectedMap[id]) {
        const { min, max, label } = expectedMap[id];
        checks.push({
          name: `sitemap-${id}-count`,
          status: urlCount >= min && urlCount <= max ? 'pass' : urlCount > 0 ? 'warn' : 'fail',
          detail: `${urlCount} URLs (expected ${label})`,
        });
      } else {
        checks.push({
          name: `sitemap-${id}-count`,
          status: urlCount > 0 ? 'pass' : 'warn',
          detail: `${urlCount} URLs`,
        });
      }

      // Check for <lastmod> presence (spot-check)
      const hasLastmod = body.includes('<lastmod>');
      checks.push({
        name: `sitemap-${id}-lastmod`,
        status: hasLastmod ? 'pass' : 'warn',
        detail: hasLastmod ? 'has <lastmod>' : 'missing <lastmod>',
      });

    } catch (err) {
      checks.push({
        name: `sitemap-${id}-fetch`,
        status: 'fail',
        detail: `Error: ${err.message}`,
      });
    }
  }

  return checks;
}

// ── Main: fetch and validate sample pages ────────────────────────────

async function validateLivePages(baseUrl, themeMap, gradeMap) {
  const pageChecks = [];

  // Build sample URL list: 50 theme pages + 50 grade pages
  const pages = [];
  for (let i = 0; i < SAMPLE_THEMES.length; i++) {
    const themeId = SAMPLE_THEMES[i];
    for (const locale of SAMPLE_LOCALES) {
      const themeSlug = themeMap[themeId]?.[locale];
      if (!themeSlug) continue;
      pages.push({
        type: 'theme',
        themeId,
        locale,
        url: `${baseUrl}/${locale}/worksheets/${themeSlug}`,
      });
    }
  }

  // Grade pages: 10 themes x 5 locales, rotating grades
  for (let i = 0; i < SAMPLE_THEMES.length; i++) {
    const themeId = SAMPLE_THEMES[i];
    for (let j = 0; j < SAMPLE_LOCALES.length; j++) {
      const locale = SAMPLE_LOCALES[j];
      const gradeId = GRADE_IDS[(i + j) % GRADE_IDS.length];
      const themeSlug = themeMap[themeId]?.[locale];
      const gradeSlug = gradeMap[gradeId]?.[locale];
      if (!themeSlug || !gradeSlug) continue;
      pages.push({
        type: 'grade',
        themeId,
        gradeId,
        locale,
        url: `${baseUrl}/${locale}/worksheets/${themeSlug}/${gradeSlug}`,
      });
    }
  }

  console.log(`\n${C.bold}Fetching ${pages.length} sample pages...${C.reset}`);

  let fetchedCount = 0;
  let failedFetch = 0;

  const results = await fetchBatch(pages, async (page) => {
    try {
      const { status, body } = await fetchUrl(page.url);
      fetchedCount++;
      if (fetchedCount % 20 === 0) {
        process.stdout.write(`  ${C.dim}${fetchedCount}/${pages.length} fetched${C.reset}\r`);
      }

      if (status !== 200) {
        failedFetch++;
        return {
          page,
          checks: [{ name: 'http-status', status: 'fail', detail: `HTTP ${status} for ${page.url}` }],
        };
      }

      const checks = [];

      // HTTP status
      checks.push({ name: 'http-status', status: 'pass', detail: `HTTP 200` });

      // JSON-LD schemas
      const schemas = extractJsonLd(body);
      checks.push(...validateSchemas(schemas, page.type, page.locale, page.url));

      // Hreflangs
      const hreflangs = extractHreflangs(body);
      checks.push(...validateHreflangs(hreflangs, page.locale, page.url));

      // Headings
      const headings = extractHeadings(body);
      checks.push(...validateHeadings(headings));

      // Check for error strings
      const errorStrings = ['MISSING_MESSAGE', 'undefined', 'Error: '];
      const bodyText = body.replace(/<script[\s\S]*?<\/script>/gi, '');
      for (const errStr of errorStrings) {
        if (errStr === 'undefined') {
          // Only flag "undefined" in visible text, not in attribute values
          const visibleText = bodyText.replace(/<[^>]*>/g, '');
          // Skip false positives: "undefined" as part of longer words or JS
          const undefinedCount = (visibleText.match(/\bundefined\b/gi) || []).length;
          if (undefinedCount > 2) {
            checks.push({
              name: 'no-undefined',
              status: 'warn',
              detail: `"undefined" appears ${undefinedCount} times in visible text`,
            });
          }
        } else {
          if (bodyText.includes(errStr)) {
            checks.push({
              name: `no-${errStr.toLowerCase().replace(/[^a-z]/g, '')}`,
              status: errStr === 'MISSING_MESSAGE' ? 'fail' : 'warn',
              detail: `Found "${errStr}" in page`,
            });
          }
        }
      }

      return { page, checks };
    } catch (err) {
      failedFetch++;
      return {
        page,
        checks: [{ name: 'fetch-error', status: 'fail', detail: `${err.message} for ${page.url}` }],
      };
    }
  });

  console.log(`  ${C.dim}${fetchedCount}/${pages.length} fetched (${failedFetch} failed)${C.reset}`);
  return results;
}

// ── Report ───────────────────────────────────────────────────────────

function printSection(title, checks) {
  console.log(`\n${C.bold}=== ${title} ===${C.reset}`);
  let pass = 0, warn = 0, fail = 0;
  for (const check of checks) {
    if (check.status === 'pass') { pass++; continue; }
    if (check.status === 'warn') warn++;
    else fail++;
    console.log(`  ${icon(check.status)} ${check.name}: ${check.detail}`);
  }
  if (pass > 0 && warn === 0 && fail === 0) {
    console.log(`  ${icon('pass')} All ${pass} checks passed`);
  } else {
    console.log(`  ${C.dim}${pass} pass, ${warn} warn, ${fail} fail${C.reset}`);
  }
  return { pass, warn, fail };
}

function printPageResults(results) {
  let totalPass = 0, totalWarn = 0, totalFail = 0;
  const problemPages = [];

  for (const { page, checks } of results) {
    let pagePass = 0, pageWarn = 0, pageFail = 0;
    for (const check of checks) {
      if (check.status === 'pass') pagePass++;
      else if (check.status === 'warn') pageWarn++;
      else pageFail++;
    }
    totalPass += pagePass;
    totalWarn += pageWarn;
    totalFail += pageFail;

    if (pageFail > 0) {
      problemPages.push({ page, checks: checks.filter(c => c.status === 'fail') });
    }
  }

  // Only show problem pages
  if (problemPages.length > 0) {
    console.log(`\n${C.bold}Pages with failures:${C.reset}`);
    for (const { page, checks } of problemPages.slice(0, 10)) {
      const label = page.type === 'theme'
        ? `${page.locale}/worksheets/${page.themeId}`
        : `${page.locale}/worksheets/${page.themeId}/${page.gradeId}`;
      console.log(`  ${C.fail}${label}${C.reset}`);
      for (const check of checks) {
        console.log(`    ${icon(check.status)} ${check.name}: ${check.detail}`);
      }
    }
    if (problemPages.length > 10) {
      console.log(`  ${C.dim}...and ${problemPages.length - 10} more${C.reset}`);
    }
  }

  return { pass: totalPass, warn: totalWarn, fail: totalFail, pages: results.length };
}

// ── CLI ──────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  let baseUrl = DEFAULT_BASE_URL;
  let jsonPath = null;
  let section = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--base-url' && args[i + 1]) {
      baseUrl = args[++i].replace(/\/$/, '');
    } else if (args[i] === '--json' && args[i + 1]) {
      jsonPath = args[++i];
    } else if (args[i] === '--section' && args[i + 1]) {
      section = args[++i];
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('Usage:');
      console.log('  --base-url <url>  Target site (default: live site)');
      console.log('  --json <path>     Save JSON report');
      console.log('  --section <name>  Run one section: links, schemas, sitemaps');
      process.exit(0);
    }
  }

  console.log(`${C.bold}Live Page Validation Suite${C.reset}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Target: ${baseUrl}`);
  console.log(`Date: ${new Date().toISOString()}`);

  const report = { timestamp: new Date().toISOString(), baseUrl, sections: {} };
  let grandPass = 0, grandWarn = 0, grandFail = 0;

  // Parse config files
  const themeMap = parseThemeSlugMap();
  const gradeMap = parseGradeSlugMap();

  // Section 1: Static Links
  if (!section || section === 'links') {
    const linkChecks = validateStaticLinks(themeMap, gradeMap);
    const s = printSection('Static Link Integrity', linkChecks);
    grandPass += s.pass; grandWarn += s.warn; grandFail += s.fail;
    report.sections.links = linkChecks;
  }

  // Section 2+3+4: Live page validation (schemas, hreflangs, headings)
  if (!section || section === 'schemas' || section === 'pages') {
    const pageResults = await validateLivePages(baseUrl, themeMap, gradeMap);

    // Split checks into subsections for display
    const schemaChecks = [];
    const hreflangChecks = [];
    const headingChecks = [];
    for (const { page, checks } of pageResults) {
      const label = `[${page.locale}/${page.themeId}${page.gradeId ? '/' + page.gradeId : ''}]`;
      for (const check of checks) {
        const prefixed = { ...check, name: `${label} ${check.name}` };
        if (check.name.startsWith('json-ld') || check.name.startsWith('collection') ||
            check.name.startsWith('breadcrumb') || check.name.startsWith('faq') ||
            check.name.startsWith('webpage') || check.name.startsWith('schema')) {
          schemaChecks.push(prefixed);
        } else if (check.name.startsWith('hreflang') || check.name.startsWith('x-default') ||
                   check.name.startsWith('pt-hreflang')) {
          hreflangChecks.push(prefixed);
        } else if (check.name.startsWith('single-h1') || check.name.startsWith('h1-') ||
                   check.name.startsWith('heading')) {
          headingChecks.push(prefixed);
        }
      }
    }

    const s2 = printSection('JSON-LD Schema Validation (100 pages)', schemaChecks);
    grandPass += s2.pass; grandWarn += s2.warn; grandFail += s2.fail;

    const s3 = printSection('Hreflang Validation (100 pages)', hreflangChecks);
    grandPass += s3.pass; grandWarn += s3.warn; grandFail += s3.fail;

    const s4 = printSection('Heading Hierarchy (100 pages)', headingChecks);
    grandPass += s4.pass; grandWarn += s4.warn; grandFail += s4.fail;

    // Also show overall page results
    const pageStats = printPageResults(pageResults);
    report.sections.pages = { stats: pageStats, details: pageResults.map(r => ({
      url: r.page.url,
      type: r.page.type,
      locale: r.page.locale,
      checks: r.checks,
    })) };
  }

  // Section 5: Sitemaps
  if (!section || section === 'sitemaps') {
    const sitemapChecks = await validateSitemaps(baseUrl);
    const s5 = printSection('Sitemap Validation', sitemapChecks);
    grandPass += s5.pass; grandWarn += s5.warn; grandFail += s5.fail;
    report.sections.sitemaps = sitemapChecks;
  }

  // Grand summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${C.bold}Grand Total${C.reset}`);
  console.log(`  ${C.pass}\u2713 Pass: ${grandPass}${C.reset}`);
  console.log(`  ${C.warn}\u26A0 Warn: ${grandWarn}${C.reset}`);
  console.log(`  ${C.fail}\u2717 Fail: ${grandFail}${C.reset}`);

  // Save JSON report
  if (jsonPath) {
    report.summary = { pass: grandPass, warn: grandWarn, fail: grandFail };
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`\nJSON report saved to: ${jsonPath}`);
  }

  // Exit code
  if (grandFail > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`${C.fail}Fatal error: ${err.message}${C.reset}`);
  process.exit(2);
});
