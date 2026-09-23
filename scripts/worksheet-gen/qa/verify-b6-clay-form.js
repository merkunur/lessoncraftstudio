#!/usr/bin/env node
/**
 * verify-b6-clay-form.js — the node gate of primitives/clay-form.js (design
 * docs/worksheet-gen/b6-designs/G1-399-sink-or-float.md §3 F2; the verify-body-figure.js
 * pattern). Pure node: every assertion is made on the EMITTED markup — the clay body (path
 * M/L/Q/Z or circle), the hollow ellipse, the dimples and the table line are parsed back out
 * of the svg string and the clay AREA is re-measured by 0.5-unit grid sampling (the
 * primitive claims no area of its own).
 *
 *   node scripts/worksheet-gen/qa/verify-b6-clay-form.js
 *
 * At w 72 / 120 / 160 for lump, ball, boat:
 *   - lump, ball and boat CLAY areas (boat = hull minus hollow) each within ± 15 % of the ball's
 *   - "same clay": identical fill (coralSoft) and stroke (teal) on every clay body; the outline
 *     RENDERS at 3 px (stroke-width x w / 160) and the dimples / table at 1.5 px
 *   - three dimples, each wholly inside the clay (never in the hollow), at the same offsets
 *     from each form's clay centre
 *   - every form rests on the table line (clay bottom within 2.5 u of y 116); nothing drawn
 *     BELOW the table (no water under any form); only token hexes; no coral (the answer colour)
 *   - the boat's hollow is OPEN at the top: its top reaches above the hull rim (y 70) and no
 *     stroked segment other than its own rim crosses it (no lid)
 * Throws: pancake, bowl, sheet, w 47.
 * POISONS (each must FAIL for its own reason; the real primitive is the control):
 *   PC1 a boat with half the clay area (hull keel raised)   -> "clay area"
 *   PC2 a boat with a lid segment across the hollow         -> "lid"
 *   PC3 a ball with a different fill                        -> "same clay"
 *   PC4 a dimple moved into the boat's hollow               -> "dimple"
 */
'use strict';
const { color } = require('../primitives/_tokens.js');
const C = require('../primitives/clay-form.js');

const PALETTE = new Set(Object.values(color).map((c) => c.toUpperCase()));
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const tagsOf = (s, name) => [...s.matchAll(new RegExp(`<${name}\\s[^>]*?/?>`, 'g'))].map((m) => m[0]);
const attr = (tag, name) => { const m = new RegExp(`\\s${name}="([^"]*)"`).exec(tag); return m ? m[1] : null; };
const num = (tag, name) => +attr(tag, name);

/** a path d (M L Q Z, absolute) -> polygon points */
function poly(d) {
  const t = d.match(/[MLQZ]|-?\d*\.?\d+/g); const out = []; let i = 0, cmd = null, cur = [0, 0];
  const n = () => +t[i++];
  while (i < t.length) {
    if (/[MLQZ]/.test(t[i])) { cmd = t[i++]; if (cmd === 'Z') continue; }
    if (cmd === 'M' || cmd === 'L') { cur = [n(), n()]; out.push(cur); }
    else if (cmd === 'Q') { const c = [n(), n()], p = [n(), n()]; for (let k = 1; k <= 40; k++) { const s = k / 40; out.push([(1 - s) ** 2 * cur[0] + 2 * (1 - s) * s * c[0] + s * s * p[0], (1 - s) ** 2 * cur[1] + 2 * (1 - s) * s * c[1] + s * s * p[1]]); } cur = p; }
  }
  return out;
}
function inPoly(P, x, y) { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; }

