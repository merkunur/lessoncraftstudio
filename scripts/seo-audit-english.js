#!/usr/bin/env node

/**
 * English SEO Baseline Audit
 * Part 1 of ONE CLICK A DAY SEO plan
 *
 * Extracts all English page metadata (titles, descriptions, keywords, H1s)
 * and analyzes for duplicates, gaps, length violations, and keyword cannibalization.
 *
 * Usage: node scripts/seo-audit-english.js
 * Output: docs/audit-results/english-seo-baseline.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');

// ─── Helpers ──────────────────────────────────────────────────────────

/** Read a file and return its text content */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`  WARN: Cannot read ${filePath}: ${e.message}`);
    return null;
  }
}

/**
 * Extract a simple string field from TS source text.
 * Handles both single-quoted and double-quoted values on one line.
 * fieldName should be just the key, e.g. 'title'
 */
function extractField(text, fieldName) {
  // Match: fieldName: 'value', or fieldName: "value",
  const re = new RegExp(`${fieldName}:\\s*['"]([^'"]*?)['"]`);
  const m = text.match(re);
  return m ? m[1] : null;
}

/**
 * Extract the seo block from a product page file.
 * Returns { slug, appId, title, description, keywords }
 */
function extractSeoBlock(text) {
  // Find the seo: { ... } block
  const seoStart = text.indexOf('seo:');
  if (seoStart === -1) return null;
  // Find the closing brace of the seo block
  const blockStart = text.indexOf('{', seoStart);
  if (blockStart === -1) return null;

  let depth = 0;
  let blockEnd = blockStart;
  for (let i = blockStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') depth--;
    if (depth === 0) { blockEnd = i + 1; break; }
  }
  const seoText = text.slice(blockStart, blockEnd);

  return {
    slug: extractField(seoText, 'slug'),
    appId: extractField(seoText, 'appId'),
    title: extractField(seoText, 'title'),
    description: extractField(seoText, 'description'),
    keywords: extractField(seoText, 'keywords'),
  };
}

/**
 * Extract the hero block from a product page file.
 * Returns { title, subtitle }
 */
function extractHeroBlock(text) {
  const heroStart = text.indexOf('hero:');
  if (heroStart === -1) return null;
  const blockStart = text.indexOf('{', heroStart);
  if (blockStart === -1) return null;

  let depth = 0;
  let blockEnd = blockStart;
  for (let i = blockStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') depth--;
    if (depth === 0) { blockEnd = i + 1; break; }
  }
  const heroText = text.slice(blockStart, blockEnd);

  return {
    title: extractField(heroText, 'title'),
    subtitle: extractField(heroText, 'subtitle'),
  };
}

/**
 * Extract a named block (matching key: { ... }) from text.
 * Returns the text inside the outermost braces.
 */
function extractBlock(text, blockName) {
  // Match blockName with optional quotes: 'blockName': { or blockName: {
  const patterns = [
    new RegExp(`['"]${blockName}['"]\\s*:\\s*\\{`),
    new RegExp(`${blockName}\\s*:\\s*\\{`),
  ];
  let startIdx = -1;
  let braceStart = -1;
  for (const pat of patterns) {
    const m = pat.exec(text);
    if (m) {
      startIdx = m.index;
      braceStart = text.indexOf('{', startIdx);
      break;
    }
  }
  if (braceStart === -1) return null;

  let depth = 0;
  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') depth--;
    if (depth === 0) return text.slice(braceStart, i + 1);
  }
  return null;
}

/**
 * Extract the 'en' locale block from a Record<string, ...> structure.
 * Looks for en: { ... } at the right nesting level.
 */
function extractEnBlock(text) {
  return extractBlock(text, 'en');
}

// ─── Extractors ───────────────────────────────────────────────────────

