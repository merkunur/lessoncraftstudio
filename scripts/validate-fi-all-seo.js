#!/usr/bin/env node
/**
 * Finnish SEO Validation Script — Part 136
 *
 * Validates ALL file-based Finnish metadata for:
 *   - Title length (target 50–60 chars)
 *   - Description length (target 150–160 chars)
 *   - Uniqueness (no duplicate titles or descriptions)
 *   - Language quality (no English leakage, Finnish markers present)
 *
 * Page types checked:
 *   - 33 product pages
 *   - 50 theme hubs
 *   - 250 theme+grade pages (5 grades × 50 themes)
 *   - 8 category hubs
 *   - 5 grade hubs
 *   - 6 navigation pages (homepage, apps, worksheets, pricing, blog, worksheets index)
 *
 * Usage: node scripts/validate-fi-all-seo.js
 */

const fs = require('fs');
const path = require('path');

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Unescape \uXXXX sequences → actual Unicode characters for accurate .length */
function unescapeUnicode(str) {
  if (!str) return str;
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}

/** Check if a string looks like it has English leakage */
function hasEnglishLeakage(str) {
  if (!str) return false;
  const lower = str.toLowerCase();
  const englishPatterns = [
    /(?:^|[\s,;.!?()])the\s/,
    /(?:^|[\s,;.!?()])and\s/,
    /(?:^|[\s,;.!?()])for kids/,
    /(?:^|[\s,;.!?()])free\s/,
    /(?:^|[\s,;.!?()])worksheets?(?:$|[\s,;.!?()])/,
    /(?:^|[\s,;.!?()])printable/,
    /(?:^|[\s,;.!?()])download/,
    /(?:^|[\s,;.!?()])children/,
    /(?:^|[\s,;.!?()])kindergarten/,
    /(?:^|[\s,;.!?()])preschool/,
    /(?:^|[\s,;.!?()])grade\s/,
    /(?:^|[\s,;.!?()])coloring/,
    /(?:^|[\s,;.!?()])math\s/,
    /(?:^|[\s,;.!?()])create\s/,
    /(?:^|[\s,;.!?()])activities/,
  ];
  for (const pat of englishPatterns) {
    if (pat.test(lower)) return true;
  }
  return false;
}

/** Check if string has Finnish markers (ä, ö, or common Finnish words) */
function hasFinnishMarkers(str) {
  if (!str) return false;
  // Check for Finnish characters
  if (/[äöÄÖ]/.test(str)) return true;
  // Check for common Finnish words
  const finnishWords = [
    'ja', 'tai', 'lapsille', 'ilmainen', 'tulostettav', 'tehtäv',
    'työarkki', 'työleh', 'esikoulu', 'luokka', 'lataa', 'luo',
    'generaattori', 'matematiik', 'väritys', 'pulm', 'heti',
    'ilmaiseksi', 'valitse', 'harjoitu', 'opetus', 'PDF',
  ];
  const lower = str.toLowerCase();
  return finnishWords.some(w => lower.includes(w));
}

// ─── Globals ──────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const allTitles = [];  // { page, title }
const allDescs = [];   // { page, desc }
const issues = [];     // { page, type, field, value, len, issue }
let totalChecked = 0;
let totalOk = 0;

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

// ─── Validate a single page entry ────────────────────────────────────────────

