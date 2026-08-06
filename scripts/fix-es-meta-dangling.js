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

// Spanish prepositions, articles, conjunctions that should never end a sentence
const DANGLING = new Set([
  'con', 'por', 'de', 'del', 'en', 'para', 'que', 'y', 'a', 'al',
  'el', 'la', 'los', 'las', 'un', 'una', 'su', 'tu', 'o', 'e',
]);

let fixed = 0;

function fixDangling(desc) {
  // Only fix if it ends with dangling word + period
  const m = desc.match(/^(.+)\s+(\S+)\.\s*$/);
  if (!m) return null;

  let lastWord = m[2];
  if (!DANGLING.has(lastWord.toLowerCase())) return null;

  // Remove the dangling word and try to find a good cut point
  let text = m[1].trim();

  // Keep removing trailing dangling words
  while (true) {
    const m2 = text.match(/^(.+)\s+(\S+)$/);
    if (!m2) break;
    // Remove trailing comma if present
    let word = m2[2].replace(/,$/, '');
    if (DANGLING.has(word.toLowerCase()) || m2[2].endsWith(',')) {
      text = m2[1].trim();
    } else {
      break;
    }
  }

  // Remove any trailing punctuation that looks bad
  text = text.replace(/[,;:\s]+$/, '');

  // Add period if not already ending with sentence-ending punctuation
  if (!/[.!?]$/.test(text)) {
    text += '.';
  }

  // Check length constraints
  if (text.length < 120 || text.length > 160) {
    // If too short after removal, try the original but just cut the dangling word
    let simple = m[1].trim().replace(/[,;:\s]+$/, '') + '.';
    if (simple.length >= 120 && simple.length <= 160) {
      return simple;
    }
    // Still too short? Return what we have if it's reasonable
    if (text.length >= 100) return text;
    return null;
  }

  return text;
}

for (const dir of DIRS) {
  const fullDir = path.join(BASE, dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    const regex = /metaDescription:\s*\n?\s*'([^']*?)'/;
    const match = content.match(regex);
    if (!match) continue;

    const desc = match[1];
    const newDesc = fixDangling(desc);

    if (newDesc && newDesc !== desc) {
      content = content.replace(match[0], match[0].replace(desc, newDesc));
      fs.writeFileSync(filePath, content, 'utf-8');
      fixed++;
      console.log(`[FIXED] ${dir}/${file}: ${desc.length} -> ${newDesc.length}`);
      console.log(`  OLD: ${desc}`);
      console.log(`  NEW: ${newDesc}`);
      console.log('');
    }
  }
}

console.log(`Fixed ${fixed} dangling endings.`);
