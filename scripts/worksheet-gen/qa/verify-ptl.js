#!/usr/bin/env node
/**
 * verify-ptl.js — the Picture Tracing Level Set gate (`ptl`, 300 copies = 20 faces × 3 levels × 5): every copy's COMPOSED
 * page (lib/ptx.js resolvePtx — the scene the page prints, EN words for the word face) through the family gate's face laws
 * at the copy's LEVEL (qa/verify-b9-picture-tracing.js faceChecks), then the Level Set's own rules, then the poisons.
 *
 *   L1 every copy passes its face's laws at its level (composer, band budget/floor/fill, B&W, tracer index, excluded imagery,
 *      straight share, counted kind, hidden animals, symmetry, true shapes, baubles, missing part)
 *   L2 the level's band: L1 copies use the face's "-1" band, L3 its "-3" band, L2 the face's own band
 *   L3 the length ladder against the published page: L1 ≥ 25 % lighter, L3 ≥ 15 % heavier — except the NARROW faces whose
 *      level is not the traced length (recorded in each scene file's header): K-419 one picture, K-421 fewer BIGGER circles
 *      (its ladder's L1 is 330-360 px), K-426 the stroke order,
 *      K-427 the count, K-428 the part size, G1-430 the word, G1-433 the figure-ground
 *   L4 within a face, no copy's main picture (its largest dashed drawing) is another copy's or the published page's, and no
 *      two copies share more than half their cast (Jaccard of the library keys > 0.5); no copy traces more than ONE library
 *      drawing the published page traces
 *   L5 tracer laws a/b over every library drawing the Level Set uses
 *   L6 exactly 5 copies per face × level, 300 in all
 *   L7 K-422: every library picture is ≥ 50 % its column's direction (down / across / slanted, tools/pt-straight.js
 *      directionMix) — the family gate checks straightness only, and a cake in the slanted column passed it at 17 %
 *   L8 K-426: no two start dots of a page closer than 22 px, no traced stroke under 40 px (dots stacked 0-8 px apart
 *      and arrows beside 15-px strokes passed every other check)
 *   L9 K-431: each long line of the sea (horizon, waves, beach line) is interrupted by at most ONE picture — two
 *      creatures on one wave cut the line the instruction asks for into pieces
 *   node qa/verify-ptl.js [--face=K-418] [--no-poison]
 */
'use strict';
const { composeScene, traceOf } = require('../lib/pt-scene.js');
const { catalog, resolvePtx, MODE_OF } = require('../lib/ptx.js');
const { sceneFor } = require('../data/b9/face-scenes.js');
const { FACES } = require('../data/b9/picture-tracing.js');
const { faceChecks } = require('./verify-b9-picture-tracing.js');
const { tracerLaws } = require('../lib/pt-verify.js');
const { directionMix } = require('../tools/pt-straight.js');
const { traceOf: traceKey } = require('../lib/pt-scene.js');
const { wOf } = require('../data/ptx/lay.js');
const NARROW = new Set(['K-419', 'K-421', 'K-426', 'K-427', 'K-428', 'G1-430', 'G1-433']);
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
const onlyFace = arg('face');
const wordsOf = (e) => (e.words && e.words.en) || (MODE_OF[e.face] === 'picture-and-word' ? ['sun', 'fish', 'cat', 'apple'] : undefined);
const sceneOf = (e) => resolvePtx(e.id, { words: wordsOf(e) }).scene;
const keysOf = (sc) => new Set((sc.items || []).map((i) => i.src));
/** the TRACED drawings of a page (dashed, half, part, hidden) — scenery drawn solid (leaves, trees, mushrooms) is not a cast */
const tracedOf = (sc) => new Set((sc.items || []).filter((i) => !i.render || i.render === 'guide' || i.render === 'half' || i.render === 'part').map((i) => i.src));
const mainOf = (sc) => { const d = (sc.items || []).filter((i) => !i.render || i.render === 'guide' || i.render === 'half' || i.render === 'part'); return d.length ? d.reduce((a, c) => ((c.h || 0) + (c.w || 0) > (a.h || 0) + (a.w || 0) ? c : a)).src : null; };

