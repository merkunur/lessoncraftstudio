#!/usr/bin/env node
/**
 * Renumbers the ids in reviewers' files after a framework was re-read (Daily Teaching System, Part 2).
 *
 * Registries whose documents number nothing carry positional ids (document, year, place). When the reader is
 * repaired and finds objectives it had missed, the ids after them move. The reviewers' rows stay right: they are
 * carried over by WORDING.
 *
 *   node scripts/curricula/remap-ids.js <registry> <earlier framework.json> <reviewer file> [<reviewer file> …]
 *
 * old id → new id: the node of the same document, parent's place, year and wording; else the node that kept the id
 * and still begins with the same words (a wording the repair corrected). An id with neither is reported and nothing
 * is written. Each file is rewritten in place (rows and every id named in the prose); the original is kept beside it
 * as <name>.before-remap.json, and a second run starts from that original.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const [reg, beforeFile, ...files] = process.argv.slice(2);
if (!reg || !beforeFile || !files.length) { console.error('usage: remap-ids.js <registry> <earlier framework.json> <reviewer file> …'); process.exit(1); }
const now = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'curricula', reg, 'framework.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(beforeFile, 'utf8'));
const key = (n) => n.f + '|' + n.grade + '|' + n.text;
const byKey = new Map();
for (const n of now.nodes) { const k = key(n); if (!byKey.has(k)) byKey.set(k, []); byKey.get(k).push(n.id); }
const byId = new Map(now.nodes.map((n) => [n.id, n]));
const map = {}, lost = [];
const taken = new Map();
for (const n of before.nodes) {
  const same = byKey.get(key(n)) || [];
  // the same wording twice in one year (the document repeats itself): keep the order
  const i = taken.get(key(n)) || 0;
  let to = same[Math.min(i, same.length - 1)];
  taken.set(key(n), i + 1);
  if (!to) { const c = byId.get(n.id); if (c && c.f === n.f && c.text.slice(0, 18) === n.text.slice(0, 18)) to = n.id; }
  if (to) map[n.id] = to; else lost.push(n.id + ' "' + n.text.slice(0, 70) + '"');
}
const ids = Object.keys(map).sort((a, b) => b.length - a.length);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const walk = (v, fn) => (typeof v === 'string' ? fn(v) : Array.isArray(v) ? v.map((x) => walk(x, fn)) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, fn)])) : v);
let failed = false;
for (const f of files) {
  const keep = f.replace(/\.json$/, '') + '.before-remap.json';
  if (!fs.existsSync(keep)) fs.copyFileSync(f, keep);
  const src = JSON.parse(fs.readFileSync(keep, 'utf8'));
  const used = new Set();
  JSON.stringify(src).replace(/"id":"([^"]+)"/g, (m, id) => { used.add(id); return m; });
  const missing = [...used].filter((id) => !map[id]);
  if (missing.length) { console.log('FAIL  ' + path.basename(f) + ' names ids that have no counterpart now: ' + missing.join(', ')); failed = true; continue; }
  // one pass over every string, longest id first, each id matched whole (not as the beginning of a longer one)
  const re = new RegExp('(?<![A-Za-z0-9.])(?:' + ids.filter((id) => map[id] !== id).map(esc).join('|') + ')(?![A-Za-z0-9]|\\.[A-Za-z0-9])', 'g');
  let n = 0;
  const out = ids.some((id) => map[id] !== id) ? walk(src, (s) => s.replace(re, (m) => { n++; return map[m]; })) : src;
  fs.writeFileSync(f, JSON.stringify(out, null, 1));
  console.log(path.basename(f) + ': ' + n + ' id mention(s) renumbered');
}
if (lost.length) console.log(lost.length + ' earlier node(s) have no counterpart now (no file names them unless reported above): ' + lost.slice(0, 5).join(' · '));
if (failed) process.exit(1);
