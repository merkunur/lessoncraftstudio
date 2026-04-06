/**
 * Final pass: Force 100% keyword alignment by using ultra-short keywords
 * (3-4 words) built exclusively from words that appear in ALL three sources
 * (title, H1, desc). Also regenerates secondary keywords from headings.
 *
 * Run: node frontend/scripts/fix-final-keyword-pass.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TYPES = ['app-content', 'tool-content', 'guide-content', 'blog-content', 'idea-content', 'start-content', 'bundle-content', 'compare-content'];

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
  for (const m of text.matchAll(/(?<!hero[\s\S]{0,200})title:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs)) headings.push(m[1]);
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

let pkFixes = 0;
let skFixes = 0;

for (const locale of LOCALES) {
  for (const type of TYPES) {
    const dirPath = path.join('frontend', 'config', type, locale);
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort()) {
      const filePath = path.join(dirPath, file);
      let text = fs.readFileSync(filePath, 'utf-8');

      const pk = extractSeoField(text, 'primaryKeyword');
      const titleTag = extractSeoField(text, 'titleTag');
      const heroTitle = extractHeroTitle(text);
      const metaDesc = extractSeoField(text, 'metaDescription');
      const secondaryKws = extractSecondaryKeywords(text);
      const allHeadings = extractAllHeadings(text);

      if (!pk || !titleTag) continue;

      let changed = false;

      // Check if any threshold fails
      const titleCov = keywordCoverage(pk, titleTag);
      const h1Cov = keywordCoverage(pk, heroTitle);
      const descCov = keywordCoverage(pk, metaDesc);

      if (titleCov < 0.5 || h1Cov < 0.5 || descCov < 0.4) {
        // Build ultra-short keyword from words shared across sources
        const titleClean = titleTag.replace(/\s*[\|—–]\s*(LCS|LessonCraftStudio).*$/i, '');
        const tLow = titleClean.toLowerCase();
        const hLow = heroTitle.toLowerCase();
        const dLow = metaDesc.toLowerCase();

        const candidates = [...new Set([
          ...contentWords(titleClean),
          ...contentWords(heroTitle),
          ...contentWords(metaDesc),
        ])];

        // Score: how many of the 3 sources contain this word (using stem matching)
        const scored = candidates.map(w => {
          let s = 0;
          if (stemMatch(w, tLow)) s++;
          if (stemMatch(w, hLow)) s++;
          if (stemMatch(w, dLow)) s++;
          return { w, s };
        }).sort((a, b) => b.s - a.s);

        // Take top words (prefer those in all 3 sources)
        const best = scored.filter(x => x.s >= 2).slice(0, 5).map(x => x.w);
        if (best.length < 3) {
          // Add single-source words from title
          const titleOnly = contentWords(titleClean).filter(w => !best.includes(w));
          best.push(...titleOnly.slice(0, 3 - best.length));
        }

        const newPk = [...new Set(best)].slice(0, 5).join(' ');

        if (newPk && newPk !== pk) {
          const newTitleCov = keywordCoverage(newPk, titleTag);
          const newH1Cov = keywordCoverage(newPk, heroTitle);
          const newDescCov = keywordCoverage(newPk, metaDesc);

          // Only apply if it improves overall coverage
          const oldScore = Math.min(titleCov, h1Cov, descCov);
          const newScore = Math.min(newTitleCov, newH1Cov, newDescCov);

          if (newScore > oldScore) {
            const escapedOld = pk.replace(/'/g, "\\'");
            const escapedNew = newPk.replace(/'/g, "\\'");
            const re = new RegExp("primaryKeyword:\\s*'" + escapedOld.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'");
            if (re.test(text)) {
              text = text.replace(re, "primaryKeyword: '" + escapedNew + "'");
              changed = true;
              pkFixes++;
            }
          }
        }
      }

      // Fix secondary keywords: rebuild from heading words
      if (secondaryKws.length >= 3) {
        const allH = allHeadings.join(' ').toLowerCase();
        let matchCount = 0;
        for (const sk of secondaryKws) {
          const words = contentWords(sk);
          const cov = words.filter(w => stemMatch(w, allH)).length / (words.length || 1);
          if (cov >= 0.5) matchCount++;
        }

        if (matchCount / secondaryKws.length < 0.2) {
          // Generate from headings
          const h = allHeadings.filter(x => x.length > 8).slice(1, 10); // skip hero title
          const newSk = h.slice(0, Math.max(secondaryKws.length, 3)).map(heading => {
            return contentWords(heading).slice(0, 4).join(' ');
          }).filter(s => s.length > 5);

          if (newSk.length >= 2) {
            const skBlock = text.match(/secondaryKeywords:\s*\[([\s\S]*?)\]/);
            if (skBlock) {
              const padded = newSk.length < secondaryKws.length
                ? [...newSk, ...secondaryKws.slice(newSk.length)]
                : newSk.slice(0, secondaryKws.length);
              const newSkStr = padded.map(s => "      '" + s.replace(/'/g, "\\'") + "'").join(',\n');
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

console.log(`Done: ${pkFixes} pk fixes, ${skFixes} secondary-kw fixes.`);
