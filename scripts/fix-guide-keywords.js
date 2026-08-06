/**
 * Fix primaryKeyword to be a substring of titleTag for all guide-content/en/ files.
 */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'en');

// For each file, find the longest meaningful phrase from titleTag that works as primaryKeyword
const fixes = {
  'best-kdp-activity-book-niches.ts': 'best KDP activity book niches',
  'create-alphabet-worksheets.ts': 'create alphabet worksheets to sell',
  'create-coloring-pages.ts': 'create coloring pages to sell on Etsy',
  'create-counting-worksheets.ts': 'create counting worksheets to sell',
  'create-etsy-coloring-pages.ts': 'create Etsy coloring pages that sell',
  'create-handwriting-sheets.ts': 'create handwriting sheets to sell',
  'create-matching-worksheets.ts': 'create matching worksheets to sell',
  'create-math-puzzle-worksheets.ts': 'create math puzzle worksheets to sell',
  'create-pattern-worksheets.ts': 'create pattern worksheets to sell',
  'create-preposition-worksheets.ts': 'create preposition worksheets for ESL',
  'create-sell-tpt-resources.ts': 'create & sell TPT resources',
  'create-sorting-worksheets.ts': 'category sorting worksheets to sell',
  'create-subtraction-worksheets.ts': 'create subtraction worksheets to sell',
  'create-word-search-puzzles.ts': 'create word search puzzles with images',
  'create-worksheet-bundles.ts': 'create worksheet bundles that sell',
  'customer-support-digital-products.ts': 'customer support for digital products',
  'digital-vs-physical-printables.ts': 'digital vs physical printable products',
  'email-marketing-printables.ts': 'email marketing for printable sellers',
  'etsy-seo-educational-printables.ts': 'Etsy SEO for printable worksheets',
  'kdp-vs-etsy-printables.ts': 'Amazon KDP vs Etsy',
  'make-money-kdp-activity-books.ts': 'make money with KDP activity books',
  'niche-selection-printables.ts': 'niche selection for printable business',
  'passive-income-worksheets.ts': 'passive income with worksheets',
  'pinterest-marketing-worksheets.ts': 'Pinterest marketing for worksheet business',
  'pricing-educational-printables.ts': 'pricing strategies for printables',
  'research-profitable-niches.ts': 'research profitable printable niches',
  'seasonal-marketing-printables.ts': 'seasonal marketing for printable sellers',
  'sell-educational-printables-etsy.ts': 'sell educational printables on Etsy',
  'sell-math-worksheets-etsy.ts': 'sell math worksheets on Etsy',
  'sell-word-search-etsy.ts': 'sell word search puzzles on Etsy',
  'start-etsy-printable-shop.ts': 'start an Etsy printable shop',
  'tpt-store-optimization.ts': 'TPT store setup & optimization',
  'understanding-commercial-licenses.ts': 'commercial license for printable sellers',
  'worksheets-multiple-languages.ts': 'create worksheets in multiple languages',
};

let changed = 0;
let errors = 0;

for (const [filename, newPK] of Object.entries(fixes)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) { console.error('MISSING:', filename); errors++; continue; }

  let content = fs.readFileSync(filePath, 'utf8');
  const pkMatch = content.match(/primaryKeyword:\s*'([^']+)'/);
  if (!pkMatch) { console.error('NO PK:', filename); errors++; continue; }
  const oldPK = pkMatch[1];

  if (oldPK === newPK) { continue; }

  // Verify new PK is in title
  const ttMatch = content.match(/titleTag:\s*'([^']+)'/);
  if (ttMatch && !ttMatch[1].toLowerCase().includes(newPK.toLowerCase())) {
    console.error('NOT IN TITLE:', filename, `"${newPK}" not in "${ttMatch[1]}"`);
    errors++;
    continue;
  }

  content = content.replace(`primaryKeyword: '${oldPK}'`, `primaryKeyword: '${newPK}'`);

  // Add old keyword to secondaryKeywords if not already there
  if (!content.includes(`'${oldPK}'`)) {
    content = content.replace(
      /secondaryKeywords:\s*\[\s*\n\s*'/,
      `secondaryKeywords: [\n      '${oldPK}',\n      '`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('FIXED:', filename);
  changed++;
}

console.log(`\nDone: ${changed} fixed, ${errors} errors`);
