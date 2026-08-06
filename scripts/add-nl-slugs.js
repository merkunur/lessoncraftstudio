const fs = require('fs');

const toolSlugs = {
  'image-addition': 'optellen-werkblad-maker',
  'image-subtraction': 'aftrekken-werkblad-maker',
  'code-addition': 'code-optellen-werkblad-maker',
  'more-less': 'meer-minder-werkblad-maker',
  'math-puzzle': 'rekenpuzzel-maker',
  'math-worksheet': 'reken-werkblad-maker',
  'alphabet-train': 'alfabettrein-maker',
  'prepositions': 'voorzetsels-werkblad-maker',
  'word-guess': 'woordraadsel-maker',
  'word-scramble': 'letterpuzzel-maker',
  'word-search': 'woordzoeker-maker',
  'cryptogram': 'cryptogram-maker',
  'writing': 'schrijfoefeningen-maker',
  'big-small': 'groot-klein-werkblad-maker',
  'pattern-train': 'patroontrein-maker',
  'pattern-worksheet': 'patronen-werkblad-maker',
  'draw-and-color': 'rastertekenen-maker',
  'drawing-lines': 'lijnen-trekken-maker',
  'coloring': 'kleurplaten-maker',
  'chart-count': 'telgrafiek-werkblad-maker',
  'matching': 'koppelen-werkblad-maker',
  'grid-match': 'raster-puzzel-maker',
  'shadow-match': 'schaduw-koppelen-maker',
  'bingo': 'plaatjesbingo-maker',
  'picture-sort': 'plaatjes-sorteren-maker',
  'missing-pieces': 'ontbrekende-stukjes-maker',
  'odd-one-out': 'wat-hoort-er-niet-bij-maker',
  'sudoku': 'kinder-sudoku-maker',
  'picture-path': 'plaatjespad-maker',
  'find-and-count': 'zoek-en-tel-maker',
  'find-objects': 'zoek-en-vind-maker',
  'crossword': 'kruiswoordpuzzel-maker',
  'treasure-hunt': 'schattenjacht-maker',
};

const bundleSlugs = {
  'math-bundle': 'wiskunde-meester-pakket',
  'literacy-bundle': 'lezen-taal-pakket',
  'visual-bundle': 'visueel-leren-pakket',
  'matching-bundle': 'matchen-sorteren-pakket',
  'puzzle-bundle': 'puzzels-logica-pakket',
  'search-bundle': 'zoeken-vinden-pakket',
};

const startSlugs = {
  'complete-guide-printable-business': 'complete-gids-printable-bedrijf',
  'create-worksheets-that-sell': 'werkbladen-maken-die-verkopen',
  'printable-business-blueprint': 'blauwdruk-printable-bedrijf',
  'etsy-printable-business': 'etsy-printable-bedrijf',
  'amazon-kdp-activity-books': 'amazon-kdp-activiteitenboeken',
  'create-multilingual-worksheets': 'meertalige-werkbladen-maken',
  'commercial-license-guide': 'commerciele-licentie-gids',
  'printable-business-income': 'printable-bedrijf-inkomen',
  'tools-for-printable-business': 'tools-voor-printable-bedrijf',
  'marketing-printable-business': 'marketing-printable-bedrijf',
  'scaling-printable-business': 'printable-bedrijf-opschalen',
  'printable-business-legal': 'printable-bedrijf-juridisch',
};

