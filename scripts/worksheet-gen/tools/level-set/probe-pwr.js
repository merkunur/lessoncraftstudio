// Render probe for the Pre-Writing Practice Level Set: every page × level × a few locales and themes, through verify + lints.
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../../render/render-instance.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
const OUT = process.argv[2] || path.join(__dirname, '..', '..', 'out', 'probe-pwr');
const TYPES = Object.fromEntries(require('fs').readdirSync(require('path').join(__dirname, '..', '..', 'types', 'k')).filter((f) => /^K-(236|24[4-8]|38[5-7])-/.test(f)).map((f) => [f.slice(0, 5), 'k/' + f]));
const LOCS = (process.argv[3] || 'en,de,fi,fr').split(',');
const THEMES = (process.argv[4] || 'animals,toys bw,kitchen').split(',');
(async () => {
  const b = await puppeteer.launch(); const page = await b.newPage(); let bad = 0, n = 0;
  for (const [id, f] of Object.entries(TYPES)) {
    const type = require('../../types/' + f);
    for (const lv of [1, 2, 3]) for (const loc of LOCS) for (const theme of THEMES) {
      let r;
      try {
        const strings = withLevelInstruction(resolveStrings(id, loc, type), id, lv, loc);
        r = await renderInstance({ type, theme, difficulty: lv, locale: loc, page, strings, outDir: OUT, baseName: `${id}-L${lv}-${loc}-${theme.replace(/ /g, '_')}` });
      } catch (e) { console.log(`${id} L${lv} ${loc} ${theme}: REFUSED ${e.message.slice(0, 90)}`); continue; }
      n++;
      const f2 = [...(r.qa.verify || []), ...(r.qa.lints || []).map((l) => (typeof l === 'string' ? l : JSON.stringify(l)))];
      if (f2.length) { bad++; console.log(`${id} L${lv} ${loc} ${theme}: ${f2.join(' | ').slice(0, 300)}`); }
    }
  }
  await b.close(); console.log(`${n} rendered, ${bad} with findings`);
})();
