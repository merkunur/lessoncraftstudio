/**
 * Reading Comprehension Level Set — MEASURE the size tier of every (locale, story, level) page: render the printed page
 * at tier 0 (18 px story) → 3 (15 px, tight) and keep the LARGEST tier with no overflow / footer lint. Writes
 * data/literacy/rc-levels/fit.json, which G2-254 reads (its length estimate is only the fallback).
 *   node tools/level-set/rc-fit-tiers.js [locs]     (default: all eleven)
 * A page that fits at no tier is reported and recorded at 3 (the probe then fails it — never shipped).
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const { buildPage } = require('../../page/shell.js');
const { runLints } = require('../../qa/lints.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
const { poolOf } = require('../../data/literacy/reading-passages-levels.js');

const LOCS = (process.argv[2] || 'en,de,es,fr,it,pt,nl,sv,da,no,fi').split(',');
const PAGES = {
  'G2-254': 'g2/G2-254-reading-comprehension.js', 'G2-269': 'g2/G2-269-reading-comprehension-story-2.js', 'G2-270': 'g2/G2-270-reading-comprehension-story-3.js',
  'G2-271': 'g2/G2-271-reading-comprehension-story-4.js', 'G2-272': 'g2/G2-272-reading-comprehension-story-5.js', 'G2-273': 'g2/G2-273-reading-comprehension-story-6.js',
};
const OUT = path.join(__dirname, '..', '..', 'data', 'literacy', 'rc-levels', 'fit.json');
const FIT = /overflow|footer overlap|exceeds page box/;

(async () => {
  const fit = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  const b = await puppeteer.launch(); const page = await b.newPage();
  const tmp = path.join(os.tmpdir(), 'rc-fit-' + process.pid + '.html');
  const bad = []; const hist = [0, 0, 0, 0];
  for (const loc of LOCS) for (const [id, f] of Object.entries(PAGES)) {
    const spec = require('../../types/' + f);
    const n = poolOf(id, loc).length;
    for (const lv of [1, 2, 3]) {
      const svs = lv === 2 ? [1, 2, 3, 4, 5].filter((k) => k < n) : [1, 2, 3, 4, 5].filter((k) => k - 1 < n);
      for (const sv of svs) {
        const story = spec._storyFor(lv, loc, sv);
        const s0 = withLevelInstruction(resolveStrings(id, loc, spec), id, lv, loc);
        const strings = spec.copyStrings(s0, { locale: loc, difficulty: lv, seedVariant: sv });
        let chosen = null, last = [];
        for (let tier = 0; tier <= 3 && chosen == null; tier++) {
          const built = spec._buildLevel(lv, loc, sv, tier);
          fs.writeFileSync(tmp, buildPage({ title: strings.title, instruction: strings.instruction, bodyHtml: built.bodyHtml, locale: loc, pageSize: loc === 'en' ? 'letter' : 'a4' }), 'utf8');
          await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 1 });
          await page.goto(require('url').pathToFileURL(tmp).href, { waitUntil: 'networkidle0' });
          await page.evaluate(() => document.fonts.ready);
          last = (await runLints(page, { gradeBand: spec.gradeBand })).map(String).filter((l) => FIT.test(l));
          if (!last.length) chosen = tier;
        }
        const key = `${loc}|${story.id}|${lv}`;
        if (chosen == null) { bad.push(`${key}: ${last[0].slice(0, 120)}`); chosen = 3; }
        fit[key] = chosen; hist[chosen]++;
      }
    }
    fs.writeFileSync(OUT, JSON.stringify(fit, null, 1) + '\n');
  }
  await b.close();
  try { fs.unlinkSync(tmp); } catch (e) { /* gone */ }
  console.log(`tiers 18px:${hist[0]} 17px:${hist[1]} 16px:${hist[2]} 15px:${hist[3]}`);
  if (bad.length) { console.log(`${bad.length} page(s) fit at NO tier:`); bad.forEach((x) => console.log('  ' + x)); process.exit(1); }
})();
