/**
 * Extract replacement data from BLOG BUILDING source HTML files
 * for the posts that need fixing.
 */
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'BLOG BUILDING');

function extractFromHtml(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Extract <title>
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const metaTitle = titleMatch ? titleMatch[1].trim() : '';

  // Extract <h1>
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
  const title = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : metaTitle;

  // Extract meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const metaDescription = descMatch ? descMatch[1].trim() : '';

  // Extract <article> content
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const content = articleMatch ? articleMatch[1].trim() : '';

  // Generate excerpt
  const textContent = content.replace(/<[^>]+>/g, '').trim();
  const excerpt = textContent.substring(0, 200).trim() + '...';

  // Extract slug from filename
  const filename = path.basename(htmlPath);
  const slug = filename
    .replace(/^\d{3}-/, '')
    .replace(/\.html$/, '')
    .replace(/-(final-optimized|final|optimized)$/, '');

  return { slug, title, metaTitle, metaDescription, content, excerpt };
}

// Posts to fix
const fixes = [
  {
    name: 'variance-detection (es)',
    file: path.join(BLOG_DIR, 'SPANISH BLOGPOSTS', '030-algoritmo-deteccion-varianza-piezas-puzzle-significativas.html'),
    locale: 'es'
  },
  {
    name: 'top-10-3rd-grade (da)',
    file: path.join(BLOG_DIR, 'DANISH BLOGPOSTS', '041-top-10-opgavegeneratorer-3-klasse.html'),
    locale: 'da'
  }
];

// Also check content mismatches
const contentChecks = [
  {
    name: 'top-10-4th-5th-grade (it)',
    file: path.join(BLOG_DIR, 'ITALIAN BLOGPOSTS', '043-migliori-10-generatori-schede-didattiche-quarta-quinta-elementare-final-optimized.html'),
    locale: 'it'
  },
  {
    name: 'early-childhood (fi)',
    file: path.join(BLOG_DIR, 'FINNISH BLOGPOSTS', '071-varhaiskasvatus-esiopetus-ikatasoinen-oppimateriaalit.html'),
    locale: 'fi'
  }
];

const fixData = {};

for (const fix of fixes) {
  if (!fs.existsSync(fix.file)) {
    console.error(`FILE NOT FOUND: ${fix.file}`);
    continue;
  }
  const data = extractFromHtml(fix.file);
  console.log(`\n=== ${fix.name} ===`);
  console.log(`  slug: ${data.slug}`);
  console.log(`  title: ${data.title}`);
  console.log(`  metaTitle: ${data.metaTitle}`);
  console.log(`  metaDescription: ${data.metaDescription.substring(0, 80)}...`);
  console.log(`  content length: ${data.content.length} chars`);
  console.log(`  excerpt: ${data.excerpt.substring(0, 80)}...`);

  fixData[fix.name] = { locale: fix.locale, data };
}

// Save fix data
fs.writeFileSync(
  path.join(__dirname, 'fix-data.json'),
  JSON.stringify(fixData, null, 2),
  'utf8'
);
console.log('\nFix data saved to fix-data.json');

// Check content files
console.log('\n\n=== CONTENT CHECKS (to verify if content is in wrong language) ===');
for (const check of contentChecks) {
  if (!fs.existsSync(check.file)) {
    console.error(`FILE NOT FOUND: ${check.file}`);
    continue;
  }
  const data = extractFromHtml(check.file);
  console.log(`\n${check.name}:`);
  console.log(`  Source file title: ${data.title}`);
  console.log(`  Content first 200 chars: ${data.content.replace(/<[^>]+>/g, '').substring(0, 200)}`);
}
