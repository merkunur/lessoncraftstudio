#!/usr/bin/env node
/**
 * pt-silhouettes.js — data/pt/silhouettes.json: each simple traced drawing's silhouette (its body mask from the trace
 * store) fitted to a 32 × 32 square, as 256 hex digits — what "Which Pictures Are Hiding?" (K-509) compares so two
 * pictures of a page never share an outline. Precomputed so a maker page fetches only the traces it draws.
 *   node tools/pt-silhouettes.js [--check]
 */
'use strict';
const fs = require('fs'), path = require('path');
const T = require('../types/k/K-509-which-pictures-are-hiding.js');
const OUT = path.join(__dirname, '..', 'data', 'pt', 'silhouettes.json');
const out = {};
for (const list of T._groups().values()) for (const src of list) {
  let m; try { m = T._measure(src); } catch (e) { continue; }
  let h = ''; for (let k = 0; k < 1024; k += 4) h += ((m[k] << 3) | (m[k + 1] << 2) | (m[k + 2] << 1) | m[k + 3]).toString(16);
  out[src] = h;
}
const text = JSON.stringify(out) + '\n';
if (process.argv.includes('--check')) { if ((fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '') !== text) { console.error('silhouettes.json is STALE'); process.exit(1); } console.log('silhouettes: current'); }
else { fs.writeFileSync(OUT, text); console.log(Object.keys(out).length + ' silhouettes, ' + Math.round(text.length / 1024) + ' KB'); }
