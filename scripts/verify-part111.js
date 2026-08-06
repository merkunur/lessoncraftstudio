const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const themes = [
  'cooking', 'dinosaurs', 'easter', 'emotions', 'fairy-tales',
  'farm', 'flowers', 'food', 'forest', 'fruits'
];

let allPass = true;

for (const theme of themes) {
  const fp = path.join(base, theme, 'fi.ts');
  const raw = fs.readFileSync(fp, 'utf8');

  // Extract field values (handle both escaped and unicode)
  const titleMatch = raw.match(/^\s+title: '(.+)',$/m);
  const descMatch = raw.match(/^\s+description: '(.+)',$/m);
  const kwMatch = raw.match(/^\s+keywords: '(.+)',$/m);
  const headingMatch = raw.match(/^\s+heading: '(.+)',$/m);

  if (!titleMatch || !descMatch || !kwMatch || !headingMatch) {
    console.log(`FAIL [${theme}]: Could not extract SEO fields`);
    allPass = false;
    continue;
  }

  // Decode unicode escapes to get rendered length
  function decode(s) {
    return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }

  const title = decode(titleMatch[1]);
  const desc = decode(descMatch[1]);
  const kw = decode(kwMatch[1]);
  const heading = decode(headingMatch[1]);

  const errors = [];

  // Title length check (50-70 chars is good for SEO)
  if (title.length < 40 || title.length > 70) {
    errors.push(`title length ${title.length} (want 40-70): "${title}"`);
  }

  // Description length check (140-160 chars)
  if (desc.length < 120 || desc.length > 170) {
    errors.push(`desc length ${desc.length} (want 120-170): "${desc}"`);
  }

  // Keywords count (exactly 10)
  const kwCount = kw.split(',').map(k => k.trim()).filter(k => k.length > 0).length;
  if (kwCount !== 10) {
    errors.push(`keywords count ${kwCount} (want 10)`);
  }

  // Heading differs from title (without brand)
  const titleWithoutBrand = title.replace(/\s*\|\s*LessonCraftStudio$/, '');
  if (heading === titleWithoutBrand) {
    errors.push(`heading identical to title (without brand)`);
  }

  // No "Ilmaiset" in title (old pattern)
  if (title.includes('Ilmaiset')) {
    errors.push(`title still contains "Ilmaiset"`);
  }

  // No "Luo tulostettavia" in description (old pattern)
  if (desc.includes('Luo tulostettavia')) {
    errors.push(`desc still contains "Luo tulostettavia"`);
  }

  // Check for English leakage (excluding brand + species names)
  const allowedEnglish = ['LessonCraftStudio', 'T-Rex', 'Triceratops', 'Stegosaurus'];
  let testStr = title + ' ' + desc + ' ' + heading;
  for (const w of allowedEnglish) {
    testStr = testStr.replace(new RegExp(w, 'g'), '');
  }
  const englishWords = testStr.match(/\b[A-Z][a-z]{3,}\b/g);
  if (englishWords && englishWords.length > 0) {
    errors.push(`possible English: ${englishWords.join(', ')}`);
  }

  if (errors.length > 0) {
    console.log(`WARN [${theme}]:`);
    errors.forEach(e => console.log(`  - ${e}`));
    allPass = false;
  } else {
    console.log(`PASS [${theme}] title=${title.length}ch desc=${desc.length}ch kw=${kwCount} heading="${heading}"`);
  }
}

console.log(allPass ? '\nAll checks passed!' : '\nSome issues found - review above.');
