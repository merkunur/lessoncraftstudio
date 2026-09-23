#!/usr/bin/env node
/**
 * verify-b5-road-sign.js — the gate of primitives/road-sign.js (K-369
 * `road-safety`, design docs/worksheet-gen/b5-designs/K-369-road-safety.md §2
 * "Gate qa/verify-b5-road-sign.js"). Never reads `meta`; never reads the
 * primitive's or the bank's class table — it carries its OWN copy.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-road-sign.js [--no-render]
 *
 * NODE PASS — every regulation combination of the shape table x s {68, 76, 92}
 * (+ post), and every sign of every authored locale block, RE-PARSED from the
 * emitted markup:
 *   - the outline: vertex count (a rounded corner's `Q` control point IS the
 *     vertex), triangle apex orientation (unique top vertex = up), the octagon's
 *     flat top, the diamond's vertices on the box mid-edges, the square vs the
 *     plate (aspect 1.2), circles by <circle>;
 *   - rim vs fill: a rim part concentric with a smaller field part → "rim";
 *     a lone red disc with a white bar → no-entry; a white rim round a blue
 *     field → mandatory;
 *   - the classification by the gate's OWN per-convention table, which must
 *     equal the record's `class` (a triDown is never "warning");
 *   - the glyph box inside the field (polygon: all four corners inside the
 *     field polygon; circle: centred, half-side <= the field radius);
 *   - every <text> >= 9 px; tokens only.
 * RENDER PASS (Chromium, default) — every text's rendered length <= its fit
 * width and inside the field; every glyph's DRAWN bbox inside the field; the
 * GREYSCALE checks, rasterised (Rec. 601): (a) a rim-only circle and a filled
 * circle differ >= 25 % in mean disc luma; (b) a white and a yellow field differ
 * >= 20 %; contact sheets colour + grey of the en table at s 68 (F5) and 92 (F4).
 * POISONS (each must FAIL for its own reason; the untouched sign is the control):
 * yield tagged `warning` · a point-up triangle declared triDown · the glyph
 * pushed out of the field · the text at s 60 (< 9 px, throws) · an unknown glyph
 * (throws) · (render) a "yellow" field painted creamDeep · (render) a rim circle
 * whose field is filled red.
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const RS = require('../primitives/road-sign.js');
const H = require('./b5-road-safety-harness.js');

const PALETTE = new Set([...Object.values(tokens.color), ...Object.values(tokens.codeColors)].map((c) => c.toUpperCase()));
const C = tokens.codeColors;
const K = H.makeChecker();
const { ok } = K;

/** The gate's OWN class table (design §5, copied independently of data/b5/road-safety.js). */
const CLASS_OF = {
  vienna: { triUp: 'warning', 'circle+rim': 'prohibition', 'circle+blue': 'mandatory', square: 'information', octagon: 'priority', triDown: 'priority', 'circle+red': 'prohibition' },
  mutcd: { diamond: 'warning', pentagon: 'warning', octagon: 'regulatory', triDown: 'regulatory', plateCircle: 'regulatory', 'circle+red': 'regulatory' },
  mx: { diamond: 'preventiva', octagon: 'restrictiva', triDown: 'restrictiva', plateCircle: 'restrictiva', square: 'informativa' },
  br: { diamond: 'advertencia', octagon: 'regulamentacao', triDown: 'regulamentacao', 'circle+rim': 'regulamentacao', square: 'indicacao' },
};

