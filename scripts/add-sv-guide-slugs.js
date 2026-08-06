#!/usr/bin/env node
const fs = require('fs');

const svSlugs = {
  // Platform Guides (20)
  'sell-math-worksheets-etsy': 'saelja-mattearbetsblad-etsy',
  'sell-word-search-etsy': 'saelja-ordsoek-etsy',
  'start-etsy-printable-shop': 'starta-etsy-printables-butik',
  'create-etsy-coloring-pages': 'skapa-maelarsidor-etsy',
  'sell-educational-printables-etsy': 'saelja-pedagogiskt-material-etsy',
  'price-etsy-printables': 'etsy-printables-prissaettning',
  'etsy-seo-educational-printables': 'seo-etsy-pedagogiskt-material',
  'create-etsy-worksheet-bundles': 'skapa-etsy-arbetsblad-paket',
  'math-activity-books-kdp': 'matte-aktivitetsboecker-kdp',
  'publish-puzzle-books-kdp': 'publicera-pusselboecker-kdp',
  'word-search-books-kdp': 'ordsoeksboecker-kdp',
  'make-money-kdp-activity-books': 'tjaena-pengar-kdp-aktivitetsboecker',
  'kdp-formatting-worksheets': 'kdp-formatering-arbetsblad',
  'best-kdp-activity-book-niches': 'baesta-kdp-aktivitetsbok-nischer',
  'sudoku-books-kdp': 'sudoku-boecker-kdp',
  'kdp-vs-etsy-printables': 'kdp-eller-etsy-printables',
  'create-sell-tpt-resources': 'skapa-saelja-tpt-resurser',
  'tpt-store-optimization': 'tpt-butik-optimering',
  'sell-printables-gumroad': 'saelja-printables-gumroad',
  'sell-creative-fabrica': 'saelja-creative-fabrica',

  // Product Creation Guides (25)
  'create-addition-worksheets': 'skapa-additions-arbetsblad',
  'create-subtraction-worksheets': 'skapa-subtraktions-arbetsblad',
  'create-word-search-puzzles': 'skapa-ordsoek-pussel',
  'create-crossword-puzzles': 'skapa-korsordspussel',
  'create-math-puzzle-worksheets': 'skapa-mattepussel-arbetsblad',
  'create-handwriting-sheets': 'skapa-skrivoevningar',
  'create-coloring-pages': 'skapa-maelarsidor',
  'create-bingo-cards': 'skapa-bingokort',
  'create-matching-worksheets': 'skapa-matchnings-arbetsblad',
  'create-pattern-worksheets': 'skapa-moenster-arbetsblad',
  'create-picture-sudoku': 'skapa-bildsudoku',
  'create-maze-worksheets': 'skapa-labyrint-arbetsblad',
  'create-hidden-object-worksheets': 'skapa-dolda-objekt-arbetsblad',
  'create-size-comparison-worksheets': 'skapa-storleksjaemfoerelse-arbetsblad',
  'create-counting-worksheets': 'skapa-raekne-arbetsblad',
  'create-drawing-worksheets': 'skapa-ritnings-arbetsblad',
  'create-sorting-worksheets': 'skapa-sorteringsarbetsblad',
  'create-shadow-matching-worksheets': 'skapa-skuggmatchnings-arbetsblad',
  'create-odd-one-out-puzzles': 'skapa-hitta-udda-bilden-pussel',
  'create-missing-pieces-puzzles': 'skapa-saknade-bitar-pussel',
  'create-treasure-hunt-worksheets': 'skapa-skattjakt-arbetsblad',
  'create-alphabet-worksheets': 'skapa-alfabet-arbetsblad',
  'create-preposition-worksheets': 'skapa-prepositioner-arbetsblad',
  'create-cryptogram-puzzles': 'skapa-kryptogram',
  'create-chart-count-worksheets': 'skapa-diagram-raekne-arbetsblad',

  // Business Strategy Guides (20)
  'create-worksheet-bundles': 'skapa-arbetsblad-paket',
  'niche-selection-printables': 'nischval-printables',
  'create-printable-product-line': 'skapa-utskriftsbar-produktlinje',
  'pricing-educational-printables': 'prissaettning-pedagogiskt-material',
  'scale-printable-business-guide': 'guide-skala-upp-printable-foeretag',
  'passive-income-worksheets': 'passiv-inkomst-arbetsblad',
  'understanding-commercial-licenses': 'foerstaa-kommersiella-licenser',
  'research-profitable-niches': 'undersoek-loenesamma-nischer',
  'multilingual-printable-business': 'flersprakigt-printable-foeretag',
  'worksheets-multiple-languages': 'arbetsblad-flera-spraak',
  'copyright-printable-sellers': 'upphovsraett-printable-saeljare',
  'customer-support-digital-products': 'kundsupport-digitala-produkter',
  'automate-printable-business': 'automatisera-printable-foeretag',
  'social-media-printable-marketing': 'sociala-medier-printable-marknadsforing',
  'pinterest-marketing-worksheets': 'pinterest-marknadsforing-arbetsblad',
  'email-marketing-printables': 'e-postmarknadsforing-printables',
  'get-reviews-printable-products': 'faa-recensioner-printable-produkter',
  'seasonal-marketing-printables': 'saesongmarknadsforing-printables',
  'digital-vs-physical-printables': 'digitalt-eller-fysiskt-printables',
  'quality-standards-worksheets': 'kvalitetsstandarder-arbetsblad',
};

console.log('Total Swedish guide slugs:', Object.keys(svSlugs).length);

let content = fs.readFileSync('frontend/config/guide-page-slugs.ts', 'utf-8');

let replaced = 0;
let notFound = [];
for (const [guideId, svSlug] of Object.entries(svSlugs)) {
  // Find the line with this guideId and add sv: 'slug' before the closing } }
  // The format is: nl: 'xxx' } },
  // We need to add: , sv: 'yyy' before the first }
  const searchStr = "guideId: '" + guideId + "'";
  const idx = content.indexOf(searchStr);
  if (idx === -1) {
    notFound.push(guideId);
    continue;
  }

  // Find the nl: 'xxx' part after this guideId
  const afterGuideId = content.substring(idx);
  const nlMatch = afterGuideId.match(/nl: '[^']+'/);
  if (!nlMatch) {
    notFound.push(guideId + ' (no nl slug)');
    continue;
  }

  const nlEnd = idx + nlMatch.index + nlMatch[0].length;
  // Insert sv slug after nl slug
  content = content.substring(0, nlEnd) + ", sv: '" + svSlug + "'" + content.substring(nlEnd);
  replaced++;
}

console.log('Replaced:', replaced + '/65');
if (notFound.length > 0) {
  console.log('NOT FOUND:', notFound);
}

// Verify uniqueness
const svMatches = content.match(/sv: '[^']+'/g) || [];
const slugValues = svMatches.map(m => m.match(/sv: '([^']+)'/)[1]);
const unique = new Set(slugValues);
if (unique.size !== slugValues.length) {
  console.log('WARNING: Duplicate Swedish slugs found!');
  const seen = {};
  for (const s of slugValues) { seen[s] = (seen[s] || 0) + 1; }
  for (const [s, c] of Object.entries(seen)) {
    if (c > 1) console.log('  ' + s + ' appears ' + c + ' times');
  }
} else {
  console.log('All ' + slugValues.length + ' Swedish slugs are unique');
}

fs.writeFileSync('frontend/config/guide-page-slugs.ts', content, 'utf-8');
console.log('File written successfully');