/** the Level Set rules for one copy (beyond the face laws) */
async function copyChecks(e, sc, pubLen) {
  const f = [], mode = MODE_OF[e.face], fb = FACES[mode].band;
  const want = e.level === 2 ? fb : fb + '-' + e.level;
  if (sc.band !== want) f.push(`L2 band ${sc.band} (L${e.level} of a ${fb} face wants ${want})`);
  const r = await faceChecks(mode, sc, { level: e.level });
  f.push(...r.f.map((x) => 'L1 ' + x));
  const len = r.metrics.tracedLen;
  if (!NARROW.has(e.face)) {
    if (e.level === 1 && len > 0.75 * pubLen) f.push(`L3 L1 traced length ${len} is not 25 % under the published ${pubLen} (≤ ${Math.round(0.75 * pubLen)})`);
    if (e.level === 3 && len < 1.15 * pubLen) f.push(`L3 L3 traced length ${len} is not 15 % over the published ${pubLen} (≥ ${Math.round(1.15 * pubLen)})`);
  }
  if (e.face === 'K-422') for (const it of sc.items || []) {
    const c = it.x < 229 ? 0 : it.x < 447 ? 1 : 2, m = directionMix(await traceKey(it.src)), sh = [m.v, m.h, m.s][c];
    if (sh < 0.5) f.push(`L7 ${it.src} is ${Math.round(100 * sh)} % ${['down', 'across', 'slanted'][c]} in the ${['down', 'across', 'slanted'][c]} column`);
  }
  if (e.face === 'K-431') {
    const lines = []; for (const m of sc.motifs || []) { if (m.m === 'line' && m.a[0].length === 2 && m.a[0][0][1] === m.a[0][1][1]) lines.push([m.a[0][0][1], 0]); if (m.m === 'waves') lines.push([m.a[2], m.a[4]]); if (m.m === 'ground') lines.push([m.a[2], m.a[4] || 4]); }
    for (const [y, a] of lines) { const by = (sc.items || []).filter((it) => it.render !== 'model').filter((it) => { const h = it.h != null ? it.h : it.w / (wOf(it.src, 1) || 1), halo = it.halo != null ? it.halo : 0; return it.y + halo > y - a && it.y - h - halo < y + a; }); if (by.length > 1) f.push(`L9 the line at y ${y} is cut by ${by.length} pictures (${by.map((i) => i.src.split('/')[1]).join(', ')})`); }
  }
  if (e.face === 'K-426') {
    const plen = (q) => { let L = 0; for (let i = 1; i < q.length; i++) L += Math.hypot(q[i][0] - q[i - 1][0], q[i][1] - q[i - 1][1]); return L; };
    const S = (sc.motifs || []).filter((m) => m.m === 'lineFixed').map((m) => m.a[0]);
    for (let i = 0; i < S.length; i++) {
      if (plen(S[i]) < 40) f.push(`L8 a traced stroke of ${Math.round(plen(S[i]))} px carries a start dot`);
      for (let j = i + 1; j < S.length; j++) { const d = Math.hypot(S[i][0][0] - S[j][0][0], S[i][0][1] - S[j][0][1]); if (d < 22) f.push(`L8 two start dots ${Math.round(d)} px apart at ${S[i][0].map(Math.round)}`); }
    }
  }
  return { f, len };
}

