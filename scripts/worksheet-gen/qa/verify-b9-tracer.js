#!/usr/bin/env node
/**
 * verify-b9-tracer.js — the Picture Tracing tracer laws (lib/pt-trace.js) on a fixed sample of library drawings, and the
 * poisons that prove the laws can fail (§A.13: poison every assertion, with a control):
 *   law a  the guide lies on the drawing's own ink (≤ 2 % of its centre line off the ink grown by 0.6 stroke widths)
 *   law b  the drawing is fully traced (≤ 2 % of its skeleton uncovered AND every stroke longer than 3 stroke widths
 *          ≥ 85 % covered — a lost smile fails even when 99 % of the drawing is covered)
 *   P0 control (the untouched guide passes) · P1 drop the longest stroke · P2 drop a short facial stroke · P3 shift the
 *   guide 6 px · P4 a spur off the ink
 *   node qa/verify-b9-tracer.js
 */
'use strict';
const path = require('path');
const { traceDrawing } = require('../lib/pt-trace.js');
const { tracerLaws } = require('../lib/pt-verify.js');
const LIB = path.join(__dirname, '..', 'cache', 'themes');
const SAMPLE = ['animals bw/giraffe', 'sea life bw/clown_fish', 'farm animals bw/antelope', 'vehicles bw/bus', 'animals bw 4/chick',
  'home and nature bw/house', 'home and nature bw/tree', 'Easter bw/butterfly', 'nature bw/sun', 'farm bw/rabbit', 'Christmas bw/star', 'Easter bw/bunny'];
(async () => {
  let fails = 0, n = 0;
  const say = (ok, msg) => { n++; if (!ok) fails++; console.log((ok ? 'PASS ' : 'FAIL ') + msg); };
  for (const k of SAMPLE) {
    const tr = await traceDrawing(path.join(LIB, k + '@3x.webp'));
    const f = await tracerLaws(tr);
    say(!f.length, k + (f.length ? ': ' + f.join('; ') : ''));
  }
  // poisons on the giraffe (a face: eyes, smile, spots)
  const tr = await traceDrawing(path.join(LIB, 'animals bw/giraffe@3x.webp'));
  const g = (paths) => ({ paths, blobs: tr.blobs });
  const byLen = tr.paths.slice().sort((a, b) => b.len - a.len);
  // the short stroke farthest from every other stroke (an isolated mark like a smile: no neighbour can cover for it)
  const iso = (p) => { const m = p.pts[(p.pts.length / 2) | 0]; let d = 1e9; for (const q of tr.paths) if (q !== p) for (const r of q.pts) d = Math.min(d, Math.hypot(r[0] - m[0], r[1] - m[1])); return d; };
  // (never a piece the outer/inner split cut off a longer line: dropping part of a long outline is ≤ 15 % of ITS stroke and
  // correctly passes law b — the poison must drop a whole isolated stroke)
  const smile = tr.paths.filter((p) => !p.split && p.len > 3 * tr.sw && p.len < 120).sort((a, b) => iso(b) - iso(a))[0];
  const poisons = [
    ['P0 control', g(tr.paths), false],
    ['P1 drop the longest stroke', g(tr.paths.filter((p) => p !== byLen[0])), true],
    ['P2 drop one short stroke', g(tr.paths.filter((p) => p !== smile)), true],
    ['P3 shift the guide 6 px', g(tr.paths.map((p) => ({ ...p, pts: p.pts.map(([x, y]) => [x + 6, y + 6]) }))), true],
    ['P4 a spur off the ink', g(tr.paths.concat([{ pts: [[20, 20], [120, 40], [160, 120]], closed: false, len: 160 }])), true],
  ];
  for (const [name, guide, mustFail] of poisons) {
    const f = await tracerLaws(tr, guide);
    say(mustFail ? f.length > 0 : f.length === 0, name + (mustFail ? ' must fail: ' : ' must pass: ') + (f.join('; ') || 'clean'));
  }
  console.log(fails ? `FAIL ${fails}/${n}` : `PASS ${n}/${n}`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