function validateEntry(pageType, pageName, rawTitle, rawDesc) {
  const title = unescapeUnicode(rawTitle || '');
  const desc = unescapeUnicode(rawDesc || '');
  const titleLen = title.length;
  const descLen = desc.length;

  totalChecked++;
  let pageOk = true;
  const pageIssues = [];

  // Title length
  if (titleLen < TITLE_MIN || titleLen > TITLE_MAX) {
    pageOk = false;
    const issue = titleLen < TITLE_MIN ? `<${TITLE_MIN}` : `>${TITLE_MAX}`;
    pageIssues.push(`title=${titleLen} (${issue})`);
    issues.push({ page: `${pageType}/${pageName}`, field: 'title', value: title, len: titleLen, issue });
  }

  // Description length
  if (descLen < DESC_MIN || descLen > DESC_MAX) {
    pageOk = false;
    const issue = descLen < DESC_MIN ? `<${DESC_MIN}` : `>${DESC_MAX}`;
    pageIssues.push(`desc=${descLen} (${issue})`);
    issues.push({ page: `${pageType}/${pageName}`, field: 'desc', value: desc, len: descLen, issue });
  }

  // English leakage
  if (hasEnglishLeakage(title)) {
    pageOk = false;
    pageIssues.push('title: English leakage');
    issues.push({ page: `${pageType}/${pageName}`, field: 'title', value: title, len: titleLen, issue: 'English leakage' });
  }
  if (hasEnglishLeakage(desc)) {
    pageOk = false;
    pageIssues.push('desc: English leakage');
    issues.push({ page: `${pageType}/${pageName}`, field: 'desc', value: desc, len: descLen, issue: 'English leakage' });
  }

  // Finnish markers
  if (!hasFinnishMarkers(title) && !hasFinnishMarkers(desc)) {
    pageOk = false;
    pageIssues.push('No Finnish markers');
    issues.push({ page: `${pageType}/${pageName}`, field: 'both', value: '', len: 0, issue: 'No Finnish markers' });
  }

  // Track for uniqueness check
  allTitles.push({ page: `${pageType}/${pageName}`, title });
  allDescs.push({ page: `${pageType}/${pageName}`, desc });

  if (pageOk) {
    totalOk++;
    return { status: 'OK', titleLen, descLen };
  } else {
    return { status: 'BAD', titleLen, descLen, issues: pageIssues };
  }
}

// ─── Section 1: Product Pages (33) ──────────────────────────────────────────

function validateProductPages() {
  console.log('\nPRODUCT PAGES (33):');
  const dir = path.join(ROOT, 'frontend/content/product-pages/fi');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();
  let ok = 0;
  let bad = 0;

  for (const file of files) {
    const slug = file.replace('.ts', '');
    const content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Extract seo block title and description
    // Pattern: seo: { ... title: '...', description: '...' }
    const seoBlock = content.match(/seo:\s*\{[\s\S]*?^\s*\}/m);
    let title = '', desc = '';

    if (seoBlock) {
      const titleMatch = seoBlock[0].match(/title:\s*'([^']*(?:\\.[^']*)*)'/);
      const descMatch = seoBlock[0].match(/description:\s*'([^']*(?:\\.[^']*)*)'/);
      if (titleMatch) title = titleMatch[1];
      if (descMatch) desc = descMatch[1];
    }

    // Fallback: search whole file for seo.title / seo.description
    if (!title) {
      const m = content.match(/seo:\s*\{[^}]*title:\s*'([^']+)'/s);
      if (m) title = m[1];
    }
    if (!desc) {
      const m = content.match(/seo:\s*\{[^}]*description:\s*'([^']+)'/s);
      if (m) desc = m[1];
    }

    const result = validateEntry('product', slug, title, desc);
    if (result.status === 'OK') {
      console.log(`  OK  ${slug}: title=${result.titleLen}, desc=${result.descLen}`);
      ok++;
    } else {
      console.log(`  BAD ${slug}: ${result.issues.join(', ')}`);
      bad++;
    }
  }

  console.log(`  Summary: ${ok}/${files.length} OK, ${bad} issues`);
  return { total: files.length, ok, bad };
}

// ─── Section 2: Theme Hubs (50) ─────────────────────────────────────────────

