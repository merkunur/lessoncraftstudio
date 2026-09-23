/**
 * components-b6.js — the nt5-F component namespace (README: new components
 * only; templates/components.js and components-b2.js are NEVER edited).
 * Every b6 family keeps ITS OWN file under templates/components-b6/<key>.js
 * (type-scoped, so twenty builders never edit one file); this module merges
 * them into one namespace and refuses a duplicate export name (two families
 * defining `cutLines` differently would silently shadow each other).
 * Consumers: `const C6 = require('../../templates/components-b6.js')`.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'components-b6');
const out = {};
const owner = {};
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.js')).sort()) {
  const mod = require(path.join(DIR, f));
  for (const [name, fn] of Object.entries(mod)) {
    if (owner[name]) throw new Error('components-b6: "' + name + '" exported by both ' + owner[name] + ' and ' + f);
    owner[name] = f;
    out[name] = fn;
  }
}
out.__owner = owner;
module.exports = out;