function extractProductPages() {
  console.log('\n--- Extracting Product Pages ---');
  const dir = path.join(FRONTEND, 'content', 'product-pages', 'en');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  const pages = [];

  for (const file of files) {
    const text = readFile(path.join(dir, file));
    if (!text) continue;

    const seo = extractSeoBlock(text);
    const hero = extractHeroBlock(text);
    if (!seo) {
      console.error(`  WARN: No seo block in ${file}`);
      continue;
    }

    pages.push({
      type: 'product',
      file,
      slug: seo.slug || file.replace('.ts', ''),
      title: seo.title,
      titleLength: seo.title ? seo.title.length : 0,
      description: seo.description,
      descriptionLength: seo.description ? seo.description.length : 0,
      keywords: seo.keywords,
      h1: hero ? hero.title : null,
      heroSubtitle: hero ? hero.subtitle : null,
      url: `/en/apps/${seo.slug || file.replace('.ts', '')}`,
      issues: [],
    });
  }

  console.log(`  Found ${pages.length} product pages`);
  return pages;
}

function extractThemeHubs() {
  console.log('\n--- Extracting Theme Hub Pages ---');
  const themesDir = path.join(FRONTEND, 'content', 'themes');
  const themes = fs.readdirSync(themesDir).filter(d => {
    return fs.statSync(path.join(themesDir, d)).isDirectory() && d !== 'types.ts';
  });
  const pages = [];

  for (const theme of themes) {
    const enFile = path.join(themesDir, theme, 'en.ts');
    const text = readFile(enFile);
    if (!text) continue;

    const title = extractField(text, 'title');
    const description = extractField(text, 'description');
    const keywords = extractField(text, 'keywords');
    const heading = extractField(text, 'heading');
    const name = extractField(text, 'name');

    pages.push({
      type: 'theme-hub',
      file: `${theme}/en.ts`,
      slug: theme,
      title,
      titleLength: title ? title.length : 0,
      description,
      descriptionLength: description ? description.length : 0,
      keywords,
      h1: heading,
      name,
      url: `/en/worksheets/${theme}`,
      issues: [],
    });
  }

  console.log(`  Found ${pages.length} theme hub pages`);
  return pages;
}

function extractThemeGrades() {
  console.log('\n--- Extracting Theme+Grade Pages ---');
  const themesDir = path.join(FRONTEND, 'content', 'themes');
  const themes = fs.readdirSync(themesDir).filter(d => {
    return fs.statSync(path.join(themesDir, d)).isDirectory();
  });
  const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
  const pages = [];

  for (const theme of themes) {
    const enFile = path.join(themesDir, theme, 'en.ts');
    const text = readFile(enFile);
    if (!text) continue;

    // Find gradeContent block
    const gradeContentBlock = extractBlock(text, 'gradeContent');
    if (!gradeContentBlock) {
      console.error(`  WARN: No gradeContent in ${theme}/en.ts`);
      continue;
    }

    for (const gradeId of gradeIds) {
      const gradeBlock = extractBlock(gradeContentBlock, gradeId);
      if (!gradeBlock) {
        console.error(`  WARN: No ${gradeId} in ${theme}/en.ts gradeContent`);
        continue;
      }

      // Extract intro field - it's a long string inside the grade block
      // Match intro: 'text...', where text can contain escaped quotes
      const introMatch = gradeBlock.match(/intro:\s*'((?:[^'\\]|\\.)*)'/s);
      let intro = introMatch ? introMatch[1] : null;

      // Get theme title/heading for context
      const themeTitle = extractField(text, 'title');
      const themeName = extractField(text, 'name');

      // The effective "title" for a theme+grade page is constructed dynamically
      // Format: "{Theme} {Grade} Worksheets | LessonCraftStudio" (approximate)
      const gradeDisplayNames = {
        'preschool': 'Preschool',
        'kindergarten': 'Kindergarten',
        'first-grade': 'First Grade',
        'second-grade': 'Second Grade',
        'third-grade': 'Third Grade',
      };
      const effectiveTitle = `${themeName || theme} ${gradeDisplayNames[gradeId]} Worksheets | LessonCraftStudio`;
      const effectiveDesc = intro ? intro.substring(0, 160) : null;

      pages.push({
        type: 'theme-grade',
        file: `${theme}/en.ts`,
        slug: `${theme}/${gradeId}`,
        theme,
        gradeId,
        title: effectiveTitle,
        titleLength: effectiveTitle.length,
        description: effectiveDesc,
        descriptionLength: effectiveDesc ? effectiveDesc.length : 0,
        introLength: intro ? intro.length : 0,
        keywords: null, // theme+grade pages inherit theme keywords
        h1: null, // generated dynamically
        url: `/en/worksheets/${theme}/${gradeId}`,
        issues: [],
      });
    }
  }

  console.log(`  Found ${pages.length} theme+grade pages`);
  return pages;
}

