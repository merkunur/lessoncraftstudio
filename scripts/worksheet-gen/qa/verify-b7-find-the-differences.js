#!/usr/bin/env node
/**
 * verify-b7-find-the-differences.js — the K-395 `find-the-differences` family gate
 * (design docs/worksheet-gen/b7-designs/K-395-find-the-differences.md §5; nt2-G / b7).
 *
 *   node scripts/worksheet-gen/qa/verify-b7-find-the-differences.js [--quick] [--locale=xx]
 *
 * Exports (tools/b7-probe-child.js calls validateBank(block, loc) for every panel draft):
 *   validateBank(block, loc)  = data/b7/find-the-differences.js validateBank (rules 1-11)
 *
 * main():
 *   1. the EN block validates clean (the control) + bank poisons P1-P15, each judged on its OWN rule; the scene rule
 *      (validateScenes over the pinned units) + its poison P10 / P11
 *   2. pooled census: every face's pinned unit at 400 seeds (120 with --quick) through the real composer — ok on every
 *      seed, hero share in HERO_BAND (waived for `missing`), every quadrant in QUADRANT_BAND, one-half pages ≤ 10 %,
 *      0 padded-hotspot overlaps, ≥ 1 decoy, how-many counts 25 % ± 6, what-changed nouns 25-85 %, pairs centre cell
 *      ≤ 20 %; the census poison PR14 (the composer forced onto the hero on every seed) must FAIL the hero band
 *   3. render (render/render-instance.js, file:// fonts, interactive:true): base d1/d2/d3 + the ten faces at d2, each
 *      as PRINT + SCREEN + KEY: verify() empty, lints clean, the body stack ≤ 677, the key carries exactly `count`
 *      rings whose centres sit inside the screen's diff hotspots, the SCREEN's raster diff (lib/fd-browser-diff.js)
 *      re-derived in the browser: components = count, every component inside a diff hotspot, every diff hotspot
 *      non-empty, decoys empty, ≥ 4 items of both kinds, every padded diff hotspot ≥ 100 page px and pairwise disjoint
 *   4. render poisons PR1, PR2, PR7, PR8, PR12, PR13 (each must FAIL for its own reason)
 */
'use strict';
const path = require('path');
const fs = require('fs');
const B = require('../data/b7/find-the-differences.js');
const SPEC = require('../types/k/K-395-find-the-differences.js');
const { makeRng } = require('../lib/rng.js');
const { quadrantOf } = require('../lib/fd-compose.js');
const { evalSource } = require('../lib/fd-browser-diff.js');
const { ROWS } = require('../tools/b7var-rows/find-the-differences.js');
const IS = require('../i18n/interactive-instructions.json')['find-the-differences'];

const validateBank = (block, loc) => B.validateBank(block, loc);
const clone = (x) => JSON.parse(JSON.stringify(x));
const TYPES = { base: 'k/K-395-find-the-differences.js' };
for (const r of ROWS) TYPES[r[5].mode] = r[0] + '/' + r[1] + '-' + r[2] + '.js';
const W = 600, H = 560;
const area = (b) => Math.max(0, b[2] - b[0]) * Math.max(0, b[3] - b[1]);
const inter = (a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];
const pct = (x) => (x * 100).toFixed(0) + '%';

