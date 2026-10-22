#!/usr/bin/env node
/**
 * verify-b5-family-figure.js — the gate of primitives/family-figure.js (K-370
 * `family`). Since 2026-10-22 every bust is one of the operator's portraits
 * (tools/build-family-portraits.js → data/b5/family-portraits/), so the gate
 * checks the PORTRAIT contract, re-parsed from the EMITTED markup (never `meta`):
 *
 *   node scripts/worksheet-gen/qa/verify-b5-family-figure.js [--no-render]
 *
 * NODE PASS
 *   - the manifest names a portrait set per (age, sex); every file exists, is a
 *     400 × 480 PNG and is < 40 KB; elder / adult hold ≥ 2 per sex, child ≥ 3,
 *     baby ≥ 1 (the most one family draws — the demand sweep in
 *     verify-b5-family.js measures it);
 *   - every look × age × sex × portrait at px {72, 96, 110}: exactly one
 *     <image>, a data:image/png that decodes to THAT file's bytes, the
 *     data-lcs-portrait stamp names a file of the figure's own age and sex, the
 *     image sits inside the 100 × 120 viewBox, bottom on the box bottom, and its
 *     height share is PORTRAIT_SCALE[age] (child < adult, baby < child);
 *     no <text>; width = px · 100 / 120;
 *   - assignPortraits: ranks inside each (age, sex) cell, rng-free, keeps a
 *     preset portrait, THROWS when a cell outnumbers its portraits;
 *   - THROWS below px 72, on an unknown look, on a portrait index out of range.
 * POISON (each must FAIL for its own reason; the untouched primitive is the control):
 *   P1 a child figure stamped with an adult portrait · P2 a portrait drawn at
 *   adult size on a baby · P3 an image whose bytes are not the named file ·
 *   P4 a page where two people get the same portrait (assignPortraits bypassed).
 * RENDER PASS (default; --no-render skips) — Chromium draws every portrait; each
 * image must load (naturalWidth 400) and a contact sheet is written for a human
 * to READ: out/dev/K-370-figure-sheet.png.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const FF = require('../primitives/family-figure.js');

const PXS = [72, 96, 110];
const AGES = ['elder', 'adult', 'child', 'baby'];
const MIN_SET = { elder: 2, adult: 2, child: 3, baby: 1 };
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

const manifest = JSON.parse(fs.readFileSync(path.join(FF.PORTRAIT_DIR, 'manifest.json'), 'utf8'));
const fileBytes = (f) => fs.readFileSync(path.join(FF.PORTRAIT_DIR, f));

/** checkFigure(svg, {age, sex}) -> fails[] — the emitted markup only */
function checkFigure(svg, { age, sex }) {
  const f = [];
  const stamp = /data-lcs-portrait="([^"]*)"/.exec(svg);
  const file = stamp && stamp[1];
  if (!file) return ['no data-lcs-portrait stamp'];
  if (!file.startsWith(`${age}-${sex}-`)) f.push(`portrait ${file} on a ${age} ${sex} figure`);
  const imgs = [...svg.matchAll(/<image ([^>]*)\/>/g)];
  if (imgs.length !== 1) return f.concat(`${imgs.length} <image> (want 1)`);
  const a = imgs[0][1];
  const num = (k) => +(new RegExp(`(?:^|\\s)${k}="([^"]+)"`).exec(a) || [])[1];
  const [x, y, w, h] = ['x', 'y', 'width', 'height'].map(num);
  const href = (/href="data:image\/png;base64,([^"]+)"/.exec(a) || [])[1];
  if (!href) f.push('the image is not an embedded PNG');
  else if (fs.existsSync(path.join(FF.PORTRAIT_DIR, file)) && !Buffer.from(href, 'base64').equals(fileBytes(file))) f.push(`the embedded bytes are not ${file}`);
  if (!(x >= -0.01 && y >= -0.01 && x + w <= 100.01 && y + h <= 120.01)) f.push(`the image leaves the viewBox (${x},${y},${w},${h})`);
  if (Math.abs(y + h - 120) > 0.02) f.push(`the bust bottom is at ${(y + h).toFixed(2)}, not on the box bottom`);
  const share = h / 120;
  if (Math.abs(share - FF.PORTRAIT_SCALE[age]) > 0.005) f.push(`a ${age} drawn at ${(share * 100).toFixed(1)} % of the box (want ${FF.PORTRAIT_SCALE[age] * 100} %)`);
  if (/<text/.test(svg)) f.push('text inside a figure');
  return f;
}

