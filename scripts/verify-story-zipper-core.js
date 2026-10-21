#!/usr/bin/env node
/* =====================================================================
   verify-story-zipper-core.js — the gate of ACTIVITY #68, THE STORY
   ZIPPER (Willow's Story Corner, RL.K.9, 11 locales). Its own ground truth:
     1. the gate's own table of what happens in which story and which
        animal has which feature (read off the captions and the library
        pictures, not off the core); for every tooth of every zipper the
        core's derived answer (middle / a side / the pocket) agrees, with
        and without the side swap, and the evidence panel or spot exists
     2. the zippers: five teeth, every kind (left only, right only, both,
        neither) at least once and exactly one kind twice; the doubled kind
        (both / one side / neither) differs between the three zippers of a
        pass
     3. the passes (10,000 seeds): 15 teeth, each zipper five rows in
        order with its own history; no spot is the answer three times
        running or more than 6 / fewer than 3 times; two zippers running
        never both open on a middle tooth; the sides flip every pass; the
        next pass never repeats the order or starts with the tooth just
        played; animals: three different zippers, one of each doubled kind
     4. the pull, for every tooth × every place: closes iff the place is
        the answer; the hint names the mistake (both / other story / this
        story / pocket, the animal versions for animals); miss 2 lights
        the evidence; an empty pull is no miss
     5. texts × 11: names, three captions per tale, a question for every
        tooth, a success sentence for every tooth that names the right
        characters; no 0; fr non-breaking spaces; strings × 11; pictures
        exist, colour, labelled; the floors; the manifest mirror, the
        frozen en/fr metadata, the nine new locales' slug, title, intro
   Usage: node scripts/verify-story-zipper-core.js  (SZ_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.SZ_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'story-zipper-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, StoryZipperCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'willow-story-corner-activity.js'), 'utf8') + '\nthis.__A = WillowStoryCornerActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const FROZEN = '41593a8afaffcb531b44fcd4126155a82639e1f4';
/* the gate's own truth: who does each thing (tales, from the captions) and who has each feature (animals, from the pictures) */
const HAPPENS = {
  lost: ['fox', 'bunny'], help: ['bunny'], alone: ['fox'], found: ['fox', 'bunny'], climb: ['frog'],
  made: ['bear', 'mouse'], shared: ['mouse'], rain: ['bear'], again: ['bear'], happy: ['owl', 'frog'], scared: ['owl']
};
const HAS = {
  duckling: ['beak', 'yellow', 'twolegs'], penguin: ['beak', 'blackwhite', 'twolegs'], cow: ['fourlegs', 'horns', 'spots'], horse: ['fourlegs', 'mane', 'brown', 'tail'],
  zebra: ['mane', 'stripes', 'tail'], frog: ['fourlegs', 'spots'], turtle: ['fourlegs', 'shell'], owl: ['wings', 'feathers', 'beak'], bat: ['wings', 'fur'],
  bee: ['feelers', 'stripes'], ladybug: ['feelers', 'spots', 'red'], lion: ['fourlegs', 'mane'], tiger: ['fourlegs', 'stripes']
};
const truthOf = (kind, a, dim) => kind === 'tales' ? (HAPPENS[dim] || []).includes(a) : (HAS[a] || []).includes(dim);
const spotOf = (kind, P, dim, swap) => { const L = swap ? P.b : P.a, R = swap ? P.a : P.b, l = truthOf(kind, L, dim), r = truthOf(kind, R, dim); return l && r ? 'mid' : !l && !r ? 'pocket' : l ? 'left' : 'right'; };
const kindOf = (s) => s === 'mid' ? 'both' : s === 'pocket' ? 'neither' : 'one';
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const picOk = (p) => p && fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]);
const D = C.DATA, TX = D.TEXT;

