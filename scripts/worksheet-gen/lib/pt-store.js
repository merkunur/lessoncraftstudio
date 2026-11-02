/**
 * lib/pt-store.js — the Picture Tracing trace store (makers 2026-11-02; ENGINES-ART §7.2, spike S6).
 *
 * One file per library B&W drawing, data/pt/traces/<theme>__<noun>.json (flat: a maker copies an art folder without
 * sub-folders), holding exactly what the composer reads from a trace (lib/pt-scene.js, lib/pt-render.js):
 *   { W, H, sw, inkBox, paths, blobs, body }
 * `body` (the drawing's occlusion mask, W × H of 0/1) is run-length packed: the lengths of alternating runs, the
 * first run of 0s. Numbers are stored as the tracer made them (no rounding), so a page composed from the store is the
 * page composed from a live trace, byte for byte (tools/pt-store-build.js proves it per drawing).
 *
 * Why a store: the maker has no `sharp`, and a canvas decode traces a few edge pixels differently (S6), so the
 * browser never traces — it reads the trace Node made. The laws (lib/pt-verify.js) need the typed arrays the store
 * does not carry (ink, skeleton): they stay offline, on live traces.
 */
'use strict';
const path = require('path');

const DIR = path.join(__dirname, '..', 'data', 'pt', 'traces');
/** 'animals bw/bat' → data/pt/traces/animals bw__bat.json */
const fileOf = (rel) => path.join(DIR, String(rel).replace('/', '__') + '.json');

function packBody(body) {
  const runs = [];
  let v = 0, n = 0;
  for (let i = 0; i < body.length; i++) {
    const b = body[i] ? 1 : 0;
    if (b === v) n++;
    else { runs.push(n); v = b; n = 1; }
  }
  runs.push(n);
  return runs;
}
function unpackBody(runs, size) {
  const body = new Uint8Array(size);
  let i = 0, v = 0;
  for (const n of runs) { if (v) body.fill(1, i, i + n); i += n; v ^= 1; }
  if (i !== size) throw new Error(`pt-store: body runs cover ${i} of ${size} pixels`);
  return body;
}
/** a live trace (lib/pt-trace.js traceDrawing) → the stored object */
function pack(tr) {
  for (let i = 0; i < tr.body.length; i++) if (tr.body[i] > 1) throw new Error('pt-store: body is not a 0/1 mask');
  return { W: tr.W, H: tr.H, sw: tr.sw, inkBox: tr.inkBox, paths: tr.paths, blobs: tr.blobs, body: packBody(tr.body) };
}
/** the stored object → a trace the composer can use */
function unpack(j) { return { W: j.W, H: j.H, sw: j.sw, inkBox: j.inkBox, paths: j.paths, blobs: j.blobs, body: unpackBody(j.body, j.W * j.H) }; }

module.exports = { DIR, fileOf, pack, unpack, packBody, unpackBody };
