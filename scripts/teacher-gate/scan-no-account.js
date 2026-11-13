#!/usr/bin/env node
/**
 * Where does a text of the site still say that playing, printing or downloading needs NO ACCOUNT?
 *
 * Since 2026-11-12 nothing plays without a free account with a confirmed e-mail (lib/quota.ts), and a download needs
 * one too. This scan reads every language: the per-language templates in code (lib, app, components, config) and
 * every message and content file whose name ends in the language code (no-account-lib.js).
 *
 *   node scripts/teacher-gate/scan-no-account.js                 the OPEN sentences by surface (exit 1 when there is one)
 *   node scripts/teacher-gate/scan-no-account.js --all           also the true ones and the ones no page renders
 *   node scripts/teacher-gate/scan-no-account.js --locs=de,fr    only these languages (default: all eleven)
 *   node scripts/teacher-gate/scan-no-account.js --dump=<file>   every sentence as JSON [{ file, key, loc, text, cls }]
 *
 * What a visitor really reads is measured on the live pages by scan-no-account-live.js.
 */
'use strict';
const fs = require('fs');
const { collect, LOCALES } = require('./no-account-lib.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const LOCS = arg('locs', LOCALES.join(',')).split(',');
const found = collect(LOCS);
if (arg('dump', '')) { fs.writeFileSync(arg('dump', ''), JSON.stringify(found, null, 1)); console.log(found.length + ' sentence(s) → ' + arg('dump', '')); process.exit(0); }
const shown = found.filter((h) => process.argv.includes('--all') || h.cls === 'open');
const by = new Map();
for (const h of shown) {
  const k = h.file.replace(/([./_-])[a-z]{2}\.json$/, '$1<loc>.json') + (h.key.startsWith('line ') ? '' : ' :: ' + h.key.split('.')[0]) + (process.argv.includes('--all') ? '  [' + h.cls + ']' : '');
  const e = by.get(k) || { n: 0, locs: {} }; e.n++; e.locs[h.loc] = (e.locs[h.loc] || 0) + 1; by.set(k, e);
}
for (const [k, e] of [...by].sort((a, b) => b[1].n - a[1].n)) console.log(String(e.n).padStart(5) + '  ' + k + '   (' + Object.entries(e.locs).map(([l, n]) => l + ' ' + n).join(', ') + ')');
const n = (c) => found.filter((h) => h.cls === c).length;
console.log('no account: ' + n('open') + ' open sentence(s), ' + n('true') + ' true, ' + n('notRendered') + ' in files no page renders (' + LOCS.join(', ') + ')');
process.exit(n('open') ? 1 : 0);
