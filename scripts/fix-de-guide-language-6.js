const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const replacements = [
  // lowercase lehrer compounds
  ['lehrerorientierte', 'käuferorientierte'],
  ['lehrerorientierten', 'käuferorientierten'],
  ['lehrerin', 'käuferin'],

  // lowercase schueler compounds
  ['schülergerechte', 'nutzergerechte'],
  ['schülerseitigen', 'nutzerseitigen'],
  ['schülerseitige', 'nutzerseitige'],

  // lowercase klassenzimmer/klassenraum compounds
  ['klassenraumfertige', 'einsatzfertige'],
  ['klassenraumfertigen', 'einsatzfertigen'],
  ['klassenzimmerfreundlichen', 'anwenderfreundlichen'],
  ['klassenzimmerspezifische', 'bildungsmarktspezifische'],

  // nachhilfestunden
  ['nachhilfestunden', 'Übungsstunden'],
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

  // Handle 'lehrer' that appears inside compound words as a generic substring
  // We need to find remaining 'lehrer' occurrences and handle them
  // But be careful not to break 'Käufer' (which contains no 'lehrer')

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements += fileCount;
    console.log(`  ${file}: ${fileCount}`);
  }
}

// Now check remaining 'lehrer' occurrences
console.log('Total pass-6 replacements:', totalReplacements);
console.log('\nChecking remaining lehrer...');
for (const file of files) {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes('lehrer')) {
      // Extract the word containing 'lehrer'
      const matches = lines[i].match(/\S*[Ll]ehrer\S*/g);
      if (matches) {
        for (const m of matches) {
          // Skip if it's already 'Käufer' related
          if (m.includes('Käufer')) continue;
          console.log(`  ${file}:${i+1}: ...${m}...`);
        }
      }
    }
  }
}
