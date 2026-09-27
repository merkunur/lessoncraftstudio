#!/usr/bin/env node
/**
 * qa-levels.js — render worksheet types at chosen levels through the REAL
 * print pipeline (render-instance.js: same lints + the type's own verify()
 * that every published sheet passes), across locales and colour + B&W themes,
 * and save the page images for review (2026-09-27, Level Set programme).
 *
 *   node scripts/worksheet-gen/tools/qa-levels.js --types=G1-110,G1-111 [--levels=1,2,3]
 *        [--locales=en,de,fi] [--seeds=3] [--out=out/qa-levels]
 *
 * --seeds=N renders N different copies per (type, level, locale, theme) —
 * the copies a teacher gets (variant 1..N), so a layout that only breaks on an
 * unlucky roll is still caught. Exit 1 when any render has a lint or verify
 * failure. Themes: the first colour theme the type accepts and, when it
 * accepts B&W, the first B&W theme.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const resolve = require('../image-cache/resolve.js');
const { makeRng } = require('../lib/rng.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const TYPES = (arg('types', '') || '').split(',').filter(Boolean);
const LEVELS = arg('levels', '1,2,3').split(',').map(Number);
const LOCALES = arg('locales', 'en,de,fi').split(',');
const SEEDS = Number(arg('seeds', '3'));
const OUT = path.resolve(arg('out', path.join(__dirname, '..', 'out', 'qa-levels')));
const isBw = (t) => /\bbw\b/i.test(t);

/* Themes the type ACCEPTS at this level — a type may refuse a theme (too few
   flat nouns, no mirror-symmetric pictures…); the generator then retries
   another theme, so the check must do the same: probe a build and take the
   first colour and the first B&W theme that the level accepts. */
async function themesFor(spec, level, unit) {
  const ax = spec.themeAxis || {};
  if (ax.applicable === false) return [null];
  const all = Object.keys(resolve.manifest().themes);
  const ok = all.filter((t) => {
    if (ax.excludeBw && isBw(t)) return false;
    if (ax.bwOnly && !isBw(t)) return false;
    try { return resolve.labelSafeNouns(t).length >= (ax.minNouns || 1); } catch (e) { return false; }
  });
  const accepts = async (t) => {
    try { await spec.build({ theme: t, difficulty: level, locale: 'en', unit }, { rng: makeRng('qa-probe|' + spec.id + '|' + t) }); return true; }
    catch (e) { return false; }
  };
  const out = [];
  for (const want of [(t) => !isBw(t), isBw]) {
    for (const t of ok.filter(want)) { if (await accepts(t)) { out.push(t); break; } }
  }
  return out;
}

(async () => {
  if (!TYPES.length) { console.error('usage: qa-levels.js --types=A,B [--levels=1,2,3] [--locales=en,de,fi] [--seeds=3]'); process.exit(2); }
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let bad = 0, done = 0;
  try {
    for (const id of TYPES) {
      const type = loadType(id);
      let unit = null;
      try { if (type.unitAxis && type.unitAxis.applicable) unit = (type.unitAxis.units('en') || [])[0] || null; } catch (e) {}
      for (const level of LEVELS) {
        const themes = await themesFor(type, level, unit);
        if (!themes.length) { bad++; done++; console.log(`FAIL ${id}-d${level}: no theme is accepted at this level`); continue; }
        for (const theme of themes) {
          for (const locale of LOCALES) {
            let strings;
            try { strings = require('../i18n/strings.js').resolveStrings(type.id, locale, type); } catch (e) { strings = undefined; }
            for (let v = 1; v <= SEEDS; v++) {
              const base = `${id}-d${level}-${locale}-${(theme || 'nothm').replace(/\s+/g, '_')}-v${v}`;
              try {
                const r = await renderInstance({ type, theme, difficulty: level, locale, unit, strings, variant: v, page, outDir: OUT, baseName: base });
                const fails = [].concat(r.qa.lints || [], r.qa.verify || []);
                done++;
                if (fails.length) { bad++; console.log(`FAIL ${base}: ${JSON.stringify(fails).slice(0, 300)}`); }
                try { fs.unlinkSync(r.pdfPath); fs.unlinkSync(path.join(OUT, base + '.html')); } catch (e) {}
              } catch (e) {
                done++; bad++;
                console.log(`FAIL ${base}: ${String(e.message || e).slice(0, 200)}`);
              }
            }
          }
        }
      }
    }
  } finally { await browser.close(); }
  console.log(`\n${done} renders, ${bad} failed · images in ${OUT}`);
  process.exit(bad ? 1 : 0);
})();
