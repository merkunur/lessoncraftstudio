const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'blog-content', 'es');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
let errors = 0;
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  if (content.includes('\\u00')) { console.log('UNICODE ESCAPE: ' + f); errors++; }
  if (!content.includes('export default content')) { console.log('NO EXPORT: ' + f); errors++; }
  if (!content.includes("import type { BlogContent }")) { console.log('NO IMPORT: ' + f); errors++; }
  if (!content.includes("category: '")) { console.log('NO CATEGORY: ' + f); errors++; }
  // Check category is valid
  const catMatch = content.match(/category: '([^']+)'/);
  if (catMatch && !['product-guide','platform-strategy','niche-seasonal','how-to'].includes(catMatch[1])) {
    console.log('BAD CATEGORY: ' + f + ' -> ' + catMatch[1]); errors++;
  }
});
console.log('Total files: ' + files.length);
console.log('Errors: ' + errors);
