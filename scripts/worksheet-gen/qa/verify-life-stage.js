#!/usr/bin/env node
/**
 * verify-life-stage.js — the gate of primitives/life-stage.js (design
 * docs/worksheet-gen/b5-designs/G1-377-animal-life-cycles.md §2 "Node + render gate";
 * the verify-body-figure.js pattern). Every assertion is made on the EMITTED markup
 * (parsed back out of the svg string) or on the RENDER (Chromium, file://), never on
 * the primitive's own tables: this file carries its OWN copy of the biology (EXPECT)
 * so a table and its drawing are two independent sources.
 *
 *   node scripts/worksheet-gen/qa/verify-life-stage.js [--no-render] [--no-sheet]
 *
 * NODE (all 13 stages + spawnForm 'string', at 90 / 132 / 144):
 *   - data-part counts === EXPECT (tadpole / legged / froglet / adult legs 0 / 2 / 4 / 4
 *     and tails 1 / 1 / stub / 0; butterfly wings 4 + two CLUBBED antennae; caterpillar
 *     legs 3 + prolegs 4 + clasper 1 + antenna 0; chrysalis silk 0; ladybird adult
 *     spots 7 + legs 6, larva legs 6; spawn 12..18 spheres each with ONE dot)
 *   - every KEY part within r 88 (40 samples per path segment; scenery exempt; the pt
 *     egg STRING is held to its own stated rule: centres <= 86, spheres inside the clip)
 *   - only token hexes; MIN_SIZE throws at 89
 *   - OUTLINE px = clamp(size/48, 2, 3) on every outline part (stroke-width x size/200),
 *     the ring 3 px at every size
 *   - the magnified butterfly egg >= 60 units tall; every ladybird adult spot inside
 *     the elytra; the legged tadpole's legs at the TAIL end (below the body centre);
 *     the froglet's stub reaches beyond the body ellipse
 *   - the three egg drawings pairwise distinct (scenery x egg element x count)
 * RENDER at 92 px (puppeteer, file://): the magnified butterfly egg >= 28 px tall, each
 * legged-tadpole leg >= 14 px long, the froglet stub >= 6 px visible below the body and >= 4 px below the hind feet,
 * every ladybird adult spot >= 5 px wide.
 * POISON (each must FAIL for its own reason; the real primitive is the control):
 *   L1 drop the froglet stub · L1b the pre-2026-09-23 stub hidden between the hind feet · L2 a silk strand on the chrysalis · L3 an antenna on the
 *   caterpillar · L4 the butterfly egg back at true scale (rx 4.5 ry 6) · L5 a ladybird
 *   spot outside the elytra · L6 the legged tadpole's legs at the FRONT · L7 render at 88.
 * SHEETS: out/dev/G1-377-life-stage-sheet-{colour,grey}.png (every stage at 90, 132, 144).
 */
'use strict';
const path = require('path');
const fs = require('fs');
const tokens = require('../primitives/_tokens.js');
const LS = require('../primitives/life-stage.js');