function validateThemeHubs() {
  console.log('\nTHEME HUBS (50):');
  const baseDir = path.join(ROOT, 'frontend/content/themes');
  const themeDirs = fs.readdirSync(baseDir).filter(d => {
    const fiPath = path.join(baseDir, d, 'fi.ts');
    return fs.existsSync(fiPath) && fs.statSync(path.join(baseDir, d)).isDirectory();
  }).sort();

  let ok = 0;
  let bad = 0;

  for (const theme of themeDirs) {
    const content = fs.readFileSync(path.join(baseDir, theme, 'fi.ts'), 'utf8');

    // Extract top-level title and description (before gradeContent)
    const beforeGrade = content.split(/gradeContent\s*:/)[0] || content;

    // title: '...' — the top-level title field
    const titleMatch = beforeGrade.match(/^\s*title:\s*'([^']*(?:\\.[^']*)*)'/m);
    const descMatch = beforeGrade.match(/^\s*description:\s*'([^']*(?:\\.[^']*)*)'/m);

    const title = titleMatch ? titleMatch[1] : '';
    const desc = descMatch ? descMatch[1] : '';

    const result = validateEntry('theme-hub', theme, title, desc);
    if (result.status === 'OK') {
      console.log(`  OK  ${theme}: title=${result.titleLen}, desc=${result.descLen}`);
      ok++;
    } else {
      console.log(`  BAD ${theme}: ${result.issues.join(', ')}`);
      bad++;
    }
  }

  console.log(`  Summary: ${ok}/${themeDirs.length} OK, ${bad} issues`);
  return { total: themeDirs.length, ok, bad };
}

// ─── Section 3: Theme+Grade (250) ──────────────────────────────────────────

function validateThemeGrade() {
  console.log('\nTHEME+GRADE PAGES (250):');
  const baseDir = path.join(ROOT, 'frontend/content/themes');
  const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
  const themeDirs = fs.readdirSync(baseDir).filter(d => {
    const fiPath = path.join(baseDir, d, 'fi.ts');
    return fs.existsSync(fiPath) && fs.statSync(path.join(baseDir, d)).isDirectory();
  }).sort();

  let ok = 0;
  let bad = 0;
  let total = 0;

  for (const theme of themeDirs) {
    const content = fs.readFileSync(path.join(baseDir, theme, 'fi.ts'), 'utf8');

    // Find gradeContent block
    const gradeBlock = content.split(/gradeContent\s*:/)[1];
    if (!gradeBlock) {
      console.log(`  SKIP ${theme}: no gradeContent found`);
      continue;
    }

    for (const grade of grades) {
      total++;

      // Extract the specific grade's seoTitle and seoDescription
      // Pattern: 'grade-name': { seoTitle: '...', seoDescription: '...' ...
      const gradePattern = new RegExp(
        `['"]${grade}['"]\\s*:\\s*\\{[^}]*?seoTitle:\\s*'([^']*(?:\\\\.[^']*)*)'`,
        's'
      );
      const descPattern = new RegExp(
        `['"]${grade}['"]\\s*:\\s*\\{[^}]*?seoDescription:\\s*'([^']*(?:\\\\.[^']*)*)'`,
        's'
      );

      const titleMatch = gradeBlock.match(gradePattern);
      const descMatch = gradeBlock.match(descPattern);

      const title = titleMatch ? titleMatch[1] : '';
      const desc = descMatch ? descMatch[1] : '';

      if (!title && !desc) {
        console.log(`  MISS ${theme}/${grade}: no seoTitle/seoDescription found`);
        bad++;
        issues.push({ page: `theme-grade/${theme}/${grade}`, field: 'both', value: '', len: 0, issue: 'Missing seoTitle/seoDescription' });
        continue;
      }

      const pageName = `${theme}/${grade}`;
      const result = validateEntry('theme-grade', pageName, title, desc);
      if (result.status === 'OK') {
        ok++;
      } else {
        console.log(`  BAD ${pageName}: ${result.issues.join(', ')}`);
        bad++;
      }
    }
  }

  // Only print OK count summary (not individual OKs — too many)
  console.log(`  Summary: ${ok}/${total} OK, ${bad} issues`);
  return { total, ok, bad };
}

// ─── Section 4: Category Hubs (8) ──────────────────────────────────────────

function validateCategoryHubs() {
  console.log('\nCATEGORY HUBS (8):');
  const filePath = path.join(ROOT, 'frontend/config/category-content.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  const categories = [
    'math', 'language-arts', 'word-games', 'art-creativity',
    'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor'
  ];

  let ok = 0;
  let bad = 0;

  for (const cat of categories) {
    // Find the category block, then its fi: { ... } sub-block
    // Strategy: find fi: { after the category key, extract title and description
    const catPattern = new RegExp(
      `['"]${cat}['"]\\s*:\\s*\\{[\\s\\S]*?fi:\\s*\\{([\\s\\S]*?)\\n\\s*\\}`,
      ''
    );
    const catMatch = content.match(catPattern);

    let title = '', desc = '';
    if (catMatch) {
      const fiBlock = catMatch[1];
      const titleMatch = fiBlock.match(/title:\s*'([^']*(?:\\.[^']*)*)'/);
      const descMatch = fiBlock.match(/description:\s*'([^']*(?:\\.[^']*)*)'/);
      if (titleMatch) title = titleMatch[1];
      if (descMatch) desc = descMatch[1];
    }

    // Fallback: search for fi: { title: ... } blocks globally, match by order
    if (!title) {
      // More aggressive: find all fi: { blocks
      const allFiBlocks = [...content.matchAll(/fi:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g)];
      // This is a category file so each fi block corresponds to a category
      // Try a different approach: split by category keys
    }

    const result = validateEntry('category', cat, title, desc);
    if (result.status === 'OK') {
      console.log(`  OK  ${cat}: title=${result.titleLen}, desc=${result.descLen}`);
      ok++;
    } else {
      console.log(`  BAD ${cat}: ${result.issues.join(', ')}`);
      bad++;
    }
  }

  console.log(`  Summary: ${ok}/${categories.length} OK, ${bad} issues`);
  return { total: categories.length, ok, bad };
}

// ─── Section 5: Grade Hubs (5) ─────────────────────────────────────────────

function validateGradeHubs() {
  console.log('\nGRADE HUBS (5):');
  const filePath = path.join(ROOT, 'frontend/config/grade-content.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
  let ok = 0;
  let bad = 0;

  for (const grade of grades) {
    const gradePattern = new RegExp(
      `['"]${grade}['"]\\s*:\\s*\\{[\\s\\S]*?fi:\\s*\\{([\\s\\S]*?)\\n\\s*\\}`,
      ''
    );
    const gradeMatch = content.match(gradePattern);

    let title = '', desc = '';
    if (gradeMatch) {
      const fiBlock = gradeMatch[1];
      const titleMatch = fiBlock.match(/title:\s*'([^']*(?:\\.[^']*)*)'/);
      const descMatch = fiBlock.match(/description:\s*'([^']*(?:\\.[^']*)*)'/);
      if (titleMatch) title = titleMatch[1];
      if (descMatch) desc = descMatch[1];
    }

    const result = validateEntry('grade', grade, title, desc);
    if (result.status === 'OK') {
      console.log(`  OK  ${grade}: title=${result.titleLen}, desc=${result.descLen}`);
      ok++;
    } else {
      console.log(`  BAD ${grade}: ${result.issues.join(', ')}`);
      bad++;
    }
  }

  console.log(`  Summary: ${ok}/${grades.length} OK, ${bad} issues`);
  return { total: grades.length, ok, bad };
}

// ─── Section 6: Navigation Pages (6) ───────────────────────────────────────

function validateNavigationPages() {
  console.log('\nNAVIGATION PAGES (6):');
  let ok = 0;
  let bad = 0;
  const navPages = [];

  // 1. Homepage — frontend/app/[locale]/page.tsx
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/page.tsx');
    const content = fs.readFileSync(filePath, 'utf8');
    // fi: { title: '...', description: '...' }
    const fiBlock = content.match(/fi:\s*\{([^}]*title:[^}]*description:[^}]*)\}/);
    let title = '', desc = '';
    if (fiBlock) {
      const tm = fiBlock[1].match(/title:\s*'([^']*)'/);
      const dm = fiBlock[1].match(/description:\s*'([^']*)'/);
      if (tm) title = tm[1];
      if (dm) desc = dm[1];
    }
    navPages.push({ name: 'homepage', title, desc });
  }

  // 2. Apps page — frontend/app/[locale]/apps/page.tsx
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/apps/page.tsx');
    const content = fs.readFileSync(filePath, 'utf8');
    const fiBlock = content.match(/fi:\s*\{([^}]*title:[^}]*description:[^}]*)\}/);
    let title = '', desc = '';
    if (fiBlock) {
      const tm = fiBlock[1].match(/title:\s*'([^']*)'/);
      const dm = fiBlock[1].match(/description:\s*'([^']*)'/);
      if (tm) title = tm[1];
      if (dm) desc = dm[1];
    }
    navPages.push({ name: 'apps', title, desc });
  }

  // 3. Worksheets page — separate pageTitle / pageDescription Records
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/worksheets/page.tsx');
    const content = fs.readFileSync(filePath, 'utf8');
    // pageTitle Record: fi: '...'
    const titleMatch = content.match(/pageTitle[\s\S]*?fi:\s*'([^']*)'/);
    // pageDescription Record: fi: '...'
    const descMatch = content.match(/pageDescription[\s\S]*?fi:\s*'([^']*)'/);
    const title = titleMatch ? titleMatch[1] : '';
    const desc = descMatch ? descMatch[1] : '';
    navPages.push({ name: 'worksheets', title, desc });
  }

  // 4. Pricing page — fi: { title: '...', description: '...' }
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/pricing/page.tsx');
    const content = fs.readFileSync(filePath, 'utf8');
    const fiBlock = content.match(/fi:\s*\{([^}]*title:[^}]*description:[^}]*)\}/);
    let title = '', desc = '';
    if (fiBlock) {
      const tm = fiBlock[1].match(/title:\s*'([^']*)'/);
      const dm = fiBlock[1].match(/description:\s*'([^']*)'/);
      if (tm) title = tm[1];
      if (dm) desc = dm[1];
    }
    navPages.push({ name: 'pricing', title, desc });
  }

  // 5. Blog listing page — blogPageMeta[locale]
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/blog/(listing)/page.tsx');
    const content = fs.readFileSync(filePath, 'utf8');
    // fi: { title: '...', description: '...' } within blogPageMeta-like object
    const fiBlock = content.match(/fi:\s*\{\s*\n?\s*title:\s*'([^']*)'\s*,\s*\n?\s*description:\s*'([^']*)'/);
    let title = '', desc = '';
    if (fiBlock) {
      title = fiBlock[1];
      desc = fiBlock[2];
    }
    navPages.push({ name: 'blog-listing', title, desc });
  }

  // 6. Contact page — check if it exists
  {
    const contactPath = path.join(ROOT, 'frontend/app/[locale]/contact/page.tsx');
    if (fs.existsSync(contactPath)) {
      const content = fs.readFileSync(contactPath, 'utf8');
      const fiBlock = content.match(/fi:\s*\{([^}]*title:[^}]*description:[^}]*)\}/);
      let title = '', desc = '';
      if (fiBlock) {
        const tm = fiBlock[1].match(/title:\s*'([^']*)'/);
        const dm = fiBlock[1].match(/description:\s*'([^']*)'/);
        if (tm) title = tm[1];
        if (dm) desc = dm[1];
      }
      navPages.push({ name: 'contact', title, desc });
    } else {
      // Try about page
      const aboutPath = path.join(ROOT, 'frontend/app/[locale]/about/page.tsx');
      if (fs.existsSync(aboutPath)) {
        const content = fs.readFileSync(aboutPath, 'utf8');
        const fiBlock = content.match(/fi:\s*\{([^}]*title:[^}]*description:[^}]*)\}/);
        let title = '', desc = '';
        if (fiBlock) {
          const tm = fiBlock[1].match(/title:\s*'([^']*)'/);
          const dm = fiBlock[1].match(/description:\s*'([^']*)'/);
          if (tm) title = tm[1];
          if (dm) desc = dm[1];
        }
        navPages.push({ name: 'about', title, desc });
      } else {
        console.log('  SKIP: No contact or about page found for 6th nav page');
      }
    }
  }

  for (const { name, title, desc } of navPages) {
    const result = validateEntry('nav', name, title, desc);
    if (result.status === 'OK') {
      console.log(`  OK  ${name}: title=${result.titleLen}, desc=${result.descLen}`);
      ok++;
    } else {
      console.log(`  BAD ${name}: ${result.issues.join(', ')}`);
      bad++;
    }
  }

  console.log(`  Summary: ${ok}/${navPages.length} OK, ${bad} issues`);
  return { total: navPages.length, ok, bad };
}

