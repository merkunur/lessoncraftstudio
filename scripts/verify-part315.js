const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';

const themes = [
  { dir: 'zoo', title: 'Dierentuin-oefeningen', heading: 'Dierentuinoefeningen' },
  { dir: 'garden', title: 'Tuin-oefeningen', heading: 'Tuinoefeningen' },
  { dir: 'camping', title: 'Kamperen-oefeningen', heading: 'Kampeeroefeningen' },
  { dir: 'pirates', title: 'Piraten-oefeningen', heading: 'Piratenoefeningen' },
  { dir: 'fairy-tales', title: 'Sprookjes-oefeningen', heading: 'Sprookjesoefeningen' },
  { dir: 'robots', title: 'Robots-oefeningen', heading: 'Robotoefeningen' },
  { dir: 'superheroes', title: 'Superhelden-oefeningen', heading: 'Superheldenoefeningen' },
];

let pass = 0;
let fail = 0;

for (const t of themes) {
  const fp = path.join(base, t.dir, 'nl.ts');
  const content = fs.readFileSync(fp, 'utf8');
  const errors = [];

  // Check title contains expected substring
  const titleMatch = content.match(/^\s+title:\s*'(.+)',?\r?$/m);
  if (!titleMatch || !titleMatch[1].includes(t.title)) {
    errors.push('title missing or wrong');
  }

  // Check description exists and is non-empty
  const descMatch = content.match(/^\s+description:\s*'(.+)',?\r?$/m);
  if (!descMatch || descMatch[1].length < 20) {
    errors.push('description missing or too short');
  }

  // Check keywords count = 10
  const kwMatch = content.match(/^\s+keywords:\s*'(.+)',?\r?$/m);
  if (!kwMatch) {
    errors.push('keywords missing');
  } else {
    const count = kwMatch[1].split(',').length;
    if (count !== 10) {
      errors.push('keywords count = ' + count + ' (expected 10)');
    }
  }

  // Check heading contains expected substring
  const headMatch = content.match(/^\s+heading:\s*'(.+)',?\r?$/m);
  if (!headMatch || !headMatch[1].includes(t.heading)) {
    errors.push('heading missing or wrong');
  }

  if (errors.length === 0) {
    console.log('PASS: ' + t.dir);
    pass++;
  } else {
    console.log('FAIL: ' + t.dir + ' - ' + errors.join(', '));
    fail++;
  }
}

console.log('\nResults: ' + pass + '/7 PASS, ' + fail + '/7 FAIL');
if (fail > 0) process.exit(1);