const OUT = path.join(__dirname, '..', 'out', 'dev');
const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const SIZES = [90, 132, 144];
/** The gate's OWN biology (never read from the primitive). */
const EXPECT = {
  'butterfly.egg': { leaf: 1, egg: 1 },
  'butterfly.larva': { segment: 10, head: 1, leg: 3, proleg: 4, clasper: 1, antenna: 0 },
  'butterfly.pupa': { pupa: 1, stalk: 1, spot: 4, silk: 0, leg: 0 },
  'butterfly.adult': { wing: 4, antenna: 2, head: 1, thorax: 1, abdomen: 1, leg: 0 },
  'frog.spawn': { dot: 'egg' },
  'frog.tadpole': { leg: 0, tail: 1, eye: 2 },
  'frog.legged': { leg: 2, tail: 1, eye: 2 },
  'frog.froglet': { leg: 4, tail: 1, eye: 2 },
  'frog.adult': { leg: 4, tail: 0, eye: 2 },
  'ladybird.egg': { leaf: 1, egg: 13 },
  'ladybird.larva': { segment: 9, leg: 6, dot: 12 },
  'ladybird.pupa': { pupa: 1, spot: 5, leg: 0 },
  'ladybird.adult': { leg: 6, antenna: 2, spot: 7 },
};
const ALL = Object.keys(EXPECT);
/** Parts whose stroke is the OUTLINE (px constant across sizes). */
const OUTLINE_PARTS = { 'butterfly.egg': 'egg', 'butterfly.pupa': 'pupa', 'butterfly.adult': 'wing', 'frog.tadpole': 'tail', 'frog.legged': 'tail', 'frog.froglet': 'body', 'frog.adult': 'body', 'ladybird.pupa': 'pupa', 'ladybird.adult': 'elytra', 'ladybird.egg': 'leaf', 'butterfly.larva': 'leaf' };
const SCENERY = new Set(['leaf', 'water', 'pad', 'petiole']);

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/* ---------------------------------------------------------------- markup parsing */
const attrOf = (tag, name) => { const m = new RegExp(`\\s${name}="([^"]*)"`).exec(tag); return m ? m[1] : null; };
function pathPolys(d) {
  const toks = d.match(/[MLQTCAZmlqtcaz]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  const polys = []; let poly = null, cmd = null, cur = [0, 0], lastQ = null, i = 0;
  const num = () => +toks[i++];
  const quad = (c, e) => { for (let k = 1; k <= 40; k++) { const u = k / 40; poly.push([(1 - u) ** 2 * cur[0] + 2 * (1 - u) * u * c[0] + u * u * e[0], (1 - u) ** 2 * cur[1] + 2 * (1 - u) * u * c[1] + u * u * e[1]]); } lastQ = c; cur = e; };
  while (i < toks.length) {
    if (/[A-Za-z]/.test(toks[i])) { cmd = toks[i++]; if (/z/i.test(cmd)) { if (poly) poly.closed = true; continue; } }
    if (cmd === 'M') { cur = [num(), num()]; poly = [cur]; polys.push(poly); cmd = 'L'; lastQ = null; }
    else if (cmd === 'L') { cur = [num(), num()]; poly.push(cur); lastQ = null; }
    else if (cmd === 'l') { cur = [cur[0] + num(), cur[1] + num()]; poly.push(cur); lastQ = null; }
    else if (cmd === 'Q') { const c = [num(), num()], e = [num(), num()]; quad(c, e); }
    else if (cmd === 'T') { const c = lastQ ? [2 * cur[0] - lastQ[0], 2 * cur[1] - lastQ[1]] : cur.slice(); const e = [num(), num()]; quad(c, e); }
    else if (cmd === 'C') { const c1 = [num(), num()], c2 = [num(), num()], e = [num(), num()]; for (let k = 1; k <= 40; k++) { const u = k / 40, v = 1 - u; poly.push([v ** 3 * cur[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u ** 3 * e[0], v ** 3 * cur[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u ** 3 * e[1]]); } cur = e; lastQ = null; }
    else if (cmd === 'A') {
      const rx0 = num(), ry0 = num(), rot = num() * Math.PI / 180, large = num(), sweep = num(), x2 = num(), y2 = num();
      const [x1, y1] = cur, cosR = Math.cos(rot), sinR = Math.sin(rot);
      const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2, xp = cosR * dx + sinR * dy, yp = -sinR * dx + cosR * dy;
      let rx = Math.abs(rx0), ry = Math.abs(ry0); const lam = xp * xp / (rx * rx) + yp * yp / (ry * ry); if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
      const n2 = rx * rx * ry * ry - rx * rx * yp * yp - ry * ry * xp * xp, den = rx * rx * yp * yp + ry * ry * xp * xp;
      let co = Math.sqrt(Math.max(0, n2 / den)); if (large === sweep) co = -co;
      const cxp = co * rx * yp / ry, cyp = -co * ry * xp / rx, cx = cosR * cxp - sinR * cyp + (x1 + x2) / 2, cy = sinR * cxp + cosR * cyp + (y1 + y2) / 2;
      const ang = (ux, uy, vx, vy) => (Math.sign(ux * vy - uy * vx) || 1) * Math.acos(Math.max(-1, Math.min(1, (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy)))));
      const th1 = ang(1, 0, (xp - cxp) / rx, (yp - cyp) / ry); let dth = ang((xp - cxp) / rx, (yp - cyp) / ry, (-xp - cxp) / rx, (-yp - cyp) / ry);
      if (!sweep && dth > 0) dth -= 2 * Math.PI; else if (sweep && dth < 0) dth += 2 * Math.PI;
      for (let k = 1; k <= 40; k++) { const th = th1 + dth * k / 40; poly.push([cx + rx * Math.cos(th) * cosR - ry * Math.sin(th) * sinR, cy + rx * Math.cos(th) * sinR + ry * Math.sin(th) * cosR]); }
      cur = [x2, y2]; lastQ = null;
    } else i++;
  }
  return polys;
}
/** Every drawn shape tag: {tag, part, pts (sampled geometry), r (circle/ellipse extent)} — inside <g data-part> the group's part is inherited. */
function shapesOf(svg) {
  const art = svg.slice(svg.indexOf('data-lcs-stage-art'));
  const out = [];
  let inherit = null;
  const re = /<(\/?)(g|path|circle|ellipse|line|polyline|polygon|rect)(\s[^>]*?)?(\/?)>/g;
  let m;
  let depth = 0, groupDepth = -1;
  while ((m = re.exec(art))) {
    const [whole, close, name, attrs = '', self] = m;
    if (name === 'g') {
      if (close) { depth--; if (depth < 0) break; if (depth === groupDepth) { inherit = null; groupDepth = -1; } continue; }
      depth++;
      const p = attrOf(whole, 'data-part'); if (p && !inherit) { inherit = p; groupDepth = depth - 1; }
      continue;
    }
    if (close) continue;
    void self; void attrs;
    const part = attrOf(whole, 'data-part') || inherit;
    let P = [];
    if (name === 'path') P = pathPolys(attrOf(whole, 'd')).flat();
    else if (name === 'circle' || name === 'ellipse') {
      const cx = +attrOf(whole, 'cx'), cy = +attrOf(whole, 'cy'), rx = +(attrOf(whole, 'r') || attrOf(whole, 'rx')), ry = +(attrOf(whole, 'r') || attrOf(whole, 'ry'));
      for (let k = 0; k < 40; k++) { const t = k / 40 * 2 * Math.PI; P.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); }
    } else if (name === 'line') { const a = [+attrOf(whole, 'x1'), +attrOf(whole, 'y1')], b = [+attrOf(whole, 'x2'), +attrOf(whole, 'y2')]; for (let k = 0; k <= 40; k++) P.push([a[0] + (b[0] - a[0]) * k / 40, a[1] + (b[1] - a[1]) * k / 40]); }
    else if (name === 'polyline' || name === 'polygon') { const q = attrOf(whole, 'points').trim().split(/\s+/).map((s) => s.split(',').map(Number)); for (let j = 1; j < q.length + (name === 'polygon' ? 1 : 0); j++) { const a = q[j - 1], b = q[j % q.length]; for (let k = 0; k <= 40; k++) P.push([a[0] + (b[0] - a[0]) * k / 40, a[1] + (b[1] - a[1]) * k / 40]); } }
    else if (name === 'rect') { const x = +attrOf(whole, 'x'), y = +attrOf(whole, 'y'), w = +attrOf(whole, 'width'), h = +attrOf(whole, 'height'); P.push([x, y], [x + w, y], [x, y + h], [x + w, y + h]); }
    out.push({ tag: whole, name, part, pts: P });
  }
  return out;
}
const bboxOf = (P) => { let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity; for (const [x, y] of P) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); } return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 }; };

