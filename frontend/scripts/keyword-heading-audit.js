/**
 * Comprehensive keyword-in-heading SEO audit.
 * Checks that primaryKeyword words appear in titleTag, hero.title (H1),
 * metaDescription, and section headings (H2s).
 *
 * Run: node frontend/scripts/keyword-heading-audit.js
 */

const fs = require('fs');
const path = require('path');

const TYPES = [
  { dir: 'frontend/config/app-content/en', type: 'app' },
  { dir: 'frontend/config/tool-content/en', type: 'tool' },
  { dir: 'frontend/config/guide-content/en', type: 'guide' },
  { dir: 'frontend/config/blog-content/en', type: 'blog' },
  { dir: 'frontend/config/idea-content/en', type: 'idea' },
  { dir: 'frontend/config/start-content/en', type: 'start' },
  { dir: 'frontend/config/bundle-content/en', type: 'bundle' },
  { dir: 'frontend/config/compare-content/en', type: 'compare' },
];

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'how', 'your', 'that', 'from', 'this',
  'are', 'was', 'has', 'have', 'can', 'will', 'our', 'you', 'all',
  'its', 'not', 'but', 'they', 'what', 'who', 'which', 'when', 'where',
  'than', 'then', 'into', 'also', 'more', 'most', 'some', 'any', 'each',
  'about', 'been', 'would', 'could', 'should', 'does', 'did', 'get',
  'got', 'had', 'use', 'used', 'way', 'own', 'just', 'only', 'new',
  'one', 'two', 'per', 'via', 'etc',
]);

