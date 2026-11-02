#!/usr/bin/env node
/**
 * pt-store-build.js — build the Picture Tracing trace store, data/pt/traces/ (lib/pt-store.js; makers 2026-11-02).
 *
 * Traces every drawing of data/pt/index.json (every B&W library drawing) plus any library drawing a face scene or a
 * Level Set skin places that the index lacks, packs each trace and PROVES the stored file gives the live trace back:
 * W H sw inkBox paths blobs equal as JSON, the occlusion mask equal pixel for pixel. A drawing that fails is not
 * written and the run exits 1.
 *
 *   node tools/pt-store-build.js [--shard=i/N] [--only=<theme substring>] [--check]   (--check: compare, write nothing)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { traceDrawing } = require('../lib/pt-trace.js');
const store = require('../lib/pt-store.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const CHECK = process.argv.includes('--check');
const [si, sn] = arg('shard', '0/1').split('/').map(Number);
const only = arg('only', '');
const LIB = path.join(__dirname, '..', 'cache', 'themes');

/** every library drawing a published face scene or a Level Set skin places (srcs 'theme bw/noun') */
function sceneSources() {
  const out = new Set();
  const walk = (v) => {
    if (!v || typeof v !== 'object') return;
    if (Array.isArray(v)) { v.forEach(walk); return; }
    if (typeof v.src === 'string' && /\//.test(v.src) && !/^motif:/.test(v.src)) out.add(v.src);
    Object.values(v).forEach(walk);
  };
  const { sceneFor } = require('../data/b9/face-scenes.js');
  const { FACES } = require('../data/b9/picture-tracing.js');
  const words = ['sun', 'fish', 'cat', 'apple'];
  for (const mode of Object.keys(FACES)) { try { walk(sceneFor(mode, { words })); } catch (e) { /* a face that needs its locale's words */ } }
  const PTX = require('../lib/ptx.js');
  for (const id of PTX.catalog().keys()) { try { walk(PTX.resolvePtx(id, { words }).scene); } catch (e) { /* idem */ } }
  return out;
}

(async () => {
  const idx = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'pt', 'index.json'), 'utf8'));
  const keys = new Set(Object.keys(idx));
  const extra = [...sceneSources()].filter((k) => !keys.has(k));
  extra.forEach((k) => keys.add(k));
  if (extra.length && si === 0) console.log('scene drawings outside the index: ' + extra.length + ' (' + extra.slice(0, 6).join(', ') + ')');
  const all = [...keys].filter((k) => !only || k.includes(only)).sort().filter((k, i) => i % sn === si);
  fs.mkdirSync(store.DIR, { recursive: true });
  let wrote = 0, same = 0;
  const bad = [];
  for (const k of all) {
    const src = path.join(LIB, k + '@3x.webp');
    if (!fs.existsSync(src)) { bad.push(k + ': no library file'); continue; }
    let tr;
    try { tr = await traceDrawing(src); } catch (e) { bad.push(k + ': ' + e.message); continue; }
    const json = JSON.stringify(store.pack(tr));
    const back = store.unpack(JSON.parse(json));
    const eq = ['W', 'H', 'sw', 'inkBox', 'paths', 'blobs'].every((f) => JSON.stringify(back[f]) === JSON.stringify(tr[f]))
      && back.body.length === tr.body.length && back.body.every((v, i) => v === (tr.body[i] ? 1 : 0));
    if (!eq) { bad.push(k + ': the stored trace does not give the live trace back'); continue; }
    const f = store.fileOf(k);
    if (fs.existsSync(f) && fs.readFileSync(f, 'utf8') === json) { same++; continue; }
    if (CHECK) { bad.push(k + ': store file ' + (fs.existsSync(f) ? 'differs from' : 'missing for') + ' the live trace'); continue; }
    fs.writeFileSync(f, json);
    wrote++;
  }
  console.log(`shard ${si}/${sn}: ${all.length} drawings — ${wrote} written, ${same} unchanged, ${bad.length} failed`);
  if (bad.length) { console.log(bad.slice(0, 20).join('\n')); process.exit(1); }
})().catch((e) => { console.error(e); process.exit(1); });
