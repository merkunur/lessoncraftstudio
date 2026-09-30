// Render probe for the Rhyming Words Level Set: every page × level × locale × a few copies through the real print
// pipeline (verify + lints), and (--interactive) the screen version + the answer key (render-instance measures every
// key) + the oracle, which must reproduce the page's own answer on every screen item.
//   node tools/level-set/probe-rhy-render.js <outDir> <locs> <copies e.g. 1,2,3> [ids] [--interactive] [--levels=1,2,3]
// Copy v builds with unit = the locale's (v·7)-th class (v <= 1 → no unit) and variant v + 1; copy 0 IS the published page.
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../../render/render-instance.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
const { loadType } = require('../../lib/load-types.js');
const OUT = process.argv[2] || path.join(__dirname, '..', '..', 'out', 'probe-rhy');
const LOCS = (process.argv[3] || 'en').split(',');
const COPIES = (process.argv[4] || '1').split(',').map(Number);
const ONLY = process.argv[5] && !process.argv[5].startsWith('--') ? process.argv[5].split(',') : null;
const INTER = process.argv.includes('--interactive');
const LEVELS = ((process.argv.find((a) => a.startsWith('--levels=')) || '--levels=1,2,3').slice(9)).split(',').map(Number);
const IS = require('../../i18n/interactive-instructions.json')['rhyming-words'] || {};
const IDS = ['G1-309', 'K-352', 'G1-343', 'G1-344', 'G1-345', 'G1-346'];
(async () => {
  const b = await puppeteer.launch(); const page = await b.newPage(); let bad = 0, n = 0, ref = 0;
  for (const id of IDS) {
    if (ONLY && !ONLY.includes(id)) continue;
    const type = loadType(id);
    for (const lv of LEVELS) for (const loc of LOCS) for (const v of COPIES) {
      const units = (type.unitAxis && type.unitAxis.applicable !== false && type.unitAxis.units(loc)) || [];
      const unit = v <= 1 || !units.length ? null : units[(v * 7) % units.length];   // copy 0 = the published coordinate (variant 1, no unit)
      const base = `${id}-L${lv}-${loc}-c${v}`;
      let r;
      try {
        const strings = withLevelInstruction(resolveStrings(id, loc, type), id, lv, loc);
        const ik = type.interactive && (typeof type.interactive.instructionKey === 'function' ? type.interactive.instructionKey(lv) : type.interactive.instructionKey);
        r = await renderInstance({ type, theme: null, difficulty: lv, locale: loc, page, strings, unit, variant: v + 1, seedVariant: v, outDir: OUT, baseName: base,
          ...(INTER && type.interactive ? { interactive: true, interactiveInstruction: (IS[ik] || {})[loc] || 'PROBE: tap the answer.' } : {}) });
      } catch (e) { ref++; console.log(`${base}: REFUSED ${e.message.slice(0, 200)}`); continue; }
      n++;
      const f2 = [...(r.qa.verify || []), ...(r.qa.lints || []), ...((r.interactive && r.interactive.lints) || []).map((l) => 'SCREEN/KEY ' + (typeof l === 'string' ? l : JSON.stringify(l)))].map((l) => (typeof l === 'string' ? l : JSON.stringify(l)));
      if (r.interactive) {
        try {
          const items = r.interactive.items.map((it) => ({ meta: it.meta, options: it.options.map((o) => o.label) }));
          if (!items.length) f2.push('SCREEN has no items');
          const got = type.interactive.oracle(items, loc);
          r.interactive.items.forEach((it, i) => { if (got[i] !== it.answer) f2.push(`ORACLE item ${i + 1}: ${got[i]} != page ${it.answer}`); });
        } catch (e) { f2.push('ORACLE ' + e.message); }
      }
      if (f2.length) { bad++; console.log(`${base}: ${f2.join(' | ').slice(0, 400)}`); }
    }
  }
  await b.close(); console.log(`${n} rendered, ${bad} with findings, ${ref} refused`);
  process.exitCode = bad ? 1 : 0;
})();
