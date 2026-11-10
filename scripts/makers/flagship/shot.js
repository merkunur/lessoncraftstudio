#!/usr/bin/env node
/**
 * flagship/shot.js: render chosen pictures in a flagship template the way the maker builds them (print page, answer key,
 * the declared screen) and write one contact sheet, so a person can read them side by side.
 *   node scripts/makers/flagship/shot.js --maker=color-by-number --t=K-394 --level=1 --keys=a,b,c [--out=file.png] [--w=360]
 *   --keys may be omitted with --from=N --n=K: K pictures of the template's pool starting at N (out/flagship-check/pools.json)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const P = require('../gates/lib/maker-pages.js');
const sharp = require(path.join(P.REPO, 'node_modules', 'sharp'));
const { handler } = require('../serve.js');

const a = P.args();
const maker = a.maker, tid = a.t, level = Number(a.level || 2), W = Number(a.w || 360);
const { tj } = P.builtMakers(maker)[0];
const t = (Array.isArray(tj.templates) ? tj.templates : tj).find((x) => x.id === tid);
if (!t) throw new Error('no template ' + tid);
const type = P.loadType(t);
let keys = a.keys ? String(a.keys).split(',') : null;
if (!keys) {
  const pools = JSON.parse(fs.readFileSync(path.join(P.REPO, 'out', 'flagship-check', 'pools.json'), 'utf8'));
  const pool = pools[maker][tid][level].pool;
  keys = pool.slice(Number(a.from || 0), Number(a.from || 0) + Number(a.n || 6));
}
const OUT = a.out || path.join(P.REPO, 'out', 'flagship-check', `${tid}-L${level}.png`);

(async () => {
  const server = http.createServer(handler).listen(0);
  const base = 'http://127.0.0.1:' + server.address().port;
  const m = await new P.Mounter({ base }).open();
  const cells = [];
  for (const key of keys) {
    const o = { difficulty: level, theme: (t.themed && P.themesIn(t, 'en')[0]) || null, unit: null, variant: 1 };
    const shots = [];
    for (const kind of ['page', 'key', 'screen']) {
      let html;
      try {
        if (kind === 'screen') html = P.buildDeclaredScreen(t, type, tj, 'en', { ...o, overrides: { art: [key] } }).html;
        else { const r = P.buildShown(t, type, tj, 'en', o, { answerKey: kind === 'key', overrides: { art: [key] } }); html = kind === 'key' ? r.keyHtml : r.html; }
      } catch (e) { html = `<p style="font:16px sans-serif;color:#b00">${kind}: ${String(e.message).slice(0, 200)}</p>`; }
      if (!html) { shots.push(null); continue; }
      const page = await m.mount(html, 703);
      const buf = await page.screenshot({ fullPage: true });
      shots.push(await sharp(buf).resize({ width: W }).png().toBuffer());
    }
    cells.push({ key, shots });
  }
  // a row per picture: page, key, screen
  const metas = await Promise.all(cells.flatMap((c) => c.shots.filter(Boolean).map((b) => sharp(b).metadata())));
  const rowH = Math.max(...metas.map((x) => x.height)) + 22;
  const sheet = sharp({ create: { width: W * 3 + 40, height: rowH * cells.length, channels: 3, background: '#d8d8d8' } });
  const comp = [];
  cells.forEach((c, r) => {
    c.shots.forEach((b, k) => { if (b) comp.push({ input: b, left: 10 + k * (W + 10), top: r * rowH + 20 }); });
    comp.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W * 3}" height="20"><text x="4" y="15" font-size="14" font-family="Arial">${c.key.replace(/&/g, '&amp;')} (page, key, screen)</text></svg>`), left: 10, top: r * rowH });
  });
  await sheet.composite(comp).png().toFile(OUT);
  console.log('sheet', OUT, 'errors', m.errors.length ? m.errors.slice(0, 3) : 0);
  await m.close(); server.close();
})();