/* 1 + 2 — the answers and the zippers */
is(JSON.stringify(Object.keys(D.TALE_PAIRS)) === '["fb","bm","of"]' && Object.keys(D.ANIMAL_PAIRS).length === 7, 'three tale zippers, seven animal zippers');
for (const kind of C.KINDS) {
  const PP = C.pairs(kind), TH = C.things(kind);
  for (const [z, P] of Object.entries(PP)) {
    is(P.teeth.length === 5 && new Set(P.teeth).size === 5, `${kind} ${z}: five different teeth`);
    for (const swap of [false, true]) {
      const spots = P.teeth.map(d => spotOf(kind, P, d, swap)), c = {}; spots.forEach(s => c[s] = (c[s] || 0) + 1);
      is(['left', 'right', 'mid', 'pocket'].every(s => c[s] >= 1) && Object.values(c).filter(n => n === 2).length === 1 && Object.values(c).every(n => n <= 2), `${kind} ${z} swap ${swap}: every kind once, one kind twice (${JSON.stringify(c)})`);
      for (const d of P.teeth) {
        const want = spotOf(kind, P, d, swap), got = C.answer(kind, z, d, swap);
        is(got === want, `${kind} ${z}.${d} swap ${swap}: core ${got}, gate ${want}`);
        const ev = C.evidence(kind, z, d, swap), S = C.sides(kind, z, swap);
        for (const side of ['left', 'right']) {
          const who = S[side], t = truthOf(kind, who, d), e = ev[side];
          is(t ? e !== null : e === null, `${kind} ${z}.${d} ${side} (${who}): evidence ${t ? 'exists' : 'absent'} (${JSON.stringify(e)})`);
          if (t && kind === 'tales') is(Number.isInteger(e) && e >= 0 && e <= 2, `${z}.${d}: ${who}'s evidence is one of its three panels`);
          if (t && kind === 'animals') is(Array.isArray(e) && e.length === 3 && e.every(x => x >= 0 && x <= 100), `${z}.${d}: ${who}'s feature has a spot on the picture`);
        }
      }
    }
    for (const who of [P.a, P.b]) is(Object.keys(TH[who].facts).every(d => truthOf(kind, who, d)), `${kind} ${who}: every fact the core holds is true in the gate's table`);
    for (const who of [P.a, P.b]) is(P.teeth.every(d => truthOf(kind, who, d) === Object.prototype.hasOwnProperty.call(TH[who].facts, d)), `${kind} ${z} ${who}: every asked fact matches the gate's table`);
  }
}
for (const t of Object.values(D.TALES)) { is(picOk(t.pic) && t.panels.length === 3, `${t.pic}: three panels, the picture exists`); t.panels.forEach((p, i) => { p.t.forEach(x => is(picOk(x[0]) && x[3] >= 1, `${t.pic} panel ${i + 1}: ${x[0]} exists, colour, labelled, at least the floor`)); if (p.b) is(picOk(p.b), `badge ${p.b}`); }); }
for (const a of Object.values(D.ANIMALS)) is(picOk(a.pic), `${a.pic} exists, colour, labelled`);
is(picOk(C.WILLOW), 'Willow is a library picture');

