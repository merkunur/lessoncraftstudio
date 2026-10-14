/**
 * verify-mps-levels.js — the Map Skills Level Set gate (2026-10-14). For every NEW level knob it renders a CLEAN page
 * (verify() must be empty) and POISONED copies of that page (one tamper each; verify() must FAIL on it):
 *   K-377 L3 turned top views · G2-369 L1 word strip · G2-370 L1 example lanes / L3 no word box ·
 *   G3-396 L1 example boxes / L3 write lanes · G2-371 L3 north arrow only.
 * A poison that the gate does not catch, or a clean page that fails, exits 1.
 *   node scripts/worksheet-gen/qa/verify-mps-levels.js
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { resolveStrings } = require('../i18n/strings.js');
const OUT = path.join(__dirname, '../out/tmp/mps/poison');
const T = (f) => require('../types/' + f + '.js');
const tamper = (spec, fn) => ({ ...spec, build(a, ctx) { const b = spec.build(a, ctx); return { ...b, bodyHtml: fn(b.bodyHtml) }; } });
const must = (re, s) => { if (!re.test(s)) throw new Error('poison needle missing: ' + re); return s; };

const CASES = [
  { f: 'k/K-377-maps-birds-eye-view', lv: 3, loc: 'en', expect: { 'turn stamp removed': 'no turns stamp', 'a turned plan drawn upright': 'drawn turned' }, poisons: {
    'turn stamp removed': (h) => must(/ data-lcs-turns='[^']*'/, h).replace(/ data-lcs-turns='[^']*'/, ''),
    'a turned plan drawn upright': (h) => must(/ data-lcs-turn="(90|270)"/, h).replace(/ data-lcs-turn="(90|270)"/, ''),
  } },
  { f: 'g2/G2-369-maps-north-east-south-west', lv: 1, loc: 'de', expect: { 'strip word wrong': '≠ dirWords', 'strip removed': 'word strip is missing' }, poisons: {
    'strip word wrong': (h) => must(/(data-lcs-strip-word[^>]*>)[^<]+/, h).replace(/(data-lcs-strip-word[^>]*>)[^<]+/, '$1Nordost'),
    'strip removed': (h) => must(/<div data-lcs-word-strip[\s\S]*?<\/span><\/span><\/div>/, h).replace(/<div data-lcs-word-strip[\s\S]*?<\/span><\/span><\/div>/, ''),
  } },
  { f: 'g2/G2-370-maps-label-the-continents', lv: 1, loc: 'fr', expect: { 'example lane prints another name': 'example lane', 'example lane unstamped': 'written example lanes' }, poisons: {
    'example lane prints another name': (h) => {
      const re = /data-lcs-lane="\d+" data-lcs-given[^]*?<text[^>]*>([^<]+)<\/text>/;
      const m = must(re, h).match(re);
      return h.replace(m[0], m[0].replace('>' + m[1] + '<', '>Atlantis<'));
    },
    'example lane unstamped': (h) => must(/ data-lcs-given='[^']*'/, h).replace(/ data-lcs-given='[^']*'/, ''),
  } },
  { f: 'g2/G2-370-maps-label-the-continents', lv: 3, loc: 'sv', expect: { 'a word box on the no-box level': 'word box is printed' }, poisons: {
    'a word box on the no-box level': (h) => must(/(<div data-lcs-world-card[^]*?<\/div>)/, h).replace(/(<div data-lcs-world-card[^]*?<\/div>)/, '$1<div class="ws-bank"><span class="ws-bankword" data-lcs-bank-word="europe"><span>x</span></span></div>'),
  } },
  { f: 'g3/G3-396-maps-continents-and-oceans', lv: 1, loc: 'it', expect: { 'example box shows a wrong number': 'given index box' }, poisons: {
    'example box shows a wrong number': (h) => must(/(data-lcs-given style="[^"]*">)(\d+)</, h).replace(/(data-lcs-given style="[^"]*">)(\d+)</, (x, a, n) => a + (+n === 1 ? 2 : 1) + '<'),
  } },
  { f: 'g3/G3-396-maps-continents-and-oceans', lv: 3, loc: 'da', expect: { 'a lane answer swapped': 'hidden answer' }, poisons: {
    'a lane answer swapped': (h) => {
      const m = [...h.matchAll(/data-lcs-lane="(\d+)"[^]*?data-lcs-answer="([^"]+)"/g)];
      if (m.length < 2) throw new Error('poison needle missing: lanes');
      return h.replace(`data-lcs-answer="${m[0][2]}"`, 'data-lcs-answer="__X__"').replace(`data-lcs-answer="${m[1][2]}"`, `data-lcs-answer="${m[0][2]}"`).replace('data-lcs-answer="__X__"', `data-lcs-answer="${m[1][2]}"`);
    },
  } },
  { f: 'g2/G2-371-maps-directions-on-a-map', lv: 3, loc: 'fi', expect: { 'north-only stamp removed (an arrow on a rose page)': 'north arrow on the F5', 'no north arrow on the north-only level': 'no north arrow' }, poisons: {
    'north-only stamp removed (an arrow on a rose page)': (h) => must(/ data-lcs-north-only='true'/, h).replace(/ data-lcs-north-only='true'/, ''),
    'no north arrow on the north-only level': (h) => must(/ data-lcs-north="[^"]*"/, h).replace(/ data-lcs-north="[^"]*"/, ' data-lcs-gone="x"'),
  } },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let bad = 0, killed = 0, n = 0;
  try {
    for (const c of CASES) {
      const spec = T(c.f);
      const strings = resolveStrings(spec.id, c.loc, spec);
      const run = async (type, tag) => (await renderInstance({ type, theme: null, difficulty: c.lv, locale: c.loc, strings, variant: 2, seedVariant: 2, page, outDir: OUT, baseName: `${spec.id}-d${c.lv}-${c.loc}-${tag}` })).qa.verify || [];
      const clean = await run(spec, 'clean');
      if (clean.length) { bad++; console.log(`FAIL clean ${spec.id} L${c.lv} ${c.loc}: ${clean.join(' | ')}`); } else console.log(`clean ${spec.id} L${c.lv} ${c.loc}: PASS`);
      for (const [name, fn] of Object.entries(c.poisons)) {
        n++;
        let v;
        try { v = await run(tamper(spec, fn), 'p' + n); } catch (e) { bad++; console.log(`FAIL poison "${name}" did not apply: ${e.message}`); continue; }
        const want = (c.expect || {})[name];
        if (v.length && want && !v.some((x) => x.includes(want))) { bad++; console.log(`  poison ${spec.id} "${name}": killed for ANOTHER reason (${v[0].slice(0, 80)})`); continue; }
        if (v.length) { killed++; console.log(`  poison ${spec.id} "${name}": KILLED (${v[0].slice(0, 80)})`); } else { bad++; console.log(`  poison ${spec.id} "${name}": SURVIVED`); }
      }
    }
  } finally { await browser.close(); }
  console.log(`${bad ? 'FAIL' : 'PASS'} (${killed}/${n} poisons killed)`);
  process.exit(bad ? 1 : 0);
})();
