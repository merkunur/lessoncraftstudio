#!/usr/bin/env node
/**
 * flagship/cbn-screen.js: does the Color by Number SCREEN end fully coloured? (operator 2026-11-08: "when the user played
 * interactive worksheets there were some uncolored spots".) For every picture of a template's pool it builds the real
 * screen the maker serves (runtime.screenFor, the declared tap-paint screen), colours every part with its right crayon by
 * real clicks, photographs the picture, and compares it with the answer key drawn at the same size: an area that is
 * paper-white on the finished screen but coloured in the key is a spot the child can never colour. Writes a marked image
 * per failing picture and a summary.
 *   node scripts/makers/flagship/cbn-screen.js --t=K-394 [--level=1] [--from=0 --n=50 | --keys=a,b] [--poison]
 * --poison drops one region from the finished screen and must be caught.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const P = require('../gates/lib/maker-pages.js');
const sharp = require(path.join(P.REPO, 'node_modules', 'sharp'));
const runtime = require('../runtime.js');
const { handler } = require('../serve.js');
const WG = path.join(P.REPO, 'scripts', 'worksheet-gen');
const { runtimeStrings } = require(path.join(WG, 'emit', 'interactive-runtime.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
const { build, isLib } = require(path.join(WG, 'data', 'cbn', 'designs.js'));
const R = require(path.join(WG, 'lib', 'cbn-render.js'));

const a = P.args();
const tid = a.t || 'K-394';
const POISON = !!a.poison;
const MIN_AREA = 14;     // picture units²: smaller white specks are anti-aliasing along the ink
const { tj } = P.builtMakers('color-by-number')[0];
const t = (Array.isArray(tj.templates) ? tj.templates : tj).find((x) => x.id === tid);
const type = P.loadType(t);
const OUT = path.join(P.REPO, 'out', 'flagship-check', 'cbn-screen', tid);
fs.mkdirSync(OUT, { recursive: true });

function jobs() {
  if (a.keys) return String(a.keys).split(',').map((k) => ({ key: k, level: Number(a.level || 1) }));
  const pools = JSON.parse(fs.readFileSync(path.join(P.REPO, 'out', 'flagship-check', 'pools.json'), 'utf8'))['color-by-number'][tid];
  const out = [];
  for (const lv of a.level ? [Number(a.level)] : Object.keys(pools).map(Number)) {
    const pool = pools[lv].pool;
    const from = Number(a.from || 0), n = a.n ? Number(a.n) : pool.length;
    for (const k of pool.slice(from, from + n)) out.push({ key: k, level: lv });
  }
  return out;
}

/** white components not touching the image border, as [{ area, cx, cy, pixels }] (a = RGB raw, w × h) */
function whiteAreas(buf, w, h, ch) {
  const white = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) if (buf[i * ch] >= 240 && buf[i * ch + 1] >= 240 && buf[i * ch + 2] >= 240) white[i] = 1;
  const seen = new Uint8Array(w * h), q = new Int32Array(w * h), out = [];
  for (let s = 0; s < w * h; s++) {
    if (!white[s] || seen[s]) continue;
    let hd = 0, tl = 0, edge = false; q[tl++] = s; seen[s] = 1;
    while (hd < tl) { const i = q[hd++]; const x = i % w, y = (i / w) | 0; if (x === 0 || y === 0 || x === w - 1 || y === h - 1) edge = true; for (const n of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (n >= 0 && white[n] && !seen[n]) { seen[n] = 1; q[tl++] = n; } }
    if (edge) continue;
    out.push({ n: tl, pixels: q.slice(0, tl) });
  }
  return out;
}

