#!/usr/bin/env node
/**
 * verify-compass-rose.js — the gate of primitives/compass-rose.js (G1-379 `maps` F2 / F5;
 * design docs/worksheet-gen/b5-designs/G1-379-maps.md §3 F2 "Verify").
 *
 *   node scripts/worksheet-gen/qa/verify-compass-rose.js [--no-sheet]
 *
 * NODE — every rotation x given dir x 5 letter sets (en N E S W · de N O S W · pt N L S O · sv
 *   N Ö S V · fi P I E L): exactly ONE given, three blanks, every box's letter === the set's
 *   letter for the direction its POSITION points at, derived INDEPENDENTLY here from the box
 *   angle (0/90/180/270 clockwise from up) minus the rotation — the gate never calls
 *   posToDir; the N marker only on rotation 0; token hexes only.
 *   THROWS: the marker asked on a turned rose, px 179 with boxes, rotation 45, a reference
 *   rose turned, a missing letter.
 * RENDER — every rose drawn in Chromium: the pin's rendered centre is the rose centre; each
 *   box's rendered centre is classified by its ANGLE round that centre (never read from the
 *   stamp), the direction recomputed from that angle and data-lcs-rot, and the stamped letter
 *   (given text or hidden answer) must be the set's letter for it; coral pixels only on an
 *   upright rose; given letters >= 22 px, boxes >= 36 px (the G2 floors at px 196); reference
 *   letters >= 14 px at px 96; blanks print nothing.
 * POISON — PR7 a turned rose carrying the coral marker (doctored markup) -> "marker on a turned
 *   rose"; PR8 an upright rose whose RIGHT box carries S -> "letter from position".
 * SHEET — out/dev/G1-379-compass-rose-{colour,grey}.png (px 196 + reference 96; en, de, fi).
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const CR = require('../primitives/compass-rose.js');
const H = require('./b5-maps-harness.js');

const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const SETS = {
  en: { n: 'N', e: 'E', s: 'S', w: 'W' }, de: { n: 'N', e: 'O', s: 'S', w: 'W' }, pt: { n: 'N', e: 'L', s: 'S', w: 'O' },
  sv: { n: 'N', e: 'Ö', s: 'S', w: 'V' }, fi: { n: 'P', e: 'I', s: 'E', w: 'L' },
};
/** INDEPENDENT truth: the bearing a box's position points at, from its angle and the rose's turn. */
function dirAt(angleDeg, rotation) {
  const b = (((Math.round(angleDeg / 90) * 90 - rotation) % 360) + 360) % 360;
  return { 0: 'n', 90: 'e', 180: 's', 270: 'w' }[b];
}
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