const guideSlugs = {
  'sell-math-worksheets-etsy': 'reken-werkbladen-verkopen-etsy',
  'sell-word-search-etsy': 'woordzoekers-verkopen-etsy',
  'start-etsy-printable-shop': 'etsy-printables-shop-starten',
  'create-etsy-coloring-pages': 'etsy-kleurplaten-maken',
  'sell-educational-printables-etsy': 'educatief-materiaal-verkopen-etsy',
  'price-etsy-printables': 'etsy-printables-prijzen',
  'etsy-seo-educational-printables': 'seo-etsy-educatief-materiaal',
  'create-etsy-worksheet-bundles': 'etsy-werkblad-pakketten-maken',
  'math-activity-books-kdp': 'reken-activiteitenboeken-kdp',
  'publish-puzzle-books-kdp': 'puzzelboeken-uitgeven-kdp',
  'word-search-books-kdp': 'woordzoeker-boeken-kdp',
  'make-money-kdp-activity-books': 'geld-verdienen-kdp-activiteitenboeken',
  'kdp-formatting-worksheets': 'kdp-opmaak-werkbladen',
  'best-kdp-activity-book-niches': 'beste-kdp-activiteitenboek-niches',
  'sudoku-books-kdp': 'sudoku-boeken-kdp',
  'kdp-vs-etsy-printables': 'kdp-of-etsy-printables',
  'create-sell-tpt-resources': 'tpt-materialen-maken-verkopen',
  'tpt-store-optimization': 'tpt-winkel-optimalisatie',
  'sell-printables-gumroad': 'printables-verkopen-gumroad',
  'sell-creative-fabrica': 'verkopen-creative-fabrica',
  'create-addition-worksheets': 'optellen-werkbladen-maken',
  'create-subtraction-worksheets': 'aftrekken-werkbladen-maken',
  'create-word-search-puzzles': 'woordzoekers-maken',
  'create-crossword-puzzles': 'kruiswoordpuzzels-maken',
  'create-math-puzzle-worksheets': 'rekenpuzzel-werkbladen-maken',
  'create-handwriting-sheets': 'schrijfoefeningen-maken',
  'create-coloring-pages': 'kleurplaten-maken',
  'create-bingo-cards': 'bingokaarten-maken',
  'create-matching-worksheets': 'koppel-werkbladen-maken',
  'create-pattern-worksheets': 'patronen-werkbladen-maken',
  'create-picture-sudoku': 'plaatjes-sudoku-maken',
  'create-maze-worksheets': 'doolhof-werkbladen-maken',
  'create-hidden-object-worksheets': 'zoek-voorwerpen-werkbladen-maken',
  'create-size-comparison-worksheets': 'groottevergelijking-werkbladen-maken',
  'create-counting-worksheets': 'tel-werkbladen-maken',
  'create-drawing-worksheets': 'teken-werkbladen-maken',
  'create-sorting-worksheets': 'sorteer-werkbladen-maken',
  'create-shadow-matching-worksheets': 'schaduw-koppelen-werkbladen-maken',
  'create-odd-one-out-puzzles': 'wat-hoort-er-niet-bij-maken',
  'create-missing-pieces-puzzles': 'ontbrekende-stukjes-puzzels-maken',
  'create-treasure-hunt-worksheets': 'schattenjacht-werkbladen-maken',
  'create-alphabet-worksheets': 'alfabet-werkbladen-maken',
  'create-preposition-worksheets': 'voorzetsels-werkbladen-maken',
  'create-cryptogram-puzzles': 'cryptogrammen-maken',
  'create-chart-count-worksheets': 'telgrafiek-werkbladen-maken',
  'create-worksheet-bundles': 'werkblad-pakketten-maken',
  'niche-selection-printables': 'niche-selectie-printables',
  'create-printable-product-line': 'printable-productlijn-maken',
  'pricing-educational-printables': 'prijzen-educatief-materiaal',
  'scale-printable-business-guide': 'gids-printable-bedrijf-opschalen',
  'passive-income-worksheets': 'passief-inkomen-werkbladen',
  'understanding-commercial-licenses': 'commerciele-licenties-begrijpen',
  'research-profitable-niches': 'winstgevende-niches-onderzoeken',
  'multilingual-printable-business': 'meertalig-printable-bedrijf',
  'worksheets-multiple-languages': 'werkbladen-meerdere-talen',
  'copyright-printable-sellers': 'auteursrecht-printable-verkopers',
  'customer-support-digital-products': 'klantenservice-digitale-producten',
  'automate-printable-business': 'printable-bedrijf-automatiseren',
  'social-media-printable-marketing': 'social-media-printable-marketing',
  'pinterest-marketing-worksheets': 'pinterest-marketing-werkbladen',
  'email-marketing-printables': 'email-marketing-printables',
  'get-reviews-printable-products': 'reviews-printable-producten',
  'seasonal-marketing-printables': 'seizoensmarketing-printables',
  'digital-vs-physical-printables': 'digitaal-of-fysiek-printables',
  'quality-standards-worksheets': 'kwaliteitsnormen-werkbladen',
};

