#!/usr/bin/env node
/**
 * Renders given page types at every level, in given languages and for several draws, and prints what the page's own
 * check and the lints say. A dev tool for a new type before its waves are built.
 *
 *   node tools/level-set/probe-types.js --types=G3-491,G3-492 [--locales=en,de,fi] [--seeds=3] [--levels=1,2,3] [--keep]
 *
 * Pictures and PDFs go to out/probe/ (deleted at the end unless --keep).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { loadType } = require('../../lib/load-types.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
const { renderInstance } = require('../../render/render-instance.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : d; };
const TYPES = arg('types', '').split(',').filter(Boolean);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const SEEDS = Number(arg('seeds', 3));
const LEVELS = arg('levels', '1,2,3').split(',').map(Number);
const KEEP = process.argv.includes('--keep');
const OUT = path.join(__dirname, '..', '..', 'out', 'probe');

(async () => {
  if (!TYPES.length) { console.error('--types=<id,id>'); process.exit(1); }
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let bad = 0, n = 0;
  for (const id of TYPES) {
    const spec = loadType(id);
    for (const locale of LOCALES) {
      for (const difficulty of LEVELS) {
        for (let v = 1; v <= SEEDS; v++) {
          n++;
          const tag = `${id} ${locale} L${difficulty} #${v}`;
          try {
            const strings = withLevelInstruction(resolveStrings(id, locale, spec), id, difficulty, locale);
            const r = await renderInstance({ type: spec, theme: null, difficulty, locale, variant: v, seedVariant: v + 1, page, outDir: OUT, baseName: `${id}-${locale}-L${difficulty}-${v}`, strings });
            const fails = [].concat(r.qa.lints || [], r.qa.verify || []);
            if (fails.length) { bad++; console.log('FAIL  ' + tag + ': ' + fails.slice(0, 6).join(' · ')); }
          } catch (e) { bad++; console.log('ERROR ' + tag + ': ' + e.message); }
        }
      }
    }
  }
  await browser.close();
  if (!KEEP) fs.rmSync(OUT, { recursive: true, force: true });
  console.log(`${n} pages, ${bad} with problems` + (KEEP ? ' (kept in out/probe)' : ''));
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
