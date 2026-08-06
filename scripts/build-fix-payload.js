/**
 * Build the fix payload from source HTML files.
 * Extracts all needed data for the 4 problem posts.
 * Output: fix-payload.json (to be uploaded to server)
 */
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'BLOG BUILDING');

function parseHtml(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');

  const titleTag = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const metaTitle = titleTag ? titleTag[1].trim() : '';

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : metaTitle;

  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const metaDescription = descMatch ? descMatch[1].trim() : '';

  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const content = articleMatch ? articleMatch[1].trim() : '';

  const textContent = content.replace(/<[^>]+>/g, '').trim();
  const excerpt = textContent.substring(0, 200).trim() + '...';

  const filename = path.basename(htmlPath);
  const slug = filename
    .replace(/^\d{3}-/, '')
    .replace(/\.html$/, '')
    .replace(/-(final-optimized|final|optimized)$/, '');

  return { slug, title, metaTitle, metaDescription, content, excerpt };
}

const fixes = [
  {
    dbSlug: 'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces',
    locale: 'es',
    fixType: 'slug-title-meta',
    sourceFile: path.join(BLOG_DIR, 'SPANISH BLOGPOSTS', '030-algoritmo-deteccion-varianza-piezas-puzzle-significativas.html')
  },
  {
    dbSlug: 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9',
    locale: 'da',
    fixType: 'slug-title-meta',
    sourceFile: path.join(BLOG_DIR, 'DANISH BLOGPOSTS', '041-top-10-opgavegeneratorer-3-klasse.html')
  },
  {
    dbSlug: 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11',
    locale: 'it',
    fixType: 'content-only',
    sourceFile: path.join(BLOG_DIR, 'ITALIAN BLOGPOSTS', '043-migliori-10-generatori-schede-didattiche-quarta-quinta-elementare-final-optimized.html')
  },
  {
    dbSlug: 'early-childhood-prek-k-developmentally-appropriate-worksheet-activities',
    locale: 'fi',
    fixType: 'content-only',
    sourceFile: path.join(BLOG_DIR, 'FINNISH BLOGPOSTS', '071-varhaiskasvatus-esiopetus-ikatasoinen-oppimateriaalit.html')
  }
];

const payload = [];

for (const fix of fixes) {
  if (!fs.existsSync(fix.sourceFile)) {
    console.error(`NOT FOUND: ${fix.sourceFile}`);
    continue;
  }

  const data = parseHtml(fix.sourceFile);
  console.log(`\n${fix.dbSlug} (${fix.locale}): ${fix.fixType}`);
  console.log(`  slug: ${data.slug}`);
  console.log(`  title: ${data.title.substring(0, 60)}`);
  console.log(`  content: ${data.content.length} chars`);

  payload.push({
    dbSlug: fix.dbSlug,
    locale: fix.locale,
    fixType: fix.fixType,
    data
  });
}

fs.writeFileSync(
  path.join(__dirname, 'fix-payload.json'),
  JSON.stringify(payload, null, 2),
  'utf8'
);

const size = fs.statSync(path.join(__dirname, 'fix-payload.json')).size;
console.log(`\nPayload saved: fix-payload.json (${(size / 1024).toFixed(0)} KB)`);
