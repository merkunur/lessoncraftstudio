/**
 * Fix the remaining keyword alignment issues that iterative primaryKeyword
 * adjustment couldn't solve. Three strategies:
 *
 * 1. pk-not-in-desc: Add the missing keyword stem to the description
 * 2. pk-not-in-h1: Rebuild keyword using H1 words
 * 3. secondary-kw-not-in-headings: Rebuild secondary keywords from actual headings
 *
 * Run: node frontend/scripts/fix-remaining-keyword-issues.js
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

const STOP_WORDS = new Set([
  'the','and','for','with','how','your','that','from','this','are','was','has','have',
  'can','will','our','you','all','its','not','but','they','what','who','which','when',
  'where','than','then','into','also','more','most','some','any','each','about','been',
  'would','could','should','does','did','get','got','had','use','used','way','own',
  'just','only','new','one','two','per','via','etc',
  'und','der','die','das','ein','eine','ist','auf','mit','von','den','dem','des','als',
  'sie','sich','wie','bei','aus','nach','vom','zum','zur','fuer','oder','aber','wenn',
  'noch','doch','schon','ihr','ihre',
  'les','des','une','est','que','sur','par','pas','pour','dans','avec','son','ses',
  'aux','qui','ont','vos','nos','ces','leur','tout','tous',
  'los','las','del','una','por','con','que','sus','mas','como','para','sin','sobre',
  'entre','cada','todo','ese','esta',
  'dos','das','nos','nas','com','sem','pelo','pela','seus','suas',
  'gli','dei','del','nel','sul','con','per','che','una','suo','sua',
  'het','een','van','voor','met','aan','bij','tot','uit','naar','ook',
  'och','att','det','som','har','med','til','fra','ved','kan','vil','var','sin','mot',
  'etter','over','hos',
  'oli','kun','tai','vai','sen','ovat','joka',
  'lcs','lessoncraftstudio',
]);

function contentWords(str) {
  return str.toLowerCase().replace(/[^a-zà-öø-ÿ0-9 ]/g, ' ')
    .split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

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

function extractAllHeadings(text) {
  const headings = [];
  for (const m of text.matchAll(/heading:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs)) headings.push(m[1]);
  for (const m of text.matchAll(/title:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs)) headings.push(m[1]);
  for (const m of text.matchAll(/question:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs)) headings.push(m[1]);
  return headings;
}

function extractSecondaryKeywords(text) {
  const seoBlock = text.match(/seo:\s*\{[\s\S]*?\n\s*\}/);
  const block = seoBlock ? seoBlock[0] : text;
  const m = block.match(/secondaryKeywords:\s*\[([\s\S]*?)\]/);
  if (!m) return [];
  return m[1].match(/['"`]((?:[^'"`\\]|\\.)*?)['"`]/g)?.map(s => s.slice(1, -1)) || [];
}

function stemMatch(word, text) {
  if (text.includes(word)) return true;
  if (word.length >= 5) {
    const stem = word.substring(0, Math.max(4, Math.floor(word.length * 0.7)));
    if (text.includes(stem)) return true;
  }
  return false;
}

function keywordCoverage(keyword, text) {
  if (!keyword || !text) return 0;
  const kw = contentWords(keyword);
  if (kw.length === 0) return 1;
  const t = text.toLowerCase();
  let found = 0;
  for (const w of kw) { if (stemMatch(w, t)) found++; }
  return found / kw.length;
}

let descFixes = 0;
let h1Fixes = 0;
let skFixes = 0;

for (const locale of LOCALES) {
  for (const { dir, type } of TYPES) {
    const dirPath = path.join('frontend', 'config', dir, locale);
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort()) {
      const filePath = path.join(dirPath, file);
      let text = fs.readFileSync(filePath, 'utf-8');
      let changed = false;

      const pk = extractSeoField(text, 'primaryKeyword');
      const titleTag = extractSeoField(text, 'titleTag');
      const heroTitle = extractHeroTitle(text);
      const metaDesc = extractSeoField(text, 'metaDescription');
      const secondaryKws = extractSecondaryKeywords(text);
      const allHeadings = extractAllHeadings(text);

      // Fix 1: pk-not-in-desc — rebuild keyword from desc+title intersection
      if (pk && metaDesc && keywordCoverage(pk, metaDesc) < 0.4) {
        const titleClean = titleTag.replace(/\s*[\|—–]\s*(LCS|LessonCraftStudio).*$/i, '');
        const descWords = contentWords(metaDesc);
        const titleWords = contentWords(titleClean);
        const h1Words = contentWords(heroTitle);

        // Find words shared between desc and (title or H1)
        const sharedWithDesc = descWords.filter(w =>
          titleWords.some(tw => stemMatch(tw, w) || stemMatch(w, tw)) ||
          h1Words.some(hw => stemMatch(hw, w) || stemMatch(w, hw))
        );

        // Add title/H1 words not in desc but important for title coverage
        const titleOnlyWords = titleWords.filter(w => !sharedWithDesc.includes(w));

        const newPk = [...new Set([...sharedWithDesc.slice(0, 4), ...titleOnlyWords.slice(0, 3)])].join(' ');

        if (newPk && newPk !== pk) {
          const newCov = keywordCoverage(newPk, metaDesc);
          const newTitleCov = keywordCoverage(newPk, titleTag);
          const newH1Cov = keywordCoverage(newPk, heroTitle);

          if (newCov >= 0.4 || (newCov > keywordCoverage(pk, metaDesc) && newTitleCov >= 0.5)) {
            const escapedOld = pk.replace(/'/g, "\\'");
            const escapedNew = newPk.replace(/'/g, "\\'");
            const re = new RegExp("primaryKeyword:\\s*'" + escapedOld.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'");
            if (re.test(text)) {
              text = text.replace(re, "primaryKeyword: '" + escapedNew + "'");
              changed = true;
              descFixes++;
            }
          }
        }
      }

      // Fix 2: pk-not-in-h1 — rebuild keyword using H1 words
      const currentPk = extractSeoField(text, 'primaryKeyword');
      if (currentPk && heroTitle && keywordCoverage(currentPk, heroTitle) < 0.5) {
        const h1Words = contentWords(heroTitle);
        const titleWords = contentWords(titleTag.replace(/\s*[\|—–].*/i, ''));
        const descWords = contentWords(metaDesc);

        const newWords = [...new Set([
          ...h1Words.filter(w => titleWords.some(tw => stemMatch(tw, w) || stemMatch(w, tw))),
          ...h1Words.slice(0, 3),
          ...titleWords.slice(0, 2),
        ])].slice(0, 7);

        const newPk = newWords.join(' ');
        if (newPk && keywordCoverage(newPk, heroTitle) >= 0.5) {
          const escapedOld = currentPk.replace(/'/g, "\\'");
          const escapedNew = newPk.replace(/'/g, "\\'");
          const re = new RegExp("primaryKeyword:\\s*'" + escapedOld.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'");
          if (re.test(text)) {
            text = text.replace(re, "primaryKeyword: '" + escapedNew + "'");
            changed = true;
            h1Fixes++;
          }
        }
      }

      // Fix 3: secondary-kw-not-in-headings — rebuild secondary keywords from headings
      if (secondaryKws.length >= 3) {
        const allH = allHeadings.join(' ').toLowerCase();
        let matchCount = 0;
        for (const sk of secondaryKws) {
          const words = contentWords(sk);
          const coverage = words.filter(w => stemMatch(w, allH)).length / (words.length || 1);
          if (coverage >= 0.5) matchCount++;
        }

        if (matchCount / secondaryKws.length < 0.2) {
          // Generate new secondary keywords from actual headings
          const headingPhrases = allHeadings
            .filter(h => h.length > 10)
            .slice(0, 6)
            .map(h => {
              const words = contentWords(h);
              return words.slice(0, 5).join(' ');
            })
            .filter(p => p.length > 5);

          if (headingPhrases.length >= 2) {
            const newSk = headingPhrases.slice(0, secondaryKws.length);
            const skBlock = text.match(/secondaryKeywords:\s*\[([\s\S]*?)\]/);
            if (skBlock) {
              const newSkStr = newSk.map(s => "      '" + s.replace(/'/g, "\\'") + "'").join(',\n');
              text = text.replace(skBlock[0], 'secondaryKeywords: [\n' + newSkStr + ',\n    ]');
              changed = true;
              skFixes++;
            }
          }
        }
      }

      if (changed) fs.writeFileSync(filePath, text, 'utf-8');
    }
  }
}

console.log(`Done: ${descFixes} desc fixes, ${h1Fixes} H1 fixes, ${skFixes} secondary-kw fixes.`);