function extractSecondaryPages() {
  console.log('\n--- Extracting Secondary Pages ---');
  const pages = [];

  // 1. Homepage
  const homepageFile = path.join(FRONTEND, 'app', '[locale]', 'page.tsx');
  const homepageText = readFile(homepageFile);
  if (homepageText) {
    const homepageMetaBlock = extractBlock(homepageText, 'homepageMetadata');
    if (homepageMetaBlock) {
      const enBlock = extractEnBlock(homepageMetaBlock);
      if (enBlock) {
        pages.push({
          type: 'secondary',
          subtype: 'homepage',
          file: 'app/[locale]/page.tsx',
          slug: 'homepage',
          title: extractField(enBlock, 'title'),
          titleLength: (extractField(enBlock, 'title') || '').length,
          description: extractField(enBlock, 'description'),
          descriptionLength: (extractField(enBlock, 'description') || '').length,
          keywords: extractField(enBlock, 'keywords'),
          h1: null,
          url: '/en',
          issues: [],
        });
      }
    }
  }

  // 2. Apps listing
  const appsFile = path.join(FRONTEND, 'app', '[locale]', 'apps', 'page.tsx');
  const appsText = readFile(appsFile);
  if (appsText) {
    const appsMetaBlock = extractBlock(appsText, 'appsMetadata');
    if (appsMetaBlock) {
      const enBlock = extractEnBlock(appsMetaBlock);
      if (enBlock) {
        pages.push({
          type: 'secondary',
          subtype: 'apps-listing',
          file: 'app/[locale]/apps/page.tsx',
          slug: 'apps',
          title: extractField(enBlock, 'title'),
          titleLength: (extractField(enBlock, 'title') || '').length,
          description: extractField(enBlock, 'description'),
          descriptionLength: (extractField(enBlock, 'description') || '').length,
          keywords: extractField(enBlock, 'keywords'),
          h1: null,
          url: '/en/apps',
          issues: [],
        });
      }
    }
  }

  // 3. Worksheets hub
  // pageTitle/pageDescription are Record<string, string> - simple key-value pairs
  const worksheetsFile = path.join(FRONTEND, 'app', '[locale]', 'worksheets', 'page.tsx');
  const worksheetsText = readFile(worksheetsFile);
  if (worksheetsText) {
    // Extract directly: look for en: '...' inside the pageTitle block
    let wsTitle = null;
    let wsDesc = null;

    // pageTitle block: find the block, then en: 'value'
    const pageTitleStart = worksheetsText.indexOf('const pageTitle');
    const pageDescStart = worksheetsText.indexOf('const pageDescription');
    if (pageTitleStart !== -1 && pageDescStart !== -1) {
      const pageTitleSection = worksheetsText.slice(pageTitleStart, pageDescStart);
      const titleMatch = pageTitleSection.match(/en:\s*'([^']*?)'/);
      wsTitle = titleMatch ? titleMatch[1] : null;
    }
    if (pageDescStart !== -1) {
      // Find end of pageDescription block (next const or export)
      const nextBlock = worksheetsText.indexOf('\nexport', pageDescStart);
      const pageDescSection = worksheetsText.slice(pageDescStart, nextBlock !== -1 ? nextBlock : pageDescStart + 2000);
      const descMatch = pageDescSection.match(/en:\s*'([^']*?)'/);
      wsDesc = descMatch ? descMatch[1] : null;
    }

    pages.push({
      type: 'secondary',
      subtype: 'worksheets-hub',
      file: 'app/[locale]/worksheets/page.tsx',
      slug: 'worksheets',
      title: wsTitle,
      titleLength: wsTitle ? wsTitle.length : 0,
      description: wsDesc,
      descriptionLength: wsDesc ? wsDesc.length : 0,
      keywords: null, // inline in generateMetadata, not easily extractable
      h1: null,
      url: '/en/worksheets',
      issues: [],
    });
  }

  // 4. Blog listing
  const blogFile = path.join(FRONTEND, 'app', '[locale]', 'blog', '(listing)', 'page.tsx');
  const blogText = readFile(blogFile);
  if (blogText) {
    // metadata is defined inside generateMetadata function
    // Look for en: { title: '...', description: '...' }
    const enTitleMatch = blogText.match(/en:\s*\{\s*title:\s*'([^']*?)'/);
    const enDescMatch = blogText.match(/en:\s*\{[^}]*?description:\s*'([^']*?)'/s);

    const blogTitle = enTitleMatch ? enTitleMatch[1] : null;
    const blogDesc = enDescMatch ? enDescMatch[1] : null;

    pages.push({
      type: 'secondary',
      subtype: 'blog-listing',
      file: 'app/[locale]/blog/(listing)/page.tsx',
      slug: 'blog',
      title: blogTitle,
      titleLength: blogTitle ? blogTitle.length : 0,
      description: blogDesc,
      descriptionLength: blogDesc ? blogDesc.length : 0,
      keywords: null,
      h1: null,
      url: '/en/blog',
      issues: [],
    });
  }

  // 5. Category pages (8 categories)
  const categoryFile = path.join(FRONTEND, 'config', 'category-content.ts');
  const categoryText = readFile(categoryFile);
  if (categoryText) {
    const categorySlugs = ['math', 'language-arts', 'word-games', 'art-creativity', 'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor'];
    for (const catSlug of categorySlugs) {
      const catBlock = extractBlock(categoryText, catSlug);
      if (!catBlock) continue;
      const enBlock = extractEnBlock(catBlock);
      if (!enBlock) continue;

      pages.push({
        type: 'secondary',
        subtype: 'category',
        file: 'config/category-content.ts',
        slug: `category/${catSlug}`,
        title: extractField(enBlock, 'title'),
        titleLength: (extractField(enBlock, 'title') || '').length,
        description: extractField(enBlock, 'description'),
        descriptionLength: (extractField(enBlock, 'description') || '').length,
        keywords: extractField(enBlock, 'keywords'),
        h1: extractField(enBlock, 'heading'),
        url: `/en/apps/category/${catSlug}`,
        issues: [],
      });
    }
  }

  // 6. Grade pages (5 grades)
  const gradeFile = path.join(FRONTEND, 'config', 'grade-content.ts');
  const gradeText = readFile(gradeFile);
  if (gradeText) {
    const gradeSlugs = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
    for (const gradeSlug of gradeSlugs) {
      const gradeBlock = extractBlock(gradeText, gradeSlug);
      if (!gradeBlock) continue;
      const enBlock = extractEnBlock(gradeBlock);
      if (!enBlock) continue;

      pages.push({
        type: 'secondary',
        subtype: 'grade',
        file: 'config/grade-content.ts',
        slug: `grade/${gradeSlug}`,
        title: extractField(enBlock, 'title'),
        titleLength: (extractField(enBlock, 'title') || '').length,
        description: extractField(enBlock, 'description'),
        descriptionLength: (extractField(enBlock, 'description') || '').length,
        keywords: extractField(enBlock, 'keywords'),
        h1: extractField(enBlock, 'heading'),
        url: `/en/apps/grades/${gradeSlug}`,
        issues: [],
      });
    }
  }

  console.log(`  Found ${pages.length} secondary pages`);
  return pages;
}

