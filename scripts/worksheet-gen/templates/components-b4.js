/**
 * components-b4.js — the nt10-D component namespace (README: new components
 * only; templates/components.js and components-b2.js are NEVER edited).
 * Every b4 family keeps ITS OWN file under templates/components-b4/<key>.js
 * (type-scoped, so twenty builders never edit one file); this module merges
 * them into one namespace and refuses a duplicate export name (two families
 * defining `cutLines` differently would silently shadow each other).
 * Consumers: `const C4 = require('../../templates/components-b4.js')`.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'components-b4');
const out = {};
const owner = {};
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.js')).sort()) {
  const mod = require(path.join(DIR, f));
  for (const [name, fn] of Object.entries(mod)) {
    if (owner[name]) throw new Error('components-b4: "' + name + '" exported by both ' + owner[name] + ' and ' + f);
    owner[name] = f;
    out[name] = fn;
  }
}
out.__owner = owner;
module.exports = out;
