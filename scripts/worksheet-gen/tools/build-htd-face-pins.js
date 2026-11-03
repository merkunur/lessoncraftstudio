#!/usr/bin/env node
/**
 * build-htd-face-pins.js — data/b7/htd-face-pins.json, the lessons the new How to Draw templates of the maker draw from
 * (makers 2026-11-02; lib/htd-faces.js). For every template × level: every lesson the maker ships (htd-faces pool), in
 * the template's own order, that the template's pinFits(unit, level) accepts. Copy n = the n-th entry, so a maker page
 * never loads lessons to search.
 *   { faces: { <typeId>: { <level>: [ <unit> … ] } } }
 *   node tools/build-htd-face-pins.js [--faces=K-494,K-497] [--check]
 */
'use strict';
const fs = require('fs'), path = require('path');
const H = require('../lib/htd-faces.js');
const { loadType } = require('../lib/load-types.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const OUT = path.join(__dirname, '..', 'data', 'b7', 'htd-face-pins.json');
const FACES = arg('faces', 'K-494,K-496,K-497').split(',');
const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { faces: {} };
const out = { _note: 'tools/build-htd-face-pins.js — the lessons each new How to Draw template accepts, per level (copy n = the n-th)', faces: { ...(old.faces || {}) } };
for (const id of FACES) {
  const type = loadType(id);
  out.faces[id] = {};
  for (const lv of Object.keys(type.difficulty)) {
    const list = (type.pinOrder ? type.pinOrder(+lv) : H.order(id)).filter((u) => { try { return type.pinFits(u, +lv); } catch (e) { return false; } });
    out.faces[id][lv] = list;
    console.log(`${id} L${lv}: ${list.length}`);
    if (list.length < 12) throw new Error(`${id} L${lv}: only ${list.length} lessons (a maker face needs at least 12 copies)`);
  }
}
const text = JSON.stringify(out, null, 1) + '\n';
if (process.argv.includes('--check')) { if ((fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '') !== text) { console.error('htd-face-pins.json is STALE — node tools/build-htd-face-pins.js'); process.exit(1); } console.log('htd-face-pins: current'); }
else { fs.writeFileSync(OUT, text); console.log('wrote', path.relative(process.cwd(), OUT)); }
