#!/usr/bin/env node
/**
 * flagship/pools.js: every picture each template of the six flagship makers can show (operator 2026-11-08: "every single
 * image in every single template", the library's own drawings as much as the new ones). For each template and level it
 * builds one page the way the maker does and reads the picture pool the page reports (lib/fl-art.js report → slots.art),
 * plus the units (Color by Number designs, How to Draw lessons) and themes the template offers. Writes
 * out/flagship-check/pools.json: { <maker>: { <template>: { <level>: { pool: [key…], units: [id…], themes: [name…] } } } }
 *   node scripts/makers/flagship/pools.js [--makers=a,b] [--only=K-394,K-285]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const P = require('../gates/lib/maker-pages.js');

const FLAGSHIP = ['dot-to-dot', 'color-by-number', 'coloring-pages', 'find-the-differences', 'how-to-draw', 'picture-tracing'];
const a = P.args();
const makers = a.makers ? String(a.makers).split(',') : FLAGSHIP;
const only = a.only ? new Set(String(a.only).split(',')) : null;
const OUT = path.join(P.REPO, 'out', 'flagship-check');
fs.mkdirSync(OUT, { recursive: true });

const result = {};
let total = 0;
for (const { maker, tj } of P.builtMakers(makers.join(','))) {
  const list = Array.isArray(tj.templates) ? tj.templates : tj;
  result[maker] = {};
  for (const t of list) {
    if (only && !only.has(t.id)) continue;
    const type = P.loadType(t);
    result[maker][t.id] = {};
    for (const difficulty of t.levels) {
      const loc = 'en';
      const units = ((t.units && t.units[loc]) || []).filter((u) => !t.unitLevels || t.unitLevels[u.id] === difficulty).map((u) => u.id);
      const themes = t.themed ? P.themesIn(t, loc) : [];
      const o = { difficulty, theme: themes[0] || null, unit: null, variant: 1 };
      let pool = null, err = null;
      try { const r = P.buildShown(t, type, tj, loc, o); pool = r.slots && r.slots.art ? r.slots.art.pool : null; } catch (e) { err = e.message.slice(0, 160); }
      result[maker][t.id][difficulty] = { pool: pool || [], units, themes, ...(err ? { err } : {}) };
      const n = Math.max((pool || []).length, units.length, themes.length ? 1 : 0, 1);
      total += n;
      console.log(`${maker} ${t.id} L${difficulty}: pool ${(pool || []).length}, units ${units.length}, themes ${themes.length}${err ? ' ERR ' + err : ''}`);
    }
  }
}
fs.writeFileSync(path.join(OUT, 'pools.json'), JSON.stringify(result));
console.log('template x level x picture combinations:', total);
