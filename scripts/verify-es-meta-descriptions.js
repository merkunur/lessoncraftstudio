const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');
const DIRS = [
  'tool-content/es',
  'guide-content/es',
  'bundle-content/es',
  'idea-content/es',
  'start-content/es',
];

let totalFiles = 0;
let tooLong = 0;
let tooShort = 0;
let midWordCuts = 0;
const issues = [];

for (const dir of DIRS) {
  const fullDir = path.join(BASE, dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(fullDir, file);
    totalFiles++;

    const content = fs.readFileSync(filePath, 'utf-8');
    const regex = /metaDescription:\s*\n?\s*'([^']*?)'/;
    const match = content.match(regex);
    if (!match) {
      const regex2 = /metaDescription:\s*\n?\s*"([^"]*?)"/;
      const match2 = content.match(regex2);
      if (!match2) {
        issues.push(`[WARN] No metaDescription found: ${dir}/${file}`);
        continue;
      }
      match[1] = match2[1];
    }

    const desc = match[1];
    const len = desc.length;

    if (len > 160) {
      tooLong++;
      issues.push(`[TOO LONG] ${dir}/${file}: ${len} chars`);
      issues.push(`  "${desc}"`);
    }
    if (len < 120) {
      tooShort++;
      issues.push(`[SHORT] ${dir}/${file}: ${len} chars`);
    }

    // Check for mid-word cuts (word fragment before final period)
    // A mid-word cut looks like: "...somepartialwor." where the text before the period
    // doesn't end at a natural word boundary
    if (desc.endsWith('.')) {
      const beforePeriod = desc.slice(0, -1);
      const lastSpace = beforePeriod.lastIndexOf(' ');
      if (lastSpace > 0) {
        const lastWord = beforePeriod.slice(lastSpace + 1);
        // Check if it looks like a truncated word (ends with common partial suffixes)
        if (lastWord.length <= 3 && !/^(y|o|a|de|el|la|en|un|su|tu|al|se|le|lo|no|me|mi|ni|si|ya|e)$/i.test(lastWord)) {
          midWordCuts++;
          issues.push(`[MID-WORD?] ${dir}/${file}: ends with "...${beforePeriod.slice(-30)}."`);
        }
      }
    }
  }
}

console.log('='.repeat(60));
console.log('SPANISH META DESCRIPTION VERIFICATION');
console.log('='.repeat(60));
console.log(`Total files: ${totalFiles}`);
console.log(`Too long (>160): ${tooLong}`);
console.log(`Short (<120): ${tooShort}`);
console.log(`Possible mid-word cuts: ${midWordCuts}`);
console.log('');

if (issues.length === 0) {
  console.log('ALL PASS - No meta descriptions exceed 160 characters.');
} else {
  for (const issue of issues) {
    console.log(issue);
  }
}

if (tooLong === 0) {
  console.log('\nVERIFICATION PASSED: No Spanish meta descriptions exceed 160 characters.');
} else {
  console.log(`\nVERIFICATION FAILED: ${tooLong} meta descriptions still exceed 160 characters.`);
}
