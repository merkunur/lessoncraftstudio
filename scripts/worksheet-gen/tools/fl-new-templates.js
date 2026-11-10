#!/usr/bin/env node
/** fl-new-templates.js — writes one type file per row of data/fl/new-templates.js (docs/makers/FLAGSHIP.md). Safe to run again. */
'use strict';
const fs = require('fs'); const path = require('path');
const { G, F } = require('../data/fl/new-templates.js');
const dirOf = (id) => path.join(__dirname, '..', 'types', id.startsWith('K-') ? 'k' : id.slice(0, 2).toLowerCase());
const write = (row, factory, from) => {
  const [id, slug, type, grade, mode, unit, title, instruction, extra] = row;
  const file = path.join(dirOf(id), `${id}-${slug}.js`);
  const body = `/**\n * ${id} — ${title} (flagship makers, docs/makers/FLAGSHIP.md; ${from}, mode ${mode}). Written by tools/fl-new-templates.js from data/fl/new-templates.js.\n */\n'use strict';\nconst { ${factory} } = require('../_shared/${from}');\n\nmodule.exports = ${factory}({\n  id: ${JSON.stringify(id)}, slug: ${JSON.stringify(slug)}, exerciseType: ${JSON.stringify(type)}, gradeBand: ${JSON.stringify(grade)}, mode: ${JSON.stringify(mode)}, unit: ${JSON.stringify(unit)},${extra ? ' ' + Object.entries(extra).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ') + ',' : ''}\n  i18n: { en: { title: ${JSON.stringify(title)}, instruction: ${JSON.stringify(instruction)} } },\n});\n`;
  fs.writeFileSync(file, body);
};
for (const r of G) write(r, 'makeGlyphTask', 'glyph-tasks.js');
for (const r of F) write(r, 'makeFlagship', 'flagship-new.js');
console.log('written', G.length + F.length);
