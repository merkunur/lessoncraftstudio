const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'idea-content', 'en');

const fixes = {
  'back-to-school-printable-ideas.ts': 'back to school printables to sell',
  'bulk-licensing-printable-ideas.ts': 'bulk licensing printable business',
  'christmas-printable-ideas.ts': 'Christmas printables to sell on Etsy',
  'construction-printable-ideas.ts': 'construction printables to sell',
  'digital-download-printable-ideas.ts': 'digital download printable business',
  'dinosaur-printable-ideas.ts': 'dinosaur printable business ideas',
  'esl-printable-ideas.ts': 'ESL printable business ideas',
  'fairy-tale-printable-ideas.ts': 'fairy tale printables to sell',
  'first-grade-printable-ideas.ts': 'first grade printables to sell',
  'food-cooking-printable-ideas.ts': 'food themed printables to sell',
  'forest-animals-printable-ideas.ts': 'forest animal printables to sell',
  'halloween-printable-ideas.ts': 'Halloween printable business ideas',
  'insects-printable-ideas.ts': 'insect printable business ideas',
  'parents-day-printable-ideas.ts': 'Parents Day printables to sell',
  'physical-printable-product-ideas.ts': 'physical printable product ideas',
  'pirates-printable-ideas.ts': 'pirate printable business ideas',
  'print-on-demand-printable-ideas.ts': 'print on demand worksheet business',
  'space-printable-ideas.ts': 'space themed printables to sell',
  'thanksgiving-printable-ideas.ts': 'Thanksgiving printables to sell',
  'underwater-printable-ideas.ts': 'underwater printables to sell',
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
