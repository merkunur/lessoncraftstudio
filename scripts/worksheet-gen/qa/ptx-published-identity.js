#!/usr/bin/env node
/**
 * qa/ptx-published-identity.js — the Level Set (`ptl`) red line: the 220 PUBLISHED Picture Tracing pages never change while
 * the expansion is built. Hashes every face's page body (build() with no unit) × 11 locales.
 *   node qa/ptx-published-identity.js --write   record the baseline (data/ptx/published-identity.json)
 *   node qa/ptx-published-identity.js           compare; exit 1 on any difference (names the face + locale)
 */
'use strict';
const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const { FACES } = require('../data/b9/picture-tracing.js');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const OUT = path.join(__dirname, '..', 'data', 'ptx', 'published-identity.json');
const load = (id) => { for (const d of ['k', 'g1']) { const dir = path.join(__dirname, '..', 'types', d); const f = fs.readdirSync(dir).find((x) => x.startsWith(id + '-')); if (f) return require(path.join(dir, f)); } throw new Error(id); };
(async () => {
  const got = {};
  for (const [mode, { id }] of Object.entries(FACES)) {
    const spec = load(id);
    // only the word face's page depends on the locale; every other face is hashed once and reused for every locale
    for (const loc of mode === 'picture-and-word' ? LOCS : ['en']) {
      const r = await spec.build.call(spec, { difficulty: 2, locale: loc, unit: null });
      got[id + '|' + loc] = crypto.createHash('sha1').update(r.bodyHtml).digest('hex');
    }
  }
  if (process.argv.includes('--write')) { fs.mkdirSync(path.dirname(OUT), { recursive: true }); fs.writeFileSync(OUT, JSON.stringify(got, null, 1) + '\n'); console.log('baseline written: ' + Object.keys(got).length + ' pages'); return; }
  const base = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  const diff = Object.keys(base).filter((k) => base[k] !== got[k]).concat(Object.keys(got).filter((k) => !(k in base)));
  if (diff.length) { console.log('FAIL — published pages changed: ' + diff.join(', ')); process.exit(1); }
  console.log('PASS — ' + Object.keys(base).length + ' published page bodies identical');
})().catch((e) => { console.error(e); process.exit(1); });