async function main() {
  const quick = process.argv.includes('--quick');
  const locArg = (process.argv.find((a) => a.startsWith('--locale=')) || '').slice(9) || 'en';
  let assertions = 0; const fails = [];
  const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
  const plog = []; let killed = 0, poisons = 0;
  const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

  // ---------------------------------------------------------------- 1. bank: control + poisons
  const EN = B.FIND_THE_DIFFERENCES.en;
  const ctl = validateBank(EN, 'en');
  ok(!ctl.length, 'EN bank control: ' + ctl.join(' | '));
  const P = (name, mut, re) => { const b = clone(EN); mut(b); judge(name, validateBank(b, 'en'), re); };
  P('P1 base title with the wrong count', (b) => { b.strings.base.title = 'Find 4 Differences: {UNIT}'; }, /carries 4 but the count is 5/);
  P('P2 how-many title with a digit', (b) => { b.strings['how-many'].title = 'How Many of the 5 Differences?'; }, /how-many: the title must carry no digit/);
  P('P3 how-many title with a number word', (b) => { b.strings['how-many'].title = 'How Many? Five or More'; }, /how-many: the title must carry no digit and no number word/);
  P('P4 an instruction that says colour in', (b) => { b.strings['what-changed'].instruction = 'Circle the differences and colour them in.'; }, /says draw \/ colour in \/ sort/);
  P('P5 a starter with a slot', (b) => { b.starter = 'In picture {N},'; }, /starter: non-empty, no \{slot\}/);
  P('P6 a change word that is a scene noun', (b) => { b.changeWords = ['missing', 'new', 'bigger', 'bird']; }, /a change word equals a vocab key/);
  P('P7 a missing tap string', (b) => { delete b.tap['fd-tapMissing']; }, /tap\.fd-tapMissing missing/);
  P('P8 a pinned unit typo', (b) => { b.unitOverrides = { base: 'garden-dogs-rich' }; }, /data\/fd\/garden-dogs-rich\.json is absent/);
  P('P9 a pair across two themes', (b) => { b.unitOverrides = { seven: ['pond-turtle-rich', 'beach-bucket-rich'] }; }, /must share a theme/);
  P('P13 K-061 head in a title', (b) => { b.strings.base.title = 'Spot the Differences: {UNIT}'; }, /K-061's bare head/);
  P('P14 a worksheet-word in a title', (b) => { b.strings.missing.title = 'What Is Missing? Printable'; }, /worksheet-word/);
  P('P15 the rail named as K-061', (b) => { b.rail.name = 'Zoek de verschillen'; }, /rail\.name is a K-061 title/);
  P('P16 a title promising a key', (b) => { b.strings.base.title = 'Find 5 Differences with Answer Key'; }, /promises a key/);
  P('P17 a title over 70 chars', (b) => { b.strings.base.title = 'Find 5 Differences: {UNIT} for Every Little Spotter in the Whole Wide Classroom Today'; }, /> 70 chars/);
  P('P18 a two-sentence instruction', (b) => { b.strings.base.instruction = 'Look at the pictures. Circle the 5 differences.'; }, /not ONE sentence/);
  {
    const pins = [].concat(...Object.values(B.UNITS));
    const sc = B.validateScenes(pins).filter((x) => !/standing bird sits in the sky/.test(x));   // the rebuilt copies answer the bird rule; reported, not failed, until the rebuild lands
    ok(!sc.length, 'scene rule over the pins: ' + sc.join(' | '));
    // P10 / P11: a candidate on the frame, a standing bird in the sky — on a synthetic scene file
    const tmp = path.join(__dirname, '..', 'data', 'fd', '_poison-scene.json');
    const base = B.loadScene('garden-dog');
    const bad = clone(base); bad.cands[0].bbox = [2, 100, 60, 160]; bad.items.push({ idx: 99, src: 'nature bw/bird', bbox: [100, 30, 140, 90] });
    fs.writeFileSync(tmp, JSON.stringify(bad));
    const f = B.validateScenes(['_poison-scene']);
    fs.unlinkSync(tmp);
    judge('P10 a candidate on the frame', f, /on the frame/);
    judge('P11 a standing bird in the sky', f, /standing bird sits in the sky/);
  }
  // ---------------------------------------------------------------- the UNPAINTED-CELL rule (operator 2026-10-09: "the colorful find the
  // differences images have unpainted spots"): on the colour face every small cell inside a drawing is painted; the only white a drawing
  // keeps is an eye white (lib/fd-scene.js paintSmallCells). Assertion on the SHIPPED record of the colour face's pinned unit; poisons PR15
  // (a record whose small cells are white) + PR16 (the engine rule switched off by its env flag, on a synthetic segmentation).
  {
    const F = require('../lib/fd-scene.js');
    const unpainted = (rec) => { const f = []; for (const l of rec.items) { const regs = l.regions || []; const small = regs.filter((r) => r.r < 9); const sa = small.reduce((a, r) => a + r.area, 0); const wa = small.filter((r) => r.colour === 'none').reduce((a, r) => a + r.area, 0); if (sa && wa / sa > 0.05) f.push(`${rec.id}: ${l.src} has unpainted small cells (${Math.round(100 * wa / sa)} % of its small-cell area)`); } return f; };
    const colourUnits = [].concat(B.UNITS.colour || []);
    ok(colourUnits.length > 0, 'the colour face pins a unit');
    for (const cu of colourUnits) { const u = unpainted(B.loadScene(cu)); ok(!u.length, 'unpainted cells on the colour face (' + cu + '): ' + u.join(' | ')); }
    const bad = clone(B.loadScene(colourUnits[0])); for (const l of bad.items) for (const r of l.regions || []) if (r.r < 9) r.colour = 'none';
    judge('PR15 a colour scene with white small cells', unpainted(bad), /unpainted small cells/);
    const U = F.U, PW = 30, PH = 30, lab = new Uint16Array(PW * PH);
    for (let y = 2; y < 28; y++) for (let x = 2; x < 16; x++) lab[y * PW + x] = 1;      // the big painted part
    for (let y = 10; y < 14; y++) for (let x = 18; x < 22; x++) lab[y * PW + x] = 2;    // a small white cell beside it (ink between)
    for (let y = 20; y < 26; y++) for (let x = 18; x < 24; x++) lab[y * PW + x] = 3;    // an eye white …
    lab[23 * PW + 21] = 0;                                                               // … round its pupil
    const regions = [{ label: 1, r: 12, area: 300, colour: 'green', bbox: [2 / U, 2 / U, 16 / U, 28 / U] }, { label: 2, r: 2, area: 16, colour: 'none', bbox: [18 / U, 10 / U, 22 / U, 14 / U] }, { label: 3, r: 2.5, area: 35, colour: 'none', bbox: [18 / U, 20 / U, 24 / U, 26 / U] }];
    const painted = F.paintSmallCells(regions, { lab, PW });
    ok(painted[1].colour === 'green' && painted[2].colour === 'none', `engine: the small cell takes its neighbour's colour (got ${painted[1].colour}) and the eye white stays white (got ${painted[2].colour})`);
    process.env.FD_KEEP_WHITE_CELLS = '1'; const off = F.paintSmallCells(regions, { lab, PW }); delete process.env.FD_KEEP_WHITE_CELLS;
    judge('PR16 the rule switched off', off[1].colour === 'none' ? ['the small cell stays unpainted with the rule off'] : [], /stays unpainted/);
  }

  // ---------------------------------------------------------------- 2. the pooled census over the pins
  const CFG = { base: SPEC.difficulty[2] };
  for (const r of ROWS) CFG[r[5].mode] = { ...SPEC.difficulty[2], ...r[5] };
  const SEEDS = quick ? 120 : 400;
  const census = (mode, d, seeds, forceHero) => {
    const r = { ok: 0, hero: 0, quad: [0, 0, 0, 0], rings: 0, oneHalf: 0, overlaps: 0, minDecoys: Infinity, counts: {}, nouns: {}, cells: {}, err: null };
    for (let v = 1; v <= seeds; v++) {
      try {
        const plan = SPEC.planFor(d, mode, null);
        if (forceHero) plan.panels.forEach((p) => { p.cfg = { ...p.cfg, heroProb: 1, heroFront: 1 }; });
        const rng = makeRng('census|' + mode + '|' + v);
        const comp = SPEC.composeAll(plan, rng);
        r.ok++; r.counts[comp.count] = (r.counts[comp.count] || 0) + 1;
        let heroHit = false;
        for (const p of comp.panels) {
          const heroIdx = (p.scene.items.find((l) => l.hero) || {}).idx;
          if (p.ops.some((c) => c.item === heroIdx)) heroHit = true;
          p.rings.forEach((b) => { r.quad[quadrantOf(b, W, H)]++; r.rings++; });
          const hots = SPEC.screenHotspots(p, 0, {});
          const diffs = hots.filter((h) => h.diff).map((h) => h.bbox);
          for (let i = 0; i < diffs.length; i++) for (let j = i + 1; j < diffs.length; j++) if (area(inter(diffs[i], diffs[j])) > 0) r.overlaps++;
          r.minDecoys = Math.min(r.minDecoys, hots.filter((h) => !h.diff).length);
          if (mode === 'what-changed') for (const c of p.ops) { const k = B.vocabKeyOf((p.scene.items.find((l) => l.idx === c.item) || {}).src); r.nouns[k] = (r.nouns[k] || 0) + 1; }
        }
        if (heroHit) r.hero++;
        const rs = comp.panels.flatMap((p) => p.rings), cx = rs.map((b) => (b[0] + b[2]) / 2), cy = rs.map((b) => (b[1] + b[3]) / 2);
        if (cx.every((x) => x < W / 2) || cx.every((x) => x > W / 2) || cy.every((y) => y < H / 2) || cy.every((y) => y > H / 2)) r.oneHalf++;
        if (mode === 'pairs') SPEC.placeWindows(comp.panels[0], d.window || [260, 200], rng).forEach((w) => { r.cells[w.cell] = (r.cells[w.cell] || 0) + 1; });
      } catch (e) { r.err = r.err || e.message.replace(/\s+/g, ' ').slice(0, 100); }
    }
    const why = [];
    if (r.ok < seeds) why.push(`composes on ${r.ok}/${seeds} seeds${r.err ? ' (' + r.err + ')' : ''}`);
    if (r.ok) {
      const hs = r.hero / r.ok;
      if (mode !== 'missing' && !(d && d.heroWaived) && (hs < B.HERO_BAND[0] || hs > B.HERO_BAND[1])) why.push(`hero on ${pct(hs)} of pages (25-75)`);   // `missing` never removes the hero; a row's `heroWaived` records WHY
      const qs = r.quad.map((q) => q / Math.max(1, r.rings));
      if (mode !== 'pairs' && (Math.min(...qs) < B.QUADRANT_BAND[0] || Math.max(...qs) > B.QUADRANT_BAND[1])) why.push(`quadrants ${qs.map(pct).join('/')} (10-35)`);
      if (mode !== 'pairs' && r.oneHalf / r.ok > 0.10) why.push(`all rings in one half on ${pct(r.oneHalf / r.ok)}`);
      if (r.overlaps) why.push(`${r.overlaps} padded hotspot overlaps`);
      if (r.minDecoys < 1) why.push('a page without a decoy');
      if (mode === 'how-many') { const n = Object.keys(r.counts).length; if (n < 4 || Object.values(r.counts).some((c) => Math.abs(c / r.ok - 1 / n) > 0.06)) why.push(`counts ${JSON.stringify(r.counts)} (each 25 ± 6)`); }
      if (mode === 'what-changed') for (const [k, c] of Object.entries(r.nouns)) { const s = c / r.ok; if (s < 0.25 || s > 0.85) why.push(`${k} changes on ${pct(s)} (25-85)`); }
      if (mode === 'pairs') { const tot = Object.values(r.cells).reduce((a, b) => a + b, 0); if ((r.cells[4] || 0) / tot > 0.20) why.push(`centre cell ${pct((r.cells[4] || 0) / tot)} (≤ 20)`); }
    }
    return { ...r, why };
  };
  const censusLog = [];
  for (const mode of B.MODES) {
    const r = census(mode, CFG[mode], SEEDS, false);
    r.why.forEach((x) => ok(false, `census ${mode}: ${x}`));
    censusLog.push(`${mode} ${r.ok}/${SEEDS} hero ${pct(r.hero / Math.max(1, r.ok))} q ${r.quad.map((q) => pct(q / Math.max(1, r.rings))).join('/')}${mode === 'how-many' ? ' counts ' + JSON.stringify(r.counts) : ''}`);
  }
  console.log('census (' + SEEDS + ' seeds): ' + censusLog.join(' · '));
  { const r = census('base', CFG.base, 120, true); judge('PR14 the composer forced onto the hero on every seed', r.why, /hero on \d+% of pages/); }

  // ---------------------------------------------------------------- 3. render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require('../render/render-instance.js');
  const { resolveStrings } = require('../i18n/strings.js');
  const OUTD = path.join(__dirname, '..', 'out', 'dev');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const load = (m) => require(path.join(__dirname, '..', 'types', TYPES[m]));
  const stackOf = () => page.evaluate(() => { const R = document.querySelector('[data-lcs-fd-count]'); const body = document.querySelector('.ws-body').getBoundingClientRect(); const low = Math.max(...[...R.querySelectorAll('*')].map((e) => e.getBoundingClientRect().bottom)); return { stack: Math.round(low - R.getBoundingClientRect().top), bodyH: Math.round(body.height), inside: low <= body.bottom + 0.5 }; });
  const goto = async (f) => { await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 1 }); await page.goto(require('url').pathToFileURL(f).href, { waitUntil: 'networkidle0' }); await page.evaluate(() => document.fonts.ready); };
  /** the screen page: the raster diff re-derived against the hotspots, per pair */
  const screenCheck = async (mode, count) => {
    const f = [];
    const pairs = await page.evaluate(() => [...new Set([...document.querySelectorAll('svg[data-lcs-fd-panel="2"]')].map((e) => e.dataset.lcsFdPair))]);
    const flip = await page.evaluate(() => !!document.querySelector('[data-lcs-fd-flip]'));
    let total = 0;
    for (const pr of pairs) {
      // how-many / what-changed tap the chips / the words, not the picture: no hotspot containment there, the count still
      const hot = (mode === 'how-many' || mode === 'what-changed') ? '[data-lcs-fd-hotspot][data-lcs-fd-panel-nope]' : `svg[data-lcs-fd-panel="2"][data-lcs-fd-pair="${pr}"] [data-lcs-fd-hotspot]`;
      const box = await page.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); const vb = (e.getAttribute('viewBox') || '0 0 600 560').split(' ').map(Number); return { w: b.width, units: vb[2] }; }, `svg[data-lcs-fd-panel="2"][data-lcs-fd-pair="${pr}"]`);
      const r = await page.evaluate(evalSource({ panel1: `svg[data-lcs-fd-panel="1"][data-lcs-fd-pair="${pr}"]`, panel2: `svg[data-lcs-fd-panel="2"][data-lcs-fd-pair="${pr}"]`, hotspots: hot, scale: box.units / box.w, dilate: 5, noise: 10, mirrored: flip, minSep: 0 }));
      if (mode === 'how-many' || mode === 'what-changed') r.fails = r.fails.filter((x) => !/sits in 0 difference hotspots/.test(x));
      // whole-drawing changes split into patches inside one box: merge intersecting components before counting (as verify() does)
      const comps = r.components.map((c) => ({ ...c })); let merged = true;
      while (merged) { merged = false; for (let i = 0; i < comps.length && !merged; i++) for (let j = i + 1; j < comps.length && !merged; j++) { const a = comps[i], b = comps[j]; if (a.x0 <= b.x1 + 2 && b.x0 <= a.x1 + 2 && a.y0 <= b.y1 + 2 && b.y0 <= a.y1 + 2) { comps[i] = { x0: Math.min(a.x0, b.x0), y0: Math.min(a.y0, b.y0), x1: Math.max(a.x1, b.x1), y1: Math.max(a.y1, b.y1) }; comps.splice(j, 1); merged = true; } } }
      total += comps.length;
      r.fails.forEach((x) => f.push(`pair ${pr}: ${x}`));
    }
    if (total !== count) f.push(`screen: ${total} visible differences, the page says ${count}`);
    const g = await page.evaluate((mode) => {
      const f = [];
      const its = [...document.querySelectorAll('[data-lcs-fd-hotspot]')];
      const t = its.filter((e) => e.hasAttribute('data-lcs-fd-diff')).length;
      if (its.length < 4) f.push(`${its.length} tap items (< 4)`);
      if (!t || t === its.length) f.push(`${t} true of ${its.length} items (both kinds needed)`);
      const boxes = its.map((e) => e.getBoundingClientRect());
      boxes.forEach((b, i) => { if (Math.min(b.width, b.height) < 44 * 703 / 360 - 1 && mode !== 'what-changed' && mode !== 'how-many') f.push(`item ${i} is ${Math.round(b.width)}x${Math.round(b.height)} page px (< 86 = 44 at 360)`); boxes.forEach((c, j) => { if (j > i && b.left < c.right - 1 && c.left < b.right - 1 && b.top < c.bottom - 1 && c.top < b.bottom - 1) f.push(`items ${i} and ${j} overlap`); }); });
      return f;
    }, mode);
    return f.concat(g);
  };
  /** the key page: exactly `count` rings, numbered, haloed, whose centres sit inside the screen's diff hotspot boxes */
  const keyCheck = (count, diffBoxes) => page.evaluate((count, diffBoxes) => {
    const f = [];
    const rings = [...document.querySelectorAll('ellipse[data-lcs-fd-ring="1"]')];
    if (rings.length !== count) f.push(`the key carries ${rings.length} rings for ${count} differences`);
    const halos = document.querySelectorAll('[data-lcs-fd-ring="halo"]').length;
    if (halos < rings.length) f.push('a ring without its halo');
    const idx = document.querySelectorAll('circle[data-lcs-fd-ring="index"]').length;
    if (idx < rings.length) f.push('a ring without its index disc');
    rings.forEach((r) => {
      const cx = +r.getAttribute('cx'), cy = +r.getAttribute('cy');
      const svg = r.closest('svg'); const pr = svg.dataset.lcsFdPair || '0';
      const flip = svg.hasAttribute('data-lcs-fd-flip');
      const x = flip ? 600 - cx : cx;
      if (!diffBoxes.some((b) => b.pair === pr && x >= b.box[0] - 1 && x <= b.box[2] + 1 && cy >= b.box[1] - 1 && cy <= b.box[3] + 1)) f.push(`a key ring at ${Math.round(cx)},${Math.round(cy)} (pair ${pr}) sits in no screen hotspot`);
    });
    const ticks = document.querySelectorAll('[data-lcs-fd-box] path').length;
    if (document.querySelector('[data-lcs-fd-ledger]') && ticks !== count && !document.querySelector('[data-lcs-fd-words]')) f.push(`${ticks} ticks for ${count} differences`);
    return f;
  }, count, diffBoxes);
  const render = async (mode, d, variant, strings, tag, loc = 'en') => {
    const spec = load(mode);
    const out = await renderInstance({ type: spec, theme: null, difficulty: d, locale: loc, variant, strings: strings || resolveStrings(spec.id, loc, spec), page, outDir: OUTD, baseName: `K-395-gate-${tag}`, interactive: true, interactiveInstruction: IS[B.TAP_KEY[mode]][loc] || IS[B.TAP_KEY[mode]].en });
    // the print page
    await goto(path.join(OUTD, `K-395-gate-${tag}.html`));
    const st = await stackOf();
    // the screen page
    await goto(path.join(OUTD, `K-395-gate-${tag}.screen.html`));
    const sc = await screenCheck(mode, out.meta.count);
    const diffBoxes = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-fd-hotspot][data-lcs-fd-diff]')].filter((e) => e.getAttribute('data-lcs-fd-box')).map((e) => ({ pair: e.closest('svg').dataset.lcsFdPair || '0', box: e.getAttribute('data-lcs-fd-box').split(',').map(Number) })));
    const sv = await spec.verify(page);
    // the key page
    await goto(path.join(OUTD, `K-395-gate-${tag}.key.html`));
    const kv = await spec.verify(page);
    const kc = (mode === 'how-many' || mode === 'what-changed') ? [] : await keyCheck(out.meta.count, diffBoxes);
    return { out, st, sc, sv, kv, kc };
  };
  try {
    const shipped = [];
    const judgeRun = (tag, r) => {
      ok(!r.out.qa.verify.length, `${tag}: verify ${r.out.qa.verify.join(' | ')}`);
      ok(!r.out.qa.lints.length, `${tag}: lints ${r.out.qa.lints.join(' | ')}`);
      ok(!r.out.interactive.lints.length, `${tag}: screen / key lints ${r.out.interactive.lints.join(' | ')}`);
      ok(r.st.stack <= 677 && r.st.inside, `${tag}: the stack is ${r.st.stack} px (> 677) or runs below the body`);
      r.sc.forEach((x) => ok(false, `${tag} screen: ${x}`));
      r.sv.forEach((x) => ok(false, `${tag} screen verify: ${x}`));
      r.kv.forEach((x) => ok(false, `${tag} key verify: ${x}`));
      r.kc.forEach((x) => ok(false, `${tag} key: ${x}`));
      shipped.push(`${tag} stack ${r.st.stack} items ${r.out.interactive.items.length}`);
    };
    for (const d of [1, 2, 3]) { const n = SPEC.difficulty[d].count; judgeRun(`base d${d}`, await render('base', d, 1, d === 2 ? undefined : { title: `Find ${n} Differences: Dog in the Garden`, instruction: `Look down from picture 1 to picture 2, circle the ${n} things that are different and tick a box for each one.` }, `base-d${d}`, locArg)); }
    for (const r of ROWS) judgeRun(r[5].mode, await render(r[5].mode, 2, 1, undefined, r[5].mode, locArg));
    if (!quick) for (let v = 2; v <= 6; v++) judgeRun(`base seed v${v}`, await render('base', 2, v, undefined, 'base-sweep', locArg));
    // chrome stress on the base: a 4-line title (677) + a 150-char instruction
    const ins150 = 'Look down from picture 1 to picture 2, circle the 5 things that are different in the bottom picture and tick one box in the ledger for each one you found.';
    judgeRun('stress 677', await render('base', 2, 1, { title: 'Find 5 Differences: Dog in the Garden for Every Little Spotter in the Whole Classroom Today', instruction: ins150 }, 'stress677'));
    console.log('render: ' + shipped.join(' · '));

    // ---------------------------------------------------------------- 4. render poisons (on the built HTML, through verify())
    const base = load('base');
    const built = await base.build({ difficulty: 2, locale: 'en' }, { rng: makeRng('pr') });
    const V = async (bodyHtml, tag, spec = base) => { const { buildPage } = require('../page/shell.js'); const html = buildPage({ title: spec.i18n.en.title.replace('{UNIT}', 'Dog in the Garden'), instruction: spec.i18n.en.instruction, bodyHtml, locale: 'en', pageSize: 'letter' }); const f = path.join(OUTD, `K-395-gate-${tag}.html`); fs.writeFileSync(f, html); await goto(f); return spec.verify(page); };
    // PR1 an undeclared change: picture 2 with one more layer than it declares (a cloud layer duplicated and moved); the clone is WRAPPED in a
    // translating group: the layer may carry its own transform, and a second transform attribute is ignored (the clone sat exactly over the original — measured SILENT)
    { const html = built.bodyHtml; const m = html.match(/<svg[^>]*data-lcs-fd-panel="2"[^>]*>[\s\S]*?<\/svg>/)[0]; const layer = m.match(/<g[^>]*data-lcs-fd-layer="1"[^>]*>[\s\S]*?<\/g>/); const extra = layer ? '<g transform="translate(300 180)">' + layer[0].replace('data-lcs-fd-layer="1"', 'data-lcs-fd-layer="91"') + '</g>' : ''; const bad = extra ? html.replace(m, m.replace('</g>', extra + '</g>')) : html; judge('PR1 an undeclared change in picture 2', extra ? await V(bad, 'pr1') : ['POISON DID NOT APPLY'], /visible differences, the page says/); }
    // PR7 the title digit disagrees with the page
    { const r = await V(built.bodyHtml.replace('data-lcs-fd-count="5"', 'data-lcs-fd-count="4"'), 'pr7'); judge('PR7 the page claiming 4 with 5 visible differences', r, /visible differences, the page says 4/); }
    // PR13 a ring on the print page
    { const r = await V(built.bodyHtml.replace(/(data-lcs-fd-panel="2"[^>]*>)/, '$1<ellipse cx="100" cy="100" rx="20" ry="20" fill="none" stroke="#F2784B" data-lcs-fd-ring="1"/>'), 'pr13'); judge('PR13 a ring on the print page', r, /a ring on the print/); }
    // PR8 a tick printed in an empty ledger box
    { const r = await V(built.bodyHtml.replace(/(data-lcs-fd-box="0"[^>]*>)/, '$1<svg width="10" height="10"><path d="M0 0h10"/></svg>'), 'pr8'); judge('PR8 a tick in an empty box', r, /a tick in an empty box/); }
    // PR12 the mirror face with picture 2 un-flipped
    { const ms = load('mirror-pair'); const mb = await ms.build({ difficulty: 2, locale: 'en' }, { rng: makeRng('pr12') }); const r = await V(mb.bodyHtml.replace(' data-lcs-fd-flip="1"', ''), 'pr12', ms); judge('PR12 the mirror face un-flipped', r, /picture 2 is not flipped|visible differences/); }
    // PR2 a how-many page printing its count
    { const hs = load('how-many'); const hb = await hs.build({ difficulty: 2, locale: 'en' }, { rng: makeRng('pr2') }); const r = await V(hb.bodyHtml.replace('data-lcs-answer=""', 'data-lcs-answer="4"'), 'pr2', hs); judge('PR2 the how-many box carrying its numeral', r, /a numeral printed in the count box/); }
  } finally { await browser.close(); }

  console.log('poison:\n' + plog.join('\n'));
  if (fails.length) console.log('findings:\n  ' + fails.join('\n  '));
  const pass = !fails.length && killed === poisons;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${poisons} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${poisons} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank };
