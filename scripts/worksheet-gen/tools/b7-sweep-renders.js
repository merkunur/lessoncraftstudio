#!/usr/bin/env node
/**
 * b7-sweep-renders.js <locale> [--ids=a,b] — the sweep renders the LANDING panels audit (b7-landing-brief.md):
 * every shipped nt2-G id of the locale rendered through render/render-instance.js with the APPLIED locale strings and
 * banks (run after apply-b7-locale.js) into out/b7-sweep/<locale>/<id>-null-d2-<locale>.{html,pdf,png}; a
 * find-the-differences id also gets its .screen.png and its answer key as .key.png (the panel must OPEN the key and
 * name every ringed change). Refused ids (docs/worksheet-gen/b7-designs/_records/refusals.<locale>.json) are skipped.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { loadAllTypes } = require('../lib/load-types.js');
const { renderInstance } = require('../render/render-instance.js');
const { resolveStrings } = require('../i18n/strings.js');
const { unitFor } = require('./gen-b7-waves.js');
const B = require('../data/b7/find-the-differences.js');
const IS = require('../i18n/interactive-instructions.json')['find-the-differences'];
const alloc = require('../../../docs/worksheet-gen/b7-designs/_records/b7var-id-allocation.json');
const { FAMILIES } = require('./gen-b7var-specs.js');

const loc = process.argv[2];
if (!loc) { console.error('usage: b7-sweep-renders.js <locale> [--ids=a,b]'); process.exit(2); }
const onlyArg = process.argv.find((a) => a.startsWith('--ids='));
const only = onlyArg ? new Set(onlyArg.slice(6).split(',')) : null;
const WG = path.join(__dirname, '..');
const OUT = path.join(WG, 'out', 'b7-sweep', loc);
fs.mkdirSync(OUT, { recursive: true });
let refused = {};
try { refused = require(path.join(WG, '..', '..', 'docs', 'worksheet-gen', 'b7-designs', '_records', `refusals.${loc}.json`)); } catch (e) { refused = {}; }
const ids = [...FAMILIES.map(([id]) => id), ...alloc.faces.map((f) => f.id)].filter((id) => !refused[id] && (!only || only.has(id)));
const all = loadAllTypes();

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let ok = 0, bad = 0;
  try {
    for (const id of ids) {
      const spec = all.find((s) => s.id === id);
      if (!spec) { console.log(`${id}: no spec`); bad++; continue; }
      const unit = unitFor(spec, loc);
      let strings; try { strings = resolveStrings(id, loc, spec); } catch (e) { console.log(`${id}: no ${loc} strings (${e.message.slice(0, 80)})`); bad++; continue; }
      const fd = spec.exerciseType === 'find-the-differences';
      const tapKey = fd ? B.TAP_KEY[(spec.difficulty[2] || {}).mode || 'base'] : null;
      const tap = fd ? (IS[tapKey] || {})[loc] : null;
      if (fd && !tap) { console.log(`${id}: no ${loc} tap instruction ${tapKey}`); bad++; continue; }
      const base = `${id}-null-d2-${loc}`;
      try {
        const out = await renderInstance({ type: spec, theme: null, difficulty: 2, locale: loc, unit, strings, page, outDir: OUT, baseName: base, ...(fd ? { interactive: true, interactiveInstruction: tap } : {}) });
        const issues = [...out.qa.lints, ...out.qa.verify, ...((out.interactive && out.interactive.lints) || [])];
        if (fd) {
          // the key as a PNG (the panels read pictures, not PDFs)
          await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
          await page.goto(require('url').pathToFileURL(path.join(OUT, base + '.key.html')).href, { waitUntil: 'networkidle0' });
          await page.evaluate(() => document.fonts.ready);
          await page.screenshot({ path: path.join(OUT, base + '.key.png'), fullPage: true });
        }
        if (issues.length) { console.log(`${id}: ${issues.join(' | ')}`); bad++; } else ok++;
      } catch (e) { console.log(`${id}: ERROR ${e.message.split('\n')[0].slice(0, 160)}`); bad++; }
    }
  } finally { await browser.close(); }
  console.log(`b7-sweep ${loc}: ${ok} rendered clean, ${bad} with issues → ${path.relative(WG, OUT)}`);
  process.exitCode = bad ? 1 : 0;
})();