function nodeCheck(svg, loc, rot) {
  const f = [];
  for (const h of svg.match(/#[0-9a-fA-F]{6}\b/g) || []) if (!PALETTE.has(h.toUpperCase())) f.push(`off-palette ${h}`);
  const boxes = [...svg.matchAll(/<g data-lcs-pos="(\d)" data-lcs-dir="(\w)" data-lcs-(given|answer)="([^"]+)"/g)];
  if (boxes.length !== 4) f.push(`${boxes.length} boxes ≠ 4`);
  if (boxes.filter((b) => b[3] === 'given').length !== 1) f.push('not exactly one given letter');
  for (const b of boxes) {
    const pos = +b[1], want = SETS[loc][dirAt(pos * 90, rot)];
    if (b[4] !== want) f.push(`${loc} rot ${rot} pos ${pos}: stamps "${b[4]}", the position points ${dirAt(pos * 90, rot)} = "${want}"`);
  }
  if (rot !== 0 && /data-lcs-marker/.test(svg)) f.push(`marker on a turned rose (rot ${rot})`);
  if (rot === 0 && !/data-lcs-marker/.test(svg)) f.push('no N marker on an upright rose');
  return f;
}

async function renderCheck(page, roses) {
  await H.openDoc(page, 'compass-rose-measure', roses.map((r, i) => `<div id="r${i}" style="display:inline-block;margin:4px">${r.svg}</div>`).join(''));
  return page.evaluate(async (list) => {
    const out = [];
    for (let i = 0; i < list.length; i++) {
      const f = [];
      const svg = document.querySelector(`#r${i} svg`);
      const rot = +svg.dataset.lcsRot;
      const pin = svg.querySelector('[data-lcs-pin]').getBoundingClientRect();
      const cx = (pin.left + pin.right) / 2, cy = (pin.top + pin.bottom) / 2;
      const k = svg.getBoundingClientRect().width / 200;
      for (const g of svg.querySelectorAll('g[data-lcs-pos]')) {
        const box = g.querySelector('rect, circle');
        const r = box.getBoundingClientRect();
        const bx = (r.left + r.right) / 2, by = (r.top + r.bottom) / 2;
        const ang = ((Math.atan2(bx - cx, -(by - cy)) * 180) / Math.PI + 360) % 360;   // clockwise from up
        const stamped = g.dataset.lcsGiven || g.dataset.lcsAnswer || (g.querySelector('text') || {}).textContent;
        out.push({ i, ang, rot, stamped, letters: list[i].letters, given: !!g.dataset.lcsGiven, ref: !!g.dataset.lcsRef, boxPx: r.width, textPx: g.querySelector('text') ? parseFloat(g.querySelector('text').getAttribute('font-size')) * k : null, text: g.querySelector('text') ? g.querySelector('text').textContent : '' });
      }
      const ras = await window.__raster(svg, 1);
      let coral = 0;
      // the KITES only (radius < 57 units round the centre): the blank boxes are coral-dashed on every rose
      for (let p = 0; p < ras.w * ras.h; p++) { const x = (p % ras.w) / k, y = Math.floor(p / ras.w) / k; if (Math.hypot(x - 100, y - 100) > 57) continue; const r = ras.rgb[p * 3], gg = ras.rgb[p * 3 + 1], b = ras.rgb[p * 3 + 2]; if (Math.abs(r - 242) < 12 && Math.abs(gg - 120) < 14 && Math.abs(b - 75) < 14) coral++; }
      out.push({ i, coral, rot, rose: true });
    }
    return out;
  }, roses.map((r) => ({ letters: r.letters })));
}

function judge(rs) {
  const f = [];
  for (const m of rs) {
    if (m.rose) { if (m.rot !== 0 && m.coral > 20) f.push(`rose ${m.i}: coral marker on a turned rose (rot ${m.rot}, ${m.coral} px)`); continue; }
    const dir = { 0: 'n', 90: 'e', 180: 's', 270: 'w' }[(((Math.round(m.ang / 90) * 90 - m.rot) % 360) + 360) % 360];
    if (m.stamped !== m.letters[dir]) f.push(`rose ${m.i}: the box at ${Math.round(m.ang)}° on a rose turned ${m.rot}° carries "${m.stamped}", its position points ${dir} = "${m.letters[dir]}" (letter from position)`);
    if (m.ref) { if (m.textPx < 13.9) f.push(`rose ${m.i}: reference letter ${m.textPx.toFixed(1)} px < 14`); continue; }
    if (m.boxPx < 36) f.push(`rose ${m.i}: box ${m.boxPx.toFixed(1)} px < 36`);
    if (m.given && m.textPx < 22) f.push(`rose ${m.i}: given letter ${m.textPx.toFixed(1)} px < 22`);
    if (!m.given && m.text) f.push(`rose ${m.i}: a blank prints "${m.text}"`);
  }
  return f;
}

async function main() {
  const roses = [];
  for (const loc of Object.keys(SETS)) for (const rot of [0, 90, 180, 270]) for (const given of CR.DIRS) {
    const r = CR.compassRose({ px: 196, rotation: rot, given, letters: SETS[loc] });
    nodeCheck(r.svg, loc, rot).forEach((x) => ok(false, 'node: ' + x)); ok(true, 'node');
    if (given === 'n' || rot === 0) roses.push({ svg: r.svg, letters: SETS[loc] });
  }
  for (const loc of ['en', 'fi']) roses.push({ svg: CR.compassRose({ px: 96, reference: true, letters: SETS[loc] }).svg, letters: SETS[loc] });
  for (const [what, fn] of [
    ['marker on a turned rose', () => CR.compassRose({ rotation: 90, marker: true, letters: SETS.en })],
    ['px 179 with boxes', () => CR.compassRose({ px: 179, letters: SETS.en })],
    ['rotation 45', () => CR.compassRose({ rotation: 45, letters: SETS.en })],
    ['reference px 90 (letter < 14 px)', () => CR.compassRose({ px: 90, reference: true, letters: SETS.en })],
    ['reference turned', () => CR.compassRose({ px: 96, rotation: 90, reference: true, letters: SETS.en })],
    ['missing letter', () => CR.compassRose({ letters: { n: 'N', e: 'E', s: 'S' } })],
  ]) { let threw = false; try { fn(); } catch (e) { threw = true; } ok(threw, `${what} must THROW`); }
  const log = []; let killed = 0, total = 0;
  const judgeP = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  let pngs = [];
  await H.withBrowser(async (page) => {
    const rs = await renderCheck(page, roses);
    const f = judge(rs); f.forEach((x) => ok(false, 'render: ' + x));
    assertions += rs.length;
    console.log(`render: ${roses.length} roses, ${rs.filter((m) => !m.rose).length} boxes classified from their rendered angle; ${f.length} findings`);
    log.push(`  control: ${f.length} findings`);
    // PR7: a turned rose doctored to carry the coral marker
    const turned = CR.compassRose({ rotation: 90, given: 'n', letters: SETS.en }).svg;
    const doctored = turned.replace(/(<g transform="rotate\(90 100 100\)" data-lcs-kite="1">)<path d="M100 46 L113 87 L100 100 Z" fill="#146B5E"\/><path d="M100 46 L100 100 L87 87 Z" fill="#FFFFFF"\/>/, `$1<path d="M100 46 L113 87 L100 100 Z" fill="${tokens.color.coral}"/><path d="M100 46 L100 100 L87 87 Z" fill="${tokens.color.coralSoft}"/>`);
    judgeP('PR7 marker on a turned rose', [...nodeCheck(doctored.replace('data-lcs-kite="1"', 'data-lcs-kite="1" data-lcs-marker="n"'), 'en', 90), ...judge(await renderCheck(page, [{ svg: doctored, letters: SETS.en }]))], /marker on a turned rose/);
    // PR8: an upright rose whose right box carries S
    const up = CR.compassRose({ rotation: 0, given: 'n', letters: SETS.en }).svg.replace('data-lcs-pos="1" data-lcs-dir="e" data-lcs-answer="E"', 'data-lcs-pos="1" data-lcs-dir="e" data-lcs-answer="S"');
    judgeP('PR8 right box carries S at rot 0', judge(await renderCheck(page, [{ svg: up, letters: SETS.en }])), /letter from position/);
    if (!process.argv.includes('--no-sheet')) {
      const cell = (svg, cap) => `<figure style="margin:6px;display:inline-flex;flex-direction:column;align-items:center;gap:4px;background:#fff;padding:6px;border:1px solid #C8BFAE">${svg}<figcaption>${cap}</figcaption></figure>`;
      let body = '';
      for (const loc of ['en', 'de', 'fi']) body += '<div>' + [0, 90, 180, 270].map((rot) => cell(CR.compassRose({ px: 196, rotation: rot, given: rot === 0 ? 'e' : 'n', letters: SETS[loc] }).svg, `${loc} rot ${rot}`)).join('') + cell(CR.compassRose({ px: 96, reference: true, letters: SETS[loc] }).svg, `${loc} reference 96`) + '</div>';
      pngs = await H.sheet(page, 'compass-rose', body);
    }
  });
  console.log('poison:\n' + log.join('\n'));
  if (pngs.length) console.log('sheets:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 30).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, dirAt };
