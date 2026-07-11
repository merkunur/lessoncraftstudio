#!/usr/bin/env node
/**
 * One-off: apply stripCatalogChrome to already-saved hosted worksheet files
 * (those saved before the strip landed). Injects the hide-style + removes any
 * static suggestions markup. Idempotent (marker-guarded). Run on Hetzner:
 *   node scripts/ops/clean-existing-hosted.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = process.env.HOSTED_WORKSHEETS_DIR || '/var/www/lcs-media/hosted-worksheets';

function stripCatalogChrome(html) {
  let out = html
    .replace(/<section class="lcs-deckend-suggestions"[\s\S]*?<\/section>/gi, '')
    .replace(/<aside class="lcs-end-deck"[\s\S]*?<\/aside>/gi, '')
    .replace(/<aside class="lcs-deckend-suggestions"[\s\S]*?<\/aside>/gi, '');
  if (out.indexOf('lcs-hosted-hide') === -1) {
    const style =
      '<style id="lcs-hosted-hide">.lcs-deckend-suggestions,.lcs-deckend,.lcs-end-deck{display:none!important}</style>';
    if (/<\/head>/i.test(out)) out = out.replace(/<\/head>/i, style + '</head>');
    else out = style + out;
  }
  return out;
}

let n = 0, changed = 0;
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith('.html')) continue;
  n++;
  const p = path.join(DIR, f);
  const html = fs.readFileSync(p, 'utf8');
  const out = stripCatalogChrome(html);
  if (out !== html) {
    const tmp = p + '.tmp';
    fs.writeFileSync(tmp, out);
    fs.renameSync(tmp, p);
    changed++;
    console.log('cleaned ' + f);
  }
}
console.log('scanned ' + n + ' files, cleaned ' + changed);