// ─── Uniqueness Check ──────────────────────────────────────────────────────

function checkUniqueness() {
  console.log('\nUNIQUENESS:');

  // Check duplicate titles
  const titleMap = new Map();
  for (const { page, title } of allTitles) {
    if (!title) continue;
    const normalized = title.trim().toLowerCase();
    if (!titleMap.has(normalized)) {
      titleMap.set(normalized, []);
    }
    titleMap.get(normalized).push(page);
  }

  const dupTitles = [];
  for (const [title, pages] of titleMap) {
    if (pages.length > 1) {
      dupTitles.push({ title, pages });
    }
  }

  if (dupTitles.length === 0) {
    console.log('  Duplicate titles: NONE');
  } else {
    console.log(`  Duplicate titles: ${dupTitles.length} found`);
    for (const { title, pages } of dupTitles) {
      console.log(`    "${title.substring(0, 60)}..." shared by:`);
      for (const p of pages) {
        console.log(`      - ${p}`);
      }
    }
  }

  // Check duplicate descriptions
  const descMap = new Map();
  for (const { page, desc } of allDescs) {
    if (!desc) continue;
    const normalized = desc.trim().toLowerCase();
    if (!descMap.has(normalized)) {
      descMap.set(normalized, []);
    }
    descMap.get(normalized).push(page);
  }

  const dupDescs = [];
  for (const [desc, pages] of descMap) {
    if (pages.length > 1) {
      dupDescs.push({ desc, pages });
    }
  }

  if (dupDescs.length === 0) {
    console.log('  Duplicate descriptions: NONE');
  } else {
    console.log(`  Duplicate descriptions: ${dupDescs.length} found`);
    for (const { desc, pages } of dupDescs) {
      console.log(`    "${desc.substring(0, 70)}..." shared by:`);
      for (const p of pages) {
        console.log(`      - ${p}`);
      }
    }
  }

  return { dupTitles: dupTitles.length, dupDescs: dupDescs.length };
}

