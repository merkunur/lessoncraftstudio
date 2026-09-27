/**
 * probe-face-sets.js — render EVERY label-the-face part combination (K-344) through the real print
 * pipeline + the type's own verify() and print the sets that pass (2026-09-27). The passing sets are
 * the partSets lists in types/k/K-344-all-about-me-label-the-face.js; re-run after changing the face
 * picture, its anchors or the lane geometry.   node scripts/worksheet-gen/tools/probe-face-sets.js
 */
// probe: which label-the-face part sets pass the type's own verify (pointer geometry etc.)
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const ALL = ['hair', 'nose', 'eye', 'ear', 'mouth', 'eyebrow', 'chin'];
const BASIC = ['hair', 'nose', 'eye', 'ear', 'mouth'];
function combos(arr, k) { const out = []; (function go(s, a) { if (a.length === k) { out.push(a); return; } for (let i = s; i < arr.length; i++) go(i + 1, a.concat(arr[i])); })(0, []); return out; }
(async () => {
  const spec = loadType('K-344');
  const D = spec.difficulty[3];
  const sets = [...combos(BASIC, 3).map((s) => ['d1', s]), ...combos(ALL, 5).map((s) => ['d2', s]), ...combos(ALL, 6).map((s) => ['d3', s]), ['d3', ALL]];
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const ok = { d1: [], d2: [], d3: [] };
  for (const [lv, parts] of sets) {
    const t = { ...spec, difficulty: { 2: { ...D, parts, partPool: undefined } } };
    let fails = [];
    for (const locale of ['en', 'fi', 'de']) {
      const strings = require('../i18n/strings.js').resolveStrings('K-344', locale, spec);
      const r = await renderInstance({ type: t, theme: null, difficulty: 2, locale, strings, page, outDir: path.join(__dirname, '..', 'out', 'probe-face'), baseName: 'p' });
      fails = fails.concat(r.qa.lints || [], r.qa.verify || []);
    }
    if (!fails.length) ok[lv].push(parts);
    console.log((fails.length ? 'FAIL ' : 'ok   ') + lv + ' ' + parts.join(',') + (fails.length ? '  ' + fails[0] : ''));
  }
  await browser.close();
  console.log('\nPASSING SETS\n' + JSON.stringify(ok));
})();
