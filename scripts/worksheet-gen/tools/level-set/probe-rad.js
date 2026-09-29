// Render probe for the read-and-do Level Set: every page × level × locales × seeds (variant) × themes through verify + lints,
// and (--interactive) the screen version + the answer key (render-instance measures every key).
//   node tools/level-set/probe-rad.js <outDir> <locs> <variants> [ids] [--interactive]
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../../render/render-instance.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
const OUT = process.argv[2] || path.join(__dirname, '..', '..', 'out', 'probe-rad');
const LOCS = (process.argv[3] || 'en,de').split(',');
const VARIANTS = (process.argv[4] || '3').split(',').map(Number);
const ONLY = process.argv[5] && !process.argv[5].startsWith('--') ? process.argv[5].split(',') : null;
const INTER = process.argv.includes('--interactive');
const IS = require('../../i18n/interactive-instructions.json')['read-and-do'] || {};
const TYPES = {
  'G1-308': 'g1/G1-308-read-and-do.js', 'G1-338': 'g1/G1-338-read-and-do-read-and-circle.js', 'G1-339': 'g1/G1-339-read-and-do-two-step-instructions.js',
  'G1-340': 'g1/G1-340-read-and-do-first-second-between.js', 'G1-341': 'g1/G1-341-read-and-check-true-or-false.js', 'G1-342': 'g1/G1-342-read-and-draw.js',
};
const THEMES = (process.env.RAD_THEMES || 'animals,fruits,vehicles').split(',');
(async () => {
  const b = await puppeteer.launch(); const page = await b.newPage(); let bad = 0, n = 0, ref = 0;
  for (const [id, f] of Object.entries(TYPES)) {
    if (ONLY && !ONLY.includes(id)) continue;
    const type = require('../../types/' + f);
    for (const lv of [1, 2, 3]) for (const loc of LOCS) for (const v of VARIANTS) for (const theme of THEMES) {
      let r;
      try {
        const strings = withLevelInstruction(resolveStrings(id, loc, type), id, lv, loc);
        const key = type.interactive && type.interactive.instructionKey;
        r = await renderInstance({ type, theme, difficulty: lv, locale: loc, page, strings, variant: v, seedVariant: v, outDir: OUT, baseName: `${id}-L${lv}-${loc}-v${v}-${theme.replace(/ /g, '_')}`,
          ...(INTER && type.interactive ? { interactive: true, interactiveInstruction: (IS[key] || {})[loc] || 'PROBE: tap the right answer.' } : {}) });
      } catch (e) { ref++; console.log(`${id} L${lv} ${loc} v${v} ${theme}: REFUSED ${e.message.slice(0, 160)}`); continue; }
      n++;
      const f2 = [...(r.qa.verify || []), ...(r.qa.lints || []), ...((r.interactive && r.interactive.lints) || []).map((l) => 'SCREEN/KEY ' + (typeof l === 'string' ? l : JSON.stringify(l)))].map((l) => (typeof l === 'string' ? l : JSON.stringify(l)));
      if (f2.length) { bad++; console.log(`${id} L${lv} ${loc} v${v} ${theme}: ${f2.join(' | ').slice(0, 300)}`); }
    }
  }
  await b.close(); console.log(`${n} rendered, ${bad} with findings, ${ref} refused`);
})();