/* ------------------------------------------------------------------ parsing */
const attr = (tag, n) => { const m = new RegExp(`\\s${n}="([^"]*)"`).exec(tag); return m ? m[1] : null; };
function pathVerts(d) {
  if (/Q/.test(d)) return [...d.matchAll(/Q\s*(-?[\d.]+),(-?[\d.]+)/g)].map((m) => [+m[1], +m[2]]);
  return [...d.matchAll(/[ML]\s*(-?[\d.]+),(-?[\d.]+)/g)].map((m) => [+m[1], +m[2]]);
}
function partEl(svg, part) {
  const m = new RegExp(`<(path|circle|rect|line|g|text)\\b[^>]*data-lcs-sign-part="${part}"[^>]*>`).exec(svg);
  if (!m) return null;
  const tag = m[1], src = m[0];
  if (tag === 'path') return { tag, src, verts: pathVerts(attr(src, 'd')), fill: (attr(src, 'fill') || '').toUpperCase() };
  if (tag === 'circle') return { tag, src, cx: +attr(src, 'cx'), cy: +attr(src, 'cy'), r: +attr(src, 'r'), fill: (attr(src, 'fill') || '').toUpperCase() };
  if (tag === 'rect') return { tag, src, x: +attr(src, 'x'), y: +attr(src, 'y'), w: +attr(src, 'width'), h: +attr(src, 'height'), fill: (attr(src, 'fill') || '').toUpperCase() };
  return { tag, src };
}
function segDist(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
  const t = Math.max(0, Math.min(1, ((p.x - a[0]) * dx + (p.y - a[1]) * dy) / L2));
  return Math.hypot(p.x - (a[0] + t * dx), p.y - (a[1] + t * dy));
}
function inPoly(pt, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (((yi > pt[1]) !== (yj > pt[1])) && (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi)) c = !c;
  }
  return c;
}
/** The geometry key of a drawn sign, from its markup alone. */
function classifyMarkup(svg) {
  const plate = partEl(svg, 'plate');
  const rim = partEl(svg, 'rim');
  const field = partEl(svg, 'field');
  const bar = /data-lcs-glyph-kind="bar"/.test(svg);
  if (plate) return { key: 'plateCircle', field, rim };
  const outer = rim || field;
  if (!outer) return { key: null };
  if (outer.tag === 'circle') {
    if (rim && field && field.tag === 'circle' && Math.abs(rim.cx - field.cx) < 0.01 && Math.abs(rim.cy - field.cy) < 0.01) {
      // a RING: a red rim whose field is a real hole (r < 0.9 R); a thin white edge round a blue field
      if (rim.fill === C.codeRed.toUpperCase() && field.r < 0.9 * rim.r && field.fill !== C.codeRed.toUpperCase()) return { key: 'circle+rim', field, rim };
      if (rim.fill === tokens.color.white.toUpperCase() && field.fill === C.codeBlue.toUpperCase() && field.r < rim.r) return { key: 'circle+blue', field, rim };
    }
    if (!rim && field && field.fill === C.codeRed.toUpperCase() && bar) return { key: 'circle+red', field };
    return { key: 'circle?' };
  }
  if (outer.tag === 'rect') {
    return { key: Math.abs(outer.w - outer.h) < 0.5 ? 'square' : 'rect?', field, rim };
  }
  const v = outer.verts;
  if (v.length === 8) {
    const ys = v.map((p) => p[1]); const top = Math.min(...ys);
    const topPts = v.filter((p) => Math.abs(p[1] - top) < 0.01);
    return { key: topPts.length === 2 ? 'octagon' : 'octagon?', field, rim };
  }
  if (v.length === 5) return { key: 'pentagon', field, rim };
  if (v.length === 3) {
    const ys = v.map((p) => p[1]).sort((a, b) => a - b);
    if (ys[0] < ys[1] - 1) return { key: 'triUp', field, rim };
    if (ys[2] > ys[1] + 1) return { key: 'triDown', field, rim };
    return { key: 'tri?' };
  }
  if (v.length === 4) {
    const xs = v.map((p) => p[0]), ys = v.map((p) => p[1]);
    const w = Math.max(...xs) - Math.min(...xs), cx = (Math.max(...xs) + Math.min(...xs)) / 2;
    const onMid = v.some((p) => Math.abs(p[0] - cx) < 0.5 && Math.abs(p[1] - Math.min(...ys)) < 0.5);
    return { key: onMid ? 'diamond' : 'square', field, rim, w };
  }
  return { key: null };
}