// ─── Analysis ─────────────────────────────────────────────────────────

function analyzePages(pages) {
  console.log('\n--- Analyzing Pages ---');
  const issues = {
    titleTooShort: 0,
    titleTooLong: 0,
    descTooShort: 0,
    descTooLong: 0,
    missingTitle: 0,
    missingDesc: 0,
    missingKeywords: 0,
    duplicateTitles: 0,
    keywordCannibalization: 0,
    h1Mismatch: 0,
    genericTitles: 0,
  };

  // Per-page checks
  for (const page of pages) {
    // Title checks
    if (!page.title) {
      page.issues.push('missingTitle');
      issues.missingTitle++;
    } else {
      if (page.titleLength < 30) {
        page.issues.push('titleTooShort');
        issues.titleTooShort++;
      } else if (page.titleLength > 60) {
        page.issues.push('titleTooLong');
        issues.titleTooLong++;
      }
    }

    // Description checks
    if (!page.description) {
      page.issues.push('missingDesc');
      issues.missingDesc++;
    } else {
      if (page.descriptionLength < 120) {
        page.issues.push('descTooShort');
        issues.descTooShort++;
      } else if (page.descriptionLength > 160) {
        page.issues.push('descTooLong');
        issues.descTooLong++;
      }
    }

    // Keywords check (skip theme-grade since they inherit)
    if (page.type !== 'theme-grade' && !page.keywords) {
      page.issues.push('missingKeywords');
      issues.missingKeywords++;
    }

    // H1/title alignment check
    if (page.h1 && page.title) {
      const titleWords = new Set(page.title.toLowerCase().split(/\s+/).filter(w => w.length > 3));
      const h1Words = new Set(page.h1.toLowerCase().split(/\s+/).filter(w => w.length > 3));
      const overlap = [...titleWords].filter(w => h1Words.has(w));
      if (overlap.length === 0) {
        page.issues.push('h1Mismatch');
        issues.h1Mismatch++;
      }
    }

    // Generic title detection
    if (page.title) {
      const genericPatterns = [
        /^worksheets$/i,
        /^free worksheets$/i,
        /^printable worksheets$/i,
        /^home$/i,
      ];
      if (genericPatterns.some(p => p.test(page.title))) {
        page.issues.push('genericTitle');
        issues.genericTitles++;
      }
    }
  }

  // Cross-page: duplicate titles
  const titleMap = {};
  for (const page of pages) {
    if (!page.title) continue;
    const normalized = page.title.toLowerCase().trim();
    if (!titleMap[normalized]) titleMap[normalized] = [];
    titleMap[normalized].push(page);
  }
  const duplicateTitles = [];
  for (const [title, group] of Object.entries(titleMap)) {
    if (group.length > 1) {
      duplicateTitles.push({
        title: group[0].title,
        count: group.length,
        pages: group.map(p => ({ type: p.type, slug: p.slug, url: p.url })),
      });
      for (const p of group) {
        if (!p.issues.includes('duplicateTitle')) {
          p.issues.push('duplicateTitle');
        }
      }
      issues.duplicateTitles++;
    }
  }

  // Cross-page: keyword cannibalization
  // Extract primary keyword (first keyword in comma-separated list)
  const keywordMap = {};
  for (const page of pages) {
    if (!page.keywords) continue;
    const primary = page.keywords.split(',')[0].trim().toLowerCase();
    if (!primary) continue;
    if (!keywordMap[primary]) keywordMap[primary] = [];
    keywordMap[primary].push(page);
  }
  const keywordOverlaps = [];
  for (const [keyword, group] of Object.entries(keywordMap)) {
    if (group.length > 1) {
      keywordOverlaps.push({
        keyword,
        count: group.length,
        pages: group.map(p => ({ type: p.type, slug: p.slug, url: p.url })),
      });
      issues.keywordCannibalization++;
    }
  }

  // Detect template patterns (titles following the same template)
  const templatePatterns = [];
  const titleTemplates = {};
  for (const page of pages) {
    if (!page.title || page.type === 'theme-grade') continue;
    // Normalize: replace theme/app-specific words to detect templates
    // e.g., "Free {X} Worksheets for Kids | LessonCraftStudio"
    const template = page.title
      .replace(/\b(Addition|Subtraction|Coloring|Math|Word Search|Crossword|Animals|Dinosaurs|Space|Ocean)\b/gi, '{TOPIC}')
      .replace(/\s+/g, ' ');
    if (!titleTemplates[template]) titleTemplates[template] = [];
    titleTemplates[template].push(page);
  }
  for (const [template, group] of Object.entries(titleTemplates)) {
    if (group.length >= 3) {
      templatePatterns.push({
        template,
        count: group.length,
        samplePages: group.slice(0, 5).map(p => ({ type: p.type, slug: p.slug, title: p.title })),
      });
    }
  }

  // Intent overlap: product page and theme hub targeting same queries
  const intentOverlaps = [];
  const productPages = pages.filter(p => p.type === 'product');
  const themeHubs = pages.filter(p => p.type === 'theme-hub');
  for (const pp of productPages) {
    if (!pp.keywords) continue;
    const ppKeywords = new Set(pp.keywords.toLowerCase().split(',').map(k => k.trim()));
    for (const th of themeHubs) {
      if (!th.keywords) continue;
      const thKeywords = new Set(th.keywords.toLowerCase().split(',').map(k => k.trim()));
      const shared = [...ppKeywords].filter(k => thKeywords.has(k));
      if (shared.length >= 2) {
        intentOverlaps.push({
          productPage: { slug: pp.slug, url: pp.url },
          themeHub: { slug: th.slug, url: th.url },
          sharedKeywords: shared,
        });
      }
    }
  }

  return { issues, duplicateTitles, keywordOverlaps, templatePatterns, intentOverlaps };
}

