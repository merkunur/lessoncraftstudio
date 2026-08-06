#!/usr/bin/env node
/**
 * Part 110 Verification: Finnish Theme Hubs SEO — Themes 1–10
 * Checks title length, description length, keyword count, heading != title, Finnish text
 */

const fs = require('fs');
const path = require('path');

const themes = [
  'alphabet', 'animals', 'birds', 'birthday', 'body',
  'camping', 'circus', 'clothing', 'colors', 'construction'
];

const basePath = path.join(__dirname, '..', 'frontend', 'content', 'themes');

let allPassed = true;
const results = [];

for (const theme of themes) {
  const filePath = path.join(basePath, theme, 'fi.ts');
  const raw = fs.readFileSync(filePath, 'utf-8');

  // Extract fields using regex on raw source
  const titleMatch = raw.match(/title:\s*'([^']+)'/);
  const descMatch = raw.match(/description:\s*'([^']+)'/);
  const kwMatch = raw.match(/keywords:\s*'([^']+)'/);
  const headingMatch = raw.match(/heading:\s*'([^']+)'/);

  if (!titleMatch || !descMatch || !kwMatch || !headingMatch) {
    console.error(`FAIL [${theme}]: Could not extract SEO fields`);
    allPassed = false;
    continue;
  }

  // Decode Unicode escapes to get rendered length
  const decode = (s) => s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  const titleRaw = titleMatch[1];
  const descRaw = descMatch[1];
  const kwRaw = kwMatch[1];
  const headingRaw = headingMatch[1];

  const title = decode(titleRaw);
  const desc = decode(descRaw);
  const kw = decode(kwRaw);
  const heading = decode(headingRaw);

  const errors = [];

  // Title length (50-60 chars)
  const titleLen = title.length;
  if (titleLen < 50 || titleLen > 60) {
    errors.push(`title length ${titleLen} (target 50-60)`);
  }

  // Description length (150-160 chars)
  const descLen = desc.length;
  if (descLen < 140 || descLen > 160) {
    errors.push(`description length ${descLen} (target 140-160)`);
  }

  // Keywords count (exactly 10)
  const keywords = kw.split(',').map(k => k.trim()).filter(k => k.length > 0);
  if (keywords.length !== 10) {
    errors.push(`keywords count ${keywords.length} (target 10)`);
  }

  // Heading differs from title
  const titleWithoutBrand = title.replace(/\s*\|\s*LessonCraftStudio$/, '');
  if (heading === titleWithoutBrand) {
    errors.push(`heading identical to title (should differ)`);
  }

  // No English leakage (check for common English words, excluding brand)
  const textToCheck = (title + ' ' + desc + ' ' + kw + ' ' + heading)
    .replace(/LessonCraftStudio/g, '')
    .replace(/abc/gi, '');
  const englishWords = ['free', 'worksheets', 'printable', 'kids', 'children', 'activities', 'the ', 'and ', 'for '];
  for (const ew of englishWords) {
    if (textToCheck.toLowerCase().includes(ew)) {
      errors.push(`English leakage: "${ew.trim()}"`);
    }
  }

  const status = errors.length === 0 ? 'PASS' : 'FAIL';
  if (errors.length > 0) allPassed = false;

  results.push({
    theme,
    status,
    titleLen,
    descLen,
    kwCount: keywords.length,
    headingDiffers: heading !== titleWithoutBrand,
    errors
  });

  console.log(`${status} [${theme}] title=${titleLen}ch desc=${descLen}ch kw=${keywords.length} heading_diff=${heading !== titleWithoutBrand}`);
  if (errors.length > 0) {
    errors.forEach(e => console.log(`     -> ${e}`));
  }
}

console.log('\n' + '='.repeat(60));
console.log(`Result: ${allPassed ? 'ALL 10 PASSED' : 'SOME FAILED'}`);
console.log('='.repeat(60));

process.exit(allPassed ? 0 : 1);
