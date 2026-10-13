#!/usr/bin/env node
/**
 * qa-ntr.js — Level Set 2026-10-13, Number Tracing. Renders the NEW pages through the real print pipeline
 * (render-instance: lints + the type's verify) with the strings the generator prints (level instruction +
 * K-237 copyStrings), and writes PNGs for reading.
 *
 *   node tools/level-set/qa-ntr.js [--locales=en,de,fi] [--units=0,4,7,13,20] [--out=out/qa-ntr]
 * Range pages: K-237 / K-249 / K-250 / K-251 / K-252 / K-253 at levels 1 and 3. Per-number pages: K-237 with a
 * unit at levels 1, 2, 3. Exit 1 on any lint / verify failure or a printed {N} left unfilled.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../../render/render-instance.js');
const { loadType } = require('../../lib/load-types.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,de,es,fr,it,pt,nl,sv,da,no,fi').split(',');
const UNITS = arg('units', Array.from({ length: 21 }, (_, n) => n).join(',')).split(',');
const OUT = path.resolve(arg('out', path.join(__dirname, '..', '..', 'out', 'qa-ntr')));
const RANGE = arg('range', 'K-237,K-249,K-250,K-251,K-252,K-253').split(',').filter(Boolean);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let bad = 0, done = 0;
  const jobs = [];
  for (const id of RANGE) for (const level of [1, 3]) for (const locale of LOCALES) jobs.push({ id, level, locale, unit: null });
  for (const unit of UNITS) for (const level of [1, 2, 3]) for (const locale of LOCALES) jobs.push({ id: 'K-237', level, locale, unit });
  try {
    for (const j of jobs) {
      const type = loadType(j.id);
      let strings = withLevelInstruction(resolveStrings(type.id, j.locale, type), type.id, j.level, j.locale);
      if (type.copyStrings) strings = type.copyStrings(strings, { locale: j.locale, difficulty: j.level, unit: j.unit, variant: 1 });
      const base = `${j.id}-d${j.level}-${j.locale}-${j.unit == null ? 'range' : 'n' + j.unit}`;
      try {
        const r = await renderInstance({ type, theme: null, difficulty: j.level, locale: j.locale, unit: j.unit, strings, variant: 1, page, outDir: OUT, baseName: base });
        const fails = [].concat(r.qa.lints || [], r.qa.verify || []);
        if (/\{N\}|\{UNIT\}/.test(JSON.stringify(strings))) fails.push('unfilled token in strings');
        done++;
        if (fails.length) { bad++; console.log(`FAIL ${base}: ${JSON.stringify(fails).slice(0, 300)}`); }
        try { fs.unlinkSync(r.pdfPath); fs.unlinkSync(path.join(OUT, base + '.html')); } catch (e) { /* kept */ }
      } catch (e) {
        done++; bad++;
        console.log(`FAIL ${base}: ${String(e.message || e).slice(0, 200)}`);
      }
    }
  } finally { await browser.close(); }
  console.log(`\n${done} renders, ${bad} failed · images in ${OUT}`);
  process.exit(bad ? 1 : 0);
})();
