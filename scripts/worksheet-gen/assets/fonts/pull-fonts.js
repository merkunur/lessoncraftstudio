/**
 * One-time font vendoring for the worksheet generator.
 * Downloads Baloo 2 + Nunito woff2 (latin + latin-ext subsets, the weights the
 * page shell uses) from Google Fonts (OFL-licensed) and writes fonts.css with
 * file-relative @font-face rules for deterministic file:// rendering.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const FAMILIES = [
  { css: 'Baloo+2:wght@500;600;700', family: 'Baloo 2', slug: 'baloo2' },
  { css: 'Nunito:wght@400;600;700;800', family: 'Nunito', slug: 'nunito' },
];
const SUBSETS = ['latin', 'latin-ext'];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode !== 200) return reject(new Error(url + ' -> ' + res.statusCode));
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

(async () => {
  const outDir = __dirname;
  const faceRules = [];
  for (const fam of FAMILIES) {
    const css = (await get('https://fonts.googleapis.com/css2?family=' + fam.css + '&display=block')).toString('utf8');
    // Blocks look like: /* latin-ext */ @font-face { font-family:'X'; font-style: normal; font-weight: 500; src: url(...) ...; unicode-range: ...; }
    const blockRe = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
    let m;
    while ((m = blockRe.exec(css)) !== null) {
      const subset = m[1];
      if (!SUBSETS.includes(subset)) continue;
      const body = m[2];
      const weight = (body.match(/font-weight:\s*(\d+)/) || [])[1];
      const url = (body.match(/url\((https:[^)]+\.woff2)\)/) || [])[1];
      const range = (body.match(/unicode-range:\s*([^;]+);/) || [])[1];
      if (!weight || !url) continue;
      const file = fam.slug + '-' + weight + '-' + subset + '.woff2';
      const dest = path.join(outDir, file);
      if (!fs.existsSync(dest)) {
        fs.writeFileSync(dest, await get(url));
        console.log('downloaded', file, fs.statSync(dest).size, 'bytes');
      }
      faceRules.push(
        '@font-face{font-family:\'' + fam.family + '\';font-style:normal;font-weight:' + weight +
        ';font-display:block;src:url(\'' + file + '\') format(\'woff2\');unicode-range:' + range + ';}'
      );
    }
  }
  fs.writeFileSync(path.join(outDir, 'fonts.css'), faceRules.join('\n') + '\n', 'utf8');
  console.log('fonts.css written with', faceRules.length, 'face rules');
})();
