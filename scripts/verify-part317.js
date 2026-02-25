const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';

// All 50 NL theme hubs — directory + partial title/heading for validation
const themes = [
  { dir: 'alphabet', kw: 10 },
  { dir: 'animals', kw: 10 },
  { dir: 'birds', kw: 10 },
  { dir: 'birthday', kw: 10 },
  { dir: 'body', kw: 10 },
  { dir: 'camping', kw: 10 },
  { dir: 'circus', kw: 10 },
  { dir: 'clothing', kw: 10 },
  { dir: 'colors', kw: 10 },
  { dir: 'construction', kw: 10 },
  { dir: 'cooking', kw: 10 },
  { dir: 'dinosaurs', kw: 10 },
  { dir: 'easter', kw: 10 },
  { dir: 'emotions', kw: 10 },
  { dir: 'fairy-tales', kw: 10 },
  { dir: 'farm', kw: 10 },
  { dir: 'flowers', kw: 10 },
  { dir: 'food', kw: 10 },
  { dir: 'forest', kw: 10 },
  { dir: 'fruits', kw: 10 },
  { dir: 'furniture', kw: 10 },
  { dir: 'garden', kw: 10 },
  { dir: 'halloween', kw: 10 },
  { dir: 'holidays', kw: 10 },
  { dir: 'household', kw: 10 },
  { dir: 'insects', kw: 10 },
  { dir: 'jobs', kw: 10 },
  { dir: 'music', kw: 10 },
  { dir: 'nature', kw: 10 },
  { dir: 'numbers', kw: 10 },
  { dir: 'ocean', kw: 10 },
  { dir: 'pets', kw: 10 },
  { dir: 'pirates', kw: 10 },
  { dir: 'robots', kw: 10 },
  { dir: 'school', kw: 10 },
  { dir: 'seasons', kw: 10 },
  { dir: 'shapes', kw: 10 },
  { dir: 'space', kw: 10 },
  { dir: 'sports', kw: 10 },
  { dir: 'spring', kw: 10 },
  { dir: 'summer', kw: 10 },
  { dir: 'superheroes', kw: 10 },
  { dir: 'toys', kw: 10 },
  { dir: 'transportation', kw: 10 },
  { dir: 'travel', kw: 10 },
  { dir: 'vegetables', kw: 10 },
  { dir: 'weather', kw: 10 },
  { dir: 'winter', kw: 10 },
  { dir: 'xmas', kw: 10 },
  { dir: 'zoo', kw: 10 },
];

let pass = 0;
let fail = 0;

for (const t of themes) {
  const fp = path.join(base, t.dir, 'nl.ts');
  const content = fs.readFileSync(fp, 'utf8');
  const errors = [];

  // Check title contains LessonCraftStudio and "oefeningen" pattern
  const titleMatch = content.match(/^\s+title: '(.*)'/m);
  if (!titleMatch || !titleMatch[1].includes('LessonCraftStudio')) {
    errors.push('title missing or no LessonCraftStudio');
  } else if (!titleMatch[1].includes('oefeningen') && !titleMatch[1].includes('Oefeningen')) {
    errors.push('title missing "oefeningen" pattern');
  }

  // Check description is substantial
  const descMatch = content.match(/^\s+description: '(.*)'/m);
  if (!descMatch || descMatch[1].length < 80) {
    errors.push('description missing or too short (' + (descMatch ? descMatch[1].length : 0) + ' chars)');
  }

  // Check keywords count = 10
  const kwMatch = content.match(/^\s+keywords: '(.*)'/m);
  if (!kwMatch) {
    errors.push('keywords missing');
  } else {
    const kwCount = kwMatch[1].split(',').map(s => s.trim()).filter(Boolean).length;
    if (kwCount !== t.kw) {
      errors.push('keywords count ' + kwCount + ' != ' + t.kw);
    }
  }

  // Check heading exists and is substantial
  const headingMatch = content.match(/^\s+heading: '(.*)'/m);
  if (!headingMatch || headingMatch[1].length < 10) {
    errors.push('heading missing or too short');
  }

  if (errors.length === 0) {
    console.log('PASS: ' + t.dir);
    pass++;
  } else {
    console.log('FAIL: ' + t.dir + ' — ' + errors.join(', '));
    fail++;
  }
}

console.log('\nResult: ' + pass + '/50 PASS, ' + fail + '/50 FAIL');
if (fail > 0) process.exit(1);
