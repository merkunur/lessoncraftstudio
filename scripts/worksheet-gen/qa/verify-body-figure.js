#!/usr/bin/env node
/**
 * verify-body-figure.js — the node gate of primitives/body-figure.js (design
 * docs/worksheet-gen/b4-designs/K-354-human-body.md §2 "Node gate
 * qa/verify-body-figure.js"). Pure node, no browser: parses the EMITTED SVG.
 *
 *   node scripts/worksheet-gen/qa/verify-body-figure.js [--table]
 *
 * Asserts, per h in {240, 300, 340, 420, 440, 504, 540, 560}:
 *   - every anchor (both sides) lies inside ITS shape's bbox: head/eye -> head,
 *     hair -> hair, ear -> ear-X, nose -> nose, mouth -> mouth, neck -> neck,
 *     shoulder/arm/elbow -> arm-X, hand/finger -> hand-X, leg/knee -> leg-X,
 *     foot/toe -> foot-X (the bbox comes from the geometry, the anchor from
 *     the table — two independent sources)
 *   - every region <g data-lcs-region> present unless hidden; a hidden id is
 *     ABSENT from the markup (no element at all — never display:none) and
 *     stamped on the root; the cascade (arm-X -> hand-X, leg-X -> foot-X)
 *   - the two thighs never self-overlap (leg-L bbox right < leg-R bbox left)
 *   - every fill / stroke hex is a token (primitives/_tokens.js); coral appears
 *     only in markers; the outline renders 3 px at every h (stroke-width x scale)
 *   - width === h * 300 / 560; the eye disc >= 2 px (MIN_H's reason)
 *   - MIN_H throws below 240; MAX_H above 680; an unknown hide id throws;
 *     markers closer than 30 px throw (hand + finger R at h 420, the design's
 *     21.8 px case) while hand + knee pass
 * then the POISONS, each against its control: an anchor moved outside its
 * shape (the table check fires), a display:none region (the absence check
 * fires on doctored markup), an off-palette hex (the palette check fires),
 * the design's original forearm width 22 (the F2 floor 24 px at h 540 fires;
 * the ruled 26 passes at 25.1).
 * Prints the region "min" table per h (--table) — the F2 (>= 24 at 540) and
 * F4 (>= 14 at 300) floors read it.
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const BF = require('../primitives/body-figure.js');

const PALETTE = new Set([...Object.values(tokens.color), ...Object.values(tokens.codeColors)].map((c) => c.toUpperCase()));
const HS = [240, 300, 340, 420, 440, 504, 540, 560, 660, 680];
const SHAPE_OF = { head: 'head', eye: 'head', hair: 'hair', ear: 'ear-X', nose: 'nose', mouth: 'mouth', neck: 'neck', shoulder: 'arm-X', arm: 'arm-X', elbow: 'arm-X', hand: 'hand-X', finger: 'hand-X', leg: 'leg-X', knee: 'leg-X', foot: 'foot-X', toe: 'foot-X' };

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/** The bbox of a region / feature straight from the emitted geometry (figure units), parsed from the svg. */
function bboxFromSvg(svg, id) {
  const re = new RegExp(`<g data-lcs-(?:region|feature)="${id}">([\\s\\S]*?)</g>`);
  const m = re.exec(svg);
  if (!m) return null;
  const g = m[1];
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const add = (x, y) => { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; };
  for (const p of g.matchAll(/ d="([^"]+)"/g)) for (const pt of pathPoints(p[1])) add(pt[0], pt[1]);
  for (const c of g.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g)) { add(+c[1] - +c[3], +c[2] - +c[3]); add(+c[1] + +c[3], +c[2] + +c[3]); }
  for (const e of g.matchAll(/<ellipse cx="([^"]+)" cy="([^"]+)" rx="([^"]+)" ry="([^"]+)"/g)) { add(+e[1] - +e[3], +e[2] - +e[4]); add(+e[1] + +e[3], +e[2] + +e[4]); }
  for (const r of g.matchAll(/<rect x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g)) { add(+r[1], +r[2]); add(+r[1] + +r[3], +r[2] + +r[4]); }
  return x0 === Infinity ? null : { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}