function extractField(text, key) {
  // Single-quoted
  const r1 = new RegExp(key + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'", 's');
  let m = text.match(r1);
  if (m) return m[1].replace(/\\'/g, "'").trim();

  // Double-quoted
  const r2 = new RegExp(key + '\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"', 's');
  m = text.match(r2);
  if (m) return m[1].replace(/\\"/g, '"').trim();

  // Backtick
  const r3 = new RegExp(key + '\\s*:\\s*`((?:[^`\\\\]|\\\\.)*)`', 's');
  m = text.match(r3);
  if (m) return m[1].trim();

  return '';
}

function extractSeoField(text, key) {
  // Only match within the seo: { ... } block
  const seoBlock = text.match(/seo:\s*\{[\s\S]*?\n\s*\}/);
  if (!seoBlock) return extractField(text, key);
  return extractField(seoBlock[0], key);
}

function extractHeroTitle(text) {
  // Match hero.title specifically
  const heroBlock = text.match(/hero:\s*\{[\s\S]*?\n\s*\}/);
  if (heroBlock) return extractField(heroBlock[0], 'title');
  return '';
}

function extractAllHeadings(text) {
  // Extract all heading/title fields from section arrays (H2s and H3s)
  const headings = [];

  // tutorial[].heading (guides, starts)
  const headingMatches = text.matchAll(/heading:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs);
  for (const m of headingMatches) headings.push(m[1]);

  // sections[].heading (blog, compare)
  // Already covered above

  // steps[].title, features[].title, cases[].title, etc.
  const titleMatches = text.matchAll(/title:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs);
  for (const m of titleMatches) headings.push(m[1]);

  // productIdeas[].title (ideas) - already covered
  // faq[].question
  const qMatches = text.matchAll(/question:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs);
  for (const m of qMatches) headings.push(m[1]);

  return headings;
}

function contentWords(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

function keywordCoverage(keyword, text) {
  if (!keyword || !text) return 0;
  const kw = contentWords(keyword);
  if (kw.length === 0) return 1;
  const t = text.toLowerCase();
  let found = 0;
  for (const w of kw) {
    if (t.includes(w)) found++;
  }
  return found / kw.length;
}

function anySecondaryInHeadings(secondaryKws, headings) {
  const allH = headings.join(' ').toLowerCase();
  let found = 0;
  for (const sk of secondaryKws) {
    const words = contentWords(sk);
    const coverage = words.filter(w => allH.includes(w)).length / (words.length || 1);
    if (coverage >= 0.6) found++;
  }
  return { found, total: secondaryKws.length };
}

function extractSecondaryKeywords(text) {
  const seoBlock = text.match(/seo:\s*\{[\s\S]*?\n\s*\}/);
  const block = seoBlock ? seoBlock[0] : text;
  const m = block.match(/secondaryKeywords:\s*\[([\s\S]*?)\]/);
  if (!m) return [];
  return m[1].match(/['"`]((?:[^'"`\\]|\\.)*?)['"`]/g)?.map(s => s.slice(1, -1)) || [];
}

// ── Main audit ──
let total = 0;
let passCount = 0;
const issueList = [];

for (const { dir, type } of TYPES) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();

  for (const file of files) {
    const slug = file.replace('.ts', '');
    const text = fs.readFileSync(path.join(dir, file), 'utf-8');

    const pk = extractSeoField(text, 'primaryKeyword');
    const titleTag = extractSeoField(text, 'titleTag');
    const metaDesc = extractSeoField(text, 'metaDescription');
    const heroTitle = extractHeroTitle(text);
    const allHeadings = extractAllHeadings(text);
    const secondaryKws = extractSecondaryKeywords(text);

    total++;
    const fileIssues = [];

    // 1. Primary keyword words in titleTag (>=50% coverage)
    const pkInTitle = keywordCoverage(pk, titleTag);
    if (pkInTitle < 0.5) {
      fileIssues.push(`pk-not-in-title(${Math.round(pkInTitle * 100)}%)`);
    }

    // 2. Primary keyword words in H1 (>=50% coverage)
    const pkInH1 = keywordCoverage(pk, heroTitle);
    if (pkInH1 < 0.5) {
      fileIssues.push(`pk-not-in-h1(${Math.round(pkInH1 * 100)}%)`);
    }

    // 3. Primary keyword words in meta description (>=40% coverage)
    const pkInDesc = keywordCoverage(pk, metaDesc);
    if (pkInDesc < 0.4) {
      fileIssues.push(`pk-not-in-desc(${Math.round(pkInDesc * 100)}%)`);
    }

    // 4. Secondary keywords in section headings (at least 30% should appear)
    if (secondaryKws.length > 0) {
      const { found: skInH, total: skTotal } = anySecondaryInHeadings(secondaryKws, allHeadings);
      const skRatio = skInH / skTotal;
      if (skRatio < 0.3) {
        fileIssues.push(`secondary-kw-missing-from-headings(${skInH}/${skTotal})`);
      }
    }

    // 5. Title length
    if (titleTag.length > 60) fileIssues.push(`title-long(${titleTag.length})`);

    // 6. Description length
    if (metaDesc.length > 160) fileIssues.push(`desc-long(${metaDesc.length})`);
    if (metaDesc.length < 80 && metaDesc.length > 0) fileIssues.push(`desc-short(${metaDesc.length})`);

    if (fileIssues.length === 0) {
      passCount++;
    } else {
      issueList.push({
        type,
        slug,
        pk,
        titleTag: titleTag.substring(0, 65),
        heroTitle: heroTitle.substring(0, 65),
        issues: fileIssues,
      });
    }
  }
}

// ── Summary ──
console.log('========================================');
console.log('KEYWORD-IN-HEADING SEO AUDIT');
console.log('========================================');
console.log(`Total pages:      ${total}`);
console.log(`Passing:          ${passCount}`);
console.log(`With issues:      ${issueList.length}`);
console.log(`Pass rate:        ${Math.round((passCount / total) * 100)}%`);
console.log();

// Issue breakdown
const byIssue = {};
for (const e of issueList) {
  for (const i of e.issues) {
    const key = i.replace(/\(.*/, '');
    byIssue[key] = (byIssue[key] || 0) + 1;
  }
}
console.log('Issue breakdown:');
for (const [k, v] of Object.entries(byIssue).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v} pages`);
}
console.log();

// By content type
const byType = {};
for (const e of issueList) {
  byType[e.type] = (byType[e.type] || 0) + 1;
}
console.log('Issues by content type:');
for (const [k, v] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}
console.log();

// Full issue list
console.log('--- All issues ---');
for (const e of issueList) {
  console.log(`${e.type}/${e.slug}`);
  console.log(`  PK: ${e.pk}`);
  console.log(`  Title: ${e.titleTag}`);
  console.log(`  H1: ${e.heroTitle}`);
  console.log(`  Issues: ${e.issues.join(', ')}`);
}
