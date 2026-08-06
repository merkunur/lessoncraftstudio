/**
 * Fix unescaped apostrophes inside single-quoted TypeScript strings.
 *
 * Strategy: Find all lines where single-quoted string content contains
 * a word-internal apostrophe (letter'letter pattern) and escape it.
 * Only targets long strings (content strings), not short property names.
 */
const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content',
  'frontend/config/tool-content',
  'frontend/config/guide-content',
  'frontend/config/bundle-content',
  'frontend/config/idea-content',
  'frontend/config/start-content',
  'frontend/config/compare-content',
];

let totalFiles = 0;
let totalFixes = 0;

function fixLine(line) {
  // Only process lines that contain long single-quoted strings (content)
  // These lines typically start with whitespace and contain '...' strings

  // Skip lines that don't contain apostrophe-like patterns inside words
  if (!/[a-zA-Z]'[a-zA-Z]/.test(line)) return line;

  // Skip import lines, type definitions, short property assignments
  if (/^\s*(import|export|const|let|var|type|interface)\s/.test(line)) return line;

  let fixes = 0;

  // Replace word'word patterns (letter-apostrophe-letter) with word\'word
  // But NOT already-escaped ones (word\'word)
  const result = line.replace(/([a-zA-Z])'([a-zA-Z])/g, (match, before, after) => {
    // Check if already escaped (preceding backslash)
    // We need to check the character before 'before' in the original string
    fixes++;
    return before + "\\'" + after;
  });

  totalFixes += fixes;
  return result;
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fp = path.join(dir, entry.name);
    if (entry.isDirectory()) { processDir(fp); continue; }
    if (!entry.name.endsWith('.ts')) continue;

    const content = fs.readFileSync(fp, 'utf8');
    const lines = content.split('\n');
    const fixedLines = lines.map(fixLine);
    const newContent = fixedLines.join('\n');

    if (newContent !== content) {
      fs.writeFileSync(fp, newContent, 'utf8');
      totalFiles++;
    }
  }
}

dirs.forEach(processDir);
console.log('Fixed ' + totalFiles + ' files, ' + totalFixes + ' apostrophes escaped');
