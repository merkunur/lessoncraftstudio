#!/usr/bin/env node
/**
 * htd-render.js — render How to Draw Level Set pages exactly as cli.js builds their strings (level instruction →
 * copyStrings → unit tokens), many pages in one browser, for the human read before any wave.
 *   node tools/level-set/htd-render.js --out=<dir> <typeId>:<level>:<unit>[:<locale>] …
 *   node tools/level-set/htd-render.js --out=<dir> --list=<file>   (one item per line)
 * Prints one line per page: the PNG path, the title, the instruction, and any QA lint / verify failure.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const { loadType } = require(path.join(ROOT, 'lib', 'load-types.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(ROOT, 'i18n', 'strings.js'));
const { renderInstance } = require(path.join(ROOT, 'render', 'render-instance.js'));
const { resolveUnitTokens } = require(path.join(ROOT, 'lib', 'unit-axis.js'));
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const out = arg('out') || path.join(ROOT, 'out', 'htl-dev');
let items = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (arg('list')) items = items.concat(fs.readFileSync(arg('list'), 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean));
(async () => {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let fails = 0;
  try {
    for (const item of items) {
      const [typeId, lv, unit, locale = 'en'] = item.split(':');
      const type = loadType(typeId), difficulty = Number(lv);
      const s0 = withLevelInstruction(resolveStrings(typeId, locale, type), typeId, difficulty, locale);
      const s1 = type.copyStrings ? type.copyStrings(s0, { locale, difficulty, unit, variant: 2, seedVariant: 1 }) : s0;
      const strings = resolveUnitTokens(s1, type, unit, locale);
      try {
        const r = await renderInstance({ type, theme: null, difficulty, locale, unit, strings, page, outDir: out, baseName: `${typeId}-d${difficulty}-${locale}-${unit}` });
        const bad = [...r.qa.lints, ...r.qa.verify];
        if (bad.length) fails++;
        console.log(`${path.basename(r.pngPath)} | ${strings.title} | ${strings.instruction}${bad.length ? ' | FAIL ' + JSON.stringify(bad).slice(0, 300) : ''}`);
      } catch (e) { fails++; console.log(`${item} | THROW ${e.message}`); }
    }
  } finally { await browser.close(); }
  console.log(`${items.length} pages, ${fails} with failures -> ${out}`);
})().catch((e) => { console.error(e); process.exit(1); });