(async () => {
  const server = http.createServer(handler).listen(0);
  const base = 'http://127.0.0.1:' + server.address().port;
  const m = await new P.Mounter({ base }).open();
  const page = m.page;
  const mount = async (html) => m.mount(html, 768);
  const list = jobs();
  const summary = [];
  let bad = 0, done = 0;
  for (const { key, level } of list) {
    const s = withLevelInstruction(resolveStrings(t.id, 'en', type), t.id, level, 'en');
    const o = { type, strings: s, locale: 'en', difficulty: level, theme: null, unit: null, variant: 1, tpl: t, runtimeStrings: runtimeStrings('en'), overrides: { art: [key] } };
    let html, design;
    try {
      const made = runtime.makePage({ ...o, declared: true, screenInstruction: t.screenInstructions.en[level] });
      design = made.meta && made.meta.design;
      html = (await runtime.screenFor(o, mount)).html;
    } catch (e) { summary.push(`${key}\tL${level}\tBUILD ${e.message.slice(0, 160)}`); bad++; continue; }
    await page.setViewport({ width: 768, height: 1100, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; });
    // colour every part with its right crayon (the type's oracle, from the design, never the page)
    const B = await page.evaluate(() => window.DECK_BUNDLE);
    const right = type.interactive.oracle(B.items.map((it) => ({ meta: it.meta })), 'en', B.ctx || {});
    const cols = B.ctx.paint.crayons.map((c) => c.colour);
    for (let i = 0; i < right.length; i++) {
      await page.evaluate(({ k, r }) => { document.querySelectorAll('.lcs-crayon')[k].click(); document.querySelector('.lcs-paint-art path[data-lcs-region="' + r + '"]').dispatchEvent(new MouseEvent('click', { bubbles: true })); }, { k: cols.indexOf(right[i]), r: B.items[i].meta['data-lcs-region'] });
    }
    if (POISON && done === 0) await page.evaluate(() => { const p = [...document.querySelectorAll('.lcs-paint-art path[data-lcs-region]')].sort((x, y) => y.getBBox().width * y.getBBox().height - x.getBBox().width * x.getBBox().height)[1]; if (p) p.style.fill = '#ffffff'; });
    const el = await page.$('.lcs-paint-art svg') || await page.$('.lcs-paint-art');
    const shot = await el.screenshot();
    const meta = await sharp(shot).metadata();
    const W = meta.width, H = meta.height;
    const scr = await sharp(shot).flatten({ background: '#ffffff' }).raw().toBuffer();
    // the answer key's picture at the same size: what the child should end with
    const d = isLib(design) ? { id: design, kind: 'picture' } : { id: design };
    const art = build(d);
    const keyRaw = await sharp(Buffer.from(R.toSvg(art, { mode: 'colour', width: W, height: H }))).flatten({ background: '#ffffff' }).resize(W, H, { fit: 'fill' }).raw().toBuffer();
    const scale = (W / art.w) * (H / art.h);
    const flags = [];
    for (const ar of whiteAreas(scr, W, H, 3)) {
      if (ar.n / scale < MIN_AREA) continue;
      // coloured in the key? count the area's pixels that the key paints (not white, not ink)
      let painted = 0;
      for (const i of ar.pixels) { const r = keyRaw[i * 3], g = keyRaw[i * 3 + 1], b = keyRaw[i * 3 + 2]; if (!(r >= 235 && g >= 235 && b >= 235) && !(r < 90 && g < 90 && b < 90)) painted++; }
      if (painted / ar.n < 0.5) continue;
      let sx = 0, sy = 0; for (const i of ar.pixels) { sx += i % W; sy += (i / W) | 0; }
      flags.push({ area: Math.round(ar.n / scale), x: Math.round(sx / ar.n), y: Math.round(sy / ar.n), r: Math.max(14, Math.sqrt(ar.n) / 1.5) });
    }
    done++;
    if (flags.length) {
      bad++;
      summary.push(`${key}\tL${level}\t${design}\t${flags.length} spot(s)\t${flags.map((f) => f.area + 'u2').join(' ')}`);
      const marks = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` + flags.map((f) => `<circle cx="${f.x}" cy="${f.y}" r="${f.r}" fill="none" stroke="#E00" stroke-width="5"/>`).join('') + '</svg>';
      await sharp(scr, { raw: { width: W, height: H, channels: 3 } }).composite([{ input: Buffer.from(marks) }]).png().toFile(path.join(OUT, `L${level}-${design}.png`));
    }
    if (done % 50 === 0) console.log(`  ${done} / ${list.length}, ${bad} with spots`);
    if (POISON) break;
  }
  fs.writeFileSync(path.join(OUT, '_summary.tsv'), summary.join('\n') + '\n');
  console.log(`${tid}: ${done} screens finished, ${bad} with white spots or build errors → ${OUT}`);
  await m.close(); server.close();
  process.exit(POISON ? (bad ? 0 : 1) : 0);
})();