// ─── Language Check Summary ────────────────────────────────────────────────

function checkLanguageQuality() {
  console.log('\nLANGUAGE CHECK:');

  const englishLeakages = issues.filter(i => i.issue === 'English leakage');
  const noFinnish = issues.filter(i => i.issue === 'No Finnish markers');

  if (englishLeakages.length === 0) {
    console.log('  English leakage found: 0 pages');
  } else {
    console.log(`  English leakage found: ${englishLeakages.length} fields`);
    for (const { page, field, value } of englishLeakages) {
      console.log(`    ${page} [${field}]: "${value.substring(0, 60)}..."`);
    }
  }

  if (noFinnish.length === 0) {
    console.log('  Missing Finnish markers: 0 pages');
  } else {
    console.log(`  Missing Finnish markers: ${noFinnish.length} pages`);
    for (const { page } of noFinnish) {
      console.log(`    ${page}`);
    }
  }

  return { englishLeakages: englishLeakages.length, noFinnish: noFinnish.length };
}

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  console.log('=== FINNISH SEO VALIDATION REPORT ===');
  console.log(`Generated: ${new Date().toISOString()}\n`);

  const results = {};

  results.product = validateProductPages();
  results.themeHub = validateThemeHubs();
  results.themeGrade = validateThemeGrade();
  results.category = validateCategoryHubs();
  results.grade = validateGradeHubs();
  results.nav = validateNavigationPages();

  const uniqueness = checkUniqueness();
  const language = checkLanguageQuality();

  // ─── Summary ────────────────────────────────────────────────────────────

  console.log('\n' + '='.repeat(60));
  console.log('OVERALL SUMMARY');
  console.log('='.repeat(60));

  const sections = [
    { name: 'Product pages', ...results.product },
    { name: 'Theme hubs', ...results.themeHub },
    { name: 'Theme+grade pages', ...results.themeGrade },
    { name: 'Category hubs', ...results.category },
    { name: 'Grade hubs', ...results.grade },
    { name: 'Navigation pages', ...results.nav },
  ];

  let grandTotal = 0;
  let grandOk = 0;
  let grandBad = 0;

  for (const s of sections) {
    grandTotal += s.total;
    grandOk += s.ok;
    grandBad += s.bad;
    const status = s.bad === 0 ? 'PASS' : 'ISSUES';
    console.log(`  ${s.name.padEnd(25)} ${s.ok}/${s.total} OK  [${status}]`);
  }

  console.log(`  ${'─'.repeat(45)}`);
  console.log(`  ${'TOTAL'.padEnd(25)} ${grandOk}/${grandTotal} OK`);
  console.log(`  Duplicate titles:       ${uniqueness.dupTitles}`);
  console.log(`  Duplicate descriptions: ${uniqueness.dupDescs}`);
  console.log(`  English leakage:        ${language.englishLeakages}`);
  console.log(`  Missing Finnish:        ${language.noFinnish}`);

  const allClear = grandBad === 0 && uniqueness.dupTitles === 0 && uniqueness.dupDescs === 0 && language.englishLeakages === 0;
  console.log(`\n  STATUS: ${allClear ? 'ALL CLEAR' : 'ISSUES FOUND — see details above'}`);

  // ─── Detailed Issues List ───────────────────────────────────────────────

  const lengthIssues = issues.filter(i => i.issue.startsWith('<') || i.issue.startsWith('>'));
  if (lengthIssues.length > 0) {
    console.log('\n' + '─'.repeat(60));
    console.log('LENGTH ISSUES DETAIL:');
    console.log('─'.repeat(60));
    for (const { page, field, len, issue } of lengthIssues) {
      console.log(`  ${page} [${field}]: ${len} chars (${issue})`);
    }
  }

  console.log('\n=== END OF REPORT ===');
}

main();
