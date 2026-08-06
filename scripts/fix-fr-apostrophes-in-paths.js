const fs = require('fs');
const path = require('path');

// Fix unescaped apostrophes in /samples/french/ paths within single-quoted strings
// Pattern: src: '/samples/french/...d'Images...' needs d\'Images
const dirs = [
  'frontend/config/app-content/fr',
  'frontend/config/tool-content/fr',
  'frontend/config/bundle-content/fr',
  'frontend/config/start-content/fr',
  'frontend/config/idea-content/fr',
  'frontend/config/guide-content/fr',
];

let totalFiles = 0;
let totalFixes = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Find single-quoted strings containing /samples/french/ with unescaped apostrophes
    // Match: '/samples/french/...' where ... contains unescaped '
    // We need to escape ' inside the path portion only
    content = content.replace(/'(\/samples\/french\/[^']*?)'/g, (match, pathContent) => {
      // Check if pathContent actually ends at the right place
      // The issue: 'Tri d'Images 1.webp' - the regex stops at d' not at .webp'
      // We can't use this simple approach. Instead, look for the pattern differently.
      return match;
    });

    // Better approach: find lines with src: '/samples/french/ and fix the apostrophe issue
    // The actual pattern in the file looks like:
    // src: '/samples/french/picture sort/Tri d'Images 1.webp'
    // The ' in d' prematurely closes the string. We need to escape it.

    // Reset content
    content = fs.readFileSync(filePath, 'utf8');

    // Replace specific French filename patterns that contain apostrophes
    // These are the known French filenames with apostrophes:
    const apostropheNames = [
      ["Tri d'Images", "Tri d\\'Images"],
      ["Chemin d'Images", "Chemin d\\'Images"],
      ["Trouve l'Intrus", "Trouve l\\'Intrus"],
      ["Trouve l'Ombre", "Trouve l\\'Ombre"],
      ["Train de l'Alphabet", "Train de l\\'Alphabet"],
      ["Loto d'Images", "Loto d\\'Images"],
    ];

    let fileFixes = 0;
    for (const [from, to] of apostropheNames) {
      // Only fix within /samples/ paths in single-quoted src strings
      // Check if the unescaped version exists
      if (content.includes("'/samples/") && content.includes(from)) {
        // Only replace within src: '...' contexts where the apostrophe is unescaped
        const regex = new RegExp("(src: ')([^']*)" + from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const newContent = content.replace(regex, (match, prefix, middle) => {
          fileFixes++;
          return prefix + middle + to;
        });
        content = newContent;
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed ${filePath} (${fileFixes} fixes)`);
      totalFiles++;
      totalFixes += fileFixes;
    }
  }
}

console.log(`\nTotal: ${totalFiles} files, ${totalFixes} fixes`);