/** All node findings of ONE emitted stage svg. */
function checkStage(svg, key, size) {
  const f = [];
  const [animal, stage] = key.split('.');
  const push = (m) => f.push(`${key}@${size}: ${m}`);
  const counts = {};
  for (const m of svg.matchAll(/data-part="([a-z]+)"/g)) counts[m[1]] = (counts[m[1]] || 0) + 1;
  const want = EXPECT[key];
  for (const [p, n] of Object.entries(want)) {
    if (n === 'egg') continue;
    if ((counts[p] || 0) !== n) push(`part count ${p} ${counts[p] || 0} ≠ ${n}`);
  }
  if (key === 'frog.spawn') {
    const e = counts.egg || 0;
    if (e < 12 || e > 18) push(`spawn has ${e} spheres (12..18)`);
    if ((counts.dot || 0) !== e) push(`spawn dots ${counts.dot || 0} ≠ spheres ${e} (one dot each)`);
  }
  if (key === 'butterfly.adult') {
    const ants = [...svg.matchAll(/<g[^>]*data-part="antenna"[^>]*>/g)].map((m) => m[0]);
    if (ants.length !== 2 || !ants.every((t) => attrOf(t, 'data-club') === '1')) push('the two antennae are not both clubbed');
  }
  if (key === 'frog.froglet' && !/data-part="tail"[^>]*data-tail="stub"|data-tail="stub"[^>]*data-part="tail"/.test(svg)) push('the froglet tail is not the stub');
  // palette
  for (const m of svg.matchAll(/#[0-9A-Fa-f]{6}\b/g)) if (!PALETTE.has(m[0].toUpperCase())) push(`off-palette ${m[0]}`);
  // root stamps
  if (!new RegExp(`data-lcs-figure="life-${animal}-${stage}"`).test(svg)) push('data-lcs-figure stamp missing');
  const shapes = shapesOf(svg);
  // r 88
  const spawnString = key === 'frog.spawn' && /data-lcs-spawn-form="string"/.test(svg);
  for (const s of shapes) {
    if (!s.part || SCENERY.has(s.part)) continue;
    if (spawnString && (s.part === 'egg' || s.part === 'dot')) {
      const cx = +attrOf(s.tag, 'cx'), cy = +attrOf(s.tag, 'cy'), r = +attrOf(s.tag, 'r');
      if (Math.hypot(cx - 100, cy - 100) > 86 + 1e-6) push(`string sphere centre (${cx},${cy}) beyond r 86`);
      if (Math.hypot(cx - 100, cy - 100) + r > 96) push(`string sphere (${cx},${cy}) leaves the clip r 96`);
      continue;
    }
    const far = Math.max(...s.pts.map(([x, y]) => Math.hypot(x - 100, y - 100)));
    if (far > 88 + 1e-6) push(`${s.part} (${s.name}) reaches r ${far.toFixed(1)} > 88`);
  }
  // outline px
  const px = (tag) => +attrOf(tag, 'stroke-width') * size / 200;
  const want0 = Math.min(3, Math.max(2, size / 48));
  const oPart = OUTLINE_PARTS[key];
  if (oPart) {
    const t = shapes.filter((s) => s.part === oPart && attrOf(s.tag, 'stroke-width'));
    if (!t.length) push(`no stroked ${oPart} to measure the outline`);
    for (const s of t) if (Math.abs(px(s.tag) - want0) > 0.05) push(`${oPart} outline ${px(s.tag).toFixed(2)} px ≠ ${want0.toFixed(2)}`);
  }
  const ring = /<circle[^>]*data-lcs-ring="1"[^>]*>/.exec(svg);
  if (!ring || Math.abs(px(ring[0]) - 3) > 0.05) push('the lens ring is not 3 px');
  // stage-specific geometry
  if (key === 'butterfly.egg') {
    const egg = shapes.find((s) => s.part === 'egg');
    if (!egg || !/data-mag="1"/.test(egg.tag)) push('the egg is not stamped magnified');
    else if (bboxOf(egg.pts).h < 60) push(`the magnified egg is ${bboxOf(egg.pts).h.toFixed(1)} units tall (< 60: true scale is the plate's job)`);
  }
  if (key === 'ladybird.adult') {
    const ely = shapes.find((s) => s.part === 'elytra');
    const ecx = +attrOf(ely.tag, 'cx'), ecy = +attrOf(ely.tag, 'cy'), er = +attrOf(ely.tag, 'r');
    for (const s of shapes.filter((x) => x.part === 'spot')) { const cx = +attrOf(s.tag, 'cx'), cy = +attrOf(s.tag, 'cy'), r = +attrOf(s.tag, 'r'); if (Math.hypot(cx - ecx, cy - ecy) + r > er + 1e-6) push(`spot (${cx},${cy}) outside the elytra`); }
  }
  if (key === 'frog.legged') {
    const body = shapes.find((s) => s.part === 'body');
    const bcy = +attrOf(body.tag, 'cy'), bry = +attrOf(body.tag, 'ry');
    for (const s of shapes.filter((x) => x.part === 'leg')) { const top = Math.min(...s.pts.map((p) => p[1])); if (top < bcy + 0.8 * bry) push(`a leg starts at y ${top.toFixed(0)} (above ${(bcy + 0.8 * bry).toFixed(0)}): hind legs grow at the tail end`); }
  }
  if (key === 'frog.froglet') {
    const body = shapes.find((s) => s.part === 'body'), tail = shapes.find((s) => s.part === 'tail');
    if (tail && body && bboxOf(tail.pts).y1 - bboxOf(body.pts).y1 < 10) push('the stub does not reach 10 units beyond the body');
    // 2026-09-23 landing panels: a stub hidden between the hind feet reads as "no tail" — the froglet
    // and the frog then differ only by size. The stub must also clear the lowest FOOT.
    const feet = shapes.filter((x) => x.part === 'foot');
    if (tail && feet.length && bboxOf(tail.pts).y1 - Math.max(...feet.map((x) => bboxOf(x.pts).y1)) < 10) push('the stub does not reach 10 units beyond the hind feet');
  }
  return f;
}
function eggSignature(svg) {
  const sc = (/data-scenery="([a-z-]+)"/.exec(svg) || [])[1] || (/data-part="water"/.test(svg) ? 'water' : 'none');
  const eggs = [...svg.matchAll(/<(\w+)[^>]*data-part="egg"/g)].map((m) => m[1]);
  return `${sc}|${eggs[0]}|${eggs.length}`;
}

/* ---------------------------------------------------------------- render measure */
async function measure(page, list, tag) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${require('url').pathToFileURL(path.join(__dirname, '..', 'assets', 'fonts', 'fonts.css')).href}"></head>` +
    `<body style="margin:0;background:${tokens.color.cream}">${list.map((x) => `<div data-key="${x.key}" style="display:inline-block;margin:4px">${x.svg}</div>`).join('')}</body></html>`;
  fs.mkdirSync(OUT, { recursive: true });
  const f = path.join(OUT, `G1-377-life-stage-measure-${tag}.html`);
  fs.writeFileSync(f, html);
  await page.goto(require('url').pathToFileURL(f).href, { waitUntil: 'networkidle0' });
  return page.evaluate(() => {
    const res = {};
    for (const box of document.querySelectorAll('[data-key]')) {
      const k = box.dataset.key, svg = box.querySelector('svg');
      const scale = svg.getBoundingClientRect().width / 200;
      const r = {};
      const egg = svg.querySelector('[data-part="egg"][data-mag]');
      if (egg) r.eggH = egg.getBoundingClientRect().height;
      const legs = [...svg.querySelectorAll('[data-part="leg"]')];
      if (legs.length) r.legPx = legs.map((l) => (l.getTotalLength ? l.getTotalLength() * scale : 0));
      const tail = svg.querySelector('[data-part="tail"]'), body = svg.querySelector('[data-part="body"]');
      if (tail && body) r.stubPx = tail.getBoundingClientRect().bottom - body.getBoundingClientRect().bottom;
      const feet = [...svg.querySelectorAll('[data-part="foot"]')];
      if (tail && feet.length) r.stubPastFeetPx = tail.getBoundingClientRect().bottom - Math.max(...feet.map((x) => x.getBoundingClientRect().bottom));
      const spots = [...svg.querySelectorAll('[data-part="spot"]')];
      if (spots.length) r.spotW = spots.map((s) => s.getBoundingClientRect().width);
      res[k] = r;
    }
    return res;
  });
}
function judgeMeasure(m) {
  const f = [];
  if (!m['butterfly.egg'] || !(m['butterfly.egg'].eggH >= 28)) f.push(`render: the magnified butterfly egg is ${m['butterfly.egg'] && m['butterfly.egg'].eggH && m['butterfly.egg'].eggH.toFixed(1)} px tall at 92 (< 28)`);
  const lg = m['frog.legged'];
  if (!lg || !lg.legPx || lg.legPx.length !== 2 || !lg.legPx.every((x) => x >= 14)) f.push(`render: legged-tadpole legs ${lg && lg.legPx && lg.legPx.map((x) => x.toFixed(1))} px at 92 (want 2 x >= 14)`);
  const fl = m['frog.froglet'];
  if (!fl || !(fl.stubPx >= 6)) f.push(`render: the froglet stub shows ${fl && fl.stubPx != null ? fl.stubPx.toFixed(1) : '?'} px below the body at 92 (< 6)`);
  if (!fl || !(fl.stubPastFeetPx >= 4)) f.push(`render: the froglet stub shows ${fl && fl.stubPastFeetPx != null ? fl.stubPastFeetPx.toFixed(1) : '?'} px below the hind feet at 92 (< 4)`);
  const la = m['ladybird.adult'];
  if (!la || !la.spotW || !la.spotW.every((w) => w >= 5)) f.push(`render: a ladybird adult spot under 5 px at 92 (${la && la.spotW && la.spotW.map((x) => x.toFixed(1))})`);
  return f;
}

function sheetHtml(grey) {
  const rows = [...ALL, 'frog.spawn|string'].map((k) => {
    const [key, form] = k.split('|');
    const [animal, stage] = key.split('.');
    return `<div style="display:flex;align-items:center;gap:14px;margin:6px 0"><div style="width:120px;font:700 13px 'Nunito';color:${tokens.color.ink}">${k}</div>` +
      SIZES.map((s) => LS.lifeStage({ animal, stage, size: s, spawnForm: form || 'clump' }).svg).join('') + '</div>';
  });
  const half = Math.ceil(rows.length / 2);
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${require('url').pathToFileURL(path.join(__dirname, '..', 'assets', 'fonts', 'fonts.css')).href}"></head>` +
    `<body style="margin:0;background:${tokens.color.cream};${grey ? 'filter:grayscale(1);' : ''}"><div id="sheet" style="display:flex;gap:24px;padding:12px;width:max-content">` +
    `<div>${rows.slice(0, half).join('')}</div><div>${rows.slice(half).join('')}</div></div></body></html>`;
}

async function main() {
  const noRender = process.argv.includes('--no-render');
  const noSheet = process.argv.includes('--no-sheet');
  // NODE
  for (const key of ALL) {
    const [animal, stage] = key.split('.');
    for (const size of SIZES) {
      const r = LS.lifeStage({ animal, stage, size });
      checkStage(r.svg, key, size).forEach((x) => ok(false, x));
      ok(r.width === size && r.height === size, `${key}@${size}: width/height`);
    }
  }
  for (const size of SIZES) checkStage(LS.lifeStage({ animal: 'frog', stage: 'spawn', size, spawnForm: 'string' }).svg, 'frog.spawn', size).forEach((x) => ok(false, 'string ' + x));
  { const e = LS.lifeStage({ animal: 'frog', stage: 'spawn', size: 132, spawnForm: 'string' }); ok((e.meta.parts.egg || 0) === 14, `string spawn has ${e.meta.parts.egg} spheres ≠ 14`); }
  { let t = null; try { LS.lifeStage({ animal: 'butterfly', stage: 'egg', size: 89 }); } catch (e) { t = e.message; } ok(t && /MIN_SIZE/.test(t), 'size 89 must throw (MIN_SIZE 90)'); }
  { let t = null; try { LS.lifeStage({ animal: 'butterfly', stage: 'cocoon', size: 132 }); } catch (e) { t = e.message; } ok(!!t, 'an unknown stage must throw'); }
  const sigs = ['butterfly.egg', 'frog.spawn', 'ladybird.egg'].map((k) => { const [a, s] = k.split('.'); return eggSignature(LS.lifeStage({ animal: a, stage: s, size: 132 }).svg); });
  ok(new Set(sigs).size === 3, `the three egg drawings are not pairwise distinct: ${sigs.join(' / ')}`);
  console.log(`node: 13 stages + string x ${SIZES.join('/')} checked; egg signatures ${sigs.join(' / ')}`);

  // POISON set (markup doctored exactly as the design names it)
  const svgOf = (key, size = 92, o = {}) => { const [a, s] = key.split('.'); return LS.lifeStage({ animal: a, stage: s, size, ...o }).svg; };
  const POISONS = [
    ['L1 froglet stub dropped', 'frog.froglet', (s) => s.replace(/<path[^>]*data-part="tail"[^>]*\/>/, ''), /part count tail 0 ≠ 1|stub/],
    // L1b: the pre-2026-09-23 stub (hidden between the feet; the panels could not see it)
    ['L1b froglet stub hidden between the feet', 'frog.froglet', (s) => s.replace(/<path d="M [^"]*"([^>]*data-tail="stub"[^>]*)\/>/,'<path d="M 103.18 118.6 Q 106.28 135.96 110 139.06 Q 113.72 135.96 116.82 118.6 Z"$1/>'), /beyond the hind feet|below the hind feet/],
    ['L2 silk strand on the chrysalis', 'butterfly.pupa', (s) => s.replace('data-part="stalk"/>', 'data-part="stalk"/><line x1="100" y1="66" x2="120" y2="40" stroke="#146B5E" stroke-width="2" data-part="silk"/>'), /part count silk 1 ≠ 0/],
    ['L3 caterpillar antenna', 'butterfly.larva', (s) => s.replace('data-part="head"/>', 'data-part="head"/><line x1="172" y1="86" x2="180" y2="76" stroke="#146B5E" stroke-width="2" data-part="antenna"/>'), /part count antenna 1 ≠ 0/],
    ['L4 egg back at true scale', 'butterfly.egg', (s) => s.replace(/<path d="M 82 114[^>]*data-part="egg"([^>]*)\/>/, '<ellipse cx="100" cy="108" rx="4.5" ry="6" fill="#FFFFFF" stroke="#146B5E" stroke-width="4.35" data-part="egg"$1/>'), /units tall|px tall at 92/],
    ['L5 ladybird spot off the elytra', 'ladybird.adult', (s) => s.replace('cx="130" cy="122" r="7.5"', 'cx="150" cy="150" r="7.5"'), /outside the elytra/],
    ['L6 legs at the front', 'frog.legged', (s) => s.replace(/points="106,100 130,114 120,136"/, 'points="106,56 130,50 138,34"'), /hind legs grow at the tail end/],
  ];
  const plog = []; let killed = 0;
  const judge = (name, f, re) => { const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  // L7 needs no browser: the primitive refuses 88
  { let t = null; try { svgOf('butterfly.adult', 88); } catch (e) { t = e.message; } judge('L7 render at 88', t ? [t] : [], /MIN_SIZE/); }

  let browser = null;
  if (!noRender) {
    const puppeteer = require('puppeteer');
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
    try {
      const control = await measure(page, ALL.map((key) => ({ key, svg: svgOf(key) })), 'control');
      const cf = judgeMeasure(control);
      cf.forEach((x) => ok(false, x));
      console.log(`render @92: egg ${control['butterfly.egg'].eggH.toFixed(1)} px · legged legs ${control['frog.legged'].legPx.map((x) => x.toFixed(1)).join('/')} px · froglet stub ${control['frog.froglet'].stubPx.toFixed(1)} px · ladybird spots min ${Math.min(...control['ladybird.adult'].spotW).toFixed(1)} px — ${cf.length} findings`);
      for (const [name, key, doctor, re] of POISONS) {
        const bad = doctor(svgOf(key));
        if (bad === svgOf(key)) { plog.push(`  ${name}: POISON DID NOT APPLY`); continue; }
        const f = checkStage(bad, key, 92);
        const m = await measure(page, ALL.map((k) => ({ key: k, svg: k === key ? bad : svgOf(k) })), 'poison');
        judge(name, [...f, ...judgeMeasure(m)], re);
      }
      if (!noSheet) {
        for (const grey of [false, true]) {
          const f = path.join(OUT, `G1-377-life-stage-sheet-${grey ? 'grey' : 'colour'}.html`);
          fs.writeFileSync(f, sheetHtml(grey));
          await page.goto(require('url').pathToFileURL(f).href, { waitUntil: 'networkidle0' });
          await page.evaluate(() => document.fonts.ready);
          const el = await page.$('#sheet');
          await el.screenshot({ path: f.replace(/\.html$/, '.png') });
          console.log('sheet: ' + f.replace(/\.html$/, '.png'));
        }
      }
    } finally { await browser.close(); }
  } else {
    // node-only poisons (the render half needs the browser)
    for (const [name, key, doctor, re] of POISONS) judge(name + ' (node)', checkStage(doctor(svgOf(key)), key, 92), re);
  }
  console.log('poison:\n' + plog.join('\n'));
  const total = noRender ? POISONS.length + 1 : POISONS.length + 1;
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, checkStage, EXPECT, eggSignature };
