// Render probe for the Reading Comprehension Level Set: every page × level × locale × pool copy through verify + lints,
// and (--interactive) the screen version + the answer key (render-instance measures every key) + the oracle (it must
// reproduce the page's own answers on every screen item).
//   node tools/level-set/probe-rcm.js <outDir> <locs> <copies e.g. 1,2,3,4,5> [ids] [--interactive] [--levels=1,2,3]
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../../render/render-instance.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
const OUT = process.argv[2] || path.join(__dirname, '..', '..', 'out', 'probe-rcm');
const LOCS = (process.argv[3] || 'en').split(',');
const COPIES = (process.argv[4] || '1').split(',').map(Number);
const ONLY = process.argv[5] && !process.argv[5].startsWith('--') ? process.argv[5].split(',') : null;
const INTER = process.argv.includes('--interactive');
const LEVELS = ((process.argv.find((a) => a.startsWith('--levels=')) || '--levels=1,2,3').slice(9)).split(',').map(Number);
const IS = require('../../i18n/interactive-instructions.json')['reading-comprehension'] || {};
const TYPES = {
  'G2-254': 'g2/G2-254-reading-comprehension.js', 'G2-269': 'g2/G2-269-reading-comprehension-story-2.js', 'G2-270': 'g2/G2-270-reading-comprehension-story-3.js',
  'G2-271': 'g2/G2-271-reading-comprehension-story-4.js', 'G2-272': 'g2/G2-272-reading-comprehension-story-5.js', 'G2-273': 'g2/G2-273-reading-comprehension-story-6.js',
};
(async () => {
  const b = await puppeteer.launch(); const page = await b.newPage(); let bad = 0, n = 0, ref = 0;
  for (const [id, f] of Object.entries(TYPES)) {
    if (ONLY && !ONLY.includes(id)) continue;
    const type = require('../../types/' + f);
    for (const lv of LEVELS) for (const loc of LOCS) for (const v of COPIES) {
      let r;
      const base = `${id}-L${lv}-${loc}-c${v}`;
      try {
        const s0 = withLevelInstruction(resolveStrings(id, loc, type), id, lv, loc);
        const strings = type.copyStrings(s0, { locale: loc, difficulty: lv, seedVariant: v });
        r = await renderInstance({ type, theme: null, difficulty: lv, locale: loc, page, strings, variant: v + 1, seedVariant: v, outDir: OUT, baseName: base,
          ...(INTER ? { interactive: true, interactiveInstruction: (IS.mc || {})[loc] || 'PROBE: read the story and tap the best answer.' } : {}) });
      } catch (e) { ref++; console.log(`${base}: REFUSED ${e.message.slice(0, 200)}`); continue; }
      n++;
      const f2 = [...(r.qa.verify || []), ...(r.qa.lints || []), ...((r.interactive && r.interactive.lints) || []).map((l) => 'SCREEN/KEY ' + (typeof l === 'string' ? l : JSON.stringify(l)))].map((l) => (typeof l === 'string' ? l : JSON.stringify(l)));
      if (r.interactive) {
        // the oracle must find the page's own answer on every item
        try {
          const items = r.interactive.items.map((it) => ({ meta: it.meta, options: it.options.map((o) => o.label) }));
          const got = type.interactive.oracle(items, loc);
          r.interactive.items.forEach((it, i) => { if (got[i] !== it.answer) f2.push(`ORACLE item ${i + 1}: ${got[i]} != page ${it.answer}`); });
        } catch (e) { f2.push('ORACLE ' + e.message); }
      }
      if (f2.length) { bad++; console.log(`${base}: ${f2.join(' | ').slice(0, 400)}`); }
    }
  }
  await b.close(); console.log(`${n} rendered, ${bad} with findings, ${ref} refused`);
})();
