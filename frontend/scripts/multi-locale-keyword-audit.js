/**
 * Multi-locale keyword-in-heading SEO audit.
 * Checks that primaryKeyword words appear in titleTag, hero.title (H1),
 * metaDescription, and section headings across ALL locales.
 *
 * Run: node frontend/scripts/multi-locale-keyword-audit.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TYPES = [
  { dir: 'app-content', type: 'app' },
  { dir: 'tool-content', type: 'tool' },
  { dir: 'guide-content', type: 'guide' },
  { dir: 'blog-content', type: 'blog' },
  { dir: 'idea-content', type: 'idea' },
  { dir: 'start-content', type: 'start' },
  { dir: 'bundle-content', type: 'bundle' },
  { dir: 'compare-content', type: 'compare' },
];

// Stop words per locale (common function words to ignore when matching keywords)
const STOP_WORDS = new Set([
  // English
  'the', 'and', 'for', 'with', 'how', 'your', 'that', 'from', 'this', 'are', 'was',
  'has', 'have', 'can', 'will', 'our', 'you', 'all', 'its', 'not', 'but', 'they',
  'what', 'who', 'which', 'when', 'where', 'than', 'then', 'into', 'also', 'more',
  'most', 'some', 'any', 'each', 'about', 'been', 'would', 'could', 'should', 'does',
  'did', 'get', 'got', 'had', 'use', 'used', 'way', 'own', 'just', 'only', 'new',
  'one', 'two', 'per', 'via', 'etc',
  // German
  'und', 'der', 'die', 'das', 'ein', 'eine', 'ist', 'auf', 'mit', 'von', 'den',
  'dem', 'des', 'als', 'sie', 'sich', 'wie', 'bei', 'aus', 'nach', 'vom', 'zum',
  'zur', 'fuer', 'oder', 'aber', 'wenn', 'noch', 'doch', 'schon', 'ihr', 'ihre',
  // French
  'les', 'des', 'une', 'est', 'que', 'sur', 'par', 'pas', 'pour', 'dans', 'avec',
  'son', 'ses', 'aux', 'qui', 'ont', 'vos', 'nos', 'ces', 'leur', 'tout', 'tous',
  // Spanish
  'los', 'las', 'del', 'una', 'por', 'con', 'que', 'sus', 'mas', 'como', 'para',
  'sin', 'sobre', 'entre', 'cada', 'todo', 'ese', 'esta',
  // Portuguese
  'dos', 'das', 'nos', 'nas', 'com', 'sem', 'pelo', 'pela', 'seus', 'suas',
  // Italian
  'gli', 'dei', 'del', 'nel', 'sul', 'con', 'per', 'che', 'una', 'suo', 'sua',
  // Dutch
  'het', 'een', 'van', 'voor', 'met', 'aan', 'bij', 'tot', 'uit', 'naar', 'ook',
  // Scandinavian
  'och', 'att', 'det', 'som', 'har', 'med', 'til', 'fra', 'ved', 'kan', 'vil',
  'var', 'sin', 'mot', 'etter', 'over', 'hos',
  // Finnish
  'oli', 'kun', 'tai', 'vai', 'sen', 'ovat', 'joka',
]);

function extractField(text, key) {
  const r1 = new RegExp(key + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'", 's');
  let m = text.match(r1);
  if (m) return m[1].replace(/\\'/g, "'").trim();
  const r2 = new RegExp(key + '\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"', 's');
  m = text.match(r2);
  if (m) return m[1].replace(/\\"/g, '"').trim();
  return '';
}

function extractSeoField(text, key) {
  const seoBlock = text.match(/seo:\s*\{[\s\S]*?\n\s*\}/);
  if (!seoBlock) return extractField(text, key);
  return extractField(seoBlock[0], key);
}

function extractHeroTitle(text) {
  const heroBlock = text.match(/hero:\s*\{[\s\S]*?\n\s*\}/);
  if (heroBlock) return extractField(heroBlock[0], 'title');
  return '';
}

function extractSecondaryKeywords(text) {
  const seoBlock = text.match(/seo:\s*\{[\s\S]*?\n\s*\}/);
  const block = seoBlock ? seoBlock[0] : text;
  const m = block.match(/secondaryKeywords:\s*\[([\s\S]*?)\]/);
  if (!m) return [];
  return m[1].match(/['"`]((?:[^'"`\\]|\\.)*?)['"`]/g)?.map(s => s.slice(1, -1)) || [];
}

function extractAllHeadings(text) {
  const headings = [];
  for (const m of text.matchAll(/heading:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs)) headings.push(m[1]);
  for (const m of text.matchAll(/title:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs)) headings.push(m[1]);
  for (const m of text.matchAll(/question:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs)) headings.push(m[1]);
  return headings;
}

function contentWords(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zà-öø-ÿ0-9 ]/g, ' ')
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
    // Exact substring match
    if (t.includes(w)) { found++; continue; }
    // Stem match: if word is 5+ chars, check if first 4+ chars appear as a word prefix in text
    // This handles morphological variations: tulosteet/tulosteita, Arbeitsblätter/Arbeitsblatt
    if (w.length >= 5) {
      const stem = w.substring(0, Math.max(4, Math.floor(w.length * 0.7)));
      if (t.includes(stem)) { found++; continue; }
    }
  }
  return found / kw.length;
}

function secondaryInHeadings(secondaryKws, headings) {
  const allH = headings.join(' ').toLowerCase();
  let found = 0;
  for (const sk of secondaryKws) {
    const words = contentWords(sk);
    const coverage = words.filter(w => allH.includes(w)).length / (words.length || 1);
    if (coverage >= 0.5) found++;
  }
  return { found, total: secondaryKws.length };
}

// Main audit
let total = 0;
let passCount = 0;
const issueList = [];

for (const locale of LOCALES) {
  for (const { dir, type } of TYPES) {
    const dirPath = path.join('frontend', 'config', dir, locale);
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort()) {
      const slug = file.replace('.ts', '');
      const text = fs.readFileSync(path.join(dirPath, file), 'utf-8');

      const pk = extractSeoField(text, 'primaryKeyword');
      const titleTag = extractSeoField(text, 'titleTag');
      const metaDesc = extractSeoField(text, 'metaDescription');
      const heroTitle = extractHeroTitle(text);
      const secondaryKws = extractSecondaryKeywords(text);
      const allHeadings = extractAllHeadings(text);

      total++;
      const fileIssues = [];

      // 1. Primary keyword in titleTag (>=50% word coverage)
      const pkInTitle = keywordCoverage(pk, titleTag);
      if (pkInTitle < 0.5) {
        fileIssues.push(`pk-not-in-title(${Math.round(pkInTitle * 100)}%)`);
      }

      // 2. Primary keyword in H1 (>=50% word coverage)
      const pkInH1 = keywordCoverage(pk, heroTitle);
      if (pkInH1 < 0.5) {
        fileIssues.push(`pk-not-in-h1(${Math.round(pkInH1 * 100)}%)`);
      }

      // 3. Primary keyword in meta description (>=40% word coverage)
      const pkInDesc = keywordCoverage(pk, metaDesc);
      if (pkInDesc < 0.4) {
        fileIssues.push(`pk-not-in-desc(${Math.round(pkInDesc * 100)}%)`);
      }

      // 4. Secondary keywords in headings (at least 20% should appear)
      if (secondaryKws.length >= 3) {
        const { found, total: skTotal } = secondaryInHeadings(secondaryKws, allHeadings);
        if (found / skTotal < 0.2) {
          fileIssues.push(`secondary-kw-not-in-headings(${found}/${skTotal})`);
        }
      }

      if (fileIssues.length === 0) {
        passCount++;
      } else {
        issueList.push({ locale, type, slug, pk, titleTag: titleTag.substring(0, 55), issues: fileIssues });
      }
    }
  }
}

// Summary
console.log('========================================');
console.log('MULTI-LOCALE KEYWORD-IN-HEADING AUDIT');
console.log('========================================');
console.log(`Total pages:   ${total}`);
console.log(`Passing:       ${passCount}`);
console.log(`With issues:   ${issueList.length}`);
console.log(`Pass rate:     ${Math.round(passCount / total * 100)}%`);
console.log();

// By locale
console.log('--- By Locale ---');
for (const locale of LOCALES) {
  const locIssues = issueList.filter(e => e.locale === locale).length;
  const locTotal = TYPES.reduce((sum, { dir }) => {
    const d = path.join('frontend', 'config', dir, locale);
    return sum + (fs.existsSync(d) ? fs.readdirSync(d).filter(f => f.endsWith('.ts')).length : 0);
  }, 0);
  const rate = locTotal > 0 ? Math.round((locTotal - locIssues) / locTotal * 100) : 100;
  console.log(`  ${locale}: ${locTotal} pages, ${locIssues} issues (${rate}% pass)`);
}
console.log();

// By issue type
const byIssue = {};
for (const e of issueList) {
  for (const i of e.issues) {
    const key = i.replace(/\(.*/, '');
    byIssue[key] = (byIssue[key] || 0) + 1;
  }
}
console.log('--- By Issue Type ---');
for (const [k, v] of Object.entries(byIssue).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}
console.log();

// Full issue list
console.log('--- All Issues ---');
for (const e of issueList) {
  console.log(`${e.locale}/${e.type}/${e.slug}: ${e.issues.join(', ')}`);
}
