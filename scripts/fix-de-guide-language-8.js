const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const replacements = [
  // Capitalized Differenzierte/Differenziertes
  ['Differenziertes', 'Gestuftes'],
  ['Differenzierten', 'Gestuften'],
  ['Differenzierte', 'Gestufte'],

  // KLASSENSTUFE (uppercase placeholder)
  ['KLASSENSTUFE', 'ALTERSGRUPPE'],

  // Kinderfreundliche (capitalized)
  ['Kinderfreundliche', 'Leserfreundliche'],

  // Kerncurriculum
  ['Kerncurriculum-Fächer', 'Kernfächer'],
  ['Kerncurriculum', 'Kernmarkt'],
];

let totalReplacements = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let fileCount = 0;

  for (const [search, replace] of replacements) {
    const count = content.split(search).length - 1;
    if (count > 0) {
      fileCount += count;
      content = content.split(search).join(replace);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements += fileCount;
    console.log(`  ${file}: ${fileCount}`);
  }
}

console.log('Total pass-8 replacements:', totalReplacements);
