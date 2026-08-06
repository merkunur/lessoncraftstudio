#!/usr/bin/env node
/**
 * Validates Finnish secondary page metadata lengths (runtime .length)
 * Checks: 8 category hubs + 5 grade hubs = 13 pages
 * Target: title 50-60 chars, description 150-160 chars
 */

const path = require('path');
const fs = require('fs');

function extractFiMetadata(filePath, blockName) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Find all top-level category/grade keys and their fi blocks
  const results = [];

  // Match pattern: 'key-name': { ... fi: { title: '...', description: '...' } }
  // We need to find each category/grade key, then find its fi block
  const topLevelRegex = /['"]([a-z-]+)['"]\s*:\s*\{/g;
  let match;

  while ((match = topLevelRegex.exec(content)) !== null) {
    const key = match[1];
    const startPos = match.index;

    // Find 'fi: {' after this position
    const afterTop = content.substring(startPos);
    const fiMatch = afterTop.match(/\n\s{4}fi:\s*\{/);
    if (!fiMatch) continue;

    const fiStart = startPos + fiMatch.index;
    const afterFi = content.substring(fiStart);

    // Extract title
    const titleMatch = afterFi.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
    const descMatch = afterFi.match(/description:\s*'((?:[^'\\]|\\.)*)'/);
    const keywordsMatch = afterFi.match(/keywords:\s*'((?:[^'\\]|\\.)*)'/);

    if (titleMatch && descMatch) {
      // Evaluate the string to resolve \uXXXX escapes
      let title, desc, keywords;
      try {
        title = eval("'" + titleMatch[1] + "'");
        desc = eval("'" + descMatch[1] + "'");
        keywords = keywordsMatch ? eval("'" + keywordsMatch[1] + "'") : '';
      } catch (e) {
        title = titleMatch[1];
        desc = descMatch[1];
        keywords = keywordsMatch ? keywordsMatch[1] : '';
      }

      results.push({
        key,
        title,
        titleLen: title.length,
        desc,
        descLen: desc.length,
        keywords,
      });
    }
  }

  return results;
}

const catFile = path.join(__dirname, '..', 'frontend', 'config', 'category-content.ts');
const gradeFile = path.join(__dirname, '..', 'frontend', 'config', 'grade-content.ts');

console.log('=== FINNISH CATEGORY HUBS (8) ===\n');
const cats = extractFiMetadata(catFile);
cats.forEach(c => {
  const titleOk = c.titleLen >= 50 && c.titleLen <= 60;
  const descOk = c.descLen >= 150 && c.descLen <= 160;
  console.log(`${c.key}:`);
  console.log(`  title (${c.titleLen}): ${titleOk ? 'OK' : 'OUT'} "${c.title}"`);
  console.log(`  desc  (${c.descLen}): ${descOk ? 'OK' : 'OUT'} "${c.desc}"`);
  console.log();
});

console.log('\n=== FINNISH GRADE HUBS (5) ===\n');
const grades = extractFiMetadata(gradeFile);
grades.forEach(g => {
  const titleOk = g.titleLen >= 50 && g.titleLen <= 60;
  const descOk = g.descLen >= 150 && g.descLen <= 160;
  console.log(`${g.key}:`);
  console.log(`  title (${g.titleLen}): ${titleOk ? 'OK' : 'OUT'} "${g.title}"`);
  console.log(`  desc  (${g.descLen}): ${descOk ? 'OK' : 'OUT'} "${g.desc}"`);
  console.log();
});

// Summary
const allItems = [...cats, ...grades];
const titleFails = allItems.filter(i => i.titleLen < 50 || i.titleLen > 60);
const descFails = allItems.filter(i => i.descLen < 150 || i.descLen > 160);

console.log(`\n=== SUMMARY ===`);
console.log(`Total pages: ${allItems.length}`);
console.log(`Title out of range (50-60): ${titleFails.length}`);
console.log(`Desc out of range (150-160): ${descFails.length}`);
if (titleFails.length > 0) {
  console.log(`  Title fails: ${titleFails.map(f => `${f.key}(${f.titleLen})`).join(', ')}`);
}
if (descFails.length > 0) {
  console.log(`  Desc fails: ${descFails.map(f => `${f.key}(${f.descLen})`).join(', ')}`);
}
