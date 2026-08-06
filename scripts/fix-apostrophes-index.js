/**
 * Fix unescaped French/Italian apostrophes in index page files
 * These are d'une, l'acquisto etc. inside single-quoted JS strings
 */
const fs = require('fs');
const files = [
  'frontend/app/[locale]/bundles/page.tsx',
  'frontend/app/[locale]/guides/page.tsx',
  'frontend/app/[locale]/start/page.tsx',
  'frontend/app/[locale]/ideas/page.tsx',
  'frontend/app/[locale]/apps/page.tsx',
  'frontend/app/[locale]/tools/page.tsx',
];
let total = 0;
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let c = fs.readFileSync(f, 'utf8');
  const orig = c;
  // Escape apostrophes in French/Italian text inside single-quoted strings
  // Pattern: letter + ' + lowercase letter (not already escaped)
  // This catches d'une, l'acquisto, d'imprimables, n'est, s'inscrire, etc.
  c = c.replace(/([a-zéèêëàâîïôùûüçæœ])'([a-zéèêëàâîïôùûüçæœ])/gi, "$1\\'$2");
  if (c !== orig) {
    fs.writeFileSync(f, c, 'utf8');
    total++;
    const count = (orig.match(/[a-z]'[a-z]/gi) || []).length;
    console.log('Fixed ' + f + ' (' + count + ' apostrophes escaped)');
  }
}
console.log('Files fixed: ' + total);