function nodePass() {
  // the asset set
  for (const age of AGES) for (const sex of ['f', 'm']) {
    const list = (manifest.portraits[age] || {})[sex] || [];
    ok(list.length >= MIN_SET[age], `${age} ${sex}: ${list.length} portraits (want >= ${MIN_SET[age]})`);
    ok(FF.portraitCount(age, sex) === list.length, `${age} ${sex}: portraitCount disagrees with the manifest`);
    for (const file of list) {
      const p = path.join(FF.PORTRAIT_DIR, file);
      if (!ok(fs.existsSync(p), `${file}: missing`)) continue;
      const b = fs.readFileSync(p);
      ok(b.length < 40 * 1024, `${file}: ${b.length} B (want < 40 KB, a page carries up to 8)`);
      ok(b.readUInt32BE(16) === 400 && b.readUInt32BE(20) === 480, `${file}: ${b.readUInt32BE(16)}x${b.readUInt32BE(20)} (want 400x480)`);
      ok(file.startsWith(`${age}-${sex}-`), `${file} filed under ${age} ${sex}`);
    }
  }
  ok(FF.PORTRAIT_SCALE.child < FF.PORTRAIT_SCALE.adult && FF.PORTRAIT_SCALE.baby < FF.PORTRAIT_SCALE.child, 'age does not read from size (child < adult, baby < child)');
  // every look × portrait × px
  let n = 0;
  for (const age of AGES) for (const sex of ['f', 'm']) for (const look of FF.lookIds(age, sex)) for (let i = 0; i < FF.portraitCount(age, sex); i++) for (const px of PXS) {
    const r = FF.familyFigure({ age, sex, look, portrait: i, px, id: 'g' + n++ });
    for (const m of checkFigure(r.svg, { age, sex })) ok(false, `${age} ${sex} ${look} #${i} @${px}: ${m}`);
    ok(Math.abs(r.width - px * 100 / 120) < 0.01, `${age} ${sex} @${px}: width ${r.width}`);
    ok(new RegExp(`height="${px}"`).test(r.svg), `${age} ${sex} @${px}: the svg is not ${px} tall`);
  }
  ok(n > 100, `only ${n} figures checked`);
  // throws
  const throws = (fn) => { try { fn(); return false; } catch (e) { return true; } };
  ok(throws(() => FF.familyFigure({ age: 'adult', sex: 'f', look: FF.lookIds('adult', 'f')[0], px: 71, id: 'a' })), 'px 71 accepted');
  ok(throws(() => FF.familyFigure({ age: 'adult', sex: 'f', look: 'nope', px: 96, id: 'a' })), 'an unknown look accepted');
  ok(throws(() => FF.familyFigure({ age: 'baby', sex: 'f', look: 'baby', portrait: 1, px: 96, id: 'a' })), 'a baby portrait index 1 accepted (one exists)');
  // assignPortraits
  const fam = [{ age: 'child', sex: 'f' }, { age: 'adult', sex: 'f' }, { age: 'child', sex: 'f' }, { age: 'child', sex: 'm' }, { age: 'child', sex: 'f' }];
  const a = FF.assignPortraits(fam);
  ok(a.map((p) => p.portrait).join('') === '00102', `assignPortraits ranks ${a.map((p) => p.portrait).join('')} (want 00102)`);
  ok(fam.every((p) => p.portrait == null), 'assignPortraits mutated its input');
  ok(FF.assignPortraits([{ age: 'adult', sex: 'm', portrait: 1 }, { age: 'adult', sex: 'm' }]).map((p) => p.portrait).join('') === '10', 'a preset portrait is not kept');
  ok(throws(() => FF.assignPortraits([{ age: 'baby', sex: 'm' }, { age: 'baby', sex: 'm' }])), 'two baby boys accepted (one portrait)');
  // the older sister is served first: on a three-girl page the last (youngest-looking) portrait never goes to her
  const three = FF.assignPortraits([{ age: 'child', sex: 'f', path: 'MZD' }, { age: 'child', sex: 'f', path: '' }, { age: 'child', sex: 'f', path: 'Z' }]);
  ok(three.map((p) => p.portrait).join('') === '120', `three girls (cousin, me, older sister) get ${three.map((p) => p.portrait).join('')} (want 120: the sister first)`);
  // the retired picture is not in the child-girl set; the youngest-looking one closes it
  ok(!manifest.portraits.child.f.some((f) => /teenager girl 1/.test(f)) && manifest.portraits.child.f.length === 3, 'child-girl set is not the reviewed one');
}

