#!/usr/bin/env node
/**
 * verify-b5-road-pictogram.js — the gate of primitives/road-pictogram.js (K-369
 * `road-safety`, design §2 "NEW primitives/road-pictogram.js"). Re-parses the
 * EMITTED markup; never reads `meta`.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-road-pictogram.js [--no-render]
 *
 * NODE PASS
 *   - every pose emits one `[data-lcs-pictogram="walker"]` group with its pose;
 *   - a look pose's sight arrow: its chevron tip is the arrow's extreme x and
 *     lies on the PAGE's left of the head for look-left, right for look-right
 *     (the view is from behind, so the page's left IS the child's left);
 *   - the car faces RIGHT: every motion line of a driving car ends left of the
 *     body (behind it), a waiting car draws none; the car is teal (never a code
 *     colour);
 *   - the street band: walk = kerb x 0..poleX, every zebra bar right of the
 *     pole and inside the road's height; drive = one stop line centred 16 px
 *     left of the pole, inside the road; tokens only.
 * RENDER PASS — the walking silhouette >= 1.25 x the standing one wide; the
 * base pictogram sizes (walker 84 / 130, car 110) keep a max extent >= 56;
 * colour + grey contact sheets at the smallest and largest sizes.
 * POISONS: look-left with its arrow mirrored (the F2 PR3 class) · a driving
 * car with its motion lines in FRONT · a zebra bar on the kerb · the stop line
 * moved 40 px off its place.
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const RP = require('../primitives/road-pictogram.js');
const H = require('./b5-road-safety-harness.js');

const K = H.makeChecker();
const { ok } = K;
const CODE = new Set(Object.values(tokens.codeColors).map((c) => c.toUpperCase()));
const PALETTE = new Set([...Object.values(tokens.color)].map((c) => c.toUpperCase()));
const attr = (tag, n) => { const m = new RegExp(`\\s${n}="([^"]*)"`).exec(tag); return m ? m[1] : null; };

function checkWalker(svg, pose, tag) {
  const g = /<g data-lcs-pictogram="walker" data-lcs-pose="([^"]+)"/.exec(svg);
  ok(!!g && g[1] === pose, `${tag}: pose stamp ${g && g[1]} ≠ ${pose}`);
  if (pose === 'back-look-left' || pose === 'back-look-right') {
    const head = /<circle cx="([\d.]+)" cy="18" r="11"/.exec(svg);
    const tip = /<polygon points="([^"]+)" fill="[^"]+" data-lcs-sight-tip="1"/.exec(svg);
    ok(!!head && !!tip, `${tag}: no head / sight tip`);
    if (head && tip) {
      const pts = tip[1].trim().split(/\s+/).map((p) => p.split(',').map(Number));
      const xs = pts.map((p) => p[0]);
      const hx = +head[1];
      const apex = pts.find((p) => p[1] === 18) || pts[0];         // the chevron's point sits on the sight line
      const faces = apex[0] < Math.min(...xs.filter((x) => x !== apex[0])) ? -1 : apex[0] > Math.max(...xs.filter((x) => x !== apex[0])) ? 1 : 0;
      const side = apex[0] < hx ? -1 : 1;
      const want = pose === 'back-look-left' ? -1 : 1;
      ok(side === want && faces === want, `${tag}: the sight arrow points ${faces < 0 ? 'left' : faces > 0 ? 'right' : 'nowhere'} on the ${side < 0 ? 'left' : 'right'} of the head (${pose})`);
    }
  }
  for (const m of svg.matchAll(/ fill="(#[0-9A-Fa-f]{6})"/g)) ok(PALETTE.has(m[1].toUpperCase()), `${tag}: off-palette ${m[1]}`);
}
function checkCar(svg, state, tag) {
  const body = /<rect x="([\d.]+)" y="26" width="([\d.]+)"/.exec(svg);
  ok(!!body, `${tag}: no car body`);
  const lines = [...svg.matchAll(/<g data-lcs-motion="1">([\s\S]*?)<\/g>/g)].flatMap((m) => [...m[1].matchAll(/<line [^>]*\/>/g)].map((l) => [+attr(l[0], 'x1'), +attr(l[0], 'x2')]));
  if (state === 'waiting') ok(lines.length === 0, `${tag}: a waiting car draws motion lines`);
  else {
    ok(lines.length === 3, `${tag}: ${lines.length} motion lines ≠ 3`);
    if (body) ok(lines.every(([a, b]) => Math.max(a, b) < +body[1]), `${tag}: a motion line is not behind the car (the car faces right)`);
  }
  const fills = [...svg.matchAll(/ fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1].toUpperCase());
  ok(!fills.some((f) => CODE.has(f)), `${tag}: the car carries a code colour`);
  ok(fills.includes(tokens.color.teal.toUpperCase()), `${tag}: the car is not teal`);
}
function checkBand(svg, kind, poleX, w, h, tag) {
  const rects = [...svg.matchAll(/<rect [^>]*\/>/g)].map((m) => ({ x: +attr(m[0], 'x'), y: +attr(m[0], 'y'), w: +attr(m[0], 'width'), h: +attr(m[0], 'height'), part: attr(m[0], 'data-lcs-band-part'), fill: (attr(m[0], 'fill') || '').toUpperCase() }));
  const road = rects.find((r) => r.part === 'road');
  ok(!!road, `${tag}: no road`);
  if (kind === 'walk') {
    const kerb = rects.find((r) => r.part === 'kerb');
    ok(!!kerb && Math.abs(kerb.x) < 0.01 && Math.abs(kerb.w - poleX) < 0.01, `${tag}: the kerb is not x 0..poleX`);
    const bars = rects.filter((r) => r.part === 'zebra');
    ok(bars.length >= 3, `${tag}: ${bars.length} zebra bars`);
    ok(bars.every((b) => b.x >= poleX - 0.01 && b.x + b.w <= w + 0.01), `${tag}: a zebra bar is not on the road right of the pole`);
    ok(bars.every((b) => b.y > 0 && b.y + b.h < h && b.fill === tokens.color.white.toUpperCase()), `${tag}: a zebra bar is not a white stripe inside the asphalt`);
  } else {
    const sl = rects.filter((r) => r.part === 'stopline');
    ok(sl.length === 1, `${tag}: ${sl.length} stop lines`);
    if (sl[0]) ok(Math.abs(sl[0].x + sl[0].w / 2 - (poleX - 16)) < 0.6, `${tag}: the stop line is centred at ${(sl[0].x + sl[0].w / 2).toFixed(1)}, not 16 px left of the pole (${poleX - 16})`);
  }
}

function nodePass() {
  let n = 0;
  for (const pose of RP.POSES) for (const h of [56, 84, 130]) { checkWalker(RP.walker({ pose, h }).svg, pose, `walker ${pose} h${h}`); n++; }
  for (const state of ['waiting', 'driving']) for (const w of [100, 110]) { checkCar(RP.car({ state, w }).svg, state, `car ${state} w${w}`); n++; }
  for (const kind of ['walk', 'drive']) for (const [w, poleX] of [[330, 165], [330, 170]]) { checkBand(RP.streetBand({ kind, w, h: 12, poleX }).svg, kind, poleX, w, 12, `band ${kind} pole ${poleX}`); n++; }
  for (const step of ['stop-kerb', 'look-left', 'look-right', 'look-both', 'walk-across']) { const f = RP.crossingFrame({ step }).svg; ok(/data-lcs-pictogram="walker"/.test(f), `frame ${step}: no figure`); n++; }
  return n;
}

async function poisons() {
  const good = RP.walker({ pose: 'back-look-left', h: 84 }).svg;
  const c = K.control('PP0 look-left control', await K.collect(() => checkWalker(good, 'back-look-left', 'control')));
  const mirrored = good.replace(/<polygon points="([^"]+)"/, (m, pts) => `<polygon points="${pts.trim().split(/\s+/).map((p) => { const [x, y] = p.split(',').map(Number); return `${(2 * 46 - x).toFixed(2)},${y}`; }).join(' ')}"`);
  K.judge('PP1 look-left arrow mirrored (F2 PR3 class)', await K.collect(() => checkWalker(mirrored, 'back-look-left', 'PP1')), /sight arrow points right on the right/, c);
  const car = RP.car({ state: 'driving', w: 110 }).svg;
  const cc = K.control('PP2 driving car control', await K.collect(() => checkCar(car, 'driving', 'control')));
  const front = car.replace(/<g data-lcs-motion="1">([\s\S]*?)<\/g>/, (m, inner) => '<g data-lcs-motion="1">' + inner.replace(/x([12])="(-?[\d.]+)"/g, (mm, k, v) => `x${k}="${(124 - +v).toFixed(1)}"`) + '</g>');
  K.judge('PP2 motion lines in front of the car', await K.collect(() => checkCar(front, 'driving', 'PP2')), /not behind the car/, cc);
  const band = RP.streetBand({ kind: 'walk', w: 330, h: 12, poleX: 165 }).svg;
  const cb = K.control('PP3 walk band control', await K.collect(() => checkBand(band, 'walk', 165, 330, 12, 'control')));
  const onKerb = band.replace(/(data-lcs-band-part="road"\/><rect x=")([\d.]+)/, (m, a) => a + '40');
  K.judge('PP3 a zebra bar on the kerb', await K.collect(() => checkBand(onKerb, 'walk', 165, 330, 12, 'PP3')), /zebra bar is not on the road right of the pole/, cb);
  const drive = RP.streetBand({ kind: 'drive', w: 330, h: 12, poleX: 165 }).svg;
  const cd = K.control('PP4 drive band control', await K.collect(() => checkBand(drive, 'drive', 165, 330, 12, 'control')));
  const moved = drive.replace(/(<rect x=")([\d.]+)(" y="2" width="6")/, (m, a, v, b) => a + (+v - 40) + b);
  K.judge('PP4 stop line moved 40 px', await K.collect(() => checkBand(moved, 'drive', 165, 330, 12, 'PP4')), /stop line is centred/, cd);
}

async function renderPass(page) {
  const html = ['standing', 'walking'].map((p) => `<div id="w-${p}" style="display:inline-block">${RP.walker({ pose: p, h: 84 }).svg}</div>`).join('') +
    `<div id="c1" style="display:inline-block">${RP.car({ state: 'waiting', w: 110 }).svg}</div>`;
  await H.openDoc(page, 'road-pictogram-measure', html);
  const m = await page.evaluate(() => {
    const w = (id) => document.querySelector(`#${id} [data-lcs-pictogram]`).getBoundingClientRect();
    const s = w('w-standing'), k = w('w-walking'), c = document.querySelector('#c1 svg').getBoundingClientRect();
    return { sw: s.width, kw: k.width, sh: s.height, carW: c.width, carH: c.height };
  });
  ok(m.kw / m.sw >= 1.25, `render: walking / standing width ${(m.kw / m.sw).toFixed(2)} < 1.25`);
  ok(Math.max(m.sh, m.sw) >= 56 && Math.max(m.carW, m.carH) >= 56, `render: a base pictogram's max extent < 56`);
  const cells = [];
  for (const h of [84, 130]) for (const pose of RP.POSES) cells.push(`<div style="display:inline-block;margin:6px;vertical-align:bottom">${RP.walker({ pose, h }).svg}</div>`);
  for (const state of ['waiting', 'driving']) cells.push(`<div style="display:inline-block;margin:6px">${RP.car({ state, w: 110 }).svg}</div>`);
  cells.push(`<div style="margin:6px">${RP.streetBand({ kind: 'walk', w: 330, h: 12, poleX: 165 }).svg}</div><div style="margin:6px">${RP.streetBand({ kind: 'drive', w: 330, h: 12, poleX: 165 }).svg}</div>`);
  for (const step of ['stop-kerb', 'look-left', 'look-right', 'walk-across']) cells.push(`<div style="display:inline-block;margin:6px">${RP.crossingFrame({ step }).svg}</div>`);
  const pngs = await H.sheet(page, 'road-pictogram-sheet', cells.join(''));
  return { ratio: m.kw / m.sw, pngs };
}

async function main() {
  const n = nodePass();
  console.log(`node pass: ${n} pictograms parsed`);
  await poisons();
  let rp = null;
  if (!process.argv.includes('--no-render')) rp = await H.withBrowser((page) => renderPass(page));
  if (rp) console.log(`render pass: walking / standing ${rp.ratio.toFixed(2)}; sheets:\n  ${rp.pngs.join('\n  ')}`);
  console.log('poisons:\n' + K.log.join('\n'));
  if (K.fails.length) console.log('FAILS:\n  ' + K.fails.slice(0, 40).join('\n  '));
  const pass = !K.fails.length && K.killed === K.total;
  console.log(pass ? `PASS (${K.assertions} assertions, ${K.killed}/${K.total} poisons killed)` : `FAIL (${K.fails.length} findings, ${K.killed}/${K.total} poisons killed)`);
  return pass;
}
if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, checkWalker, checkCar, checkBand };
