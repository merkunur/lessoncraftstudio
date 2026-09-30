#!/usr/bin/env node
/**
 * probe-swl.js — render Sight Words Level Set pages through the real print pipeline (render-instance: lints +
 * the type's own verify) and print every failure. Strings come from data/literacy/sight-levelset/strings.json
 * so the probe runs before they are registered in i18n/strings.<loc>.json.
 *   node tools/level-set/probe-swl.js --types=K-388 --locales=en,de --levels=1,2,3 [--units=3|all] [--keep=out/probe-swl]
 * --units=N probes the first, middle and last N/3 units (default 3); `all` every unit.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../../render/render-instance.js');
const { loadType } = require('../../lib/load-types.js');
const SW = require('../../lib/sight-words-levelset.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const types = arg('types', 'K-388').split(',');
const locales = arg('locales', 'en').split(',');
const levels = arg('levels', '1,2,3').split(',').map(Number);
const unitsArg = arg('units', '3');
const keep = arg('keep', null);

function pickUnits(loc) {
  const all = SW.unitIds(loc);
  if (unitsArg === 'all') return all;
  const n = Math.max(1, Number(unitsArg));
  const picks = new Set([all[0], all[Math.floor(all.length / 2)], all[all.length - 1]]);
  for (let i = 0; picks.size < n && i < all.length; i += Math.ceil(all.length / n)) picks.add(all[i]);
  return [...picks];
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let runs = 0, bad = 0;
  for (const id of types) {
    const spec = loadType(id);
    for (const loc of locales) {
      const str = SW.typeStrings(id, loc);
      for (const unit of pickUnits(loc)) {
        for (const lv of levels) {
          if (!spec.difficulty[lv]) continue;
          const outDir = keep ? path.resolve(keep) : path.join(require('os').tmpdir(), 'probe-swl');
          fs.mkdirSync(outDir, { recursive: true });
          const base = `${id}-${loc}-${unit}-d${lv}`;
          let fails;
          try {
            const r = await renderInstance({ type: spec, theme: null, difficulty: lv, locale: loc, unit, strings: str, page, outDir, baseName: base });
            fails = [...(r.qa.lints || []), ...(r.qa.verify || [])];
          } catch (e) { fails = ['THROWS ' + e.message.slice(0, 160)]; }
          runs++;
          if (fails.length) { bad++; console.log(`FAIL ${base}: ${fails.slice(0, 3).join(' | ')}`); }
        }
      }
    }
  }
  await browser.close();
  console.log(`${runs} renders, ${bad} failed`);
  process.exit(bad ? 1 : 0);
})();
