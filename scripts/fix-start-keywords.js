const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'start-content', 'en');

const fixes = {
  'commercial-license-guide.ts': 'commercial license guide for sellers',
  'complete-guide-printable-business.ts': 'start a printable business',
  'create-multilingual-worksheets.ts': 'create multilingual worksheets to sell',
  'create-worksheets-that-sell.ts': 'create professional worksheets that sell',
  'etsy-printable-business.ts': 'Etsy printable business masterclass',
  'marketing-printable-business.ts': 'market your printable business online',
  'printable-business-blueprint.ts': 'printable business blueprint',
  'printable-business-legal.ts': 'printable business taxes',
  'scaling-printable-business.ts': 'scale to full-time printable business',
  'tools-for-printable-business.ts': 'essential tools for printable business',
};

let changed = 0;
for (const [filename, newPK] of Object.entries(fixes)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) { console.error('MISSING:', filename); continue; }
  let content = fs.readFileSync(filePath, 'utf8');
  const pkMatch = content.match(/primaryKeyword:\s*'([^']+)'/);
  if (!pkMatch) { console.error('NO PK:', filename); continue; }
  const oldPK = pkMatch[1];
  if (oldPK === newPK) continue;

  const ttMatch = content.match(/titleTag:\s*'([^']+)'/);
  if (ttMatch && !ttMatch[1].toLowerCase().includes(newPK.toLowerCase())) {
    console.error('NOT IN TITLE:', filename, newPK, 'not in', ttMatch[1]);
    continue;
  }

  content = content.replace(`primaryKeyword: '${oldPK}'`, `primaryKeyword: '${newPK}'`);
  if (!content.includes(`'${oldPK}'`)) {
    content = content.replace(/secondaryKeywords:\s*\[\s*\n\s*'/, `secondaryKeywords: [\n      '${oldPK}',\n      '`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('FIXED:', filename);
  changed++;
}
console.log('Done:', changed, 'fixed');
