/**
 * fix-blog-seo-lengths.js
 *
 * Fixes overlong title tags (>60 chars) and meta descriptions (>155 chars)
 * in blog content files at frontend/config/blog-content/[locale]/[blogId].ts
 *
 * Reads audit report, applies hand-crafted shortened replacements.
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'frontend', 'config', 'blog-content');

// ── Title tag fixes (must be ≤60 chars) ──────────────────────────
const titleFixes = {
  'de/valentines-day-printables-sell': {
    old: 'Valentinstag-Druckvorlagen: Was sich im Februar verkauft | LCS',
    new: 'Valentinstag-Druckvorlagen: Februar-Verkaeufe | LCS',
  },
  'de/special-education-printables-sell': {
    old: 'Foerdermaterial-Druckvorlagen: Hohe Nachfrage, wenig Konkurrenz | LCS',
    new: 'Foerdermaterial-Druckvorlagen: Hohe Nachfrage | LCS',
  },
  'de/math-fact-fluency-printables-sell': {
    old: 'Kopfrechnen-Druckvorlagen: An Lehrer UND Eltern verkaufen | LCS',
    new: 'Kopfrechnen-Druckvorlagen: Lehrer & Eltern | LCS',
  },
  'de/spring-printables-sell-march-april': {
    old: 'Fruehlings-Druckvorlagen: Was sich im Maerz/April verkauft | LCS',
    new: 'Fruehlings-Druckvorlagen: Maerz/April-Hits | LCS',
  },
  'de/winter-printables-sell-december-january': {
    old: 'Winter-Druckvorlagen: Beste Produkte fuer die kalte Jahreszeit | LCS',
    new: 'Winter-Druckvorlagen: Beste Saisonprodukte | LCS',
  },
  'de/farm-animal-printables-sell': {
    old: 'Bauernhof-Druckvorlagen: Pflicht fuer Kleinkind & Vorschule | LCS',
    new: 'Bauernhof-Druckvorlagen: Kleinkind-Nische | LCS',
  },
  'de/format-worksheets-etsy-listing': {
    old: 'Arbeitsblaetter fuer das perfekte Etsy-Listing formatieren | LCS',
    new: 'Arbeitsblaetter fuer Etsy-Listings formatieren | LCS',
  },
  'de/answer-key-importance-printable-sales': {
    old: 'Warum Loesungsblaetter Ihre Druckvorlagen-Verkaeufe verdoppeln | LCS',
    new: 'Loesungsblaetter: Verkaeufe verdoppeln | LCS',
  },
  'de/free-printable-samples-lead-magnet': {
    old: 'Gratisproben als Lead-Magnete fuer Ihren Druckvorlagen-Shop | LCS',
    new: 'Gratisproben als Lead-Magnete: So geht\'s | LCS',
  },
  'de/11-languages-sell-globally': {
    old: 'Arbeitsblaetter in 11 Sprachen erstellen und global verkaufen | LCS',
    new: 'Arbeitsblaetter in 11 Sprachen verkaufen | LCS',
  },
  'de/etsy-keyword-research-printables': {
    old: 'Etsy-Keyword-Recherche fuer Druckvorlagen: Anfaenger-Guide | LCS',
    new: 'Etsy-Keyword-Recherche: Anfaenger-Guide | LCS',
  },
  'de/printable-product-photography-mockups': {
    old: 'Produktfotos fuer Druckvorlagen: Mockup-Tipps fuer Etsy | LCS',
    new: 'Druckvorlagen-Mockups: Tipps fuer Etsy | LCS',
  },
  'de/update-old-printable-listings-boost-sales': {
    old: 'Alte Listings auffrischen: Mehr Verkaeufe in 24 Stunden | LCS',
    new: 'Alte Listings auffrischen: Mehr Verkaeufe | LCS',
  },
  'nl/create-activity-book-kdp-start-finish': {
    old: 'Een Activiteitenboek voor KDP Maken: Van Start tot Finish | LCS',
    new: 'Activiteitenboek voor KDP: Start tot Finish | LCS',
  },
  'nl/use-themed-images-sell-worksheets': {
    old: 'Thematische Afbeeldingen Gebruiken om Werkbladen te Verkopen | LCS',
    new: 'Thematische Afbeeldingen voor Werkbladen | LCS',
  },
  'da/create-activity-book-kdp-start-finish': {
    old: 'Opret en Aktivitetsbog til KDP: Fra Start til Udgivelse | LCS',
    new: 'Aktivitetsbog til KDP: Start til Slut | LCS',
  },
};

// ── Meta description fixes (must be ≤155 chars) ──────────────────
const metaFixes = {
  // English (17 files)
  'en/code-addition-puzzles-sell-etsy': {
    old: 'Code addition puzzles are a hidden bestseller niche on Etsy. Learn how to create and sell these unique math printables that stand out from generic worksheets.',
    new: 'Code addition puzzles are a hidden bestseller niche on Etsy. Learn to create and sell these unique math printables that outsell generic worksheets.',
  },
  'en/size-comparison-worksheets-sell': {
    old: 'Big and small worksheets are toddler printables that sell year-round. Learn how to create and price size comparison activities for the early learning market.',
    new: 'Big and small worksheets are toddler printables that sell year-round. Learn to create and price size comparison activities for early learners.',
  },
  'en/best-printables-sell-christmas': {
    old: 'Discover the best-selling Christmas printables for 2026. From coloring pages to math puzzles, learn what sells, when to list, and how to price holiday products.',
    new: 'Discover the best-selling Christmas printables for 2026. From coloring pages to math puzzles, learn what sells and how to price holiday products.',
  },
  'en/easter-printables-business-spring': {
    old: 'Easter printables convert well in March-April. Learn which spring products sell, how to price Easter bundles, and the timeline for maximizing seasonal revenue.',
    new: 'Easter printables convert well in March-April. Learn which spring products sell, how to price bundles, and how to maximize seasonal revenue.',
  },
  'en/summer-activity-printables-sell': {
    old: 'Summer activity printables sell from May through August. Learn which products parents buy for road trips, summer learning, and keeping kids busy during break.',
    new: 'Summer activity printables sell from May through August. Learn which products parents buy for road trips, learning, and keeping kids busy.',
  },
  'en/kindergarten-worksheets-market': {
    old: 'The kindergarten worksheet market is worth millions on Etsy alone. Discover market size, top products, pricing, and how to compete in this high-demand niche.',
    new: 'The kindergarten worksheet market is worth millions on Etsy. Discover market size, top products, pricing, and how to compete in this niche.',
  },
  'en/homeschool-printables-growing-market': {
    old: 'The homeschool market is growing 8-10% annually. Learn how to sell printables to homeschool families, what they buy, and how to price for this premium audience.',
    new: 'The homeschool market grows 8-10% annually. Learn how to sell printables to homeschool families, what they buy, and pricing strategies.',
  },
  'en/special-education-printables-sell': {
    old: 'Special education printables are high demand, low competition. Learn what SPED teachers and parents buy, pricing strategies, and how to create adaptive worksheets.',
    new: 'Special education printables are high demand, low competition. Learn what SPED teachers and parents buy and how to create adaptive worksheets.',
  },
  'en/toddler-activity-printables-sell': {
    old: 'Toddler activity printables are trending on Etsy in 2026. Discover which products sell, pricing strategies, and how to create toddler-appropriate worksheets.',
    new: 'Toddler activity printables are trending on Etsy in 2026. Discover which products sell, pricing tips, and how to create toddler worksheets.',
  },
  'en/math-fact-fluency-printables-sell': {
    old: 'Math fact fluency printables sell to teachers AND parents. Learn how to create timed tests, practice sheets, and math games that generate recurring revenue.',
    new: 'Math fact fluency printables sell to teachers AND parents. Learn to create timed tests, practice sheets, and math games that generate revenue.',
  },
  'en/fine-motor-activities-printables': {
    old: 'Fine motor printables sell to parents, teachers, AND occupational therapists. Learn how to create and price activities for this underserved three-market niche.',
    new: 'Fine motor printables sell to parents, teachers, AND occupational therapists. Learn to create and price activities for this three-market niche.',
  },
  'en/brain-break-printables-teachers': {
    old: 'Brain break printables are a fast-growing teacher market. Learn which classroom break activities sell, pricing tips, and how to target this underserved niche.',
    new: 'Brain break printables are a fast-growing teacher market. Learn which break activities sell, pricing tips, and how to target this niche.',
  },
  'en/thanksgiving-printables-sell-november': {
    old: 'Thanksgiving printables drive strong November sales. Learn which products sell, the listing timeline, and how to bridge Thanksgiving into Christmas revenue.',
    new: 'Thanksgiving printables drive strong November sales. Learn which products sell, listing timelines, and how to bridge into Christmas revenue.',
  },
  'en/new-year-printables-january': {
    old: 'New Year printables sell in January when parents and teachers want fresh-start activities. Learn which products convert and how to maximize this short window.',
    new: 'New Year printables sell in January when parents and teachers want fresh-start activities. Learn which products convert in this short window.',
  },
  'en/spring-printables-sell-march-april': {
    old: 'Spring printables sell strongly in March-April. Learn which flower, butterfly, and garden themes convert, plus how to extend spring into a 10-week revenue stream.',
    new: 'Spring printables sell strongly in March-April. Learn which flower, butterfly, and garden themes convert and how to extend into 10 weeks of revenue.',
  },
  'en/dinosaur-printables-sell-evergreen': {
    old: 'Dinosaur printables are an evergreen best seller for kids. Learn why dinos outsell most themes, which products convert, and how to build a dinosaur product empire.',
    new: 'Dinosaur printables are an evergreen best seller for kids. Learn why dinos outsell most themes, which products convert, and how to build your lineup.',
  },
  'en/ocean-themed-printables-sell': {
    old: 'Ocean-themed printables surge in summer and sell year-round. Learn which sea animal products convert, pricing tips, and how to build an ocean product empire.',
    new: 'Ocean-themed printables surge in summer and sell year-round. Learn which sea animal products convert, pricing tips, and how to build your lineup.',
  },

  // German (6 files with overlong meta — some overlap with title fixes)
  'de/spring-printables-sell-march-april': {
    old: 'Fruehlings-Druckvorlagen: Was sich im Maerz/April verkauft: Marktanalyse, Produkte und Strategien fuer Druckvorlagen-Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und Amazon KDP.',
    new: 'Fruehlings-Druckvorlagen: Marktanalyse, Produkte und Strategien fuer Druckvorlagen-Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und KDP.',
  },
  'de/winter-printables-sell-december-january': {
    old: 'Winter-Druckvorlagen: Beste Produkte fuer die kalte Jahreszeit: Marktanalyse, Produkte und Strategien fuer Druckvorlagen-Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und Amazon KDP.',
    new: 'Winter-Druckvorlagen: Marktanalyse, Produkte und Strategien fuer Druckvorlagen-Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und KDP.',
  },
  'de/dinosaur-printables-sell-evergreen': {
    old: 'Dinosaurier-Druckvorlagen: Immergruener Bestseller: Marktanalyse, Produkte und Strategien fuer Druckvorlagen-Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und Amazon KDP.',
    new: 'Dinosaurier-Druckvorlagen: Marktanalyse, Produkte und Strategien fuer Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und Amazon KDP.',
  },
  'de/farm-animal-printables-sell': {
    old: 'Bauernhof-Druckvorlagen: Pflicht fuer Kleinkind & Vorschule: Marktanalyse, Produkte und Strategien fuer Druckvorlagen-Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und Amazon KDP.',
    new: 'Bauernhof-Druckvorlagen: Marktanalyse, Produkte und Strategien fuer Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und Amazon KDP.',
  },
  'de/ocean-themed-printables-sell': {
    old: 'Ozean-Druckvorlagen: Die Sommer-Verkaufswelle nutzen: Marktanalyse, Produkte und Strategien fuer Druckvorlagen-Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und Amazon KDP.',
    new: 'Ozean-Druckvorlagen: Marktanalyse, Produkte und Strategien fuer Verkaeufer im DACH-Raum. Die Sommer-Verkaufswelle profitabel nutzen.',
  },
  'de/food-themed-worksheets-sell': {
    old: 'Essen-Arbeitsblaetter: Ernaehrungsbildung als Nische: Marktanalyse, Produkte und Strategien fuer Druckvorlagen-Verkaeufer im DACH-Raum. Profitabel auf Etsy.de und Amazon KDP.',
    new: 'Essen-Arbeitsblaetter: Ernaehrungsbildung als Nische. Marktanalyse, Produkte und Strategien fuer Verkaeufer im DACH-Raum auf Etsy.de.',
  },

  // Spanish (16 files)
  'es/sell-addition-worksheets-etsy-guide': {
    old: 'Aprenda a vender fichas de suma en Etsy de forma rentable. Estrategias de precios, paquetes y listados que funcionan en 2026. Prueba gratuita con marca de agua.',
    new: 'Aprenda a vender fichas de suma en Etsy de forma rentable. Estrategias de precios, paquetes y listados que funcionan en 2026. Prueba gratuita.',
  },
  'es/code-addition-puzzles-sell-etsy': {
    old: 'Los puzzles de c\u00F3digo suma son un nicho de baja competencia en Etsy con alta demanda. Aprenda a crear y vender este producto \u00FAnico. Prueba gratuita con marca de agua.',
    new: 'Los puzzles de código suma son un nicho de baja competencia en Etsy con alta demanda. Aprenda a crear y vender este producto único.',
  },
  'es/math-worksheet-bundles-that-sell': {
    old: 'Descubra qu\u00E9 paquetes de fichas matem\u00E1ticas generan m\u00E1s ventas en Etsy y KDP. Estrategias de empaquetado y precios probadas. Prueba gratuita con marca de agua.',
    new: 'Descubra qué paquetes de fichas matemáticas generan más ventas en Etsy y KDP. Estrategias de empaquetado y precios probadas.',
  },
  'es/math-puzzle-books-amazon-kdp': {
    old: 'Publique libros de puzzles matem\u00E1ticos en Amazon KDP con m\u00E1rgenes altos. Gu\u00EDa paso a paso para crear, publicar y posicionar. Prueba gratuita con marca de agua.',
    new: 'Publique libros de puzzles matemáticos en Amazon KDP con márgenes altos. Guía paso a paso para crear, publicar y posicionar.',
  },
  'es/chart-count-worksheets-business': {
    old: 'Las fichas de gr\u00E1ficos y conteo son una categor\u00EDa sin explotar en Etsy. Aprenda a posicionarse primero en este nicho rentable. Prueba gratuita con marca de agua.',
    new: 'Las fichas de gráficos y conteo son una categoría sin explotar en Etsy. Aprenda a posicionarse primero en este nicho rentable.',
  },
  'es/crossword-books-kdp-niche': {
    old: 'Los libros de crucigramas para ni\u00F1os en KDP son un nicho de baja competencia con altos m\u00E1rgenes. Gu\u00EDa completa para publicar. Prueba gratuita con marca de agua.',
    new: 'Los libros de crucigramas para niños en KDP son un nicho de baja competencia con altos márgenes. Guía completa para publicar.',
  },
  'es/cryptogram-worksheets-sell': {
    old: 'Los criptogramas son un nicho premium con poca competencia en Etsy. Aprenda a crear y vender este producto de alto valor. Prueba gratuita con marca de agua.',
    new: 'Los criptogramas son un nicho premium con poca competencia en Etsy. Aprenda a crear y vender este producto de alto valor.',
  },
  'es/word-scramble-printables-business': {
    old: 'Descubra 7 ideas de productos con anagramas imprimibles para vender en Etsy, KDP y Hotmart. Nicho vers\u00E1til con m\u00FAltiples p\u00FAblicos. Prueba gratuita con marca de agua.',
    new: 'Descubra 7 ideas de productos con anagramas imprimibles para vender en Etsy, KDP y Hotmart. Nicho versátil con múltiples públicos.',
  },
  'es/shadow-matching-worksheets-sell': {
    old: 'Las fichas de asociaci\u00F3n de sombras se venden mejor que las fichas gen\u00E9ricas de asociaci\u00F3n. Descubra por qu\u00E9 y c\u00F3mo crear las suyas. Prueba gratuita con marca de agua.',
    new: 'Las fichas de asociación de sombras se venden mejor que las genéricas. Descubra por qué y cómo crear las suyas para Etsy.',
  },
  'es/preposition-worksheets-esl-market': {
    old: 'Las fichas de preposiciones tienen un mercado masivo en ELE con 20M+ estudiantes. Cree productos para este p\u00FAblico premium. Prueba gratuita con marca de agua.',
    new: 'Las fichas de preposiciones tienen un mercado masivo en ELE con 20M+ estudiantes. Cree productos para este público premium.',
  },
  'es/coloring-pages-business-2026': {
    old: 'Descubra si el negocio de p\u00E1ginas para colorear sigue siendo rentable en 2026. Nichos que funcionan y estrategias actualizadas. Prueba gratuita con marca de agua.',
    new: 'Descubra si el negocio de páginas para colorear sigue siendo rentable en 2026. Nichos que funcionan y estrategias actualizadas.',
  },
  'es/alphabet-worksheets-best-sellers': {
    old: 'Descubra qu\u00E9 diferencia a las fichas del alfabeto m\u00E1s vendidas de las que no venden. Estrategias probadas para Etsy y KDP. Prueba gratuita con marca de agua.',
    new: 'Descubra qué diferencia a las fichas del alfabeto más vendidas de las que no venden. Estrategias probadas para Etsy y KDP.',
  },
  'es/pattern-worksheets-sell-online': {
    old: 'Las fichas de patrones son el nicho STEM del que nadie habla. Competencia baja, demanda creciente. Estrategias para vender. Prueba gratuita con marca de agua.',
    new: 'Las fichas de patrones son el nicho STEM del que nadie habla. Competencia baja, demanda creciente. Estrategias para vender.',
  },
  'es/size-comparison-worksheets-sell': {
    old: 'Las fichas de comparaci\u00F3n de tama\u00F1os son esenciales en preescolar con competencia baja. Cree productos para este mercado estable. Prueba gratuita con marca de agua.',
    new: 'Las fichas de comparación de tamaños son esenciales en preescolar con competencia baja. Cree productos para este mercado estable.',
  },
  'es/odd-one-out-worksheets-sell': {
    old: 'Las fichas del intruso ense\u00F1an pensamiento cr\u00EDtico, una habilidad premium que los padres buscan activamente. Nicho con altos m\u00E1rgenes. Prueba gratuita con marca de agua.',
    new: 'Las fichas del intruso enseñan pensamiento crítico, una habilidad premium que padres buscan activamente. Nicho con altos márgenes.',
  },
  'es/email-list-printable-business': {
    old: 'Como construir y usar una lista de email para vender mas imprimibles. Lead magnets, automatizacion y estrategias que convierten suscriptores en compradores.',
    new: 'Como construir una lista de email para vender mas imprimibles. Lead magnets, automatizacion y estrategias que convierten suscriptores.',
  },

  // Dutch (1 file)
  'nl/use-themed-images-sell-worksheets': {
    old: 'Thematische Afbeeldingen Gebruiken om Werkbladen te Verkopen. Ontdek welke producten het beste verkopen, wanneer u moet beginnen en hoe u maximale omzet genereert.',
    new: 'Thematische afbeeldingen voor werkbladen. Ontdek welke producten het beste verkopen, wanneer u moet beginnen en hoe u maximale omzet genereert.',
  },

  // Danish (1 file)
  'da/sell-addition-worksheets-etsy-guide': {
    old: 'L\u00E6r at s\u00E6lge additions-arbejdsark p\u00E5 Etsy med fortjeneste. Priss\u00E6tning, bundling og listingstrategier der virker i 2026. Pr\u00F8v generatoren gratis med vandm\u00E6rke.',
    new: 'Lær at sælge additions-arbejdsark på Etsy med fortjeneste. Prissætning, bundling og listingstrategier der virker i 2026.',
  },

  // Norwegian (1 file)
  'no/size-comparison-worksheets-sell': {
    old: 'St\u00F8rrelsessammenligning-arbeidsark: Selg p\u00E5 nett. Komplett guide til produktoppbygging, prissetting og markedsf\u00F8ring for st\u00F8rrelsessammenligning arbeidsark selge i 2026.',
    new: 'Størrelsessammenligning-arbeidsark: Komplett guide til produktoppbygging, prissetting og markedsføring. Selg arbeidsark på nett i 2026.',
  },
};

// ── Main logic ───────────────────────────────────────────────────

let titleFixCount = 0;
let metaFixCount = 0;
let errors = [];

function applyFix(localeSlug, field, oldVal, newVal) {
  const [locale, blogId] = localeSlug.split('/');
  const filePath = path.join(BLOG_DIR, locale, blogId + '.ts');

  if (!fs.existsSync(filePath)) {
    errors.push(`FILE NOT FOUND: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if the old value exists in the file (try exact match first)
  if (!content.includes(oldVal)) {
    // Maybe the file uses real characters but our old string has escapes — normalize
    // Try matching by field name + extracting current value
    const fieldRegex = new RegExp(field + `\\s*:\\s*['"](.+?)['"]`);
    const match = content.match(fieldRegex);
    if (match) {
      const currentVal = match[1];
      // Check if the current value is too long
      if ((field === 'titleTag' && currentVal.length > 60) ||
          (field === 'metaDescription' && currentVal.length > 155)) {
        // Replace using the actual value found in the file
        content = content.replace(currentVal, newVal);
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
      } else {
        console.log(`  SKIP (already OK): ${localeSlug} ${field} = ${currentVal.length} chars`);
        return false;
      }
    }
    errors.push(`OLD VALUE NOT FOUND in ${localeSlug} for ${field}`);
    return false;
  }

  content = content.replace(oldVal, newVal);
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

console.log('=== Fixing overlong title tags (>60 chars) ===\n');
for (const [localeSlug, fix] of Object.entries(titleFixes)) {
  const newLen = fix.new.length;
  if (newLen > 60) {
    errors.push(`NEW TITLE TOO LONG: ${localeSlug} = ${newLen} chars: "${fix.new}"`);
    continue;
  }
  process.stdout.write(`  ${localeSlug}: ${fix.old.length}ch -> ${newLen}ch ... `);
  if (applyFix(localeSlug, 'titleTag', fix.old, fix.new)) {
    titleFixCount++;
    console.log('OK');
  } else {
    console.log('FAILED');
  }
}

console.log(`\n=== Fixing overlong meta descriptions (>155 chars) ===\n`);
for (const [localeSlug, fix] of Object.entries(metaFixes)) {
  const newLen = fix.new.length;
  if (newLen > 155) {
    errors.push(`NEW META TOO LONG: ${localeSlug} = ${newLen} chars: "${fix.new}"`);
    continue;
  }
  process.stdout.write(`  ${localeSlug}: ${fix.old.length}ch -> ${newLen}ch ... `);
  if (applyFix(localeSlug, 'metaDescription', fix.old, fix.new)) {
    metaFixCount++;
    console.log('OK');
  } else {
    console.log('FAILED');
  }
}

console.log(`\n=== Summary ===`);
console.log(`Title tags fixed: ${titleFixCount}`);
console.log(`Meta descriptions fixed: ${metaFixCount}`);
console.log(`Total files modified: ${titleFixCount + metaFixCount}`);

if (errors.length > 0) {
  console.log(`\n=== ERRORS (${errors.length}) ===`);
  errors.forEach(e => console.log(`  ${e}`));
  process.exit(1);
}

console.log('\nAll fixes applied successfully!');