/* 3 — the passes */
for (const kind of C.KINDS) {
  for (let seed = 0; seed < 2500; seed++) {
    const rnd = C.seeded(kind + seed);
    let prev = null;
    for (let pass = 0; pass < 2; pass++) {
      const pl = C.plan(kind, rnd, pass, prev), tag = `${kind} seed ${seed} pass ${pass}`, swap = pass % 2 === 1;
      const zs = []; for (let k = 0; k < 3; k++) zs.push(pl[k * 5].pair);
      is(pl.length === 15 && new Set(zs).size === 3 && pl.every((r, i) => r.pair === zs[Math.floor(i / 5)] && r.row === i % 5 && r.swap === swap && r.last === (i % 5 === 4)), `${tag}: three zippers of five rows`);
      is(pl.every(r => r.spot === spotOf(kind, C.pairs(kind)[r.pair], r.dim, swap)), `${tag}: every round's answer is the gate's`);
      is(pl.every((r, i) => r.history.length === r.row && r.history.every((h, k) => h.dim === pl[i - r.row + k].dim && h.spot === pl[i - r.row + k].spot)), `${tag}: each row shows the teeth already closed`);
      is(new Set(zs.map(z => C.pairs(kind)[z].teeth.join())).size === 3 && zs.every(z => pl.filter(r => r.pair === z).map(r => r.dim).sort().join() === C.pairs(kind)[z].teeth.slice().sort().join()), `${tag}: every zipper's five teeth`);
      const sp = pl.map(r => r.spot), c = {}; sp.forEach(s => c[s] = (c[s] || 0) + 1);
      is(['left', 'mid', 'right', 'pocket'].every(s => c[s] >= 3 && c[s] <= 6), `${tag}: every place holds the answer 3–6 times (${JSON.stringify(c)})`);
      is(sp.every((s, i) => i < 2 || !(s === sp[i - 1] && s === sp[i - 2])), `${tag}: no place three times running`);
      is([1, 2].every(k => !(sp[k * 5] === 'mid' && sp[(k - 1) * 5] === 'mid')), `${tag}: two zippers running never both open on a middle tooth`);
      const doubled = zs.map(z => { const k = {}; pl.filter(r => r.pair === z).forEach(r => { const x = kindOf(r.spot); k[x] = (k[x] || 0) + 1; }); return Object.keys(k).find(x => x !== 'one' ? k[x] === 2 : k[x] === 3); });
      is(new Set(doubled).size === 3, `${tag}: the doubled kind differs between the zippers (${doubled})`);
      if (prev) is(pl.map(r => r.id).join() !== prev.map(r => r.id).join() && pl[0].id !== prev[14].id, `${tag}: the next pass never repeats the order or starts with the tooth just played`);
      prev = pl;
    }
  }
}
is(JSON.stringify([0, 1, 2, 3].map(p => C.zippersOf('animals', p))) === JSON.stringify([['dp', 'ch', 'ft'], ['zh', 'ob', 'lt'], ['dp', 'bl', 'ft'], ['zh', 'ch', 'lt']]), 'animals: the zippers rotate, one of each doubled kind');

/* 4 — the pull */
for (const kind of C.KINDS) for (const z of Object.keys(C.pairs(kind))) for (const d of C.pairs(kind)[z].teeth) for (const swap of [false, true]) {
  const r = { id: 'x', kind: kind, pair: z, dim: d, row: 0, swap: swap, spot: C.answer(kind, z, d, swap), history: [], last: false }, want = spotOf(kind, C.pairs(kind)[z], d, swap), Ax = kind === 'animals' ? 'A' : '';
  { const st = C.newState(r); const res = C.pull(st); is(!res.ok && res.reason === 'empty' && st.misses === 0 && C.hint(st) === 'emptyPull', `${z}.${d}: an empty pull is no miss`); }
  for (const s of C.SPOTS) {
    const st = C.newState(r); C.place(st, s); const res = C.pull(st);
    is(!!res.ok === (s === want), `${kind} ${z}.${d} swap ${swap}: the tooth in ${s} ${s === want ? 'closes' : 'jams'}`);
    if (s === want) { is(st.done && !C.place(st, 'mid') && C.hint(st) === null, `${z}.${d}: a closed tooth stays closed`); continue; }
    const why = s === 'mid' ? 'hintBoth' : s === 'pocket' ? 'hintPocket' : want === 'mid' ? 'hintOther' : 'hintThis';
    is(st.misses === 1 && C.hint(st) === why + Ax && C.helpOf(st) === null, `${kind} ${z}.${d} in ${s}: miss 1 → ${why}${Ax}`);
    C.pull(st); const h = C.helpOf(st), ev = C.evidence(kind, z, d, swap);
    is(st.misses === 2 && C.hint(st) === (want === 'pocket' ? 'hintNone' : 'hintGlow') + Ax && h && JSON.stringify(h.left) === JSON.stringify(ev.left) && JSON.stringify(h.right) === JSON.stringify(ev.right) && h.pocket === (want === 'pocket'), `${kind} ${z}.${d} in ${s}: miss 2 lights the evidence`);
    C.place(st, want); is(C.helpOf(st) === null && C.pull(st).ok, `${z}.${d}: moving the tooth to its place, then pulling, closes it`);
  }
}

