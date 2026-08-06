const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content/fr',
  'frontend/config/tool-content/fr',
  'frontend/config/bundle-content/fr',
  'frontend/config/start-content/fr',
  'frontend/config/idea-content/fr',
  'frontend/config/guide-content/fr',
];

const replacements = {
  '%E9': 'é',
  '%E8': 'è',
  '%E0': 'à',
  '%EA': 'ê',
};

let totalFiles = 0;
let totalReplacements = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let fileReplacements = 0;

    // Only replace within /samples/ paths
    const newContent = content.replace(/(\/samples\/[^'"`\n]*)/g, (match) => {
      let result = match;
      for (const [encoded, literal] of Object.entries(replacements)) {
        const regex = new RegExp(encoded, 'gi');
        const before = result;
        result = result.replace(regex, literal);
        if (result !== before) {
          fileReplacements += (before.match(regex) || []).length;
        }
      }
      return result;
    });

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Fixed ${filePath} (${fileReplacements} replacements)`);
      totalFiles++;
      totalReplacements += fileReplacements;
    }
  }
}

console.log(`\nTotal: ${totalFiles} files, ${totalReplacements} replacements`);
