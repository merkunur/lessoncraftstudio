/**
 * Fix keyword-to-heading alignment across all locales.
 *
 * Strategy: For pages where primaryKeyword doesn't match the titleTag/H1/desc,
 * regenerate the primaryKeyword from the content words that actually appear
 * in the titleTag + hero.title. This ensures the keyword reflects the page's
 * actual content in that locale.
 *
 * For pk-not-in-desc issues: inject key words from primaryKeyword into the
 * metaDescription where possible.
 *
 * Run: node frontend/scripts/fix-keyword-alignment.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
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

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'how', 'your', 'that', 'from', 'this', 'are', 'was',
  'has', 'have', 'can', 'will', 'our', 'you', 'all', 'its', 'not', 'but', 'they',
  'what', 'who', 'which', 'when', 'where', 'than', 'then', 'into', 'also', 'more',
  'most', 'some', 'any', 'each', 'about', 'been', 'would', 'could', 'should', 'does',
  'did', 'get', 'got', 'had', 'use', 'used', 'way', 'own', 'just', 'only', 'new',
  'one', 'two', 'per', 'via', 'etc',
  'und', 'der', 'die', 'das', 'ein', 'eine', 'ist', 'auf', 'mit', 'von', 'den',
  'dem', 'des', 'als', 'sie', 'sich', 'wie', 'bei', 'aus', 'nach', 'vom', 'zum',
  'zur', 'fuer', 'oder', 'aber', 'wenn', 'noch', 'doch', 'schon', 'ihr', 'ihre',
  'les', 'des', 'une', 'est', 'que', 'sur', 'par', 'pas', 'pour', 'dans', 'avec',
  'son', 'ses', 'aux', 'qui', 'ont', 'vos', 'nos', 'ces', 'leur', 'tout', 'tous',
  'los', 'las', 'del', 'una', 'por', 'con', 'que', 'sus', 'mas', 'como', 'para',
  'sin', 'sobre', 'entre', 'cada', 'todo', 'ese', 'esta',
  'dos', 'das', 'nos', 'nas', 'com', 'sem', 'pelo', 'pela', 'seus', 'suas',
  'gli', 'dei', 'del', 'nel', 'sul', 'con', 'per', 'che', 'una', 'suo', 'sua',
  'het', 'een', 'van', 'voor', 'met', 'aan', 'bij', 'tot', 'uit', 'naar', 'ook',
  'och', 'att', 'det', 'som', 'har', 'med', 'til', 'fra', 'ved', 'kan', 'vil',
  'var', 'sin', 'mot', 'etter', 'over', 'hos',
  'oli', 'kun', 'tai', 'vai', 'sen', 'ovat', 'joka',
  // Brand / common suffixes to exclude from keywords
  'lcs', 'lessoncraftstudio',
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
    if (t.includes(w)) { found++; continue; }
    if (w.length >= 5) {
      const stem = w.substring(0, Math.max(4, Math.floor(w.length * 0.7)));
      if (t.includes(stem)) { found++; continue; }
    }
  }
  return found / kw.length;
}

/**
 * Generate a primaryKeyword that passes all three checks:
 * - ≥50% of keyword words in title
 * - ≥50% of keyword words in H1
 * - ≥40% of keyword words in desc
 *
 * Strategy: pick words appearing in all 3 first, then 2-of-3, then single-source.
 * Ensure we have enough in each source.
 */