function poisons() {
  const base = FF.familyFigure({ age: 'child', sex: 'f', look: FF.lookIds('child', 'f')[0], portrait: 1, px: 96, id: 'p' }).svg;
  const expect = (tag, fs_, re) => { ok(fs_.some((m) => re.test(m)), `POISON ${tag} passed (${fs_.join(' | ') || 'no fails'})`); console.log(`poison ${tag}: ${fs_.some((m) => re.test(m)) ? 'FAILED as required' : 'SILENT'}`); };
  ok(checkFigure(base, { age: 'child', sex: 'f' }).length === 0, `control fails: ${checkFigure(base, { age: 'child', sex: 'f' }).join(' | ')}`);
  expect('P1 adult portrait on a child', checkFigure(base.replace(/data-lcs-portrait="child-f-2.png"/, 'data-lcs-portrait="adult-f-2.png"'), { age: 'child', sex: 'f' }), /portrait adult-f-2\.png on a child f/);
  const baby = FF.familyFigure({ age: 'baby', sex: 'm', look: 'baby', px: 96, id: 'q' }).svg;
  ok(checkFigure(baby, { age: 'baby', sex: 'm' }).length === 0, 'baby control fails');
  expect('P2 a baby at adult size', checkFigure(baby.replace(/<image x="[^"]+" y="[^"]+" width="[^"]+" height="[^"]+"/, '<image x="0" y="0" width="100" height="120"'), { age: 'baby', sex: 'm' }), /a baby drawn at 100\.0 %/);
  const other = fileBytes('child-f-3.png').toString('base64');
  expect('P3 bytes of another file', checkFigure(base.replace(/base64,[^"]+"/, `base64,${other}"`), { age: 'child', sex: 'f' }), /embedded bytes are not child-f-2\.png/);
  // P4: the same family drawn without assignPortraits — every child girl gets portrait 0
  const kids = [{ age: 'child', sex: 'f' }, { age: 'child', sex: 'f' }];
  const dup = (ps) => { const s = ps.map((p) => p.portrait || 0); return new Set(s).size !== s.length ? ['two people share a portrait'] : []; };
  ok(dup(FF.assignPortraits(kids)).length === 0, 'P4 control: assignPortraits repeats a portrait');
  expect('P4 two sisters, one portrait', dup(kids), /share a portrait/);
}

async function renderPass() {
  const puppeteer = require('puppeteer');
  const OUT = path.join(__dirname, '..', 'out', 'dev');
  fs.mkdirSync(OUT, { recursive: true });
  const cells = [];
  let i = 0;
  for (const age of AGES) for (const sex of ['f', 'm']) for (let k = 0; k < FF.portraitCount(age, sex); k++) {
    const r = FF.familyFigure({ age, sex, look: FF.lookIds(age, sex)[0], portrait: k, px: 120, id: 'r' + i++ });
    cells.push(`<div style="display:inline-block;margin:6px;text-align:center;font:12px sans-serif;border:2px solid #146B5E;border-radius:8px;padding:4px">${r.svg}<br>${age} ${sex} ${k + 1}</div>`);
  }
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.setContent(`<html><body style="margin:8px;background:#fff">${cells.join('')}</body></html>`, { waitUntil: 'load' });
    const natural = await page.evaluate(() => Promise.all([...document.querySelectorAll('image')].map((im) => new Promise((res) => {
      const i2 = new Image(); i2.onload = () => res(i2.naturalWidth); i2.onerror = () => res(0); i2.src = im.getAttribute('href'); }))));
    ok(natural.length === cells.length && natural.every((w) => w === 400), `render: images decoded at ${natural.join(',')} (want 400 each)`);
    const file = path.join(OUT, 'K-370-figure-sheet.png');
    await page.screenshot({ path: file, fullPage: true });
    console.log('contact sheet: ' + file);
  } finally { await browser.close(); }
}

if (require.main === module) {
  (async () => {
    nodePass();
    poisons();
    if (!process.argv.includes('--no-render')) await renderPass();
    if (fails.length) { console.log(`FAIL — ${fails.length} of ${assertions} assertions`); for (const m of fails.slice(0, 40)) console.log('  ' + m); process.exit(1); }
    console.log(`PASS — ${assertions} assertions`);
  })().catch((e) => { console.error(e); process.exit(1); });
}

module.exports = { checkFigure };
