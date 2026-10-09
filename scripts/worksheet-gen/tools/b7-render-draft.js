#!/usr/bin/env node
/**
 * b7-render-draft.js <locale> <id> [--screen] — render ONE nt2-G page from a native panel's DRAFT
 * (i18n/.draft-b7-<locale>.json) before it is applied: the draft's banks go to a temp locales dir
 * (B7_LOCALES_DIR, read by lib/b7-common.js), the draft's title + instruction are the strings, the
 * face's pinned unit comes from the spec (or the draft bank's unitOverrides). Output:
 *   out/dev/<id>-draft-<locale>.{html,pdf,png}  (+ .screen.png / .key.html for --screen on a
 *   find-the-differences id). The panel READS the png before signing off.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const [, , loc, id] = process.argv;
if (!loc || !id) { console.error('usage: b7-render-draft.js <locale> <id> [--screen]'); process.exit(2); }
const WG = path.join(__dirname, '..');
const draft = JSON.parse(fs.readFileSync(path.join(WG, 'i18n', `.draft-b7-${loc}.json`), 'utf8'));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'b7-draft-'));
for (const [b, block] of Object.entries(draft.banks || {})) fs.writeFileSync(path.join(dir, `${b}.${loc}.json`), JSON.stringify(block));
process.env.B7_LOCALES_DIR = dir;
const { loadAllTypes } = require('../lib/load-types.js');
const { renderInstance } = require('../render/render-instance.js');
const { unitFor } = require('./gen-b7-waves.js');
const IS = require('../i18n/interactive-instructions.json')['find-the-differences'];
const puppeteer = require('puppeteer');
(async () => {
  const spec = loadAllTypes().find((s) => s.id === id);
  if (!spec) throw new Error('no spec ' + id);
  const t = (draft.types || {})[id];
  if (!t) throw new Error(`the draft has no types[${id}] (refused?)`);
  const unit = unitFor(spec, loc);
  const screen = process.argv.includes('--screen') && spec.interactive;
  let tapKey = null;
  if (screen) { const B = require('../data/b7/find-the-differences.js'); tapKey = B.TAP_KEY[(spec.difficulty[2] || {}).mode || 'base']; }
  const tap = screen ? ((draft.banks['find-the-differences'] || {}).tap || {})[tapKey] || (IS[tapKey] || {})[loc] : null;
  if (screen && !tap) throw new Error(`the draft's find-the-differences bank has no tap.${tapKey}`);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    const out = await renderInstance({ type: spec, theme: null, difficulty: 2, locale: loc, unit, strings: { title: t.title, instruction: t.instruction }, page, outDir: path.join(WG, 'out', 'dev'), baseName: `${id}-draft-${loc}`, ...(screen ? { interactive: true, interactiveInstruction: tap } : {}) });
    console.log('PNG:', out.pngPath);
    if (out.interactive) console.log('SCREEN:', out.interactive.pngPath, 'KEY:', out.interactive.keyPdfPath);
    console.log('QA lints:', out.qa.lints.length ? out.qa.lints : 'clean');
    console.log('QA verify:', out.qa.verify.length ? out.qa.verify : 'clean');
    process.exitCode = (out.qa.lints.length || out.qa.verify.length) ? 1 : 0;
  } finally { await browser.close(); fs.rmSync(dir, { recursive: true, force: true }); }
})().catch((e) => { console.error(e.message); process.exit(1); });
