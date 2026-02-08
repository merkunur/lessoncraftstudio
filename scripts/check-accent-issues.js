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

// Check all ES files for missing accents
console.log('=== SPANISH ACCENT ISSUES ===');
const esDir = path.join(baseDir, 'es');
const esFiles = fs.readdirSync(esDir).filter(f => f.endsWith('.ts'));
for (const f of esFiles) {
  const c = fs.readFileSync(path.join(esDir, f), 'utf8');
  const seo = extractSeoBlock(c);
  if (!seo) continue;
  const title = extractSeoField(seo, 'title');
  const desc = extractSeoField(seo, 'description');
  const combined = title + ' ' + desc;
  const issues = [];
  if (/\bninos\b/i.test(combined)) issues.push('ninos→niños');
  if (/\beducacion\b/i.test(combined)) issues.push('educacion→educación');
  if (/\bmatematicas\b/i.test(combined)) issues.push('matematicas→matemáticas');
  if (/\bleccion\b/i.test(combined)) issues.push('leccion→lección');
  if (/\bgrafica\b/i.test(combined)) issues.push('grafica→gráfica');
  if (/\bnumeros\b/i.test(combined)) issues.push('numeros→números');
  if (/\bpatron\b/i.test(combined)) issues.push('patron→patrón');
  if (/\blogica\b/i.test(combined)) issues.push('logica→lógica');
  if (/\bbasica\b/i.test(combined)) issues.push('basica→básica');
  if (issues.length > 0) {
    console.log(`  ${f}: ${issues.join(', ')}`);
    console.log(`    T: ${title}`);
    console.log(`    D: ${desc}`);
  }
}

// Check PT file
console.log('\n=== PORTUGUESE ACCENT ISSUES ===');
const ptDir = path.join(baseDir, 'pt');
const ptFiles = fs.readdirSync(ptDir).filter(f => f.endsWith('.ts'));
for (const f of ptFiles) {
  const c = fs.readFileSync(path.join(ptDir, f), 'utf8');
  const seo = extractSeoBlock(c);
  if (!seo) continue;
  const title = extractSeoField(seo, 'title');
  const desc = extractSeoField(seo, 'description');
  const combined = title + ' ' + desc;
  const issues = [];
  if (/\bcaca\b/i.test(combined)) issues.push('caca→caça');
  if (/\bcriancas\b/i.test(combined)) issues.push('criancas→crianças');
  if (/\beducacao\b/i.test(combined)) issues.push('educacao→educação');
  if (/\bGratis\b/.test(combined) && !/Grátis/.test(combined)) issues.push('Gratis→Grátis');
  if (/\batividade(?:s)?\b/i.test(combined) && !/[àáâãç]/.test(combined)) issues.push('possibly missing accents');
  if (/\bimprimiveis\b/i.test(combined)) issues.push('imprimiveis→imprimíveis');
  if (issues.length > 0) {
    console.log(`  ${f}: ${issues.join(', ')}`);
    console.log(`    T: ${title}`);
    console.log(`    D: ${desc}`);
  }
}

// Check IT - just count how many have no accented chars at all
console.log('\n=== ITALIAN ACCENT SUMMARY ===');
const itDir = path.join(baseDir, 'it');
const itFiles = fs.readdirSync(itDir).filter(f => f.endsWith('.ts'));
let itNoAccent = 0, itHasAccent = 0;
for (const f of itFiles) {
  const c = fs.readFileSync(path.join(itDir, f), 'utf8');
  const seo = extractSeoBlock(c);
  if (!seo) continue;
  const title = extractSeoField(seo, 'title');
  const desc = extractSeoField(seo, 'description');
  if (/[àèéìòùÀÈÉÌÒÙ]/.test(title + ' ' + desc)) itHasAccent++;
  else itNoAccent++;
}
console.log(`  Files with accents: ${itHasAccent}`);
console.log(`  Files without accents: ${itNoAccent}`);
console.log(`  NOTE: Italian titles/descriptions use words that may not require accents.`);
console.log(`  This needs manual review to distinguish false positives from real issues.`);
