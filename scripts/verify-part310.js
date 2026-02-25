const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';

const checks = [
  { dir: 'animals', title: 'Gratis Dieren-oefeningen voor Kinderen', heading: 'Dierenoefeningen en Werkbladen' },
  { dir: 'food', title: 'Gratis Eten-oefeningen voor Kinderen', heading: 'Eetoefeningen en Werkbladen' },
  { dir: 'transportation', title: 'Gratis Vervoer-oefeningen voor Kinderen', heading: 'Vervoeroefeningen en Werkbladen' },
  { dir: 'nature', title: 'Gratis Natuur-oefeningen voor Kinderen', heading: 'Natuuroefeningen en Werkbladen' },
  { dir: 'school', title: 'Gratis School-oefeningen voor Kinderen', heading: 'Schooloefeningen en Werkbladen' },
  { dir: 'sports', title: 'Gratis Sport-oefeningen voor Kinderen', heading: 'Sportoefeningen en Werkbladen' },
  { dir: 'emotions', title: 'Gratis Emoties-oefeningen voor Kinderen', heading: 'Emotieoefeningen en Werkbladen' },
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
