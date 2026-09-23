#!/usr/bin/env node
/**
 * verify-b5-traffic-light.js — the gate of primitives/traffic-light.js (K-369
 * `road-safety`, design docs/worksheet-gen/b5-designs/K-369-road-safety.md §2
 * "Gate qa/verify-b5-traffic-light.js"). Never reads `meta` or `data-lcs-on`.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-traffic-light.js [--no-render]
 *
 * NODE PASS (every kind x lamps x on x fill x pedStyle x lampD {56, 64, 70}),
 * re-parsed from the EMITTED markup:
 *   - exactly one ray group when a lamp is on, none when off; 6 rays, 3 per side;
 *   - every ray segment OUTSIDE the housing rect and >= 3 px from every lamp;
 *   - the rays radiate from ONE point: each ray line, extended to the housing
 *     centre x, meets it within 0.5 px of the same y; that y is a lamp centre
 *     (±0.5); the lamp's RANK in the y order of the parsed lamp centres is the
 *     `on` the gate asked for (its own input, never the stamp);
 *   - lamp floors: car circle r = lampD/2, ped rounded square side lampD; the
 *     housing sizes of design §2 (car lampD+16 x 3·lampD+28, ped-2 lampD+20 x
 *     2·lampD+30); the housing top = `top` (the height cue);
 *   - fill:'lit' → exactly the on lamp carries a code colour (car: its lamp disc;
 *     ped: its glyph, or the mutcd dark field); fill:'none' → NO code colour.
 * RENDER PASS (Chromium, default): per light the ray group's rendered centre
 * picks the lamp by y order; walking / standing rendered silhouette width
 * >= 1.25; GREYSCALE: the lit lamp's signal region vs the same region unlit
 * differs >= 100 luma (Rec. 601, rasterised) — the amber codeYellow lamp is the
 * recorded exception (measured 89, gated >= 85, rays mandatory); contact sheets
 * colour + grey at the smallest (lampD 56) and largest (70, F1) sizes.
 * POISONS (doctored markup; each must FAIL for its own reason, the untouched
 * light is the control): two ray groups · a ray inside the housing · rays
 * centred between two lamps · a leaked fill on fill:'none' · walking glyph at
 * the TOP pedestrian lamp · lampD 50 under the floor · (render) a lit lamp
 * painted creamDeep (greyscale gap) · (render) the walking glyph replaced by
 * the standing one (width ratio).
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const TL = require('../primitives/traffic-light.js');
const H = require('./b5-road-safety-harness.js');

const CODE = new Set(Object.values(tokens.codeColors).map((c) => c.toUpperCase()));
const K = H.makeChecker();
const { ok } = K;

/* ------------------------------------------------------------------ parsing */
const attr = (tag, n) => { const m = new RegExp(`\\s${n}="([^"]*)"`).exec(tag); return m ? m[1] : null; };
function parseLight(svg) {
  const hsg = /<g data-lcs-light-part="housing"><rect ([^>]*)\/>/.exec(svg);
  const housing = hsg ? { x: +attr(hsg[0], 'x'), y: +attr(hsg[0], 'y'), w: +attr(hsg[0], 'width'), h: +attr(hsg[0], 'height') } : null;
  const lamps = [...svg.matchAll(/<g data-lcs-lamp="1"[^>]*>([\s\S]*?)<\/g>(?=<g data-lcs-(?:lamp|rays)|<\/g><\/svg>)/g)].map((m) => {
    const inner = m[1];
    const c = /<circle [^>]*data-lcs-lamp-shape="circle"[^>]*\/>/.exec(inner);
    const r = /<rect [^>]*data-lcs-lamp-shape="square"[^>]*\/>/.exec(inner);
    if (c) return { shape: 'circle', cx: +attr(c[0], 'cx'), cy: +attr(c[0], 'cy'), size: 2 * +attr(c[0], 'r'), fill: attr(c[0], 'fill'), inner };
    if (r) return { shape: 'square', cx: +attr(r[0], 'x') + +attr(r[0], 'width') / 2, cy: +attr(r[0], 'y') + +attr(r[0], 'height') / 2, size: +attr(r[0], 'width'), fill: attr(r[0], 'fill'), x: +attr(r[0], 'x'), y: +attr(r[0], 'y'), inner };
    return { shape: null, inner };
  });
  const rayGroups = [...svg.matchAll(/<g data-lcs-rays="1"[^>]*>([\s\S]*?)<\/g>/g)].map((m) => [...m[1].matchAll(/<line [^>]*\/>/g)].map((l) => ({ x1: +attr(l[0], 'x1'), y1: +attr(l[0], 'y1'), x2: +attr(l[0], 'x2'), y2: +attr(l[0], 'y2') })));
  return { housing, lamps, rayGroups };
}

