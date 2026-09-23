#!/usr/bin/env node
/**
 * verify-b6-story-panel.js — the gate of primitives/story-panel.js (design
 * docs/worksheet-gen/b6-designs/K-379-story-sequencing.md §5 "qa/verify-b6-
 * story-panel.js"; the verify-body-figure / verify-life-stage pattern). Every
 * assertion is made on the EMITTED markup (parsed back out of the svg string)
 * or on the RENDER (Chromium over file://), never on the primitive's own
 * tables: the declared irr vector of the BANK is the one independent source,
 * and the counts come from the drawing.
 *
 *   node scripts/worksheet-gen/qa/verify-b6-story-panel.js [--no-render] [--no-sheet]
 *
 * NODE (every story x rank at w 100 / 144 / 240):
 *   (a) the [data-lcs-set] layer is BYTE-IDENTICAL across a story's panels
 *   (b) per variable, the count of data-irr="<v>" inside the prop layer === the bank's
 *       irr[v] - occluded[v] for the rank the svg STAMPS (so swapped stamps fail: PR10)
 *   (e) no <text>, no coral / codeYellow inside [data-lcs-set]; only palette hexes
 *   (d) strokes: set strokes 1.5 px, the frame 2 px, every prop panel carries a teal
 *       outline >= 2.5 px; prop strokes in {1.5, 2, 2.5, 3, 3.5, 4, 5.5} px (bite masks excluded)
 *   (g) w < 100 THROWS
 * RENDER (puppeteer, file://):
 *   (c) every [data-irr] element's rendered bbox, smaller side >= 5 px at w 100
 *   (f) greyscale (Rec. 601 luma, computed per pixel from the canvas raster): each
 *       consecutive SHIPPED pair (the full story, sub4, sub3, n5) differs in >= 1 % (calibrated, see MIN_FRAC) of
 *       the panel's pixels by >= 48 luma, and every such pixel lies inside the union of
 *       the two panels' prop bboxes (+ 4 units): the stage never changes
 * POISON (each must FAIL for its own reason; the real primitive is the control):
 *   PR4  a panel whose [data-irr="bite"] count differs from irr (one bite group dropped)
 *   PR5  two consecutive panels with identical props (greyscale diff 0)
 *   PR5b one 3 x 3 ink dot added (0.05 %: under the calibrated 1 % floor)
 *   PR10 two panels' data-lcs-rank stamps swapped, the art unchanged
 *   PE1  a coral fill inside the set layer         PE2 a <text> inside a panel
 *   PG   w = 99
 * SHEETS: out/dev/K-379-story-panels-{colour,grey}-w{100,240}.png (every story, every panel).
 */
'use strict';
const path = require('path');
const fs = require('fs');
const url = require('url');
const tokens = require('../primitives/_tokens.js');
const SP = require('../primitives/story-panel.js');
const { COMMON } = require('../data/b6/story-sequencing.js');

const OUT = path.join(__dirname, '..', 'out', 'dev');
const WIDTHS = [100, 144, 240];
const PALETTE = new Set([...Object.values(tokens.color), ...Object.values(tokens.codeColors)].map((c) => c.toUpperCase()));
const HOT = [tokens.color.coral, tokens.codeColors.codeYellow].map((c) => c.toUpperCase());
/**
 * (f) threshold, CALIBRATED by poisoning as §5 asks ("an identical pair must FAIL, every shipped pair
 * PASS"): the design's starting value 2 % failed four CORRECT pairs (measured 2026-09-23 at 144 px: apple
 * 1->2 one bite 1.46 %, sandwich 3->4 the first bite 1.44 %, hopscotch 2->3 1.60 % and 3->4 1.04 % = ONE
 * new chalk square, each a whole pointable change). The floor is 1.0 %: PR5 (identical, 0 %) and PR5b
 * (one 3 x 3 dot added, a change nobody can point at) both FAIL; the smallest shipped pair clears it.
 */
