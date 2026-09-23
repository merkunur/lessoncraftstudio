#!/usr/bin/env node
/**
 * verify-word-brick.js — the gate of primitives/word-brick.js (G2-359 `word-parts`,
 * design docs/worksheet-gen/b5-designs/G2-359-word-parts.md §2 "Gate qa/verify-word-brick.js").
 * Asserts from the EMITTED markup and the RENDER, never from the primitive's own tables.
 *
 *   node scripts/worksheet-gen/qa/verify-word-brick.js [--no-render]
 *
 * NODE PASS — every role × h {36, 44, 76} × w {60, 150, 302} (+ the stretch variant):
 *   the <svg> width/height attributes are w × h; the outline path's point bbox grown by
 *   stroke/2 is exactly 0..w × 0..h (± 1); stem: each tab protrudes exactly 8 beyond the
 *   body (distinct-x analysis of the path), the tab is 12 wide at the body and 18 at its
 *   tip (a dovetail); prefix: the notch is 8 deep, 12 at the edge and 18 inside; word: no
 *   joint (4 distinct x values); sockets: coral, dashed "7 5", white; tokens only.
 *   The four throws fire: h 35 (G2) / h 43 (band G1) · body < 48 (a stem at w 60) ·
 *   fontPx 16 · brickEstimate > body.
 * RENDER PASS (Chromium, the shell's woff2 over file://, fonts force-loaded):
 *   (a) every brick's getBoundingClientRect() == w × h (± 1) and its path getBBox()
 *       grown by stroke/2 == 0..w × 0..h;
 *   (b) TEXT — for every literal of every authored locale bank (families' members +
 *       roots, prefix-key rows and prefixes, agents) plus the design's measured long
 *       literals (Sonnenuntergang · Kinderspielplatz · schoonmaakster · Maanviljelijä ·
 *       Fahrradfahrer · Waldwegwanderung), a brick sized by brickWidthFor at 20 px (word,
 *       stem, prefix) and 18 px: the [data-lcs-brick-text] bbox lies inside the body minus
 *       4 px each side;
 *   (c) JOINT — a prefix + stem pair joined by brickJoin, rasterised at 2x on a magenta
 *       ground: in every row of the joint band (inside the bricks' vertical body) there is
 *       ZERO ground between the prefix and the stem (no gap) and in the joint column no
 *       stem fill left of the notch's inner wall (no spill); at h 36 / 44 / 76.
 *   Contact sheets (colour + greyscale) at the smallest and largest sizes the design uses:
 *   out/dev/G2-359-word-brick-{colour,grey}.png — READ them.
 * POISON — each must FAIL for its own reason; the untouched primitive is the control:
 *   PR4 tip = base (DOVE.tabTip = 12, a straight tab in the dovetail notch) -> joint gap;
 *   PR1 brickEstimate coefficient 0.52 on "Waldwegwanderung" at 20 px -> text outside the
 *   body (measured: at 0.52 "Sonnenuntergang" still fits by 5.2 px a side, so the design's
 *   literal is SILENT — the widest-per-glyph measured literal is the honest poison);
 *   PW  a word brick whose svg is 4 px wider than its outline -> the bbox assertion.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const tokens = require('../primitives/_tokens.js');
const WB = require('../primitives/word-brick.js');

const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const HS = [36, 44, 76], WS = [60, 150, 302];
const LONG = ['Sonnenuntergang', 'Kinderspielplatz', 'schoonmaakster', 'Maanviljelijä', 'Fahrradfahrer', 'Waldwegwanderung'];
const OUT = path.join(__dirname, '..', 'out', 'dev');

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/** Parse the outline path of an emitted brick into its point list (M/H/V/L/Q absolute). */
function parsePath(svg) {
  const d = (svg.match(/<path d="([^"]+)"/) || [])[1];
  if (!d) return null;
  const toks = d.match(/[MHVLQZ]|-?\d*\.?\d+/g);
  const pts = []; let x = 0, y = 0, cmd = null; let i = 0;
  while (i < toks.length) {
    const t = toks[i];
    if (/[MHVLQZ]/.test(t)) { cmd = t; i++; if (cmd === 'Z') continue; }
    if (cmd === 'M' || cmd === 'L') { x = +toks[i]; y = +toks[i + 1]; i += 2; pts.push([x, y]); }
    else if (cmd === 'H') { x = +toks[i]; i++; pts.push([x, y]); }
    else if (cmd === 'V') { y = +toks[i]; i++; pts.push([x, y]); }
    else if (cmd === 'Q') { pts.push([+toks[i], +toks[i + 1]]); x = +toks[i + 2]; y = +toks[i + 3]; i += 4; pts.push([x, y]); }
    else i++;
  }
  return pts;
}
const attr = (svg, a) => { const m = svg.match(new RegExp(`<(?:svg|path)[^>]*\\s${a}="([^"]+)"`)); return m ? m[1] : null; };
const pathAttr = (svg, a) => { const m = svg.match(new RegExp(`<path[^>]*\\s${a}="([^"]+)"`)); return m ? m[1] : null; };

