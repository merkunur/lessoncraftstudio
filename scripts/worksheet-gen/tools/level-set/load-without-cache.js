'use strict';
// Load the whole type registry the way the server does: with no picture cache. Any factory that reaches for the
// cache while it loads throws here.  usage: node load-without-cache.js   (run from scripts/worksheet-gen)
const path = require('path');
const platform = require(path.resolve('lib/platform/index.js'));
const real = platform.readJson;
platform.readJson = (p) => { if (/cache[\/]manifest\.json$/.test(String(p))) { const e = new Error("ENOENT: no such file or directory, open '" + p + "' (simulated: the server has no picture cache)"); e.code = 'ENOENT'; throw e; } return real(p); };
const fs = require('fs');
const realExists = fs.existsSync;
fs.existsSync = (p) => (/cache[\/]manifest\.json$/.test(String(p)) ? false : realExists(p));
let bad = 0, n = 0;
for (const dir of ['types/k', 'types/g1', 'types/g2', 'types/g3']) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
    n += 1;
    try { require(path.resolve(dir, f)); } catch (e) { bad += 1; if (bad <= 12) console.log('FAIL ' + dir + '/' + f + ' :: ' + String(e.message).split('\n')[0].slice(0, 160)); }
  }
}
console.log(n + ' type files loaded without the picture cache; ' + bad + ' failed');
process.exit(bad ? 1 : 0);