/** Node checks of one drawn sign against the gate's own expectation. */
function checkSign(svg, want, tag) {
  const cls = classifyMarkup(svg);
  const key = cls.key;
  const expectKey = want.shape !== 'circle' ? want.shape : want.rim === 'red' ? 'circle+rim' : want.field === 'red' ? 'circle+red' : 'circle+blue';
  ok(key === expectKey, `${tag}: drawn outline reads "${key}", declared "${expectKey}"`);
  if (want.convention) {
    const c = CLASS_OF[want.convention][key];
    ok(c === want.class, `${tag}: the gate classifies the drawn sign as "${c}" (${want.convention}), the record says "${want.class}"`);
  }
  // the glyph box
  const gm = /<g transform="translate\((-?[\d.]+) (-?[\d.]+)\) scale\(([\d.]+)\)" data-lcs-sign-part="glyph"/.exec(svg);
  if (gm && cls.field) {
    const x = +gm[1], y = +gm[2], sz = 100 * +gm[3];
    const corners = [[x, y], [x + sz, y], [x + sz, y + sz], [x, y + sz]];
    // the design's nominal glyph box (e.g. 0.46 s at 0.60 h in a triUp) is NOT inside a triangle or a
    // diamond field — its top corners cross the slanted edges by construction. Node pass: the box CENTRE
    // is inside the field; the render pass samples the DRAWN silhouette (every outline point) instead.
    if (cls.field.tag === 'path') ok(inPoly([x + sz / 2, y + sz / 2], cls.field.verts), `${tag}: the glyph box leaves the field (centre outside)`);
    else if (cls.field.tag === 'circle') {
      ok(Math.abs(x + sz / 2 - cls.field.cx) < 0.6 && Math.abs(y + sz / 2 - cls.field.cy) < 0.6, `${tag}: the glyph box is not centred in the disc`);
      ok(sz / 2 <= cls.field.r + 0.01, `${tag}: the glyph box leaves the field (half-side ${(sz / 2).toFixed(1)} > r ${cls.field.r})`);
    } else if (cls.field.tag === 'rect') ok(corners.every((p) => p[0] >= cls.field.x - 0.01 && p[1] >= cls.field.y - 0.01 && p[0] <= cls.field.x + cls.field.w + 0.01 && p[1] <= cls.field.y + cls.field.h + 0.01), `${tag}: the glyph box leaves the field`);
  }
  if (want.glyph && !['none', 'text', 'bar'].includes(want.glyph)) ok(!!gm, `${tag}: glyph "${want.glyph}" not drawn`);
  // text >= 9 px
  for (const t of svg.matchAll(/<text [^>]*>/g)) ok(+attr(t[0], 'font-size') >= 9, `${tag}: text at ${attr(t[0], 'font-size')} px < 9`);
  // tokens only
  for (const m of svg.matchAll(/ (?:fill|stroke)="(#[0-9A-Fa-f]{6})"/g)) ok(PALETTE.has(m[1].toUpperCase()), `${tag}: off-palette ${m[1]}`);
  return key;
}

const COMBOS = [
  { shape: 'octagon', field: 'red', glyph: 'text', text: 'STOP' },
  { shape: 'octagon', field: 'red', glyph: 'text', text: 'ALTO' },
  { shape: 'octagon', field: 'red', glyph: 'text', text: 'PARE' },
  { shape: 'triDown', rim: 'red', field: 'white', glyph: 'text', text: 'YIELD' },
  { shape: 'triDown', rim: 'red', field: 'white', glyph: 'none' },
  { shape: 'triDown', rim: 'red', field: 'yellow', glyph: 'none' },
  ...['walker', 'twoChildren', 'adultChild', 'bicycle', 'trafficLightMini'].flatMap((g) => [{ shape: 'triUp', rim: 'red', field: 'white', glyph: g }, { shape: 'triUp', rim: 'red', field: 'yellow', glyph: g }]),
  ...['none', 'bicycle', 'walker'].flatMap((g) => [{ shape: 'circle', rim: 'red', field: 'white', glyph: g, slash: g !== 'none' }, { shape: 'circle', rim: 'red', field: 'yellow', glyph: g }]),
  { shape: 'circle', rim: null, field: 'red', glyph: 'bar' },
  { shape: 'circle', rim: null, field: 'red', glyph: 'bar', text: 'DO NOT|ENTER' },
  ...['walker', 'bicycle', 'adultChild', 'none'].map((g) => ({ shape: 'circle', rim: 'white', field: 'blue', glyph: g })),
  { shape: 'square', field: 'blue', glyph: 'crossingTriangle' }, { shape: 'square', field: 'blue', glyph: 'walkerOnStripes' },
  ...['walker', 'bicycle', 'trafficLightMini', 'twoChildren'].map((g) => ({ shape: 'diamond', field: 'yellow', glyph: g })),
  { shape: 'pentagon', field: 'yellow', glyph: 'twoChildren' }, { shape: 'pentagon', field: 'yellow', glyph: 'adultChild' },
  { shape: 'plateCircle', rim: 'red', field: 'white', glyph: 'bicycle', slash: true }, { shape: 'plateCircle', rim: 'red', field: 'white', glyph: 'walker', slash: true },
];

