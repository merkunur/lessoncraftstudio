const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';

const checks = [
  { dir: 'body', title: 'Gratis Lichaam-oefeningen voor Kinderen', heading: 'Lichaamsoefeningen en Werkbladen' },
  { dir: 'clothing', title: 'Gratis Kleding-oefeningen voor Kinderen', heading: 'Kledingoefeningen en Werkbladen' },
  { dir: 'household', title: 'Gratis Huishouden-oefeningen voor Kinderen', heading: 'Huishoudoefeningen en Werkbladen' },
  { dir: 'toys', title: 'Gratis Speelgoed-oefeningen voor Kinderen', heading: 'Speelgoedoefeningen en Werkbladen' },
  { dir: 'music', title: 'Gratis Muziek-oefeningen voor Kinderen', heading: 'Muziekoefeningen en Werkbladen' },
  { dir: 'jobs', title: 'Gratis Beroepen-oefeningen voor Kinderen', heading: 'Beroepsoefeningen en Werkbladen' },
  { dir: 'space', title: 'Gratis Ruimte-oefeningen voor Kinderen', heading: 'Ruimteoefeningen en Werkbladen' },
];

let pass = 0;
let fail = 0;

for (const c of checks) {
  const fp = path.join(base, c.dir, 'nl.ts');
  const content = fs.readFileSync(fp, 'utf8');
  const errors = [];

  // Check title contains expected substring
  if (!content.includes(c.title)) errors.push('title missing');
  // Check heading
  if (!content.includes(c.heading)) errors.push('heading missing');
  // Check description exists and is non-empty
  const descMatch = content.match(/^\s+description: '(.+)',$/m);
  if (!descMatch) errors.push('description missing');
  // Check keywords count = 10
  const kwMatch = content.match(/^\s+keywords: '(.+)',$/m);
  if (!kwMatch) {
    errors.push('keywords missing');
  } else {
    const count = kwMatch[1].split(',').map(s => s.trim()).filter(Boolean).length;
    if (count !== 10) errors.push('keywords count=' + count + ' (expected 10)');
  }

  if (errors.length === 0) {
    console.log('PASS: ' + c.dir + '/nl.ts');
    pass++;
  } else {
    console.log('FAIL: ' + c.dir + '/nl.ts - ' + errors.join(', '));
    fail++;
  }
}

console.log('\n' + pass + '/' + checks.length + ' PASS, ' + fail + ' FAIL');
if (fail > 0) process.exit(1);