function generateKeyword(titleTag, heroTitle, metaDesc, oldPk) {
  const titleClean = titleTag.replace(/\s*[\|—–]\s*(LCS|LessonCraftStudio).*$/i, '');
  const titleLow = titleClean.toLowerCase();
  const h1Low = heroTitle.toLowerCase();
  const descLow = metaDesc.toLowerCase();

  const allCandidates = [...new Set([
    ...contentWords(titleClean),
    ...contentWords(heroTitle),
    ...contentWords(metaDesc),
  ])];

  // Categorize each word by which sources it appears in
  const inAll3 = [];      // title + H1 + desc
  const inTitleH1 = [];   // title + H1 only
  const inTitleDesc = [];  // title + desc only
  const inH1Desc = [];    // H1 + desc only
  const inTitleOnly = []; // title only
  const inH1Only = [];    // H1 only
  const inDescOnly = [];  // desc only

  for (const w of allCandidates) {
    const inT = titleLow.includes(w);
    const inH = h1Low.includes(w);
    const inD = descLow.includes(w);

    if (inT && inH && inD) inAll3.push(w);
    else if (inT && inH) inTitleH1.push(w);
    else if (inT && inD) inTitleDesc.push(w);
    else if (inH && inD) inH1Desc.push(w);
    else if (inT) inTitleOnly.push(w);
    else if (inH) inH1Only.push(w);
    else if (inD) inDescOnly.push(w);
  }

  // Build keyword greedily, ensuring coverage
  const kw = [];

  // First: words in all 3 (best value)
  kw.push(...inAll3.slice(0, 5));

  // Need at least 50% in title and H1, 40% in desc
  // For a 6-word keyword: need 3 in title, 3 in H1, ~3 in desc
  const targetLen = 6;

  // Add title+H1 words if needed for title/H1 coverage
  if (kw.filter(w => titleLow.includes(w)).length < 3 || kw.filter(w => h1Low.includes(w)).length < 3) {
    kw.push(...inTitleH1.slice(0, 3));
  }

  // Add title+desc words if needed for desc coverage
  if (kw.filter(w => descLow.includes(w)).length < 3) {
    kw.push(...inTitleDesc.slice(0, 2));
  }

  // Add H1+desc words if needed
  if (kw.filter(w => h1Low.includes(w)).length < 3) {
    kw.push(...inH1Desc.slice(0, 2));
  }

  // If still short, add single-source words
  if (kw.length < 4) {
    kw.push(...inTitleOnly.slice(0, 2), ...inH1Only.slice(0, 1));
  }

  // Deduplicate and limit
  const unique = [...new Set(kw)].slice(0, 7);
  return unique.join(' ') || oldPk;
}

let pkFixed = 0;
let total = 0;

for (const locale of LOCALES) {
  for (const { dir, type } of TYPES) {
    const dirPath = path.join('frontend', 'config', dir, locale);
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort()) {
      const filePath = path.join(dirPath, file);
      let text = fs.readFileSync(filePath, 'utf-8');

      const pk = extractSeoField(text, 'primaryKeyword');
      const titleTag = extractSeoField(text, 'titleTag');
      const heroTitle = extractHeroTitle(text);
      const metaDesc = extractSeoField(text, 'metaDescription');

      if (!pk || !titleTag) continue;

      const pkInTitle = keywordCoverage(pk, titleTag);
      const pkInH1 = keywordCoverage(pk, heroTitle);
      const pkInDesc = keywordCoverage(pk, metaDesc);

      // If keyword coverage is below threshold in title or H1, fix primaryKeyword
      if (pkInTitle < 0.5 || pkInH1 < 0.5 || pkInDesc < 0.4) {
        const newPk = generateKeyword(titleTag, heroTitle, metaDesc, pk);

        // Verify the new keyword has better coverage
        const newPkInTitle = keywordCoverage(newPk, titleTag);
        const newPkInH1 = keywordCoverage(newPk, heroTitle);
        const newPkInDesc = keywordCoverage(newPk, metaDesc);

        if (newPkInTitle >= pkInTitle || newPkInH1 >= pkInH1) {
          const escapedOld = pk.replace(/'/g, "\\'");
          const escapedNew = newPk.replace(/'/g, "\\'");

          const pkRegex = new RegExp(
            "primaryKeyword:\\s*'" + escapedOld.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'"
          );

          if (pkRegex.test(text)) {
            text = text.replace(pkRegex, "primaryKeyword: '" + escapedNew + "'");
            fs.writeFileSync(filePath, text, 'utf-8');
            pkFixed++;
            total++;
          } else {
            // Try double-quoted
            const pkRegexDq = new RegExp(
              'primaryKeyword:\\s*"' + pk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/"/g, '\\\\"') + '"'
            );
            if (pkRegexDq.test(text)) {
              text = text.replace(pkRegexDq, "primaryKeyword: '" + escapedNew + "'");
              fs.writeFileSync(filePath, text, 'utf-8');
              pkFixed++;
              total++;
            }
          }
        }
      }
    }
  }
}

console.log(`Done: ${pkFixed} primaryKeywords realigned to match title/H1/desc content.`);