/** Parse one emitted form into {inClay(x,y), bodyTag, hollow, dimples, table, bottom}. */
function parse(svg) {
  const body = [...tagsOf(svg, 'path'), ...tagsOf(svg, 'circle')].find((t) => /data-lcs-clay-body/.test(t));
  let inBody, bottom;
  if (/^<circle/.test(body)) { const cx = num(body, 'cx'), cy = num(body, 'cy'), r = num(body, 'r'); inBody = (x, y) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r; bottom = cy + r; }
  else { const P = poly(attr(body, 'd')); inBody = (x, y) => inPoly(P, x, y); bottom = Math.max(...P.map((p) => p[1])); }
  const hTag = tagsOf(svg, 'ellipse').find((t) => /data-lcs-hollow/.test(t));
  const hollow = hTag ? { cx: num(hTag, 'cx'), cy: num(hTag, 'cy'), rx: num(hTag, 'rx'), ry: num(hTag, 'ry') } : null;
  const inHollow = (x, y) => !!hollow && ((x - hollow.cx) / hollow.rx) ** 2 + ((y - hollow.cy) / hollow.ry) ** 2 <= 1;
  const inClay = (x, y) => inBody(x, y) && !inHollow(x, y);
  let area = 0; for (let x = 0; x < 160; x += 0.5) for (let y = 0; y < 120; y += 0.5) if (inClay(x + 0.25, y + 0.25)) area += 0.25;
  const dimples = tagsOf(svg, 'path').filter((t) => /data-lcs-dimple/.test(t)).map((t) => poly(attr(t, 'd')));
  const table = tagsOf(svg, 'line').find((t) => /data-lcs-table/.test(t));
  return { body, inClay, inHollow, hollow, hTag, area, bottom, dimples, table };
}