/** The node checks of one light; `want` = the gate's own inputs. Returns the derived on-index. */
function checkLight(svg, want, tag) {
  const L = parseLight(svg);
  const D = want.lampD;
  ok(!!L.housing, `${tag}: no housing`);
  if (!L.housing) return null;
  const hs = want.kind === 'car' ? { w: D + 16, h: 3 * D + 28 } : want.lamps === 2 ? { w: D + 20, h: 2 * D + 30 } : { w: D + 20, h: 3 * D + 28 };
  ok(Math.abs(L.housing.w - hs.w) < 0.01 && Math.abs(L.housing.h - hs.h) < 0.01, `${tag}: housing ${L.housing.w} x ${L.housing.h} ≠ ${hs.w} x ${hs.h}`);
  ok(Math.abs(L.housing.y - (want.top || 0)) < 0.01, `${tag}: housing top ${L.housing.y} ≠ ${want.top || 0} (the height cue)`);
  ok(L.lamps.length === want.lamps, `${tag}: ${L.lamps.length} lamps ≠ ${want.lamps}`);
  for (const lp of L.lamps) {
    ok(lp.shape === (want.kind === 'car' ? 'circle' : 'square'), `${tag}: lamp shape ${lp.shape}`);
    ok(lp.size >= 56 - 0.01, `${tag}: lamp ${lp.size} px < the K floor 56`);
  }
  const order = L.lamps.map((lp, i) => ({ i, cy: lp.cy })).sort((a, b) => a.cy - b.cy).map((x) => x.i);
  // colour
  const codeFills = L.lamps.map((lp) => [...lp.inner.matchAll(/ fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1].toUpperCase()).some((c) => CODE.has(c) || (c === tokens.color.ink.toUpperCase() && lp.shape === 'square' && lp.fill && lp.fill.toUpperCase() === c)));
  if (want.fill === 'none') ok(!codeFills.some(Boolean) && !L.lamps.some((lp) => /data-lcs-outline="0"/.test(lp.inner)), `${tag}: fill:'none' carries a filled lamp or glyph`);
  // rays
  if (want.on === null) { ok(L.rayGroups.length === 0, `${tag}: ${L.rayGroups.length} ray groups with no lamp on`); return null; }
  ok(L.rayGroups.length === 1, `${tag}: ${L.rayGroups.length} ray groups (exactly one lamp is on)`);
  if (L.rayGroups.length !== 1) return null;
  const rays = L.rayGroups[0];
  ok(rays.length === 6, `${tag}: ${rays.length} rays ≠ 6`);
  const hx0 = L.housing.x, hx1 = L.housing.x + L.housing.w, hcx = (hx0 + hx1) / 2;
  let left = 0, right = 0;
  const ys = [];
  for (const r of rays) {
    const minx = Math.min(r.x1, r.x2), maxx = Math.max(r.x1, r.x2);
    const inside = maxx > hx0 + 0.01 && minx < hx1 - 0.01;
    ok(!inside, `${tag}: a ray inside the housing (x ${minx.toFixed(1)}..${maxx.toFixed(1)} vs ${hx0}..${hx1})`);
    if (maxx <= hx0 + 0.01) left++; else right++;
    // >= 3 px from every lamp box (lamps are inside the housing; measured anyway)
    for (const lp of L.lamps) {
      const dx = Math.max(0, lp.cx - lp.size / 2 - maxx, minx - (lp.cx + lp.size / 2));
      ok(dx >= 3, `${tag}: a ray within ${dx.toFixed(1)} px of a lamp`);
    }
    ys.push(Math.abs(r.x2 - r.x1) < 1e-9 ? r.y1 : r.y1 + (r.y2 - r.y1) * (hcx - r.x1) / (r.x2 - r.x1));
  }
  ok(left === 3 && right === 3, `${tag}: rays ${left} left / ${right} right ≠ 3 / 3`);
  ok(Math.max(...ys) - Math.min(...ys) <= 0.5, `${tag}: the rays do not radiate from one point (spread ${(Math.max(...ys) - Math.min(...ys)).toFixed(2)})`);
  const yOn = ys.reduce((a, b) => a + b, 0) / ys.length;
  let best = Infinity, idx = -1;
  L.lamps.forEach((lp, i) => { const dd = Math.abs(lp.cy - yOn); if (dd < best) { best = dd; idx = i; } });
  ok(best <= 0.5, `${tag}: the rays are centred ${best.toFixed(1)} px off every lamp`);
  const rank = order.indexOf(idx);
  ok(rank === want.on, `${tag}: the rays mark lamp rank ${rank}, the gate asked for ${want.on}`);
  if (want.fill === 'lit') {
    codeFills.forEach((has, i) => ok(has === (order.indexOf(i) === want.on), `${tag}: lamp rank ${order.indexOf(i)} ${has ? 'is coloured' : 'is not coloured'} (on = ${want.on})`));
  }
  // ped poses by index (from the glyph markup)
  if (want.kind === 'ped') {
    L.lamps.forEach((lp, i) => {
      const pose = (/data-lcs-pose="([^"]+)"/.exec(lp.inner) || [])[1];
      const rk = order.indexOf(i);
      if (rk === 0) ok(pose === (want.pedStop || 'standing'), `${tag}: the TOP pedestrian lamp shows "${pose}" (${want.pedStop || 'standing'})`);
      if (rk === want.lamps - 1) ok(pose === 'walking', `${tag}: the BOTTOM pedestrian lamp shows "${pose}" (walking)`);
    });
  }
  return rank;
}

