// Render probe for the read-and-color Level Set: every page × level × locales × seeds (variant) through verify + lints (+ key/screen when --interactive).
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../../render/render-instance.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
const OUT = process.argv[2] || path.join(__dirname, '..', '..', 'out', 'probe-rac');
const LOCS = (process.argv[3] || 'en,de').split(',');
const VARIANTS = (process.argv[4] || '3').split(',').map(Number);
const ONLY = process.argv[5] ? process.argv[5].split(',') : null;
const INTER = process.argv.includes('--interactive');
const IS = require('../../i18n/interactive-instructions.json')['question-words'] || {};
const TYPES = { 'G1-242': 'g1/G1-242-read-and-color.js', 'G1-251': 'g1/G1-251-read-and-color-four-sentences.js', 'G1-252': 'g1/G1-252-read-and-color-busy-page.js', 'G1-409': 'g1/G1-409-read-and-color-two-sentences.js', 'G1-410': 'g1/G1-410-read-and-color-the-picture.js', 'G1-411': 'g1/G1-411-read-and-color-stop-at-the-number.js' };
const RCN = require('../../lib/read-and-color.js');
const THEMES = (process.env.RAC_THEMES || 'animals bw,fruits bw,toys bw').split(',');
(async () => {
  const b = await puppeteer.launch(); const page = await b.newPage(); let bad = 0, n = 0, ref = 0;
  for (const [id, f] of Object.entries(TYPES)) {
    if (ONLY && !ONLY.includes(id)) continue;
    const type = require('../../types/' + f);
    for (const lv of [1, 2, 3]) for (const loc of LOCS) for (const v of VARIANTS) for (const theme of THEMES) {
      let r;
      try {
        const strings = withLevelInstruction(resolveStrings(id, loc, type), id, lv, loc);
        r = await renderInstance({ type, theme, difficulty: lv, locale: loc, page, strings, variant: v, seedVariant: v, outDir: OUT, baseName: `${id}-L${lv}-${loc}-v${v}-${theme.replace(/ /g, '_')}`, ...(INTER && type.interactive ? { interactive: true, interactiveInstruction: (IS[type.interactive.instructionKey] || {})[loc] } : {}) });
      } catch (e) { ref++; console.log(`${id} L${lv} ${loc} v${v} ${theme}: REFUSED ${e.message.slice(0, 120)}`); continue; }
      n++;
      const f2 = [...(r.qa.verify || []), ...(r.qa.lints || []), ...((r.interactive && r.interactive.lints) || []).map((l) => 'SCREEN/KEY ' + (typeof l === 'string' ? l : JSON.stringify(l)))].map((l) => (typeof l === 'string' ? l : JSON.stringify(l)));
      // a sentence may never ask for its picture's own real colour (native panels 2026-09-30)
      try {
        const html = require('fs').readFileSync(require('path').join(OUT, `${id}-L${lv}-${loc}-v${v}-${theme.replace(/ /g, '_')}.html`), 'utf8');
        const pairs = [...html.matchAll(/data-lcs-noun="([^"]+)" data-lcs-color="([^"]+)"/g)];
        if (!pairs.length) f2.push('NATURAL-COLOUR check found no sentence (selector drift?)');
        for (const m of pairs) if (RCN.natural(m[1], m[2])) f2.push(`NATURAL-COLOUR: ${m[1]} is asked ${m[2]}`);
      } catch (e) { f2.push('NATURAL-COLOUR check could not read the page: ' + e.message); }
      if (f2.length) { bad++; console.log(`${id} L${lv} ${loc} v${v} ${theme}: ${f2.join(' | ').slice(0, 300)}`); }
    }
  }
  await b.close(); console.log(`${n} rendered, ${bad} with findings, ${ref} refused`);
})();
