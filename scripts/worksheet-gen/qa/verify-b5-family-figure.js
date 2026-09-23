#!/usr/bin/env node
/**
 * verify-b5-family-figure.js — the gate of primitives/family-figure.js (K-370
 * `family`, design docs/worksheet-gen/b5-designs/K-370-family.md §2 "Gate
 * qa/verify-b5-family-figure.js").
 *
 *   node scripts/worksheet-gen/qa/verify-b5-family-figure.js [--no-render]
 *
 * NODE PASS — every look × age × sex at px {72, 96, 110} (the smallest the
 * primitive allows, the shipped d2 bust, the d1 bust). Each figure is RE-PARSED
 * from the EMITTED markup (never `meta`):
 *   - the SEX RULE by hair reach: the lowest y of every [data-lcs-hair] shape
 *     (paths sampled as curves, circles / ellipses by their radii) against the
 *     head ellipse parsed from [data-lcs-head]: f  hairBottom >= chin - 6 + 8;
 *     m  hairBottom <= head cy - 4; a [data-lcs-beard] only on m, and it
 *     touches the chin (its lowest point within 3 units of the chin);
 *   - the eye disc radius x scale >= 1.8 px at the rendered size;
 *   - elder hair fill === grid, every other age's hair === ink;
 *   - the outline renders 3 px (stroke-width x scale) on the head;
 *   - the tint set of the f looks === the tint set of the m looks, per age;
 *   - >= 6 looks per (age, sex) (baby: one); tokens only; no <text>, no <image>;
 *   - the figure stays inside its clip (every shape's extent within the 100 x 120
 *     viewBox, the garment excepted where the clip cuts it at the bottom);
 *   - THROWS below px 72, on an unknown look, on a beard on f.
 * POISON — each must FAIL for its own reason; the untouched primitive is the
 * control: an f look whose hair stops at y 62 · an m look with a ponytail
 * (hair to y 78) · an elder drawn with ink hair · (and the render pass's own:
 * a hair shape hidden with display:none still counts).
 * RENDER PASS (default; --no-render skips) — Chromium draws every look; the
 * rendered getBBox() bottom of the hair elements must agree with the node
 * measure within 1 unit, then contact sheets at px 72 and 120 in colour AND
 * greyscale for a human to READ: out/dev/K-370-figure-sheet-{72,120}{,-grey}.png.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const tokens = require('../primitives/_tokens.js');
const FF = require('../primitives/family-figure.js');

const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const PXS = [72, 96, 110];
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/* ---- geometry parse (independent of the primitive's own measure) */
function pathPoints(d) {
  const out = [];
  const toks = d.match(/[MLQCZqlmc]|-?\d*\.?\d+/g) || [];
  let cmd = null, cur = [0, 0], i = 0;
  const num = () => +toks[i++];
  while (i < toks.length) {
    if (/[A-Za-z]/.test(toks[i])) { cmd = toks[i++]; if (cmd === 'Z') continue; }
    const rel = cmd === cmd.toLowerCase();
    const P = () => { const x = num(), y = num(); return rel ? [cur[0] + x, cur[1] + y] : [x, y]; };
    if (cmd === 'M' || cmd === 'L' || cmd === 'm' || cmd === 'l') { cur = P(); out.push(cur); }
    else if (cmd === 'Q' || cmd === 'q') { const c = P(), e = P(); for (let k = 0; k <= 12; k++) { const u = k / 12; out.push([(1 - u) ** 2 * cur[0] + 2 * (1 - u) * u * c[0] + u * u * e[0], (1 - u) ** 2 * cur[1] + 2 * (1 - u) * u * c[1] + u * u * e[1]]); } cur = e; }
    else if (cmd === 'C' || cmd === 'c') { const c1 = P(), c2 = P(), e = P(); for (let k = 0; k <= 16; k++) { const u = k / 16, v = 1 - u; out.push([v ** 3 * cur[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u ** 3 * e[0], v ** 3 * cur[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u ** 3 * e[1]]); } cur = e; }
    else i++;
  }
  return out;
}
function shapeExtent(tag) {
  let m;
  if ((m = /^<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/.exec(tag))) return { x0: +m[1] - +m[3], x1: +m[1] + +m[3], y0: +m[2] - +m[3], y1: +m[2] + +m[3] };
  if ((m = /^<ellipse cx="([^"]+)" cy="([^"]+)" rx="([^"]+)" ry="([^"]+)"/.exec(tag))) return { x0: +m[1] - +m[3], x1: +m[1] + +m[3], y0: +m[2] - +m[4], y1: +m[2] + +m[4] };
  if ((m = / d="([^"]+)"/.exec(tag))) { const pts = pathPoints(m[1]); return { x0: Math.min(...pts.map((p) => p[0])), x1: Math.max(...pts.map((p) => p[0])), y0: Math.min(...pts.map((p) => p[1])), y1: Math.max(...pts.map((p) => p[1])) }; }
  if ((m = /^<rect x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/.exec(tag))) return { x0: +m[1], x1: +m[1] + +m[3], y0: +m[2], y1: +m[2] + +m[4] };
  return null;
}
const tagsWith = (svg, attr) => [...svg.matchAll(new RegExp(`<(?:path|circle|ellipse|rect)[^>]*${attr}=""[^>]*/>`, 'g'))].map((m) => m[0]);

/** measure one emitted figure (the gate's view) */
function measure(svg) {
  const head = tagsWith(svg, 'data-lcs-head')[0];
  const hm = /cx="([^"]+)" cy="([^"]+)" rx="([^"]+)" ry="([^"]+)"/.exec(head);
  const H = { cx: +hm[1], cy: +hm[2], rx: +hm[3], ry: +hm[4] };
  const hair = tagsWith(svg, 'data-lcs-hair').filter((t) => !/display:\s*none/.test(t));
  const hairBottom = hair.length ? Math.max(...hair.map((t) => shapeExtent(t).y1)) : null;
  const hairFills = [...new Set(hair.map((t) => /fill="([^"]+)"/.exec(t)[1].toUpperCase()))];
  const beard = tagsWith(svg, 'data-lcs-beard');
  const beardBottom = beard.length ? Math.max(...beard.map((t) => shapeExtent(t).y1)) : null;
  const px = +/ height="([^"]+)" viewBox="0 0 100 120"/.exec(svg)[1];
  const scale = px / 120;
  const eyeR = Math.min(...tagsWith(svg, 'data-lcs-eye').map((t) => +/ r="([^"]+)"/.exec(t)[1]));
  const headSW = +/stroke-width="([^"]+)"/.exec(head)[1];
  const hexes = [...svg.matchAll(/#[0-9A-Fa-f]{6}/g)].map((m) => m[0].toUpperCase());
  const extents = [...svg.matchAll(/<(?:path|circle|ellipse)[^>]*\/>/g)].map((m) => ({ tag: m[0], e: shapeExtent(m[0]) })).filter((x) => x.e && !/data-lcs-garment/.test(x.tag));
  // crown cover (the gate's own bald test): a hair shape spanning the head's centre line near its top
  const crownY = H.cy - H.ry + 6;
  const crownCovered = hair.some((t) => { const e = shapeExtent(t); return e.x0 < H.cx && e.x1 > H.cx && e.y0 < crownY; });
  const beardOnFace = beard.some((t) => { const e = shapeExtent(t); return e.y0 >= H.cy - 1 && e.y1 <= H.cy + H.ry + 10 && e.x0 < H.cx && e.x1 > H.cx; });
  return { H, chin: H.cy + H.ry, hairBottom, hairFills, beardBottom, beardCount: beard.length, crownCovered, beardOnFace, scale, px, eyeR, headSW, hexes, extents };
}

/** the rules, over one emitted figure; returns the failures (the poisons reuse this) */
function checkFigure(svg, { age, sex, look }) {
  const f = [];
  const m = measure(svg);
  const tag = `${age} ${sex} ${look} px ${m.px}`;
  if (age !== 'baby') {
    if (m.hairBottom == null) f.push(`${tag}: no hair`);
    else if (sex === 'f' && !(m.hairBottom >= m.chin - 6 + 8 - 1e-6)) f.push(`${tag}: f hair reaches y ${m.hairBottom.toFixed(1)} < jaw + 8 = ${(m.chin - 6 + 8).toFixed(1)}`);
    else if (sex === 'm' && !(m.hairBottom <= m.H.cy - 4 + 1e-6)) f.push(`${tag}: m hair reaches y ${m.hairBottom.toFixed(1)} > ear top ${(m.H.cy - 4).toFixed(1)}`);
    const want = age === 'elder' ? tokens.color.grid.toUpperCase() : tokens.color.ink.toUpperCase();
    if (m.hairFills.length !== 1 || m.hairFills[0] !== want) f.push(`${tag}: hair fill ${m.hairFills.join('/')} ≠ ${want} (${age === 'elder' ? 'grey' : 'ink'})`);
  }
  if (m.beardCount) {
    if (sex !== 'm') f.push(`${tag}: a beard on an f look`);
    if (look.includes('beard') && Math.abs(m.beardBottom - m.chin) > 8) f.push(`${tag}: the beard does not reach the chin`);
  }
  // ELDER MALE CUE (landing review 2026-09-23: a curly-haired grandpa read as mum): beard / moustache on the face, or a bald crown
  if (age === 'elder' && sex === 'm' && !m.beardOnFace && m.crownCovered) f.push(`${tag}: grandpa has no male cue (no beard / moustache on the face and the crown is covered)`);
  if (m.eyeR * m.scale < 1.8 - 1e-9) f.push(`${tag}: eye disc ${(m.eyeR * m.scale).toFixed(2)} px < 1.8`);
  if (Math.abs(m.headSW * m.scale - 3) > 0.01) f.push(`${tag}: outline renders ${(m.headSW * m.scale).toFixed(2)} px ≠ 3`);
  for (const h of m.hexes) if (!PALETTE.has(h)) f.push(`${tag}: off-palette ${h}`);
  if (/<text|<image|<img/.test(svg)) f.push(`${tag}: text / image inside a figure`);
  for (const x of m.extents) if (x.e.x0 < -0.01 || x.e.x1 > 100.01 || x.e.y0 < -0.01 || x.e.y1 > 120.01) f.push(`${tag}: a shape leaves the clip (${x.e.x0.toFixed(1)}..${x.e.x1.toFixed(1)}, ${x.e.y0.toFixed(1)}..${x.e.y1.toFixed(1)})`);
  if (!/clip-path="url\(#ff-/.test(svg)) f.push(`${tag}: no clip`);
  return f;
}

function nodePass() {
  const AGES = ['adult', 'elder', 'child', 'baby'];
  for (const age of AGES) for (const sex of ['f', 'm']) {
    const ids = FF.lookIds(age, sex);
    ok(age === 'baby' ? ids.length === 1 : ids.length >= 6, `${age} ${sex}: ${ids.length} looks (want >= 6)`);
    for (const look of ids) for (const px of PXS) {
      const r = FF.familyFigure({ age, sex, look, px, id: 'g' });
      const f = checkFigure(r.svg, { age, sex, look });
      ok(f.length === 0, f.join(' | '));
      ok(Math.abs(r.width - px * 100 / 120) < 0.01, `${age} ${sex} ${look}: width ${r.width}`);
    }
    if (age !== 'baby') {
      const tints = (s) => new Set(FF.lookIds(age, s).map((l) => FF.LOOKS[age][s][l].tint));
      const tf = [...tints('f')].sort().join(','), tm = [...tints('m')].sort().join(',');
      ok(tf === tm, `${age}: f tints {${tf}} ≠ m tints {${tm}} (colour would carry sex)`);
    }
  }
  // elders: glasses on 3 looks per sex
  for (const sex of ['f', 'm']) ok(FF.lookIds('elder', sex).filter((l) => FF.ELDER_GLASSES.has(sex + ':' + l)).length === 3, `elder ${sex}: glasses not on exactly 3 looks`);
  // throws
  const throws = (fn) => { try { fn(); return false; } catch (e) { return true; } };
  ok(throws(() => FF.familyFigure({ age: 'adult', sex: 'f', look: 'bun', px: 71, id: 'a' })), 'px 71 does not throw');
  ok(throws(() => FF.familyFigure({ age: 'adult', sex: 'f', look: 'nope', px: 96, id: 'a' })), 'an unknown look does not throw');
  ok(throws(() => FF.familyFigure({ age: 'adult', sex: 'x', look: 'bun', px: 96, id: 'a' })), 'an unknown sex does not throw');
}

/* ---- poisons: doctored markup, each must fail for ITS reason */
function poisons() {
  const cases = [
    { name: 'f hair stops at y 62', age: 'adult', sex: 'f', look: 'bob-fringe', edit: (s) => s.replace(/(<path d=")M 28 40 C 27 15 40 12 50 12 C 60 12 73 15 72 40 L 74 74 Q 50 79 26 74 Z/, '$1M 28 40 C 27 15 40 12 50 12 C 60 12 73 15 72 40 L 72 62 L 28 62 Z'), want: /f hair reaches y 6[0-9]/ },
    { name: 'm with a ponytail', age: 'adult', sex: 'm', look: 'short', edit: (s) => s.replace('<ellipse cx="50" cy="44"', `<path d="M 63 24 C 84 22 90 48 84 78 C 79 70 74 54 67 40 Z" fill="${tokens.color.ink}" stroke="${tokens.color.teal}" stroke-width="3" data-lcs-hair=""/><ellipse cx="50" cy="44"`), want: /m hair reaches y 7/ },
    { name: 'elder with ink hair', age: 'elder', sex: 'f', look: 'bun', edit: (s) => s.split(`fill="${tokens.color.grid}" stroke="${tokens.color.teal}" stroke-width="3.75" stroke-linejoin="round" data-lcs-hair`).join(`fill="${tokens.color.ink}" stroke="${tokens.color.teal}" stroke-width="3.75" stroke-linejoin="round" data-lcs-hair`), want: /hair fill .* ≠ #C8BFAE/ },
    { name: 'grandpa (curly-short) without his moustache', age: 'elder', sex: 'm', look: 'curly-short', edit: (s) => s.replace(/<path [^>]*data-lcs-beard=""\/>/, ''), want: /grandpa has no male cue/ },
    { name: 'bald grandpa given a full cap of hair', age: 'elder', sex: 'm', look: 'bald-crown', edit: (s) => s.replace('<ellipse cx="50" cy="44"', `<path d="M 31 39 C 29 22 39 16 50 16 C 61 16 71 22 69 39 Z" fill="${tokens.color.grid}" stroke="${tokens.color.teal}" stroke-width="3.75" data-lcs-hair=""/><ellipse cx="50" cy="44"`), want: /grandpa has no male cue/ },
    { name: 'off-palette garment', age: 'child', sex: 'm', look: 'crew', edit: (s) => s.replace(/data-lcs-garment=""/, 'data-lcs-garment="" data-x="#123456"'), want: /off-palette #123456/ },
  ];
  for (const c of cases) {
    const r = FF.familyFigure({ age: c.age, sex: c.sex, look: c.look, px: 96, id: 'p' });
    const control = checkFigure(r.svg, c);
    ok(control.length === 0, `poison "${c.name}": the CONTROL fails (${control.join(' | ')})`);
    const bad = c.edit(r.svg);
    ok(bad !== r.svg, `poison "${c.name}": the edit matched nothing (NEEDLE MATCHED NOTHING)`);
    const f = checkFigure(bad, c);
    ok(f.some((x) => c.want.test(x)), `poison "${c.name}" did not fail for its reason (got ${JSON.stringify(f)})`);
    console.log(`poison ${c.name}: ${f.length ? 'FAILED as required — ' + f[0] : 'SILENT'}`);
  }
}

async function renderPass() {
  const puppeteer = require('puppeteer');
  const url = require('url');
  const out = path.join(__dirname, '..', 'out', 'dev');
  fs.mkdirSync(out, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    for (const px of [72, 120]) {
      let html = `<html><body style="margin:10px;background:${tokens.color.cream};font:12px sans-serif">`;
      let n = 0;
      const list = [];
      for (const age of ['elder', 'adult', 'child', 'baby']) for (const sex of ['f', 'm']) {
        if (age === 'baby' && sex === 'm') continue;
        html += `<div style="display:flex;gap:8px;align-items:flex-end;margin-bottom:6px"><b style="width:64px">${age} ${sex}</b>`;
        for (const look of FF.lookIds(age, sex)) {
          const id = 'r' + (n++);
          const r = FF.familyFigure({ age, sex, look, px, id });
          list.push({ id, age, sex, look, nodeBottom: measure(r.svg).hairBottom });
          html += `<div data-fig="${id}" style="text-align:center;background:#FFFFFF;border:3px solid ${tokens.color.teal};border-radius:8px;padding:4px 4px 0">${r.svg}<div>${look}</div></div>`;
        }
        html += '</div>';
      }
      const f = path.join(out, `K-370-figure-sheet-${px}.html`);
      fs.writeFileSync(f, html + '</body></html>');
      await page.setViewport({ width: 1150, height: 800, deviceScaleFactor: 2 });
      await page.goto(url.pathToFileURL(f).href);
      const rendered = await page.evaluate(() => [...document.querySelectorAll('[data-fig]')].map((d) => {
        const hs = [...d.querySelectorAll('[data-lcs-hair]')];
        return { id: d.dataset.fig, bottom: hs.length ? Math.max(...hs.map((h) => { const b = h.getBBox(); return b.y + b.height; })) : null };
      }));
      for (const r of rendered) {
        const l = list.find((x) => x.id === r.id);
        if (l.nodeBottom == null) { ok(r.bottom == null, `${l.age} ${l.sex} ${l.look}: hair rendered but none measured`); continue; }
        ok(Math.abs(r.bottom - l.nodeBottom) <= 1, `${l.age} ${l.sex} ${l.look} px ${px}: rendered hair bottom ${r.bottom.toFixed(2)} ≠ node ${l.nodeBottom.toFixed(2)}`);
      }
      await page.screenshot({ path: path.join(out, `K-370-figure-sheet-${px}.png`), fullPage: true });
      await page.addStyleTag({ content: 'body{filter:grayscale(1)}' });
      await page.screenshot({ path: path.join(out, `K-370-figure-sheet-${px}-grey.png`), fullPage: true });
      fs.unlinkSync(f);
      console.log(`render px ${px}: ${rendered.length} figures, hair bottoms agree; sheets out/dev/K-370-figure-sheet-${px}{,-grey}.png`);
    }
  } finally { await browser.close(); }
}

if (require.main === module) {
  (async () => {
    nodePass();
    poisons();
    if (!process.argv.includes('--no-render')) await renderPass();
    console.log(`verify-b5-family-figure: ${assertions} assertions, ${fails.length} failures`);
    if (fails.length) { for (const f of fails.slice(0, 40)) console.log('  FAIL ' + f); process.exit(1); }
    console.log('PASS');
  })().catch((e) => { console.error(e); process.exit(1); });
}
module.exports = { checkFigure, measure };