/* 5 — texts, strings, floors, manifest */
/* a question may never presuppose ONE answer: half the teeth are both or neither (the review's catch — 'Which one has a beak?' biased the child against the middle and the pocket) */
for (const [k, v] of Object.entries(TX.en.q)) is(!/^which one/i.test(v), 'en question ' + k + ' does not presuppose one answer («' + v + '»)');
for (const loc of LOCS) {
  const T = TX[loc];
  is(T && [...Object.keys(D.TALES), ...Object.keys(D.ANIMALS)].every(k => T.names[k]), `${loc}: every character has a name`);
  is(Object.keys(D.TALES).every(k => T.caps[k] && T.caps[k].length === 3 && T.caps[k].every(x => x.trim())), `${loc}: three captions per tale`);
  for (const kind of C.KINDS) for (const [z, P] of Object.entries(C.pairs(kind))) for (const d of P.teeth) {
    const q = T.q[z + '.' + d] || T.q[d], ok = T.ok[z + '.' + d];
    is(q && /\?\s*$/.test(q.replace(/ /g, ' ')), `${loc} ${z}.${d}: a question`);
    is(!!ok, `${loc} ${z}.${d}: a success sentence`);
    if (!ok) continue;
    const k = kindOf(spotOf(kind, P, d, false)), low = ok.toLocaleLowerCase(loc), stem = (n) => n.toLocaleLowerCase(loc).slice(0, Math.max(2, Math.min(4, n.length - 1))), named = (n) => new RegExp('(?<!\\p{L})' + stem(n), 'u').test(low);
    const one = truthOf(kind, P.a, d) ? P.a : P.b, other = one === P.a ? P.b : P.a;
    if (k === 'one') is(named(T.names[one]) && !named(T.names[other]), `${loc} ${z}.${d}: the sentence names only ${one} («${ok}»)`);
    else is(named(T.names[P.a]) && named(T.names[P.b]) || (k === 'neither' && kind === 'tales' && d === 'rain'), `${loc} ${z}.${d}: the sentence names both («${ok}»)`);
  }
  const all = JSON.stringify(T);
  is(!/(^|[^\d])0([^\d]|$)/.test(all), `${loc}: no 0 in the texts`);
  if (loc === 'fr') is(!/ [?!:;»]|« /.test(all), 'fr: non-breaking spaces before ? ! : ; and inside « »');
}
for (const [k, v] of Object.entries(A.strings)) for (const loc of LOCS) is(typeof v[loc] === 'string' && v[loc].trim(), `string ${k}: ${loc}`);
is(C.layout(704).unit === 96 && C.layout(360).unit === 64 && C.layout(704).animal >= 96 && C.layout(316).animal >= 64, 'the floors: 96 at 704, 64 on a phone (animals too)');
{
  const row = JSON.parse(fs.readFileSync(path.join(MT, 'willow-story-corner-activities.json'), 'utf8'))[0];
  const h = crypto.createHash('sha1').update(JSON.stringify(['slug', 'page_title', 'page_intro'].map(k => ['en', 'fr'].map(l => row[k][l])))).digest('hex');
  is(h === FROZEN, `the frozen en/fr metadata is untouched (${h})`);
  is(row.tool === 'willow-story-corner-activity' && !row.params.stories && !row.params.rounds, 'the row runs the zipper core, its params a mirror');
  for (const loc of LOCS) for (const kind of C.KINDS) is(row.params.byLocale[loc][kind] === C.plan(kind, C.seeded('m'), 0, null).length, `mirror ${loc} ${kind}`);
  for (const loc of ['de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fi']) is(row.slug[loc] && /^[a-z0-9-]+$/.test(row.slug[loc]) && row.page_title[loc] && row.page_intro[loc], `${loc}: slug, title, intro`);
}
console.log(`verify-story-zipper-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