function checkForm(svg, form, w, ballArea) {
  const f = []; const E = (c, m) => { if (!c) f.push(m); };
  const p = parse(svg);
  const root = /^<svg\s[^>]*>/.exec(svg)[0];
  E(num(root, 'width') === w && attr(root, 'viewBox') === '0 0 160 120' && attr(root, 'data-lcs-form') === form, `${form} ${w}: root svg`);
  for (const m of svg.matchAll(/#[0-9A-Fa-f]{6}\b/g)) E(PALETTE.has(m[0].toUpperCase()), `${form} ${w}: off-palette ${m[0]}`);
  E(!/#F2784B/i.test(svg), `${form} ${w}: coral (the answer colour) on a clay form`);
  E(!!p.body && attr(p.body, 'fill') === color.coralSoft && attr(p.body, 'stroke') === color.teal, `${form} ${w}: not the same clay (fill ${p.body && attr(p.body, 'fill')})`);
  E(p.body && Math.abs(num(p.body, 'stroke-width') * w / 160 - 3) < 0.05, `${form} ${w}: the outline renders ${(num(p.body, 'stroke-width') * w / 160).toFixed(2)} px ≠ 3`);
  if (ballArea) E(Math.abs(p.area / ballArea - 1) <= 0.15, `${form} ${w}: clay area ${p.area} is ${((p.area / ballArea - 1) * 100).toFixed(1)} % off the ball's ${ballArea} (> ± 15 %)`);
  E(p.table && num(p.table, 'y1') === C.TABLE_Y && Math.abs(num(p.table, 'stroke-width') * w / 160 - 1.5) < 0.05, `${form} ${w}: no 1.5 px table line at y ${C.TABLE_Y}`);
  E(p.bottom <= C.TABLE_Y + 0.01 && p.bottom >= C.TABLE_Y - 2.5, `${form} ${w}: the clay does not rest on the table (bottom ${p.bottom.toFixed(1)})`);
  // nothing below the table (no water under a form)
  for (const t of [...svg.matchAll(/\s(?:y|cy|y1|y2)="([\d.]+)"/g)]) E(+t[1] <= C.TABLE_Y + 0.01, `${form} ${w}: something drawn below the table (y ${t[1]})`);
  E(p.dimples.length === 3, `${form} ${w}: ${p.dimples.length} dimples ≠ 3`);
  p.dimples.forEach((d, i) => { for (const [x, y] of d) E(p.inClay(x, y), `${form} ${w}: dimple ${i + 1} leaves the clay at (${x.toFixed(1)}, ${y.toFixed(1)})`); });
  const [cx, cy] = C.CENTRE[form];
  p.dimples.forEach((d, i) => { const [dx, dy] = C.DIMPLES[i]; E(Math.abs(d[0][0] - (cx + dx - 4)) < 0.01 && Math.abs(d[0][1] - (cy + dy)) < 0.01, `${form} ${w}: dimple ${i + 1} not at its shared offset`); });
  if (form === 'boat') {
    E(!!p.hollow && attr(p.hTag, 'fill') === color.cream, 'boat: no cream hollow');
    if (p.hollow) {
      E(p.hollow.cy - p.hollow.ry < 70, 'boat: the hollow is not open above the rim');
      // a lid = any stroked line / path (other than the hollow rim itself) with a point inside the hollow
      const others = [...tagsOf(svg, 'line').filter((t) => !/data-lcs-table/.test(t)), ...tagsOf(svg, 'path').filter((t) => !/data-lcs-clay-body|data-lcs-dimple/.test(t))];
      for (const t of others) {
        const pts = /^<line/.test(t) ? Array.from({ length: 21 }, (_, k) => [num(t, 'x1') + (num(t, 'x2') - num(t, 'x1')) * k / 20, num(t, 'y1') + (num(t, 'y2') - num(t, 'y1')) * k / 20]) : poly(attr(t, 'd'));
        E(!pts.some(([x, y]) => p.inHollow(x, y)), 'boat: a lid segment crosses the hollow');
      }
    }
  } else E(!p.hollow, `${form}: a hollow on a closed form`);
  return { f, area: p.area };
}

function main() {
  assertions = 0; fails.length = 0;
  const areas = {};
  for (const w of [72, 120, 160]) {
    const ball = C.clayForm({ form: 'ball', w });
    const ba = checkForm(ball.svg, 'ball', w, null).area;
    areas.ball = ba;
    for (const form of C.FORMS) {
      const t = C.clayForm({ form, w });
      const r = checkForm(t.svg, form, w, ba);
      r.f.forEach((x) => ok(false, x)); assertions += 15;
      areas[form] = r.area;
    }
  }
  for (const bad of ['pancake', 'bowl', 'sheet']) { let m = null; try { C.clayForm({ form: bad }); } catch (e) { m = e.message; } ok(m && /unknown form/.test(m), `${bad} must THROW`); }
  { let m = null; try { C.clayForm({ form: 'ball', w: 47 }); } catch (e) { m = e.message; } ok(!!m, 'w 47 must THROW'); }

  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  const boat = C.clayForm({ form: 'boat', w: 120 }).svg;
  const ctl = checkForm(boat, 'boat', 120, areas.ball); ok(!ctl.f.length, 'control boat: ' + ctl.f.join(' | '));
  judge('PC1 boat with half the clay', checkForm(boat.replace(C.BOAT_HULL, 'M 18 70 L 142 70 Q 134 88 80 90 Q 26 88 18 70 Z'), 'boat', 120, areas.ball).f, /clay area/);
  judge('PC2 boat with a lid', checkForm(boat.replace('<g data-lcs-dimples', '<line x1="24" y1="72" x2="136" y2="72" stroke="#146B5E" stroke-width="4"/><g data-lcs-dimples'), 'boat', 120, areas.ball).f, /lid segment/);
  const ball = C.clayForm({ form: 'ball', w: 120 }).svg;
  judge('PC3 ball in another fill', checkForm(ball.replace(color.coralSoft, color.creamDeep), 'ball', 120, areas.ball).f, /not the same clay/);
  judge('PC4 dimple in the hollow', checkForm(boat.replace(/M 62 90 Q 66 93.5 70 90/, 'M 62 72 Q 66 75.5 70 72'), 'boat', 120, areas.ball).f, /dimple 1 leaves the clay/);

  console.log(`clay-form areas (u^2): lump ${areas.lump} · ball ${areas.ball} · boat clay ${areas.boat} (${((areas.boat / areas.ball - 1) * 100).toFixed(1)} %) · lump ${((areas.lump / areas.ball - 1) * 100).toFixed(1)} %`);
  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 30).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) process.exit(main() ? 0 : 1);
module.exports = { main, checkForm };