function nodePass() {
  let n = 0;
  for (const role of WB.ROLES) for (const h of HS) for (const w of WS) {
    const shape = role.replace(/^socket-/, '');
    const sw = role.startsWith('socket-') ? 2.5 : role === 'stem' ? 3 : 2;
    const bodyW = shape === 'stem' ? w - sw - 16 : shape === 'prefix' ? w - sw - 8 : w - sw;
    const tag = `${role} ${w}x${h}`;
    if (bodyW < 48) {
      let thrown = null; try { WB.wordBrick({ role, w, h }); } catch (e) { thrown = e.message; }
      ok(thrown && /body width/.test(thrown), `${tag}: a ${bodyW.toFixed(1)} px body must THROW (got ${thrown})`);
      continue;
    }
    const svg = WB.wordBrick({ role, w, h });
    n++;
    ok(+attr(svg, 'width') === w && +attr(svg, 'height') === h, `${tag}: svg attributes ${attr(svg, 'width')} x ${attr(svg, 'height')}`);
    const pts = parsePath(svg);
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const psw = +pathAttr(svg, 'stroke-width');
    ok(psw === sw, `${tag}: stroke ${psw} ≠ ${sw}`);
    ok(Math.abs(Math.min(...xs) - psw / 2) <= 1 && Math.abs(Math.max(...xs) + psw / 2 - w) <= 1 && Math.abs(Math.min(...ys) - psw / 2) <= 1 && Math.abs(Math.max(...ys) + psw / 2 - h) <= 1,
      `${tag}: stroked outline box ${(Math.min(...xs) - psw / 2).toFixed(2)}..${(Math.max(...xs) + psw / 2).toFixed(2)} x ${(Math.min(...ys) - psw / 2).toFixed(2)}..${(Math.max(...ys) + psw / 2).toFixed(2)} ≠ 0..${w} x 0..${h}`);
    const dx = [...new Set(xs.map((x) => +x.toFixed(2)))].sort((a, b) => a - b);
    const cy = h / 2;
    const ysAt = (x) => pts.filter((p) => Math.abs(p[0] - x) < 0.01).map((p) => p[1]);
    const spanNear = (x) => { const v = ysAt(x).filter((y) => Math.abs(y - cy) <= 9.01); return Math.max(...v) - Math.min(...v); };
    if (shape === 'stem') {
      ok(Math.abs(dx[1] - dx[0] - 8) < 0.01 && Math.abs(dx[dx.length - 1] - dx[dx.length - 2] - 8) < 0.01, `${tag}: a tab does not protrude exactly 8 (${(dx[1] - dx[0]).toFixed(2)} / ${(dx[dx.length - 1] - dx[dx.length - 2]).toFixed(2)})`);
      ok(Math.abs(spanNear(dx[0]) - 18) < 0.01 && Math.abs(spanNear(dx[dx.length - 1]) - 18) < 0.01, `${tag}: tab tips are not 18 wide`);
      ok(Math.abs(spanNear(dx[1]) - 12) < 0.01 && Math.abs(spanNear(dx[dx.length - 2]) - 12) < 0.01, `${tag}: tab bases are not 12 wide`);
    } else if (shape === 'prefix') {
      const R = dx[dx.length - 1], inner = dx.filter((x) => x < R && ysAt(x).some((y) => Math.abs(Math.abs(y - cy) - 9) < 0.01));
      ok(inner.length === 1 && Math.abs(R - inner[0] - 8) < 0.01, `${tag}: the notch is not 8 deep`);
      ok(Math.abs(spanNear(R) - 12) < 0.01 && inner.length && Math.abs(spanNear(inner[0]) - 18) < 0.01, `${tag}: the notch is not 12 at the edge / 18 inside`);
      ok(Math.abs(spanNear(dx[0]) - 0) < 0.01 || !ysAt(dx[0]).some((y) => Math.abs(y - cy) < 9), `${tag}: the prefix's left edge carries a joint`);
    } else ok(dx.length === 4, `${tag}: a flat word brick has ${dx.length} distinct x values (a joint?)`);
    const colours = (svg.match(/#[0-9A-Fa-f]{6}/g) || []).map((c) => c.toUpperCase());
    ok(colours.every((c) => PALETTE.has(c)), `${tag}: off-palette colour ${colours.find((c) => !PALETTE.has(c))}`);
    if (role.startsWith('socket-')) ok(pathAttr(svg, 'stroke').toUpperCase() === tokens.color.coral.toUpperCase() && pathAttr(svg, 'stroke-dasharray') === '7 5' && pathAttr(svg, 'fill').toUpperCase() === '#FFFFFF', `${tag}: a socket is not coral dashed 7 5 on white`);
    else ok(pathAttr(svg, 'stroke').toUpperCase() === tokens.color.teal.toUpperCase() && !pathAttr(svg, 'stroke-dasharray'), `${tag}: a solid brick is not teal and solid`);
  }
  // throws
  const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(m && re.test(m), `throw ${what}: got ${m}`); };
  throws(() => WB.wordBrick({ role: 'word', w: 150, h: 35 }), /floor 36/, 'h 35 (G2)');
  throws(() => WB.wordBrick({ role: 'word', w: 150, h: 43, band: 'G1' }), /floor 44/, 'h 43 (G1)');
  throws(() => WB.wordBrick({ role: 'stem', w: 60, h: 44 }), /body width/, 'body < 48');
  throws(() => WB.wordBrick({ role: 'word', w: 150, h: 44, text: 'help', fontPx: 16 }), /fontPx 16/, 'fontPx 16');
  throws(() => WB.wordBrick({ role: 'word', w: 100, h: 44, text: 'helpfulness', fontPx: 20 }), /brickEstimate/, 'estimate > body');
  throws(() => WB.wordBrick({ role: 'stem', w: 150, h: 44, stretch: true }), /may stretch/, 'a jointed brick stretched');
  return n;
}

function literals() {
  const out = new Set(LONG);
  let bm = null; try { bm = require('../lib/b5-common.js').bankModule('word-parts'); } catch (e) { /* no bank yet */ }
  const locs = bm ? Object.keys(bm) : [];
  for (const loc of locs) {
    const b = bm[loc];
    for (const f of b.families || []) { out.add(f.root.word); for (const mm of f.members || []) out.add(mm.word); }
    for (const r of (b.prefixKey && b.prefixKey.rows) || []) { out.add(r.base); out.add(r.word); }
    for (const a of b.agents || []) { out.add(a.base); for (const v of Object.values(a.answer || {})) out.add(v); }
  }
  return { words: [...out], locs };
}

async function renderPass({ poison } = {}) {
  const puppeteer = require('puppeteer');
  const FD = path.join(__dirname, '..', 'assets', 'fonts');
  const css = fs.readFileSync(path.join(FD, 'fonts.css'), 'utf8').replace(/url\('([^']+\.woff2)'\)/g, (m, f) => "url('" + require('url').pathToFileURL(path.join(FD, f)).href + "')");
  const browser = await puppeteer.launch({ headless: 'new' });
  const res = { f: [], n: 0 };
  const push = (c, m) => { res.n++; if (!c) res.f.push(m); };
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 2 });
    const load = async (body, name) => {
      const f = path.join(OUT, `G2-359-word-brick-${name}.html`);
      fs.mkdirSync(OUT, { recursive: true });
      fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${css} body{margin:8px;background:#FF00FF}</style></head><body>` +
        `<span style="font:800 20px Nunito">Äx</span><span style="font:700 30px 'Baloo 2'">Äx</span>${body}</body></html>`);
      await page.goto(require('url').pathToFileURL(f).href, { waitUntil: 'networkidle0' });
      await page.evaluate(async () => { await document.fonts.ready; });
      ok(await page.evaluate(() => document.fonts.check("800 20px Nunito") && document.fonts.check("700 30px 'Baloo 2'")), `${name}: fonts not loaded`);
    };
    // (a) box
    if (!poison || poison === 'PW') {
      const items = [];
      for (const role of WB.ROLES) for (const h of HS) for (const w of WS) { try { let s = WB.wordBrick({ role, w, h }); if (poison === 'PW' && role === 'word') s = s.replace(`width="${w}"`, `width="${w + 4}"`); items.push({ role, w, h, s }); } catch (e) { /* throws covered in node */ } }
      await load(items.map((it, i) => `<div id="b${i}" style="display:inline-block;margin:6px">${it.s}</div>`).join(''), 'box');
      const m = await page.evaluate((n) => [...Array(n).keys()].map((i) => { const svg = document.querySelector(`#b${i} svg`), p = svg.querySelector('path'); const r = svg.getBoundingClientRect(), b = p.getBBox(), sw = +p.getAttribute('stroke-width'); return { w: r.width, h: r.height, x0: b.x - sw / 2, y0: b.y - sw / 2, x1: b.x + b.width + sw / 2, y1: b.y + b.height + sw / 2 }; }), items.length);
      items.forEach((it, i) => { const g = m[i]; push(Math.abs(g.w - it.w) <= 1 && Math.abs(g.h - it.h) <= 1 && Math.abs(g.x0) <= 1 && Math.abs(g.y0) <= 1 && Math.abs(g.x1 - it.w) <= 1 && Math.abs(g.y1 - it.h) <= 1, `render ${it.role} ${it.w}x${it.h}: box ${g.w.toFixed(1)}x${g.h.toFixed(1)}, outline ${g.x0.toFixed(1)}..${g.x1.toFixed(1)} x ${g.y0.toFixed(1)}..${g.y1.toFixed(1)}`); });
    }
    // (b) text inside the body
    if (!poison || poison === 'PR1') {
      const { words } = literals();
      const list = poison === 'PR1' ? ['Waldwegwanderung'] : words;
      const items = [];
      for (const wd of list) for (const role of ['word', 'stem', 'prefix']) for (const px of [20, 18]) {
        if (poison === 'PR1' && (role !== 'word' || px !== 20)) continue;
        items.push({ wd, role, px, s: WB.wordBrick({ role, w: WB.brickWidthFor(role, wd, px), h: 44, text: wd, fontPx: px }) });
      }
      await load(items.map((it, i) => `<div id="t${i}" style="display:inline-block;margin:4px">${it.s}</div>`).join(''), 'text');
      const m = await page.evaluate((n) => [...Array(n).keys()].map((i) => { const svg = document.querySelector(`#t${i} svg`), t = svg.querySelector('[data-lcs-brick-text]'); const r = svg.getBoundingClientRect(), tb = t.getBoundingClientRect(); const [b0, b1] = svg.dataset.lcsBody.split(',').map(Number); return { l: tb.left - r.left - b0, r: r.left + b1 - tb.right, tw: tb.width }; }), items.length);
      items.forEach((it, i) => { const g = m[i]; push(g.l >= 4 - 0.5 && g.r >= 4 - 0.5, `brick text outside body: "${it.wd}" ${it.role} ${it.px}px text ${g.tw.toFixed(1)} px, margins ${g.l.toFixed(1)} / ${g.r.toFixed(1)} (< 4)`); });
      res.textItems = items.length;
    }
    // (c) the joint, rasterised
    if (!poison || poison === 'PR4') {
      for (const h of HS) for (const fillOnly of [false, true]) {
        const pre = WB.wordBrick({ role: 'prefix', w: 90, h, text: 're', fontPx: 20 });
        const st = WB.wordBrick({ role: 'stem', w: 120, h, text: 'play', fontPx: 20 });
        // fillOnly: the outlines hidden — the two FILLS must tile the joint by themselves (a straight tab
        // leaves a 3 px x 8 px wedge that the 2 + 3 px strokes would all but paint over)
        await load(`${fillOnly ? '<style>#j path{stroke:none}</style>' : ''}<div id="j" style="position:absolute;left:40px;top:40px">${WB.brickJoin([pre, st])}</div>`, 'joint-' + h + (fillOnly ? '-fill' : ''));
        const box = await page.evaluate(() => { const s = [...document.querySelectorAll('#j svg')].map((e) => e.getBoundingClientRect()); return { pl: s[0].left, pr: s[0].right, top: s[0].top, bottom: s[0].bottom, sl: s[1].left }; });
        const sharp = require('sharp');
        const DPR = 2;
        const buf = await page.screenshot({ clip: { x: box.pl - 4, y: box.top - 4, width: 90 + 120 + 8, height: h + 8 } });
        const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
        const px = (x, y) => { const i = (Math.round(y * DPR) * info.width + Math.round(x * DPR)) * info.channels; return [data[i], data[i + 1], data[i + 2]]; };
        const isGround = (c) => c[0] > 200 && c[1] < 120 && c[2] > 200;   // magenta, incl. an anti-aliased sliver
        const isTealSoft = (c) => Math.abs(c[0] - 0xDD) < 10 && Math.abs(c[1] - 0xEB) < 10 && Math.abs(c[2] - 0xE8) < 10;
        // local coords: prefix right edge at 4 + 90 (clip offset 4)
        const edge = 4 + 90, notchInner = edge - 1 - 8;   // the prefix outline's inner wall (inset 1)
        let gap = 0, spill = 0;
        for (let y = 4 + 9; y <= 4 + h - 9; y += 0.5) {   // below the R 6 corners (the two rounded corners meet in a V there by design)
          // a GAP is a run of >= 3 ground samples (>= 1 px) along the row: with the outlines hidden,
          // two fills that share an edge exactly leave a 1-sample anti-alias seam (the control
          // shows exactly that at the tip and at the edge) — a seam is not a gap
          let run = 0;
          for (let x = notchInner - 3; x <= edge + 3; x += 0.5) { if (isGround(px(x, y))) { run++; if (run === 3) gap++; } else run = 0; }
          for (let x = notchInner - 6; x <= notchInner - 2.5; x += 0.5) if (isTealSoft(px(x, y))) spill++;
        }
        if (process.env.WB_DEBUG && fillOnly && h === 44) { const rows = []; for (let y = 4 + 9; y <= 4 + h - 9; y += 2) { const r = []; for (let x = notchInner - 3; x <= edge + 3; x += 0.5) r.push(isGround(px(x, y)) ? '#' : '.'); rows.push(y + ' ' + r.join('')); } console.log(rows.join(String.fromCharCode(10))); }
        const tag = `joint h ${h}${fillOnly ? ' (fills only)' : ''}`;
        push(gap === 0, `${tag}: joint gap — ${gap} ground samples inside the dovetail band`);
        if (!fillOnly) push(spill === 0, `${tag}: joint spill — ${spill} stem-fill samples left of the notch`);
      }
    }
    // contact sheets
    if (!poison) {
      const pieces = [];
      for (const [h, w, px] of [[36, 150, 18], [76, 302, 30]]) {
        const row = [
          WB.wordBrick({ role: 'word', w: WB.brickWidthFor('word', 'helpful', Math.min(px, 20)), h, text: 'helpful', fontPx: Math.min(px, 20) }),
          WB.wordBrick({ role: 'stem', w, h, text: 'help', font: 'display', fontPx: px }),
          WB.wordBrick({ role: 'prefix', w: 90, h, text: 're', fontPx: Math.min(px, 20) }),
          WB.brickJoin([WB.wordBrick({ role: 'prefix', w: 80, h, text: 'mis', fontPx: 18 }), WB.wordBrick({ role: 'stem', w: 120, h, text: 'place', fontPx: 18 })]),
          WB.wordBrick({ role: 'socket-word', w, h }), WB.wordBrick({ role: 'socket-stem', w: 150, h }), WB.wordBrick({ role: 'socket-prefix', w: 90, h }),
          WB.brickJoin([WB.wordBrick({ role: 'socket-prefix', w: 90, h }), WB.wordBrick({ role: 'stem', w: 120, h, text: 'read', fontPx: 18 })]),
        ];
        pieces.push(`<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin:10px">${row.map((x) => `<div>${x}</div>`).join('')}</div>`);
      }
      pieces.push(`<div style="margin:10px">${WB.brickSocket({ w: 302, h: 60, glyphH: 28 })}</div>`);
      for (const filter of ['', 'grayscale(1)']) {
        await load(`<div id="sheet" style="background:${tokens.color.cream};width:1100px;filter:${filter}">${pieces.join('')}</div>`, filter ? 'sheet-grey' : 'sheet-colour');
        const el = await page.$('#sheet');
        const png = path.join(OUT, `G2-359-word-brick-${filter ? 'grey' : 'colour'}.png`);
        await el.screenshot({ path: png });
        res.sheets = (res.sheets || []).concat(png);
      }
    }
  } finally { await browser.close(); }
  return res;
}