const ideaSlugs = {
  'farm-animals-printable-ideas': 'boerderijdieren-printable-ideen',
  'ocean-animals-printable-ideas': 'zeedieren-printable-ideen',
  'safari-animals-printable-ideas': 'safaridieren-printable-ideen',
  'pets-printable-ideas': 'huisdieren-printable-ideen',
  'dinosaur-printable-ideas': 'dinosaurus-printable-ideen',
  'birds-printable-ideas': 'vogels-printable-ideen',
  'insects-printable-ideas': 'insecten-printable-ideen',
  'forest-animals-printable-ideas': 'bosdieren-printable-ideen',
  'christmas-printable-ideas': 'kerst-printable-ideen',
  'halloween-printable-ideas': 'halloween-printable-ideen',
  'easter-printable-ideas': 'pasen-printable-ideen',
  'valentines-day-printable-ideas': 'valentijnsdag-printable-ideen',
  'back-to-school-printable-ideas': 'terug-naar-school-printable-ideen',
  'summer-printable-ideas': 'zomer-printable-ideen',
  'winter-printable-ideas': 'winter-printable-ideen',
  'spring-printable-ideas': 'lente-printable-ideen',
  'thanksgiving-printable-ideas': 'thanksgiving-printable-ideen',
  'parents-day-printable-ideas': 'ouderdag-printable-ideen',
  'space-printable-ideas': 'ruimte-printable-ideen',
  'transportation-printable-ideas': 'voertuigen-printable-ideen',
  'food-cooking-printable-ideas': 'eten-koken-printable-ideen',
  'sports-printable-ideas': 'sport-printable-ideen',
  'music-printable-ideas': 'muziek-printable-ideen',
  'construction-printable-ideas': 'bouwplaats-printable-ideen',
  'pirates-printable-ideas': 'piraten-printable-ideen',
  'fairy-tale-printable-ideas': 'sprookjes-printable-ideen',
  'camping-printable-ideas': 'kamperen-printable-ideen',
  'underwater-printable-ideas': 'onderwaterwereld-printable-ideen',
  'preschool-printable-ideas': 'peuterspeelzaal-printable-ideen',
  'kindergarten-printable-ideas': 'kleuterschool-printable-ideen',
  'first-grade-printable-ideas': 'groep-3-printable-ideen',
  'second-grade-printable-ideas': 'groep-4-printable-ideen',
  'third-grade-printable-ideas': 'groep-5-printable-ideen',
  'homeschool-printable-ideas': 'thuisonderwijs-printable-ideen',
  'special-education-printable-ideas': 'speciaal-onderwijs-printable-ideen',
  'esl-printable-ideas': 'nt2-printable-ideen',
  'summer-learning-printable-ideas': 'zomerleren-printable-ideen',
  'math-facts-printable-ideas': 'rekenfeiten-printable-ideen',
  'subscription-box-printable-ideas': 'abonnementbox-printable-ideen',
  'print-on-demand-printable-ideas': 'print-on-demand-printable-ideen',
  'digital-download-printable-ideas': 'digitale-download-printable-ideen',
  'physical-printable-product-ideas': 'fysieke-printable-product-ideen',
  'party-supply-printable-ideas': 'feestartikelen-printable-ideen',
  'custom-worksheet-service-ideas': 'werkblad-service-op-maat-ideen',
  'bulk-licensing-printable-ideas': 'bulklicenties-printable-ideen',
};

function addNlSlugs(filePath, slugMap, idField) {
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  for (const [id, nlSlug] of Object.entries(slugMap)) {
    // Escape special regex chars in id
    const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Match: idField: 'id' ... it: 'value' } within the slugs object
    const regex = new RegExp(
      `(${idField}: '${escapedId}'[^}]*?it: '[^']+')(\\s*})`,
      's'
    );

    if (regex.test(content)) {
      content = content.replace(regex, `$1, nl: '${nlSlug}'$2`);
      count++;
    } else {
      console.error('MISS: ' + id);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(filePath.split(/[/\\]/).pop() + ': ' + count + '/' + Object.keys(slugMap).length);
}

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/config';

addNlSlugs(base + '/tool-page-slugs.ts', toolSlugs, 'toolId');
addNlSlugs(base + '/bundle-page-slugs.ts', bundleSlugs, 'bundleId');
addNlSlugs(base + '/start-page-slugs.ts', startSlugs, 'startId');
addNlSlugs(base + '/guide-page-slugs.ts', guideSlugs, 'guideId');
addNlSlugs(base + '/idea-page-slugs.ts', ideaSlugs, 'ideaId');

// Verification
const allSlugs = [
  ...Object.values(toolSlugs),
  ...Object.values(bundleSlugs),
  ...Object.values(startSlugs),
  ...Object.values(guideSlugs),
  ...Object.values(ideaSlugs),
];
console.log('Total slugs: ' + allSlugs.length);

const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const badSlugs = allSlugs.filter(s => !slugRegex.test(s));
if (badSlugs.length) console.error('BAD SLUGS:', badSlugs);
else console.log('All slugs pass regex');

const longSlugs = allSlugs.filter(s => s.length > 60);
if (longSlugs.length) console.error('TOO LONG:', longSlugs);
else console.log('All slugs under 60 chars');

const dupes = allSlugs.filter((s, i) => allSlugs.indexOf(s) !== i);
if (dupes.length) console.error('DUPLICATES:', dupes);
else console.log('No duplicate slugs');

// Check for unicode escapes
const files = ['tool-page-slugs.ts', 'bundle-page-slugs.ts', 'start-page-slugs.ts', 'guide-page-slugs.ts', 'idea-page-slugs.ts'];
let hasEscapes = false;
for (const f of files) {
  const c = fs.readFileSync(base + '/' + f, 'utf8');
  const matches = c.match(/\\u[0-9a-fA-F]{4}/g);
  if (matches) {
    console.error('UNICODE ESCAPES in ' + f + ': ' + matches.length);
    hasEscapes = true;
  }
}
if (!hasEscapes) console.log('No unicode escapes found');
