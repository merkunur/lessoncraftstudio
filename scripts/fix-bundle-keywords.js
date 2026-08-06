const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'bundle-content', 'en');

const fixes = {
  'literacy-bundle.ts': 'word puzzle generator bundle',
  'matching-bundle.ts': 'matching & sorting bundle for Etsy',
  'math-bundle.ts': 'math worksheet bundle for Etsy sellers',
  'puzzle-bundle.ts': 'logic puzzle bundle for KDP books',
  'search-bundle.ts': 'search & find bundle for sellers',
  'visual-bundle.ts': 'visual worksheet bundle for sellers',
};

for (const [filename, newPK] of Object.entries(fixes)) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  const pkMatch = content.match(/primaryKeyword:\s*'([^']+)'/);
  if (!pkMatch) { console.error('NO PK:', filename); continue; }
  const oldPK = pkMatch[1];

  // Verify new PK is in title
  const ttMatch = content.match(/titleTag:\s*'([^']+)'/);
  if (ttMatch && !ttMatch[1].toLowerCase().includes(newPK.toLowerCase())) {
    console.error('PK NOT IN TITLE:', filename, newPK, 'vs', ttMatch[1]);
    continue;
  }

  content = content.replace(`primaryKeyword: '${oldPK}'`, `primaryKeyword: '${newPK}'`);

  // Add old keyword to secondary if not present
  if (!content.includes(`'${oldPK}'`)) {
    content = content.replace(
      /secondaryKeywords:\s*\[\s*\n\s*'/,
      `secondaryKeywords: [\n      '${oldPK}',\n      '`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('FIXED:', filename, '->', newPK);
}