const MIN_FRAC = 0.01;
const PROP_PX = [1.5, 2, 2.5, 3, 3.5, 4, 5.5];

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/* ---------------------------------------------------------------- markup parsing */
function layer(svg, attr) {
  const i = svg.indexOf(`<g ${attr}`);
  if (i < 0) return null;
  // walk balanced <g> … </g>
  const re = /<(\/?)g[\s>]/g; re.lastIndex = i; let depth = 0, m;
  while ((m = re.exec(svg))) { if (m[1]) { depth--; if (depth === 0) return svg.slice(i, re.lastIndex + 1); } else depth++; }
  return null;
}
const attrOf = (svg, name) => { const m = new RegExp(`\\s${name}="([^"]*)"`).exec(svg); return m ? m[1] : null; };
function countIrr(propSvg) { const c = {}; for (const m of propSvg.matchAll(/data-irr="([A-Za-z]+)"/g)) c[m[1]] = (c[m[1]] || 0) + 1; return c; }
function storyOf(id) { return COMMON.stories.find((s) => s.id === id); }

/** All node findings for one emitted panel svg (w = its width). */
function checkPanel(svg, w, storyObj) {
  const f = [];
  const rank = +attrOf(svg, 'data-lcs-rank');
  const s = storyObj || storyOf(attrOf(svg, 'data-lcs-story'));
  const tag = `${s ? s.id : '?'}#${rank}@${w}`;
  if (!s) return [`${tag}: unknown story`];
  const p = s.panels.find((x) => x.rank === rank);
  if (!p) return [`${tag}: stamped rank not in the story`];
  const set = layer(svg, 'data-lcs-set'), prop = layer(svg, 'data-lcs-prop');
  if (!set || !prop) return [`${tag}: missing a layer`];
  // (b) counts from the drawing vs the bank's declared vector for the STAMPED rank
  const drawn = countIrr(prop);
  for (const v of Object.keys(p.irr)) {
    const want = p.irr[v] - ((p.occluded || {})[v] || 0);
    if ((drawn[v] || 0) !== want) f.push(`${tag}: drawn ${v} ${drawn[v] || 0} ≠ irr ${p.irr[v]} - occluded ${(p.occluded || {})[v] || 0}`);
  }
  for (const v of Object.keys(drawn)) if (!(v in p.irr)) f.push(`${tag}: drawn undeclared variable ${v}`);
  // (e)
  if (/<text[\s>]/.test(svg)) f.push(`${tag}: a <text> element`);
  for (const m of set.matchAll(/(?:fill|stroke)="(#[0-9A-Fa-f]{6})"/g)) if (HOT.includes(m[1].toUpperCase())) f.push(`${tag}: ${m[1]} inside the set layer`);
  for (const m of svg.matchAll(/(?:fill|stroke)="(#[0-9A-Fa-f]{6})"/g)) if (!PALETTE.has(m[1].toUpperCase())) f.push(`${tag}: off-palette ${m[1]}`);
  // (d) stroke px = attr * w / 160
  const px = (u) => Math.round(u * w / SP.VIEW_W * 100) / 100;
  for (const m of set.matchAll(/stroke-width="([\d.]+)"/g)) if (Math.abs(px(+m[1]) - 1.5) > 0.02) f.push(`${tag}: a set stroke of ${px(+m[1])} px (1.5 only)`);
  const frame = /<rect[^>]*data-lcs-frame="1"[^>]*>/.exec(svg);
  if (!frame || Math.abs(px(+attrOf(frame[0], 'stroke-width')) - 2) > 0.02) f.push(`${tag}: the frame is not 2 px`);
  const propStrokes = [...prop.replace(/<mask[\s\S]*?<\/mask>/g, '').matchAll(/stroke="(#[0-9A-Fa-f]{6})"[^>]*?stroke-width="([\d.]+)"/g)].map((m) => ({ c: m[1].toUpperCase(), px: px(+m[2]) }));
  for (const st of propStrokes) if (!PROP_PX.some((q) => Math.abs(q - st.px) < 0.03)) f.push(`${tag}: a prop stroke of ${st.px} px`);
  const hasWalkerOnly = /data-lcs-pictogram="walker"/.test(prop) && !propStrokes.some((x) => x.c === tokens.color.teal.toUpperCase() && x.px >= 2.5);
  if (!propStrokes.some((x) => x.c === tokens.color.teal.toUpperCase() && x.px >= 2.5) && !hasWalkerOnly) f.push(`${tag}: no teal outline >= 2.5 px in the prop`);
  return f;
}

