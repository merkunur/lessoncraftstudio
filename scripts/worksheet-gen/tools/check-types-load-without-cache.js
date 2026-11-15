#!/usr/bin/env node
/**
 * Every page type must LOAD on a machine without the picture cache (scripts/worksheet-gen/cache is not in git: the
 * server has none, and its content gates require every type module). A type that looks a picture up while its module
 * loads crashes there and stops the deploy (2026-11-15: types/_shared/fact-text-k.js checked its bank's pictures at
 * load). On the PC the cache exists, so no other check sees it.
 *
 *   node scripts/worksheet-gen/tools/check-types-load-without-cache.js            every type
 *   node scripts/worksheet-gen/tools/check-types-load-without-cache.js --poison   proves the check can fail
 *
 * How: in a child process the cache folder is made unreadable (fs calls on a path under cache/ behave as on a machine
 * that has no such folder), then every type module is required.
 */
'use strict';
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..');

if (process.argv.includes('--child')) {
  const fs = require('fs');
  const hidden = (p) => typeof p === 'string' && /worksheet-gen[\\/]cache([\\/]|$)/.test(p);
  const gone = (p) => Object.assign(new Error("ENOENT: no such file or directory, open '" + p + "'"), { code: 'ENOENT' });
  for (const fn of ['readFileSync', 'readdirSync', 'statSync', 'openSync']) { const real = fs[fn]; fs[fn] = function (p, ...rest) { if (hidden(p)) throw gone(p); return real.call(fs, p, ...rest); }; }
  { const real = fs.existsSync; fs.existsSync = (p) => (hidden(p) ? false : real.call(fs, p)); }
  if (process.argv.includes('--poison')) require(path.join(WG, 'image-cache', 'resolve.js')).manifest();   // what a type must not do at load
  const types = require(path.join(WG, 'lib', 'load-types.js')).loadAllTypes();
  console.log('loaded ' + types.length + ' types without the picture cache');
} else {
  const poison = process.argv.includes('--poison');
  const r = spawnSync(process.execPath, [__filename, '--child', ...(poison ? ['--poison'] : [])], { encoding: 'utf8' });
  const out = ((r.stdout || '') + (r.stderr || '')).trim();
  if (poison) {
    if (r.status === 0) { console.error('FAIL  the check did not notice a module that reads the cache while it loads'); process.exit(1); }
    console.log('poison: a module that reads the cache while it loads is caught');
    process.exit(0);
  }
  if (r.status !== 0) { console.error('FAIL  a page type does not load without the picture cache (the server has none):\n' + out.split('\n').filter((l) => /Error|at Object|types[\\/]/.test(l)).slice(0, 8).join('\n')); process.exit(1); }
  console.log(out.split('\n').pop());
}