// ─── Report Generation ────────────────────────────────────────────────

function generateReport(pages, analysis) {
  const byType = {
    product: pages.filter(p => p.type === 'product').length,
    'theme-hub': pages.filter(p => p.type === 'theme-hub').length,
    'theme-grade': pages.filter(p => p.type === 'theme-grade').length,
    secondary: pages.filter(p => p.type === 'secondary').length,
  };

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalPages: pages.length,
      productPages: byType.product,
      themeHubs: byType['theme-hub'],
      themeGrades: byType['theme-grade'],
      blogPosts: 0, // pending DB query
      secondaryPages: byType.secondary,
      issues: analysis.issues,
    },
    pages,
    duplicateTitles: analysis.duplicateTitles,
    keywordOverlaps: analysis.keywordOverlaps,
    templatePatterns: analysis.templatePatterns,
    intentOverlaps: analysis.intentOverlaps,
  };

  return report;
}

function printSummary(report) {
  const s = report.summary;
  console.log('\n' + '='.repeat(55));
  console.log('  ENGLISH SEO BASELINE AUDIT');
  console.log('='.repeat(55));
  console.log(`\nPages analyzed: ${s.totalPages}`);
  console.log(`  Product pages:  ${s.productPages}`);
  console.log(`  Theme hubs:     ${s.themeHubs}`);
  console.log(`  Theme+grade:    ${s.themeGrades}`);
  console.log(`  Blog posts:     ${s.blogPosts}${s.blogPosts === 0 ? ' (pending DB query)' : ''}`);
  console.log(`  Secondary:      ${s.secondaryPages}`);

  // Title length distribution
  const pages = report.pages.filter(p => p.title);
  const titleInRange = pages.filter(p => p.titleLength >= 30 && p.titleLength <= 60).length;
  const titleShort = pages.filter(p => p.titleLength < 30 && p.titleLength > 0).length;
  const titleLong = pages.filter(p => p.titleLength > 60).length;

  console.log('\nTITLE LENGTH:');
  console.log(`  In range (30-60):  ${titleInRange} pages`);
  console.log(`  Too short (<30):   ${titleShort} pages`);
  console.log(`  Too long (>60):    ${titleLong} pages`);

  // Description length distribution
  const withDesc = pages.filter(p => p.description);
  const descInRange = withDesc.filter(p => p.descriptionLength >= 120 && p.descriptionLength <= 160).length;
  const descShort = withDesc.filter(p => p.descriptionLength < 120 && p.descriptionLength > 0).length;
  const descLong = withDesc.filter(p => p.descriptionLength > 160).length;

  console.log('\nDESCRIPTION LENGTH:');
  console.log(`  In range (120-160):  ${descInRange} pages`);
  console.log(`  Too short (<120):    ${descShort} pages`);
  console.log(`  Too long (>160):     ${descLong} pages`);

  console.log('\nISSUES:');
  console.log(`  Missing titles:        ${s.issues.missingTitle}`);
  console.log(`  Missing descriptions:  ${s.issues.missingDesc}`);
  console.log(`  Missing keywords:      ${s.issues.missingKeywords}`);
  console.log(`  Duplicate title groups: ${s.issues.duplicateTitles}`);
  console.log(`  Keyword cannibalization: ${s.issues.keywordCannibalization}`);
  console.log(`  H1/title mismatch:     ${s.issues.h1Mismatch}`);
  console.log(`  Generic titles:        ${s.issues.genericTitles}`);

  if (report.duplicateTitles.length > 0) {
    console.log('\nDUPLICATE TITLES:');
    for (const dt of report.duplicateTitles) {
      console.log(`  "${dt.title}" (${dt.count} pages)`);
      for (const p of dt.pages) {
        console.log(`    - [${p.type}] ${p.url}`);
      }
    }
  }

  if (report.keywordOverlaps.length > 0) {
    console.log('\nKEYWORD CANNIBALIZATION (top 10):');
    for (const ko of report.keywordOverlaps.slice(0, 10)) {
      console.log(`  "${ko.keyword}" (${ko.count} pages)`);
      for (const p of ko.pages) {
        console.log(`    - [${p.type}] ${p.url}`);
      }
    }
  }

  if (report.intentOverlaps.length > 0) {
    console.log(`\nINTENT OVERLAPS (product vs theme): ${report.intentOverlaps.length}`);
    for (const io of report.intentOverlaps.slice(0, 5)) {
      console.log(`  Product: ${io.productPage.url}  <->  Theme: ${io.themeHub.url}`);
      console.log(`    Shared: ${io.sharedKeywords.join(', ')}`);
    }
  }

  if (report.templatePatterns.length > 0) {
    console.log('\nTITLE TEMPLATE PATTERNS:');
    for (const tp of report.templatePatterns) {
      console.log(`  "${tp.template}" (${tp.count} pages)`);
    }
  }

  // Pages with most issues
  const problematicPages = report.pages
    .filter(p => p.issues.length > 0)
    .sort((a, b) => b.issues.length - a.issues.length)
    .slice(0, 10);

  if (problematicPages.length > 0) {
    console.log('\nMOST PROBLEMATIC PAGES (top 10):');
    for (const p of problematicPages) {
      console.log(`  ${p.url} [${p.type}] - ${p.issues.join(', ')}`);
    }
  }

  console.log('\n' + '='.repeat(55));
  console.log('  Report saved to: docs/audit-results/english-seo-baseline.json');
  if (s.blogPosts === 0) {
    console.log('  Run seo-audit-blog-query.sql on server for blog data');
  }
  console.log('='.repeat(55) + '\n');
}