/* ---------------------------------------------------------------- the shipped pairs */
function shippedPairs(s) {
  const lists = [s.panels.map((p) => p.rank), s.sub4, s.sub3, s.n5].filter(Array.isArray);
  const set = new Set();
  for (const L of lists) for (let i = 1; i < L.length; i++) set.add(L[i - 1] + '-' + L[i]);
  return [...set].map((k) => k.split('-').map(Number));
}
function propBox(s, rank) {
  const p = s.panels.find((x) => x.rank === rank);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const op of p.prop) { const b = SP.opBBox(op); x0 = Math.min(x0, b.x0); y0 = Math.min(y0, b.y0); x1 = Math.max(x1, b.x1); y1 = Math.max(y1, b.y1); }
  return { x0, y0, x1, y1 };
}

/* ---------------------------------------------------------------- render */
async function renderMeasure(page, items) {
  // items: [{key, svg, w}] -> {key: {irrMin: [{v, min}], raster: luma array (w x h)}}
  const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${url.pathToFileURL(path.join(__dirname, '..', 'assets', 'fonts', 'fonts.css')).href}"></head>` +
    `<body style="margin:0;background:${tokens.color.cream}">${items.map((x) => `<div data-key="${x.key}" style="display:inline-block;margin:4px">${x.svg}</div>`).join('')}</body></html>`;
  fs.mkdirSync(OUT, { recursive: true });
  const f = path.join(OUT, 'K-379-story-panel-measure.html');
  fs.writeFileSync(f, html);
  await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
  return page.evaluate(async () => {
    const res = {};
    for (const box of document.querySelectorAll('[data-key]')) {
      const svg = box.querySelector('svg');
      const irr = [...svg.querySelectorAll('[data-irr]')].map((e) => { const r = e.getBoundingClientRect(); return { v: e.getAttribute('data-irr'), min: Math.min(r.width, r.height) }; });
      // raster the standalone svg at its own size and take Rec. 601 luma per pixel
      const w = +svg.getAttribute('width'), h = +svg.getAttribute('height');
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.outerHTML);
      await img.decode();
      const c = document.createElement('canvas'); c.width = Math.round(w); c.height = Math.round(h);
      const ctx = c.getContext('2d'); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height);
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      const luma = new Array(c.width * c.height);
      for (let i = 0; i < luma.length; i++) luma[i] = Math.round(0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]);
      res[box.dataset.key] = { irr, luma, W: c.width, H: c.height };
    }
    return res;
  });
}
/** (f) on one pair: returns a finding or null. */
function greyPair(s, a, b, A, B, w) {
  if (!A || !B || A.luma.length !== B.luma.length) return `${s.id} ${a}->${b}: raster missing`;
  const W = A.W, H = A.H, sc = W / SP.VIEW_W;
  const ba = propBox(s, a), bb = propBox(s, b), pad = 4;
  const x0 = (Math.min(ba.x0, bb.x0) - pad) * sc, y0 = (Math.min(ba.y0, bb.y0) - pad) * sc, x1 = (Math.max(ba.x1, bb.x1) + pad) * sc, y1 = (Math.max(ba.y1, bb.y1) + pad) * sc;
  let diff = 0, outside = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (Math.abs(A.luma[i] - B.luma[i]) >= 48) { diff++; if (x < x0 || x > x1 || y < y0 || y > y1) outside++; }
  }
  const frac = diff / (W * H);
  if (frac < MIN_FRAC) return `${s.id} ${a}->${b}@${w}: only ${(frac * 100).toFixed(2)} % of pixels differ by >= 48 luma (< ${MIN_FRAC * 100} %)`;
  if (outside > 0) return `${s.id} ${a}->${b}@${w}: ${outside} changed pixels outside the prop bboxes (the stage changed)`;
  return null;
}

function sheetHtml(w, grey) {
  const rows = COMMON.stories.map((s) => `<div style="display:flex;align-items:center;gap:10px;margin:6px 0"><div style="width:96px;font:700 13px 'Nunito';color:${tokens.color.ink}">${s.id}</div>` +
    s.panels.map((p) => SP.storyPanel({ story: s.id, rank: p.rank, w }).svg).join('') + '</div>');
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${url.pathToFileURL(path.join(__dirname, '..', 'assets', 'fonts', 'fonts.css')).href}"></head>` +
    `<body style="margin:0;background:${tokens.color.cream};${grey ? 'filter:grayscale(1);' : ''}"><div id="sheet" style="padding:12px;width:max-content">${rows.join('')}</div></body></html>`;
}

