const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';

const themes = [
  'summer', 'superheroes', 'toys', 'transportation', 'travel',
  'vegetables', 'weather', 'winter', 'xmas', 'zoo'
];

let allPass = true;

for (const dir of themes) {
  const fp = path.join(base, dir, 'fi.ts');
  const raw = fs.readFileSync(fp, 'utf8');

  // Extract field values (handle both escaped and unicode)
  const titleM = raw.match(/^\s+title:\s*'(.+)',\s*$/m);
  const descM = raw.match(/^\s+description:\s*'(.+)',\s*$/m);
  const kwM = raw.match(/^\s+keywords:\s*'(.+)',\s*$/m);
  const headM = raw.match(/^\s+heading:\s*'(.+)',\s*$/m);

  if (!titleM || !descM || !kwM || !headM) {
    console.log(`FAIL [${dir}]: Could not extract all fields`);
    allPass = false;
    continue;
  }

  // Decode unicode escapes for length measurement
  function decode(s) {
    return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }

  const title = decode(titleM[1]);
  const desc = decode(descM[1]);
  const kw = decode(kwM[1]);
  const heading = decode(headM[1]);
  const kwCount = kw.split(',').map(s => s.trim()).filter(Boolean).length;

  const errors = [];

  // Title: 40-70 chars
  if (title.length < 40 || title.length > 70) {
    errors.push(`title length ${title.length} (want 40-70)`);
  }

  // Description: 120-160 chars (relaxed lower bound)
  if (desc.length < 120 || desc.length > 160) {
    errors.push(`desc length ${desc.length} (want 120-160)`);
  }

  // Keywords: exactly 10
  if (kwCount !== 10) {
    errors.push(`keywords count ${kwCount} (want 10)`);
  }

  // Heading differs from title (without brand)
  const titleNoBrand = title.replace(/\s*\|\s*LessonCraftStudio$/, '');
  if (heading === titleNoBrand) {
    errors.push('heading same as title (without brand)');
  }

  // No old patterns
  if (title.includes('Ilmaiset')) errors.push('title still has "Ilmaiset"');
  if (desc.includes('Luo tulostettavia')) errors.push('desc still has "Luo tulostettavia"');

  if (errors.length > 0) {
    console.log(`FAIL [${dir}]: ${errors.join('; ')}`);
    allPass = false;
  } else {
    console.log(`PASS [${dir}]: title=${title.length}c, desc=${desc.length}c, kw=${kwCount}, heading="${heading.substring(0, 40)}..."`);
  }
}

console.log(allPass ? '\nAll 10 themes PASSED!' : '\nSome themes FAILED - see above.');
