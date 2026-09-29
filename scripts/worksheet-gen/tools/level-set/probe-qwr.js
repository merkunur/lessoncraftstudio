// Render probe for the question-words Level Set: every page × level × locales × seeds (variant) through verify + lints (+ key/screen when --interactive).
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../../render/render-instance.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
const OUT = process.argv[2] || path.join(__dirname, '..', '..', 'out', 'probe-qwr');
const LOCS = (process.argv[3] || 'en,de').split(',');
const VARIANTS = (process.argv[4] || '3').split(',').map(Number);
const ONLY = process.argv[5] ? process.argv[5].split(',') : null;
const INTER = process.argv.includes('--interactive');
const IS = require('../../i18n/interactive-instructions.json')['question-words'] || {};
const TYPES = { 'G1-353': 'g1/G1-353-question-words.js', 'G1-373': 'g1/G1-373-question-words-match-the-question-to-the-answer.js', 'G1-374': 'g1/G1-374-question-words-fill-in-the-question-word.js',
  'G1-375': 'g1/G1-375-question-words-sort-the-answers-who-what-or-where.js', 'G2-356': 'g2/G2-356-question-words-write-the-question.js', 'G2-357': 'g2/G2-357-question-words-ask-about-the-picture-why-and-how.js' };
(async () => {
  const b = await puppeteer.launch(); const page = await b.newPage(); let bad = 0, n = 0, ref = 0;
  for (const [id, f] of Object.entries(TYPES)) {
    if (ONLY && !ONLY.includes(id)) continue;
    const type = require('../../types/' + f);
    for (const lv of [1, 2, 3]) for (const loc of LOCS) for (const v of VARIANTS) {
      let r;
      try {
        const strings = withLevelInstruction(resolveStrings(id, loc, type), id, lv, loc);
        r = await renderInstance({ type, theme: '', difficulty: lv, locale: loc, page, strings, variant: v, seedVariant: v, outDir: OUT, baseName: `${id}-L${lv}-${loc}-v${v}`, ...(INTER && type.interactive ? { interactive: true, interactiveInstruction: (IS[type.interactive.instructionKey] || {})[loc] } : {}) });
      } catch (e) { ref++; console.log(`${id} L${lv} ${loc} v${v}: REFUSED ${e.message.slice(0, 120)}`); continue; }
      n++;
      const f2 = [...(r.qa.verify || []), ...(r.qa.lints || []), ...((r.interactive && r.interactive.lints) || []).map((l) => 'SCREEN/KEY ' + (typeof l === 'string' ? l : JSON.stringify(l)))].map((l) => (typeof l === 'string' ? l : JSON.stringify(l)));
      if (f2.length) { bad++; console.log(`${id} L${lv} ${loc} v${v}: ${f2.join(' | ').slice(0, 300)}`); }
    }
  }
  await b.close(); console.log(`${n} rendered, ${bad} with findings, ${ref} refused`);
})();