/** Points along a path (M/L/Q/A absolute commands as body-figure emits them; arcs sampled by the SVG F.6.5 endpoint-to-centre conversion). */
function pathPoints(d) {
  const out = [];
  const toks = d.match(/[MLQAZ]|-?\d*\.?\d+/g) || [];
  let cmd = null, cur = [0, 0], i = 0;
  const num = () => +toks[i++];
  while (i < toks.length) {
    const t = toks[i];
    if (/[MLQAZ]/.test(t)) { cmd = t; i++; if (cmd === 'Z') continue; }
    if (cmd === 'M' || cmd === 'L') { cur = [num(), num()]; out.push(cur); }
    else if (cmd === 'Q') { const c = [num(), num()], e = [num(), num()]; for (let k = 0; k <= 8; k++) { const u = k / 8; out.push([(1 - u) * (1 - u) * cur[0] + 2 * (1 - u) * u * c[0] + u * u * e[0], (1 - u) * (1 - u) * cur[1] + 2 * (1 - u) * u * c[1] + u * u * e[1]]); } cur = e; }
    else if (cmd === 'A') {
      const rx0 = num(), ry0 = num(), rot = num() * Math.PI / 180, large = num(), sweep = num(), x2 = num(), y2 = num();
      const [x1, y1] = cur;
      const cosR = Math.cos(rot), sinR = Math.sin(rot);
      const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
      const xp = cosR * dx + sinR * dy, yp = -sinR * dx + cosR * dy;
      let rx = Math.abs(rx0), ry = Math.abs(ry0);
      const lam = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
      if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
      const num2 = rx * rx * ry * ry - rx * rx * yp * yp - ry * ry * xp * xp, den = rx * rx * yp * yp + ry * ry * xp * xp;
      let coef = Math.sqrt(Math.max(0, num2 / den)); if (large === sweep) coef = -coef;
      const cxp = coef * rx * yp / ry, cyp = -coef * ry * xp / rx;
      const cx = cosR * cxp - sinR * cyp + (x1 + x2) / 2, cy = sinR * cxp + cosR * cyp + (y1 + y2) / 2;
      const ang = (ux, uy, vx, vy) => { const s = Math.sign(ux * vy - uy * vx) || 1; return s * Math.acos(Math.max(-1, Math.min(1, (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy))))); };
      const th1 = ang(1, 0, (xp - cxp) / rx, (yp - cyp) / ry);
      let dth = ang((xp - cxp) / rx, (yp - cyp) / ry, (-xp - cxp) / rx, (-yp - cyp) / ry);
      if (!sweep && dth > 0) dth -= 2 * Math.PI; else if (sweep && dth < 0) dth += 2 * Math.PI;
      for (let k = 0; k <= 16; k++) { const th = th1 + dth * k / 16; out.push([cx + rx * Math.cos(th) * cosR - ry * Math.sin(th) * sinR, cy + rx * Math.cos(th) * sinR + ry * Math.sin(th) * cosR]); }
      cur = [x2, y2];
    } else i++;
  }
  return out;
}
const inside = (p, b, tol = 0.5) => p.x >= b.x - tol && p.x <= b.x + b.w + tol && p.y >= b.y - tol && p.y <= b.y + b.h + tol;

