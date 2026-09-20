#!/usr/bin/env node
/**
 * verify-g2235-ruler-poison.js — proves G2-235's rendered-geometry verify()
 * can see the defect it was written for.
 *
 * Pulls the PRE-FIX spec + ruler primitive out of git (commit 93a416b9, the
 * last commit before the 2026-09-21 fix), renders them with the CURRENT
 * verify() and requires FAILURES at d1 and d3; then renders the current spec
 * as the control and requires 0. The old d3 shipped with the ruler flex-shrunk
 * to half height and its 0 tick re-centred 134 px right of the picture; the
 * old d1/d2 were ~6 px over budget too — a 7 % shrink that put the picture
 * 12 px (0.3 unit) BEFORE the 0 tick, which no eye caught in three months.
 * Run: node scripts/worksheet-gen/qa/verify-g2235-ruler-poison.js
 */
'use strict';
const path = require('path');
const fs = require('fs');
const Module = require('module');
const { execFileSync } = require('child_process');
const puppeteer = require('puppeteer');

const WG = path.resolve(__dirname, '..');
const REPO = path.resolve(WG, '..', '..');
const PRE_FIX = '93a416b9';
const OUT = path.join(WG, 'out', 'dev', 'g2235-poison');
const fwd = (p) => p.split(path.sep).join('/');

function gitShow(rel) { return execFileSync('git', ['show', `${PRE_FIX}:${rel}`], { cwd: REPO, encoding: 'utf8' }); }

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  // the old ruler must sit beside the real primitives (it requires ./_tokens.js, ./_svg.js)
  const oldRulerPath = path.join(WG, 'primitives', '_ruler-prefix-poison.js');
  fs.writeFileSync(oldRulerPath, gitShow('scripts/worksheet-gen/primitives/ruler.js'));
  let oldType;
  try {
    const src = gitShow('scripts/worksheet-gen/types/g2/G2-235-measure-with-ruler.js')
      .replace("require('../../primitives/ruler.js')", "require('" + fwd(oldRulerPath) + "')")
      .replace(/require\('\.\.\/\.\.\//g, "require('" + fwd(WG) + "/");
    const m = new Module(path.join(WG, 'types', 'g2', '_prefix-poison.js'));
    m.filename = m.id; m.paths = Module._nodeModulePaths(path.join(WG, 'types', 'g2')); m._compile(src, m.id);
    oldType = m.exports;
  } finally { fs.unlinkSync(oldRulerPath); }
  const newType = require(path.join(WG, 'types', 'g2', 'G2-235-measure-with-ruler.js'));
  const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
  const hybrid = Object.assign({}, oldType, { verify: newType.verify });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const old = {}, ctrl = {};
  try {
    for (const d of [1, 3]) {
      old[d] = (await renderInstance({ type: hybrid, theme: 'animals', difficulty: d, locale: 'en', page, outDir: OUT, baseName: `old-d${d}` })).qa.verify;
      console.log(`pre-fix build d${d} under the current verify: ${old[d].length} fails${old[d].length ? '\n   ' + old[d].slice(0, 5).join('\n   ') : ''}`);
      ctrl[d] = (await renderInstance({ type: newType, theme: 'animals', difficulty: d, locale: 'en', page, outDir: OUT, baseName: `new-d${d}` })).qa.verify;
      console.log(`current build d${d} (control): ${ctrl[d].length} fails${ctrl[d].length ? '\n   ' + ctrl[d].join('\n   ') : ''}`);
    }
  } finally { await browser.close(); }
  const fires = (f) => f.some((x) => /re-scaled/.test(x)) && f.some((x) => /rendered art left/.test(x));
  const ok = fires(old[3]) && old[3].length >= 4 && fires(old[1]) && ctrl[1].length === 0 && ctrl[3].length === 0;
  console.log(ok ? 'POISON OK: the pre-fix d1 and d3 fail on ruler scale + zero registration; the current build passes' : 'POISON DID NOT BEHAVE');
  process.exit(ok ? 0 : 1);
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
