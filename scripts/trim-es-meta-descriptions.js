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

const MAX_LEN = 160;
const TARGET_MAX = 158;
const TARGET_MIN = 150;

let totalFiles = 0;
let totalChanged = 0;
let totalSkipped = 0;

function trimDescription(desc) {
  if (desc.length <= MAX_LEN) return null; // no change needed

  // Try to find last period, exclamation, or question mark before TARGET_MAX
  let cutIdx = -1;
  for (let i = TARGET_MAX - 1; i >= TARGET_MIN - 10; i--) {
    if (desc[i] === '.' || desc[i] === '!' || desc[i] === '?') {
      // Make sure the resulting string is in range
      const candidate = desc.substring(0, i + 1);
      if (candidate.length >= TARGET_MIN && candidate.length <= TARGET_MAX) {
        cutIdx = i;
        break;
      }
    }
  }

  if (cutIdx !== -1) {
    return desc.substring(0, cutIdx + 1);
  }

  // No sentence-ending punctuation found in range. Find last space before TARGET_MAX
  let spaceIdx = -1;
  for (let i = TARGET_MAX - 2; i >= TARGET_MIN - 10; i--) {
    if (desc[i] === ' ') {
      spaceIdx = i;
      break;
    }
  }

  if (spaceIdx !== -1) {
    let trimmed = desc.substring(0, spaceIdx);
    // Remove trailing comma or other minor punctuation
    trimmed = trimmed.replace(/[,;:\s]+$/, '');
    trimmed += '.';
    if (trimmed.length >= TARGET_MIN && trimmed.length <= MAX_LEN) {
      return trimmed;
    }
  }

  // Fallback: just cut at TARGET_MAX and add period
  let trimmed = desc.substring(0, TARGET_MAX - 1).replace(/[,;:\s]+$/, '') + '.';
  return trimmed;
}

for (const dir of DIRS) {
  const fullDir = path.join(BASE, dir);
  if (!fs.existsSync(fullDir)) {
    console.log(`Directory not found: ${dir}`);
    continue;
  }

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(fullDir, file);
    totalFiles++;

    let content = fs.readFileSync(filePath, 'utf-8');

    // Match metaDescription on same line or next line
    // Pattern 1: metaDescription: 'text',
    // Pattern 2: metaDescription:\n      'text',
    const regex = /(metaDescription:\s*\n?\s*')([^']*?)(',)/g;

    let match = regex.exec(content);
    if (!match) {
      // Try double quotes
      const regex2 = /(metaDescription:\s*\n?\s*")([^"]*?)(",)/g;
      match = regex2.exec(content);
    }

    if (!match) {
      console.log(`  [WARN] No metaDescription found in ${dir}/${file}`);
      continue;
    }

    const oldDesc = match[2];
    const oldLen = oldDesc.length;

    if (oldLen <= MAX_LEN) {
      totalSkipped++;
      continue;
    }

    const newDesc = trimDescription(oldDesc);
    if (!newDesc) {
      totalSkipped++;
      continue;
    }

    const newLen = newDesc.length;

    // Replace in content
    const newContent = content.replace(match[0], match[1] + newDesc + match[3]);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    totalChanged++;

    console.log(`[TRIMMED] ${dir}/${file}: ${oldLen} -> ${newLen}`);
    console.log(`  OLD: ${oldDesc}`);
    console.log(`  NEW: ${newDesc}`);
    console.log('');
  }
}

console.log('='.repeat(60));
console.log(`Total files scanned: ${totalFiles}`);
console.log(`Trimmed: ${totalChanged}`);
console.log(`Already OK: ${totalSkipped}`);