function checkFigure(h, opts = {}) {
  const tag = `h ${h}`;
  const r = BF.bodyFigure({ h, ...(opts.args || {}) });
  const svg = r.svg;
  ok(Math.abs(r.width - h * 300 / 560) < 0.01, `${tag}: width ${r.width} ≠ ${h * 300 / 560}`);
  ok(/data-lcs-body data-lcs-body-h="\d+"/.test(svg.replace(/=""/g, '')) || /data-lcs-body-h="/.test(svg), `${tag}: no data-lcs-body-h stamp`);
  // regions present / hidden absent (the cascade included)
  const hidden = new Set(opts.args && opts.args.hide ? opts.args.hide : []);
  for (const x of [...hidden]) { const m = /^(arm|leg)-([LR])$/.exec(x); if (m) hidden.add((m[1] === 'arm' ? 'hand-' : 'foot-') + m[2]); }
  for (const id of [...BF.REGIONS, ...BF.FEATURES]) {
    const present = new RegExp(`data-lcs-(?:region|feature)="${id}"`).test(svg);
    if (hidden.has(id)) ok(!present, `${tag}: hidden ${id} is still in the markup`);
    else ok(present, `${tag}: region ${id} absent`);
  }
  ok(!/display:none/.test(svg), `${tag}: a display:none in the markup (a hidden region must be ABSENT)`);
  if (hidden.size) ok(new RegExp(`data-lcs-hidden="${[...hidden].join(' ')}"`).test(svg) || [...hidden].every((x) => new RegExp(`data-lcs-hidden="[^"]*${x}`).test(svg)), `${tag}: data-lcs-hidden does not name ${[...hidden].join(' ')}`);
  // anchors inside their shape's bbox (bbox parsed from the emitted markup, anchor from the table)
  const anchorsUnit = opts.anchors || BF.ANCHORS;
  for (const [id, a] of Object.entries(anchorsUnit)) {
    const shape = SHAPE_OF[id];
    const pts = a.L ? [['L', a.L], ['R', a.R]] : [['', a]];
    for (const [side, p] of pts) {
      const rid = shape.replace('X', side);
      if (hidden.has(rid)) continue;
      const b = bboxFromSvg(svg, rid);
      ok(!!b && inside(p, b), `${tag}: anchor ${id}${side ? '-' + side : ''} (${p.x},${p.y}) outside its shape ${rid} ${b ? JSON.stringify(b) : '(no bbox)'}`);
    }
  }
  // thighs never overlap
  const ll = bboxFromSvg(svg, 'leg-L'), lr = bboxFromSvg(svg, 'leg-R');
  if (ll && lr) ok(ll.x + ll.w < lr.x, `${tag}: the thighs overlap (leg-L right ${(ll.x + ll.w).toFixed(1)} >= leg-R left ${lr.x.toFixed(1)})`);
  // palette + stroke px + coral only on markers
  for (const m of svg.matchAll(/(fill|stroke)="(#[0-9A-Fa-f]{6})"/g)) ok(PALETTE.has(m[2].toUpperCase()), `${tag}: off-palette ${m[1]} ${m[2]}`);
  const coral = tokens.color.coral.toUpperCase();
  const markerless = svg.replace(/<g data-lcs-marker[\s\S]*?<\/g>/g, '');
  ok(!new RegExp(coral, 'i').test(markerless), `${tag}: coral outside a marker`);
  const scale = h / 560;
  for (const m of markerless.matchAll(/stroke-width="([^"]+)"/g)) {
    const px = +m[1] * scale;
    ok([3, 2.5, 1.5].some((w) => Math.abs(px - w) < 0.05), `${tag}: a stroke renders ${px.toFixed(2)} px (want 3 / 2.5 / 1.5)`);
  }
  ok(BF._geometry.EYE.r * scale >= 2, `${tag}: the eye disc ${(BF._geometry.EYE.r * scale).toFixed(2)} px < 2`);
  return r;
}

