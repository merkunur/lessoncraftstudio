/**
 * Part 15: Content depth audit — count rendered words per content file
 * Reports which files are below 3,000 words and by how much
 */
const fs = require('fs');
const path = require('path');

function countWords(text) {
  if (!text) return 0;
  // Strip HTML tags, then count words
  const clean = String(text).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return clean ? clean.split(' ').length : 0;
}

function countObjectWords(obj) {
  if (!obj) return 0;
  if (typeof obj === 'string') return countWords(obj);
  if (Array.isArray(obj)) return obj.reduce((sum, item) => sum + countObjectWords(item), 0);
  if (typeof obj === 'object') {
    let total = 0;
    for (const [key, val] of Object.entries(obj)) {
      // Skip non-content fields
      if (['src', 'href', 'url', 'slug', 'icon', 'image', 'themeImages', 'sampleImages'].includes(key)) continue;
      total += countObjectWords(val);
    }
    return total;
  }
  return 0;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract the object literal between the first { and the matching export/};
  // Count words in all string values
  let wordCount = 0;

  // Match single/double quoted strings
  const strings = content.match(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g) || [];
  for (const s of strings) {
    const inner = s.slice(1, -1);
    if (inner.length < 20) continue;
    if (inner.startsWith('/') || inner.startsWith('http') || inner.includes('.webp') || inner.includes('.png')) continue;
    wordCount += countWords(inner);
  }

  // Match backtick template literals (marketOverview, etc.)
  const backticks = content.match(/`[^`]{20,}`/g) || [];
  for (const s of backticks) {
    const inner = s.slice(1, -1);
    if (inner.startsWith('/') || inner.startsWith('http')) continue;
    wordCount += countWords(inner);
  }

  return wordCount;
}

const dirs = [
  { dir: 'frontend/config/guide-content/en', label: 'Guides' },
  { dir: 'frontend/config/bundle-content/en', label: 'Bundles' },
  { dir: 'frontend/config/start-content/en', label: 'Start' },
  { dir: 'frontend/config/idea-content/en', label: 'Ideas' },
];

const TARGET = 3000;
const allResults = [];

for (const { dir, label } of dirs) {
  const fullDir = path.resolve(dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(fullDir, file);
    const words = analyzeFile(filePath);
    allResults.push({ file, label, words, path: filePath });
  }
}

// Sort by word count ascending
allResults.sort((a, b) => a.words - b.words);

// Summary stats
const below3k = allResults.filter(r => r.words < TARGET);
const below2k = allResults.filter(r => r.words < 2000);
const below1k = allResults.filter(r => r.words < 1000);
const above3k = allResults.filter(r => r.words >= TARGET);

console.log('=== CONTENT DEPTH AUDIT ===\n');
console.log(`Total files: ${allResults.length}`);
console.log(`Above 3,000 words: ${above3k.length}`);
console.log(`Below 3,000 words: ${below3k.length}`);
console.log(`Below 2,000 words: ${below2k.length}`);
console.log(`Below 1,000 words: ${below1k.length}`);
console.log(`\nAverage word count: ${Math.round(allResults.reduce((s, r) => s + r.words, 0) / allResults.length)}`);
console.log(`Median word count: ${allResults[Math.floor(allResults.length / 2)].words}`);

// By page type
console.log('\n--- BY PAGE TYPE ---');
for (const { label } of dirs) {
  const typeResults = allResults.filter(r => r.label === label);
  if (typeResults.length === 0) continue;
  const avg = Math.round(typeResults.reduce((s, r) => s + r.words, 0) / typeResults.length);
  const min = typeResults[0] ? Math.min(...typeResults.map(r => r.words)) : 0;
  const max = Math.max(...typeResults.map(r => r.words));
  const belowTarget = typeResults.filter(r => r.words < TARGET).length;
  console.log(`${label}: ${typeResults.length} files, avg ${avg} words, range ${min}-${max}, ${belowTarget} below ${TARGET}`);
}

// Show all files below target
if (below3k.length > 0) {
  console.log(`\n--- FILES BELOW ${TARGET} WORDS (${below3k.length}) ---`);
  for (const r of below3k) {
    const deficit = TARGET - r.words;
    const bar = '#'.repeat(Math.round(r.words / 100));
    console.log(`  ${r.words.toString().padStart(5)} words (-${deficit.toString().padStart(4)}) [${r.label.padEnd(7)}] ${r.file}`);
  }
}

// Show top 10 above target
console.log(`\n--- TOP 10 FILES ABOVE ${TARGET} WORDS ---`);
const top10 = [...allResults].sort((a, b) => b.words - a.words).slice(0, 10);
for (const r of top10) {
  console.log(`  ${r.words.toString().padStart(5)} words [${r.label.padEnd(7)}] ${r.file}`);
}
