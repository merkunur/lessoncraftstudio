#!/usr/bin/env node
/**
 * verify-htd-guides.js — the dotted-shape How to Draw pages (2026-10-13): every page that prints dotted guide shapes
 * draws a lesson DRAWN from those shapes (data/htdv, lib/htd-vector.js), so a child who goes over the dots never has a
 * line to erase (operator 2026-10-12: the fitted ellipses did not match the library drawings).
 *   A  every drawing re-compiles from its source with all four laws (guide ⊆ ink · no erasing between steps · the steps
 *      partition the ink · ≥ 2 real shapes) and matches its committed JSON
 *   B  every guide page (published K-401 + the Level Set K-396 L1 / K-401 L1-3 / G2-391 L1 of data/htdx/allocation.json)
 *      builds from a vector lesson, prints its dotted paths, and no other page does
 *   P  poisons: the OLD fitted dog guides over the drawn dog (law 1) · a guide shifted 6 units (law 1) · a part added in
 *      front of an earlier line in a later step (law 2) · a guide in step 2 · a page built from the library lesson —
 *      each must FAIL; the control (the real dog) must PASS
 *   node qa/verify-htd-guides.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..');
const V = require(path.join(ROOT, 'lib', 'htd-vector.js'));
const B = require(path.join(ROOT, 'data', 'b7', 'how-to-draw.js'));
const { loadType } = require(path.join(ROOT, 'lib', 'load-types.js'));
const SRC = path.join(ROOT, 'data', 'htdv', 'src');
let fails = 0; const fail = (m) => { fails++; console.log('FAIL ' + m); };
const load = (k) => { const p = path.join(SRC, k + '.js'); delete require.cache[require.resolve(p)]; return require(p); };

(async () => {
  // A — the laws, re-measured
  const keys = fs.readdirSync(SRC).filter((f) => f.endsWith('.js')).map((f) => f.slice(0, -3));
  const used = new Set(Object.values(B.VECTOR));
  for (const k of used) if (!keys.includes(k)) fail(`A: ${k} is mapped (data/b7/how-to-draw.js VECTOR) but has no source`);
  if (keys.length < 20) fail(`A: only ${keys.length} drawings (refusing to report on a near-empty set)`);
  for (const k of keys) {
    const S = await V.compile(load(k), { report: true });
    if (S.stats.fails.length) fail(`A ${k}: ${S.stats.fails.join('; ')}`);
    const f = path.join(ROOT, 'data', 'htdv', k + '.json');
    if (!fs.existsSync(f)) { fail(`A ${k}: no compiled JSON (node tools/htdv-build.js)`); continue; }
    const J = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (J.full !== S.full || JSON.stringify(J.shapes) !== JSON.stringify(S.shapes)) fail(`A ${k}: data/htdv/${k}.json is stale (rebuild)`);
  }
  console.log(`A ${keys.length} drawings re-compiled`);

  // B — the pages
  const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'htdx', 'allocation.json'), 'utf8'));
  const pages = [['K-401', 2, null]];
  for (const [id, lvs] of [['K-396', [1]], ['K-401', [1, 2, 3]], ['G2-391', [1]]]) for (const lv of lvs) for (const c of A.faces[id][lv]) pages.push([id, lv, c.unit]);
  const rng = () => 0.5;
  let nPages = 0;
  for (const [id, lv, unit] of pages) {
    const T = loadType(id);
    const r = T.build({ difficulty: lv, locale: 'en', unit: unit || undefined }, { rng });
    const h = r.bodyHtml;
    nPages++;
    if (!/data-lcs-htd-lesson="vector"/.test(h)) fail(`B ${id} d${lv} ${unit}: not built from a drawn lesson`);
    const g = (h.match(/data-lcs-htd-guide="/g) || []).length;
    if (g < 2) fail(`B ${id} d${lv} ${unit}: ${g} dotted shapes printed`);
    if (/<ellipse[^>]*stroke-dasharray/.test(h)) fail(`B ${id} d${lv} ${unit}: a fitted dashed ellipse is still printed`);
    // level 3 prints only the two biggest shapes: a drawing with a third shape in FRONT of them would leave them open
    // (a keyhole head where a muzzle was dropped — the visual review, 2026-10-13), so a level-3 drawing has exactly two
    if (id === 'K-401' && lv === 3) { const S = B.vectorStepsFor(unit); if (S.shapes.length !== 2) fail(`B ${id} d3 ${unit}: ${S.shapes.length} shapes (a level-3 drawing must have exactly 2)`); }
  }
  // pages WITHOUT guides keep the library lesson (the published faces stay byte-identical)
  for (const [id, lv] of [['K-396', 2], ['G2-391', 2], ['K-402', 2], ['K-403', 2]]) {
    const h = loadType(id).build({ difficulty: lv, locale: 'en' }, { rng }).bodyHtml;
    if (/data-lcs-htd-lesson=/.test(h)) fail(`B ${id} d${lv}: a page without guides changed its lesson`);
  }
  console.log(`B ${nPages} guide pages built`);

  // P — poisons
  const dog = load('dog');
  const expectFail = async (name, src, law) => {
    const S = await V.compile(src, { report: true });
    const hit = S.stats.fails.some((m) => m.includes(law));
    console.log(`  ${name}: ${hit ? 'KILLED' : 'SURVIVED'}`);
    if (!hit) fail(`P ${name} survived (expected "${law}")`);
  };
  const ctrl = await V.compile(dog, { report: true });
  console.log(`  control (the drawn dog): ${ctrl.stats.fails.length ? 'FAIL' : 'PASS'}`);
  if (ctrl.stats.fails.length) fail('P control fails: ' + ctrl.stats.fails.join('; '));
  // P1 the old fitted guides: replace each guide with the ellipse the library engine fitted on the library dog
  const lib = B.stepsFor('animals-bw-2-dog');
  const fitted = lib.shapes.filter((s) => s.kind === 'ellipse').slice(0, 2);
  if (fitted.length < 2) fail('P1: the library dog carries fewer than 2 fitted ellipses (poison cannot run)');
  else {
    const P1 = { key: 'p1', parts: dog.parts.map((p) => p.guide ? p : p).concat(fitted.map((e, i) => ({ id: 'fit' + i, step: 1, guide: true, shape: 'oval', kind: 'line', w: 0.01, d: V.ellipse(e.cx, e.cy, e.rx, e.ry, e.angle) }))) };
    await expectFail('P1 the old fitted ellipses as guides', P1, 'law 1');
  }
  // P2 a guide shifted by 6 units
  const shift = (d, dx) => d.replace(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g, (m, x, y) => `${+x + dx} ${y}`);
  await expectFail('P2 a guide shifted 6 units', { key: 'p2', parts: dog.parts.map((p) => p.id === 'head' ? { ...p, d: shift(p.d, 6), kind: 'line', w: 0.01 } : p).concat([{ ...dog.parts.find((p) => p.id === 'head'), id: 'head-ink', guide: false, step: 1 }]) }, 'law 1');
  // P3 a step-3 part drawn IN FRONT of the step-1 body line (a bib over the body outline)
  await expectFail('P3 a later part over an earlier line', { key: 'p3', parts: dog.parts.concat([{ id: 'bib', step: 3, d: V.ellipse(300, 470, 80, 30) }]) }, 'law 2');
  // P4 a guide in step 2
  await expectFail('P4 a guide outside step 1', { key: 'p4', parts: dog.parts.map((p) => p.id === 'head' ? { ...p, step: 2 } : p) }, 'not step 1');
  // P6 the yak defect: a later part inside a dotted shape hides its dots (a front-part rule that counts every later part)
  {
    const real = V.__frontAll; V.__frontAll = true;
    try { await expectFail('P6 a later inside part breaking the dots', load('yak'), 'pieces'); } finally { V.__frontAll = real; }
  }
  // P5 a page built from the library lesson: the K-401 build with vectorStepsFor swapped for the library lesson
  const real = B.vectorStepsFor;
  B.vectorStepsFor = (s) => B.stepsFor(s.replace(/^lsx-/, '') === 'animals-bw-2-dog' ? 'animals-bw-2-dog' : s);
  try {
    const h = loadType('K-401').build({ difficulty: 2, locale: 'en' }, { rng }).bodyHtml;
    const hit = !/data-lcs-htd-lesson="vector"/.test(h);
    console.log(`  P5 a guide page on the library lesson: ${hit ? 'KILLED' : 'SURVIVED'}`);
    if (!hit) fail('P5 survived');
  } finally { B.vectorStepsFor = real; }
  console.log(fails ? `FAIL (${fails})` : 'PASS');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
