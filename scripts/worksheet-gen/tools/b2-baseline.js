#!/usr/bin/env node
/**
 * b2-baseline.js --capture | --check
 *
 * Byte-identity harness for the nt20-B batch: hashes the BUILT body html of a
 * fixed set of already-published coordinates (nt20 base types, nt20-VAR faces
 * that share primitives/components/data with the new batch, lowercase tracing)
 * across themes × difficulties × locales. `--capture` records the baseline
 * BEFORE any shared edit; `--check` recomputes and reports every drift.
 * A drift means a shared file (components.js, _tokens.js, color-words.js,
 * trace-path.js, a _shared factory) changed the output of a LIVE deck — which
 * this batch must never do (all base edits are additive-with-fallback).
 *
 * Pure build() hashing — no browser, ~seconds. Stores to out/b2-baseline.json.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { loadType } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { resolveStrings } = require('../i18n/strings.js');

const OUT = path.join(__dirname, '..', 'out', 'b2-baseline.json');
const TYPES = [
  // nt20 base 20
  'K-236','K-237','K-238','K-239','K-240','K-241','K-242','K-243',
  'G1-208','G1-209','G1-210','G1-211','G1-212','G1-213',
  'G2-251','G2-252','G2-253','G2-254','G3-357','G3-358',
  // nt20-VAR faces on shared surfaces
  'K-259','K-265','K-266','K-267','K-269','K-277','G1-227','G1-232','G1-238','G1-241','G2-268','G2-269','G3-369',
  // lowercase family
  'K-278','K-283',
  // legacy consumers of components/lanes/color-words/coins/number-line
  'K-004','K-014','G1-118','G1-120','G1-129','G2-235','G3-317','K-042','K-225','K-231',
];
const THEMES = ['animals', 'fruits'];
const LOCALES = ['en', 'de', 'fi'];
const DIFFS = [1, 2, 3];

async function computeAll() {
  const res = {};
  for (const id of TYPES) {
    const type = loadType(id);
    const themes = type.themeAxis && type.themeAxis.applicable ? THEMES : [null];
    for (const theme of themes) for (const difficulty of DIFFS) for (const locale of LOCALES) {
      const key = `${id}|${theme || 'nothm'}|d${difficulty}|${locale}`;
      try {
        const rng = makeRng(instanceSeed({ typeId: id, theme, difficulty, seedEpoch: 1 }));
        const built = await type.build({ theme, difficulty, locale }, { rng });
        const strings = resolveStrings(id, locale, type);
        const h = crypto.createHash('sha1').update(built.bodyHtml).update('|').update(JSON.stringify(strings)).digest('hex');
        res[key] = h;
      } catch (e) {
        res[key] = 'ERR:' + String(e.message).slice(0, 80);
      }
    }
  }
  return res;
}

(async () => {
  const mode = process.argv[2];
  if (mode !== '--capture' && mode !== '--check') { console.error('usage: b2-baseline.js --capture|--check'); process.exit(2); }
  const now = await computeAll();
  const n = Object.keys(now).length;
  if (mode === '--capture') {
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify(now, null, 1) + '\n');
    const errs = Object.entries(now).filter(([, v]) => v.startsWith('ERR:'));
    console.log(`captured ${n} coordinates → ${OUT} (${errs.length} build errors)`);
    errs.slice(0, 10).forEach(([k, v]) => console.log('  ' + k + ' ' + v));
    process.exit(0);
  }
  if (!fs.existsSync(OUT)) { console.error('no baseline captured'); process.exit(2); }
  const base = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  const drift = Object.keys(base).filter((k) => base[k] !== now[k]);
  const missing = Object.keys(base).filter((k) => !(k in now));
  console.log(`checked ${n} coordinates: ${drift.length} drifted, ${missing.length} missing`);
  drift.slice(0, 40).forEach((k) => console.log('  DRIFT ' + k));
  process.exit(drift.length || missing.length ? 1 : 0);
})();