function main() {
  const table = [];
  for (const h of HS) {
    const r = checkFigure(h);
    table.push(`  h ${String(h).padStart(3)}: ` + r.regions.map((x) => `${x.id} ${x.min.toFixed(1)}`).join(' · '));
  }
  // hides + the cascade, at the F4 heights
  checkFigure(300, { args: { hide: ['arm-L', 'hair'], fill: 'white' } });
  checkFigure(340, { args: { hide: ['leg-R', 'mouth', 'ear-L'], fill: 'white' } });
  // throws
  const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(m && re.test(m), `${what}: ${m ? 'threw "' + m + '"' : 'did not throw'}`); };
  throws(() => BF.bodyFigure({ h: 239 }), /MIN_H 240/, 'h 239');
  throws(() => BF.bodyFigure({ h: 681 }), /MAX_H 680/, 'h 681');
  throws(() => BF.bodyFigure({ h: 300, hide: ['eye'] }), /not hideable/, 'hide eye');
  throws(() => BF.bodyFigure({ h: 300, hide: ['torso'] }), /not hideable/, 'hide torso');
  throws(() => BF.bodyFigure({ h: 420, markers: [{ id: 'hand', side: 'R', n: 1 }, { id: 'finger', side: 'R', n: 2 }] }), /markers hand and finger are [\d.]+ px apart \(< 30\)/, 'markers hand + finger R at h 420');
  { let okm = true; try { BF.bodyFigure({ h: 420, markers: [{ id: 'hand', side: 'R', n: 1 }, { id: 'knee', side: 'L', n: 2 }] }); } catch (e) { okm = false; } ok(okm, 'control: markers hand R + knee L at h 420 must build'); }
  throws(() => BF.bodyFigure({ h: 300, fill: 'teal' }), /fill "teal"/, 'fill teal');
  // the F2 / F4 floors off the table
  const at540 = BF.bodyFigure({ h: 540 }).regions, at300 = BF.bodyFigure({ h: 300 }).regions;
  for (const id of ['hair', 'head', 'arm-L', 'arm-R', 'hand-L', 'hand-R', 'leg-L', 'leg-R', 'foot-L', 'foot-R']) ok(at540.find((x) => x.id === id).min >= 24, `F2 floor: ${id} ${at540.find((x) => x.id === id).min.toFixed(1)} px < 24 at h 540`);
  for (const id of ['hair', 'arm-L', 'hand-L', 'leg-L', 'foot-L']) ok(at300.find((x) => x.id === id).bboxMin >= 14, `F4 floor: ${id} bbox ${at300.find((x) => x.id === id).bboxMin.toFixed(1)} px < 14 at h 300`);
  for (const id of ['hair', 'arm-L', 'leg-L']) { const r340 = BF.bodyFigure({ h: 340 }).regions.find((x) => x.id === id); ok(r340.bboxMin >= 14, `F4 floor: ${id} bbox ${r340.bboxMin.toFixed(1)} px < 14 at h 340`); }

  // poisons (each against its control)
  const log = [];
  const judge = (name, findings, re) => { const hit = findings.some((x) => re.test(x)); log.push(`  ${name}: ${hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT'}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 2))}`); return hit; };
  let killed = 0; const TOTAL = 4;
  const own = (fn) => { const before = fails.length, saved = assertions; fn(); const out = fails.splice(before); assertions = saved; return out; };
  // PA — an anchor moved outside its shape
  {
    const bad = JSON.parse(JSON.stringify(BF.ANCHORS)); bad.head.L = { x: 5, y: 86 };
    if (judge('PA anchor', own(() => checkFigure(504, { anchors: bad })), /anchor head-L \(5,86\) outside its shape head/)) killed++;
    const ctl = own(() => checkFigure(504)); log.push(`  PA control: ${ctl.length} findings on the real table`); if (ctl.length) killed--;
  }
  // PH — a hidden region left in the markup as display:none
  {
    const real = BF.bodyFigure;
    // the hidden hand-L is re-inserted as a display:none group (the class the design forbids)
    BF.bodyFigure = (o) => { const r = real(o); r.svg = r.svg.replace('<g data-lcs-region="hand-R">', '<g data-lcs-region="hand-L" style="display:none"></g><g data-lcs-region="hand-R">'); return r; };
    const f = own(() => checkFigure(300, { args: { hide: ['hand-L'] } }));
    BF.bodyFigure = real;
    if (judge('PH display:none', f, /hidden hand-L is still in the markup|display:none in the markup/)) killed++;
  }
  // PP — an off-palette hex
  {
    const real = BF.bodyFigure;
    BF.bodyFigure = (o) => { const r = real(o); r.svg = r.svg.replace('fill="#FBF3E4"', 'fill="#FFCC99"'); return r; };
    const f = own(() => checkFigure(504));
    BF.bodyFigure = real;
    if (judge('PP palette', f, /off-palette fill #FFCC99/)) killed++;
  }
  // PR12 — the design's forearm width 22 → 21.2 px < 24 at h 540 (control: the ruled 26 → 25.1)
  {
    const G = BF._geometry;
    const w0 = G.ARM.fore.w;
    G.ARM.fore.w = 22;
    const narrow = BF.bodyFigure({ h: 540 }).regions.find((x) => x.id === 'arm-L').min;
    G.ARM.fore.w = w0;
    const back = BF.bodyFigure({ h: 540 }).regions.find((x) => x.id === 'arm-L').min;
    const f = narrow < 24 ? [`F2 floor: arm-L ${narrow.toFixed(1)} px < 24 at h 540`] : [];
    if (judge('PR12 forearm 22', f, /arm-L 21\.2 px < 24/) && back >= 24) killed++; else log.push(`  PR12 control: ruled 26 → ${back.toFixed(1)} px`);
  }
  if (process.argv.includes('--table')) console.log('region min per h:\n' + table.join('\n'));
  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
  const pass = !fails.length && killed === TOTAL;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${TOTAL} poisons killed)`);
  return pass;
}

if (require.main === module) process.exit(main() ? 0 : 1);
module.exports = { main, checkFigure, bboxFromSvg };