async function main() {
  const noRender = process.argv.includes('--no-render');
  const noSheet = process.argv.includes('--no-sheet');
  // NODE
  for (const s of COMMON.stories) {
    for (const w of WIDTHS) {
      const sets = new Set();
      for (const p of s.panels) {
        const r = SP.storyPanel({ story: s.id, rank: p.rank, w });
        ok(r.width === w && Math.abs(r.height - w * 0.75) < 1e-9, `${s.id}#${p.rank}@${w}: width/height`);
        checkPanel(r.svg, w).forEach((x) => ok(false, x));
        sets.add(layer(r.svg, 'data-lcs-set'));
        ok(r.meta.carrierMinPx === null || r.meta.carrierMinPx >= 5 * w / 100 - 1e-9, `${s.id}#${p.rank}@${w}: carrierMinPx ${r.meta.carrierMinPx}`);
      }
      ok(sets.size === 1, `${s.id}@${w}: the set layer differs between panels (${sets.size} variants)`);
    }
  }
  // the ZOOMED page cards (lead review 2026-09-23): the base d1 / d2 / d3 geometry, frame:false as the page draws them
  for (const [w, vh] of [[200, 150], [153, 198], [120, 208]]) for (const st of COMMON.stories) {
    const sets = new Set(); let win = null;
    for (const p of st.panels) {
      const r = SP.storyPanel({ story: st.id, rank: p.rank, w, vh, frame: false });
      const lay = layer(r.svg, 'data-lcs-prop');
      const drawn = countIrr(lay);
      for (const v of Object.keys(p.irr)) ok((drawn[v] || 0) === p.irr[v] - ((p.occluded || {})[v] || 0), `${st.id}#${p.rank}@${w}x${vh}: drawn ${v} ${drawn[v] || 0}`);
      sets.add(layer(r.svg, 'data-lcs-set'));
      ok(r.meta.carrierMinPx === null || r.meta.carrierMinPx >= 5, `${st.id}#${p.rank}@${w}x${vh}: carrier ${r.meta.carrierMinPx}`);
      win = win || JSON.stringify(r.window); ok(JSON.stringify(r.window) === win, `${st.id}@${w}x${vh}: the window moves between panels`);
    }
    ok(sets.size === 1, `${st.id}@${w}x${vh}: the zoomed set layer differs between panels`);
  }
  { let t = null; try { SP.storyPanel({ story: 'apple', rank: 1, w: 99 }); } catch (e) { t = e.message; } ok(t && /MIN_W/.test(t), 'w 99 must throw (MIN_W 100)'); }
  console.log(`node: ${COMMON.stories.length} stories x ${WIDTHS.join('/')} checked`);

  // POISONS (markup doctored as the design names them)
  const plog = []; let killed = 0;
  const judge = (name, f, re) => { const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  const svgOf = (id, rank, w = 144) => SP.storyPanel({ story: id, rank, w }).svg;
  {
    // PR4: drop one bite group from apple #3
    const good = svgOf('apple', 3);
    const bad = good.replace(/<g data-irr="bite">(?:(?!<g data-irr=).)*?<\/g><\/g>/s, '');
    judge('PR4 a bite count that differs from irr', bad === good ? ['POISON DID NOT APPLY'] : checkPanel(bad, 144), /drawn bite 2 ≠ irr 3/);
  }
  {
    // PR10: swap the rank stamps of apple #2 and #3 (art unchanged)
    const s2 = svgOf('apple', 2).replace(/data-lcs-rank="2"/g, 'data-lcs-rank="3"');
    const s3 = svgOf('apple', 3).replace(/data-lcs-rank="3"/g, 'data-lcs-rank="2"');
    judge('PR10 swapped rank stamps', [...checkPanel(s2, 144), ...checkPanel(s3, 144)], /drawn bite \d ≠ irr/);
  }
  {
    const bad = svgOf('fence', 2).replace('<g data-lcs-set="1">', `<g data-lcs-set="1"><rect x="0" y="0" width="10" height="10" fill="${tokens.color.coral}"/>`);
    judge('PE1 coral inside the set', checkPanel(bad, 144), /inside the set layer/);
    const bad2 = svgOf('fence', 2).replace('<g data-lcs-prop="1"', '<text x="4" y="10">1</text><g data-lcs-prop="1"');
    judge('PE2 a <text> in a panel', checkPanel(bad2, 144), /<text>/);
  }
  { let t = null; try { SP.storyPanel({ story: 'fence', rank: 1, w: 99 }); } catch (e) { t = e.message; } judge('PG w 99', t ? [t] : [], /MIN_W/); }

  if (!noRender) {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
    try {
      // (c) at 100 + (f) at 144
      const items = [];
      for (const s of COMMON.stories) for (const p of s.panels) {
        items.push({ key: `${s.id}#${p.rank}@100`, svg: svgOf(s.id, p.rank, 100) });
        items.push({ key: `${s.id}#${p.rank}@144`, svg: svgOf(s.id, p.rank, 144) });
      }
      const m = await renderMeasure(page, items);
      let minC = Infinity, minFrac = Infinity;
      for (const s of COMMON.stories) {
        for (const p of s.panels) {
          const r = m[`${s.id}#${p.rank}@100`];
          for (const e of r.irr) { minC = Math.min(minC, e.min); ok(e.min >= 5, `${s.id}#${p.rank}@100: a ${e.v} carrier renders ${e.min.toFixed(2)} px (< 5)`); }
        }
        for (const [a, b] of shippedPairs(s)) {
          const finding = greyPair(s, a, b, m[`${s.id}#${a}@144`], m[`${s.id}#${b}@144`], 144);
          ok(!finding, finding);
          const A = m[`${s.id}#${a}@144`], B = m[`${s.id}#${b}@144`];
          let diff = 0; for (let i = 0; i < A.luma.length; i++) if (Math.abs(A.luma[i] - B.luma[i]) >= 48) diff++;
          minFrac = Math.min(minFrac, diff / A.luma.length);
        }
      }
      console.log(`render: smallest carrier at w 100 = ${minC.toFixed(2)} px; smallest shipped-pair greyscale change at 144 = ${(minFrac * 100).toFixed(2)} % of the panel`);
      // PR5: identical props on two consecutive panels
      {
        const s = JSON.parse(JSON.stringify(COMMON.stories.find((x) => x.id === 'fence')));
        s.panels[1].prop = s.panels[0].prop;
        const mm = await renderMeasure(page, [{ key: 'a', svg: SP.storyPanel({ story: s, rank: 1, w: 144 }).svg }, { key: 'b', svg: SP.storyPanel({ story: s, rank: 2, w: 144 }).svg }]);
        const finding = greyPair(s, 1, 2, mm.a, mm.b, 144);
        judge('PR5 identical props (greyscale diff 0)', finding ? [finding] : [], /differ by >= 48 luma/);
        const t = JSON.parse(JSON.stringify(COMMON.stories.find((x) => x.id === 'fence')));
        t.panels[1].prop = [...t.panels[0].prop, { k: 'rect', x: 150, y: 40, w: 3, h: 3, fill: 'ink' }];
        const m2 = await renderMeasure(page, [{ key: 'a', svg: SP.storyPanel({ story: t, rank: 1, w: 144 }).svg }, { key: 'b', svg: SP.storyPanel({ story: t, rank: 2, w: 144 }).svg }]);
        const f2 = greyPair(t, 1, 2, m2.a, m2.b, 144);
        judge('PR5b a change nobody can point at (one 3 x 3 dot)', f2 ? [f2] : [], /differ by >= 48 luma/);
      }
      if (!noSheet) {
        for (const w of [100, 240]) for (const grey of [false, true]) {
          const f = path.join(OUT, `K-379-story-panels-${grey ? 'grey' : 'colour'}-w${w}.html`);
          fs.writeFileSync(f, sheetHtml(w, grey));
          await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: w === 100 ? 2 : 1 });
          await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
          await page.evaluate(() => document.fonts.ready);
          const el = await page.$('#sheet');
          await el.screenshot({ path: f.replace(/\.html$/, '.png') });
          console.log('sheet: ' + f.replace(/\.html$/, '.png'));
        }
      }
    } finally { await browser.close(); }
  }
  console.log('poison:\n' + plog.join('\n'));
  const total = noRender ? 5 : 7;
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, checkPanel, shippedPairs, layer, countIrr };
