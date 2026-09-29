// Contact sheets of every picture the Read and Do family can still use (after its exclusions), per colour theme used by
// the waves + the published pages — for a Grade 1 naming review (a picture a child names differently from its word).
//   node tools/level-set/rad-picture-sheets.js <outDir>
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { entriesFor, countable, fileUri } = require('../../lib/b2-common.js');
const { bank } = require('../../lib/b3-common.js');
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
const spec = require('../../types/g1/G1-308-read-and-do.js');
const avoid = spec._familyAvoid;
const themes = new Set(['animals', 'zoo animals', 'farm animals', 'fruits', 'toys', 'vehicles']);
for (const f of fs.readdirSync(path.join(__dirname, '..', '..', 'waves')).filter((x) => /^wave-rad-\w\w\.json$/.test(x))) {
  const w = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'waves', f), 'utf8'));
  for (const lv of Object.values(w.levels || {})) for (const copies of Object.values(lv)) for (const c of copies) themes.add(c.theme);
}
(async () => {
  const b = await puppeteer.launch(); const page = await b.newPage();
  const index = {};
  for (const theme of [...themes].sort()) {
    // the union over locales of the nouns the family can use on this theme
    const seen = new Map();
    for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
      const bk = bank('instructions', loc);
      for (const e of entriesFor(theme, loc).filter(countable)) {
        const f = bk.objForms[e.vocabKey];
        if (!f || !f.reviewed || !f.unique || !f.all || !f.pl || avoid(e.vocabKey, loc)) continue;
        if (!seen.has(e.vocabKey)) seen.set(e.vocabKey, { key: e.vocabKey, noun: e.noun, en: loc === 'en' ? e.singular : null });
      }
    }
    const items = [...seen.values()];
    index[theme] = items.map((x) => x.key);
    const cells = items.map((x) => `<div style="width:170px;text-align:center;font:600 15px sans-serif"><img src="${fileUri(theme, x.noun)}" style="width:150px;height:150px;object-fit:contain;background:#fff;border:1px solid #ccc"><div>${x.key}</div></div>`).join('');
    await page.setViewport({ width: 1400, height: 800 });
    // a FILE page: an about:blank page (setContent) may not load file:// pictures — the first sheets were all empty boxes
    const tmp = path.join(OUT, '_sheet.html');
    fs.writeFileSync(tmp, `<html><body style="margin:10px;background:#f4f4f4"><h2 style="font:700 22px sans-serif">${theme} (${items.length})</h2><div style="display:flex;flex-wrap:wrap;gap:8px">${cells}</div></body></html>`);
    await page.goto(require('url').pathToFileURL(tmp).href, { waitUntil: 'load' });
    await page.screenshot({ path: path.join(OUT, theme.replace(/ /g, '_') + '.png'), fullPage: true });
  }
  fs.writeFileSync(path.join(OUT, '_index.json'), JSON.stringify(index, null, 1));
  await b.close();
  console.log(Object.entries(index).map(([t, k]) => `${t}: ${k.length}`).join('\n'));
})();
