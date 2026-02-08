const fs=require('fs'),path=require('path');
const baseDir = path.resolve(__dirname, '..', 'frontend', 'content', 'product-pages');

function extractSeoField(seoBlock, field) {
  const fieldIdx = seoBlock.indexOf(field + ':');
  if (fieldIdx === -1) return '';
  let rest = seoBlock.substring(fieldIdx + field.length + 1).trimStart();
  const quote = rest[0];
  if (quote !== "'" && quote !== '"' && quote !== '`') return '';
  rest = rest.substring(1);
  let result = '', i = 0;
  while (i < rest.length) {
    if (rest[i] === '\\' && i + 1 < rest.length) {
      const next = rest[i + 1];
      if (next === 'u' && i + 5 < rest.length && /^[0-9a-fA-F]{4}$/.test(rest.substring(i+2, i+6))) {
        result += String.fromCharCode(parseInt(rest.substring(i+2, i+6), 16));
        i += 6;
      } else { result += next; i += 2; }
    } else if (rest[i] === quote) { break; }
    else { result += rest[i]; i++; }
  }
  return result;
}

function extractSeoBlock(content) {
  const seoIdx = content.indexOf('seo:');
  if (seoIdx === -1) return null;
  const braceStart = content.indexOf('{', seoIdx);
  if (braceStart === -1) return null;
  let depth = 0;
  for (let i = braceStart; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') { depth--; if (depth === 0) return content.substring(braceStart, i + 1); }
  }
  return null;
}

const checks = [
  ['it', 'abbinamenti-schede'],
  ['it', 'addizione-schede'],
  ['it', 'disegni-da-colorare'],
  ['es', 'adivinar-palabras-fichas'],
  ['es', 'coloring-worksheets'],
  ['es', 'buscar-objetos-fichas'],
  ['pt', 'caca-palavras-fichas'],
  ['no', 'addisjon-arbeidsark']
];

for (const [loc, slug] of checks) {
  const c = fs.readFileSync(path.join(baseDir, loc, slug+'.ts'), 'utf8');
  const seo = extractSeoBlock(c);
  if (!seo) { console.log(loc+'/'+slug+': NO SEO BLOCK'); continue; }
  const title = extractSeoField(seo, 'title');
  const desc = extractSeoField(seo, 'description');
  const hasAccent = /[àáâãäåæçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/.test(title + ' ' + desc);
  console.log(`${loc}/${slug}:`);
  console.log(`  T: ${title}`);
  console.log(`  D: ${desc}`);
  console.log(`  Has accent: ${hasAccent}`);
  console.log('');
}