// ─── Main ─────────────────────────────────────────────────────────────

function main() {
  console.log('English SEO Baseline Audit');
  console.log('Part 1 of ONE CLICK A DAY SEO Plan');
  console.log(new Date().toISOString());

  // Extract all page types
  const productPages = extractProductPages();
  const themeHubs = extractThemeHubs();
  const themeGrades = extractThemeGrades();
  const secondaryPages = extractSecondaryPages();

  // Merge blog posts if the JSON file exists
  let blogPages = [];
  const blogJsonPath = path.join(ROOT, 'docs', 'audit-results', 'blog-seo-data.json');
  if (fs.existsSync(blogJsonPath)) {
    try {
      blogPages = JSON.parse(fs.readFileSync(blogJsonPath, 'utf-8'));
      console.log(`\n--- Loaded ${blogPages.length} blog posts from blog-seo-data.json ---`);
    } catch (e) {
      console.error(`  WARN: Could not parse blog-seo-data.json: ${e.message}`);
    }
  } else {
    console.log('\n--- Blog posts: pending (run seo-audit-blog-query.sql on server) ---');
  }

  const allPages = [...productPages, ...themeHubs, ...themeGrades, ...secondaryPages, ...blogPages];

  // Analyze
  const analysis = analyzePages(allPages);

  // Generate report
  const report = generateReport(allPages, analysis);
  if (blogPages.length > 0) {
    report.summary.blogPosts = blogPages.length;
  }

  // Write report
  const outputDir = path.join(ROOT, 'docs', 'audit-results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'english-seo-baseline.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  // Print summary
  printSummary(report);
}

main();