(async () => {
  let fails = 0, n = 0;
  const say = (ok, msg) => { n++; if (!ok) fails++; if (!ok || process.argv.includes('--verbose')) console.log((ok ? 'PASS ' : 'FAIL ') + msg); };
  const all = [...catalog().values()].filter((e) => !onlyFace || e.face === onlyFace);
  const faces = [...new Set(all.map((e) => e.face))].sort();
  const pub = {};
  for (const face of faces) pub[face] = (await composeScene(sceneFor(MODE_OF[face], { words: ['sun', 'fish', 'cat', 'apple'] }))).metrics.tracedLen;
  const keys = new Set();
  for (const face of faces) {
    const list = all.filter((e) => e.face === face).sort((a, b) => a.level - b.level || a.id.localeCompare(b.id));
    for (const lv of [1, 2, 3]) say(list.filter((e) => e.level === lv).length === 5, `L6 ${face} L${lv}: ${list.filter((e) => e.level === lv).length} copies (want 5)`);
    const pubMain = mainOf(sceneFor(MODE_OF[face], { words: ['sun', 'fish', 'cat', 'apple'] }));
    const mains = new Map(pubMain ? [[pubMain, 'the published page']] : []), casts = [];
    const pubKeys = tracedOf(sceneFor(MODE_OF[face], { words: ['sun', 'fish', 'cat', 'apple'] }));
    let faceFails = 0;
    for (const e of list) {
      const sc = sceneOf(e); for (const k of keysOf(sc)) keys.add(k);
      const r = await copyChecks(e, sc, pub[face]);
      const m = mainOf(sc);
      if (m && mains.has(m) && !(e.face === 'K-427')) r.f.push(`L4 main picture ${m} is also the main picture of ${mains.get(m)}`);
      if (m) mains.set(m, e.id);
      const ks = keysOf(sc);
      for (const [id, o] of casts) { const inter = [...ks].filter((k) => o.has(k)).length, uni = new Set([...ks, ...o]).size; if (uni && inter / uni > 0.5) r.f.push(`L4 shares ${inter}/${uni} of its cast with ${id}`); }
      const withPub = [...tracedOf(sc)].filter((k) => pubKeys.has(k));
      if (withPub.length > 1) r.f.push(`L4 shares ${withPub.length} drawings with the published page (${withPub.join(', ')})`);
      casts.push([e.id, ks]);
      say(!r.f.length, `${e.id} L${e.level} len ${r.len}` + (r.f.length ? ': ' + r.f.join('; ') : ''));
      if (r.f.length) faceFails++;
    }
    console.log(`${face}: ${list.length - faceFails}/${list.length} copies clean (published ${pub[face]} px)`);
  }
  // L5 tracer laws over every library drawing the Level Set uses
  const lawFail = [];
  for (const k of keys) { const f = await tracerLaws(await traceOf(k)); if (f.length) lawFail.push(k + ': ' + f.join('; ')); }
  say(!lawFail.length, `L5 tracer laws on ${keys.size} drawings` + (lawFail.length ? ': ' + lawFail.slice(0, 6).join(' | ') : ''));
  if (!onlyFace) say(all.length === 300, `L6 ${all.length} copies in all (want 300)`);
  if (!process.argv.includes('--no-poison')) {
    // each poison must make ONE copy fail; the control (that copy untouched) must pass
    const e = catalog().get('ptx-K-418-' + [...catalog().keys()].find((k) => k.startsWith('ptx-K-418-') && catalog().get(k).level === 1).slice(10));
    const ctl = await copyChecks(e, sceneOf(e), pub['K-418'] || (await composeScene(sceneFor('base'))).metrics.tracedLen);
    say(!ctl.f.length, 'P0 control ' + e.id + ' passes' + (ctl.f.length ? ': ' + ctl.f.join('; ') : ''));
    const pubBase = (await composeScene(sceneFor('base'))).metrics.tracedLen;
    const heavy = { ...sceneOf(e), items: [...sceneOf(e).items, { src: 'home and nature bw/house', x: 337, y: 300, h: 220 }, { src: 'farm bw/tractor', x: 337, y: 640, w: 260 }] };
    let r = await copyChecks(e, heavy, pubBase); say(r.f.some((x) => /^L3|band/.test(x) || /budget/.test(x)), 'P1 an L1 copy as heavy as the published page must fail: ' + (r.f[0] || 'PASSED (gate blind)'));
    r = await copyChecks({ ...e, level: 3 }, sceneOf(e), pubBase); say(r.f.some((x) => /^L2|^L3/.test(x)), 'P2 a light copy filed as L3 must fail: ' + (r.f[0] || 'PASSED (gate blind)'));
    const half = [...catalog().values()].find((x) => x.face === 'G1-432' && x.level === 1);
    const hs = sceneOf(half); hs.items = hs.items.map((it, i) => (i === 1 ? { ...it, src: 'animals bw/owl' } : it));
    r = await copyChecks(half, hs, pub['G1-432'] || 3362); say(r.f.some((x) => /F19/.test(x)), 'P3 an L1 mirror picture over 5 px must fail: ' + (r.f[0] || 'PASSED (gate blind)'));
    const cnt = [...catalog().values()].find((x) => x.face === 'K-427');
    const cs = sceneOf(cnt); cs.items = cs.items.filter((it, i, a) => i !== a.findIndex((y) => y.src === cnt && false) && !(it.src === cs.count.key && a.filter((y) => y.src === cs.count.key).indexOf(it) === 0));
    const dc = [...catalog().values()].find((x) => x.face === 'K-422' && x.level === 2);
    const ds = sceneOf(dc); ds.items = [...ds.items, { src: 'food bw 2/cake', x: 556, y: 400, fitBox: [180, 150], anchor: 'centre' }];
    r = await copyChecks(dc, ds, pub['K-422'] || 7660); say(r.f.some((x) => /^L7/.test(x)), 'P5 a cake in the slanted column must fail: ' + (r.f.find((x) => /^L7/.test(x)) || 'PASSED (gate blind)'));
    const sc6 = [...catalog().values()].find((x) => x.face === 'K-426' && x.level === 2), s6 = sceneOf(sc6), first = s6.motifs.find((m) => m.m === 'lineFixed');
    s6.motifs = [...s6.motifs, { ...first, a: [first.a[0].map(([x, y]) => [x + 5, y + 3]), first.a[1]] }];
    r = await copyChecks(sc6, s6, pub['K-426'] || 3000); say(r.f.some((x) => /^L8/.test(x)), 'P6 a second stroke starting 6 px from another must fail: ' + (r.f.find((x) => /^L8/.test(x)) || 'PASSED (gate blind)'));
    const sc9 = [...catalog().values()].find((x) => x.face === 'K-431' && x.id.endsWith('snorkel')), s9 = sceneOf(sc9); s9.items = [...s9.items, { src: 'sea life bw/fish', x: 330, y: 350, w: 130, halo: 8 }];
    r = await copyChecks(sc9, s9, pub['K-431'] || 8512); say(r.f.some((x) => /^L9/.test(x)), 'P7 a second fish on the snorkel wave must fail: ' + (r.f.find((x) => /^L9/.test(x)) || 'PASSED (gate blind)'));
    r = await copyChecks(cnt, cs, pub['K-427'] || 4000); say(r.f.some((x) => /F10/.test(x)), 'P4 one counted animal removed (N ≠ the box) must fail: ' + (r.f[0] || 'PASSED (gate blind)'));
  }
  console.log(fails ? `FAIL ${fails}/${n}` : `PASS ${n}/${n}`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
