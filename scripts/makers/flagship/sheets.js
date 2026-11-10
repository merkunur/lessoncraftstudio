#!/usr/bin/env node
/**
 * flagship/sheets.js: contact sheets of every picture a flagship template can show, for a person to read (operator
 * 2026-11-08: "a very serious and thorough visual check for every single image in every single template"). For each picture
 * of the template's pool at a level it builds the page the maker builds (or its answer key) and photographs the worksheet
 * body; 20 pictures per sheet, each labelled with its picture key, written to out/flagship-check/sheets/<template>-L<n>-<kind>-<k>.png.
 *   node scripts/makers/flagship/sheets.js --maker=dot-to-dot --t=K-285 --level=2 [--kind=key|page] [--from=0 --n=200] [--cell=360]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const P = require('../gates/lib/maker-pages.js');
const sharp = require(path.join(P.REPO, 'node_modules', 'sharp'));
const { handler } = require('../serve.js');

const a = P.args();
const maker = a.maker, tid = a.t, level = Number(a.level || 2), kind = a.kind || 'key', CELL = Number(a.cell || 360), PER = Number(a.per || 20);
const { tj } = P.builtMakers(maker)[0];
const t = (Array.isArray(tj.templates) ? tj.templates : tj).find((x) => x.id === tid);
if (!t) throw new Error('no template ' + tid);
const type = P.loadType(t);
const pools = JSON.parse(fs.readFileSync(path.join(P.REPO, 'out', 'flagship-check', 'pools.json'), 'utf8'));
// --copies=N (a template with its own content: letters, numbers, scenes): copies 1..N built as the maker's New version does,
// no picture pick; --locale=xx (default en)
const COPIESN = Number(a.copies || 0), LOC = a.locale || 'en';
// --units: every unit the template offers in the language at the level (a letter, a number), copy 1 each
const UNITS = a.units ? ((a.only ? String(a.only).split(',') : null) || ((t.units && t.units[LOC]) || []).filter((u) => (!t.unitLevels || t.unitLevels[u.id] === level || t.unitLevels[u.id] == null)).map((u) => u.id)).map((x) => 'unit ' + x) : null;
const pool = UNITS || (COPIESN ? Array.from({ length: COPIESN }, (_, i) => 'copy ' + (i + 1)) : pools[maker][tid][level].pool);
// --library: only the pictures of the image library (not the new drawings, which are read after they are installed)
const IDX = JSON.parse(fs.readFileSync(path.join(P.REPO, 'scripts', 'worksheet-gen', 'data', 'fl', 'index.json'), 'utf8')).pictures;
const base = a.library ? pool.filter((k) => !(IDX[k] && IDX[k].n === 1)) : pool;
// --keys=<file>: exactly these pictures (one key per line), in that order
// a listed picture the template's picker does not offer at the level would build the maker's fallback page under the
// picture's label (2026-11-09: "safari friends bw/cheetah" printed a food truck): it is left out and named
const listedAll = a.keys ? fs.readFileSync(a.keys, 'utf8').split(String.fromCharCode(10)).map((x) => x.trim()).filter(Boolean) : null;
const inPool = new Set(pool);
const listed = listedAll ? listedAll.filter((k) => UNITS || COPIESN || inPool.has(k)) : null;
if (listedAll && listed.length < listedAll.length) console.log(`not offered by ${tid} at level ${level} (left out): ${listedAll.filter((k) => !listed.includes(k)).join(', ')}`);
const from = Number(a.from || 0), keys = (listed || base).slice(from, a.n ? from + Number(a.n) : (listed || base).length);
const OUT = path.join(P.REPO, 'out', 'flagship-check', 'sheets');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const server = http.createServer(handler).listen(0);
  const m = await new P.Mounter({ base: 'http://127.0.0.1:' + server.address().port }).open();
  const cells = [];
  let sheet = Math.floor(from / PER), errors = 0;
  const flush = async () => {
    if (!cells.length) return;
    const cols = Number(a.cols || 5), ch = CELL + 18, rows = Math.ceil(cells.length / cols);
    const comp = [];
    cells.forEach((c, i) => {
      const x = (i % cols) * CELL, y = Math.floor(i / cols) * ch;
      comp.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${CELL}" height="18"><rect width="${CELL}" height="18" fill="#eee"/><text x="3" y="13" font-size="12" font-family="Arial">${String(c.key).replace(/&/g, '&amp;').slice(0, 52)}</text></svg>`), left: x, top: y });
      comp.push({ input: c.img, left: x, top: y + 18 });
    });
    const f = path.join(OUT, `${tid}-L${level}-${kind}-${String(sheet).padStart(3, '0')}.png`);
    await sharp({ create: { width: cols * CELL, height: rows * ch, channels: 3, background: '#9a9a9a' } }).composite(comp).png().toFile(f);
    console.log('sheet', f);
    sheet++; cells.length = 0;
  };
  for (const key of keys) {
    const o = { difficulty: level, theme: (t.themed && P.themesIn(t, LOC)[0]) || null, unit: UNITS ? String(key).slice(5) : null, variant: COPIESN ? Number(String(key).slice(5)) : 1 };
    let img;
    try {
      const r = P.buildShown(t, type, tj, LOC, o, { answerKey: kind === 'key', ...(COPIESN || UNITS ? {} : { overrides: { art: [key] } }) });
      // Node builds the pictures as file:// links; the frame is on the maker server's origin, where file:// is blocked:
      // point them at the server's own copy (the maker in the browser uses /makers-assets/ itself)
      const html = String(kind === 'key' ? r.keyHtml : r.html).replace(/file:\/\/\/[^"')]*?\/scripts\/worksheet-gen\/cache\/themes-512\//g, '/makers-assets/themes-512/').replace(/file:\/\/\/[^"')]*?\/scripts\/worksheet-gen\/data\/b5\/family-portraits\//g, '/makers-assets/family-portraits/');
      const page = await m.mount(html, 703);
      const el = await page.$('[data-ws-content]') || await page.$('body');
      img = await sharp(await el.screenshot()).resize(CELL, CELL, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
    } catch (e) {
      errors++;
      img = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${CELL}" height="${CELL}"><rect width="100%" height="100%" fill="#fee"/><text x="8" y="30" font-size="13" fill="#b00" font-family="Arial">${String(e.message).replace(/[<&]/g, ' ').slice(0, 60)}</text></svg>`)).png().toBuffer();
    }
    cells.push({ key, img });
    if (cells.length === PER) await flush();
  }
  await flush();
  console.log(`${tid} L${level} ${kind}: ${keys.length} pictures, ${errors} errors, page errors ${m.errors.length}`);
  await m.close(); server.close();
})();
