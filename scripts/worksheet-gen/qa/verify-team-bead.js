#!/usr/bin/env node
/**
 * verify-team-bead.js — the render-measuring gate of primitives/team-bead.js (G1-380
 * `digraphs`, nt10-E; the verify-body-figure / G2-235 ruler pattern: assert from the
 * EMITTED markup as the real fonts render it, and poison it both ways).
 *
 *   node scripts/worksheet-gen/qa/verify-team-bead.js [--sheet]
 *
 * 1. NODE: every documented throw fires (h < 34, w < h, text wider than w − 24, a blank
 *    bead with text, a given bead without text, a stub on an in-word bead, lines on a
 *    non-blank bead, an unknown mode, a team missing from the widths table).
 * 2. RENDER (Chromium, the shell's woff2 from file://): every team of
 *    primitives/team-bead.widths.json at the three band sizes the design uses
 *    (K 150x90 / 56 · G1 76x44 / 26 · G2 70x40 / 26 key-in-card, and the 92x52 / 32 key)
 *    in all three modes:
 *      - the measured text advance (getComputedTextLength) === the table's textW ± 0.5
 *        (the table is not stale and the primitive did not guess);
 *      - the text is centred on the capsule ± 0.5 px horizontally;
 *      - the font's metric box (baseline − ascender·F … baseline + descender·F) is centred
 *        on the capsule ± 1 px, and the INK box (canvas actualBoundingBox) stays inside the
 *        capsule's inner height with >= 2 px to spare;
 *      - capsule = w − 2.5 x h − 2.5, rx = (h − 2.5)/2; fill / stroke / dash per mode
 *        (given tealSoft + teal, choice white + teal, blank white + coral dash 6 5);
 *        letters are ink (never coral); ONE <text> per bead;
 *      - blank writing lines run 0.7·rx inside each end; stubs sit at h/2.
 * 3. POISONS, each against the control: a stale widths table (sh x 0.8) · a typed-in
 *    ascender (0.5 instead of the measured 0.6719) · coral letters (doctored) · a blank
 *    bead drawn teal-solid (doctored). Each must FAIL for its own reason.
 * --sheet writes out/dev/G1-380-team-bead{,-grey}.png (colour + greyscale) for the eye.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');
const tokens = require('../primitives/_tokens.js');

const WG = path.resolve(__dirname, '..');
const OUT = path.join(WG, 'out', 'dev');
const FONTS_CSS = fs.readFileSync(path.join(WG, 'assets', 'fonts', 'fonts.css'), 'utf8')
  .replace(/url\('([^']+)'\)/g, (m, f) => `url('${url.pathToFileURL(path.join(WG, 'assets', 'fonts', f)).href}')`);
const SIZES = [
  { name: 'K-house', w: 150, h: 90, fontPx: 56 },
  { name: 'G1-key', w: 92, h: 52, fontPx: 32 },
  { name: 'G1-row', w: 76, h: 44, fontPx: 26 },
  { name: 'G1-card', w: 70, h: 40, fontPx: 26 },
];
const C = tokens.color;
const TRUE_METRICS = Object.freeze(JSON.parse(fs.readFileSync(path.join(WG, 'primitives', 'font-metrics.json'), 'utf8'))['baloo2-700']);

function freshModule() {
  for (const k of Object.keys(require.cache)) if (/team-bead(\.widths)?\.js(on)?$|font-metrics\.json$/.test(k)) delete require.cache[k];
  return require('../primitives/team-bead.js');
}

function nodeThrows(TB) {
  const f = [];
  const must = (name, fn, re) => { let m = null; try { fn(); } catch (e) { m = e.message; } if (!m || !re.test(m)) f.push(`throw "${name}": got ${m ? '"' + m + '"' : 'no throw'}`); };
  must('h < 34', () => TB.teamBead({ text: 'sh', w: 76, h: 30, mode: 'choice', fontPx: 22 }), /h 30 < 34/);
  must('w < h', () => TB.teamBead({ text: 'sh', w: 40, h: 44, mode: 'choice', fontPx: 26 }), /w 40 < h 44/);
  must('too wide', () => TB.teamBead({ text: 'sch', w: 60, h: 44, mode: 'choice', fontPx: 26 }), /wider than the bead/);
  must('blank with text', () => TB.teamBead({ text: 'sh', w: 76, h: 44, mode: 'blank', fontPx: 26 }), /blank bead never carries text/);
  must('given without text', () => TB.teamBead({ w: 76, h: 44, mode: 'given', fontPx: 26 }), /needs its team text/);
  must('stub in a word', () => TB.teamBead({ w: 96, h: 50, mode: 'blank', inWord: true, stubL: 8 }), /stub inside a word row/);
  must('lines on a choice', () => TB.teamBead({ text: 'sh', w: 76, h: 44, mode: 'choice', fontPx: 26, lines: { baseline: 30, mid: 20 } }), /writing lines belong on a blank/);
  must('unknown mode', () => TB.teamBead({ text: 'sh', w: 76, h: 44, mode: 'ghost', fontPx: 26 }), /unknown mode/);
  must('unknown team', () => TB.teamBead({ text: 'xq', w: 76, h: 44, mode: 'choice', fontPx: 26 }), /not in primitives\/team-bead\.widths\.json/);
  return f;
}

function sheetHtml(TB, { doctor } = {}) {
  const teams = Object.keys(require('../primitives/team-bead.widths.json').em);
  const cells = [];
  for (const s of SIZES) for (const mode of ['given', 'choice']) for (const t of teams) {
    let b;
    try { b = TB.teamBead({ text: t, w: s.w, h: s.h, mode, fontPx: s.fontPx, data: { 'data-q-size': s.name, 'data-q-team': t } }); } catch (e) { continue; }   // a team wider than w − 24 at this size is refused by design (sch / eau in a 70 px card bead)
    cells.push({ svg: b.svg, w: b.width, h: b.height, textW: b.textW, s, mode, t });
  }
  for (const s of SIZES) {
    const lines = { baseline: Math.round(s.h * 0.7), mid: Math.round(s.h * 0.7 - s.fontPx * 0.5) };
    const b = TB.teamBead({ w: s.w, h: s.h, mode: 'blank', lines, stubL: 10, stubR: 10, data: { 'data-q-size': s.name } });
    cells.push({ svg: b.svg, w: b.width, h: b.height, textW: 0, s, mode: 'blank', t: '', lines });
  }
  let body = cells.map((c, i) => `<div data-q="${i}" style="display:inline-block;margin:6px">${c.svg}</div>`).join('');
  if (doctor) body = doctor(body);
  return { html: `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS_CSS} body{margin:8px;background:#fff;width:1400px}</style></head><body>${body}</body></html>`, cells };
}

async function measure(page, TB, opts = {}) {
  const { html, cells } = sheetHtml(TB, opts);
  const f = path.join(OUT, `_G1-380-team-bead${opts.tag ? '-' + opts.tag : ''}.html`);
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(f, html, 'utf8');
  await page.setViewport({ width: 1420, height: 900, deviceScaleFactor: 2 });
  await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const M = TRUE_METRICS;   // read from disk at load, never the (poisonable) require cache
  const found = await page.evaluate(({ cells, C, M }) => {
    const f = [];
    const ctx = document.createElement('canvas').getContext('2d');
    cells.forEach((c, i) => {
      const host = document.querySelector(`[data-q="${i}"]`);
      const svg = host && host.querySelector('svg[data-lcs-prim="team-bead"]');
      const tag = `${c.s.name} ${c.mode} "${c.t}"`;
      if (!svg) { f.push(`${tag}: no bead`); return; }
      const sr = svg.getBoundingClientRect();
      const rect = svg.querySelector('rect[data-lcs-bead-body]');
      const rw = +rect.getAttribute('width'), rh = +rect.getAttribute('height'), rx = +rect.getAttribute('rx');
      if (Math.abs(rw - (c.s.w - 2.5)) > 0.01 || Math.abs(rh - (c.s.h - 2.5)) > 0.01) f.push(`${tag}: capsule ${rw}x${rh} ≠ ${c.s.w - 2.5}x${c.s.h - 2.5}`);
      if (Math.abs(rx - (c.s.h - 2.5) / 2) > 0.01) f.push(`${tag}: rx ${rx} ≠ (h − 2.5)/2`);
      if (rect.getAttribute('stroke-width') !== '2.5') f.push(`${tag}: stroke ${rect.getAttribute('stroke-width')} ≠ 2.5`);
      const fill = (rect.getAttribute('fill') || '').toUpperCase(), stroke = (rect.getAttribute('stroke') || '').toUpperCase(), dash = rect.getAttribute('stroke-dasharray');
      const want = c.mode === 'given' ? [C.tealSoft, C.teal, null] : c.mode === 'choice' ? [C.white, C.teal, null] : [C.white, C.coral, '6 5'];
      if (fill !== want[0].toUpperCase() || stroke !== want[1].toUpperCase() || dash !== want[2]) f.push(`${tag}: mode colours fill ${fill} stroke ${stroke} dash ${dash} ≠ ${want.join(' / ')}`);
      const texts = svg.querySelectorAll('text');
      if (c.mode === 'blank') {
        if (texts.length) f.push(`${tag}: a blank bead carries text`);
        const ls = [...svg.querySelectorAll('line[data-lcs-bead-line]')];
        if (ls.length !== 2) f.push(`${tag}: ${ls.length} writing lines ≠ 2`);
        const rr = (c.s.h - 2.5) / 2, x0 = 10 + 0.7 * rr, x1 = 10 + c.s.w - 0.7 * rr;
        ls.forEach((l) => { if (Math.abs(+l.getAttribute('x1') - x0) > 0.02 || Math.abs(+l.getAttribute('x2') - x1) > 0.02) f.push(`${tag}: writing line ${l.getAttribute('x1')}..${l.getAttribute('x2')} ≠ ${x0.toFixed(2)}..${x1.toFixed(2)}`); });
        const stubs = [...svg.querySelectorAll('line[data-lcs-stub]')];
        if (stubs.length !== 2 || stubs.some((s) => Math.abs(+s.getAttribute('y1') - c.s.h / 2) > 0.01)) f.push(`${tag}: stubs not at h/2`);
        return;
      }
      if (texts.length !== 1) { f.push(`${tag}: ${texts.length} <text> (one per bead)`); return; }
      const t = texts[0];
      if ((t.getAttribute('fill') || '').toUpperCase() !== C.ink.toUpperCase()) f.push(`${tag}: letters are ${t.getAttribute('fill')} (always ink)`);
      if (t.textContent !== c.t) f.push(`${tag}: prints "${t.textContent}"`);
      const adv = t.getComputedTextLength();
      if (Math.abs(adv - c.textW) > 0.5) f.push(`${tag}: rendered advance ${adv.toFixed(2)} ≠ the table's textW ${c.textW.toFixed(2)} (stale widths table)`);
      if (adv > c.s.w - 24 + 0.5) f.push(`${tag}: ${adv.toFixed(1)} px > w − 24`);
      const bb = t.getBBox();
      const cx = bb.x + bb.width / 2, beadCx = c.s.w / 2;
      if (Math.abs(cx - beadCx) > 0.5) f.push(`${tag}: text centre ${cx.toFixed(2)} ≠ bead centre ${beadCx}`);
      const F = c.s.fontPx, base = +t.getAttribute('y');
      const mTop = base - M.ascender * F, mBot = base + M.descender * F;
      if (Math.abs((mTop + mBot) / 2 - c.s.h / 2) > 1) f.push(`${tag}: metric box centre ${((mTop + mBot) / 2).toFixed(2)} ≠ h/2 ${c.s.h / 2} (± 1)`);
      ctx.font = `700 ${F}px "Baloo 2"`;
      const tm = ctx.measureText(c.t);
      const inkTop = base - tm.actualBoundingBoxAscent, inkBot = base + tm.actualBoundingBoxDescent;
      if (inkTop < 2.5 + 2 - 0.01 || inkBot > c.s.h - 2.5 - 2 + 0.01) f.push(`${tag}: ink ${inkTop.toFixed(1)}..${inkBot.toFixed(1)} crowds the ring (inner 2.5..${c.s.h - 2.5}, 2 px spare)`);
      if (Math.abs(sr.height - c.s.h) > 0.5) f.push(`${tag}: renders ${sr.height.toFixed(1)} px high`);
    });
    return f;
  }, { cells, C, M });
  return { found, n: cells.length };
}

async function main() {
  const sheet = process.argv.includes('--sheet');
  let assertions = 0;
  const fails = [];
  const TB = freshModule();
  const nt = nodeThrows(TB);
  assertions += 9; fails.push(...nt);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const log = [];
  let killed = 0, total = 0;
  try {
    const ctl = await measure(page, TB, { tag: 'control' });
    assertions += ctl.n; fails.push(...ctl.found);
    log.push(`  control: ${ctl.n} beads measured, ${ctl.found.length} findings`);
    if (sheet) {
      for (const [tag, filter] of [['', ''], ['-grey', 'filter:grayscale(1)']]) {
        await page.addStyleTag({ content: `body{${filter}}` });
        await page.screenshot({ path: path.join(OUT, `G1-380-team-bead${tag}.png`), fullPage: true });
      }
    }
    const judge = (name, res, re) => { total++; const k = res.found.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : res.found.length ? 'WRONG REASON — ' + res.found.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
    // P1 a stale widths table
    { const W = require('../primitives/team-bead.widths.json').em; const save = W.sh; W.sh = +(save * 0.8).toFixed(4);
      try { judge('PB1 stale widths table (sh x 0.8)', await measure(page, TB, { tag: 'p1' }), /"sh": rendered advance [\d.]+ ≠ the table's textW/); } finally { W.sh = save; } }
    // P2 a typed-in ascender
    { const M = require('../primitives/font-metrics.json')['baloo2-700']; const save = M.ascender; M.ascender = 0.5;
      let res;
      try { res = await measure(page, TB, { tag: 'p2' }); } finally { M.ascender = save; }
      // the page-side check reads the TRUE metrics (restored), so the shifted baseline shows as an off-centre box
      judge('PB2 typed-in ascender 0.5', res, /metric box centre [\d.]+ ≠ h\/2/); }
    // P3 coral letters
    judge('PB3 coral letters', await measure(page, TB, { tag: 'p3', doctor: (h) => h.replace(/(<text [^>]*fill=")#3A3530/, `$1${C.coral}`) }), /letters are #F2784B/i);
    // P4 a blank bead drawn teal and solid
    judge('PB4 solid teal blank', await measure(page, TB, { tag: 'p4', doctor: (h) => h.replace(/stroke="#F2784B" stroke-width="2.5" stroke-dasharray="6 5"/, `stroke="${C.teal}" stroke-width="2.5"`) }), /blank .*mode colours/);
  } finally { await browser.close(); }
  console.log('team-bead poisons:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 30).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main };
