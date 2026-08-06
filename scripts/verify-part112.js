const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';

const themes = [
  { dir: 'furniture', name: 'Huonekalut' },
  { dir: 'garden', name: 'Puutarha' },
  { dir: 'halloween', name: 'Halloween' },
  { dir: 'holidays', name: 'Juhlapäivät' },
  { dir: 'household', name: 'Kotitalous' },
  { dir: 'insects', name: 'Hyönteiset' },
  { dir: 'jobs', name: 'Ammatit' },
  { dir: 'music', name: 'Musiikki' },
  { dir: 'nature', name: 'Luonto' },
  { dir: 'numbers', name: 'Numerot' },
];

let allPass = true;

for (const t of themes) {
  const fp = path.join(base, t.dir, 'fi.ts');
  const raw = fs.readFileSync(fp, 'utf8');

  // Extract field values (handle both escaped and actual Unicode)
  const titleMatch = raw.match(/^\s+title:\s*'(.+)',\s*$/m);
  const descMatch = raw.match(/^\s+description:\s*'(.+)',\s*$/m);
  const kwMatch = raw.match(/^\s+keywords:\s*'(.+)',\s*$/m);
  const headingMatch = raw.match(/^\s+heading:\s*'(.+)',\s*$/m);

  if (!titleMatch || !descMatch || !kwMatch || !headingMatch) {
    console.log(`FAIL [${t.dir}]: Could not extract all fields`);
    allPass = false;
    continue;
  }

  // Decode Unicode escapes for length checking
  function decode(s) {
    return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }

  const title = decode(titleMatch[1]);
  const desc = decode(descMatch[1]);
  const kw = decode(kwMatch[1]);
  const heading = decode(headingMatch[1]);

  const errors = [];

  // Title length: 40-70
  if (title.length < 40 || title.length > 70) {
    errors.push(`title length ${title.length} (want 40-70): "${title}"`);
  }

  // Description length: 140-160
  if (desc.length < 140 || desc.length > 160) {
    errors.push(`desc length ${desc.length} (want 140-160): "${desc}"`);
  }

  // Keywords: exactly 10
  const kwCount = kw.split(',').map(s => s.trim()).filter(Boolean).length;
  if (kwCount !== 10) {
    errors.push(`keywords count ${kwCount} (want 10)`);
  }

  // Heading differs from title (without brand)
  const titleWithoutBrand = title.replace(/\s*\|\s*LessonCraftStudio$/, '');
  if (heading === titleWithoutBrand) {
    errors.push(`heading same as title (without brand)`);
  }

  // No "Ilmaiset" in title
  if (title.includes('Ilmaiset') || title.includes('ilmaiset')) {
    errors.push(`title contains "Ilmaiset"`);
  }

  // No "Luo tulostettavia" in description
  if (desc.includes('Luo tulostettavia')) {
    errors.push(`desc contains "Luo tulostettavia"`);
  }

  if (errors.length > 0) {
    console.log(`FAIL [${t.dir}] (${t.name}):`);
    errors.forEach(e => console.log(`  - ${e}`));
    allPass = false;
  } else {
    console.log(`PASS [${t.dir}] title=${title.length}ch desc=${desc.length}ch kw=${kwCount} heading="${heading.substring(0, 40)}..."`);
  }
}

console.log(allPass ? '\nAll 10 themes PASSED!' : '\nSome themes FAILED - check above.');
