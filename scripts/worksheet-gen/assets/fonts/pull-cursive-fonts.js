/**
 * One-time vendoring of the school-script CURSIVE fonts for the nt5-F (b6)
 * `cursive-writing` family: Google Fonts "Playwrite" (TypeTogether, OFL-1.1),
 * one per school script. Writes `cursive/<slug>.woff2` + `cursive-fonts.css`
 * (file-relative @font-face rules). The css is NOT part of fonts.css on purpose:
 * only cursive pages load it (components-b6/cursive-writing.js inlines it), so
 * every other page stays byte-identical (the release baseline).
 *
 * Run: node scripts/worksheet-gen/assets/fonts/pull-cursive-fonts.js
 * Idempotent: an existing woff2 is not re-downloaded.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

// script unit -> Google family. The unit ids are the unitAxis values of the family.
const SCRIPTS = [
  { unit: 'us-trad',     family: 'Playwrite US Trad' },
  { unit: 'us-modern',   family: 'Playwrite US Modern' },
  { unit: 'de-va',       family: 'Playwrite DE VA' },
  { unit: 'de-la',       family: 'Playwrite DE LA' },
  { unit: 'de-sas',      family: 'Playwrite DE SAS' },
  { unit: 'mx',          family: 'Playwrite MX' },
  { unit: 'br',          family: 'Playwrite BR' },
  { unit: 'fr-moderne',  family: 'Playwrite FR Moderne' },
  { unit: 'fr-trad',     family: 'Playwrite FR Trad' },
  { unit: 'it-moderna',  family: 'Playwrite IT Moderna' },
  { unit: 'it-trad',     family: 'Playwrite IT Trad' },
  { unit: 'nl',          family: 'Playwrite NL' },
  { unit: 'no',          family: 'Playwrite NO' },
  { unit: 'dk-loopet',   family: 'Playwrite DK Loopet' },
  { unit: 'dk-uloopet',  family: 'Playwrite DK Uloopet' },
];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(url + ' -> ' + res.statusCode)); }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

(async () => {
  const outDir = path.join(__dirname, 'cursive');
  fs.mkdirSync(outDir, { recursive: true });
  const rules = [];
  for (const s of SCRIPTS) {
    // weight 400 (regular) static instance; the family is variable 100-400
    const css = (await get('https://fonts.googleapis.com/css2?family=' + s.family.replace(/ /g, '+') + ':wght@400&display=block')).toString('utf8');
    const urls = [...css.matchAll(/url\((https:[^)]+\.woff2)\)/g)].map((m) => m[1]);
    if (urls.length !== 1) throw new Error(s.family + ': expected ONE woff2 (a single full subset), got ' + urls.length);
    const file = 'playwrite-' + s.unit + '.woff2';
    const dest = path.join(outDir, file);
    if (!fs.existsSync(dest)) {
      fs.writeFileSync(dest, await get(urls[0]));
      console.log('downloaded', file, fs.statSync(dest).size, 'bytes');
    }
    rules.push("@font-face{font-family:'LCS Cursive " + s.unit + "';font-style:normal;font-weight:400;font-display:block;src:url('cursive/" + file + "') format('woff2');}");
  }
  fs.writeFileSync(path.join(__dirname, 'cursive-fonts.css'), rules.join('\n') + '\n', 'utf8');
  fs.writeFileSync(path.join(outDir, 'LICENSE.md'),
    '# Playwrite (TypeTogether) — SIL Open Font License 1.1\n\nThe `playwrite-*.woff2` files are the Google Fonts builds of the Playwrite school-script family ' +
    '(https://github.com/TypeTogether/Playwrite), licensed under the SIL Open Font License, Version 1.1 ' +
    '(https://openfontlicense.org). Renamed only as files; the font data is unmodified. Used by the ' +
    '`cursive-writing` worksheet family (scripts/worksheet-gen, nt5-F).\n', 'utf8');
  console.log('cursive-fonts.css written with', rules.length, 'faces');
})().catch((e) => { console.error(e.message); process.exit(1); });
