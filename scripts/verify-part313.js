const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';

const themes = [
  { dir: 'furniture', title: 'Meubels-oefeningen', heading: 'Meubeloefeningen', kw: 10 },
  { dir: 'easter', title: 'Pasen-oefeningen', heading: 'Paasoefeningen', kw: 10 },
  { dir: 'halloween', title: 'Halloween-oefeningen', heading: 'Halloweenoefeningen', kw: 10 },
  { dir: 'xmas', title: 'Kerstmis-oefeningen', heading: 'Kerstoefeningen', kw: 10 },
  { dir: 'winter', title: 'Winter-oefeningen', heading: 'Winteroefeningen', kw: 10 },
  { dir: 'farm', title: 'Boerderij-oefeningen', heading: 'Boerderijoefeningen', kw: 10 },
  { dir: 'ocean', title: 'Oceaan-oefeningen', heading: 'Oceaanoefeningen', kw: 10 },
];

let pass = 0;
let fail = 0;

for (const t of themes) {
  const fp = path.join(base, t.dir, 'nl.ts');
  const content = fs.readFileSync(fp, 'utf8');
  const errors = [];

  const titleMatch = content.match(/^\s+title: '(.*)'/m);
  if (!titleMatch || !titleMatch[1].includes(t.title)) {
    errors.push('title missing or wrong');
  }

  const descMatch = content.match(/^\s+description: '(.*)'/m);
  if (!descMatch || descMatch[1].length < 50) {
    errors.push('description missing or too short');
  }

  const kwMatch = content.match(/^\s+keywords: '(.*)'/m);
  if (!kwMatch) {
    errors.push('keywords missing');
  } else {
    const kwCount = kwMatch[1].split(',').map(s => s.trim()).filter(Boolean).length;
    if (kwCount !== t.kw) {
      errors.push('keywords count ' + kwCount + ' != ' + t.kw);
    }
  }

  const headingMatch = content.match(/^\s+heading: '(.*)'/m);
  if (!headingMatch || !headingMatch[1].includes(t.heading)) {
    errors.push('heading missing or wrong');
  }

  if (errors.length === 0) {
    console.log('PASS: ' + t.dir);
    pass++;
  } else {
    console.log('FAIL: ' + t.dir + ' — ' + errors.join(', '));
    fail++;
  }
}

console.log('\nResult: ' + pass + '/7 PASS, ' + fail + '/7 FAIL');
if (fail > 0) process.exit(1);