function cases() {
  const out = [];
  for (const lampD of [56, 64, 70]) {
    for (const fill of ['lit', 'none']) {
      for (const on of [null, 0, 1, 2]) out.push({ kind: 'car', lamps: 3, on, fill, lampD, amberToken: on === 1 ? 'codeOrange' : 'codeYellow' });
      for (const pedStyle of ['vienna', 'mutcd']) {
        const pedStop = pedStyle === 'mutcd' ? 'hand' : 'standing';
        for (const on of [null, 0, 1]) out.push({ kind: 'ped', lamps: 2, on, fill, lampD, pedStyle, pedStop, top: 54 });
        for (const on of [null, 0, 2]) out.push({ kind: 'ped', lamps: 3, on, fill, lampD, pedStyle, pedStop });
      }
    }
  }
  return out;
}

function nodePass() {
  let n = 0;
  for (const c of cases()) { checkLight(TL.trafficLight(c).svg, c, `${c.kind}${c.lamps} on${c.on} ${c.fill} D${c.lampD} ${c.pedStyle || ''}`); n++; }
  // throws
  const throws = (fn, re, m) => { let e = ''; try { fn(); } catch (x) { e = x.message; } ok(re.test(e), m + ` (got "${e}")`); };
  throws(() => TL.trafficLight({ kind: 'car', lamps: 2 }), /3 lamps/, 'a 2-lamp car light did not throw');
  throws(() => TL.trafficLight({ kind: 'ped', lamps: 3, on: 1, pedStop: 'standing' }), /middle pedestrian lamp is never on/, 'the middle ped-3 lamp lit did not throw');
  throws(() => TL.trafficLight({ kind: 'ped', pedStop: undefined, on: 0 }), /pedStop/, 'an unset pedStop did not throw');
  throws(() => TL.trafficLight({ kind: 'car', on: 1, amberToken: 'codeRed' }), /amberToken/, 'amber codeRed did not throw');
  return n;
}