function localeBlocks() {
  const out = [];
  let mod;
  try { mod = require('../lib/b5-common.js').bankModule('road-safety'); } catch (e) { return out; }
  for (const [loc, block] of Object.entries(mod)) for (const [role, s] of Object.entries(block.signs || {})) out.push({ loc, role, spec: { ...s, convention: block.convention } });
  return out;
}

function nodePass() {
  let n = 0;
  for (const s of [68, 76, 92]) for (const c of COMBOS) for (const post of [null, { h: 16 }]) { checkSign(RS.roadSign({ ...c, s, post }).svg, c, `${c.shape}/${c.rim || '-'}/${c.field}/${c.glyph} s${s}`); n++; }
  const blocks = localeBlocks();
  for (const { loc, role, spec } of blocks) for (const s of [68, 76, 92]) {
    const { code, regRef, signedBy, class: _c, convention, ...draw } = spec;
    checkSign(RS.roadSign({ ...draw, s, role }).svg, spec, `${loc}.${role} (${code}) s${s}`); n++;
  }
  const throws = (fn, re, m) => { let e = ''; try { fn(); } catch (x) { e = x.message; } ok(re.test(e), m + ` (got "${e}")`); };
  throws(() => RS.roadSign({ shape: 'hexagon' }), /shape "hexagon"/, 'an unknown shape did not throw');
  throws(() => RS.roadSign({ shape: 'triUp', rim: 'red', field: 'white', glyph: 'car' }), /closed set/, 'a glyph outside the closed set did not throw');
  throws(() => RS.roadSign({ shape: 'circle', rim: 'red', field: 'blue', glyph: 'none' }), /white or yellow/, 'a red-rim circle with a blue field did not throw');
  throws(() => RS.roadSign({ shape: 'diamond', field: 'white', glyph: 'walker' }), /diamond field is yellow/, 'a white diamond did not throw');
  throws(() => RS.roadSign({ shape: 'triUp', rim: 'red', field: 'white', glyph: 'walker', text: 'X' }), /text only on glyph/, 'text on a pictogram glyph did not throw');
  return { n, blocks: blocks.length };
}

