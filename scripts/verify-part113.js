const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const BS = String.fromCharCode(92);

const themes = [
  'ocean', 'pets', 'pirates', 'robots', 'school',
  'seasons', 'shapes', 'space', 'sports', 'spring'
];

let allPass = true;

for (const dir of themes) {
  const fp = path.join(base, dir, 'fi.ts');
  const raw = fs.readFileSync(fp, 'utf8');
  const usesEscapes = raw.includes(BS + 'u00');

  function decode(s) {
    if (!usesEscapes) return s;
    return s.replace(/\\u([0-9a-f]{4})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }

  const titleM = raw.match(/^\s+title:\s*'(.+)',\s*$/m);
  const descM = raw.match(/^\s+description:\s*'(.+)',\s*$/m);
  const kwM = raw.match(/^\s+keywords:\s*'(.+)',\s*$/m);
  const headM = raw.match(/^\s+heading:\s*'(.+)',\s*$/m);

  if (!titleM || !descM || !kwM || !headM) {
    console.log(`FAIL ${dir}: could not extract all 4 fields`);
    allPass = false;
    continue;
  }

  const title = decode(titleM[1]);
  const desc = decode(descM[1]);
  const kw = decode(kwM[1]);
  const heading = decode(headM[1]);

  const errors = [];

  // Title length 40-70
  if (title.length < 40 || title.length > 70)
    errors.push(`title length ${title.length} (want 40-70): "${title}"`);

  // Description length 140-160
  if (desc.length < 140 || desc.length > 160)
    errors.push(`desc length ${desc.length} (want 140-160): "${desc}"`);

  // Keywords: exactly 10
  const kwCount = kw.split(',').map(s => s.trim()).filter(Boolean).length;
  if (kwCount !== 10)
    errors.push(`keywords count ${kwCount} (want 10)`);

  // Heading differs from title (without brand)
  const titleNoBrand = title.replace(/ \| LessonCraftStudio$/, '');
  if (heading === titleNoBrand)
    errors.push(`heading identical to title (without brand)`);

  // No "Ilmaiset" in title
  if (title.includes('Ilmaiset'))
    errors.push(`title contains "Ilmaiset"`);

  // No "Luo tulostettavia" in description
  if (desc.includes('Luo tulostettavia'))
    errors.push(`desc contains "Luo tulostettavia"`);

  if (errors.length === 0) {
    console.log(`PASS ${dir}: title=${title.length}c desc=${desc.length}c kw=${kwCount} heading="${heading.substring(0, 40)}..."`);
  } else {
    allPass = false;
    console.log(`FAIL ${dir}:`);
    errors.forEach(e => console.log(`  - ${e}`));
  }
}

console.log(allPass ? '\nAll 10 themes PASSED!' : '\nSome themes FAILED - fix needed.');