async function poisons() {
  const base = { kind: 'car', lamps: 3, on: 2, fill: 'lit', lampD: 56 };
  const good = TL.trafficLight(base).svg;
  const ctl = K.control('PT0 car control', await K.collect(() => checkLight(good, base, 'control')));
  // PT1 two ray groups (a second lamp lit)
  const g1 = /<g data-lcs-rays="1"[^>]*>[\s\S]*?<\/g>/.exec(good)[0];
  const twoRays = good.replace(g1, g1 + g1.replace(/y1="([\d.]+)"/g, (m, v) => `y1="${(+v - 124).toFixed(2)}"`).replace(/y2="([\d.]+)"/g, (m, v) => `y2="${(+v - 124).toFixed(2)}"`));
  K.judge('PT1 two lamps lit (two ray groups)', await K.collect(() => checkLight(twoRays, base, 'PT1')), /2 ray groups/, ctl);
  // PT2 a ray pulled inside the housing
  const inHousing = good.replace(/(<g data-lcs-rays="1"[^>]*><line x1=")([\d.]+)/, (m, a, v) => a + (+v + 20).toFixed(2));
  K.judge('PT2 ray inside the housing', await K.collect(() => checkLight(inHousing, base, 'PT2')), /ray inside the housing/, ctl);
  // PT3 rays centred between two lamps (31 px up)
  const between = good.replace(g1, g1.replace(/y([12])="([\d.]+)"/g, (m, k, v) => `y${k}="${(+v - 31).toFixed(2)}"`));
  K.judge('PT3 rays between two lamps', await K.collect(() => checkLight(between, base, 'PT3')), /centred [\d.]+ px off every lamp|rank/, ctl);
  // PT4 a leaked fill on fill:'none' (the F1 answer leak)
  const noneC = { ...base, fill: 'none' };
  const none = TL.trafficLight(noneC).svg;
  const cn = K.control('PT4 fill:none control', await K.collect(() => checkLight(none, noneC, 'control')));
  const leaked = none.replace(/(<g data-lcs-lamp="1" data-lcs-index="2"[^>]*><circle [^>]*fill=")#FFFFFF/, `$1${tokens.codeColors.codeGreen}`);
  K.judge('PT4 leaked fill on fill:none', await K.collect(() => checkLight(leaked, noneC, 'PT4')), /fill:'none' carries a filled lamp/, cn);
  // PT5 the walking glyph at the TOP pedestrian lamp
  const pedC = { kind: 'ped', lamps: 2, on: 0, fill: 'lit', lampD: 56, pedStyle: 'vienna', pedStop: 'standing', top: 54 };
  const ped = TL.trafficLight(pedC).svg;
  const cp = K.control('PT5 ped control', await K.collect(() => checkLight(ped, pedC, 'control')));
  const swapped = ped.replace('data-lcs-pose="standing"', 'data-lcs-pose="walking"');
  K.judge('PT5 walking glyph at the top lamp', await K.collect(() => checkLight(swapped, pedC, 'PT5')), /TOP pedestrian lamp shows "walking"/, cp);
  // PT6 lampD 50 under the floor
  const smallC = { ...base, lampD: 50 };
  K.judge('PT6 lampD 50', await K.collect(() => checkLight(TL.trafficLight(smallC).svg, smallC, 'PT6')), /lamp 50 px < the K floor 56/, ctl);
}

/* ------------------------------------------------------------------ render pass */
const POSE_CORE = { standing: [50, 44], walking: [56, 42], hand: [50, 68] };   // the gate's own copy of the glyph cores (unit box)
async function renderPass(page) {
  const lights = [];
  for (const lampD of [56, 70]) {
    for (const on of [0, 1, 2]) for (const amberToken of ['codeYellow', 'codeOrange']) { if (on !== 1 && amberToken === 'codeOrange') continue; lights.push({ kind: 'car', lamps: 3, on, fill: 'lit', lampD, amberToken }); }
    lights.push({ kind: 'car', lamps: 3, on: null, fill: 'lit', lampD });
    for (const pedStyle of ['vienna', 'mutcd']) {
      const pedStop = pedStyle === 'mutcd' ? 'hand' : 'standing';
      for (const on of [null, 0, 1]) lights.push({ kind: 'ped', lamps: 2, on, fill: 'lit', lampD, pedStyle, pedStop, top: 54 });
    }
    lights.push({ kind: 'car', lamps: 3, on: 1, fill: 'none', lampD });
  }
  const html = lights.map((c, i) => `<div id="L${i}" style="display:inline-block;margin:10px;vertical-align:bottom">${TL.trafficLight(c).svg}</div>`).join('');
  await H.openDoc(page, 'traffic-light-measure', html);
  const res = await page.evaluate(async (n) => {
    const out = [];
    for (let i = 0; i < n; i++) {
      const svg = document.querySelector(`#L${i} svg`);
      const lamps = [...svg.querySelectorAll('[data-lcs-lamp]')].map((g) => { const r = g.getBoundingClientRect(); return { cy: (r.top + r.bottom) / 2, box: g.firstElementChild.getBBox() }; });
      const ray = svg.querySelector('[data-lcs-rays]');
      let idx = null;
      if (ray) { const r = ray.getBoundingClientRect(); const cy = (r.top + r.bottom) / 2; const sorted = lamps.map((l, k) => ({ k, cy: l.cy })).sort((a, b) => a.cy - b.cy); let best = Infinity; sorted.forEach((l, rank) => { const d = Math.abs(l.cy - cy); if (d < best) { best = d; idx = rank; } }); }
      const glyphW = [...svg.querySelectorAll('[data-lcs-pictogram="walker"]')].map((g) => ({ pose: g.dataset.lcsPose, w: g.getBoundingClientRect().width }));
      out.push({ idx, lamps: lamps.map((l) => l.box), glyphW });
    }
    return out;
  }, lights.length);
  // index from the rendered ray group
  res.forEach((r, i) => { const c = lights[i]; ok(r.idx === c.on, `render light ${i} (${c.kind} on ${c.on}): the ray group sits on lamp rank ${r.idx}`); });
  // silhouette width ratio walking / standing (vienna pedestrian lights)
  res.forEach((r, i) => {
    const c = lights[i];
    if (c.kind !== 'ped' || c.pedStyle !== 'vienna') return;
    const st = r.glyphW.find((g) => g.pose === 'standing'), wk = r.glyphW.find((g) => g.pose === 'walking');
    ok(st && wk && wk.w / st.w >= 1.25, `render light ${i}: walking / standing width ${st && wk ? (wk.w / st.w).toFixed(2) : '?'} < 1.25`);
  });
  // greyscale: lit vs unlit signal region, per kind / index / style, measured by rasterising
  const probe = async (c, lampRank) => {
    const svg = TL.trafficLight(c).svg;
    const L = parseLight(svg);
    const order = L.lamps.map((lp, i) => ({ i, cy: lp.cy })).sort((a, b) => a.cy - b.cy).map((x) => x.i);
    const lp = L.lamps[order[lampRank]];
    let pt;
    if (c.kind === 'car') pt = { x: lp.cx, y: lp.cy };
    else if (c.pedStyle === 'mutcd' && lampRank === c.lamps - 1) pt = { x: lp.x + 7, y: lp.y + lp.size - 7 };      // the dark field, away from the walker
    else { const pose = lampRank === 0 ? c.pedStop : 'walking'; const [ux, uy] = POSE_CORE[pose]; const s = 0.8 * c.lampD / 100; pt = { x: lp.cx - 0.4 * c.lampD + ux * s, y: lp.cy - 0.4 * c.lampD + uy * s }; }
    await H.openDoc(page, 'traffic-light-probe', `<div id="P">${svg}</div>`);
    const [v] = await page.evaluate(async (p) => window.__lumaAt(document.querySelector('#P svg'), [p], 2.5), pt);
    return v;
  };
  const greyRows = [];
  const pairs = [
    ['car red', { kind: 'car', lamps: 3, lampD: 56 }, 0, 100], ['car green', { kind: 'car', lamps: 3, lampD: 56 }, 2, 100],
    ['car amber codeOrange', { kind: 'car', lamps: 3, lampD: 56, amberToken: 'codeOrange' }, 1, 100],
    ['car amber codeYellow (recorded exception)', { kind: 'car', lamps: 3, lampD: 56, amberToken: 'codeYellow' }, 1, 85],
    ['ped vienna stop', { kind: 'ped', lamps: 2, lampD: 56, pedStyle: 'vienna', pedStop: 'standing' }, 0, 100], ['ped vienna go', { kind: 'ped', lamps: 2, lampD: 56, pedStyle: 'vienna', pedStop: 'standing' }, 1, 100],
    ['ped mutcd stop (hand)', { kind: 'ped', lamps: 2, lampD: 56, pedStyle: 'mutcd', pedStop: 'hand' }, 0, 100], ['ped mutcd go (dark field)', { kind: 'ped', lamps: 2, lampD: 56, pedStyle: 'mutcd', pedStop: 'hand' }, 1, 100],
  ];
  for (const [name, c, rank, floor] of pairs) {
    const lit = await probe({ ...c, on: rank, fill: 'lit' }, rank);
    const unlit = await probe({ ...c, on: null, fill: 'lit' }, rank);
    greyRows.push(`${name}: lit ${lit.toFixed(0)} / unlit ${unlit.toFixed(0)} → ${Math.abs(unlit - lit).toFixed(0)} (>= ${floor})`);
    ok(Math.abs(unlit - lit) >= floor, `greyscale ${name}: lit ${lit.toFixed(0)} vs unlit ${unlit.toFixed(0)} differ ${Math.abs(unlit - lit).toFixed(0)} < ${floor}`);
  }
  // render poisons
  const redC = { kind: 'car', lamps: 3, on: 0, fill: 'lit', lampD: 56 };
  const pale = async () => {
    const svg = TL.trafficLight(redC).svg.replace(tokens.codeColors.codeRed, tokens.color.creamDeep);
    await H.openDoc(page, 'traffic-light-probe', `<div id="P">${svg}</div>`);
    const L = parseLight(svg);
    const [lit] = await page.evaluate(async (p) => window.__lumaAt(document.querySelector('#P svg'), [p], 2.5), { x: L.lamps[0].cx, y: L.lamps[0].cy });
    const unlit = await probe({ ...redC, on: null }, 0);
    ok(Math.abs(unlit - lit) >= 100, `greyscale RP1: lit ${lit.toFixed(0)} vs unlit ${unlit.toFixed(0)} differ ${Math.abs(unlit - lit).toFixed(0)} < 100`);
  };
  K.judge('RP1 lit lamp painted creamDeep (greyscale gap)', await K.collect(pale), /greyscale RP1: .* < 100/, true);
  const flatC = { kind: 'ped', lamps: 2, on: 1, fill: 'lit', lampD: 56, pedStyle: 'vienna', pedStop: 'standing', top: 54 };
  const widthPoison = async () => {
    const TP = require('../primitives/road-pictogram.js');
    let svg = TL.trafficLight(flatC).svg;
    // swap the walking glyph's parts for the standing ones (keeping its pose stamp): the width ratio must fire
    svg = svg.replace(/(<g data-lcs-pictogram="walker" data-lcs-pose="walking"[^>]*>)([\s\S]*?)(<\/g><\/g><\/g>)/, (m, a, b, c) => a + TP.walkerParts('standing', { fill: tokens.codeColors.codeGreen }) + c);
    await H.openDoc(page, 'traffic-light-probe', `<div id="P">${svg}</div>`);
    const w = await page.evaluate(() => [...document.querySelectorAll('#P [data-lcs-pictogram="walker"]')].map((g) => ({ pose: g.dataset.lcsPose, w: g.getBoundingClientRect().width })));
    const st = w.find((g) => g.pose === 'standing'), wk = w.find((g) => g.pose === 'walking');
    ok(st && wk && wk.w / st.w >= 1.25, `render RP2: walking / standing width ${st && wk ? (wk.w / st.w).toFixed(2) : '?'} < 1.25`);
  };
  K.judge('RP2 walking glyph drawn as standing (width ratio)', await K.collect(widthPoison), /walking \/ standing width 1\.\d\d < 1\.25|walking \/ standing width 0\./, true);
  // contact sheets at the smallest (56) and largest (70) sizes
  const sheetLights = [];
  for (const lampD of [56, 70]) {
    for (const on of [0, 1, 2]) sheetLights.push({ kind: 'car', lamps: 3, on, fill: 'lit', lampD });
    for (const s of ['mutcd', 'vienna']) for (const on of [0, 1]) sheetLights.push({ kind: 'ped', lamps: 2, on, fill: 'lit', lampD, pedStyle: s, pedStop: s === 'mutcd' ? 'hand' : 'standing', top: 54 });
    sheetLights.push({ kind: 'ped', lamps: 3, on: 2, fill: 'lit', lampD, pedStyle: 'vienna', pedStop: 'standing' });
    sheetLights.push({ kind: 'car', lamps: 3, on: 1, fill: 'none', lampD });
  }
  const pngs = await H.sheet(page, 'traffic-light-sheet', sheetLights.map((c) => `<div style="display:inline-block;margin:10px;vertical-align:bottom">${TL.trafficLight(c).svg}</div>`).join(''));
  return { n: lights.length, greyRows, pngs };
}

async function main() {
  const n = nodePass();
  console.log(`node pass: ${n} lights parsed`);
  await poisons();
  let rp = null;
  if (!process.argv.includes('--no-render')) rp = await H.withBrowser((page) => renderPass(page));
  if (rp) console.log(`render pass: ${rp.n} lights measured; greyscale:\n  ${rp.greyRows.join('\n  ')}\nsheets:\n  ${rp.pngs.join('\n  ')}`);
  console.log('poisons:\n' + K.log.join('\n'));
  if (K.fails.length) console.log('FAILS:\n  ' + K.fails.slice(0, 40).join('\n  '));
  const pass = !K.fails.length && K.killed === K.total;
  console.log(pass ? `PASS (${K.assertions} assertions, ${K.killed}/${K.total} poisons killed)` : `FAIL (${K.fails.length} findings, ${K.killed}/${K.total} poisons killed)`);
  return pass;
}
if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { checkLight, parseLight, main };