async function poisons() {
  const yieldSpec = { shape: 'triDown', rim: 'red', field: 'white', glyph: 'text', text: 'YIELD', convention: 'mutcd', class: 'regulatory' };
  const ys = RS.roadSign({ ...yieldSpec, s: 76 }).svg;
  const c1 = K.control('RS0 yield control', await K.collect(() => checkSign(ys, yieldSpec, 'control')));
  K.judge('RS1 yield tagged warning (P1)', await K.collect(() => checkSign(ys, { ...yieldSpec, class: 'warning' }, 'RS1')), /classifies the drawn sign as "regulatory".*record says "warning"/, c1);
  const tri = { shape: 'triUp', rim: 'red', field: 'white', glyph: 'adultChild', convention: 'vienna', class: 'warning' };
  const ts = RS.roadSign({ ...tri, s: 76 }).svg;
  const c2 = K.control('RS2 triUp control', await K.collect(() => checkSign(ts, tri, 'control')));
  K.judge('RS2 a point-up triangle declared triDown', await K.collect(() => checkSign(ts, { ...tri, shape: 'triDown', class: 'priority' }, 'RS2')), /reads "triUp", declared "triDown"/, c2);
  const pushed = ts.replace(/(<g transform="translate\()(-?[\d.]+)/, (m, a, v) => a + (+v + 30).toFixed(2));
  K.judge('RS3 glyph pushed out of the field', await K.collect(() => checkSign(pushed, tri, 'RS3')), /glyph box leaves the field/, c2);
  { let e = ''; try { RS.roadSign({ shape: 'triDown', rim: 'red', field: 'white', glyph: 'text', text: 'YIELD', s: 60 }); } catch (x) { e = x.message; }
    K.judge('RS4 YIELD at s 60 (< 9 px)', e ? [e] : [], /would print [\d.]+ px < 9/, true); }
  { let e = ''; try { RS.roadSign({ shape: 'diamond', field: 'yellow', glyph: 'car' }); } catch (x) { e = x.message; }
    K.judge('RS5 glyph "car" outside the closed set', e ? [e] : [], /closed set/, true); }
}

/* ------------------------------------------------------------------ render pass */
async function renderPass(page) {
  const items = [];
  for (const s of [68, 92]) for (const c of COMBOS) items.push({ ...c, s });
  // RP3 poison + its control: the same triUp walker sign, once untouched, once with its glyph scaled x1.35 about its box
  const rp3 = { shape: 'triUp', rim: 'red', field: 'white', glyph: 'walker', s: 92 };
  items.push({ ...rp3, _probe: 'control' }, { ...rp3, _probe: 'poison', _doctor: (svg) => svg.replace(/(data-lcs-sign-part="glyph"[^>]*>)/, '$1<g transform="translate(-9.9 -9.9) scale(1.35)" data-lcs-doctored="1">').replace(/(<\/g>)(<\/g><\/svg>)$/, '</g>$1$2') });
  const html = items.map((c, i) => { let svg = RS.roadSign({ ...c, post: { h: 14 } }).svg; if (c._doctor) svg = c._doctor(svg); return `<div id="S${i}" style="display:inline-block;margin:6px;vertical-align:bottom">${svg}</div>`; }).join('');
  await H.openDoc(page, 'road-sign-measure', html);
  const res = await page.evaluate((n) => {
    const out = [];
    for (let i = 0; i < n; i++) {
      const svg = document.querySelector(`#S${i} svg`);
      const field = svg.querySelector('[data-lcs-sign-part="field"]');
      const fb = field.getBBox();
      const texts = [...svg.querySelectorAll("text")].map((t) => ({ len: t.getComputedTextLength(), fit: +t.getAttribute("data-lcs-fit"), bb: (() => { const b = t.getBBox(); return { x: b.x, y: b.y, width: b.width, height: b.height }; })(), size: +t.getAttribute('font-size') }));
      const g = svg.querySelector('g[data-lcs-sign-part="glyph"]');
      let gb = null;
      const samples = [];
      if (g) {
        const r = g.getBoundingClientRect(), sr = svg.getBoundingClientRect(); gb = { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
        // the DRAWN silhouette: points along every shape outline, in the sign's user space
        const root = svg.getCTM().inverse();
        for (const el of g.querySelectorAll('path, circle, rect, line, polygon')) {
          if (el.getAttribute('fill') === 'none' && !el.getAttribute('stroke')) continue;
          const m = root.multiply(el.getCTM());
          const L = el.getTotalLength();
          const sw = +(el.getAttribute('stroke-width') || 0) * Math.hypot(m.a, m.b) / 2;
          for (let k = 0; k < 48; k++) { const p = el.getPointAtLength(L * k / 48); samples.push({ x: m.a * p.x + m.c * p.y + m.e, y: m.b * p.x + m.d * p.y + m.f, sw }); }
        }
      }
      const fieldPath = field.tagName === 'path' ? field.getAttribute('d') : null;
      out.push({ fb: { x: fb.x, y: fb.y, w: fb.width, h: fb.height }, texts, gb, samples, fieldPath, fieldTag: field.tagName, r: field.tagName === 'circle' ? +field.getAttribute('r') : null, cx: +field.getAttribute('cx'), cy: +field.getAttribute('cy') });
    }
    return out;
  }, items.length);
  const checkRes = (r, c) => {
    const tag = `render ${c.shape}/${c.glyph} s${c.s}${c._probe ? ' ' + c._probe : ''}`;
    // every sampled point of the drawn glyph (grown by half its stroke) inside the field
    if (r.samples.length) {
      let worst = 0;
      if (r.fieldPath) {
        const poly = pathVerts(r.fieldPath);
        const distOut = (p) => {
          if (inPoly([p.x, p.y], poly)) { let d = Infinity; for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) d = Math.min(d, segDist(p, poly[b], poly[a])); return p.sw - d; }
          return Infinity;
        };
        for (const p of r.samples) worst = Math.max(worst, distOut(p));
      } else if (r.fieldTag === 'circle') {
        for (const p of r.samples) worst = Math.max(worst, Math.hypot(p.x - r.cx, p.y - r.cy) + p.sw - r.r);
      } else {
        for (const p of r.samples) worst = Math.max(worst, r.fb.x - (p.x - p.sw), (p.x + p.sw) - (r.fb.x + r.fb.w), r.fb.y - (p.y - p.sw), (p.y + p.sw) - (r.fb.y + r.fb.h));
      }
      ok(worst <= 0.5, `${tag}: the drawn glyph crosses the field edge by ${worst === Infinity ? 'a point outside' : worst.toFixed(1) + ' px'}`);
    }
    for (const t of r.texts) {
      ok(t.len <= t.fit + 0.5, `${tag}: text ${t.len.toFixed(1)} px wider than its fit ${t.fit}`);
      ok(t.bb.x >= r.fb.x - 0.5 && t.bb.x + t.bb.width <= r.fb.x + r.fb.w + 0.5, `${tag}: text leaves the field horizontally (${JSON.stringify([t.bb, r.fb])})`);
    }
    if (r.gb) {
      if (r.fieldTag === 'circle') {
        const corners = [[r.gb.x, r.gb.y], [r.gb.x + r.gb.w, r.gb.y], [r.gb.x, r.gb.y + r.gb.h], [r.gb.x + r.gb.w, r.gb.y + r.gb.h]];
        // a drawn silhouette never reaches its bbox corner: allow the corner 12 % beyond the field radius
        ok(corners.every(([x, y]) => Math.hypot(x - r.cx, y - r.cy) <= r.r * 1.12), `${tag}: the drawn glyph leaves the disc`);
      } else ok(r.gb.x >= r.fb.x - 0.6 && r.gb.y >= r.fb.y - 0.6 && r.gb.x + r.gb.w <= r.fb.x + r.fb.w + 0.6 && r.gb.y + r.gb.h <= r.fb.y + r.fb.h + 0.6, `${tag}: the drawn glyph leaves the field bbox`);
    }
  };
  res.forEach((r, i) => { if (!items[i]._probe) checkRes(r, items[i]); });
  {
    const ci = items.findIndex((c) => c._probe === 'control'), pi = items.findIndex((c) => c._probe === 'poison');
    const ctl = K.control('RP3 drawn-glyph control', await K.collect(() => checkRes(res[ci], items[ci])));
    K.judge('RP3 glyph scaled x1.35 (drawn silhouette crosses the field edge)', await K.collect(() => checkRes(res[pi], items[pi])), /drawn glyph crosses the field edge/, ctl);
  }
  // greyscale, rasterised: mean disc luma over a grid; field luma at a glyph-free point
  const discLuma = async (spec, s = 92) => {
    const svg = RS.roadSign({ ...spec, s }).svg;
    await H.openDoc(page, 'road-sign-probe', `<div id="P">${svg}</div>`);
    const pts = [];
    for (let y = -0.46; y <= 0.46; y += 0.04) for (let x = -0.46; x <= 0.46; x += 0.04) if (x * x + y * y <= 0.46 * 0.46) pts.push({ x: s / 2 + x * s, y: s / 2 + y * s });
    const v = await page.evaluate(async (p) => window.__lumaAt(document.querySelector('#P svg'), p, 1), pts);
    return v.reduce((a, b) => a + b, 0) / v.length;
  };
  const fieldLuma = async (spec, pt, s = 92, doctor) => {
    let svg = RS.roadSign({ ...spec, s }).svg; if (doctor) svg = doctor(svg);
    await H.openDoc(page, 'road-sign-probe', `<div id="P">${svg}</div>`);
    const [v] = await page.evaluate(async (p) => window.__lumaAt(document.querySelector('#P svg'), [p], 3), { x: pt[0] * s, y: pt[1] * s });
    return v;
  };
  const rows = [];
  const pct = (a, b) => Math.abs(a - b) / Math.max(a, b) * 100;
  const rimW = await discLuma({ shape: 'circle', rim: 'red', field: 'white', glyph: 'none' });
  const rimY = await discLuma({ shape: 'circle', rim: 'red', field: 'yellow', glyph: 'none' });
  const blue = await discLuma({ shape: 'circle', rim: 'white', field: 'blue', glyph: 'none' });
  const red = await discLuma({ shape: 'circle', field: 'red', glyph: 'bar' });
  for (const [name, a, b, floor] of [['rim-white vs blue disc', rimW, blue, 25], ['rim-white vs red no-entry disc', rimW, red, 25], ['rim-YELLOW vs blue disc', rimY, blue, 25]]) {
    rows.push(`(a) ${name}: ${a.toFixed(0)} vs ${b.toFixed(0)} = ${pct(a, b).toFixed(1)} % (>= ${floor})`);
    ok(pct(a, b) >= floor, `greyscale (a) ${name}: ${pct(a, b).toFixed(1)} % < ${floor} %`);
  }
  const pt = [0.5, 0.86];                              // low in a triUp field, below the glyph box
  const wF = await fieldLuma({ shape: 'triUp', rim: 'red', field: 'white', glyph: 'none' }, [0.5, 0.62]);
  const yF = await fieldLuma({ shape: 'triUp', rim: 'red', field: 'yellow', glyph: 'none' }, [0.5, 0.62]);
  rows.push(`(b) white vs yellow triangle field: ${wF.toFixed(0)} vs ${yF.toFixed(0)} = ${pct(wF, yF).toFixed(1)} % (>= 20)`);
  ok(pct(wF, yF) >= 20, `greyscale (b) white vs yellow field: ${pct(wF, yF).toFixed(1)} % < 20 %`);
  void pt;
  // render poisons
  K.judge('RP1 a "yellow" field painted creamDeep', await K.collect(async () => {
    const pale = await fieldLuma({ shape: 'triUp', rim: 'red', field: 'yellow', glyph: 'none' }, [0.5, 0.62], 92, (s) => s.replace(new RegExp(C.codeYellow, 'g'), tokens.color.creamDeep));
    ok(pct(wF, pale) >= 20, `greyscale (b) RP1: ${pct(wF, pale).toFixed(1)} % < 20 %`);
  }), /greyscale \(b\) RP1: [\d.]+ % < 20 %/, true);
  K.judge('RP2 a rim circle whose field is filled red', await K.collect(async () => {
    const svg = RS.roadSign({ shape: 'circle', rim: 'red', field: 'white', glyph: 'none', s: 92 }).svg.replace(/(data-lcs-sign-part="rim"\/><circle [^>]*fill=")#FFFFFF/, `$1${C.codeRed}`);
    await H.openDoc(page, 'road-sign-probe', `<div id="P">${svg}</div>`);
    const pts = []; for (let y = -0.46; y <= 0.46; y += 0.04) for (let x = -0.46; x <= 0.46; x += 0.04) if (x * x + y * y <= 0.2116) pts.push({ x: 46 + x * 92, y: 46 + y * 92 });
    const v = await page.evaluate(async (p) => window.__lumaAt(document.querySelector('#P svg'), p, 1), pts);
    const m = v.reduce((a, b) => a + b, 0) / v.length;
    ok(pct(m, blue) >= 25, `greyscale (a) RP2: ${pct(m, blue).toFixed(1)} % < 25 %`);
  }), /greyscale \(a\) RP2: [\d.]+ % < 25 %/, true);
  // contact sheets: the en table (and every authored locale) at s 68 (F5) and 92 (F4)
  const blocks = localeBlocks();
  const cells = [];
  for (const s of [68, 92]) for (const { loc, role, spec } of blocks) {
    const { code, regRef, signedBy, class: _c, convention, ...draw } = spec;
    cells.push(`<figure style="display:inline-flex;flex-direction:column;align-items:center;margin:6px">${RS.roadSign({ ...draw, s, post: { h: 16 }, role }).svg}<figcaption>${loc} ${role} ${code} · s${s}</figcaption></figure>`);
  }
  const pngs = await H.sheet(page, 'road-sign-sheet', cells.join(''));
  return { n: items.length, rows, pngs };
}

async function main() {
  const np = nodePass();
  console.log(`node pass: ${np.n} signs parsed (${np.blocks} authored locale records)`);
  await poisons();
  let rp = null;
  if (!process.argv.includes('--no-render')) rp = await H.withBrowser((page) => renderPass(page));
  if (rp) console.log(`render pass: ${rp.n} signs measured; greyscale:\n  ${rp.rows.join('\n  ')}\nsheets:\n  ${rp.pngs.join('\n  ')}`);
  console.log('poisons:\n' + K.log.join('\n'));
  if (K.fails.length) console.log('FAILS:\n  ' + K.fails.slice(0, 40).join('\n  '));
  const pass = !K.fails.length && K.killed === K.total;
  console.log(pass ? `PASS (${K.assertions} assertions, ${K.killed}/${K.total} poisons killed)` : `FAIL (${K.fails.length} findings, ${K.killed}/${K.total} poisons killed)`);
  return pass;
}
if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { classifyMarkup, checkSign, CLASS_OF, main };