async function main() {
  const n = nodePass();
  console.log(`node pass: ${n} bricks parsed, ${fails.length} findings`);
  let pass = !fails.length;
  if (!process.argv.includes('--no-render')) {
    const r = await renderPass();
    assertions += r.n;
    r.f.forEach((x) => fails.push(x));
    console.log(`render pass: ${r.n} measurements (${r.textItems} text bricks), ${r.f.length} findings; sheets:\n  ${(r.sheets || []).join('\n  ')}`);
    // poisons
    const log = []; let killed = 0, total = 0;
    const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
    { const save = WB.DOVE.tabTip; WB.DOVE.tabTip = WB.DOVE.base; try { judge('PR4 tip = base (straight tab)', (await renderPass({ poison: 'PR4' })).f, /joint gap/); } finally { WB.DOVE.tabTip = save; } }
    { const save = WB.COEFF.value; WB.COEFF.value = 0.52; try { judge('PR1 brickEstimate 0.52 on Waldwegwanderung', (await renderPass({ poison: 'PR1' })).f, /brick text outside body/); } finally { WB.COEFF.value = save; } }
    judge('PW svg 4 px wider than its outline', (await renderPass({ poison: 'PW' })).f, /render word .*box/);
    { const save = WB.COEFF.value; WB.COEFF.value = 0.52; let silent = 0; try { const w = WB.brickWidthFor('word', 'Sonnenuntergang', 20); silent = w; } finally { WB.COEFF.value = save; } log.push(`  (measured) 0.52 on Sonnenuntergang builds a ${silent} px brick — the 169.6 px text keeps 5.2 px a side: the design's PR1 literal is SILENT, so PR1 uses Waldwegwanderung (198.8 px, 12.4 px/glyph)`); }
    console.log('poison:\n' + log.join('\n'));
    pass = !fails.length && killed === total;
    if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 30).join('\n  '));
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  } else console.log(pass ? `PASS node-only (${assertions} assertions)` : `FAIL (${fails.length} findings)\n  ` + fails.slice(0, 30).join('\n  '));
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, nodePass };
