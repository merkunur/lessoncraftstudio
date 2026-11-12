#!/usr/bin/env node
/**
 * SERVER, in deploy.sh before the build: every picture a looks file names (frontend/content/units/looks.<loc>.json,
 * written by scripts/units/build-looks.js on the PC) is on the server where nginx serves it
 * (/var/www/lcs-media/teaching-looks/…, uploaded by scripts/units/upload-looks.sh). A looks file committed without
 * its upload would put broken pictures on every topic page of the language.
 *
 *   node scripts/units/check-looks-served.js [--root=/var/www/lcs-media]
 *   node scripts/units/check-looks-served.js --poison     the check must fail on a name that is not there
 */
'use strict';
const fs = require('fs');
const path = require('path');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const ROOT = arg('root', '/var/www/lcs-media');
const DIR = path.join(__dirname, '..', '..', 'frontend', 'content', 'units');

function missing(files) {
  const out = []; let n = 0;
  for (const f of files) {
    const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
    for (const [grade, set] of Object.entries(j.looks || {})) for (const [kind, it] of Object.entries(set)) {
      n++;
      if (!/^\/teaching-looks\/[a-z]{2}\/[a-z0-9.-]+\.webp$/.test(it.src || '')) { out.push(f + ' grade ' + grade + ' ' + kind + ': "' + it.src + '" is not a teaching-looks address'); continue; }
      if (!(it.width > 0 && it.height > 0) || !it.slug || !it.title) { out.push(f + ' grade ' + grade + ' ' + kind + ': width, height, slug or title missing'); continue; }
      const file = path.join(ROOT, it.src);
      if (!fs.existsSync(file) || fs.statSync(file).size < 1000) out.push(f + ' grade ' + grade + ' ' + kind + ': ' + it.src + ' is not on the server');
    }
  }
  return { out, n };
}

const files = fs.readdirSync(DIR).filter((f) => /^looks\.[a-z]{2}\.json$/.test(f));
if (process.argv.includes('--poison')) {
  // a looks file that names a picture nobody uploaded must be refused
  const tmp = path.join(DIR, 'looks.zz.json');
  fs.writeFileSync(tmp, JSON.stringify({ looks: { 1: { unit: { slug: 'x', title: 'x', src: '/teaching-looks/zz/g1-unit.00000000.webp', width: 640, height: 828 } } } }));
  let caught;
  try { caught = missing(['looks.zz.json']).out.length === 1; } finally { fs.unlinkSync(tmp); }
  console.log(caught ? 'poison caught: a picture that is not on the server is refused' : 'FAIL  the poison was not caught');
  process.exit(caught ? 0 : 1);
}
const { out, n } = missing(files);
for (const m of out) console.log('FAIL  ' + m);
console.log(out.length ? out.length + ' problem(s)' : 'teaching looks: ' + n + ' picture(s) of ' + files.length + ' language(s) are on the server');
process.exit(out.length ? 1 : 0);
